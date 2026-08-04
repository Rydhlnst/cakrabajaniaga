/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ArrowRightIcon,
  AwardIcon,
  CircleCheckIcon,
  EarthIcon,
  FileDownIcon,
  LeafIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
} from "lucide-react";

import {
  buyerTypes,
  process,
  products,
  quoteBenefits,
  site,
  whyPoints,
} from "@/lib/site";
import { QuoteForm } from "@/components/quote-form";

const productImages: Record<string, string> = {
  cilembu: "/site/cilembu.png",
  purple: "/site/purple.png",
  murasaki: "/site/murasaki.png",
};

const whyIcons = [LeafIcon, EarthIcon, ShieldCheckIcon, AwardIcon];
const processIcons = [MapPinIcon, ShieldCheckIcon, TruckIcon, EarthIcon];

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-amber-200">
      {/* ================= HERO ============================================ */}
      <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0">
          <img
            src="/site/hero.png"
            alt="Premium Cilembu sweet potato harvest in West Java"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-950/30" />
        </div>
        <div className="relative mx-auto w-full max-w-[80rem] px-4 py-12 sm:px-5 sm:py-24">
          <div className="animate-rise max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-amber-200 sm:px-4 sm:text-xs">
              <EarthIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Exporting from Indonesia worldwide
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] text-white sm:mt-6 sm:text-5xl lg:text-6xl">
              Premium Indonesian sweet potatoes, sourced for the world&rsquo;s buyers.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-200 sm:mt-6 sm:text-base lg:text-lg">
              PT Cakra Baja Niaga supplies importers, distributors, and retailers across the globe
              with export-grade Cilembu, Purple, and Murasaki sweet potatoes — consistent quality,
              reliable volumes, and full-origin traceability.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="#quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 sm:px-7 sm:py-3.5 sm:text-base"
              >
                Request a Quote <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
              >
                View Catalog
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-5 sm:mt-12 sm:flex sm:flex-wrap sm:gap-x-10 sm:border-0 sm:pt-0">
              {[
                ["40+", "Export markets"],
                ["Grade A", "Export quality"],
                ["Year-round", "Supply capacity"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="font-display text-lg font-semibold text-white sm:text-2xl">
                    {value}
                  </div>
                  <div className="mt-0.5 text-[0.65rem] leading-tight text-stone-300 sm:text-xs lg:text-sm">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BUYER MARQUEE =================================== */}
      <div className="overflow-hidden border-y border-stone-200 bg-amber-700 py-3.5 text-amber-50">
        <div className="flex w-max marquee-track gap-12 whitespace-nowrap pr-12">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-12">
              {buyerTypes.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em]"
                >
                  <LeafIcon className="h-4 w-4" /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS ======================================== */}
      <section id="products" className="mx-auto max-w-[80rem] px-4 py-12 sm:px-5 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 sm:text-sm">
              Product Catalog
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:mt-3 sm:text-2xl lg:text-4xl">
              Three world-class varieties, one trusted supplier
            </h2>
            <p className="mt-3 text-sm text-stone-600 sm:mt-4 sm:text-base lg:text-lg">
              Every shipment is graded, cleaned, and packed to international export standards, with
              documentation buyers can rely on.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-xs font-semibold text-stone-900 shadow-sm transition hover:border-amber-600 hover:text-amber-800 sm:px-6 sm:py-3.5 sm:text-sm"
          >
            <FileDownIcon className="h-4 w-4" /> Download Catalog (PDF)
          </button>
        </div>

        <div className="mt-8 space-y-6 sm:mt-14 sm:space-y-10">
          {products.map((p, i) => (
            <article
              key={p.key}
              className={`grid items-center gap-0 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm sm:gap-8 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="relative h-48 sm:h-72 lg:h-full lg:min-h-[22rem]">
                <img
                  src={productImages[p.key]}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="p-4 sm:p-8 lg:p-10">
                <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-800 sm:px-3 sm:py-1 sm:text-xs">
                  {p.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold sm:mt-4 sm:text-2xl">{p.name}</h3>
                <p className="mt-2 text-sm text-stone-600 sm:mt-3">{p.summary}</p>
                <p className="mt-2 flex gap-2 text-xs text-stone-500 sm:mt-3 sm:text-sm">
                  <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700 sm:h-4 sm:w-4" />
                  {p.origin}
                </p>
                <ul className="mt-4 grid gap-1.5 sm:mt-5 sm:gap-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs font-medium text-stone-700 sm:text-sm"
                    >
                      <CircleCheckIcon className="h-3.5 w-3.5 text-amber-700 sm:h-4 sm:w-4" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#quote"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 sm:mt-7 sm:text-sm"
                >
                  Request pricing for {p.name.split(" ")[0]}{" "}
                  <ArrowRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= WHY (dark) ===================================== */}
      <section id="why" className="relative overflow-hidden bg-stone-900 py-12 text-stone-100 sm:py-24">
        <div className="mx-auto grid max-w-[80rem] items-center gap-8 px-4 sm:px-5 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 sm:text-sm">
              Why Indonesia / Why Cilembu
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:mt-3 sm:text-2xl lg:text-4xl">
              Born from volcanic soil, perfected for export
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-300 sm:mt-5 sm:text-base lg:text-lg">
              Indonesia&rsquo;s equatorial climate and fertile volcanic highlands create ideal
              year-round growing conditions. The village of Cilembu in West Java is world-renowned
              for sweet potatoes whose naturally honeyed flavor cannot be replicated elsewhere.
            </p>
            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5">
              {whyPoints.map((w, i) => {
                const IconEl = whyIcons[i];
                return (
                  <div key={w.title} className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
                    <IconEl className="h-5 w-5 text-amber-400 sm:h-6 sm:w-6" strokeWidth={1.75} />
                    <h3 className="mt-2 font-display text-base font-semibold sm:mt-3 sm:text-lg">{w.title}</h3>
                    <p className="mt-1 text-xs text-stone-400 sm:mt-1.5 sm:text-sm">{w.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <img
              src="/site/terraces.png"
              alt="Terraced sweet potato farms in Cilembu, West Java"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
            />
            <img
              src="/site/packing.png"
              alt="Export packing and grading facility"
              className="absolute -bottom-6 -left-4 hidden w-2/5 rounded-xl border-4 border-stone-900 object-cover shadow-xl sm:block sm:-bottom-8 sm:-left-6"
            />
          </div>
        </div>
      </section>

      {/* ================= PROCESS ========================================= */}
      <section className="mx-auto max-w-[80rem] px-4 py-12 sm:px-5 sm:py-24">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 md:grid-cols-4 md:gap-10">
          {process.map((step, i) => {
            const IconEl = processIcons[i];
            return (
              <div key={step.step} className="relative">
                <span className="font-display text-xs font-semibold text-amber-700 sm:text-sm">
                  {step.step}
                </span>
                <IconEl className="mt-2 h-6 w-6 text-stone-900 sm:mt-3 sm:h-7 sm:w-7" strokeWidth={1.75} />
                <h3 className="mt-2 font-display text-base font-semibold sm:mt-3 sm:text-lg">{step.title}</h3>
                <p className="mt-1 text-xs text-stone-600 sm:mt-1.5 sm:text-sm">{step.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= QUOTE =========================================== */}
      <section id="quote" className="bg-amber-50/60 py-12 sm:py-24">
        <div className="mx-auto grid max-w-[80rem] gap-8 px-4 sm:px-5 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 sm:text-sm">
              Request a Quote
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:mt-3 sm:text-2xl lg:text-4xl">
              Tell us what you need — we&rsquo;ll respond within one business day
            </h2>
            <p className="mt-4 text-sm text-stone-600 sm:mt-5 sm:text-base lg:text-lg">
              Share your requirements and our export team will prepare pricing, specifications, and
              shipping options tailored to your market.
            </p>
            <ul className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
              {quoteBenefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-stone-700 sm:gap-3">
                  <SparklesIcon className="h-4 w-4 text-amber-600 sm:h-5 sm:w-5" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5 lg:p-9">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* ================= ABOUT + CONTACT ================================ */}
      <section id="about" className="mx-auto max-w-[80rem] px-4 py-12 sm:px-5 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 sm:text-sm">
              About Us
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:mt-3 sm:text-2xl lg:text-4xl">
              PT Cakra Baja Niaga
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:mt-5 sm:text-base lg:text-lg">
              We are an Indonesian trading company specializing in the export of premium sweet
              potatoes to international buyers. Working directly with partner farms in West Java, we
              bridge the gap between Indonesia&rsquo;s finest produce and discerning markets
              worldwide.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:mt-4 sm:text-base lg:text-lg">
              Our focus is simple: consistent quality, dependable supply, and transparent
              partnerships that importers, distributors, and retailers can build their business on.
            </p>
          </div>
          <div
            id="contact"
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
          >
            <h3 className="font-display text-xl font-semibold sm:text-2xl">Get in touch</h3>
            <p className="mt-1.5 text-sm text-stone-600 sm:mt-2">Reach our export desk directly.</p>
            <div className="mt-5 space-y-3 sm:mt-7 sm:space-y-4">
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 rounded-xl border border-stone-200 p-3 transition hover:border-amber-300 hover:bg-amber-50/50 sm:gap-4 sm:p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-green-600 text-white sm:h-11 sm:w-11">
                  <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">WhatsApp</span>
                  <span className="text-xs text-stone-600 sm:text-sm">{site.whatsapp}</span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-3 rounded-xl border border-stone-200 p-3 transition hover:border-amber-300 hover:bg-amber-50/50 sm:gap-4 sm:p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-700 text-white sm:h-11 sm:w-11">
                  <MailIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">Email</span>
                  <span className="text-xs text-stone-600 sm:text-sm">{site.email}</span>
                </span>
              </a>
              <div className="flex items-start gap-3 rounded-xl border border-stone-200 p-3 sm:gap-4 sm:p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-stone-900 text-white sm:h-11 sm:w-11">
                  <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">Office</span>
                  <span className="text-xs text-stone-600 sm:text-sm">{site.address}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LEGAL LINKS ===================================== */}
      <div className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-center gap-3 px-4 py-6 sm:gap-6 sm:px-5 sm:py-8">
          <Link href="/tos" className="text-xs text-stone-500 transition hover:text-stone-700 sm:text-sm">
            Terms of Service
          </Link>
          <span className="text-stone-300">|</span>
          <Link href="/privacy" className="text-xs text-stone-500 transition hover:text-stone-700 sm:text-sm">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
