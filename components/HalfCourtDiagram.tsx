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
      <div className="overflow-hidden rounded-md border border-zinc-700 bg-zinc-950">
        <svg
          viewBox="0 0 100 100"
          className="block h-auto w-full max-h-[min(320px,55vw)] text-zinc-300"
          role="img"
          aria-label={caption ?? "Half court diagram"}
        >
          <title>{caption ?? "Half court diagram"}</title>
          <defs>
            <marker
              id={idSolid}
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" className="fill-zinc-100" />
            </marker>
            <marker
              id={idPass}
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" className="fill-zinc-400" />
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
              className="stroke-zinc-400"
              strokeWidth={0.55}
              strokeDasharray="2.2 1.6"
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
              className="stroke-zinc-100"
              strokeWidth={0.65}
              fill="none"
              markerEnd={`url(#${idSolid})`}
            />
          ))}

          {players.map((pl, i) =>
            pl.side === "offense" ? (
              <g key={`pl-${i}`}>
                <circle
                  cx={pl.x}
                  cy={pl.y}
                  r={2.6}
                  className="fill-blue-600 stroke-white"
                  strokeWidth={0.35}
                />
                {pl.label ? (
                  <text
                    x={pl.x}
                    y={pl.y + 0.85}
                    textAnchor="middle"
                    className="fill-white text-[3.8px] font-semibold"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {pl.label}
                  </text>
                ) : null}
              </g>
            ) : (
              <g key={`pl-${i}`} transform={`translate(${pl.x} ${pl.y})`}>
                <polygon
                  points="0,-2.6 -2.3,2.1 2.3,2.1"
                  className="fill-red-600 stroke-white"
                  strokeWidth={0.35}
                  strokeLinejoin="round"
                />
                {pl.label ? (
                  <text
                    x={0}
                    y={1.1}
                    textAnchor="middle"
                    className="fill-white text-[3.8px] font-semibold"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {pl.label}
                  </text>
                ) : null}
              </g>
            )
          )}
        </svg>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs leading-snug text-zinc-500">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function CourtLines() {
  return (
    <g className="stroke-zinc-500" fill="none" strokeWidth={0.45}>
      <rect x={0.5} y={0.5} width={99} height={99} rx={0.5} />
      <line x1={46} y1={93} x2={54} y2={93} strokeWidth={0.35} />
      <circle cx={50} cy={94} r={0.9} className="fill-zinc-600 stroke-none" />
      <rect x={38} y={68} width={24} height={31.5} />
      <line x1={38} y1={68} x2={62} y2={68} strokeWidth={0.4} />
      <path d="M 38 68 A 12 12 0 0 1 62 68" />
      <path d="M 0.5 77 L 17 77 A 33 33 0 0 1 83 77 L 99.5 77" strokeWidth={0.45} />
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
