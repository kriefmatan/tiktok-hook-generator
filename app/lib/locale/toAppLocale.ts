import type { AppLocale } from "./appLocale";
import { DEFAULT_APP_LOCALE, isAppLocale } from "./appLocale";

/** Normalize unknown locale values to a supported app locale (default English). */
export function toAppLocale(value: unknown): AppLocale {
  return isAppLocale(value) ? value : DEFAULT_APP_LOCALE;
}
