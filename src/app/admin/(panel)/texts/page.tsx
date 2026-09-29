import { EntityForm } from "@/components/admin/EntityForm";
import { saveTexts } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import type { Field } from "@/lib/admin/entities";
import { TEXT_DEFAULTS, TEXT_GROUPS } from "@/lib/texts";

export default async function TextsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("hm_site_texts").select("key,value");
  const values: Record<string, unknown> = { ...TEXT_DEFAULTS, ...Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) };
  const groups = TEXT_GROUPS.map((g) => ({
    group: g.group,
    fields: Object.entries(g.items).map(([name, d]): Field => ({ name, label: d.label, type: d.long ? "textarea" : "text", width: d.long ? "full" : "half" })),
  }));
  return (
    <>
      <h1 className="text-3xl font-bold text-white">نصوص وعناوين الموقع</h1>
      <p className="mb-6 mt-2 text-sm text-rose/55">عدّل أي عنوان أو نص يظهر في الموقع. اكتب {"{name}"} ليظهر اسم الأستاذ تلقائياً. إذا مسحت الحقل يرجع للنص الافتراضي.</p>
      <EntityForm action={saveTexts} groups={groups} values={values} submitLabel="حفظ النصوص" />
    </>
  );
}
