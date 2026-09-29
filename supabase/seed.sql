-- ملف مولّد تلقائياً من src/lib/seed.ts — لا تعدله يدوياً (npm run db:seed-sql)
-- يُشغَّل مرة واحدة بعد 0001_init.sql على قاعدة بيانات فارغة.

insert into public.hm_site_settings (id, teacher_name, subtitle, tagline, short_bio, hero_image, about_image, phone_primary, phone_secondary, whatsapp_number, platform_name, platform_description, platform_url, app_store_url, google_play_url, repeat_system_title, repeat_system_body, repeat_system_url, telegram_channel, youtube_channel_id, seo_description) values
  (1, 'الأستاذ هشام المعموري', 'مدرس اللغة العربية', 'من القاعدة إلى الدرجة الكاملة', 'مدرس مادة اللغة العربية في بغداد، يقدّم محتوىً تعليمياً لطلبة السادس الإعدادي بفرعيه العلمي والأدبي، من خلال الدروس الحضورية في عدد من معاهد بغداد، ومنصة المعموري الإلكترونية، وقنواته على مواقع التواصل الاجتماعي.', '/images/teacher-hero.webp', '/images/teacher-about.webp', '07709997990', '07901379333', null, 'منصة المعموري', 'عالم تعليمي إلكتروني مخصص لتدريس اللغة العربية', null, 'https://apps.apple.com/iq/app/id1556748705', 'https://play.google.com/store/apps/details?id=com.mustafahameed.hishamapp', 'نظام الإعادة والتكرار', null, null, 'hish84', 'UCWOmbUti4wNueLMBao7v5PQ', 'الموقع الرسمي للأستاذ هشام المعموري، مدرس اللغة العربية لطلبة السادس الإعدادي في بغداد: أماكن التدريس، الملازم، الدورات، منصة المعموري، والمحاضرات.')
on conflict (id) do nothing;

insert into public.hm_stats (value, display_text, prefix, suffix, label, source_note, sort_order, is_active) values
  (216, null, '+', 'K', 'متابع على Instagram', 'Instagram — أيلول 2026', 1, true),
  (240, null, '+', 'K', 'مشترك على Telegram', 'رقم مزوّد من صاحب الموقع', 2, true),
  (5, null, '', '', 'معاهد تدريس في بغداد', 'بايو Instagram', 3, true),
  (null, 'علمي وأدبي', '', '', 'السادس الإعدادي', 'بايو Instagram', 4, true);

insert into public.hm_locations (name, area, address, lat, lng, is_approximate, days, times, phone, maps_url, sort_order, is_active) values
  ('معهد قمة النجاح', 'المنصور', 'شارع 14 رمضان — شارع التانكي، مقابل السفارة الفنزويلية', 33.3149, 44.3517, true, null, null, '07833114344', null, 1, true),
  ('معهد الريحاني 1', 'زيونة', 'الشارع الخدمي المجاور لدار الأزياء العراقية', 33.3246, 44.4632, true, null, null, null, null, 2, true),
  ('معهد الريحاني 2', 'زيونة', null, 33.3208, 44.4705, true, null, null, null, null, 3, true),
  ('معهد صرح البنوك', 'البنوك', 'بداية شارع التربية (من جهة الشارع التجاري)', 33.3985, 44.4417, true, null, null, '07757539056', null, 4, true),
  ('معهد المعموري', 'صليخ الـ600', 'صليخ الـ600، مقابل ثانوية القمة للبنات', 33.3845, 44.3925, true, null, null, null, null, 5, true);

insert into public.hm_books (slug, category, title, subtitle, grade, subject, academic_year, description, features, cover_image, publisher, order_phone, order_url, view_url, sort_order, is_active) values
  ('mawsooat-almamouri-adab-2026', 'adab', 'موسوعة المعموري', 'في الأدب والنصوص', 'السادس الإعدادي', 'اللغة العربية — الأدب والنصوص', '2026', 'تحتوي الملزمة على أسئلة موافقة لنمط الأسئلة والأفكار الوزارية، مع نظام التعليق الصوتي عبر الباركودات المرفقة مع كل موضوع.', 'أسئلة موافقة لنمط الأسئلة والأفكار الوزارية
نظام التعليق الصوتي: قراءة السؤال وسماعه في الوقت نفسه عبر الباركود
صياغة الأسئلة من قبل الأستاذ هشام المعموري', '/images/book-mawsooa-2026.webp', 'دار المغرب للملازم', '07710055555', null, null, 1, true),
  ('mawsooat-almamouri-qawaid-1', 'qawaid', 'موسوعة المعموري في القواعد', 'الجزء الأول', 'السادس الإعدادي', 'اللغة العربية — القواعد', '2026', 'ملزمة قواعد اللغة العربية لطلبة السادس الإعدادي بفرعيه العلمي والأدبي — الجزء الأول.', null, null, 'دار المغرب للملازم', null, null, null, 2, true),
  ('mawsooat-almamouri-qawaid-2', 'qawaid', 'موسوعة المعموري في القواعد', 'الجزء الثاني', 'السادس الإعدادي', 'اللغة العربية — القواعد', '2026', 'ملزمة قواعد اللغة العربية لطلبة السادس الإعدادي — الجزء الثاني.', null, null, 'دار المغرب للملازم', null, null, null, 3, true),
  ('wajibat-alqawaid-2026', 'wajibat', 'واجبات القواعد', 'تمارين وأسئلة', 'السادس الإعدادي', 'اللغة العربية — القواعد', '2026', 'ملزمة واجبات وتمارين القواعد لطلبة السادس الإعدادي بفرعيه العلمي والأدبي.', null, null, 'دار المغرب للملازم', null, null, null, 4, true),
  ('muraja-markaza-adab-2026', 'muraja', 'المراجعة المركزة', 'الأدب والنصوص', 'السادس الإعدادي', 'اللغة العربية — الأدب والنصوص', '2026', 'ملزمة المراجعة المركزة لمادة الأدب والنصوص لطلبة السادس الإعدادي.', null, null, null, null, null, null, 5, true),
  ('wizariyat-alqawaid', 'wizariyat', 'وزاريات القواعد', 'الأسئلة الوزارية', 'السادس الإعدادي', 'اللغة العربية — القواعد', null, 'ملزمة الأسئلة الوزارية في قواعد اللغة العربية لطلبة السادس الإعدادي.', null, null, null, null, null, null, 6, true);

insert into public.hm_courses (title, grade, course_type, academic_year, description, status, register_url, sort_order, is_active) values
  ('الدورات الحضورية', 'السادس الإعدادي — علمي وأدبي', 'in_person', null, 'دروس حضورية في معاهد بغداد المذكورة في قسم أماكن التدريس.', 'contact', null, 1, true),
  ('الدورة الإلكترونية', 'السادس الإعدادي', 'online', null, 'محاضرات اللغة العربية عبر تطبيق منصة المعموري على iOS وAndroid.', 'contact', null, 2, true);

insert into public.hm_videos (youtube_url, title, duration, published_at, sort_order, is_active) values
  ('https://www.youtube.com/playlist?list=PLZ4bPw2uRVKajoh391GvGssXFvOvIjuKL', 'مراجعة مركزة 2026', null, null, 1, true);

insert into public.hm_social_links (platform, label, handle, url, sort_order, is_active) values
  ('instagram', 'Instagram', '@hisham_almamouri', 'https://www.instagram.com/hisham_almamouri', 1, true),
  ('telegram', 'Telegram', '@hish84', 'https://t.me/hish84', 2, true),
  ('youtube', 'YouTube', '@hisham_almamouri', 'https://www.youtube.com/@hisham_almamouri', 3, true),
  ('facebook', 'Facebook', null, 'https://www.facebook.com/hisham.almamouri/', 4, false),
  ('platform', 'منصة المعموري', 'iOS / Android', 'https://play.google.com/store/apps/details?id=com.mustafahameed.hishamapp', 5, true);

insert into public.hm_faqs (question, answer, sort_order, is_active) values
  ('أين يدرّس الأستاذ هشام المعموري؟', 'يدرّس حضورياً في بغداد في: معهد قمة النجاح (المنصور)، معهد الريحاني 1 و2 (زيونة)، معهد صرح البنوك (البنوك)، ومعهد المعموري (صليخ الـ600). تجد المواقع على الخريطة في قسم أماكن التدريس.', 1, true),
  ('كيف أسجّل في الدورة؟', 'يمكنك إرسال طلب تسجيل من نموذج «تواصل معنا» في هذا الموقع، أو الاتصال مباشرة على أرقام التواصل، أو مراجعة المعهد الأقرب إليك.', 2, true),
  ('هل توجد دورة إلكترونية؟', 'نعم، من خلال تطبيق منصة المعموري المتوفر على App Store وGoogle Play.', 3, true),
  ('أين أحصل على الملازم؟', 'ملزمة «موسوعة المعموري في الأدب والنصوص» من إصدار دار المغرب للملازم، وللاستفسار عن الطلب يمكن الاتصال على الرقم المطبوع على الغلاف: 07710055555.', 4, true),
  ('ما هو نظام التعليق الصوتي في الملزمة؟', 'مع كل موضوع في الملزمة باركود يمكن قراءته بالهاتف، فيستطيع الطالب قراءة السؤال وسماعه في الوقت نفسه للمساعدة على سرعة الحفظ.', 5, true),
  ('كيف أتواصل مع الأستاذ؟', 'عبر الأرقام 07709997990 و07901379333، أو من خلال قناة Telegram وحساب Instagram الرسميين.', 6, true),
  ('هل توجد محاضرات إلكترونية مجانية؟', 'تُنشر محاضرات ومراجعات على قناة YouTube الرسمية للأستاذ، ويمكنك مشاهدة آخرها في قسم المحاضرات.', 7, true),
  ('كيف أصل إلى منصة المعموري؟', 'حمّل تطبيق «منصة المعموري» من App Store أو Google Play من خلال الأزرار في قسم المنصة الإلكترونية.', 8, true);

-- hm_announcements: لا توجد بيانات أولية

-- hm_testimonials: لا توجد بيانات أولية

insert into public.hm_sellers (name, governorate, area, address, phone, phone2, whatsapp, map_url, telegram_url, books, delivery, notes, sort_order, is_active) values
  ('مكتبة الربيعي', 'بغداد', 'البنوك', 'شارع المشاتل، مقابل مشتل أبو علي', '07703331873', null, null, null, 'https://t.me/maktabtalrubaie', 'موسوعة المعموري في الأدب والنصوص', true, 'وكيل دار المغرب — توصيل لجميع المحافظات', 1, true),
  ('مكتبة سنتر المدينة (الربيعي 2)', 'بغداد', 'مدينة الصدر', 'شارع الفلاح، قطاع 15', '07734980888', null, null, null, null, null, true, 'الفرع الثاني لمكتبة الربيعي', 2, true),
  ('مكتبة آدم', 'بغداد', 'المنصور', 'شارع 14 رمضان، عمارة أبل، مقابل مطعم الساعة', '07812190487', null, null, null, null, 'موسوعة المعموري في القواعد', true, 'توصيل لجميع المحافظات', 3, true),
  ('مكتبة آدم — فرع الكاظمية', 'بغداد', 'الكاظمية', 'الشوصة، ساحة الزهراء، مجاور كراج الخيال', '07812190487', null, null, null, null, null, true, null, 4, true),
  ('مكتبة فاضل الوكيل', 'بغداد', 'شارع المتنبي', 'سوق السراي، فرع السراجين، قرب جسر الشهداء', null, null, null, null, null, 'موسوعة المعموري في الأدب والنصوص', false, null, 5, true),
  ('مكتبة أسامة — الفرع الأول', 'كركوك', 'شارع التربية القديم', 'مقابل دائرة الضمان الاجتماعي', '07701306054', null, null, null, null, 'موسوعة المعموري', false, 'الوكيل الحصري لموسوعة المعموري في كركوك', 6, true),
  ('مكتبة أسامة — الفرع الثاني', 'كركوك', 'طريق بغداد', 'قرب محطة غرناطة', '07764881314', null, null, null, null, 'موسوعة المعموري', false, null, 7, true),
  ('مكتبة القبس', 'كربلاء', 'حي الموظفين', 'شارع الحوانيت', '07801004015', '07702725522', null, null, null, 'ملازم الأستاذ هشام المعموري', false, null, 8, true),
  ('دار المغرب للملازم', null, null, null, '07710055555', null, null, null, null, 'ملازم الأستاذ هشام المعموري', false, 'الناشر — الرقم المطبوع على غلاف الملزمة', 9, true);

-- hm_custom_sections: لا توجد بيانات أولية
