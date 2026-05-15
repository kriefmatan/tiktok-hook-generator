"use client";

import { motion } from "framer-motion";
import { Clock, Lightbulb, Sparkles } from "lucide-react";
import type { AppLocale } from "../lib/locale/appLocale";
import { UI } from "../lib/locale/uiCatalog";

type Props = {
  locale: AppLocale;
};

const TEMPLATE_STUBS = ["Defense", "Shooting", "Game prep"] as const;

export function RightInsightsPanel({ locale }: Props) {
  const ui = UI[locale];

  return (
    <aside className="hidden w-[280px] shrink-0 space-y-4 xl:block">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-panel relative overflow-hidden rounded-[20px] p-5">
          <Lightbulb className="absolute -end-4 -top-4 h-24 w-24 text-accent/10" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">{ui.tipTitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">&ldquo;{ui.tipQuote}&rdquo;</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
      >
        <div className="glass-panel rounded-[20px] p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">{ui.recentTitle}</p>
            <Clock className="h-4 w-4 text-text-muted" aria-hidden />
          </div>
          <ul className="space-y-3" role="list">
            {ui.recentItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 w-full rounded-xl border border-accent/30 py-2 text-sm font-medium text-accent transition hover:bg-accent/10"
          >
            {ui.viewAll}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="glass-panel rounded-[20px] p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <p className="text-sm font-semibold text-white">{ui.templatesTitle}</p>
          </div>
          <div className="mt-3 space-y-2">
            {TEMPLATE_STUBS.map((t) => (
              <div
                key={t}
                className="rounded-xl border border-border-subtle bg-card/80 px-3 py-2 text-sm text-text-secondary"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
