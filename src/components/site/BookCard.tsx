import { CheckCircle2, Eye, ShoppingBag } from "lucide-react";
import { Book3D } from "./Book3D";
import { Reveal } from "../ui/Reveal";
import Link from "next/link";
import { categoryOf } from "@/lib/books";
import type { Book } from "@/lib/types";

export function BookCard({ book }: { book: Book }) {
  const meta = [book.category ? categoryOf(book.category).label : null, book.grade, book.academic_year].filter(Boolean) as string[];
  const orderHref = book.order_url ?? "/#order";
  return (
    <article className="glass card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative bg-gradient-to-b from-burgundy/30 to-transparent px-6 pb-4 pt-10">
        <Book3D book={book} />
      </div>
      <div className="flex flex-1 flex-col p-6 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {meta.map((m) => <span key={m} className="chip">{m}</span>)}
        </div>
        <h3 className="mt-4 text-2xl font-bold text-white">
          {book.title} {book.subtitle && <span className="block text-lg font-medium text-gold">{book.subtitle}</span>}
        </h3>
        {book.description && <p className="mt-3 line-clamp-3 text-sm leading-7 text-rose/65">{book.description}</p>}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
          <Link href={book.view_url ?? `/books/${book.slug}`} className="btn-ghost whitespace-nowrap !px-3 text-sm"><Eye className="h-4 w-4" /> عرض الملزمة</Link>
          <a href={orderHref} className="btn-primary whitespace-nowrap !px-3 text-sm"><ShoppingBag className="h-4 w-4" /> لطلب الملزمة</a>
        </div>
      </div>
    </article>
  );
}

/** عرض مميز عندما تكون هناك ملزمة واحدة */
export function FeaturedBook({ book }: { book: Book }) {
  const meta = [book.category ? categoryOf(book.category).label : null, book.grade, book.academic_year].filter(Boolean) as string[];
  const features = (book.features ?? "").split("\n").map((f) => f.trim()).filter(Boolean).slice(0, 3);
  const orderHref = book.order_url ?? "/#order";
  return (
    <div className="glass relative grid items-center gap-10 overflow-hidden p-6 md:grid-cols-[.8fr_1.2fr] md:p-12">
      <div aria-hidden className="absolute -right-24 top-0 h-full w-1/2 bg-gradient-to-l from-burgundy/30 to-transparent" />
      <Reveal from="scale" className="relative py-4">
        <Book3D book={book} hint />
      </Reveal>
      <Reveal delay={0.15} className="relative">
        <div className="flex flex-wrap gap-1.5">{meta.map((m) => <span key={m} className="chip">{m}</span>)}</div>
        <h3 className="mt-4 text-3xl font-bold text-white md:text-5xl">{book.title}</h3>
        {book.subtitle && <p className="mt-2 font-[family-name:var(--font-ruqaa)] text-2xl text-gold md:text-3xl">{book.subtitle}</p>}
        {book.description && <p className="mt-5 leading-8 text-rose/70">{book.description}</p>}
        {features.length > 0 && (
          <ul className="mt-5 grid gap-2">
            {features.map((f) => <li key={f} className="flex items-start gap-2 text-sm leading-7 text-rose/75"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold" />{f}</li>)}
          </ul>
        )}
        {book.publisher && <p className="mt-5 text-xs text-rose/45">الناشر: {book.publisher}</p>}
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={book.view_url ?? `/books/${book.slug}`} className="btn-ghost"><Eye className="h-4 w-4" /> عرض الملزمة</Link>
          <a href={orderHref} className="btn-primary"><ShoppingBag className="h-4 w-4" /> لطلب الملزمة</a>
        </div>
      </Reveal>
    </div>
  );
}
