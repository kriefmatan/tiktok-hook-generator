import type { EmphasisKey } from "@/app/lib/locale/coachBundle.types";

/** Short sideline labels — not court diagrams */
const KIND_LABEL: Record<EmphasisKey, string> = {
  rebound: "REB",
  shoot: "3PT",
  pnr: "PnR",
  zone: "ZON",
  turnover: "BAL",
  transition: "TRN",
  communication: "TALK",
  decision: "READ",
  motion: "MOT",
  pressure: "DEF",
  spacing: "SPC",
  fiveOut: "5OUT",
  fast: "RUN",
  switch: "SW",
  pressBreak: "BRK",
  oneOnOne: "1v1",
  generic: "—",
};

type Props = {
  kind: EmphasisKey;
  secondaryKind?: EmphasisKey;
  className?: string;
};

export function DrillKindMark({ kind, secondaryKind, className = "" }: Props) {
  const label =
    secondaryKind && secondaryKind !== kind
      ? `${KIND_LABEL[kind]}·${KIND_LABEL[secondaryKind]}`
      : KIND_LABEL[kind];

  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-zinc-700/90 bg-zinc-900 px-0.5 font-mono text-[9px] font-bold leading-tight tracking-tight text-zinc-400 sm:text-[10px] ${className}`}
      aria-hidden
    >
      {label}
    </span>
  );
}
