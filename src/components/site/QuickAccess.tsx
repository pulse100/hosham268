import { BookOpen, ClipboardPen, MapPin, Phone, Share2 } from "lucide-react";
import { Stagger, StaggerItem } from "../ui/Reveal";

/** وصول سريع: يجيب على أسئلة الطالب الأساسية خلال ثوانٍ */
const items = [
  { href: "#locations", icon: MapPin, q: "وين يدرّس؟", a: "معاهد بغداد على الخريطة" },
  { href: "#books", icon: BookOpen, q: "وين ألقى الملازم؟", a: "الملازم وطريقة الطلب" },
  { href: "#courses", icon: ClipboardPen, q: "شلون أسجّل؟", a: "الدورات والتسجيل" },
  { href: "#contact", icon: Phone, q: "شلون أتواصل؟", a: "أرقام التواصل المباشر" },
  { href: "#social", icon: Share2, q: "حساباته الرسمية", a: "Instagram · Telegram · YouTube" },
];

export function QuickAccess() {
  return (
    <section aria-label="وصول سريع" className="container relative z-10 -mt-4">
      <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {items.map(({ href, icon: Icon, q, a }, i) => (
          <StaggerItem key={href} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
            <a href={href} className="glass card-hover group flex h-full flex-col gap-3 p-4 md:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-white">{q}</span>
                <span className="mt-1 block text-xs leading-5 text-rose/55">{a}</span>
              </span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
