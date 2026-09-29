"use client";
import { useTransition } from "react";
import { deleteInquiry, setInquiryStatus } from "@/lib/admin/actions";
import { cn } from "@/lib/utils";

const STATUSES = [["new", "جديد"], ["contacted", "تم التواصل"], ["closed", "مغلق"]] as const;

export function InquiryActions({ id, status }: { id: string; status: string }) {
  const [pending, start] = useTransition();
  return (
    <div className={cn("mt-4 flex flex-wrap gap-2", pending && "opacity-50")}>
      {STATUSES.map(([s, l]) => (
        <button key={s} disabled={pending || s === status} onClick={() => start(() => setInquiryStatus(id, s))}
          className={cn("rounded-full px-3 py-1.5 text-xs ring-1", s === status ? "bg-gold/20 text-gold ring-gold/40" : "text-rose/60 ring-line/10 hover:text-white")}>{l}</button>
      ))}
      <button disabled={pending} onClick={() => confirm("حذف الطلب؟") && start(() => deleteInquiry(id))} className="mr-auto rounded-full px-3 py-1.5 text-xs text-red-300/70 ring-1 ring-red-400/20 hover:bg-red-500/10">حذف</button>
    </div>
  );
}
