import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/** عميل مرتبط بجلسة المستخدم (للوحة الإدارة) — يحترم RLS */
export async function createSessionClient() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // يُستدعى من Server Component — تحديث الكوكيز يتم في middleware
        }
      },
    },
  });
}

/** عميل عام بدون جلسة (للقراءة العامة والتخزين المؤقت) — يرى المحتوى المنشور فقط */
export function createPublicClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
