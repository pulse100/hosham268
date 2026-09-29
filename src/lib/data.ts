import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { seed } from "./seed";
import { isSupabaseConfigured } from "./supabase/config";
import { createPublicClient } from "./supabase/server";
import { resolveTexts } from "./texts";
import type { SiteData } from "./types";

export const CONTENT_TAG = "site-content";

const bySort = <T extends { sort_order?: number }>(a: T, b: T) => (a.sort_order ?? 0) - (b.sort_order ?? 0);

function fromSeed(): SiteData {
  const active = <T extends { is_active: boolean }>(rows: T[]) => rows.filter((r) => r.is_active);
  return {
    ...seed,
    stats: active(seed.stats).sort(bySort),
    locations: active(seed.locations).sort(bySort),
    books: active(seed.books).sort(bySort),
    courses: active(seed.courses).sort(bySort),
    videos: active(seed.videos).sort(bySort),
    social: active(seed.social).sort(bySort),
    announcements: active(seed.announcements),
    faqs: active(seed.faqs).sort(bySort),
    testimonials: active(seed.testimonials).sort(bySort),
    sellers: active(seed.sellers).sort(bySort),
    agents: active(seed.agents).sort(bySort),
    customSections: active(seed.customSections).sort(bySort),
    texts: resolveTexts({}, seed.settings.teacher_name),
    source: "seed",
  };
}

async function fromDatabase(): Promise<SiteData> {
  const db = createPublicClient();
  const list = (table: string, order = "sort_order") =>
    db.from(table).select("*").eq("is_active", true).order(order, { ascending: order === "sort_order" });

  const [settings, stats, locations, books, courses, videos, social, announcements, faqs, testimonials, sellers, agents, customSections, texts] =
    await Promise.all([
      db.from("hm_site_settings").select("*").eq("id", 1).maybeSingle(),
      list("hm_stats"),
      list("hm_locations"),
      list("hm_books"),
      list("hm_courses"),
      list("hm_videos"),
      list("hm_social_links"),
      list("hm_announcements", "published_at"),
      list("hm_faqs"),
      list("hm_testimonials"),
      list("hm_sellers"),
      list("hm_platform_agents"),
      list("hm_custom_sections"),
      db.from("hm_site_texts").select("key,value"),
    ]);

  const firstError = [settings, stats, locations, books, courses, videos, social, announcements, faqs, testimonials, sellers, agents, customSections, texts].find(
    (r) => r.error,
  )?.error;
  if (firstError) throw new Error(firstError.message);

  const mergedSettings = { ...seed.settings, ...(settings.data ?? {}) };
  const savedTexts = Object.fromEntries((texts.data ?? []).map((r: { key: string; value: string }) => [r.key, r.value]));
  return {
    settings: mergedSettings,
    stats: stats.data ?? [],
    locations: locations.data ?? [],
    books: books.data ?? [],
    courses: courses.data ?? [],
    videos: videos.data ?? [],
    social: social.data ?? [],
    announcements: announcements.data ?? [],
    faqs: faqs.data ?? [],
    testimonials: testimonials.data ?? [],
    sellers: sellers.data ?? [],
    agents: agents.data ?? [],
    customSections: customSections.data ?? [],
    texts: resolveTexts(savedTexts, mergedSettings.teacher_name),
    source: "database",
  } as SiteData;
}

const cachedDatabase = unstable_cache(fromDatabase, ["site-data"], { tags: [CONTENT_TAG], revalidate: 300 });

/** كل محتوى الموقع العام. يُخزَّن مؤقتاً ويُحدَّث فوراً عند أي تعديل من لوحة الإدارة. */
export const getSiteData = cache(async (): Promise<SiteData> => {
  if (!isSupabaseConfigured) return fromSeed();
  try {
    return await cachedDatabase();
  } catch (e) {
    console.error("[data] Supabase unavailable, falling back to seed:", e);
    return fromSeed();
  }
});
