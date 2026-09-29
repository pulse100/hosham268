import type { Metadata } from "next";
import { Suspense } from "react";
import { FeedSkeleton, NewsFeed } from "@/components/site/Feeds";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteData } from "@/lib/data";

export const revalidate = 900;
export const metadata: Metadata = { title: "الأخبار والإعلانات", description: "آخر إعلانات الأستاذ هشام المعموري ومنشورات قناة Telegram الرسمية.", alternates: { canonical: "/news" } };

export default async function NewsPage() {
  const { settings, announcements } = await getSiteData();
  return (
    <>
      <PageHeader title="الأخبار والإعلانات" description="الإعلانات الرسمية وآخر منشورات قناة Telegram." />
      <section className="container pb-24">
        <Suspense fallback={<FeedSkeleton count={6} />}>
          <NewsFeed channel={settings.telegram_channel} announcements={announcements} limit={12} />
        </Suspense>
      </section>
    </>
  );
}
