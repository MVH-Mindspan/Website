export type TechCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: "brain" | "grid" | "chat" | "bullseye" | "shield";
};

export const technologyIntro = {
  eyebrow: "How we build your care plan",
  title: "Your care is personal because we treat it that way.",
  lead:
    "You will never have to learn how any of this works. Your neurologist uses it so your experience with us feels unhurried, personal, and safe.",
} as const;

export const technology: TechCard[] = [
  {
    id: "digital-twin",
    eyebrow: "Your complete brain health picture",
    title: "A care plan built around you, not a template.",
    body:
      "We bring together your history, labs, imaging, biomarkers, genetics, and cognitive testing into one unified picture of your brain health. Your neurologist uses it to show you where you are, where you might be heading, and which changes could actually shift that trajectory.",
    icon: "brain",
  },
  {
    id: "orchestration",
    eyebrow: "Coordinated care",
    title: "Nothing falls through the cracks.",
    body:
      "Our care team quietly tracks every safety checkpoint, every required MRI, every follow-up, every medication decision. If a scan is due before your next visit, it is already scheduled. You focus on your health — we handle the coordination.",
    icon: "grid",
  },
  {
    id: "mindy",
    eyebrow: "Mindy, your care companion",
    title: "A familiar voice between visits.",
    body:
      "Mindy helps you track symptoms, stay on track with your plan, and get answers to common questions between appointments. If something needs real attention, she pages your clinical team directly.",
    icon: "chat",
  },
];
