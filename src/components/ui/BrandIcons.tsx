import { AppWindow, Globe, MessageCircle } from "lucide-react";
import type { SocialPlatform } from "@/lib/types";

type P = { className?: string };
const I = (d: string) => function Icon({ className }: P) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d={d} /></svg>;
};

export const InstagramIcon = I("M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z");
export const TelegramIcon = I("M23.1 3.7 19.6 20.3c-.3 1.2-1 1.4-2 .9l-5.3-3.9-2.6 2.5c-.3.3-.5.5-1.1.5l.4-5.4 9.9-8.9c.4-.4-.1-.6-.7-.2L6 13.5.8 11.9c-1.1-.4-1.2-1.1.2-1.7L21.7 2.4c1-.4 1.8.2 1.4 1.3z");
export const YoutubeIcon = I("M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z");
export const FacebookIcon = I("M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z");
export const TiktokIcon = I("M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.7a2.9 2.9 0 1 1-2-2.8V9.5a6.3 6.3 0 1 0 5.4 6.2V8.8a8.2 8.2 0 0 0 4.8 1.5V6.9a4.8 4.8 0 0 1-1-.2z");
export const AppleIcon = I("M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1-3.2-1 0-2.2.7-3 1.5-.6.7-1.2 1.9-1.1 3.1 1.2.1 2.3-.6 3.1-1.4z");
export const PlayStoreIcon = I("M3.6 1.8c-.3.3-.4.7-.4 1.2v18c0 .5.1.9.4 1.2l.1.1L13.8 12.2V12L3.7 1.7l-.1.1zm13.6 13.8-3.4-3.4V12l3.4-3.4.1.1 4 2.3c1.1.6 1.1 1.7 0 2.4l-4 2.3-.1-.1zm-.1.1L13.8 12.4 3.6 22.2c.4.4 1 .4 1.7.1l11.8-6.6M17.1 8.3 5.3 1.7c-.7-.4-1.3-.3-1.7.1L13.8 12l3.3-3.7z");

export function PlatformIcon({ platform, className }: { platform: SocialPlatform } & P) {
  switch (platform) {
    case "instagram": return <InstagramIcon className={className} />;
    case "telegram": return <TelegramIcon className={className} />;
    case "youtube": return <YoutubeIcon className={className} />;
    case "facebook": return <FacebookIcon className={className} />;
    case "tiktok": return <TiktokIcon className={className} />;
    case "whatsapp": return <MessageCircle className={className} />;
    case "platform": return <AppWindow className={className} />;
    default: return <Globe className={className} />;
  }
}

export const platformColor: Record<SocialPlatform, string> = {
  instagram: "from-[#f58529]/25 via-[#dd2a7b]/20 to-[#8134af]/25",
  telegram: "from-[#2aabee]/25 to-[#229ed9]/10",
  youtube: "from-[#ff0000]/25 to-[#ff0000]/5",
  facebook: "from-[#1877f2]/25 to-[#1877f2]/5",
  tiktok: "from-[#25f4ee]/20 to-[#fe2c55]/20",
  whatsapp: "from-[#25d366]/25 to-[#25d366]/5",
  platform: "from-gold/30 to-burgundy/20",
  other: "from-white/10 to-white/5",
};
