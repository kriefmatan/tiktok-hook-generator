import type { ChipId, PresetId } from "../locale/uiCatalog";
import type { EmphasisKey } from "../locale/coachBundle.types";

export const CHIP_EMPHASIS: Record<ChipId, readonly EmphasisKey[]> = {
  defense: ["pressure", "switch"],
  shooting: ["shoot"],
  transition: ["transition", "fast"],
  ballMovement: ["motion", "turnover"],
  finishing: ["shoot", "decision"],
  oneOnOne: ["pressure", "decision"],
  rebounding: ["rebound"],
  spacing: ["spacing", "fiveOut"],
  pressBreak: ["pressure", "turnover"],
  fastBreak: ["fast", "transition"],
  conditioning: ["fast"],
  decisionMaking: ["decision", "communication"],
};

export const PRESET_EMPHASIS: Record<PresetId, readonly EmphasisKey[]> = {
  defensivePractice: ["pressure", "switch", "transition"],
  shootingPractice: ["shoot"],
  gamePrep: ["decision", "pressure"],
  fundamentals: ["turnover", "motion"],
  fastPacePractice: ["fast", "transition"],
  toughnessPractice: ["pressure", "communication"],
  beginnerPractice: ["motion", "turnover"],
  noDribblePractice: ["motion", "turnover"],
  funCompetitive: ["decision", "fast"],
  passingMovement: ["motion", "turnover", "spacing"],
  coordinationFootwork: ["motion"],
  pickAndRoll: ["pnr"],
  helpDefense: ["pressure", "switch"],
  rotations: ["switch", "communication"],
  readAndReact: ["decision", "motion"],
  transitionDefense: ["transition"],
};
