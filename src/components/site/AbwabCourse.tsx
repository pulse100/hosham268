import { CheckCircle2, Gift, Laptop, MessageCircle, Package, Sparkles } from "lucide-react";
import Image from "next/image";
import type { Seller } from "@/lib/types";
import { formatPhone, whatsappHref } from "@/lib/utils";
import { TelegramIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";
import { Sellers } from "./Sellers";

const lines = (v?: string) => (v ?? "").split("\n").map((l) => l.trim()).filter(Boolean);

/**
 * الدورة الإلكترونية على منصة أبواب: التفاصيل، أنواع الاشتراك، بوكس الأوائل، والوكلاء بالبحث.
 * كل النصوص من «نصوص الموقع» والوكلاء من «وكلاء منصة أبواب» في لوحة الإدارة.
 */
export function AbwabCourse({ texts: t, agents }: { texts: Record<string, string>; agents: Seller[] }) {
  const features = lines(t["abwab.features"]);
  const plans = lines(t["abwab.plans"]).map((l) => {
    const [price, ...rest] = l.split("|");
    return rest.length ? { price: price.trim(), text: rest.join("|").trim() } : { price: "", text: price.trim() };
  });
  const box = lines(t["abwab.box"]);
  const wa = t["abwab.whatsapp"]?.trim();
  const tg = t["abwab.telegram"]?.trim().replace(/^@/, "");

  return (
    <section id="abwab" className="section overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-burgundy/15 to-transparent" />
      <div className="container relative">
        <SectionHeading eyebrow={t["abwab.eyebrow"]} title={t["abwab.title"]} description={t["abwab.desc"]} />

        <div className="grid gap-6 lg:grid-cols-2">
          {features.length > 0 && (
            <div className="glass flex flex-col p-6 md:p-8">
              <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-bold text-white"><Laptop className="h-5 w-5 text-gold" /> {t["abwab.features_title"]}</h3>
              <ul className="grid gap-4">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 leading-7 text-rose/80"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />{f}</li>
                ))}
              </ul>
              {t["abwab.tagline"] && (
                <p className="mt-6 flex items-center gap-2 rounded-2xl bg-gold/10 px-4 py-3 font-semibold text-gold ring-1 ring-gold/25">
                  <Sparkles className="h-4 w-4 shrink-0" /> {t["abwab.tagline"]}
                </p>
              )}
            </div>
          )}

          {plans.length > 0 && (
            <div className="glass p-6 md:p-8">
              <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-bold text-white"><Package className="h-5 w-5 text-gold" /> {t["abwab.plans_title"]}</h3>
              <ul className="grid gap-3">
                {plans.map((p) => (
                  <li key={p.text} className="flex items-center gap-4 rounded-2xl border border-line/10 bg-white/[.03] p-3">
                    {p.price && <span className="shrink-0 rounded-xl bg-gradient-to-l from-gold to-[#e0ad83] px-3 py-2 text-center font-display text-lg font-bold leading-none text-ink">{p.price}</span>}
                    <span className="text-sm leading-6 text-rose/80">{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {box.length > 0 && (
          <div className="glass mt-6 grid items-center gap-6 overflow-hidden p-6 md:grid-cols-[1fr_1.2fr] md:p-8">
            <div className="relative aspect-[790/470] overflow-hidden rounded-2xl bg-white/5">
              <Image src="/images/abwab-box.webp" alt={t["abwab.box_title"]} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
            </div>
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-white"><Gift className="h-5 w-5 text-gold" /> {t["abwab.box_title"]}</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {box.map((b) => (
                  <li key={b} className="flex items-center gap-2 rounded-xl bg-white/[.04] px-3 py-2 text-sm text-rose/80"><CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />{b}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {(wa || tg) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-rose/60">{t["abwab.contact_label"]}</span>
            {wa && <a href={whatsappHref(wa)} target="_blank" rel="noopener noreferrer" className="btn-primary" dir="ltr"><MessageCircle className="h-4 w-4" /> {formatPhone(wa)}</a>}
            {tg && <a href={`https://t.me/${tg}`} target="_blank" rel="noopener noreferrer" className="btn-ghost" dir="ltr"><TelegramIcon className="h-4 w-4" /> @{tg}</a>}
          </div>
        )}

        <div id="abwab-agents" className="mt-16 scroll-mt-28">
          <SectionHeading eyebrow={t["abwab.agents_eyebrow"]} title={t["abwab.agents_title"]} description={t["abwab.agents_desc"]} />
          <Sellers sellers={agents} kind="platform" openLabel="اعرض وكلاء منصة أبواب" />
        </div>
      </div>
    </section>
  );
}
