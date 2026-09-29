import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../ui/Reveal";

export function PageHeader({ title, description, crumbs = [] }: { title: string; description?: string | null; crumbs?: { href: string; label: string }[] }) {
  return (
    <header className="relative overflow-hidden pb-10 pt-32 md:pt-40">
      <span aria-hidden className="pointer-events-none absolute -top-16 left-6 select-none font-[family-name:var(--font-ruqaa)] text-[16rem] leading-none text-white/[.03]">ع</span>
      <div className="container relative">
        <nav aria-label="مسار التنقل" className="mb-4 flex items-center gap-1 text-sm text-rose/50">
          <Link href="/" className="hover:text-gold">الرئيسية</Link>
          {crumbs.map((c) => (
            <span key={c.href} className="flex items-center gap-1"><ChevronLeft className="h-3.5 w-3.5" /><Link href={c.href} className="hover:text-gold">{c.label}</Link></span>
          ))}
          <ChevronLeft className="h-3.5 w-3.5" /><span className="text-rose/80">{title}</span>
        </nav>
        <Reveal>
          <h1 className="text-4xl font-bold text-white md:text-6xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-lg leading-8 text-rose/65">{description}</p>}
        </Reveal>
      </div>
    </header>
  );
}
