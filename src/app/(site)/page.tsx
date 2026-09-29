import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { About } from "@/components/site/About";
import { BooksGrid } from "@/components/site/Books";
import { Contact } from "@/components/site/Contact";
import { Courses } from "@/components/site/Courses";
import { Faq } from "@/components/site/Faq";
import { FeedSkeleton, LecturesFeed, NewsFeed } from "@/components/site/Feeds";
import { Hero } from "@/components/site/Hero";
import { Locations } from "@/components/site/Locations";
import { Platform } from "@/components/site/Platform";
import { QuickAccess } from "@/components/site/QuickAccess";
import { RepeatSystem } from "@/components/site/RepeatSystem";
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
  const { settings } = data;
  const youtube = data.social.find((s) => s.platform === "youtube");
  return (
    <>
      <Hero settings={settings} />
      <QuickAccess />
      <About settings={settings} />
      <Stats stats={data.stats} />

      <section id="locations" className="section">
        <div className="container">
          <SectionHeading eyebrow="الدروس الحضورية" title="أماكن التدريس في بغداد" description="اختر المعهد الأقرب إليك لعرض تفاصيله والحصول على الاتجاهات." />
          <Locations locations={data.locations} />
        </div>
      </section>

      <section id="books" className="section overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-1/3 h-1/2 bg-gradient-to-b from-burgundy/15 to-transparent" />
        <div className="container relative">
          <SectionHeading eyebrow="الملازم" title={`ملازم ${settings.teacher_name}`} description="ملازم اللغة العربية لطلبة السادس الإعدادي." />
          <BooksGrid books={data.books} />
        </div>
      </section>

      <Platform settings={settings} />

      <section id="courses" className="section">
        <div className="container">
          <SectionHeading eyebrow="التسجيل" title="الدورات" description="الدورات الحضورية والإلكترونية — اختر الدورة المناسبة وسجّل مباشرة." />
          <Courses courses={data.courses} />
        </div>
      </section>

      <RepeatSystem settings={settings} />

      <section id="lectures" className="section">
        <div className="container">
          <SectionHeading eyebrow="YouTube" title="آخر المحاضرات" />
          <Suspense fallback={<FeedSkeleton />}>
            <LecturesFeed channelId={settings.youtube_channel_id} videos={data.videos} limit={3} channelUrl={youtube?.url} />
          </Suspense>
          <More href="/lectures" label="كل المحاضرات" />
        </div>
      </section>

      <section id="news" className="section">
        <div className="container">
          <SectionHeading eyebrow="Telegram" title="آخر الأخبار والإعلانات" />
          <Suspense fallback={<FeedSkeleton />}>
            <NewsFeed channel={settings.telegram_channel} announcements={data.announcements} limit={3} />
          </Suspense>
          <More href="/news" label="كل الأخبار" />
        </div>
      </section>

      <section id="social" className="section">
        <div className="container">
          <SectionHeading eyebrow="الحسابات الرسمية" title={`تابع ${settings.teacher_name}`} center />
          <Social links={data.social} />
        </div>
      </section>

      {data.testimonials.length > 0 && (
        <section id="testimonials" className="section">
          <div className="container">
            <SectionHeading eyebrow="آراء الطلاب" title="ماذا يقول الطلاب" center />
            <Testimonials items={data.testimonials} />
          </div>
        </section>
      )}

      {data.faqs.length > 0 && (
        <section id="faq" className="section">
          <div className="container">
            <SectionHeading eyebrow="الأسئلة الشائعة" title="عندك سؤال؟" center />
            <Faq items={data.faqs} />
          </div>
        </section>
      )}

      <section id="contact" className="section">
        <div className="container">
          <SectionHeading eyebrow="تواصل معنا" title="تواصل معنا" description="اتصل مباشرة أو أرسل طلب تسجيل وسنعاود الاتصال بك." />
          <Contact data={data} />
        </div>
      </section>
    </>
  );
}
