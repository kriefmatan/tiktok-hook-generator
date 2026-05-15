import type { CoachingFields } from "../coachingFields";
import type { AppLocale } from "../locale/appLocale";
import {
  CHIP_ORDER,
  PRESET_GROUPS,
  presetFillText,
  presetLabel,
  UI,
  type ChipId,
  type PresetId,
} from "../locale/uiCatalog";

export type TopicId = ChipId | PresetId;

export type TopicKind = "chip" | "preset";

export type TopicMeta = {
  id: TopicId;
  kind: TopicKind;
  groupId?: "team" | "youth" | "advanced";
};

const PRESET_TOPIC_METAS: TopicMeta[] = PRESET_GROUPS.flatMap((g) =>
  g.presetIds.map((id) => ({ id, kind: "preset" as const, groupId: g.id })),
);

export const ALL_TOPIC_METAS: readonly TopicMeta[] = [
  ...CHIP_ORDER.map((id): TopicMeta => ({ id, kind: "chip" })),
  ...PRESET_TOPIC_METAS,
];

export const ALL_TOPIC_IDS: readonly TopicId[] = ALL_TOPIC_METAS.map((t) => t.id);

export function isChipTopic(id: TopicId): id is ChipId {
  return (CHIP_ORDER as readonly string[]).includes(id);
}

export function topicKind(id: TopicId): TopicKind {
  return isChipTopic(id) ? "chip" : "preset";
}

export function topicLabel(id: TopicId, locale: AppLocale): string {
  if (isChipTopic(id)) return UI[locale].chips[id];
  return presetLabel(id, locale);
}

/** Deterministic coach input for a single UI topic — stable plan across builds. */
export function topicCoachingFields(id: TopicId, locale: AppLocale): CoachingFields {
  const workingOn = isChipTopic(id) ? UI[locale].chips[id] : presetFillText(id, locale);
  if (isChipTopic(id)) {
    return { locale, workingOn, chips: [id] };
  }
  return { locale, workingOn, presets: [id] };
}

export function topicPdfFilename(id: TopicId): string {
  return `${id}.pdf`;
}

export function topicPdfPublicPath(locale: AppLocale, id: TopicId): string {
  return `/coach-pdfs/${locale}/${topicPdfFilename(id)}`;
}

/** API route serves static file when present, else generates on the fly. */
export function topicPdfHref(locale: AppLocale, id: TopicId): string {
  return `/api/pdf/topic?topic=${id}&locale=${locale}`;
}
