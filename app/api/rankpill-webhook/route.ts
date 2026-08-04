import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// RankPill (autopilot) publishes SEO articles to this endpoint.
// Docs: https://rankpill.com/help/webhooks
//
// Store the shared secret in RANKPILL_WEBHOOK_SECRET. Signature-based
// (HMAC SHA-256) verification is used by default; when no secret is set the
// request is accepted (useful for the initial "Send Test").
//
// NOTE: This writes to content/articles.json, which works in a persistent
// dev/host filesystem. On read-only/serverless hosting (e.g. Vercel), swap the
// persistence block for a database upsert keyed on `slug` (Supabase/Prisma).

const ARTICLES_PATH = path.join(process.cwd(), "content", "articles.json");

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

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.RANKPILL_WEBHOOK_SECRET;

  // Authenticate (signature preferred, bearer token as fallback).
  if (secret) {
    const signature =
      request.headers.get("x-rankpill-signature") ||
      request.headers.get("authorization");
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

  // Upsert into content/articles.json (keyed on slug).
  try {
    const current = JSON.parse(await fs.readFile(ARTICLES_PATH, "utf8"));
    const record = {
      slug: article.slug,
      title: article.title,
      description: article.meta_description ?? null,
      date: article.published_at ?? new Date().toISOString(),
      image: article.featured_image ?? null,
      markdown: article.content_markdown ?? "",
    };
    const idx = current.findIndex((a: { slug: string }) => a.slug === article.slug);
    if (idx >= 0) current[idx] = { ...current[idx], ...record };
    else current.unshift(record);

    current.sort(
      (a: { date: string }, b: { date: string }) =>
        Date.parse(b.date || "0") - Date.parse(a.date || "0")
    );
    await fs.writeFile(ARTICLES_PATH, JSON.stringify(current, null, 2), "utf8");

    revalidatePath("/blog");
    revalidatePath(`/blog/${article.slug}`);
  } catch (err) {
    console.error("[rankpill-webhook] persistence failed:", err);
    return NextResponse.json({ message: "Received but not persisted" }, { status: 202 });
  }

  return NextResponse.json({ message: "Webhook received successfully" });
}
