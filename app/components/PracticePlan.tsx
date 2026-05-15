"use client";

import { motion } from "framer-motion";
import { DrillKindMark } from "./DrillKindMark";
import type { PracticePlan, PracticeSheetSection } from "../types/plan";

import type { AppLocale } from "../lib/locale/appLocale";
import { PracticePlanDownload } from "./PracticePlanDownload";

type Props = {
  plan: PracticePlan;
  locale?: AppLocale;
};

function DrillCard({
  sectionLabel,
  section,
  index,
}: {
  sectionLabel: string;
  section: PracticeSheetSection;
  index: number;
}) {
  const { name, minutes, time, kind, coachingPoints } = section;

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
        <DrillKindMark kind={kind} />
        <div className="min-w-0 flex-1">
          <h2
            id={`drill-title-${index}`}
            className="text-lg font-semibold leading-snug text-white sm:text-xl"
          >
            {name}
          </h2>
          <ul className="mt-3 space-y-2.5" role="list">
            {coachingPoints.map((pt, i) => (
              <li key={i} className="flex gap-2.5 text-[15px] leading-snug text-zinc-200 sm:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
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
          <DrillCard key={`${label}-${i}`} sectionLabel={label} section={sections[i]!} index={i} />
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
