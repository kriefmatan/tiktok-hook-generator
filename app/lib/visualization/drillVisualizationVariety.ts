import { buildShortDescription, coachingPointsFromVisualization } from "@/app/lib/visualization/describeDrillVisualization";
import { validateDrillVisualization } from "@/app/lib/visualization/validateDrillVisualization";
import type { PracticePlan, PracticeSheetSection } from "@/app/types/plan";
import type { DrillVisualization, DrillVizAction } from "@/app/types/drillVisualization";

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function mix32(n: number): number {
  let x = n >>> 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return x >>> 0;
}

/** Session + block + headline — ties catalog picks and diversify input. */
export function blockVisualizationSalt(
  sessionFingerprint: number,
  blockIndex: number,
  headlineTitle: string,
): number {
  let h = mix32(sessionFingerprint ^ (blockIndex * 374761393));
  const t = headlineTitle;
  for (let i = 0; i < t.length; i++) {
    h = mix32(Math.imul(31, h) + t.charCodeAt(i));
  }
  return h >>> 0;
}

export function widenVisualizationSalt(blockSalt: number, extra: number): number {
  return mix32(blockSalt + extra * 7919 + 40684786);
}

/** Deterministic micro-jitter (percent units) so each block gets distinct coordinates. */
function jitterPair(x: number, y: number, salt: number, id: number): { x: number; y: number } {
  const h1 = mix32(salt + id * 977);
  const h2 = mix32(salt * 1664525 + id * 1013904223);
  const dx = ((h1 % 11) - 5) * 0.65;
  const dy = ((h2 % 11) - 5) * 0.65;
  return {
    x: clamp(x + dx, 2, 98),
    y: clamp(y + dy, 8, 94),
  };
}

function mirrorX(x: number, enabled: boolean): number {
  return enabled ? clamp(100 - x, 2, 98) : x;
}

function remapAction(a: DrillVizAction, salt: number, idx: number, mirror: boolean): DrillVizAction {
  switch (a.type) {
    case "move": {
      const j = jitterPair(a.to.x, a.to.y, salt, idx + 700);
      return { ...a, to: { x: mirrorX(j.x, mirror), y: j.y } };
    }
    case "closeout": {
      const j = jitterPair(a.to.x, a.to.y, salt, idx + 800);
      return { ...a, to: { x: mirrorX(j.x, mirror), y: j.y } };
    }
    case "shot":
      if (!a.to) return a;
      {
        const j = jitterPair(a.to.x, a.to.y, salt, idx + 900);
        return { ...a, to: { x: mirrorX(j.x, mirror), y: j.y } };
      }
    default:
      return a;
  }
}

/**
 * Clones preset JSON with a deterministic layout variant (jitter + optional mirror).
 * Used so consecutive drills with the same catalog preset still look different.
 */
export function diversifyDrillVisualization(base: DrillVisualization, salt: number): DrillVisualization {
  const mirror = (mix32(salt) & 1) === 1;

  const players = base.players.map((p) => {
    const j = jitterPair(p.x, p.y, salt, p.id);
    return { ...p, x: mirrorX(j.x, mirror), y: j.y };
  });

  const defense = base.defense.map((d) => {
    const id = d.id.charCodeAt(0) + (d.id.length > 2 ? d.id.charCodeAt(2) : 0);
    const j = jitterPair(d.x, d.y, salt, id + 400);
    return { ...d, x: mirrorX(j.x, mirror), y: j.y };
  });

  const actions = base.actions.map((a, i) => remapAction(a, salt, i, mirror));

  const v: DrillVisualization = {
    players,
    defense,
    ball: { ...base.ball },
    actions,
  };

  if (!validateDrillVisualization(v)) {
    return structuredClone(base) as DrillVisualization;
  }
  return v;
}

const SECTION_KEYS = ["warmup", "drill1", "drill2", "drill3", "gameFiveOnFive"] as const;

function vizSignature(v: DrillVisualization): string {
  return JSON.stringify(v);
}

function sectionWithVisualization(
  sec: PracticeSheetSection,
  viz: DrillVisualization,
  locale: PracticePlan["locale"],
): PracticeSheetSection {
  const coachingPoints = coachingPointsFromVisualization(viz, locale);
  return {
    ...sec,
    visualization: viz,
    coachingPoints,
    shortDescription: buildShortDescription(coachingPoints),
  };
}

/** If two blocks share identical diagram JSON, re-roll layout until distinct (bounded). */
export function ensureUniqueVisualizationsInPlan(plan: PracticePlan, sessionFingerprint: number): PracticePlan {
  const seen = new Set<string>();
  const out = { ...plan };

  SECTION_KEYS.forEach((key, i) => {
    const sec = out[key];
    let candidate = sec.visualization;
    let guard = 0;

    while (seen.has(vizSignature(candidate)) && guard < 72) {
      const salt = (mix32(sessionFingerprint + i * 374761393 + guard * 993319) >>> 0) ^ (guard * 12582917);
      let next = diversifyDrillVisualization(candidate, salt);
      if (!validateDrillVisualization(next)) {
        next = diversifyDrillVisualization(sec.visualization, salt + 40499);
      }
      candidate = next;
      guard++;
    }

    seen.add(vizSignature(candidate));
    out[key] = sectionWithVisualization(sec, candidate, plan.locale);
  });

  if (typeof process !== "undefined" && process.env.DEBUG_DRILL_VIZ_JSON === "1") {
    for (const key of SECTION_KEYS) {
      console.log(`[drill-viz-json] ${key}: "${out[key].name}"`, JSON.stringify(out[key].visualization));
    }
  }

  return out;
}
