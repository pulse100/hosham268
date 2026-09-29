import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="font-[family-name:var(--font-ruqaa)] text-8xl text-gradient">٤٠٤</p>
        <h1 className="mt-4 text-2xl font-bold text-white">الصفحة غير موجودة</h1>
        <p className="mt-2 text-rose/60">ربما تم نقل الصفحة أو حذفها.</p>
        <Link href="/" className="btn-primary mt-8">العودة إلى الرئيسية</Link>
      </div>
    </main>
  );
}
