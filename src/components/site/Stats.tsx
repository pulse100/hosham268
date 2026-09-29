"use client";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/types";
import { Stagger, StaggerItem } from "../ui/Reveal";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.2, 0.8, 0.2, 1], onUpdate: (n) => setV(n) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{Number.isInteger(to) ? Math.round(v).toLocaleString("en") : v.toFixed(1)}</span>;
}

export function Stats({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;
  return (
    <section aria-label="أرقام" className="container py-10">
      <div className="glass letters-bg overflow-hidden p-2">
        <Stagger className="grid grid-cols-2 divide-line/10 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse">
          {stats.map((s) => (
            <StaggerItem key={s.id} className="px-4 py-8 text-center">
              <p className="font-display text-4xl font-bold text-white md:text-5xl" dir="ltr">
                {s.display_text ? (
                  <span dir="rtl" className="text-gradient">{s.display_text}</span>
                ) : (
                  <>
                    <span className="text-gold">{s.prefix}</span>
                    <Counter to={Number(s.value ?? 0)} />
                    <span className="text-gold">{s.suffix}</span>
                  </>
                )}
              </p>
              <p className="mt-2 text-sm text-rose/60">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
