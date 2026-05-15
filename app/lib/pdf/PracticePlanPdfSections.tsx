import { Text, View } from "@react-pdf/renderer";
import type { PracticePlan, PracticeSheetSection } from "../../types/plan";
import { pdfFontFamily } from "./fonts";
import { pdfStyles } from "./pdfStyles";

type Props = {
  plan: PracticePlan;
};

function PlanDrillCard({
  sectionLabel,
  section,
  fontFamily,
}: {
  sectionLabel: string;
  section: PracticeSheetSection;
  fontFamily: string;
}) {
  return (
    <View style={pdfStyles.card}>
      <View style={pdfStyles.cardHeader}>
        <Text style={[pdfStyles.cardLabel, { fontFamily }]}>{sectionLabel}</Text>
        <Text style={[pdfStyles.cardMinutes, { fontFamily }]}>{section.minutes}</Text>
      </View>
      <Text style={[pdfStyles.drillName, { fontFamily }]}>{section.name}</Text>
      {section.coachingPoints.map((pt, i) => (
        <Text key={i} style={[pdfStyles.bullet, { fontFamily }]}>
          • {pt}
        </Text>
      ))}
    </View>
  );
}

export function PracticePlanPdfSections({ plan }: Props) {
  const fontFamily = pdfFontFamily(plan.dir);
  const sections: PracticeSheetSection[] = [
    plan.warmup,
    plan.drill1,
    plan.drill2,
    plan.drill3,
    plan.gameFiveOnFive,
  ];

  return (
    <>
      <View style={{ marginBottom: 12 }}>
        <Text style={[pdfStyles.coverTitle, { fontFamily }]}>{plan.headerLine}</Text>
        <Text style={[pdfStyles.coverSubtitle, { fontFamily }]}>{plan.totalTime}</Text>
      </View>
      {plan.sectionLabels.map((label, i) => (
        <PlanDrillCard
          key={`${label}-${i}`}
          sectionLabel={label}
          section={sections[i]!}
          fontFamily={fontFamily}
        />
      ))}
    </>
  );
}
