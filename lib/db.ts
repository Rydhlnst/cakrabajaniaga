import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export type ArticleRecord = {
  slug: string;
  title: string;
  description: string | null;
  date: string | null;
  image: string | null;
  markdown: string;
  created_at: string;
  updated_at: string;
};

export async function ensureArticlesTable() {
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
}

export async function upsertArticle(article: {
  slug: string;
  title: string;
  description?: string | null;
  date?: string | null;
  image?: string | null;
  markdown?: string;
}) {
  await ensureArticlesTable();

  await sql`
    INSERT INTO articles (slug, title, description, date, image, markdown, updated_at)
    VALUES (
      ${article.slug},
      ${article.title},
      ${article.description ?? null},
      ${article.date ?? null},
      ${article.image ?? null},
      ${article.markdown ?? ""},
      NOW()
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      date = EXCLUDED.date,
      image = EXCLUDED.image,
      markdown = EXCLUDED.markdown,
      updated_at = NOW()
  `;
}

export async function getAllArticlesFromDB(): Promise<ArticleRecord[]> {
  await ensureArticlesTable();

  const rows = await sql<ArticleRecord[]>`
    SELECT slug, title, description, date::text AS date, image, markdown, created_at::text AS created_at, updated_at::text AS updated_at
    FROM articles
    ORDER BY COALESCE(date, created_at) DESC
  `;
  return rows;
}

export async function getArticleFromDB(slug: string): Promise<ArticleRecord | null> {
  await ensureArticlesTable();

  const rows = await sql<ArticleRecord[]>`
    SELECT slug, title, description, date::text AS date, image, markdown, created_at::text AS created_at, updated_at::text AS updated_at
    FROM articles
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export { sql };
