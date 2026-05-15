import type { AppLocale } from "./locale/appLocale";

/** Coach input — single free-text field */
export type CoachingFields = {
  locale: AppLocale;
  workingOn: string;
};
