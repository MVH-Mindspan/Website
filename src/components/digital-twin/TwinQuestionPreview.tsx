"use client";

import type { TwinQuestion } from "@/content/twinReport";
import { TwinScreen, twin } from "./TwinScreen";
import { UNFOLD_EASE, revealStyle, useUnfold } from "./useUnfold";

// Recreation of the tool's "Where would you place yourself today?" screen:
// phase rail, question, and the stage slider, using the tool's own styles at
// its standard (16px) text size.

const THUMB = 56;

export function TwinQuestionPreview({ question, label }: { question: TwinQuestion; label: string }) {
  const q = question;
  // On first view the slider settles into place, as if someone just answered.
  const { ref, phase } = useUnfold<HTMLDivElement>(150 + 900);
  return (
    <TwinScreen label={label}>
      <PhaseRail phase={q.phase} />

      <div style={{ padding: "clamp(20px, 4vw, 32px)", display: "flex", flexDirection: "column", gap: 24 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: "0.8125rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: twin.eyebrow,
            }}
          >
            {q.eyebrow}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: twin.heading,
              fontSize: "clamp(1.625rem, 1.2rem + 1.2vw, 2.125rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              color: twin.primary,
              textWrap: "balance",
            }}
          >
            {q.title}
          </p>
          <p style={{ margin: 0, fontSize: "1.0625rem", lineHeight: 1.55, color: twin.ink(0.7), maxWidth: "46ch" }}>
            {q.helper}
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p
            style={{
              margin: 0,
              fontFamily: twin.heading,
              fontSize: "1.5rem",
              fontWeight: 500,
              color: twin.primary,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {q.stageTitle}
          </p>
          <p style={{ margin: 0, fontSize: "0.9375rem", color: twin.ink(0.7), lineHeight: 1.55, maxWidth: "52ch" }}>
            {q.stageBody}
          </p>

          {/* Slider: 10px sand track, gradient fill, 56px handle. */}
          <div ref={ref} style={{ position: "relative", height: THUMB + 16, marginTop: 8 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: 10,
                transform: "translateY(-50%)",
                background: twin.sand,
                borderRadius: 999,
                boxShadow: "inset 0 1px 2px rgba(8, 54, 48, 0.18), inset 0 -1px 0 rgba(255, 255, 255, 0.4)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                height: 10,
                width: `${q.fillPercent}%`,
                transform: "translateY(-50%)",
                background: `linear-gradient(90deg, ${twin.primary}, ${twin.accent})`,
                borderRadius: 999,
                ...revealStyle(phase, 900, 150, "999px"),
              }}
            />
            {/* Native range thumbs travel within the track minus their width,
                so the handle rides a rail inset by half its size. The mover is
                the rail's width, so translateX(%) maps to the slider value. */}
            <div style={{ position: "absolute", top: "50%", left: THUMB / 2, right: THUMB / 2, height: 0 }}>
              <div
                style={{
                  width: "100%",
                  transform: `translateX(${phase === "armed" ? 0 : q.fillPercent}%)`,
                  transition: phase === "play" ? `transform 900ms ${UNFOLD_EASE} 150ms` : "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: THUMB,
                    height: THUMB,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    background: twin.primary,
                    border: "4px solid #fff",
                    boxShadow: "0 2px 6px #08363038, 0 12px 28px -8px #08363066",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Narrow cards show the two ends of the scale; wider cards show all four. */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.35 }}>
            {q.scale.map((s, i) => {
              const last = i === q.scale.length - 1;
              const middle = i > 0 && !last;
              return (
                <span
                  key={s}
                  className={
                    middle
                      ? "hidden @md:block @md:text-center"
                      : i === 0
                        ? "text-left @md:text-center"
                        : "text-right @md:text-center"
                  }
                  style={{
                    flex: "1 1 0%",
                    maxWidth: middle ? undefined : "45%",
                    color: i === q.activeScale ? twin.primary : twin.ink(0.7),
                  }}
                >
                  {s}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </TwinScreen>
  );
}

function PhaseRail({ phase }: { phase: TwinQuestion["phase"] }) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${twin.ink(0.06)}`,
        padding: "12px clamp(16px, 4vw, 32px)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          fontSize: "0.8125rem",
          color: twin.ink(0.7),
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 999,
              background: "rgba(8, 54, 48, 0.1)",
              color: twin.primary,
              flexShrink: 0,
              marginRight: 2,
            }}
          >
            {/* The tool's hourglass icon for the cognitive history phase. */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m18,22v-5c0-2.088-1.068-3.925-2.686-5,1.618-1.075,2.686-2.912,2.686-5V2" />
              <path d="m6,2v5c0,2.088,1.068,3.925,2.686,5-1.618,1.075-2.686,2.912-2.686,5v5" />
              <line x1="4" y1="2" x2="20" y2="2" strokeLinecap="square" />
              <line x1="4" y1="22" x2="20" y2="22" strokeLinecap="square" />
            </svg>
          </span>
          <span
            className="hidden @md:inline"
            style={{
              whiteSpace: "nowrap",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: twin.primary,
              fontSize: "0.75rem",
            }}
          >
            {phase.prefix}
          </span>
          <span className="hidden @md:inline" style={{ color: twin.ink(0.5) }}>
            {"·"}
          </span>
          <span style={{ fontFamily: twin.heading, fontSize: "1rem", color: twin.primary, fontWeight: 600, whiteSpace: "nowrap" }}>
            {phase.name}
          </span>
        </span>
        <span style={{ color: twin.ink(0.7), fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
          {phase.step}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${phase.total}, minmax(0, 1fr))`, gap: 6 }}>
        {Array.from({ length: phase.total }, (_, i) => {
          const n = i + 1;
          return (
            <span
              key={n}
              style={{
                height: 6,
                borderRadius: 999,
                background: n === phase.current ? twin.accent : n < phase.current ? twin.primary : twin.ink(0.1),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
