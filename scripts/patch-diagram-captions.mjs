import fs from "fs";
const p = "app/lib/practicePlanGenerator.ts";
let s = fs.readFileSync(p, "utf8");
const pairs = [
  [
    `    "Air PNR footwork: guard comes off (solid), entry to roller (dashed). Chair = screener’s defender."`,
    `    b.captions.warmupPnR`,
  ],
  [
    `    "5-out ghost spacing: fill on drive (solid), reversal around horn (dashed)."`,
    `    b.captions.warmupFiveOut`,
  ],
  [
    `    "Triangle passing: quick reversals (dashed) vs token pressure at nail (D)."`,
    `    b.captions.warmupTurnover`,
  ],
  [
    `    "Tap-out war: two crashers find body (solid), coach toss not shown — finish with two-hand chin."`,
    `    b.captions.warmupRebound`,
  ],
  [
    `    "Trap escape: split line (solid), outlet to release valve (dashed)."`,
    `    b.captions.warmupTrap`,
  ],
  [
    `    "Two-line dynamic: pass across top (dashed), sprint lane (solid)."`,
    `    b.captions.warmupDefault`,
  ],
  [
    `    "Motion prep: UCLA entry pass (dashed), face-cut path (solid) vs token deny."`,
    `    b.captions.warmupMotion`,
  ],
  [
    `    "After a score: defenders sprint lanes (solid) — paint touch then find ball."`,
    `    b.captions.warmupTransitionSprint`,
  ],
  [
    `    "Same routine three spots — rhythm shots, no contests yet."`,
    `    b.captions.warmupShootingRoutine`,
  ],
  [
    `    "Coach signal: cut or reversal (dashed) vs hold then drive (solid)."`,
    `    b.captions.warmupDecisionSignals`,
  ],
  [
    `    "PNR live: hedge/trap read (def), turn corner vs drop (solid), skip when low man tags (dashed)."`,
    `    b.captions.skillPnR`,
  ],
  [
    `    "PNR + nail tag: pocket or skip before second dribble — no loose gathers vs help."`,
    `    b.captions.skillPnRTurnover`,
  ],
  [
    `    "5-out vs token doubles at nail: drive decision (solid), reversal (dashed) — no first dribble in first 6s."`,
    `    b.captions.skillFiveOutTurnover`,
  ],
  [
    `    "Drive-react: baseline drift triggers skip (dashed); driver fills behind (solid)."`,
    `    b.captions.skillFiveOut`,
  ],
  [
    `    "Motion: UCLA cut — pass to wing (dashed), cutter shallow cut (solid)."`,
    `    b.captions.skillMotion`,
  ],
  [
    `    "Fly lanes: outlet up (dashed), wide runners fill corners (solid)."`,
    `    b.captions.skillFast`,
  ],
  [
    `    "Catch-and-shoot from corners (dashed feeds) — stay square."`,
    `    b.captions.skillShootingCorners`,
  ],
  [
    `    "2v1 read: help shows (dashed skip), no help = drive (solid)."`,
    `    b.captions.skillReadReact`,
  ],
  [
    `    "Gap read: entry (dashed), second-side drive (solid)."`,
    `    b.captions.skillGeneralVersatile`,
  ],
  [
    `    "Pressure passing window: nail handler vs two active hands (no dribble segment)."`,
    `    b.captions.skillTurnoverPressure`,
  ],
  [
    `    "Box-out triangle: find hit first (solid), release to ball on coach slap (not drawn)."`,
    `    b.captions.skillRebound`,
  ],
  [
    `    "Zone O: short corner lift (solid), high reversal vs 2-3 (dashed)."`,
    `    b.captions.teamZoneOffense`,
  ],
  [
    `    "Trap: funnel to sideline, middle release (dashed) — sprint rules on turnover."`,
    `    b.captions.teamTrapPress`,
  ],
  [
    `    "Deny one pass away: face-guard pressure, reversal through high post (dashed)."`,
    `    b.captions.teamPressureDeny`,
  ],
  [
    `    "Switch vs empty-corner PNR: exchange matchups (solid defender paths), weak-side stay home."`,
    `    b.captions.teamSwitch`,
  ],
  [
    `    "Shell: baseline drive + skip — stunt timing and recover to shooter."`,
    `    b.captions.teamShellMan`,
  ],
  [
    `    "Conversion: sprint lanes back (solid) — stop ball or peel to level, communicate runner."`,
    `    b.captions.teamTransition`,
  ],
  [
    `    "PNR king: score only off ball screen or roll — keep score to 3."`,
    `    b.captions.compPnRKing`,
  ],
  [
    `    "Russian hot potato: no dribble until coach yells 'live' — dropped ball = sprint line."`,
    `    b.captions.compRussian`,
  ],
  [
    `    "7-4 putback game: only second-chance buckets count — diagram shows crash paths."`,
    `    b.captions.compRebound74`,
  ],
  [
    `    "Zone constraint: must touch short corner before shot — reversal shown."`,
    `    b.captions.compZoneConstraint`,
  ],
  [
    `    "Live trap: middle split then long outlet — clock starts on catch."`,
    `    b.captions.compTrapLive`,
  ],
  [
    `    "2v2 read game: drive-kick vs hard help — first to 5 hockey points."`,
    `    b.captions.compShell2v2`,
  ],
  [
    `    "Live 5v5 spacing: reversal then middle drive — count paint touches."`,
    `    b.captions.scrimSpread`,
  ],
  [
    `    "Zone scrimmage rule: short-corner touch before FGA — lift path solid."`,
    `    b.captions.scrimZoneRule`,
  ],
  [
    `    "Press break live: trap at logo, release up sideline — 10-second backcourt."`,
    `    b.captions.scrimPress`,
  ],
  [
    `    "8-second halfcourt emphasis: pitch ahead (dashed), quick enter (solid)."`,
    `    b.captions.scrimTurnoverClock`,
  ],
];
for (const [from, to] of pairs) {
  if (!s.includes(from)) {
    console.error("Missing:", from.slice(0, 60));
    process.exit(1);
  }
  s = s.split(from).join(to);
}
fs.writeFileSync(p, s);
console.log("ok");
