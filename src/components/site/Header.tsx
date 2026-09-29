"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn, telHref } from "@/lib/utils";
import { NAV } from "./nav";

export function Header({ name, phone }: { name: string; phone: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "py-2" : "py-4")}>
      <div className="container">
        <nav
          aria-label="القائمة الرئيسية"
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled || open ? "border border-line/10 bg-ink/80 shadow-2xl shadow-black/30 backdrop-blur-xl" : "border border-transparent",
          )}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label={name}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold to-burgundy font-[family-name:var(--font-ruqaa)] text-2xl leading-none text-white shadow-lg shadow-burgundy/40">
              هـ
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-white">{name}</span>
              <span className="block text-[11px] text-rose/60">مدرس اللغة العربية</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {NAV.map((l) => {
              const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-sm transition hover:text-white",
                      active ? "text-white" : "text-rose/70",
                    )}
                  >
                    {active && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[.07]" />}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {phone && (
              <a href={telHref(phone)} className="btn-primary hidden !px-4 !py-2.5 sm:inline-flex">
                <Phone className="h-4 w-4" /> اتصل الآن
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line/10 bg-white/[.04] xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-line/10 bg-ink/95 p-3 backdrop-blur-xl xl:hidden"
            >
              <ul className="grid gap-1">
                {NAV.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link
                      href={l.href}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3.5 text-base",
                        path === l.href ? "bg-white/[.07] text-white" : "text-rose/80 hover:bg-white/[.04]",
                      )}
                    >
                      {l.label}
                      <span className="text-gold/60">‹</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              {phone && (
                <a href={telHref(phone)} className="btn-primary mt-3 w-full">
                  <Phone className="h-4 w-4" /> اتصل الآن
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
