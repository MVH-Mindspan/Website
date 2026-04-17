import { buildMetadata } from "@/lib/seo";
import type { JourneyStage } from "../journey";
import type { Protocol } from "../protocols";
import type { TechCard } from "../technology";

const BOOKING_HREF = "/book-a-visit";

const stages: JourneyStage[] = [
  {
    kicker: "Assist",
    title: "Start at home, at your own pace.",
    body:
      "Our screening tools make it easy to get started in an environment where your loved one feels comfortable. You can help administer initial assessments from home, reducing stress while gathering meaningful information early.",
    image: "/assets/get-assessed.png",
  },
  {
    kicker: "Engage",
    title: "See a specialist in weeks, not months.",
    body:
      "If screening shows that further evaluation would help, enrollment is simple. Mindspan sees your loved one within weeks, rather than the 18+ month wait most families face for specialist cognitive care.",
    image: "/assets/consultation-2.png",
  },
  {
    kicker: "Join",
    title: "A seat at the table from day one.",
    body:
      "Traditional healthcare often leaves families on the sidelines. At Mindspan, we welcome you as part of the care team from the very beginning \u2014 practical, respectful, and sustainable involvement built around your life.",
    image: "/assets/consultation-1.png",
  },
  {
    kicker: "Empower",
    title: "Stay informed, in person or remotely.",
    body:
      "Whether you attend visits in person or join remotely, you remain informed and supported at every stage. Clear updates, guidance on next steps, and ongoing access to our care team \u2014 so you can focus on your loved one without feeling lost or alone.",
    image: "/assets/ongoing-partnership.png",
  },
];

const paths: TechCard[] = [
  {
    id: "introduce",
    eyebrow: "Introduce a loved one",
    title: "We support the whole family.",
    body:
      "Caregiver resources, medication management, and ongoing access to our care team. Getting started is easy \u2014 we can enroll your loved one with your assistance right away.",
    icon: "chat",
  },
  {
    id: "proactive",
    eyebrow: "Start a proactive journey",
    title: "Act early, at no cost.",
    body:
      "Begin with our free proactive journey and bi-annual cognitive assessments. If care is ever needed, we\u2019ll guide you to the most advanced cognitive science and therapies that match your loved one\u2019s needs.",
    icon: "shield",
  },
  {
    id: "assessment",
    eyebrow: "Start an assessment today",
    title: "Simple, private, from home.",
    body:
      "Complete the quick sign-up process and begin working with our assessment tools today. No clinic visit required to find out whether specialist care would help.",
    icon: "brain",
  },
];

const assessmentModes: { inPerson: Protocol; remote: Protocol } = {
  inPerson: {
    id: "in-person",
    eyebrow: "In person",
    title: "Sit beside them, at home or in clinic.",
    body:
      "Many families find it easier to start the assessment in the same room \u2014 offering reassurance, reading prompts out loud, and keeping the environment calm. Our care team guides you through each step so nothing feels unfamiliar.",
    bullets: [
      "Complete the assessment at home on a tablet or laptop",
      "Or visit a Mindspan clinic for an in-person first session",
      "Caregiver-friendly prompts, built for non-clinical helpers",
      "Results reviewed by our care team and shared with you",
    ],
    icon: "shield",
  },
  remote: {
    id: "remote",
    eyebrow: "Remote",
    title: "Support them from anywhere, together.",
    body:
      "If you live far away or can\u2019t always be there in person, you can still assist. Join a video call, share encouragement in real time, and guide your loved one through the assessment without having to travel.",
    bullets: [
      "Assist over video from anywhere in the country",
      "Share instructions and encouragement in real time",
      "No travel required for you or your loved one",
      "Our care team is on call if you need help mid-assessment",
    ],
    icon: "bullseye",
  },
};

const howToStart: JourneyStage[] = [
  {
    kicker: "Step 01",
    title: "Introduce yourself",
    body:
      "Share your details, along with information about your loved one. Our team will help you administer your first online assessment and answer any questions along the way.",
    cta: { label: "Sign up", href: BOOKING_HREF },
  },
  {
    kicker: "Step 02",
    title: "Enroll",
    body:
      "Once the assessment is reviewed by our care team, we\u2019ll walk you through your loved one\u2019s results and discuss whether enrollment makes sense. We validate insurance and coordinate the first visit.",
  },
  {
    kicker: "Step 03",
    title: "Ongoing care",
    body:
      "After the first visit, Mindspan builds a personalized care plan and ongoing schedule, including follow-up visits and monitoring. We stay engaged over time to adjust care as needs evolve.",
  },
  {
    kicker: "Step 04",
    title: "Your own journey",
    body:
      "At any time, you can begin your own proactive cognitive health journey at no cost. Regular assessments help track your cognitive health, and if early intervention could help, our care team will be ready.",
  },
  {
    kicker: "Step 05",
    title: "Digital twin",
    body:
      "A personalized digital model of your loved one\u2019s brain helps our care team understand and support their cognitive health \u2014 tailoring care and strategies specifically to their needs.",
  },
];

export const assistPage = {
  metadata: buildMetadata({
    title: "Assist a Loved One | Mindspan Family Support",
    description:
      "Looking for cognitive care for a parent or loved one? Mindspan makes it easy to enroll, assist with assessments remotely, and access 24/7 caregiver support.",
    canonical: "/family/assist",
  }),

  hero: {
    video: "/assets/assist-hero-video.mp4",
    headline: "Assist a loved one to get cognitive care.",
    subTagline:
      "Fast access to specialists, advanced diagnostics, and a care team that keeps everyone connected.",
    subhead:
      "Mindspan connects your loved one to specialist cognitive care within days or weeks, not months \u2014 guiding you through every step, whether you are nearby or supporting from afar.",
  },

  intro: {
    title: "Support their journey.",
    lead:
      "Every family\u2019s situation is different, and caring for cognitive change can feel overwhelming. Mindspan offers one coordinated solution to support you and your loved one throughout their care journey.",
  },

  stages: {
    intro: {
      eyebrow: "How we walk beside you",
      title: "One coordinated solution, from first worry to ongoing care.",
      lead:
        "We understand that starting this conversation is hard. Our care team helps your loved one through each step of assessment and care, while keeping you informed \u2014 so you can stay involved emotionally, practically, and medically.",
    },
    items: stages,
  },

  paths: {
    intro: {
      eyebrow: "The future of cognitive care",
      title: "Pick the path that fits your family today.",
      lead:
        "Whether you\u2019re looking for specialist care for a loved one, a proactive baseline, or a quick private assessment from home \u2014 each path uses the same Mindspan care team and tools.",
    },
    cards: paths,
  },

  assessment: {
    intro: {
      eyebrow: "Caregiver-assisted assessment",
      title: "Start their assessment together, wherever you are.",
      lead:
        "You can begin your loved one\u2019s cognitive assessment from home or in person \u2014 and stay by their side to help them through it. Either way uses the same validated tools, reviewed by our care team within days.",
    },
    inPerson: assessmentModes.inPerson,
    remote: assessmentModes.remote,
    closing:
      "The assessment is free and takes about 30 minutes. If it indicates further evaluation would help, we\u2019ll schedule a specialist visit within weeks, not months.",
    cta: {
      label: "Start a caregiver-assisted free assessment",
      href: BOOKING_HREF,
    },
  },

  howToStart: {
    intro: {
      eyebrow: "How it works",
      title: "How to get started.",
      lead:
        "Getting started is straightforward and private. Complete a brief assessment from home, and we\u2019ll take care of coordinating specialists, next steps, and ongoing care \u2014 guiding you the whole way.",
    },
    items: howToStart,
  },

  finalCta: {
    eyebrow: "When you are ready",
    title: "See a specialist in weeks, not months or years.",
    lead:
      "Early diagnosis means better outcomes \u2014 and more time with the people who matter most.",
    primary: { label: "Introduce a loved one", href: BOOKING_HREF },
    secondary: { label: "Start a free assessment", href: BOOKING_HREF },
  },
} as const;
