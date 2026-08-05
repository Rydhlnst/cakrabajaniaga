import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDate, readingTime, resolveArticleImage, type Article } from "@/lib/articles";

export function ArticleCard({
  article,
  priority = false,
  className,
}: {
  article: Article;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        "lift group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:border-brand/50 hover:shadow-xl",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {article.image ? (
          <Image
            src={resolveArticleImage(article.image)}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
          <span>{formatDate(article.date)}</span>
          <span className="size-1 rounded-full bg-brand" />
          <span>{readingTime(article.markdown)} min read</span>
        </div>
        <h3 className="mt-3 font-heading text-lg leading-snug font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
          {article.title}
        </h3>
        {article.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {article.description}
          </p>
        ) : null}
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-foreground uppercase">
          Read article
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
