"use client";
import { Loader2, LockKeyhole } from "lucide-react";
import { useActionState } from "react";
import { login, type FormState } from "@/lib/admin/actions";

export function LoginForm({ initialError }: { initialError?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(login, initialError ? { ok: false, message: initialError } : null);
  return (
    <form action={action} className="glass grid gap-4 p-6 md:p-8">
      <div className="mb-2 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold"><LockKeyhole className="h-6 w-6" /></span>
        <div><h1 className="text-xl font-bold text-white">دخول الإدارة</h1><p className="text-xs text-rose/50">للمخوّلين فقط</p></div>
      </div>
      <label className="grid gap-1.5 text-sm"><span className="text-rose/70">البريد الإلكتروني</span>
        <input name="email" type="email" autoComplete="username" required dir="ltr" className="field" /></label>
      <label className="grid gap-1.5 text-sm"><span className="text-rose/70">كلمة المرور</span>
        <input name="password" type="password" autoComplete="current-password" required dir="ltr" className="field" /></label>
      {state && !state.ok && <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{state.message}</p>}
      <button disabled={pending} className="btn-primary mt-2">{pending && <Loader2 className="h-4 w-4 animate-spin" />} دخول</button>
    </form>
  );
}
