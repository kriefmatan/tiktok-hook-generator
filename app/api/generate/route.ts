import { buildPracticePlan, type CoachingFields } from "../../lib/practicePlanGenerator";
import { DEFAULT_APP_LOCALE, isAppLocale } from "../../lib/locale/appLocale";
import { toAppLocale } from "../../lib/locale/toAppLocale";

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

    const resolvedLocale = isAppLocale(locale) ? locale : toAppLocale(locale ?? DEFAULT_APP_LOCALE);

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
