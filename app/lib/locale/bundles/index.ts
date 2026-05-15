import type { CoachLocale } from "../coachLocale";
import type { SimplePracticeBundle } from "../coachBundle.types";
import { DE_SIMPLE } from "./de";
import { EN_SIMPLE } from "./en";
import { ES_SIMPLE } from "./es";
import { HE_SIMPLE } from "./he";

export const SIMPLE_BUNDLES: Record<CoachLocale, SimplePracticeBundle> = {
  en: EN_SIMPLE,
  he: HE_SIMPLE,
  es: ES_SIMPLE,
  de: DE_SIMPLE,
};

export { DE_SIMPLE, EN_SIMPLE, ES_SIMPLE, HE_SIMPLE };
