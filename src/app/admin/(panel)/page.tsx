import { Inbox } from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { ENTITIES } from "@/lib/admin/entities";

export default async function Dashboard() {
  const { supabase } = await requireAdmin();
  const counts = await Promise.all(
    ENTITIES.map(async (e) => ({ e, n: (await supabase.from(e.table).select("id", { count: "exact", head: true })).count ?? 0 })),
  );
  const { count: newInquiries } = await supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new");
  return (
    <>
      <h1 className="text-3xl font-bold text-white">لوحة التحكم</h1>
      <p className="mt-2 text-rose/55">كل تعديل هنا يظهر على الموقع مباشرة بدون تعديل الكود.</p>
      <Link href="/admin/inquiries" className="glass card-hover mt-8 flex items-center gap-4 p-5">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-ink"><Inbox className="h-6 w-6" /></span>
        <span><span className="block text-2xl font-bold text-white">{newInquiries ?? 0}</span><span className="text-sm text-rose/60">طلبات تسجيل جديدة</span></span>
      </Link>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        <Link href="/admin/settings" className="glass card-hover p-5"><p className="font-semibold text-white">الإعدادات العامة</p><p className="mt-1 text-xs text-rose/50">الاسم، الصور، النبذة، الأرقام، المنصة</p></Link>
        {counts.map(({ e, n }) => (
          <Link key={e.key} href={`/admin/${e.key}`} className="glass card-hover p-5">
            <p className="text-2xl font-bold text-white">{n}</p><p className="mt-1 text-sm text-rose/60">{e.label}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
