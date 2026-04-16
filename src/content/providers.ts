export type ProviderCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  tone: "light" | "dark";
};

export const providersIntro = {
  eyebrow: "For providers",
  title: "Two ways to work with Mindspan.",
  lead:
    "Whether you are referring a patient you already care about or looking for a place to practice this kind of medicine yourself, we would love to hear from you.",
} as const;

export const providers: { refer: ProviderCard; join: ProviderCard } = {
  refer: {
    id: "refer",
    eyebrow: "Refer a patient",
    title: "Get your patient seen by a neurologist in weeks.",
    body:
      "You are already the trusted doctor. We are the specialist partner who makes that job easier. Fast access for your patient, a thoughtful assessment, and clean notes back in your chart.",
    bullets: [
      "First appointment typically within two to three weeks",
      "Integrated with Athena and most referral workflows",
      "Structured notes back to your office, in the format you prefer",
      "APOE, biomarkers, imaging coordinated on our side",
      "Your patient stays yours, we handle the cognitive specialty piece",
    ],
    primaryCta: { label: "Start a referral", href: "/providers/refer" },
    secondaryCta: { label: "Referral pathway", href: "/providers" },
    tone: "light",
  },
  join: {
    id: "join",
    eyebrow: "Join Mindspan",
    title: "Practice the medicine you wanted to when you trained.",
    body:
      "If you are a neurologist, a clinical psychologist, a nurse practitioner, or a care partner who is tired of fifteen-minute visits and broken handoffs, come talk to us.",
    bullets: [
      "Unhurried visits, structured around the patient, not the clock",
      "Real tools that make your clinical work safer and more precise",
      "A care orchestration engine that handles protocol compliance for you",
      "A team culture that respects craft and rewards seniority",
      "Competitive compensation, meaningful equity, and real work-life balance",
    ],
    primaryCta: { label: "See open roles", href: "/careers" },
    secondaryCta: { label: "Talk to our team", href: "mailto:clinicians@mindspan.co" },
    tone: "dark",
  },
};
