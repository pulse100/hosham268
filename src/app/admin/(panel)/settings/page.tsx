import { EntityForm } from "@/components/admin/EntityForm";
import { saveSettings } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { SETTINGS_FIELDS } from "@/lib/admin/entities";
import { seed } from "@/lib/seed";

export default async function SettingsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-white">الإعدادات العامة</h1>
      <EntityForm action={saveSettings} groups={SETTINGS_FIELDS} values={data ?? seed.settings} submitLabel="حفظ الإعدادات" />
    </>
  );
}
