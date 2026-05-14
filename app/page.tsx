"use client";

import { useState } from "react";
import { PracticePlanSheet } from "./components/PracticePlan";
import type { PracticePlan } from "./types/plan";

const ph = {
  team: `Describe your team's playing style, strengths, weaknesses, personality, pace, experience level, or anything important.`,
  hurting: `Describe the biggest current problems, struggles, bad habits, or situations happening in games.`,
  focus: `Describe what you want players to leave practice doing better.`,
  level: `Example: U14, high school varsity, adults`,
} as const;

export default function Home() {
  const [teamDescription, setTeamDescription] = useState("");
  const [hurtingMost, setHurtingMost] = useState("");
  const [practiceFocus, setPracticeFocus] = useState("");
  const [ageLevel, setAgeLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PracticePlan | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamDescription,
          hurtingMost,
          practiceFocus,
          ageLevel,
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
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Let’s plan practice</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
            Tell it like you would another coach on the phone — the more honest you are, the more useful the sheet
            on the right will be. Nothing here is a preset category; it’s just your words, turned into a practice
            you can actually run.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
          <div className="space-y-7 rounded-xl border border-zinc-800/90 bg-zinc-900/35 p-6 shadow-sm shadow-black/20">
            <div>
              <label htmlFor="team" className="block text-sm font-medium leading-snug text-zinc-200">
                How would you describe your team?
              </label>
              <textarea
                id="team"
                name="team"
                rows={4}
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder={ph.team}
                className="mt-2 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>

            <div>
              <label htmlFor="hurting" className="block text-sm font-medium leading-snug text-zinc-200">
                What is hurting your team the most right now?
              </label>
              <textarea
                id="hurting"
                name="hurting"
                rows={4}
                value={hurtingMost}
                onChange={(e) => setHurtingMost(e.target.value)}
                placeholder={ph.hurting}
                className="mt-2 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>

            <div>
              <label htmlFor="focus" className="block text-sm font-medium leading-snug text-zinc-200">
                What do you want to improve in this practice?
              </label>
              <textarea
                id="focus"
                name="focus"
                rows={3}
                value={practiceFocus}
                onChange={(e) => setPracticeFocus(e.target.value)}
                placeholder={ph.focus}
                className="mt-2 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium leading-snug text-zinc-200">
                Team age / level
              </label>
              <input
                id="level"
                name="level"
                type="text"
                value={ageLevel}
                onChange={(e) => setAgeLevel(e.target.value)}
                placeholder={ph.level}
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>

            <button
              type="button"
              onClick={generatePlan}
              disabled={loading}
              className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:opacity-50"
            >
              {loading ? "Putting it together…" : "Build the practice plan"}
            </button>
          </div>

          <section className="min-w-0">
            {!plan && (
              <div className="flex min-h-[280px] flex-col justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 px-6 py-12">
                <p className="text-sm leading-relaxed text-zinc-400">
                  When you’re ready, your practice sheet will show up here — same tone you used on the left, just
                  organized into warmup, skill work, team stuff, and the rest.
                </p>
              </div>
            )}
            {plan && <PracticePlanSheet plan={plan} />}
          </section>
        </div>
      </div>
    </main>
  );
}
