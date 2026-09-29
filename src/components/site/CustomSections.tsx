import { ArrowUpLeft } from "lucide-react";
import Image from "next/image";
import type { CustomSection } from "@/lib/types";
import { cn, isExternal } from "@/lib/utils";
import { Reveal } from "../ui/Reveal";

/** أقسام إضافية يضيفها المدير من لوحة الإدارة (عنوان + نص + صورة + زر) */
export function CustomSections({ sections }: { sections: CustomSection[] }) {
  return (
    <>
      {sections.map((s) => {
        const hasImage = s.layout !== "text" && s.image;
        return (
          <section key={s.id} id={`section-${s.id}`} className="section">
            <div className={cn("container grid items-center gap-10", hasImage && "lg:grid-cols-2 lg:gap-16")}>
              {hasImage && (
                <Reveal from={s.layout === "image-right" ? "right" : "left"} className={cn("relative", s.layout === "image-left" && "lg:order-2")}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-gold/20 shadow-glow">
                    <Image src={s.image!} alt="" fill sizes="(max-width:1024px) 100vw, 600px" className="object-cover" />
                  </div>
                </Reveal>
              )}
              <Reveal className={cn(!hasImage && "mx-auto max-w-3xl text-center")}>
                {s.subtitle && <p className={cn("eyebrow", !hasImage && "justify-center")}>{s.subtitle}</p>}
                <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">{s.title}</h2>
                {s.body && <p className="mt-5 whitespace-pre-line text-lg leading-9 text-rose/75">{s.body}</p>}
                {s.button_label && s.button_url && (
                  <a href={s.button_url} {...(isExternal(s.button_url) ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn-primary mt-8">
                    {s.button_label} <ArrowUpLeft className="h-4 w-4" />
                  </a>
                )}
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}
