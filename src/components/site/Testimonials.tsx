import { Quote, Star } from "lucide-react";
import Image from "next/image";
import type { Testimonial } from "@/lib/types";
import { Stagger, StaggerItem } from "../ui/Reveal";

/** يظهر فقط عند وجود آراء حقيقية معتمدة من لوحة الإدارة */
export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <Stagger className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {items.map((t) => (
        <StaggerItem key={t.id} className="mb-5 break-inside-avoid">
          <figure className="glass p-6">
            <Quote className="h-7 w-7 text-gold/50" />
            {t.rating ? (
              <div className="mt-3 flex gap-0.5" aria-label={`التقييم ${t.rating} من 5`}>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < t.rating! ? "fill-gold text-gold" : "text-rose/20"}`} />)}
              </div>
            ) : null}
            <blockquote className="mt-3 leading-8 text-rose/80">{t.body}</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              {t.image ? (
                <Image src={t.image} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              ) : (
                <span className="grid h-11 w-11 place-items-center rounded-full bg-burgundy/50 font-bold text-white">{t.name.charAt(0)}</span>
              )}
              <span><span className="block font-semibold text-white">{t.name}</span>{t.grade && <span className="block text-xs text-rose/50">{t.grade}</span>}</span>
            </figcaption>
          </figure>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
