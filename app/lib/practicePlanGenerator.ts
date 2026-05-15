import type { PracticePlan, PracticeSheetSection } from "../types/plan";
import type { DrillVisualization } from "../types/drillVisualization";
import type { CoachingFields } from "./coachingFields";
import type { BlockKind, EmphasisKey, SimplePracticeBundle } from "./locale/coachBundle.types";
import type { PresetId } from "./locale/uiCatalog";
import { SIMPLE_BUNDLES } from "./locale/bundles";
import { CHIP_EMPHASIS, CHIP_SESSION_PRIMARY, emphasesFromSelections } from "./input/emphasisFromInput";
import type { ChipId } from "./locale/uiCatalog";
import { parseCoachFields, type ParsedCoachThemes } from "./coachTextAnalysis";
import { goalsFromFields, isMultiGoalSession, primaryAndSecondaryKinds, type CoachGoal } from "./coach/coachGoals";
import { pickCombinedDrillTitle } from "./locale/combinedSituations";
import { buildShortDescription } from "./visualization/describeDrillVisualization";
import {
  integratedBlockForMultiGoal,
  integratedBlockForSingleGoal,
} from "./visualization/integratedPracticeDrill";
import { ensureUniqueVisualizationsInPlan } from "./visualization/drillVisualizationVariety";

const MOTION_PRESET_IDS: readonly PresetId[] = [
  "noDribblePractice",
  "passingMovement",
  "coordinationFootwork",
  "readAndReact",
];

export type { CoachingFields } from "./coachingFields";

function clip(s: string, max: number): string {
  const t = s.trim();
  if (!t) return "";
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

function coachSeed(f: CoachingFields): number {
  return hashString(`${f.locale}\n${f.workingOn}`);
}

function pickFrom<T>(arr: readonly T[], seed: number, salt: number): T {
  return arr[(seed + salt) % arr.length]!;
}

function collectEmphasesFromText(p: ParsedCoachThemes): EmphasisKey[] {
  const out: EmphasisKey[] = [];
  if (p.pressBreaking) out.push("pressBreak");
  if (p.rebounding) out.push("rebound");
  if (p.shootingConfidence) out.push("shoot");
  if (p.turnovers && !p.pressBreaking) out.push("turnover");
  if (p.transition && !p.transitionOffense) out.push("transition");
  if (p.communication) out.push("communication");
  if (p.decisionMaking) out.push("decision");
  if (p.spacing) out.push("spacing");
  if (p.offense === "pick") out.push("pnr");
  if (p.offense === "motion") out.push("motion");
  if (p.offense === "fiveOut") out.push("fiveOut");
  if (p.offense === "fast" || p.transitionOffense) out.push("fast");
  if (!p.pressBreaking) {
    if (p.defense === "zone") out.push("zone");
    if (p.defense === "aggressive" || p.defense === "pressure") out.push("pressure");
    if (p.defense === "switch") out.push("switch");
  }
  if (p.transitionOffense && !out.includes("fast")) out.push("fast");
  if (out.length === 0) out.push("generic");
  return out;
}

const DEFENSE_EMPHASIS: readonly EmphasisKey[] = ["pressure", "switch", "zone"];

function mergeEmphases(
  fromText: readonly EmphasisKey[],
  fromSelection: readonly EmphasisKey[],
  parsed: ParsedCoachThemes,
  chips: readonly ChipId[],
): EmphasisKey[] {
  const merged: EmphasisKey[] = [];
  const seen = new Set<EmphasisKey>();
  const order = fromSelection.length > 0 ? [...fromSelection, ...fromText] : [...fromText];
  for (const key of order) {
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(key);
  }

  const pressFocus =
    chips.includes("pressBreak") || parsed.pressBreaking || merged.includes("pressBreak");
  const defenseFocus =
    chips.includes("defense") || merged.some((k) => DEFENSE_EMPHASIS.includes(k));
  const fastChip = chips.includes("fastBreak");
  const transitionChip = chips.includes("transition");

  let out = merged;
  if (pressFocus) {
    out = out.filter((k) => !DEFENSE_EMPHASIS.includes(k));
    if (!out.includes("pressBreak")) out = ["pressBreak", ...out];
  }
  if (defenseFocus && !pressFocus) {
    out = out.filter((k) => k !== "pressBreak");
  }
  if (fastChip && !transitionChip) {
    out = out.filter((k) => k !== "transition");
  }
  if (transitionChip && !fastChip) {
    out = out.filter((k) => k !== "fast");
  }

  const motionFocus = out.includes("motion");
  const spacingChosen = fromSelection.includes("spacing");
  if (motionFocus && !spacingChosen) {
    out = out.filter((k) => k !== "spacing");
  }
  if (motionFocus && !parsed.turnovers) {
    out = out.filter((k) => k !== "turnover");
  }
  return out;
}

/** Single-chip or strong-focus sessions — avoid unrelated theme rotation. */
function sessionEmphasesForBlocks(
  merged: readonly EmphasisKey[],
  fields: CoachingFields,
  parsed: ParsedCoachThemes,
): EmphasisKey[] {
  const chips = fields.chips ?? [];
  const presets = fields.presets ?? [];

  if (chips.length === 1) {
    const chip = chips[0]!;
    const keys = CHIP_EMPHASIS[chip];
    if (keys.length === 1) return [keys[0]!];
    if (chip === "defense") return ["pressure", "switch"];
    if (chip === "spacing") return ["spacing", "fiveOut"];
    if (chip === "finishing") return ["shoot", "decision"];
    if (chip === "decisionMaking") return ["decision", "communication"];
    const primary = CHIP_SESSION_PRIMARY[chip];
    if (primary) return [primary];
  }

  const motionChip = chips.includes("ballMovement");
  const motionPreset = presets.some((p) => MOTION_PRESET_IDS.includes(p));
  const motionFromText =
    parsed.offense === "motion" && !parsed.turnovers && !parsed.spacing;
  if (chips.length === 1) {
    if ((motionChip || motionPreset || motionFromText) && merged.includes("motion")) {
      return ["motion"];
    }
    if ((chips.includes("pressBreak") || parsed.pressBreaking) && merged.includes("pressBreak")) {
      return ["pressBreak"];
    }
    if (chips.includes("oneOnOne") && merged.includes("oneOnOne")) {
      return ["oneOnOne"];
    }
    if (chips.includes("fastBreak") && merged.includes("fast")) {
      return ["fast"];
    }
    if (chips.includes("transition") && merged.includes("transition")) {
      return ["transition"];
    }
    if (chips.includes("shooting") && merged.includes("shoot")) {
      return ["shoot"];
    }
    if (chips.includes("rebounding") && merged.includes("rebound")) {
      return ["rebound"];
    }
  }

  return merged.length > 0 ? [...merged] : ["generic"];
}

const BLOCK_ORDER: readonly BlockKind[] = ["warmup", "drill1", "drill2", "drill3", "game"];

const YOUTH_PRESET_IDS: readonly PresetId[] = [
  "beginnerPractice",
  "funCompetitive",
  "coordinationFootwork",
  "noDribblePractice",
];

/** Max themes per session — multi-chip keeps up to 3 explicit goals. */
function capSessionEmphases(emphases: readonly EmphasisKey[], multiChip: boolean): EmphasisKey[] {
  if (multiChip) {
    if (emphases.length <= 3) return [...emphases];
    return emphases.slice(0, 3);
  }
  if (emphases.length <= 2) return [...emphases];
  return [emphases[0]!, emphases[1]!];
}

/**
 * Practice-planning progression: teach early, pressure late, 5v5 reinforces primary theme.
 * Replaces random hash rotation so coach input maps to a coherent session.
 */
function coachBlockEmphasis(emphases: readonly EmphasisKey[], blockIndex: number): EmphasisKey {
  if (emphases.length === 0) return "generic";
  if (emphases.length === 1) return emphases[0]!;

  const primary = emphases[0]!;
  const secondary = emphases[1] ?? primary;

  if (blockIndex === 0) return primary;
  if (blockIndex === 1) return primary;
  if (blockIndex === 2) return secondary;
  if (blockIndex === 3) return primary;
  return primary;
}

function headerLine(f: CoachingFields, bundle: SimplePracticeBundle): string {
  return clip(f.workingOn.trim(), 110) || bundle.headerFallback;
}

function blockMinutes(
  p: ParsedCoachThemes,
  blockIndex: number,
  fields: CoachingFields,
): number {
  const base: readonly number[] = [6, 10, 10, 10, 14];
  let m = base[blockIndex] ?? 10;
  const fastSession = p.offense === "fast" || p.transitionOffense;
  const youthSession = (fields.presets ?? []).some((id) => YOUTH_PRESET_IDS.includes(id));

  if (blockIndex === 0 && (fastSession || youthSession)) m = 5;
  if (blockIndex === 1 && p.rebounding) m = 12;
  if (blockIndex === 2 && (p.defense === "zone" || p.offense === "pick")) m = 11;
  if (blockIndex === 3 && (p.shootingConfidence || p.decisionMaking)) m = 12;
  if (blockIndex === 4 && fastSession) m = 16;
  if (blockIndex === 4 && youthSession && !fastSession) m = 12;
  return m;
}

function totalTimeLabel(minutes: readonly number[], bundle: SimplePracticeBundle): string {
  const sum = minutes.reduce((a, b) => a + b, 0);
  const rounded = Math.round(sum / 5) * 5;
  if (bundle.locale === "he") return `כ־${rounded} דק׳`;
  return `~${rounded} min`;
}

function practiceSection(
  bundle: SimplePracticeBundle,
  minutes: number,
  headlineTitle: string,
  emphasis: EmphasisKey,
  blockKind: BlockKind,
  secondaryKind: EmphasisKey | undefined,
  integrated: { visualization: DrillVisualization; coachingPoints: readonly string[] },
): PracticeSheetSection {
  const points = integrated.coachingPoints;
  return {
    name: headlineTitle,
    time: bundle.formatMinutes(minutes),
    minutes,
    kind: emphasis,
    secondaryKind,
    coachingPoints: points,
    shortDescription: buildShortDescription(points),
    visualization: integrated.visualization,
  };
}

function buildMultiGoalPlan(
  fields: CoachingFields,
  bundle: SimplePracticeBundle,
  parsed: ParsedCoachThemes,
  goals: readonly CoachGoal[],
  h: number,
): PracticePlan {
  const { kind, secondaryKind } = primaryAndSecondaryKinds(goals);
  const minutes = BLOCK_ORDER.map((_, i) => blockMinutes(parsed, i, fields));

  const sections = BLOCK_ORDER.map((blockKind, blockIndex) => {
    const headlineTitle = pickCombinedDrillTitle(goals, blockKind, bundle.locale, h, blockIndex * 11);
    const integrated = integratedBlockForMultiGoal({
      goals,
      blockKind,
      headlineTitle,
      locale: bundle.locale,
      blockIndex,
      sessionFingerprint: h,
    });
    return practiceSection(
      bundle,
      minutes[blockIndex]!,
      headlineTitle,
      kind,
      blockKind,
      secondaryKind,
      integrated,
    );
  });

  return ensureUniqueVisualizationsInPlan(
    {
      headerLine: headerLine(fields, bundle),
      totalTime: totalTimeLabel(minutes, bundle),
      locale: bundle.locale,
      dir: bundle.dir,
      sectionLabels: bundle.sectionLabels,
      warmup: sections[0]!,
      drill1: sections[1]!,
      drill2: sections[2]!,
      drill3: sections[3]!,
      gameFiveOnFive: sections[4]!,
    },
    h,
  );
}

export function buildPracticePlan(fields: CoachingFields): PracticePlan {
  const bundle = SIMPLE_BUNDLES[fields.locale];
  const parsed = parseCoachFields(fields);
  const h = coachSeed(fields);
  const chips = fields.chips ?? [];
  const goals = goalsFromFields(fields, parsed);

  if (isMultiGoalSession(goals)) {
    return buildMultiGoalPlan(fields, bundle, parsed, goals, h);
  }

  const selectionEmphases = emphasesFromSelections(fields.chips, fields.presets);
  const merged = mergeEmphases(
    collectEmphasesFromText(parsed),
    selectionEmphases,
    parsed,
    chips,
  );
  const emphases = capSessionEmphases(
    sessionEmphasesForBlocks(merged, fields, parsed),
    chips.length >= 2,
  );
  const minutes = BLOCK_ORDER.map((_, i) => blockMinutes(parsed, i, fields));

  const sections = BLOCK_ORDER.map((blockKind, blockIndex) => {
    const emphasis = coachBlockEmphasis(emphases, blockIndex);
    const headlineTitle = pickFrom(bundle.drillNames[emphasis][blockKind], h, blockIndex * 11);
    const integrated = integratedBlockForSingleGoal({
      emphasis,
      blockKind,
      headlineTitle,
      locale: bundle.locale,
      blockIndex,
      sessionFingerprint: h,
    });
    return practiceSection(
      bundle,
      minutes[blockIndex]!,
      headlineTitle,
      emphasis,
      blockKind,
      undefined,
      integrated,
    );
  });

  return ensureUniqueVisualizationsInPlan(
    {
      headerLine: headerLine(fields, bundle),
      totalTime: totalTimeLabel(minutes, bundle),
      locale: bundle.locale,
      dir: bundle.dir,
      sectionLabels: bundle.sectionLabels,
      warmup: sections[0]!,
      drill1: sections[1]!,
      drill2: sections[2]!,
      drill3: sections[3]!,
      gameFiveOnFive: sections[4]!,
    },
    h,
  );
}
