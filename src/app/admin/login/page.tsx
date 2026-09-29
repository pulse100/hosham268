import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="w-full max-w-md">
        {!isSupabaseConfigured ? (
          <div className="glass p-8 text-center leading-8 text-rose/75">
            <h1 className="mb-3 text-xl font-bold text-white">لوحة الإدارة غير مفعّلة بعد</h1>
            أضف متغيرات <code dir="ltr" className="text-gold">NEXT_PUBLIC_SUPABASE_URL</code> و
            <code dir="ltr" className="text-gold">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> ثم أعد تشغيل الموقع (راجع README).
          </div>
        ) : (
          <LoginForm initialError={error === "forbidden" ? "هذا الحساب لا يملك صلاحية الإدارة." : undefined} />
        )}
      </div>
    </main>
  );
}
