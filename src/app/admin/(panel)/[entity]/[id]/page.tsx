import Link from "next/link";
import { notFound } from "next/navigation";
import { EntityForm } from "@/components/admin/EntityForm";
import { saveEntity } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { getEntity } from "@/lib/admin/entities";

export default async function EditEntity({ params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity: key, id } = await params;
  const entity = getEntity(key);
  if (!entity) notFound();
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from(entity.table).select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <>
      <Link href={`/admin/${entity.key}`} className="text-sm text-rose/50 hover:text-gold">← {entity.label}</Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold text-white">تعديل {entity.singular}</h1>
      <EntityForm action={saveEntity.bind(null, entity.key, id)} fields={entity.fields} values={data} />
    </>
  );
}
