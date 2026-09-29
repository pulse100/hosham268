"use client";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/lib/inquiry";

export function InquiryForm({ defaultTopic = "", courses }: { defaultTopic?: string; courses: string[] }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, null);
  if (state?.ok)
    return (
      <div role="status" className="glass flex flex-col items-center gap-3 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-400" />
        <p className="text-lg font-semibold text-white">{state.message}</p>
      </div>
    );
  const err = (k: string) => state?.errors?.[k] && <p className="mt-1 text-xs text-red-300">{state.errors[k]}</p>;
  return (
    <form action={action} className="glass grid gap-4 p-6 md:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-rose/70">الاسم الكامل *</span>
          <input name="name" required autoComplete="name" className="field" aria-invalid={!!state?.errors?.name} />
          {err("name")}
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-rose/70">رقم الهاتف *</span>
          <input name="phone" required inputMode="tel" autoComplete="tel" dir="ltr" placeholder="07xx xxx xxxx" className="field text-right" aria-invalid={!!state?.errors?.phone} />
          {err("phone")}
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-rose/70">المرحلة</span>
          <select name="grade" className="field" defaultValue="">
            <option value="">اختر المرحلة</option>
            <option>السادس الإعدادي — علمي</option>
            <option>السادس الإعدادي — أدبي</option>
            <option>الخامس الإعدادي</option>
            <option>ولي أمر</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-rose/70">الموضوع</span>
          <input name="topic" list="topics" defaultValue={defaultTopic} className="field" placeholder="تسجيل / ملزمة / استفسار" />
          <datalist id="topics">{courses.map((c) => <option key={c} value={c} />)}<option value="طلب ملزمة" /><option value="استفسار عام" /></datalist>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="text-rose/70">رسالتك</span>
        <textarea name="message" rows={4} className="field resize-y" maxLength={1000} />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state && !state.ok && <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{state.message}</p>}
      <button type="submit" disabled={pending} className="btn-primary justify-self-start">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} إرسال الطلب
      </button>
    </form>
  );
}
