import type { ChipId, PresetId } from "../locale/uiCatalog";
import type { EmphasisKey } from "../locale/coachBundle.types";

/** Single-chip sessions lock to this primary theme (see sessionEmphasesForBlocks). */
export const CHIP_SESSION_PRIMARY: Partial<Record<ChipId, EmphasisKey>> = {
  ballMovement: "motion",
  pressBreak: "pressBreak",
  defense: "pressure",
  shooting: "shoot",
  rebounding: "rebound",
  spacing: "spacing",
  transition: "transition",
  fastBreak: "fast",
  conditioning: "fast",
  decisionMaking: "decision",
  oneOnOne: "oneOnOne",
  finishing: "shoot",
};

export const CHIP_EMPHASIS: Record<ChipId, readonly EmphasisKey[]> = {
  defense: ["pressure", "switch"],
  shooting: ["shoot"],
  transition: ["transition"],
  ballMovement: ["motion"],
  finishing: ["shoot", "decision"],
  oneOnOne: ["oneOnOne"],
  rebounding: ["rebound"],
  spacing: ["spacing", "fiveOut"],
  pressBreak: ["pressBreak"],
  fastBreak: ["fast"],
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
  noDribblePractice: ["motion", "decision"],
  funCompetitive: ["decision", "fast"],
  passingMovement: ["motion", "decision"],
  coordinationFootwork: ["motion"],
  pickAndRoll: ["pnr"],
  helpDefense: ["pressure", "switch"],
  rotations: ["switch", "communication"],
  readAndReact: ["decision", "motion"],
  transitionDefense: ["transition"],
};

/** Emphasis keys implied by UI chip / preset selections (authoritative over text mis-parse). */
export function emphasesFromSelections(
  chips: readonly ChipId[] = [],
  presets: readonly PresetId[] = [],
): EmphasisKey[] {
  const out: EmphasisKey[] = [];
  for (const id of chips) {
    for (const key of CHIP_EMPHASIS[id]) out.push(key);
  }
  for (const id of presets) {
    for (const key of PRESET_EMPHASIS[id]) out.push(key);
  }
  return [...new Set(out)];
}
