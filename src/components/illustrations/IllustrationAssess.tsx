"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";

export function IllustrationAssess() {
  const { theme } = useTheme();
  const c = theme.colors;

  // Three answer rows. Each row shares the same x-position; only y differs.
  const rowX = 156;
  const labelX = 172;
  const rows = [
    { y: 200, w: 80 },
    { y: 226, w: 64 },
    { y: 252, w: 92 },
  ];

  return (
    <svg
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A simple cognitive screening on a tablet."
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="assess-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={alpha(c.sky, 0.35)} />
          <stop offset="100%" stopColor={alpha(c.cream, 0.4)} />
        </linearGradient>
      </defs>

      <rect width="500" height="400" fill="url(#assess-bg)" />

      {/* tablet shadow */}
      <ellipse cx="250" cy="350" rx="160" ry="10" fill={alpha(c.ink, 0.12)} />

      {/* tablet body — static */}
      <g>
        <rect
          x="110"
          y="70"
          rx="22"
          ry="22"
          width="280"
          height="240"
          fill={c.cream}
          stroke={alpha(c.ink, 0.1)}
          strokeWidth="1.5"
        />
        <rect
          x="125"
          y="85"
          rx="14"
          ry="14"
          width="250"
          height="210"
          fill={alpha(c.ink, 0.04)}
        />

        {/* title bar */}
        <rect x="142" y="106" rx="4" ry="4" width="86" height="8" fill={alpha(c.ink, 0.55)} />
        <rect x="142" y="122" rx="3" ry="3" width="48" height="6" fill={alpha(c.ink, 0.25)} />

        {/* question text */}
        <rect x="142" y="148" rx="3" ry="3" width="170" height="6" fill={alpha(c.ink, 0.35)} />
        <rect x="142" y="160" rx="3" ry="3" width="140" height="6" fill={alpha(c.ink, 0.35)} />

        {/* unselected answer rows (always visible) */}
        {rows.map((r) => (
          <g key={`row-${r.y}`}>
            <circle
              cx={rowX}
              cy={r.y}
              r="8"
              fill={c.cream}
              stroke={alpha(c.ink, 0.3)}
              strokeWidth="1.5"
            />
            <rect
              x={labelX}
              y={r.y - 4}
              rx="3"
              ry="3"
              width={r.w}
              height="8"
              fill={alpha(c.ink, 0.45)}
            />
          </g>
        ))}

        {/* selected indicator — moves down through the rows in sequence */}
        {rows.map((r, i) => (
          <g
            key={`sel-${r.y}`}
            className="assess-select"
            style={{ animationDelay: `${i * 3}s` }}
          >
            <circle
              cx={rowX}
              cy={r.y}
              r="8"
              fill={c.brandGreen}
              stroke={c.brandGreen}
              strokeWidth="1.5"
            />
            <circle cx={rowX} cy={r.y} r="3" fill={c.cream} />
          </g>
        ))}

        {/* stepped progress bar */}
        <rect x="142" y="278" rx="4" ry="4" width="216" height="6" fill={alpha(c.ink, 0.08)} />
        <rect
          x="142"
          y="278"
          rx="4"
          ry="4"
          width="216"
          height="6"
          fill={c.accent}
          className="assess-progress"
        />
      </g>
    </svg>
  );
}
