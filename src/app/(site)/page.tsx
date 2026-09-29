import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { AbwabCourse } from "@/components/site/AbwabCourse";
import { About } from "@/components/site/About";
import { BooksGrid } from "@/components/site/Books";
import { Contact } from "@/components/site/Contact";
import { CustomSections } from "@/components/site/CustomSections";
import { Courses } from "@/components/site/Courses";
import { Faq } from "@/components/site/Faq";
import { FeedSkeleton, LecturesFeed, NewsFeed } from "@/components/site/Feeds";
import { Hero } from "@/components/site/Hero";
import { Locations } from "@/components/site/Locations";
import { Platform } from "@/components/site/Platform";
import { QuickAccess } from "@/components/site/QuickAccess";
import { RepeatSystem } from "@/components/site/RepeatSystem";
import { Sellers } from "@/components/site/Sellers";
import { Social } from "@/components/site/Social";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteData } from "@/lib/data";

export const revalidate = 300;

const More = ({ href, label }: { href: string; label: string }) => (
  <div className="mt-8 text-center">
    <Link href={href} className="btn-ghost">{label} <ArrowUpLeft className="h-4 w-4" /></Link>
  </div>
);

export default async function HomePage() {
  const data = await getSiteData();
  const { settings, texts: t } = data;
  const youtube = data.social.find((s) => s.platform === "youtube");
  return (
    <>
      <Hero settings={settings} texts={t} />
      <QuickAccess texts={t} />
      <About settings={settings} texts={t} />
      <Stats stats={data.stats} />

      <section id="locations" className="section">
        <div className="container">
          <SectionHeading eyebrow={t["locations.eyebrow"]} title={t["locations.title"]} description={t["locations.desc"]} />
          <Locations locations={data.locations} />
        </div>
      </section>

      <section id="books" className="section overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-1/3 h-1/2 bg-gradient-to-b from-burgundy/15 to-transparent" />
        <div className="container relative">
          <SectionHeading eyebrow={t["books.eyebrow"]} title={t["books.title"]} description={t["books.desc"]} />
          <BooksGrid books={data.books} />
        </div>
      </section>

      <section id="order" className="section">
        <div className="container">
          <SectionHeading eyebrow={t["order.eyebrow"]} title={t["order.title"]} description={t["order.desc"]} />
          <Sellers sellers={data.sellers} />
        </div>
      </section>

      <Platform settings={settings} texts={t} />

      <section id="courses" className="section">
        <div className="container">
          <SectionHeading eyebrow={t["courses.eyebrow"]} title={t["courses.title"]} description={t["courses.desc"]} />
          <Courses courses={data.courses} />
        </div>
      </section>

      <AbwabCourse texts={t} agents={data.agents} />

      <RepeatSystem settings={settings} />

      <section id="lectures" className="section">
        <div className="container">
          <SectionHeading eyebrow={t["lectures.eyebrow"]} title={t["lectures.title"]} />
          <Suspense fallback={<FeedSkeleton />}>
            <LecturesFeed channelId={settings.youtube_channel_id} videos={data.videos} limit={3} channelUrl={youtube?.url} />
          </Suspense>
          <More href="/lectures" label="كل المحاضرات" />
        </div>
      </section>

      <section id="news" className="section">
        <div className="container">
          <SectionHeading eyebrow={t["news.eyebrow"]} title={t["news.title"]} />
          <Suspense fallback={<FeedSkeleton />}>
            <NewsFeed channel={settings.telegram_channel} announcements={data.announcements} limit={3} />
          </Suspense>
          <More href="/news" label="كل الأخبار" />
        </div>
      </section>

      <section id="social" className="section">
        <div className="container">
          <SectionHeading eyebrow={t["social.eyebrow"]} title={t["social.title"]} center />
          <Social links={data.social} />
        </div>
      </section>

      <CustomSections sections={data.customSections} />

      {data.testimonials.length > 0 && (
        <section id="testimonials" className="section">
          <div className="container">
            <SectionHeading eyebrow={t["testimonials.eyebrow"]} title={t["testimonials.title"]} center />
            <Testimonials items={data.testimonials} />
          </div>
        </section>
      )}

      {data.faqs.length > 0 && (
        <section id="faq" className="section">
          <div className="container">
            <SectionHeading eyebrow={t["faq.eyebrow"]} title={t["faq.title"]} center />
            <Faq items={data.faqs} />
          </div>
        </section>
      )}

      <section id="contact" className="section">
        <div className="container">
          <SectionHeading eyebrow={t["contact.eyebrow"]} title={t["contact.title"]} description={t["contact.desc"]} />
          <Contact data={data} />
        </div>
      </section>
    </>
  );
}
