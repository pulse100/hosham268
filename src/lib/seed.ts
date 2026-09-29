import type { SiteData } from "./types";

/**
 * البيانات الأولية للموقع.
 * ─────────────────────────
 * كل معلومة هنا إما موثّقة من الحسابات الرسمية (Instagram / Telegram / YouTube / متاجر التطبيقات / غلاف الملزمة)
 * أو زوّدنا بها صاحب الموقع. أي شيء غير مؤكد تُرك فارغاً أو غير مفعّل (is_active=false) ليُكمَل من لوحة الإدارة.
 * تُستخدم هذه البيانات فقط عندما لا تكون Supabase مربوطة، ونفس المحتوى موجود في supabase/seed.sql.
 */
export const seed: Omit<SiteData, "source" | "texts"> = {
  settings: {
    teacher_name: "الأستاذ هشام المعموري",
    subtitle: "مدرس اللغة العربية",
    tagline: "من القاعدة إلى الدرجة الكاملة",
    short_bio:
      "مدرس مادة اللغة العربية في بغداد، يقدّم محتوىً تعليمياً لطلبة السادس الإعدادي بفرعيه العلمي والأدبي، من خلال الدروس الحضورية في عدد من معاهد بغداد، ومنصة المعموري الإلكترونية، وقنواته على مواقع التواصل الاجتماعي.",
    hero_image: "/images/teacher-hero.webp",
    about_image: "/images/teacher-about.webp",
    phone_primary: "07709997990",
    phone_secondary: "07901379333",
    whatsapp_number: null, // لم يتم التحقق من رقم واتساب رسمي
    platform_name: "منصة المعموري",
    platform_description: "عالم تعليمي إلكتروني مخصص لتدريس اللغة العربية",
    platform_url: null, // لا يوجد رابط ويب مؤكد للمنصة — التطبيق فقط
    app_store_url: "https://apps.apple.com/iq/app/id1556748705",
    google_play_url: "https://play.google.com/store/apps/details?id=com.mustafahameed.hishamapp",
    repeat_system_title: "نظام الإعادة والتكرار",
    repeat_system_body: null, // تُضاف التفاصيل الرسمية من لوحة الإدارة
    repeat_system_url: null,
    telegram_channel: "hish84",
    youtube_channel_id: "UCWOmbUti4wNueLMBao7v5PQ",
    seo_description:
      "الموقع الرسمي للأستاذ هشام المعموري، مدرس اللغة العربية لطلبة السادس الإعدادي في بغداد: أماكن التدريس، الملازم، الدورات، منصة المعموري، والمحاضرات.",
  },

  stats: [
    { id: "s1", value: 216, display_text: null, prefix: "+", suffix: "K", label: "متابع على Instagram", source_note: "Instagram — أيلول 2026", sort_order: 1, is_active: true },
    { id: "s2", value: 240, display_text: null, prefix: "+", suffix: "K", label: "مشترك على Telegram", source_note: "رقم مزوّد من صاحب الموقع", sort_order: 2, is_active: true },
    { id: "s3", value: 5, display_text: null, prefix: "", suffix: "", label: "معاهد تدريس في بغداد", source_note: "بايو Instagram", sort_order: 3, is_active: true },
    { id: "s4", value: null, display_text: "علمي وأدبي", prefix: "", suffix: "", label: "السادس الإعدادي", source_note: "بايو Instagram", sort_order: 4, is_active: true },
  ],

  // العناوين والأرقام من صفحات المعاهد الرسمية. الإحداثيات تقريبية حتى تُحدَّد بدقة من لوحة الإدارة
  locations: [
    { id: "l1", name: "معهد قمة النجاح", area: "المنصور", address: "شارع 14 رمضان — شارع التانكي، مقابل السفارة الفنزويلية", lat: 33.3149, lng: 44.3517, is_approximate: true, days: null, times: null, phone: "07833114344", maps_url: null, sort_order: 1, is_active: true },
    { id: "l2", name: "معهد الريحاني 1", area: "زيونة", address: "الشارع الخدمي المجاور لدار الأزياء العراقية", lat: 33.3246, lng: 44.4632, is_approximate: true, days: null, times: null, phone: null, maps_url: null, sort_order: 2, is_active: true },
    { id: "l3", name: "معهد الريحاني 2", area: "زيونة", address: null, lat: 33.3208, lng: 44.4705, is_approximate: true, days: null, times: null, phone: null, maps_url: null, sort_order: 3, is_active: true },
    { id: "l4", name: "معهد صرح البنوك", area: "البنوك", address: "بداية شارع التربية (من جهة الشارع التجاري)", lat: 33.3985, lng: 44.4417, is_approximate: true, days: null, times: null, phone: "07757539056", maps_url: null, sort_order: 4, is_active: true },
    { id: "l5", name: "معهد المعموري", area: "صليخ الـ600", address: "صليخ الـ600، مقابل ثانوية القمة للبنات", lat: 33.3845, lng: 44.3925, is_approximate: true, days: null, times: null, phone: null, maps_url: null, sort_order: 5, is_active: true },
  ],

  books: [
    {
      id: "b1",
      slug: "mawsooat-almamouri-adab-2026",
      category: "adab",
      title: "موسوعة المعموري",
      subtitle: "في الأدب والنصوص",
      grade: "السادس الإعدادي",
      subject: "اللغة العربية — الأدب والنصوص",
      academic_year: "2027",
      description:
        "تحتوي الملزمة على أسئلة موافقة لنمط الأسئلة والأفكار الوزارية، مع نظام التعليق الصوتي عبر الباركودات المرفقة مع كل موضوع.",
      features:
        "أسئلة موافقة لنمط الأسئلة والأفكار الوزارية\nنظام التعليق الصوتي: قراءة السؤال وسماعه في الوقت نفسه عبر الباركود\nصياغة الأسئلة من قبل الأستاذ هشام المعموري",
      cover_image: "/images/cover-adab-2027.webp",
      publisher: "دار المغرب للملازم",
      order_phone: "07710055555",
      order_url: null,
      view_url: null,
      sort_order: 1,
      is_active: true,
    },
    { id: "b2", slug: "mawsooat-almamouri-qawaid-1", category: "qawaid", title: "موسوعة المعموري", subtitle: "في قواعد اللغة العربية — الجزء الأول", grade: "السادس الإعدادي", subject: "اللغة العربية — القواعد", academic_year: "2027", description: "ملزمة قواعد اللغة العربية لطلبة السادس الإعدادي — الجزء الأول، إعداد وتنظيم الأستاذ هشام المعموري.", features: null, cover_image: "/images/cover-qawaid-1-2027.webp", publisher: "دار المغرب للملازم", order_phone: null, order_url: null, view_url: null, sort_order: 2, is_active: true },
    { id: "b3", slug: "mawsooat-almamouri-qawaid-2", category: "qawaid", title: "موسوعة المعموري في القواعد", subtitle: "الجزء الثاني", grade: "السادس الإعدادي", subject: "اللغة العربية — القواعد", academic_year: "2026", description: "ملزمة قواعد اللغة العربية لطلبة السادس الإعدادي — الجزء الثاني.", features: null, cover_image: null, publisher: "دار المغرب للملازم", order_phone: null, order_url: null, view_url: null, sort_order: 3, is_active: true },
    { id: "b4", slug: "wajibat-alqawaid-2026", category: "wajibat", title: "خوارزميات المعموري", subtitle: "في واجبات قواعد اللغة العربية — الجزء الأول", grade: "السادس الإعدادي", subject: "اللغة العربية — واجبات القواعد", academic_year: "2027", description: "واجبات ذكية مبنية على تحليل أنماط الأسئلة الوزارية.", features: "أسلوب الاستفهام\nأسلوب النفي\nأسلوب التقديم والتأخير", cover_image: "/images/cover-wajibat-1-2027.webp", publisher: "دار المغرب للملازم", order_phone: null, order_url: null, view_url: null, sort_order: 4, is_active: true },
    { id: "b5", slug: "muraja-markaza-adab-2026", category: "muraja", title: "المراجعة المركزة", subtitle: "الأدب والنصوص", grade: "السادس الإعدادي", subject: "اللغة العربية — الأدب والنصوص", academic_year: "2026", description: "ملزمة المراجعة المركزة لمادة الأدب والنصوص لطلبة السادس الإعدادي.", features: null, cover_image: null, publisher: null, order_phone: null, order_url: null, view_url: null, sort_order: 5, is_active: true },
    { id: "b6", slug: "wizariyat-alqawaid", category: "wizariyat", title: "وزاريات القواعد", subtitle: "الأسئلة الوزارية", grade: "السادس الإعدادي", subject: "اللغة العربية — القواعد", academic_year: null, description: "ملزمة الأسئلة الوزارية في قواعد اللغة العربية لطلبة السادس الإعدادي.", features: null, cover_image: null, publisher: null, order_phone: null, order_url: null, view_url: null, sort_order: 6, is_active: true },
  ],

  courses: [
    {
      id: "c1",
      title: "الدورات الحضورية",
      grade: "السادس الإعدادي — علمي وأدبي",
      course_type: "in_person",
      academic_year: null,
      description: "دروس حضورية في معاهد بغداد المذكورة في قسم أماكن التدريس.",
      status: "contact",
      register_url: null,
      sort_order: 1,
      is_active: true,
    },
    {
      id: "c2",
      title: "الدورة الإلكترونية",
      grade: "السادس الإعدادي",
      course_type: "online",
      academic_year: null,
      description: "محاضرات اللغة العربية عبر تطبيق منصة المعموري على iOS وAndroid.",
      status: "contact",
      register_url: null,
      sort_order: 2,
      is_active: true,
    },
  ],

  videos: [
    {
      id: "v1",
      youtube_url: "https://www.youtube.com/playlist?list=PLZ4bPw2uRVKajoh391GvGssXFvOvIjuKL",
      title: "مراجعة مركزة 2026",
      duration: null,
      published_at: null,
      sort_order: 1,
      is_active: true,
    },
  ],

  social: [
    { id: "so1", platform: "instagram", label: "Instagram", handle: "@hisham_almamouri", url: "https://www.instagram.com/hisham_almamouri", sort_order: 1, is_active: true },
    { id: "so2", platform: "telegram", label: "Telegram", handle: "@hish84", url: "https://t.me/hish84", sort_order: 2, is_active: true },
    { id: "so3", platform: "youtube", label: "YouTube", handle: "@hisham_almamouri", url: "https://www.youtube.com/@hisham_almamouri", sort_order: 3, is_active: true },
    // صفحة ظهرت في نتائج البحث لكن لم يتم التأكد أنها رسمية — فعّلها من الإدارة بعد التحقق
    { id: "so4", platform: "facebook", label: "Facebook", handle: null, url: "https://www.facebook.com/hisham.almamouri/", sort_order: 4, is_active: false },
    { id: "so5", platform: "platform", label: "منصة المعموري", handle: "iOS / Android", url: "https://play.google.com/store/apps/details?id=com.mustafahameed.hishamapp", sort_order: 5, is_active: true },
  ],

  announcements: [],

  faqs: [
    { id: "f1", question: "أين يدرّس الأستاذ هشام المعموري؟", answer: "يدرّس حضورياً في بغداد في: معهد قمة النجاح (المنصور)، معهد الريحاني 1 و2 (زيونة)، معهد صرح البنوك (البنوك)، ومعهد المعموري (صليخ الـ600). تجد المواقع على الخريطة في قسم أماكن التدريس.", sort_order: 1, is_active: true },
    { id: "f2", question: "كيف أسجّل في الدورة؟", answer: "يمكنك إرسال طلب تسجيل من نموذج «تواصل معنا» في هذا الموقع، أو الاتصال مباشرة على أرقام التواصل، أو مراجعة المعهد الأقرب إليك.", sort_order: 2, is_active: true },
    { id: "f3", question: "هل توجد دورة إلكترونية؟", answer: "نعم، من خلال تطبيق منصة المعموري المتوفر على App Store وGoogle Play.", sort_order: 3, is_active: true },
    { id: "f4", question: "أين أحصل على الملازم؟", answer: "ملزمة «موسوعة المعموري في الأدب والنصوص» من إصدار دار المغرب للملازم، وللاستفسار عن الطلب يمكن الاتصال على الرقم المطبوع على الغلاف: 07710055555.", sort_order: 4, is_active: true },
    { id: "f5", question: "ما هو نظام التعليق الصوتي في الملزمة؟", answer: "مع كل موضوع في الملزمة باركود يمكن قراءته بالهاتف، فيستطيع الطالب قراءة السؤال وسماعه في الوقت نفسه للمساعدة على سرعة الحفظ.", sort_order: 5, is_active: true },
    { id: "f6", question: "كيف أتواصل مع الأستاذ؟", answer: "عبر الأرقام 07709997990 و07901379333، أو من خلال قناة Telegram وحساب Instagram الرسميين.", sort_order: 6, is_active: true },
    { id: "f7", question: "هل توجد محاضرات إلكترونية مجانية؟", answer: "تُنشر محاضرات ومراجعات على قناة YouTube الرسمية للأستاذ، ويمكنك مشاهدة آخرها في قسم المحاضرات.", sort_order: 7, is_active: true },
    { id: "f8", question: "كيف أصل إلى منصة المعموري؟", answer: "حمّل تطبيق «منصة المعموري» من App Store أو Google Play من خلال الأزرار في قسم المنصة الإلكترونية.", sort_order: 8, is_active: true },
  ],

  testimonials: [],

  // أماكن بيع الملزمة — الرقم الوحيد الموثّق حالياً هو المطبوع على الغلاف.
  // أضف بقية الوكلاء (الاسم، المحافظة، العنوان، الأرقام) من «لوحة الإدارة ← الوكلاء».
  sellers: [
    { id: "sl1", name: "مكتبة الربيعي", governorate: "بغداد", area: "البنوك", address: "شارع المشاتل، مقابل مشتل أبو علي", phone: "07703331873", phone2: null, whatsapp: null, map_url: null, telegram_url: "https://t.me/maktabtalrubaie", books: null, delivery: true, notes: null, sort_order: 1, is_active: true },
    { id: "sl2", name: "مكتبة سنتر المدينة (الربيعي 2)", governorate: "بغداد", area: "مدينة الصدر", address: "شارع الفلاح، قطاع 15", phone: "07734980888", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: true, notes: null, sort_order: 2, is_active: true },
    { id: "sl3", name: "مكتبة آدم", governorate: "بغداد", area: "المنصور", address: "شارع 14 رمضان، عمارة أبل، مقابل مطعم الساعة", phone: "07812190487", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: true, notes: null, sort_order: 3, is_active: true },
    { id: "sl4", name: "مكتبة آدم — فرع الكاظمية", governorate: "بغداد", area: "الكاظمية", address: "الشوصة، ساحة الزهراء، مجاور كراج الخيال", phone: "07812190487", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: true, notes: null, sort_order: 4, is_active: true },
    { id: "sl5", name: "مكتبة فاضل الوكيل", governorate: "بغداد", area: "شارع المتنبي", address: "سوق السراي، فرع السراجين، قرب جسر الشهداء", phone: null, phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 5, is_active: true },
    { id: "sl6", name: "مكتبة أسامة — الفرع الأول", governorate: "كركوك", area: "شارع التربية القديم", address: "مقابل دائرة الضمان الاجتماعي", phone: "07701306054", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 6, is_active: true },
    { id: "sl7", name: "مكتبة أسامة — الفرع الثاني", governorate: "كركوك", area: "طريق بغداد", address: "قرب محطة غرناطة", phone: "07764881314", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 7, is_active: true },
    { id: "sl8", name: "مكتبة القبس", governorate: "كربلاء", area: "حي الموظفين", address: "شارع الحوانيت", phone: "07801004015", phone2: "07702725522", whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 8, is_active: true },
    { id: "sl9", name: "دار المغرب للملازم", governorate: null, area: null, address: null, phone: "07710055555", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 9, is_active: true },
    { id: "sl10", name: "مكتبة الساعة", governorate: "بغداد", area: "الصليخ الـ600", address: "مقابل مطعم الدجاج السريع، مجاور معهد القمة", phone: "07725557755", phone2: null, whatsapp: "07725557755", map_url: null, telegram_url: null, books: null, delivery: true, notes: null, sort_order: 10, is_active: true },
    { id: "sl11", name: "مكتبة الذهب", governorate: null, area: null, address: null, phone: "07729291084", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: true, notes: null, sort_order: 11, is_active: true },
    { id: "sl12", name: "مكتبة قادمون يا طلاب", governorate: null, area: null, address: null, phone: null, phone2: null, whatsapp: "07734787034", map_url: null, telegram_url: null, books: null, delivery: true, notes: null, sort_order: 12, is_active: true },
    { id: "sl13", name: "مكتبة دار الأماني — الفرع الأول", governorate: "بغداد", area: "الحرية", address: "دور نواب الضباط، مقابل المعهد النظامي", phone: "07829026023", phone2: null, whatsapp: null, map_url: null, telegram_url: "https://t.me/amany930", books: null, delivery: true, notes: null, sort_order: 13, is_active: true },
    { id: "sl14", name: "مكتبة دار الأماني — الفرع الثاني", governorate: "بغداد", area: "الحرية — البستان", address: "شارع المدارس، مقابل مدرسة خديجة", phone: "07722744477", phone2: null, whatsapp: null, map_url: null, telegram_url: "https://t.me/darAlamany2", books: null, delivery: true, notes: null, sort_order: 14, is_active: true },
    { id: "sl15", name: "مكتبة دار الأماني — الفرع الثالث", governorate: "بغداد", area: "الحرية", address: "شارع 30، مجاور ثانوية متفوقات الحرية", phone: "07767276990", phone2: null, whatsapp: null, map_url: null, telegram_url: "https://t.me/amany931", books: null, delivery: true, notes: null, sort_order: 15, is_active: true },
    { id: "sl16", name: "مكتبة دار الأماني — الفرع الرابع", governorate: "بغداد", area: "الدولعي", address: "الشارع العام، مجاور ثانوية متفوقي الحرية", phone: "07780047315", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: true, notes: null, sort_order: 16, is_active: true },
    { id: "sl17", name: "مكتبة الماسة", governorate: null, area: null, address: null, phone: "07712907379", phone2: null, whatsapp: null, map_url: null, telegram_url: "https://t.me/massa9988", books: null, delivery: true, notes: null, sort_order: 17, is_active: true },
    { id: "sl18", name: "مكتبة جوهرة المستنصرية", governorate: "بغداد", area: "المنصور", address: "مقابل معهد الريحاني", phone: null, phone2: null, whatsapp: "07776668870", map_url: null, telegram_url: "https://t.me/Gmusss1", books: null, delivery: true, notes: null, sort_order: 18, is_active: true },
    { id: "sl19", name: "مكتبة (الاسم غير مذكور)", governorate: null, area: null, address: null, phone: null, phone2: null, whatsapp: "07723893779", map_url: null, telegram_url: null, books: null, delivery: true, notes: null, sort_order: 19, is_active: false },
    { id: "sl20", name: "مكتبة (الاسم غير مذكور)", governorate: null, area: null, address: null, phone: "07703947224", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: true, notes: null, sort_order: 20, is_active: false },
  ],

  customSections: [],
};
