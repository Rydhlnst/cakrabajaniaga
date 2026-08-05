import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { formatDate, getPagedArticles, readingTime } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
import { BlogPagination } from "@/components/blog-pagination";

// ISR: serve cached, regenerate at most every 60s. The rankpill webhook also
// calls revalidatePath("/blog") for near-instant refresh on new deliveries.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "The CBN Export Journal",
  description:
    "Market updates and export know-how from Indonesia's sweet potato trade — varieties, nutrition, sourcing, and buyer guides.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number.parseInt(params.page ?? "1", 10) || 1;
  const { items, page: current, totalPages, total } = await getPagedArticles(page);

  // On page 1, spotlight the newest article above the grid.
  const isFirstPage = current === 1;
  const featured = isFirstPage ? items[0] : null;
  const gridItems = isFirstPage ? items.slice(1) : items;

  return (
    <>
      {/* Header band */}
      <section className="border-b border-border bg-secondary/40 pt-16">
        <div className="container-page py-20 sm:py-24">
          <p className="eyebrow">Insights &amp; News</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            The CBN Export Journal
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Stories, market updates, and know-how from Indonesia&rsquo;s sweet potato
            export trade — published straight from our editorial partner.
          </p>
          <p className="mt-6 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {total} articles · Page {current} of {totalPages}
          </p>
        </div>
      </section>

      <div className="container-page py-16 sm:py-20">
        {/* Featured */}
        {featured ? (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-14 grid overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-brand/50 hover:shadow-xl lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              ) : null}
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <div className="flex items-center gap-3 text-[0.7rem] font-medium tracking-widest text-muted-foreground uppercase">
                <span className="rounded-full bg-brand/15 px-2.5 py-1 text-brand">Latest</span>
                <span>{formatDate(featured.date)}</span>
                <span className="size-1 rounded-full bg-brand" />
                <span>{readingTime(featured.markdown)} min read</span>
              </div>
              <h2 className="mt-5 font-heading text-2xl leading-tight font-semibold tracking-tight text-balance transition-colors group-hover:text-brand sm:text-3xl">
                {featured.title}
              </h2>
              {featured.description ? (
                <p className="mt-4 line-clamp-3 leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
              ) : null}
              <span className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-foreground uppercase">
                Read article
                <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ) : null}

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridItems.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>

        <BlogPagination page={current} totalPages={totalPages} />

        <div className="mt-12 border-t border-stone-200 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
