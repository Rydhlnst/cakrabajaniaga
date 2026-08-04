// scripts/clean-bodies.mjs
// One-time normalisation: RankPill article bodies begin with a repeated
// "Month D, YYYY" date line and the meta description paragraph. We already
// render those in our own article hero, so strip them from the stored body.
import fs from "node:fs/promises";
import path from "node:path";

const FILE = path.resolve(process.cwd(), "content", "articles.json");
const DATE_RE = /^[A-Z][a-z]+ \d{1,2}, \d{4}\s*$/;

const articles = JSON.parse(await fs.readFile(FILE, "utf8"));
let changed = 0;

for (const a of articles) {
  let md = (a.markdown || "").replace(/^\s+/, "");
  const lines = md.split("\n");

  // Drop a leading date line.
  while (lines.length && (lines[0].trim() === "" || DATE_RE.test(lines[0].trim()))) {
    if (DATE_RE.test(lines[0].trim())) {
      lines.shift();
      changed++;
      break;
    }
    lines.shift();
  }
  md = lines.join("\n").replace(/^\s+/, "");

  // Drop a leading paragraph equal to the description.
  if (a.description) {
    const desc = a.description.trim();
    if (md.startsWith(desc)) {
      md = md.slice(desc.length).replace(/^\s+/, "");
    }
  }

  a.markdown = md;
}

await fs.writeFile(FILE, JSON.stringify(articles, null, 2), "utf8");
console.log(`✓ cleaned ${articles.length} bodies (${changed} date lines stripped)`);
