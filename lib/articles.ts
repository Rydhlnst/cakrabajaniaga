import { cache } from "react";

import type { ArticleRecord } from "@/lib/db";

export type Article = {
  slug: string;
  title: string;
  description: string | null;
  date: string | null;
  image: string | null;
  markdown: string;
};

export const PAGE_SIZE = 9;

/**
 * Load articles from NeonDB. Falls back to content/articles.json when
 * DATABASE_URL is not set or when NeonDB fails.
 */
async function loadArticles(): Promise<Article[]> {
  // Try NeonDB first
  if (process.env.DATABASE_URL) {
    try {
      const { getAllArticlesFromDB } = await import("@/lib/db");
      const rows = await getAllArticlesFromDB();
      if (rows.length > 0) return rows.map(rowToArticle);
    } catch (err) {
      console.warn("[articles] NeonDB failed, falling back to articles.json:", err);
    }
  }

  // Fallback: read from local JSON file
  try {
    const articlesData = await import("@/content/articles.json");
    return (articlesData as unknown as Article[]).map((a) => ({
      slug: a.slug,
      title: a.title,
      description: a.description ?? null,
      date: a.date ?? null,
      image: a.image ?? null,
      markdown: a.markdown,
    }));
  } catch {
    return [];
  }
}

/**
 * Per-render memoization via React `cache()`. This dedupes repeated calls
 * within a single request/render (e.g. list + pagination in one page), but —
 * unlike a module-level singleton — is NOT shared across requests or warm
 * serverless invocations. Each ISR regeneration therefore reads fresh rows
 * from NeonDB, so newly delivered articles show up instead of a stale list.
 */
const getArticles = cache(loadArticles);

export async function getAllArticles(): Promise<Article[]> {
  return getArticles();
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug);
}

export async function getPagedArticles(page: number): Promise<{
  items: Article[];
  page: number;
  totalPages: number;
  total: number;
}> {
  const articles = await getArticles();
  const total = articles.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * PAGE_SIZE;
  return {
    items: articles.slice(start, start + PAGE_SIZE),
    page: current,
    totalPages,
    total,
  };
}

export async function getRelatedArticles(slug: string, count = 3): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter((a) => a.slug !== slug).slice(0, count);
}

export function formatDate(date: string | null): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Rough reading time from markdown length. */
export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function toIsoDate(value: string | null): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function rowToArticle(row: ArticleRecord): Article {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description ?? null,
    date: toIsoDate(row.date),
    image: row.image ?? null,
    markdown: row.markdown,
  };
}
