import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { footerNav, site, socials } from "@/lib/site";
import { Icon, type IconName } from "@/components/icon";

export function SiteFooter() {
  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <span className="relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white">
              <Image
                src="/assets/logo.png"
                alt={`${site.name} logo`}
                width={40}
                height={40}
                className="size-9 object-contain"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-base font-semibold tracking-tight">
                Cakra Baja Niaga
              </span>
              <span className="mt-1 text-[0.62rem] font-medium tracking-[0.2em] text-surface-dark-foreground/55 uppercase">
                {site.tagline}
              </span>
            </span>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-surface-dark-foreground/60">
            {site.description}
          </p>

          <div className="mt-7 flex items-center gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex size-9 items-center justify-center rounded-sm border border-white/10 text-surface-dark-foreground/70 transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
              >
                <Icon name={s.icon as IconName} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerNav.map((col) => (
          <div key={col.title}>
            <h3 className="text-[0.7rem] font-semibold tracking-[0.2em] text-surface-dark-foreground/45 uppercase">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-surface-dark-foreground/70 transition-colors hover:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact strip */}
      <div className="border-t border-white/10">
        <div className="container-page grid gap-4 py-8 text-sm sm:grid-cols-3">
          <a
            href={site.whatsappUrl}
            className="flex items-start gap-3 text-surface-dark-foreground/75 transition-colors hover:text-brand"
          >
            <PhoneIcon className="mt-0.5 size-4 shrink-0 text-brand" />
            WhatsApp {site.whatsapp}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-start gap-3 text-surface-dark-foreground/75 transition-colors hover:text-brand"
          >
            <MailIcon className="mt-0.5 size-4 shrink-0 text-brand" />
            {site.email}
          </a>
          <span className="flex items-start gap-3 text-surface-dark-foreground/60">
            <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brand" />
            <span className="leading-relaxed">{site.address}</span>
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-surface-dark-foreground/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Premium Indonesian sweet potatoes · Cilembu · Purple · Murasaki</p>
        </div>
      </div>
    </footer>
  );
}
