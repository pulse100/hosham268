"use client";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GeneratedCover } from "./GeneratedCover";

/**
 * ملزمة بشكلها الطبيعي «تطفو» بلا جاذبية:
 * - حركة طفو هادئة ومستمرة.
 * - عند مرور الماوس أو اللمس ينضغط الجزء الذي تلمسه للخلف (كأنك تدفع جسماً طافياً)،
 *   وعند الضغط يكون الدفع أقوى، ثم ترجع بنعومة لمكانها.
 */
export function Book3D({ book, priority = false, className }: { book: Book; priority?: boolean; hint?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0); // موقع اللمس أفقياً من -0.5 إلى 0.5
  const py = useMotionValue(0);
  const push = useMotionValue(0); // شدة الدفع 0 — 1
  const cfg = { stiffness: 140, damping: 16, mass: 0.8 };
  const spx = useSpring(px, cfg);
  const spy = useSpring(py, cfg);
  const spush = useSpring(push, cfg);
  // الجزء الملموس يرجع للخلف: لمس اليمين يدفع اليمين للداخل
  const rotateY = useTransform([spx, spush], ([x, p]: number[]) => -8 + x * (10 + 22 * p));
  const rotateX = useTransform([spy, spush], ([y, p]: number[]) => 3 - y * (8 + 16 * p));
  const z = useTransform(spush, [0, 1], [0, -40]);
  const glareX = useTransform(spx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(spy, [-0.5, 0.5], ["20%", "80%"]);
  const glare = useTransform([glareX, glareY], ([x, y]: string[]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,.45), transparent 55%)`);
  const ref = useRef<HTMLDivElement>(null);
  const [ripple, setRipple] = useState<{ x: number; y: number; k: number } | null>(null);

  const track = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const release = () => { px.set(0); py.set(0); push.set(0); };

  return (
    <div className={cn("relative mx-auto w-[70%] max-w-[260px] select-none", className)} style={{ perspective: 1100 }}>
      {/* طفو مستمر */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0], rotateZ: [-0.8, 0.8, -0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          ref={ref}
          className="relative touch-none"
          style={{ rotateY, rotateX, z, transformStyle: "preserve-3d" }}
          onPointerMove={(e) => { track(e); if (push.get() === 0) push.set(e.pointerType === "mouse" ? 0.25 : 0); }}
          onPointerDown={(e) => {
            track(e);
            push.set(1);
            const r = ref.current!.getBoundingClientRect();
            setRipple({ x: e.clientX - r.left, y: e.clientY - r.top, k: Date.now() });
          }}
          onPointerUp={() => push.set(0.25)}
          onPointerLeave={release}
          onPointerCancel={release}
        >
          {/* الغلاف */}
          <div className="relative aspect-[1563/2313] overflow-hidden rounded-[3px_8px_8px_3px] bg-wine shadow-[inset_-4px_0_8px_rgba(0,0,0,.35)]" style={{ transform: "translateZ(6px)" }}>
            {book.cover_image ? (
              <Image src={book.cover_image} alt={`غلاف ملزمة ${book.title}`} fill sizes="260px" priority={priority} draggable={false} className="pointer-events-none object-cover" />
            ) : (
              <GeneratedCover book={book} />
            )}
            {/* لمعة تتبع مكان اللمس */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: glare }}
            />
            {ripple && (
              <motion.span
                key={ripple.k}
                aria-hidden
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 6, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="pointer-events-none absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60"
                style={{ left: ripple.x, top: ripple.y }}
              />
            )}
          </div>
          {/* سُمك الملزمة: حافة الصفحات */}
          <div aria-hidden className="absolute inset-y-[1%] left-0 w-3" style={{ transform: "translateX(-6px) rotateY(-90deg)", background: "repeating-linear-gradient(90deg,#f4ede4 0 2px,#d9cfc2 2px 3px)" }} />
          <div aria-hidden className="absolute inset-0 rounded-[3px_8px_8px_3px] bg-[#2a1a12]" style={{ transform: "translateZ(-6px)" }} />
        </motion.div>
      </motion.div>

      {/* ظل يبتعد ويقترب مع الطفو */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { scaleX: [1, 0.85, 1], opacity: [0.55, 0.3, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mt-8 h-4 w-3/4 rounded-[50%] bg-black blur-md"
      />
    </div>
  );
}
