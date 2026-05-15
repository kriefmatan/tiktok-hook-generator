import { readFile } from "fs/promises";
import path from "path";
import { isAppLocale, type AppLocale } from "@/app/lib/locale/appLocale";
import { renderTopicPdfBuffer } from "@/app/lib/pdf/renderPdf";
import {
  topicPdfFilename,
  topicPdfPublicPath,
  type TopicId,
} from "@/app/lib/pdf/topicCatalog";
import { CHIP_ORDER, PRESET_GROUPS } from "@/app/lib/locale/uiCatalog";

export const runtime = "nodejs";

const ALL_TOPIC_IDS: TopicId[] = [
  ...CHIP_ORDER,
  ...PRESET_GROUPS.flatMap((g) => g.presetIds),
];

function isTopicId(value: string): value is TopicId {
  return (ALL_TOPIC_IDS as string[]).includes(value);
}

async function readStaticPdf(locale: AppLocale, topicId: TopicId): Promise<Buffer | null> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "coach-pdfs",
    locale,
    topicPdfFilename(topicId),
  );
  try {
    return await readFile(filePath);
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get("topic");
    const localeParam = searchParams.get("locale");

    if (!topic || !isTopicId(topic)) {
      return Response.json({ error: "Invalid topic" }, { status: 400 });
    }

    const locale = isAppLocale(localeParam) ? localeParam : "en";
    const staticPdf = await readStaticPdf(locale, topic);
    const buffer = staticPdf ?? (await renderTopicPdfBuffer(topic, locale));

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${topic}-${locale}.pdf"`,
        "X-Pdf-Path": topicPdfPublicPath(locale, topic),
      },
    });
  } catch (err) {
    console.error("[api/pdf/topic]", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "PDF generation failed" },
      { status: 500 },
    );
  }
}
