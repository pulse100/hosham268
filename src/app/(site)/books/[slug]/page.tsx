import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Book3D } from "@/components/site/Book3D";
import { PageHeader } from "@/components/site/PageHeader";
import { Sellers } from "@/components/site/Sellers";
import { Reveal } from "@/components/ui/Reveal";
import { getSiteData } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { books } = await getSiteData();
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { books, settings } = await getSiteData();
  const b = books.find((x) => x.slug === slug);
  if (!b) return {};
  const title = `${b.title}${b.subtitle ? " " + b.subtitle : ""} — ${b.grade ?? ""}`;
  return {
    title,
    description: b.description ?? `ملزمة ${settings.teacher_name}`,
    alternates: { canonical: `/books/${b.slug}` },
    openGraph: { images: b.cover_image ? [{ url: b.cover_image }] : undefined },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const { books, settings, sellers, texts } = await getSiteData();
  const b = books.find((x) => x.slug === slug);
  if (!b) notFound();
  const features = (b.features ?? "").split("\n").map((f) => f.trim()).filter(Boolean);
  const meta = [
    ["الصف", b.grade], ["المادة", b.subject], ["السنة الدراسية", b.academic_year], ["الناشر", b.publisher],
  ].filter(([, v]) => v) as [string, string][];
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Book", name: `${b.title} ${b.subtitle ?? ""}`.trim(),
    author: { "@type": "Person", name: settings.teacher_name }, inLanguage: "ar",
    image: b.cover_image ? `${siteUrl()}${b.cover_image}` : undefined, educationalLevel: b.grade, publisher: b.publisher,
  };

  return (
    <>
      <PageHeader title={b.title} description={b.subtitle} crumbs={[{ href: "/books", label: "الملازم" }]} />
      <section className="container grid items-start gap-12 pb-24 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal from="scale" className="lg:sticky lg:top-28"><div className="py-6"><Book3D book={b} priority hint /></div></Reveal>
        <div>
          <dl className="glass grid grid-cols-2 gap-px overflow-hidden p-0 sm:grid-cols-4">
            {meta.map(([k, v]) => (
              <div key={k} className="bg-night/60 p-4"><dt className="text-xs text-rose/50">{k}</dt><dd className="mt-1 font-semibold text-white">{v}</dd></div>
            ))}
          </dl>
          {b.description && <p className="mt-8 text-lg leading-9 text-rose/75">{b.description}</p>}
          {features.length > 0 && (
            <ul className="mt-8 grid gap-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" /><span className="leading-8 text-rose/80">{f}</span></li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section className="container pb-24">
        <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">{texts["order.title"]}</h2>
        <Sellers sellers={sellers} openLabel="اطلب الملزمة" />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
