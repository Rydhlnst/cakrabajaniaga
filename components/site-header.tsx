"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";

const navLinks = [
  { label: "Products", href: "/#products" },
  { label: "Why Indonesia", href: "/#why" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-hidden border-b border-stone-200/70 bg-stone-50/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[80rem] items-center justify-between gap-2 px-4 py-3 sm:px-5 sm:py-4">
        <Link href="/#top" className="flex shrink-0 items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/site/logo.png" alt="CBN logo" className="h-8 w-auto sm:h-9" />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-base font-semibold tracking-tight text-stone-900">
              Cakra Baja Niaga
            </span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Premium Sweet Potato Export
            </span>
          </span>
        </Link>

        <nav className="hidden shrink-0 items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-stone-600 transition hover:text-stone-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#quote"
            className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            Request a Quote <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center text-stone-900 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-stone-200/70 bg-stone-50 md:hidden">
          <div className="mx-auto flex max-w-[80rem] flex-col px-4 py-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-900"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#quote"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
            >
              Request a Quote <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
