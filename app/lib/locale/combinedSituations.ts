import type { CoachGoal } from "../coach/coachGoals";
import { goalKey } from "../coach/coachGoals";
import type { BlockKind, BulletPair } from "./coachBundle.types";
import type { CoachLocale } from "./coachLocale";

export type SituationDrillSet = Record<BlockKind, readonly string[]>;
type SidelineSet = Record<BlockKind, BulletPair>;
type LocaleCatalog = {
  drills: Record<string, SituationDrillSet>;
  sideline: Record<string, SidelineSet>;
};

const block = (
  warmup: readonly string[],
  drill1: readonly string[],
  drill2: readonly string[],
  drill3: readonly string[],
  game: readonly string[],
): SituationDrillSet => ({ warmup, drill1, drill2, drill3, game });

const side = (
  warmup: BulletPair,
  drill1: BulletPair,
  drill2: BulletPair,
  drill3: BulletPair,
  game: BulletPair,
): SidelineSet => ({ warmup, drill1, drill2, drill3, game });

const HE: LocaleCatalog = {
  drills: {
    "defense+shoot": block(
      ["זוגות — 1 על 1 מהכנף, סגירה וסיום"],
      ["2 על 2 — שומר פעיל, חייב זריקה או חדירה"],
      ["3 על 3 חצי — הגנה לוחצת, חייבים סל תוך 6 שניות"],
      ["4 על 4 — סגירה חיה, בלי לעמוד בצבע"],
      ["5 על 5 — הגנה + חובת סל אחרי חדירה"],
    ),
    "defense+pressure": block(
      ["1 על 1 — שלוש דריבלים מול הגנה"],
      ["3 על 3 מגרש מלא — שלוש עצירות"],
      ["4 על 4 — לחץ על הכדור, סוגרים אמצע"],
      ["4 על 4 חי — מלכודת בצד, ספרינט על זריקה"],
      ["5 על 5 — לחץ עד 7, עצירה = ניצחון"],
    ),
    "defense+shoot+pressure": block(
      ["זוגות — סגירה מהכנף, סיום תוך 4 שניות"],
      ["2 על 1 — שומר + עזרה, חייב סל"],
      ["3 על 3 חצי — לחץ, 6 שניות, איבוד = נקודה להגנה"],
      ["4 על 4 — סגירה מהירה, חייבים סל לפני עצירה"],
      ["5 על 5 — לחץ מלא, חובת סל אחרי מגע בצבע"],
    ),
    "shoot+pressure": block(
      ["סגירות — תפיסה וזריקה תוך 4 שניות"],
      ["3 נקודות — סגירה חיה, שתי זריקות"],
      ["3 על 3 — סגירה מהירה, חייבים סל"],
      ["4 על 4 — כל סגירה = זריקה תוך 3 שניות"],
      ["5 על 5 — פתוח? תזרקו תוך 4 שניות"],
    ),
    "defense+turnover": block(
      ["מסירות בזוג — ראש למעלה מול ידיים"],
      ["3 על 3 — הגנה אגרסיבית, איבוד = ספרינט"],
      ["4 על 4 — תפיסה חזקה, מסירה רעה = כדור השני"],
      ["4 על 4 חי — מלכודת בצד, אין מסירה לאמצע"],
      ["5 על 5 — איבוד חי = עונש קל + כדור השני"],
    ),
    "shoot+decision": block(
      ["3 נקודות — אותה רגל, מגבלת זמן"],
      ["3 על 2 — מצאו את הזריקה הפתוחה"],
      ["4 על 3 — עוד מסירה לפני זריקה"],
      ["4 על 4 — החלטה: חדירה או קיק"],
      ["5 על 5 — פתוח בשתיים? תזרקו"],
    ),
    "defense+decision": block(
      ["2 על 2 — עזרה וחזרה"],
      ["3 על 3 — קראו מי נכנס לעזרה"],
      ["4 על 3 — החלטה בהגנה: מי נשאר"],
      ["4 על 4 — בלי רולר חופשי"],
      ["5 על 5 — דברו על כל חדירה"],
    ),
    "motion+shoot": block(
      ["פלכס — חיתוך וסיום"],
      ["3 על 3 — מסך וסל בצד השני"],
      ["4 על 4 — תנועה בלי כדור, חייבים סל ממסך"],
      ["4 על 4 חי — חיתוך וסיום תחת לחץ"],
      ["5 על 5 — אותה תנועה, חובת סל ממסך"],
    ),
    "defense+transition": block(
      ["3 קווים — חזרה וסגירה"],
      ["4 על 4 מעבר — הגנה חוזרת, עצירה"],
      ["4 על 4 — לא זורקים לפני שהשני חזר"],
      ["5 על 4 מעבר — הגנה מנצחת או סל"],
      ["5 על 5 — חזרה או כדור השני"],
    ),
  },
  sideline: {
    "defense+shoot": side(
      ["סגירה תחת שליטה — אחר כך סיום", "אל תעמדו ותצפו"],
      ["תקפו את הסגירה", "חייבים סל — לא רק חדירה"],
      ["6 שניות — שמרו תוצאה", "איבוד = נקודה להגנה"],
      ["ידיים למעלה, בלי עבירה", "סיום עם מגע"],
      ["אותו דגש מהיום", "הגנה מדברת, התקפה מסיימת"],
    ),
    "defense+pressure": side(
      ["ידיים למעלה", "לחץ על הכדור"],
      ["שמרו תוצאה", "עצירה = ניצחון"],
      ["סוגרים אמצע", "מלכודת רק בצד"],
      ["ספרינט על כל זריקה", "בלי חורים"],
      ["לחץ על כל כדור", "תקראו החלפות"],
    ),
    "defense+shoot+pressure": side(
      ["סגירה מהירה — רגליים לפני", "סיום תוך 4 שניות"],
      ["עזרה? תקפו את הכדור", "חייב סל"],
      ["6 שניות — איבוד לנקודה", "הגנה מדברת"],
      ["לחץ בלי עבירה", "סל לפני עצירה"],
      ["אותו דגש", "לחץ + סיום"],
    ),
    "shoot+pressure": side(
      ["תפיסה מוכנה", "4 שניות לזריקה"],
      ["סגירה חיה", "אותה רגל"],
      ["תקפו את הסגירה", "פתוח? תזרקו"],
      ["קצב משחק", "שמרו תוצאה"],
      ["בלי לחשוב פעמיים", "תזרקו את הפתוח"],
    ),
    "defense+turnover": side(
      ["תפיסה חזקה", "ראש למעלה"],
      ["איבוד = ספרינט", "ידיים בכדור"],
      ["מסירה רעה — לא מריצים", "הגנה אגרסיבית"],
      ["מלכודת בצד", "בלי כדור לאמצע"],
      ["תשמרו על הכדור", "הגנה מנצחת"],
    ),
    "shoot+decision": side(
      ["אותה רגל", "מגבלת זמן"],
      ["מצאו את הפנוי", "עוד מסירה אם צריך"],
      ["אל תמהרו", "פתוח בשתיים? תזרקו"],
      ["חדירה או קיק", "תקראו את העזרה"],
      ["תחליטו מהר", "תזרקו את הפתוח"],
    ),
    "defense+decision": side(
      ["קול על העזרה", "מי נשאר"],
      ["תקראו לפני", "בלי רולר חופשי"],
      ["עזרה וחזרה", "תחליטו נכון"],
      ["דברו על כל חדירה", "שמרו תוצאה"],
      ["אותו דגש", "הגנה חכמה"],
    ),
    "motion+shoot": side(
      ["חיתוך צמוד", "ידיים מוכנות"],
      ["תזוזו בלי כדור", "סל ממסך"],
      ["מסך בגוף", "סיום חזק"],
      ["אל תעמדו", "תנועה ואז סל"],
      ["אותה תנועה", "חובת סיום"],
    ),
    "defense+transition": side(
      ["חזרה ראשונה", "תקראו איש"],
      ["עצירה או סל", "בלי בריחות"],
      ["השני חוזר — אז זורקים", "הגנה מדברת"],
      ["הגנה מנצחת", "קצב משחק"],
      ["תחזרו ותרוצו", "אותו דגש"],
    ),
  },
};

const EN: LocaleCatalog = {
  drills: {
    "defense+shoot": block(
      ["Pairs — 1v1 wing closeout, must finish"],
      ["2v2 — live D, score on drive or shot"],
      ["3v3 half — pressure D, score in 6 sec"],
      ["4v4 — live closeouts, no paint stand"],
      ["5v5 — D + score after paint touch"],
    ),
    "defense+pressure": block(
      ["1v1 — 3 dribbles vs pressure"],
      ["3v3 full — make 3 stops"],
      ["4v4 — ball pressure, no middle"],
      ["4v4 live — sideline trap, sprint on shot"],
      ["5v5 press to 7 — stop wins"],
    ),
    "defense+shoot+pressure": block(
      ["Pairs — closeout, finish in 4 sec"],
      ["2v1 — help D, must score"],
      ["3v3 half — pressure, 6 sec, TO = D point"],
      ["4v4 — fast closeout, score before stop"],
      ["5v5 full press — paint touch then score"],
    ),
    "shoot+pressure": block(
      ["Closeout catch-shoot — 4 sec clock"],
      ["3 spots — live closeout, 2 makes"],
      ["3v3 — closeout, must score"],
      ["4v4 — every closeout = shot in 3 sec"],
      ["5v5 — open? Shoot in 4 sec"],
    ),
    "defense+turnover": block(
      ["Partner passes — hands up vs deflection"],
      ["3v3 — aggressive D, live TO = sprint"],
      ["4v4 — strong catch, bad pass = other ball"],
      ["4v4 live — trap sideline, no middle pass"],
      ["5v5 — live TO = light penalty + other ball"],
    ),
    "shoot+decision": block(
      ["3 spots — same foot, shot clock"],
      ["3v2 — find the open shooter"],
      ["4v3 — one more pass before shot"],
      ["4v4 — drive or kick read"],
      ["5v5 — open in two? Shoot it"],
    ),
    "defense+decision": block(
      ["2v2 — help and recover"],
      ["3v3 — call who helps"],
      ["4v3 — who stays? decide"],
      ["4v4 — no free rollers"],
      ["5v5 — talk every drive"],
    ),
    "motion+shoot": block(
      ["Flex — cut and finish"],
      ["3v3 — screen, score second side"],
      ["4v4 — motion, score off screen"],
      ["4v4 live — cut finish under pressure"],
      ["5v5 — same motion, score off screen"],
    ),
    "defense+transition": block(
      ["3 lanes — get back and closeout"],
      ["4v4 transition — get back, stop"],
      ["4v4 — no shot until 2nd defender set"],
      ["5v4 break — D wins or score"],
      ["5v5 — get back or other ball"],
    ),
  },
  sideline: HE.sideline,
};

const ES: LocaleCatalog = {
  drills: {
    "defense+shoot": block(
      ["Parejas — 1c1 ala con cierre, obligatorio finalizar"],
      ["2c2 — defensa viva, canasta en drive o tiro"],
      ["3c3 medio — defensa presiona, canasta en 6 seg"],
      ["4c4 — cierres vivos, no pararse en pintura"],
      ["5c5 — defensa + canasta tras pintura"],
    ),
    "defense+pressure": block(
      ["1c1 — 3 botes vs presión"],
      ["3c3 campo — 3 paradas"],
      ["4c4 — presión al balón, sin medio"],
      ["4c4 vivo — trampa banda, sprint al tiro"],
      ["5c5 presión a 7"],
    ),
    "defense+shoot+pressure": block(
      ["Parejas — cierre, final en 4 seg"],
      ["2c1 — ayuda, obligatorio anotar"],
      ["3c3 medio — presión, 6 seg, pérdida = punto D"],
      ["4c4 — cierre rápido, canasta antes de parada"],
      ["5c5 presión plena — toque pintura y canasta"],
    ),
    "shoot+pressure": block(
      ["Cierre recepción-tiro — 4 seg"],
      ["3 puntos — cierre vivo"],
      ["3c3 — cierre, obligatorio anotar"],
      ["4c4 — cada cierre = tiro en 3 seg"],
      ["5c5 — abierto? Tiro en 4 seg"],
    ),
    "defense+turnover": block(
      ["Pases en pareja — manos arriba"],
      ["3c3 — defensa agresiva, pérdida = sprint"],
      ["4c4 — recepción fuerte"],
      ["4c4 vivo — trampa banda"],
      ["5c5 — pérdida viva = balón rival"],
    ),
    "shoot+decision": block(
      ["3 puntos — mismo pie, reloj"],
      ["3c2 — encuentra al tirador libre"],
      ["4c3 — un pase más"],
      ["4c4 — drive o kick"],
      ["5c5 — abierto en dos? Tira"],
    ),
    "defense+decision": block(
      ["2c2 — ayuda y recuperación"],
      ["3c3 — grita la ayuda"],
      ["4c3 — quién se queda"],
      ["4c4 — sin roladores libres"],
      ["5c5 — habla en cada drive"],
    ),
    "motion+shoot": block(
      ["Flex — corte y final"],
      ["3c3 — bloqueo y canasta"],
      ["4c4 — movimiento y canasta"],
      ["4c4 vivo — corte y final"],
      ["5c5 — mismo movimiento"],
    ),
    "defense+transition": block(
      ["3 carriles — vuelta y cierre"],
      ["4c4 transición — parada"],
      ["4c4 — sin tiro hasta segundo defensor"],
      ["5c4 break"],
      ["5c5 — vuelta o balón rival"],
    ),
  },
  sideline: HE.sideline,
};

const BY_LOCALE: Record<CoachLocale, LocaleCatalog> = {
  he: HE,
  en: EN,
  es: ES,
  de: EN,
};

const FRAGMENT_HE: Record<CoachGoal, Record<BlockKind, string>> = {
  shoot: {
    warmup: "זריקות עם סגירה קלה",
    drill1: "1 על 1 — חייב סיום",
    drill2: "3 על 3 — חייבים סל",
    drill3: "4 על 4 — סיום תחת לחץ",
    game: "5 על 5 — חובת סל",
  },
  defense: {
    warmup: "סגירות ומגע",
    drill1: "2 על 2 — הגנה חיה",
    drill2: "3 על 3 — עצירות",
    drill3: "4 על 4 — לחץ על הכדור",
    game: "5 על 5 — הגנה מנצחת",
  },
  pressure: {
    warmup: "לחץ על הכדור",
    drill1: "מלכודת בצד",
    drill2: "4 על 4 — לחץ חי",
    drill3: "עצירות קצרות",
    game: "5 על 5 — לחץ מלא",
  },
  turnover: {
    warmup: "מסירות חזקות",
    drill1: "3 על 3 — אין איבודים",
    drill2: "4 על 4 — תפיסה חזקה",
    drill3: "מלכודת ובריחה",
    game: "5 על 5 — תשמרו על הכדור",
  },
  decision: {
    warmup: "חדירה או קיק",
    drill1: "3 על 2 — החלטה",
    drill2: "4 על 3 — מצאו פנוי",
    drill3: "4 על 4 — עוד מסירה",
    game: "5 על 5 — תחליטו מהר",
  },
  transition: {
    warmup: "חזרה וסגירה",
    drill1: "3 על 2 מעבר",
    drill2: "4 על 4 — חזרה",
    drill3: "מעבר חי",
    game: "5 על 5 — תחזרו",
  },
  motion: {
    warmup: "חיתוך ומסך",
    drill1: "3 על 3 תנועה",
    drill2: "4 על 4 — אל תעמדו",
    drill3: "מסך חי",
    game: "5 על 5 — תנועה",
  },
  rebound: {
    warmup: "ריבאונד בזוגות",
    drill1: "2 על 2 על הזריקה",
    drill2: "3 על 3 בצבע",
    drill3: "4 על 4 — קריסה",
    game: "5 על 5 — ריבאונד",
  },
  spacing: {
    warmup: "תפרשו",
    drill1: "4 החוצה",
    drill2: "3 על 3 — מרווחים",
    drill3: "4 על 4 — לא בצבע",
    game: "5 על 5 — תפרשו",
  },
  pressBreak: {
    warmup: "מסירה מול לחץ",
    drill1: "2 על 1 מול מלכודת",
    drill2: "4 על 4 מול לחץ",
    drill3: "כניסה מאחורי לחץ",
    game: "5 על 5 מול לחץ",
  },
  fast: {
    warmup: "מעבר בקווים",
    drill1: "3 על 2",
    drill2: "4 על 4 — 8 שניות",
    drill3: "מעבר חי",
    game: "5 על 5 — תרוצו",
  },
};

function catalog(locale: CoachLocale): LocaleCatalog {
  return BY_LOCALE[locale] ?? EN;
}

export function composeSituationTitle(
  goals: readonly CoachGoal[],
  blockKind: BlockKind,
  locale: CoachLocale,
): string {
  const parts = goals.map((g) => FRAGMENT_HE[g]?.[blockKind] ?? g);
  if (locale === "he") return parts.join(" + ");
  return parts.join(" — ");
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
    return arr[(seed + salt) % arr.length]!;
  }
  return composeSituationTitle(goals, blockKind, locale);
}

export function pickCombinedSideline(
  goals: readonly CoachGoal[],
  blockKind: BlockKind,
  locale: CoachLocale,
): BulletPair | undefined {
  const key = goalKey(goals);
  return catalog(locale).sideline[key]?.[blockKind];
}
