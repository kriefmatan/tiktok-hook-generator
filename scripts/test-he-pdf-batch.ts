import { APP_LOCALES } from "../app/lib/locale/appLocale";
import { renderTopicPdfBuffer } from "../app/lib/pdf/renderPdf";
import { ALL_TOPIC_IDS } from "../app/lib/pdf/topicCatalog";

async function main(): Promise<void> {
  for (const locale of APP_LOCALES) {
    for (const topicId of ALL_TOPIC_IDS) {
      try {
        const b = await renderTopicPdfBuffer(topicId, locale);
        console.log("ok", locale, topicId, b.length);
      } catch (e) {
        console.error("FAIL", locale, topicId, e);
        process.exit(1);
      }
    }
  }
}

main();
