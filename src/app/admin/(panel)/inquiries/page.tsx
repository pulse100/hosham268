import { Phone } from "lucide-react";
import { InquiryActions } from "@/components/admin/InquiryActions";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate, formatPhone, telHref } from "@/lib/utils";

type Inquiry = { id: string; name: string; phone: string; grade: string | null; topic: string | null; message: string | null; status: "new" | "contacted" | "closed"; created_at: string };
const label = { new: "جديد", contacted: "تم التواصل", closed: "مغلق" } as const;

export default async function InquiriesPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("hm_inquiries").select("*").order("created_at", { ascending: false }).limit(200);
  const rows = (data ?? []) as Inquiry[];
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-white">طلبات التسجيل والاستفسارات</h1>
      {!rows.length && <div className="glass p-10 text-center text-rose/55">لا توجد طلبات بعد.</div>}
      <ul className="grid gap-3">
        {rows.map((r) => (
          <li key={r.id} className="glass p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-white">{r.name} <span className="chip mr-2">{label[r.status]}</span></p>
                <p className="mt-1 text-xs text-rose/45">{formatDate(r.created_at)} {r.grade && `· ${r.grade}`} {r.topic && `· ${r.topic}`}</p>
              </div>
              <a href={telHref(r.phone)} className="btn-ghost !py-2" dir="ltr"><Phone className="h-4 w-4" /> {formatPhone(r.phone)}</a>
            </div>
            {r.message && <p className="mt-3 whitespace-pre-line text-sm leading-7 text-rose/70">{r.message}</p>}
            <InquiryActions id={r.id} status={r.status} />
          </li>
        ))}
      </ul>
    </>
  );
}
