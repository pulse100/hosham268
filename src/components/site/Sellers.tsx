"use client";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Navigation, Phone, Search, Store, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import type { Seller } from "@/lib/types";
import { cn, formatPhone, telHref, whatsappHref } from "@/lib/utils";
import { TelegramIcon } from "../ui/BrandIcons";
import { EmptyState } from "../ui/EmptyState";

const ALL = "الكل";
const OTHER = "غير محددة";

/** قائمة الوكلاء وأماكن بيع الملزمة مع فلترة حسب المحافظة وبحث */
export function Sellers({ sellers }: { sellers: Seller[] }) {
  const [gov, setGov] = useState(ALL);
  const [q, setQ] = useState("");

  const governorates = useMemo(() => {
    const counts = new Map<string, number>();
    sellers.forEach((s) => counts.set(s.governorate || OTHER, (counts.get(s.governorate || OTHER) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => (a[0] === OTHER ? 1 : b[0] === OTHER ? -1 : b[1] - a[1]));
  }, [sellers]);

  const list = useMemo(() => {
    const term = q.trim();
    return sellers.filter((s) => {
      if (gov !== ALL && (s.governorate || OTHER) !== gov) return false;
      if (!term) return true;
      return [s.name, s.governorate, s.area, s.address, s.books, s.notes].some((v) => v?.includes(term));
    });
  }, [sellers, gov, q]);

  if (!sellers.length)
    return <EmptyState icon={Store} title="ستُضاف أماكن البيع قريباً" text="للاستفسار عن الملزمة تواصل معنا عبر أرقام التواصل." />;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative md:w-72">
          <span className="sr-only">ابحث عن وكيل</span>
          <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-rose/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث باسم المكتبة أو المنطقة…" className="field pr-11" />
        </label>
        {governorates.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="tablist" aria-label="المحافظات">
            {[[ALL, sellers.length] as [string, number], ...governorates].map(([g, n]) => (
              <button
                key={g}
                type="button"
                role="tab"
                aria-selected={gov === g}
                onClick={() => setGov(g)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm transition",
                  gov === g ? "border-gold/60 bg-gold text-ink" : "border-line/10 bg-white/[.03] text-rose/70 hover:border-gold/40",
                )}
              >
                {g} <span className="opacity-60">({n})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {!list.length ? (
        <p className="glass p-8 text-center text-rose/55">لا توجد نتائج مطابقة.</p>
      ) : (
        <motion.ul layout className="auto-grid">
          <AnimatePresence mode="popLayout">
            {list.map((s, i) => (
              <motion.li
                key={s.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 8) * 0.04 } }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="glass card-hover flex flex-col p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold"><Store className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white">{s.name}</h3>
                    <p className="mt-0.5 text-xs text-gold">{[s.governorate, s.area].filter(Boolean).join(" — ") || "المحافظة غير محددة"}</p>
                  </div>
                  {s.delivery && <span className="chip shrink-0 !text-emerald-300"><Truck className="h-3.5 w-3.5" /> توصيل</span>}
                </div>
                {s.address && <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-rose/70"><MapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-gold/70" />{s.address}</p>}
                {s.books && <p className="mt-2 text-xs leading-5 text-rose/50">المتوفر: {s.books}</p>}
                {s.notes && <p className="mt-2 text-xs leading-5 text-rose/40">{s.notes}</p>}
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {[s.phone, s.phone2].filter(Boolean).map((p) => (
                    <a key={p} href={telHref(p!)} className="btn-primary !px-3.5 !py-2 text-xs" dir="ltr"><Phone className="h-3.5 w-3.5" /> {formatPhone(p!)}</a>
                  ))}
                  {s.whatsapp && <a href={whatsappHref(s.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3.5 !py-2 text-xs">WhatsApp</a>}
                  {s.telegram_url && <a href={s.telegram_url} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3.5 !py-2 text-xs"><TelegramIcon className="h-3.5 w-3.5" /> Telegram</a>}
                  {s.map_url && <a href={s.map_url} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3.5 !py-2 text-xs"><Navigation className="h-3.5 w-3.5" /> الموقع</a>}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
