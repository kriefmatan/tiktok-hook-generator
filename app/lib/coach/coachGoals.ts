import type { CoachingFields } from "../coachingFields";
import type { EmphasisKey } from "../locale/coachBundle.types";
import type { CoachLocale } from "../locale/coachLocale";
import type { ChipId } from "../locale/uiCatalog";
import { parseCoachFields, type ParsedCoachThemes } from "../coachTextAnalysis";

/** Coach-facing session goals (situation-first, not raw EmphasisKey). */
export type CoachGoal =
  | "shoot"
  | "defense"
  | "pressure"
  | "turnover"
  | "decision"
  | "transition"
  | "motion"
  | "rebound"
  | "spacing"
  | "pressBreak"
  | "fast";

const CHIP_TO_GOALS: Record<ChipId, readonly CoachGoal[]> = {
  defense: ["defense"],
  shooting: ["shoot"],
  transition: ["transition"],
  ballMovement: ["motion"],
  finishing: ["shoot", "decision"],
  oneOnOne: ["shoot"],
  rebounding: ["rebound"],
  spacing: ["spacing"],
  pressBreak: ["pressBreak"],
  fastBreak: ["fast"],
  conditioning: ["fast"],
  decisionMaking: ["decision"],
};

const GOAL_ORDER: readonly CoachGoal[] = [
  "defense",
  "shoot",
  "pressure",
  "turnover",
  "decision",
  "transition",
  "motion",
  "rebound",
  "spacing",
  "pressBreak",
  "fast",
];

export function goalKey(goals: readonly CoachGoal[]): string {
  return [...goals].sort((a, b) => GOAL_ORDER.indexOf(a) - GOAL_ORDER.indexOf(b)).join("+");
}

export function isMultiGoalSession(goals: readonly CoachGoal[]): boolean {
  return goals.length >= 2;
}

function goalsFromChips(chips: readonly ChipId[]): CoachGoal[] {
  const out: CoachGoal[] = [];
  for (const chip of chips) {
    for (const g of CHIP_TO_GOALS[chip]) {
      if (!out.includes(g)) out.push(g);
    }
  }
  return out;
}

function goalsFromParsed(parsed: ParsedCoachThemes): CoachGoal[] {
  const out: CoachGoal[] = [];
  if (parsed.pressBreaking) out.push("pressBreak");
  if (parsed.shootingConfidence) out.push("shoot");
  if (parsed.rebounding) out.push("rebound");
  if (parsed.turnovers) out.push("turnover");
  if (parsed.decisionMaking) out.push("decision");
  if (parsed.spacing) out.push("spacing");
  if (parsed.transitionOffense) out.push("fast");
  else if (parsed.transition && !parsed.transitionOffense) out.push("transition");
  if (parsed.offense === "motion") out.push("motion");
  if (parsed.offense === "fast") out.push("fast");
  if (!parsed.pressBreaking) {
    if (
      parsed.defense === "pressure" ||
      parsed.defense === "aggressive" ||
      parsed.defense === "switch" ||
      parsed.defense === "zone"
    ) {
      out.push("defense");
    }
  }
  return out;
}

/** Up to 3 goals — chip order first, then text. */
export function goalsFromFields(fields: CoachingFields, parsed?: ParsedCoachThemes): CoachGoal[] {
  const p = parsed ?? parseCoachFields(fields);
  const fromChips = goalsFromChips(fields.chips ?? []);
  const fromText = goalsFromParsed(p);
  const merged: CoachGoal[] = [];
  for (const g of [...fromChips, ...fromText]) {
    if (!merged.includes(g)) merged.push(g);
    if (merged.length >= 3) break;
  }
  return merged;
}

/** Map goal → bundle emphasis for tags / fallback bullets. */
export function emphasisForGoal(goal: CoachGoal): EmphasisKey {
  switch (goal) {
    case "shoot":
      return "shoot";
    case "defense":
      return "pressure";
    case "pressure":
      return "pressure";
    case "turnover":
      return "turnover";
    case "decision":
      return "decision";
    case "transition":
      return "transition";
    case "motion":
      return "motion";
    case "rebound":
      return "rebound";
    case "spacing":
      return "spacing";
    case "pressBreak":
      return "pressBreak";
    case "fast":
      return "fast";
    default:
      return "generic";
  }
}

export function primaryAndSecondaryKinds(
  goals: readonly CoachGoal[],
): { kind: EmphasisKey; secondaryKind?: EmphasisKey } {
  const kind = emphasisForGoal(goals[0] ?? "defense");
  const secondary = goals[1] ? emphasisForGoal(goals[1]) : undefined;
  return {
    kind,
    secondaryKind: secondary && secondary !== kind ? secondary : undefined,
  };
}
