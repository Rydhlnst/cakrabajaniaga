#!/usr/bin/env node
// scripts/delete-article.mjs — Delete an article from NeonDB and revalidate sitemap.
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
const sql = neon(process.env.DATABASE_URL);

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/delete-article.mjs <slug>");
  process.exit(1);
}

console.log("1. Deleting from DB:", slug);
await sql`DELETE FROM articles WHERE slug = ${slug}`;
console.log("   Done.");

// Revalidate sitemap + blog page on the live site
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cakrabajaniaga.com";
const revalidationSecret = process.env.REVALIDATION_SECRET || "";

console.log("2. Revalidating sitemap...");
try {
  const params = new URLSearchParams({ path: "/sitemap.xml" });
  if (revalidationSecret) params.set("secret", revalidationSecret);
  const res = await fetch(`${siteUrl}/api/revalidate?${params}`, { method: "POST" });
  const data = await res.json();
  console.log("   ", data);
} catch (err) {
  console.warn("   Revalidation failed (will auto-revalidate on next ISR cycle):", err.message);
}

console.log("\n✓ Done.");
