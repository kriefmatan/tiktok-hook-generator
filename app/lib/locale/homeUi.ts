import type { CoachLocale } from "./coachLocale";

export type HomeUiStrings = {
  title: string;
  labelWorkingOn: string;
  buildButton: string;
  building: string;
};

export const HOME_UI: Record<CoachLocale, HomeUiStrings> = {
  en: {
    title: "Practice",
    labelWorkingOn: "What are you working on today?",
    buildButton: "Build",
    building: "…",
  },
  he: {
    title: "אימון",
    labelWorkingOn: "על מה עובדים היום?",
    buildButton: "בנה",
    building: "…",
  },
  es: {
    title: "Entreno",
    labelWorkingOn: "¿En qué trabajan hoy?",
    buildButton: "Generar",
    building: "…",
  },
};
