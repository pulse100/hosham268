import type { Metadata } from "next";
import { Suspense } from "react";
import { FeedSkeleton, LecturesFeed } from "@/components/site/Feeds";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteData } from "@/lib/data";

export const revalidate = 1800;
export const metadata: Metadata = { title: "المحاضرات", description: "آخر محاضرات ومراجعات الأستاذ هشام المعموري في اللغة العربية على YouTube.", alternates: { canonical: "/lectures" } };

export default async function LecturesPage() {
  const { settings, videos, social } = await getSiteData();
  return (
    <>
      <PageHeader title="المحاضرات" description="آخر المحاضرات والمراجعات من قناة YouTube الرسمية." />
      <section className="container pb-24">
        <Suspense fallback={<FeedSkeleton count={6} />}>
          <LecturesFeed channelId={settings.youtube_channel_id} videos={videos} limit={12} channelUrl={social.find((s) => s.platform === "youtube")?.url} />
        </Suspense>
      </section>
    </>
  );
}
