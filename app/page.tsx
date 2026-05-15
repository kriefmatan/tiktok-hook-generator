"use client";

import { useCallback, useEffect, useState } from "react";
import { LanguageSelector } from "./components/LanguageSelector";
import { PracticeForm } from "./components/PracticeForm";
import { PracticePlanSheet } from "./components/PracticePlan";
import { buildWorkingOnText } from "./lib/input/buildWorkingOnText";
import type { AppLocale } from "./lib/locale/appLocale";
import { DEFAULT_APP_LOCALE, LOCALE_DIR } from "./lib/locale/appLocale";
import { readStoredUiLocale, writeStoredUiLocale } from "./lib/locale/uiLocaleStorage";
import { UI } from "./lib/locale/uiCatalog";
import type { AdvancedTagId, ChipId, PresetId } from "./lib/locale/uiCatalog";
import type { PracticePlan } from "./types/plan";

function toggleInSet<T>(set: ReadonlySet<T>, id: T): Set<T> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export default function Home() {
  const [uiLocale, setUiLocale] = useState<AppLocale>(DEFAULT_APP_LOCALE);
  const [localeReady, setLocaleReady] = useState(false);
  const [workingOn, setWorkingOn] = useState("");
  const [selectedChips, setSelectedChips] = useState<ReadonlySet<ChipId>>(() => new Set());
  const [selectedPresets, setSelectedPresets] = useState<ReadonlySet<PresetId>>(() => new Set());
  const [selectedAdvanced, setSelectedAdvanced] = useState<ReadonlySet<AdvancedTagId>>(() => new Set());
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PracticePlan | null>(null);

  useEffect(() => {
    const stored = readStoredUiLocale();
    if (stored) setUiLocale(stored);
    setLocaleReady(true);
  }, []);

  const onUiLocaleChange = useCallback((locale: AppLocale) => {
    setUiLocale(locale);
    writeStoredUiLocale(locale);
  }, []);

  const ui = UI[uiLocale];
  const formDir = LOCALE_DIR[uiLocale];

  const onToggleChip = useCallback((id: ChipId) => {
    setSelectedChips((prev) => toggleInSet(prev, id));
  }, []);

  const onTogglePreset = useCallback((id: PresetId) => {
    setSelectedPresets((prev) => toggleInSet(prev, id));
  }, []);

  const onToggleAdvanced = useCallback((id: AdvancedTagId) => {
    setSelectedAdvanced((prev) => toggleInSet(prev, id));
  }, []);

  const generatePlan = async () => {
    const combined = buildWorkingOnText(
      uiLocale,
      workingOn,
      [...selectedChips],
      [...selectedPresets],
      [...selectedAdvanced],
    );
    if (!combined) return;

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: uiLocale, workingOn: combined }),
      });

      const data = (await response.json()) as { plan?: PracticePlan; error?: string };

      if (!response.ok || !data.plan) {
        console.error("Practice plan request failed:", data.error ?? response.status);
        return;
      }

      setPlan(data.plan);
    } catch (err) {
      console.error("Practice plan request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!localeReady) {
    return <main className="min-h-screen bg-[#09090b]" />;
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-lg px-4 py-8 sm:px-5 sm:py-10" dir={formDir} lang={uiLocale}>
        <header className="mb-6 flex items-start justify-between gap-4">
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{ui.title}</h1>
          <LanguageSelector locale={uiLocale} onChange={onUiLocaleChange} />
        </header>

        <PracticeForm
          locale={uiLocale}
          workingOn={workingOn}
          onWorkingOnChange={setWorkingOn}
          selectedChips={selectedChips}
          onToggleChip={onToggleChip}
          selectedPresets={selectedPresets}
          onTogglePreset={onTogglePreset}
          selectedAdvanced={selectedAdvanced}
          onToggleAdvanced={onToggleAdvanced}
          loading={loading}
          onBuild={generatePlan}
        />
      </div>

      {plan && (
        <div className="mx-auto max-w-3xl border-t border-zinc-900 px-4 pb-12 pt-8 sm:px-5" dir={plan.dir} lang={plan.locale}>
          <PracticePlanSheet plan={plan} />
        </div>
      )}
    </main>
  );
}
