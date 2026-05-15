import type { JSX, ReactNode } from "react";
import type { ChipId, PresetId } from "../../lib/locale/uiCatalog";

type IconProps = { className?: string };

function IconBase({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-4 w-4 shrink-0"}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function WandIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5" />
    </IconBase>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </IconBase>
  );
}

const CHIP_ICONS: Record<ChipId, (p: IconProps) => JSX.Element> = {
  defense: (p) => (
    <IconBase {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </IconBase>
  ),
  shooting: (p) => (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </IconBase>
  ),
  transition: (p) => (
    <IconBase {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </IconBase>
  ),
  ballMovement: (p) => (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
    </IconBase>
  ),
  finishing: (p) => (
    <IconBase {...p}>
      <path d="M12 3v18M8 7l4-4 4 4" />
    </IconBase>
  ),
  oneOnOne: (p) => (
    <IconBase {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  ),
  rebounding: (p) => (
    <IconBase {...p}>
      <path d="M12 2v20M7 7l5-5 5 5M7 17l5 5 5-5" />
    </IconBase>
  ),
  spacing: (p) => (
    <IconBase {...p}>
      <path d="M3 12h18M12 3v18" />
    </IconBase>
  ),
  pressBreak: (p) => (
    <IconBase {...p}>
      <path d="M18 6 6 18M8 6l10 10" />
    </IconBase>
  ),
  fastBreak: (p) => (
    <IconBase {...p}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </IconBase>
  ),
  conditioning: (p) => (
    <IconBase {...p}>
      <path d="M6.5 6.5h11v11h-11zM6.5 12h11M12 6.5v11" />
    </IconBase>
  ),
  decisionMaking: (p) => (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </IconBase>
  ),
};

const PRESET_ICONS: Record<PresetId, (p: IconProps) => JSX.Element> = {
  defensivePractice: CHIP_ICONS.defense,
  shootingPractice: CHIP_ICONS.shooting,
  gamePrep: (p) => (
    <IconBase {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </IconBase>
  ),
  fundamentals: CHIP_ICONS.ballMovement,
  fastPacePractice: CHIP_ICONS.fastBreak,
  toughnessPractice: (p) => (
    <IconBase {...p}>
      <path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7l3-7z" />
    </IconBase>
  ),
  beginnerPractice: (p) => (
    <IconBase {...p}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </IconBase>
  ),
  funCompetitive: CHIP_ICONS.oneOnOne,
  noDribblePractice: (p) => (
    <IconBase {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="m4.9 4.9 14.2 14.2" />
    </IconBase>
  ),
  passingMovement: CHIP_ICONS.ballMovement,
  coordinationFootwork: CHIP_ICONS.conditioning,
  pickAndRoll: (p) => (
    <IconBase {...p}>
      <path d="M7 17h10M12 7v10M7 7h5v5H7z" />
    </IconBase>
  ),
  helpDefense: CHIP_ICONS.defense,
  rotations: CHIP_ICONS.transition,
  readAndReact: CHIP_ICONS.decisionMaking,
  transitionDefense: CHIP_ICONS.transition,
};

export function ChipIcon({ id, className }: { id: ChipId; className?: string }) {
  const Icon = CHIP_ICONS[id];
  return <Icon className={className} />;
}

export function PresetIcon({ id, className }: { id: PresetId; className?: string }) {
  const Icon = PRESET_ICONS[id];
  return <Icon className={className} />;
}
