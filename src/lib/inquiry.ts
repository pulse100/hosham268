"use server";
import { z } from "zod";
import { isSupabaseConfigured } from "./supabase/config";
import { createPublicClient } from "./supabase/server";

const schema = z.object({
  name: z.string().trim().min(2, "اكتب الاسم الكامل").max(80),
  phone: z.string().trim().regex(/^[0-9+ ]{7,20}$/, "رقم الهاتف غير صحيح"),
  grade: z.string().trim().max(40).optional(),
  topic: z.string().trim().max(120).optional(),
  message: z.string().trim().max(1000).optional(),
  website: z.string().max(0).optional(), // honeypot ضد السبام
});

export type InquiryState = { ok: boolean; message: string; errors?: Record<string, string> } | null;

export async function submitInquiry(_: InquiryState, form: FormData): Promise<InquiryState> {
  const parsed = schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((i) => (errors[String(i.path[0])] = i.message));
    return { ok: false, message: "تحقق من الحقول المطلوبة", errors };
  }
  if (!isSupabaseConfigured) return { ok: false, message: "استقبال الطلبات غير مفعّل حالياً — يرجى الاتصال مباشرة على الأرقام." };

  const { website: _hp, ...row } = parsed.data;
  const { error } = await createPublicClient().from("hm_inquiries").insert(row);
  if (error) return { ok: false, message: "تعذّر إرسال الطلب، حاول مرة أخرى أو اتصل بنا مباشرة." };
  return { ok: true, message: "تم استلام طلبك بنجاح، سنتواصل معك قريباً." };
}
