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
  transitionOffense: boolean;
  decisionMaking: boolean;
  shootingConfidence: boolean;
  spacing: boolean;
  /** Offense vs trap / full-court press — not defensive pressure drills */
  pressBreaking: boolean;
};

function joinFields(f: CoachingFields): string {
  return f.workingOn.replace(/\s+/g, " ").trim();
}

function problemHay(f: CoachingFields): string {
  return joinFields(f);
}

function latinLower(s: string): string {
  return s.toLowerCase();
}

function hasTransitionOffense(all: string, low: string): boolean {
  if (hasTransitionDefense(all, low)) return false;
  if (all.includes("התקפה במעבר")) return true;
  if (all.includes("מעבר התקפה")) return true;
  if (all.includes("מהירות במעבר")) return true;
  if (all.includes("קצב במעבר")) return true;
  if (/\b(transition\s+off|primary\s+break|secondary\s+break|push\s+in\s+transition|fill\s+lanes|fast\s+break\s+off)\b/i.test(low))
    return true;
  if (all.includes("מעבר") && all.includes("התקפה") && !all.includes("הגנה")) return true;
  return false;
}

/** Off-ball movement, cuts, screens — not the same as floor spacing. */
function hasBallMovement(all: string, low: string): boolean {
  if (all.includes("תנועה בלי כדור")) return true;
  if (all.includes("תנועה ללא כדור")) return true;
  if (all.includes("תנועה בלי")) return true;
  if (all.includes("בלי כדור") && /תנועה|מסירות|חיתוכ/.test(all)) return true;
  if (all.includes("מסירות") && all.includes("תנועה")) return true;
  if (all.includes("מסירות וחיתוכ")) return true;
  if (all.includes("מסירות ותנועה")) return true;
  if (/\b(ball\s+movement|off[-\s]*ball|move\s+without(\s+the)?\s+ball|passing\s+and\s+movement|pass\s+and\s+cut)\b/i.test(low))
    return true;
  return false;
}

function hasSpacing(all: string, low: string): boolean {
  if (hasBallMovement(all, low)) return false;
  if (all.includes("מרווחים")) return true;
  if (all.includes("צפיפות")) return true;
  if (all.includes("עומס בצבע")) return true;
  if (all.includes("צפוף בצבע")) return true;
  if (/\b(spacing|floor\s+spac|crowd\w*\s+the\s+paint|paint\s+crowd)\b/i.test(low)) return true;
  if (/\b(stand\s+still|static\s+offense)\b/i.test(low) && !/\b(move|motion|cut|screen)\b/i.test(low))
    return true;
  return false;
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
  if (hasBallMovement(all, low)) return "motion";

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

/** Breaking press / trap — offensive, not defensive pressure theme */
export function hasPressBreak(all: string, low: string): boolean {
  if (all.includes("שבירת לחץ")) return true;
  if (all.includes("לשבור לחץ")) return true;
  if (all.includes("שוברים לחץ")) return true;
  if (all.includes("מתגברים על לחץ")) return true;
  if (/\b(press\s*break|breaking\s+press|break\s+the\s+press|romper\s+presi[oó]n|pressbreak)\b/i.test(low))
    return true;
  if (all.includes("לחץ") && (all.includes("שביר") || all.includes("שובר"))) return true;
  return false;
}

function inferDefenseStyle(all: string, low: string): ParsedDefense {
  if (hasPressBreak(all, low)) return "man";
  if (all.includes("זון") || all.includes("אזור") || /\b(2[-\s]*3|3[-\s]*2|zone\s+def|zone\s+d)\b/i.test(low)) return "zone";
  if (
    all.includes("פול קורט") ||
    all.includes("לחץ מלא") ||
    /\b(full[-\s]*court|(?<!press\s)trap|blitz|run\s*and\s*jump)\b/i.test(low) ||
    (/\bpress\b/i.test(low) && !/\bpress\s*break/i.test(low))
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
  const transitionDefense =
    hasTransitionDefense(all, low) || hasTransitionDefense(prob, probLow);
  const transitionOffense =
    hasTransitionOffense(all, low) || hasTransitionOffense(prob, probLow);
  const transition = transitionDefense || transitionOffense;
  const decisionMaking = hasDecisionMaking(all, low) || hasDecisionMaking(prob, probLow);
  const shootingConfidence = hasShootingConfidence(all, low) || hasShootingConfidence(prob, probLow);
  const communication = hasCommunication(all, low) || hasCommunication(prob, probLow);
  const spacing = hasSpacing(all, low) || hasSpacing(prob, probLow);
  const pressBreaking = hasPressBreak(all, low) || hasPressBreak(prob, probLow);

  return {
    offense: inferOffenseStyle(all, low),
    defense: inferDefenseStyle(all, low),
    rebounding,
    turnovers,
    communication,
    transition,
    transitionOffense,
    decisionMaking,
    shootingConfidence,
    spacing,
    pressBreaking,
  };
}
