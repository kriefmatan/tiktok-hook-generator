import type { PracticePlan, PracticeSheetSection } from "../types/plan";
import type { CoachingFields } from "./coachingFields";
import type { BlockKind, EmphasisKey, SimplePracticeBundle } from "./locale/coachBundle.types";
import type { PresetId } from "./locale/uiCatalog";
import { SIMPLE_BUNDLES } from "./locale/bundles";
import { emphasesFromSelections } from "./input/emphasisFromInput";
import { parseCoachFields, type ParsedCoachThemes } from "./coachTextAnalysis";

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
  if (p.rebounding) out.push("rebound");
  if (p.shootingConfidence) out.push("shoot");
  if (p.turnovers) out.push("turnover");
  if (p.transition && !p.transitionOffense) out.push("transition");
  if (p.communication) out.push("communication");
  if (p.decisionMaking) out.push("decision");
  if (p.spacing) out.push("spacing");
  if (p.offense === "pick") out.push("pnr");
  if (p.offense === "motion") out.push("motion");
  if (p.offense === "fiveOut") out.push("fiveOut");
  if (p.offense === "fast" || p.transitionOffense) out.push("fast");
  if (p.defense === "zone") out.push("zone");
  if (p.defense === "aggressive" || p.defense === "pressure") out.push("pressure");
  if (p.defense === "switch") out.push("switch");
  if (p.transitionOffense && !out.includes("fast")) out.push("fast");
  if (out.length === 0) out.push("generic");
  return out;
}

function mergeEmphases(
  fromText: readonly EmphasisKey[],
  fromSelection: readonly EmphasisKey[],
  parsed: ParsedCoachThemes,
): EmphasisKey[] {
  const merged: EmphasisKey[] = [];
  const seen = new Set<EmphasisKey>();
  const order = fromSelection.length > 0 ? [...fromSelection, ...fromText] : [...fromText];
  for (const key of order) {
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(key);
  }

  const motionFocus = merged.includes("motion");
  const spacingChosen = fromSelection.includes("spacing");
  let out = merged;
  if (motionFocus && !spacingChosen) {
    out = out.filter((k) => k !== "spacing");
  }
  if (motionFocus && !parsed.turnovers) {
    out = out.filter((k) => k !== "turnover");
  }
  return out;
}

/** Off-ball movement sessions stay on motion drills — no BAL/SPC rotation. */
function sessionEmphasesForBlocks(
  merged: readonly EmphasisKey[],
  fields: CoachingFields,
  parsed: ParsedCoachThemes,
): EmphasisKey[] {
  const chips = fields.chips ?? [];
  const presets = fields.presets ?? [];
  const motionChip = chips.includes("ballMovement");
  const motionPreset = presets.some((p) => MOTION_PRESET_IDS.includes(p));
  const motionFromText =
    parsed.offense === "motion" && !parsed.turnovers && !parsed.spacing;

  const offBallFocus =
    (motionChip || motionPreset || motionFromText) && merged.includes("motion");

  if (offBallFocus) {
    return ["motion"];
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

/** Max themes per session — avoids unrelated rotation (practice-planning skill). */
function capSessionEmphases(emphases: readonly EmphasisKey[]): EmphasisKey[] {
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

  if (blockIndex <= 1) return primary;
  if (blockIndex === 2) return secondary;
  return primary;
}

function headerLine(f: CoachingFields, bundle: SimplePracticeBundle): string {
  return clip(f.workingOn.trim(), 110) || bundle.headerFallback;
}

function buildCoachingPoints(emphasis: EmphasisKey, bundle: SimplePracticeBundle): readonly string[] {
  const [a, b] = bundle.bullets[emphasis];
  const hook = bundle.setupHooks[emphasis];
  const points: string[] = [];
  if (hook && hook.length <= 48) points.push(hook);
  if (a) points.push(a);
  if (b && b !== a) points.push(b);
  return points.slice(0, 4);
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

function section(
  bundle: SimplePracticeBundle,
  minutes: number,
  name: string,
  emphasis: EmphasisKey
): PracticeSheetSection {
  return {
    name,
    time: bundle.formatMinutes(minutes),
    minutes,
    kind: emphasis,
    coachingPoints: buildCoachingPoints(emphasis, bundle),
  };
}

export function buildPracticePlan(fields: CoachingFields): PracticePlan {
  const bundle = SIMPLE_BUNDLES[fields.locale];
  const parsed = parseCoachFields(fields);
  const h = coachSeed(fields);
  const selectionEmphases = emphasesFromSelections(fields.chips, fields.presets);
  const merged = mergeEmphases(collectEmphasesFromText(parsed), selectionEmphases, parsed);
  const emphases = capSessionEmphases(sessionEmphasesForBlocks(merged, fields, parsed));
  const minutes = BLOCK_ORDER.map((_, i) => blockMinutes(parsed, i, fields));

  const sections = BLOCK_ORDER.map((kind, blockIndex) => {
    const emphasis = coachBlockEmphasis(emphases, blockIndex);
    const name = pickFrom(bundle.drillNames[emphasis][kind], h, blockIndex * 11);
    return section(bundle, minutes[blockIndex]!, name, emphasis);
  });

  return {
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
  };
}
