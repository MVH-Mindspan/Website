import { buildMetadata } from "@/lib/seo";
import { locations, type Location } from "../locations";
import type { TechCard } from "../technology";
import type { JourneyStage } from "../journey";
import type { Audience } from "../audiences";
import type { Protocol } from "../protocols";
import { bayAreaDetail } from "../locations/bay-area";
import { danversDetail } from "../locations/danvers";
import { irvineDetail } from "../locations/irvine";
import { videoMassachusettsDetail } from "../locations/video-ma";
import { videoCaliforniaDetail } from "../locations/video-ca";

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

export type CareTeamMember = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  specialties: readonly string[];
  cta: { label: string; href: string };
  profileHref?: string;
};

export type ClinicPromotion = {
  city: string;
  state: string;
  address: string;
  image: string;
  imageAlt: string;
  blurb: string;
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
  howItWorks?: {
    intro: { eyebrow: string; title: string; lead: string };
    cards: readonly TechCard[];
  };
  careTeam?: {
    intro: { eyebrow: string; title: string; lead: string };
    providers: readonly CareTeamMember[];
  };
  inPersonClinics?: {
    intro: { eyebrow: string; title: string; lead: string };
    clinics: readonly ClinicPromotion[];
  };
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
  danvers: danversDetail,
  "video-ma": videoMassachusettsDetail,
  irvine: irvineDetail,
  "bay-area": bayAreaDetail,
  "video-ca": videoCaliforniaDetail,
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
