"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";

export function IllustrationMeet() {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <svg
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="meet-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={alpha(c.skySoft, 0.7)} />
          <stop offset="100%" stopColor={alpha(c.cream, 0.95)} />
        </linearGradient>
      </defs>

      <rect width="500" height="400" fill="url(#meet-bg)" />

      {/* video frame */}
      <g>
        <rect
          x="50"
          y="80"
          rx="20"
          ry="20"
          width="400"
          height="240"
          fill={c.primary}
          stroke={alpha(c.ink, 0.2)}
          strokeWidth="1.5"
        />

        {/* divider */}
        <line
          x1="250"
          y1="100"
          x2="250"
          y2="300"
          stroke={alpha("#ffffff", 0.12)}
          strokeWidth="1"
        />

        {/* Left tile — patient */}
        <g>
          <circle cx="150" cy="180" r="38" fill={c.sand} />
          {/* simple shoulder shape */}
          <path
            d="M96 270 C 96 230, 204 230, 204 270 L 204 286 L 96 286 Z"
            fill={c.sand}
            opacity="0.85"
          />
          {/* face details */}
          <circle cx="138" cy="174" r="2.5" fill={alpha(c.ink, 0.55)} />
          <circle cx="162" cy="174" r="2.5" fill={alpha(c.ink, 0.55)} />
          <path
            d="M138 192 Q 150 200 162 192"
            fill="none"
            stroke={alpha(c.ink, 0.55)}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Right tile — neurologist */}
        <g>
          <circle cx="350" cy="180" r="38" fill={c.brandGreenLight} />
          <path
            d="M296 270 C 296 230, 404 230, 404 270 L 404 286 L 296 286 Z"
            fill={c.brandGreenLight}
            opacity="0.85"
          />
          <circle cx="338" cy="174" r="2.5" fill={c.cream} />
          <circle cx="362" cy="174" r="2.5" fill={c.cream} />
          <path
            d="M338 192 Q 350 200 362 192"
            fill="none"
            stroke={c.cream}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* tile labels */}
        <rect x="84" y="296" rx="2" ry="2" width="46" height="4" fill={alpha("#ffffff", 0.45)} />
        <rect x="284" y="296" rx="2" ry="2" width="62" height="4" fill={alpha("#ffffff", 0.45)} />

        {/* live dot on the doctor tile */}
        <circle cx="416" cy="100" r="5" fill={c.accent} className="illust-pulse" />
      </g>

      {/* connecting signal arcs */}
      <g
        className="illust-line-pulse"
        style={{ stroke: c.brandGreen, fill: "none", strokeWidth: 1.4 }}
      >
        <path d="M250 200 Q 250 160 250 130" strokeLinecap="round" />
      </g>
      <g style={{ stroke: alpha(c.brandGreen, 0.5), fill: "none", strokeWidth: 1 }}>
        <path
          d="M210 60 Q 250 30 290 60"
          strokeLinecap="round"
          className="illust-line-pulse"
          style={{ animationDelay: "0.4s" }}
        />
        <path
          d="M180 50 Q 250 0 320 50"
          strokeLinecap="round"
          className="illust-line-pulse"
          style={{ animationDelay: "0.8s" }}
        />
      </g>

      {/* call controls */}
      <g>
        <rect x="200" y="340" rx="14" ry="14" width="100" height="28" fill={c.cream} stroke={alpha(c.ink, 0.1)} strokeWidth="1" />
        <circle cx="222" cy="354" r="6" fill={c.brandGreen} />
        <circle cx="250" cy="354" r="6" fill={alpha(c.ink, 0.4)} />
        <circle cx="278" cy="354" r="6" fill={c.accent} />
      </g>
    </svg>
  );
}
