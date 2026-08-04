// scripts/init-neondb.mjs
// Creates the articles table in NeonDB and seeds it with existing articles.json data.
// Run: node scripts/init-neondb.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "..", ".env.local") });

const sql = neon(process.env.DATABASE_URL);

async function main() {
  console.log("→ Creating articles table...");
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      date TIMESTAMPTZ,
      image TEXT,
      markdown TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log("  ✓ Table ready");

  // Check if already seeded
  const existing = await sql`SELECT COUNT(*)::int AS count FROM articles`;
  if (existing[0].count > 0) {
    console.log(`\n  Table already has ${existing[0].count} articles. Skipping seed.`);
    console.log("  (Delete rows or drop table to re-seed)");
    return;
  }

  console.log("\n→ Seeding from articles.json...");
  const raw = await fs.readFile(path.join(process.cwd(), "content", "articles.json"), "utf8");
  const articles = JSON.parse(raw);

  let inserted = 0;
  for (const a of articles) {
    try {
      await sql`
        INSERT INTO articles (slug, title, description, date, image, markdown, updated_at)
        VALUES (
          ${a.slug},
          ${a.title},
          ${a.description ?? null},
          ${a.date ?? null},
          ${a.image ?? null},
          ${a.markdown ?? ""},
          NOW()
        )
        ON CONFLICT (slug) DO NOTHING
      `;
      inserted++;
    } catch (err) {
      console.warn(`  ! Failed: ${a.slug} — ${err.message}`);
    }
  }

  console.log(`\n✓ Done — ${inserted}/${articles.length} articles inserted into NeonDB`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
