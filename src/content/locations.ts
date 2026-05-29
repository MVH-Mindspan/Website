import { VIDEO_VISITS_ENABLED } from "@/lib/flags";

export type LocationKind = "clinic" | "video";

export type Location = {
  slug: string;
  city: string;
  state: string;
  href: string;
  bbox: string;
  marker: string;
  kind: LocationKind;
  eyebrow: string;
  headline: string;
  summary: string;
  ctaLabel: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
};

export const locationsIntro = VIDEO_VISITS_ENABLED
  ? ({
      eyebrow: "Where we see patients",
      title: "Visit a clinic, or see your provider on video.",
      lead:
        "Clinics in Massachusetts and California, plus video visits anywhere in those two states.",
      note: "We're actively expanding into new markets. More locations coming soon.",
    } as const)
  : ({
      eyebrow: "Where we see patients",
      title: "Visit a clinic in Massachusetts or California.",
      lead: "Specialty memory care in Danvers and the Bay Area.",
      note: "We're actively expanding into new markets. More locations coming soon.",
    } as const);

const allLocations: Location[] = [
  {
    slug: "danvers",
    city: "Danvers",
    state: "Massachusetts",
    href: "/locations/danvers",
    bbox: "-70.97,42.555,-70.89,42.595",
    marker: "42.575,-70.933",
    kind: "clinic",
    eyebrow: "Mindspan Danvers",
    headline: "In-person care in Danvers, Massachusetts.",
    summary:
      "Specialty memory care just north of Boston. Convenient for patients across the North Shore and Greater Boston, with rapid access to advanced diagnostics and clinical trials.",
    ctaLabel: "Visit our Danvers clinic",
    image: "/assets/danvers-clinic.webp",
    imageAlt: "Mindspan Danvers clinic on Boston’s North Shore",
  },
  {
    slug: "video-ma",
    city: "Video visits",
    state: "Massachusetts",
    href: "/locations/video-ma",
    bbox: "-73.51,41.24,-69.93,42.89",
    marker: "42.36,-71.06",
    kind: "video",
    eyebrow: "Mindspan video visits",
    headline: "Video visits anywhere in Massachusetts.",
    summary:
      "See a Mindspan neurologist by video from anywhere in Massachusetts. Same specialists, same diagnostic plan — without the drive.",
    ctaLabel: "Book a video visit",
  },
  {
    slug: "bay-area",
    city: "Bay Area",
    state: "California",
    href: "/locations/bay-area",
    bbox: "-122.52,37.70,-122.35,37.82",
    marker: "37.775,-122.418",
    kind: "clinic",
    eyebrow: "Mindspan Bay Area",
    headline: "In-person care in Bay Area, California.",
    summary:
      "Specialty memory care in San Jose. Convenient for patients across the South Bay, Peninsula, and East Bay, with rapid access to advanced diagnostics and clinical trials.",
    ctaLabel: "Visit our Bay Area clinic",
    image: "/assets/bay-area-clinic.webp",
    imageAlt: "Mindspan Bay Area clinic exterior in San Jose, California",
  },
  {
    slug: "video-ca",
    city: "Video visits",
    state: "California",
    href: "/locations/video-ca",
    bbox: "-124.41,32.53,-114.13,42.01",
    marker: "37.0,-119.4",
    kind: "video",
    eyebrow: "Mindspan video visits",
    headline: "Video visits anywhere in California.",
    summary:
      "See a Mindspan neurologist by video from anywhere in California. Same specialists, same diagnostic plan — without the drive.",
    ctaLabel: "Book a video visit",
  },
];

export const locations: Location[] = VIDEO_VISITS_ENABLED
  ? allLocations
  : allLocations.filter((l) => l.kind !== "video");

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
