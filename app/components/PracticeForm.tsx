"use client";

import type { AppLocale } from "../lib/locale/appLocale";
import {
  ADVANCED_TAG_ORDER,
  CHIP_ORDER,
  PRESET_GROUPS,
  UI,
  presetLabel,
  type AdvancedTagId,
  type ChipId,
  type PresetId,
} from "../lib/locale/uiCatalog";

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
    "rounded-full border px-3 py-1.5 text-sm leading-tight transition-colors",
    "min-h-[36px] touch-manipulation",
    selected
      ? "border-white bg-white text-zinc-950"
      : "border-zinc-700 text-zinc-300 hover:border-zinc-500 active:border-zinc-400",
  ].join(" ");
}

function presetClass(selected: boolean) {
  return [
    "rounded-lg border px-3 py-2 text-left text-sm leading-snug transition-colors",
    "min-h-[44px] touch-manipulation",
    selected
      ? "border-white bg-zinc-900 text-white"
      : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600",
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
    <div className="space-y-5">
      <label className="block">
        <span className="text-sm text-zinc-400">{ui.mainPrompt}</span>
        <textarea
          name="workingOn"
          rows={2}
          value={workingOn}
          onChange={(e) => onWorkingOnChange(e.target.value)}
          className="mt-1.5 w-full resize-y rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-[15px] leading-snug text-zinc-100 placeholder:text-zinc-700 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
        />
      </label>

      <section aria-label={ui.chipsLabel}>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">{ui.chipsLabel}</p>
        <div className="flex flex-wrap gap-2">
          {CHIP_ORDER.map((id) => {
            const selected = selectedChips.has(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => onToggleChip(id)}
                className={chipClass(selected)}
              >
                {ui.chips[id]}
              </button>
            );
          })}
        </div>
      </section>

      <section aria-label={ui.presetsLabel}>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">{ui.presetsLabel}</p>
        <div className="space-y-4">
          {PRESET_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="mb-2 text-xs text-zinc-500">{ui.presetGroups[group.id]}</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                      {presetLabel(id, locale)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <details className="group">
        <summary className="cursor-pointer list-none text-sm text-zinc-400 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-1">
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
        className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:opacity-50"
      >
        {loading ? ui.building : ui.buildButton}
      </button>
    </div>
  );
}
