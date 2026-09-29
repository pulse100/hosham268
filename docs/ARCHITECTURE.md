# موقع الأستاذ هشام المعموري — التخطيط والبنية

## 1. تصور الـ Architecture

```
┌──────────────────────── Next.js 15 (App Router) ────────────────────────┐
│                                                                          │
│  الموقع العام  (Server Components + ISR)        لوحة الإدارة /admin      │
│  ─────────────────────────────────              ─────────────────────    │
│  getSiteData()  ── cache (tag: site-content)    middleware: جلسة + حماية │
│      │                                          requireAdmin() في كل صفحة│
│      ├─ Supabase (anon key, RLS: المنشور فقط)    Server Actions:          │
│      └─ fallback: src/lib/seed.ts                 save / delete / upload │
│                                                   → revalidateTag()      │
│  feeds.ts (server)                                                       │
│      ├─ Telegram: t.me/s/<channel>  (بدون Bot)                           │
│      └─ YouTube: RSS القناة (+ API key اختياري للمدة)                     │
└──────────────────────────────────────────────────────────────────────────┘
                 │                                   │
        Supabase Postgres (RLS)            Supabase Auth + Storage (media)
```

- **العرض العام** يُولَّد مسبقاً (Static/ISR) فيكون سريعاً جداً، ويُحدَّث فوراً بعد أي حفظ من لوحة الإدارة عبر `revalidateTag`.
- **لا توجد أي مفاتيح سرية في الواجهة.** المفتاح الوحيد في المتصفح هو `anon key` وهو عام بطبيعته؛ الحماية الفعلية عبر سياسات RLS في قاعدة البيانات.
- **لا نستخدم `service_role` إطلاقاً** — كل عمليات الإدارة تتم بجلسة المدير نفسه، وقاعدة البيانات ترفض أي كتابة من غير المدراء.
- إذا لم تُربط Supabase، يعمل الموقع بالبيانات الموثقة في `src/lib/seed.ts` (مفيد للمعاينة).

## 2. Sitemap

| المسار | المحتوى |
|---|---|
| `/` | الرئيسية: Hero، وصول سريع، من هو الأستاذ، الأرقام، الخريطة، الملازم، المنصة، الدورات، نظام الإعادة، المحاضرات، الأخبار، الحسابات، آراء الطلاب، الأسئلة، التواصل |
| `/about` | من هو الأستاذ + الأرقام + الحسابات |
| `/books` · `/books/[slug]` | الملازم + صفحة لكل ملزمة (Schema: Book) |
| `/locations` | الخريطة التفاعلية وأماكن التدريس |
| `/courses` | الدورات + نظام الإعادة والتكرار |
| `/platform` | منصة المعموري وروابط التطبيق |
| `/lectures` | آخر محاضرات YouTube |
| `/news` | الإعلانات + آخر منشورات Telegram |
| `/faq` | الأسئلة الشائعة (Schema: FAQPage) |
| `/contact` | الأرقام + نموذج طلب التسجيل |
| `/admin/login` | دخول الإدارة |
| `/admin` | لوحة التحكم، الطلبات، الإعدادات، وكل الأقسام |
| `/sitemap.xml` · `/robots.txt` | SEO (الإدارة مستثناة من الفهرسة) |

## 3. Database structure

| الجدول | الغرض | أهم الحقول |
|---|---|---|
| `site_settings` | صف واحد للإعدادات | الاسم، الوصف، العبارة، النبذة، الصور، الهواتف، واتساب، روابط المنصة، نص نظام الإعادة، قناة Telegram، معرف YouTube، وصف SEO |
| `stats` | الأرقام المتحركة | value / display_text، prefix، suffix، label، source_note |
| `locations` | المعاهد | name، area، address، lat، lng، **is_approximate**، days، times، phone، maps_url |
| `books` | الملازم | slug، title، subtitle، grade، subject، academic_year، description، features، cover_image، publisher، order_phone، order_url |
| `courses` | الدورات | title، grade، course_type (in_person/online/hybrid)، status (open/closed/soon/contact)، register_url |
| `videos` | فيديوهات مثبتة | youtube_url (فيديو أو قائمة)، title، duration |
| `social_links` | الحسابات | platform، label، handle، url |
| `announcements` | الإعلانات | title، body، image، link_url، published_at |
| `faqs` | الأسئلة | question، answer |
| `testimonials` | آراء الطلاب | name، grade، image، rating، body — **مخفية افتراضياً حتى الموافقة** |
| `inquiries` | طلبات التسجيل | name، phone، grade، topic، message، status |
| `admins` | من يملك صلاحية الإدارة | user_id |

كل جدول محتوى فيه `sort_order` و`is_active`. التفاصيل الكاملة والسياسات في `supabase/migrations/0001_init.sql`.

## 4. تصميم الصفحة الرئيسية

- **الألوان:** مأخوذة من لوحة الهوية التي أرسلتها — Dark Wine وRoyal Burgundy للخلفيات، Rose Gold للتمييز فقط (أزرار، عناوين صغيرة)، Dusty Rose للنصوص؛ على أرضية كحلية داكنة. الذهبي محدود ولا يطغى.
- **الخطوط:** IBM Plex Sans Arabic للنصوص، El Messiri للعناوين، وخط الرقعة (Aref Ruqaa) للمسات أدبية تناسب مدرس لغة عربية (العبارة التسويقية، الشعار). تُغيَّر من `app/layout.tsx` و`globals.css`.
- **Hero:** صورة الأستاذ داخل إطار «قوس» بحدود ذهبية مع توهج عنابي، تتحرك 3D مع الماوس، وتظهر بتأثير كشف تدريجي. بجانبها الاسم بتدرج ذهبي، العبارة بخط الرقعة، النبذة، و4 أزرار. في الخلفية حرف «ض» ضخم شفاف يتحرك مع التمرير (Parallax).
- **وصول سريع (أقل من 10 ثوانٍ):** 5 بطاقات أسفل الـ Hero مباشرة: وين يدرّس؟ / وين ألقى الملازم؟ / شلون أسجّل؟ / شلون أتواصل؟ / حساباته الرسمية.
- **الخريطة:** OpenStreetMap بطابع داكن، نقاط المعاهد تسقط واحدة تلو الأخرى عند الوصول للقسم، قائمة المعاهد بجانبها وبطاقة تفاصيل مع أزرار «فتح على الخريطة» و«الاتجاهات».
- **الملازم:** كتاب ثلاثي الأبعاد (غلاف حقيقي + حافة صفحات + ظل) يستقيم عند مرور الماوس.
- **المنصة:** بانر عنابي مع إطار هاتف وأزرار App Store / Google Play.
- الحركات: Fade/Slide/Reveal/Stagger/Counters/Tilt، وكلها تُعطَّل تلقائياً لمن فعّل «تقليل الحركة» في جهازه.

## 5. التقنيات

| التقنية | السبب |
|---|---|
| Next.js 15 + React 19 + TypeScript | SSR/ISR ممتاز للـ SEO والسرعة، Server Actions للإدارة بدون API منفصل |
| Tailwind CSS | تصميم مخصص بالكامل بدون قوالب جاهزة، RTL سهل |
| Framer Motion | حركات ناعمة مع دعم reduced-motion |
| Lucide Icons | أيقونات خفيفة وموحدة |
| Leaflet + OpenStreetMap (CARTO dark) | **بدون API key وبدون تكلفة**؛ Google Maps يحتاج مفتاحاً وفوترة. الأزرار تفتح Google Maps للاتجاهات |
| Supabase | Postgres + Auth + Storage في خدمة واحدة، وRLS يضمن الأمان على مستوى قاعدة البيانات. اخترته بدل Firebase لأن البيانات علائقية (جداول وترتيب وفلاتر) وSQL أوضح للصيانة |

## 6. طريقة عمل لوحة الإدارة

1. المدير يدخل من `/admin/login` بالبريد وكلمة المرور (Supabase Auth).
2. `middleware` يمنع أي صفحة إدارية بدون جلسة، و`requireAdmin()` يتأكد في كل صفحة وكل إجراء أن المستخدم موجود في جدول `admins`.
3. حتى لو تجاوز أحد الواجهة، قاعدة البيانات نفسها (RLS) ترفض الكتابة من غير المدراء.
4. الأقسام تُبنى تلقائياً من ملف واحد `src/lib/admin/entities.ts`: لإضافة حقل جديد أضفه للجدول ثم للملف.
5. رفع الصور: JPG/PNG/WebP/AVIF حتى 5MB إلى bucket `media`، أو لصق رابط صورة.
6. بعد كل حفظ يُحدَّث الموقع العام فوراً.
7. **طلبات التسجيل** من نموذج الموقع تظهر في «طلبات التسجيل» مع زر اتصال وحالة (جديد / تم التواصل / مغلق).

## 7. الملفات المطلوبة منك

| الملف | الحالة |
|---|---|
| صورة الأستاذ للـ Hero | ✅ مستخدمة (البدلة الرسمية) — يفضّل نسخة بدقة أعلى من 640px |
| صور إضافية | ✅ صورة الشماغ لقسم «من هو»، وصورة الصدرية لقسم المنصة |
| غلاف الملزمة | ✅ مستخدم كما هو (قُصّ الهامش الأبيض للمسح الضوئي فقط). **ملاحظة:** الصورة الحالية تحمل علامة مائية لقناة أخرى في أعلاها (@TeslaAws) — يُفضّل استبدالها بمسح نظيف من لوحة الإدارة |
| إحداثيات المعاهد الدقيقة | ⏳ الحالية تقريبية لمركز كل منطقة — أدخلها من الإدارة وألغِ «الموقع تقريبي» |
| أيام وأوقات المحاضرات لكل معهد | ⏳ |
| تفاصيل نظام الإعادة والتكرار | ⏳ |
| رقم WhatsApp المؤكد | ⏳ (الزر مخفي حتى يُضاف) |
| حساب Facebook / TikTok | ⏳ صفحة Facebook ظهرت في البحث (`facebook.com/hisham.almamouri`) أُضيفت **مخفية** — فعّلها بعد التأكد أنها رسمية |
| آراء الطلاب | ⏳ حقيقية وبموافقة أصحابها فقط |
| الدومين | ⏳ لضبط `NEXT_PUBLIC_SITE_URL` |

## مصادر المعلومات الموثقة

- Instagram: [@hisham_almamouri](https://www.instagram.com/hisham_almamouri) — أماكن التدريس، الأرقام، السادس علمي وأدبي، ~216K متابع
- Telegram: [t.me/hish84](https://t.me/hish84)
- YouTube: [@hisham_almamouri](https://www.youtube.com/@hisham_almamouri) (معرف القناة `UCWOmbUti4wNueLMBao7v5PQ`)، وقائمة «مراجعة مركزة 2026»
- تطبيق منصة المعموري: [App Store](https://apps.apple.com/iq/app/id1556748705) · [Google Play](https://play.google.com/store/apps/details?id=com.mustafahameed.hishamapp)
- غلاف ملزمة «موسوعة المعموري في الأدب والنصوص» 2026 (دار المغرب للملازم، 07710055555)
- رقم Telegram (+240K) مزوّد منك ولم يُتحقق منه مباشرة (قناة Telegram محجوبة من بيئة البناء).
