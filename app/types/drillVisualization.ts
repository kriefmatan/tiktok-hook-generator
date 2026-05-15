/**
 * Optional payload for on-court drill diagrams.
 * Coordinates are percentages: x and y in 0–100 within the half-court viewBox
 * (hoop at bottom center; division line at top).
 */
export type DrillVizXY = { x: number; y: number };

export type DrillVizPlayer = {
  id: number;
  team: "offense";
  x: number;
  y: number;
};

export type DrillVizDefender = {
  id: string;
  team: "defense";
  x: number;
  y: number;
};

export type DrillVizBall = { player: number };

export type DrillVizAction =
  | { type: "move"; player: number; to: DrillVizXY }
  | { type: "pass"; from: number; to: number }
  | { type: "shot"; player: number; to?: DrillVizXY }
  | { type: "closeout"; player: string; to: DrillVizXY };

/** Wire this from real drill metadata when available; demos use bundled samples. */
export type DrillVisualization = {
  readonly players: readonly DrillVizPlayer[];
  readonly defense: readonly DrillVizDefender[];
  readonly ball: DrillVizBall;
  readonly actions: readonly DrillVizAction[];
};
