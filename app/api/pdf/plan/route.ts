import { renderPracticePlanPdfBuffer } from "@/app/lib/pdf/renderPdf";
import type { PracticePlan } from "@/app/types/plan";

export const runtime = "nodejs";

function isPracticePlan(value: unknown): value is PracticePlan {
  if (!value || typeof value !== "object") return false;
  const p = value as PracticePlan;
  return (
    typeof p.headerLine === "string" &&
    typeof p.warmup === "object" &&
    typeof p.drill1 === "object" &&
    typeof p.gameFiveOnFive === "object"
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { plan?: unknown };
    if (!isPracticePlan(body.plan)) {
      return Response.json({ error: "Invalid practice plan" }, { status: 400 });
    }

    const buffer = await renderPracticePlanPdfBuffer(body.plan);
    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="practice.pdf"',
      },
    });
  } catch (err) {
    console.error("[api/pdf/plan]", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "PDF generation failed" },
      { status: 500 },
    );
  }
}
