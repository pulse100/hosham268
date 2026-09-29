"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, MapPin, Navigation, Phone, Search, Store, Truck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CITY_TO_GOV, GOV_TOKENS, normalizeAr, STOP_WORDS, stripAl } from "@/lib/arabic";
import type { Seller } from "@/lib/types";
import { cn, formatPhone, telHref, whatsappHref } from "@/lib/utils";
import { TelegramIcon } from "../ui/BrandIcons";
import { EmptyState } from "../ui/EmptyState";

const AGENTS_URL = "https://dar-almaghrib.com/agents.php";

type Indexed = { s: Seller; gov: string; place: string; all: string };

const tokensOf = (q: string) =>
  normalizeAr(q).split(" ").filter((t) => t && !STOP_WORDS.has(t)).map(stripAl).filter((t) => t.length > 1);

/**
 * بحث ذكي عن أماكن بيع الملزمة:
 * يكتب الطالب «بغداد البنوك» أو «البنوك» أو «الحلة» فتظهر المكاتب مباشرة،
 * وإذا ما موجود مكتب بالمنطقة نفسها تظهر مكاتب نفس المحافظة ثم مكاتب التوصيل.
 */
export function Sellers({ sellers, kind = "books" }: { sellers: Seller[]; kind?: "books" | "platform" }) {
  const one = kind === "books" ? "مكان بيع" : "وكيل";
  const many = kind === "books" ? "أماكن بيع" : "وكلاء";
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 12;

  const index: Indexed[] = useMemo(
    () => sellers.map((s) => {
      const gov = normalizeAr(s.governorate ?? "");
      const place = normalizeAr([s.area, s.address].filter(Boolean).join(" "));
      const all = normalizeAr([s.name, s.governorate, s.area, s.address, s.books, s.notes].filter(Boolean).join(" "));
      return { s, gov, place, all };
    }),
    [sellers],
  );

  // اقتراحات: المحافظات والمناطق المسجلة
  const suggestions = useMemo(() => {
    const set = new Map<string, string>();
    sellers.forEach((s) => {
      if (s.governorate) set.set(s.governorate, s.governorate);
      if (s.governorate && s.area) set.set(`${s.governorate} ${s.area}`, `${s.governorate} — ${s.area}`);
    });
    return [...set.entries()];
  }, [sellers]);

  const result = useMemo(() => {
    const toks = tokensOf(q);
    if (!toks.length) return { exact: sellers, near: [] as Seller[], nearGov: "", mode: "all" as const };
    // اسم مدينة ← محافظتها (الحلة ← بابل)
    const cityGov = (t: string) => {
      const g = CITY_TO_GOV[`ال${t}`] ?? CITY_TO_GOV[t];
      return g ? normalizeAr(g) : null;
    };
    const govHints = toks.map(cityGov).filter(Boolean) as string[];
    const matchTok = (x: Indexed, t: string) => {
      const cg = cityGov(t);
      if (cg) return x.gov.includes(cg);
      if (GOV_TOKENS.has(t)) return x.gov.includes(t); // «بغداد» تطابق المحافظة فقط، مو «طريق بغداد»
      return x.all.includes(t);
    };
    const exact = index
      .filter((x) => toks.every((t) => matchTok(x, t)))
      .sort((a, b) => Number(toks.some((t) => b.place.includes(t))) - Number(toks.some((t) => a.place.includes(t))))
      .map((x) => x.s);
    if (exact.length) return { exact, near: [], nearGov: "", mode: "exact" as const };
    // ما موجود بالمنطقة: نعرض مكاتب نفس المحافظة
    const govTok = [...govHints, ...toks].find((t) => index.some((x) => x.gov && x.gov.includes(t)));
    if (govTok) {
      const near = index.filter((x) => x.gov.includes(govTok)).map((x) => x.s);
      return { exact: [], near, nearGov: near[0]?.governorate ?? "", mode: "gov" as const };
    }
    const fallback = sellers.filter((s) => s.delivery || !s.governorate);
    return { exact: [], near: fallback.length ? fallback : sellers, nearGov: "", mode: "none" as const };
  }, [q, index, sellers]);

  if (!sellers.length)
    return <EmptyState icon={Store} title={kind === "books" ? "ستُضاف أماكن البيع قريباً" : "سيُضاف الوكلاء قريباً"} text="للاستفسار تواصل معنا عبر أرقام التواصل." />;

  const full = result.mode === "all" || result.mode === "exact" ? result.exact : result.near;
  const collapsed = result.mode === "all" && !showAll && full.length > LIMIT;
  const shown = collapsed ? full.slice(0, LIMIT) : full;

  return (
    <div>
      <div className="relative mx-auto mb-4 max-w-2xl">
        <label className="relative block">
          <span className="sr-only">ابحث عن مكتبة قريبة منك</span>
          <Search className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 150)}
            placeholder="اكتب محافظتك أو منطقتك… مثال: بغداد البنوك"
            className="field !rounded-2xl !py-4 pr-14 text-base shadow-glow"
            autoComplete="off"
            enterKeyHint="search"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="مسح البحث" className="absolute left-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-rose/50 hover:bg-white/5">
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
        {focus && !q && suggestions.length > 0 && (
          <div className="absolute inset-x-0 top-full z-20 mt-2 flex flex-wrap gap-2 rounded-2xl border border-line/10 bg-ink/95 p-3 backdrop-blur-xl">
            {suggestions.map(([value, label]) => (
              <button key={value} type="button" onMouseDown={() => setQ(value)} className="chip hover:border-gold/50 hover:text-white">
                <MapPin className="h-3 w-3 text-gold" /> {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mb-6 text-center text-sm text-rose/55" aria-live="polite">
        {result.mode === "all" && `${sellers.length} ${one} — اكتب منطقتك لتظهر لك الأقرب`}
        {result.mode === "exact" && `وجدنا ${result.exact.length} ${result.exact.length === 1 ? one : many} لـ«${q.trim()}»`}
        {result.mode === "gov" && `ما عندنا مكتبة مسجّلة بـ«${q.trim()}» بالضبط — هذي المكاتب الموجودة بمحافظة ${result.nearGov}`}
        {result.mode === "none" && `ما عندنا مكتبة مسجّلة بـ«${q.trim()}» بعد — ${kind === "books" ? "هذي أماكن توصل لكل المحافظات" : "هذي كل الوكلاء"}`}
      </p>

      <motion.ul layout className="auto-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((s, i) => (
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
                  <p className="mt-0.5 text-xs text-gold">{[s.governorate, s.area].filter(Boolean).join(" — ") || "يوصل لكل المحافظات"}</p>
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
                {(s.map_url || s.address) && (
                  <a
                    href={s.map_url ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([s.name, s.area, s.governorate].filter(Boolean).join("، "))}`}
                    target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3.5 !py-2 text-xs"
                  >
                    <Navigation className="h-3.5 w-3.5" /> الموقع
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {collapsed && (
        <div className="mt-6 text-center">
          <button type="button" onClick={() => setShowAll(true)} className="btn-ghost">عرض الكل ({full.length})</button>
        </div>
      )}

      {kind === "books" && <div className="glass mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 p-5 text-center sm:flex-row sm:text-right">
        <p className="flex-1 text-sm leading-7 text-rose/65">ما لكيت مكتبة قريبة منك؟ الملازم متوفرة أيضاً لدى وكلاء دار المغرب في المحافظات.</p>
        <a href={AGENTS_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0">
          قائمة وكلاء دار المغرب <ExternalLink className="h-4 w-4" />
        </a>
      </div>}
    </div>
  );
}
