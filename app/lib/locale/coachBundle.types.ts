import type { CoachLocale } from "./coachLocale";

export type EmphasisKey =
  | "rebound"
  | "shoot"
  | "pnr"
  | "zone"
  | "turnover"
  | "transition"
  | "communication"
  | "decision"
  | "motion"
  | "pressure"
  | "spacing"
  | "fiveOut"
  | "fast"
  | "switch"
  | "generic";

export type BlockKind = "warmup" | "drill1" | "drill2" | "drill3" | "game";

export type BlockDrillNames = Record<BlockKind, readonly string[]>;

/** Two short reminders — practical sideline language */
export type BulletPair = readonly [string, string];

export type SimplePracticeBundle = {
  locale: CoachLocale;
  dir: "ltr" | "rtl";
  formatMinutes: (n: number) => string;
  totalTime: string;
  sectionLabels: readonly [string, string, string, string, string];
  headerFallback: string;
  /** One-line setup hook per theme — woven with coach text in goals */
  setupHooks: Record<EmphasisKey, string>;
  captions: {
    lines: string;
    pnr: string;
    shooting: string;
    rebound: string;
    passTriangle: string;
    motion: string;
    shell: string;
    zone: string;
    transition: string;
    five: string;
  };
  drillNames: Record<EmphasisKey, BlockDrillNames>;
  bullets: Record<EmphasisKey, BulletPair>;
  /** Sideline reminders per block role — warmup vs teach vs compete vs 5v5 */
  blockFrames: Record<BlockKind, BulletPair>;
};
