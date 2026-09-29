/**
 * كل عناوين ونصوص الموقع الثابتة — قابلة للتعديل من «لوحة الإدارة ← نصوص الموقع».
 * القيمة هنا هي الافتراضية؛ ما يحفظه المدير في جدول hm_site_texts يحلّ محلها.
 * يمكن استخدام {name} داخل أي نص ليُستبدل باسم الأستاذ.
 */
export type TextDef = { label: string; default: string; long?: boolean };

export const TEXT_GROUPS: { group: string; items: Record<string, TextDef> }[] = [
  { group: "الواجهة الرئيسية (Hero)", items: {
    "hero.chip": { label: "الشارة أعلى الاسم", default: "مدرس اللغة العربية · السادس الإعدادي" },
    "hero.btn_about": { label: "زر 1", default: "اكتشف الأستاذ" },
    "hero.btn_locations": { label: "زر 2", default: "أماكن التدريس" },
    "hero.btn_books": { label: "زر 3", default: "الملازم" },
    "hero.btn_social": { label: "زر 4", default: "تابعني" },
    "hero.badge1_label": { label: "بطاقة الصورة 1 — العنوان", default: "المرحلة" },
    "hero.badge1_value": { label: "بطاقة الصورة 1 — القيمة", default: "السادس الإعدادي" },
    "hero.badge2_label": { label: "بطاقة الصورة 2 — العنوان", default: "المادة" },
    "hero.badge2_value": { label: "بطاقة الصورة 2 — القيمة", default: "اللغة العربية" },
  } },
  { group: "الوصول السريع", items: {
    "quick.1_q": { label: "بطاقة 1 — السؤال", default: "وين يدرّس؟" },
    "quick.1_a": { label: "بطاقة 1 — الوصف", default: "معاهد بغداد على الخريطة" },
    "quick.2_q": { label: "بطاقة 2 — السؤال", default: "وين ألقى الملازم؟" },
    "quick.2_a": { label: "بطاقة 2 — الوصف", default: "أماكن البيع والوكلاء" },
    "quick.3_q": { label: "بطاقة 3 — السؤال", default: "شلون أسجّل؟" },
    "quick.3_a": { label: "بطاقة 3 — الوصف", default: "الدورات والتسجيل" },
    "quick.4_q": { label: "بطاقة 4 — السؤال", default: "شلون أتواصل؟" },
    "quick.4_a": { label: "بطاقة 4 — الوصف", default: "أرقام التواصل المباشر" },
    "quick.5_q": { label: "بطاقة 5 — السؤال", default: "حساباته الرسمية" },
    "quick.5_a": { label: "بطاقة 5 — الوصف", default: "Instagram · Telegram · YouTube" },
  } },
  { group: "من هو الأستاذ", items: {
    "about.eyebrow": { label: "العنوان الصغير", default: "تعرّف على الأستاذ" },
    "about.caption": { label: "النص على الصورة", default: "لغة الضاد" },
    "about.p1_title": { label: "ميزة 1 — العنوان", default: "دروس حضورية" },
    "about.p1_text": { label: "ميزة 1 — النص", default: "في عدد من معاهد بغداد" },
    "about.p2_title": { label: "ميزة 2 — العنوان", default: "منصة إلكترونية" },
    "about.p2_text": { label: "ميزة 2 — النص", default: "منصة المعموري" },
    "about.p3_title": { label: "ميزة 3 — العنوان", default: "طلبة الإعدادية" },
    "about.p3_text": { label: "ميزة 3 — النص", default: "السادس الإعدادي علمي وأدبي" },
  } },
  { group: "عناوين الأقسام", items: {
    "locations.eyebrow": { label: "أماكن التدريس — عنوان صغير", default: "الدروس الحضورية" },
    "locations.title": { label: "أماكن التدريس — العنوان", default: "أماكن التدريس في بغداد" },
    "locations.desc": { label: "أماكن التدريس — الوصف", default: "اختر المعهد الأقرب إليك لعرض تفاصيله والحصول على الاتجاهات.", long: true },
    "books.eyebrow": { label: "الملازم — عنوان صغير", default: "الملازم" },
    "books.title": { label: "الملازم — العنوان", default: "ملازم {name}" },
    "books.desc": { label: "الملازم — الوصف", default: "ملازم اللغة العربية لطلبة السادس الإعدادي. المس الملزمة لتتفاعل معك، واختر القسم الذي تريده.", long: true },
    "order.eyebrow": { label: "طلب الملزمة — عنوان صغير", default: "الوكلاء وأماكن البيع" },
    "order.title": { label: "طلب الملزمة — العنوان", default: "لطلب الملزمة" },
    "order.desc": { label: "طلب الملزمة — الوصف", default: "الملزمة متوفرة لدى الوكلاء في عدة محافظات. اختر محافظتك أو ابحث باسم المنطقة.", long: true },
    "platform.eyebrow": { label: "المنصة — عنوان صغير", default: "المنصة الإلكترونية" },
    "courses.eyebrow": { label: "الدورات — عنوان صغير", default: "التسجيل" },
    "courses.title": { label: "الدورات — العنوان", default: "الدورات" },
    "courses.desc": { label: "الدورات — الوصف", default: "الدورات الحضورية والإلكترونية — اختر الدورة المناسبة وسجّل مباشرة.", long: true },
    "lectures.eyebrow": { label: "المحاضرات — عنوان صغير", default: "YouTube" },
    "lectures.title": { label: "المحاضرات — العنوان", default: "آخر المحاضرات" },
    "news.eyebrow": { label: "الأخبار — عنوان صغير", default: "Telegram" },
    "news.title": { label: "الأخبار — العنوان", default: "آخر الأخبار والإعلانات" },
    "social.eyebrow": { label: "الحسابات — عنوان صغير", default: "الحسابات الرسمية" },
    "social.title": { label: "الحسابات — العنوان", default: "تابع {name}" },
    "testimonials.eyebrow": { label: "آراء الطلاب — عنوان صغير", default: "آراء الطلاب" },
    "testimonials.title": { label: "آراء الطلاب — العنوان", default: "ماذا يقول الطلاب" },
    "faq.eyebrow": { label: "الأسئلة — عنوان صغير", default: "الأسئلة الشائعة" },
    "faq.title": { label: "الأسئلة — العنوان", default: "عندك سؤال؟" },
    "contact.eyebrow": { label: "التواصل — عنوان صغير", default: "تواصل معنا" },
    "contact.title": { label: "التواصل — العنوان", default: "تواصل معنا" },
    "contact.desc": { label: "التواصل — الوصف", default: "اتصل مباشرة أو أرسل طلب تسجيل وسنعاود الاتصال بك.", long: true },
    "contact.form_title": { label: "عنوان نموذج التسجيل", default: "طلب تسجيل أو استفسار" },
  } },
  { group: "الفوتر", items: {
    "footer.rights": { label: "نص الحقوق", default: "جميع الحقوق محفوظة." },
  } },
];

export const TEXT_DEFAULTS: Record<string, string> = Object.fromEntries(
  TEXT_GROUPS.flatMap((g) => Object.entries(g.items).map(([k, v]) => [k, v.default])),
);

/** دمج النصوص الافتراضية مع تعديلات الإدارة واستبدال {name} */
export function resolveTexts(saved: Record<string, string>, teacherName: string) {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries({ ...TEXT_DEFAULTS, ...saved })) out[k] = v.replaceAll("{name}", teacherName);
  return out;
}
