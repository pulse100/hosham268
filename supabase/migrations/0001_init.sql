-- ════════════════════════════════════════════════════════════════
--  موقع الأستاذ هشام المعموري — بنية قاعدة البيانات (Supabase / Postgres)
--  القراءة العامة مسموحة للمحتوى المنشور فقط، والكتابة للمدراء فقط (RLS).
-- ════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── المدراء: أي مستخدم في auth.users لا يصبح مديراً إلا بإضافته هنا ──
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

-- ── الإعدادات العامة (صف واحد) ──
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  teacher_name text not null default 'الأستاذ هشام المعموري',
  subtitle text not null default 'مدرس اللغة العربية',
  tagline text,
  short_bio text,
  hero_image text,
  about_image text,
  phone_primary text,
  phone_secondary text,
  whatsapp_number text,              -- يُترك فارغاً ما لم يتم التأكد منه
  platform_name text default 'منصة المعموري',
  platform_description text,
  platform_url text,
  app_store_url text,
  google_play_url text,
  repeat_system_title text default 'نظام الإعادة والتكرار',
  repeat_system_body text,
  repeat_system_url text,
  telegram_channel text,             -- اسم القناة العامة لعرض آخر المنشورات (مثال: hish84)
  youtube_channel_id text,           -- معرف القناة UC... لجلب آخر الفيديوهات
  seo_description text,
  updated_at timestamptz not null default now()
);

-- ── جداول المحتوى ──
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  value numeric,                     -- فارغ = نص فقط (مثال: "عدة")
  display_text text,                 -- يُعرض بدل الرقم إن وُجد
  prefix text default '',
  suffix text default '',
  label text not null,
  source_note text,                  -- ملاحظة داخلية: مصدر الرقم وتاريخ تحديثه
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  area text not null,
  address text,
  lat double precision,
  lng double precision,
  is_approximate boolean not null default true,  -- الموقع تقريبي حتى يُحدَّد من الإدارة
  days text,
  times text,
  phone text,
  maps_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  grade text,
  subject text default 'اللغة العربية',
  academic_year text,
  description text,
  features text,                     -- سطر لكل ميزة
  cover_image text,
  publisher text,
  order_phone text,
  order_url text,
  view_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  grade text,
  course_type text not null default 'in_person' check (course_type in ('in_person','online','hybrid')),
  academic_year text,
  description text,
  status text not null default 'contact' check (status in ('open','closed','soon','contact')),
  register_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  youtube_url text not null,
  title text not null,
  duration text,
  published_at date,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('instagram','telegram','youtube','facebook','tiktok','whatsapp','platform','other')),
  label text not null,
  handle text,
  url text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  image text,
  link_url text,
  published_at date not null default current_date,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade text,
  image text,
  rating int check (rating between 1 and 5),
  body text not null,
  sort_order int not null default 0,
  is_active boolean not null default false,       -- لا يظهر إلا بعد موافقة الإدارة
  created_at timestamptz not null default now()
);

-- طلبات التسجيل/الاستفسار من الطلاب (إدخال عام، قراءة للإدارة فقط)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (phone ~ '^[0-9+ ]{7,20}$'),
  grade text check (char_length(grade) <= 40),
  topic text check (char_length(topic) <= 120),
  message text check (char_length(message) <= 1000),
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

-- ── RLS ──
alter table public.admins        enable row level security;
alter table public.site_settings enable row level security;
alter table public.stats         enable row level security;
alter table public.locations     enable row level security;
alter table public.books         enable row level security;
alter table public.courses       enable row level security;
alter table public.videos        enable row level security;
alter table public.social_links  enable row level security;
alter table public.announcements enable row level security;
alter table public.faqs          enable row level security;
alter table public.testimonials  enable row level security;
alter table public.inquiries     enable row level security;

create policy "admins: self read" on public.admins for select using (user_id = auth.uid());

create policy "settings: public read" on public.site_settings for select using (true);
create policy "settings: admin write" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

do $$
declare t text;
begin
  foreach t in array array['stats','locations','books','courses','videos','social_links','announcements','faqs','testimonials']
  loop
    execute format('create policy "%1$s: public read active" on public.%1$I for select using (is_active or public.is_admin())', t);
    execute format('create policy "%1$s: admin insert" on public.%1$I for insert with check (public.is_admin())', t);
    execute format('create policy "%1$s: admin update" on public.%1$I for update using (public.is_admin()) with check (public.is_admin())', t);
    execute format('create policy "%1$s: admin delete" on public.%1$I for delete using (public.is_admin())', t);
  end loop;
end $$;

create policy "inquiries: anyone can submit" on public.inquiries for insert with check (status = 'new');
create policy "inquiries: admin read"   on public.inquiries for select using (public.is_admin());
create policy "inquiries: admin update" on public.inquiries for update using (public.is_admin()) with check (public.is_admin());
create policy "inquiries: admin delete" on public.inquiries for delete using (public.is_admin());

-- ── التخزين: bucket عام للقراءة، الكتابة للمدراء فقط ──
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do nothing;

create policy "media: public read"  on storage.objects for select using (bucket_id = 'media');
create policy "media: admin insert" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "media: admin update" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
create policy "media: admin delete" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());
