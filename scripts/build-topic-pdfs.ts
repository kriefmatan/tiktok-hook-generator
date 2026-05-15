/**
 * Generates static topic PDFs: public/coach-pdfs/{locale}/{topicId}.pdf
 * Run: npm run build:pdfs
 */
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { APP_LOCALES } from "../app/lib/locale/appLocale";
import { renderTopicPdfBuffer } from "../app/lib/pdf/renderPdf";
import { ALL_TOPIC_IDS, topicPdfFilename } from "../app/lib/pdf/topicCatalog";

const OUT_ROOT = path.join(process.cwd(), "public", "coach-pdfs");

async function main(): Promise<void> {
  let written = 0;
  for (const locale of APP_LOCALES) {
    const localeDir = path.join(OUT_ROOT, locale);
    await mkdir(localeDir, { recursive: true });
    for (const topicId of ALL_TOPIC_IDS) {
      const buffer = await renderTopicPdfBuffer(topicId, locale);
      const filePath = path.join(localeDir, topicPdfFilename(topicId));
      await writeFile(filePath, buffer);
      written += 1;
      if (written % 14 === 0) {
        console.log(`build:pdfs — ${written} files…`);
      }
    }
  }
  console.log(`build:pdfs — done (${written} PDFs in ${OUT_ROOT})`);
}

main().catch((err) => {
  console.error("build:pdfs failed:", err);
  process.exit(1);
});
