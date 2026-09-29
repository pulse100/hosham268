import "server-only";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "../supabase/config";
import { createSessionClient } from "../supabase/server";

/** يتحقق أن المستخدم مسجّل دخول ومُدرج في جدول admins. يُستدعى في كل صفحة/إجراء إداري. */
export async function requireAdmin() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = await createSessionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/admin/login?error=forbidden");
  return { supabase, user };
}
