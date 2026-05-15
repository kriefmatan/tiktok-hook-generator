import type { CoachLocale } from "./coachLocale";

/** Languages available in the UI picker and practice bundles. */
export type AppLocale = CoachLocale;

export const APP_LOCALES: readonly AppLocale[] = ["en", "he", "es", "de"];

export const DEFAULT_APP_LOCALE: AppLocale = "en";

export const LOCALE_DIR: Record<AppLocale, "ltr" | "rtl"> = {
  en: "ltr",
  he: "rtl",
  es: "ltr",
  de: "ltr",
};

export function isAppLocale(value: unknown): value is AppLocale {
  return value === "en" || value === "he" || value === "es" || value === "de";
}
