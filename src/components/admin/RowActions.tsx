"use client";
import { Eye, EyeOff, Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteEntity, toggleActive } from "@/lib/admin/actions";

export function RowActions({ entity, id, active }: { entity: string; id: string; active?: boolean }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex items-center gap-1">
      {active !== undefined && (
        <button type="button" disabled={pending} onClick={() => start(() => toggleActive(entity, id, !active))}
          className="grid h-9 w-9 place-items-center rounded-lg text-rose/60 hover:bg-white/5 hover:text-white" title={active ? "إخفاء" : "نشر"} aria-label={active ? "إخفاء" : "نشر"}>
          {active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>
      )}
      <button type="button" disabled={pending}
        onClick={() => { if (confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع.")) start(() => deleteEntity(entity, id)); }}
        className="grid h-9 w-9 place-items-center rounded-lg text-red-300/70 hover:bg-red-500/10 hover:text-red-300" title="حذف" aria-label="حذف">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
