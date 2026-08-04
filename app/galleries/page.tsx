import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, PlayCircleIcon } from "lucide-react";

import { galleryVideos, sizingImages, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Galleries",
  description:
    "A closer look at our sweet potato varieties, farms, and export operations — captured on video and in photographs.",
};

export default function GalleriesPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40 pt-16">
        <div className="container-page py-20 sm:py-24">
          <p className="eyebrow">Media &amp; Visuals</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Galleries
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            A closer look at our sweet potato varieties, farms, and export operations —
            captured on video and in photographs.
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex items-center gap-3">
          <PlayCircleIcon className="size-5 text-brand" />
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Video Highlights
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryVideos.map((v) => (
            <figure
              key={v.id}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                  title={v.caption}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              </div>
              <figcaption className="p-5">
                <h3 className="font-heading text-base font-semibold tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Sizing */}
      <section className="border-t border-border bg-secondary/40 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Product Sizing &amp; Varieties
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Our premium sweet potato varieties are available in multiple sizes, from
            80g to 500g per unit.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {sizingImages.map((s) => (
              <figure
                key={s.title}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <Image
                    src={s.image}
                    alt={`${s.title} in various sizes: 80g to 500g`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-6">
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

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
    </>
  );
}
