import type { DrillVisualization } from "@/app/types/drillVisualization";

/** כל פריסות המגרש — רק JSON קשיח לרינדור, ללא בחירה אקראית. */

export const WING_DRIVE_PASS_CLOSE_SHOT = {
  players: [
    { id: 1, team: "offense" as const, x: 48, y: 76 },
    { id: 2, team: "offense" as const, x: 74, y: 55 },
    { id: 3, team: "offense" as const, x: 36, y: 44 },
  ],
  defense: [
    { id: "X1", team: "defense" as const, x: 48, y: 64 },
    { id: "X2", team: "defense" as const, x: 60, y: 50 },
  ],
  ball: { player: 1 },
  actions: [
    { type: "move" as const, player: 1, to: { x: 34, y: 60 } },
    { type: "pass" as const, from: 1, to: 2 },
    { type: "closeout" as const, player: "X1", to: { x: 42, y: 66 } },
    { type: "shot" as const, player: 2 },
  ],
} satisfies DrillVisualization;

export const SKIP_PASS_CORNER_SEQUENCE = {
  players: [
    { id: 1, team: "offense" as const, x: 52, y: 74 },
    { id: 2, team: "offense" as const, x: 84, y: 70 },
    { id: 3, team: "offense" as const, x: 62, y: 40 },
    { id: 4, team: "offense" as const, x: 26, y: 58 },
  ],
  defense: [
    { id: "X1", team: "defense" as const, x: 52, y: 64 },
    { id: "X2", team: "defense" as const, x: 78, y: 60 },
    { id: "X3", team: "defense" as const, x: 44, y: 34 },
  ],
  ball: { player: 1 },
  actions: [
    { type: "pass" as const, from: 1, to: 3 },
    { type: "move" as const, player: 3, to: { x: 48, y: 68 } },
    { type: "pass" as const, from: 3, to: 2 },
    { type: "closeout" as const, player: "X2", to: { x: 80, y: 72 } },
    { type: "shot" as const, player: 2 },
  ],
} satisfies DrillVisualization;

export const TEAM_HALF_SLICE_5 = {
  players: [
    { id: 1, team: "offense" as const, x: 72, y: 60 },
    { id: 2, team: "offense" as const, x: 54, y: 74 },
    { id: 3, team: "offense" as const, x: 32, y: 50 },
    { id: 4, team: "offense" as const, x: 30, y: 70 },
    { id: 5, team: "offense" as const, x: 70, y: 32 },
  ],
  defense: [
    { id: "X1", team: "defense" as const, x: 68, y: 50 },
    { id: "X2", team: "defense" as const, x: 50, y: 62 },
    { id: "X3", team: "defense" as const, x: 36, y: 48 },
    { id: "X4", team: "defense" as const, x: 40, y: 64 },
    { id: "X5", team: "defense" as const, x: 68, y: 30 },
  ],
  ball: { player: 2 },
  actions: [
    { type: "pass" as const, from: 2, to: 1 },
    { type: "closeout" as const, player: "X1", to: { x: 64, y: 68 } },
    { type: "pass" as const, from: 1, to: 3 },
    { type: "shot" as const, player: 3 },
  ],
} satisfies DrillVisualization;

export const TEAM_HALF_SLICE_4 = {
  players: [
    { id: 1, team: "offense" as const, x: 72, y: 60 },
    { id: 2, team: "offense" as const, x: 54, y: 74 },
    { id: 3, team: "offense" as const, x: 32, y: 50 },
    { id: 4, team: "offense" as const, x: 30, y: 70 },
  ],
  defense: [
    { id: "X1", team: "defense" as const, x: 68, y: 50 },
    { id: "X2", team: "defense" as const, x: 50, y: 62 },
    { id: "X3", team: "defense" as const, x: 36, y: 48 },
    { id: "X4", team: "defense" as const, x: 40, y: 64 },
  ],
  ball: { player: 2 },
  actions: [
    { type: "pass" as const, from: 2, to: 1 },
    { type: "closeout" as const, player: "X1", to: { x: 64, y: 68 } },
    { type: "pass" as const, from: 1, to: 3 },
    { type: "shot" as const, player: 3 },
  ],
} satisfies DrillVisualization;

export const TEAM_HALF_SLICE_3 = {
  players: [
    { id: 1, team: "offense" as const, x: 68, y: 62 },
    { id: 2, team: "offense" as const, x: 48, y: 76 },
    { id: 3, team: "offense" as const, x: 28, y: 52 },
  ],
  defense: [
    { id: "X1", team: "defense" as const, x: 62, y: 54 },
    { id: "X2", team: "defense" as const, x: 44, y: 64 },
    { id: "X3", team: "defense" as const, x: 36, y: 44 },
  ],
  ball: { player: 1 },
  actions: [
    { type: "pass" as const, from: 1, to: 2 },
    { type: "closeout" as const, player: "X1", to: { x: 52, y: 70 } },
    { type: "pass" as const, from: 2, to: 3 },
    { type: "shot" as const, player: 3 },
  ],
} satisfies DrillVisualization;

export const TWO_V_TWO_HALF = {
  players: [
    { id: 1, team: "offense" as const, x: 62, y: 70 },
    { id: 2, team: "offense" as const, x: 34, y: 56 },
  ],
  defense: [
    { id: "X1", team: "defense" as const, x: 58, y: 62 },
    { id: "X2", team: "defense" as const, x: 42, y: 50 },
  ],
  ball: { player: 1 },
  actions: [
    { type: "pass" as const, from: 1, to: 2 },
    { type: "closeout" as const, player: "X1", to: { x: 40, y: 58 } },
    { type: "shot" as const, player: 2 },
  ],
} satisfies DrillVisualization;

export const ISO_CLOSEOUT_FINISH = {
  players: [{ id: 1, team: "offense" as const, x: 40, y: 70 }],
  defense: [{ id: "X1", team: "defense" as const, x: 44, y: 60 }],
  ball: { player: 1 },
  actions: [
    { type: "move" as const, player: 1, to: { x: 46, y: 58 } },
    { type: "closeout" as const, player: "X1", to: { x: 48, y: 66 } },
    { type: "shot" as const, player: 1 },
  ],
} satisfies DrillVisualization;

export const TWO_ON_ONE_TRANSITION = {
  players: [
    { id: 1, team: "offense" as const, x: 28, y: 28 },
    { id: 2, team: "offense" as const, x: 74, y: 70 },
  ],
  defense: [{ id: "X1", team: "defense" as const, x: 72, y: 60 }],
  ball: { player: 1 },
  actions: [
    { type: "pass" as const, from: 1, to: 2 },
    { type: "move" as const, player: 2, to: { x: 58, y: 78 } },
    { type: "closeout" as const, player: "X1", to: { x: 66, y: 68 } },
    { type: "shot" as const, player: 2 },
  ],
} satisfies DrillVisualization;

export const ZONE_HIGH_LOW_PROBE = {
  players: [
    { id: 1, team: "offense" as const, x: 50, y: 38 },
    { id: 2, team: "offense" as const, x: 74, y: 60 },
    { id: 3, team: "offense" as const, x: 62, y: 78 },
  ],
  defense: [
    { id: "X1", team: "defense" as const, x: 58, y: 50 },
    { id: "X2", team: "defense" as const, x: 42, y: 50 },
    { id: "X3", team: "defense" as const, x: 50, y: 66 },
  ],
  ball: { player: 1 },
  actions: [
    { type: "pass" as const, from: 1, to: 2 },
    { type: "move" as const, player: 2, to: { x: 76, y: 70 } },
    { type: "pass" as const, from: 2, to: 3 },
    { type: "shot" as const, player: 3 },
  ],
} satisfies DrillVisualization;

export const REBOUND_OUT_KICK = {
  players: [
    { id: 1, team: "offense" as const, x: 48, y: 88 },
    { id: 2, team: "offense" as const, x: 18, y: 64 },
  ],
  defense: [{ id: "X1", team: "defense" as const, x: 54, y: 80 }],
  ball: { player: 1 },
  actions: [
    { type: "pass" as const, from: 1, to: 2 },
    { type: "shot" as const, player: 2 },
  ],
} satisfies DrillVisualization;

export const PRESS_ESCAPE_TWO = {
  players: [
    { id: 1, team: "offense" as const, x: 32, y: 24 },
    { id: 2, team: "offense" as const, x: 74, y: 32 },
  ],
  defense: [{ id: "X1", team: "defense" as const, x: 36, y: 32 }],
  ball: { player: 1 },
  actions: [
    { type: "move" as const, player: 1, to: { x: 54, y: 38 } },
    { type: "pass" as const, from: 1, to: 2 },
    { type: "closeout" as const, player: "X1", to: { x: 50, y: 40 } },
    { type: "shot" as const, player: 2 },
  ],
} satisfies DrillVisualization;

export const DEF_PRESSURE_SHELL = {
  players: [
    { id: 1, team: "offense" as const, x: 50, y: 72 },
    { id: 2, team: "offense" as const, x: 22, y: 58 },
  ],
  defense: [
    { id: "X1", team: "defense" as const, x: 50, y: 60 },
    { id: "X2", team: "defense" as const, x: 38, y: 48 },
  ],
  ball: { player: 1 },
  actions: [
    { type: "move" as const, player: 1, to: { x: 40, y: 64 } },
    { type: "closeout" as const, player: "X1", to: { x: 44, y: 62 } },
    { type: "move" as const, player: 1, to: { x: 54, y: 70 } },
    { type: "closeout" as const, player: "X1", to: { x: 52, y: 64 } },
    { type: "pass" as const, from: 1, to: 2 },
    { type: "closeout" as const, player: "X2", to: { x: 26, y: 56 } },
  ],
} satisfies DrillVisualization;

export const RUN_JUMP_DOUBLE = {
  players: [
    { id: 1, team: "offense" as const, x: 62, y: 70 },
    { id: 2, team: "offense" as const, x: 28, y: 58 },
  ],
  defense: [
    { id: "X1", team: "defense" as const, x: 58, y: 60 },
    { id: "X2", team: "defense" as const, x: 55, y: 44 },
  ],
  ball: { player: 1 },
  actions: [
    { type: "pass" as const, from: 1, to: 2 },
    { type: "closeout" as const, player: "X1", to: { x: 36, y: 54 } },
    { type: "closeout" as const, player: "X2", to: { x: 32, y: 56 } },
    { type: "move" as const, player: 2, to: { x: 38, y: 64 } },
  ],
} satisfies DrillVisualization;

/** Safe minimal — מאומת תמיד */
export const FALLBACK_HALF_MINIMAL = {
  players: [
    { id: 1, team: "offense" as const, x: 50, y: 70 },
    { id: 2, team: "offense" as const, x: 72, y: 58 },
  ],
  defense: [{ id: "X1", team: "defense" as const, x: 52, y: 62 }],
  ball: { player: 1 },
  actions: [
    { type: "pass" as const, from: 1, to: 2 },
    { type: "shot" as const, player: 2 },
  ],
} satisfies DrillVisualization;

export const ALL_LIBRARY_VISUALIZATIONS: readonly DrillVisualization[] = [
  WING_DRIVE_PASS_CLOSE_SHOT,
  SKIP_PASS_CORNER_SEQUENCE,
  TEAM_HALF_SLICE_5,
  TEAM_HALF_SLICE_4,
  TEAM_HALF_SLICE_3,
  TWO_V_TWO_HALF,
  ISO_CLOSEOUT_FINISH,
  TWO_ON_ONE_TRANSITION,
  ZONE_HIGH_LOW_PROBE,
  REBOUND_OUT_KICK,
  PRESS_ESCAPE_TWO,
  DEF_PRESSURE_SHELL,
  RUN_JUMP_DOUBLE,
  FALLBACK_HALF_MINIMAL,
];
