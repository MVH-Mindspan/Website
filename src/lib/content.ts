// Mindspan homepage content.
// Source of truth: Mindspan Content & PR Posture Guide (Apr 2026).
// Key rules:
//  - Clinical-grade cognitive care. We are neurologists. We bill insurance. In clinic or virtual.
//  - Remove helplessness. Back it up with clinical reality.
//  - Never: "more study is required", "consult your doctor", "results may vary".
//  - Primary CTA everywhere: Schedule a consultation.

export const brand = {
  headline: "Advances in cognitive health are here.",
  headlineEmphasis: "Mindspan makes it personal and accessible today.",
  subTagline: "Bringing tomorrow\u2019s neurology to today\u2019s appointment.",
  reassurance: "Neurologists. In-person clinics and virtual care. We bill insurance.",
  primaryCta: "Schedule a consultation",
  primaryCtaHref: "https://assessment.mindspan.co/",
};

export const nav = [
  { label: "How it works", href: "/about/how-it-works" },
  { label: "Digital Twin", href: "#digital-twin" },
  { label: "For families", href: "/family" },
  { label: "For providers", href: "/providers" },
  { label: "Locations", href: "#locations" },
];

// The Four Proof Point Pillars — use verbatim framing.
export const pillars = [
  {
    kicker: "Speed / Urgency",
    title: "Care at the speed of need",
    body:
      "When every week matters, we move. See a neurologist fast \u2014 because in cognitive health, early action changes what\u2019s possible.",
  },
  {
    kicker: "Holistic Care",
    title: "One system for your whole ecosystem",
    body:
      "Patient, caregiver, and PCP on the same page. Coordinated care that doesn\u2019t leave anyone navigating this alone.",
  },
  {
    kicker: "Access to Innovation",
    title: "Tomorrow\u2019s neurology, today",
    body:
      "The latest science, diagnostics, and therapeutics \u2014 translated into an actionable plan for your specific biology and history.",
  },
  {
    kicker: "Humanity",
    title: "Built for the individual, not the diagnosis",
    body:
      "Personalized care with dignity. We treat you as a person with a life \u2014 not a chart with a disease.",
  },
];

export const howItWorks = [
  {
    title: "Start with a consultation",
    body:
      "A 30-minute virtual conversation with our care team. No waitlists, no gatekeeping \u2014 just a clear first step. We bill insurance.",
  },
  {
    title: "Comprehensive assessment",
    body:
      "Meet with a Mindspan neurologist in clinic or virtually. We integrate your medical history, labs, imaging, and cognitive testing into one clinical picture.",
  },
  {
    title: "Your Cognitive Digital Twin",
    body:
      "We build a personalized model of your brain health and use it to project which interventions are most likely to help \u2014 specific to you.",
  },
  {
    title: "A plan, then partnership",
    body:
      "A care plan built around your life. Your Mindspan team adjusts it continuously as your twin updates and new science lands.",
  },
];

export const locations = [
  { city: "Danvers", state: "Massachusetts", href: "/locations/danvers" },
  { city: "Telehealth", state: "Massachusetts", href: "/locations/telehealth-ma" },
  { city: "Irvine", state: "California", href: "/locations/irvine" },
  { city: "Bay Area", state: "California", href: "/locations/bay-area" },
];

// Audience split — uses the approved primary messages from the posture guide.
export const audiences = [
  {
    kicker: "For families & caregivers",
    title: "The science and care your loved one deserves.",
    body:
      "Supporting a loved one through cognitive change is exhausting \u2014 and the system rarely meets you halfway. We do. Clear answers. A real plan. A team that stays with you.",
    cta: "Schedule a consultation",
    href: "https://assessment.mindspan.co/",
  },
  {
    kicker: "For patients",
    title: "Make your cognitive care a priority.",
    body:
      "You want clarity, not to be brushed off. A personalized plan, not a diagnosis with no next step. We see you as a person first \u2014 and we move fast.",
    cta: "Schedule a consultation",
    href: "https://assessment.mindspan.co/",
  },
  {
    kicker: "For primary care physicians",
    title: "Cognitive longevity, made actionable.",
    body:
      "Immediate access to leading neurologists. AI-enabled care. Clean feedback loops back into your practice. Better outcomes for your patients, less load on you.",
    cta: "Explore the referral pathway",
    href: "/providers",
  },
];

export const digitalTwinBullets = [
  "Integrates medical history, EHR, labs, imaging, genetics, and cognitive assessments",
  "Built on hundreds of thousands of real patient records and peer-reviewed science",
  "Projects which interventions are most likely to help \u2014 for this patient, by how much",
  "Updates continuously as new clinical data and research emerge",
];
