import type { CoachLocale } from "./coachLocale";

/** Languages shown in the UI selector (extend here later). */
export type AppLocale = Extract<CoachLocale, "en" | "he">;

export const APP_LOCALES: readonly AppLocale[] = ["en", "he"];

export const LOCALE_DIR: Record<AppLocale, "ltr" | "rtl"> = {
  en: "ltr",
  he: "rtl",
};

export function isAppLocale(value: unknown): value is AppLocale {
  return value === "en" || value === "he";
}
