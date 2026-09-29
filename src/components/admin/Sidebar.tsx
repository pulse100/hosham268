"use client";
import { BarChart3, BookOpen, LayoutTemplate, Store, Type, ClipboardList, GraduationCap, HelpCircle, Inbox, LayoutDashboard, LogOut, MapPin, Megaphone, MessageSquareQuote, Settings, Share2, Video, X, Menu, ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/lib/admin/actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "طلبات التسجيل", icon: Inbox },
  { href: "/admin/settings", label: "الإعدادات العامة", icon: Settings },
  { href: "/admin/texts", label: "نصوص وعناوين الموقع", icon: Type },
  { href: "/admin/books", label: "الملازم", icon: BookOpen },
  { href: "/admin/sellers", label: "الوكلاء وأماكن البيع", icon: Store },
  { href: "/admin/sections", label: "أقسام إضافية", icon: LayoutTemplate },
  { href: "/admin/locations", label: "أماكن التدريس", icon: MapPin },
  { href: "/admin/courses", label: "الدورات", icon: GraduationCap },
  { href: "/admin/videos", label: "الفيديوهات", icon: Video },
  { href: "/admin/announcements", label: "الإعلانات", icon: Megaphone },
  { href: "/admin/social", label: "الحسابات", icon: Share2 },
  { href: "/admin/stats", label: "الأرقام", icon: BarChart3 },
  { href: "/admin/faqs", label: "الأسئلة الشائعة", icon: HelpCircle },
  { href: "/admin/testimonials", label: "آراء الطلاب", icon: MessageSquareQuote },
];

export function Sidebar({ email }: { email: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const nav = (
    <nav className="flex h-full flex-col gap-1 p-4">
      <p className="mb-4 flex items-center gap-2 px-2 font-display text-lg font-bold text-white"><ClipboardList className="h-5 w-5 text-gold" /> إدارة الموقع</p>
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? path === href : path.startsWith(href);
        return (
          <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition", active ? "bg-gold/15 text-white" : "text-rose/65 hover:bg-white/5 hover:text-white")}>
            <Icon className={cn("h-4 w-4", active && "text-gold")} /> {label}
          </Link>
        );
      })}
      <div className="mt-auto grid gap-1 border-t border-line/10 pt-4">
        <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose/65 hover:bg-white/5"><ExternalLink className="h-4 w-4" /> عرض الموقع</a>
        <p className="truncate px-3 text-xs text-rose/40" dir="ltr">{email}</p>
        <form action={logout}>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-300/80 hover:bg-red-500/10"><LogOut className="h-4 w-4" /> تسجيل الخروج</button>
        </form>
      </div>
    </nav>
  );
  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line/10 bg-ink/90 px-4 py-3 backdrop-blur lg:hidden">
        <span className="font-semibold text-white">إدارة الموقع</span>
        <button onClick={() => setOpen(true)} aria-label="فتح القائمة" className="grid h-10 w-10 place-items-center rounded-lg bg-white/5"><Menu className="h-5 w-5" /></button>
      </div>
      <aside className="fixed inset-y-0 right-0 hidden w-64 border-l border-line/10 bg-night/80 lg:block">{nav}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-label="إغلاق" />
          <aside className="absolute inset-y-0 right-0 w-72 overflow-y-auto bg-night">
            <button onClick={() => setOpen(false)} className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-lg bg-white/5" aria-label="إغلاق"><X className="h-4 w-4" /></button>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
