"use client";

import { useId, useMemo } from "react";
import type { CoachLocale } from "../lib/locale/coachLocale";
import type { DrillVisualization, DrillVizXY } from "../types/drillVisualization";

type Segment =
  | { kind: "move" | "pass" | "shot" | "closeout"; x1: number; y1: number; x2: number; y2: number };

const VIEW_W = 100;
const VIEW_H = 62;
/** Hoop center at baseline (percentage space). */
const HOOP: DrillVizXY = { x: 50, y: 95 };

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

/** Build sequential paths from JSON so passes/moves/shots/clos-outs line up after prior steps. */
function buildSegments(data: DrillVisualization): Segment[] {
  const offense = new Map<number, DrillVizXY>();
  const defense = new Map<string, DrillVizXY>();

  for (const p of data.players) {
    offense.set(p.id, { x: clamp(p.x, 0, 100), y: clamp(p.y, 0, 100) });
  }
  for (const d of data.defense) {
    defense.set(String(d.id), { x: clamp(d.x, 0, 100), y: clamp(d.y, 0, 100) });
  }

  const segs: Segment[] = [];

  for (const a of data.actions) {
    if (a.type === "move") {
      const from = offense.get(a.player);
      if (!from) continue;
      const to = { x: clamp(a.to.x, 0, 100), y: clamp(a.to.y, 0, 100) };
      segs.push({ kind: "move", x1: from.x, y1: from.y, x2: to.x, y2: to.y });
      offense.set(a.player, to);
    } else if (a.type === "pass") {
      const p1 = offense.get(a.from);
      const p2 = offense.get(a.to);
      if (!p1 || !p2) continue;
      segs.push({ kind: "pass", x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
    } else if (a.type === "shot") {
      const p = offense.get(a.player);
      if (!p) continue;
      const tgt = a.to
        ? { x: clamp(a.to.x, 0, 100), y: clamp(a.to.y, 0, 100) }
        : HOOP;
      segs.push({ kind: "shot", x1: p.x, y1: p.y, x2: tgt.x, y2: tgt.y });
    } else if (a.type === "closeout") {
      const key = String(a.player);
      const from = defense.get(key);
      if (!from) continue;
      const to = { x: clamp(a.to.x, 0, 100), y: clamp(a.to.y, 0, 100) };
      segs.push({ kind: "closeout", x1: from.x, y1: from.y, x2: to.x, y2: to.y });
      defense.set(key, to);
    }
  }

  return segs;
}

function pctToSvg(x: number, y: number) {
  const sx = (x / 100) * VIEW_W;
  const sy = (y / 100) * VIEW_H;
  return { sx, sy };
}

type Props = {
  data: DrillVisualization;
  locale?: CoachLocale;
  className?: string;
};

/** Half-court diagram: offense (blue), defense (red), ball (orange). */
export function DrillCourtVisualizer({ data, locale = "en", className = "" }: Props) {
  const uid = useId().replace(/:/g, "");
  const midMove = `arrow-move-${uid}`;
  const midPass = `arrow-pass-${uid}`;
  const midShot = `arrow-shot-${uid}`;
  const midClose = `arrow-close-${uid}`;

  const segments = useMemo(() => buildSegments(data), [data]);

  const footerHint =
    locale === "he"
      ? "יחסי מגרש בספרות · חישוק בקו הסוף · חצים לפי סדר הפעולות"
      : locale === "es"
        ? "Escala porcentual · aro en la línea de fondo · flechas por orden"
        : locale === "de"
          ? "Prozent‑Layout · Korb auf der Grundlinie · Pfeile in Aktionsreihenfolge"
          : "Percentage layout · hoop baseline · arrows follow action order";

  const offenseDots = data.players.map((p) => {
    const { sx, sy } = pctToSvg(p.x, p.y);
    return { ...p, sx, sy };
  });
  const defenseDots = data.defense.map((d) => {
    const { sx, sy } = pctToSvg(d.x, d.y);
    return { ...d, sx, sy };
  });

  const ballCarrier = offenseDots.find((o) => o.id === data.ball.player) ?? offenseDots[0];
  const { sx: hx, sy: hy } = pctToSvg(HOOP.x, HOOP.y);

  const bx = clamp((ballCarrier?.sx ?? VIEW_W / 2) + 5.2, 2.5, VIEW_W - 2.5);
  const by = clamp((ballCarrier?.sy ?? VIEW_H / 2) - 4, 2.5, VIEW_H - 2.5);

  return (
    <div dir="ltr" className={`rounded-xl border border-zinc-700/80 bg-zinc-950/80 p-2 sm:p-3 ${className}`}>
      <svg
        className="h-auto w-full max-h-[320px]"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Basketball half court drill diagram"
      >
        <defs>
          <marker id={midMove} markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 z" fill="#60a5fa" />
          </marker>
          <marker id={midPass} markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 z" fill="#a78bfa" />
          </marker>
          <marker id={midShot} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill="#fb923c" />
          </marker>
          <marker id={midClose} markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 z" fill="#f87171" />
          </marker>
        </defs>

        {/* Court */}
        <rect x="1" y="1" width={VIEW_W - 2} height={VIEW_H - 2} rx="1.2" fill="#18181b" stroke="#3f3f46" strokeWidth="0.5" />

        {/* Division line */}
        <line x1={1} y1={8} x2={VIEW_W - 1} y2={8} stroke="#52525b" strokeWidth="0.55" />

        {/* Simplified lane + hoop */}
        <rect x={(VIEW_W / 2) - 8} y={VIEW_H - 26} width="16" height="25" rx="0.35" fill="none" stroke="#52525b" strokeWidth="0.45" />
        <circle cx={hx} cy={hy + 3} r="3.8" fill="none" stroke="#52525b" strokeWidth="0.45" />

        {/* 3 arc (styled only) */}
        <path d={`M ${(VIEW_W / 2) - 22} ${VIEW_H - 2} A 26 26 0 0 1 ${VIEW_W / 2 + 22} ${VIEW_H - 2}`} fill="none" stroke="#3f3f46" strokeWidth="0.4" />

        {/* Action arrows */}
        {segments.map((s, i) => {
          const p1 = pctToSvg(s.x1, s.y1);
          const p2 = pctToSvg(s.x2, s.y2);
          const vx = p2.sx - p1.sx;
          const vy = p2.sy - p1.sy;
          const mag = Math.hypot(vx, vy);
          const pad = Math.min(mag > 12 ? mag * 0.08 : 0, mag * 0.25);
          const ux = vx / (mag || 1);
          const uy = vy / (mag || 1);

          const stroke =
            s.kind === "move"
              ? "#60a5fa"
              : s.kind === "pass"
                ? "#a78bfa"
                : s.kind === "shot"
                  ? "#fb923c"
                  : "#f87171";
          const dash = s.kind === "pass" ? "4 4" : undefined;
          const marker =
            s.kind === "move"
              ? `url(#${midMove})`
              : s.kind === "pass"
                ? `url(#${midPass})`
                : s.kind === "shot"
                  ? `url(#${midShot})`
                  : `url(#${midClose})`;
          const width = s.kind === "pass" ? 0.53 : s.kind === "shot" ? 0.72 : 0.55;

          const xEnd = pad > 0 ? p2.sx - ux * pad : p2.sx;
          const yEnd = pad > 0 ? p2.sy - uy * pad : p2.sy;

          return (
            <line
              key={`seg-${i}`}
              x1={p1.sx}
              y1={p1.sy}
              x2={xEnd}
              y2={yEnd}
              stroke={stroke}
              strokeWidth={width}
              strokeDasharray={dash}
              markerEnd={marker}
            />
          );
        })}

        {/* Defense */}
        {defenseDots.map((d) => (
          <g key={`d-${d.id}`}>
            <circle cx={d.sx} cy={d.sy} r="4.9" fill="#b91c1c" stroke="#fecaca" strokeWidth="0.45" />
            <text x={d.sx} y={d.sy + 1} textAnchor="middle" fill="#fef2f2" fontSize="6" fontWeight="700">
              {String(d.id)}
            </text>
          </g>
        ))}

        {/* Offense */}
        {offenseDots.map((p) => (
          <g key={`o-${p.id}`}>
            <circle cx={p.sx} cy={p.sy} r="4.9" fill="#2563eb" stroke="#bfdbfe" strokeWidth="0.45" />
            <text x={p.sx} y={p.sy + 1} textAnchor="middle" fill="#eff6ff" fontSize="7" fontWeight="700">
              {p.id}
            </text>
          </g>
        ))}

        {/* Ball */}
        <circle cx={bx} cy={by} r="3.2" fill="#f97316" stroke="#fde68a" strokeWidth="0.5" aria-label="Ball" />
      </svg>

      <p className="mt-1 text-center text-[10px] text-zinc-500 sm:text-[11px]">{footerHint}</p>
    </div>
  );
}
