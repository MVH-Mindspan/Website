import type { TwinChart } from "@/content/twinReport";
import { TwinScreen, twin } from "./TwinScreen";

// Recreation of the tool's "How this may change over time" chart. The band
// and line paths are the tool's own SVG geometry. The plot stretches to the
// card (strokes stay their true width), and the labels are real text at a
// readable size instead of shrinking with the SVG.
//
// Layout follows the card's own width (container queries), so it adapts the
// same way in a narrow step column as on a phone:
// - under 36rem: the y-axis shows stage numbers and a numbered key sits under
//   the plot, so the plot keeps most of the width;
// - 36rem and up: full stage names beside the plot.
// Line ends always show the stage and a short name; the legend has the full one.

export function TwinProjectionChart({
  chart,
  title,
  label,
}: {
  chart: TwinChart;
  title: string;
  label: string;
}) {
  const { x0, x1, y0, y1 } = chart.plot;
  const w = x1 - x0;
  const h = y1 - y0;
  const top = (y: number) => `${((y - y0) / h) * 100}%`;
  const height = "h-[300px] @xl:h-[340px]";
  const stages = chart.stageLabels.map((s) => {
    const [num, ...rest] = s.text.split(". ");
    return { ...s, num, name: rest.join(". ") };
  });

  return (
    <TwinScreen label={label}>
      <div style={{ padding: "clamp(18px, 3.5vw, 28px)" }}>
        <p style={{ margin: 0, fontSize: "1.0625rem", fontWeight: 700, lineHeight: 1.45, color: twin.primary }}>
          {title}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px", margin: "10px 0 18px" }}>
          {chart.legend.map((item) => (
            <span
              key={item.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontSize: "0.875rem",
                fontWeight: 600,
                color: twin.muted70,
              }}
            >
              <LegendSwatch kind={item.kind} />
              {item.label}
            </span>
          ))}
        </div>

        <div
          className="grid grid-cols-[1.75rem_1fr_4.75rem] @xl:grid-cols-[8.75rem_1fr_6rem]"
          style={{ columnGap: 10 }}
        >
          {/* Stage labels: numbers when narrow, names when there's room. */}
          <div className={`relative ${height}`}>
            {stages.map((s, i) => (
              <span
                key={s.text}
                className="text-[13px] @xl:text-[14px]"
                style={{
                  position: "absolute",
                  right: 0,
                  top: top(s.y),
                  transform: `translateY(${stageShift(stages, i, h)})`,
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                  color: twin.ink(0.72),
                  lineHeight: 1,
                }}
              >
                <span className="@xl:hidden">{s.num}</span>
                <span className="hidden @xl:inline">{s.text}</span>
              </span>
            ))}
          </div>

          <div className={`relative ${height}`}>
            <svg
              viewBox={`${x0} ${y0} ${w} ${h}`}
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              style={{ display: "block", overflow: "visible" }}
            >
              {chart.gridlines.map((y) => (
                <line
                  key={y}
                  x1={x0}
                  x2={x1}
                  y1={y}
                  y2={y}
                  stroke={twin.ink(0.12)}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <path d={chart.band} fill="rgba(8, 54, 48, 0.1)" />
              {chart.lines.map((line) => (
                <path
                  key={line.d.slice(0, 40) + line.style}
                  d={line.d}
                  fill="none"
                  stroke={line.style === "dashed" ? twin.ink(0.5) : twin.primary}
                  strokeWidth={line.style === "dashed" ? 1.5 : 2.5}
                  strokeDasharray={line.style === "dashed" ? "6 5" : undefined}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {/* Today's marker, drawn in HTML so it stays round. */}
            <span
              style={{
                position: "absolute",
                left: `${((chart.marker.x - x0) / w) * 100}%`,
                top: top(chart.marker.y),
                width: 11,
                height: 11,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: twin.primary,
                boxShadow: "0 0 0 2.5px #fff",
              }}
            />
          </div>

          {/* Where each line ends at 10 years. When two ends sit close, the
              upper label grows upward and the lower one downward. */}
          <div className={`relative ${height}`}>
            {chart.lines.map((line) => (
              <span
                key={line.end.label}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: top(line.end.y),
                  transform: `translateY(${endShift(chart, line.end.y)})`,
                  color: line.end.muted ? twin.ink(0.62) : twin.primary,
                  lineHeight: 1.2,
                }}
              >
                <span className="block text-[13px] @xl:text-[14px]" style={{ fontWeight: 600 }}>
                  {line.end.stage}
                </span>
                <span className="block text-[12px] @xl:text-[13px]" style={{ fontWeight: 500, whiteSpace: "nowrap" }}>
                  {line.end.short}
                </span>
              </span>
            ))}
          </div>

          {/* Time axis under the plot: first label flush left, last flush right. */}
          <div />
          <div className="relative text-[13px]" style={{ height: 30, fontWeight: 500, color: twin.ink(0.7) }}>
            {chart.axisLabels.map((a, i) => {
              const pos = i / (chart.axisLabels.length - 1);
              const middle = i > 0 && i < chart.axisLabels.length - 1;
              return (
                <span
                  key={a}
                  className={middle ? "hidden @sm:inline" : undefined}
                  style={{
                    position: "absolute",
                    top: 10,
                    left: `${pos * 100}%`,
                    transform: `translateX(${-pos * 100}%)`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {a}
                </span>
              );
            })}
          </div>
          <div />
        </div>

        {/* Numbered stage key, only when the y-axis shows numbers. */}
        <ol
          className="grid grid-cols-2 @xl:hidden"
          style={{
            listStyle: "none",
            margin: "14px 0 0",
            padding: "12px 0 0",
            gap: "6px 16px",
            borderTop: `1px solid ${twin.ink(0.08)}`,
            fontSize: "0.8125rem",
            color: twin.ink(0.72),
          }}
        >
          {stages.map((s) => (
            <li key={s.text}>
              <b style={{ fontWeight: 700, color: twin.primary }}>{s.num}</b> {s.name}
            </li>
          ))}
        </ol>
      </div>
    </TwinScreen>
  );
}

function LegendSwatch({ kind }: { kind: "solid" | "dashed" | "band" }) {
  if (kind === "band") {
    return (
      <span
        style={{ flex: "0 0 auto", width: 24, height: 13, borderRadius: 3, background: "rgba(8, 54, 48, 0.1)" }}
      />
    );
  }
  return (
    <span
      style={{
        flex: "0 0 auto",
        width: 24,
        borderTop:
          kind === "solid" ? `2.5px solid ${twin.primary}` : `1.5px dashed ${twin.ink(0.5)}`,
      }}
    />
  );
}

function endShift(chart: TwinChart, y: number): string {
  if (chart.lines.length < 2) return "-50%";
  const ys = chart.lines.map((l) => l.end.y);
  const close = Math.max(...ys) - Math.min(...ys) < (chart.plot.y1 - chart.plot.y0) * 0.2;
  if (!close) return "-50%";
  return y === Math.min(...ys) ? "-88%" : "-12%";
}

// Stages 1 and 2 sit very close on the tool's scale; nudge close neighbours
// apart so their labels don't touch.
function stageShift(stages: readonly { y: number }[], i: number, plotHeight: number): string {
  const near = plotHeight * 0.07;
  const prev = i > 0 ? stages[i].y - stages[i - 1].y : Infinity;
  const next = i < stages.length - 1 ? stages[i + 1].y - stages[i].y : Infinity;
  if (next < near) return "-85%";
  if (prev < near) return "-15%";
  return "-50%";
}
