import { Document, Page } from "@react-pdf/renderer";
import type { PracticePlan } from "../../types/plan";
import { pdfFontFamilyForLocale } from "./fonts";
import { PracticePlanPdfSections } from "./PracticePlanPdfSections";
import { pdfStyles } from "./pdfStyles";

type Props = {
  plan: PracticePlan;
};

export function PracticePlanPdfDocument({ plan }: Props) {
  const fontFamily = pdfFontFamilyForLocale(plan.locale);

  return (
    <Document title={plan.headerLine}>
      <Page size="A4" style={[pdfStyles.page, { fontFamily }]} wrap>
        <PracticePlanPdfSections plan={plan} />
      </Page>
    </Document>
  );
}
