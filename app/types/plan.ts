import type { EmphasisKey } from "@/app/lib/locale/coachBundle.types";
import type { CoachLocale } from "@/app/lib/locale/coachLocale";
import type { DrillVisualization } from "@/app/types/drillVisualization";

/** One block on the practice sheet — readable at a glance on the sideline */
export type PracticeSheetSection = {
  name: string;
  /** Formatted for display, e.g. "10 min" */
  time: string;
  /** Numeric minutes — drives large duration UI */
  minutes: number;
  /** Theme tag for a simple drill-type mark */
  kind: EmphasisKey;
  /** Second theme when drill combines goals (e.g. defense + shooting) */
  secondaryKind?: EmphasisKey;
  /** Sideline bullets — PDF printout + accessibility */
  coachingPoints: readonly string[];
  /** Short teaser under the drill title on the web sheet */
  shortDescription: string;
  /** Structured half-court diagram for the drill viewer */
  visualization: DrillVisualization;
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
