import type { SimplePracticeBundle } from "../coachBundle.types";

export const EN_SIMPLE = {
  locale: "en",
  dir: "ltr",
  formatMinutes: (n: number) => `${n} min`,
  totalTime: "~50 min",
  sectionLabels: ["Warmup", "Drill 1", "Drill 2", "Drill 3", "5-on-5 — today’s emphasis"] as const,
  headerFallback: "Practice",
  captions: {
    lines: "Two lines: pass across, sprint lane.",
    pnr: "Screen game: guard off pick, pass to roller.",
    shooting: "Catch-ready from three spots — same footwork.",
    rebound: "Two crashers find contact first.",
    passTriangle: "Quick reversals vs light pressure at the nail.",
    motion: "Wing entry, shallow cut vs soft deny.",
    shell: "Drive from wing, skip when help steps.",
    zone: "Short corner filled, high reversal vs 2-3.",
    transition: "Sprint lanes back — touch paint, find matchups.",
    five: "Live spacing: reversal then middle drive.",
  },
  titlesWarmup: [
    "Easy run-in",
    "Hands + feet wake-up",
    "Light tempo, sharp passes",
    "Loosen up, find rhythm",
    "Simple build-up",
    "Low-load start",
  ],
  titlesDrill1: [
    "First block — your theme",
    "Half-court — main idea",
    "Tight window, clear rule",
    "Build the habit",
    "Small numbers, big clarity",
    "One rule only",
  ],
  titlesDrill2: [
    "Second block — add pressure",
    "Same idea, live read",
    "Turn the dial slightly",
    "Keep the thread",
    "Add one defender read",
    "Stack the constraint",
  ],
  titlesDrill3: [
    "Third block — game speed",
    "Short clock, honest decisions",
    "Competitive segment",
    "Keep score, keep standards",
    "Finish the thread",
    "One clean correction each stop",
  ],
  titlesGame: [
    "5-on-5 — carry today forward",
    "Live — today’s emphasis",
    "Play it out for real",
    "Full court or half — your call",
    "Game minutes, one focus",
    "End with what matters today",
  ],
  bullets: {
    rebound: [
      "Hit first, then go get the ball.",
      "No leaking out before the board is yours.",
    ],
    shoot: [
      "Same pocket every catch — no rushing after a miss.",
      "Passer’s eyes on the shooter’s hands.",
    ],
    pnr: [
      "Call the screen early; late feet ruin timing.",
      "Weak side lifts one window when help shows.",
    ],
    zone: [
      "Touch short corner before any early three.",
      "Skip only after paint or short-corner touch.",
    ],
    turnover: [
      "Catch in your frame — no saving bad passes with steps.",
      "Pass fake should move a hand or a foot.",
    ],
    transition: [
      "Match up in four steps — talk it loud.",
      "Ball gets touched early; runners fill lanes.",
    ],
    generic: [
      "Keep coming back to what you wrote on the board.",
      "Short stoppages only — reps over speeches.",
    ],
  },
} satisfies SimplePracticeBundle;
