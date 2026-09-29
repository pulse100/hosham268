import type { Metadata } from "next";
import { BooksGrid } from "@/components/site/Books";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "ملازم هشام المعموري",
  description: "ملازم الأستاذ هشام المعموري في اللغة العربية لطلبة السادس الإعدادي، مع طريقة الطلب والحجز.",
  alternates: { canonical: "/books" },
};

export default async function BooksPage() {
  const { books, settings } = await getSiteData();
  return (
    <>
      <PageHeader title={`ملازم ${settings.teacher_name}`} description="اختر الملزمة لعرض تفاصيلها وطريقة طلبها." />
      <section className="container pb-24"><BooksGrid books={books} /></section>
    </>
  );
}
