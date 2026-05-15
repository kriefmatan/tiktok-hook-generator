import type { AppLocale } from "./appLocale";
import { isAppLocale } from "./appLocale";

const STORAGE_KEY = "practice-ui-locale";

export function readStoredUiLocale(): AppLocale | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isAppLocale(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function writeStoredUiLocale(locale: AppLocale): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore quota / private mode */
  }
}
