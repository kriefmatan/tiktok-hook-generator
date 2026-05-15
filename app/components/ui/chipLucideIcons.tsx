import {
  ArrowLeftRight,
  Brain,
  Dumbbell,
  Move,
  Shield,
  Target,
  Timer,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ChipId, PresetId } from "../../lib/locale/uiCatalog";

export const CHIP_LUCIDE: Record<ChipId, LucideIcon> = {
  defense: Shield,
  shooting: Target,
  transition: ArrowLeftRight,
  ballMovement: Move,
  finishing: TrendingUp,
  oneOnOne: Users,
  rebounding: TrendingUp,
  spacing: Move,
  pressBreak: Zap,
  fastBreak: Zap,
  conditioning: Dumbbell,
  decisionMaking: Brain,
};

export const PRESET_LUCIDE: Record<PresetId, LucideIcon> = {
  defensivePractice: Shield,
  shootingPractice: Target,
  gamePrep: Timer,
  fundamentals: Move,
  fastPacePractice: Zap,
  toughnessPractice: Dumbbell,
  beginnerPractice: Users,
  funCompetitive: Users,
  noDribblePractice: Move,
  passingMovement: Move,
  coordinationFootwork: Dumbbell,
  pickAndRoll: ArrowLeftRight,
  helpDefense: Shield,
  rotations: ArrowLeftRight,
  readAndReact: Brain,
  transitionDefense: Shield,
};
