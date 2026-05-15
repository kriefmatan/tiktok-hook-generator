import type { AppLocale } from "./appLocale";
import { localeText } from "./localeText";
import { UI_INSIGHTS } from "./uiInsightsShared";
import { UI_DE, UI_ES } from "./uiStringsEsDe";

export type ChipId =
  | "defense"
  | "shooting"
  | "transition"
  | "ballMovement"
  | "finishing"
  | "oneOnOne"
  | "rebounding"
  | "spacing"
  | "pressBreak"
  | "fastBreak"
  | "conditioning"
  | "decisionMaking";

export const CHIP_ORDER: readonly ChipId[] = [
  "defense",
  "shooting",
  "transition",
  "ballMovement",
  "finishing",
  "oneOnOne",
  "rebounding",
  "spacing",
  "pressBreak",
  "fastBreak",
  "conditioning",
  "decisionMaking",
];

export type PresetId =
  | "defensivePractice"
  | "shootingPractice"
  | "gamePrep"
  | "fundamentals"
  | "fastPacePractice"
  | "toughnessPractice"
  | "beginnerPractice"
  | "funCompetitive"
  | "noDribblePractice"
  | "passingMovement"
  | "coordinationFootwork"
  | "pickAndRoll"
  | "helpDefense"
  | "rotations"
  | "readAndReact"
  | "transitionDefense";

export type AdvancedTagId =
  | "zoneOffense"
  | "zoneDefense"
  | "closeouts"
  | "weakHandFinishing"
  | "fullCourtPressure"
  | "halfCourtOffense"
  | "shellDrillConcepts"
  | "skipPasses"
  | "helpSide"
  | "boxingOut"
  | "lateGameSituations"
  | "outOfBoundsPlays"
  | "communication"
  | "paceControl";

export const ADVANCED_TAG_ORDER: readonly AdvancedTagId[] = [
  "zoneOffense",
  "zoneDefense",
  "closeouts",
  "weakHandFinishing",
  "fullCourtPressure",
  "halfCourtOffense",
  "shellDrillConcepts",
  "skipPasses",
  "helpSide",
  "boxingOut",
  "lateGameSituations",
  "outOfBoundsPlays",
  "communication",
  "paceControl",
];

export type PresetGroupId = "team" | "youth" | "advanced";

type PresetDef = {
  id: PresetId;
  fillText: Partial<Record<AppLocale, string>> & { en: string };
  searchTerms: Partial<Record<AppLocale, string>> & { en: string };
};

export type NavItemId =
  | "practice"
  | "library"
  | "plays"
  | "players"
  | "stats"
  | "season"
  | "settings";

export type UiStrings = {
  brandName: string;
  title: string;
  subtitle: string;
  languageLabel: string;
  mainPrompt: string;
  inputPlaceholder: string;
  chipsLabel: string;
  presetsLabel: string;
  moreLabel: string;
  presetGroups: Record<PresetGroupId, string>;
  chips: Record<ChipId, string>;
  advancedTags: Record<AdvancedTagId, string>;
  buildButton: string;
  buildButtonLong: string;
  building: string;
  errorFailed: string;
  nav: Record<NavItemId, string>;
  coachName: string;
  coachRole: string;
  tipTitle: string;
  tipQuote: string;
  recentTitle: string;
  recentItems: readonly string[];
  templatesTitle: string;
  viewAll: string;
  darkModeLabel: string;
  comingSoon: string;
  downloadPdf: string;
  downloadingPdf: string;
  pdfDownloadFailed: string;
  pdfLibrary: string;
  pdfLibrarySubtitle: string;
  pdfOpenTopic: string;
};

const PRESET_DEFS: readonly PresetDef[] = [
  {
    id: "defensivePractice",
    fillText: { en: "Defensive practice — closeouts, help, get back", he: "אימון הגנה — סגירות, עזרה, חזרה" },
    searchTerms: { en: "defense closeout help side", he: "הגנה סגירה עזרה" },
  },
  {
    id: "shootingPractice",
    fillText: { en: "Shooting practice — game spots, confidence", he: "אימון זריקות — נקודות משחק, ביטחון" },
    searchTerms: { en: "shooting spots threes", he: "זריקות שלשות" },
  },
  {
    id: "gamePrep",
    fillText: { en: "Game prep — our sets, late-game situations", he: "הכנה למשחק — הסטים שלנו, סיטואציות" },
    searchTerms: { en: "game prep sets", he: "הכנה למשחק" },
  },
  {
    id: "fundamentals",
    fillText: { en: "Fundamentals — passing, footwork, ball security", he: "יסודות — מסירות, רגליים, שמירה על הכדור" },
    searchTerms: { en: "fundamentals passing footwork", he: "יסודות מסירות" },
  },
  {
    id: "fastPacePractice",
    fillText: { en: "Fast pace — push, transition both ways", he: "קצב מהיר — דחיפה, מעבר שני הצדדים" },
    searchTerms: { en: "fast pace transition", he: "קצב מעבר" },
  },
  {
    id: "toughnessPractice",
    fillText: { en: "Toughness — compete every rep, physical play", he: "חוסן — תחרות בכל חזרה, משחק פיזי" },
    searchTerms: { en: "toughness compete physical", he: "חוסן תחרות פיזי" },
  },
  {
    id: "beginnerPractice",
    fillText: { en: "Beginners — simple rules, lots of reps", he: "מתחילים — חוקים פשוטים, הרבה חזרות" },
    searchTerms: { en: "beginner youth basics", he: "מתחילים נוער" },
  },
  {
    id: "funCompetitive",
    fillText: { en: "Fun and competitive — keep score, high energy", he: "כיף ותחרות — שמרו תוצאה, אנרגיה" },
    searchTerms: { en: "competitive fun games", he: "תחרות כיף" },
  },
  {
    id: "noDribblePractice",
    fillText: { en: "No dribble — pass and cut only", he: "בלי כדרור — רק מסירות וחיתוכים" },
    searchTerms: { en: "no dribble passing only", he: "בלי כדרור מסירות" },
  },
  {
    id: "passingMovement",
    fillText: { en: "Passing and movement — cut, fill, spacing", he: "מסירות ותנועה — חיתוכים, מילוי, מרווחים" },
    searchTerms: { en: "passing movement cuts", he: "מסירות תנועה" },
  },
  {
    id: "coordinationFootwork",
    fillText: { en: "Footwork and coordination — pivots, stops", he: "רגליים וקואורדינציה — פיבוט, עצירות" },
    searchTerms: { en: "footwork coordination pivots", he: "רגליים קואורדינציה" },
  },
  {
    id: "pickAndRoll",
    fillText: { en: "Pick and roll — timing, reads, roller", he: "פיק אנד רול — תזמון, קריאות, רולר" },
    searchTerms: { en: "pick and roll ball screen", he: "פיק אנד רול מסך" },
  },
  {
    id: "helpDefense",
    fillText: { en: "Help defense — stunt, recover, talk", he: "עזרה בהגנה — הצגה, החזרה, דיבור" },
    searchTerms: { en: "help defense recover", he: "עזרה בהגנה" },
  },
  {
    id: "rotations",
    fillText: { en: "Rotations — closeout, help, find your man", he: "רוטציות — סגירה, עזרה, מצאו איש" },
    searchTerms: { en: "rotations defense", he: "רוטציות הגנה" },
  },
  {
    id: "readAndReact",
    fillText: { en: "Read and react — drive, kick, extra pass", he: "קריאה ותגובה — חדירה, קיק, עוד מסירה" },
    searchTerms: { en: "read react decisions", he: "קריאה החלטות" },
  },
  {
    id: "transitionDefense",
    fillText: { en: "Transition defense — get back, match up", he: "הגנת מעבר — חזרה, זיווגים" },
    searchTerms: { en: "transition defense get back", he: "הגנת מעבר חזרה" },
  },
];

export const PRESET_GROUPS: readonly {
  id: PresetGroupId;
  presetIds: readonly PresetId[];
}[] = [
  {
    id: "team",
    presetIds: [
      "defensivePractice",
      "shootingPractice",
      "fastPacePractice",
      "gamePrep",
      "fundamentals",
      "toughnessPractice",
    ],
  },
  {
    id: "youth",
    presetIds: [
      "beginnerPractice",
      "funCompetitive",
      "noDribblePractice",
      "passingMovement",
      "coordinationFootwork",
    ],
  },
  {
    id: "advanced",
    presetIds: ["readAndReact", "pickAndRoll", "helpDefense", "rotations", "transitionDefense"],
  },
];

const PRESET_BY_ID = Object.fromEntries(PRESET_DEFS.map((p) => [p.id, p])) as Record<PresetId, PresetDef>;

export function presetFillText(id: PresetId, locale: AppLocale): string {
  return localeText(PRESET_BY_ID[id].fillText)[locale];
}

export function presetSearchTerms(id: PresetId, locale: AppLocale): string {
  return localeText(PRESET_BY_ID[id].searchTerms)[locale];
}

/** Extra terms appended for text analysis (per chip, per locale). */
export const CHIP_SEARCH_TERMS: Record<AppLocale, Record<ChipId, string>> = {
  en: {
    defense: "defense closeout help deny",
    shooting: "shooting threes spots",
    transition: "transition fast break",
    ballMovement: "ball movement passing cuts",
    finishing: "finishing at the rim layups",
    oneOnOne: "1 on 1 competitive",
    rebounding: "rebounding box out",
    spacing: "spacing floor balance",
    pressBreak: "press break trap",
    fastBreak: "fast break primary break",
    conditioning: "conditioning sprint pace",
    decisionMaking: "decision making reads",
  },
  he: {
    defense: "הגנה סגירה עזרה",
    shooting: "זריקות שלשות",
    transition: "מעבר התקפה הגנת מעבר",
    ballMovement: "תנועה בלי כדור מסירות",
    finishing: "סיומות סל קל",
    oneOnOne: "1 על 1",
    rebounding: "ריבאונד",
    spacing: "מרווחים פריסה",
    pressBreak: "שבירת לחץ",
    fastBreak: "מעבר התקפה מהיר",
    conditioning: "כושר ריצה",
    decisionMaking: "החלטות קריאה",
  },
  es: {
    defense: "defensa cierre ayuda",
    shooting: "tiro triples",
    transition: "transición contraataque",
    ballMovement: "movimiento pases cortes",
    finishing: "finalizaciones bandeja",
    oneOnOne: "1 contra 1",
    rebounding: "rebote box out",
    spacing: "espaciado piso",
    pressBreak: "romper presión trampa",
    fastBreak: "contraataque",
    conditioning: "condición sprint",
    decisionMaking: "decisiones lectura",
  },
  de: {
    defense: "verteidigung closeout hilfe",
    shooting: "wurf dreier spots",
    transition: "transition schnellangriff",
    ballMovement: "ballbewegung passen cuts",
    finishing: "abschluss korb layup",
    oneOnOne: "1 gegen 1",
    rebounding: "rebound box out",
    spacing: "spacing abstand",
    pressBreak: "press break druck",
    fastBreak: "fast break",
    conditioning: "kondition sprint",
    decisionMaking: "entscheidungen lesen",
  },
};

export const ADVANCED_TAG_SEARCH_TERMS: Record<AppLocale, Record<AdvancedTagId, string>> = {
  en: {
    zoneOffense: "zone offense attack gaps",
    zoneDefense: "zone defense 2-3 3-2",
    closeouts: "closeouts contest recover",
    weakHandFinishing: "weak hand finishing layups",
    fullCourtPressure: "full court pressure trap",
    halfCourtOffense: "half court offense sets",
    shellDrillConcepts: "shell drill help side",
    skipPasses: "skip passes extra pass",
    helpSide: "help side stunt recover",
    boxingOut: "boxing out rebound",
    lateGameSituations: "late game situations clock",
    outOfBoundsPlays: "out of bounds plays sideline baseline",
    communication: "communication talk call out",
    paceControl: "pace control tempo",
  },
  he: {
    zoneOffense: "התקפה מול זון",
    zoneDefense: "הגנת זון 2-3",
    closeouts: "סגירות הגנה",
    weakHandFinishing: "סיומות יד חלשה",
    fullCourtPressure: "לחץ מלא קורט",
    halfCourtOffense: "התקפה חצי קורט",
    shellDrillConcepts: "של דריל עזרה",
    skipPasses: "מסירות דילוג",
    helpSide: "צד עזרה",
    boxingOut: "בוקס אאוט ריבאונד",
    lateGameSituations: "סיטואציות סוף משחק",
    outOfBoundsPlays: "חוצים קו",
    communication: "תקשורת דיבור",
    paceControl: "שליטה בקצב",
  },
  es: {
    zoneOffense: "ataque vs zona",
    zoneDefense: "defensa zona 2-3",
    closeouts: "cierres defensa",
    weakHandFinishing: "finalización mano débil",
    fullCourtPressure: "presión toda la cancha",
    halfCourtOffense: "ataque media cancha",
    shellDrillConcepts: "shell drill ayuda",
    skipPasses: "pases skip",
    helpSide: "lado ayuda",
    boxingOut: "box out rebote",
    lateGameSituations: "situaciones finales",
    outOfBoundsPlays: "jugadas banda",
    communication: "comunicación hablar",
    paceControl: "control ritmo",
  },
  de: {
    zoneOffense: "zone offense lücken",
    zoneDefense: "zone defense 2-3",
    closeouts: "closeouts recover",
    weakHandFinishing: "schwache hand finish",
    fullCourtPressure: "fullcourt press trap",
    halfCourtOffense: "halbfeld offense",
    shellDrillConcepts: "shell drill help",
    skipPasses: "skip pass",
    helpSide: "help side recover",
    boxingOut: "box out rebound",
    lateGameSituations: "endspiel situation",
    outOfBoundsPlays: "out of bounds",
    communication: "kommunikation sprechen",
    paceControl: "tempo kontrolle",
  },
};

export const UI: Record<AppLocale, UiStrings> = {
  en: {
    brandName: "AI Basketball Planner",
    title: "Practice",
    subtitle: "Smart planning for game day",
    languageLabel: "Language",
    mainPrompt: "What are you working on today?",
    inputPlaceholder: "Defense drills, shooting, offensive sets…",
    chipsLabel: "Quick topics",
    presetsLabel: "Presets",
    moreLabel: "More",
    presetGroups: {
      team: "Team practice",
      youth: "Youth",
      advanced: "Advanced",
    },
    chips: {
      defense: "Defense",
      shooting: "Shooting",
      transition: "Transition",
      ballMovement: "Ball movement",
      finishing: "Finishing",
      oneOnOne: "1-on-1",
      rebounding: "Rebounding",
      spacing: "Spacing",
      pressBreak: "Press break",
      fastBreak: "Fast break",
      conditioning: "Conditioning",
      decisionMaking: "Decision making",
    },
    advancedTags: {
      zoneOffense: "Zone offense",
      zoneDefense: "Zone defense",
      closeouts: "Closeouts",
      weakHandFinishing: "Weak hand finishing",
      fullCourtPressure: "Full court pressure",
      halfCourtOffense: "Half court offense",
      shellDrillConcepts: "Shell drill concepts",
      skipPasses: "Skip passes",
      helpSide: "Help side",
      boxingOut: "Boxing out",
      lateGameSituations: "Late game situations",
      outOfBoundsPlays: "Out of bounds plays",
      communication: "Communication",
      paceControl: "Pace control",
    },
    buildButton: "Build",
    buildButtonLong: "Build practice",
    building: "Building…",
    errorFailed: "Couldn't build the plan. Try again.",
    nav: {
      practice: "Practice",
      library: "PDF library",
      plays: "Plays",
      players: "Players",
      stats: "Stats",
      season: "Season plan",
      settings: "Settings",
    },
    coachName: "Head Coach",
    coachRole: "Varsity",
    tipTitle: "Tip of the day",
    tipQuote: "Small details win close games — closeouts, talk, spacing.",
    recentTitle: "Recent activity",
    recentItems: ["Defense practice · 2h ago", "Shooting session · Yesterday", "Game prep · Mon"],
    templatesTitle: "Saved templates",
    viewAll: "View all",
    darkModeLabel: "Dark mode",
    comingSoon: "Soon",
    downloadPdf: "Download PDF",
    downloadingPdf: "Preparing PDF…",
    pdfDownloadFailed: "Could not download PDF.",
    pdfLibrary: "Coach PDF library",
    pdfLibrarySubtitle: "Drills, practice plans, and session systems — one PDF per topic.",
    pdfOpenTopic: "Open PDF",
  },
  he: {
    brandName: "AI BASKETBALL PLANNER",
    title: "אימון",
    subtitle: "תכנון חכם, ניצחון במשחק",
    languageLabel: "שפה",
    mainPrompt: "על מה עובדים היום?",
    inputPlaceholder: "לדוגמה: תרגילי הגנה אישית, תנועה בלי כדור, מערך התקפה…",
    chipsLabel: "נושאים מהירים",
    presetsLabel: "תבניות אימון",
    moreLabel: "עוד",
    presetGroups: {
      team: "אימון קבוצתי",
      youth: "נוער",
      advanced: "מתקדמים",
    },
    chips: {
      defense: "הגנה",
      shooting: "זריקה",
      transition: "מעבר",
      ballMovement: "תנועה בלי כדור",
      finishing: "סיומות",
      oneOnOne: "1 על 1",
      rebounding: "ריבאונד",
      spacing: "מרווחים",
      pressBreak: "שבירת לחץ",
      fastBreak: "מעבר התקפה",
      conditioning: "כושר",
      decisionMaking: "החלטות",
    },
    advancedTags: {
      zoneOffense: "התקפה מול זון",
      zoneDefense: "הגנת זון",
      closeouts: "סגירות",
      weakHandFinishing: "סיומות יד חלשה",
      fullCourtPressure: "לחץ מלא",
      halfCourtOffense: "התקפה חצי קורט",
      shellDrillConcepts: "של דריל",
      skipPasses: "מסירות דילוג",
      helpSide: "צד עזרה",
      boxingOut: "בוקס אאוט",
      lateGameSituations: "סוף משחק",
      outOfBoundsPlays: "חוצים קו",
      communication: "תקשורת",
      paceControl: "שליטה בקצב",
    },
    buildButton: "בנה",
    buildButtonLong: "בנה אימון",
    building: "בונה…",
    errorFailed: "לא יצא. נסו שוב.",
    nav: {
      practice: "אימון",
      library: "ספריית PDF",
      plays: "מערכי משחק",
      players: "שחקנים",
      stats: "סטטיסטיקות",
      season: "תוכנית עונה",
      settings: "הגדרות",
    },
    coachName: "מאמן ראשי",
    coachRole: "קבוצת בוגרים",
    tipTitle: "טיפ היום",
    tipQuote: "פרטים קטנים משנים משחקים צמודים — סגירות, דיבור, מרווחים.",
    recentTitle: "פעילות אחרונה",
    recentItems: ["אימון הגנה · לפני שעתיים", "אימון זריקות · אתמול", "הכנה למשחק · ב׳"],
    templatesTitle: "תבניות שמורות",
    viewAll: "צפה בהכל",
    darkModeLabel: "מצב כהה",
    comingSoon: "בקרוב",
    downloadPdf: "הורדת PDF",
    downloadingPdf: "מכין PDF…",
    pdfDownloadFailed: "לא הצליח להוריד PDF.",
    pdfLibrary: "ספריית PDF למאמן",
    pdfLibrarySubtitle: "תרגילים, אימונים ומערכי אימון — קובץ PDF לכל נושא.",
    pdfOpenTopic: "פתח PDF",
  },
  es: { ...UI_ES, ...UI_INSIGHTS.es } as UiStrings,
  de: { ...UI_DE, ...UI_INSIGHTS.de } as UiStrings,
};

const PRESET_LABELS: Record<PresetId, Partial<Record<AppLocale, string>> & { en: string }> = {
  defensivePractice: { en: "Defensive practice", he: "אימון הגנה", es: "Defensa", de: "Verteidigung" },
  shootingPractice: { en: "Shooting practice", he: "אימון זריקות", es: "Tiro", de: "Wurftraining" },
  gamePrep: { en: "Game prep", he: "הכנה למשחק", es: "Preparación partido", de: "Spielvorbereitung" },
  fundamentals: { en: "Fundamentals", he: "יסודות", es: "Fundamentos", de: "Grundlagen" },
  fastPacePractice: { en: "Fast pace practice", he: "אימון בקצב", es: "Ritmo alto", de: "Hohes Tempo" },
  toughnessPractice: { en: "Toughness practice", he: "אימון חוסן", es: "Dureza", de: "Mentalität" },
  beginnerPractice: { en: "Beginner practice", he: "מתחילים", es: "Principiantes", de: "Anfänger" },
  funCompetitive: { en: "Fun competitive", he: "כיף ותחרות", es: "Diversión y competencia", de: "Spaß & Wettbewerb" },
  noDribblePractice: { en: "No-dribble practice", he: "בלי כדרור", es: "Sin bote", de: "Ohne Dribbling" },
  passingMovement: { en: "Passing & movement", he: "מסירות ותנועה", es: "Pase y movimiento", de: "Passen & Bewegung" },
  coordinationFootwork: {
    en: "Coordination & footwork",
    he: "רגליים וקואורדינציה",
    es: "Coordinación y pies",
    de: "Koordination & Fußarbeit",
  },
  pickAndRoll: { en: "Pick & roll", he: "פיק אנד רול", es: "Bloqueo directo", de: "Pick & Roll" },
  helpDefense: { en: "Help defense", he: "עזרה בהגנה", es: "Ayuda defensiva", de: "Help defense" },
  rotations: { en: "Rotations", he: "רוטציות", es: "Rotaciones", de: "Rotationen" },
  readAndReact: { en: "Read & react", he: "קריאה ותגובה", es: "Leer y reaccionar", de: "Lesen & reagieren" },
  transitionDefense: { en: "Transition defense", he: "הגנת מעבר", es: "Defensa transición", de: "Transition-Defense" },
};

export function presetLabel(id: PresetId, locale: AppLocale): string {
  return localeText(PRESET_LABELS[id])[locale];
}
