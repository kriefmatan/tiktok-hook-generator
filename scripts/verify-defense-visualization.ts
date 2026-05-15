/**
 * Smoke: Drill → validated JSON → visual (library presets + integrated resolver).
 */
import { ALL_LIBRARY_VISUALIZATIONS } from "../app/lib/visualization/drillVisualLibrary";
import { integratedBlockForSingleGoal } from "../app/lib/visualization/integratedPracticeDrill";
import { validateDrillVisualization } from "../app/lib/visualization/validateDrillVisualization";

for (const v of ALL_LIBRARY_VISUALIZATIONS) {
  if (!validateDrillVisualization(v)) {
    console.error("FAIL: library preset invalid", v);
    process.exit(1);
  }
}

const runJump = integratedBlockForSingleGoal({
  emphasis: "pressure",
  blockKind: "drill3",
  headlineTitle: "ראן אנד גאמפ · לחץ על הכדור",
  locale: "he",
});

const trapLike =
  runJump.visualization.actions.filter((x) => x.type === "closeout").length >= 2 &&
  runJump.visualization.actions.some((x) => x.type === "pass");
if (!trapLike) {
  console.error("FAIL: expected run-jump style (pass + 2 closeouts)", runJump.visualization.actions);
  process.exit(1);
}
if (!validateDrillVisualization(runJump.visualization)) {
  console.error("FAIL: run-jump block failed validation");
  process.exit(1);
}

const shell = integratedBlockForSingleGoal({
  emphasis: "pressure",
  blockKind: "warmup",
  headlineTitle: "חימום הגנה",
  locale: "he",
});

const shellLike =
  shell.visualization.actions[0]?.type === "move" &&
  shell.visualization.actions[1]?.type === "closeout" &&
  shell.visualization.actions.filter((x) => x.type === "closeout").length >= 2;
if (!shellLike) {
  console.error("FAIL: expected on-ball shell warmup", shell.visualization.actions);
  process.exit(1);
}
if (!validateDrillVisualization(shell.visualization)) {
  console.error("FAIL: shell block failed validation");
  process.exit(1);
}

if (runJump.coachingPoints.length < 1 || shell.coachingPoints.length < 1) {
  console.error("FAIL: coaching points should come from JSON");
  process.exit(1);
}

console.log("OK: defense visualization (integrated + validation)");
