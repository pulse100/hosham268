"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Faq as FaqT } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Faq({ items }: { items: FaqT[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const uid = useId();
  return (
    <div className="mx-auto grid max-w-3xl gap-3">
      {items.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id} className={cn("glass overflow-hidden transition", isOpen && "border-gold/30")}>
            <h3>
              <button
                type="button"
                id={`${uid}-q-${f.id}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a-${f.id}`}
                onClick={() => setOpen(isOpen ? null : f.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-right text-base font-semibold text-white md:px-6"
              >
                {f.question}
                <Plus className={cn("h-5 w-5 shrink-0 text-gold transition-transform duration-300", isOpen && "rotate-45")} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-a-${f.id}`}
                  role="region"
                  aria-labelledby={`${uid}-q-${f.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <p className="whitespace-pre-line px-5 pb-5 leading-8 text-rose/70 md:px-6">{f.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
