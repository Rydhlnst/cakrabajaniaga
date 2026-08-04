"use client";

import * as React from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container-page flex h-18 items-center justify-between gap-4">
        <BrandLogo />

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle className="hidden sm:inline-flex" />
          <Link
            href="/#quote"
            className={cn(
              buttonVariants({ variant: "brand", size: "sm" }),
              "hidden md:inline-flex"
            )}
          >
            Request a Quote
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Open menu"
                  className="lg:hidden"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[86%] max-w-sm flex-col p-0">
              <SheetHeader className="border-b border-border p-6">
                <SheetTitle className="text-left font-heading text-lg">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-0.5 p-3">
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        className="rounded-sm px-4 py-3 text-sm font-medium text-foreground/90 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    }
                  />
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-4 border-t border-border p-6">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href="/#quote"
                      className={cn(buttonVariants({ variant: "brand" }), "w-full")}
                    >
                      Request a Quote
                    </Link>
                  }
                />
                <div className="flex items-center justify-between">
                  <a
                    href={site.whatsappUrl}
                    className="text-xs text-muted-foreground transition-colors hover:text-brand"
                  >
                    {site.whatsapp}
                  </a>
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
