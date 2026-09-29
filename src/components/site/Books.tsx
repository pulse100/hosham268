"use client";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { BOOK_CATEGORIES } from "@/lib/books";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EmptyState } from "../ui/EmptyState";
import { BookCard, FeaturedBook } from "./BookCard";

/** كل ملازم الأستاذ مع فلترة حسب النوع (أدب، قواعد، واجبات…) */
export function BooksGrid({ books }: { books: Book[] }) {
  const [cat, setCat] = useState("all");
  const cats = useMemo(
    () => BOOK_CATEGORIES.filter((c) => books.some((b) => (b.category ?? "other") === c.value)),
    [books],
  );
  const list = cat === "all" ? books : books.filter((b) => (b.category ?? "other") === cat);

  if (!books.length) return <EmptyState icon={BookOpen} title="لا توجد ملازم منشورة حالياً" text="ستُضاف الملازم فور صدورها." />;
  if (books.length === 1) return <FeaturedBook book={books[0]} />;

  return (
    <div>
      {cats.length > 1 && (
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="tablist" aria-label="نوع الملزمة">
          {[{ value: "all", label: "كل الملازم" }, ...cats].map((c) => (
            <button
              key={c.value}
              type="button"
              role="tab"
              aria-selected={cat === c.value}
              onClick={() => setCat(c.value)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition",
                cat === c.value ? "border-gold/60 bg-gold text-ink" : "border-line/10 bg-white/[.03] text-rose/70 hover:border-gold/40",
              )}
            >
              {c.label}
              <span className="mr-1 opacity-60">({c.value === "all" ? books.length : books.filter((b) => (b.category ?? "other") === c.value).length})</span>
            </button>
          ))}
        </div>
      )}
      <motion.div layout className="auto-grid">
        <AnimatePresence mode="popLayout">
          {list.map((b, i) => (
            <motion.div
              key={b.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 6) * 0.06 } }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <BookCard book={b} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
