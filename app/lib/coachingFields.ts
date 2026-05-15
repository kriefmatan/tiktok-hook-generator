import type { AppLocale } from "./locale/appLocale";
import type { AdvancedTagId, ChipId, PresetId } from "./locale/uiCatalog";

/** Coach input — free text plus optional UI selections */
export type CoachingFields = {
  locale: AppLocale;
  workingOn: string;
  chips?: readonly ChipId[];
  presets?: readonly PresetId[];
  advancedTags?: readonly AdvancedTagId[];
};
