import type { AppLocale } from "../locale/appLocale";

export type PdfLabels = {
  drillsSection: string;
  systemSection: string;
  practiceSection: string;
  themeFocus: string;
  sessionStructure: string;
  blockReminders: string;
  minutes: string;
};

const PDF_LABELS: Record<AppLocale, PdfLabels> = {
  en: {
    drillsSection: "Drill bank",
    systemSection: "Practice system",
    practiceSection: "Ready-to-run practice",
    themeFocus: "Theme focus",
    sessionStructure: "Session structure",
    blockReminders: "Block reminders",
    minutes: "min",
  },
  he: {
    drillsSection: "בנק תרגילים",
    systemSection: "מערך אימון",
    practiceSection: "אימון מוכן להרצה",
    themeFocus: "מיקוד נושא",
    sessionStructure: "מבנה האימון",
    blockReminders: "תזכורות לבלוק",
    minutes: "דק׳",
  },
  es: {
    drillsSection: "Banco de ejercicios",
    systemSection: "Sistema de entreno",
    practiceSection: "Entreno listo",
    themeFocus: "Enfoque",
    sessionStructure: "Estructura de sesión",
    blockReminders: "Recordatorios por bloque",
    minutes: "min",
  },
  de: {
    drillsSection: "Übungsbank",
    systemSection: "Trainingssystem",
    practiceSection: "Fertiges Training",
    themeFocus: "Schwerpunkt",
    sessionStructure: "Session-Aufbau",
    blockReminders: "Block-Hinweise",
    minutes: "Min.",
  },
};

export function pdfLabelsForLocale(locale: AppLocale): PdfLabels {
  return PDF_LABELS[locale];
}
