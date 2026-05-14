export type PracticeBlock = {
  duration: string;
  goal: string;
  coachingPoints: string[];
  commonMistakes: string[];
  drillInstructions: string;
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
