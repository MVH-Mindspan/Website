export type JourneyStage = {
  kicker: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
  image?: string;
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
      "Start with a short online screening from home \u2014 no account, no cost, no clinic visit. You\u2019ll get clear feedback on whether a neurologist visit makes sense.",
    cta: { label: "Start a free assessment", href: "/book-a-visit" },
    image: "/assets/get-assessed.png",
  },
  {
    kicker: "Who\u2019s in the room?",
    title: "Meeting your neurologist",
    body:
      "An unhurried visit \u2014 in clinic or by video. Your neurologist goes through your history and where you are today. You\u2019ll leave with real answers.",
    cta: { label: "View our clinic locations", href: "#locations" },
    image: "/assets/meet-neuro.png",
  },
  {
    kicker: "What will we actually do?",
    title: "The latest science, pointed at you",
    body:
      "Your neurologist builds a care plan around your specific situation \u2014 not a generic protocol. Your history, your biology, your goals.",
    cta: { label: "See how we personalize your plan", href: "#technology" },
    image: "/assets/latest-science.png",
  },
  {
    kicker: "What happens next?",
    title: "Ongoing partnership",
    body:
      "Your Mindspan team stays with you by video, by phone, and in clinic. Things change; we adjust. You\u2019re not doing this alone.",
    image: "/assets/ongoing-partnership.png",
  },
];
