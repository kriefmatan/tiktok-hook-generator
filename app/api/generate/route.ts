import { buildPracticePlanWithCoach } from "../../lib/coach/coachPracticePipeline";
import type { CoachingFields } from "../../lib/coachingFields";
import { DEFAULT_APP_LOCALE, isAppLocale } from "../../lib/locale/appLocale";
import { toAppLocale } from "../../lib/locale/toAppLocale";
import type { AdvancedTagId, ChipId, PresetId } from "../../lib/locale/uiCatalog";

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { locale, workingOn, sessionFocus, wantToImprove, chips, presets, advancedTags } = body as {
      locale?: unknown;
      workingOn?: unknown;
      sessionFocus?: unknown;
      wantToImprove?: unknown;
      chips?: unknown;
      presets?: unknown;
      advancedTags?: unknown;
    };

    const text =
      (typeof workingOn === "string" ? workingOn : "") ||
      (typeof sessionFocus === "string" ? sessionFocus : "") ||
      (typeof wantToImprove === "string" ? wantToImprove : "");

    const resolvedLocale = isAppLocale(locale) ? locale : toAppLocale(locale ?? DEFAULT_APP_LOCALE);

    const fields: CoachingFields = {
      locale: resolvedLocale,
      workingOn: text,
      chips: asStringArray(chips) as ChipId[],
      presets: asStringArray(presets) as PresetId[],
      advancedTags: asStringArray(advancedTags) as AdvancedTagId[],
    };

    const plan = buildPracticePlanWithCoach(fields);

    return Response.json({ plan });
  } catch (err) {
    console.error("[api/generate]", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to build practice plan" },
      { status: 500 },
    );
  }
}
