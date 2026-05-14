import type { PracticeBlock, PracticeBlockDiagram, PracticePlan } from "../types/plan";

function block(
  duration: string,
  goal: string,
  coachingPoints: string[],
  commonMistakes: string[],
  drillInstructions: string,
  diagram: PracticeBlockDiagram
): PracticeBlock {
  return { duration, goal, coachingPoints, commonMistakes, drillInstructions, diagram };
}

export type OffenseKey = "pick" | "fiveOut" | "motion" | "fast";
export type DefenseKey = "zone" | "aggressive" | "pressure" | "switch" | "man";

export type PlanContext = {
  offenseLabel: string;
  defenseLabel: string;
  offense: OffenseKey;
  defense: DefenseKey;
  turnovers: boolean;
  rebounding: boolean;
  communication: boolean;
  transition: boolean;
  /** First problem tag for title emphasis (still use booleans for content) */
  primaryTag: string;
};

function offenseKey(raw: string): OffenseKey {
  if (raw.includes("Pick")) return "pick";
  if (raw.includes("5-Out")) return "fiveOut";
  if (raw.includes("Motion")) return "motion";
  return "fast";
}

function defenseKey(raw: string): DefenseKey {
  if (raw.includes("Zone")) return "zone";
  if (raw.includes("Aggressive")) return "aggressive";
  if (raw.includes("Pressure")) return "pressure";
  if (raw.includes("Switch")) return "switch";
  return "man";
}

export function makeContext(offense: string, defense: string, problems: string[]): PlanContext {
  const offenseLabel = offense.trim() || "Balanced";
  const defenseLabel = defense.trim() || "Man principles";
  const p = problems.length ? problems : ["Execution"];
  const primaryTag = p[0];
  return {
    offenseLabel,
    defenseLabel,
    offense: offenseKey(offenseLabel),
    defense: defenseKey(defenseLabel),
    turnovers: p.includes("Turnovers"),
    rebounding: p.includes("Rebounding"),
    communication: p.includes("Communication"),
    transition: p.includes("Transition Defense"),
    primaryTag,
  };
}

function title(ctx: PlanContext): string {
  return `Practice — ${ctx.offenseLabel} vs ${ctx.defenseLabel} | ${ctx.primaryTag}`;
}

/* ——— Diagrams (distinct shapes per track) ——— */

function d(
  players: PracticeBlockDiagram["players"],
  movements: PracticeBlockDiagram["movements"],
  passes: PracticeBlockDiagram["passes"],
  caption?: string
): PracticeBlockDiagram {
  return { players, movements, passes, caption };
}

/** Warmup diagrams */
function diagramWarmupPnR(): PracticeBlockDiagram {
  return d(
    [
      { x: 48, y: 28, side: "offense", label: "1" },
      { x: 44, y: 78, side: "offense", label: "5" },
      { x: 18, y: 52, side: "defense", label: "C" },
    ],
    [{ from: { x: 48, y: 28 }, to: { x: 40, y: 58 } }],
    [{ from: { x: 48, y: 28 }, to: { x: 44, y: 78 } }],
    "Air PNR footwork: guard comes off (solid), entry to roller (dashed). Chair = screener’s defender."
  );
}

function diagramWarmupFiveOut(): PracticeBlockDiagram {
  return d(
    [
      { x: 14, y: 38, side: "offense", label: "2" },
      { x: 50, y: 18, side: "offense", label: "1" },
      { x: 86, y: 38, side: "offense", label: "3" },
      { x: 50, y: 58, side: "defense", label: "X" },
    ],
    [{ from: { x: 50, y: 18 }, to: { x: 32, y: 44 } }],
    [
      { from: { x: 14, y: 38 }, to: { x: 50, y: 18 } },
      { from: { x: 50, y: 18 }, to: { x: 86, y: 38 } },
    ],
    "5-out ghost spacing: fill on drive (solid), reversal around horn (dashed)."
  );
}

function diagramWarmupTurnover(): PracticeBlockDiagram {
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
    "Triangle passing: quick reversals (dashed) vs token pressure at nail (D)."
  );
}

function diagramWarmupRebound(): PracticeBlockDiagram {
  return d(
    [
      { x: 42, y: 78, side: "offense", label: "O" },
      { x: 58, y: 78, side: "offense", label: "O" },
      { x: 50, y: 92, side: "defense", label: "X" },
    ],
    [
      { from: { x: 42, y: 78 }, to: { x: 46, y: 88 } },
      { from: { x: 58, y: 78 }, to: { x: 54, y: 88 } },
    ],
    [],
    "Tap-out war: two crashers find body (solid), coach toss not shown — finish with two-hand chin."
  );
}

function diagramWarmupTrap(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 42, side: "offense", label: "1" },
      { x: 38, y: 52, side: "defense", label: "T" },
      { x: 62, y: 52, side: "defense", label: "T" },
      { x: 50, y: 72, side: "offense", label: "2" },
    ],
    [{ from: { x: 50, y: 42 }, to: { x: 50, y: 62 } }],
    [{ from: { x: 50, y: 62 }, to: { x: 50, y: 72 } }],
    "Trap escape: split line (solid), outlet to release valve (dashed)."
  );
}

function diagramWarmupDefault(): PracticeBlockDiagram {
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
    "Two-line dynamic: pass across top (dashed), sprint lane (solid)."
  );
}

function diagramWarmupMotion(): PracticeBlockDiagram {
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
    "Motion prep: UCLA entry pass (dashed), face-cut path (solid) vs token deny."
  );
}

/** Skill diagrams */
function diagramSkillPnR(): PracticeBlockDiagram {
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
    "PNR live: hedge/trap read (def), turn corner vs drop (solid), skip when low man tags (dashed)."
  );
}

function diagramSkillPnRTurnover(): PracticeBlockDiagram {
  return d(
    [
      { x: 28, y: 44, side: "offense", label: "1" },
      { x: 44, y: 76, side: "offense", label: "5" },
      { x: 76, y: 36, side: "offense", label: "3" },
      { x: 34, y: 50, side: "defense", label: "H" },
      { x: 52, y: 74, side: "defense", label: "X" },
      { x: 50, y: 36, side: "defense", label: "T" },
    ],
    [{ from: { x: 28, y: 44 }, to: { x: 38, y: 58 } }],
    [
      { from: { x: 28, y: 44 }, to: { x: 44, y: 76 } },
      { from: { x: 28, y: 44 }, to: { x: 76, y: 36 } },
    ],
    "PNR + nail tag: pocket or skip before second dribble — no loose gathers vs help."
  );
}

function diagramSkillFiveOutTurnover(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 20, side: "offense", label: "1" },
      { x: 12, y: 42, side: "offense", label: "2" },
      { x: 88, y: 42, side: "offense", label: "3" },
      { x: 50, y: 40, side: "offense", label: "4" },
      { x: 50, y: 54, side: "defense", label: "D" },
      { x: 38, y: 48, side: "defense", label: "D" },
    ],
    [{ from: { x: 50, y: 20 }, to: { x: 62, y: 46 } }],
    [
      { from: { x: 12, y: 42 }, to: { x: 50, y: 20 } },
      { from: { x: 50, y: 20 }, to: { x: 88, y: 42 } },
    ],
    "5-out vs token doubles at nail: drive decision (solid), reversal (dashed) — no first dribble in first 6s."
  );
}

function diagramSkillFiveOut(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 20, side: "offense", label: "1" },
      { x: 12, y: 42, side: "offense", label: "2" },
      { x: 88, y: 42, side: "offense", label: "3" },
      { x: 50, y: 40, side: "offense", label: "4" },
      { x: 50, y: 56, side: "defense", label: "X" },
    ],
    [{ from: { x: 50, y: 20 }, to: { x: 68, y: 48 } }],
    [
      { from: { x: 12, y: 42 }, to: { x: 50, y: 20 } },
      { from: { x: 50, y: 20 }, to: { x: 88, y: 42 } },
    ],
    "Drive-react: baseline drift triggers skip (dashed); driver fills behind (solid)."
  );
}

function diagramSkillMotion(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 22, side: "offense", label: "1" },
      { x: 20, y: 46, side: "offense", label: "2" },
      { x: 80, y: 46, side: "offense", label: "3" },
      { x: 50, y: 58, side: "defense", label: "X" },
    ],
    [{ from: { x: 20, y: 46 }, to: { x: 34, y: 74 } }],
    [
      { from: { x: 50, y: 22 }, to: { x: 20, y: 46 } },
      { from: { x: 20, y: 46 }, to: { x: 80, y: 46 } },
    ],
    "Motion: UCLA cut — pass to wing (dashed), cutter shallow cut (solid)."
  );
}

function diagramSkillFast(): PracticeBlockDiagram {
  return d(
    [
      { x: 18, y: 24, side: "offense", label: "1" },
      { x: 50, y: 16, side: "offense", label: "2" },
      { x: 82, y: 24, side: "offense", label: "3" },
      { x: 50, y: 50, side: "defense", label: "X" },
    ],
    [
      { from: { x: 18, y: 24 }, to: { x: 32, y: 80 } },
      { from: { x: 82, y: 24 }, to: { x: 68, y: 80 } },
    ],
    [{ from: { x: 18, y: 24 }, to: { x: 50, y: 16 } }],
    "Fly lanes: outlet up (dashed), wide runners fill corners (solid)."
  );
}

function diagramSkillTurnoverPressure(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 28, side: "offense", label: "1" },
      { x: 30, y: 48, side: "offense", label: "2" },
      { x: 70, y: 48, side: "offense", label: "3" },
      { x: 50, y: 52, side: "defense", label: "D" },
      { x: 38, y: 62, side: "defense", label: "D" },
    ],
    [],
    [
      { from: { x: 50, y: 28 }, to: { x: 30, y: 48 } },
      { from: { x: 30, y: 48 }, to: { x: 70, y: 48 } },
    ],
    "Pressure passing window: nail handler vs two active hands (no dribble segment)."
  );
}

function diagramSkillRebound(): PracticeBlockDiagram {
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
    "Box-out triangle: find hit first (solid), release to ball on coach slap (not drawn)."
  );
}

/** Team / shell / zone O */
function diagramTeamZoneOffense(): PracticeBlockDiagram {
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
    "Zone O: short corner lift (solid), high reversal vs 2-3 (dashed)."
  );
}

function diagramTeamTrapPress(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 34, side: "offense", label: "1" },
      { x: 34, y: 46, side: "defense", label: "T" },
      { x: 66, y: 46, side: "defense", label: "T" },
      { x: 50, y: 78, side: "offense", label: "2" },
    ],
    [{ from: { x: 50, y: 34 }, to: { x: 50, y: 56 } }],
    [{ from: { x: 50, y: 56 }, to: { x: 50, y: 78 } }],
    "Trap: funnel to sideline, middle release (dashed) — sprint rules on turnover."
  );
}

function diagramTeamPressureDeny(): PracticeBlockDiagram {
  return d(
    [
      { x: 28, y: 40, side: "offense", label: "1" },
      { x: 72, y: 40, side: "offense", label: "2" },
      { x: 32, y: 44, side: "defense", label: "D" },
      { x: 68, y: 44, side: "defense", label: "D" },
    ],
    [{ from: { x: 28, y: 40 }, to: { x: 50, y: 62 } }],
    [{ from: { x: 72, y: 40 }, to: { x: 50, y: 62 } }],
    "Deny one pass away: face-guard pressure, reversal through high post (dashed)."
  );
}

function diagramTeamSwitch(): PracticeBlockDiagram {
  return d(
    [
      { x: 26, y: 46, side: "offense", label: "1" },
      { x: 44, y: 74, side: "offense", label: "5" },
      { x: 76, y: 40, side: "offense", label: "3" },
      { x: 34, y: 52, side: "defense", label: "X" },
      { x: 52, y: 72, side: "defense", label: "X" },
    ],
    [
      { from: { x: 34, y: 52 }, to: { x: 52, y: 72 } },
      { from: { x: 26, y: 46 }, to: { x: 40, y: 62 } },
    ],
    [{ from: { x: 26, y: 46 }, to: { x: 76, y: 40 } }],
    "Switch vs empty-corner PNR: exchange matchups (solid defender paths), weak-side stay home."
  );
}

function diagramTeamShellMan(): PracticeBlockDiagram {
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
    "Shell: baseline drive + skip — stunt timing and recover to shooter."
  );
}

function diagramTeamTransition(): PracticeBlockDiagram {
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
    "Conversion: sprint lanes back (solid) — stop ball or peel to level, communicate runner."
  );
}

/** Competitive */
function diagramCompPnRKing(): PracticeBlockDiagram {
  return d(
    [
      { x: 30, y: 46, side: "offense", label: "1" },
      { x: 46, y: 76, side: "offense", label: "5" },
      { x: 36, y: 52, side: "defense", label: "X" },
      { x: 54, y: 74, side: "defense", label: "X" },
    ],
    [{ from: { x: 30, y: 46 }, to: { x: 42, y: 68 } }],
    [{ from: { x: 30, y: 46 }, to: { x: 46, y: 76 } }],
    "PNR king: score only off ball screen or roll — keep score to 3."
  );
}

function diagramCompRussian(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 30, side: "offense", label: "1" },
      { x: 30, y: 50, side: "offense", label: "2" },
      { x: 70, y: 50, side: "offense", label: "3" },
      { x: 50, y: 58, side: "defense", label: "D" },
    ],
    [],
    [
      { from: { x: 50, y: 30 }, to: { x: 30, y: 50 } },
      { from: { x: 30, y: 50 }, to: { x: 70, y: 50 } },
    ],
    "Russian hot potato: no dribble until coach yells 'live' — dropped ball = sprint line."
  );
}

function diagramCompRebound74(): PracticeBlockDiagram {
  return d(
    [
      { x: 40, y: 68, side: "offense", label: "O" },
      { x: 60, y: 68, side: "offense", label: "O" },
      { x: 50, y: 88, side: "defense", label: "X" },
    ],
    [
      { from: { x: 40, y: 68 }, to: { x: 48, y: 82 } },
      { from: { x: 60, y: 68 }, to: { x: 52, y: 82 } },
    ],
    [],
    "7-4 putback game: only second-chance buckets count — diagram shows crash paths."
  );
}

function diagramCompZoneConstraint(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 24, side: "offense", label: "1" },
      { x: 24, y: 50, side: "offense", label: "2" },
      { x: 76, y: 50, side: "offense", label: "3" },
      { x: 50, y: 56, side: "defense", label: "M" },
      { x: 28, y: 72, side: "defense", label: "B" },
      { x: 72, y: 72, side: "defense", label: "B" },
    ],
    [{ from: { x: 24, y: 50 }, to: { x: 34, y: 78 } }],
    [{ from: { x: 50, y: 24 }, to: { x: 76, y: 50 } }],
    "Zone constraint: must touch short corner before shot — reversal shown."
  );
}

function diagramCompTrapLive(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 36, side: "offense", label: "1" },
      { x: 38, y: 48, side: "defense", label: "T" },
      { x: 62, y: 48, side: "defense", label: "T" },
      { x: 22, y: 72, side: "offense", label: "2" },
    ],
    [{ from: { x: 50, y: 36 }, to: { x: 50, y: 58 } }],
    [{ from: { x: 50, y: 58 }, to: { x: 22, y: 72 } }],
    "Live trap: middle split then long outlet — clock starts on catch."
  );
}

function diagramCompShell2v2(): PracticeBlockDiagram {
  return d(
    [
      { x: 30, y: 44, side: "offense", label: "1" },
      { x: 14, y: 84, side: "offense", label: "2" },
      { x: 38, y: 52, side: "defense", label: "X" },
      { x: 22, y: 78, side: "defense", label: "X" },
    ],
    [{ from: { x: 30, y: 44 }, to: { x: 46, y: 70 } }],
    [{ from: { x: 30, y: 44 }, to: { x: 14, y: 84 } }],
    "2v2 read game: drive-kick vs hard help — first to 5 hockey points."
  );
}

/** Scrimmage */
function diagramScrimmageSpread(): PracticeBlockDiagram {
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
    "Live 5v5 spacing: reversal then middle drive — count paint touches."
  );
}

function diagramScrimmageZoneRule(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 22, side: "offense", label: "1" },
      { x: 22, y: 48, side: "offense", label: "4" },
      { x: 78, y: 48, side: "offense", label: "3" },
      { x: 34, y: 82, side: "offense", label: "2" },
      { x: 50, y: 54, side: "defense", label: "M" },
      { x: 26, y: 70, side: "defense", label: "B" },
      { x: 74, y: 70, side: "defense", label: "B" },
    ],
    [{ from: { x: 34, y: 82 }, to: { x: 48, y: 62 } }],
    [{ from: { x: 50, y: 22 }, to: { x: 22, y: 48 } }],
    "Zone scrimmage rule: short-corner touch before FGA — lift path solid."
  );
}

function diagramScrimmagePress(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 28, side: "offense", label: "1" },
      { x: 32, y: 42, side: "defense", label: "D" },
      { x: 68, y: 42, side: "defense", label: "D" },
      { x: 50, y: 72, side: "offense", label: "2" },
    ],
    [{ from: { x: 50, y: 28 }, to: { x: 50, y: 52 } }],
    [{ from: { x: 50, y: 52 }, to: { x: 50, y: 72 } }],
    "Press break live: trap at logo, release up sideline — 10-second backcourt."
  );
}

function diagramScrimmageTurnoverClock(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 24, side: "offense", label: "1" },
      { x: 22, y: 42, side: "offense", label: "2" },
      { x: 78, y: 42, side: "offense", label: "3" },
      { x: 50, y: 54, side: "defense", label: "X" },
    ],
    [{ from: { x: 50, y: 24 }, to: { x: 62, y: 48 } }],
    [
      { from: { x: 22, y: 42 }, to: { x: 50, y: 24 } },
      { from: { x: 50, y: 24 }, to: { x: 78, y: 42 } },
    ],
    "8-second halfcourt emphasis: pitch ahead (dashed), quick enter (solid)."
  );
}

/** FT / conditioning */
function diagramFtStandard(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 64, side: "offense", label: "S" },
      { x: 38, y: 52, side: "offense", label: "P" },
      { x: 50, y: 86, side: "defense", label: "R" },
    ],
    [{ from: { x: 38, y: 52 }, to: { x: 44, y: 58 } }],
    [{ from: { x: 38, y: 52 }, to: { x: 50, y: 64 } }],
    "FT line: passer step-in (dashed), rebounder block-out (R)."
  );
}

function diagramFtReboundPair(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 62, side: "offense", label: "S" },
      { x: 40, y: 76, side: "offense", label: "B" },
      { x: 60, y: 76, side: "offense", label: "B" },
      { x: 50, y: 90, side: "defense", label: "X" },
    ],
    [
      { from: { x: 40, y: 76 }, to: { x: 46, y: 86 } },
      { from: { x: 60, y: 76 }, to: { x: 54, y: 86 } },
    ],
    [{ from: { x: 50, y: 62 }, to: { x: 50, y: 70 } }],
    "FT + pair box-out on miss: shooters hold line, two crashers take space first."
  );
}

function diagramFtPassingLine(): PracticeBlockDiagram {
  return d(
    [
      { x: 50, y: 62, side: "offense", label: "S" },
      { x: 32, y: 52, side: "offense", label: "P" },
      { x: 68, y: 52, side: "offense", label: "P" },
    ],
    [],
    [
      { from: { x: 32, y: 52 }, to: { x: 50, y: 62 } },
      { from: { x: 68, y: 52 }, to: { x: 50, y: 62 } },
    ],
    "FT line ping: two passers alternate quick chest (dashed) while shooter breathes."
  );
}

/* ——— Block builders (fundamentally different drills) ——— */

function buildWarmup(ctx: PlanContext): PracticeBlock {
  if (ctx.rebounding) {
    return block(
      "12 min",
      "Win the first hit on the glass before the ball is allowed to hit the floor twice.",
      [
        "Pairs under rim: coach tosses short off rim — 3 competitive jumps, chin on chin-out.",
        "Call the name of the man you block out before the shot goes up.",
        "Weak-side tagger sprints long on skip (not today’s drill, but keep feet alive).",
      ],
      ["Watching flight of the ball", "Jumping without contact — ghost box-outs"],
      "Tap-out war: two lines at blocks. Coach slaps, toss hits rim, two players go 1v1 for the board only (no putback). Winner stays, loser sprints baseline. 8 rounds. Then team O-boarding: offense sends three from arc, defense three in paint — coach misses FT on purpose, first team to 5 team boards wins.",
      diagramWarmupRebound()
    );
  }
  if (ctx.turnovers) {
    return block(
      "12 min",
      "Hands and eyes beat pressure — no casual catches.",
      [
        "Triangle at top: 3 players, 2 balls max, coach calls ‘flip’ every 4 passes — change direction on voice.",
        "Jump stops on any paint catch; no ‘splitting’ through traffic without two feet.",
        "Weak hand one minute — still game-speed passes, not soft.",
      ],
      ["Catching with body turned away from next play", "One-hand snatches on anything above shoulders"],
      "3-man weave half court only: start stationary 10 passes, then live jog. Add a fourth defender with pool noodle at nail — they can’t steal but can touch ball; offense must relocate after every touch. Finish with 90-second ‘hot potato’ at free throw line (no dribble) — drop equals 3 pushups for that pair only.",
      diagramWarmupTurnover()
    );
  }
  if (ctx.defense === "aggressive" || ctx.defense === "pressure") {
    return block(
      "12 min",
      "Hips low, hands active — prepare to sprint out of pressure mistakes.",
      [
        "Mirror slides in pairs: 45 on / 15 off, change lead foot every whistle.",
        "Trap sit stance: butt to baseline shoulder, top foot to sideline — hold 10s.",
        "Sprint-to-recover: coach points color cone, last defender to touch it buys water for next huddle (optional).",
      ],
      ["Standing straight up on ‘go’", "Reaching without feet — foul trouble starts here"],
      "1-ball trap escape stations: (A) sideline trap from coach + manager, offensive player split-outs to middle jump stop; (B) corner dead trap, long skip to coach as outlet. Rotate every 45s. No scoring — only clean outlets count as a ‘win’.",
      diagramWarmupTrap()
    );
  }
  if (ctx.offense === "pick") {
    return block(
      "12 min",
      "Screeners’ hips and ballhandlers’ pace meet before live contact.",
      [
        "Wall slides into ‘contact’ with pad: two steps, absorb, flip hips.",
        "Screener footwork: ‘stop–square–roll’ verbal on every air screen.",
        "Guards: pocket passes on a chair — eyes on rim by second bounce.",
      ],
      ["Screener leaves early on anticipation", "Guard strings out the screen 6 feet away"],
      "PNR prep with no defense on ball: slot pick from coach’s slap, roller finishes with pad contact at rim. Then same with token defender only on roller (no on-ball). 6 finishes each side. Keep score of ‘clean hits’ on the pad.",
      diagramWarmupPnR()
    );
  }
  if (ctx.offense === "motion") {
    return block(
      "12 min",
      "Sell cuts with shoulders — motion starts before the catch.",
      [
        "Walk-through UCLA side: passer holds two feet, cutter takes face cut first rep every time.",
        "Flex footwork: screeners pause one count — no early slips.",
        "Voice: ‘through’ or ‘back’ on every screen approach.",
      ],
      ["Flat cuts with chest parallel to sideline", "Ball-watcher cuts"],
      "3-on-0 motion only: three entries from each wing (UCLA, downscreen replace, DHO look without contact). Coach freezes on wrong timing. Then 3-on-1 token deny on wing — offense must score with zero dribbles or reset.",
      diagramWarmupMotion()
    );
  }
  if (ctx.offense === "fiveOut") {
    return block(
      "12 min",
      "Spacing memory: five nails, five voices, zero lazy fills.",
      [
        "Walk-through 5 spots: everyone touches each spot once in 60s — call the spot name.",
        "‘Drive–replace’ without ball: coach points driver, opposite corner fills, wing lifts one window.",
        "Baseline drift on ‘tag’: coach touches weak-side block, weak-side corner sprints long.",
      ],
      ["Corners standing 2 feet short of true corner", "Nail player hugging the key"],
      "Ghost 5-out: coach has ball at top, offense moves on commands only (cut, replace, lift). Defense slides feet on air. 4 minutes. Then add one live drive from coach — offense must touch two corners before shot clock horn (coach counts 8).",
      diagramWarmupFiveOut()
    );
  }
  return block(
    "12 min",
    "Sweat first, then ball feel — save legs for live segments later.",
    [
      "Dynamic lines: karaoke + high knees + open the gate through cones at elbows.",
      "Partner medicine-ball chest pass on the move (if no med ball, heavy basketball).",
      "Form shooting 8 feet: 20 makes, swish-only last 5.",
    ],
    ["Skipping dynamic prep", "Talking through passes instead of snapping them"],
    "Two-line full court: pass leads the runner, switch sides at half. Add competitive finish: first pair to 10 clean catches without a bobble picks next drill order.",
    diagramWarmupDefault()
  );
}

function buildSkill(ctx: PlanContext): PracticeBlock {
  if (ctx.offense === "pick" && ctx.turnovers) {
    return block(
      "22 min",
      "Pick-and-roll where the first dribble has to earn the second — pocket or skip, no panic gathers.",
      [
        "Live: nail defender can stunt with one hand in window — offense must pocket or skip before second dribble.",
        "Screener: ‘late’ set on the dot; hands ready on short roll.",
        "If low man tags roller early, weak-side must lift one window — call it.",
      ],
      ["Dragging pick out 6 feet", "Jump passes out of pocket"],
      "2v2+1 at slot: offense PNR vs hedge/trap coach call every 3 possessions. No scores off overdribble — must be roll, pop, or skip assist. Play to 10 team points; turnovers subtract 2.",
      diagramSkillPnRTurnover()
    );
  }
  if (ctx.offense === "fiveOut" && ctx.turnovers) {
    return block(
      "22 min",
      "Spacing that survives pressure — five out with live hands in passing lanes.",
      [
        "First 6 seconds no dribble — force reversals and lifts.",
        "Drive rules: only two players may occupy paint at once — third must lift or short corner.",
        "Catch radius: anything outside frame is a turnover in drill scoring.",
      ],
      ["Saving bad spacing with a dribble", "Corner cutting before drive tag"],
      "5-on-5 ghost spacing with two token defenders at nail: live drives from each slot, offense must reverse once before any paint touch. Coach stops on first wrong fill. Then 4v4 same rule — play to 8 by ones.",
      diagramSkillFiveOutTurnover()
    );
  }
  if (ctx.turnovers) {
    return block(
      "22 min",
      "Passing under fatigue and decision pressure — turnovers lose games.",
      [
        "Pass fakes must move a defender’s hand or foot before next pass.",
        "‘Receiver rules’: show target late, early feet, call ‘short’ or ‘long’ on skip.",
        "Live: add counting defender who can’t steal but can deflect with one hand in passing lane.",
      ],
      ["Jump-passing through traffic", "Dribbling to ‘solve’ bad spacing"],
      "Cut-throat passing: 4v4 half, no dribbles for first 8 seconds of each possession. If ball hits floor = turnover. Play to 7. Then same with one dribble allowed only after reversal — forces second-side reads.",
      diagramSkillTurnoverPressure()
    );
  }
  if (ctx.rebounding) {
    return block(
      "22 min",
      "Offensive boards are shots; defensive boards start your break.",
      [
        "‘Hit first’ on release: inside foot, forearm in pocket, eyes on man.",
        "Tap-out reads: if you can’t secure, slap to assigned outlet spot.",
        "Transition crack-back: first big down floor seals lane for PG.",
      ],
      ["Statue jumps under rim", "Pursuit without block-out on long bounces"],
      "Live 3v3 on narrow lane: coach shoots from slot, both teams crash. Only putbacks or kick-out threes count. Play to 11. Rotate bigs every 3 boards. Chart team O-board % on whiteboard between games.",
      diagramSkillRebound()
    );
  }
  if (ctx.offense === "pick") {
    return block(
      "22 min",
      "Two-person game wins late clock — reads have to be automatic.",
      [
        "Screener sets ‘late’ on the dot — no early slips unless tagged.",
        "Guard: reject = same-side second step; turn corner = attack big’s top foot.",
        "Weak-side: one ‘window’ fake then hold — no false movement.",
      ],
      ["Flat angle screens", "Rolling before contact sells nothing"],
      "2v2 side pick with a coach as weak-side tagger: live reads, 12-second shot clock. Scoring: +2 roll layup, +1 pop jumper, -1 turnover. Switch sides every 4 minutes. Finish with ‘snake’ series: same matchup, guard must snake once before pass or shot.",
      diagramSkillPnR()
    );
  }
  if (ctx.offense === "fiveOut") {
    return block(
      "22 min",
      "Drive five gaps — the ball decides who relocates, not habit.",
      [
        "Corner stays true corner until ball enters paint — then baseline drift only.",
        "Nail stays home until drive crosses face — then lift one window.",
        "Throw-ahead on skip: catch on the hop, no rhythm dribble.",
      ],
      ["Ball-side corner cutting too early", "Two drivers in same gap"],
      "5-on-5 zero with token defense at nail only: live drives from each slot position, offense must ‘touch two corners’ before any shot. Coach stops on first wrong fill. Then 4v4 same rule with weak-side tagger — play to 8 by ones.",
      diagramSkillFiveOut()
    );
  }
  if (ctx.offense === "motion") {
    return block(
      "22 min",
      "Cutting timing beats athleticism when spacing is honest.",
      [
        "Face cut vs back cut: read defender’s nose — if it’s on ball, you back-cut.",
        "Screeners ‘pause’ one count after pass — no race to screen.",
        "Replace man must talk the cutter through.",
      ],
      ["UCLA cut flat (no shoulder turn)", "Ball-watcher cuts"],
      "Motion install: 5-on-0 UCLA side entries only — three consecutive clean sequences before adding one deny defender on wing. Then 5-on-1 live: defender can deny one pass only — offense must punish with back-cut or skip.",
      diagramSkillMotion()
    );
  }
  return block(
    "22 min",
      "Play faster than the defense can organize — lanes before plays.",
    [
      "Outlet rhythm: catch on left, rip to right on first step.",
      "Lane integrity: weak-side runs ‘rail’, ball-side runs ‘alley’.",
      "Pitch ahead only if receiver’s hands are shown above waist.",
    ],
    ["Trailer jogging", "Outlet to a standing guard"],
    "3-on-0 + trailer: 8 trips, timed. Each trip must include one pitch ahead and one rim touch in two or fewer dribbles from PG. Then 3-on-2 continuous from wing — defense starts at volleyball line; offense must tag defender with pass fake once before score.",
    diagramSkillFast()
  );
}

function transitionCoaching(): string {
  return "Transition: two paint, one jet, one peel on makes — match up in four steps.";
}

function buildTeam(ctx: PlanContext): PracticeBlock {
  if (ctx.defense === "zone") {
    const zonePoints = [
      "Short corner is a live scoring area — two feet in, two hands ready.",
      "High post faces baseline on catch — find weak-side overload.",
      "Skip rules: only after paint touch or short-corner touch (your call — stay consistent).",
      ...(ctx.transition
        ? ["On makes, sprint your matchup back — zone break can’t start with a leak-out."] as const
        : []),
    ];
    return block(
      "20 min",
      "Beat zones with short corners, reversals, and high-post eyes — not hero threes.",
      zonePoints as string[],
      ["Standing in gaps", "Skipping without shifting the low man"],
      "5-on-5 vs your zone: offense runs ‘overload’ set — start every possession with ball in slot, weak-side short corner filled. Defense may not switch matchups off ball. Play 4-minute games to 7. Chart skips that lead to paint touches.",
      diagramTeamZoneOffense()
    );
  }
  if (ctx.defense === "aggressive") {
    const pts = [
      "Trap sideline: funnel with inside foot, no middle split without jump stop.",
      "Up-line defender takes first pass out — ‘no middle’ call.",
      "Runner tags roller on ‘peel’ call — weak-side sinks to nail.",
      ...(ctx.transition ? [transitionCoaching()] : []),
    ];
    return block(
      "20 min",
      "Traps are a system — rotations beat speed if everyone knows the next job.",
      pts,
      ["Trap with hands only", "Slow second defender to cover roller"],
      "4-on-4 half: any ball picked up past volleyball line = automatic trap call by coach. Offense gets 12 seconds. Rotate trap rules every 3 minutes: (1) corner only, (2) slot only, (3) sideline inbound. Keep a deflection tally.",
      diagramTeamTrapPress()
    );
  }
  if (ctx.defense === "pressure") {
    const pts = [
      "Deny one pass away: open to ball, closed to man on the catch.",
      "On skip, closeout ‘chop–chop–contest’ — no fly-bys.",
      "Help at nail is one stunt only, then full recover.",
      ...(ctx.transition ? [transitionCoaching()] : []),
    ];
    return block(
      "20 min",
      "Pressure without gambling — feet force passes, hands contest vision.",
      pts,
      ["Face guarding with no vision on ball", "Reaching when beat off bounce"],
      "4-on-4 shell with deny rules: wing entry denied once per possession — offense must back-cut or reverse through high post. Defense scores +1 for deflection, offense +1 for paint touch. First to 10.",
      diagramTeamPressureDeny()
    );
  }
  if (ctx.defense === "switch") {
    const pts = [
      "Ram screens: switch or peel — call it before contact.",
      "Empty corner PNR: weak-side stays home, switch only on ball contact.",
      "Post switch: front from guard, three-quarter from big on cross.",
      ...(ctx.transition ? [transitionCoaching()] : []),
    ];
    return block(
      "20 min",
      "Switching is communication + early matchups, not size excuses.",
      pts,
      ["Late switches leaving roller free", "Double-switch confusion on cutters"],
      "4-on-4: empty-corner PNR every other possession (coach signals). Weak-side defender may not help until ball enters paint. Play to 9. Film two clips at end: one clean switch, one bust.",
      diagramTeamSwitch()
    );
  }
  if (ctx.transition) {
    return block(
      "20 min",
      "Miss-make conversion: first three steps decide whether you get a stop or a layup.",
      [
        "Sprint lanes: two players touch paint on make, one jet to stop ball, one peel to level of ball.",
        "Tag the ball with a shoulder — no ‘shadow’ defense at halfcourt.",
        "Match up in first 4 steps — communicate in flight, not after the first pass.",
      ],
      ["Jogging while pointing", "Ball-watcher leaks for offense"],
      "5-on-5 live: any made basket, defense must touch baseline in 2 seconds then sprint lanes (coach whistles late = penalty sprint). Offense throws ahead on 6 of 10 makes only — randomize with dice. 6-minute segment, track transition FGA allowed.",
      diagramTeamTransition()
    );
  }
  const manPts = [
    "Ball-you-man every dead ball — no silent switches.",
    "Stunt from nail, recover with high hands in two choppy steps.",
    "Tag roller on drive with guard low man — big pops to shooter.",
  ];
  return block(
    "20 min",
    "Man principles: help on a string, recover on a count.",
    manPts,
    ["Helping without early stunt", "Closeouts with square feet to sideline"],
    "4-on-4 shell with coach as stationary corner shooter: ball swings, defense jumps, stunt, recover. Add drive-and-kick; help must touch roller with hand tag before recovering to shooter.",
    diagramTeamShellMan()
  );
}

function buildCompetitive(ctx: PlanContext): PracticeBlock {
  if (ctx.offense === "pick" && (ctx.defense === "aggressive" || ctx.defense === "pressure")) {
    return block(
      "15 min",
      "Ball screens vs heat — late reads win when the trap comes.",
      [
        "Trap call on first dribble past slot — roller short every time until you score twice other ways.",
        "Split-out must hit middle jump stop before pass or score.",
        "Weak-side one skip only — no second skip unless paint touched.",
      ],
      ["Splitting without seeing weak-side", "Screener slipping early vs show"],
      "PNR king with trap rule: winners stay, play to 3. Any automatic trap = offense gets 10-second shot clock. Only scores off screen/roll/pop count. Sub defenders every loss.",
      diagramCompTrapLive()
    );
  }
  if (ctx.offense === "pick") {
    return block(
      "15 min",
      "Win ugly possessions — late clock PNR execution.",
      [
        "No middle help until ball crosses face of rim.",
        "Screener can only roll or pop — no slip unless tagged.",
        "Defense can ice one side per game — offense must recognize in one dribble.",
      ],
      ["Guard overdribbling out of reject", "Screener screening air"],
      "PNR king of court: half court, winners stay. Only points off ball screen, roll, or pop count. Play to 3. Sub defenders every loss. Keep a ‘clean screen’ count — sub offense if three moving screens.",
      diagramCompPnRKing()
    );
  }
  if (ctx.turnovers) {
    return block(
      "15 min",
      "Possessions are currency — treat the ball like rent money.",
      [
        "No dribble segments alternate with one-dribble segments — coach calls switch.",
        "Catch radius: anything outside frame is a turnover in drill rules.",
        "Extra passer on baseline adds skip pressure.",
      ],
      ["Saving turnovers with travels", "Loose pivots on reversals"],
      "Russian 4v4 half: no dribble until coach yells ‘live’ on random possessions. Dropped pass = other team gets ball at top + one free throw for coach. First to 5 clean sequences wins.",
      diagramCompRussian()
    );
  }
  if (ctx.rebounding) {
    return block(
      "15 min",
      "Second chances win weekday games — compete on every miss.",
      [
        "Only putbacks or kick-out threes count — paint twos don’t count.",
        "Defense must secure with two hands before outlet.",
        "Sub bigs every 3 dead balls to keep energy honest.",
      ],
      ["Tip-dunk attempts with no block-out", "Guards leaking out early"],
      "7–4 rebound game: coach shoots from slot, 4 crashers vs 3 boxers. Play to 7 team boards. Then same with 3v3 on half lane — only offensive rebounds reset the count.",
      diagramCompRebound74()
    );
  }
  if (ctx.defense === "zone") {
    return block(
      "15 min",
      "Make zone offense think in layers, not one pass.",
      [
        "Offense must touch short corner before any FGA.",
        "Defense starts in 2-3 only — no man pressure until reversal.",
        "Chart skips that lead to paint touches — post the number.",
      ],
      ["Hero threes early", "Standing in high post with back to rim"],
      "5-on-5 constraint: zone only, offense must complete two reversals before a shot. Defense +2 for deflection, offense +2 for paint touch + kick for a corner three. First to 12.",
      diagramCompZoneConstraint()
    );
  }
  if (ctx.defense === "aggressive" || ctx.defense === "pressure") {
    return block(
      "15 min",
      "Live turnovers from pressure — practice the chaos you want.",
      [
        "Trap on first dribble past volleyball line — offense has 8 seconds to escape half.",
        "Help defenders may not leave corner shooter until ball enters paint.",
        "On steal, offense must sprint back and touch paint before defending break.",
      ],
      ["Fouling on reach-ins", "Trap without baseline cut off"],
      "Press live: 4-on-4 full court for 90-second bursts. Start with sideline trap only. Rotate to mid-court trap every other burst. Keep score on stops only.",
      diagramCompTrapLive()
    );
  }
  return block(
    "15 min",
    "Simple reads under fatigue — scoreboard on every rep.",
    [
      "Winners stay — losers sub one body.",
      "Start some possessions with offense down 2 — late-game feel.",
      "No timeouts — players call their own sets.",
    ],
    ["Hero ball last possession", "Arguing fouls"],
    "2v2 half with hockey scoring: drive-and-kick assist +1, paint touch +1, turnover -2. Play to 7. Change matchup rules every 3 minutes: must score off a cut once, then off a screen once.",
    diagramCompShell2v2()
  );
}

function buildScrimmage(ctx: PlanContext): PracticeBlock {
  if (ctx.defense === "zone") {
    return block(
      "22 min",
      "Game-speed zone offense — paint touches before shots win.",
      [
        "Quarter 1: no three unless it comes off paint touch or short-corner touch.",
        "Quarter 2: zone only — offense may call one ‘overload’ per possession.",
        "Track skips that lead to layups or fouls — post at water break.",
      ],
      ["Early transition threes vs zone", "Standing in high post"],
      "5-on-5: 8-minute quarter running clock, then 3-minute stop clock. Defense stays in 2-3 entire time. Offense starts every possession from sideline inbound with 18 seconds — forces zone setup reads. Sub on every dead ball after minute 6.",
      diagramScrimmageZoneRule()
    );
  }
  if (ctx.defense === "aggressive" || ctx.defense === "pressure") {
    return block(
      "22 min",
      "Pressures and scrambles — test your rules under fatigue.",
      [
        "First 6 minutes: full court man pressure, no trap.",
        "Next 6 minutes: trap on any pickup past halfcourt logo.",
        "Final 4: either team may call one ‘blitz’ possession per team.",
      ],
      ["Reach fouls 35 feet from basket", "Slow matchup reporting"],
      "5-on-5 segmented scrimmage: start with 10-second backcourt vs pressure. After 6 minutes, add automatic trap if ballhandler’s back is to halfcourt. Sub every 3 minutes. Coaches track clean press breaks vs turnovers.",
      diagramScrimmagePress()
    );
  }
  if (ctx.turnovers) {
    return block(
      "22 min",
      "Possession quality — late turnovers lose tight games.",
      [
        "8-second halfcourt on makes — count violations loud.",
        "Segment where first pass after inbound must be a reversal.",
        "Track ‘bad catches’ — one point to defense per bobble.",
      ],
      ["Saving turnovers with travels", "Overdribbling to reset"],
      "5-on-5: two 9-minute segments. Segment 1 normal. Segment 2: offense loses possession if they pick up dribble twice in same halfcourt set (travel rules still apply). Keep a simple turnover sheet: dead-ball vs live-ball.",
      diagramScrimmageTurnoverClock()
    );
  }
  return block(
    "22 min",
    "Play real basketball — let film handle the speeches.",
    [
      "Call fouls tight on hands; keep flow.",
      "Start each quarter with one written emphasis (paint touches, deflections, etc.).",
      "Water only on stoppages.",
    ],
    ["Walking back after makes", "Arguing with partners"],
    "5-on-5: 10-minute running quarter, then 8-minute quarter with stop clock under 2:00. No gimmicks — track one team stat you care about this week (e.g., O-board %, transition DFG%). Sub every 4 minutes flat.",
    diagramScrimmageSpread()
  );
}

function buildFt(ctx: PlanContext): PracticeBlock {
  if (ctx.rebounding) {
    return block(
      "9 min",
      "Legs + contact — free throws after bodies meet.",
      [
        "Shooter same routine every time — no looking at scoreboard.",
        "Two partners box out coach’s miss on second FT only.",
        "Sprint length on miss only if that’s your season rule — stay consistent.",
      ],
      ["Partners leaking to leak out before rebound secured", "Shooter rushing on second FT"],
      "Line at stripe: each shooter 2+2. After each set, two assigned partners simulate box-out on coach miss from slot (coach shoots, not players). On team miss, full sideline sprint. Rotate partners every round.",
      diagramFtReboundPair()
    );
  }
  if (ctx.turnovers) {
    return block(
      "9 min",
      "Quiet hands, loud feet — FTs while the gym stays noisy.",
      [
        "Two passers alternate quick chest passes while shooter breathes at line.",
        "Shooter eyes a fixed spot on rim — not the passer.",
        "If passer fakes a pass, shooter still completes routine — mental toughness.",
      ],
      ["Laughing through routine", "Passers throwing off timing on purpose"],
      "FT ping-pong: shooter at line, two passers at elbows pass back and forth while shooter completes 5 dribbles + breath + shot. Make = passer runs touch; miss = shooter runs. 6 rounds each role.",
      diagramFtPassingLine()
    );
  }
  return block(
    "9 min",
    "Close practice with clarity — routine beats adrenaline.",
    [
      "Same breath, same dribbles, same eyes.",
      "Rebounders seal on second FT attempt only.",
      "No talking during another shooter’s line.",
    ],
    ["Changing routine after miss", "Walking back on line sprints"],
    "Standard FT rotation: each player 2 sets of 2. Team runs sideline touches on any miss in final minute of practice clock. Optional: team plank 20s after last shooter — core tightness, not punishment.",
    diagramFtStandard()
  );
}

export function buildPracticePlan(offense: string, defense: string, problems: string[]): PracticePlan {
  const ctx = makeContext(offense, defense, problems);
  return {
    practiceTitle: title(ctx),
    totalPracticeTime: "1 hour 40 minutes (100 min)",
    warmup: buildWarmup(ctx),
    skillDevelopment: buildSkill(ctx),
    teamConcept: buildTeam(ctx),
    competitiveDrill: buildCompetitive(ctx),
    scrimmage: buildScrimmage(ctx),
    freeThrowsConditioning: buildFt(ctx),
  };
}
