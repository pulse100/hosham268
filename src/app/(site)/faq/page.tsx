import type { Metadata } from "next";
import { Faq } from "@/components/site/Faq";
import { PageHeader } from "@/components/site/PageHeader";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "الأسئلة الشائعة", alternates: { canonical: "/faq" } };

export default async function FaqPage() {
  const { faqs } = await getSiteData();
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  return (
    <>
      <PageHeader title="الأسئلة الشائعة" />
      <section className="container pb-24"><Faq items={faqs} /></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
