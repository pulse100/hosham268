"use client";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import type { Field } from "@/lib/admin/entities";
import { cn } from "@/lib/utils";

function ImageInput({ f, value }: { f: Field; value: string }) {
  const [preview, setPreview] = useState(value);
  const [url, setUrl] = useState(value);
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-xl border border-line/10 bg-ink/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : <ImagePlus className="h-6 w-6 text-rose/30" />}
      </div>
      <div className="grid flex-1 gap-2">
        <input
          type="file"
          name={`${f.name}__file`}
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="field file:ml-3 file:rounded-lg file:border-0 file:bg-gold file:px-3 file:py-1.5 file:text-ink"
          onChange={(e) => { const file = e.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)); }}
        />
        <input name={f.name} value={url} onChange={(e) => { setUrl(e.target.value); setPreview(e.target.value); }} dir="ltr" placeholder="أو الصق رابط صورة من مكتبة الموقع (Supabase)" className="field text-xs" />
      </div>
    </div>
  );
}

export function FormField({ f, value, error }: { f: Field; value: unknown; error?: string }) {
  const v = value == null ? "" : String(value);
  const common = { name: f.name, id: f.name, required: f.required, placeholder: f.placeholder, dir: f.dir, "aria-invalid": !!error };
  let input: React.ReactNode;
  switch (f.type) {
    case "textarea": input = <textarea {...common} defaultValue={v} rows={5} className="field resize-y" />; break;
    case "boolean":
      input = (
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line/10 bg-ink/40 px-4 py-3">
          <input type="checkbox" name={f.name} defaultChecked={Boolean(value)} className="h-5 w-5 accent-[rgb(var(--gold))]" />
          <span className="text-sm">{f.label}</span>
        </label>
      );
      break;
    case "select":
      input = (
        <select {...common} defaultValue={v} className="field">
          {!f.required && <option value="">—</option>}
          {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
      break;
    case "image": input = <ImageInput f={f} value={v} />; break;
    case "number": input = <input {...common} type="number" step="1" defaultValue={v} className="field" />; break;
    case "float": input = <input {...common} type="number" step="any" defaultValue={v} className="field" dir="ltr" />; break;
    case "date": input = <input {...common} type="date" defaultValue={v.slice(0, 10)} className="field" />; break;
    case "url": input = <input {...common} type="text" inputMode="url" dir="ltr" defaultValue={v} className="field" />; break;
    case "tel": input = <input {...common} type="tel" dir="ltr" defaultValue={v} className="field text-right" />; break;
    default: input = <input {...common} type="text" defaultValue={v} className="field" />;
  }
  return (
    <div className={cn("grid content-start gap-1.5", f.width !== "half" && "sm:col-span-2")}>
      {f.type !== "boolean" && (
        <label htmlFor={f.name} className="text-sm text-rose/75">
          {f.label} {f.required && <span className="text-gold">*</span>}
        </label>
      )}
      {input}
      {f.help && <p className="text-xs text-rose/40">{f.help}</p>}
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}
