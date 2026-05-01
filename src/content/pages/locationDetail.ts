import { buildMetadata } from "@/lib/seo";
import { locations, type Location } from "../locations";
import type { TechCard } from "../technology";
import type { JourneyStage } from "../journey";
import type { Audience } from "../audiences";
import type { Protocol } from "../protocols";
import { bayAreaDetail } from "../locations/bay-area";

const BOOKING_HREF = "https://hipaa.jotform.com/form/252121360919856";

export type ClinicContact = {
  address: string;
  mapEmbedSrc: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  hours: string;
  newPatient: { label: string; href: string };
  existingPatient: { label: string; href: string };
};

export type ProviderProfile = {
  name: string;
  role: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  bio: string;
  specialties: readonly string[];
  education: readonly string[];
  certifications: readonly string[];
  affiliations: string;
  availability: string;
  cta: { label: string; href: string };
};

export type LocationDetail = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    location?: string;
    availability?: { text: string; cta: { label: string; href: string } };
    image?: string;
    imageAlt?: string;
    primaryCta?: { label: string; href: string };
  };
  services?: {
    intro: { eyebrow: string; title: string; lead: string };
    cards: readonly TechCard[];
  };
  stages?: {
    intro: { eyebrow: string; title: string; lead: string };
    items: readonly JourneyStage[];
  };
  whyChoose?: {
    intro: {
      eyebrow: string;
      title: string;
      lead: string;
      image?: string;
      imageAlt?: string;
    };
    core: Protocol;
    edge: Protocol;
    closing?: string;
    cta?: { label: string; href: string };
  };
  provider?: ProviderProfile;
  contact?: ClinicContact;
  audiences?: {
    intro: { eyebrow: string; title: string; lead: string };
    items: readonly Audience[];
  };
  guide?: {
    intro: {
      eyebrow: string;
      title: string;
      lead: string;
      image?: string;
      imageAlt?: string;
    };
    core: Protocol;
    edge: Protocol;
    footnote?: string;
  };
  finalCta?: {
    eyebrow: string;
    title: string;
    lead: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
    signature?: string;
  };
};

const detailMap: Record<string, LocationDetail> = {
  danvers: {
    hero: {
      eyebrow: "Danvers, Massachusetts",
      title: "Cognitive care on Boston\u2019s North Shore.",
      lead:
        "Our Danvers clinic sees patients from across Essex County and greater Boston. Unhurried visits with a board-certified neurologist, billed through insurance.",
    },
    provider: {
      name: "Timothy R. Kelliher, MD",
      role: "Founding Neurologist",
      eyebrow: "Founding Neurologist, Mindspan Danvers",
      image: "/assets/tim-kelliher.webp",
      imageAlt:
        "Dr. Timothy R. Kelliher, MD, Neurologist at Mindspan Danvers",
      bio:
        "Dr. Timothy Kelliher is a board-certified neurologist on Boston\u2019s North Shore with more than three decades of clinical experience. He completed his neurology residency at Boston City Hospital (now Boston Medical Center) and a fellowship in EMG and peripheral nerve disease at Massachusetts General Hospital. He has practiced at Beverly and Addison Gilbert Hospitals since 1997, with subspecialty interests in headache and neuropathy.",
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
      affiliations: "Beverly Hospital \u00b7 Addison Gilbert Hospital",
      availability: "Accepting new patients. Video visits also available.",
      cta: { label: "Book a visit with Dr. Kelliher", href: BOOKING_HREF },
    },
  },
  "video-ma": {
    hero: {
      eyebrow: "Video visits, Massachusetts",
      title: "See your neurologist from home, anywhere in Massachusetts.",
      lead:
        "On your phone, tablet, or computer, no driving, no waiting room. Same neurologists, same unhurried visits, from wherever you're most comfortable.",
    },
  },
  irvine: {
    hero: {
      eyebrow: "Irvine, California",
      title: "Cognitive care in Orange County.",
      lead:
        "Our Irvine clinic serves Orange County and greater Los Angeles. Unhurried visits with a board-certified neurologist, billed through insurance.",
    },
  },
  "bay-area": bayAreaDetail,
};

export function getLocationPage(location: Location) {
  const detail = detailMap[location.slug];
  const title = `${location.city}, ${location.state} | Mindspan`;
  return {
    metadata: buildMetadata({
      title,
      description:
        detail?.hero.lead ??
        `Mindspan cognitive care in ${location.city}, ${location.state}.`,
      canonical: location.href,
    }),
    detail:
      detail ?? {
        hero: {
          eyebrow: `${location.city}, ${location.state}`,
          title: `Mindspan, ${location.city}`,
          lead: "Cognitive care and dementia specialists.",
        },
      },
  };
}

export function allLocationSlugs() {
  return locations.map((l) => ({ slug: l.slug }));
}
