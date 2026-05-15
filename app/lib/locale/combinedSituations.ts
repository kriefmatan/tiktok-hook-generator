import type { CoachGoal } from "../coach/coachGoals";
import { goalKey } from "../coach/coachGoals";
import {
  buildForcedSituationTitle,
  forcedCatalogDrills,
  validateForcedDrill,
} from "../coach/forcedDrillRules";
import type { BlockKind, BulletPair } from "./coachBundle.types";
import type { CoachLocale } from "./coachLocale";

export type SituationDrillSet = Record<BlockKind, readonly string[]>;
type SidelineSet = Record<BlockKind, BulletPair>;
type LocaleCatalog = {
  drills: Record<string, SituationDrillSet>;
  sideline: Record<string, SidelineSet>;
};

const side = (
  warmup: BulletPair,
  drill1: BulletPair,
  drill2: BulletPair,
  drill3: BulletPair,
  game: BulletPair,
): SidelineSet => ({ warmup, drill1, drill2, drill3, game });

const HE_SIDELINE: Record<string, SidelineSet> = {
  "defense+shoot": side(
    ["רגליים לפני — אחר כך סיום", "חייבים זריקה, לא רק חדירה"],
    ["תקפו את הסגירה", "2 כדרורים — לא יותר"],
    ["6 שניות — איבוד לנקודה", "שומר יוצא לקליעה"],
    ["סל לפני 3 עצירות", "ידיים למעלה"],
    ["מגע בצבע — אז חייבים סל", "הגנה מדברת"],
  ),
  "defense+pressure": side(
    ["ידיים למעלה", "עצירה = ניצחון"],
    ["3 עצירות — שמרו תוצאה", "לחץ על הכדור"],
    ["סוגרים אמצע", "12 שניות מקסימום"],
    ["מלכודת בצד", "עצירה לפני זריקה"],
    ["עד 7 — עצירה מנצחת", "תקראו החלפות"],
  ),
  "defense+shoot+pressure": side(
    ["סגירה מהירה", "סיום תוך 4 שניות"],
    ["עזרה? תקפו כדור", "חייב סל ב-6"],
    ["6 שניות — איבוד לנקודה", "שומר יוצא חזק לקליעה"],
    ["סל לפני עצירה", "לחץ בלי עבירה"],
    ["8 שניות אחרי מגע בצבע", "אותו דגש"],
  ),
  "shoot+pressure": side(
    ["תפיסה מוכנה", "4 שניות לזריקה"],
    ["2 כדרורים", "תקפו סגירה"],
    ["5 שניות לסל", "אותה רגל"],
    ["סל לפני עצירה", "סגירה מהירה"],
    ["4 שניות — תזרקו", "בלי היסוס"],
  ),
  "defense+turnover": side(
    ["ידיים במסירה", "איבוד = ספרינט"],
    ["איבוד חי = כדור השני", "הגנה אגרסיבית"],
    ["מסירה רעה = עצירה", "תפיסה חזקה"],
    ["מלכודת בצד", "איבוד = נקודה"],
    ["עונש קל", "תשמרו על הכדור"],
  ),
  "shoot+decision": side(
    ["4 שניות", "אותה רגל"],
    ["6 שניות — החלטה", "מצאו פנוי"],
    ["עוד מסירה", "8 שניות לסל"],
    ["חדירה או קיק", "חייבים סל"],
    ["פתוח בשתיים? תזרקו", "4 שניות"],
  ),
  "defense+decision": side(
    ["קול על עזרה", "עצירה = נקודה"],
    ["12 שניות לעצירה", "מי נשאר"],
    ["עצירה לפני סל", "עזרה וחזרה"],
    ["בלי רולר חופשי", "עצירה או איבוד"],
    ["עצירה מנצחת", "דברו על חדירה"],
  ),
  "motion+shoot": side(
    ["חיתוך צמוד", "4 שניות לסיום"],
    ["סל בצד השני", "8 שניות"],
    ["סל ממסך", "6 שניות"],
    ["סל לפני עצירה", "חיתוך חזק"],
    ["חובת סל ממסך", "אותה תנועה"],
  ),
  "defense+transition": side(
    ["חזרה ראשונה", "עצירה = נקודה"],
    ["8 שניות", "בלי בריחות"],
    ["עצירה לפני זריקה", "השני חוזר"],
    ["הגנה מנצחת", "חייבים עצירה"],
    ["4 שניות חזרה", "עצירה = נקודה"],
  ),
};

const HE: LocaleCatalog = {
  drills: forcedCatalogDrills("he") as Record<string, SituationDrillSet>,
  sideline: HE_SIDELINE,
};

const EN: LocaleCatalog = {
  drills: forcedCatalogDrills("en") as Record<string, SituationDrillSet>,
  sideline: HE_SIDELINE,
};

const ES: LocaleCatalog = {
  drills: {
    "defense+shoot": {
      warmup: ["1c1 ala — defensor pegado, 2 botes máx, obligatorio finalizar"],
      drill1: ["1c1 ala — defensor vivo, 2 botes máx, tiro obligatorio"],
      drill2: ["3c3 medio — defensa presiona, canasta obligatoria en 6 seg"],
      drill3: ["4c4 vivo — cierre, canasta antes de 3 paradas"],
      game: ["5c5 — contestar tiro, canasta tras toque en pintura"],
    },
    "defense+shoot+pressure": {
      warmup: ["1c1 ala — cierre, final obligatorio en 4 seg"],
      drill1: ["2c1 — ayuda, canasta obligatoria en 6 seg"],
      drill2: ["3c3 medio — presión, canasta en 6 seg, pérdida = punto D"],
      drill3: ["4c4 — cierre rápido, canasta antes de parada"],
      game: ["5c5 presión plena — toque pintura, canasta en 8 seg"],
    },
    "defense+pressure": {
      warmup: ["1c1 — defensa viva, 3 botes máx, parada = gana"],
      drill1: ["3c3 campo — defensa viva, 3 paradas o punto D"],
      drill2: ["4c4 — presión balón, sin medio, parada en 12 seg"],
      drill3: ["4c4 vivo — trampa banda, parada antes del tiro"],
      game: ["5c5 presión a 7 — parada = punto D"],
    },
    "shoot+pressure": {
      warmup: ["Cierre vivo — tiro obligatorio en 4 seg"],
      drill1: ["1c1 — cierre, 2 botes, tiro obligatorio"],
      drill2: ["3c3 — cada cierre, canasta en 5 seg"],
      drill3: ["4c4 — cierre rápido, canasta antes de parada"],
      game: ["5c5 — abierto? Tiro obligatorio en 4 seg"],
    },
    "defense+turnover": {
      warmup: ["2c2 — negar pase, pérdida viva = sprint"],
      drill1: ["3c3 — defensa agresiva, pérdida viva = otro balón"],
      drill2: ["4c4 — recepción fuerte, mal pase = parada D"],
      drill3: ["4c4 vivo — trampa banda, pérdida = punto D"],
      game: ["5c5 — pérdida viva = castigo + otro balón"],
    },
    "shoot+decision": {
      warmup: ["3 puntos — cierre suave, tiro en 4 seg"],
      drill1: ["3c2 — canasta o pase en 6 seg"],
      drill2: ["4c3 — un pase más, canasta en 8 seg"],
      drill3: ["4c4 — drive o kick, canasta obligatoria"],
      game: ["5c5 — abierto en dos? Tiro en 4 seg"],
    },
    "defense+decision": {
      warmup: ["2c2 ayuda — recuperar, parada = punto"],
      drill1: ["3c3 vivo — parada obligatoria en 12 seg"],
      drill2: ["4c3 — decisión ayuda, parada antes de canasta"],
      drill3: ["4c4 — sin roladores libres, parada o pérdida = punto"],
      game: ["5c5 — hablar cada drive, parada gana"],
    },
    "motion+shoot": {
      warmup: ["Flex — corte, final en 4 seg"],
      drill1: ["3c3 — bloqueo vivo, canasta segundo lado en 8 seg"],
      drill2: ["4c4 movimiento — canasta tras bloqueo en 6 seg"],
      drill3: ["4c4 vivo — corte y final, canasta antes de parada"],
      game: ["5c5 — misma acción, canasta tras bloqueo"],
    },
    "defense+transition": {
      warmup: ["2c2 — vuelta y cierre, parada = punto"],
      drill1: ["4c4 transición — vuelta, parada o canasta en 8 seg"],
      drill2: ["4c4 — parada antes del tiro, segundo defensor"],
      drill3: ["5c4 break — defensa gana o parada"],
      game: ["5c5 — vuelta en 4 seg, parada = punto D"],
    },
  },
  sideline: HE_SIDELINE,
};

const BY_LOCALE: Record<CoachLocale, LocaleCatalog> = {
  he: HE,
  en: EN,
  es: ES,
  de: EN,
};

function catalog(locale: CoachLocale): LocaleCatalog {
  return BY_LOCALE[locale] ?? EN;
}

export function composeSituationTitle(
  goals: readonly CoachGoal[],
  blockKind: BlockKind,
  locale: CoachLocale,
): string {
  return buildForcedSituationTitle(goals, blockKind, locale);
}

export function pickCombinedDrillTitle(
  goals: readonly CoachGoal[],
  blockKind: BlockKind,
  locale: CoachLocale,
  seed: number,
  salt: number,
): string {
  const key = goalKey(goals);
  const set = catalog(locale).drills[key];
  if (set?.[blockKind]?.length) {
    const arr = set[blockKind]!;
    const title = arr[(seed + salt) % arr.length]!;
    if (validateForcedDrill(title, goals)) return title;
  }
  return buildForcedSituationTitle(goals, blockKind, locale);
}

export function pickCombinedSideline(
  goals: readonly CoachGoal[],
  blockKind: BlockKind,
  locale: CoachLocale,
): BulletPair | undefined {
  const key = goalKey(goals);
  return catalog(locale).sideline[key]?.[blockKind];
}

/** For smoke tests — all catalog titles must pass forced validation. */
export function allCatalogDrillKeys(locale: CoachLocale = "he"): string[] {
  return Object.keys(catalog(locale).drills);
}

export function catalogDrillTitle(
  locale: CoachLocale,
  goalComboKey: string,
  blockKind: BlockKind,
): string | undefined {
  return catalog(locale).drills[goalComboKey]?.[blockKind]?.[0];
}
