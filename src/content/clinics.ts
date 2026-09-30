// Clinic facts: the single source of truth for each in-person clinic's names,
// legal entity, NPI, address, phone, hours and map pin. The location pages, the
// referral page and the JSON-LD in `src/lib/schema.ts` all read from here, so a
// fact is corrected in one place. Keep display strings derived, never retyped.

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ClinicAddress = {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
};

export type OpeningHours = {
  days: readonly Weekday[];
  /** 24h "HH:MM" */
  opens: string;
  /** 24h "HH:MM" */
  closes: string;
};

export type AreaServed = { type: "City" | "Place" | "State"; name: string };

type ClinicFacts = {
  slug: string;
  pageHref: string;
  name: string;
  legalName: string;
  alternateName: readonly string[];
  npi: string;
  address: ClinicAddress;
  phone: string;
  phoneHref: string;
  email: string;
  openingHours: OpeningHours;
  /** Zone shown after the hours, e.g. "ET". */
  timeZone: string;
  geo: { lat: number; lng: number };
  areaServed: readonly AreaServed[];
  description: string;
  image: string;
  careCompareUrl?: string;
};

export type Clinic = ClinicFacts & {
  /** "99 Conifer Hill Drive, Danvers, MA 01923" */
  addressDisplay: string;
  /** "Monday–Friday, 9am–6pm ET" */
  hours: string;
  /** "Mon–Fri, 9am–6pm ET" */
  hoursShort: string;
  mapEmbedSrc: string;
  hasMapUrl: string;
};

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const suffix = h < 12 ? "am" : "pm";
  return m ? `${hour12}:${String(m).padStart(2, "0")}${suffix}` : `${hour12}${suffix}`;
}

function formatHours(hours: OpeningHours, timeZone: string, short: boolean): string {
  const day = (d: Weekday) => (short ? d.slice(0, 3) : d);
  const first = hours.days[0];
  const last = hours.days[hours.days.length - 1];
  const days = first === last ? day(first) : `${day(first)}–${day(last)}`;
  return `${days}, ${formatTime(hours.opens)}–${formatTime(hours.closes)} ${timeZone}`;
}

/** OpenStreetMap embed centred on the pin. Span is in degrees (lng, lat). */
function osmEmbedSrc(geo: ClinicFacts["geo"], span: { lng: number; lat: number }): string {
  const bbox = [
    geo.lng - span.lng / 2,
    geo.lat - span.lat / 2,
    geo.lng + span.lng / 2,
    geo.lat + span.lat / 2,
  ]
    .map((n) => n.toFixed(4))
    .join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${geo.lat},${geo.lng}`;
}

function defineClinic(facts: ClinicFacts, mapSpan: { lng: number; lat: number }): Clinic {
  const { street, locality, region, postalCode } = facts.address;
  const addressDisplay = `${street}, ${locality}, ${region} ${postalCode}`;
  return {
    ...facts,
    addressDisplay,
    hours: formatHours(facts.openingHours, facts.timeZone, false),
    hoursShort: formatHours(facts.openingHours, facts.timeZone, true),
    mapEmbedSrc: osmEmbedSrc(facts.geo, mapSpan),
    hasMapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressDisplay)}`,
  };
}

const WEEKDAYS: readonly Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const clinics = {
  danvers: defineClinic(
    {
      slug: "danvers",
      pageHref: "/locations/danvers",
      name: "Mindspan",
      legalName: "Mindspan Medical PC",
      alternateName: ["MindSpan", "Mind Span", "Mindspan Medical", "Mindspan Medical P.C."],
      npi: "1659264646",
      address: {
        street: "99 Conifer Hill Drive",
        locality: "Danvers",
        region: "MA",
        postalCode: "01923",
        country: "US",
      },
      phone: "(978) 850-3914",
      phoneHref: "tel:+19788503914",
      email: "PracticeManager@Mindspan.co",
      openingHours: { days: WEEKDAYS, opens: "09:00", closes: "18:00" },
      timeZone: "ET",
      geo: { lat: 42.5878831, lng: -70.9648492 },
      areaServed: [
        { type: "City", name: "Danvers" },
        { type: "Place", name: "North Shore" },
        { type: "Place", name: "Greater Boston" },
        { type: "State", name: "Massachusetts" },
      ],
      description:
        "Memory and dementia care in Danvers, MA, with a board-certified neurologist focused on Alzheimer’s, MCI, and dementia.",
      image: "/assets/danvers-clinic.webp",
      // Care Compare lists this group practice (PAC ID 3971099003). Owner: set
      // careCompareUrl to the direct listing once it opens in a browser:
      // https://www.medicare.gov/care-compare/details/group-practice/3971099003/?state=MA
      // Until then /medicare links to the Care Compare search page instead.
    },
    { lng: 0.04, lat: 0.02 },
  ),
  bayArea: defineClinic(
    {
      slug: "bay-area",
      pageHref: "/locations/bay-area",
      name: "Mindspan",
      legalName: "Mindspan Medical America PA",
      alternateName: ["MindSpan", "Mind Span", "Mindspan Medical America"],
      npi: "1912820614",
      address: {
        street: "2520 Samaritan Dr, Suite 201B",
        locality: "San Jose",
        region: "CA",
        postalCode: "95124",
        country: "US",
      },
      phone: "(669) 291-2202",
      phoneHref: "tel:+16692912202",
      email: "SanJose@Mindspan.co",
      openingHours: { days: WEEKDAYS, opens: "09:00", closes: "17:00" },
      timeZone: "PT",
      geo: { lat: 37.2520637, lng: -121.9505417 },
      areaServed: [
        { type: "City", name: "San Jose" },
        { type: "Place", name: "South Bay" },
        { type: "Place", name: "Peninsula" },
        { type: "Place", name: "East Bay" },
        { type: "State", name: "California" },
      ],
      description:
        "Memory and dementia care in San Jose, CA (Bay Area), with a board-certified neurologist focused on Alzheimer’s, MCI, and dementia.",
      image: "/assets/bay-area-clinic.webp",
    },
    { lng: 0.04, lat: 0.04 },
  ),
} satisfies Record<string, Clinic>;

export const clinicList: readonly Clinic[] = [clinics.danvers, clinics.bayArea];

export function getClinic(slug: string): Clinic | undefined {
  return clinicList.find((c) => c.slug === slug);
}
