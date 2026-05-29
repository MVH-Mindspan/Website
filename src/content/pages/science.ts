import { buildMetadata } from "@/lib/seo";
import { VIDEO_VISITS_ENABLED } from "@/lib/flags";
import type { JourneyStage } from "../journey";
import type { TechCard } from "../technology";
import type { Stat } from "../stats";

const ASSESSMENT_HREF = "https://assessment.mindspan.co/";
const BOOKING_HREF = "/book-a-visit";

const technologyCards: TechCard[] = [
  {
    id: "mindy",
    eyebrow: "Mindy, your assessment guide",
    title: "Step-by-step screening, from home or in clinic.",
    body:
      "Mindy walks you through the Montreal Cognitive Assessment (a 10-minute cognitive screening), the Memory Impairment Screen (a brief memory check), the Functional Assessment Staging Tool (a snapshot of daily functioning), and intake at your own pace, then sends a structured summary to your care team. The same assessments your neurologist would administer, ready before your visit so the time together can focus on you.",
    icon: "chat",
  },
  {
    id: "digital-twin",
    eyebrow: "The Digital Twin",
    title: "Twenty years of research, applied to your specific story.",
    body:
      "Your history, labs, imaging, biomarkers, genetics, and cognitive testing come together in one living model, trained on more than seventy thousand cognitive care patients and two decades of studies. Every recommendation comes with a why, and your privacy is built in.",
    icon: "brain",
  },
  {
    id: "orchestration",
    eyebrow: "The orchestration engine",
    title: "Nothing falls through the cracks between visits.",
    body:
      "Your care team quietly tracks every safety check, scan, follow-up, and medication decision. If a scan is due before your next appointment, it is already scheduled. You focus on your health, we handle the choreography.",
    icon: "grid",
  },
  {
    id: "cortex",
    eyebrow: "Cortex, the clinical co-pilot",
    title: "Plain-language guidance, on demand, between visits.",
    body:
      "Cortex translates clinical complexity into the answers caregivers actually need, pulling from your plan, your assessments, and the Digital Twin. If something needs real attention, it pages your clinical team directly.",
    icon: "bullseye",
  },
];

const technologyIntro = {
  eyebrow: "How we deliver it",
  title: "The technology that powers every Mindspan visit.",
  lead:
    "Four quiet investments make sure your care is faster, more accurate, and more personal. You will never have to learn how any of this works. Your team uses it so your experience feels unhurried and your plan stays current with the people doing the research.",
};

const mindyVideo = {
  id: "mindy-video",
  eyebrow: "See Mindy in action",
  title: "Your first hello at Mindspan, on your terms.",
  body:
    "Mindy is the calmest part of starting care. She walks you through validated cognitive testing at your own pace, asks the questions a great clinician would ask, and quietly hands her work off to your neurologist before your visit. The time you spend with us stays focused on you, not on filling out forms.",
  youtubeId: "_e8psq9FPVY",
  posterAlt: "A short film introducing Mindy, the Mindspan cognitive assessment guide",
  primary: { label: "Start a free assessment today", href: ASSESSMENT_HREF },
};

const outcomePillars: JourneyStage[] = [
  {
    kicker: "Faster answers",
    title: "Confirmed answers in weeks, not months.",
    body:
      "Your at-home screening with Mindy, paired with our blood biomarker panel, can confirm what is going on without waiting on a PET scan or a twelve-month specialist queue. Most families have a real picture in weeks. Less anxiety, more time to act.",
    image: "/assets/latest-science.webp",
    imageAlt:
      "A Mindspan neurologist reviewing brain imaging with a couple in clinic",
  },
  {
    kicker: "Personalized treatment",
    title: "Treatment that fits your biology.",
    body:
      "APOE genetic testing, biological staging, and the Digital Twin’s trajectory model show your neurologist exactly where you are and where you are heading. Anti-amyloid therapy decisions, lifestyle plans, and risk monitoring are made with your specific picture in view, not a generic protocol.",
    image: "/assets/digital-brain.webp",
    imageAlt: "Advanced brain imaging used in personalized cognitive care",
  },
  {
    kicker: "Continuous care",
    title: "A team that does not lose the thread.",
    body:
      "Between visits, the orchestration engine tracks every required check, every scan, every medication decision. Cortex answers the questions caregivers actually have, and pages your clinician when something needs real attention. Your primary care doctor stays in the loop, and no one in your family is left alone with this.",
    image: "/assets/ongoing-partnership.webp",
    imageAlt: VIDEO_VISITS_ENABLED
      ? "A patient on a video visit with their Mindspan care team"
      : "A patient with their Mindspan care team",
  },
];

const outcomePillarsIntro = {
  eyebrow: "What this means for you",
  title: "Where clinical care and technology meet, in your life.",
  lead:
    "Protocols and platforms only matter if they change how care actually feels. Here is how the science shows up in three of the moments that matter most.",
};

const proofStats: Stat[] = [
  { value: "2 to 3 weeks", valueShort: "2 to 3 wks", label: "Average time to a Mindspan neurologist" },
  { value: "12 months", valueShort: "12 mo", label: "Typical specialist wait elsewhere" },
  {
    value: "70,000+",
    label: "Cognitive care patients informing our Digital Twin",
  },
  { value: "20 years", valueShort: "20 yrs", label: "Of cognitive research in every plan" },
];

export const sciencePage = {
  metadata: buildMetadata({
    title: "Diagnostics, Science & Technology | Mindspan",
    description:
      "The clinical protocols, AI, and diagnostics that make Mindspan care faster, more precise, and more personal. Built around you, every visit.",
    canonical: "/about/science",
  }),
  hero: {
    video: "/assets/science-hero-video-v2.mp4",
    poster: "/assets/science-hero-poster-v2.webp",
    playbackRate: 0.9,
    headline: "The science behind every visit, pointed at you.",
    subTagline: "Built around you, every visit.",
    subhead:
      "Two investments shape how we care for you: the clinical protocols every Mindspan patient receives, and the technology that delivers them faster, safer, and more personal than anywhere else.",
    cta: { label: "Start a free assessment today", href: ASSESSMENT_HREF },
  },
  technologyIntro,
  technologyCards,
  mindyVideo,
  outcomePillarsIntro,
  outcomePillars,
  proofStats,
  finalCta: {
    eyebrow: "When you are ready",
    title: "See a specialist in weeks, not months or years.",
    lead:
      "Early answers mean better outcomes, and more time with the people who matter most.",
    primary: { label: "Start a free assessment today", href: ASSESSMENT_HREF },
    secondary: { label: "Talk to our care team", href: BOOKING_HREF },
    signature: "With care, the Mindspan team",
  },
} as const;
