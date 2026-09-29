"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CalendarDays, Clock, ExternalLink, Info, MapPin, Navigation, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import type { Location } from "@/lib/types";
import { cn, directionsUrl, formatPhone, mapsUrl, telHref } from "@/lib/utils";
import { EmptyState } from "../ui/EmptyState";

const PosterMap = dynamic(() => import("./PosterMap"), {
  ssr: false,
  loading: () => <div className="skeleton h-full w-full !rounded-none" aria-label="جاري تحميل الخريطة" />,
});

function Detail({ l }: { l: Location }) {
  const rows = [
    { icon: MapPin, label: "العنوان", value: l.address },
    { icon: CalendarDays, label: "أيام التدريس", value: l.days },
    { icon: Clock, label: "أوقات المحاضرات", value: l.times },
  ];
  return (
    <motion.div
      key={l.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="glass p-5 md:p-6"
    >
      <p className="text-xs text-gold">{l.area} — بغداد</p>
      <h3 className="mt-1 text-2xl font-bold text-white">{l.name}</h3>
      <dl className="mt-5 grid gap-3 text-sm">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
            <dt className="w-28 shrink-0 text-rose/50">{label}</dt>
            <dd className={value ? "text-rose/90" : "text-rose/35"}>{value || "يُعلن قريباً"}</dd>
          </div>
        ))}
        {l.phone && (
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
            <dt className="w-28 shrink-0 text-rose/50">التواصل</dt>
            <dd><a href={telHref(l.phone)} dir="ltr" className="text-rose/90 hover:text-gold">{formatPhone(l.phone)}</a></dd>
          </div>
        )}
      </dl>
      {l.is_approximate && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-white/[.04] p-3 text-xs leading-5 text-rose/55">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> العلامة على الخريطة تشير إلى المنطقة بشكل تقريبي؛ الأزرار أدناه تبحث عن المعهد مباشرة في خرائط Google.
        </p>
      )}
      <div className="mt-5 grid grid-cols-2 gap-2">
        <a href={mapsUrl(l)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          <ExternalLink className="h-4 w-4" /> فتح على الخريطة
        </a>
        <a href={directionsUrl(l)} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <Navigation className="h-4 w-4" /> الاتجاهات
        </a>
      </div>
    </motion.div>
  );
}

export function Locations({ locations }: { locations: Location[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(locations[0]?.id ?? null);
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, margin: "-120px" });
  const selected = locations.find((l) => l.id === selectedId) ?? null;

  if (!locations.length)
    return <EmptyState icon={MapPin} title="لا توجد أماكن تدريس منشورة حالياً" text="ستُضاف أماكن التدريس قريباً." />;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
      <div ref={mapRef} className="relative h-[520px] overflow-hidden rounded-[2rem] border border-gold/20 shadow-glow md:h-[640px] lg:row-span-2">
        {inView && <PosterMap locations={locations} selectedId={selectedId} onSelect={setSelectedId} />}
      </div>

      <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:grid lg:overflow-visible" aria-label="قائمة المعاهد">
        {locations.map((l, i) => (
          <motion.li
            key={l.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="shrink-0"
          >
            <button
              type="button"
              onClick={() => setSelectedId(l.id)}
              aria-pressed={l.id === selectedId}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-right transition",
                l.id === selectedId ? "border-gold/50 bg-gold/10" : "border-line/10 bg-white/[.03] hover:border-line/25",
              )}
            >
              <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold", l.id === selectedId ? "bg-gold text-ink" : "bg-white/5 text-gold")}>
                {i + 1}
              </span>
              <span className="whitespace-nowrap">
                <span className="block text-sm font-semibold text-white">{l.name}</span>
                <span className="block text-xs text-rose/55">{l.area}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence mode="wait">{selected && <Detail l={selected} />}</AnimatePresence>
    </div>
  );
}
