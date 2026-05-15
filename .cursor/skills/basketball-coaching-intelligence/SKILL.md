---
name: basketball-coaching-intelligence
description: >-
  Elite basketball coaching intelligence for real practices—planning, drill
  design, age adaptation, offense/defense teaching, coach voice, competitive
  training. Use for any drill copy, practice plans, chips/presets, generators,
  or coaching content in this repo; read before changing locale bundles or
  practicePlanGenerator.
---

# Basketball Coaching Intelligence

Read [intelligence.md](intelligence.md) in full and apply it to every coaching decision in this repository.

## This repo

| Area | Paths |
|------|--------|
| Plan builder | `app/lib/practicePlanGenerator.ts` |
| Text → themes | `app/lib/coachTextAnalysis.ts`, `app/lib/emphasisFromInput.ts` |
| Coach UI labels | `app/lib/locale/uiCatalog.ts` |
| Drill copy | `app/lib/locale/bundles/` (en, he, es) |
| Types | `app/types/plan.ts` |
| Product scope | `SYSTEM_STRUCTURE.md` |

## Drill copy in the app

When writing or editing drill strings in bundles, each drill block should reflect (concise, coach voice):

- **Objective** — one line
- **Setup** — players, space, equipment
- **Execution** — what happens
- **Coaching points** — 2–4 bullets max
- **Common mistakes** — optional, short
- **Progression / competitive twist** — when space allows

Match the locale: Hebrew = sideline Hebrew, not literal translation of English fluff.

## Quality gate

Before finishing a coaching-content change, confirm:

- [ ] Practice flow makes sense (warmup → teach → reps → compete → game-like)
- [ ] Age level is implied or explicit (youth presets vs advanced)
- [ ] No dead time / long lines in described drills
- [ ] WHY / HOW / WHAT transfer to games is clear
- [ ] Copy sounds like a coach, not generic AI
- [ ] `SYSTEM_PROMPT.md` UI contract unchanged unless user asked

Pair code changes with **domain-logic** (`~/.cursor/skills/domain-logic/SKILL.md`) for types and pure functions.
