import type { EmphasisKey } from "@/app/lib/locale/coachBundle.types";
import type { CoachLocale } from "@/app/lib/locale/coachLocale";

/** One block on the practice sheet — readable at a glance on the sideline */
export type PracticeSheetSection = {
  name: string;
  /** Formatted for display, e.g. "10 min" */
  time: string;
  /** Numeric minutes — drives large duration UI */
  minutes: number;
  /** Theme tag for a simple drill-type mark (no court diagram) */
  kind: EmphasisKey;
  coachingPoints: readonly string[];
};

export type PracticePlan = {
  headerLine: string;
  totalTime: string;
  locale: CoachLocale;
  dir: "ltr" | "rtl";
  sectionLabels: readonly [string, string, string, string, string];
  warmup: PracticeSheetSection;
  drill1: PracticeSheetSection;
  drill2: PracticeSheetSection;
  drill3: PracticeSheetSection;
  gameFiveOnFive: PracticeSheetSection;
};
