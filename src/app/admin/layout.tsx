import type { Metadata } from "next";

export const metadata: Metadata = { title: "لوحة الإدارة", robots: { index: false, follow: false } };

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-ink">{children}</div>;
}
