import type { ReactNode } from "react";
import { exampleShellHalfCourt, HalfCourtDiagram } from "@/components/HalfCourtDiagram";
import type { PracticeBlock, PracticePlan } from "../types/plan";

type Props = {
  plan: PracticePlan;
};

function BlockFields({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-zinc-800/90 pt-3 first:border-t-0 first:pt-0">
      <p className="text-xs font-semibold text-zinc-500">{label}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-zinc-200">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-zinc-200">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function PracticeSection({ title, block }: { title: string; block: PracticeBlock }) {
  return (
    <section className="break-inside-avoid rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-800 pb-3">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <span className="text-sm tabular-nums text-zinc-400">{block.duration}</span>
      </div>
      <div className="mt-4 space-y-4">
        <BlockFields label="Goal">{block.goal}</BlockFields>
        <BlockFields label="Coaching points">
          <BulletList items={block.coachingPoints} />
        </BlockFields>
        <BlockFields label="Common mistakes">
          <BulletList items={block.commonMistakes} />
        </BlockFields>
        <BlockFields label="Drill instructions">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">{block.drillInstructions}</p>
        </BlockFields>
      </div>
    </section>
  );
}

export function PracticePlanSheet({ plan }: Props) {
  const diagram = exampleShellHalfCourt();

  return (
    <div className="mt-2 max-w-3xl space-y-5 font-sans text-zinc-100">
      <header className="rounded-lg border border-zinc-800 bg-zinc-950 px-5 py-4">
        <h1 className="text-lg font-semibold leading-snug text-white sm:text-xl">{plan.practiceTitle}</h1>
        <p className="mt-2 text-sm text-zinc-400">
          <span className="text-zinc-500">Total practice time:</span> {plan.totalPracticeTime}
        </p>
      </header>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-4">
        <p className="text-xs font-semibold text-zinc-500">Half court sketch</p>
        <HalfCourtDiagram
          className="mt-3 max-w-md"
          players={diagram.players}
          movements={diagram.movements}
          passes={diagram.passes}
          caption={diagram.caption}
        />
        <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
          Blue circles = offense · Red triangles = defense · Solid arrow = player movement · Dashed arrow = pass
        </p>
      </div>

      <div className="space-y-4">
        <PracticeSection title="Warmup" block={plan.warmup} />
        <PracticeSection title="Skill development" block={plan.skillDevelopment} />
        <PracticeSection title="Team concept" block={plan.teamConcept} />
        <PracticeSection title="Competitive drill" block={plan.competitiveDrill} />
        <PracticeSection title="Scrimmage" block={plan.scrimmage} />
        <PracticeSection title="Free throws / conditioning" block={plan.freeThrowsConditioning} />
      </div>
    </div>
  );
}
