---
name: basketball-practice-planning
description: >-
  Practice plan structure and sequencing for the practice planner app—warmup
  through 5-on-5, tempo, touches, age fit. Use when editing
  practicePlanGenerator, plan sections, emphasis routing, or full-session flow.
---

# Basketball Practice Planning (site)

Read [basketball-coaching-intelligence/intelligence.md](../basketball-coaching-intelligence/intelligence.md) — sections **PRACTICE FLOW INTELLIGENCE**, **COMPETITIVE TRAINING**, **AGE ADAPTATION**.

## Generator rules (this repo)

- Output shape: `app/types/plan.ts` (`PracticePlan` — warmup, drills, fiveOnFive).
- Builder: `app/lib/practicePlanGenerator.ts`.
- Input themes: `coachTextAnalysis.ts`, `emphasisFromInput.ts`, `buildWorkingOnText.ts`.

## Session structure (always)

1. Activation / warmup — short, movement, ball touches
2. Skill teaching — one clear theme from coach input
3. Guided repetition — constrained, high reps
4. Competitive execution — score or consequence
5. Game-like — small-sided or scripted advantage
6. Conditioning — embedded, not standing in lines
7. Cooldown or review — optional in V1 if time box allows

## Sequencing checks

- [ ] Earlier blocks teach; later blocks test under pressure
- [ ] Total plan fits realistic club practice length
- [ ] Youth presets → shorter explanations, more games, fewer sets
- [ ] Advanced presets → game speed, decision density, competitive layers
- [ ] 5-on-5 reinforces the day's emphasis, not unrelated scrimmage

## Avoid in generated plans

- Three unrelated themes with no thread
- Back-to-back low-rep demonstration drills
- 5-on-5 with no coaching hook from the day's focus
