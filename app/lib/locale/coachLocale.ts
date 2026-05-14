export type CoachLocale = "en" | "he" | "es";

/** Text direction for UI and printed sheet (matches each `SimplePracticeBundle.dir`). */
export const LOCALE_DIR: Record<CoachLocale, "ltr" | "rtl"> = {
  en: "ltr",
  he: "rtl",
  es: "ltr",
};
