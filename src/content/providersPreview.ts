export type ProviderPreview = {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  image?: string;
  imageAlt?: string;
  location?: { label: string; href: string };
};

export const providersPreviewIntro = {
  eyebrow: "Meet your care team",
  title: "Board-certified neurologists who specialize in memory.",
  lead:
    "Every visit is with a specialist, not a triage line. You will know exactly who you are seeing before you walk in.",
} as const;

export const providersPreviewClinicianIntro = {
  eyebrow: "Meet our clinicians",
  title: "Specialists who own the dementia work-up.",
  lead:
    "Board-certified neurologists with subspecialty depth in memory and cognitive care. Your patient sees the same clinician across visits, with a structured note back to your chart after every encounter.",
} as const;

export const providersPreview: ProviderPreview[] = [
  {
    id: "tk",
    name: "Dr. Timothy Kelliher, MD",
    role: "Founding Neurologist",
    bio:
      "Board-certified neurologist with EMG and peripheral nerve fellowship training at Mass General. Sees patients on Boston’s North Shore.",
    initials: "TK",
    image: "/assets/tim-kelliher.webp",
    imageAlt: "Dr. Timothy Kelliher, MD",
    location: { label: "Book a visit in Danvers", href: "/locations/danvers" },
  },
  {
    id: "nr",
    name: "Dr. Naveen Reddy, MD",
    role: "Clinical Director",
    bio:
      "Neurologist and implementation scientist focused on Alzheimer’s diagnostics and anti-amyloid therapies. Trained at UC San Diego and UCSF.",
    initials: "NR",
    image: "/assets/naveen-reddy.webp",
    imageAlt: "Dr. Naveen Reddy, MD",
  },
  {
    id: "ns",
    name: "Dr. Noor Sachdev, MD",
    role: "Lead Neurologist",
    bio:
      "Board-certified in neurology and vascular neurology. Columbia-trained in clinical neurophysiology. Sees patients in San Jose.",
    initials: "NS",
    image: "/assets/noor-sachdev.webp",
    imageAlt: "Dr. Noor Sachdev, MD",
    location: { label: "Book a visit in San Jose", href: "/locations/bay-area" },
  },
];
