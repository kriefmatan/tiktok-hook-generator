import type { AppLocale } from "./appLocale";

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
  fillText: Record<AppLocale, string>;
  searchTerms: Record<AppLocale, string>;
};

type UiStrings = {
  languageLabel: string;
  languageNames: Record<AppLocale, string>;
  /** Single primary question — the only prompt on the page */
  mainPrompt: string;
  chipsLabel: string;
  presetsLabel: string;
  moreLabel: string;
  presetGroups: Record<PresetGroupId, string>;
  chips: Record<ChipId, string>;
  advancedTags: Record<AdvancedTagId, string>;
  buildButton: string;
  building: string;
  errorFailed: string;
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
  return PRESET_BY_ID[id].fillText[locale];
}

export function presetSearchTerms(id: PresetId, locale: AppLocale): string {
  return PRESET_BY_ID[id].searchTerms[locale];
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
};

export const UI: Record<AppLocale, UiStrings> = {
  en: {
    languageLabel: "Language",
    languageNames: { en: "English", he: "עברית" },
    mainPrompt: "What are you working on today?",
    chipsLabel: "Quick focus",
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
    building: "Building…",
    errorFailed: "Couldn't build the plan. Try again.",
  },
  he: {
    languageLabel: "שפה",
    languageNames: { en: "English", he: "עברית" },
    mainPrompt: "על מה עובדים היום?",
    chipsLabel: "נושא מהיר",
    presetsLabel: "תבניות",
    moreLabel: "עוד",
    presetGroups: {
      team: "אימון קבוצה",
      youth: "נוער",
      advanced: "מתקדם",
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
    building: "בונה…",
    errorFailed: "לא יצא. נסו שוב.",
  },
};

export function presetLabel(id: PresetId, locale: AppLocale): string {
  const labels: Record<PresetId, Record<AppLocale, string>> = {
    defensivePractice: { en: "Defensive practice", he: "אימון הגנה" },
    shootingPractice: { en: "Shooting practice", he: "אימון זריקות" },
    gamePrep: { en: "Game prep", he: "הכנה למשחק" },
    fundamentals: { en: "Fundamentals", he: "יסודות" },
    fastPacePractice: { en: "Fast pace practice", he: "אימון בקצב" },
    toughnessPractice: { en: "Toughness practice", he: "אימון חוסן" },
    beginnerPractice: { en: "Beginner practice", he: "מתחילים" },
    funCompetitive: { en: "Fun competitive", he: "כיף ותחרות" },
    noDribblePractice: { en: "No-dribble practice", he: "בלי כדרור" },
    passingMovement: { en: "Passing & movement", he: "מסירות ותנועה" },
    coordinationFootwork: { en: "Coordination & footwork", he: "רגליים וקואורדינציה" },
    pickAndRoll: { en: "Pick & roll", he: "פיק אנד רול" },
    helpDefense: { en: "Help defense", he: "עזרה בהגנה" },
    rotations: { en: "Rotations", he: "רוטציות" },
    readAndReact: { en: "Read & react", he: "קריאה ותגובה" },
    transitionDefense: { en: "Transition defense", he: "הגנת מעבר" },
  };
  return labels[id][locale];
}
