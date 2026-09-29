import { ClipboardPen, Laptop, MonitorSmartphone, School } from "lucide-react";
import Link from "next/link";
import type { Course, CourseStatus, CourseType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EmptyState } from "../ui/EmptyState";
import { Stagger, StaggerItem } from "../ui/Reveal";

const typeInfo: Record<CourseType, { label: string; icon: typeof School }> = {
  in_person: { label: "حضوري", icon: School },
  online: { label: "إلكتروني", icon: Laptop },
  hybrid: { label: "حضوري + إلكتروني", icon: MonitorSmartphone },
};
const statusInfo: Record<CourseStatus, { label: string; cls: string }> = {
  open: { label: "مفتوحة للتسجيل", cls: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30" },
  closed: { label: "مغلقة", cls: "bg-white/5 text-rose/50 ring-white/10" },
  soon: { label: "قريباً", cls: "bg-gold/15 text-gold ring-gold/30" },
  contact: { label: "للاستفسار تواصل معنا", cls: "bg-sky-500/10 text-sky-200 ring-sky-400/25" },
};

export function Courses({ courses }: { courses: Course[] }) {
  if (!courses.length) return <EmptyState icon={ClipboardPen} title="لا توجد دورات منشورة حالياً" />;
  return (
    <Stagger className="auto-grid">
      {courses.map((c) => {
        const T = typeInfo[c.course_type]; const S = statusInfo[c.status];
        const href = c.register_url ?? `/contact?topic=${encodeURIComponent(c.title)}#register`;
        return (
          <StaggerItem key={c.id}>
            <article className="glass card-hover flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold/25 to-burgundy/30 text-gold"><T.icon className="h-6 w-6" /></span>
                <span className={cn("rounded-full px-3 py-1 text-xs ring-1", S.cls)}>{S.label}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{c.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="chip">{T.label}</span>
                {c.grade && <span className="chip">{c.grade}</span>}
                {c.academic_year && <span className="chip">{c.academic_year}</span>}
              </div>
              {c.description && <p className="mt-4 text-sm leading-7 text-rose/65">{c.description}</p>}
              <div className="mt-auto pt-6">
                {c.status === "closed" ? (
                  <span className="btn-ghost w-full cursor-not-allowed opacity-50">التسجيل مغلق</span>
                ) : c.register_url ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary w-full"><ClipboardPen className="h-4 w-4" /> التسجيل</a>
                ) : (
                  <Link href={href} className="btn-primary w-full"><ClipboardPen className="h-4 w-4" /> التسجيل</Link>
                )}
              </div>
            </article>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
