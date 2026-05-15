"use client";

import type { ReactNode } from "react";
import type { AppLocale } from "../lib/locale/appLocale";
import { LOCALE_DIR } from "../lib/locale/appLocale";
import { TopHeader } from "./TopHeader";

type Props = {
  locale: AppLocale;
  onLocaleChange: (locale: AppLocale) => void;
  children: ReactNode;
  planSection?: ReactNode;
};

export function AppShell({ locale, onLocaleChange, children, planSection }: Props) {
  const dir = LOCALE_DIR[locale];

  return (
    <div className="min-h-screen bg-background text-foreground" dir={dir} lang={locale}>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <TopHeader locale={locale} onLocaleChange={onLocaleChange} />
        <main className="mt-6">{children}</main>
        {planSection ? (
          <section className="mx-auto mt-10 max-w-4xl border-t border-border-subtle pt-8">
            {planSection}
          </section>
        ) : null}
      </div>
    </div>
  );
}
