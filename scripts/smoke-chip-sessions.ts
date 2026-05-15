import { buildPracticePlan } from "../app/lib/practicePlanGenerator";
import type { ChipId } from "../app/lib/locale/uiCatalog";

const CHIP_ORDER: ChipId[] = [
  "defense",
  "shooting",
  "transition",
  "ballMovement",
  "finishing",
  "oneOnOne",
  "rebounding",
  "spacing",
  "pressBreak",
  "fastBreak",
  "conditioning",
  "decisionMaking",
];

function planSnapshot(chip: ChipId) {
  const p = buildPracticePlan({ locale: "he", workingOn: "", chips: [chip] });
  const secs = [p.warmup, p.drill1, p.drill2, p.drill3, p.gameFiveOnFive];
  return {
    kinds: secs.map((s) => s.kind),
    titles: secs.map((s) => s.name),
  };
}

function overlap(a: readonly string[], b: readonly string[]): string[] {
  const setB = new Set(b);
  return a.filter((t) => setB.has(t));
}

const snaps = Object.fromEntries(CHIP_ORDER.map((id) => [id, planSnapshot(id)])) as Record<
  ChipId,
  ReturnType<typeof planSnapshot>
>;

console.log("--- chip session kinds ---");
for (const id of CHIP_ORDER) {
  console.log(id, snaps[id].kinds.join(","));
}

const shared = overlap(snaps.pressBreak.titles, snaps.defense.titles);
if (shared.length > 0) {
  console.error("FAIL pressBreak vs defense shared drill titles:", shared);
  process.exit(1);
}
if (!snaps.pressBreak.kinds.every((k) => k === "pressBreak")) {
  console.error("FAIL pressBreak kinds:", snaps.pressBreak.kinds);
  process.exit(1);
}
if (!snaps.defense.kinds.every((k) => k === "pressure" || k === "switch")) {
  console.error("FAIL defense kinds:", snaps.defense.kinds);
  process.exit(1);
}

const fastTransOverlap = overlap(snaps.fastBreak.titles, snaps.transition.titles);
if (
  fastTransOverlap.length === snaps.fastBreak.titles.length &&
  snaps.fastBreak.titles.length > 0
) {
  console.error("FAIL fastBreak identical to transition");
  process.exit(1);
}

console.log("OK: distinct chip sessions");
process.exit(0);
