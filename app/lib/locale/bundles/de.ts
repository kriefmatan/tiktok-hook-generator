import type { EmphasisKey, SimplePracticeBundle } from "../coachBundle.types";
import { EN_SIMPLE } from "./en";

const DE_SETUP_HOOKS: Record<EmphasisKey, string> = {
  rebound: "Erst Körper, dann Ball",
  shoot: "Gleiche Mechanik bei jedem Fang",
  pnr: "Block früh ansagen",
  zone: "Erst Kurzecke, dann Wurf",
  turnover: "Ball sicher halten",
  transition: "Zurück, dann laufen",
  communication: "Laut sprechen",
  decision: "Lesen und reagieren",
  motion: "Ohne Ball bewegen",
  pressure: "Ball unter Druck",
  spacing: "Platz schaffen",
  fiveOut: "Fünf nach außen",
  fast: "Tempo nach vorne",
  switch: "Wechsel ansagen",
  generic: "Fokus heute",
};

const DE_BULLETS: SimplePracticeBundle["bullets"] = {
  rebound: ["Körperkontakt vor dem Rebound.", "Kein Leaken, bis wir den Ball haben."],
  shoot: ["Gleiche Fangposition — nach Fehlwurf nicht hetzen.", "Passgeber schaut auf die Hände."],
  pnr: ["Block früh rufen — späte Füße killen Timing.", "Schwache Seite hebt an, wenn Hilfe kommt."],
  zone: ["Kurzecke vor dem frühen Dreier.", "Skip erst nach Paint- oder Kurzecke-Berührung."],
  turnover: ["Starker Fang.", "Schlechter Pass? Nicht hinterherlaufen."],
  transition: ["In vier Schritten zuteilen — Namen sagen.", "Ball früh — Lanes füllen."],
  communication: ["Ballseite bei jedem Screen.", "Nicht gehört = nicht passiert."],
  decision: ["Ein Pass mehr, wenn zwei helfen.", "Fahren, wenn Hilfe spät kommt — kicken, wenn offen."],
  motion: ["Blockwinkel zählt.", "Eng schneiden — Hände bereit."],
  pressure: ["Hände hoch, nicht greifen.", "Trap an der Seitenlinie."],
  spacing: ["Ecke bleibt weit bei Drive.", "Zwei in der Paint reichen — verlagern."],
  fiveOut: ["Lücke fahren — Ecke hebt.", "Hinter dem Drive nachfüllen."],
  fast: ["Vorlegen — nicht in Traffic dribbeln.", "Erste drei Schritte zurück bei Miss."],
  switch: ["Vor Kontakt rufen.", "Groß früh wechseln."],
  generic: ["Zurück zu dem, was an der Tafel steht.", "Kurze Stopps — Wiederholungen schlagen Reden."],
};

export const DE_SIMPLE = {
  ...EN_SIMPLE,
  locale: "de",
  dir: "ltr",
  formatMinutes: (n: number) => `${n} Min.`,
  totalTime: "~50 Min.",
  sectionLabels: ["Aufwärmen", "Übung 1", "Übung 2", "Übung 3", "5-gegen-5 — Regel heute"] as const,
  headerFallback: "Training",
  setupHooks: DE_SETUP_HOOKS,
  bullets: DE_BULLETS,
} satisfies SimplePracticeBundle;
