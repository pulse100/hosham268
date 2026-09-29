import Link from "next/link";
import type { SiteData } from "@/lib/types";
import { formatPhone, telHref } from "@/lib/utils";
import { PlatformIcon } from "../ui/BrandIcons";
import { NAV } from "./nav";

export function Footer({ data }: { data: SiteData }) {
  const { settings, social } = data;
  const phones = [settings.phone_primary, settings.phone_secondary].filter(Boolean) as string[];
  return (
    <footer className="relative mt-10 border-t border-line/10 bg-ink/70">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/50 to-transparent" />
      <div className="container grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-[family-name:var(--font-ruqaa)] text-4xl text-gradient">{settings.teacher_name}</p>
          <p className="mt-2 text-rose/70">{settings.subtitle}</p>
          {settings.tagline && <p className="mt-6 max-w-sm leading-7 text-rose/50">{settings.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {social.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-line/10 bg-white/[.03] text-rose/80 transition hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold"
              >
                <PlatformIcon platform={s.platform} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="روابط الموقع" className="md:col-span-4">
          <p className="mb-4 text-sm font-semibold text-white">روابط سريعة</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-rose/60 transition hover:text-gold">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="mb-4 text-sm font-semibold text-white">التواصل</p>
          <ul className="grid gap-3 text-sm">
            {phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} dir="ltr" className="text-rose/70 transition hover:text-gold">{formatPhone(p)}</a>
              </li>
            ))}
            <li className="text-rose/50">بغداد — العراق</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/5">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-rose/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {settings.teacher_name}. جميع الحقوق محفوظة.</p>
          <p>{settings.subtitle}</p>
        </div>
      </div>
    </footer>
  );
}
