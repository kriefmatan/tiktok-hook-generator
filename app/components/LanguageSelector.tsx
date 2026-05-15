"use client";

import type { AppLocale } from "../lib/locale/appLocale";
import { APP_LOCALES } from "../lib/locale/appLocale";
import { LOCALE_NATIVE_NAMES } from "../lib/locale/coachLocale";
import { UI } from "../lib/locale/uiCatalog";
import { Globe } from "lucide-react";

type Props = {
  locale: AppLocale;
  onChange: (locale: AppLocale) => void;
  variant?: "default" | "pill";
};

export function LanguageSelector({ locale, onChange, variant = "default" }: Props) {
  const ui = UI[locale];
  const isPill = variant === "pill";

  return (
    <div className="relative shrink-0">
      <label htmlFor="ui-locale" className="sr-only">
        {ui.languageLabel}
      </label>
      <Globe
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-text-muted ${isPill ? "start-3 h-4 w-4" : "start-3 h-4 w-4"}`}
        aria-hidden
      />
      <select
        id="ui-locale"
        value={locale}
        onChange={(e) => onChange(e.target.value as AppLocale)}
        className={
          isPill
            ? "appearance-none rounded-full border border-border-subtle bg-black/40 py-2 ps-9 pe-8 text-sm text-white backdrop-blur-md focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40"
            : "appearance-none rounded-lg border border-border-subtle bg-card py-2 ps-9 pe-8 text-sm text-zinc-100 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40"
        }
      >
        {APP_LOCALES.map((id) => (
          <option key={id} value={id}>
            {LOCALE_NATIVE_NAMES[id]}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-[10px] text-text-muted"
        aria-hidden
      >
        ▾
      </span>
    </div>
  );
}
