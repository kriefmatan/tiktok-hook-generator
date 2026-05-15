import type { BlockKind, EmphasisKey } from "@/app/lib/locale/coachBundle.types";
import type { DrillVisualization } from "@/app/types/drillVisualization";

type TaggedTemplate = Readonly<{ viz: DrillVisualization; tags: readonly EmphasisKey[] }>;

/** Man-to-man shell / ball pressure + recover — matches sideline כמו לחץ על הכדור */
const IDX_DEF_ON_BALL = 8;
/** Trap / מעבר — run-and-jump style rotation */
const IDX_RUN_JUMP = 9;

/**
 * Canonical half-court visual presets.
 * תבניות התקפה לא מתויגות ב־pressure כדי למנוע בחירה אוטומטית בהגנה-בלבד.
 */
const TAGGED_PRESETS: readonly TaggedTemplate[] = [
  /* 0 wing read vs closeout → pass → shot (התקפה) */
  {
    tags: ["shoot", "decision", "generic"],
    viz: {
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
        { type: "closeout", player: "X1", to: { x: 42, y: 66 } },
        { type: "shot", player: 2 },
      ],
    },
  },
  /* 1 skip sequence */
  {
    tags: ["motion", "spacing", "fiveOut", "shoot", "communication", "pnr"],
    viz: {
      players: [
        { id: 1, team: "offense", x: 52, y: 74 },
        { id: 2, team: "offense", x: 84, y: 70 },
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
        { type: "closeout", player: "X2", to: { x: 80, y: 72 } },
        { type: "shot", player: 2 },
      ],
    },
  },
  /* 2 balanced 5-on-5 slice */
  {
    tags: ["communication", "decision", "generic", "turnover"],
    viz: {
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
  },
  /* 3 isolation closeout finish */
  {
    tags: ["oneOnOne", "shoot", "decision"],
    viz: {
      players: [{ id: 1, team: "offense", x: 40, y: 70 }],
      defense: [{ id: "X1", team: "defense", x: 44, y: 60 }],
      ball: { player: 1 },
      actions: [
        { type: "move", player: 1, to: { x: 46, y: 58 } },
        { type: "closeout", player: "X1", to: { x: 48, y: 66 } },
        { type: "shot", player: 1 },
      ],
    },
  },
  /* 4 transition pitch */
  {
    tags: ["fast", "transition", "decision"],
    viz: {
      players: [
        { id: 1, team: "offense", x: 28, y: 28 },
        { id: 2, team: "offense", x: 74, y: 70 },
      ],
      defense: [{ id: "X1", team: "defense", x: 72, y: 60 }],
      ball: { player: 1 },
      actions: [
        { type: "pass", from: 1, to: 2 },
        { type: "move", player: 2, to: { x: 58, y: 78 } },
        { type: "closeout", player: "X1", to: { x: 66, y: 68 } },
        { type: "shot", player: 2 },
      ],
    },
  },
  /* 5 zone high-low probe */
  {
    tags: ["zone", "spacing", "motion", "shoot"],
    viz: {
      players: [
        { id: 1, team: "offense", x: 50, y: 38 },
        { id: 2, team: "offense", x: 74, y: 60 },
        { id: 3, team: "offense", x: 62, y: 78 },
      ],
      defense: [
        { id: "X1", team: "defense", x: 58, y: 50 },
        { id: "X2", team: "defense", x: 42, y: 50 },
        { id: "X3", team: "defense", x: 50, y: 66 },
      ],
      ball: { player: 1 },
      actions: [
        { type: "pass", from: 1, to: 2 },
        { type: "move", player: 2, to: { x: 76, y: 70 } },
        { type: "pass", from: 2, to: 3 },
        { type: "shot", player: 3 },
      ],
    },
  },
  /* 6 offensive glass / kick */
  {
    tags: ["rebound", "shoot"],
    viz: {
      players: [
        { id: 1, team: "offense", x: 48, y: 88 },
        { id: 2, team: "offense", x: 18, y: 64 },
      ],
      defense: [{ id: "X1", team: "defense", x: 54, y: 80 }],
      ball: { player: 1 },
      actions: [
        { type: "pass", from: 1, to: 2 },
        { type: "shot", player: 2 },
      ],
    },
  },
  /* 7 press escape */
  {
    tags: ["pressBreak", "decision"],
    viz: {
      players: [
        { id: 1, team: "offense", x: 32, y: 24 },
        { id: 2, team: "offense", x: 74, y: 32 },
      ],
      defense: [{ id: "X1", team: "defense", x: 36, y: 32 }],
      ball: { player: 1 },
      actions: [
        { type: "move", player: 1, to: { x: 54, y: 38 } },
        { type: "pass", from: 1, to: 2 },
        { type: "closeout", player: "X1", to: { x: 50, y: 40 } },
        { type: "shot", player: 2 },
      ],
    },
  },
  /* 8 defense: on-ball pressure + recover — no wing scoring story */
  {
    tags: ["pressure", "switch"],
    viz: {
      players: [
        { id: 1, team: "offense", x: 50, y: 72 },
        { id: 2, team: "offense", x: 22, y: 58 },
      ],
      defense: [
        { id: "X1", team: "defense", x: 50, y: 60 },
        { id: "X2", team: "defense", x: 38, y: 48 },
      ],
      ball: { player: 1 },
      actions: [
        { type: "move", player: 1, to: { x: 40, y: 64 } },
        { type: "closeout", player: "X1", to: { x: 44, y: 62 } },
        { type: "move", player: 1, to: { x: 54, y: 70 } },
        { type: "closeout", player: "X1", to: { x: 52, y: 64 } },
        { type: "pass", from: 1, to: 2 },
        { type: "closeout", player: "X2", to: { x: 26, y: 56 } },
      ],
    },
  },
  /* 9 defense: pass + jump/trap rotation (run-and-jump flavor) */
  {
    tags: ["pressure"],
    viz: {
      players: [
        { id: 1, team: "offense", x: 62, y: 70 },
        { id: 2, team: "offense", x: 28, y: 58 },
      ],
      defense: [
        { id: "X1", team: "defense", x: 58, y: 60 },
        { id: "X2", team: "defense", x: 55, y: 44 },
      ],
      ball: { player: 1 },
      actions: [
        { type: "pass", from: 1, to: 2 },
        { type: "closeout", player: "X1", to: { x: 36, y: 54 } },
        { type: "closeout", player: "X2", to: { x: 32, y: 56 } },
        { type: "move", player: 2, to: { x: 38, y: 64 } },
      ],
    },
  },
];

export type DrillVizBuildInput = {
  emphasis: EmphasisKey;
  secondaryKind?: EmphasisKey;
  blockKind: BlockKind;
  blockIndex: number;
  /** Drill title from bundle — used for keyword routing (run/jump וכו׳). */
  name: string;
  /** Sideline bullets — same language as coach UI. */
  coachingPoints: readonly string[];
  /** Session seed (coach input hash) — keeps diagrams stable across blocks. */
  seed: number;
};

function normalizeCoachText(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['׳״`]/g, "");
}

/** שם התרגיל או הנקודות מכילים run-and-jump / ראן-גאמפ */
export function matchesRunJumpContext(blob: string): boolean {
  const n = normalizeCoachText(blob);
  if ((n.includes("run") && n.includes("jump")) || n.includes("runandjump") || n.includes("run-jump")) {
    return true;
  }
  if ((n.includes("ראן") || n.includes("רן")) && n.includes("גאמפ")) {
    return true;
  }
  // Latinization / partial
  if (n.includes("run jump")) return true;
  return false;
}

function coachingBlob(input: DrillVizBuildInput): string {
  return [input.name, ...input.coachingPoints].join(" ");
}

function themeKeys(input: DrillVizBuildInput): ReadonlySet<EmphasisKey> {
  return new Set<EmphasisKey>([input.emphasis, input.secondaryKind].filter(Boolean) as EmphasisKey[]);
}

/** הגנה עם דגש ללא ציר התקפה מרכזי (shoot/motion/fast וכו׳). */
export function prefersDefenseOnlyDiagram(keys: ReadonlySet<EmphasisKey>): boolean {
  const hasDef = keys.has("pressure") || keys.has("switch") || keys.has("zone");
  const hasOffAttack =
    keys.has("shoot") ||
    keys.has("motion") ||
    keys.has("pnr") ||
    keys.has("fiveOut") ||
    keys.has("spacing") ||
    keys.has("fast") ||
    keys.has("transition") ||
    keys.has("pressBreak");
  return hasDef && !hasOffAttack;
}

function defensePresetPool(keys: ReadonlySet<EmphasisKey>): number[] {
  const pool: number[] = [IDX_DEF_ON_BALL, IDX_RUN_JUMP];
  if (keys.has("zone")) pool.push(5);
  return pool;
}

function tieBreak(seed: number, blockKind: BlockKind, blockIndex: number, cand: number[]): number {
  const mix = (((seed >>> 0) + blockIndex * 1315423911 + blockKind.length * 19349663) >>> 0) % cand.length;
  return cand[mix]!;
}

function affinityScore(tags: readonly EmphasisKey[], focus: ReadonlySet<EmphasisKey>): number {
  return tags.reduce((acc, t) => acc + (focus.has(t) ? 1 : 0), 0);
}

/** Pick preset index from themes, drill name, sideline text, and seed. */
function pickPresetIndex(input: DrillVizBuildInput): number {
  const keys = themeKeys(input);
  const blob = coachingBlob(input);

  if (prefersDefenseOnlyDiagram(keys) && matchesRunJumpContext(blob)) {
    return IDX_RUN_JUMP;
  }

  const scored = TAGGED_PRESETS.map((t, i) => ({
    idx: i,
    score: affinityScore(t.tags, keys),
  }));

  let best = 0;
  for (const s of scored) {
    if (s.score > best) best = s.score;
  }

  let candidates =
    best > 0 ? scored.filter((s) => s.score === best).map((s) => s.idx) : scored.map((s) => s.idx);

  if (input.blockKind === "game") {
    const big = candidates.filter((i) => TAGGED_PRESETS[i]!.viz.players.length >= 4);
    if (big.length > 0) candidates = big;
  }

  if (prefersDefenseOnlyDiagram(keys)) {
    const pool = defensePresetPool(keys);
    const inter = candidates.filter((i) => pool.includes(i));
    if (inter.length > 0) candidates = inter;
    else candidates = pool;
  }

  return tieBreak(input.seed, input.blockKind, input.blockIndex, candidates);
}

/**
 * Build structured drill JSON for the court renderer — called for every generated block.
 */
export function buildDrillVisualization(input: DrillVizBuildInput): DrillVisualization {
  const i = pickPresetIndex(input);
  const base = TAGGED_PRESETS[i]!.viz;
  return structuredClone(base) as DrillVisualization;
}

/** One or two sideline lines for the web card (locale-aware copy already in coachingPoints). */
export function buildShortDescription(points: readonly string[], maxLen = 220): string {
  const parts = points.map((p) => p.trim()).filter(Boolean).slice(0, 2);
  if (parts.length === 0) return "";
  const out = parts.join(" · ");
  if (out.length <= maxLen) return out;
  return `${out.slice(0, Math.max(0, maxLen - 1))}…`;
}
