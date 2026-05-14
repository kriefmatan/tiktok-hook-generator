import type { PracticeBlock, PracticeBlockDiagram, PracticePlan } from "../../types/plan";

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

const diagramWarmup: PracticeBlockDiagram = {
  players: [
    { x: 16, y: 32, side: "offense", label: "1" },
    { x: 84, y: 32, side: "offense", label: "2" },
    { x: 12, y: 50, side: "defense", label: "D" },
    { x: 88, y: 50, side: "defense", label: "D" },
  ],
  movements: [
    { from: { x: 16, y: 32 }, to: { x: 16, y: 86 } },
    { from: { x: 84, y: 32 }, to: { x: 84, y: 86 } },
  ],
  passes: [{ from: { x: 16, y: 32 }, to: { x: 84, y: 32 } }],
  caption: "Two lines: chest pass across, then jog legs down and back.",
};

const diagramSkillPnR: PracticeBlockDiagram = {
  players: [
    { x: 26, y: 46, side: "offense", label: "1" },
    { x: 42, y: 76, side: "offense", label: "5" },
    { x: 78, y: 38, side: "offense", label: "3" },
    { x: 32, y: 50, side: "defense", label: "X" },
    { x: 50, y: 74, side: "defense", label: "X" },
  ],
  movements: [
    { from: { x: 26, y: 46 }, to: { x: 38, y: 62 } },
    { from: { x: 42, y: 76 }, to: { x: 54, y: 88 } },
  ],
  passes: [{ from: { x: 26, y: 46 }, to: { x: 78, y: 38 } }],
  caption: "Ball screen side: 1 comes off; 5 rolls; skip window to 3 (dashed).",
};

const diagramSkillMotion: PracticeBlockDiagram = {
  players: [
    { x: 50, y: 24, side: "offense", label: "1" },
    { x: 18, y: 44, side: "offense", label: "2" },
    { x: 82, y: 44, side: "offense", label: "3" },
    { x: 50, y: 58, side: "defense", label: "X" },
  ],
  movements: [{ from: { x: 18, y: 44 }, to: { x: 30, y: 72 } }],
  passes: [
    { from: { x: 50, y: 24 }, to: { x: 18, y: 44 } },
    { from: { x: 18, y: 44 }, to: { x: 82, y: 44 } },
  ],
  caption: "Top drives nail pass; fill behind; back-cut if denied (solid cut shown).",
};

const diagramSkillFast: PracticeBlockDiagram = {
  players: [
    { x: 22, y: 28, side: "offense", label: "1" },
    { x: 50, y: 20, side: "offense", label: "2" },
    { x: 78, y: 28, side: "offense", label: "3" },
    { x: 50, y: 52, side: "defense", label: "X" },
  ],
  movements: [
    { from: { x: 22, y: 28 }, to: { x: 34, y: 78 } },
    { from: { x: 78, y: 28 }, to: { x: 66, y: 78 } },
  ],
  passes: [{ from: { x: 22, y: 28 }, to: { x: 50, y: 20 } }],
  caption: "Outlet pitch ahead; wings sprint lanes (solid); first pass up (dashed).",
};

const diagramTeamShell: PracticeBlockDiagram = {
  players: [
    { x: 22, y: 42, side: "offense", label: "1" },
    { x: 12, y: 88, side: "offense", label: "2" },
    { x: 50, y: 22, side: "offense", label: "3" },
    { x: 30, y: 48, side: "defense", label: "X" },
    { x: 48, y: 58, side: "defense", label: "X" },
    { x: 54, y: 78, side: "defense", label: "X" },
  ],
  movements: [{ from: { x: 22, y: 42 }, to: { x: 34, y: 82 } }],
  passes: [{ from: { x: 22, y: 42 }, to: { x: 50, y: 22 } }],
  caption: "Ball on wing: baseline drive (solid), skip to slot (dashed). Shell help.",
};

const diagramTeamZone: PracticeBlockDiagram = {
  players: [
    { x: 50, y: 30, side: "offense", label: "1" },
    { x: 20, y: 48, side: "offense", label: "2" },
    { x: 80, y: 48, side: "offense", label: "3" },
    { x: 50, y: 56, side: "defense", label: "M" },
    { x: 28, y: 72, side: "defense", label: "B" },
    { x: 72, y: 72, side: "defense", label: "B" },
  ],
  movements: [{ from: { x: 20, y: 48 }, to: { x: 38, y: 78 } }],
  passes: [{ from: { x: 50, y: 30 }, to: { x: 80, y: 48 } }],
  caption: "Zone: baseline drive vs wing; reversal skip (dashed) to weak side.",
};

const diagramCompetitive: PracticeBlockDiagram = {
  players: [
    { x: 28, y: 44, side: "offense", label: "1" },
    { x: 14, y: 84, side: "offense", label: "2" },
    { x: 36, y: 52, side: "defense", label: "X" },
    { x: 22, y: 78, side: "defense", label: "X" },
  ],
  movements: [{ from: { x: 28, y: 44 }, to: { x: 44, y: 70 } }],
  passes: [{ from: { x: 28, y: 44 }, to: { x: 14, y: 84 } }],
  caption: "2v2 half: drive kick (dashed) or downhill (solid) — keep score.",
};

const diagramScrimmage: PracticeBlockDiagram = {
  players: [
    { x: 22, y: 38, side: "offense", label: "1" },
    { x: 50, y: 22, side: "offense", label: "2" },
    { x: 78, y: 38, side: "offense", label: "3" },
    { x: 30, y: 54, side: "defense", label: "X" },
    { x: 50, y: 58, side: "defense", label: "X" },
    { x: 70, y: 54, side: "defense", label: "X" },
  ],
  movements: [{ from: { x: 50, y: 22 }, to: { x: 50, y: 48 } }],
  passes: [
    { from: { x: 22, y: 38 }, to: { x: 50, y: 22 } },
    { from: { x: 50, y: 22 }, to: { x: 78, y: 38 } },
  ],
  caption: "5v5 spacing: wing entry, reversal, middle drive (solid).",
};

const diagramFT: PracticeBlockDiagram = {
  players: [
    { x: 50, y: 64, side: "offense", label: "S" },
    { x: 38, y: 52, side: "offense", label: "P" },
    { x: 50, y: 86, side: "defense", label: "R" },
  ],
  movements: [{ from: { x: 38, y: 52 }, to: { x: 44, y: 58 } }],
  passes: [{ from: { x: 38, y: 52 }, to: { x: 50, y: 64 } }],
  caption: "Shooter on line; passer step-in (dashed); rebounder blocks out (R).",
};

function buildPracticePlan(offense: string, defense: string, problems: string[]): PracticePlan {
  const o = offense.trim() || "your offense";
  const d = defense.trim() || "your defense";
  const p = problems.length ? problems : ["execution"];

  const primary = p[0].toLowerCase();
  const title = `Practice: ${o} / ${d} — stress ${primary}`;

  const turnoverNote =
    p.includes("Turnovers") || primary.includes("turnover")
      ? "Every live segment: two hands on catches; jump stop on penetration unless finishing."
      : null;
  const reboundNote =
    p.includes("Rebounding") || primary.includes("rebound")
      ? "Hit someone on every shot — no watching the ball in the air."
      : null;
  const commNote =
    p.includes("Communication") || primary.includes("communication")
      ? "Ball-handler calls the screen; help defenders call early \"I got ball\" or \"I got roller\"."
      : null;
  const transNote =
    p.includes("Transition Defense") || primary.includes("transition")
      ? "Sprint back on a miss: first three steps dictate whether you stop the ball or peel to paint."
      : null;

  const extraCoaching = [turnoverNote, reboundNote, commNote, transNote].filter(Boolean) as string[];

  const skillGoal = `Reps that match ${o.toLowerCase()} pace and reads.`;
  const teamGoal = `Install one live possession rule for ${d.toLowerCase()} that you can call in games.`;

  const skillDiagram = offense.includes("Pick")
    ? diagramSkillPnR
    : offense.includes("Motion") || offense.includes("5-Out")
      ? diagramSkillMotion
      : diagramSkillFast;

  const teamDiagram = defense.includes("Zone") ? diagramTeamZone : diagramTeamShell;

  return {
    practiceTitle: title,
    totalPracticeTime: "1 hour 40 minutes (100 min)",
    warmup: block(
      "12 min",
      "Raise heart rate, loosen hips and shoulders, get clean catches on the move.",
      [
        "Two lines full court: pass leads the runner — no soft lobs.",
        "Land in athletic stance after every catch.",
        ...extraCoaching.slice(0, 1),
      ],
      [
        "Jogging without passing windows.",
        "Straight legs — players shortcut the dynamic prep.",
      ],
      "Lines on the baseline. Jog to free throw line extended, carioca to half, high knees to opposite baseline. Then partner full-court pass-and-catch: chest passes only, switch sides at half. Finish with 2-min form shooting from 8 feet (swish or re-rack).",
      diagramWarmup
    ),
    skillDevelopment: block(
      "22 min",
      skillGoal,
      [
        `Guards: live dribble into ${o.toLowerCase()} entry — eyes on rim when you can.`,
        "Wings: catch on the hop; show hands early.",
        "Bigs: screen angles — hip to hip on contact, slip only when defender cheats high.",
        ...extraCoaching.slice(1, 2),
      ],
      [
        "Stationary dribble — no paint touches.",
        "Screens set too far from the defender (no contact).",
      ],
      offense.includes("Pick")
        ? "Half court: coach feeds wing. Ball screen at slot; guard reads — reject if helper jumps early, turn corner if flat. Rotate groups every 90 seconds. Progress to \"tag the roller\" with a coach as weak-side helper so big practices short roll vs pop. 8 makes each side before rotating roles."
        : offense.includes("Motion") || offense.includes("5-Out")
          ? "5-on-0 shell: pass, cut, replace. Coach stops play on first bad spacing (corner too shallow, nail not filled). Run through three sequences, then same motion with a token defender who can deny one pass — offense must back-cut or skip on time."
          : "3-on-0 fast break: outlet, lane fill, pitch ahead. Coach stands at top as trailer — finish with a three-point shot or layup rule (no mid unless clock drill). Then 2-on-1 continuous from wing — defender starts at block; offense must tag the defender with a pass fake once before score.",
      skillDiagram
    ),
    teamConcept: block(
      "20 min",
      teamGoal,
      [
        `On dead ball: get your ${d.toLowerCase()} matchups set before the ball is inbounded.`,
        "Closeouts: high hands, short choppy steps, contest without fouling.",
        ...extraCoaching.slice(2, 3),
      ],
      [
        "Closeout with hands down.",
        "Help that leaves the only shooter open on the skip.",
      ],
      defense.includes("Zone")
        ? "2-3 vs coach offense: start 5-on-5 half court, offense only ball reversal for 8 passes. Zone slides on string — wings touch paint on baseline drive. After 6 stops, offense may shoot on pass 4+. Chart defensive rebounds — offense gets +1 if they O-board."
        : defense.includes("Switch")
          ? "4-on-4 half: any ball screen is a switch; weak-side stays home unless ball enters paint. Coach blows whistle on lazy communication — defense runs baseline touch. Play to 7 by ones; losing team prints next opponent scout notes (joke optional)."
          : "Shell drill: start 4-on-4 with coach as fifth offensive player in corner. Ball swings — defense jumps to ball, stunts from nail, recover. Add drive-and-kick; help must tag roller then recover to shooter in two choppy closeouts.",
      teamDiagram
    ),
    competitiveDrill: block(
      "15 min",
      "Win the possession — scoreboard pressure without full scrimmage wear.",
      [
        "Sub every 2 minutes so legs stay fresh.",
        "Start each mini-game with a specific disadvantage (e.g., offense down 2).",
      ],
      [
        "Hero ball on last possession.",
        "Fouling on closeouts because feet are square to sideline.",
      ],
      "King of the court half court: winners stay, play to 2. If you lose twice in a row, sub out one minute. Emphasis call from coach each round: either \"no paint without a pass\" or \"defense must get a deflection before they can score in transition.\"",
      diagramCompetitive
    ),
    scrimmage: block(
      "22 min",
      "Game conditions: call fouls tight on hands; enforce your inbound and press break if you use them.",
      [
        `Start each quarter with a written emphasis tied to ${primary} (one stat you count).`,
        "Water only on stoppages — keep flow.",
      ],
      [
        "Walking back on defense after a make.",
        "Arguing calls — save it for film.",
      ],
      "5-on-5: two 10-minute segments with running clock except last 2 minutes (stop clock). Segment 1: normal rules. Segment 2: offense -2 if they turn it over in first 8 seconds of shot clock (use 24 or 30 to match your league). Keep a simple sheet: rebounds, turnovers, paint touches.",
      diagramScrimmage
    ),
    freeThrowsConditioning: block(
      "9 min",
      "Legs under fatigue; routine stays the same shot to shot.",
      [
        "Same dribbles, same breath, same eyes before every free throw.",
        "Sprint lines on misses only if you use that rule in season — be consistent.",
      ],
      [
        "Rushing the line after a miss.",
        "Talking during someone else's routine.",
      ],
      "Each player 2 sets of 2 FTs (rotate through while others baseline touch). After each set: sideline to sideline sprint × 3 on make, × 5 on miss. If time remains, add 30-second plank as a team after last shooter — not punishment, just core for rebounding posture.",
      diagramFT
    ),
  };
}

export async function POST(req: Request) {
  const body = await req.json();
  const { offense, defense, problems } = body as {
    offense?: string;
    defense?: string;
    problems?: string[];
  };

  const plan: PracticePlan = buildPracticePlan(
    offense ?? "",
    defense ?? "",
    Array.isArray(problems) ? problems : []
  );

  return Response.json({ plan });
}
