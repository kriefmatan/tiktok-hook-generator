import type { CoachingFields } from "../coachingFields";
import type { CoachLocale } from "./coachLocale";

export function coachInputText(fields: CoachingFields): string {
  return [fields.sessionFocus, fields.wantToImprove].join("\n").trim();
}

function hebrewLetterRatio(text: string): number {
  const compact = text.replace(/\s/g, "");
  if (!compact.length) return 0;
  let he = 0;
  for (const ch of compact) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp >= 0x0590 && cp <= 0x05ff) he++;
  }
  return he / compact.length;
}

/** Lightweight Spanish signal — avoids franc (breaks under Next/Turbopack bundling). */
function looksSpanish(text: string): boolean {
  if (/[ñ¿¡]/i.test(text)) return true;
  const low = text.toLowerCase();
  const hits = [
    /\b(qué|que|para|con|del|los|las|equipo|entreno|mejorar|defensa|ataque|canasta|partido|jugadores)\b/,
    /\b(cómo|como|muy|más|mas|también|tambien|está|esta|son|hay)\b/,
  ].filter((re) => re.test(low)).length;
  return hits >= 2;
}

/**
 * Single locale for the whole app output — Hebrew script + simple Spanish heuristics.
 */
export function detectCoachLocale(fields: CoachingFields): CoachLocale {
  const t = coachInputText(fields);
  if (t.length < 6) return "en";

  if (hebrewLetterRatio(t) >= 0.18) return "he";
  if (looksSpanish(t)) return "es";

  return "en";
}
