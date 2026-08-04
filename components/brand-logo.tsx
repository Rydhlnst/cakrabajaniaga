import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function BrandLogo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label={`${site.name} — home`}
    >
      <span className="relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white">
        <Image
          src="/assets/logo.png"
          alt={`${site.name} logo`}
          width={40}
          height={40}
          className="size-9 object-contain"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-base font-semibold tracking-tight",
            invert ? "text-white" : "text-foreground"
          )}
        >
          Cakra Baja Niaga
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-medium tracking-[0.2em] uppercase",
            invert ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
