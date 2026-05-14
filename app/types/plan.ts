export type WeeklyPlan = {
  weeklyTeamIdentity: {
    teamName: string;
    weekLabel: string;
    tagline: string;
    identitySummary: string;
  };
  mainFocus: string;
  practiceGoals: [string, string, string];
  playerMissions: { role: string; mission: string; metric: string }[];
  teamCultureEmphasis: string[];
  progression: { title: string; detail: string }[];
};
