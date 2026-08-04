import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function href(page: number) {
  return page <= 1 ? "/blog" : `/blog?page=${page}`;
}

/** Build a compact page list with ellipses, e.g. 1 … 4 5 6 … 10 */
function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

export function BlogPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const items = pageList(page, totalPages);
  const atStart = page === 1;
  const atEnd = page === totalPages;

  return (
    <nav
      aria-label="pagination"
      className="mt-16 flex items-center justify-center gap-1.5"
    >
      <Link
        href={href(Math.max(1, page - 1))}
        aria-label="Go to previous page"
        aria-disabled={atStart}
        tabIndex={atStart ? -1 : undefined}
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "gap-1 pl-3",
          atStart && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeftIcon className="size-4" />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      {items.map((it, i) =>
        it === "…" ? (
          <span
            key={`e${i}`}
            className="flex size-10 items-center justify-center text-sm text-muted-foreground"
            aria-hidden
          >
            …
          </span>
        ) : (
          <Link
            key={it}
            href={href(it)}
            aria-current={it === page ? "page" : undefined}
            className={cn(
              buttonVariants({
                variant: it === page ? "default" : "ghost",
                size: "icon",
              })
            )}
          >
            {it}
          </Link>
        )
      )}

      <Link
        href={href(Math.min(totalPages, page + 1))}
        aria-label="Go to next page"
        aria-disabled={atEnd}
        tabIndex={atEnd ? -1 : undefined}
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "gap-1 pr-3",
          atEnd && "pointer-events-none opacity-40"
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRightIcon className="size-4" />
      </Link>
    </nav>
  );
}
