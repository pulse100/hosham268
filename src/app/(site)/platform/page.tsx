import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Platform } from "@/components/site/Platform";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "منصة المعموري", description: "منصة المعموري: تطبيق تعليمي إلكتروني لتدريس اللغة العربية، متوفر على App Store وGoogle Play.", alternates: { canonical: "/platform" } };

export default async function PlatformPage() {
  const { settings, texts } = await getSiteData();
  return (
    <>
      <PageHeader title={settings.platform_name ?? "المنصة الإلكترونية"} description={settings.platform_description} />
      <div className="-mt-20 pb-10"><Platform settings={settings} texts={texts} /></div>
    </>
  );
}
