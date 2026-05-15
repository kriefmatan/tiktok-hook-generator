import type { CoachLocale } from "@/app/lib/locale/coachLocale";
import type { DrillVisualization, DrillVizAction } from "@/app/types/drillVisualization";

function actionLine(a: DrillVizAction, locale: CoachLocale): string {
  switch (a.type) {
    case "move":
      return locale === "he"
        ? `שחקן ${a.player} מתקדם לעמדה חדשה`
        : locale === "es"
          ? `J ${a.player} se desplaza`
          : `Player ${a.player} moves`;
    case "pass":
      return locale === "he"
        ? `מסירה מ-${a.from} ל-${a.to}`
        : locale === "es"
          ? `Pase ${a.from} → ${a.to}`
          : `Pass ${a.from} → ${a.to}`;
    case "shot":
      return locale === "he" ? `זריקה של ${a.player}` : locale === "es" ? `Tiro ${a.player}` : `Shot by ${a.player}`;
    case "closeout":
      return locale === "he"
        ? `${a.player} יוצא לסגירה`
        : locale === "es"
          ? `${a.player} cierra`
          : `${a.player} closes out`;
    default:
      return "";
  }
}

/**
 * Sidelines derived only from the same JSON rendered on the court.
 */
export function coachingPointsFromVisualization(v: DrillVisualization, locale: CoachLocale): string[] {
  const o = v.players.length;
  const d = v.defense.length;
  const opener =
    locale === "he"
      ? `חצי מגרש: ${o} התקפה מול ${d} הגנה — כדור אצל ${v.ball.player}`
      : locale === "de"
        ? `Halbes Feld: ${o} zu ${d}, Ball bei ${v.ball.player}`
        : locale === "es"
          ? `Medio campo: ${o} vs ${d}, balón en ${v.ball.player}`
          : `Half court — ${o} offense vs ${d} defense — ball player ${v.ball.player}`;

  const lines = [opener];
  for (const a of v.actions) {
    const s = actionLine(a, locale);
    if (s) lines.push(s);
  }
  return lines.slice(0, 6);
}

/** Card teaser line(s) from the first coaching bullets. */
export function buildShortDescription(points: readonly string[], maxLen = 220): string {
  const parts = points.map((p) => p.trim()).filter(Boolean).slice(0, 2);
  if (parts.length === 0) return "";
  const out = parts.join(" · ");
  if (out.length <= maxLen) return out;
  return `${out.slice(0, Math.max(0, maxLen - 1))}…`;
}

