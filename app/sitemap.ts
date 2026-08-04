import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllArticles } from "@/lib/articles";

const NOW = new Date().toISOString();

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const articles = await getAllArticles();
    blogPages = articles.map((article) => {
      const lastmod = article.date ? new Date(article.date).toISOString() : NOW;
      return {
        url: `${site.url}/blog/${article.slug}`,
        lastModified: lastmod,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    });
  } catch (err) {
    console.error("[sitemap] Failed to load articles:", err);
  }
  return [...staticPages, ...blogPages];
}
