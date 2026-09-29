import { ArrowUpLeft, Repeat2 } from "lucide-react";
import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { Reveal } from "../ui/Reveal";

export function RepeatSystem({ settings }: { settings: SiteSettings }) {
  const href = settings.repeat_system_url ?? "/contact?topic=" + encodeURIComponent(settings.repeat_system_title ?? "نظام الإعادة والتكرار") + "#register";
  return (
    <section className="container py-10">
      <Reveal>
        <div className="glass relative flex flex-col items-start gap-6 overflow-hidden p-8 md:flex-row md:items-center md:p-10">
          <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-burgundy/40 blur-3xl" />
          <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold"><Repeat2 className="h-8 w-8" /></span>
          <div className="relative flex-1">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{settings.repeat_system_title}</h2>
            <p className="mt-2 whitespace-pre-line leading-8 text-rose/65">
              {settings.repeat_system_body || "تفاصيل النظام وآلية الاستفادة منه للطلاب — للاستفسار تواصل معنا وسنوضح لك كل التفاصيل."}
            </p>
          </div>
          <Link href={href} className="btn-primary relative shrink-0">تعرّف على التفاصيل <ArrowUpLeft className="h-4 w-4" /></Link>
        </div>
      </Reveal>
    </section>
  );
}
