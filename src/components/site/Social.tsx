import { ArrowUpLeft } from "lucide-react";
import type { SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlatformIcon, platformColor } from "../ui/BrandIcons";
import { Stagger, StaggerItem } from "../ui/Reveal";

export function Social({ links }: { links: SocialLink[] }) {
  return (
    <Stagger gap={0.1} className="auto-grid">
      {links.map((s) => (
        <StaggerItem key={s.id}>
          <a href={s.url} target="_blank" rel="noopener noreferrer"
             className={cn("glass card-hover group relative flex items-center gap-4 overflow-hidden p-5 bg-gradient-to-br", platformColor[s.platform])}>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-black/30 text-white ring-1 ring-white/10 transition duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
              <PlatformIcon platform={s.platform} className="h-7 w-7" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-semibold text-white">{s.label}</span>
              {s.handle && <span className="block truncate text-sm text-rose/60" dir="ltr" style={{ textAlign: "right" }}>{s.handle}</span>}
            </span>
            <ArrowUpLeft className="h-5 w-5 text-rose/40 transition group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
