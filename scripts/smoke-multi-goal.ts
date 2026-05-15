import { goalsFromFields } from "../app/lib/coach/coachGoals";
import { validateForcedDrill } from "../app/lib/coach/forcedDrillRules";
import { buildPracticePlan } from "../app/lib/practicePlanGenerator";
import {
  allCatalogDrillKeys,
  catalogDrillTitle,
} from "../app/lib/locale/combinedSituations";
import type { CoachGoal } from "../app/lib/coach/coachGoals";
import type { BlockKind } from "../app/lib/locale/coachBundle.types";

const BLOCKS: BlockKind[] = ["warmup", "drill1", "drill2", "drill3", "game"];

function goalsFromComboKey(key: string): CoachGoal[] {
  return key.split("+") as CoachGoal[];
}

// Catalog: every stored title passes forced-outcome rules
for (const key of allCatalogDrillKeys("he")) {
  const goals = goalsFromComboKey(key);
  for (const block of BLOCKS) {
    const title = catalogDrillTitle("he", key, block);
    if (!title || !validateForcedDrill(title, goals)) {
      console.error("FAIL catalog forced:", key, block, title);
      process.exit(1);
    }
  }
}

const goals = goalsFromFields({
  locale: "he",
  workingOn: "",
  chips: ["defense", "shooting"],
});

const p = buildPracticePlan({
  locale: "he",
  workingOn: "",
  chips: ["defense", "shooting"],
});

const secs = [p.warmup, p.drill1, p.drill2, p.drill3, p.gameFiveOnFive];

for (const s of secs) {
  if (!validateForcedDrill(s.name, goals)) {
    console.error("FAIL plan title not forced:", s.name);
    process.exit(1);
  }
}

const titles = secs.map((s) => s.name);
console.log("titles:", titles);
console.log("OK: all catalog + defense+shooting drills have forced outcomes");
