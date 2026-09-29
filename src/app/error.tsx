"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold text-white">حدث خطأ غير متوقع</h1>
        <p className="mt-2 text-rose/60">نعتذر، حاول مرة أخرى.</p>
        <button onClick={reset} className="btn-primary mt-8">إعادة المحاولة</button>
      </div>
    </main>
  );
}
