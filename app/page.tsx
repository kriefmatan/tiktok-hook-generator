"use client";

import { useState } from "react";
import { WeeklyTeamPlan } from "./components/WeeklyTeamPlan";
import type { WeeklyPlan } from "./types/plan";

export default function Home() {
  const [offense, setOffense] = useState("");
  const [defense, setDefense] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);

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
      setPlan(data.plan as WeeklyPlan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <header className="mb-10 border-b border-zinc-800/80 pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-500/90">
            Coaching workspace
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Basketball Team AI</h1>
          <p className="mt-3 max-w-xl text-sm text-zinc-400">
            Configure identity inputs, then generate a structured weekly development board for your staff and
            players.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
          <aside className="space-y-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/25 p-6 backdrop-blur-sm">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Offensive style</h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Fast Pace", "Motion Offense", "Pick & Roll", "5-Out"].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setOffense(style)}
                    className={`rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                      offense === style
                        ? "bg-amber-500 text-black ring-2 ring-amber-400/50"
                        : "bg-zinc-900 text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Defensive style</h2>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {["Pressure Defense", "Switching", "Zone Defense", "Aggressive Defense"].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setDefense(style)}
                    className={`rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                      defense === style
                        ? "bg-amber-500 text-black ring-2 ring-amber-400/50"
                        : "bg-zinc-900 text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Team problems</h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Turnovers", "Rebounding", "Communication", "Transition Defense"].map((problem) => (
                  <button
                    key={problem}
                    type="button"
                    onClick={() => toggleProblem(problem)}
                    className={`rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                      problems.includes(problem)
                        ? "bg-white text-black ring-2 ring-zinc-300"
                        : "bg-zinc-900 text-zinc-200 ring-1 ring-zinc-800 hover:bg-zinc-800"
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
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3.5 text-sm font-bold text-black shadow-lg shadow-orange-900/30 transition hover:from-amber-400 hover:to-orange-500 disabled:opacity-60"
            >
              {loading ? "Building plan…" : "Generate weekly plan"}
            </button>
          </aside>

          <section className="min-w-0">
            {!plan && (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 px-6 py-16 text-center">
                <p className="text-sm font-medium text-zinc-300">Weekly development board</p>
                <p className="mt-2 max-w-sm text-xs text-zinc-500">
                  Select styles and problems, then generate. Your plan appears here as a full coaching dashboard —
                  not plain text.
                </p>
              </div>
            )}
            {plan && <WeeklyTeamPlan plan={plan} />}
          </section>
        </div>
      </div>
    </main>
  );
}
