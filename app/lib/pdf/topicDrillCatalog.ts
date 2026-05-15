import type { BlockKind, EmphasisKey } from "../locale/coachBundle.types";
import { SIMPLE_BUNDLES } from "../locale/bundles";
import type { AppLocale } from "../locale/appLocale";
import { CHIP_EMPHASIS, PRESET_EMPHASIS } from "../input/emphasisFromInput";
import { isChipTopic, type TopicId } from "./topicCatalog";

const BLOCK_ORDER: readonly BlockKind[] = ["warmup", "drill1", "drill2", "drill3", "game"];

export type TopicDrillBlock = {
  blockKind: BlockKind;
  blockLabel: string;
  drillNames: readonly string[];
};

export type TopicEmphasisDrills = {
  emphasis: EmphasisKey;
  themeBullets: readonly [string, string];
  setupHook: string;
  blocks: readonly TopicDrillBlock[];
};

export type TopicDrillCatalog = {
  emphases: readonly EmphasisKey[];
  emphasisDrills: readonly TopicEmphasisDrills[];
};

export type TopicSessionSystem = {
  primaryEmphasis: EmphasisKey;
  setupHook: string;
  blockFrames: Record<BlockKind, readonly [string, string]>;
  sectionLabels: readonly [string, string, string, string, string];
};

function emphasesForTopic(id: TopicId): EmphasisKey[] {
  if (isChipTopic(id)) return [...new Set(CHIP_EMPHASIS[id])];
  return [...new Set(PRESET_EMPHASIS[id])];
}

export function drillsForTopic(id: TopicId, locale: AppLocale): TopicDrillCatalog {
  const bundle = SIMPLE_BUNDLES[locale];
  const emphases = emphasesForTopic(id);

  const emphasisDrills: TopicEmphasisDrills[] = emphases.map((emphasis) => ({
    emphasis,
    themeBullets: bundle.bullets[emphasis],
    setupHook: bundle.setupHooks[emphasis],
    blocks: BLOCK_ORDER.map((blockKind, i) => ({
      blockKind,
      blockLabel: bundle.sectionLabels[i]!,
      drillNames: bundle.drillNames[emphasis][blockKind],
    })),
  }));

  return { emphases, emphasisDrills };
}

export function sessionSystemForTopic(id: TopicId, locale: AppLocale): TopicSessionSystem {
  const bundle = SIMPLE_BUNDLES[locale];
  const primaryEmphasis = emphasesForTopic(id)[0] ?? "generic";
  return {
    primaryEmphasis,
    setupHook: bundle.setupHooks[primaryEmphasis],
    blockFrames: bundle.blockFrames,
    sectionLabels: bundle.sectionLabels,
  };
}
