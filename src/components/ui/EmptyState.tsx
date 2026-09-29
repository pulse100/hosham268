import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, text, action }: {
  icon: LucideIcon; title: string; text?: string; action?: React.ReactNode;
}) {
  return (
    <div className="glass flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold"><Icon className="h-6 w-6" /></span>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {text && <p className="max-w-md text-sm leading-7 text-rose/60">{text}</p>}
      {action}
    </div>
  );
}
