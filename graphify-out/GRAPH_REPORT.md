# Graph Report - Choaching Basketball Season  (2026-05-15)

## Corpus Check
- 58 files · ~23,305 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 346 nodes · 510 edges · 32 communities (25 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `659592dc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `parseCoachFields()` - 16 edges
3. `AppLocale` - 15 edges
4. `buildPracticePlan()` - 10 edges
5. `AGENTS.md — Basketball Practice Planner` - 10 edges
6. `devDependencies` - 9 edges
7. `EmphasisKey` - 9 edges
8. `ChipId` - 9 edges
9. `PresetId` - 9 edges
10. `dependencies` - 8 edges

## Surprising Connections (you probably didn't know these)
- `buildPracticePlan()` --calls--> `parseCoachFields()`  [EXTRACTED]
  app/lib/practicePlanGenerator.ts → app/lib/coachTextAnalysis.ts
- `readStoredUiLocale()` --calls--> `isAppLocale()`  [EXTRACTED]
  app/lib/locale/uiLocaleStorage.ts → app/lib/locale/appLocale.ts
- `POST()` --calls--> `isAppLocale()`  [EXTRACTED]
  app/api/generate/route.ts → app/lib/locale/appLocale.ts
- `POST()` --calls--> `toAppLocale()`  [EXTRACTED]
  app/api/generate/route.ts → app/lib/locale/toAppLocale.ts
- `POST()` --calls--> `buildPracticePlan()`  [EXTRACTED]
  app/api/generate/route.ts → app/lib/practicePlanGenerator.ts

## Communities (32 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (33): PracticeForm(), Props, stagger, buildWorkingOnText(), CHIP_EMPHASIS, PRESET_EMPHASIS, CoachingFields, localeText() (+25 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (23): DE_BULLETS, DE_SETUP_HOOKS, block(), drills(), EN_DRILL_NAMES, EN_SETUP_HOOKS, block(), drills() (+15 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (26): dependencies, framer-motion, franc, lucide-react, next, openai, react, react-dom (+18 more)

### Community 3 - "Community 3"
Cohesion: 0.14
Nodes (17): Props, AppSidebar(), NAV_ITEMS, Props, LanguageSelector(), Props, Props, RightInsightsPanel() (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (19): SIMPLE_BUNDLES, asStringArray(), POST(), emphasesFromSelections(), ParsedCoachThemes, BLOCK_ORDER, buildCoachingPoints(), buildPracticePlan() (+11 more)

### Community 5 - "Community 5"
Cohesion: 0.1
Nodes (19): Adding or changing chips / presets / tags, Agent constraints, Architecture, Build button, Coach-first home UI (current — do not regress), code:block1 (app/page.tsx                    # State, locale detection, f), code:bash (npm run dev          # background if 3000 free; skip duplica), Development and deploy workflow (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.1
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.22
Nodes (17): hasBallMovement(), hasCommunication(), hasDecisionMaking(), hasRebounding(), hasShootingConfidence(), hasSpacing(), hasTransitionDefense(), hasTransitionOffense() (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (10): AppShell(), DrillKindMark(), KIND_LABEL, Props, PracticePlanSheet(), Props, readStoredUiLocale(), writeStoredUiLocale() (+2 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (15): AGENTS.md — Basketball Practice Planner, Basketball coach sub-agent (this repo), Changing chips, presets, or tags, code:bash (npm run dev), code:bash (git add .), Commit and safety, Cursor rules in this repo, Local dev (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (13): AI OUTPUT, Basketball Team Development System, Coach Creates Team, Core Goal, CORE LOOP, Player Missions, Roster Overview, Team Development Goals (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (3): CHIP_ICONS, IconProps, PRESET_ICONS

### Community 12 - "Community 12"
Cohesion: 0.22
Nodes (8): Basketball Coach Sub-Agent, code:block1 (subagent_type: generalPurpose), Delegate (not your job), Do not, Mandatory reads (in order), Task tool (parallel basketball review), Website update workflow, When you run

### Community 13 - "Community 13"
Cohesion: 0.22
Nodes (8): After implementation (auto-deploy), Checks before push, code:bash (npm run dev), code:bash (npm run deploy), code:powershell (& "$env:USERPROFILE\.cursor\scripts\dev-and-deploy.ps1" -Pro), Dev server, Development workflow, One-shot script (Windows)

### Community 14 - "Community 14"
Cohesion: 0.22
Nodes (5): CourtPoint, HalfCourtMovement, HalfCourtPass, HalfCourtPlayer, Props

### Community 15 - "Community 15"
Cohesion: 0.25
Nodes (7): Basketball Drill Design (site), Competitive layer, Design inputs, Every drill must answer, Files, i18n, Voice

### Community 16 - "Community 16"
Cohesion: 0.33
Nodes (5): Avoid in generated plans, Basketball Practice Planning (site), Generator rules (this repo), Sequencing checks, Session structure (always)

### Community 17 - "Community 17"
Cohesion: 0.4
Nodes (3): assistant, inter, metadata

### Community 18 - "Community 18"
Cohesion: 0.4
Nodes (4): Basketball Coaching Intelligence, Drill copy in the app, Quality gate, This repo

### Community 19 - "Community 19"
Cohesion: 0.4
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 20 - "Community 20"
Cohesion: 0.5
Nodes (3): hooks, stop, version

## Knowledge Gaps
- **159 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+154 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `EmphasisKey` connect `Community 1` to `Community 8`, `Community 0`, `Community 4`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `parseCoachFields()` connect `Community 7` to `Community 4`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `CoachLocale` connect `Community 1` to `Community 3`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _159 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._