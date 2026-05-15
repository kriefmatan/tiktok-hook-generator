"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DrillKindMark } from "./DrillKindMark";
import { DrillCourtVisualizer } from "./DrillCourtVisualizer";
import type { PracticePlan, PracticeSheetSection } from "../types/plan";

import type { CoachLocale } from "@/app/lib/locale/coachLocale";
import type { AppLocale } from "../lib/locale/appLocale";
import { PracticePlanDownload } from "./PracticePlanDownload";

type Props = {
  plan: PracticePlan;
  locale?: AppLocale;
};

function drillVisualizerLabels(lc: CoachLocale): { show: string; hide: string } {
  switch (lc) {
    case "he":
      return { show: "הצג תרגיל", hide: "הסתר" };
    case "es":
      return { show: "Ver ejercicio", hide: "Ocultar" };
    case "de":
      return { show: "Übung zeigen", hide: "Ausblenden" };
    default:
      return { show: "Show Drill", hide: "Hide" };
  }
}

function DrillCard({
  sectionLabel,
  section,
  index,
  locale,
}: {
  sectionLabel: string;
  section: PracticeSheetSection;
  index: number;
  locale: CoachLocale;
}) {
  const { name, minutes, time, kind, secondaryKind, coachingPoints, shortDescription, visualization } = section;
  const [showCourt, setShowCourt] = useState(false);
  const vz = drillVisualizerLabels(locale);

  return (
    <article
      className="break-inside-avoid rounded-[20px] border border-border-subtle bg-card px-4 py-4 sm:px-5 sm:py-5"
      aria-labelledby={`drill-title-${index}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">{sectionLabel}</p>
        <div className="text-end leading-none">
          <p className="text-3xl font-bold tabular-nums tracking-tight text-accent sm:text-4xl">{minutes}</p>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-500">{time}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-3.5 sm:gap-4">
        <DrillKindMark kind={kind} secondaryKind={secondaryKind} />
        <div className="min-w-0 flex-1">
          <h2
            id={`drill-title-${index}`}
            className="text-lg font-semibold leading-snug text-white sm:text-xl"
            aria-describedby={`drill-notes-${index}`}
          >
            {name}
          </h2>
          {shortDescription ? (
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-400 sm:text-base">{shortDescription}</p>
          ) : null}
          <p id={`drill-notes-${index}`} className="sr-only">
            {coachingPoints.join(" ")}
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowCourt((v) => !v)}
              className="rounded-lg border border-zinc-600 bg-zinc-900/70 px-3 py-2 text-[13px] font-semibold tracking-wide text-zinc-100 transition-colors hover:bg-zinc-800/90 hover:border-zinc-500 sm:text-sm"
              aria-expanded={showCourt}
              aria-controls={`drill-court-${index}`}
            >
              {showCourt ? vz.hide : vz.show}
            </button>
          </div>
          {showCourt && (
            <div
              id={`drill-court-${index}`}
              className="mt-3 rounded-xl border border-zinc-800/80 bg-black/25 p-1"
              role="region"
              aria-label="Drill court diagram"
            >
              <DrillCourtVisualizer data={visualization} locale={locale} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function PracticePlanSheet({ plan, locale }: Props) {
  const sections: PracticeSheetSection[] = [
    plan.warmup,
    plan.drill1,
    plan.drill2,
    plan.drill3,
    plan.gameFiveOnFive,
  ];

  const uiLocale = locale ?? plan.locale;

  return (
    <motion.div
      className="font-sans text-zinc-100"
      dir={plan.dir}
      lang={plan.locale}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <PracticePlanDownload plan={plan} locale={uiLocale} />
      <header className="mb-5 border-b border-border-subtle pb-4">
        <h1 className="text-lg font-semibold leading-snug text-white sm:text-xl">{plan.headerLine}</h1>
        <p className="mt-1.5 text-sm font-medium tabular-nums text-zinc-500">{plan.totalTime}</p>
      </header>

      <div className="space-y-3 sm:space-y-4">
        {plan.sectionLabels.map((label, i) => (
          <DrillCard
            key={`${label}-${i}`}
            sectionLabel={label}
            section={sections[i]!}
            index={i}
            locale={plan.locale}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function PracticePlanSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3 sm:space-y-4" aria-busy="true" aria-label="Loading practice">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-zinc-800/80 bg-zinc-950 px-4 py-5 sm:px-5"
        >
          <div className="flex justify-between">
            <div className="h-3 w-16 rounded bg-zinc-800" />
            <div className="h-10 w-12 rounded bg-zinc-800" />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="h-12 w-12 shrink-0 rounded-lg bg-zinc-800" />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-5 w-4/5 max-w-sm rounded bg-zinc-800" />
              <div className="h-4 w-full rounded bg-zinc-800/80" />
              <div className="h-4 w-11/12 rounded bg-zinc-800/80" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
