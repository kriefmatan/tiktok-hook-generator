import { buildPracticePlan } from "../app/lib/practicePlanGenerator";

const DEF_WORDS = /הגנה|שומר|סגיר|לחץ|עציר|מלכוד|DEF/i;
const SHOOT_WORDS = /סל|זריק|סיום|3 על|1 על 1|shoot|finish|score/i;

function hasBoth(title: string): boolean {
  return DEF_WORDS.test(title) && SHOOT_WORDS.test(title);
}

const p = buildPracticePlan({
  locale: "he",
  workingOn: "",
  chips: ["defense", "shooting"],
});

const secs = [p.warmup, p.drill1, p.drill2, p.drill3, p.gameFiveOnFive];
const titles = secs.map((s) => s.name);
const combinedCount = titles.filter(hasBoth).length;

console.log("kinds:", secs.map((s) => `${s.kind}${s.secondaryKind ? "+" + s.secondaryKind : ""}`).join(" | "));
console.log("titles:", titles);

if (!secs[0]?.secondaryKind && secs[0]?.kind !== "pressure") {
  console.error("FAIL: expected combined kinds on card");
  process.exit(1);
}

if (combinedCount < 3) {
  console.error("FAIL: expected at least 3/5 titles merging defense+shoot, got", combinedCount);
  process.exit(1);
}

const pureDefenseOnly = titles.every(
  (t) => /ראן אנד|כיסוי מסירה|מלכודת רק בצד/i.test(t) || !SHOOT_WORDS.test(t),
);
if (pureDefenseOnly && titles.length >= 3) {
  console.error("FAIL: session looks like pure defense pool only");
  process.exit(1);
}

console.log("OK: multi-goal defense+shooting", combinedCount, "/ 5 combined titles");
process.exit(0);
