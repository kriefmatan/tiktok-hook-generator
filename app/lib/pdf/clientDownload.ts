import type { PracticePlan } from "../../types/plan";
import type { TopicId } from "./topicCatalog";

export async function downloadPracticePlanPdf(plan: PracticePlan): Promise<void> {
  const res = await fetch("/api/pdf/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  if (!res.ok) throw new Error("PDF request failed");
  await saveBlobResponse(res, "practice.pdf");
}

export async function downloadTopicPdf(topicId: TopicId, locale: string): Promise<void> {
  const staticUrl = `/coach-pdfs/${locale}/${topicId}.pdf`;
  const staticRes = await fetch(staticUrl, { method: "HEAD" });
  const url = staticRes.ok ? staticUrl : `/api/pdf/topic?topic=${topicId}&locale=${locale}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("PDF request failed");
  await saveBlobResponse(res, `${topicId}-${locale}.pdf`);
}

async function saveBlobResponse(res: Response, fallbackName: string): Promise<void> {
  const blob = await res.blob();
  const disposition = res.headers.get("Content-Disposition");
  const match = disposition?.match(/filename="?([^";]+)"?/);
  const filename = match?.[1] ?? fallbackName;
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(href);
}
