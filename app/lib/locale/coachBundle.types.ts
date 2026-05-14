import type { CoachLocale } from "./coachLocale";

export type EmphasisKey = "rebound" | "shoot" | "pnr" | "zone" | "turnover" | "transition" | "generic";

/** Two short reminders — practical, not clinic-speak */
export type BulletPair = readonly [string, string];

export type SimplePracticeBundle = {
  locale: CoachLocale;
  dir: "ltr" | "rtl";
  formatMinutes: (n: number) => string;
  totalTime: string;
  sectionLabels: readonly [string, string, string, string, string];
  headerFallback: string;
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
  titlesWarmup: readonly string[];
  titlesDrill1: readonly string[];
  titlesDrill2: readonly string[];
  titlesDrill3: readonly string[];
  titlesGame: readonly string[];
  bullets: Record<EmphasisKey, BulletPair>;
};
