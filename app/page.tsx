import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  InfoIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SproutIcon,
} from "lucide-react";

import {
  advantages,
  buyerTypes,
  faqs,
  originCards,
  productSpec,
  products,
  qualitySteps,
  quoteBenefits,
  site,
  stats,
} from "@/lib/site";
import { getAllArticles } from "@/lib/articles";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icon, type IconName } from "@/components/icon";
import { QuoteForm } from "@/components/quote-form";
import { ArticleCard } from "@/components/article-card";

export default function Home() {
  const latest = getAllArticles().slice(0, 3);

  return (
    <>
      {/* ================= HERO + ABOUT (continuous dark block) ============= */}
      <div className="bg-surface-dark text-surface-dark-foreground">
        {/* ---- Hero -------------------------------------------------------- */}
        <section id="top" className="relative isolate overflow-hidden">
          <Image
            src="/assets/hero-harvest.png"
            alt="Premium Cilembu sweet potato harvest in West Java"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-dark/85 via-surface-dark/60 to-surface-dark" />

          <div className="container-page flex min-h-[88vh] flex-col justify-center py-32">
            <p className="animate-rise eyebrow">
              <SproutIcon className="size-4" />
              Exporting from Indonesia worldwide
            </p>
            <h1 className="animate-rise mt-6 max-w-4xl font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Premium Indonesian sweet potatoes for international markets
            </h1>
            <p className="animate-rise mt-7 max-w-2xl text-base leading-relaxed text-surface-dark-foreground/75 sm:text-lg">
              {site.name} supplies importers, distributors, and retailers across
              the globe with export-grade Cilembu, Purple, and Murasaki sweet
              potatoes — consistent quality, reliable volumes, and full-origin
              traceability.
            </p>
            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/#quote" className={cn(buttonVariants({ variant: "brand", size: "lg" }))}>
                Request a Sample
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
              <Link
                href="/#products"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                )}
              >
                Get Export Catalogue
              </Link>
            </div>
          </div>
        </section>

        {/* ---- About ------------------------------------------------------- */}
        <section id="about" className="scroll-mt-24 border-t border-white/10">
          <div className="container-page grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-white/10">
              <Image
                src="/assets/farm-terraces.png"
                alt="Sweet potato farmer inspecting the harvest in West Java"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">About {site.shortName}</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                From West Java to the global market
              </h2>
              <p className="mt-6 leading-relaxed text-surface-dark-foreground/70">
                {site.name} is an Indonesian trading company specializing in
                export-grade sweet potatoes sourced from selected farms in West
                Java. We work closely with local farmers to ensure traceability,
                quality consistency, and produce that meets international export
                standards.
              </p>
              <p className="mt-4 leading-relaxed text-surface-dark-foreground/70">
                Our focus is not only on volume, but on delivering reliable
                quality for long-term partnerships that importers, distributors,
                and retailers can build their business on.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {["Direct farm sourcing", "Full traceability", "Export-ready docs"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-surface-dark-foreground/85">
                    <CheckIcon className="size-4 text-brand" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= STATS ============================================ */}
      <section className="border-b border-border">
        <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4">
          {stats.map((s) => {
            const plus = s.value.endsWith("+");
            const num = plus ? s.value.slice(0, -1) : s.value;
            return (
              <div key={s.label} className="text-center lg:text-left">
                <p className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                  {num}
                  {plus && <span className="text-brand">+</span>}
                </p>
                <p className="mt-2 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= TRUSTED STRIP =================================== */}
      <section className="border-b border-border bg-secondary/50 py-8">
        <div className="container-page">
          <p className="text-center text-[0.7rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-left">
            Trusted by buyers across the sweet potato supply chain
          </p>
        </div>
        <div className="marquee-mask mt-6 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-12 pr-12">
            {[...buyerTypes, ...buyerTypes, ...buyerTypes, ...buyerTypes].map((t, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-3 text-sm font-medium tracking-wide text-muted-foreground/80 uppercase"
              >
                <span className="size-1.5 rounded-full bg-brand" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ORIGIN & TERROIR =============================== */}
      <section id="origin" className="section-y scroll-mt-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Origin &amp; Terroir</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              West Java Cilembu, born from volcanic highlands
            </h2>
            <p className="mt-4 text-muted-foreground">
              The village of Cilembu is world-renowned for sweet potatoes whose
              naturally honeyed flavor cannot be replicated elsewhere.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {originCards.map((c) => (
              <article
                key={c.title}
                className="lift group relative overflow-hidden rounded-xl border border-border"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-surface-dark-foreground">
                  <span className="inline-flex size-10 items-center justify-center rounded-sm bg-brand text-brand-foreground">
                    <Icon name={c.icon as IconName} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-surface-dark-foreground/75">
                    {c.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS / VARIETIES =========================== */}
      <section id="products" className="section-y scroll-mt-24 border-y border-border bg-secondary/40">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Product Catalog</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Three world-class varieties, one trusted supplier
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every shipment is graded, cleaned, and packed to international
                export standards, with documentation buyers can rely on.
              </p>
            </div>
            <Link
              href="/#quote"
              className={cn(buttonVariants({ variant: "outline" }), "shrink-0")}
            >
              <DownloadIcon data-icon="inline-start" />
              Download Catalog
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {products.map((p, i) => (
              <article
                key={p.key}
                className="lift group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={i === 0}
                  />
                  <span className="absolute top-4 left-4 rounded-sm bg-surface-dark/60 px-3 py-1 text-[0.65rem] font-semibold tracking-widest text-white uppercase backdrop-blur-sm">
                    {p.eyebrow}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-heading text-xl font-semibold tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckIcon className="size-4 shrink-0 text-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#quote"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-foreground uppercase transition-colors group-hover:text-brand"
                  >
                    Request pricing
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCT SPECIFICATION ========================== */}
      <section id="specification" className="section-y scroll-mt-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <Image
              src={productSpec.image}
              alt={productSpec.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">{productSpec.eyebrow}</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {productSpec.name}
            </h2>

            <dl className="mt-8 divide-y divide-border border-y border-border">
              {productSpec.rows.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-sm text-muted-foreground">{r.label}</dt>
                  <dd className="text-right text-sm font-medium">{r.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3">
              <InfoIcon className="mt-0.5 size-4 shrink-0 text-brand" />
              <p className="text-sm text-muted-foreground">{productSpec.note}</p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/#quote" className={cn(buttonVariants({ variant: "brand" }))}>
                Request a Sample
              </Link>
              <Link href="/#contact" className={cn(buttonVariants({ variant: "outline" }))}>
                Contact Export Desk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUALITY CONTROL ================================ */}
      <section id="quality" className="section-y scroll-mt-24 border-y border-border bg-secondary/40">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Quality Control</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Consistent quality, every shipment
            </h2>
            <p className="mt-4 text-muted-foreground">
              From selection to packing, each step is controlled so every carton
              meets the same export standard.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-rows:13rem]">
            {qualitySteps.map((q, i) => (
              <article
                key={q.title}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-border",
                  i === 0 && "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2",
                  i !== 0 && "min-h-52"
                )}
              >
                <Image
                  src={q.image}
                  alt={q.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className={cn(
                    "absolute inset-0",
                    i === 1
                      ? "bg-gradient-to-t from-brand via-brand/55 to-brand/10"
                      : "bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent"
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-6",
                    i === 1 ? "text-brand-foreground" : "text-surface-dark-foreground"
                  )}
                >
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {q.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1.5 text-sm leading-relaxed",
                      i === 1 ? "text-brand-foreground/80" : "text-surface-dark-foreground/75"
                    )}
                  >
                    {q.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ========================================= */}
      <section id="why" className="section-y scroll-mt-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Why {site.shortName}</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Your trusted sweet potato export partner
            </h2>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a) => (
              <div key={a.title} className="group">
                <span className="inline-flex size-11 items-center justify-center rounded-sm border border-border bg-secondary/60 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground">
                  <Icon name={a.icon as IconName} className="size-5" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOG TEASER ==================================== */}
      <section className="section-y border-y border-border bg-secondary/40">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Insights &amp; News</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                The CBN Export Journal
              </h2>
              <p className="mt-4 text-muted-foreground">
                Market updates and know-how from Indonesia&rsquo;s sweet potato
                export trade.
              </p>
            </div>
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "outline" }), "hidden shrink-0 sm:inline-flex")}
            >
              All articles
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((a, i) => (
              <ArticleCard key={a.slug} article={a} priority={i === 0} />
            ))}
          </div>
          <div className="mt-10 sm:hidden">
            <Link href="/blog" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              All articles
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FAQ ============================================ */}
      <section id="faq" className="section-y scroll-mt-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have more questions? Our team is ready to assist you.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-brand uppercase"
            >
              Contact us
              <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>

          <Accordion className="border-t border-border">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="font-heading text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ================= QUOTE + CONTACT (dark) ========================= */}
      <section
        id="quote"
        className="scroll-mt-24 bg-surface-dark text-surface-dark-foreground"
      >
        <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Request a Quote</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Tell us what you need — we&rsquo;ll respond within one business day
            </h2>
            <p className="mt-4 text-surface-dark-foreground/70">
              Share your requirements and our export team will prepare pricing,
              specifications, and shipping options tailored to your market.
            </p>
            <ul className="mt-8 space-y-3.5">
              {quoteBenefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-surface-dark-foreground/85">
                  <CheckIcon className="size-4 shrink-0 text-brand" />
                  {b}
                </li>
              ))}
            </ul>
            <div
              id="contact"
              className="mt-10 flex scroll-mt-24 flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:flex-wrap sm:gap-6"
            >
              <a href={site.whatsappUrl} className="flex items-center gap-2 text-surface-dark-foreground/80 transition-colors hover:text-brand">
                <PhoneIcon className="size-4 text-brand" />
                {site.whatsapp}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-surface-dark-foreground/80 transition-colors hover:text-brand">
                <MailIcon className="size-4 text-brand" />
                {site.email}
              </a>
              <span className="flex items-start gap-2 text-surface-dark-foreground/60">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                <span className="max-w-xs leading-relaxed">{site.address}</span>
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm sm:p-9">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ===================================== */}
      <section className="bg-brand text-brand-foreground">
        <div className="container-page flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center md:py-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Start your sweet potato sourcing with us
            </h2>
            <p className="mt-3 text-brand-foreground/80">
              Looking for a reliable supplier from Indonesia? Contact us today to
              request samples, pricing, or our export catalogue.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-surface-dark text-surface-dark-foreground hover:bg-surface-dark/85"
              )}
            >
              Contact Us
            </Link>
            <Link
              href="/#quote"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-brand-foreground/30 text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
              )}
            >
              Request a Sample
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
