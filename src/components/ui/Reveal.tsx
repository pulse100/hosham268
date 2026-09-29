"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  left: { hidden: { opacity: 0, x: -36 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 36 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
};

/** ظهور ناعم عند التمرير */
export function Reveal({
  children, from = "up", delay = 0, className, as = "div",
}: { children: ReactNode; from?: keyof typeof variants; delay?: number; className?: string; as?: "div" | "li" | "section" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={variants[from]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </M>
  );
}

/** حاوية لظهور العناصر تباعاً (stagger) */
export function Stagger({ children, className, gap = 0.08 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1 } }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
