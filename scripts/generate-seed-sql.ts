/**
 * يولّد supabase/seed.sql من src/lib/seed.ts حتى يبقى المصدر واحداً.
 * التشغيل: npm run db:seed-sql
 */
import { writeFileSync } from "node:fs";
import { seed } from "../src/lib/seed.ts";

const lit = (v: unknown): string => {
  if (v === null || v === undefined) return "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  return `'${String(v).replace(/'/g, "''")}'`;
};

function inserts(table: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return `-- hm_${table}: لا توجد بيانات أولية\n`;
  const cols = Object.keys(rows[0]).filter((c) => c !== "id");
  const values = rows.map((r) => `  (${cols.map((c) => lit(r[c])).join(", ")})`).join(",\n");
  return `insert into public.hm_${table} (${cols.join(", ")}) values\n${values};\n`;
}

const s = seed.settings as unknown as Record<string, unknown>;
const settingsCols = Object.keys(s);
const out = [
  "-- ملف مولّد تلقائياً من src/lib/seed.ts — لا تعدله يدوياً (npm run db:seed-sql)",
  "-- يُشغَّل مرة واحدة بعد 0001_init.sql على قاعدة بيانات فارغة.\n",
  `insert into public.hm_site_settings (id, ${settingsCols.join(", ")}) values\n  (1, ${settingsCols.map((c) => lit(s[c])).join(", ")})\non conflict (id) do nothing;\n`,
  inserts("stats", seed.stats),
  inserts("locations", seed.locations),
  inserts("books", seed.books),
  inserts("courses", seed.courses),
  inserts("videos", seed.videos),
  inserts("social_links", seed.social),
  inserts("faqs", seed.faqs),
  inserts("announcements", seed.announcements),
  inserts("testimonials", seed.testimonials),
  inserts("sellers", seed.sellers),
  inserts("platform_agents", seed.agents),
  inserts("custom_sections", seed.customSections),
].join("\n");

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), out);
console.log("✓ supabase/seed.sql");
