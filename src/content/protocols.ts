export type Protocol = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  icon: "shield" | "bullseye";
};

export const protocolsIntro = {
  eyebrow: "Why care at Mindspan is different",
  title: "Standard of care, made better by precision medicine.",
  lead:
    "Every Mindspan patient gets the full standard of neurological care. And every patient gets access to breakthroughs that were sitting in research papers a year ago, translated into their plan, explained in their language, covered by their insurance.",
  image: "/assets/consultation-2.png",
  imageAlt: "A patient and neurologist in conversation",
} as const;

export const protocols: { core: Protocol; edge: Protocol } = {
  core: {
    id: "core",
    eyebrow: "The Core Protocol",
    title: "The full standard of care, delivered without compromise.",
    body:
      "Everything a great neurology clinic should offer. No waiting. No rushed visits. Every patient is treated as a whole person, not a chart number.",
    bullets: [
      "Unhurried time with a board-certified neurologist",
      "Comprehensive cognitive testing and functional assessment",
      "MRI, PET imaging, and full dementia lab panel when indicated",
      "FDA-approved anti-amyloid therapies (Leqembi, Kisunla) for eligible patients",
      "Caregiver included. Your primary care doctor kept in the loop.",
      "Billed through insurance, just like any other specialist visit",
    ],
    icon: "shield",
  },
  edge: {
    id: "edge",
    eyebrow: "The Edge Protocol",
    title: "Precision medicine, built into every visit.",
    body:
      "The breakthroughs that change outcomes, delivered as part of normal care. Not clinical trial, not concierge, just better medicine.",
    bullets: [
      "Blood biomarker panel that can confirm amyloid status without needing a PET scan",
      "Genetic testing (APOE) for personalized risk and safer treatment decisions",
      "Biological disease staging so your neurologist knows exactly where things stand",
      "Your own Cognitive Digital Twin, built and updated visit by visit",
      "Structured plan across 9 lifestyle factors with actual targets, not generic advice",
      "Both anti-amyloid therapies, with genotype-informed safety planning",
    ],
    icon: "bullseye",
  },
};
