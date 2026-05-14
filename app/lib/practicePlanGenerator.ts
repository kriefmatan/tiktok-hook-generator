import type { PracticeBlockDiagram, PracticePlan, PracticeSheetSection } from "../types/plan";
import type { CoachingFields } from "./coachingFields";
import type { EmphasisKey, SimplePracticeBundle } from "./locale/coachBundle.types";
import { SIMPLE_BUNDLES } from "./locale/bundles";
import { detectCoachLocale } from "./locale/detectCoachLocale";
import { parseCoachFields, type ParsedCoachThemes } from "./coachTextAnalysis";

export type { CoachingFields } from "./coachingFields";

function clip(s: string, max: number): string {
  const t = s.trim();
  if (!t) return "";
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

function tailClip(s: string, max: number): string {
  const t = s.trim();
  if (!t) return "";
  if (t.length <= max) return t;
  return `…${t.slice(-(max - 1))}`;
}

function coachSeed(f: CoachingFields): number {
  return hashString(`${f.sessionFocus}\n${f.wantToImprove}`);
}

function dominantEmphasis(p: ParsedCoachThemes): EmphasisKey {
  if (p.rebounding) return "rebound";
  if (p.shootingConfidence) return "shoot";
  if (p.turnovers) return "turnover";
  if (p.defense === "zone") return "zone";
  if (p.offense === "pick") return "pnr";
  if (p.transition) return "transition";
  return "generic";
}

function coachingPair(block: number, p: ParsedCoachThemes, b: SimplePracticeBundle): readonly [string, string] {
  const d = dominantEmphasis(p);
  const base = b.bullets[d];
  const gen = b.bullets.generic;
  const pairs: readonly (readonly [string, string])[] = [
    [base[0], base[1]],
    [base[0], gen[1]],
    [gen[0], base[1]],
    [base[0], base[1]],
    [gen[0], gen[1]],
  ];
  return pairs[block % pairs.length]!;
}

function goalWarmup(f: CoachingFields): string {
  const x = f.sessionFocus.trim();
  const y = f.wantToImprove.trim();
  return clip(x || y, 110);
}

function goalDrill1(f: CoachingFields): string {
  const x = f.sessionFocus.trim();
  const y = f.wantToImprove.trim();
  return clip(y || x, 110);
}

function goalDrill2(f: CoachingFields, h: number): string {
  const x = f.sessionFocus.trim();
  const y = f.wantToImprove.trim();
  if (x && y) {
    const lead = h % 2 === 0 ? x : y;
    const follow = h % 2 === 0 ? y : x;
    return clip(`${clip(lead, 52)} — ${clip(follow, 52)}`, 120);
  }
  return clip(x || y, 110);
}

function goalDrill3(f: CoachingFields): string {
  const x = f.sessionFocus.trim();
  const y = f.wantToImprove.trim();
  const long = x.length >= y.length ? x : y;
  const short = x.length >= y.length ? y : x;
  if (long.length > 90 && short) return clip(`${tailClip(long, 85)} (${clip(short, 40)})`, 130);
  return clip(long || short, 120);
}

function goalGame(f: CoachingFields): string {
  const x = f.sessionFocus.trim();
  const y = f.wantToImprove.trim();
  if (x && y) return clip(`${clip(x, 58)} → ${clip(y, 58)}`, 130);
  return clip(x || y, 120);
}

function headerLine(f: CoachingFields, b: SimplePracticeBundle): string {
  const a = clip(f.sessionFocus, 52);
  const c = clip(f.wantToImprove, 52);
  if (a && c) return `${a} · ${c}`;
  return a || c || b.headerFallback;
}

function pickTitle(arr: readonly string[], seed: number, salt: number): string {
  return arr[(seed + salt) % arr.length]!;
}

function d(
  players: PracticeBlockDiagram["players"],
  movements: PracticeBlockDiagram["movements"],
  passes: PracticeBlockDiagram["passes"],
  caption: string
): PracticeBlockDiagram {
  return { players, movements, passes, caption };
}

function diagLines(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 16, y: 30, side: "offense", label: "1" },
      { x: 84, y: 30, side: "offense", label: "2" },
    ],
    [
      { from: { x: 16, y: 30 }, to: { x: 16, y: 88 } },
      { from: { x: 84, y: 30 }, to: { x: 84, y: 88 } },
    ],
    [{ from: { x: 16, y: 30 }, to: { x: 84, y: 30 } }],
    b.captions.lines
  );
}

function diagShootSpots(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 22, y: 42, side: "offense", label: "S" },
      { x: 50, y: 26, side: "offense", label: "S" },
      { x: 78, y: 42, side: "offense", label: "S" },
    ],
    [],
    [],
    b.captions.shooting
  );
}

function diagPassTri(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 24, y: 36, side: "offense", label: "1" },
      { x: 76, y: 36, side: "offense", label: "2" },
      { x: 50, y: 52, side: "offense", label: "3" },
      { x: 50, y: 72, side: "defense", label: "D" },
    ],
    [],
    [
      { from: { x: 24, y: 36 }, to: { x: 50, y: 52 } },
      { from: { x: 76, y: 36 }, to: { x: 50, y: 52 } },
    ],
    b.captions.passTriangle
  );
}

function diagMotion(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 22, side: "offense", label: "1" },
      { x: 20, y: 46, side: "offense", label: "2" },
      { x: 80, y: 46, side: "offense", label: "3" },
      { x: 50, y: 58, side: "defense", label: "X" },
    ],
    [{ from: { x: 20, y: 46 }, to: { x: 32, y: 70 } }],
    [
      { from: { x: 50, y: 22 }, to: { x: 20, y: 46 } },
      { from: { x: 20, y: 46 }, to: { x: 80, y: 46 } },
    ],
    b.captions.motion
  );
}

function diagPnr(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 28, y: 44, side: "offense", label: "1" },
      { x: 44, y: 76, side: "offense", label: "5" },
      { x: 76, y: 36, side: "offense", label: "3" },
      { x: 34, y: 50, side: "defense", label: "H" },
      { x: 52, y: 74, side: "defense", label: "X" },
    ],
    [
      { from: { x: 28, y: 44 }, to: { x: 36, y: 64 } },
      { from: { x: 44, y: 76 }, to: { x: 56, y: 90 } },
    ],
    [{ from: { x: 28, y: 44 }, to: { x: 76, y: 36 } }],
    b.captions.pnr
  );
}

function diagRebound(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 36, y: 70, side: "offense", label: "O" },
      { x: 64, y: 70, side: "offense", label: "O" },
      { x: 50, y: 88, side: "defense", label: "X" },
    ],
    [
      { from: { x: 36, y: 70 }, to: { x: 44, y: 84 } },
      { from: { x: 64, y: 70 }, to: { x: 56, y: 84 } },
    ],
    [],
    b.captions.rebound
  );
}

function diagShell(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 22, y: 40, side: "offense", label: "1" },
      { x: 10, y: 88, side: "offense", label: "2" },
      { x: 52, y: 22, side: "offense", label: "3" },
      { x: 30, y: 48, side: "defense", label: "X" },
      { x: 48, y: 58, side: "defense", label: "X" },
      { x: 56, y: 78, side: "defense", label: "X" },
    ],
    [{ from: { x: 22, y: 40 }, to: { x: 36, y: 84 } }],
    [{ from: { x: 22, y: 40 }, to: { x: 52, y: 22 } }],
    b.captions.shell
  );
}

function diagZone(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 26, side: "offense", label: "1" },
      { x: 18, y: 44, side: "offense", label: "4" },
      { x: 82, y: 44, side: "offense", label: "3" },
      { x: 32, y: 82, side: "offense", label: "2" },
      { x: 50, y: 54, side: "defense", label: "M" },
      { x: 26, y: 70, side: "defense", label: "B" },
      { x: 74, y: 70, side: "defense", label: "B" },
    ],
    [{ from: { x: 32, y: 82 }, to: { x: 44, y: 64 } }],
    [
      { from: { x: 50, y: 26 }, to: { x: 18, y: 44 } },
      { from: { x: 18, y: 44 }, to: { x: 82, y: 44 } },
    ],
    b.captions.zone
  );
}

function diagTransition(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 28, y: 38, side: "offense", label: "1" },
      { x: 72, y: 34, side: "offense", label: "2" },
      { x: 50, y: 20, side: "offense", label: "3" },
      { x: 36, y: 52, side: "defense", label: "X" },
      { x: 54, y: 54, side: "defense", label: "X" },
    ],
    [
      { from: { x: 36, y: 52 }, to: { x: 24, y: 30 } },
      { from: { x: 54, y: 54 }, to: { x: 50, y: 28 } },
    ],
    [],
    b.captions.transition
  );
}

function diagFive(b: SimplePracticeBundle): PracticeBlockDiagram {
  return d(
    [
      { x: 18, y: 36, side: "offense", label: "1" },
      { x: 50, y: 18, side: "offense", label: "2" },
      { x: 82, y: 36, side: "offense", label: "3" },
      { x: 32, y: 54, side: "defense", label: "X" },
      { x: 50, y: 58, side: "defense", label: "X" },
      { x: 68, y: 54, side: "defense", label: "X" },
    ],
    [{ from: { x: 50, y: 18 }, to: { x: 50, y: 46 } }],
    [
      { from: { x: 18, y: 36 }, to: { x: 50, y: 18 } },
      { from: { x: 50, y: 18 }, to: { x: 82, y: 36 } },
    ],
    b.captions.five
  );
}

type DiagramFn = (b: SimplePracticeBundle) => PracticeBlockDiagram;

function warmupDiagram(p: ParsedCoachThemes, h: number): DiagramFn {
  const pool: DiagramFn[] = [diagLines, diagShootSpots, diagPassTri, diagMotion];
  if (p.rebounding) pool.unshift(diagRebound);
  if (p.shootingConfidence) pool.unshift(diagShootSpots);
  return pool[h % pool.length]!;
}

function drillDiagram(block: number, p: ParsedCoachThemes, h: number): DiagramFn {
  const bias: DiagramFn[] = [];
  if (p.offense === "pick") bias.push(diagPnr);
  if (p.rebounding) bias.push(diagRebound);
  if (p.defense === "zone") bias.push(diagZone);
  if (p.transition) bias.push(diagTransition);
  bias.push(diagShell, diagPnr, diagPassTri, diagShootSpots, diagRebound);
  const idx = (h + block * 7) % bias.length;
  return bias[idx]!;
}

function section(
  b: SimplePracticeBundle,
  minutes: number,
  name: string,
  goal: string,
  points: readonly [string, string],
  diagram: PracticeBlockDiagram
): PracticeSheetSection {
  return {
    name,
    time: b.formatMinutes(minutes),
    goal: clip(goal, 200),
    coachingPoints: points,
    diagram,
  };
}

export function buildPracticePlan(fields: CoachingFields): PracticePlan {
  const locale = detectCoachLocale(fields);
  const bundle = SIMPLE_BUNDLES[locale];
  const parsed = parseCoachFields(fields);
  const h = coachSeed(fields);

  const w = warmupDiagram(parsed, h);
  const d1 = drillDiagram(1, parsed, h);
  const d2 = drillDiagram(2, parsed, h ^ 31);
  const d3 = drillDiagram(3, parsed, h ^ 17);

  const minutes = [6, 10, 10, 10, 14] as const;

  return {
    headerLine: headerLine(fields, bundle),
    totalTime: bundle.totalTime,
    locale: bundle.locale,
    dir: bundle.dir,
    sectionLabels: bundle.sectionLabels,
    warmup: section(
      bundle,
      minutes[0],
      pickTitle(bundle.titlesWarmup, h, 0),
      goalWarmup(fields),
      coachingPair(0, parsed, bundle),
      w(bundle)
    ),
    drill1: section(
      bundle,
      minutes[1],
      pickTitle(bundle.titlesDrill1, h, 3),
      goalDrill1(fields),
      coachingPair(1, parsed, bundle),
      d1(bundle)
    ),
    drill2: section(
      bundle,
      minutes[2],
      pickTitle(bundle.titlesDrill2, h, 5),
      goalDrill2(fields, h),
      coachingPair(2, parsed, bundle),
      d2(bundle)
    ),
    drill3: section(
      bundle,
      minutes[3],
      pickTitle(bundle.titlesDrill3, h, 7),
      goalDrill3(fields),
      coachingPair(3, parsed, bundle),
      d3(bundle)
    ),
    gameFiveOnFive: section(
      bundle,
      minutes[4],
      pickTitle(bundle.titlesGame, h, 9),
      goalGame(fields),
      coachingPair(4, parsed, bundle),
      diagFive(bundle)
    ),
  };
}
