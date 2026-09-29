import { BOOK_CATEGORIES } from "../books";
/**
 * تعريف كل أقسام المحتوى في لوحة الإدارة.
 * لإضافة حقل جديد: أضفه في قاعدة البيانات ثم هنا — تُبنى النماذج والجداول تلقائياً.
 */
export type FieldType = "text" | "textarea" | "number" | "float" | "url" | "tel" | "select" | "boolean" | "image" | "date";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  dir?: "ltr" | "rtl";
  width?: "full" | "half";
};

export type EntityConfig = {
  key: string;
  table: string;
  label: string;
  singular: string;
  titleField: string;
  subtitleField?: string;
  orderBy: string;
  ascending: boolean;
  fields: Field[];
};

const common: Field[] = [
  { name: "sort_order", label: "الترتيب", type: "number", width: "half", help: "الأصغر يظهر أولاً" },
  { name: "is_active", label: "منشور على الموقع", type: "boolean", width: "half" },
];

const GOVERNORATES = [
  "بغداد", "البصرة", "نينوى", "أربيل", "النجف", "كربلاء", "بابل", "ذي قار", "الأنبار", "ديالى",
  "كركوك", "صلاح الدين", "واسط", "ميسان", "القادسية", "المثنى", "دهوك", "السليمانية", "حلبجة",
  "كل المحافظات",
].map((g) => ({ value: g, label: g }));

export const ENTITIES: EntityConfig[] = [
  {
    key: "books", table: "hm_books", label: "الملازم", singular: "ملزمة", titleField: "title", subtitleField: "grade", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "title", label: "اسم الملزمة", type: "text", required: true, width: "half" },
      { name: "subtitle", label: "العنوان الفرعي", type: "text", width: "half" },
      { name: "category", label: "نوع الملزمة", type: "select", width: "half", options: BOOK_CATEGORIES.map((c) => ({ value: c.value, label: c.label })) },
      { name: "slug", label: "الرابط المختصر (بالإنجليزية)", type: "text", required: true, dir: "ltr", help: "مثال: mawsooa-adab-2026 — يظهر في رابط الصفحة", width: "half" },
      { name: "grade", label: "الصف", type: "text", width: "half" },
      { name: "subject", label: "المادة", type: "text", width: "half" },
      { name: "academic_year", label: "السنة الدراسية", type: "text", width: "half" },
      { name: "cover_image", label: "صورة الغلاف", type: "image", help: "ارفع صورة الغلاف الحقيقية (JPG/PNG/WebP حتى 5MB). إذا تركتها فارغة يظهر غلاف مصمم تلقائياً" },
      { name: "description", label: "وصف مختصر", type: "textarea" },
      { name: "features", label: "المميزات", type: "textarea", help: "سطر لكل ميزة" },
      { name: "publisher", label: "الناشر", type: "text", width: "half" },
      { name: "order_phone", label: "رقم الطلب", type: "tel", width: "half" },
      { name: "order_url", label: "رابط الطلب/الحجز", type: "url", width: "half" },
      { name: "view_url", label: "رابط عرض الملزمة (اختياري)", type: "url", width: "half" },
      ...common,
    ],
  },
  {
    key: "sellers", table: "hm_sellers", label: "الوكلاء وأماكن البيع", singular: "وكيل", titleField: "name", subtitleField: "governorate", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "name", label: "اسم الوكيل / المكتبة", type: "text", required: true, width: "half" },
      { name: "governorate", label: "المحافظة", type: "select", width: "half", options: GOVERNORATES },
      { name: "area", label: "المنطقة", type: "text", width: "half" },
      { name: "address", label: "العنوان التفصيلي", type: "text", width: "half" },
      { name: "phone", label: "رقم الهاتف", type: "tel", width: "half" },
      { name: "phone2", label: "رقم ثانٍ", type: "tel", width: "half" },
      { name: "whatsapp", label: "رقم WhatsApp", type: "tel", width: "half" },
      { name: "telegram_url", label: "رابط Telegram", type: "url", width: "half" },
      { name: "map_url", label: "رابط الموقع على Google Maps", type: "url" },
      { name: "books", label: "الملازم المتوفرة لديه", type: "text" },
      { name: "delivery", label: "يوفر خدمة توصيل", type: "boolean" },
      { name: "notes", label: "ملاحظات", type: "textarea" },
      ...common,
    ],
  },
  {
    key: "sections", table: "hm_custom_sections", label: "أقسام إضافية", singular: "قسم", titleField: "title", subtitleField: "subtitle", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "title", label: "عنوان القسم", type: "text", required: true, width: "half" },
      { name: "subtitle", label: "عنوان صغير فوقه", type: "text", width: "half" },
      { name: "body", label: "النص", type: "textarea" },
      { name: "image", label: "صورة", type: "image" },
      { name: "layout", label: "التصميم", type: "select", required: true, width: "half", options: [
        { value: "image-left", label: "الصورة يسار والنص يمين" }, { value: "image-right", label: "الصورة يمين والنص يسار" }, { value: "text", label: "نص فقط (في المنتصف)" }] },
      { name: "button_label", label: "نص الزر (اختياري)", type: "text", width: "half" },
      { name: "button_url", label: "رابط الزر", type: "url" },
      ...common,
    ],
  },
  {
    key: "locations", table: "hm_locations", label: "أماكن التدريس", singular: "معهد", titleField: "name", subtitleField: "area", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "name", label: "اسم المعهد", type: "text", required: true, width: "half" },
      { name: "area", label: "المنطقة", type: "text", required: true, width: "half" },
      { name: "address", label: "العنوان التفصيلي", type: "text" },
      { name: "lat", label: "خط العرض (Latitude)", type: "float", dir: "ltr", width: "half", help: "من Google Maps: اضغط مطولاً على الموقع وانسخ الرقم الأول" },
      { name: "lng", label: "خط الطول (Longitude)", type: "float", dir: "ltr", width: "half" },
      { name: "is_approximate", label: "الموقع تقريبي", type: "boolean", help: "ألغِ التحديد بعد إدخال الإحداثيات الدقيقة للمعهد" },
      { name: "days", label: "أيام التدريس", type: "text", width: "half" },
      { name: "times", label: "أوقات المحاضرات", type: "text", width: "half" },
      { name: "phone", label: "رقم التواصل", type: "tel", width: "half" },
      { name: "maps_url", label: "رابط Google Maps (اختياري)", type: "url", width: "half" },
      ...common,
    ],
  },
  {
    key: "courses", table: "hm_courses", label: "الدورات", singular: "دورة", titleField: "title", subtitleField: "grade", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "title", label: "اسم الدورة", type: "text", required: true, width: "half" },
      { name: "grade", label: "الصف", type: "text", width: "half" },
      { name: "course_type", label: "نوع الدورة", type: "select", required: true, width: "half", options: [
        { value: "in_person", label: "حضوري" }, { value: "online", label: "إلكتروني" }, { value: "hybrid", label: "حضوري + إلكتروني" }] },
      { name: "status", label: "الحالة", type: "select", required: true, width: "half", options: [
        { value: "open", label: "مفتوحة للتسجيل" }, { value: "closed", label: "مغلقة" }, { value: "soon", label: "قريباً" }, { value: "contact", label: "للاستفسار تواصل معنا" }] },
      { name: "academic_year", label: "السنة الدراسية", type: "text", width: "half" },
      { name: "register_url", label: "رابط التسجيل (اختياري)", type: "url", width: "half", help: "إن تُرك فارغاً يذهب زر التسجيل إلى نموذج التواصل" },
      { name: "description", label: "الوصف", type: "textarea" },
      ...common,
    ],
  },
  {
    key: "videos", table: "hm_videos", label: "الفيديوهات", singular: "فيديو", titleField: "title", subtitleField: "youtube_url", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "title", label: "عنوان الفيديو", type: "text", required: true },
      { name: "youtube_url", label: "رابط YouTube (فيديو أو قائمة تشغيل)", type: "url", required: true },
      { name: "duration", label: "المدة", type: "text", dir: "ltr", width: "half", placeholder: "45:20" },
      { name: "published_at", label: "تاريخ النشر", type: "date", width: "half" },
      ...common,
    ],
  },
  {
    key: "social", table: "hm_social_links", label: "الحسابات", singular: "حساب", titleField: "label", subtitleField: "url", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "platform", label: "المنصة", type: "select", required: true, width: "half", options: [
        { value: "instagram", label: "Instagram" }, { value: "telegram", label: "Telegram" }, { value: "youtube", label: "YouTube" },
        { value: "facebook", label: "Facebook" }, { value: "tiktok", label: "TikTok" }, { value: "whatsapp", label: "WhatsApp" },
        { value: "platform", label: "منصة المعموري" }, { value: "other", label: "أخرى" }] },
      { name: "label", label: "الاسم الظاهر", type: "text", required: true, width: "half" },
      { name: "url", label: "الرابط", type: "url", required: true, help: "أضف الحسابات الرسمية الموثقة فقط" },
      { name: "handle", label: "المعرّف", type: "text", dir: "ltr", width: "half", placeholder: "@username" },
      ...common,
    ],
  },
  {
    key: "stats", table: "hm_stats", label: "الأرقام", singular: "رقم", titleField: "label", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "label", label: "الوصف", type: "text", required: true, placeholder: "متابع على Telegram" },
      { name: "value", label: "الرقم", type: "float", width: "half", help: "مثال: 240 مع لاحقة K" },
      { name: "display_text", label: "أو نص بدل الرقم", type: "text", width: "half", placeholder: "عدة" },
      { name: "prefix", label: "قبل الرقم", type: "text", dir: "ltr", width: "half", placeholder: "+" },
      { name: "suffix", label: "بعد الرقم", type: "text", dir: "ltr", width: "half", placeholder: "K" },
      { name: "source_note", label: "ملاحظة داخلية: مصدر الرقم وتاريخه", type: "text", help: "لا تظهر على الموقع" },
      ...common,
    ],
  },
  {
    key: "announcements", table: "hm_announcements", label: "الإعلانات", singular: "إعلان", titleField: "title", subtitleField: "published_at", orderBy: "published_at", ascending: false,
    fields: [
      { name: "title", label: "العنوان", type: "text", required: true },
      { name: "body", label: "النص", type: "textarea" },
      { name: "image", label: "صورة", type: "image" },
      { name: "link_url", label: "رابط", type: "url", width: "half" },
      { name: "published_at", label: "التاريخ", type: "date", width: "half" },
      { name: "is_active", label: "منشور على الموقع", type: "boolean" },
    ],
  },
  {
    key: "faqs", table: "hm_faqs", label: "الأسئلة الشائعة", singular: "سؤال", titleField: "question", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "question", label: "السؤال", type: "text", required: true },
      { name: "answer", label: "الجواب", type: "textarea", required: true },
      ...common,
    ],
  },
  {
    key: "testimonials", table: "hm_testimonials", label: "آراء الطلاب", singular: "رأي", titleField: "name", subtitleField: "grade", orderBy: "sort_order", ascending: true,
    fields: [
      { name: "name", label: "اسم الطالب", type: "text", required: true, width: "half" },
      { name: "grade", label: "المرحلة", type: "text", width: "half" },
      { name: "body", label: "رأي الطالب", type: "textarea", required: true, help: "أضف آراء حقيقية وبموافقة أصحابها فقط" },
      { name: "rating", label: "التقييم (1-5)", type: "number", width: "half" },
      { name: "image", label: "صورة (اختيارية)", type: "image" },
      ...common,
    ],
  },
];

export const SETTINGS_FIELDS: { group: string; fields: Field[] }[] = [
  { group: "الهوية", fields: [
    { name: "teacher_name", label: "اسم الأستاذ", type: "text", required: true, width: "half" },
    { name: "subtitle", label: "الوصف المختصر", type: "text", required: true, width: "half" },
    { name: "tagline", label: "العبارة التسويقية", type: "text" },
    { name: "short_bio", label: "النبذة التعريفية", type: "textarea" },
    { name: "hero_image", label: "الصورة الرئيسية (Hero)", type: "image" },
    { name: "about_image", label: "صورة قسم «من هو الأستاذ»", type: "image" },
  ] },
  { group: "التواصل", fields: [
    { name: "phone_primary", label: "رقم الهاتف الأول", type: "tel", width: "half" },
    { name: "phone_secondary", label: "رقم الهاتف الثاني", type: "tel", width: "half" },
    { name: "whatsapp_number", label: "رقم WhatsApp (المؤكد فقط)", type: "tel", width: "half", help: "يظهر زر واتساب فقط عند تعبئته" },
  ] },
  { group: "منصة المعموري", fields: [
    { name: "platform_name", label: "اسم المنصة", type: "text", width: "half" },
    { name: "platform_url", label: "رابط المنصة على الويب", type: "url", width: "half" },
    { name: "platform_description", label: "وصف المنصة", type: "textarea" },
    { name: "app_store_url", label: "رابط App Store", type: "url", width: "half" },
    { name: "google_play_url", label: "رابط Google Play", type: "url", width: "half" },
  ] },
  { group: "نظام الإعادة والتكرار", fields: [
    { name: "repeat_system_title", label: "العنوان", type: "text", width: "half" },
    { name: "repeat_system_url", label: "رابط التفاصيل (اختياري)", type: "url", width: "half" },
    { name: "repeat_system_body", label: "تفاصيل النظام", type: "textarea" },
  ] },
  { group: "المحتوى التلقائي و SEO", fields: [
    { name: "telegram_channel", label: "اسم قناة Telegram العامة", type: "text", dir: "ltr", width: "half", help: "بدون @ — لعرض آخر المنشورات" },
    { name: "youtube_channel_id", label: "معرف قناة YouTube", type: "text", dir: "ltr", width: "half", help: "يبدأ بـ UC — لعرض آخر الفيديوهات" },
    { name: "seo_description", label: "وصف محركات البحث", type: "textarea" },
  ] },
];

export const getEntity = (key: string) => ENTITIES.find((e) => e.key === key);
