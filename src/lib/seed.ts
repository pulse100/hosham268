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
    repeat_system_body: "التسجيل الحضوري لسنة 2027 بنظام التكرار والإعادة: اذهب إلى المعهد الأقرب لك وخذ كارت الحجز وسعره 25 ألف دينار، والقسط يكون بعد المحاضرات الحضورية لحين تجربة الطالب لهذا النظام.",
    repeat_system_url: null,
    telegram_channel: "hish84",
    youtube_channel_id: "UCWOmbUti4wNueLMBao7v5PQ",
    seo_description:
      "الموقع الرسمي للأستاذ هشام المعموري، مدرس اللغة العربية لطلبة السادس الإعدادي في بغداد: أماكن التدريس، الملازم، الدورات، منصة المعموري، والمحاضرات.",
  },

  stats: [
    { id: "s1", value: 216, display_text: null, prefix: "+", suffix: "K", label: "متابع على Instagram", source_note: "Instagram — أيلول 2026", sort_order: 1, is_active: true },
    { id: "s2", value: 240, display_text: null, prefix: "+", suffix: "K", label: "مشترك على Telegram", source_note: "رقم مزوّد من صاحب الموقع", sort_order: 2, is_active: true },
    { id: "s3", value: 8, display_text: null, prefix: "", suffix: "", label: "معاهد تدريس في بغداد", source_note: "جدول الحجز الحضوري 2027", sort_order: 3, is_active: true },
    { id: "s4", value: null, display_text: "علمي وأدبي", prefix: "", suffix: "", label: "السادس الإعدادي", source_note: "بايو Instagram", sort_order: 4, is_active: true },
  ],

  // العناوين والأرقام من صفحات المعاهد الرسمية. الإحداثيات تقريبية حتى تُحدَّد بدقة من لوحة الإدارة
  locations: [
    { id: "l1", name: "معهد الدورة", area: "الدورة", address: "خدمي أبو طيارة، مقابل جامعة الفارابي (فرع شركة برايم) — الحجز: بنات وبنين", lat: 33.2525, lng: 44.39, is_approximate: true, days: null, times: null, phone: "07717423087", maps_url: null, sort_order: 1, is_active: true },
    { id: "l2", name: "معهد الملكي", area: "السيدية", address: "ضباط السيدية، مدخل شارع المركز، خلف متنزه عين السيدية — الحجز: بنات وبنين", lat: 33.257, lng: 44.362, is_approximate: true, days: null, times: null, phone: "07866688878", maps_url: null, sort_order: 2, is_active: true },
    { id: "l3", name: "معهد قمة النجاح", area: "المنصور", address: "شارع مطعم هيل وزعفران، قرب مطعم نصير مندي — الحجز: بنات", lat: 33.3149, lng: 44.3517, is_approximate: true, days: null, times: null, phone: "07833114344", maps_url: null, sort_order: 3, is_active: true },
    { id: "l4", name: "معهد الريحاني — المنصور", area: "المنصور", address: "شارع مطعم هيل وزعفران — الحجز: بنين", lat: 33.316, lng: 44.35, is_approximate: true, days: null, times: null, phone: "07830007717", maps_url: null, sort_order: 4, is_active: true },
    { id: "l5", name: "معهد قمة المنصور", area: "المنصور", address: "شارع التانكي — الحجز: بنين", lat: 33.3135, lng: 44.354, is_approximate: true, days: null, times: null, phone: "07755540175", maps_url: null, sort_order: 5, is_active: true },
    { id: "l6", name: "معهد المعموري", area: "الصليخ 600", address: "نهاية شارع 600، قرب مطعم الدجاج السريع — الحجز: بنات وبنين", lat: 33.3845, lng: 44.3925, is_approximate: true, days: null, times: null, phone: "07731131313", maps_url: null, sort_order: 6, is_active: true },
    { id: "l7", name: "معهد الريحاني — زيونة", area: "زيونة", address: "الشارع الخدمي لدار الأزياء العراقية — الحجز: بنات وبنين", lat: 33.3246, lng: 44.4632, is_approximate: true, days: null, times: null, phone: "07742633393", maps_url: null, sort_order: 7, is_active: true },
    { id: "l8", name: "معهد صرح البنوك", area: "البنوك", address: "مقابل الكنيسة، بداية شارع التربية، قرب مطعم كرسبي — الحجز: بنات وبنين", lat: 33.3985, lng: 44.4417, is_approximate: true, days: null, times: null, phone: "07757539056", maps_url: null, sort_order: 8, is_active: true },
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
      cover_image: "/images/cover-adab-2027-v2.webp",
      publisher: "دار المغرب للملازم",
      order_phone: "07710055555",
      order_url: null,
      view_url: null,
      sort_order: 1,
      is_active: true,
    },
    { id: "b2", slug: "mawsooat-almamouri-qawaid-1", category: "qawaid", title: "موسوعة المعموري", subtitle: "في قواعد اللغة العربية — الجزء الأول", grade: "السادس الإعدادي", subject: "اللغة العربية — القواعد", academic_year: "2027", description: "ملزمة قواعد اللغة العربية لطلبة السادس الإعدادي — الجزء الأول، إعداد وتنظيم الأستاذ هشام المعموري.", features: null, cover_image: "/images/cover-qawaid-1-2027.webp", publisher: "دار المغرب للملازم", order_phone: null, order_url: null, view_url: null, sort_order: 2, is_active: true },
    { id: "b4", slug: "wajibat-alqawaid-2026", category: "wajibat", title: "خوارزميات المعموري", subtitle: "في واجبات قواعد اللغة العربية — الجزء الأول", grade: "السادس الإعدادي", subject: "اللغة العربية — واجبات القواعد", academic_year: "2027", description: "واجبات ذكية مبنية على تحليل أنماط الأسئلة الوزارية.", features: "أسلوب الاستفهام\nأسلوب النفي\nأسلوب التقديم والتأخير", cover_image: "/images/cover-wajibat-1-2027.webp", publisher: "دار المغرب للملازم", order_phone: null, order_url: null, view_url: null, sort_order: 3, is_active: true },
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
      title: "الدورة الإلكترونية — منصة أبواب",
      grade: "السادس الإعدادي",
      course_type: "online",
      academic_year: null,
      description: "الدورة الصيفية الإلكترونية الثانية: محاضرات مسجلة، متابعة مستمرة، وامتحانات يومية وأسبوعية — التسجيل عبر منصة أبواب ووكلائها.",
      status: "contact",
      register_url: "/courses#abwab",
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
    { id: "f1", question: "أين يدرّس الأستاذ هشام المعموري؟", answer: "يدرّس حضورياً في بغداد لسنة 2027 بنظام التكرار والإعادة في: معهد الدورة (الدورة)، معهد الملكي (السيدية)، معهد قمة النجاح ومعهد الريحاني ومعهد قمة المنصور (المنصور)، معهد المعموري (الصليخ 600)، معهد الريحاني (زيونة)، ومعهد صرح البنوك (البنوك). تجد المواقع والأرقام على الخريطة في قسم أماكن التدريس.", sort_order: 1, is_active: true },
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

  agents: [
    { id: "ag1", name: "مكتبة الجذور", governorate: "البصرة", area: "الجنينة", address: null, phone: "07812600844", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 1, is_active: true },
    { id: "ag2", name: "مكتبة الوان", governorate: "النجف", area: "قرب عطية الجبوري", address: null, phone: "07800662212", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 2, is_active: true },
    { id: "ag3", name: "مكتبة أشرف وخلدون", governorate: "ميسان", area: "شارع دجلة", address: null, phone: "07712560818", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 3, is_active: true },
    { id: "ag4", name: "مكتبة الكريم", governorate: "واسط", area: "الكوت — شارع المحافظة", address: null, phone: "07725423700", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 4, is_active: true },
    { id: "ag5", name: "مكتبة الهيثم", governorate: "واسط", area: null, address: null, phone: "07719001002", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 5, is_active: true },
    { id: "ag6", name: "مكتبة القبس", governorate: "كربلاء", area: "حي الموظفين", address: null, phone: "07801004015", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 6, is_active: true },
    { id: "ag7", name: "مكتبة النرجس", governorate: "النجف", area: "حي الحسين", address: null, phone: "07804444777", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 7, is_active: true },
    { id: "ag8", name: "مكتبة التاج", governorate: "بابل", area: "الحلة — شارع 40", address: null, phone: "07802767474", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 8, is_active: true },
    { id: "ag9", name: "مكتبة الازدهار", governorate: "بابل", area: null, address: null, phone: "07806504010", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 9, is_active: true },
    { id: "ag10", name: "مكتبة المنتظر", governorate: "بابل", area: "المسيب — عمارة النسر", address: null, phone: "07706549933", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 10, is_active: true },
    { id: "ag11", name: "مكتبة النهرين", governorate: "القادسية", area: "الديوانية — شارع المصورين", address: null, phone: "07801574901", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 11, is_active: true },
    { id: "ag12", name: "مكتبة الملزمة", governorate: "ميسان", area: null, address: null, phone: "07707333790", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 12, is_active: true },
    { id: "ag13", name: "مكتبة فراس", governorate: "المثنى", area: "السماوة — السوق الكبير", address: null, phone: "07716163457", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 13, is_active: true },
    { id: "ag14", name: "مكتبة الأمراء", governorate: "بغداد", area: "الكرخ — الحرية", address: null, phone: "07770409866", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 14, is_active: true },
    { id: "ag15", name: "مكتبة الصديقين", governorate: "صلاح الدين", area: "سامراء", address: null, phone: "07702854488", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 15, is_active: true },
    { id: "ag16", name: "مكتبة البيان", governorate: "بغداد", area: "الكرخ", address: null, phone: "07700451981", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 16, is_active: true },
    { id: "ag17", name: "مكتبة تيسلا", governorate: "بغداد", area: "الكرخ", address: null, phone: "07734289248", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 17, is_active: true },
    { id: "ag18", name: "مكتبة استرو", governorate: "بغداد", area: "الكرخ", address: null, phone: "07779900166", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 18, is_active: true },
    { id: "ag19", name: "مكتبة حسن المهندس", governorate: "بغداد", area: "الرصافة", address: null, phone: "07715884036", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 19, is_active: true },
    { id: "ag20", name: "مكتبة القلعة", governorate: "بغداد", area: "الرصافة — البنوك", address: null, phone: "07722202324", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 20, is_active: true },
    { id: "ag21", name: "مكتبة جين", governorate: "بغداد", area: "الرصافة", address: null, phone: "07838906655", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 21, is_active: true },
    { id: "ag22", name: "مكتبة التفوق", governorate: "بغداد", area: "الرصافة — الزعفرانية", address: null, phone: "07716192017", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 22, is_active: true },
    { id: "ag23", name: "مكتبة المدينة", governorate: "بغداد", area: "الرصافة — المدينة", address: null, phone: "07708314441", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 23, is_active: true },
    { id: "ag24", name: "مكتبة الرضوان", governorate: "ديالى", area: "بعقوبة", address: null, phone: "07731030555", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 24, is_active: true },
    { id: "ag25", name: "مكتبة المتنبي 2", governorate: "ديالى", area: "المقدادية", address: null, phone: "07711040655", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 25, is_active: true },
    { id: "ag26", name: "مكتبة الذهبي", governorate: "ديالى", area: "خانقين", address: null, phone: "07702406444", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 26, is_active: true },
    { id: "ag27", name: "مكتبة أسامة", governorate: "كركوك", area: "شارع التربية", address: null, phone: "07701306054", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 27, is_active: true },
    { id: "ag28", name: "مكتبة الإسراء", governorate: "كركوك", area: "قرب الإدارة المحلية", address: null, phone: "07701334425", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 28, is_active: true },
    { id: "ag29", name: "مكتبة كنانة", governorate: "نينوى", area: "الموصل", address: null, phone: "07740864133", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 29, is_active: true },
    { id: "ag30", name: "مكتبة الجانب الأيمن", governorate: "نينوى", area: "الموصل — الجانب الأيمن", address: null, phone: "07740887900", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 30, is_active: true },
    { id: "ag31", name: "مكتبة الشروق", governorate: "صلاح الدين", area: "تكريت", address: null, phone: "07703771003", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 31, is_active: true },
    { id: "ag32", name: "مكتبة التقى", governorate: "صلاح الدين", area: "بلد", address: null, phone: "07817789408", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 32, is_active: true },
    { id: "ag33", name: "مكتبة المنتظر", governorate: "صلاح الدين", area: "الدجيل", address: null, phone: "07809073977", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 33, is_active: true },
    { id: "ag34", name: "مكتبة أبو مصطفى", governorate: "الأنبار", area: "الرمادي — شارع المستودع", address: null, phone: "07855252751", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 34, is_active: true },
    { id: "ag35", name: "مكتبة أم القرى", governorate: "الأنبار", area: "الفلوجة", address: null, phone: "07830019999", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 35, is_active: true },
    { id: "ag36", name: "مكتبة ذي قار", governorate: "ذي قار", area: "الناصرية", address: null, phone: "07812600844", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 36, is_active: true },
    { id: "ag37", name: "مكتبة قمة المنصور", governorate: "بغداد", area: "الكرخ — المنصور", address: null, phone: "07713188893", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 37, is_active: true },
    { id: "ag38", name: "مكتبة الجوهرة", governorate: "بغداد", area: "الكرخ", address: null, phone: "07903230011", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 38, is_active: true },
    { id: "ag39", name: "مكتبة الرتاج", governorate: "بغداد", area: "الكرخ", address: null, phone: "07804047014", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 39, is_active: true },
    { id: "ag40", name: "مكتبة ساندي بل", governorate: "بغداد", area: "الكرخ", address: null, phone: "07702710731", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 40, is_active: true },
    { id: "ag41", name: "مكتبة عمار", governorate: "بغداد", area: "الكرخ", address: null, phone: "07805248242", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 41, is_active: true },
    { id: "ag42", name: "مكتبة العربية", governorate: "بغداد", area: "الكرخ — العامرية", address: null, phone: "07833484932", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 42, is_active: true },
    { id: "ag43", name: "مكتبة ميم", governorate: "بغداد", area: "الكرخ", address: null, phone: "07738883339", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 43, is_active: true },
    { id: "ag44", name: "مكتبة لايك", governorate: "بغداد", area: "الكرخ", address: null, phone: "07727629888", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 44, is_active: true },
    { id: "ag45", name: "مكتبة الحرية", governorate: "بغداد", area: "الكرخ — الحرية", address: null, phone: "07768512777", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 45, is_active: true },
    { id: "ag46", name: "مكتبة آدم", governorate: "بغداد", area: "الكرخ", address: null, phone: "07812190487", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 46, is_active: true },
    { id: "ag47", name: "مكتبة باندا", governorate: "بغداد", area: "الكرخ", address: null, phone: "07722481048", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 47, is_active: true },
    { id: "ag48", name: "مكتبة قمة النجاح", governorate: "بغداد", area: "الكرخ — المنصور", address: null, phone: "07709265596", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 48, is_active: true },
    { id: "ag49", name: "مكتبة دايموند", governorate: "بغداد", area: "الكرخ — حي الحسين", address: null, phone: "07730341986", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 49, is_active: true },
    { id: "ag50", name: "مكتبة المستنصرية", governorate: "بغداد", area: "الرصافة — شارع فلسطين", address: null, phone: "07733334104", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 50, is_active: true },
    { id: "ag51", name: "مكتبة الجوهرة", governorate: "بغداد", area: "الرصافة", address: null, phone: "07750609065", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 51, is_active: true },
    { id: "ag52", name: "مكتبة باركود", governorate: "بغداد", area: "الرصافة — الصليخ 600", address: null, phone: "07744144600", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 52, is_active: true },
    { id: "ag53", name: "مكتبة طيور الجنة", governorate: "بغداد", area: "الرصافة", address: null, phone: "07713805062", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 53, is_active: true },
    { id: "ag54", name: "مكتبة مارينا", governorate: "بغداد", area: "الرصافة — زيونة", address: null, phone: "07713332255", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 54, is_active: true },
    { id: "ag55", name: "مكتبة جوهرة المنصور", governorate: "بغداد", area: "المنصور", address: null, phone: "07710515251", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 55, is_active: true },
    { id: "ag56", name: "مكتبة الهدف", governorate: "بغداد", area: "الحرية", address: null, phone: "07885173299", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 56, is_active: true },
    { id: "ag57", name: "مكتبة جوهرة المستنصرية", governorate: "بغداد", area: "المنصور", address: null, phone: "07776668870", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 57, is_active: true },
    { id: "ag58", name: "مكتبة البطل", governorate: "بغداد", area: "إلكترونية (أونلاين)", address: null, phone: "07800057721", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 58, is_active: true },
    { id: "ag59", name: "مكتبة جوهرة البنوك", governorate: "بغداد", area: "البنوك", address: null, phone: "07702538881", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 59, is_active: true },
    { id: "ag60", name: "مكتبة بلو بوك", governorate: "بغداد", area: "الصليخ 600", address: null, phone: "07722224210", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 60, is_active: true },
    { id: "ag61", name: "مكتبة المتنبي", governorate: "بغداد", area: "البلديات", address: null, phone: "07700700194", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 61, is_active: true },
    { id: "ag62", name: "مكتبة الملتقى", governorate: "نينوى", area: "الموصل — حي النور", address: null, phone: "07721355700", phone2: null, whatsapp: null, map_url: null, telegram_url: null, books: null, delivery: false, notes: null, sort_order: 62, is_active: true },
  ],

  customSections: [],
};
