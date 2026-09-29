-- نوع الملزمة (للفلترة في الموقع) — للقواعد المنشأة قبل إضافة العمود
alter table public.hm_books add column if not exists category text;
