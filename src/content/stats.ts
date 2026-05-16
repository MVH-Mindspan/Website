export type Stat = {
  value: string;
  // Optional shortened variant shown only on mobile (< 640px) where space is tight.
  // When set, `value` is used on tablet/desktop and `valueShort` is swapped in below sm.
  valueShort?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "2–3 weeks", valueShort: "2–3 wks", label: "To see a Mindspan neurologist" },
  { value: "12+ months", label: "Typical specialist wait" },
];
