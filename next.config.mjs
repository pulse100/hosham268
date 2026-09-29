import { existsSync } from "node:fs";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

// إذا نُشر الموقع بدون مجلد الصور (نشر مباشر للكود فقط) تُجلب الصور من نسخة المستودع العامة على GitHub عبر jsDelivr
const hasLocalImages = existsSync(new URL("./public/images/teacher-hero.webp", import.meta.url));
const IMAGE_CDN = "https://cdn.jsdelivr.net/gh/pulse100/hosham268@main/public/images";
/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    unoptimized: !hasLocalImages,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      ...(supabaseHost ? [{ protocol: "https", hostname: supabaseHost }] : []),
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "cdn4.telesco.pe" },
      { protocol: "https", hostname: "cdn5.telesco.pe" },
      { protocol: "https", hostname: "cdn1.telesco.pe" },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: "6mb" },
  },
  async rewrites() {
    return hasLocalImages ? [] : [{ source: "/images/:file*", destination: `${IMAGE_CDN}/:file*` }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
