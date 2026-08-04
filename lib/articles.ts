import articlesData from "@/content/articles.json";

export type Article = {
  slug: string;
  title: string;
  description: string | null;
  date: string | null;
  image: string | null;
  markdown: string;
};

const articles = articlesData as Article[];

export const PAGE_SIZE = 9;

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getPagedArticles(page: number): {
  items: Article[];
  page: number;
  totalPages: number;
  total: number;
} {
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

export function getRelatedArticles(slug: string, count = 3): Article[] {
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
