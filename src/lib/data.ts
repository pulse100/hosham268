import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { seed } from "./seed";
import { isSupabaseConfigured } from "./supabase/config";
import { createPublicClient } from "./supabase/server";
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
    source: "seed",
  };
}

async function fromDatabase(): Promise<SiteData> {
  const db = createPublicClient();
  const list = (table: string, order = "sort_order") =>
    db.from(table).select("*").eq("is_active", true).order(order, { ascending: order === "sort_order" });

  const [settings, stats, locations, books, courses, videos, social, announcements, faqs, testimonials] =
    await Promise.all([
      db.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      list("stats"),
      list("locations"),
      list("books"),
      list("courses"),
      list("videos"),
      list("social_links"),
      list("announcements", "published_at"),
      list("faqs"),
      list("testimonials"),
    ]);

  const firstError = [settings, stats, locations, books, courses, videos, social, announcements, faqs, testimonials].find(
    (r) => r.error,
  )?.error;
  if (firstError) throw new Error(firstError.message);

  return {
    settings: { ...seed.settings, ...(settings.data ?? {}) },
    stats: stats.data ?? [],
    locations: locations.data ?? [],
    books: books.data ?? [],
    courses: courses.data ?? [],
    videos: videos.data ?? [],
    social: social.data ?? [],
    announcements: announcements.data ?? [],
    faqs: faqs.data ?? [],
    testimonials: testimonials.data ?? [],
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
