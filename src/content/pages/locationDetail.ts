import { buildMetadata } from "@/lib/seo";
import { locations, type Location } from "../locations";
import type { TechCard } from "../technology";
import type { JourneyStage } from "../journey";
import type { Audience } from "../audiences";
import type { Protocol } from "../protocols";
import { bayAreaDetail } from "../locations/bay-area";

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
  },
  "telehealth-ma": {
    hero: {
      eyebrow: "Telehealth \u2014 Massachusetts",
      title: "See a neurologist from anywhere in Massachusetts.",
      lead:
        "Video visits available statewide. Same neurologists, same unhurried visits, from your kitchen table.",
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
          title: `Mindspan \u2014 ${location.city}`,
          lead: "Cognitive care and dementia specialists.",
        },
      },
  };
}

export function allLocationSlugs() {
  return locations.map((l) => ({ slug: l.slug }));
}
