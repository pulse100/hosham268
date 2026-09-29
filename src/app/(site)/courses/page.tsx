import type { Metadata } from "next";
import { AbwabCourse } from "@/components/site/AbwabCourse";
import { Courses } from "@/components/site/Courses";
import { PageHeader } from "@/components/site/PageHeader";
import { RepeatSystem } from "@/components/site/RepeatSystem";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "الدورات", description: "دورات الأستاذ هشام المعموري الحضورية والإلكترونية في اللغة العربية.", alternates: { canonical: "/courses" } };

export default async function CoursesPage() {
  const { courses, settings, texts, agents } = await getSiteData();
  return (
    <>
      <PageHeader title="الدورات" description="الدورات الحضورية والإلكترونية وحالة التسجيل في كل منها." />
      <section className="container pb-10"><Courses courses={courses} /></section>
      <AbwabCourse texts={texts} agents={agents} />
      <div className="pb-20"><RepeatSystem settings={settings} /></div>
    </>
  );
}
