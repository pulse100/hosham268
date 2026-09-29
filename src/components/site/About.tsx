import { GraduationCap, MonitorSmartphone, Users } from "lucide-react";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import { Reveal } from "../ui/Reveal";
import { Tilt } from "../ui/Tilt";

export function About({ settings }: { settings: SiteSettings }) {
  const pillars = [
    { icon: Users, title: "دروس حضورية", text: "في عدد من معاهد بغداد" },
    { icon: MonitorSmartphone, title: "منصة إلكترونية", text: settings.platform_name ?? "منصة المعموري" },
    { icon: GraduationCap, title: "طلبة الإعدادية", text: "السادس الإعدادي علمي وأدبي" },
  ];
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal from="right" className="relative mx-auto w-full max-w-md">
          <div aria-hidden className="absolute -inset-4 rotate-3 rounded-[2.5rem] border border-gold/20" />
          <Tilt max={5}>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-glow">
              {settings.about_image && (
                <Image src={settings.about_image} alt={`صورة ${settings.teacher_name}`} fill sizes="(max-width: 1024px) 90vw, 450px" className="object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <p className="absolute bottom-5 right-6 font-[family-name:var(--font-ruqaa)] text-3xl text-white drop-shadow">لغة الضاد</p>
            </div>
          </Tilt>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">تعرّف على الأستاذ</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
              من هو <span className="text-gradient">{settings.teacher_name.replace(/^الأستاذ\s*/, "")}</span>؟
            </h2>
          </Reveal>
          {settings.short_bio && (
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-9 text-rose/75">{settings.short_bio}</p>
            </Reveal>
          )}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={0.15 + i * 0.08}>
                <div className="glass h-full p-4">
                  <Icon className="h-5 w-5 text-gold" />
                  <p className="mt-3 font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-rose/55">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
