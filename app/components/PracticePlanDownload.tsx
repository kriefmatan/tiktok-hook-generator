"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import type { AppLocale } from "../lib/locale/appLocale";
import { UI } from "../lib/locale/uiCatalog";
import { downloadPracticePlanPdf } from "../lib/pdf/clientDownload";
import type { PracticePlan } from "../types/plan";

type Props = {
  plan: PracticePlan;
  locale: AppLocale;
};

export function PracticePlanDownload({ plan, locale }: Props) {
  const ui = UI[locale];
  const [loading, setLoading] = useState(false);

  const onDownload = async () => {
    setLoading(true);
    try {
      await downloadPracticePlanPdf(plan);
    } catch {
      window.alert(ui.pdfDownloadFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void onDownload()}
      disabled={loading}
      className="mb-4 inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-zinc-900/80 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:border-accent/40 hover:text-white disabled:opacity-50"
    >
      <Download className="h-4 w-4" aria-hidden />
      {loading ? ui.downloadingPdf : ui.downloadPdf}
    </button>
  );
}
