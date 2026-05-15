import {
  buildDrillVisualization,
  matchesRunJumpContext,
  prefersDefenseOnlyDiagram,
} from "../app/lib/visualization/buildDrillVisualization.ts";
import type { EmphasisKey } from "../app/lib/locale/coachBundle.types";

const keysPressure = new Set<EmphasisKey>(["pressure", "switch"]);
if (!prefersDefenseOnlyDiagram(keysPressure)) {
  console.error("FAIL: prefersDefenseOnlyDiagram(pressure,switch)");
  process.exit(1);
}

const runJumpBlob = `ראן אנד גאמפ · לחץ על הכדור`;
if (!matchesRunJumpContext(runJumpBlob)) {
  console.error("FAIL matchesRunJumpContext Hebrew");
  process.exit(1);
}

const a = buildDrillVisualization({
  emphasis: "pressure",
  secondaryKind: "switch",
  blockKind: "drill1",
  blockIndex: 0,
  name: "ראן אנד גאמפ",
  coachingPoints: ["לחץ על הכדור", "ידיים למעלה"],
  seed: 42,
});

const trapLike = a.actions.filter((x) => x.type === "closeout").length >= 2 && a.actions.some((x) => x.type === "pass");
if (!trapLike) {
  console.error("FAIL: expected run-jump style (pass + 2 closeouts)", a.actions);
  process.exit(1);
}

const b = buildDrillVisualization({
  emphasis: "pressure",
  secondaryKind: "switch",
  blockKind: "drill2",
  blockIndex: 1,
  name: "זריקות אחרי סגירה",
  coachingPoints: ["לחץ על הכדור", "סגרו את האמצע"],
  seed: 42,
});

const shellLike =
  b.actions[0]?.type === "move" &&
  b.actions[1]?.type === "closeout" &&
  b.actions.filter((x) => x.type === "closeout").length >= 2;
if (!shellLike) {
  console.error("FAIL: expected on-ball shell", b.actions);
  process.exit(1);
}

console.log("OK: defense visualization routing");
