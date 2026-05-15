import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { PracticePlan } from "../../types/plan";
import type { AppLocale } from "../locale/appLocale";
import { pdfFontFamily } from "./fonts";
import type { PdfLabels } from "./pdfLabels";
import { PracticePlanPdfSections } from "./PracticePlanPdfSections";
import { pdfStyles } from "./pdfStyles";
import type { TopicDrillCatalog, TopicSessionSystem } from "./topicDrillCatalog";

type Props = {
  topicTitle: string;
  locale: AppLocale;
  dir: "ltr" | "rtl";
  labels: PdfLabels;
  catalog: TopicDrillCatalog;
  system: TopicSessionSystem;
  plan: PracticePlan;
};

const BLOCK_KINDS = ["warmup", "drill1", "drill2", "drill3", "game"] as const;

export function TopicPdfDocument({
  topicTitle,
  dir,
  labels,
  catalog,
  system,
  plan,
}: Props) {
  const fontFamily = pdfFontFamily(dir);

  return (
    <Document title={topicTitle}>
      <Page size="A4" style={[pdfStyles.page, { fontFamily }]} wrap>
        <Text style={[pdfStyles.coverTitle, { fontFamily }]}>{topicTitle}</Text>
        <Text style={[pdfStyles.coverSubtitle, { fontFamily }]}>{plan.totalTime}</Text>

        <Text style={[pdfStyles.partTitle, { fontFamily }]}>{labels.drillsSection}</Text>
        {catalog.emphasisDrills.map((group) => (
          <View key={group.emphasis} style={{ marginBottom: 10 }}>
            <Text style={[pdfStyles.emphasisHeading, { fontFamily }]}>
              {labels.themeFocus}: {group.emphasis}
            </Text>
            <Text style={[pdfStyles.hook, { fontFamily }]}>{group.setupHook}</Text>
            <Text style={[pdfStyles.listItem, { fontFamily }]}>
              • {group.themeBullets[0]}
            </Text>
            <Text style={[pdfStyles.listItem, { fontFamily }]}>
              • {group.themeBullets[1]}
            </Text>
            {group.blocks.map((block) => (
              <View key={`${group.emphasis}-${block.blockKind}`}>
                <Text style={[pdfStyles.blockLabel, { fontFamily }]}>{block.blockLabel}</Text>
                {block.drillNames.map((name, i) => (
                  <Text key={i} style={[pdfStyles.listItem, { fontFamily }]}>
                    – {name}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ))}

        <Text style={[pdfStyles.partTitle, { fontFamily }]}>{labels.systemSection}</Text>
        <Text style={[pdfStyles.hook, { fontFamily }]}>{system.setupHook}</Text>
        <Text style={[pdfStyles.sectionTitle, { fontFamily }]}>{labels.sessionStructure}</Text>
        {system.sectionLabels.map((label, i) => (
          <Text key={label} style={[pdfStyles.listItem, { fontFamily }]}>
            {i + 1}. {label}
          </Text>
        ))}
        <Text style={[pdfStyles.sectionTitle, { fontFamily }]}>{labels.blockReminders}</Text>
        {BLOCK_KINDS.map((kind, i) => {
          const [a, b] = system.blockFrames[kind];
          return (
            <View key={kind} style={{ marginBottom: 6 }}>
              <Text style={[pdfStyles.blockLabel, { fontFamily }]}>
                {system.sectionLabels[i]}
              </Text>
              <Text style={[pdfStyles.listItem, { fontFamily }]}>• {a}</Text>
              <Text style={[pdfStyles.listItem, { fontFamily }]}>• {b}</Text>
            </View>
          );
        })}

        <Text style={[pdfStyles.partTitle, { fontFamily }]}>{labels.practiceSection}</Text>
        <PracticePlanPdfSections plan={plan} />
      </Page>
    </Document>
  );
}
