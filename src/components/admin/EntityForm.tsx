"use client";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { useActionState } from "react";
import type { FormState } from "@/lib/admin/actions";
import type { Field } from "@/lib/admin/entities";
import { FormField } from "./FormFields";

export function EntityForm({ action, fields, groups, values, submitLabel = "حفظ" }: {
  action: (state: FormState, form: FormData) => Promise<FormState>;
  fields?: Field[];
  groups?: { group: string; fields: Field[] }[];
  values: Record<string, unknown>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  const sections = groups ?? [{ group: "", fields: fields ?? [] }];
  return (
    <form action={formAction} className="grid gap-6">
      {sections.map((s) => (
        <fieldset key={s.group} className="glass grid gap-5 p-5 sm:grid-cols-2 md:p-6">
          {s.group && <legend className="sr-only">{s.group}</legend>}
          {s.group && <h2 className="text-lg font-semibold text-white sm:col-span-2">{s.group}</h2>}
          {s.fields.map((f) => <FormField key={f.name} f={f} value={values[f.name]} error={state?.errors?.[f.name]} />)}
        </fieldset>
      ))}
      <div className="sticky bottom-4 z-10 flex items-center gap-4 rounded-2xl border border-line/10 bg-ink/90 p-3 backdrop-blur">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {submitLabel}
        </button>
        {state && (
          <p role="status" className={state.ok ? "flex items-center gap-2 text-sm text-emerald-300" : "text-sm text-red-300"}>
            {state.ok && <CheckCircle2 className="h-4 w-4" />} {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
