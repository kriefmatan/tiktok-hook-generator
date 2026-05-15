"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
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
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative h-[180px] overflow-hidden rounded-[22px] border border-border-subtle shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
    >
      <div
        className="absolute inset-0 bg-cover bg-[center_35%]"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(255,122,0,0.12) 0%, transparent 45%), linear-gradient(to top, #050505 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.2) 100%), url(/hero-court.jpg)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" aria-hidden />
      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <LanguageSelector locale={locale} onChange={onLocaleChange} variant="pill" />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-black/30 text-text-secondary backdrop-blur-md transition hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
          </button>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            {ui.brandName}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">{ui.title}</h1>
          <p className="mt-1 text-sm text-text-secondary sm:text-base">{ui.subtitle}</p>
        </div>
      </div>
    </motion.header>
  );
}

