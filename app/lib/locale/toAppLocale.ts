import type { AppLocale } from "./appLocale";
import type { CoachLocale } from "./coachLocale";

export function toAppLocale(locale: CoachLocale): AppLocale {
  return locale === "he" ? "he" : "en";
}
