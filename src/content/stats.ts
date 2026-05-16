export type Stat = {
  value: string;
  // Optional shortened variant shown only on mobile (< 640px) where space is tight.
  // When set, `value` is used on tablet/desktop and `valueShort` is swapped in below sm.
  valueShort?: string;
  label: string;
  link?: { label: string; href: string };
};

export const stats: Stat[] = [
  {
    value: "2–3 weeks",
    valueShort: "2–3 wks",
    label: "To see a Mindspan neurologist",
    link: {
      label: "and get a free assessment right away",
      href: "https://assessment.mindspan.co/",
    },
  },
  { value: "12+ months", label: "Typical specialist wait" },
];
