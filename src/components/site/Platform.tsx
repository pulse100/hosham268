import { ArrowUpLeft, MonitorSmartphone } from "lucide-react";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import { AppleIcon, PlayStoreIcon } from "../ui/BrandIcons";
import { Reveal } from "../ui/Reveal";

export function Platform({ settings, texts: t }: { settings: SiteSettings; texts: Record<string, string> }) {
  const stores = [
    { href: settings.app_store_url, icon: AppleIcon, top: "حمّله من", name: "App Store" },
    { href: settings.google_play_url, icon: PlayStoreIcon, top: "احصل عليه من", name: "Google Play" },
  ].filter((s) => s.href);
  const enter = settings.platform_url;

  return (
    <section id="platform" className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-gradient-to-br from-burgundy via-wine to-ink p-8 md:p-14">
          <div aria-hidden className="letters-bg absolute inset-0 opacity-60" />
          <div aria-hidden className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <p className="eyebrow">{t["platform.eyebrow"]}</p>
              <h2 className="mt-3 text-4xl font-bold text-white md:text-6xl">{settings.platform_name}</h2>
              {settings.platform_description && <p className="mt-4 max-w-lg text-lg leading-8 text-rose/80">{settings.platform_description}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                {enter && (
                  <a href={enter} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <MonitorSmartphone className="h-4 w-4" /> الدخول إلى المنصة <ArrowUpLeft className="h-4 w-4" />
                  </a>
                )}
                {stores.map(({ href, icon: Icon, top, name }) => (
                  <a key={name} href={href!} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-2.5 transition hover:-translate-y-0.5 hover:border-gold/50">
                    <Icon className="h-6 w-6 text-white" />
                    <span className="text-right leading-tight"><span className="block text-[10px] text-rose/60">{top}</span><span className="block text-sm font-semibold text-white" dir="ltr">{name}</span></span>
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal from="scale" delay={0.15} className="relative mx-auto w-full max-w-[300px]">
              {/* إطار هاتف */}
              <div className="relative aspect-[9/18] rounded-[2.6rem] border-[6px] border-black/70 bg-black shadow-2xl shadow-black/60 ring-1 ring-white/10">
                <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
                <div className="relative h-full overflow-hidden rounded-[2.1rem]">
                  <Image src="/images/teacher-platform.webp" alt="" fill sizes="300px" className="object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute inset-x-4 bottom-6 text-center">
                    <p className="font-[family-name:var(--font-ruqaa)] text-3xl text-white">{settings.platform_name}</p>
                    <p className="mt-1 text-xs text-rose/70">اللغة العربية · السادس الإعدادي</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
