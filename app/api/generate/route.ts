import { buildPracticePlan } from "../../lib/practicePlanGenerator";

export async function POST(req: Request) {
  const body = await req.json();
  const { offense, defense, problems } = body as {
    offense?: string;
    defense?: string;
    problems?: string[];
  };

  const plan = buildPracticePlan(
    offense ?? "",
    defense ?? "",
    Array.isArray(problems) ? problems : []
  );

  return Response.json({ plan });
}
