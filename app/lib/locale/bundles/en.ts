import type { BlockDrillNames, BlockKind, BulletPair, EmphasisKey, SimplePracticeBundle } from "../coachBundle.types";

const block = (
  warmup: readonly string[],
  drill1: readonly string[],
  drill2: readonly string[],
  drill3: readonly string[],
  game: readonly string[]
): BlockDrillNames => ({ warmup, drill1, drill2, drill3, game });

const drills = (
  warmup: readonly string[],
  drill1: readonly string[],
  drill2: readonly string[],
  drill3: readonly string[],
  game: readonly string[]
) => block(warmup, drill1, drill2, drill3, game);

const EN_DRILL_NAMES: Record<EmphasisKey, BlockDrillNames> = {
  rebound: drills(
    ["Outlet lines after touch", "2-man box-out taps", "Release → crash → outlet"],
    ["2v2 on the shot — first to 6 boards", "3v3 paint war — extra point for O-board", "Closeout-box-out-rebound chain"],
    ["4v4 — no leak until ball secured", "Shell + crash weak side", "Live O-board only after contact"],
    ["5v5 — +2 for second chance", "Competitive boards to 7", "Last 4 min: no leak-outs"],
    ["5v5 — board then sprint back", "Game: O-board = extra possession", "Play through — crash both ends"]
  ),
  shoot: drills(
    ["Form 5 spots — 5 makes each", "Catch-ready threes — same footwork", "Drive-kick-corner — one dribble max"],
    ["Game spots: 4 corners, 2 makes rotate", "Curl & fill — passer must hold follow-through", "Drive-draw-kick — skip if corner sinks two"],
    ["4v4 — must touch paint before three", "Shell skip to shooter — closeout contest", "PnR kick — corner only after roller touch"],
    ["5v4 kick series — 12 makes total", "Competitive 3s — loser runs one line", "Last stop: best shooter takes last 3"],
    ["5v5 — open three only off two passes", "Game: corner three = +1", "Play your reads — shoot the open one"]
  ),
  pnr: drills(
    ["Side PnR walk-through — hips square", "Ghost screen timing — no live D", "2v0 Spain action — tag the roll"],
    ["Side ball screen — read high show vs drop", "Reject & re-screen — one side only", "4v3 shell — hit roller or corner"],
    ["Live PnR — weak side lifts on help", "Switch drill — slip or re-screen call", "3v3 — two finishes per possession"],
    ["4v4 — PnR every possession", "Tag the roller —0.5 help rules", "Competitive: 6 stops or 8 points"],
    ["5v5 — call screen early", "Game: ball screen side only", "Play through — no late screens"]
  ),
  zone: drills(
    ["Zone spots — pass to short corner", "3v2 overload corner — paint touch", "Skip pass only after corner touch"],
    ["4v3 vs 2-3 — one skip per trip", "Short corner live — dive from dunker", "High post flash — find corner or wing"],
    ["4v4 zone — ball reversal in 3 passes", "Flash middle vs 1-3-1", "Corner fill vs collapsing guards"],
    ["5v4 — touch paint before three", "Live zone — best look in 12 sec", "Competitive: 7 paint touches"],
    ["5v5 — no early threes vs zone", "Game: short corner touch rule", "Play your zone sets"]
  ),
  turnover: drills(
    ["Partner passing — feet set before catch", "2-ball tight handles — eyes up", "Pass fake must move a hand"],
    ["3v2 — no dribble until past half", "Shell — one-hand passes only", "4v4 — live-ball turnover = sprint back"],
    ["4v4 — two hands on catch in paint", "Trap escape — jump stop pivot", "Pressure pass — defender at hip"],
    ["5v4 — extra defender at half", "Competitive — turnover = 2 push-ups team", "Last segment: zero live-ball TOs"],
    ["5v5 — paint catch with frame", "Game: careless pass = other ball", "Play smart — value each possession"]
  ),
  transition: drills(
    ["3-lane sprint — touch paint both ends", "Outlet pass race — chest pass only", "Get-back jog vs sprint — call matchup"],
    ["4v4 conversion — score or 4-stop", "Number advantage 3v2 — fill lanes", "Trailer is last defender back"],
    ["4v4 — no shot until 2nd defender set", "Live rebound outlet — 8 sec clock", "Match up in 4 steps — talk loud"],
    ["5v5 — make-it take-it to 5", "Competitive transition — stop = sprint", "Last 3 min: no leak-outs"],
    ["5v5 — get back or no fast break", "Game: conversion defense wins", "Play through — talk matchups"]
  ),
  communication: drills(
    ["Name-pass-name in weave", "Closeout call drill — ball-side voice", "Defensive three — switch call only"],
    ["3v3 — no score without two calls", "Shell — help and recover loud", "4v4 — mismatch call before trap"],
    ["4v4 — screen call before contact", "Live — wrong call = possession flip", "Transition — matchup number call"],
    ["5v5 — silent = extra sprint", "Competitive — best talk wins", "Last stop: one voice on ball"],
    ["5v5 — your calls on every screen", "Game: no call = turnover", "Play loud — same words every time"]
  ),
  decision: drills(
    ["Read line — drive-kick or finish", "2v1 — zero dribble finish", "Tagger decides — pass or shot"],
    ["3v3 — extra pass before shot", "4v3 — find the open man in 2 passes", "Shell — drive when help is late"],
    ["4v4 — no hero ball in paint", "PnR read — hit roller or skip", "Competitive — best decision wins"],
    ["5v4 — drive-draw-kick series", "Live — wrong read = other team ball", "Last segment: one more pass rule"],
    ["5v5 — play what you see", "Game: extra point for assist chain", "Play unselfish — quick decisions"]
  ),
  motion: drills(
    ["Down screen — tight cut, hands ready", "Flex corner exchange — feet set", "Back screen — slip or pop call"],
    ["4-out motion — fill behind drive", "Continuous screens one side", "3v3 motion — score on second side"],
    ["4v4 motion — no standing 3 sec", "Live — screen angle matters", "Weak side exchange on drive"],
    ["5v5 motion sets only", "Competitive — score off screen", "Last block: same action both sides"],
    ["5v5 — run your motion", "Game: back cut = +1", "Play through — keep moving"]
  ),
  pressure: drills(
    ["1v1 full court — 3 dribbles max", "Trap escape at half — jump stop", "Deny drill — hand in lane"],
    ["3v3 full court — make 3 stops", "Run-and-jump show — no reach", "4v4 press — trap sideline only"],
    ["4v4 — no middle penetration", "Live press — sprint on shot", "Shell with ball pressure"],
    ["5v5 press to 7", "Competitive — press break scores", "Last 4 min: full court every dead ball"],
    ["5v5 — press your rules", "Game: steal = bonus point", "Play aggressive — hands up"]
  ),
  spacing: drills(
    ["Drive-kick — corner stays wide", "Fill behind — one dribble pull-up", "Spacing spots — 12 ft apart"],
    ["4-out — drive gap, kick to corner", "3v3 — no two players in paint", "Shell skip when help collapses"],
    ["4v4 — paint count max 2", "Live — relocate on drive", "Weak side lift on corner fill"],
    ["5v5 — spacing penalty = other ball", "Competitive — best spacing wins", "Last segment: no paint stand"],
    ["5v5 — floor spread", "Game: corner three after drive", "Play wide — move without ball"]
  ),
  fiveOut: drills(
    ["5-out pass and cut — fill corner", "Drive from top — corner lift", "Handoff wing — reject or go"],
    ["4v4 five-out — no post ups", "Drive-draw-kick from nail", "3v3 — corner stays corner"],
    ["4v4 — slip cut on help", "Live five-out — one side drive", "Competitive — 8 paint touches"],
    ["5v5 five-out sets", "Game: corner three after two passes", "Last block: drive-kick only"],
    ["5v5 — spread floor", "Play your five-out", "Game: no post catches"]
  ),
  fast: drills(
    ["3-man weave to layup", "Outlet race — first to 5", "Sprint lanes — ball ahead"],
    ["3v2 primary break", "4v4 — score in 8 sec or defense wins", "Trailer fills opposite corner"],
    ["4v4 — no shot until 2nd trail in", "Live break — pitch ahead", "Competitive: 6 stops or 10 points"],
    ["5v5 — make-it take-it", "Game: fast break = +1", "Last 3 min: push every miss"],
    ["5v5 — run your break", "Play pace — pitch ahead", "Game: no walk-it-up"]
  ),
  switch: drills(
    ["Switch 1v1 — communicate early", "Big-little switch drill", "Screen call → switch or stay"],
    ["3v3 — switch everything", "4v4 — slip on late switch", "Shell — show and switch"],
    ["4v4 live — no free rolls", "Switch blitz on side PnR", "Competitive: 6 stops"],
    ["5v5 switch rules", "Game: mismatch hunt after switch", "Last block: talk every screen"],
    ["5v5 — your switch scheme", "Play through switches", "Game: no open rollers"]
  ),
  generic: drills(
    ["Two lines — pass and finish", "Closeout-touch-tag", "3-man weave to rim"],
    ["3v3 half court — one rule", "Shell 4v3 — drive and kick", "4v4 — coach sets the constraint"],
    ["4v4 — add one defender read", "Same theme, live second", "Competitive segment to 7"],
    ["5v4 advantage work", "5v5 segment — one focus", "Competitive — keep score"],
    ["5v5 — carry today forward", "Game minutes — your emphasis", "Play it out — coach on one thing"]
  ),
};

const EN_BLOCK_FRAMES: Record<BlockKind, BulletPair> = {
  warmup: ["Joint prep and light ball touches", "Dynamic stretch — no standing in lines"],
  drill1: ["One demo, then pairs", "Slow reps — fix footwork first"],
  drill2: ["Game speed — score or task", "Small competition every set"],
  drill3: ["Live defense — short stoppages", "Mistake = light consequence"],
  game: ["5-on-5 — same rule as today", "Call what we drilled"],
};

const EN_SETUP_HOOKS: Record<EmphasisKey, string> = {
  rebound: "Boards first",
  shoot: "Open? Shoot it",
  pnr: "Call the screen early",
  zone: "Paint touch first",
  turnover: "Take care of the ball",
  transition: "Get back, then run",
  communication: "Talk",
  decision: "Read it",
  motion: "Off-ball — move the defense",
  pressure: "Pressure the ball",
  spacing: "Spread out",
  fiveOut: "Five out",
  fast: "Push pace",
  switch: "Call the switch",
  generic: "Today's focus",
};

export const EN_SIMPLE = {
  locale: "en",
  dir: "ltr",
  formatMinutes: (n: number) => `${n} min`,
  totalTime: "~50 min",
  sectionLabels: ["Warmup", "Drill 1", "Drill 2", "Drill 3", "5-on-5 — today's rule"] as const,
  headerFallback: "Practice",
  setupHooks: EN_SETUP_HOOKS,
  blockFrames: EN_BLOCK_FRAMES,
  drillNames: EN_DRILL_NAMES,
  captions: {
    lines: "Two lines: pass across, sprint the lane.",
    pnr: "Side screen — guard off, hit roller or corner.",
    shooting: "Three spots — same footwork every catch.",
    rebound: "Two crashers hit body before the ball.",
    passTriangle: "Quick reversals vs light nail pressure.",
    motion: "Wing entry, shallow cut vs soft deny.",
    shell: "Wing drive — skip when help shows.",
    zone: "Short corner filled, high reversal vs 2-3.",
    transition: "Sprint back — touch paint, find your man.",
    five: "Live spacing: reversal, then middle drive.",
  },
  bullets: {
    rebound: [
      "Hit somebody before you go get the ball.",
      "No leaking out until we have it.",
    ],
    shoot: [
      "Same pocket on every catch — don't rush after a miss.",
      "Passer's eyes on the shooter's hands.",
    ],
    pnr: [
      "Call the screen early — late feet kill the timing.",
      "Weak side lifts one window when help shows.",
    ],
    zone: [
      "Short corner before any early three.",
      "Skip only after paint or short-corner touch.",
    ],
    turnover: [
      "Strong catch.",
      "Bad pass? Don't run it down.",
    ],
    transition: [
      "Match up in four steps — say the name.",
      "Ball touched early; runners fill lanes.",
    ],
    communication: [
      "Ball-side voice on every screen.",
      "If they didn't hear you, it didn't happen.",
    ],
    decision: [
      "One more pass when two guys collapse.",
      "Drive when help is a step late — kick when it's there.",
    ],
    motion: [
      "Screen angle matters — butt to the defender.",
      "Cut tight; hands ready before you turn.",
    ],
    pressure: [
      "Hands up, no reach — make them pick the ball up.",
      "Trap on the sideline, not in the middle.",
    ],
    spacing: [
      "Corner stays wide when the ball drives.",
      "Two in the paint is enough — relocate.",
    ],
    fiveOut: [
      "Drive the gap — corner lifts, don't drift in.",
      "Fill behind the drive; don't stand and watch.",
    ],
    fast: [
      "Pitch ahead — don't dribble into traffic.",
      "First three steps back on a miss.",
    ],
    switch: [
      "Call it before contact, not after.",
      "Big switches early — don't chase from behind.",
    ],
    generic: [
      "Come back to what you wrote on the board.",
      "Short stoppages — reps beat speeches.",
    ],
  },
} satisfies SimplePracticeBundle;
