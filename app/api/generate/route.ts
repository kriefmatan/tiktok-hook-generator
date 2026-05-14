import { buildPracticePlan, type CoachingFields } from "../../lib/practicePlanGenerator";

export async function POST(req: Request) {
  const body = await req.json();
  const { teamDescription, hurtingMost, practiceFocus, ageLevel } = body as Partial<CoachingFields>;

  const fields: CoachingFields = {
    teamDescription: typeof teamDescription === "string" ? teamDescription : "",
    hurtingMost: typeof hurtingMost === "string" ? hurtingMost : "",
    practiceFocus: typeof practiceFocus === "string" ? practiceFocus : "",
    ageLevel: typeof ageLevel === "string" ? ageLevel : "",
  };

  const plan = buildPracticePlan(fields);

  return Response.json({ plan });
}
