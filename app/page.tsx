"use client";

import { useState } from "react";
import { PracticePlanSheet } from "./components/PracticePlan";
import type { PracticePlan } from "./types/plan";

export default function Home() {
  const [offense, setOffense] = useState("");
  const [defense, setDefense] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PracticePlan | null>(null);

  const toggleProblem = (problem: string) => {
    if (problems.includes(problem)) {
      setProblems(problems.filter((p) => p !== problem));
    } else {
      setProblems([...problems, problem]);
    }
  };

  const generatePlan = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offense,
          defense,
          problems,
        }),
      });
      const data = await response.json();
      setPlan(data.plan as PracticePlan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <header className="mb-10 border-b border-zinc-800 pb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Practice plan</h1>
          <p className="mt-2 max-w-lg text-sm text-zinc-400">
            Pick your offensive style, defensive style, and what you need to fix. Generate a one-page practice you
            can run tonight.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:items-start">
          <aside className="space-y-8 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Offense</h2>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["Fast Pace", "Motion Offense", "Pick & Roll", "5-Out"].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setOffense(style)}
                    className={`rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      offense === style
                        ? "bg-white text-black"
                        : "bg-zinc-950 text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Defense</h2>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {["Pressure Defense", "Switching", "Zone Defense", "Aggressive Defense"].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setDefense(style)}
                    className={`rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      defense === style
                        ? "bg-white text-black"
                        : "bg-zinc-950 text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Problems to hit</h2>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["Turnovers", "Rebounding", "Communication", "Transition Defense"].map((problem) => (
                  <button
                    key={problem}
                    type="button"
                    onClick={() => toggleProblem(problem)}
                    className={`rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      problems.includes(problem)
                        ? "bg-zinc-200 text-black"
                        : "bg-zinc-950 text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800"
                    }`}
                  >
                    {problem}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={generatePlan}
              disabled={loading}
              className="w-full rounded-md bg-white py-3 text-sm font-semibold text-black disabled:opacity-50"
            >
              {loading ? "Generating…" : "Generate practice plan"}
            </button>
          </aside>

          <section className="min-w-0">
            {!plan && (
              <div className="flex min-h-[280px] flex-col justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-950/50 px-6 py-12">
                <p className="text-sm text-zinc-400">Generated practice sheet appears here.</p>
              </div>
            )}
            {plan && <PracticePlanSheet plan={plan} />}
          </section>
        </div>
      </div>
    </main>
  );
}
