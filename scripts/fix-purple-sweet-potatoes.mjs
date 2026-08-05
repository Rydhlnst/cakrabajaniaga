#!/usr/bin/env node
// scripts/fix-purple-sweet-potatoes.mjs
// One-off: download the featured image from Supabase, upload to R2, update DB.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", ".env.local");
const envContent = await fs.readFile(envPath, "utf8");
for (const line of envContent.split("\n")) {
  const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (match) process.env[match[1]] = match[2].trim();
}

import { neon } from "@neondatabase/serverless";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const sql = neon(process.env.DATABASE_URL);
const R2 = new S3Client({
  region: "auto",
  endpoint: "https://" + process.env.CLOUDFLARE_ACCOUNT_ID + ".r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});
const BUCKET = process.env.R2_BUCKET_NAME;
const PUBLIC_URL = process.env.R2_PUBLIC_URL;
const BLOG_IMG_DIR = path.resolve(__dirname, "..", "public", "blog");

const slug = "purple-sweet-potatoes-near-me";
const filename = "featured-1785838685983.jpg";
const supabaseUrl = "https://xqvnmkjynbkcujcrtubi.supabase.co/storage/v1/object/public/article-images/3b68eb7f-d512-4258-99ff-cffab11f68d8/" + filename;

console.log("1. Downloading from Supabase...");
const res = await fetch(supabaseUrl);
if (!res.ok) { console.error("Download failed:", res.status); process.exit(1); }
const buf = Buffer.from(await res.arrayBuffer());
console.log("   Downloaded", Math.round(buf.length / 1024), "KB");

console.log("2. Saving locally...");
const localDir = path.join(BLOG_IMG_DIR, slug);
await fs.mkdir(localDir, { recursive: true });
await fs.writeFile(path.join(localDir, filename), buf);
console.log("   Saved to", path.join(localDir, filename));

console.log("3. Uploading to R2...");
const key = "blog/" + slug + "/" + filename;
await R2.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buf, ContentType: "image/jpeg" }));
const r2Url = PUBLIC_URL + "/" + key;
console.log("   Uploaded:", r2Url);

console.log("4. Updating database...");
await sql`UPDATE articles SET image = ${r2Url}, updated_at = NOW() WHERE slug = ${slug}`;
console.log("   Done! DB updated.");

console.log("\n✓ Image fixed. Deploy and revalidate /blog/" + slug);
