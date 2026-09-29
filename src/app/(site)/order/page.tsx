import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Sellers } from "@/components/site/Sellers";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "لطلب الملزمة — الوكلاء وأماكن البيع",
  description: "أماكن بيع ملازم الأستاذ هشام المعموري ووكلاؤها في المحافظات مع أرقام التواصل والعناوين.",
  alternates: { canonical: "/order" },
};

export default async function OrderPage() {
  const { sellers, texts } = await getSiteData();
  return (
    <>
      <PageHeader title={texts["order.title"]} description={texts["order.desc"]} />
      <section className="container pb-24"><Sellers sellers={sellers} /></section>
    </>
  );
}
