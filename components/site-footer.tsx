import Link from "next/link";
import { LeafIcon } from "lucide-react";

const footerLinks = [
  { label: "Products", href: "/#products" },
  { label: "Why Indonesia", href: "/#why" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact", href: "/#contact" },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-stone-200 bg-stone-100">
      <div className="mx-auto flex max-w-[80rem] flex-col items-start justify-between gap-4 px-4 py-8 text-left sm:items-center sm:gap-6 sm:px-5 sm:py-10 sm:flex-row">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-amber-700 text-amber-50 sm:h-8 sm:w-8">
            <LeafIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="font-display text-sm font-semibold text-stone-900 sm:text-base">
            PT Cakra Baja Niaga
          </span>
        </div>
        <nav className="flex flex-wrap gap-3 text-xs text-stone-600 sm:gap-6 sm:text-sm">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-stone-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-stone-500 sm:text-sm">
          © {new Date().getFullYear()} PT Cakra Baja Niaga. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
