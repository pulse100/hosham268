/** تصنيفات الملازم — تظهر كأزرار فلترة في قسم الملازم */
export const BOOK_CATEGORIES = [
  { value: "adab", label: "الأدب والنصوص", from: "#6e1b2e", to: "#2e0d16", accent: "#e9c29c" },
  { value: "qawaid", label: "القواعد", from: "#12305a", to: "#0b1530", accent: "#e3b287" },
  { value: "wajibat", label: "الواجبات والتمارين", from: "#1d4d3c", to: "#0c2219", accent: "#f0d6a8" },
  { value: "muraja", label: "المراجعة المركزة", from: "#6b3b12", to: "#2b1506", accent: "#ffd9a8" },
  { value: "wizariyat", label: "الوزاريات", from: "#3d1f5c", to: "#1a0d2b", accent: "#e6c3ff" },
  { value: "other", label: "أخرى", from: "#3a2a2a", to: "#140c0c", accent: "#eadcd9" },
] as const;

export const categoryOf = (v: string | null | undefined) =>
  BOOK_CATEGORIES.find((c) => c.value === v) ?? BOOK_CATEGORIES[BOOK_CATEGORIES.length - 1];
