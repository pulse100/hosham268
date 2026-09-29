import { BookOpen, ClipboardPen, MapPin, Phone, Share2 } from "lucide-react";
import { Stagger, StaggerItem } from "../ui/Reveal";

const items = [
  { href: "#locations", icon: MapPin, n: 1 },
  { href: "#order", icon: BookOpen, n: 2 },
  { href: "#courses", icon: ClipboardPen, n: 3 },
  { href: "#contact", icon: Phone, n: 4 },
  { href: "#social", icon: Share2, n: 5 },
];

/** وصول سريع: يجيب على أسئلة الطالب الأساسية خلال ثوانٍ */
export function QuickAccess({ texts: t }: { texts: Record<string, string> }) {
  return (
    <section aria-label="وصول سريع" className="container relative z-10 -mt-4">
      <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {items.map(({ href, icon: Icon, n }, i) => (
          <StaggerItem key={href} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
            <a href={href} className="glass card-hover group flex h-full flex-col gap-3 p-4 md:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-white">{t[`quick.${n}_q`]}</span>
                <span className="mt-1 block text-xs leading-5 text-rose/55">{t[`quick.${n}_a`]}</span>
              </span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
