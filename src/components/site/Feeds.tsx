import { ArrowUpLeft, Megaphone, PlayCircle, Radio } from "lucide-react";
import Image from "next/image";
import { fetchChannelVideos, fetchTelegramPosts, manualVideos } from "@/lib/feeds";
import type { Announcement, Video, YoutubeItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { TelegramIcon, YoutubeIcon } from "../ui/BrandIcons";
import { EmptyState } from "../ui/EmptyState";
import { Stagger, StaggerItem } from "../ui/Reveal";

export function FeedSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="جاري التحميل">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass p-3">
          <div className="skeleton aspect-video" />
          <div className="skeleton mt-4 h-4 w-3/4" />
          <div className="skeleton mt-2 h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

/** آخر الأخبار: إعلانات الإدارة + آخر منشورات قناة Telegram العامة */
export async function NewsFeed({ channel, announcements, limit = 6 }: { channel: string | null; announcements: Announcement[]; limit?: number }) {
  let posts: Awaited<ReturnType<typeof fetchTelegramPosts>> = [];
  let failed = false;
  if (channel) {
    try { posts = await fetchTelegramPosts(channel, limit); } catch { failed = true; }
  }
  const items = [
    ...announcements.map((a) => ({ key: `a-${a.id}`, title: a.title, text: a.body ?? "", date: a.published_at, image: a.image, url: a.link_url, source: "announcement" as const })),
    ...posts.map((p) => ({ key: p.id, title: p.text.split("\n")[0].slice(0, 90), text: p.text, date: p.date, image: p.image, url: p.url, source: "telegram" as const })),
  ].slice(0, limit);

  if (!items.length)
    return (
      <EmptyState
        icon={Radio}
        title={failed ? "تعذّر تحميل آخر المنشورات الآن" : "لا توجد إعلانات حالياً"}
        text="تابع قناة Telegram الرسمية ليصلك كل جديد أولاً بأول."
        action={channel ? <a href={`https://t.me/${channel}`} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-2"><TelegramIcon className="h-4 w-4" /> فتح القناة</a> : null}
      />
    );

  return (
    <Stagger className="auto-grid">
      {items.map((it) => (
        <StaggerItem key={it.key}>
          <article className="glass card-hover flex h-full flex-col overflow-hidden">
            {it.image && (
              // صور Telegram تأتي من عدة نطاقات CDN، لذلك نستخدم img مباشرة
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.image} alt="" loading="lazy" className="aspect-video w-full object-cover" />
            )}
            <div className="flex flex-1 flex-col p-5">
              <p className="flex items-center gap-2 text-xs text-rose/50">
                {it.source === "telegram" ? <TelegramIcon className="h-3.5 w-3.5 text-[#2aabee]" /> : <Megaphone className="h-3.5 w-3.5 text-gold" />}
                {formatDate(it.date)}
              </p>
              <h3 className="mt-2 line-clamp-2 font-semibold leading-7 text-white">{it.title}</h3>
              {it.text && it.text !== it.title && <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-rose/60">{it.text}</p>}
              {it.url && (
                <a href={it.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-gold hover:underline">
                  مشاهدة المنشور <ArrowUpLeft className="h-4 w-4" />
                </a>
              )}
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function VideoCard({ v }: { v: YoutubeItem }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer" className="glass card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-wine">
        {v.thumbnail ? (
          <Image src={v.thumbnail} alt="" fill sizes="(max-width:768px) 100vw, 400px" className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-burgundy to-wine"><YoutubeIcon className="h-12 w-12 text-white/70" /></div>
        )}
        <div className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 transition group-hover:opacity-100">
          <PlayCircle className="h-14 w-14 text-white drop-shadow-lg" />
        </div>
        {v.duration && <span className="absolute bottom-2 left-2 rounded-md bg-black/80 px-2 py-0.5 text-xs text-white" dir="ltr">{v.duration}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-semibold leading-7 text-white">{v.title}</h3>
        <p className="mt-auto flex items-center justify-between pt-3 text-xs text-rose/50">
          <span>{formatDate(v.published_at)}</span>
          <span className="inline-flex items-center gap-1 font-medium text-gold">مشاهدة <PlayCircle className="h-4 w-4" /></span>
        </p>
      </div>
    </a>
  );
}

/** آخر المحاضرات: فيديوهات الإدارة (مثبتة) + آخر فيديوهات القناة */
export async function LecturesFeed({ channelId, videos, limit = 6, channelUrl }: { channelId: string | null; videos: Video[]; limit?: number; channelUrl?: string }) {
  let latest: YoutubeItem[] = [];
  if (channelId) {
    try { latest = await fetchChannelVideos(channelId, limit); } catch { /* نعرض فيديوهات الإدارة فقط */ }
  }
  const manual = manualVideos(videos);
  const seen = new Set(manual.map((m) => m.id));
  const items = [...manual, ...latest.filter((v) => !seen.has(v.id))].slice(0, limit);

  if (!items.length)
    return (
      <EmptyState icon={PlayCircle} title="لا توجد محاضرات لعرضها الآن"
        action={channelUrl ? <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-2"><YoutubeIcon className="h-4 w-4" /> قناة YouTube</a> : null} />
    );

  return (
    <Stagger className="auto-grid">
      {items.map((v) => <StaggerItem key={v.id}><VideoCard v={v} /></StaggerItem>)}
    </Stagger>
  );
}
