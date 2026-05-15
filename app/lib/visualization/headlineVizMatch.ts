import type { DrillVisualization } from "@/app/types/drillVisualization";

export type HeadlineCounts = { offense?: number; defense?: number };

/** Parse "3 על 3" or 3v3 from drill title so icon counts align with headline. */
export function parseHeadlineCounts(title: string): HeadlineCounts {
  let m = title.match(/(\d)\s*על\s*(\d)/);
  if (m) {
    return { offense: Number(m[1]), defense: Number(m[2]) };
  }
  m = title.match(/(\d)\s*v\s*(\d)/i);
  if (m) {
    return { offense: Number(m[1]), defense: Number(m[2]) };
  }
  m = title.match(/(\d)c(\d)/i);
  if (m) {
    return { offense: Number(m[1]), defense: Number(m[2]) };
  }
  if (/\b1\s*v\s*1\b/i.test(title) || /1\s*על\s*1/.test(title)) {
    return { offense: 1, defense: 1 };
  }
  if (/\b2\s*v\s*2\b/i.test(title) || /2\s*על\s*2/.test(title)) {
    return { offense: 2, defense: 2 };
  }
  return {};
}

function countDistance(want: number | undefined, actual: number): number {
  if (want == null || want <= 0) return 0;
  return Math.abs(want - actual);
}

/** Snap to the closest library layout when headline says e.g. 4v4. */
export function nearestVisualizationForHeadline(
  title: string,
  preferred: DrillVisualization,
  catalog: readonly DrillVisualization[],
): DrillVisualization {
  const { offense: wantO, defense: wantD } = parseHeadlineCounts(title);
  if (wantO == null && wantD == null) {
    return preferred;
  }

  let best = preferred;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const cand of catalog) {
    const score =
      countDistance(wantO, cand.players.length) * 2 + countDistance(wantD, cand.defense.length);
    if (score < bestScore) {
      bestScore = score;
      best = cand;
    }
  }

  return best;
}
