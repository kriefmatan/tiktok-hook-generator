import type { DrillVisualization, DrillVizAction } from "@/app/types/drillVisualization";

function offenseIds(v: DrillVisualization): Set<number> {
  return new Set(v.players.map((p) => p.id));
}

function defenseIds(v: DrillVisualization): Set<string> {
  return new Set(v.defense.map((d) => String(d.id)));
}

/** JSON consistency check before rendering. */
export function validateDrillVisualization(v: DrillVisualization): boolean {
  if (!v.players?.length) return false;
  if (!v.defense?.length) return false;
  if (v.ball?.player == null) return false;

  const o = offenseIds(v);
  const d = defenseIds(v);
  if (!o.has(v.ball.player)) return false;

  for (const p of v.players) {
    if (p.x < 0 || p.x > 100 || p.y < 0 || p.y > 100) return false;
  }
  for (const def of v.defense) {
    if (def.x < 0 || def.x > 100 || def.y < 0 || def.y > 100) return false;
  }

  const checkAction = (a: DrillVizAction): boolean => {
    switch (a.type) {
      case "move":
        return o.has(a.player) && a.to.x >= 0 && a.to.x <= 100 && a.to.y >= 0 && a.to.y <= 100;
      case "pass":
        return o.has(a.from) && o.has(a.to);
      case "shot":
        return o.has(a.player);
      case "closeout":
        return d.has(String(a.player));
      default:
        return false;
    }
  };

  for (const a of v.actions) {
    if (!checkAction(a)) return false;
  }

  return true;
}
