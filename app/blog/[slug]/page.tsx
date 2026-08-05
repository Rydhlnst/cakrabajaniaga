import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ClockIcon } from "lucide-react";

import {
  formatDate,
  getAllArticles,
  getArticle,
  getRelatedArticles,
  readingTime,
  resolveArticleImage,
} from "@/lib/articles";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArticleBody } from "@/components/article-body";
import { ArticleCard } from "@/components/article-card";

// ISR: known slugs are prebuilt; unknown slugs (freshly delivered articles)
// render on-demand via dynamicParams, then cache. Refresh every 60s.
export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };
  const articleUrl = `${site.url}/blog/${slug}`;
  return {
    title: article.title,
    description: article.description ?? undefined,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description ?? undefined,
      type: "article",
      url: articleUrl,
      images: article.image ? [resolveArticleImage(article.image) as string] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description ?? undefined,
      images: article.image ? [resolveArticleImage(article.image) as string] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(slug, 3);

  const articleUrl = `${site.url}/blog/${slug}`;
  const articleImage = article.image ? resolveArticleImage(article.image) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.date,
        author: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        mainEntityOfPage: articleUrl,
        image: articleImage,
        url: articleUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${site.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <header className="relative isolate overflow-hidden border-b border-border pt-16">
        {article.image ? (
          <>
            <Image
              src={resolveArticleImage(article.image)}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/65 to-black/85" />
          </>
        ) : (
          <div className="absolute inset-0 -z-10 bg-secondary" />
        )}

        <div className="container-page py-24 text-white sm:py-32">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-white/70 uppercase transition-colors hover:text-brand"
          >
            <ArrowLeftIcon className="size-3.5" />
            The CBN Export Journal
          </Link>
          <h1 className="mt-6 max-w-4xl font-heading text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span>{formatDate(article.date)}</span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="size-4 text-brand" />
              {readingTime(article.markdown)} min read
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {article.description ? (
            <p className="mb-10 border-l-2 border-brand pl-5 font-heading text-xl leading-relaxed text-muted-foreground italic">
              {article.description}
            </p>
          ) : null}

          <ArticleBody markdown={article.markdown} />

          {/* CTA */}
          <div className="mt-14 rounded-xl border border-border bg-secondary/50 p-8 text-center">
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Looking to source premium Indonesian sweet potatoes?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {site.name} supplies export-grade Cilembu, Purple, and Murasaki
              varieties to buyers worldwide.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/#quote" className={cn(buttonVariants({ size: "default" }))}>
                Request a Quote
              </Link>
              <Link
                href="/#products"
                className={cn(buttonVariants({ variant: "outline", size: "default" }))}
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length ? (
        <section className="border-t border-border bg-secondary/40 py-20">
          <div className="container-page">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Continue reading
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="container-page pb-16 pt-8 sm:pb-20 sm:pt-12">
        <div className="border-t border-stone-200 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </article>
  );
}
