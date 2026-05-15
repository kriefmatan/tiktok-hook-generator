# AGENTS.md — Basketball Practice Planner

Instructions for AI agents working in this repository. **Read [SYSTEM_PROMPT.md](./SYSTEM_PROMPT.md) first** — it is the permanent system context for product behavior, UI contract, and workflows.

---

<!-- BEGIN:nextjs-agent-rules -->
## Next.js 16

This is **not** the Next.js you know from training data. APIs, conventions, and file structure may differ.

Before writing or changing Next.js code: read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## What this app is

A **coach-first** web app: one question, quick multi-select chips and presets, then a printable-style **practice sheet** (warmup → drills → 5-on-5).

- **Stack:** Next.js 16 (App Router), React 19, Tailwind 4, TypeScript.
- **Deploy:** Vercel, connected to `main` on GitHub (`kriefmatan/tiktok-hook-generator`).
- **Domain doc:** [SYSTEM_STRUCTURE.md](./SYSTEM_STRUCTURE.md) (V1 scope and future vision).

---

## Permanent UI contract (do not break)

Documented in full in [SYSTEM_PROMPT.md](./SYSTEM_PROMPT.md#coach-first-home-ui-current--do-not-regress).

Summary:

1. **One** main input: *"What are you working on today?"*
2. **Quick chips** — 12 topics, multi-select.
3. **Presets** — Team / Youth / Advanced groups, multi-select cards.
4. **More** — collapsed advanced tags, multi-select.
5. **Build** — merges input via `buildWorkingOnText` → `/api/generate`.

Implementation lives in `app/components/PracticeForm.tsx` and `app/lib/locale/uiCatalog.ts`.

---

## Repository map

| Path | Role |
|------|------|
| `app/page.tsx` | Home: form state, API call, plan display |
| `app/components/PracticeForm.tsx` | Coach selection UI |
| `app/components/PracticePlan.tsx` | Practice sheet renderer |
| `app/api/generate/route.ts` | `POST` → `buildPracticePlan` |
| `app/lib/locale/uiCatalog.ts` | Chips, presets, tags, i18n labels |
| `app/lib/input/buildWorkingOnText.ts` | Combine coach input for API |
| `app/lib/practicePlanGenerator.ts` | Plan builder |
| `app/lib/coachTextAnalysis.ts` | Text → coaching themes |
| `app/lib/coachingFields.ts` | `{ locale, workingOn }` |
| `app/lib/locale/bundles/` | Locale drill copy (en, he, es) |
| `app/types/plan.ts` | `PracticePlan` types |

---

## Workflows

### Local dev

```bash
npm run dev
```

Open http://localhost:3000. If port 3000 is already used by this project, **do not** start a second dev server.

### Ship changes (default)

When the user requests deploy / push / publish:

```bash
git add .
git commit -m "changed practice data format"
git push
```

Details: [AUTOMATION.md](./AUTOMATION.md), [SYSTEM_PROMPT.md](./SYSTEM_PROMPT.md#development-and-deploy-workflow).

### Changing chips, presets, or tags

1. Edit `app/lib/locale/uiCatalog.ts` (IDs, order, labels, search terms).
2. Update `emphasisFromInput.ts` if emphasis keys are required.
3. Do not duplicate label strings in `PracticeForm.tsx`.

---

## Cursor rules in this repo

| Rule | Scope |
|------|--------|
| `.cursor/rules/system-prompt.mdc` | Always apply — points to `SYSTEM_PROMPT.md` |
| `.cursor/rules/coaching-domain.mdc` | `app/lib/**`, `app/types/**` — domain changes |
| `.cursor/rules/basketball-coach-agent.mdc` | Coaching lib, plans, PracticeForm/PracticePlan |

Global (all projects): `~/.cursor/rules/dev-deploy-workflow.mdc`, skill `~/.cursor/skills/dev-deploy-workflow/`.

---

## Basketball coach sub-agent (this repo)

**Basketball-only** — all coaching content on this site goes through project skills under `.cursor/skills/`:

| Role | Skill path |
|------|------------|
| Sub-agent entry + site workflow | `.cursor/skills/basketball-coach-agent/SKILL.md` |
| Full coaching intelligence (verbatim) | `.cursor/skills/basketball-coaching-intelligence/intelligence.md` |
| Practice flow / generator sequencing | `.cursor/skills/basketball-practice-planning/SKILL.md` |
| Drill copy + drill design | `.cursor/skills/basketball-drill-design/SKILL.md` |

Say **"תת-סוכן כדורסל"** or **"basketball sub-agent"** to force this path. Rule: `.cursor/rules/basketball-coach-agent.mdc` (auto when editing coaching files).

For parallel review, parent agent may use Task `generalPurpose` with the prompt template in `basketball-coach-agent/SKILL.md`.

---

## Skills to use when relevant

| Task | Skill |
|------|--------|
| **Any drill / plan / chip / preset / coaching copy** | `.cursor/skills/basketball-coach-agent/SKILL.md` (then intelligence + planning or drill-design) |
| Practice logic / types / pure functions | `~/.cursor/skills/domain-logic/SKILL.md` |
| RTL / Hebrew UI | `~/.cursor/skills/locale-rtl/SKILL.md` |
| Next.js 16 APIs | `~/.cursor/skills/next16-guardian/SKILL.md` |
| Form / sideline UI polish | `~/.cursor/skills/ui-design/SKILL.md` |
| API route contracts | `~/.cursor/skills/api-contract/SKILL.md` |

Read [SYSTEM_STRUCTURE.md](./SYSTEM_STRUCTURE.md) before changing generators or product scope.

---

## Commit and safety

- Use commit message `changed practice data format` for routine deploy commits unless the user specifies otherwise.
- Do not commit `.env`, `.env.local`, or credentials.
- Do not force-push `main`.
- Only create commits when the user asks to ship/deploy or explicitly requests a commit.
