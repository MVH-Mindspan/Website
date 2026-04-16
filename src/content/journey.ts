export type JourneyStage = {
  kicker: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
  image?: string;
};

export const journeyIntro = {
  title: "The cognitive care clinic of the future.",
  lead:
    "Every family\u2019s journey is different, but the shape is the same. From first worry through to ongoing care, you\u2019ll know exactly what comes next at every step.",
} as const;

export const journey: JourneyStage[] = [
  {
    kicker: "Where to start",
    title: "Get assessed",
    body:
      "A free 10-minute online assessment you can take from your kitchen table. No account, no cost, no clinic visit. Answer a few honest questions and get clear feedback on whether a neurologist visit makes sense.",
    cta: { label: "Start a free assessment", href: "/book-a-visit" },
    image: "/assets/get-assessed.png",
  },
  {
    kicker: "Who\u2019s in the room?",
    title: "Meeting your neurologist",
    body:
      "An unhurried visit, in one of our clinics or on video, where a Mindspan neurologist goes through your history, any recent tests, and where you are today. You\u2019ll leave knowing what they\u2019re seeing and why.",
    cta: { label: "View our clinic locations", href: "#locations" },
    image: "/assets/consultation-2.png",
  },
  {
    kicker: "What will we actually do?",
    title: "The latest science, pointed at you",
    body:
      "This is where Mindspan\u2019s real edge shows up. Your neurologist brings together the newest peer-reviewed findings, advanced diagnostics, and your full medical picture, then builds a plan matched to your specific biology. Not generic advice, a plan built from your data.",
    cta: { label: "See the technology behind your care", href: "#technology" },
    image: "/assets/consultation-1.png",
  },
  {
    kicker: "And then what?",
    title: "Ongoing partnership",
    body:
      "You don\u2019t get handed a prescription and sent home. Your Mindspan team stays with you. Things change; we adjust. A family member has a question; we answer it. You\u2019re not doing this alone anymore.",
    image: "/assets/ongoing-partnership.png",
  },
];
