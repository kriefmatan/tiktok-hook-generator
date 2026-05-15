import { buildPracticePlan, type CoachingFields } from "../../lib/practicePlanGenerator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionFocus, wantToImprove } = body as Partial<CoachingFields>;

    const fields: CoachingFields = {
      sessionFocus: typeof sessionFocus === "string" ? sessionFocus : "",
      wantToImprove: typeof wantToImprove === "string" ? wantToImprove : "",
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
