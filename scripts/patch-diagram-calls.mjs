import fs from "fs";
const p = "app/lib/practicePlanGenerator.ts";
let s = fs.readFileSync(p, "utf8");
const names = [
  "diagramScrimmageTurnoverClock",
  "diagramScrimmageZoneRule",
  "diagramWarmupTransitionSprint",
  "diagramWarmupShootingRoutine",
  "diagramWarmupDecisionSignals",
  "diagramSkillFiveOutTurnover",
  "diagramSkillTurnoverPressure",
  "diagramSkillGeneralVersatile",
  "diagramSkillShootingCorners",
  "diagramWarmupFiveOut",
  "diagramCompZoneConstraint",
  "diagramTeamPressureDeny",
  "diagramTeamZoneOffense",
  "diagramSkillPnRTurnover",
  "diagramWarmupTurnover",
  "diagramCompRebound74",
  "diagramTeamTrapPress",
  "diagramSkillReadReact",
  "diagramWarmupDefault",
  "diagramWarmupRebound",
  "diagramCompTrapLive",
  "diagramCompShell2v2",
  "diagramCompPnRKing",
  "diagramCompRussian",
  "diagramTeamShellMan",
  "diagramTeamTransition",
  "diagramSkillFiveOut",
  "diagramSkillRebound",
  "diagramSkillMotion",
  "diagramSkillFast",
  "diagramWarmupMotion",
  "diagramWarmupPnR",
  "diagramWarmupTrap",
  "diagramSkillPnR",
  "diagramTeamSwitch",
  "diagramScrimmageSpread",
  "diagramScrimmagePress",
];
for (const n of names) {
  s = s.split(`${n}()`).join(`${n}(b)`);
}
fs.writeFileSync(p, s);
console.log("diagram calls patched");
