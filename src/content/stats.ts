export type Stat = {
  value: string;
  // Optional shortened variant shown only on mobile (< 640px) where space is tight.
  // When set, `value` is used on tablet/desktop and `valueShort` is swapped in below sm.
  valueShort?: string;
  label: string;
  link?: { label: string; href: string };
};

// Wait-time facts shared across pages, so every page quotes the same numbers.
export const MINDSPAN_FIRST_VISIT = "2–3 weeks";
export const TYPICAL_SPECIALIST_WAIT = "12+ months";
// Compound-adjective form for copy like "a 12+ month wait".
export const TYPICAL_SPECIALIST_WAIT_ADJ = TYPICAL_SPECIALIST_WAIT.replace(/s$/, "");

export const stats: Stat[] = [
  {
    value: MINDSPAN_FIRST_VISIT,
    valueShort: "2–3 wks",
    label: "To see a Mindspan neurologist",
    link: {
      label: "and get a free assessment right away",
      href: "https://assessment.mindspan.co/",
    },
  },
  { value: TYPICAL_SPECIALIST_WAIT, label: "Typical specialist wait" },
];
