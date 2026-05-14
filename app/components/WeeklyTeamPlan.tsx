import type { ReactNode } from "react";
import type { WeeklyPlan } from "../types/plan";

type Props = {
  plan: WeeklyPlan;
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500/90">
      {children}
    </p>
  );
}

export function WeeklyTeamPlan({ plan }: Props) {
  const { weeklyTeamIdentity, mainFocus, practiceGoals, playerMissions, teamCultureEmphasis, progression } =
    plan;

  return (
    <div className="mt-12 space-y-6 font-sans">
      {/* Identity hero */}
      <article className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-8 shadow-2xl shadow-black/50">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(245,158,11,0.4) 47px, rgba(245,158,11,0.4) 48px)`,
          }}
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4 max-w-2xl">
            <SectionLabel>Weekly team identity</SectionLabel>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {weeklyTeamIdentity.teamName}
              </h2>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
                {weeklyTeamIdentity.weekLabel}
              </span>
            </div>
            <p className="text-lg font-medium text-amber-100/90">{weeklyTeamIdentity.tagline}</p>
            <p className="text-sm leading-relaxed text-zinc-400">{weeklyTeamIdentity.identitySummary}</p>
          </div>
          <div className="hidden h-28 w-px shrink-0 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent lg:block" />
          <div className="flex gap-4 lg:flex-col lg:items-end">
            <div className="rounded-xl border border-zinc-700/60 bg-black/30 px-4 py-3 text-right">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Session mode</p>
              <p className="text-sm font-semibold text-zinc-200">Competitive blocks</p>
            </div>
            <div className="rounded-xl border border-zinc-700/60 bg-black/30 px-4 py-3 text-right">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Film</p>
              <p className="text-sm font-semibold text-zinc-200">2 clips / player</p>
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main focus */}
        <article className="lg:col-span-7 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm">
          <SectionLabel>Main focus of the week</SectionLabel>
          <h3 className="mt-3 text-xl font-semibold text-white">Primary objective</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">{mainFocus}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-md bg-orange-500/15 px-2.5 py-1 text-xs font-medium text-orange-200 ring-1 ring-orange-500/25">
              Practice priority
            </span>
            <span className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400 ring-1 ring-zinc-700">
              Measurable outcomes
            </span>
          </div>
        </article>

        {/* Team culture */}
        <article className="lg:col-span-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm">
          <SectionLabel>Team culture emphasis</SectionLabel>
          <h3 className="mt-3 text-xl font-semibold text-white">How we operate</h3>
          <ul className="mt-5 space-y-3">
            {teamCultureEmphasis.map((line, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-zinc-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* Practice goals */}
      <div>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <SectionLabel>Practice goals</SectionLabel>
            <h3 className="mt-1 text-lg font-semibold text-white">Three targets for the week</h3>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {practiceGoals.map((goal, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/80 to-black/40 p-5 transition-colors hover:border-amber-500/25"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 text-sm font-bold text-amber-400 ring-1 ring-amber-500/30">
                  {i + 1}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Goal</span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-200">{goal}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Player missions */}
      <div>
        <SectionLabel>Individual player missions</SectionLabel>
        <h3 className="mt-1 mb-4 text-lg font-semibold text-white">Assignments by role</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {playerMissions.map((row, i) => (
            <article
              key={i}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-white">{row.role}</span>
                <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-amber-200/90 ring-1 ring-zinc-700">
                  Mission
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">{row.mission}</p>
              <div className="mt-4 border-t border-zinc-800 pt-3">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">Track</p>
                <p className="text-xs font-medium text-zinc-400">{row.metric}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Progression */}
      <article className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-6 backdrop-blur-sm">
        <SectionLabel>Progression</SectionLabel>
        <h3 className="mt-1 text-lg font-semibold text-white">Weekly build sequence</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {progression.map((step, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-zinc-800 bg-black/25 p-4"
            >
              {i < progression.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-amber-500/50 to-transparent lg:block" />
              )}
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/80">Phase {i + 1}</p>
              <p className="mt-2 text-sm font-semibold text-white">{step.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">{step.detail}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
