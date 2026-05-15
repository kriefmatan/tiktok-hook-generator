"use client";

import type { AppLocale } from "../lib/locale/appLocale";
import {
  ADVANCED_TAG_ORDER,
  CHIP_ORDER,
  PRESET_GROUPS,
  UI,
  presetFillText,
  presetLabel,
  type AdvancedTagId,
  type ChipId,
  type PresetId,
} from "../lib/locale/uiCatalog";
import { ChipIcon, PresetIcon, WandIcon } from "./ui/TopicIcons";

type Props = {
  locale: AppLocale;
  workingOn: string;
  onWorkingOnChange: (value: string) => void;
  selectedChips: ReadonlySet<ChipId>;
  onToggleChip: (id: ChipId) => void;
  selectedPresets: ReadonlySet<PresetId>;
  onTogglePreset: (id: PresetId) => void;
  selectedAdvanced: ReadonlySet<AdvancedTagId>;
  onToggleAdvanced: (id: AdvancedTagId) => void;
  loading: boolean;
  onBuild: () => void;
};

function chipClass(selected: boolean) {
  return [
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm leading-tight transition-colors",
    "min-h-[36px] touch-manipulation",
    selected
      ? "border-accent bg-accent/15 text-accent"
      : "border-border-subtle bg-surface text-zinc-300 hover:border-zinc-600 active:border-zinc-500",
  ].join(" ");
}

function presetClass(selected: boolean) {
  return [
    "flex w-full items-start gap-3 rounded-xl border p-3.5 text-start transition-colors",
    "min-h-[72px] touch-manipulation",
    selected
      ? "border-accent bg-surface-elevated ring-2 ring-accent/60"
      : "border-border-subtle bg-surface hover:border-zinc-600",
  ].join(" ");
}

export function PracticeForm({
  locale,
  workingOn,
  onWorkingOnChange,
  selectedChips,
  onToggleChip,
  selectedPresets,
  onTogglePreset,
  selectedAdvanced,
  onToggleAdvanced,
  loading,
  onBuild,
}: Props) {
  const ui = UI[locale];
  const canBuild =
    workingOn.trim().length > 0 ||
    selectedChips.size > 0 ||
    selectedPresets.size > 0 ||
    selectedAdvanced.size > 0;

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="text-sm font-medium text-zinc-300">{ui.mainPrompt}</span>
        <div className="relative mt-2">
          <WandIcon className="pointer-events-none absolute start-3 top-3.5 h-5 w-5 text-zinc-500" />
          <textarea
            name="workingOn"
            rows={3}
            value={workingOn}
            onChange={(e) => onWorkingOnChange(e.target.value)}
            placeholder={ui.inputPlaceholder}
            className="w-full resize-y rounded-xl border border-border-subtle bg-surface py-3 ps-11 pe-4 text-[15px] leading-snug text-zinc-100 placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40"
          />
        </div>
      </label>

      <section aria-label={ui.chipsLabel}>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">{ui.chipsLabel}</p>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:pb-0">
          {CHIP_ORDER.map((id) => {
            const selected = selectedChips.has(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => onToggleChip(id)}
                className={`${chipClass(selected)} shrink-0`}
              >
                <ChipIcon id={id} className={selected ? "text-accent" : "text-zinc-500"} />
                {ui.chips[id]}
              </button>
            );
          })}
        </div>
      </section>

      <section aria-label={ui.presetsLabel}>
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">{ui.presetsLabel}</p>
        <div className="space-y-6">
          {PRESET_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="mb-3 text-sm font-semibold text-zinc-200">{ui.presetGroups[group.id]}</h3>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {group.presetIds.map((id) => {
                  const selected = selectedPresets.has(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onTogglePreset(id)}
                      className={presetClass(selected)}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium leading-snug text-white">{presetLabel(id, locale)}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-snug text-zinc-500">
                          {presetFillText(id, locale)}
                        </p>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                        <PresetIcon id={id} className="h-5 w-5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <details className="group rounded-xl border border-border-subtle bg-surface px-4 py-3 open:pb-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-zinc-300 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-zinc-500 transition group-open:rotate-90">›</span>
            {ui.moreLabel}
          </span>
        </summary>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={ui.moreLabel}>
          {ADVANCED_TAG_ORDER.map((id) => {
            const selected = selectedAdvanced.has(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => onToggleAdvanced(id)}
                className={chipClass(selected)}
              >
                {ui.advancedTags[id]}
              </button>
            );
          })}
        </div>
      </details>

      <button
        type="button"
        onClick={onBuild}
        disabled={loading || !canBuild}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-black transition hover:bg-accent-hover disabled:opacity-50"
      >
        <WandIcon className="h-5 w-5" />
        {loading ? ui.building : ui.buildButtonLong}
      </button>
    </div>
  );
}
