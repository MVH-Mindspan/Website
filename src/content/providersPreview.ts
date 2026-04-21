export type ProviderPreview = {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const providersPreviewIntro = {
  eyebrow: "Meet your care team",
  title: "Board-certified neurologists who specialize in memory.",
  lead:
    "Every visit is with a specialist \u2014 not a triage line. You will know exactly who you are seeing before you walk in.",
} as const;

export const providersPreview: ProviderPreview[] = [
  {
    id: "kl",
    name: "Dr. Karen Li, MD",
    role: "Behavioral Neurologist",
    bio: "Fellowship-trained in cognitive disorders. Sees patients in Newton.",
    initials: "KL",
  },
  {
    id: "mw",
    name: "Dr. Marcus Weiss, MD",
    role: "Neurologist",
    bio: "Focused on early detection and longitudinal care for families.",
    initials: "MW",
  },
  {
    id: "sc",
    name: "Dr. Sofia Chen, MD, PhD",
    role: "Memory Specialist",
    bio: "Works with caregivers alongside patients. Sees patients by video and in Palo Alto.",
    initials: "SC",
  },
];
