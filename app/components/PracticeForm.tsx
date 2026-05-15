"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
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
import { CHIP_LUCIDE, PRESET_LUCIDE } from "./ui/chipLucideIcons";

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

const stagger = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.28 },
  }),
};

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
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
      >
        <label className="mb-3 block text-sm font-medium text-text-secondary">{ui.mainPrompt}</label>
        <div className="input-glow flex flex-col gap-3 rounded-[22px] border border-border-subtle bg-card/90 p-3 backdrop-blur-sm transition-shadow sm:flex-row sm:items-stretch sm:p-4">
          <div className="relative min-h-[88px] flex-1">
            <Sparkles
              className="pointer-events-none absolute start-4 top-4 h-5 w-5 text-accent"
              aria-hidden
            />
            <textarea
              name="workingOn"
              rows={3}
              value={workingOn}
              onChange={(e) => onWorkingOnChange(e.target.value)}
              placeholder={ui.inputPlaceholder}
              className="h-full min-h-[88px] w-full resize-none bg-transparent py-3 ps-12 pe-3 text-[15px] leading-relaxed text-white placeholder:text-text-muted focus:outline-none"
            />
          </div>
          <motion.button
            type="button"
            onClick={onBuild}
            disabled={loading || !canBuild}
            whileHover={{ scale: canBuild && !loading ? 1.02 : 1, y: canBuild && !loading ? -2 : 0 }}
            whileTap={{ scale: 0.98 }}
            className="flex shrink-0 items-center justify-center gap-2 rounded-[18px] bg-gradient-to-b from-accent to-orange-600 px-8 py-4 text-base font-semibold text-black shadow-[0_8px_32px_rgba(255,122,0,0.35)] transition disabled:opacity-45 sm:min-w-[160px]"
          >
            <Sparkles className="h-5 w-5" />
            {loading ? ui.building : ui.buildButtonLong}
          </motion.button>
        </div>
      </motion.section>

      <section aria-label={ui.chipsLabel}>
        <h2 className="mb-3 text-sm font-semibold text-white">{ui.chipsLabel}</h2>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible">
          {CHIP_ORDER.map((id, i) => {
            const selected = selectedChips.has(id);
            const Icon = CHIP_LUCIDE[id];
            return (
              <motion.button
                key={id}
                type="button"
                custom={i}
                variants={stagger}
                initial="hidden"
                animate="show"
                aria-pressed={selected}
                onClick={() => onToggleChip(id)}
                className={[
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium backdrop-blur-md transition",
                  selected
                    ? "chip-glow border-accent bg-accent/10 text-accent"
                    : "border-border-subtle bg-card/60 text-text-secondary hover:border-white/12 hover:bg-card-hover hover:text-white",
                ].join(" ")}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15">
                  <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
                </span>
                {ui.chips[id]}
              </motion.button>
            );
          })}
        </div>
      </section>

      <section aria-label={ui.presetsLabel} className="space-y-8">
        {PRESET_GROUPS.map((group, gi) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + gi * 0.06, duration: 0.32 }}
          >
            <h2 className="mb-4 text-lg font-semibold text-white">{ui.presetGroups[group.id]}</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {group.presetIds.map((id) => {
                const selected = selectedPresets.has(id);
                const Icon = PRESET_LUCIDE[id];
                return (
                  <motion.button
                    key={id}
                    type="button"
                    whileHover={{ y: -3 }}
                    aria-pressed={selected}
                    onClick={() => onTogglePreset(id)}
                    className={[
                      "card-glow group flex w-full items-start gap-4 rounded-[20px] border p-4 text-start transition",
                      selected
                        ? "border-accent/50 bg-gradient-to-br from-accent/10 to-card ring-1 ring-accent/40"
                        : "border-border-subtle bg-gradient-to-br from-card to-[#0e0e11] hover:border-accent/25",
                    ].join(" ")}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-orange-600 shadow-lg shadow-accent/25">
                      <Icon className="h-5 w-5 text-black" strokeWidth={2.25} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-snug text-white group-hover:text-accent">
                        {presetLabel(id, locale)}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-text-muted">
                        {presetFillText(id, locale)}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </section>

      <details className="group rounded-[20px] border border-border-subtle bg-card/50 backdrop-blur-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="text-sm font-medium text-text-secondary">{ui.moreLabel}</span>
          <ChevronDown className="h-4 w-4 text-text-muted transition group-open:rotate-180" />
        </summary>
        <div className="flex flex-wrap gap-2 border-t border-border-subtle px-5 pb-5 pt-2">
          {ADVANCED_TAG_ORDER.map((id) => {
            const selected = selectedAdvanced.has(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => onToggleAdvanced(id)}
                className={[
                  "rounded-full border px-3 py-1.5 text-sm transition",
                  selected
                    ? "chip-glow border-accent bg-accent/10 text-accent"
                    : "border-border-subtle bg-surface text-text-secondary hover:text-white",
                ].join(" ")}
              >
                {ui.advancedTags[id]}
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
}
