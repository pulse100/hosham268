import { categoryOf } from "@/lib/books";
import type { Book } from "@/lib/types";

/** غلاف مصمم تلقائياً للملزمة إلى أن تُرفع صورة الغلاف الحقيقية من لوحة الإدارة */
export function GeneratedCover({ book }: { book: Book }) {
  const c = categoryOf(book.category);
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-between p-[9%] text-center"
      style={{ background: `radial-gradient(120% 80% at 50% 0%, ${c.from}, ${c.to})`, color: c.accent }}
    >
      <div aria-hidden className="letters-bg absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute inset-[5%] rounded-sm border" style={{ borderColor: `${c.accent}55` }} />
      <p className="relative text-[clamp(8px,2.6vw,11px)] tracking-widest opacity-80">{book.grade ?? "اللغة العربية"}</p>
      <div className="relative">
        <p className="font-[family-name:var(--font-ruqaa)] text-[clamp(22px,7vw,34px)] leading-tight">{book.title}</p>
        {book.subtitle && <p className="mt-2 text-[clamp(10px,3vw,14px)] font-semibold text-white/85">{book.subtitle}</p>}
        <span className="mx-auto mt-3 block h-px w-10" style={{ background: c.accent }} />
        <p className="mt-3 text-[clamp(8px,2.4vw,11px)] text-white/70">{c.label}</p>
      </div>
      <div className="relative">
        <p className="text-[clamp(9px,2.6vw,12px)] font-bold">الأستاذ هشام المعموري</p>
        {book.academic_year && <p className="mt-1 text-[clamp(8px,2.2vw,10px)] opacity-60">{book.academic_year}</p>}
      </div>
    </div>
  );
}
