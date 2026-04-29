export type LocationKind = "clinic" | "video";

export type Location = {
  slug: string;
  city: string;
  state: string;
  href: string;
  bbox: string;
  marker: string;
  kind: LocationKind;
};

export const locationsIntro = {
  eyebrow: "Where we see patients",
  title: "Visit a clinic, or see your provider on video.",
  lead:
    "Clinics in Massachusetts and California, plus video visits anywhere in those two states.",
} as const;

export const locations: Location[] = [
  {
    slug: "danvers",
    city: "Danvers",
    state: "Massachusetts",
    href: "/locations/danvers",
    bbox: "-70.97,42.555,-70.89,42.595",
    marker: "42.575,-70.933",
    kind: "clinic",
  },
  {
    slug: "video-ma",
    city: "Video visits",
    state: "Massachusetts",
    href: "/locations/video-ma",
    bbox: "-73.51,41.24,-69.93,42.89",
    marker: "42.36,-71.06",
    kind: "video",
  },
  {
    slug: "irvine",
    city: "Irvine",
    state: "California",
    href: "/locations/irvine",
    bbox: "-117.87,33.65,-117.76,33.72",
    marker: "33.684,-117.827",
    kind: "clinic",
  },
  {
    slug: "bay-area",
    city: "Bay Area",
    state: "California",
    href: "/locations/bay-area",
    bbox: "-122.52,37.70,-122.35,37.82",
    marker: "37.775,-122.418",
    kind: "clinic",
  },
  {
    slug: "video-ca",
    city: "Video visits",
    state: "California",
    href: "/book-a-visit",
    bbox: "-124.41,32.53,-114.13,42.01",
    marker: "37.0,-119.4",
    kind: "video",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
