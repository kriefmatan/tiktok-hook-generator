---
name: basketball-drill-design
description: >-
  Drill design and locale drill copy—objective, setup, execution, coaching
  points, progressions, competitive variations. Use when editing locale bundles,
  adding drills, or reviewing drill quality in en/he/es.
---

# Basketball Drill Design (site)

Read [basketball-coaching-intelligence/intelligence.md](../basketball-coaching-intelligence/intelligence.md) — sections **DRILL DESIGN INTELLIGENCE**, **OFFENSIVE KNOWLEDGE**, **DEFENSIVE KNOWLEDGE**, **COACH COMMUNICATION STYLE**.

## Files

- `app/lib/locale/bundles/en.ts`, `he.ts`, `es.ts` (and shared keys if split)
- Emphasis → drill pools in `practicePlanGenerator.ts` / related libs

## Every drill must answer

| Field | Coach question |
|-------|----------------|
| Objective | What skill or decision are we training? |
| Setup | How many players, where on court, what equipment? |
| Execution | What do they do, step by step? |
| Coaching points | What do you yell in 5 seconds? |
| Common mistakes | What breaks the drill? |
| Progression | Harder version or competitive twist |

## Design inputs

Account for: player count, court size, equipment, skill level, time, goal, limitations, offensive/defensive philosophy (from chips/presets/input).

## Voice

- Short imperatives: "closeout under control", "pass on penetration"
- Not: "participants should demonstrate appropriate closeout technique"

## Competitive layer

Add at least one of when fitting V1 copy length: scoring, timed reps, win/loss, consequence, or advantage start.

## i18n

- **he** — natural coach Hebrew; check RTL display in `PracticePlan.tsx` if strings grow
- **es** — same density as English; avoid expanding past printable sheet layout

Invoke **locale-rtl** for layout-only issues; this skill owns coaching meaning.
