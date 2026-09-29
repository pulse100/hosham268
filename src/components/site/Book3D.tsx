"use client";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BookOpen, Hand } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

const REST_Y = -24;
const REST_X = 6;

/**
 * ملزمة ثلاثية الأبعاد تفاعلية:
 * - تميل مع حركة الماوس.
 * - تُسحب بالإصبع أو الماوس لتدويرها في كل الاتجاهات.
 * - الضغط عليها يديرها لتظهر الكعب والغلاف الخلفي ثم ترجع.
 */
export function Book3D({ book, priority = false, hint = false, className }: {
  book: Book; priority?: boolean; hint?: boolean; className?: string;
}) {
  const ry = useMotionValue(REST_Y);
  const rx = useMotionValue(REST_X);
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const shadowX = useTransform(sry, [-60, 60], [40, -40]);
  const glare = useTransform(sry, [-60, 0, 60], [0.05, 0.22, 0.05]);
  const drag = useRef<{ x: number; y: number; ry: number; rx: number; moved: boolean } | null>(null);
  const [spun, setSpun] = useState(false);
  const [touched, setTouched] = useState(false);

  const reset = () => { ry.set(spun ? 155 : REST_Y); rx.set(REST_X); };

  return (
    <div className={cn("relative mx-auto w-[70%] max-w-[260px] select-none", className)} style={{ perspective: 1200 }}>
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={`تدوير ملزمة ${book.title}`}
        className="relative cursor-grab touch-none active:cursor-grabbing"
        style={{ rotateY: sry, rotateX: srx, transformStyle: "preserve-3d" }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, ry: ry.get(), rx: rx.get(), moved: false };
          setTouched(true);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (d) {
            const dx = e.clientX - d.x;
            const dy = e.clientY - d.y;
            if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
            ry.set(d.ry + dx * 0.6);
            rx.set(Math.max(-35, Math.min(35, d.rx - dy * 0.4)));
          } else if (e.pointerType === "mouse" && !spun) {
            const r = e.currentTarget.getBoundingClientRect();
            ry.set(REST_Y + ((e.clientX - r.left) / r.width - 0.5) * 30);
            rx.set(REST_X - ((e.clientY - r.top) / r.height - 0.5) * 16);
          }
        }}
        onPointerUp={() => {
          const d = drag.current;
          drag.current = null;
          if (d && !d.moved) {
            // ضغطة: تدوير لإظهار الكعب والغلاف الخلفي، والضغطة الثانية ترجعها
            const next = !spun;
            setSpun(next);
            animate(ry, next ? 155 : REST_Y, { type: "spring", stiffness: 70, damping: 12 });
            rx.set(REST_X);
          } else {
            reset();
          }
        }}
        onPointerLeave={() => { if (!drag.current) reset(); }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const next = !spun;
            setSpun(next);
            ry.set(next ? 155 : REST_Y);
          }
        }}
      >
        {/* الغلاف الأمامي */}
        <div className="relative aspect-[1563/2313] overflow-hidden rounded-[3px_8px_8px_3px] bg-wine shadow-[inset_4px_0_8px_rgba(0,0,0,.35)]" style={{ backfaceVisibility: "hidden", transform: "translateZ(12px)" }}>
          {book.cover_image ? (
            <Image src={book.cover_image} alt={`غلاف ملزمة ${book.title}`} fill sizes="260px" priority={priority} draggable={false} className="pointer-events-none object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-gold"><BookOpen className="h-10 w-10" /></div>
          )}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: glare, background: "linear-gradient(105deg, #fff 0%, transparent 35%, transparent 70%, rgba(0,0,0,.6) 100%)" }} />
        </div>

        {/* الكعب (يمين الملزمة العربية) */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 flex w-6 items-center justify-center overflow-hidden rounded-sm bg-gradient-to-l from-[#3a1a12] via-[#5a2a1c] to-[#3a1a12]"
          style={{ transform: "translateX(12px) rotateY(90deg)" }}
        >
          <span className="whitespace-nowrap text-[10px] font-bold text-gold/80 [writing-mode:vertical-rl]">{book.title}</span>
        </div>

        {/* حافة الصفحات (يسار) */}
        <div
          aria-hidden
          className="absolute inset-y-[1.5%] left-0 w-6"
          style={{ transform: "translateX(-12px) rotateY(-90deg)", background: "repeating-linear-gradient(90deg,#f4ede4 0 2px,#d9cfc2 2px 3px)" }}
        />

        {/* الغلاف الخلفي */}
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center rounded-[8px_3px_3px_8px] bg-gradient-to-br from-[#3a1a12] to-[#1c0b13] p-4 text-center"
          style={{ transform: "rotateY(180deg) translateZ(12px)", backfaceVisibility: "hidden" }}
        >
          <div>
            <p className="font-[family-name:var(--font-ruqaa)] text-2xl text-gold">{book.title}</p>
            {book.subtitle && <p className="mt-1 text-xs text-rose/70">{book.subtitle}</p>}
            {book.publisher && <p className="mt-4 text-[10px] text-rose/40">{book.publisher}</p>}
          </div>
        </div>
      </motion.div>

      {/* الظل */}
      <motion.div aria-hidden style={{ x: shadowX }} className="mx-auto mt-6 h-4 w-3/4 rounded-[50%] bg-black/50 blur-md" />

      {hint && !touched && (
        <p className="pointer-events-none mt-3 flex items-center justify-center gap-1.5 text-xs text-rose/50">
          <Hand className="h-3.5 w-3.5 animate-bounce" /> اضغط أو اسحب لتدوير الملزمة
        </p>
      )}
    </div>
  );
}
