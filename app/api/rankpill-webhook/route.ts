import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { upsertArticle, ensureArticlesTable } from "@/lib/db";
import { uploadToR2 } from "@/lib/r2";
import { sendArticleNotification } from "@/lib/resend";

// RankPill (autopilot) publishes SEO articles to this endpoint.
// Docs: https://rankpill.com/help/webhooks
//
// Store the shared secret in RANKPILL_WEBHOOK_SECRET. Signature-based
// (HMAC SHA-256) verification is used by default; when no secret is set the
// request is accepted (useful for the initial "Send Test").
//
// Pipeline:
//  1. Verify HMAC signature
//  2. Download featured_image → upload to Cloudflare R2
//  3. Upsert article into NeonDB (slug = primary key)
//  4. Also write to content/articles.json as local fallback
//  5. Revalidate ISR cache

const ARTICLES_PATH = path.join(process.cwd(), "content", "articles.json");
const BLOG_IMG_DIR = path.join(process.cwd(), "public", "blog");

type RankPillPayload = {
  title: string;
  content_html?: string;
  content_markdown?: string;
  slug: string;
  meta_description?: string;
  status?: string;
  featured_image?: string;
  published_url?: string;
  published_at?: string;
  is_republish?: boolean;
  test?: boolean;
};

function verifySignature(rawBody: string, signature: string | null, secret: string) {
  if (!signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(signature.replace(/^sha256=/, ""));
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Download a remote image and return the Buffer + content type.
 */
async function downloadImage(url: string): Promise<{ buf: Buffer; contentType: string }> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; CBNBot/1.0; +https://cakrabajaniaga.com)",
    },
  });
  if (!res.ok) throw new Error(`Failed to download image: HTTP ${res.status}`);
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, contentType };
}

/**
 * Derive a filename from a remote URL.
 */
function filenameFromUrl(url: string): string {
  const pathname = new URL(url).pathname;
  const base = pathname.split("/").pop() || "featured.jpg";
  // Ensure it has an extension
  if (!/\.\w+$/.test(base)) return `${base}.jpg`;
  return base;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.RANKPILL_WEBHOOK_SECRET;

  // Authenticate (signature preferred, bearer token as fallback).
  if (secret) {
    const signature = request.headers.get("x-rankpill-signature");
    const auth = request.headers.get("authorization") || "";
    const bearerOk = auth === `Bearer ${secret}`;
    if (!bearerOk && !verifySignature(rawBody, signature, secret)) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
  }

  let article: RankPillPayload;
  try {
    article = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (article.test) {
    return NextResponse.json({ message: "Test webhook received successfully" });
  }
  if (!article.slug || !article.title) {
    return NextResponse.json({ message: "Missing slug or title" }, { status: 400 });
  }

  const publishedDate = article.published_at ?? new Date().toISOString();
  let r2ImageUrl: string | null = null;

  // ── Step 1: Download featured_image → save locally + upload to R2 ──────
  if (article.featured_image) {
    try {
      const filename = filenameFromUrl(article.featured_image);
      const localDir = path.join(BLOG_IMG_DIR, article.slug);
      const localPath = path.join(localDir, filename);

      // Download and save locally (works on dev / persistent disk)
      const { buf, contentType } = await downloadImage(article.featured_image);
      await fs.mkdir(localDir, { recursive: true });
      await fs.writeFile(localPath, buf);

      // Upload to Cloudflare R2
      r2ImageUrl = await uploadToR2(article.slug, filename, buf, contentType);

      console.log(`[rankpill-webhook] Image saved: local=${localPath} r2=${r2ImageUrl}`);
    } catch (err) {
      console.error(`[rankpill-webhook] Image processing failed for slug="${article.slug}":`, err);
      console.error(`[rankpill-webhook] featured_image URL was: ${article.featured_image}`);
      // Continue — article still gets persisted, image falls back below
    }
  }

  // The image field: prefer R2 URL, fall back to original URL (remote), then local path
  // NOTE: local path (/blog/...) will NOT persist on Vercel's ephemeral filesystem,
  //       so it should only be used as last resort. Original URL is more reliable.
  const imageField =
    r2ImageUrl ||
    article.featured_image ||
    null;

  // ── Step 2: Upsert into NeonDB ─────────────────────────────────────────
  try {
    await ensureArticlesTable();
    await upsertArticle({
      slug: article.slug,
      title: article.title,
      description: article.meta_description ?? null,
      date: publishedDate,
      image: imageField,
      markdown: article.content_markdown ?? "",
    });
    console.log(`[rankpill-webhook] NeonDB upsert: ${article.slug}`);
  } catch (err) {
    console.error("[rankpill-webhook] NeonDB upsert failed:", err);
    // Fall through to local persistence
  }

  // ── Step 3: Upsert into content/articles.json (local fallback) ──────────
  try {
    let current: { slug: string; date: string; [key: string]: unknown }[] = [];
    try {
      current = JSON.parse(await fs.readFile(ARTICLES_PATH, "utf8"));
    } catch {
      // File may not exist on fresh deploy — start with empty array
      await fs.mkdir(path.dirname(ARTICLES_PATH), { recursive: true });
    }
    const record = {
      slug: article.slug,
      title: article.title,
      description: article.meta_description ?? null,
      date: publishedDate,
      image: imageField,
      markdown: article.content_markdown ?? "",
    };
    const idx = current.findIndex((a) => a.slug === article.slug);
    if (idx >= 0) current[idx] = { ...current[idx], ...record };
    else current.unshift(record);

    current.sort(
      (a, b) => Date.parse(b.date || "0") - Date.parse(a.date || "0")
    );
    await fs.writeFile(ARTICLES_PATH, JSON.stringify(current, null, 2), "utf8");
  } catch (err) {
    console.error("[rankpill-webhook] articles.json persistence failed:", err);
  }

  // ── Step 4: Revalidate ISR cache (articles are re-fetched fresh on the
  //           next render — no cross-request in-memory cache to clear) ──────
  try {
    revalidatePath("/blog");
    revalidatePath(`/blog/${article.slug}`);
    revalidatePath("/sitemap.xml");
  } catch {
    // ISR revalidation may fail in non-Vercel environments
  }

  // ── Step 5: Send notification email via Resend ─────────────────────────
  if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
    try {
      await sendArticleNotification({
        to: process.env.NOTIFICATION_EMAIL,
        articleTitle: article.title,
        articleSlug: article.slug,
        articleDescription: article.meta_description,
      });
      console.log(`[rankpill-webhook] Notification sent for: ${article.slug}`);
    } catch (err) {
      console.error("[rankpill-webhook] Notification failed:", err);
    }
  }

  return NextResponse.json({ message: "Webhook received successfully" });
}
