/**
 * Asserts all five practice blocks get distinct drill visualization JSON.
 */
import { buildPracticePlan } from "../app/lib/practicePlanGenerator";
import type { PracticePlan } from "../app/types/plan";

const fields = {
  locale: "he" as const,
  workingOn: "הגנה וקליעה חצי מגרש",
  chips: ["defense", "shooting"] as ("defense" | "shooting")[],
  presets: [] as string[],
  advancedTags: [] as string[],
};

const plan = buildPracticePlan(fields);

function sig(p: PracticePlan["warmup"]) {
  return JSON.stringify(p.visualization);
}

const slices = [plan.warmup, plan.drill1, plan.drill2, plan.drill3, plan.gameFiveOnFive];
const set = new Set(slices.map(sig));
if (set.size !== slices.length) {
  console.error("FAIL: duplicate visualization JSON across blocks", set.size);
  slices.forEach((s, i) => console.error(i, s.name, sig(s).slice(0, 120)));
  process.exit(1);
}

console.log("OK: 5 distinct drill JSON fingerprints for multi-goal plan");
