export type SiteSettings = {
  teacher_name: string;
  subtitle: string;
  tagline: string | null;
  short_bio: string | null;
  hero_image: string | null;
  about_image: string | null;
  phone_primary: string | null;
  phone_secondary: string | null;
  whatsapp_number: string | null;
  platform_name: string | null;
  platform_description: string | null;
  platform_url: string | null;
  app_store_url: string | null;
  google_play_url: string | null;
  repeat_system_title: string | null;
  repeat_system_body: string | null;
  repeat_system_url: string | null;
  telegram_channel: string | null;
  youtube_channel_id: string | null;
  seo_description: string | null;
};

type Row = { id: string; sort_order: number; is_active: boolean };

export type Stat = Row & {
  value: number | null;
  display_text: string | null;
  prefix: string | null;
  suffix: string | null;
  label: string;
  source_note?: string | null;
};

export type Location = Row & {
  name: string;
  area: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  is_approximate: boolean;
  days: string | null;
  times: string | null;
  phone: string | null;
  maps_url: string | null;
};

export type Book = Row & {
  slug: string;
  category: string | null;
  title: string;
  subtitle: string | null;
  grade: string | null;
  subject: string | null;
  academic_year: string | null;
  description: string | null;
  features: string | null;
  cover_image: string | null;
  publisher: string | null;
  order_phone: string | null;
  order_url: string | null;
  view_url: string | null;
};

export type CourseType = "in_person" | "online" | "hybrid";
export type CourseStatus = "open" | "closed" | "soon" | "contact";

export type Course = Row & {
  title: string;
  grade: string | null;
  course_type: CourseType;
  academic_year: string | null;
  description: string | null;
  status: CourseStatus;
  register_url: string | null;
};

export type Video = Row & {
  youtube_url: string;
  title: string;
  duration: string | null;
  published_at: string | null;
};

export type SocialPlatform =
  | "instagram" | "telegram" | "youtube" | "facebook" | "tiktok" | "whatsapp" | "platform" | "other";

export type SocialLink = Row & {
  platform: SocialPlatform;
  label: string;
  handle: string | null;
  url: string;
};

export type Announcement = {
  id: string;
  title: string;
  body: string | null;
  image: string | null;
  link_url: string | null;
  published_at: string;
  is_active: boolean;
};

export type Faq = Row & { question: string; answer: string };

export type Testimonial = Row & {
  name: string;
  grade: string | null;
  image: string | null;
  rating: number | null;
  body: string;
};

export type Seller = Row & {
  name: string;
  governorate: string | null;
  area: string | null;
  address: string | null;
  phone: string | null;
  phone2: string | null;
  whatsapp: string | null;
  map_url: string | null;
  telegram_url: string | null;
  books: string | null;
  delivery: boolean;
  notes: string | null;
};

export type CustomSection = Row & {
  title: string;
  subtitle: string | null;
  body: string | null;
  image: string | null;
  button_label: string | null;
  button_url: string | null;
  layout: "image-left" | "image-right" | "text";
};

export type SiteData = {
  settings: SiteSettings;
  stats: Stat[];
  locations: Location[];
  books: Book[];
  courses: Course[];
  videos: Video[];
  social: SocialLink[];
  announcements: Announcement[];
  faqs: Faq[];
  testimonials: Testimonial[];
  sellers: Seller[];
  /** وكلاء الاشتراك في الدورة الإلكترونية (منصة أبواب) */
  agents: Seller[];
  customSections: CustomSection[];
  /** كل نصوص وعناوين الموقع بعد دمج القيم الافتراضية مع تعديلات الإدارة */
  texts: Record<string, string>;
  source: "database" | "seed";
};

/** منشور من قناة Telegram العامة */
export type TelegramPost = {
  id: string;
  url: string;
  text: string;
  date: string | null;
  image: string | null;
};

/** فيديو يوتيوب موحّد (من RSS/API أو من الإدارة) */
export type YoutubeItem = {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration: string | null;
  published_at: string | null;
  pinned?: boolean;
};
