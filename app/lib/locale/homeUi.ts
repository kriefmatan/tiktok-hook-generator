import type { CoachLocale } from "./coachLocale";

export type HomeUiStrings = {
  title: string;
  labelFocus: string;
  labelImprove: string;
  buildButton: string;
  building: string;
};

export const HOME_UI: Record<CoachLocale, HomeUiStrings> = {
  en: {
    title: "Practice",
    labelFocus: "What should this practice focus on?",
    labelImprove: "What do you want to improve?",
    buildButton: "Build",
    building: "…",
  },
  he: {
    title: "אימון",
    labelFocus: "על מה האימון הזה צריך להתמקד?",
    labelImprove: "מה אתם רוצים לשפר?",
    buildButton: "בנה",
    building: "…",
  },
  es: {
    title: "Entreno",
    labelFocus: "¿En qué debe centrarse este entreno?",
    labelImprove: "¿Qué queréis mejorar?",
    buildButton: "Generar",
    building: "…",
  },
};
