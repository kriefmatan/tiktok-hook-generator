"use client";

import { useCallback, useMemo, useState } from "react";
import { PracticeForm } from "./components/PracticeForm";
import { PracticePlanSheet } from "./components/PracticePlan";
import { buildWorkingOnText } from "./lib/input/buildWorkingOnText";
import { detectCoachLocale } from "./lib/locale/detectCoachLocale";
import { HOME_UI } from "./lib/locale/homeUi";
import { LOCALE_DIR } from "./lib/locale/coachLocale";
import { toAppLocale } from "./lib/locale/toAppLocale";
import type { AdvancedTagId, ChipId, PresetId } from "./lib/locale/uiCatalog";
import type { PracticePlan } from "./types/plan";

function toggleInSet<T>(set: ReadonlySet<T>, id: T): Set<T> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export default function Home() {
  const [workingOn, setWorkingOn] = useState("");
  const [selectedChips, setSelectedChips] = useState<ReadonlySet<ChipId>>(() => new Set());
  const [selectedPresets, setSelectedPresets] = useState<ReadonlySet<PresetId>>(() => new Set());
  const [selectedAdvanced, setSelectedAdvanced] = useState<ReadonlySet<AdvancedTagId>>(() => new Set());
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PracticePlan | null>(null);

  const coachLocale = useMemo(() => detectCoachLocale(workingOn), [workingOn]);
  const appLocale = toAppLocale(coachLocale);
  const ui = HOME_UI[coachLocale];
  const formDir = LOCALE_DIR[coachLocale];

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
      appLocale,
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
        body: JSON.stringify({ locale: appLocale, workingOn: combined }),
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

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-lg px-4 py-8 sm:px-5 sm:py-10" dir={formDir} lang={coachLocale}>
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{ui.title}</h1>

        <div className="mt-6">
          <PracticeForm
            locale={appLocale}
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
      </div>

      {plan && (
        <div className="mx-auto max-w-3xl border-t border-zinc-900 px-4 pb-12 pt-8 sm:px-5" dir={plan.dir} lang={plan.locale}>
          <PracticePlanSheet plan={plan} />
        </div>
      )}
    </main>
  );
}
