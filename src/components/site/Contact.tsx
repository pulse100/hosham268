import { Phone } from "lucide-react";
import type { SiteData } from "@/lib/types";
import { formatPhone, telHref, whatsappHref } from "@/lib/utils";
import { InstagramIcon, TelegramIcon } from "../ui/BrandIcons";
import { Reveal } from "../ui/Reveal";
import { InquiryForm } from "./InquiryForm";

export function Contact({ data, topic = "" }: { data: SiteData; topic?: string }) {
  const { settings, social, courses } = data;
  const phones = [settings.phone_primary, settings.phone_secondary].filter(Boolean) as string[];
  const tg = social.find((s) => s.platform === "telegram");
  const ig = social.find((s) => s.platform === "instagram");
  return (
    <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <Reveal className="grid content-start gap-4">
        {phones.map((p, i) => (
          <a key={p} href={telHref(p)} className="glass card-hover group flex items-center gap-4 p-5">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold text-ink transition group-hover:scale-105"><Phone className="h-6 w-6" /></span>
            <span>
              <span className="block text-xs text-rose/55">{i === 0 ? "رقم التواصل الأول" : "رقم التواصل الثاني"} — اضغط للاتصال</span>
              <span className="mt-1 block font-display text-2xl font-bold tracking-wider text-white" dir="ltr">{formatPhone(p)}</span>
            </span>
          </a>
        ))}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {settings.whatsapp_number && (
            <a href={whatsappHref(settings.whatsapp_number)} target="_blank" rel="noopener noreferrer" className="btn-ghost">WhatsApp</a>
          )}
          {tg && <a href={tg.url} target="_blank" rel="noopener noreferrer" className="btn-ghost"><TelegramIcon className="h-4 w-4" /> Telegram</a>}
          {ig && <a href={ig.url} target="_blank" rel="noopener noreferrer" className="btn-ghost"><InstagramIcon className="h-4 w-4" /> Instagram</a>}
        </div>
      </Reveal>
      <Reveal delay={0.1} className="scroll-mt-28" >
        <div id="register">
          <h3 className="mb-4 text-xl font-bold text-white">{data.texts["contact.form_title"]}</h3>
          <InquiryForm defaultTopic={topic} courses={courses.map((c) => c.title)} />
        </div>
      </Reveal>
    </div>
  );
}
