import type { LocationDetail } from "../pages/locationDetail";

const BOOKING_HREF = "https://hipaa.jotform.com/form/252121360919856";
const EXISTING_HREF = "https://oncehub.com/mindspan_danvers";

export const danversDetail: LocationDetail = {
  hero: {
    eyebrow: "Danvers, Massachusetts",
    title:
      "Alzheimer’s & dementia care on Boston’s North Shore. Act early. Preserve what matters most.",
    lead:
      "Our Danvers clinic offers specialized memory care that goes beyond standard neurology, from early MCI detection to advanced Alzheimer’s treatments and clinical trials. Skip the typical 18+ month wait to see a neurologist.",
    location: "99 Conifer Hill Drive · Danvers, MA 01923",
    availability: {
      text: "Appointments available this month",
      cta: { label: "Book now", href: BOOKING_HREF },
    },
    image: "/assets/bay-area-clinic.webp",
    imageAlt: "Mindspan Danvers clinic on Boston’s North Shore",
    primaryCta: { label: "Book a visit at our Danvers clinic", href: BOOKING_HREF },
  },

  services: {
    intro: {
      eyebrow: "Core services",
      title: "Core services at our Danvers clinic.",
      lead:
        "Act early to help preserve your loved one’s independence, identity, and quality of life. Our Danvers team detects early, treats comprehensively, and connects you to the latest science, all under one roof.",
    },
    cards: [
      {
        id: "early-screening",
        eyebrow: "Early screening",
        title: "Catch changes before they catch you off guard.",
        body:
          "Comprehensive cognitive assessments using biomarkers, imaging, and AI-supported tools to detect MCI and dementia before symptoms worsen.",
        icon: "brain",
      },
      {
        id: "anti-amyloid",
        eyebrow: "Anti-amyloid & trials",
        title: "The latest approved therapies, plus clinical trials.",
        body:
          "Access to FDA-approved anti-amyloid therapies and cutting-edge clinical trials at our Danvers clinic.",
        icon: "bullseye",
      },
      {
        id: "precision",
        eyebrow: "Precision neurology",
        title: "A treatment plan built from your biology.",
        body:
          "Personalized treatment plans based on advanced diagnostics, genetics, and biomarker testing, connecting you to the latest therapies, including FDA-approved treatments and clinical trials.",
        icon: "grid",
      },
      {
        id: "network",
        eyebrow: "Mindspan network",
        title: "Care coordinated across the North Shore.",
        body:
          "Seamless coordination with specialists, caregivers, and care teams throughout the North Shore and greater Boston.",
        icon: "chat",
      },
    ],
  },

  stages: {
    intro: {
      eyebrow: "Understanding the journey",
      title: "What are dementia and early memory changes?",
      lead:
        "Understanding where your loved one is on the cognitive journey is the first step toward the right care. The earlier we detect and treat, the better the chance to slow the disease and protect what matters most.",
    },
    items: [
      {
        kicker: "Stage 0",
        title: "Normal cognition",
        body:
          "No memory or thinking concerns. Regular screening helps establish a baseline for future comparison.",
        image: "/assets/get-assessed.png",
      },
      {
        kicker: "Stage 1–2",
        title: "Mild cognitive impairment (MCI)",
        body:
          "Noticeable memory lapses beyond normal aging. Often manageable, and treatable when caught early.",
        image: "/assets/consultation-2.png",
      },
      {
        kicker: "Stage 3+",
        title: "Dementia",
        body:
          "A progressive decline affecting daily function. Mindspan Danvers provides advanced therapies, ongoing clinical care, and access to the latest science for all stages.",
        image: "/assets/consultation-1.png",
      },
    ],
  },

  whyChoose: {
    intro: {
      eyebrow: "Why specialized matters",
      title: "Why choose a specialized memory center on the North Shore?",
      lead:
        "General neurologists see patients with dozens of conditions. At Mindspan Danvers, our team specializes exclusively in memory and cognitive disorders, giving you access to deeper expertise, advanced diagnostics, FDA-approved therapies, clinical trials, and a clinical care team that stays with you from first assessment through ongoing treatment.",
      image: "/assets/digital-brain.jpg",
      imageAlt:
        "Advanced brain imaging used for early-stage cognitive diagnostics at Mindspan Danvers",
    },
    core: {
      id: "subspecialty",
      eyebrow: "Subspecialty expertise",
      title: "Expertise you can’t get at a general practice.",
      body:
        "Our clinicians train specifically in early-stage Alzheimer’s, Lewy Body, vascular dementia, and frontotemporal disorders.",
      bullets: [
        "Early-stage Alzheimer’s disease",
        "Lewy Body dementia",
        "Vascular dementia",
        "Frontotemporal disorders",
      ],
      icon: "shield",
    },
    edge: {
      id: "rapid-access",
      eyebrow: "Rapid access",
      title: "No 18-month wait. Seen within weeks.",
      body:
        "Today, many patients wait months to see a specialist. By the time they are evaluated, they may already be outside the window where treatment can meaningfully slow the disease. Our Danvers clinic prioritizes rapid access so treatment can begin while it is most effective.",
      bullets: [
        "First visits typically within two to three weeks",
        "Advanced diagnostics, biomarkers, and imaging ready at the first visit",
        "AI-supported tools that surface patterns early",
      ],
      icon: "bullseye",
    },
    closing:
      "Our Danvers clinic moves quickly, using advanced diagnostics, biomarkers, imaging, and AI-supported tools, to identify disease early and start the right treatment. Act early to help preserve your loved one’s independence, identity, and quality of life.",
    cta: { label: "Book a visit at our Danvers clinic", href: BOOKING_HREF },
  },

  provider: {
    name: "Timothy R. Kelliher, MD",
    role: "Founding Neurologist",
    eyebrow: "Founding Neurologist, Mindspan Danvers",
    image: "/assets/tim-kelliher.webp",
    imageAlt: "Dr. Timothy R. Kelliher, MD, Neurologist at Mindspan Danvers",
    bio:
      "Dr. Timothy Kelliher is a board-certified neurologist on Boston’s North Shore with more than three decades of clinical experience. He completed his neurology residency at Boston City Hospital (now Boston Medical Center) and a fellowship in EMG and peripheral nerve disease at Massachusetts General Hospital. He has practiced at Beverly and Addison Gilbert Hospitals since 1997, with subspecialty interests in headache and neuropathy.",
    specialties: [
      "Memory & cognitive disorders",
      "Headache",
      "Neuropathy",
      "EMG & peripheral nerve disease",
      "General neurology",
    ],
    education: [
      "BA, Boston University (Biology, English minor)",
      "MD, Boston University Chobanian & Avedisian School of Medicine",
      "Internship, Carney Hospital (Internal Medicine)",
      "Residency, Boston City Hospital / Boston Medical Center (Neurology)",
      "Fellowship, Massachusetts General Hospital (EMG & peripheral nerve disease)",
    ],
    certifications: [
      "Board Certified in Neurology, American Board of Psychiatry and Neurology",
      "Board Eligible in Electrodiagnostic Medicine",
    ],
    affiliations: "Beverly Hospital · Addison Gilbert Hospital",
    availability: "Accepting new patients. Video visits also available.",
    cta: { label: "Book a visit with Dr. Kelliher", href: BOOKING_HREF },
  },

  contact: {
    address: "99 Conifer Hill Drive, Danvers, MA 01923",
    mapEmbedSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-70.955,42.565,-70.915,42.585&layer=mapnik&marker=42.572362,-70.937862",
    phone: "(978) 850-3914",
    phoneHref: "tel:+19788503914",
    email: "PracticeManager@Mindspan.co",
    emailHref:
      "mailto:PracticeManager@Mindspan.co?subject=Mindspan%20Danvers%20patient%20enquiry",
    hours: "Monday–Friday, 9am–6pm EST",
    newPatient: { label: "Enroll and book a visit", href: BOOKING_HREF },
    existingPatient: { label: "Book a follow-up", href: EXISTING_HREF },
  },

  guide: {
    intro: {
      eyebrow: "If you have Original Medicare",
      title: "An additional benefit for families navigating dementia.",
      lead:
        "If your loved one has a dementia diagnosis and is enrolled in Original Medicare, there may be more support available to you at no additional cost, coordinated through a Medicare-supported care model called GUIDE. We handle eligibility and enrollment during onboarding; there is nothing to apply for in advance.",
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
    title: "Talk with us at our Danvers clinic today.",
    lead:
      "See a specialist in weeks, not months or years. Early diagnosis means better outcomes, and more time with the people who matter most.",
    primary: { label: "Book a visit today", href: BOOKING_HREF },
    secondary: { label: "Call (978) 850-3914", href: "tel:+19788503914" },
    signature: "With care, the Mindspan Danvers team",
  },
};
