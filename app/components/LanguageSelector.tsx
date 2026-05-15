"use client";

import type { AppLocale } from "../lib/locale/appLocale";
import { APP_LOCALES } from "../lib/locale/appLocale";
import { LOCALE_NATIVE_NAMES } from "../lib/locale/coachLocale";
import { UI } from "../lib/locale/uiCatalog";

type Props = {
  locale: AppLocale;
  onChange: (locale: AppLocale) => void;
};

export function LanguageSelector({ locale, onChange }: Props) {
  const ui = UI[locale];

  return (
    <div className="flex items-center justify-end gap-2">
      <label htmlFor="ui-locale" className="sr-only">
        {ui.languageLabel}
      </label>
      <span className="text-xs text-zinc-500" aria-hidden>
        {ui.languageLabel}
      </span>
      <select
        id="ui-locale"
        value={locale}
        onChange={(e) => onChange(e.target.value as AppLocale)}
        className="rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-100 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
      >
        {APP_LOCALES.map((id) => (
          <option key={id} value={id}>
            {LOCALE_NATIVE_NAMES[id]}
          </option>
        ))}
      </select>
    </div>
  );
}
