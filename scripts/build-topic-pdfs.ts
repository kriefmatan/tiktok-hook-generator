/**
 * Generates static topic PDFs: public/coach-pdfs/{locale}/{topicId}.pdf
 * One Node process per file — avoids react-pdf bidi state issues on batch Hebrew.
 */
import { execSync } from "child_process";
import { APP_LOCALES } from "../app/lib/locale/appLocale";
import { ALL_TOPIC_IDS } from "../app/lib/pdf/topicCatalog";

async function main(): Promise<void> {
  let written = 0;
  const total = APP_LOCALES.length * ALL_TOPIC_IDS.length;

  for (const locale of APP_LOCALES) {
    for (const topicId of ALL_TOPIC_IDS) {
      execSync(`npx tsx scripts/render-one-topic-pdf.ts ${locale} ${topicId}`, {
        stdio: "inherit",
        cwd: process.cwd(),
      });
      written += 1;
      if (written % 14 === 0 || written === total) {
        console.log(`build:pdfs — ${written}/${total}`);
      }
    }
  }
  console.log(`build:pdfs — done (${written} PDFs)`);
}

main().catch((err) => {
  console.error("build:pdfs failed:", err);
  process.exit(1);
});
