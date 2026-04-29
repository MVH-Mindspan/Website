import type { Protocol } from "./protocols";
import type { JourneyStage } from "./journey";

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
  eyebrow: "Two ways to work with us",
  title: "Refer a patient, or come build the clinic with us.",
  lead:
    "Most clinicians find Mindspan because they have a patient who needs us. A few find us because they want to practice this kind of medicine themselves. Both doors are open.",
} as const;

export const providers: { refer: ProviderCard; join: ProviderCard } = {
  refer: {
    id: "refer",
    eyebrow: "Refer a patient",
    title: "Start a referral in under five minutes.",
    body:
      "We accept your existing referral workflow. Most offices send through Athena or fax, pick whatever already works in your office. We will take it from there.",
    bullets: [
      "Athena, Epic, fax, or secure email, we meet you where you are",
      "First visit typically within two to three weeks",
      "Structured note back in the format your office prefers",
      "Biomarkers, imaging, and APOE coordinated on our side",
      "Direct line to our neurologists for cross-coverage questions",
    ],
    primaryCta: { label: "Start a referral", href: "/providers/refer" },
    secondaryCta: { label: "Talk to our team", href: "mailto:clinicians@mindspan.co" },
    tone: "light",
  },
  join: {
    id: "join",
    eyebrow: "Join Mindspan",
    title: "Practice the medicine you trained for.",
    body:
      "We are hiring neurologists, NPs, and clinical psychologists who are tired of fifteen-minute visits and broken handoffs. Unhurried care, modern tools, and a team that respects craft.",
    bullets: [
      "Unhurried visits, structured around the patient",
      "Modern diagnostics, biomarkers, imaging, APOE, at every visit",
      "Operational support so charting does not follow you home",
      "Competitive compensation, meaningful equity, real work-life balance",
    ],
    primaryCta: { label: "See open roles", href: "/careers" },
    secondaryCta: { label: "Talk to our team", href: "mailto:clinicians@mindspan.co" },
    tone: "dark",
  },
};

export const coManagementIntro = {
  eyebrow: "How we work together",
  title: "True co-management. You stay the primary clinician.",
  lead:
    "Mindspan absorbs the dementia-specific work, assessment, biomarkers, treatment, behavioral support, GUIDE coordination. You keep the relationship and the longitudinal view. After every visit, you get a structured note back so the chart stays current and your decisions stay informed.",
} as const;

export const coManagement: { core: Protocol; edge: Protocol } = {
  core: {
    id: "we-handle",
    eyebrow: "We handle",
    title: "Dementia-specific care, end to end.",
    body:
      "From the first cognitive workup through ongoing care, we own the parts that drain primary care.",
    bullets: [
      "Cognitive workup, neuropsychological testing, and functional assessment",
      "Blood biomarkers, brain imaging, and APOE coordinated on our side",
      "Anti-amyloid eligibility, dosing, and infusion oversight",
      "Behavioral and pharmacologic management of cognitive symptoms",
      "Caregiver education, training, and 24/7 specialist access",
      "GUIDE eligibility, enrollment, and benefit coordination",
    ],
    icon: "shield",
  },
  edge: {
    id: "you-lead",
    eyebrow: "You lead",
    title: "Primary care, with a clean handoff after every visit.",
    body:
      "You remain the central clinician. We send concise, EHR-ready notes after each encounter so nothing falls between offices.",
    bullets: [
      "A one-page clinical summary after every Mindspan visit",
      "Pushed to Athena, Epic, or your preferred EHR",
      "Direct phone line to our neurologists for cross-coverage",
      "Treatment plans you can reference in real time",
      "We notify you on hospitalizations, ER visits, and care transitions",
      "Your patient hears “your doctor still leads your care”, every visit",
    ],
    icon: "bullseye",
  },
};

export const coManagementClosing =
  "We extend your team without adding to your charting. Fewer “what do we do now?” calls, more time for the patients still in your waiting room.";

export const referralPathwayIntro = {
  eyebrow: "Referral pathway",
  title: "From your referral to ongoing follow-up.",
  lead:
    "A clean handoff, a fast first visit, and structured follow-up so your office is never left wondering what happened next.",
} as const;

export const referralPathway: JourneyStage[] = [
  {
    kicker: "Step 1",
    title: "You refer.",
    body:
      "Submit through Athena, fax a referral, or send a secure note. We accept your existing referral workflow, there is no new portal to learn.",
  },
  {
    kicker: "Step 2",
    title: "We reach the patient in 48 hours.",
    body:
      "Our care team calls within two business days, schedules the first visit, and verifies insurance and GUIDE eligibility before the appointment.",
  },
  {
    kicker: "Step 3",
    title: "First visit in two to three weeks.",
    body:
      "An unhurried evaluation with a board-certified neurologist. Neuropsych, biomarkers, imaging, and APOE coordinated on our side.",
  },
  {
    kicker: "Step 4",
    title: "Plan back to your chart.",
    body:
      "A structured note arrives in your EHR within days. We follow up at thirty and ninety days, and stay the specialty contact for the patient and family.",
  },
];
