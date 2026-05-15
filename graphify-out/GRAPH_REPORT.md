# Graph Report - .  (2026-05-15)

## Corpus Check
- Corpus is ~23,441 words - fits in a single context window. You may not need a graph.

## Summary
- 361 nodes · 571 edges · 28 communities (17 shown, 11 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

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
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `parseCoachFields()` - 16 edges
3. `AppLocale` - 15 edges
4. `buildPracticePlan()` - 11 edges
5. `PresetId` - 10 edges
6. `devDependencies` - 9 edges
7. `EmphasisKey` - 9 edges
8. `ChipId` - 9 edges
9. `dependencies` - 8 edges
10. `Permanent coach-first UI contract` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Input pipeline (buildWorkingOnText → CoachingFields → buildPracticePlan)` --semantically_similar_to--> `buildWorkingOnText → POST /api/generate`  [INFERRED] [semantically similar]
  SYSTEM_PROMPT.md → AGENTS.md
- `V1 flow: coach focus → AI practice → sideline` --semantically_similar_to--> `Core loop: focus → practice sheet → sideline`  [INFERRED] [semantically similar]
  SYSTEM_STRUCTURE.md → SYSTEM_PROMPT.md
- `Basketball-only sub-agent scope` --conceptually_related_to--> `V2 vision: team identity, roster, player missions`  [AMBIGUOUS]
  .cursor/skills/basketball-coach-agent/SKILL.md → SYSTEM_STRUCTURE.md
- `V2 vision: team identity, roster, player missions` --conceptually_related_to--> `Coach-first basketball practice planner (V1)`  [INFERRED]
  SYSTEM_STRUCTURE.md → AGENTS.md
- `Presets (Team / Youth / Advanced, multi-select)` --routes_to--> `Age adaptation (mini through adults)`  [INFERRED]
  AGENTS.md → .cursor/skills/basketball-coaching-intelligence/intelligence.md

## Hyperedges (group relationships)
- **Coach-first home UI contract** — agents_single_main_input, agents_quick_chips, agents_presets, agents_advanced_tags_more, agents_build_working_on_pipeline [EXTRACTED 1.00]
- **Basketball coaching skills delegation stack** — basketball_coach_agent_skill_document, basketball_coaching_intelligence_intelligence_document, basketball_practice_planning_skill_document, basketball_drill_design_skill_document [EXTRACTED 1.00]
- **Seven-phase practice flow** — basketball_coaching_intelligence_intelligence_practice_flow, basketball_practice_planning_skill_session_structure, basketball_coaching_intelligence_skill_quality_gate [INFERRED 0.85]
- **Three-Column Dashboard Layout** — public_hero_court_left_navigation_sidebar, public_hero_court_central_workspace, public_hero_court_right_widgets_column [EXTRACTED 1.00]
- **Training Preset Tier Groups (Team / Youth / Advanced)** — public_hero_court_preset_section_team, public_hero_court_preset_section_youth, public_hero_court_preset_section_advanced [EXTRACTED 1.00]
- **Coach Planning Workflow (Question → Chips → Presets → Build)** — public_hero_court_coach_input_what_working_today, public_hero_court_quick_topic_chips, public_hero_court_preset_section_team, public_hero_court_build_personalized_practice_cta [INFERRED 0.85]
- **Next.js Starter Template Icon Set** — public_file_document_icon, public_globe_world_icon, public_next_wordmark [INFERRED 0.85]
- **16×16 Gray UI Icon Pair (file + globe)** — public_file_document_icon, public_globe_world_icon, public_file_gray_fill, public_globe_gray_fill [EXTRACTED 1.00]
- **Next.js Default Public Folder Icons** — public_vercel_vercel_logo, public_window_browser_window_icon, public_nextjs_create_app_static_assets [INFERRED 0.85]

## Communities (28 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (48): Advanced tags (collapsed More, multi-select), Basketball coach sub-agent skills stack, buildWorkingOnText → POST /api/generate, Coach-first basketball practice planner (V1), Next.js 16 App Router + React 19 + Tailwind 4 + TypeScript, Permanent coach-first UI contract, PracticeForm.tsx, practicePlanGenerator.ts (+40 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (36): PracticeForm(), Props, stagger, buildWorkingOnText(), CHIP_EMPHASIS, PRESET_EMPHASIS, CoachingFields, localeText() (+28 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (30): DE_BULLETS, DE_SETUP_HOOKS, block(), drills(), EN_DRILL_NAMES, EN_SETUP_HOOKS, block(), drills() (+22 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (24): AppShell(), Props, AppSidebar(), NAV_ITEMS, Props, LanguageSelector(), Props, Props (+16 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (26): dependencies, framer-motion, franc, lucide-react, next, openai, react, react-dom (+18 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (27): AI Basketball Planner Dashboard Mockup, AI Search Bar with Sparkle Icon, Brand Logo (Orange Basketball Icon + AI BASKETBALL PLANNER), Build Personalized Practice CTA Button, Central Training Workspace, Coach-First Single-Question Practice Flow, Coach Input — What Are We Working On Today?, Coach Profile Card (מאמן ראשי) (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (17): SIMPLE_BUNDLES, emphasesFromSelections(), ParsedCoachThemes, BLOCK_ORDER, buildCoachingPoints(), buildPracticePlan(), clip(), coachSeed() (+9 more)

### Community 7 - "Community 7"
Cohesion: 0.1
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (17): hasBallMovement(), hasCommunication(), hasDecisionMaking(), hasRebounding(), hasShootingConfidence(), hasSpacing(), hasTransitionDefense(), hasTransitionOffense() (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.19
Nodes (13): Document File Icon (file.svg), Folded Page Corner, Gray Fill (#666), Horizontal Text Line Rows, Circular Clip Path Mask, Gray Fill (#666), Meridian and Parallel Grid, Globe World Icon (globe.svg) (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (5): CourtPoint, HalfCourtMovement, HalfCourtPass, HalfCourtPlayer, Props

### Community 11 - "Community 11"
Cohesion: 0.36
Nodes (8): Next.js Create-App Static Assets, Vercel Brand Identity, Vercel Logo (SVG), White Upward Triangle Mark, Browser Window Icon (SVG), External Link UI Metaphor, Window Control Dots (Three Dots), Window Frame and Title Bar

### Community 12 - "Community 12"
Cohesion: 0.4
Nodes (3): assistant, inter, metadata

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (3): hooks, stop, version

## Ambiguous Edges - Review These
- `V2 vision: team identity, roster, player missions` → `Basketball-only sub-agent scope`  [AMBIGUOUS]
  .cursor/skills/basketball-coach-agent/SKILL.md · relation: conceptually_related_to

## Knowledge Gaps
- **136 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+131 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `V2 vision: team identity, roster, player missions` and `Basketball-only sub-agent scope`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `EmphasisKey` connect `Community 2` to `Community 1`, `Community 6`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `parseCoachFields()` connect `Community 8` to `Community 6`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `PresetId` connect `Community 1` to `Community 3`, `Community 6`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _136 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._