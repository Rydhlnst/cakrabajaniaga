// scripts/scrape-content.mjs
// Content pipeline for the cakrabajaniaga.com rebuild.
//   1. Discover every blog article (client-side pagination worked around
//      via ?page params + link harvesting).
//   2. Scrape each article's main content via Firecrawl.
//   3. Download the featured image + every inline image locally into
//      public/blog/<slug>/ and rewrite the markdown to point at the
//      local copies (so all assets are saved, not hot-linked).
//   4. Write content/articles.json consumed by the site.
//
// Run: node scripts/scrape-content.mjs
import fs from "node:fs/promises";
import path from "node:path";

const API_KEY =
  process.env.FIRECRAWL_API_KEY || "fc-c10bd46122eb4942979c0f4b81ee7f3b";
const SITE = "https://cakrabajaniaga.com";
const ROOT = path.resolve(process.cwd());
const CONTENT_DIR = path.join(ROOT, "content");
const IMG_ROOT = path.join(ROOT, "public", "blog");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fcScrape(url, { formats = ["markdown"], onlyMainContent = true } = {}) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, formats, onlyMainContent }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      const json = await res.json();
      return json.data ?? json;
    } catch (err) {
      console.warn(`  ! scrape attempt ${attempt} failed for ${url}: ${err.message}`);
      if (attempt === 3) throw err;
      await sleep(1500 * attempt);
    }
  }
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);
  return buf.length;
}

function baseName(url) {
  return url.split("?")[0].split("/").pop() || "image.jpg";
}

// Parse the /blog listing markdown into { slug, title, date, description }.
function parseListing(markdown) {
  const cards = [];
  const re =
    /(?:!\[[^\]]*\]\([^)]*\)\\?\s*)?\\?\s*([A-Z][a-z]+ \d{1,2}, \d{4}) \*\*(.+?)\*\*\s*\\?\s*([\s\S]*?)Read article\]\((https?:\/\/[^\s)]+\/blog\/[^\s)]+)\)/g;
  let m;
  while ((m = re.exec(markdown)) !== null) {
    const [, date, title, descRaw, url] = m;
    const slug = url.replace(/[)#].*$/, "").split("/blog/")[1];
    if (!slug) continue;
    const description = descRaw
      .replace(/\\/g, "")
      .replace(/\s+/g, " ")
      .trim();
    cards.push({ slug, title: title.trim(), date, description });
  }
  return cards;
}

function firstHeading(markdown) {
  const m = markdown.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/\\/g, "").trim() : null;
}

function firstParagraph(markdown) {
  const lines = markdown.split("\n");
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("#") || t.startsWith("!") || t.startsWith("[") || t.startsWith("|")) continue;
    if (t.length < 40) continue;
    return t.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "").slice(0, 200);
  }
  return "";
}

async function main() {
  console.log("→ Discovering articles…");
  const listingUrls = [`${SITE}/blog`, `${SITE}/blog?page=2`, `${SITE}/blog?page=3`];
  const bySlug = new Map();

  for (const url of listingUrls) {
    try {
      const data = await fcScrape(url, { formats: ["markdown", "links"] });
      for (const c of parseListing(data.markdown || "")) {
        if (!bySlug.has(c.slug)) bySlug.set(c.slug, c);
      }
      const links = (data.links || []).map((l) => (typeof l === "string" ? l : l.url || ""));
      for (const link of links) {
        const mm = link.match(/\/blog\/([^/?#]+)$/);
        if (mm && mm[1] !== ":slug" && !bySlug.has(mm[1])) {
          bySlug.set(mm[1], { slug: mm[1], title: null, date: null, description: null });
        }
      }
      console.log(`  · ${url} (running total ${bySlug.size})`);
    } catch (err) {
      console.warn(`  ! listing ${url} failed: ${err.message}`);
    }
  }

  const slugs = [...bySlug.keys()];
  console.log(`→ ${slugs.length} unique articles discovered.\n`);

  // Resume support: keep already-scraped articles, only fetch the rest.
  const existing = new Map();
  try {
    const prev = JSON.parse(await fs.readFile(path.join(CONTENT_DIR, "articles.json"), "utf8"));
    for (const a of prev) if (a.markdown && a.markdown.length > 200) existing.set(a.slug, a);
    console.log(`  (resuming — ${existing.size} already scraped)\n`);
  } catch {}

  const articles = [];
  let idx = 0;
  for (const slug of slugs) {
    idx++;
    const meta = bySlug.get(slug);
    if (existing.has(slug)) {
      articles.push(existing.get(slug));
      console.log(`→ [${idx}/${slugs.length}] ${slug} (cached)`);
      continue;
    }
    console.log(`→ [${idx}/${slugs.length}] ${slug}`);
    try {
      const data = await fcScrape(`${SITE}/blog/${slug}`, {
        formats: ["markdown"],
        onlyMainContent: true,
      });
      const m = data.metadata || {};
      let markdown = data.markdown || "";

      // Collect every image URL in the article body.
      const imgUrls = [
        ...markdown.matchAll(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/g),
      ].map((x) => x[1]);

      const dir = path.join(IMG_ROOT, slug);
      const urlToLocal = new Map();
      let featured = null;
      for (const url of imgUrls) {
        if (urlToLocal.has(url)) continue;
        const name = baseName(url);
        const local = `/blog/${slug}/${name}`;
        try {
          await download(url, path.join(dir, name));
          urlToLocal.set(url, local);
          if (!featured && /featured/i.test(name)) featured = local;
        } catch (err) {
          console.warn(`    ! image failed ${name}: ${err.message}`);
        }
      }
      if (!featured && urlToLocal.size) featured = [...urlToLocal.values()][0];
      // Rewrite markdown image URLs → local paths.
      for (const [url, local] of urlToLocal) {
        markdown = markdown.split(url).join(local);
      }
      console.log(`    ✓ ${urlToLocal.size} images saved`);

      const title = meta.title || firstHeading(markdown) || slug;

      // Build a clean body: drop the leading featured image and the first
      // H1 (we render our own hero + title on the article page).
      let body = markdown;
      if (featured) {
        body = body.replace(
          new RegExp(`!\\[[^\\]]*\\]\\(${featured.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\)`),
          ""
        );
      }
      body = body.replace(/^#\s+.+$/m, "").trimStart();

      const description =
        (meta.description && meta.description.length > 20 ? meta.description : null) ||
        m.ogDescription ||
        firstParagraph(body);

      articles.push({
        slug,
        title,
        description,
        date: m["article:published_time"] || m.publishedTime || null,
        image: featured,
        markdown: body,
      });
    } catch (err) {
      console.warn(`    ! article failed: ${err.message}`);
    }
    await sleep(6500);
  }

  const parseDate = (a) => (a.date ? Date.parse(a.date) || 0 : 0);
  articles.sort((a, b) => parseDate(b) - parseDate(a));

  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(
    path.join(CONTENT_DIR, "articles.json"),
    JSON.stringify(articles, null, 2),
    "utf8"
  );
  console.log(`\n✓ content/articles.json — ${articles.length} articles`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
