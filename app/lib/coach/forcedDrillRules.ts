import type { CoachGoal } from "./coachGoals";
import { goalKey } from "./coachGoals";
import type { BlockKind } from "../locale/coachBundle.types";
import type { CoachLocale } from "../locale/coachLocale";

const FORCED_ACTION =
  /חייב|חובה|חובת|must\s+score|must\s+finish|must\s+shoot|obligatorio|עצירה|עצירות|איבוד|pérdida|TO\s*=|make\s+\d+\s+stop|stop\s+wins|anotar|finalizar|סיום|סל|זריק|canasta|tiro|finish|score|החלטה.*חדיר|drive\s+or\s+kick|score\s+in|score\s+before|find\s+the\s+open|parada|paradas/i;

const CONSTRAINT =
  /שניות|\d+\s*sec|\d+\s*seg|כדרור|dribble|bote|על\s+[2345]|v[2345]|\d+\s*על\s*[2345]|[2345]v[2345]|עד\s*\d+|to\s+\d+|תוך\s*\d+|in\s+\d+\s*sec|shot\s+clock|reloj|נקודה|point|יתרון|advantage/i;

const DEFENDER =
  /שומר|הגנה|סגיר|לחץ|מלכוד|על\s*1|על\s*2|על\s*3|על\s*4|על\s*5|1\s*על\s*1|2\s*על\s*2|3\s*על\s*3|4\s*על\s*4|5\s*על\s*5|closeout|defensa|presión|press|trap|live\s+D|paradas|stops|help\s+D/i;

function needsDefender(goals: readonly CoachGoal[]): boolean {
  return goals.includes("defense") || goals.includes("pressure");
}

export function validateForcedDrill(title: string, goals: readonly CoachGoal[]): boolean {
  if (!FORCED_ACTION.test(title)) return false;
  if (!CONSTRAINT.test(title)) return false;
  if (needsDefender(goals) && !DEFENDER.test(title)) return false;
  return true;
}

export type ForcedTemplateSet = Record<BlockKind, string>;

type TemplateSet = ForcedTemplateSet;

export const FORCED_DRILLS_HE: Record<string, TemplateSet> = {
  "defense+shoot": {
    warmup: "1 על 1 מהכנף — שומר צמוד, 2 כדרורים מקסימום, חייב סיום",
    drill1: "1 על 1 מהכנף — שומר צמוד, 2 כדרורים מקסימום, חייב זריקה בסוף",
    drill2: "3 על 3 חצי — הגנה לוחצת, חייבים סל תוך 6 שניות",
    drill3: "4 על 4 — סגירה חיה, חייבים סל לפני 3 עצירות",
    game: "5 על 5 — שומר יוצא לקליעה, חובת סל אחרי מגע בצבע",
  },
  "defense+shoot+pressure": {
    warmup: "1 על 1 כנף — שומר צמוד, חייב סיום תוך 4 שניות",
    drill1: "2 על 1 — שומר ועזרה, חייב סל תוך 6 שניות",
    drill2: "3 על 3 חצי — הגנה לוחצת, חייבים סל תוך 6 שניות, איבוד = נקודה להגנה",
    drill3: "4 על 4 — סגירה מהירה, חייבים סל לפני עצירה",
    game: "5 על 5 — לחץ מלא, חובת סל תוך 8 שניות אחרי מגע בצבע",
  },
  "defense+pressure": {
    warmup: "1 על 1 — שומר צמוד, 3 כדרורים מקסימום, עצירה = ניצחון",
    drill1: "3 על 3 מגרש מלא — הגנה חיה, 3 עצירות או נקודה להגנה",
    drill2: "4 על 4 — לחץ על הכדור, סוגרים אמצע, עצירה תוך 12 שניות",
    drill3: "4 על 4 חי — מלכודת בצד, חייבים עצירה לפני זריקה",
    game: "5 על 5 — לחץ עד 7, עצירה = נקודה להגנה",
  },
  "shoot+pressure": {
    warmup: "סגירה חיה — תפיסה וזריקה חובה תוך 4 שניות",
    drill1: "1 על 1 — שומר יוצא, 2 כדרורים, חייב זריקה",
    drill2: "3 על 3 — כל סגירה, חייבים סל תוך 5 שניות",
    drill3: "4 על 4 — סגירה מהירה, חייבים סל לפני עצירה",
    game: "5 על 5 — פתוח? חייבים זריקה תוך 4 שניות",
  },
  "defense+turnover": {
    warmup: "2 על 2 — הגנה על המסירה, איבוד = ספרינט",
    drill1: "3 על 3 — הגנה אגרסיבית, איבוד חי = כדור השני",
    drill2: "4 על 4 — תפיסה חזקה, מסירה רעה = עצירה להגנה",
    drill3: "4 על 4 חי — מלכודת בצד, איבוד = נקודה להגנה",
    game: "5 על 5 — איבוד חי = עונש + כדור השני",
  },
  "shoot+decision": {
    warmup: "3 נקודות — סגירה קלה, חייבים זריקה תוך 4 שניות",
    drill1: "3 על 2 — חייבים סל או מסירה תוך 6 שניות",
    drill2: "4 על 3 — עוד מסירה, חייבים סל תוך 8 שניות",
    drill3: "4 על 4 — החלטה: חדירה או קיק, חייבים סל",
    game: "5 על 5 — פתוח בשתיים? חייבים זריקה תוך 4 שניות",
  },
  "defense+decision": {
    warmup: "2 על 2 — עזרה וחזרה, עצירה = נקודה להגנה",
    drill1: "3 על 3 — הגנה חיה, חייבים עצירה תוך 12 שניות",
    drill2: "4 על 3 — החלטה בהגנה, חייבים עצירה לפני סל",
    drill3: "4 על 4 — בלי רולר חופשי, עצירה או איבוד = נקודה",
    game: "5 על 5 — דברו על כל חדירה, עצירה = ניצחון",
  },
  "motion+shoot": {
    warmup: "פלכס — חיתוך צמוד, חייב סיום תוך 4 שניות",
    drill1: "3 על 3 — מסך חי, חייבים סל בצד השני תוך 8 שניות",
    drill2: "4 על 4 — תנועה בלי כדור, חייבים סל ממסך תוך 6 שניות",
    drill3: "4 על 4 חי — חיתוך וסיום, חייבים סל לפני עצירה",
    game: "5 על 5 — אותה תנועה, חובת סל ממסך",
  },
  "defense+transition": {
    warmup: "2 על 2 — חזרה וסגירה, עצירה = נקודה",
    drill1: "4 על 4 מעבר — הגנה חוזרת, עצירה או סל תוך 8 שניות",
    drill2: "4 על 4 — חייבים עצירה לפני זריקה, השני חוזר",
    drill3: "5 על 4 מעבר — הגנה מנצחת או חייבים עצירה",
    game: "5 על 5 — חזרה תוך 4 שניות, עצירה = נקודה להגנה",
  },
};

export const FORCED_DRILLS_EN: Record<string, TemplateSet> = {
  "defense+shoot": {
    warmup: "1v1 wing — tight closeout, 2 dribbles max, must finish",
    drill1: "1v1 wing — live defender, 2 dribbles max, must shoot",
    drill2: "3v3 half — pressure D, must score in 6 sec",
    drill3: "4v4 live — closeout, must score before 3 stops",
    game: "5v5 — contest every shot, must score after paint touch",
  },
  "defense+shoot+pressure": {
    warmup: "1v1 wing — closeout, must finish in 4 sec",
    drill1: "2v1 — help D, must score in 6 sec",
    drill2: "3v3 half — pressure D, must score in 6 sec, TO = D point",
    drill3: "4v4 — fast closeout, must score before stop",
    game: "5v5 full press — paint touch, must score in 8 sec",
  },
  "defense+pressure": {
    warmup: "1v1 — live D, 3 dribbles max, stop = win",
    drill1: "3v3 full — live D, 3 stops or D point",
    drill2: "4v4 — ball pressure, no middle, stop in 12 sec",
    drill3: "4v4 live — sideline trap, must stop before shot",
    game: "5v5 press to 7 — stop = D point",
  },
  "shoot+pressure": {
    warmup: "Live closeout — catch and shoot in 4 sec",
    drill1: "1v1 — closeout, 2 dribbles, must shoot",
    drill2: "3v3 — every closeout, must score in 5 sec",
    drill3: "4v4 — fast closeout, must score before stop",
    game: "5v5 — open? Must shoot in 4 sec",
  },
  "defense+turnover": {
    warmup: "2v2 — deny pass, live TO = sprint",
    drill1: "3v3 — aggressive D, live TO = other ball",
    drill2: "4v4 — strong catch, bad pass = stop for D",
    drill3: "4v4 live — trap sideline, TO = D point",
    game: "5v5 — live TO = penalty + other ball",
  },
  "shoot+decision": {
    warmup: "3 spots — light closeout, must shoot in 4 sec",
    drill1: "3v2 — must score or pass decision in 6 sec",
    drill2: "4v3 — one more pass, must score in 8 sec",
    drill3: "4v4 — drive or kick, must score",
    game: "5v5 — open in two? Must shoot in 4 sec",
  },
  "defense+decision": {
    warmup: "2v2 help — recover, stop = D point",
    drill1: "3v3 live — must stop in 12 sec",
    drill2: "4v3 — help decision, stop before score",
    drill3: "4v4 — no free rollers, stop or TO = point",
    game: "5v5 — talk every drive, stop wins",
  },
  "motion+shoot": {
    warmup: "Flex cut — tight, must finish in 4 sec",
    drill1: "3v3 — live screen, must score second side in 8 sec",
    drill2: "4v4 motion — must score off screen in 6 sec",
    drill3: "4v4 live — cut finish, must score before stop",
    game: "5v5 — same motion, must score off screen",
  },
  "defense+transition": {
    warmup: "2v2 — get back closeout, stop = point",
    drill1: "4v4 transition — get back, stop or score in 8 sec",
    drill2: "4v4 — must stop before shot, second defender back",
    drill3: "5v4 break — D wins or must stop",
    game: "5v5 — get back in 4 steps, stop = D point",
  },
};

function blockSize(blockKind: BlockKind): string {
  switch (blockKind) {
    case "warmup":
      return "זוגות";
    case "drill1":
      return "2 על 2";
    case "drill2":
      return "3 על 3";
    case "drill3":
      return "4 על 4";
    case "game":
      return "5 על 5";
  }
}

/** Dynamic fallback when catalog key is missing. */
function buildDynamicForced(
  goals: readonly CoachGoal[],
  blockKind: BlockKind,
  locale: CoachLocale,
): string {
  const key = goalKey(goals);
  const heSet = FORCED_DRILLS_HE[key];
  if (heSet?.[blockKind]) {
    if (locale === "he") return heSet[blockKind];
    const enSet = FORCED_DRILLS_EN[key];
    if (enSet?.[blockKind]) return enSet[blockKind];
    return heSet[blockKind];
  }

  const hasDef = needsDefender(goals);
  const hasShoot = goals.includes("shoot");
  const hasPressure = goals.includes("pressure");
  const sec = blockKind === "warmup" ? 4 : blockKind === "game" ? 8 : 6;

  if (locale === "he") {
    const size = blockSize(blockKind);
    const defPart = hasDef ? "הגנה חיה, שומר צמוד" : hasPressure ? "לחץ על הכדור" : "";
    const shootPart = hasShoot ? `חייבים סל תוך ${sec} שניות` : "חייבים עצירה או החלטה";
    const constraint = hasPressure ? ", איבוד = נקודה להגנה" : ", 2 כדרורים מקסימום";
    return `${size} — ${[defPart, shootPart].filter(Boolean).join(", ")}${constraint}`;
  }

  const sizeEn =
    blockKind === "warmup"
      ? "Pairs"
      : blockKind === "drill1"
        ? "2v2"
        : blockKind === "drill2"
          ? "3v3"
          : blockKind === "drill3"
            ? "4v4"
            : "5v5";
  const defEn = hasDef ? "live D, contest" : hasPressure ? "ball pressure" : "";
  const outEn = hasShoot ? `must score in ${sec} sec` : "must get stop";
  return `${sizeEn} — ${[defEn, outEn].filter(Boolean).join(", ")}, 2 dribbles max`;
}

export function buildForcedSituationTitle(
  goals: readonly CoachGoal[],
  blockKind: BlockKind,
  locale: CoachLocale,
): string {
  const key = goalKey(goals);
  if (locale === "he" && FORCED_DRILLS_HE[key]?.[blockKind]) return FORCED_DRILLS_HE[key][blockKind]!;
  if (FORCED_DRILLS_EN[key]?.[blockKind]) return FORCED_DRILLS_EN[key][blockKind]!;
  return buildDynamicForced(goals, blockKind, locale);
}

function templateToDrillSet(t: TemplateSet) {
  return {
    warmup: [t.warmup],
    drill1: [t.drill1],
    drill2: [t.drill2],
    drill3: [t.drill3],
    game: [t.game],
  };
}

export function forcedCatalogDrills(
  locale: CoachLocale,
): Record<string, ReturnType<typeof templateToDrillSet>> {
  const src = locale === "he" ? FORCED_DRILLS_HE : FORCED_DRILLS_EN;
  const out: Record<string, ReturnType<typeof templateToDrillSet>> = {};
  for (const [k, t] of Object.entries(src)) {
    out[k] = templateToDrillSet(t);
  }
  return out;
}
