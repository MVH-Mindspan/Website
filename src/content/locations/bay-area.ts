import type { LocationDetail } from "../pages/locationDetail";

const BOOKING_HREF = "https://hipaa.jotform.com/form/252121360919856";
const EXISTING_HREF = "https://oncehub.com/mindspan_danvers";

export const bayAreaDetail: LocationDetail = {
  hero: {
    eyebrow: "San Jose / Bay Area, California",
    title:
      "Alzheimer\u2019s & dementia care in the San Jose / Bay Area. Act early. Preserve what matters most.",
    lead:
      "Alzheimer\u2019s care reimagined. At Mindspan, we are a new kind of cognitive care organization, focused exclusively on providing the highest quality care for patients with Alzheimer\u2019s disease and dementia. We offer the latest in treatments and diagnostics, participation in clinical trials, all to keep us at the forefront of diagnosis and therapeutics for our patients.",
    location: "2520 Samaritan Dr, Suite 201B \u00b7 San Jose, CA 95124",
    availability: {
      text: "Appointments available this month",
      cta: { label: "Book now", href: BOOKING_HREF },
    },
    image: "/assets/bay-area-clinic.webp",
    imageAlt: "Mindspan Bay Area clinic exterior in San Jose, California",
    primaryCta: { label: "Book a visit at our Bay Area clinic", href: BOOKING_HREF },
  },

  services: {
    intro: {
      eyebrow: "Core services",
      title: "Core services at our Bay Area clinic.",
      lead:
        "Act early to help preserve your loved one\u2019s independence, identity, and quality of life. Our Bay Area team detects early, treats comprehensively, and connects you to the latest science, all under one roof.",
    },
    cards: [
      {
        id: "early-screening",
        eyebrow: "Early screening",
        title: "Catch changes before they catch you off guard.",
        body:
          "Comprehensive cognitive assessments using biomarkers, imaging, and AI-supported tools to detect early memory changes and dementia before symptoms worsen.",
        icon: "brain",
      },
      {
        id: "anti-amyloid",
        eyebrow: "Anti-amyloid & trials",
        title: "The latest approved therapies, plus clinical trials.",
        body:
          "Access to FDA-approved anti-amyloid therapies and cutting-edge clinical trials at our Bay Area clinic.",
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
        title: "Care coordinated across the Bay Area.",
        body:
          "Seamless coordination with specialists, caregivers, and care teams throughout the Bay Area.",
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
        kicker: "Stage 1\u20132",
        title: "Early memory changes",
        body:
          "Noticeable changes in memory or thinking that go beyond what\u2019s typical. Often manageable, and treatable when caught early.",
        image: "/assets/consultation-2.png",
      },
      {
        kicker: "Stage 3+",
        title: "Dementia",
        body:
          "A progressive decline affecting daily function. Mindspan Bay Area provides advanced therapies, ongoing clinical care, and access to the latest science for all stages.",
        image: "/assets/consultation-1.png",
      },
    ],
  },

  whyChoose: {
    intro: {
      eyebrow: "Why specialized matters",
      title: "Why choose a specialized memory center in the Bay Area?",
      lead:
        "General neurologists see patients with dozens of conditions. At Mindspan Bay Area, our team specializes exclusively in memory and cognitive disorders, giving you access to advanced diagnostics, FDA-approved therapies, clinical trials, and a clinical care team that stays with you from first assessment through ongoing treatment.",
      image: "/assets/digital-brain.jpg",
      imageAlt:
        "Advanced brain imaging used for early-stage cognitive diagnostics at Mindspan Bay Area",
    },
    core: {
      id: "subspecialty",
      eyebrow: "Subspecialty expertise",
      title: "Expertise you can\u2019t get at a general practice.",
      body:
        "Our clinicians train specifically in early-stage Alzheimer\u2019s, Lewy Body, vascular dementia, and frontotemporal disorders.",
      bullets: [
        "Early-stage Alzheimer\u2019s disease",
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
        "Today, many patients wait months to see a specialist. By the time they are evaluated, they may already be outside the window where treatment can meaningfully slow the disease. Our Bay Area clinic prioritizes rapid access so treatment can begin while it is most effective.",
      bullets: [
        "First visits typically within two to three weeks",
        "Advanced diagnostics, biomarkers, and imaging ready at the first visit",
        "AI-supported tools that surface patterns early",
      ],
      icon: "bullseye",
    },
    closing:
      "Our Bay Area clinic moves quickly, using advanced diagnostics, biomarkers, imaging, and AI-supported tools, to identify disease early and start the right treatment. Act early to help preserve your loved one\u2019s independence, identity, and quality of life.",
    cta: { label: "Book a visit at our Bay Area clinic", href: BOOKING_HREF },
  },

  provider: {
    name: "Noor Sachdev, MD",
    role: "Lead Neurologist",
    eyebrow: "Neurologist, Mindspan Bay Area",
    image: "/assets/noor-sachdev.webp",
    imageAlt: "Dr. Noor Sachdev, MD, Lead Neurologist at Mindspan Bay Area",
    bio:
      "Dr. Noor Sachdev is a board-certified neurologist in San Jose, California, with expertise in Alzheimer\u2019s disease and dementia. He is at the forefront of cutting-edge diagnostics and therapeutics, participating in multiple clinical trials and collaborating with cognitive clinics at Stanford, UCSF, ALZ-NET and Sutter Health.",
    specialties: [
      "Alzheimer\u2019s disease",
      "Parkinson\u2019s disease",
      "Stroke & vascular neurology",
      "Multiple sclerosis",
      "Migraine & epilepsy",
      "Neuromuscular disorders",
    ],
    education: [
      "MD, University of Southern California School of Medicine",
      "Residency, Baylor College of Medicine (Neurology)",
      "Fellowship, Columbia University (Clinical Neurophysiology)",
    ],
    certifications: [
      "Board Certified in Neurology",
      "Board Certified in Vascular Neurology",
    ],
    affiliations: "Good Samaritan Hospital, San Jose, El Camino Health",
    availability: "Accepting new patients. Video visits also available.",
    cta: { label: "Book a visit with Dr. Sachdev", href: BOOKING_HREF },
  },

  contact: {
    address: "2520 Samaritan Dr, Suite 201B, San Jose, CA 95124",
    mapEmbedSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-121.96,37.23,-121.92,37.27&layer=mapnik&marker=37.250619,-121.942763",
    phone: "(669) 291-2202",
    phoneHref: "tel:+16692912202",
    email: "SanJose@Mindspan.co",
    emailHref:
      "mailto:SanJose@Mindspan.co?subject=Mindspan%20Bay%20Area%20patient%20enquiry",
    hours: "Monday\u2013Friday, 9am\u20135pm PST",
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
        "A dementia diagnosis (Alzheimer\u2019s, Lewy Body, vascular, or other)",
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
    title: "Talk with us at our San Jose / Bay Area clinic today.",
    lead:
      "See a specialist in weeks, not months or years. Early diagnosis means better outcomes, and more time with the people who matter most.",
    primary: { label: "Book a visit today", href: BOOKING_HREF },
    secondary: { label: "Call (669) 291-2202", href: "tel:+16692912202" },
    signature: "With care, the Mindspan Bay Area team",
  },
};
