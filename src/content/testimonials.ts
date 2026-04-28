export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  relation: string;
};

export const testimonialsIntro = {
  eyebrow: "What families tell us",
  title: "Finally, a neurologist who listened.",
} as const;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "We spent a year being told to wait and see. Mindspan saw my mom in three weeks and we finally had answers.",
    name: "Rachel M.",
    relation: "Daughter and caregiver, Newton, MA",
  },
  {
    id: "t2",
    quote:
      "I was terrified to bring it up with my own doctor. The team here treated me like a person, not a symptom.",
    name: "Thomas P.",
    relation: "Patient, Boston, MA",
  },
  {
    id: "t3",
    quote:
      "They explained everything to both of us, on our schedule. My father has never felt more respected by a specialist.",
    name: "Elena R.",
    relation: "Caregiver, Palo Alto, CA",
  },
];
