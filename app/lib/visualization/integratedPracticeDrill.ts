import type { CoachGoal } from "@/app/lib/coach/coachGoals";
import { goalKey } from "@/app/lib/coach/coachGoals";
import type { BlockKind, EmphasisKey } from "@/app/lib/locale/coachBundle.types";
import type { CoachLocale } from "@/app/lib/locale/coachLocale";
import {
  DEF_PRESSURE_SHELL,
  FALLBACK_HALF_MINIMAL,
  ISO_CLOSEOUT_FINISH,
  PRESS_ESCAPE_TWO,
  REBOUND_OUT_KICK,
  RUN_JUMP_DOUBLE,
  SKIP_PASS_CORNER_SEQUENCE,
  TEAM_HALF_SLICE_3,
  TEAM_HALF_SLICE_4,
  TEAM_HALF_SLICE_5,
  TWO_ON_ONE_TRANSITION,
  TWO_V_TWO_HALF,
  WING_DRIVE_PASS_CLOSE_SHOT,
  ZONE_HIGH_LOW_PROBE,
  ALL_LIBRARY_VISUALIZATIONS,
} from "@/app/lib/visualization/drillVisualLibrary";
import { coachingPointsFromVisualization } from "@/app/lib/visualization/describeDrillVisualization";
import { nearestVisualizationForHeadline } from "@/app/lib/visualization/headlineVizMatch";
import { validateDrillVisualization } from "@/app/lib/visualization/validateDrillVisualization";
import type { DrillVisualization } from "@/app/types/drillVisualization";

function clone(v: DrillVisualization): DrillVisualization {
  return structuredClone(v) as DrillVisualization;
}

const GENERIC_FLOW: Record<BlockKind, DrillVisualization> = {
  warmup: ISO_CLOSEOUT_FINISH,
  drill1: WING_DRIVE_PASS_CLOSE_SHOT,
  drill2: TEAM_HALF_SLICE_3,
  drill3: TEAM_HALF_SLICE_4,
  game: TEAM_HALF_SLICE_5,
};

export const MULTI_GOAL_PREFERRED: Record<string, Record<BlockKind, DrillVisualization>> = {
  "defense+shoot": {
    warmup: ISO_CLOSEOUT_FINISH,
    drill1: WING_DRIVE_PASS_CLOSE_SHOT,
    drill2: TEAM_HALF_SLICE_3,
    drill3: TEAM_HALF_SLICE_4,
    game: TEAM_HALF_SLICE_5,
  },
  "defense+shoot+pressure": {
    warmup: ISO_CLOSEOUT_FINISH,
    drill1: TWO_V_TWO_HALF,
    drill2: TEAM_HALF_SLICE_3,
    drill3: TEAM_HALF_SLICE_4,
    game: TEAM_HALF_SLICE_5,
  },
  "defense+pressure": {
    warmup: DEF_PRESSURE_SHELL,
    drill1: TEAM_HALF_SLICE_3,
    drill2: TEAM_HALF_SLICE_4,
    drill3: RUN_JUMP_DOUBLE,
    game: TEAM_HALF_SLICE_5,
  },
  "shoot+pressure": {
    warmup: ISO_CLOSEOUT_FINISH,
    drill1: WING_DRIVE_PASS_CLOSE_SHOT,
    drill2: TEAM_HALF_SLICE_3,
    drill3: TEAM_HALF_SLICE_4,
    game: TEAM_HALF_SLICE_5,
  },
  "defense+turnover": {
    warmup: TWO_V_TWO_HALF,
    drill1: TEAM_HALF_SLICE_3,
    drill2: TEAM_HALF_SLICE_4,
    drill3: RUN_JUMP_DOUBLE,
    game: TEAM_HALF_SLICE_5,
  },
  "shoot+decision": {
    warmup: WING_DRIVE_PASS_CLOSE_SHOT,
    drill1: TEAM_HALF_SLICE_3,
    drill2: TEAM_HALF_SLICE_4,
    drill3: SKIP_PASS_CORNER_SEQUENCE,
    game: TEAM_HALF_SLICE_5,
  },
  "defense+decision": {
    warmup: TWO_V_TWO_HALF,
    drill1: TEAM_HALF_SLICE_3,
    drill2: TEAM_HALF_SLICE_4,
    drill3: DEF_PRESSURE_SHELL,
    game: TEAM_HALF_SLICE_5,
  },
  "motion+shoot": {
    warmup: SKIP_PASS_CORNER_SEQUENCE,
    drill1: TEAM_HALF_SLICE_3,
    drill2: SKIP_PASS_CORNER_SEQUENCE,
    drill3: TEAM_HALF_SLICE_4,
    game: TEAM_HALF_SLICE_5,
  },
  "defense+transition": {
    warmup: TWO_V_TWO_HALF,
    drill1: TWO_ON_ONE_TRANSITION,
    drill2: TEAM_HALF_SLICE_4,
    drill3: TEAM_HALF_SLICE_5,
    game: TEAM_HALF_SLICE_5,
  },
};

type SingleMatrix = Partial<Record<EmphasisKey, Partial<Record<BlockKind, DrillVisualization>>>>;

const SINGLE_GOAL_PREFERRED: SingleMatrix = {
  shoot: GENERIC_FLOW,
  decision: {
    warmup: WING_DRIVE_PASS_CLOSE_SHOT,
    drill1: TEAM_HALF_SLICE_3,
    drill2: SKIP_PASS_CORNER_SEQUENCE,
    drill3: TEAM_HALF_SLICE_4,
    game: TEAM_HALF_SLICE_5,
  },
  motion: {
    warmup: SKIP_PASS_CORNER_SEQUENCE,
    drill1: SKIP_PASS_CORNER_SEQUENCE,
    drill2: TEAM_HALF_SLICE_3,
    drill3: TEAM_HALF_SLICE_4,
    game: TEAM_HALF_SLICE_5,
  },
  pressure: {
    warmup: DEF_PRESSURE_SHELL,
    drill1: TEAM_HALF_SLICE_3,
    drill2: TEAM_HALF_SLICE_4,
    drill3: RUN_JUMP_DOUBLE,
    game: TEAM_HALF_SLICE_5,
  },
  switch: {
    warmup: DEF_PRESSURE_SHELL,
    drill1: TEAM_HALF_SLICE_3,
    drill2: TEAM_HALF_SLICE_4,
    drill3: RUN_JUMP_DOUBLE,
    game: TEAM_HALF_SLICE_5,
  },
  zone: {
    warmup: ZONE_HIGH_LOW_PROBE,
    drill1: ZONE_HIGH_LOW_PROBE,
    drill2: TEAM_HALF_SLICE_4,
    drill3: ZONE_HIGH_LOW_PROBE,
    game: TEAM_HALF_SLICE_5,
  },
  fast: {
    warmup: TWO_ON_ONE_TRANSITION,
    drill1: TWO_ON_ONE_TRANSITION,
    drill2: TEAM_HALF_SLICE_4,
    drill3: TEAM_HALF_SLICE_5,
    game: TEAM_HALF_SLICE_5,
  },
  transition: {
    warmup: TWO_ON_ONE_TRANSITION,
    drill1: TWO_ON_ONE_TRANSITION,
    drill2: TEAM_HALF_SLICE_4,
    drill3: TEAM_HALF_SLICE_5,
    game: TEAM_HALF_SLICE_5,
  },
  rebound: {
    warmup: REBOUND_OUT_KICK,
    drill1: REBOUND_OUT_KICK,
    drill2: TEAM_HALF_SLICE_4,
    drill3: REBOUND_OUT_KICK,
    game: TEAM_HALF_SLICE_5,
  },
  pressBreak: {
    warmup: PRESS_ESCAPE_TWO,
    drill1: PRESS_ESCAPE_TWO,
    drill2: TEAM_HALF_SLICE_4,
    drill3: PRESS_ESCAPE_TWO,
    game: TEAM_HALF_SLICE_5,
  },
  turnover: {
    warmup: TWO_V_TWO_HALF,
    drill1: TEAM_HALF_SLICE_3,
    drill2: RUN_JUMP_DOUBLE,
    drill3: TEAM_HALF_SLICE_4,
    game: TEAM_HALF_SLICE_5,
  },
  pnr: GENERIC_FLOW,
  fiveOut: GENERIC_FLOW,
  spacing: GENERIC_FLOW,
  communication: GENERIC_FLOW,
  oneOnOne: {
    warmup: ISO_CLOSEOUT_FINISH,
    drill1: ISO_CLOSEOUT_FINISH,
    drill2: ISO_CLOSEOUT_FINISH,
    drill3: ISO_CLOSEOUT_FINISH,
    game: TWO_V_TWO_HALF,
  },
  generic: GENERIC_FLOW,
};

function preferredSingle(emphasis: EmphasisKey, blockKind: BlockKind): DrillVisualization {
  const row = SINGLE_GOAL_PREFERRED[emphasis] ?? SINGLE_GOAL_PREFERRED.generic;
  const cell = row?.[blockKind] ?? GENERIC_FLOW[blockKind];
  return cell ?? FALLBACK_HALF_MINIMAL;
}

function preferredMulti(goals: readonly CoachGoal[], blockKind: BlockKind): DrillVisualization {
  const key = goalKey(goals);
  const row = MULTI_GOAL_PREFERRED[key] ?? MULTI_GOAL_PREFERRED["defense+shoot"];
  const cell = row?.[blockKind];
  return cell ?? FALLBACK_HALF_MINIMAL;
}

/**
 * Validates JSON → matches headline squad counts → explains only from JSON.
 */
export function resolveDrillFromHeadlineAndPreferred(args: {
  headlineTitle: string;
  preferred: DrillVisualization;
  locale: CoachLocale;
}): { visualization: DrillVisualization; coachingPoints: readonly string[] } {
  let base = clone(args.preferred);
  if (!validateDrillVisualization(base)) {
    base = clone(FALLBACK_HALF_MINIMAL);
  }

  let matched = nearestVisualizationForHeadline(args.headlineTitle, base, ALL_LIBRARY_VISUALIZATIONS);
  if (!validateDrillVisualization(matched)) {
    matched = clone(FALLBACK_HALF_MINIMAL);
  }

  const coachingPoints = coachingPointsFromVisualization(matched, args.locale);
  return { visualization: matched, coachingPoints };
}

export function integratedBlockForMultiGoal(args: {
  goals: readonly CoachGoal[];
  blockKind: BlockKind;
  headlineTitle: string;
  locale: CoachLocale;
}): { visualization: DrillVisualization; coachingPoints: readonly string[] } {
  const preferred = preferredMulti(args.goals, args.blockKind);
  return resolveDrillFromHeadlineAndPreferred({
    headlineTitle: args.headlineTitle,
    preferred,
    locale: args.locale,
  });
}

export function integratedBlockForSingleGoal(args: {
  emphasis: EmphasisKey;
  blockKind: BlockKind;
  headlineTitle: string;
  locale: CoachLocale;
}): { visualization: DrillVisualization; coachingPoints: readonly string[] } {
  const preferred = preferredSingle(args.emphasis, args.blockKind);
  return resolveDrillFromHeadlineAndPreferred({
    headlineTitle: args.headlineTitle,
    preferred,
    locale: args.locale,
  });
}
