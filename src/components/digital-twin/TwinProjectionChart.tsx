import type { TwinChart } from "@/content/twinReport";
import { TwinScreen, twin } from "./TwinScreen";

// Recreation of the tool's "How this may change over time" chart. The band
// and line paths are the tool's own SVG geometry. The plot stretches to the
// column (strokes stay their true width), and the labels are real text at a
// readable size instead of shrinking with the SVG.

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
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: twin.muted70,
              }}
            >
              <LegendSwatch kind={item.kind} />
              {item.label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[5.75rem_1fr_4rem] sm:grid-cols-[8rem_1fr_6.5rem]" style={{ columnGap: 10 }}>
          {/* Stage labels, right-aligned against the plot. */}
          <div className="relative h-[230px] sm:h-[280px]">
            {chart.stageLabels.map((s) => (
              <span
                key={s.text}
                className="text-[11px] sm:text-[12px]"
                style={{
                  position: "absolute",
                  right: 0,
                  top: top(s.y),
                  transform: "translateY(-50%)",
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                  color: twin.ink(0.68),
                  lineHeight: 1,
                }}
              >
                {s.text}
              </span>
            ))}
          </div>

          <div className="relative h-[230px] sm:h-[280px]">
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
          <div className="relative h-[230px] sm:h-[280px]">
            {chart.lines.map((line) => (
              <span
                key={line.end.label}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: top(line.end.y),
                  transform: `translateY(${endShift(chart, line.end.y)})`,
                  color: line.end.muted ? twin.ink(0.55) : twin.primary,
                  lineHeight: 1.2,
                }}
              >
                <span className="block text-[12px] sm:text-[13px]" style={{ fontWeight: 600 }}>
                  {line.end.stage}
                </span>
                <span className="hidden sm:block text-[11px]" style={{ fontWeight: 500 }}>
                  {line.end.label}
                </span>
              </span>
            ))}
          </div>

          {/* Time axis under the plot. */}
          <div />
          <div className="relative text-[11px] sm:text-[12px]" style={{ height: 28, fontWeight: 500, color: twin.ink(0.55) }}>
            {chart.axisLabels.map((a, i) => (
              <span
                key={a}
                style={{
                  position: "absolute",
                  top: 10,
                  left: `${(i / (chart.axisLabels.length - 1)) * 100}%`,
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                }}
              >
                {a}
              </span>
            ))}
          </div>
          <div />
        </div>
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
