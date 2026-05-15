import type { AppLocale } from "../locale/appLocale";
import {
  ADVANCED_TAG_SEARCH_TERMS,
  CHIP_SEARCH_TERMS,
  presetSearchTerms,
  type AdvancedTagId,
  type ChipId,
  type PresetId,
} from "../locale/uiCatalog";

export function buildWorkingOnText(
  locale: AppLocale,
  workingOn: string,
  chips: readonly ChipId[],
  presets: readonly PresetId[],
  advancedTags: readonly AdvancedTagId[],
): string {
  const parts: string[] = [];
  const base = workingOn.trim();
  if (base) parts.push(base);

  for (const id of chips) {
    parts.push(CHIP_SEARCH_TERMS[locale][id]);
  }
  for (const id of presets) {
    parts.push(presetSearchTerms(id, locale));
  }
  for (const id of advancedTags) {
    parts.push(ADVANCED_TAG_SEARCH_TERMS[locale][id]);
  }

  return parts.join(" ").replace(/\s+/g, " ").trim();
}
