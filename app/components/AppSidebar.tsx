"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  CalendarRange,
  CircleDot,
  ClipboardList,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppLocale } from "../lib/locale/appLocale";
import type { NavItemId } from "../lib/locale/uiCatalog";
import { UI } from "../lib/locale/uiCatalog";

const NAV_ITEMS: {
  id: NavItemId;
  icon: typeof ClipboardList;
  href?: string;
}[] = [
  { id: "practice", icon: ClipboardList, href: "/" },
  { id: "library", icon: BookOpen, href: "/library" },
  { id: "plays", icon: CircleDot },
  { id: "players", icon: Users },
  { id: "stats", icon: BarChart3 },
  { id: "season", icon: CalendarRange },
  { id: "settings", icon: Settings },
];

type Props = {
  locale: AppLocale;
};

export function AppSidebar({ locale }: Props) {
  const ui = UI[locale];
  const pathname = usePathname();

  return (
    <aside className="court-texture sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-e border-border-subtle bg-surface lg:flex">
      <motion.div
        className="flex items-center gap-3 border-b border-border-subtle px-5 py-6"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-orange-600 shadow-lg shadow-accent/20">
          <CircleDot className="h-5 w-5 text-black" strokeWidth={2.5} />
        </span>
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.35 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">AI</p>
          <p className="truncate text-sm font-semibold text-white">Basketball Planner</p>
        </motion.div>
      </motion.div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label={ui.nav.practice}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const label = ui.nav[item.id];
          const isActive = item.href ? pathname === item.href : false;

          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className={
                  isActive
                    ? "relative flex items-center gap-3 rounded-2xl bg-gradient-to-l from-accent/25 to-accent/5 px-3 py-2.5 text-white shadow-[0_0_24px_rgba(255,122,0,0.15)]"
                    : "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-text-secondary transition hover:bg-white/5 hover:text-white"
                }
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-l from-accent/25 to-accent/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <Icon
                  className={`relative h-[18px] w-[18px] ${isActive ? "text-accent" : ""}`}
                  strokeWidth={2}
                />
                <span className="relative text-sm font-medium">{label}</span>
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              disabled
              title={ui.comingSoon}
              className="flex w-full cursor-not-allowed items-center gap-3 rounded-2xl px-3 py-2.5 text-text-muted opacity-60"
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              <span className="text-sm">{label}</span>
            </button>
          );
        })}
      </nav>

      <CoachFooter ui={ui} />
    </aside>
  );
}

function CoachFooter({ ui }: { ui: (typeof UI)[AppLocale] }) {
  return (
    <motion.div
      className="border-t border-border-subtle p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.35 }}
    >
      <div className="glass-panel flex items-center gap-3 rounded-2xl p-3">
        <motion.div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 text-sm font-bold text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {ui.coachName.charAt(0)}
        </motion.div>
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <p className="truncate text-sm font-medium text-white">{ui.coachName}</p>
          <p className="truncate text-xs text-text-muted">{ui.coachRole}</p>
        </motion.div>
      </div>
      <label className="mt-3 flex cursor-default items-center justify-between rounded-xl px-2 py-1.5">
        <span className="text-xs text-text-secondary">{ui.darkModeLabel}</span>
        <span
          className="relative h-7 w-12 rounded-full bg-accent/90 p-0.5"
          role="switch"
          aria-checked="true"
        >
          <span className="absolute end-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-md" />
        </span>
      </label>
    </motion.div>
  );
}
