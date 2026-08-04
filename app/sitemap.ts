import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const NOW = new Date().toISOString();

/** Static pages with their own routes. */
const staticPages: MetadataRoute.Sitemap = [
  {
    url: site.url,
    lastModified: NOW,
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${site.url}/blog`,
    lastModified: NOW,
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${site.url}/galleries`,
    lastModified: NOW,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${site.url}/privacy`,
    lastModified: NOW,
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    url: `${site.url}/tos`,
    lastModified: NOW,
    changeFrequency: "yearly",
    priority: 0.2,
  },
];

async function getBlogArticlePages(): Promise<MetadataRoute.Sitemap> {
  try {
    const { getAllArticles } = await import("@/lib/articles");
    const articles = await getAllArticles();

    return articles.map((article) => ({
      url: `${site.url}/blog/${article.slug}`,
      lastModified: article.date ?? NOW,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // If DB/JSON read fails, return empty — static pages still get indexed.
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPages = await getBlogArticlePages();
  return [...staticPages, ...blogPages];
}
