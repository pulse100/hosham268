import "server-only";
import type { TelegramPost, Video, YoutubeItem } from "./types";
import { parseYoutube } from "./utils";

const decode = (s: string) =>
  s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .trim();

/**
 * آخر منشورات قناة Telegram العامة عبر صفحة المعاينة العامة t.me/s/<channel>.
 * لا يحتاج Bot أو مفاتيح. عند الفشل يُرجع مصفوفة فارغة (ولا تُعرض بيانات وهمية).
 */
export async function fetchTelegramPosts(channel: string, limit = 6): Promise<TelegramPost[]> {
  const safe = channel.replace(/[^\w]/g, "");
  if (!safe) return [];
  const res = await fetch(`https://t.me/s/${safe}`, {
    next: { revalidate: 900 },
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SiteFeed/1.0)", "Accept-Language": "ar" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}`);
  const html = await res.text();

  const chunks = html.split('class="tgme_widget_message ').slice(1);
  const posts: TelegramPost[] = [];
  for (const c of chunks) {
    const post = c.match(/data-post="([^"]+)"/)?.[1];
    if (!post) continue;
    const textHtml = c.match(/class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
    const text = decode(textHtml);
    const image = c.match(/tgme_widget_message_photo_wrap[^>]*background-image:url\('([^']+)'\)/)?.[1] ?? null;
    const date = c.match(/<time[^>]*datetime="([^"]+)"/)?.[1] ?? null;
    if (!text && !image) continue;
    posts.push({ id: post, url: `https://t.me/${post}`, text, image, date });
  }
  return posts.reverse().slice(0, limit); // الأحدث أولاً
}

const isoDuration = (iso: string) => {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return null;
  const [h, mi, s] = [m[1], m[2], m[3]].map((x) => Number(x ?? 0));
  const pad = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(mi)}:${pad(s)}` : `${mi}:${pad(s)}`;
};

/** آخر فيديوهات القناة من RSS العام (بدون مفتاح)، مع المدة إذا توفر YOUTUBE_API_KEY. */
export async function fetchChannelVideos(channelId: string, limit = 6): Promise<YoutubeItem[]> {
  if (!/^UC[\w-]{10,}$/.test(channelId)) return [];
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    next: { revalidate: 1800 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`YouTube RSS ${res.status}`);
  const xml = await res.text();
  const items: YoutubeItem[] = xml
    .split("<entry>")
    .slice(1, limit + 1)
    .map((e) => {
      const id = e.match(/<yt:videoId>([^<]+)</)?.[1] ?? "";
      return {
        id,
        url: `https://www.youtube.com/watch?v=${id}`,
        title: decode(e.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        published_at: e.match(/<published>([^<]+)</)?.[1] ?? null,
        duration: null,
      };
    })
    .filter((v) => v.id);

  const key = process.env.YOUTUBE_API_KEY;
  if (key && items.length) {
    try {
      const r = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${items.map((i) => i.id).join(",")}&key=${key}`,
        { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000) },
      );
      if (r.ok) {
        const j = (await r.json()) as { items: { id: string; contentDetails: { duration: string } }[] };
        const map = new Map(j.items.map((i) => [i.id, isoDuration(i.contentDetails.duration)]));
        items.forEach((i) => (i.duration = map.get(i.id) ?? null));
      }
    } catch {
      /* المدة اختيارية */
    }
  }
  return items;
}

/** تحويل فيديوهات الإدارة إلى الصيغة الموحدة (تظهر أولاً كفيديوهات مثبتة) */
export function manualVideos(videos: Video[]): YoutubeItem[] {
  return videos.map((v) => {
    const { videoId, listId } = parseYoutube(v.youtube_url);
    return {
      id: videoId ?? listId ?? v.id,
      url: v.youtube_url,
      title: v.title,
      thumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "",
      duration: v.duration ?? (listId && !videoId ? "قائمة تشغيل" : null),
      published_at: v.published_at,
      pinned: true,
    };
  });
}
