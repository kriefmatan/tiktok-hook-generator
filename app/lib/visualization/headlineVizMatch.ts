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
  tieSalt: number = 0,
): DrillVisualization {
  const { offense: wantO, defense: wantD } = parseHeadlineCounts(title);
  if (wantO == null && wantD == null) {
    return preferred;
  }

  let bestScore = Number.POSITIVE_INFINITY;
  const candidates: DrillVisualization[] = [];

  for (const cand of catalog) {
    const score =
      countDistance(wantO, cand.players.length) * 2 + countDistance(wantD, cand.defense.length);
    if (score < bestScore) {
      bestScore = score;
      candidates.length = 0;
      candidates.push(cand);
    } else if (score === bestScore) {
      candidates.push(cand);
    }
  }

  if (candidates.length === 0) return preferred;

  const preferIdx = candidates.findIndex((c) => c === preferred);
  const pick = (tieSalt + (preferIdx >= 0 ? preferIdx : 0)) % candidates.length;
  return candidates[pick]!;
}
