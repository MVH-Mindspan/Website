import type { LocationDetail } from "../pages/locationDetail";

const BOOKING_HREF = "https://hipaa.jotform.com/form/252121360919856";

export const videoCaliforniaDetail: LocationDetail = {
  hero: {
    eyebrow: "Video visits, California",
    title: "See your neurologist from home, anywhere in California.",
    lead:
      "Specialty memory care, on your phone, tablet, or computer. No driving, no waiting room, no 18-month wait. The same unhurried visits we give patients in our Bay Area and Irvine clinics, from wherever you’re most comfortable in California.",
    location: "Statewide · California",
    availability: {
      text: "Video appointments available this month",
      cta: { label: "Book a video visit", href: BOOKING_HREF },
    },
    primaryCta: { label: "Book a video visit", href: BOOKING_HREF },
  },

  services: {
    intro: {
      eyebrow: "Core services",
      title: "Specialty cognitive care, delivered remotely.",
      lead:
        "Most of memory care is conversation, history-taking, and cognitive testing, all of which work beautifully on video. We coordinate the rest, labs, imaging, biomarkers, locally so you only travel when there’s a real reason to.",
    },
    cards: [
      {
        id: "early-screening",
        eyebrow: "Early screening",
        title: "Cognitive testing on video, no special setup required.",
        body:
          "Validated cognitive assessments, full history-taking, and AI-supported pattern detection, all conducted live on video with you and a family member if you’d like.",
        icon: "brain",
      },
      {
        id: "anti-amyloid",
        eyebrow: "Anti-amyloid & trials",
        title: "The latest approved therapies, coordinated for you.",
        body:
          "We evaluate eligibility, coordinate infusions and required MRIs at a partner site near you, and continue your follow-up appointments by video.",
        icon: "bullseye",
      },
      {
        id: "precision",
        eyebrow: "Precision neurology",
        title: "Local labs, biomarkers, and imaging when you need them.",
        body:
          "We order labs, biomarker panels, and imaging at convenient nearby sites in California. Results come back to your Mindspan team and we walk you through them on video.",
        icon: "grid",
      },
      {
        id: "network",
        eyebrow: "Mindspan network",
        title: "Care coordinated across the state.",
        body:
          "Your Mindspan care team coordinates with your primary care, local specialists, and family caregivers, statewide, between every visit.",
        icon: "chat",
      },
    ],
  },

  stages: {
    intro: {
      eyebrow: "Understanding the journey",
      title: "What are dementia and early memory changes?",
      lead:
        "Understanding where your loved one is on the cognitive journey is the first step toward the right care. The earlier we detect and treat, the better the chance to slow the disease and protect what matters most. Every stage is well-suited to video care.",
    },
    items: [
      {
        kicker: "Stage 0",
        title: "Normal cognition",
        body:
          "No memory or thinking concerns. A baseline video visit makes future comparison straightforward.",
        image: "/assets/get-assessed.png",
      },
      {
        kicker: "Stage 1–2",
        title: "Mild cognitive impairment (MCI)",
        body:
          "Noticeable memory lapses beyond normal aging. Often manageable, and treatable when caught early. Video makes it easier to involve a spouse or adult child in the visit.",
        image: "/assets/consultation-2.png",
      },
      {
        kicker: "Stage 3+",
        title: "Dementia",
        body:
          "A progressive decline affecting daily function. Video visits reduce the burden of getting to and from the clinic, while still giving you full access to advanced therapies and ongoing clinical care.",
        image: "/assets/consultation-1.png",
      },
    ],
  },

  whyChoose: {
    intro: {
      eyebrow: "Why specialized matters",
      title: "Why choose a specialized memory center for video care?",
      lead:
        "General telehealth services see patients with dozens of conditions. At Mindspan, our team specializes exclusively in memory and cognitive disorders, giving you access to deeper expertise, advanced diagnostics, FDA-approved therapies, clinical trials, and a clinical care team that stays with you from first assessment through ongoing treatment.",
      image: "/assets/digital-brain.jpg",
      imageAlt:
        "Advanced brain imaging used for early-stage cognitive diagnostics at Mindspan",
    },
    core: {
      id: "subspecialty",
      eyebrow: "Subspecialty expertise",
      title: "The same expertise, on screen.",
      body:
        "Our clinicians train specifically in early-stage Alzheimer’s, Lewy Body, vascular dementia, and frontotemporal disorders. The visit format changes; the standard of care does not.",
      bullets: [
        "Early-stage Alzheimer’s disease",
        "Lewy Body dementia",
        "Vascular dementia",
        "Frontotemporal disorders",
      ],
      icon: "shield",
    },
    edge: {
      id: "anywhere-ca",
      eyebrow: "Anywhere in California",
      title: "From the Bay to the border, no driving required.",
      body:
        "If you live anywhere in California, we can see you. That includes patients in the Bay Area, Sacramento and the Central Valley, the Central Coast, Greater Los Angeles, the Inland Empire, Orange County, and San Diego.",
      bullets: [
        "First visits typically within two to three weeks",
        "Family members can join from anywhere",
        "Avoid traffic and long drives across the state",
      ],
      icon: "bullseye",
    },
    closing:
      "We move quickly, using advanced diagnostics, biomarkers, imaging, and AI-supported tools, to identify disease early and start the right treatment. Act early to help preserve your loved one’s independence, identity, and quality of life.",
    cta: { label: "Book a video visit", href: BOOKING_HREF },
  },

  howItWorks: {
    intro: {
      eyebrow: "How a video visit works",
      title: "Four steps. Most people are fully set up in under five minutes.",
      lead:
        "We designed the experience to be calm and frustration-free, especially for patients and caregivers who don’t consider themselves “tech people.”",
    },
    cards: [
      {
        id: "schedule",
        eyebrow: "1. Schedule",
        title: "Pick a time online, or call us.",
        body:
          "Choose a video appointment slot that works for you and any family members you’d like in the visit. We’ll send a confirmation, a quick intake form, and a secure link.",
        icon: "calendar",
      },
      {
        id: "prep",
        eyebrow: "2. Prep your space",
        title: "A quiet room and a charged device.",
        body:
          "Pick a comfortable spot with decent light and Wi-Fi. Phone, tablet, or computer all work. We’ll send a one-page checklist of what to have on hand.",
        icon: "home",
      },
      {
        id: "connect",
        eyebrow: "3. Connect",
        title: "One tap. No app to install.",
        body:
          "Tap the secure link a few minutes before your visit. Your neurologist will join on time, with your full medical record already open.",
        icon: "video",
      },
      {
        id: "continue",
        eyebrow: "4. Continue care",
        title: "Plans, prescriptions, follow-ups, all electronic.",
        body:
          "After the visit you’ll get a written care plan, any prescriptions sent to your pharmacy, and clear next steps. Between visits, message the care team anytime.",
        icon: "refresh",
      },
    ],
  },

  careTeam: {
    intro: {
      eyebrow: "Your video care team",
      title: "California patients see Bay Area and Orange County neurologists.",
      lead:
        "The same neurologists who see patients in our San Jose and Irvine clinics see California video patients. No rotating telehealth pool, no anonymous network. We’ll match you with a clinician based on availability and fit.",
    },
    providers: [
      {
        name: "Noor Sachdev, MD",
        role: "Lead Neurologist, Mindspan Bay Area",
        image: "/assets/noor-sachdev.webp",
        imageAlt: "Dr. Noor Sachdev, MD, Lead Neurologist at Mindspan Bay Area",
        specialties: [
          "Alzheimer’s disease & dementia",
          "Stroke & vascular neurology",
          "Multiple sclerosis",
          "Parkinson’s disease",
        ],
        cta: { label: "Book with Dr. Sachdev", href: BOOKING_HREF },
        profileHref: "/locations/bay-area",
      },
      {
        name: "Timothy R. Kelliher, MD",
        role: "Founding Neurologist, Mindspan",
        image: "/assets/tim-kelliher.webp",
        imageAlt: "Dr. Timothy R. Kelliher, MD, Founding Neurologist at Mindspan",
        specialties: [
          "Memory & cognitive disorders",
          "Headache",
          "Neuropathy",
          "EMG & peripheral nerve disease",
        ],
        cta: { label: "Book with Dr. Kelliher", href: BOOKING_HREF },
        profileHref: "/locations/irvine",
      },
    ],
  },

  inPersonClinics: {
    intro: {
      eyebrow: "Prefer to come in person?",
      title: "We have two clinics in California.",
      lead:
        "Some visits are easier in person, especially first appointments and certain assessments. If you’re closer to one of our clinics or just prefer face-to-face, both are open and accepting new patients.",
    },
    clinics: [
      {
        city: "Bay Area",
        state: "California",
        address: "2520 Samaritan Dr, Suite 201B, San Jose, CA 95124",
        image: "/assets/bay-area-clinic.webp",
        imageAlt:
          "Mindspan Bay Area clinic exterior in San Jose, California",
        blurb:
          "Specialty memory care in San Jose. Convenient for patients across the South Bay, Peninsula, and East Bay, with rapid access to advanced diagnostics and clinical trials.",
        cta: { label: "Visit our Bay Area clinic", href: "/locations/bay-area" },
      },
      {
        city: "Irvine",
        state: "California",
        address: "16100 Sand Canyon Ave, Suite 240, Irvine, CA 92618",
        image: "/assets/irvine-clinic.webp",
        imageAlt: "Mindspan Irvine clinic in Orange County, California",
        blurb:
          "Specialty memory care in Orange County. Convenient for Greater LA, Inland Empire, and San Diego patients, with the same rapid access and full diagnostic suite.",
        cta: { label: "Visit our Irvine clinic", href: "/locations/irvine" },
      },
    ],
  },

  audiences: {
    intro: {
      eyebrow: "Who we see",
      title: "Wherever you are coming from, you are in the right place.",
      lead:
        "A short note, directly to you. Every audience below is well-served by video, with full access to the same diagnostics and treatments.",
    },
    items: [
      {
        id: "families",
        kicker: "If you’re caring for a parent or spouse",
        title: "You don’t have to keep figuring this out alone.",
        body:
          "You’ve been noticing changes, making calls, and being told to wait. Bring your loved one to a video visit, you can both join from the same room, or different cities. We’ll take it from here together.",
        cta: "Book a video visit",
        href: BOOKING_HREF,
      },
      {
        id: "patients",
        kicker: "If you’ve noticed changes in yourself",
        title: "You deserve to be taken seriously.",
        body:
          "Maybe a word slipped. Maybe you walked into a room and forgot why. It might be nothing, but you deserve to know either way, and you don’t need to drive across the state to find out.",
        cta: "Start a free assessment",
        href: "https://assessment.mindspan.co/",
      },
      {
        id: "doctors",
        kicker: "If you’re a primary care physician",
        title: "A neurology partner who makes your life easier.",
        body:
          "Your patients with cognitive concerns need more time than a 15-minute visit allows. We see them quickly, by video or in person, and send clean notes back. You stay their doctor, we handle the specialty piece.",
        cta: "Learn about referrals",
        href: "/providers",
      },
    ],
  },

  guide: {
    intro: {
      eyebrow: "If you have Original Medicare",
      title: "An additional benefit for families navigating dementia.",
      lead:
        "If your loved one has a dementia diagnosis and is enrolled in Original Medicare, there may be more support available to you at no additional cost, coordinated through a Medicare-supported care model called GUIDE. We handle eligibility and enrollment during onboarding; there is nothing to apply for in advance. GUIDE works equally well for video and in-person care.",
      image: "/assets/ongoing-partnership.png",
      imageAlt:
        "A Mindspan care team supporting a family navigating dementia care together",
    },
    core: {
      id: "guide-program",
      eyebrow: "What you may be eligible for",
      title: "Concrete support for the caregiver and the patient.",
      body:
        "If you qualify, we coordinate these benefits for you as part of ongoing care, they are not a separate program you manage yourself.",
      bullets: [
        "$0 copays for covered Mindspan visits",
        "24/7 specialist-staffed access for questions and concerns",
        "Up to $2,500 per year in respite benefits for the primary caregiver",
        "A dedicated care coordinator between visits",
      ],
      icon: "shield",
    },
    edge: {
      id: "guide-qualify",
      eyebrow: "Who typically qualifies",
      title: "Three things have to be true.",
      body:
        "We confirm eligibility during onboarding. If you are not sure, just tell us and we will figure it out together.",
      bullets: [
        "A dementia diagnosis (Alzheimer’s, Lewy Body, vascular, or other)",
        "Enrolled in Original Medicare (not Medicare Advantage)",
        "A caregiver involved in day-to-day support",
        "Located in Massachusetts or California",
      ],
      icon: "bullseye",
    },
    footnote:
      "GUIDE is a CMS (Medicare) care model. Coverage and eligibility vary by region and payer. We verify benefits and walk families through what applies during onboarding.",
  },

  finalCta: {
    eyebrow: "When you are ready",
    title: "Talk with a Mindspan neurologist this month.",
    lead:
      "See a specialist in weeks, not months or years. By video from your living room, or in person at our Bay Area or Irvine clinic.",
    primary: { label: "Book a video visit", href: BOOKING_HREF },
    secondary: { label: "Visit a clinic", href: "/locations" },
    signature: "With care, the Mindspan California team",
  },
};
