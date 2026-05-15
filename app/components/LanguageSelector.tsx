"use client";

import type { AppLocale } from "../lib/locale/appLocale";
import { APP_LOCALES } from "../lib/locale/appLocale";
import { LOCALE_NATIVE_NAMES } from "../lib/locale/coachLocale";
import { UI } from "../lib/locale/uiCatalog";
import { GlobeIcon } from "./ui/TopicIcons";

type Props = {
  locale: AppLocale;
  onChange: (locale: AppLocale) => void;
};

export function LanguageSelector({ locale, onChange }: Props) {
  const ui = UI[locale];

  return (
    <div className="relative shrink-0">
      <label htmlFor="ui-locale" className="sr-only">
        {ui.languageLabel}
      </label>
      <GlobeIcon className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <select
        id="ui-locale"
        value={locale}
        onChange={(e) => onChange(e.target.value as AppLocale)}
        className="appearance-none rounded-lg border border-border-subtle bg-surface-elevated py-2 ps-9 pe-8 text-sm text-zinc-100 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40"
      >
        {APP_LOCALES.map((id) => (
          <option key={id} value={id}>
            {LOCALE_NATIVE_NAMES[id]}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500"
        aria-hidden
      >
        ▾
      </span>
    </div>
  );
}
