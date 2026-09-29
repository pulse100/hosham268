import { BookOpen, CheckCircle2, Eye, Phone } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { telHref } from "@/lib/utils";

export function Book3D({ book, priority = false }: { book: Book; priority?: boolean }) {
  return (
    <div className="book3d mx-auto w-[70%] max-w-[260px]">
      <div className="book3d__inner">
        <div className="book3d__back" />
        <div className="book3d__cover aspect-[1563/2313] bg-wine">
          {book.cover_image ? (
            <Image src={book.cover_image} alt={`غلاف ملزمة ${book.title}`} fill sizes="260px" priority={priority} className="object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-gold"><BookOpen className="h-10 w-10" /></div>
          )}
        </div>
        <div className="book3d__pages" />
      </div>
      <div aria-hidden className="mx-auto mt-6 h-4 w-3/4 rounded-[50%] bg-black/50 blur-md" />
    </div>
  );
}

export function BookCard({ book }: { book: Book }) {
  const meta = [book.grade, book.subject, book.academic_year].filter(Boolean) as string[];
  const orderHref = book.order_url ?? (book.order_phone ? telHref(book.order_phone) : "/contact");
  return (
    <article className="glass card-hover group flex h-full flex-col overflow-hidden">
      <Link href={`/books/${book.slug}`} className="relative block bg-gradient-to-b from-burgundy/30 to-transparent px-6 pb-4 pt-10" aria-label={`عرض ${book.title}`}>
        <Book3D book={book} />
      </Link>
      <div className="flex flex-1 flex-col p-6 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {meta.map((m) => <span key={m} className="chip">{m}</span>)}
        </div>
        <h3 className="mt-4 text-2xl font-bold text-white">
          {book.title} {book.subtitle && <span className="block text-lg font-medium text-gold">{book.subtitle}</span>}
        </h3>
        {book.description && <p className="mt-3 line-clamp-3 text-sm leading-7 text-rose/65">{book.description}</p>}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
          <Link href={book.view_url ?? `/books/${book.slug}`} className="btn-ghost"><Eye className="h-4 w-4" /> عرض الملزمة</Link>
          <a href={orderHref} className="btn-primary"><Phone className="h-4 w-4" /> طلب / حجز</a>
        </div>
      </div>
    </article>
  );
}

/** عرض مميز عندما تكون هناك ملزمة واحدة */
export function FeaturedBook({ book }: { book: Book }) {
  const meta = [book.grade, book.subject, book.academic_year].filter(Boolean) as string[];
  const features = (book.features ?? "").split("\n").map((f) => f.trim()).filter(Boolean).slice(0, 3);
  const orderHref = book.order_url ?? (book.order_phone ? telHref(book.order_phone) : "/contact");
  return (
    <div className="glass relative grid items-center gap-10 overflow-hidden p-6 md:grid-cols-[.8fr_1.2fr] md:p-12">
      <div aria-hidden className="absolute -right-24 top-0 h-full w-1/2 bg-gradient-to-l from-burgundy/30 to-transparent" />
      <Reveal from="scale" className="relative py-4">
        <Link href={`/books/${book.slug}`} aria-label={`عرض ${book.title}`}><Book3D book={book} /></Link>
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
          <a href={orderHref} className="btn-primary"><Phone className="h-4 w-4" /> طلب / حجز</a>
        </div>
      </Reveal>
    </div>
  );
}
