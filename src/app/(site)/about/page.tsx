import type { Metadata } from "next";
import { About } from "@/components/site/About";
import { PageHeader } from "@/components/site/PageHeader";
import { Social } from "@/components/site/Social";
import { Stats } from "@/components/site/Stats";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteData } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData();
  return { title: `من هو ${settings.teacher_name}؟`, description: settings.short_bio ?? undefined, alternates: { canonical: "/about" } };
}

export default async function AboutPage() {
  const data = await getSiteData();
  return (
    <>
      <PageHeader title={`من هو ${data.settings.teacher_name}؟`} description={data.settings.subtitle} />
      <div className="-mt-16"><About settings={data.settings} /></div>
      <Stats stats={data.stats} />
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="الحسابات الرسمية" title="تابع الأستاذ" />
          <Social links={data.social} />
        </div>
      </section>
    </>
  );
}
