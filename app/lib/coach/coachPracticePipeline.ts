/**
 * Coach-agent pipeline — runs on every "Build practice" click (POST /api/generate).
 *
 * Implements:
 * - basketball-coach-agent workflow
 * - basketball-practice-planning session flow (warmup → teach → reps → compete → 5v5)
 * - basketball-coaching-intelligence theme fidelity (chips + text → one thread)
 *
 * UI: button#coach-build-practice in PracticeForm.tsx
 */

import type { CoachingFields } from "../coachingFields";
import { buildPracticePlan } from "../practicePlanGenerator";
import type { PracticePlan } from "../../types/plan";

export type CoachBuildInput = CoachingFields;

export function buildPracticePlanWithCoach(fields: CoachBuildInput): PracticePlan {
  const workingOn = fields.workingOn.trim();
  if (!workingOn && !(fields.chips?.length || fields.presets?.length || fields.advancedTags?.length)) {
    throw new Error("Coach input required");
  }

  return buildPracticePlan(fields);
}
