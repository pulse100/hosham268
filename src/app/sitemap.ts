import type { MetadataRoute } from "next";
import { getSiteData } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = siteUrl();
  const { books } = await getSiteData();
  const pages = ["", "/about", "/books", "/order", "/locations", "/courses", "/platform", "/lectures", "/news", "/faq", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...books.map((b) => ({ url: `${url}/books/${b.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
