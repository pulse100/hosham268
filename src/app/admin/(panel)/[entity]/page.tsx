import { CheckCircle2, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RowActions } from "@/components/admin/RowActions";
import { requireAdmin } from "@/lib/admin/auth";
import { getEntity } from "@/lib/admin/entities";

type Props = { params: Promise<{ entity: string }>; searchParams: Promise<{ saved?: string }> };

export default async function EntityList({ params, searchParams }: Props) {
  const [{ entity: key }, { saved }] = await Promise.all([params, searchParams]);
  const entity = getEntity(key);
  if (!entity) notFound();
  const { supabase } = await requireAdmin();
  const { data: rows, error } = await supabase.from(entity.table).select("*").order(entity.orderBy, { ascending: entity.ascending });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-white">{entity.label}</h1>
        <Link href={`/admin/${entity.key}/new`} className="btn-primary"><Plus className="h-4 w-4" /> إضافة {entity.singular}</Link>
      </div>
      {saved && <p role="status" className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-300"><CheckCircle2 className="h-4 w-4" /> تم الحفظ بنجاح</p>}
      {error && <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">خطأ في التحميل: {error.message}</p>}
      {rows && rows.length === 0 && <div className="glass p-10 text-center text-rose/55">لا توجد عناصر بعد — ابدأ بإضافة {entity.singular}.</div>}
      <ul className="grid gap-2">
        {rows?.map((r: Record<string, unknown>) => (
          <li key={String(r.id)} className="glass flex items-center gap-3 p-3 pr-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{String(r[entity.titleField] ?? "—")}</p>
              {entity.subtitleField && r[entity.subtitleField] != null && <p className="truncate text-xs text-rose/45">{String(r[entity.subtitleField])}</p>}
            </div>
            {"is_active" in r && !r.is_active && <span className="chip !text-rose/50">مخفي</span>}
            <Link href={`/admin/${entity.key}/${r.id}`} className="grid h-9 w-9 place-items-center rounded-lg text-rose/60 hover:bg-white/5 hover:text-white" aria-label="تعديل"><Pencil className="h-4 w-4" /></Link>
            <RowActions entity={entity.key} id={String(r.id)} active={"is_active" in r ? Boolean(r.is_active) : undefined} />
          </li>
        ))}
      </ul>
    </>
  );
}
