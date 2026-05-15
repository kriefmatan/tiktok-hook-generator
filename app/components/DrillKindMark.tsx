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
  generic: "—",
};

type Props = {
  kind: EmphasisKey;
  className?: string;
};

export function DrillKindMark({ kind, className = "" }: Props) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-zinc-700/90 bg-zinc-900 font-mono text-[11px] font-bold leading-none tracking-tight text-zinc-400 ${className}`}
      aria-hidden
    >
      {KIND_LABEL[kind]}
    </span>
  );
}
