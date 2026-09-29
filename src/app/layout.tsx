import type { Metadata, Viewport } from "next";
import { Aref_Ruqaa, El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { getSiteData } from "@/lib/data";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const body = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const display = El_Messiri({ subsets: ["arabic", "latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const ruqaa = Aref_Ruqaa({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-ruqaa", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData();
  const title = `${settings.teacher_name} | ${settings.subtitle}`;
  const description = settings.seo_description ?? settings.short_bio ?? "";
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: title, template: `%s | ${settings.teacher_name}` },
    description,
    applicationName: settings.teacher_name,
    keywords: ["هشام المعموري", "الأستاذ هشام المعموري", "مدرس اللغة العربية", "ملازم هشام المعموري", "منصة المعموري", "السادس الإعدادي عربي"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "ar_IQ",
      siteName: settings.teacher_name,
      title,
      description,
      images: [{ url: "/images/og.jpg", width: 800, height: 420, alt: settings.teacher_name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/og.jpg"] },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true },
  };
}

export const viewport: Viewport = { themeColor: "#0b0918", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${body.variable} ${display.variable} ${ruqaa.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
