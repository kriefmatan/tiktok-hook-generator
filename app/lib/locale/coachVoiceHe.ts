/**
 * Hebrew sideline voice — terms coaches in Israel actually use.
 * Reference for bundles and copy reviews (basketball-coaching-intelligence).
 */

import type { BlockKind, BulletPair } from "./coachBundle.types";

/** Literal translations to avoid in user-facing drill copy */
export const HE_VOICE_AVOID = [
  "מסך אחורי",
  "מסכים רציפים",
  "תנועה בלי כדור — עכשיו",
  "קצב משחקי — ציון או משימה",
  "הדגמה אחת, ואז זוגות",
] as const;

/** Preferred sideline phrasing */
export const HE_VOICE_PREFER = {
  backScreen: "מסך אחורה",
  downScreen: "מסך דאון",
  flex: "פלכס",
  weave: "וויב מסכים",
  fourOut: "4 החוצה",
  slip: "סליפ",
  pop: "פופ / עליה לקשת",
  cut: "חיתוך",
  fill: "מילוי",
  screen: "מסך",
} as const;

/** Per-block sideline lines for off-ball motion sessions */
export const HE_MOTION_SIDELINE_BY_BLOCK: Record<BlockKind, BulletPair> = {
  warmup: ["מפרקים, מגע בכדור, בלי תורים", "מסך קל — רק לפתוח את הגוף"],
  drill1: ["תזוזו בלי הכדור", "מסך בגוף — חיתוך צמוד אחריו"],
  drill2: ["קצב משחק — שמרו תוצאה", "אל תעמדו ליד הכדור — תזוזו"],
  drill3: ["הגנה חיה — עצירה קצרה אחרי כל סל", "טעות = עונש קל, ממשיכים"],
  game: ["5 על 5 — אותו דגש מהיום", "תקראו מסך, חיתוך, מילוי"],
};

/** Per-block sideline lines for press-break (offense vs trap) sessions */
export const HE_PRESS_BREAK_SIDELINE_BY_BLOCK: Record<BlockKind, BulletPair> = {
  warmup: ["מסירה מעל ידיים — בלי דריבל מוקדם", "פינה פנויה = יציאה מהלחץ"],
  drill1: ["תשברו את הלחץ — מסירה לפני דריבל", "מלכודת בצד — אמצע או ריבאונד"],
  drill2: ["קצב משחק — שמרו תוצאה", "מי שובר לחץ — נקודה"],
  drill3: ["לחץ חי — מצאו את האמצע", "טעות במסירה = כדור השני"],
  game: ["5 על 5 מול לחץ — אותו דגש", "שחקן בטיחות מאחורי הלחץ"],
};
