import type { TwinDailyLife } from "@/content/twinReport";
import { TwinScreen, twin } from "./TwinScreen";

// Recreation of the tool's everyday-life view: the Independent / Together /
// With help key, then one room ("Out and about") opened to its timeline of
// with and without care. Bar splits are the tool's own values.

const glyphColor = {
  independent: twin.primary,
  together: twin.together,
  help: twin.sky,
} as const;

export function TwinDailyLifePreview({
  dailyLife,
  title,
  label,
}: {
  dailyLife: TwinDailyLife;
  title: string;
  label: string;
}) {
  const d = dailyLife;
  return (
    <TwinScreen label={label} style={{ background: "transparent", boxShadow: "none", borderRadius: 0, overflow: "visible" }}>
      {/* Section key */}
      <div className="grid grid-cols-1 @3xl:grid-cols-3" style={{ gap: "14px 22px", marginBottom: 20 }}>
        {d.key.map((k) => (
          <div key={k.name}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Glyph color={glyphColor[k.kind]} size={16} />
              <b style={{ fontSize: "0.9375rem", fontWeight: 700, color: twin.primary }}>{k.name}</b>
            </div>
            <p style={{ margin: "4px 0 0 24px", fontSize: "0.9375rem", lineHeight: 1.5, color: twin.ink(0.75) }}>
              {k.body}
            </p>
          </div>
        ))}
      </div>

      {/* The room, opened */}
      <div
        style={{
          background: twin.cream,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow:
            "0 12px 26px -18px rgba(8, 54, 48, 0.4), inset 0 0 0 1.5px rgba(8, 54, 48, 0.26), 0 28px 56px -32px rgba(8, 54, 48, 0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
          }}
        >
          <span style={{ fontSize: "1.1875rem", fontWeight: 600, lineHeight: 1.25, color: twin.primary }}>{d.room}</span>
          <span style={{ transform: "rotate(90deg)", color: twin.muted60, fontSize: "1.25rem", lineHeight: 1 }}>
            {"›"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: "16px 20px 22px",
            borderTop: `1px solid ${twin.ink(0.08)}`,
          }}
        >
          <p style={{ margin: 0, fontSize: "1.0625rem", fontWeight: 700, lineHeight: 1.45, color: twin.primary }}>
            {title}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
            {d.key.map((k) => (
              <span
                key={k.name}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.8125rem", fontWeight: 600, color: twin.muted70 }}
              >
                <Glyph color={glyphColor[k.kind]} size={13} />
                {k.name}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {d.lanes.map((lane) => (
              <div key={lane.label}>
                <span style={{ display: "block", margin: "0 0 4px", fontSize: "0.8125rem", fontWeight: 700, color: twin.muted70 }}>
                  {lane.label}
                </span>
                <span
                  style={{
                    display: "flex",
                    width: "100%",
                    height: 22,
                    borderRadius: 7,
                    overflow: "hidden",
                    boxShadow: `inset 0 0 0 1px ${twin.ink(0.08)}`,
                  }}
                >
                  <span style={{ flex: `${lane.together} 1 0%`, background: twin.together }} />
                  <span
                    style={{
                      flex: `${lane.help} 1 0%`,
                      background: twin.sky,
                      boxShadow: "inset 1.5px 0 0 rgba(251, 247, 240, 0.5)",
                    }}
                  />
                </span>
              </div>
            ))}
          </div>

          <div style={{ position: "relative", height: 30, borderTop: `1px solid ${twin.ink(0.12)}` }}>
            {d.axis.map((a, i) => {
              const pos = i / (d.axis.length - 1);
              return (
                <span
                  key={a}
                  style={{
                    position: "absolute",
                    top: 0,
                    paddingTop: 9,
                    left: `${pos * 100}%`,
                    transform: `translateX(${-pos * 100}%)`,
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: twin.muted70,
                    whiteSpace: "nowrap",
                  }}
                >
                  <i
                    style={{
                      position: "absolute",
                      top: 0,
                      left: `${pos * 100}%`,
                      width: 1.5,
                      height: 5,
                      background: twin.ink(0.24),
                    }}
                  />
                  {a}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </TwinScreen>
  );
}

function Glyph({ color, size }: { color: string; size: number }) {
  return (
    <span
      style={{
        flex: "0 0 auto",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.5px solid ${twin.ink(1)}`,
        boxSizing: "border-box",
        background: color,
      }}
    />
  );
}
