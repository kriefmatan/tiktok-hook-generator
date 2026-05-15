"use client";

import type { ReactNode } from "react";
import type { AppLocale } from "../lib/locale/appLocale";
import { LOCALE_DIR } from "../lib/locale/appLocale";
import { AppSidebar } from "./AppSidebar";
import { RightInsightsPanel } from "./RightInsightsPanel";
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
      <div className="flex min-h-screen">
        <AppSidebar locale={locale} />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-6 px-4 py-6 sm:px-6 lg:px-8">
            <div className="min-w-0 flex-1">
              <TopHeader locale={locale} onLocaleChange={onLocaleChange} />
              <main className="mt-8">{children}</main>
              {planSection ? (
                <section className="mt-12 border-t border-border-subtle pt-10">{planSection}</section>
              ) : null}
            </div>
            <RightInsightsPanel locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
