// Copy and data for the coded recreations of Digital Twin report screens on
// /digital-twin. Everything here is taken from twin.mindspan.co as it runs
// for one sample profile (74, female, some college, a recent memory score in
// the mild range, no memory medicines). Text is verbatim, and the chart
// geometry is the tool's own SVG output in its 900x460 viewBox. Nothing here
// is invented; see .context/twin-captures/ui-spec for the source captures.

export type TwinChartLine = {
  d: string;
  style: "solid" | "dashed";
  /** `label` is the tool's line-end name; `short` is shown beside the line (the legend carries the full name). */
  end: { y: number; stage: string; label: string; short: string; muted: boolean };
};

export type TwinChart = {
  /** Plot area inside the tool's 900x460 viewBox. */
  plot: { x0: number; x1: number; y0: number; y1: number };
  gridlines: readonly number[];
  stageLabels: readonly { text: string; y: number }[];
  axisLabels: readonly string[];
  band: string;
  marker: { x: number; y: number };
  lines: readonly TwinChartLine[];
  legend: readonly { kind: "solid" | "dashed" | "band"; label: string }[];
};

const plot = { x0: 144, x1: 750, y0: 24, y1: 412 };

const gridlines = [24, 36.9333, 62.8, 101.6, 153.3333, 282.6667, 399.0667, 412];

const stageLabels = [
  { text: "1. Steady", y: 30.4667 },
  { text: "2. Subtle shifts", y: 49.8667 },
  { text: "3. Mild changes", y: 82.2 },
  { text: "4. Moderate changes", y: 127.4667 },
  { text: "5. Progressing", y: 218 },
  { text: "6. Advanced", y: 340.8667 },
  { text: "7. Late stage", y: 405.125 },
];

const axisLabels = ["Today", "In 5 years", "In 10 years"];

// Shaded "plausible range" band (same in both states).
const band =
  "M 144 69.2667 L 204.6 69.2667 L 265.2 69.2667 L 325.8 69.2667 L 386.4 69.2667 L 447 69.2667 L 507.6 69.2667 L 568.2 69.2667 L 628.8 69.2667 L 689.4 69.2667 L 750 69.2667 L 750 412 L 689.4 412 L 628.8 401.2446 L 568.2 366.3531 L 507.6 331.4615 L 447 254.4073 L 386.4 228.7088 L 325.8 203.0103 L 265.2 177.3117 L 204.6 151.6132 L 144 108.0667 Z";

// Path without added care. With every care option off, the tool draws this
// same path as a single solid line labelled "Both paths".
const withoutCarePath =
  "M 144 88.6667 C 154.1 90.6649 184.4 96.6595 204.6 100.6559 C 224.8 104.6523 245 108.6487 265.2 112.6451 C 285.4 116.6415 305.6 120.6379 325.8 124.6343 C 346 128.6307 366.2 132.6271 386.4 136.6235 C 406.6 140.6199 426.8 143.817 447 148.6127 C 467.2 153.4083 487.4 159.8026 507.6 165.3975 C 527.8 170.9925 548 176.5875 568.2 182.1824 C 588.4 187.7774 608.6 193.3723 628.8 198.9673 C 649 204.5623 669.2 210.1572 689.4 215.7522 C 709.6 221.3471 739.9 229.7396 750 232.5371";

// Path with the tool's default science-backed care options on.
const withCarePath =
  "M 144 88.6667 C 154.1 88.6667 184.4 88.5794 204.6 88.6667 C 224.8 88.7539 245 87.4426 265.2 89.1902 C 285.4 90.9377 305.6 95.8313 325.8 99.1519 C 346 102.4725 366.2 105.7931 386.4 109.1137 C 406.6 112.4343 426.8 115.7548 447 119.0754 C 467.2 122.396 487.4 125.0007 507.6 129.0372 C 527.8 133.0736 548 138.5417 568.2 143.294 C 588.4 148.0463 608.6 152.7986 628.8 157.5509 C 649 162.3032 669.2 167.0555 689.4 171.8077 C 709.6 176.56 739.9 183.6885 750 186.0646";

const marker = { x: 144, y: 88.6667 };

export const twinReport = {
  question: {
    phase: { prefix: "Phase 3 of 7", name: "Cognitive history", step: "Step 2 of 2", current: 3, total: 7 },
    eyebrow: "Phase 3 · Cognitive history",
    title: "Where would you place yourself today?",
    helper:
      "A gentle estimate. Drag the slider to wherever feels right. We'll widen the uncertainty band to account for the guesswork.",
    stageTitle: "Mild changes or better",
    stageBody:
      "Daily life carries on as usual. At most mild, occasional changes in memory or thinking.",
    /** Slider value 4 of 30, as in the tool. */
    fillPercent: (4 / 30) * 100,
    scale: ["Mild changes or better", "Moderate changes", "Progressing", "Advanced or late stage"],
    activeScale: 0,
  },

  chartTitle: "How this may change over time",

  projection: {
    plot,
    gridlines,
    stageLabels,
    axisLabels,
    band,
    marker,
    lines: [
      {
        d: withoutCarePath,
        style: "solid",
        end: { y: 232.5371, stage: "Stage 5", label: "Both paths", short: "Both paths", muted: false },
      },
    ],
    legend: [
      { kind: "solid", label: "Both paths" },
      { kind: "band", label: "Plausible range" },
    ],
  } satisfies TwinChart,

  withCare: {
    plot,
    gridlines,
    stageLabels,
    axisLabels,
    band,
    marker,
    lines: [
      {
        d: withoutCarePath,
        style: "dashed",
        end: { y: 232.5371, stage: "Stage 5", label: "Without added care", short: "Without care", muted: true },
      },
      {
        d: withCarePath,
        style: "solid",
        end: { y: 186.0646, stage: "Stage 5", label: "With science-backed care", short: "With care", muted: false },
      },
    ],
    legend: [
      { kind: "dashed", label: "Without added care" },
      { kind: "solid", label: "With science-backed care" },
      { kind: "band", label: "Plausible range" },
    ],
  } satisfies TwinChart,

  dailyLife: {
    key: [
      {
        kind: "independent",
        name: "Independent",
        body: "You're able to do this activity on your own, without another person's support.",
      },
      {
        kind: "together",
        name: "Together",
        body: "You're able to do this activity with another person alongside you, participating or helping as needed.",
      },
      {
        kind: "help",
        name: "With help",
        body: "Another person takes on most or all of this activity for you.",
      },
    ],
    room: "Out and about",
    // The row's "about 5 / 8 more years" takeaways are left out on purpose:
    // the page makes no years-gained claims. The bars below are the tool's.
    lanes: [
      { label: "Without added care", together: 5.28125, help: 4.71875 },
      { label: "With science-backed care", together: 7.70417, help: 2.29583 },
    ],
    axis: ["Today", "In 5 years", "In 10 years"],
  },
} as const;

export type TwinDailyLife = typeof twinReport.dailyLife;
export type TwinQuestion = typeof twinReport.question;
