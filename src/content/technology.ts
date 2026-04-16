export type TechCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: "brain" | "grid" | "chat" | "bullseye" | "shield";
};

export const technologyIntro = {
  eyebrow: "The technology behind your care",
  title: "Three quiet systems that make all of this possible.",
  lead:
    "You will never have to learn how any of this works. Your neurologist uses it so your experience with us feels unhurried, personal, and safe.",
} as const;

export const technology: TechCard[] = [
  {
    id: "digital-twin",
    eyebrow: "Cognitive Digital Twin",
    title: "A model of your brain, built from your own data.",
    body:
      "We bring together your history, labs, imaging, biomarkers, genetics, and cognitive testing into a personalized model of your brain health. Your neurologist uses it to show you where you are biologically, where you might be heading, and which changes could actually shift that trajectory for you.",
    icon: "brain",
  },
  {
    id: "orchestration",
    eyebrow: "Care Orchestration Engine",
    title: "Nothing falls through the cracks.",
    body:
      "Our operational brain quietly tracks every safety checkpoint, every required MRI, every follow-up, every medication decision. If a scan is due before your next infusion, it is already scheduled. Protocol without memorization. Safety without gaps.",
    icon: "grid",
  },
  {
    id: "mindy",
    eyebrow: "Mindy, your care companion",
    title: "A familiar voice between visits.",
    body:
      "Mindy is our AI care companion for the weeks and months between appointments. She helps track symptoms, keeps you on track with your plan, answers common questions, and pages your clinical team when something needs real attention.",
    icon: "chat",
  },
];
