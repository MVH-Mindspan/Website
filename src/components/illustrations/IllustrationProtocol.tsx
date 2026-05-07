"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";

export function IllustrationProtocol() {
  const { theme } = useTheme();
  const c = theme.colors;

  // Card geometry inside the 500 × 400 viewBox
  const card = { x: 60, y: 70, w: 380, h: 260, r: 20 };

  // Day grid geometry
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const gridLeft = card.x + 124;
  const gridTop = card.y + 100;
  const colStep = 34; // distance between day columns
  const rowStep = 32; // distance between modality rows
  const dayDotR = 5;
  const trackHeight = 22;

  // Each row is one care modality. The booleans mark which days have an
  // event for that modality — together they tell the eye that the plan is
  // consistent without being identical day to day.
  type Modality = {
    label: string;
    icon: "brain" | "heart" | "pill" | "chat";
    color: string;
    /** 7-length array of booleans for Mon–Sun */
    days: boolean[];
  };

  const modalities: Modality[] = [
    {
      label: "Cognitive",
      icon: "brain",
      color: c.brandGreen,
      days: [true, true, true, true, true, false, true],
    },
    {
      label: "Lifestyle",
      icon: "heart",
      color: c.accent,
      days: [true, true, true, true, true, true, true],
    },
    {
      label: "Therapy",
      icon: "pill",
      color: c.brandGreenLight,
      days: [true, false, true, false, true, false, true],
    },
    {
      label: "Care team",
      icon: "chat",
      color: c.ink,
      days: [false, false, false, true, false, false, true],
    },
  ];

  return (
    <svg
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="protocol-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={alpha(c.skySoft, 0.55)} />
          <stop offset="100%" stopColor={alpha(c.cream, 0.95)} />
        </linearGradient>
        <linearGradient id="protocol-today" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={alpha(c.brandGreen, 0)} />
          <stop offset="20%" stopColor={alpha(c.brandGreen, 0.18)} />
          <stop offset="80%" stopColor={alpha(c.brandGreen, 0.18)} />
          <stop offset="100%" stopColor={alpha(c.brandGreen, 0)} />
        </linearGradient>
      </defs>

      <rect width="500" height="400" fill="url(#protocol-bg)" />

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

      {/* header — title + week pill */}
      <rect
        x={card.x + 24}
        y={card.y + 22}
        rx="3"
        ry="3"
        width="116"
        height="8"
        fill={alpha(c.ink, 0.6)}
      />
      <rect
        x={card.x + 24}
        y={card.y + 38}
        rx="3"
        ry="3"
        width="74"
        height="6"
        fill={alpha(c.ink, 0.28)}
      />
      <g>
        <rect
          x={card.x + 286}
          y={card.y + 20}
          rx="11"
          ry="11"
          width="80"
          height="22"
          fill={alpha(c.brandGreen, 0.08)}
          stroke={alpha(c.brandGreen, 0.25)}
          strokeWidth="1"
        />
        <rect
          x={card.x + 296}
          y={card.y + 28}
          rx="2"
          ry="2"
          width="60"
          height="6"
          fill={c.brandGreen}
        />
      </g>

      {/* day-of-week labels */}
      {dayLabels.map((d, i) => (
        <text
          key={`day-${i}`}
          x={gridLeft + i * colStep}
          y={card.y + 86}
          textAnchor="middle"
          fontFamily={theme.fonts.body}
          fontSize="10"
          fontWeight="600"
          fill={alpha(c.ink, 0.45)}
        >
          {d}
        </text>
      ))}

      {/* "today" sliding highlight — animates Mon→Sun then resets invisibly */}
      <rect
        x={gridLeft - colStep / 2}
        y={card.y + 78}
        width={colStep}
        height={140}
        rx="6"
        ry="6"
        fill="url(#protocol-today)"
        className="protocol-today-slide"
      />

      {/* modality rows */}
      {modalities.map((m, rowIdx) => {
        const y = gridTop + rowIdx * rowStep;
        return (
          <g key={m.label}>
            {/* row baseline track */}
            <rect
              x={gridLeft - colStep / 2 + 6}
              y={y - trackHeight / 2}
              width={colStep * 6 + colStep - 12}
              height={trackHeight}
              rx={trackHeight / 2}
              ry={trackHeight / 2}
              fill={alpha(c.ink, 0.04)}
            />

            {/* icon badge */}
            <g transform={`translate(${card.x + 24}, ${y - 14})`}>
              <rect
                width="28"
                height="28"
                rx="9"
                ry="9"
                fill={alpha(m.color, 0.12)}
              />
              <ModalityIcon icon={m.icon} color={m.color} />
            </g>

            {/* modality label */}
            <rect
              x={card.x + 60}
              y={y - 4}
              rx="2"
              ry="2"
              width="56"
              height="6"
              fill={alpha(c.ink, 0.55)}
            />

            {/* day dots */}
            {m.days.map((on, dayIdx) => (
              <circle
                key={`${m.label}-${dayIdx}`}
                cx={gridLeft + dayIdx * colStep}
                cy={y}
                r={dayDotR}
                fill={on ? m.color : "none"}
                stroke={on ? "none" : alpha(c.ink, 0.18)}
                strokeWidth="1.2"
              />
            ))}
          </g>
        );
      })}

      {/* footer — "next visit" pill */}
      <g>
        <rect
          x={card.x + 24}
          y={card.y + card.h - 42}
          rx="14"
          ry="14"
          width="148"
          height="28"
          fill={alpha(c.brandGreen, 0.06)}
          stroke={alpha(c.brandGreen, 0.18)}
          strokeWidth="1"
        />
        <circle
          cx={card.x + 38}
          cy={card.y + card.h - 28}
          r="4"
          fill={c.accent}
          className="illust-pulse"
        />
        <rect
          x={card.x + 50}
          y={card.y + card.h - 31}
          rx="2"
          ry="2"
          width="76"
          height="6"
          fill={alpha(c.ink, 0.55)}
        />
      </g>
    </svg>
  );
}

function ModalityIcon({
  icon,
  color,
}: {
  icon: "brain" | "heart" | "pill" | "chat";
  color: string;
}) {
  const stroke = {
    fill: "none" as const,
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "brain":
      return (
        <g transform="translate(6, 6)">
          <path
            d="M7 2.5 C 5 2.5 4 4 4.4 5.4 C 3 6 3 8 4.6 8.4 C 4.2 10 6 10.8 7 9.8 C 8 10.8 9.8 10 9.4 8.4 C 11 8 11 6 9.6 5.4 C 10 4 9 2.5 7 2.5 Z M 9 2.5 C 11 2.5 12 4 11.6 5.4 C 13 6 13 8 11.4 8.4 C 11.8 10 10 10.8 9 9.8 C 8 10.8 6.2 10 6.6 8.4 C 5 8 5 6 6.4 5.4 C 6 4 7 2.5 9 2.5 Z"
            {...stroke}
            strokeWidth="1.2"
          />
          <line x1="8" y1="3.5" x2="8" y2="11" {...stroke} strokeWidth="1" />
        </g>
      );
    case "heart":
      return (
        <path
          d="M14 12 L 12 14 L 8 18 L 4 14 L 2 12 C 0.5 9.5 1.5 6 4.5 6 C 6 6 7 7 8 8.5 C 9 7 10 6 11.5 6 C 14.5 6 15.5 9.5 14 12 Z"
          transform="translate(6, 5)"
          {...stroke}
          strokeWidth="1.4"
        />
      );
    case "pill":
      return (
        <g transform="translate(5, 9)">
          <rect x="0" y="0" rx="5" ry="5" width="18" height="10" {...stroke} strokeWidth="1.4" />
          <line x1="9" y1="0" x2="9" y2="10" {...stroke} strokeWidth="1.4" />
        </g>
      );
    case "chat":
      return (
        <path
          d="M3 4 H 17 C 18 4 19 5 19 6 V 14 C 19 15 18 16 17 16 H 10 L 6 19 V 16 H 3 C 2 16 1 15 1 14 V 6 C 1 5 2 4 3 4 Z"
          transform="translate(4, 4) scale(0.85)"
          {...stroke}
          strokeWidth="1.4"
        />
      );
  }
}
