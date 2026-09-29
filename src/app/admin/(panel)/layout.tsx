import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return (
    <>
      <Sidebar email={user.email ?? ""} />
      <div className="lg:mr-64"><div className="mx-auto max-w-5xl px-4 py-8 md:px-8">{children}</div></div>
    </>
  );
}
