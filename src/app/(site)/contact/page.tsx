import type { Metadata } from "next";
import { Contact } from "@/components/site/Contact";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "تواصل معنا", description: "أرقام التواصل مع الأستاذ هشام المعموري وطلب التسجيل في الدورات.", alternates: { canonical: "/contact" } };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const [data, sp] = await Promise.all([getSiteData(), searchParams]);
  return (
    <>
      <PageHeader title="تواصل معنا" description="اتصل مباشرة أو أرسل طلب تسجيل وسنعاود الاتصال بك." />
      <section className="container pb-24"><Contact data={data} topic={(sp.topic ?? "").slice(0, 120)} /></section>
    </>
  );
}
