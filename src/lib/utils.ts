import clsx, { type ClassValue } from "clsx";
import type { Location } from "./types";

export const cn = (...v: ClassValue[]) => clsx(v);

/** رابط اتصال مباشر */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** تحويل رقم عراقي محلي (07...) إلى صيغة دولية لواتساب */
export const whatsappHref = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  const intl = d.startsWith("0") ? `964${d.slice(1)}` : d;
  return `https://wa.me/${intl}`;
};

/** تنسيق رقم الهاتف للعرض: 0770 999 7990 */
export const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return d.length === 11 ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}` : phone;
};

const placeQuery = (l: Location) => `${l.name}، ${l.area}، بغداد`;

/** رابط فتح موقع المعهد على الخريطة */
export function mapsUrl(l: Location) {
  if (l.maps_url) return l.maps_url;
  if (l.lat != null && l.lng != null && !l.is_approximate)
    return `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`;
  // الموقع غير محدد بدقة: نبحث بالاسم والمنطقة بدل إعطاء نقطة قد تكون خاطئة
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery(l))}`;
}

/** رابط الاتجاهات إلى المعهد */
export function directionsUrl(l: Location) {
  const dest =
    l.lat != null && l.lng != null && !l.is_approximate
      ? `${l.lat},${l.lng}`
      : encodeURIComponent(placeQuery(l));
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
}

/** استخراج معرف فيديو YouTube أو قائمة التشغيل من الرابط */
export function parseYoutube(url: string): { videoId: string | null; listId: string | null } {
  try {
    const u = new URL(url);
    const listId = u.searchParams.get("list");
    let videoId = u.searchParams.get("v");
    if (!videoId && u.hostname.includes("youtu.be")) videoId = u.pathname.slice(1) || null;
    if (!videoId) {
      const m = u.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{6,})/);
      if (m) videoId = m[1];
    }
    return { videoId, listId };
  } catch {
    return { videoId: null, listId: null };
  }
}

const arDate = new Intl.DateTimeFormat("ar-IQ", { year: "numeric", month: "long", day: "numeric" });
export const formatDate = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : arDate.format(d);
};

export const isExternal = (href: string) => /^https?:\/\//.test(href);

export const siteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
