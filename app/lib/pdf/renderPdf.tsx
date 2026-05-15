import { renderToBuffer } from "@react-pdf/renderer";
import type { PracticePlan } from "../../types/plan";
import type { AppLocale } from "../locale/appLocale";
import { buildPracticePlan } from "../practicePlanGenerator";
import { registerPdfFonts } from "./fonts";
import { pdfLabelsForLocale } from "./pdfLabels";
import { PracticePlanPdfDocument } from "./PracticePlanPdfDocument";
import { TopicPdfDocument } from "./TopicPdfDocument";
import { topicCoachingFields, topicLabel, type TopicId } from "./topicCatalog";
import { drillsForTopic, sessionSystemForTopic } from "./topicDrillCatalog";

export async function renderPracticePlanPdfBuffer(plan: PracticePlan): Promise<Buffer> {
  registerPdfFonts();
  return Buffer.from(await renderToBuffer(<PracticePlanPdfDocument plan={plan} />));
}

export async function renderTopicPdfBuffer(topicId: TopicId, locale: AppLocale): Promise<Buffer> {
  registerPdfFonts();
  const fields = topicCoachingFields(topicId, locale);
  const plan = buildPracticePlan(fields);
  const catalog = drillsForTopic(topicId, locale);
  const system = sessionSystemForTopic(topicId, locale);
  const labels = pdfLabelsForLocale(locale);

  return Buffer.from(
    await renderToBuffer(
      <TopicPdfDocument
        topicTitle={topicLabel(topicId, locale)}
        locale={locale}
        dir={plan.dir}
        labels={labels}
        catalog={catalog}
        system={system}
        plan={plan}
      />,
    ),
  );
}
