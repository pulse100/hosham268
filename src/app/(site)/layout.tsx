import { MotionProvider } from "@/components/ui/MotionProvider";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getSiteData } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();
  const { settings, social } = data;
  const url = siteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: settings.teacher_name.replace(/^الأستاذ\s*/, ""),
        honorificPrefix: "الأستاذ",
        jobTitle: settings.subtitle,
        description: settings.short_bio,
        image: settings.hero_image?.startsWith("http") ? settings.hero_image : `${url}${settings.hero_image}`,
        url,
        knowsAbout: ["اللغة العربية", "الأدب والنصوص", "قواعد اللغة العربية"],
        knowsLanguage: "ar",
        address: { "@type": "PostalAddress", addressLocality: "بغداد", addressCountry: "IQ" },
        sameAs: social.filter((s) => s.platform !== "platform").map((s) => s.url),
        ...(settings.phone_primary ? { telephone: settings.phone_primary } : {}),
      },
      { "@type": "WebSite", "@id": `${url}/#website`, url, name: settings.teacher_name, inLanguage: "ar", publisher: { "@id": `${url}/#person` } },
    ],
  };
  return (
    <MotionProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        تخطَّ إلى المحتوى
      </a>
      <Header name={settings.teacher_name} phone={settings.phone_primary} />
      <main id="main">{children}</main>
      <Footer data={data} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </MotionProvider>
  );
}
