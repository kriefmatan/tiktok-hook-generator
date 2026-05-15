import { buildPracticePlan, type CoachingFields } from "../../lib/practicePlanGenerator";
import { isAppLocale } from "../../lib/locale/appLocale";
import type { CoachLocale } from "../../lib/locale/coachLocale";

function toAppLocale(locale: CoachLocale): CoachingFields["locale"] {
  return locale === "he" ? "he" : "en";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { locale, workingOn, sessionFocus, wantToImprove } = body as {
      locale?: unknown;
      workingOn?: unknown;
      sessionFocus?: unknown;
      wantToImprove?: unknown;
    };

    const text =
      (typeof workingOn === "string" ? workingOn : "") ||
      (typeof sessionFocus === "string" ? sessionFocus : "") ||
      (typeof wantToImprove === "string" ? wantToImprove : "");

    const resolvedLocale =
      typeof locale === "string" && isAppLocale(locale)
        ? locale
        : toAppLocale(typeof locale === "string" ? (locale as CoachLocale) : "en");

    const fields: CoachingFields = {
      locale: resolvedLocale,
      workingOn: text,
    };

    const plan = buildPracticePlan(fields);

    return Response.json({ plan });
  } catch (err) {
    console.error("[api/generate]", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to build practice plan" },
      { status: 500 }
    );
  }
}
