# System prompt — Basketball Practice Planner (V1)

Permanent product and engineering context for this repository. Agents must treat this file as source of truth unless the user explicitly overrides it in the current message.

---

## Product

**Name:** Practice (basketball practice planner for coaches)

**Goal:** Help coaches build a realistic team practice quickly — not a CRM, not a long AI demo form.

**Production URL:** https://tiktok-hook-generator-lac.vercel.app

**Core loop (V1):** Coach picks focus → app builds structured practice sheet → coach runs it on the sideline.

Full vision and future scope: [SYSTEM_STRUCTURE.md](./SYSTEM_STRUCTURE.md).

---

## Coach-first home UI (current — do not regress)

The home page is a **single-screen, coach-first selection UI**. Keep it minimal: no gradients, no fancy animations, no full app redesign unless asked.

### Main input (only one)

- Label: **"What are you working on today?"**
- One `textarea` — **no second question field** (removed: "What should this practice focus on?" / "What do you want to improve?").

### Quick chips (multi-select)

Under the main input. Lightweight, mobile-friendly toggle chips:

Defense, Shooting, Transition, Ball Movement, Finishing, 1-on-1, Rebounding, Spacing, Press Break, Fast Break, Conditioning, Decision Making.

### Presets (multi-select, grouped cards)

**Team practice:** Defensive Practice, Shooting Practice, Fast Pace Practice, Game Prep, Fundamentals, Toughness Practice.

**Youth:** Beginner Practice, Fun Competitive Practice, No-Dribble Practice, Passing & Movement, Coordination & Footwork.

**Advanced:** Read & React, Pick & Roll, Help Defense, Rotations, Transition Defense.

### Optional advanced tags (collapsed "More")

Multi-select inside a `<details>` section:

Zone Offense, Zone Defense, Closeouts, Weak Hand Finishing, Full Court Pressure, Half Court Offense, Shell Drill Concepts, Skip Passes, Help Side, Boxing Out, Late Game Situations, Out of Bounds Plays, Communication, Pace Control.

### Build button

- Enabled when there is textarea text **or** any chip / preset / advanced tag selected.
- On submit: combine selections → `POST /api/generate` → render `PracticePlanSheet` below the form.

### Visual style

- Dark minimal UI: `bg-[#09090b]`, zinc borders, white primary button.
- Do **not** reintroduce the old full-red debug background unless explicitly requested for deploy verification.

---

## Architecture

```
app/page.tsx                    # State, locale detection, fetch plan
app/components/PracticeForm.tsx # Chips, presets, More, textarea, Build
app/components/PracticePlan.tsx # Sideline practice sheet output
app/api/generate/route.ts       # POST { locale, workingOn } → plan JSON

app/lib/locale/uiCatalog.ts     # Chip/preset/tag IDs, labels, search terms, groups
app/lib/input/buildWorkingOnText.ts  # Merges textarea + selections for API
app/lib/input/emphasisFromInput.ts   # Chip/preset → emphasis keys (future use)
app/lib/practicePlanGenerator.ts     # Deterministic plan from CoachingFields
app/lib/coachTextAnalysis.ts         # Parse free text → themes
app/lib/coachingFields.ts            # { locale, workingOn }
app/lib/locale/bundles/{en,he,es}.ts # Drill copy per locale
app/types/plan.ts                    # PracticePlan contract
```

### Input pipeline

1. User text + selected chips/presets/advanced tags.
2. `buildWorkingOnText(locale, workingOn, chips, presets, advancedTags)` → single string.
3. API: `CoachingFields { locale: 'en' | 'he', workingOn }`.
4. `buildPracticePlan(fields)` → `PracticePlan` (warmup, drill1–3, 5-on-5).

### Locale

- **Default UI language:** English (`en`).
- **Language picker** at top of page (`LanguageSelector`) — coach chooses explicitly; **do not** switch UI language from typed text alone.
- Supported UI + plan locales: `en`, `he`, `es`, `de` (`APP_LOCALES` in `app/lib/locale/appLocale.ts`).
- UI strings: `UI` in `uiCatalog.ts`; choice persisted in `localStorage` key `practice-ui-locale`.
- API and practice sheet use the **selected** locale from the picker.
- RTL: Hebrew only (`LOCALE_DIR`).

### Adding or changing chips / presets / tags

Edit **`app/lib/locale/uiCatalog.ts`** only (IDs, `CHIP_ORDER`, `PRESET_GROUPS`, `ADVANCED_TAG_ORDER`, labels, `CHIP_SEARCH_TERMS`, preset `searchTerms`). Then wire types in `emphasisFromInput.ts` if emphasis mapping is needed.

---

## Next.js

This repo uses **Next.js 16** with breaking differences from older versions.

Before changing routing, data fetching, or config: read `node_modules/next/dist/docs/` and heed deprecation notices.

---

## Development and deploy workflow

When the user asks to run dev, deploy, or ship changes — use **exactly**:

```bash
npm run dev          # background if 3000 free; skip duplicate server
git add .
git commit -m "changed practice data format"
git push
```

- Commit message is fixed unless the user gives a different one in the same request.
- Deploy: push to `main` on GitHub → Vercel auto-deploys.
- Never commit `.env`, `.env.local`, or secrets.
- See also [AUTOMATION.md](./AUTOMATION.md) and global `~/.cursor/rules/dev-deploy-workflow.mdc`.

---

## Agent constraints

| Do | Don't |
|----|--------|
| Keep coach-first UI fast and scannable | Turn home into a long form or CRM |
| Change copy/IDs in `uiCatalog.ts` | Hardcode chip labels in components |
| Preserve `PracticePlan` shape in `plan.ts` | Break API without versioning |
| Read `SYSTEM_STRUCTURE.md` for domain changes | Expand to full team/roster V2 in V1 PRs |
| Minimal diffs focused on the task | Drive-by refactors or markdown the user didn't ask for |

---

## Key files to read before editing

| Area | Files |
|------|--------|
| UI | `PracticeForm.tsx`, `page.tsx`, `uiCatalog.ts` |
| Plan generation | `practicePlanGenerator.ts`, `coachTextAnalysis.ts`, `coachingFields.ts` |
| API | `app/api/generate/route.ts` |
| Types | `app/types/plan.ts` |
| Domain scope | `SYSTEM_STRUCTURE.md` |
