import { franc } from "franc";
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

/**
 * Single locale for the whole app output — from coach free text (franc + Hebrew script guard).
 */
export function detectCoachLocale(fields: CoachingFields): CoachLocale {
  const t = coachInputText(fields);
  if (t.length < 6) return "en";

  if (hebrewLetterRatio(t) >= 0.18) return "he";

  const iso3 = franc(t, { minLength: 4 });
  if (iso3 === "heb") return "he";
  if (iso3 === "spa" || iso3 === "cat" || iso3 === "glg" || iso3 === "eus" || iso3 === "oci") return "es";

  return "en";
}
