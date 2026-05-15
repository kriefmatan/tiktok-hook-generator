export type CoachLocale = "en" | "he" | "es" | "de";

/** Text direction for UI and printed sheet (matches each `SimplePracticeBundle.dir`). */
export const LOCALE_DIR: Record<CoachLocale, "ltr" | "rtl"> = {
  en: "ltr",
  he: "rtl",
  es: "ltr",
  de: "ltr",
};

export const LOCALE_NATIVE_NAMES: Record<CoachLocale, string> = {
  en: "English",
  he: "עברית",
  es: "Español",
  de: "Deutsch",
};
