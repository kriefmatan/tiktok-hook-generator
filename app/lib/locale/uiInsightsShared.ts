import type { AppLocale } from "./appLocale";
import type { UiStrings } from "./uiCatalog";

const INSIGHTS_EN: Pick<
  UiStrings,
  "nav" | "coachName" | "coachRole" | "tipTitle" | "tipQuote" | "recentTitle" | "recentItems" | "templatesTitle" | "viewAll" | "darkModeLabel" | "comingSoon"
> = {
  nav: {
    practice: "Practice",
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
};

const INSIGHTS_ES: typeof INSIGHTS_EN = {
  nav: {
    practice: "Entreno",
    plays: "Jugadas",
    players: "Jugadores",
    stats: "Estadísticas",
    season: "Temporada",
    settings: "Ajustes",
  },
  coachName: "Entrenador jefe",
  coachRole: "Senior",
  tipTitle: "Consejo del día",
  tipQuote: "Los detalles ganan partidos cerrados: cierres, comunicación, espacio.",
  recentTitle: "Actividad reciente",
  recentItems: ["Defensa · hace 2 h", "Tiro · ayer", "Preparación · lun"],
  templatesTitle: "Plantillas guardadas",
  viewAll: "Ver todo",
  darkModeLabel: "Modo oscuro",
  comingSoon: "Pronto",
};

const INSIGHTS_DE: typeof INSIGHTS_EN = {
  nav: {
    practice: "Training",
    plays: "Spielzüge",
    players: "Spieler",
    stats: "Statistik",
    season: "Saisonplan",
    settings: "Einstellungen",
  },
  coachName: "Head Coach",
  coachRole: "Senior",
  tipTitle: "Tipp des Tages",
  tipQuote: "Kleine Details entscheiden enge Spiele — Closeouts, Talk, Spacing.",
  recentTitle: "Letzte Aktivität",
  recentItems: ["Verteidigung · vor 2 Std.", "Wurftraining · gestern", "Spielvorbereitung · Mo"],
  templatesTitle: "Gespeicherte Vorlagen",
  viewAll: "Alle anzeigen",
  darkModeLabel: "Dunkelmodus",
  comingSoon: "Bald",
};

export const UI_INSIGHTS: Record<AppLocale, typeof INSIGHTS_EN> = {
  en: INSIGHTS_EN,
  he: {
    nav: {
      practice: "אימון",
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
  },
  es: INSIGHTS_ES,
  de: INSIGHTS_DE,
};
