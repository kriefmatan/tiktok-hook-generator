import type { HalfCourtMovement, HalfCourtPass, HalfCourtPlayer } from "@/components/HalfCourtDiagram";

export type PracticeBlockDiagram = {
  players: HalfCourtPlayer[];
  movements: HalfCourtMovement[];
  passes: HalfCourtPass[];
  caption?: string;
};

export type PracticeBlock = {
  duration: string;
  goal: string;
  coachingPoints: string[];
  commonMistakes: string[];
  drillInstructions: string;
  diagram: PracticeBlockDiagram;
};

export type PracticePlan = {
  practiceTitle: string;
  totalPracticeTime: string;
  warmup: PracticeBlock;
  skillDevelopment: PracticeBlock;
  teamConcept: PracticeBlock;
  competitiveDrill: PracticeBlock;
  scrimmage: PracticeBlock;
  freeThrowsConditioning: PracticeBlock;
};
