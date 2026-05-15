import fs from "fs";
const p = "app/lib/practicePlanGenerator.ts";
let s = fs.readFileSync(p, "utf8");
const names = [
  "diagramWarmupPnR",
  "diagramWarmupFiveOut",
  "diagramWarmupTurnover",
  "diagramWarmupRebound",
  "diagramWarmupTrap",
  "diagramWarmupDefault",
  "diagramWarmupMotion",
  "diagramWarmupTransitionSprint",
  "diagramWarmupShootingRoutine",
  "diagramWarmupDecisionSignals",
  "diagramSkillPnR",
  "diagramSkillPnRTurnover",
  "diagramSkillFiveOutTurnover",
  "diagramSkillFiveOut",
  "diagramSkillMotion",
  "diagramSkillFast",
  "diagramSkillShootingCorners",
  "diagramSkillReadReact",
  "diagramSkillGeneralVersatile",
  "diagramSkillTurnoverPressure",
  "diagramSkillRebound",
  "diagramTeamZoneOffense",
  "diagramTeamTrapPress",
  "diagramTeamPressureDeny",
  "diagramTeamSwitch",
  "diagramTeamShellMan",
  "diagramTeamTransition",
  "diagramCompPnRKing",
  "diagramCompRussian",
  "diagramCompRebound74",
  "diagramCompZoneConstraint",
  "diagramCompTrapLive",
  "diagramCompShell2v2",
  "diagramScrimmageSpread",
  "diagramScrimmageZoneRule",
  "diagramScrimmagePress",
  "diagramScrimmageTurnoverClock",
];
const marker = "function (b: CoachPracticeBundle): PracticeBlockDiagram {";
let i = 0;
while (s.includes(marker) && i < names.length) {
  s = s.replace(marker, `function ${names[i]}(b: CoachPracticeBundle): PracticeBlockDiagram {`);
  i++;
}
if (s.includes(marker)) console.error("leftover markers", s.split(marker).length - 1);
if (i !== names.length) console.error("used", i, "expected", names.length);
fs.writeFileSync(p, s);
console.log("fixed", i);
