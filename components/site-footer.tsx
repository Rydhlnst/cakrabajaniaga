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
    <footer className="border-t border-stone-200 bg-stone-100">
      <div className="mx-auto flex max-w-[80rem] flex-col items-start justify-between gap-6 px-5 py-10 text-left sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-amber-700 text-amber-50">
            <LeafIcon className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-semibold text-stone-900">
            PT Cakra Baja Niaga
          </span>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-stone-600">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-stone-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-stone-500">
          © {new Date().getFullYear()} PT Cakra Baja Niaga. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
