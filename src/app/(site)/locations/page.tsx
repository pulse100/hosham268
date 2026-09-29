import type { Metadata } from "next";
import { Locations } from "@/components/site/Locations";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "أماكن التدريس في بغداد",
  description: "معاهد الأستاذ هشام المعموري في بغداد على الخريطة: المنصور، زيونة، البنوك، صليخ.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsPage() {
  const { locations } = await getSiteData();
  return (
    <>
      <PageHeader title="أماكن التدريس في بغداد" description="اضغط على أي معهد لعرض التفاصيل والحصول على الاتجاهات." />
      <section className="container pb-24"><Locations locations={locations} /></section>
    </>
  );
}
