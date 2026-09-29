import Link from "next/link";
import { notFound } from "next/navigation";
import { EntityForm } from "@/components/admin/EntityForm";
import { saveEntity } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { getEntity } from "@/lib/admin/entities";

export default async function NewEntity({ params }: { params: Promise<{ entity: string }> }) {
  const { entity: key } = await params;
  const entity = getEntity(key);
  if (!entity) notFound();
  await requireAdmin();
  const defaults: Record<string, unknown> = { is_active: true, sort_order: 0, is_approximate: true, published_at: new Date().toISOString().slice(0, 10) };
  if (entity.key === "testimonials") defaults.is_active = false;
  if (entity.key === "sections") defaults.layout = "image-left";
  return (
    <>
      <Link href={`/admin/${entity.key}`} className="text-sm text-rose/50 hover:text-gold">← {entity.label}</Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold text-white">إضافة {entity.singular}</h1>
      <EntityForm action={saveEntity.bind(null, entity.key, null)} fields={entity.fields} values={defaults} submitLabel="إضافة" />
    </>
  );
}
