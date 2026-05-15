"use client";

import type { AppLocale } from "../lib/locale/appLocale";
import { UI } from "../lib/locale/uiCatalog";
import { LanguageSelector } from "./LanguageSelector";

type Props = {
  locale: AppLocale;
  onLocaleChange: (locale: AppLocale) => void;
};

export function TopHeader({ locale, onLocaleChange }: Props) {
  const ui = UI[locale];

  return (
    <header className="relative overflow-hidden rounded-2xl border border-border-subtle">
      <div
        className="absolute inset-0 bg-cover bg-[center_30%]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(26,18,8,0.85) 0%, rgba(10,10,10,0.7) 50%), url(/hero-court.jpg), url(/hero-court.png)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/40 backdrop-blur-[2px]"
        aria-hidden
      />
      <div className="relative z-10 flex flex-col gap-3 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs">
            {ui.brandName}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">{ui.title}</h1>
          <p className="mt-1 text-sm text-zinc-400">{ui.subtitle}</p>
        </div>
        <LanguageSelector locale={locale} onChange={onLocaleChange} />
      </div>
    </header>
  );
}
