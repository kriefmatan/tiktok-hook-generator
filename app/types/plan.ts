import type { HalfCourtMovement, HalfCourtPass, HalfCourtPlayer } from "@/components/HalfCourtDiagram";
import type { CoachLocale } from "@/app/lib/locale/coachLocale";

export type PracticeBlockDiagram = {
  players: HalfCourtPlayer[];
  movements: HalfCourtMovement[];
  passes: HalfCourtPass[];
  caption?: string;
};

/** One block on the sheet — short, readable on the sideline */
export type PracticeSheetSection = {
  name: string;
  time: string;
  /** One-line goal — mostly the coach’s own words */
  goal: string;
  coachingPoints: readonly [string, string];
  diagram: PracticeBlockDiagram;
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
