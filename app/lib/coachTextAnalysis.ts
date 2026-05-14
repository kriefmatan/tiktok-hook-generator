/**
 * Reads coach free text into coarse themes — used only to vary drills/diagrams/bullets.
 * All copy shown to the coach still comes from their own words + locale bundles.
 */

import type { CoachingFields } from "./coachingFields";

export type ParsedOffense = "pick" | "fiveOut" | "motion" | "fast" | "general";
export type ParsedDefense = "zone" | "aggressive" | "pressure" | "switch" | "man";

export type ParsedCoachThemes = {
  offense: ParsedOffense;
  defense: ParsedDefense;
  rebounding: boolean;
  turnovers: boolean;
  communication: boolean;
  transition: boolean;
  decisionMaking: boolean;
  shootingConfidence: boolean;
};

function joinFields(f: CoachingFields): string {
  return [f.sessionFocus, f.wantToImprove].join("\n").replace(/\s+/g, " ").trim();
}

function problemHay(f: CoachingFields): string {
  return joinFields(f);
}

function latinLower(s: string): string {
  return s.toLowerCase();
}

function hasTransitionDefense(all: string, low: string): boolean {
  if (all.includes("לא שומרים מעבר")) return true;
  if (all.includes("לא חוזרים במעבר")) return true;
  if (all.includes("הגנה במעבר")) return true;
  if (all.includes("הגנת מעבר")) return true;
  if (all.includes("מעברים בהגנה")) return true;
  if (all.includes("מעבר") && all.includes("הגנה") && !all.includes("התקפה במעבר")) return true;
  if (all.includes("מעבר") && all.includes("שומרים") && !all.includes("התקפה")) return true;
  if (/\b(transition\s+def|transition\s+d|get\s+back|conversion\s+def|leak\s*out|jog\s*back)\b/i.test(low))
    return true;
  return false;
}

function hasRebounding(all: string, low: string): boolean {
  if (all.includes("ריבאונד")) return true;
  if (/\b(rebound|rebounding|box\s*out|boxout|glass|boards?|o[\s-]*board|second\s*chance)\b/i.test(low))
    return true;
  return false;
}

function hasTurnoversBallSecurity(all: string, low: string): boolean {
  if (all.includes("איבודי כדור")) return true;
  if (all.includes("איבוד כדור")) return true;
  if (all.includes("איבודים")) return true;
  if (all.includes("איבוד") && all.includes("כדור")) return true;
  if (/\b(turnover|turnovers|ball\s*security|careless\s*pass|bad\s*pass|handle\s+the\s+ball|live\s*ball\s*to)\b/i.test(low))
    return true;
  return false;
}

function hasDecisionMaking(all: string, low: string): boolean {
  if (all.includes("חכמה")) return true;
  if (all.includes("החלטות")) return true;
  if (all.includes("שיקול דעת")) return true;
  if (all.includes("קריאה") && (all.includes("מתן") || all.includes("ומתן"))) return true;
  if (all.includes("קריאות")) return true;
  if (/\b(decision\s*making|read\s*and\s*react|read-and-react|basketball\s*iq|iq\s+plays|make\s+reads)\b/i.test(low))
    return true;
  return false;
}

function hasShootingConfidence(all: string, low: string): boolean {
  if (all.includes("פוחדים לזרוק")) return true;
  if (all.includes("פוחדים מלזרוק")) return true;
  if (all.includes("פוחדים") && (all.includes("זרוק") || all.includes("זריק"))) return true;
  if (all.includes("ביטחון בזריקה")) return true;
  if (all.includes("לא מעזים לזרוק")) return true;
  if (all.includes("חוסר ביטחון") && all.includes("זריק")) return true;
  if (/\b(shooting\s+confidence|afraid\s+to\s+shoot|hesitat\w*\s+to\s+shoot|scared\s+to\s+shoot|won't\s+shoot)\b/i.test(low))
    return true;
  return false;
}

function hasCommunication(all: string, low: string): boolean {
  if (all.includes("תקשורת")) return true;
  if (all.includes("שקטים")) return true;
  if (all.includes("לא מדברים")) return true;
  if (all.includes("לא קוראים")) return true;
  if (/\b(communicat|talk|quiet|silent|call\s*out|no\s+voices)\b/i.test(low)) return true;
  return false;
}

function inferOffenseStyle(all: string, low: string): ParsedOffense {
  const motionHeb =
    all.includes("התקפת תנועה") ||
    all.includes("עבודת מסכים רציפה") ||
    all.includes("משחק תנועה");

  const motionEng =
    /\b(motion\s+offense|motion\s+system|flex\s+offense|shuffle\s+cut|continuity\s+offense)\b/i.test(low) ||
    /\b(\bucla\b|\bdownscreen\b|\bflex\b)\b/i.test(low);

  if (motionHeb || motionEng) return "motion";

  if (
    /\b(pick|pnr|ball[-\s]*screen|screen[-\s]*and[-\s]*roll)\b/i.test(low) ||
    all.includes("פיק אנד רול") ||
    all.includes("מסך ורול") ||
    (all.includes("מסך") && all.includes("רול"))
  )
    return "pick";

  if (/\b(5[-\s]*out|five[-\s]*out|five\s+out|spread\s+floor)\b/i.test(low) || all.includes("חמש בחוץ") || all.includes("5 חוץ"))
    return "fiveOut";

  if (
    /\b(fast\s*break|up[-\s]*tempo\s+offense|push\s+pace|primary\s+break)\b/i.test(low) ||
    all.includes("התקפה מהירה") ||
    all.includes("קצב גבוה") ||
    (all.includes("מהיר") && all.includes("התקפה"))
  )
    return "fast";

  return "general";
}

function inferDefenseStyle(all: string, low: string): ParsedDefense {
  if (all.includes("זון") || all.includes("אזור") || /\b(2[-\s]*3|3[-\s]*2|zone\s+def|zone\s+d)\b/i.test(low)) return "zone";
  if (
    all.includes("פול קורט") ||
    all.includes("לחץ מלא") ||
    /\b(full[-\s]*court|press|trap|blitz|run\s*and\s*jump)\b/i.test(low)
  )
    return "aggressive";
  if (all.includes("החלפות") || all.includes("סוויץ") || /\bswitch(ing)?\b/i.test(low)) return "switch";
  if (all.includes("הדבקה") || all.includes("לחץ כדור") || /\b(pressure|deny|on[-\s]*ball)\b/i.test(low))
    return "pressure";
  if (/\b(aggressive|hedge|show\s*and\s*recover)\b/i.test(low) || all.includes("אגרסיבי")) return "aggressive";
  return "man";
}

export function parseCoachFields(f: CoachingFields): ParsedCoachThemes {
  const all = joinFields(f);
  const low = latinLower(all);
  const prob = problemHay(f);
  const probLow = latinLower(prob);

  const rebounding = hasRebounding(all, low) || hasRebounding(prob, probLow);
  const turnovers = hasTurnoversBallSecurity(all, low) || hasTurnoversBallSecurity(prob, probLow);
  const transition = hasTransitionDefense(all, low) || hasTransitionDefense(prob, probLow);
  const decisionMaking = hasDecisionMaking(all, low) || hasDecisionMaking(prob, probLow);
  const shootingConfidence = hasShootingConfidence(all, low) || hasShootingConfidence(prob, probLow);
  const communication = hasCommunication(all, low) || hasCommunication(prob, probLow);

  return {
    offense: inferOffenseStyle(all, low),
    defense: inferDefenseStyle(all, low),
    rebounding,
    turnovers,
    communication,
    transition,
    decisionMaking,
    shootingConfidence,
  };
}
