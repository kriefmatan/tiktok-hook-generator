import { buildPracticePlan, type CoachingFields } from "../../lib/practicePlanGenerator";

export async function POST(req: Request) {
  const body = await req.json();
  const { sessionFocus, wantToImprove } = body as Partial<CoachingFields>;

  const fields: CoachingFields = {
    sessionFocus: typeof sessionFocus === "string" ? sessionFocus : "",
    wantToImprove: typeof wantToImprove === "string" ? wantToImprove : "",
  };

  const plan = buildPracticePlan(fields);

  return Response.json({ plan });
}
