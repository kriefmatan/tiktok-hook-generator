import type { DrillVisualization } from "@/app/types/drillVisualization";

/**
 * Lightweight samples so every drill card can mount the court viewer.
 * Replace later with persisted drill JSON when your pipeline emits it.
 */
const BASE_SAMPLES: DrillVisualization[] = [
  {
    players: [
      { id: 1, team: "offense", x: 48, y: 76 },
      { id: 2, team: "offense", x: 74, y: 55 },
      { id: 3, team: "offense", x: 36, y: 44 },
    ],
    defense: [
      { id: "X1", team: "defense", x: 48, y: 64 },
      { id: "X2", team: "defense", x: 60, y: 50 },
    ],
    ball: { player: 1 },
    actions: [
      { type: "move", player: 1, to: { x: 34, y: 60 } },
      { type: "pass", from: 1, to: 2 },
      { type: "closeout", player: "X1", to: { x: 40, y: 66 } },
      { type: "shot", player: 2 },
    ],
  },
  {
    players: [
      { id: 1, team: "offense", x: 52, y: 74 },
      { id: 2, team: "offense", x: 82, y: 70 },
      { id: 3, team: "offense", x: 62, y: 40 },
      { id: 4, team: "offense", x: 26, y: 58 },
    ],
    defense: [
      { id: "X1", team: "defense", x: 52, y: 64 },
      { id: "X2", team: "defense", x: 78, y: 60 },
      { id: "X3", team: "defense", x: 44, y: 34 },
    ],
    ball: { player: 1 },
    actions: [
      { type: "pass", from: 1, to: 3 },
      { type: "move", player: 3, to: { x: 48, y: 68 } },
      { type: "pass", from: 3, to: 2 },
      { type: "shot", player: 2 },
    ],
  },
  {
    players: [
      { id: 1, team: "offense", x: 72, y: 60 },
      { id: 2, team: "offense", x: 54, y: 74 },
      { id: 3, team: "offense", x: 32, y: 50 },
      { id: 4, team: "offense", x: 30, y: 70 },
      { id: 5, team: "offense", x: 70, y: 32 },
    ],
    defense: [
      { id: "X1", team: "defense", x: 68, y: 50 },
      { id: "X2", team: "defense", x: 50, y: 62 },
      { id: "X3", team: "defense", x: 36, y: 48 },
      { id: "X4", team: "defense", x: 40, y: 64 },
      { id: "X5", team: "defense", x: 68, y: 30 },
    ],
    ball: { player: 2 },
    actions: [
      { type: "pass", from: 2, to: 1 },
      { type: "closeout", player: "X1", to: { x: 64, y: 68 } },
      { type: "pass", from: 1, to: 3 },
      { type: "shot", player: 3 },
    ],
  },
];

export function demoVisualizationForBlock(blockIndex: number): DrillVisualization {
  const v = BASE_SAMPLES[blockIndex % BASE_SAMPLES.length]!;
  return structuredClone(v) as DrillVisualization;
}
