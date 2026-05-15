"use client";

import { useMemo, useState } from "react";
import { PracticePlanSheet } from "./components/PracticePlan";
import type { PracticePlan } from "./types/plan";
import { detectCoachLocale } from "./lib/locale/detectCoachLocale";
import { HOME_UI } from "./lib/locale/homeUi";
import { LOCALE_DIR } from "./lib/locale/coachLocale";

export default function Home() {
  const [sessionFocus, setSessionFocus] = useState("");
  const [wantToImprove, setWantToImprove] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PracticePlan | null>(null);

  const inputLocale = useMemo(
    () => detectCoachLocale({ sessionFocus, wantToImprove }),
    [sessionFocus, wantToImprove]
  );

  const ui = HOME_UI[inputLocale];
  const formDir = LOCALE_DIR[inputLocale];

  const generatePlan = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionFocus, wantToImprove }),
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
      <div className="mx-auto max-w-lg px-4 py-8 sm:px-5 sm:py-10" dir={formDir} lang={inputLocale}>
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{ui.title}</h1>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-zinc-400">{ui.labelFocus}</span>
            <textarea
              name="sessionFocus"
              rows={2}
              value={sessionFocus}
              onChange={(e) => setSessionFocus(e.target.value)}
              className="mt-1.5 w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-[15px] leading-snug text-zinc-100 placeholder:text-zinc-700 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-400">{ui.labelImprove}</span>
            <textarea
              name="wantToImprove"
              rows={2}
              value={wantToImprove}
              onChange={(e) => setWantToImprove(e.target.value)}
              className="mt-1.5 w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-[15px] leading-snug text-zinc-100 placeholder:text-zinc-700 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </label>

          <button
            type="button"
            onClick={generatePlan}
            disabled={loading}
            className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:opacity-50"
          >
            {loading ? ui.building : ui.buildButton}
          </button>
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
