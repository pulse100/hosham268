-- ملف مولّد تلقائياً من src/lib/seed.ts — لا تعدله يدوياً (npm run db:seed-sql)
-- يُشغَّل مرة واحدة بعد 0001_init.sql على قاعدة بيانات فارغة.

insert into public.hm_site_settings (id, teacher_name, subtitle, tagline, short_bio, hero_image, about_image, phone_primary, phone_secondary, whatsapp_number, platform_name, platform_description, platform_url, app_store_url, google_play_url, repeat_system_title, repeat_system_body, repeat_system_url, telegram_channel, youtube_channel_id, seo_description) values
  (1, 'الأستاذ هشام المعموري', 'مدرس اللغة العربية', 'من القاعدة إلى الدرجة الكاملة', 'مدرس مادة اللغة العربية في بغداد، يقدّم محتوىً تعليمياً لطلبة السادس الإعدادي بفرعيه العلمي والأدبي، من خلال الدروس الحضورية في عدد من معاهد بغداد، ومنصة المعموري الإلكترونية، وقنواته على مواقع التواصل الاجتماعي.', '/images/teacher-hero.webp', '/images/teacher-about.webp', '07709997990', '07901379333', null, 'منصة المعموري', 'عالم تعليمي إلكتروني مخصص لتدريس اللغة العربية', null, 'https://apps.apple.com/iq/app/id1556748705', 'https://play.google.com/store/apps/details?id=com.mustafahameed.hishamapp', 'نظام الإعادة والتكرار', 'التسجيل الحضوري لسنة 2027 بنظام التكرار والإعادة: اذهب إلى المعهد الأقرب لك وخذ كارت الحجز وسعره 25 ألف دينار، والقسط يكون بعد المحاضرات الحضورية لحين تجربة الطالب لهذا النظام.', null, 'hish84', 'UCWOmbUti4wNueLMBao7v5PQ', 'الموقع الرسمي للأستاذ هشام المعموري، مدرس اللغة العربية لطلبة السادس الإعدادي في بغداد: أماكن التدريس، الملازم، الدورات، منصة المعموري، والمحاضرات.')
on conflict (id) do nothing;

insert into public.hm_stats (value, display_text, prefix, suffix, label, source_note, sort_order, is_active) values
  (216, null, '+', 'K', 'متابع على Instagram', 'Instagram — أيلول 2026', 1, true),
  (240, null, '+', 'K', 'مشترك على Telegram', 'رقم مزوّد من صاحب الموقع', 2, true),
  (8, null, '', '', 'معاهد تدريس في بغداد', 'جدول الحجز الحضوري 2027', 3, true),
  (null, 'علمي وأدبي', '', '', 'السادس الإعدادي', 'بايو Instagram', 4, true);

insert into public.hm_locations (name, area, address, lat, lng, is_approximate, days, times, phone, maps_url, sort_order, is_active) values
  ('معهد الدورة', 'الدورة', 'خدمي أبو طيارة، مقابل جامعة الفارابي (فرع شركة برايم) — الحجز: بنات وبنين', 33.2525, 44.39, true, null, null, '07717423087', null, 1, true),
  ('معهد الملكي', 'السيدية', 'ضباط السيدية، مدخل شارع المركز، خلف متنزه عين السيدية — الحجز: بنات وبنين', 33.257, 44.362, true, null, null, '07866688878', null, 2, true),
  ('معهد قمة النجاح', 'المنصور', 'شارع مطعم هيل وزعفران، قرب مطعم نصير مندي — الحجز: بنات', 33.3149, 44.3517, true, null, null, '07833114344', null, 3, true),
  ('معهد الريحاني — المنصور', 'المنصور', 'شارع مطعم هيل وزعفران — الحجز: بنين', 33.316, 44.35, true, null, null, '07830007717', null, 4, true),
  ('معهد قمة المنصور', 'المنصور', 'شارع التانكي — الحجز: بنين', 33.3135, 44.354, true, null, null, '07755540175', null, 5, true),
  ('معهد المعموري', 'الصليخ 600', 'نهاية شارع 600، قرب مطعم الدجاج السريع — الحجز: بنات وبنين', 33.3845, 44.3925, true, null, null, '07731131313', null, 6, true),
  ('معهد الريحاني — زيونة', 'زيونة', 'الشارع الخدمي لدار الأزياء العراقية — الحجز: بنات وبنين', 33.3246, 44.4632, true, null, null, '07742633393', null, 7, true),
  ('معهد صرح البنوك', 'البنوك', 'مقابل الكنيسة، بداية شارع التربية، قرب مطعم كرسبي — الحجز: بنات وبنين', 33.3985, 44.4417, true, null, null, '07757539056', null, 8, true);

insert into public.hm_books (slug, category, title, subtitle, grade, subject, academic_year, description, features, cover_image, publisher, order_phone, order_url, view_url, sort_order, is_active) values
  ('mawsooat-almamouri-adab-2026', 'adab', 'موسوعة المعموري', 'في الأدب والنصوص', 'السادس الإعدادي', 'اللغة العربية — الأدب والنصوص', '2027', 'تحتوي الملزمة على أسئلة موافقة لنمط الأسئلة والأفكار الوزارية، مع نظام التعليق الصوتي عبر الباركودات المرفقة مع كل موضوع.', 'أسئلة موافقة لنمط الأسئلة والأفكار الوزارية
نظام التعليق الصوتي: قراءة السؤال وسماعه في الوقت نفسه عبر الباركود
صياغة الأسئلة من قبل الأستاذ هشام المعموري', '/images/cover-adab-2027-v2.webp', 'دار المغرب للملازم', '07710055555', null, null, 1, true),
  ('mawsooat-almamouri-qawaid-1', 'qawaid', 'موسوعة المعموري', 'في قواعد اللغة العربية — الجزء الأول', 'السادس الإعدادي', 'اللغة العربية — القواعد', '2027', 'ملزمة قواعد اللغة العربية لطلبة السادس الإعدادي — الجزء الأول، إعداد وتنظيم الأستاذ هشام المعموري.', null, '/images/cover-qawaid-1-2027.webp', 'دار المغرب للملازم', null, null, null, 2, true),
  ('wajibat-alqawaid-2026', 'wajibat', 'خوارزميات المعموري', 'في واجبات قواعد اللغة العربية — الجزء الأول', 'السادس الإعدادي', 'اللغة العربية — واجبات القواعد', '2027', 'واجبات ذكية مبنية على تحليل أنماط الأسئلة الوزارية.', 'أسلوب الاستفهام
أسلوب النفي
أسلوب التقديم والتأخير', '/images/cover-wajibat-1-2027.webp', 'دار المغرب للملازم', null, null, null, 3, true);

insert into public.hm_courses (title, grade, course_type, academic_year, description, status, register_url, sort_order, is_active) values
  ('الدورات الحضورية', 'السادس الإعدادي — علمي وأدبي', 'in_person', null, 'دروس حضورية في معاهد بغداد المذكورة في قسم أماكن التدريس.', 'contact', null, 1, true),
  ('الدورة الإلكترونية — منصة أبواب', 'السادس الإعدادي', 'online', null, 'الدورة الصيفية الإلكترونية الثانية: محاضرات مسجلة، متابعة مستمرة، وامتحانات يومية وأسبوعية — التسجيل عبر منصة أبواب ووكلائها.', 'contact', '/courses#abwab', 2, true);

insert into public.hm_videos (youtube_url, title, duration, published_at, sort_order, is_active) values
  ('https://www.youtube.com/playlist?list=PLZ4bPw2uRVKajoh391GvGssXFvOvIjuKL', 'مراجعة مركزة 2026', null, null, 1, true);

insert into public.hm_social_links (platform, label, handle, url, sort_order, is_active) values
  ('instagram', 'Instagram', '@hisham_almamouri', 'https://www.instagram.com/hisham_almamouri', 1, true),
  ('telegram', 'Telegram', '@hish84', 'https://t.me/hish84', 2, true),
  ('youtube', 'YouTube', '@hisham_almamouri', 'https://www.youtube.com/@hisham_almamouri', 3, true),
  ('facebook', 'Facebook', null, 'https://www.facebook.com/hisham.almamouri/', 4, false),
  ('platform', 'منصة المعموري', 'iOS / Android', 'https://play.google.com/store/apps/details?id=com.mustafahameed.hishamapp', 5, true);

insert into public.hm_faqs (question, answer, sort_order, is_active) values
  ('أين يدرّس الأستاذ هشام المعموري؟', 'يدرّس حضورياً في بغداد لسنة 2027 بنظام التكرار والإعادة في: معهد الدورة (الدورة)، معهد الملكي (السيدية)، معهد قمة النجاح ومعهد الريحاني ومعهد قمة المنصور (المنصور)، معهد المعموري (الصليخ 600)، معهد الريحاني (زيونة)، ومعهد صرح البنوك (البنوك). تجد المواقع والأرقام على الخريطة في قسم أماكن التدريس.', 1, true),
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
  ('مكتبة الربيعي', 'بغداد', 'البنوك', 'شارع المشاتل، مقابل مشتل أبو علي', '07703331873', null, null, null, 'https://t.me/maktabtalrubaie', null, true, null, 1, true),
  ('مكتبة سنتر المدينة (الربيعي 2)', 'بغداد', 'مدينة الصدر', 'شارع الفلاح، قطاع 15', '07734980888', null, null, null, null, null, true, null, 2, true),
  ('مكتبة آدم', 'بغداد', 'المنصور', 'شارع 14 رمضان، عمارة أبل، مقابل مطعم الساعة', '07812190487', null, null, null, null, null, true, null, 3, true),
  ('مكتبة آدم — فرع الكاظمية', 'بغداد', 'الكاظمية', 'الشوصة، ساحة الزهراء، مجاور كراج الخيال', '07812190487', null, null, null, null, null, true, null, 4, true),
  ('مكتبة فاضل الوكيل', 'بغداد', 'شارع المتنبي', 'سوق السراي، فرع السراجين، قرب جسر الشهداء', null, null, null, null, null, null, false, null, 5, true),
  ('مكتبة أسامة — الفرع الأول', 'كركوك', 'شارع التربية القديم', 'مقابل دائرة الضمان الاجتماعي', '07701306054', null, null, null, null, null, false, null, 6, true),
  ('مكتبة أسامة — الفرع الثاني', 'كركوك', 'طريق بغداد', 'قرب محطة غرناطة', '07764881314', null, null, null, null, null, false, null, 7, true),
  ('مكتبة القبس', 'كربلاء', 'حي الموظفين', 'شارع الحوانيت', '07801004015', '07702725522', null, null, null, null, false, null, 8, true),
  ('دار المغرب للملازم', null, null, null, '07710055555', null, null, null, null, null, false, null, 9, true),
  ('مكتبة الساعة', 'بغداد', 'الصليخ الـ600', 'مقابل مطعم الدجاج السريع، مجاور معهد القمة', '07725557755', null, '07725557755', null, null, null, true, null, 10, true),
  ('مكتبة الذهب', null, null, null, '07729291084', null, null, null, null, null, true, null, 11, true),
  ('مكتبة قادمون يا طلاب', null, null, null, null, null, '07734787034', null, null, null, true, null, 12, true),
  ('مكتبة دار الأماني — الفرع الأول', 'بغداد', 'الحرية', 'دور نواب الضباط، مقابل المعهد النظامي', '07829026023', null, null, null, 'https://t.me/amany930', null, true, null, 13, true),
  ('مكتبة دار الأماني — الفرع الثاني', 'بغداد', 'الحرية — البستان', 'شارع المدارس، مقابل مدرسة خديجة', '07722744477', null, null, null, 'https://t.me/darAlamany2', null, true, null, 14, true),
  ('مكتبة دار الأماني — الفرع الثالث', 'بغداد', 'الحرية', 'شارع 30، مجاور ثانوية متفوقات الحرية', '07767276990', null, null, null, 'https://t.me/amany931', null, true, null, 15, true),
  ('مكتبة دار الأماني — الفرع الرابع', 'بغداد', 'الدولعي', 'الشارع العام، مجاور ثانوية متفوقي الحرية', '07780047315', null, null, null, null, null, true, null, 16, true),
  ('مكتبة الماسة', null, null, null, '07712907379', null, null, null, 'https://t.me/massa9988', null, true, null, 17, true),
  ('مكتبة جوهرة المستنصرية', 'بغداد', 'المنصور', 'مقابل معهد الريحاني', null, null, '07776668870', null, 'https://t.me/Gmusss1', null, true, null, 18, true),
  ('مكتبة (الاسم غير مذكور)', null, null, null, null, null, '07723893779', null, null, null, true, null, 19, false),
  ('مكتبة (الاسم غير مذكور)', null, null, null, '07703947224', null, null, null, null, null, true, null, 20, false);

insert into public.hm_platform_agents (name, governorate, area, address, phone, phone2, whatsapp, map_url, telegram_url, books, delivery, notes, sort_order, is_active) values
  ('مكتبة الجذور', 'البصرة', 'الجنينة', null, '07812600844', null, null, null, null, null, false, null, 1, true),
  ('مكتبة الوان', 'النجف', 'قرب عطية الجبوري', null, '07800662212', null, null, null, null, null, false, null, 2, true),
  ('مكتبة أشرف وخلدون', 'ميسان', 'شارع دجلة', null, '07712560818', null, null, null, null, null, false, null, 3, true),
  ('مكتبة الكريم', 'واسط', 'الكوت — شارع المحافظة', null, '07725423700', null, null, null, null, null, false, null, 4, true),
  ('مكتبة الهيثم', 'واسط', null, null, '07719001002', null, null, null, null, null, false, null, 5, true),
  ('مكتبة القبس', 'كربلاء', 'حي الموظفين', null, '07801004015', null, null, null, null, null, false, null, 6, true),
  ('مكتبة النرجس', 'النجف', 'حي الحسين', null, '07804444777', null, null, null, null, null, false, null, 7, true),
  ('مكتبة التاج', 'بابل', 'الحلة — شارع 40', null, '07802767474', null, null, null, null, null, false, null, 8, true),
  ('مكتبة الازدهار', 'بابل', null, null, '07806504010', null, null, null, null, null, false, null, 9, true),
  ('مكتبة المنتظر', 'بابل', 'المسيب — عمارة النسر', null, '07706549933', null, null, null, null, null, false, null, 10, true),
  ('مكتبة النهرين', 'القادسية', 'الديوانية — شارع المصورين', null, '07801574901', null, null, null, null, null, false, null, 11, true),
  ('مكتبة الملزمة', 'ميسان', null, null, '07707333790', null, null, null, null, null, false, null, 12, true),
  ('مكتبة فراس', 'المثنى', 'السماوة — السوق الكبير', null, '07716163457', null, null, null, null, null, false, null, 13, true),
  ('مكتبة الأمراء', 'بغداد', 'الكرخ — الحرية', null, '07770409866', null, null, null, null, null, false, null, 14, true),
  ('مكتبة الصديقين', 'صلاح الدين', 'سامراء', null, '07702854488', null, null, null, null, null, false, null, 15, true),
  ('مكتبة البيان', 'بغداد', 'الكرخ', null, '07700451981', null, null, null, null, null, false, null, 16, true),
  ('مكتبة تيسلا', 'بغداد', 'الكرخ', null, '07734289248', null, null, null, null, null, false, null, 17, true),
  ('مكتبة استرو', 'بغداد', 'الكرخ', null, '07779900166', null, null, null, null, null, false, null, 18, true),
  ('مكتبة حسن المهندس', 'بغداد', 'الرصافة', null, '07715884036', null, null, null, null, null, false, null, 19, true),
  ('مكتبة القلعة', 'بغداد', 'الرصافة — البنوك', null, '07722202324', null, null, null, null, null, false, null, 20, true),
  ('مكتبة جين', 'بغداد', 'الرصافة', null, '07838906655', null, null, null, null, null, false, null, 21, true),
  ('مكتبة التفوق', 'بغداد', 'الرصافة — الزعفرانية', null, '07716192017', null, null, null, null, null, false, null, 22, true),
  ('مكتبة المدينة', 'بغداد', 'الرصافة — المدينة', null, '07708314441', null, null, null, null, null, false, null, 23, true),
  ('مكتبة الرضوان', 'ديالى', 'بعقوبة', null, '07731030555', null, null, null, null, null, false, null, 24, true),
  ('مكتبة المتنبي 2', 'ديالى', 'المقدادية', null, '07711040655', null, null, null, null, null, false, null, 25, true),
  ('مكتبة الذهبي', 'ديالى', 'خانقين', null, '07702406444', null, null, null, null, null, false, null, 26, true),
  ('مكتبة أسامة', 'كركوك', 'شارع التربية', null, '07701306054', null, null, null, null, null, false, null, 27, true),
  ('مكتبة الإسراء', 'كركوك', 'قرب الإدارة المحلية', null, '07701334425', null, null, null, null, null, false, null, 28, true),
  ('مكتبة كنانة', 'نينوى', 'الموصل', null, '07740864133', null, null, null, null, null, false, null, 29, true),
  ('مكتبة الجانب الأيمن', 'نينوى', 'الموصل — الجانب الأيمن', null, '07740887900', null, null, null, null, null, false, null, 30, true),
  ('مكتبة الشروق', 'صلاح الدين', 'تكريت', null, '07703771003', null, null, null, null, null, false, null, 31, true),
  ('مكتبة التقى', 'صلاح الدين', 'بلد', null, '07817789408', null, null, null, null, null, false, null, 32, true),
  ('مكتبة المنتظر', 'صلاح الدين', 'الدجيل', null, '07809073977', null, null, null, null, null, false, null, 33, true),
  ('مكتبة أبو مصطفى', 'الأنبار', 'الرمادي — شارع المستودع', null, '07855252751', null, null, null, null, null, false, null, 34, true),
  ('مكتبة أم القرى', 'الأنبار', 'الفلوجة', null, '07830019999', null, null, null, null, null, false, null, 35, true),
  ('مكتبة ذي قار', 'ذي قار', 'الناصرية', null, '07812600844', null, null, null, null, null, false, null, 36, true),
  ('مكتبة قمة المنصور', 'بغداد', 'الكرخ — المنصور', null, '07713188893', null, null, null, null, null, false, null, 37, true),
  ('مكتبة الجوهرة', 'بغداد', 'الكرخ', null, '07903230011', null, null, null, null, null, false, null, 38, true),
  ('مكتبة الرتاج', 'بغداد', 'الكرخ', null, '07804047014', null, null, null, null, null, false, null, 39, true),
  ('مكتبة ساندي بل', 'بغداد', 'الكرخ', null, '07702710731', null, null, null, null, null, false, null, 40, true),
  ('مكتبة عمار', 'بغداد', 'الكرخ', null, '07805248242', null, null, null, null, null, false, null, 41, true),
  ('مكتبة العربية', 'بغداد', 'الكرخ — العامرية', null, '07833484932', null, null, null, null, null, false, null, 42, true),
  ('مكتبة ميم', 'بغداد', 'الكرخ', null, '07738883339', null, null, null, null, null, false, null, 43, true),
  ('مكتبة لايك', 'بغداد', 'الكرخ', null, '07727629888', null, null, null, null, null, false, null, 44, true),
  ('مكتبة الحرية', 'بغداد', 'الكرخ — الحرية', null, '07768512777', null, null, null, null, null, false, null, 45, true),
  ('مكتبة آدم', 'بغداد', 'الكرخ', null, '07812190487', null, null, null, null, null, false, null, 46, true),
  ('مكتبة باندا', 'بغداد', 'الكرخ', null, '07722481048', null, null, null, null, null, false, null, 47, true),
  ('مكتبة قمة النجاح', 'بغداد', 'الكرخ — المنصور', null, '07709265596', null, null, null, null, null, false, null, 48, true),
  ('مكتبة دايموند', 'بغداد', 'الكرخ — حي الحسين', null, '07730341986', null, null, null, null, null, false, null, 49, true),
  ('مكتبة المستنصرية', 'بغداد', 'الرصافة — شارع فلسطين', null, '07733334104', null, null, null, null, null, false, null, 50, true),
  ('مكتبة الجوهرة', 'بغداد', 'الرصافة', null, '07750609065', null, null, null, null, null, false, null, 51, true),
  ('مكتبة باركود', 'بغداد', 'الرصافة — الصليخ 600', null, '07744144600', null, null, null, null, null, false, null, 52, true),
  ('مكتبة طيور الجنة', 'بغداد', 'الرصافة', null, '07713805062', null, null, null, null, null, false, null, 53, true),
  ('مكتبة مارينا', 'بغداد', 'الرصافة — زيونة', null, '07713332255', null, null, null, null, null, false, null, 54, true),
  ('مكتبة جوهرة المنصور', 'بغداد', 'المنصور', null, '07710515251', null, null, null, null, null, false, null, 55, true),
  ('مكتبة الهدف', 'بغداد', 'الحرية', null, '07885173299', null, null, null, null, null, false, null, 56, true),
  ('مكتبة جوهرة المستنصرية', 'بغداد', 'المنصور', null, '07776668870', null, null, null, null, null, false, null, 57, true),
  ('مكتبة البطل', 'بغداد', 'إلكترونية (أونلاين)', null, '07800057721', null, null, null, null, null, false, null, 58, true),
  ('مكتبة جوهرة البنوك', 'بغداد', 'البنوك', null, '07702538881', null, null, null, null, null, false, null, 59, true),
  ('مكتبة بلو بوك', 'بغداد', 'الصليخ 600', null, '07722224210', null, null, null, null, null, false, null, 60, true),
  ('مكتبة المتنبي', 'بغداد', 'البلديات', null, '07700700194', null, null, null, null, null, false, null, 61, true),
  ('مكتبة الملتقى', 'نينوى', 'الموصل — حي النور', null, '07721355700', null, null, null, null, null, false, null, 62, true);

-- hm_custom_sections: لا توجد بيانات أولية
