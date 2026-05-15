import type { AppLocale } from "./appLocale";

/** Fill missing locales from English so new languages can ship incrementally. */
export function localeText(map: Partial<Record<AppLocale, string>> & { en: string }): Record<AppLocale, string> {
  return {
    en: map.en,
    he: map.he ?? map.en,
    es: map.es ?? map.en,
    de: map.de ?? map.en,
  };
}
