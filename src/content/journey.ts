export type JourneyStage = {
  kicker: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
};

export const journeyIntro = {
  title: "What care at Mindspan actually looks like.",
  lead:
    "Every family\u2019s journey is different, but the shape is the same. From first concern through to ongoing care, you\u2019ll know exactly what comes next at every step.",
} as const;

export const journey: JourneyStage[] = [
  {
    kicker: "Where to start",
    title: "Get assessed",
    body:
      "Start with a short online screening from home, no account, no cost, no clinic visit. You\u2019ll get clear feedback on whether a neurologist visit makes sense.",
    cta: { label: "Start a free assessment today", href: "https://assessment.mindspan.co/" },
    image: "/assets/get-assessed.webp",
    imageAlt: "A Mindspan clinician reviewing assessment results on a tablet with a patient",
  },
  {
    kicker: "Who\u2019s in the room?",
    title: "Meeting your neurologist",
    body:
      "An unhurried visit, in clinic or by video. Your neurologist goes through your history and where you are today. You\u2019ll leave with real answers.",
    cta: { label: "View our clinic locations", href: "#locations" },
    image: "/assets/meet-neuro.webp",
    imageAlt: "A Mindspan neurologist consulting with a patient and their partner",
  },
  {
    kicker: "What will we actually do?",
    title: "The latest science, pointed at you",
    body:
      "Your neurologist builds a care plan around your specific situation, not a generic protocol. Your history, your biology, your goals.",
    cta: { label: "Explore the science behind your plan", href: "/about/science" },
    image: "/assets/latest-science.webp",
    imageAlt: "A Mindspan neurologist reviewing brain imaging with a couple in clinic",
  },
  {
    kicker: "What happens next?",
    title: "Ongoing partnership",
    body:
      "Your Mindspan team stays with you by video, by phone, and in clinic. Things change; we adjust. You\u2019re not doing this alone.",
    image: "/assets/ongoing-partnership.webp",
    imageAlt: "A patient on a video visit with their Mindspan care team",
  },
];
