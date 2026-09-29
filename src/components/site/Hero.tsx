"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, MapPin, Share2, UserRound } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import type { SiteSettings } from "@/lib/types";
import { Tilt } from "../ui/Tilt";

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Hero({ settings, texts: t }: { settings: SiteSettings; texts: Record<string, string> }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const letterY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const [first, ...rest] = settings.teacher_name.split(" ");
  const buttons = [
    { href: "#about", label: t["hero.btn_about"], icon: UserRound, primary: true },
    { href: "#locations", label: t["hero.btn_locations"], icon: MapPin },
    { href: "#books", label: t["hero.btn_books"], icon: BookOpen },
    { href: "#social", label: t["hero.btn_social"], icon: Share2 },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      {/* حرف الضاد الزخرفي */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-10 flex justify-center md:justify-start md:pl-[18%]" dir="ltr">
        <motion.span style={{ y: letterY }} className="select-none font-[family-name:var(--font-ruqaa)] text-[28rem] leading-none text-white/[.025] md:text-[40rem]">
          ض
        </motion.span>
      </div>

      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div className="order-2 text-center lg:order-1 lg:text-right">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="chip mx-auto lg:mx-0">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            {t["hero.chip"]}
          </motion.p>

          <h1 className="mt-6 text-5xl font-bold leading-[1.15] text-white sm:text-6xl xl:text-7xl">
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }} className="block text-rose/80 text-3xl sm:text-4xl xl:text-5xl">
              {first}
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }} className="text-gradient mt-2 block pb-2">
              {rest.join(" ")}
            </motion.span>
          </h1>

          {settings.tagline && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-5 font-[family-name:var(--font-ruqaa)] text-3xl text-gold md:text-4xl">
              {settings.tagline}
            </motion.p>
          )}

          {settings.short_bio && (
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }} className="mx-auto mt-6 max-w-xl leading-8 text-rose/70 lg:mx-0">
              {settings.short_bio}
            </motion.p>
          )}

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65, ease }} className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center lg:justify-start">
            {buttons.map(({ href, label, icon: Icon, primary }) => (
              <a key={href} href={href} className={primary ? "btn-primary" : "btn-ghost"}>
                <Icon className="h-4 w-4" /> {label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* صورة الأستاذ */}
        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          className="relative order-1 mx-auto w-full max-w-[420px] lg:order-2"
        >
          <div aria-hidden className="absolute -inset-10 rounded-full bg-burgundy/40 blur-3xl" />
          <Tilt className="relative" max={7}>
            <div className="relative rounded-t-[220px] rounded-b-[36px] bg-gradient-to-b from-gold/70 via-gold/20 to-transparent p-[2px] shadow-glow">
              <motion.div
                initial={{ clipPath: "inset(18% 10% 18% 10% round 200px)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
                transition={{ duration: 1.2, ease }}
                className="relative aspect-[4/5] overflow-hidden rounded-t-[218px] rounded-b-[34px] bg-wine"
              >
                {settings.hero_image && (
                  <Image
                    src={settings.hero_image}
                    alt={settings.teacher_name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover object-[50%_30%] [filter:contrast(1.05)_saturate(1.05)]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-burgundy/20 mix-blend-soft-light" />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
              className="glass absolute -left-3 bottom-16 px-4 py-3 text-sm sm:-left-10"
              style={{ transform: "translateZ(40px)" }}
            >
              <p className="text-xs text-rose/60">{t["hero.badge1_label"]}</p>
              <p className="font-semibold text-white">{t["hero.badge1_value"]}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.05, duration: 0.6 }}
              className="glass absolute -right-3 top-24 px-4 py-3 text-sm sm:-right-8"
            >
              <p className="text-xs text-rose/60">{t["hero.badge2_label"]}</p>
              <p className="font-semibold text-white">{t["hero.badge2_value"]}</p>
            </motion.div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
