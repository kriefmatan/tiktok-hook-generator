"use client";

import { useId } from "react";

/** Normalized half court: x 0–100 (left sideline → right), y 0–100 (halfcourt line → baseline under hoop). */
export type CourtPoint = { x: number; y: number };

export type HalfCourtPlayer = {
  x: number;
  y: number;
  side: "offense" | "defense";
  /** Optional 1–2 char label (e.g. "1", "X") */
  label?: string;
};

export type HalfCourtMovement = {
  from: CourtPoint;
  to: CourtPoint;
};

export type HalfCourtPass = {
  from: CourtPoint;
  to: CourtPoint;
};

type Props = {
  players: HalfCourtPlayer[];
  movements: HalfCourtMovement[];
  passes: HalfCourtPass[];
  /** Shown under the diagram */
  caption?: string;
  className?: string;
};

const C_STROKE = "#a1a1aa";
const C_FILL_KEY = "none";
const RIM = "#71717a";
const O_FILL = "#2563eb";
const O_STROKE = "#ffffff";
const X_FILL = "#dc2626";
const X_STROKE = "#ffffff";
const MOVE_STROKE = "#fafafa";
const PASS_STROKE = "#a3a3a3";

/**
 * Half court in SVG: viewBox matches normalized coords (0–100 × 0–100).
 * y = 0 is halfcourt; y = 100 is the baseline; hoop near (50, 94).
 */
export function HalfCourtDiagram({ players, movements, passes, caption, className }: Props) {
  const uid = `x${useId().replace(/:/g, "")}`;
  const idSolid = `hc-arrow-solid-${uid}`;
  const idPass = `hc-arrow-pass-${uid}`;

  return (
    <figure className={className}>
      {/* Explicit aspect box so the SVG always gets height in flex/grid layouts */}
      <div className="w-full max-w-[min(100%,320px)] overflow-hidden rounded-md border border-zinc-600 bg-[#0c0c0f]">
        <div className="relative w-full [aspect-ratio:1/1]">
          <svg
            viewBox="0 0 100 100"
            width="100%"
            height="100%"
            className="absolute inset-0 block"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={caption ?? "Half court diagram"}
          >
            <title>{caption ?? "Half court diagram"}</title>
            <defs>
              <marker
                id={idSolid}
                markerUnits="userSpaceOnUse"
                markerWidth="5"
                markerHeight="5"
                refX="4"
                refY="2.5"
                orient="auto"
              >
                <path d="M0,0 L5,2.5 L0,5 Z" fill={MOVE_STROKE} />
              </marker>
              <marker
                id={idPass}
                markerUnits="userSpaceOnUse"
                markerWidth="5"
                markerHeight="5"
                refX="4"
                refY="2.5"
                orient="auto"
              >
                <path d="M0,0 L5,2.5 L0,5 Z" fill={PASS_STROKE} />
              </marker>
            </defs>

            <CourtLines />

            {passes.map((p, i) => (
              <line
                key={`pass-${i}`}
                x1={p.from.x}
                y1={p.from.y}
                x2={p.to.x}
                y2={p.to.y}
                stroke={PASS_STROKE}
                strokeWidth={0.7}
                strokeDasharray="2.4 1.8"
                fill="none"
                markerEnd={`url(#${idPass})`}
              />
            ))}

            {movements.map((m, i) => (
              <line
                key={`move-${i}`}
                x1={m.from.x}
                y1={m.from.y}
                x2={m.to.x}
                y2={m.to.y}
                stroke={MOVE_STROKE}
                strokeWidth={0.85}
                fill="none"
                markerEnd={`url(#${idSolid})`}
              />
            ))}

            {players.map((pl, i) =>
              pl.side === "offense" ? (
                <g key={`pl-${i}`}>
                  <circle cx={pl.x} cy={pl.y} r={2.7} fill={O_FILL} stroke={O_STROKE} strokeWidth={0.4} />
                  {pl.label ? (
                    <text
                      x={pl.x}
                      y={pl.y + 0.9}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={3.6}
                      fontWeight={600}
                      fontFamily="system-ui, Segoe UI, sans-serif"
                    >
                      {pl.label}
                    </text>
                  ) : null}
                </g>
              ) : (
                <g key={`pl-${i}`} transform={`translate(${pl.x} ${pl.y})`}>
                  <polygon
                    points="0,-2.7 -2.4,2.2 2.4,2.2"
                    fill={X_FILL}
                    stroke={X_STROKE}
                    strokeWidth={0.4}
                    strokeLinejoin="round"
                  />
                  {pl.label ? (
                    <text
                      x={0}
                      y={1.15}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={3.6}
                      fontWeight={600}
                      fontFamily="system-ui, Segoe UI, sans-serif"
                    >
                      {pl.label}
                    </text>
                  ) : null}
                </g>
              )
            )}
          </svg>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs leading-snug text-zinc-500">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function CourtLines() {
  return (
    <g stroke={C_STROKE} fill={C_FILL_KEY} strokeWidth={0.5}>
      <rect x={0.5} y={0.5} width={99} height={99} rx={0.5} />
      <line x1={46} y1={93} x2={54} y2={93} strokeWidth={0.4} />
      <circle cx={50} cy={94} r={0.95} fill={RIM} stroke="none" />
      <rect x={38} y={68} width={24} height={31.5} />
      <line x1={38} y1={68} x2={62} y2={68} strokeWidth={0.45} />
      <path d="M 38 68 A 12 12 0 0 1 62 68" />
      <path d="M 0.5 77 L 17 77 A 33 33 0 0 1 83 77 L 99.5 77" strokeWidth={0.5} />
    </g>
  );
}

/** Example: ball on left wing, shell defenders, skip pass and baseline drift. */
export function exampleShellHalfCourt(): {
  players: HalfCourtPlayer[];
  movements: HalfCourtMovement[];
  passes: HalfCourtPass[];
  caption: string;
} {
  return {
    players: [
      { x: 22, y: 42, side: "offense", label: "1" },
      { x: 12, y: 88, side: "offense", label: "2" },
      { x: 50, y: 22, side: "offense", label: "3" },
      { x: 30, y: 48, side: "defense", label: "X" },
      { x: 48, y: 58, side: "defense", label: "X" },
      { x: 54, y: 78, side: "defense", label: "X" },
    ],
    movements: [{ from: { x: 22, y: 42 }, to: { x: 34, y: 82 } }],
    passes: [{ from: { x: 22, y: 42 }, to: { x: 50, y: 22 } }],
    caption: "Example — wing entry: 1 drives baseline (solid), skip to 3 (dashed). Defenders in triangle matchups.",
  };
}
