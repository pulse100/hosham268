# الموقع الرسمي — الأستاذ هشام المعموري

موقع Personal Brand + منصة تعريفية تعليمية، مع لوحة إدارة كاملة.
Next.js 15 · TypeScript · Tailwind · Framer Motion · Supabase · Leaflet

> التخطيط الكامل (Architecture، Sitemap، قاعدة البيانات، التصميم، لوحة الإدارة، الملفات المطلوبة): [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

## التشغيل السريع (معاينة بدون قاعدة بيانات)

```bash
npm install
npm run dev        # http://localhost:3000
```
يعمل الموقع مباشرة بالبيانات الموثقة من `src/lib/seed.ts`. لوحة الإدارة تحتاج Supabase.

## تفعيل قاعدة البيانات ولوحة الإدارة (Supabase)

1. أنشئ مشروعاً مجانياً على [supabase.com](https://supabase.com).
2. من **SQL Editor** شغّل بالترتيب:
   - `supabase/migrations/0001_init.sql` (الجداول + الحماية + تخزين الصور)
   - `supabase/seed.sql` (البيانات الأولية الموثقة)
3. من **Authentication → Users** أنشئ مستخدماً للمدير (بريد + كلمة مرور قوية).
   ومن **Authentication → Sign In / Providers** عطّل «Allow new users to sign up» حتى لا يسجّل أحد غيرك.
4. اجعله مديراً من SQL Editor:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'admin@example.com';
   ```
5. انسخ `.env.example` إلى `.env.local` واملأ:
   - `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` (من Project Settings → API)
   - `NEXT_PUBLIC_SITE_URL` (دومين الموقع)
   - اختياري: `YOUTUBE_API_KEY` لإظهار مدة الفيديوهات
6. `npm run dev` ثم ادخل `/admin/login`.

> ⚠️ لا تضع مفتاح `service_role` في أي مكان — المشروع لا يحتاجه.

## النشر (Vercel)

1. ارفع المشروع إلى مستودع GitHub جديد.
2. من [vercel.com](https://vercel.com) → New Project → اختر المستودع.
3. أضف متغيرات البيئة نفسها في Settings → Environment Variables.
4. Deploy، ثم اربط الدومين وحدّث `NEXT_PUBLIC_SITE_URL`.

يعمل أيضاً على Netlify أو أي خادم Node (`npm run build && npm start`).

## هيكل المشروع

```
src/
  app/
    (site)/          صفحات الموقع العام (الرئيسية + 10 صفحات)
    admin/           لوحة الإدارة (login + (panel))
    sitemap.ts robots.ts layout.tsx globals.css
  components/
    site/            أقسام الموقع (Hero, Locations, MapView, BookCard, ...)
    admin/           مكونات الإدارة (نماذج تلقائية، قائمة جانبية)
    ui/              Reveal, Tilt, BrandIcons, ...
  lib/
    data.ts          جلب المحتوى + التخزين المؤقت
    seed.ts          البيانات الأولية الموثقة
    feeds.ts         Telegram + YouTube
    admin/           الصلاحيات + تعريف الأقسام + Server Actions
supabase/            migration + seed.sql
scripts/             توليد seed.sql من seed.ts (npm run db:seed-sql)
public/images/       صور الأستاذ وغلاف الملزمة
```

## تخصيص سريع

- **الألوان:** متغيرات CSS أعلى `src/app/globals.css`.
- **الخطوط:** `src/app/layout.tsx`.
- **إضافة حقل لقسم في الإدارة:** أضف العمود في قاعدة البيانات، ثم الحقل في `src/lib/admin/entities.ts`.

## الأوامر

| الأمر | الوظيفة |
|---|---|
| `npm run dev` | التطوير |
| `npm run build` / `npm start` | البناء والتشغيل |
| `npm run typecheck` | فحص الأنواع |
| `npm run db:seed-sql` | إعادة توليد `supabase/seed.sql` |
