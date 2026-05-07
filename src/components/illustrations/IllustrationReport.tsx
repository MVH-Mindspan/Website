"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";

export function IllustrationReport() {
  const { theme } = useTheme();
  const c = theme.colors;

  // Card geometry
  const card = { x: 60, y: 70, w: 380, h: 260, r: 20 };

  // Plot area
  const plot = {
    left: card.x + 36,   // 96
    right: card.x + 354, // 414
    top: card.y + 102,   // 172
    bottom: card.y + 200, // 270
  };

  // Trend line — patient's actual cognitive trajectory (ends up trending gently upward)
  const trendD = `M${plot.left} ${plot.bottom - 18} C ${plot.left + 54} ${plot.bottom - 22}, ${plot.left + 100} ${plot.bottom - 32}, ${plot.left + 140} ${plot.bottom - 42} S ${plot.left + 226} ${plot.bottom - 64}, ${plot.left + 260} ${plot.bottom - 78} S ${plot.right - 12} ${plot.bottom - 92}, ${plot.right} ${plot.bottom - 96}`;

  // Closed area under the trend line (for soft fill)
  const areaD = `${trendD} L ${plot.right} ${plot.bottom} L ${plot.left} ${plot.bottom} Z`;

  // Reference baseline ("average for your age") — static, dashed
  const referenceD = `M${plot.left} ${plot.bottom - 56} C ${plot.left + 90} ${plot.bottom - 58}, ${plot.left + 200} ${plot.bottom - 60}, ${plot.right} ${plot.bottom - 62}`;

  // Path-length estimates for stroke-dashoffset (slightly larger than actual length is safe)
  const trendDash = 420;
  const trendEndX = plot.right;
  const trendEndY = plot.bottom - 96;

  return (
    <svg
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="report-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={alpha(c.sand, 0.7)} />
          <stop offset="100%" stopColor={alpha(c.cream, 0.9)} />
        </linearGradient>
        <linearGradient id="report-area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={alpha(c.brandGreen, 0.22)} />
          <stop offset="100%" stopColor={alpha(c.brandGreen, 0)} />
        </linearGradient>
        <radialGradient id="report-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={alpha(c.accent, 0.14)} />
          <stop offset="100%" stopColor={alpha(c.accent, 0)} />
        </radialGradient>
      </defs>

      <rect width="500" height="400" fill="url(#report-bg)" />
      {/* warm halo, kept low and to the left so it does not fight the trend endpoint */}
      <circle cx="120" cy="320" r="160" fill="url(#report-glow)" />

      {/* card */}
      <rect
        x={card.x}
        y={card.y}
        rx={card.r}
        ry={card.r}
        width={card.w}
        height={card.h}
        fill={c.cream}
        stroke={alpha(c.ink, 0.08)}
        strokeWidth="1.5"
      />

      {/* Header — title placeholders + insight pill */}
      <rect x={card.x + 24} y={card.y + 22} rx="3" ry="3" width="118" height="8" fill={alpha(c.ink, 0.6)} />
      <rect x={card.x + 24} y={card.y + 38} rx="3" ry="3" width="74"  height="6" fill={alpha(c.ink, 0.28)} />

      {/* Insight pill — sits in the header to give the chart meaning */}
      <g>
        <rect
          x={card.x + 270}
          y={card.y + 18}
          rx="13"
          ry="13"
          width="86"
          height="26"
          fill={alpha(c.brandGreen, 0.08)}
          stroke={alpha(c.brandGreen, 0.22)}
          strokeWidth="1"
        />
        {/* up arrow */}
        <path
          d={`M${card.x + 284} ${card.y + 35} l 5 -7 l 5 7 Z`}
          fill={c.brandGreen}
        />
        {/* delta placeholder bar */}
        <rect
          x={card.x + 300}
          y={card.y + 28}
          rx="2"
          ry="2"
          width="44"
          height="6"
          fill={c.brandGreen}
        />
      </g>

      {/* Plot — axes + gridlines */}
      <line x1={plot.left} y1={plot.bottom} x2={plot.right} y2={plot.bottom} stroke={alpha(c.ink, 0.18)} strokeWidth="1" />
      <line x1={plot.left} y1={plot.top}    x2={plot.left}  y2={plot.bottom} stroke={alpha(c.ink, 0.18)} strokeWidth="1" />
      <line x1={plot.left} y1={plot.bottom - 32} x2={plot.right} y2={plot.bottom - 32} stroke={alpha(c.ink, 0.06)} strokeWidth="1" />
      <line x1={plot.left} y1={plot.bottom - 64} x2={plot.right} y2={plot.bottom - 64} stroke={alpha(c.ink, 0.06)} strokeWidth="1" />

      {/* Reference line — quiet, dashed, static. Reads as "average for your age". */}
      <path
        d={referenceD}
        fill="none"
        stroke={alpha(c.ink, 0.32)}
        strokeWidth="1.5"
        strokeDasharray="5 6"
        strokeLinecap="round"
      />

      {/* Soft area fill under the trend line — grows in horizontally, syncs with the line */}
      <path
        d={areaD}
        fill="url(#report-area-fill)"
        className="report-area"
      />

      {/* Primary trend line — draws in once per cycle, then holds */}
      <path
        d={trendD}
        fill="none"
        stroke={c.brandGreen}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="report-draw"
        style={{ ["--illust-dash" as string]: String(trendDash) }}
      />

      {/* End-point marker — fades in only after the line is drawn, then breathes gently */}
      <g className="report-dot">
        <circle cx={trendEndX} cy={trendEndY} r="9" fill={alpha(c.brandGreen, 0.18)} className="illust-pulse" />
        <circle cx={trendEndX} cy={trendEndY} r="5" fill={c.brandGreen} />
      </g>

      {/* X-axis tick labels (4 placeholder dashes representing quarters / periods) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const tickX = plot.left + 36 + i * 80;
        return (
          <rect
            key={`tick-${i}`}
            x={tickX}
            y={plot.bottom + 14}
            rx="2"
            ry="2"
            width="22"
            height="5"
            fill={alpha(c.ink, 0.32)}
          />
        );
      })}
    </svg>
  );
}
