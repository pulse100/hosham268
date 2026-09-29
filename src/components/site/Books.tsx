"use client";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EmptyState } from "../ui/EmptyState";
import { BookCard, FeaturedBook } from "./BookCard";

/** كل ملازم الأستاذ بخانة وحدة: تنسحب يمين ويسار، والملزمة بالنص هي البارزة */
export function BooksGrid({ books }: { books: Book[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // الملزمة الأقرب لمنتصف الخانة هي الفعّالة
  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0, dist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const r = (c as HTMLElement).getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    setActive(best);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const child = el?.children[Math.max(0, Math.min(books.length - 1, i))] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    // نبدأ من الملزمة الوسطى حتى تبين الملازم على الجانبين
    const el = track.current;
    const start = Math.floor((books.length - 1) / 2);
    const child = el?.children[start] as HTMLElement | undefined;
    if (el && child) el.scrollLeft += child.getBoundingClientRect().left + child.offsetWidth / 2 - (el.getBoundingClientRect().left + el.clientWidth / 2);
    onScroll();
  }, [books.length, onScroll]);

  if (!books.length) return <EmptyState icon={BookOpen} title="لا توجد ملازم منشورة حالياً" text="ستُضاف الملازم فور صدورها." />;
  if (books.length === 1) return <FeaturedBook book={books[0]} />;

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50%-min(39vw,170px))] pb-4 pt-2 [scrollbar-width:none] sm:px-[calc(50%-190px)] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label="ملازم الأستاذ"
      >
        {books.map((b, i) => (
          <div
            key={b.id}
            className={cn(
              "w-[min(78vw,340px)] shrink-0 snap-center transition-all duration-500 sm:w-[380px]",
              i === active ? "scale-100 opacity-100" : "scale-[.9] opacity-45",
            )}
            aria-roledescription="slide"
            aria-label={`${i + 1} من ${books.length}`}
            onClickCapture={(e) => { if (i !== active) { e.preventDefault(); e.stopPropagation(); go(i); } }}
          >
            <BookCard book={b} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="الملزمة السابقة" className="grid h-11 w-11 place-items-center rounded-full border border-line/15 bg-white/5 text-white transition hover:border-gold/50 disabled:opacity-30">
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {books.map((b, i) => (
            <button key={b.id} type="button" onClick={() => go(i)} aria-label={b.title} className={cn("h-2 rounded-full transition-all", i === active ? "w-7 bg-gold" : "w-2 bg-white/25")} />
          ))}
        </div>
        <button type="button" onClick={() => go(active + 1)} disabled={active === books.length - 1} aria-label="الملزمة التالية" className="grid h-11 w-11 place-items-center rounded-full border border-line/15 bg-white/5 text-white transition hover:border-gold/50 disabled:opacity-30">
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
