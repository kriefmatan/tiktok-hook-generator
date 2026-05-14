import type { WeeklyPlan } from "../../types/plan";

function buildWeeklyPlan(
  offense: string,
  defense: string,
  problems: string[]
): WeeklyPlan {
  const o = offense || "Balanced offense";
  const d = defense || "Connected defense";
  const problemList = problems.length ? problems : ["Execution details"];
  const weekLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const teamName = `${o.split(" ")[0]} ${d.split(" ")[0]} Collective`;

  return {
    weeklyTeamIdentity: {
      teamName,
      weekLabel: `Week of ${weekLabel}`,
      tagline: `${o} · ${d}`,
      identitySummary: `This week we sharpen who we are with ${o.toLowerCase()} principles on offense and ${d.toLowerCase()} habits on defense. Priority stress points: ${problemList.join(", ")}.`,
    },
    mainFocus: `Unify practice energy around ${problemList[0].toLowerCase()} while embedding ${o.toLowerCase()} decisions in live segments. Every drill should end with a competitive rep that reflects game speed and our ${d.toLowerCase()} triggers.`,
    practiceGoals: [
      `Install two core actions that reinforce ${o.toLowerCase()} spacing and decision timing.`,
      `Run three game-like closeouts per practice tied to ${d.toLowerCase()} communication standards.`,
      `Close each session with measurable ${problemList[0].toLowerCase()} wins (counts, stops, or execution score).`,
    ],
    playerMissions: [
      {
        role: "Guards",
        mission: "Own tempo and entry passes; initiate our primary actions without turnovers.",
        metric: "500 game-speed passes + 50 paint touches (tracked)",
      },
      {
        role: "Wings",
        mission: "Stretch the floor and sprint corners; finish contested catches with balance.",
        metric: "200 catch-and-shoot reps + 40 transition sprints",
      },
      {
        role: "Bigs",
        mission: "Set physical screens, roll with pace, and own the glass on both ends.",
        metric: "80 box-outs + 60 rim contests (film verified)",
      },
    ],
    teamCultureEmphasis: [
      "Communication before the play, not after the mistake.",
      "Compete in every drill — depth chart is earned weekly.",
      "Film and stats are tools for growth, not judgment.",
    ],
    progression: [
      { title: "Teach & install", detail: "Walk-throughs, terminology, and non-live reps to build clarity." },
      { title: "Guided live", detail: "Constraints that force the main focus; coaches stop and teach." },
      { title: "Competitive blocks", detail: "Scrimmage segments with scoring rules tied to weekly goals." },
      { title: "Review & lock", detail: "Film review, player-led corrections, and accountability check-ins." },
    ],
  };
}

export async function POST(req: Request) {
  const body = await req.json();
  const { offense, defense, problems } = body as {
    offense?: string;
    defense?: string;
    problems?: string[];
  };

  const plan: WeeklyPlan = buildWeeklyPlan(
    offense ?? "",
    defense ?? "",
    Array.isArray(problems) ? problems : []
  );

  return Response.json({ plan });
}
