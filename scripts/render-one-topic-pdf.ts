import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { isAppLocale } from "../app/lib/locale/appLocale";
import { renderTopicPdfBuffer } from "../app/lib/pdf/renderPdf";
import { topicPdfFilename, type TopicId } from "../app/lib/pdf/topicCatalog";
import { PRESET_GROUPS, CHIP_ORDER } from "../app/lib/locale/uiCatalog";

const ALL_IDS: TopicId[] = [
  ...CHIP_ORDER,
  ...PRESET_GROUPS.flatMap((g) => g.presetIds),
];

function isTopicId(value: string): value is TopicId {
  return (ALL_IDS as string[]).includes(value);
}

async function main(): Promise<void> {
  const [, , localeArg, topicArg] = process.argv;

  if (!localeArg || !topicArg || !isAppLocale(localeArg) || !isTopicId(topicArg)) {
    console.error("Usage: tsx scripts/render-one-topic-pdf.ts <locale> <topicId>");
    process.exit(1);
  }

  const locale = localeArg;
  const topicId = topicArg;
  const outDir = path.join(process.cwd(), "public", "coach-pdfs", locale);
  const outPath = path.join(outDir, topicPdfFilename(topicId));

  const buffer = await renderTopicPdfBuffer(topicId, locale);
  await mkdir(outDir, { recursive: true });
  await writeFile(outPath, buffer);
  console.log(outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
