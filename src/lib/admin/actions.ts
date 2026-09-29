"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { CONTENT_TAG } from "../data";
import { isSupabaseConfigured } from "../supabase/config";
import { createSessionClient } from "../supabase/server";
import { requireAdmin } from "./auth";
import { getEntity, SETTINGS_FIELDS, type Field } from "./entities";

export type FormState = { ok: boolean; message: string; errors?: Record<string, string> } | null;

const MAX_IMAGE = 5 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" };

// ── تسجيل الدخول ──
export async function login(_: FormState, form: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return { ok: false, message: "لم يتم ربط Supabase بعد (راجع ملف README)." };
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return { ok: false, message: "أدخل البريد الإلكتروني وكلمة المرور." };
  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { ok: false, message: "بيانات الدخول غير صحيحة." };
  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    return { ok: false, message: "هذا الحساب لا يملك صلاحية الإدارة." };
  }
  redirect("/admin");
}

export async function logout() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ── تحويل بيانات النموذج حسب نوع الحقل ──
async function readFields(fields: Field[], form: FormData, folder: string, supabase: Awaited<ReturnType<typeof createSessionClient>>) {
  const row: Record<string, unknown> = {};
  const errors: Record<string, string> = {};

  for (const f of fields) {
    const raw = form.get(f.name);
    const str = typeof raw === "string" ? raw.trim() : "";
    switch (f.type) {
      case "boolean":
        row[f.name] = raw === "on";
        break;
      case "number":
      case "float": {
        if (!str) { row[f.name] = null; break; }
        const n = f.type === "number" ? parseInt(str, 10) : parseFloat(str);
        if (Number.isNaN(n)) errors[f.name] = "رقم غير صالح";
        row[f.name] = n;
        break;
      }
      case "url":
        if (str && !/^(https?:\/\/|\/)/.test(str)) errors[f.name] = "يجب أن يبدأ الرابط بـ https://";
        row[f.name] = str || null;
        break;
      case "tel":
        if (str && !/^[0-9+ ]{5,20}$/.test(str)) errors[f.name] = "رقم غير صالح";
        row[f.name] = str || null;
        break;
      case "image": {
        const file = form.get(`${f.name}__file`);
        const current = String(form.get(f.name) ?? "").trim();
        if (file instanceof File && file.size > 0) {
          const ext = IMAGE_TYPES[file.type];
          if (!ext) { errors[f.name] = "الصيغ المسموحة: JPG, PNG, WebP, AVIF"; break; }
          if (file.size > MAX_IMAGE) { errors[f.name] = "الحد الأقصى 5MB"; break; }
          const path = `${folder}/${crypto.randomUUID()}.${ext}`;
          const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type, cacheControl: "31536000" });
          if (error) { errors[f.name] = "فشل رفع الصورة"; break; }
          row[f.name] = supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
        } else {
          row[f.name] = current || null;
        }
        break;
      }
      default:
        row[f.name] = str || null;
    }
    if (f.required && (row[f.name] === null || row[f.name] === "")) errors[f.name] = "هذا الحقل مطلوب";
  }
  return { row, errors };
}

function refresh() {
  revalidateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

// ── الإعدادات العامة ──
export async function saveSettings(_: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = SETTINGS_FIELDS.flatMap((g) => g.fields);
  const { row, errors } = await readFields(fields, form, "settings", supabase);
  if (Object.keys(errors).length) return { ok: false, message: "تحقق من الحقول", errors };
  const { error } = await supabase.from("site_settings").upsert({ id: 1, ...row, updated_at: new Date().toISOString() });
  if (error) return { ok: false, message: `خطأ في الحفظ: ${error.message}` };
  refresh();
  return { ok: true, message: "تم حفظ الإعدادات" };
}

// ── إضافة / تعديل عنصر ──
export async function saveEntity(entityKey: string, id: string | null, _: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const entity = getEntity(entityKey);
  if (!entity) return { ok: false, message: "قسم غير معروف" };
  const { row, errors } = await readFields(entity.fields, form, entity.key, supabase);
  if (entity.key === "books" && typeof row.slug === "string" && !/^[a-z0-9-]+$/.test(row.slug))
    errors.slug = "أحرف إنجليزية صغيرة وأرقام وشرطات فقط";
  if (entity.key === "testimonials" && row.rating != null && ((row.rating as number) < 1 || (row.rating as number) > 5))
    errors.rating = "من 1 إلى 5";
  if (Object.keys(errors).length) return { ok: false, message: "تحقق من الحقول", errors };

  const q = id ? supabase.from(entity.table).update(row).eq("id", id) : supabase.from(entity.table).insert(row);
  const { error } = await q;
  if (error) return { ok: false, message: error.code === "23505" ? "القيمة مستخدمة مسبقاً (الرابط المختصر مكرر)" : `خطأ في الحفظ: ${error.message}` };
  refresh();
  redirect(`/admin/${entity.key}?saved=1`);
}

export async function deleteEntity(entityKey: string, id: string) {
  const { supabase } = await requireAdmin();
  const entity = getEntity(entityKey);
  if (!entity) return;
  await supabase.from(entity.table).delete().eq("id", id);
  refresh();
  revalidatePath(`/admin/${entity.key}`);
}

export async function toggleActive(entityKey: string, id: string, value: boolean) {
  const { supabase } = await requireAdmin();
  const entity = getEntity(entityKey);
  if (!entity) return;
  await supabase.from(entity.table).update({ is_active: value }).eq("id", id);
  refresh();
  revalidatePath(`/admin/${entity.key}`);
}

export async function setInquiryStatus(id: string, status: "new" | "contacted" | "closed") {
  const { supabase } = await requireAdmin();
  await supabase.from("inquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("inquiries").delete().eq("id", id);
  revalidatePath("/admin/inquiries");
}
