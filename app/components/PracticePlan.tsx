"use client";

import { HalfCourtDiagram } from "@/components/HalfCourtDiagram";
import type { PracticePlan, PracticeSheetSection } from "../types/plan";

type Props = {
  plan: PracticePlan;
};

function SheetRow({
  sectionLabel,
  section,
}: {
  sectionLabel: string;
  section: PracticeSheetSection;
}) {
  const { diagram, name, time, goal, coachingPoints } = section;

  return (
    <section className="break-inside-avoid grid gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(140px,200px)] sm:items-start">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{sectionLabel}</h2>
          <span className="text-xs tabular-nums text-zinc-500">{time}</span>
        </div>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-white">{name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{goal}</p>
        <ul className="mt-2 space-y-0.5 text-sm leading-snug text-zinc-200">
          {coachingPoints.map((pt, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-zinc-600">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded border border-zinc-700/80 bg-black/40 p-2 sm:justify-self-end">
        <HalfCourtDiagram
          className="w-full max-w-[200px] sm:mx-auto"
          players={diagram.players}
          movements={diagram.movements}
          passes={diagram.passes}
          caption={diagram.caption}
        />
      </div>
    </section>
  );
}

export function PracticePlanSheet({ plan }: Props) {
  const sections: PracticeSheetSection[] = [
    plan.warmup,
    plan.drill1,
    plan.drill2,
    plan.drill3,
    plan.gameFiveOnFive,
  ];

  return (
    <div className="space-y-3 font-sans text-zinc-100" dir={plan.dir} lang={plan.locale}>
      <header className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
        <h1 className="text-base font-semibold leading-snug text-white sm:text-lg">{plan.headerLine}</h1>
        <p className="mt-1 text-xs text-zinc-500">{plan.totalTime}</p>
      </header>

      <div className="space-y-3">
        {plan.sectionLabels.map((label, i) => (
          <SheetRow key={`${label}-${i}`} sectionLabel={label} section={sections[i]!} />
        ))}
      </div>
    </div>
  );
}
