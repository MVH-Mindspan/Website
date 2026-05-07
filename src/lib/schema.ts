import { SITE_URL } from "@/lib/seo";
import { brand } from "@/content/brand";
import type { Location } from "@/content/locations";
import type { LocationDetail, ProviderProfile } from "@/content/pages/locationDetail";
import type { FAQItem } from "@/content/faq";

type SchemaObject = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_URL = `${SITE_URL}/assets/mindspan-logo-horizontal-dark.png`;

function toE164(phoneHref: string): string {
  return phoneHref.replace(/^tel:/, "");
}

function parseGeoFromMapEmbed(src: string): { latitude: number; longitude: number } | null {
  const match = src.match(/marker=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!match) return null;
  return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
}

function parseAddressParts(address: string): {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
} | null {
  const cleaned = address.replace(/·/g, ",");
  const parts = cleaned.split(",").map((p) => p.trim());
  if (parts.length < 3) return null;
  const street = parts.slice(0, parts.length - 2).join(", ");
  const locality = parts[parts.length - 2];
  const stateZipMatch = parts[parts.length - 1].match(/^([A-Za-z]{2})\s+(\d{5}(?:-\d{4})?)$/);
  if (!stateZipMatch) return null;
  return {
    streetAddress: street,
    addressLocality: locality,
    addressRegion: stateZipMatch[1],
    postalCode: stateZipMatch[2],
  };
}

function parseHoursLine(hours: string): SchemaObject[] {
  const dayMap: Record<string, string> = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
  };
  const cleaned = hours.replace(/–/g, "-");
  const rangeMatch = cleaned.match(/^([A-Za-z]+)-([A-Za-z]+),\s+(\d{1,2})(am|pm)-(\d{1,2})(am|pm)/i);
  if (!rangeMatch) return [];
  const [, startDay, endDay, openHour, openMer, closeHour, closeMer] = rangeMatch;
  const days = Object.keys(dayMap);
  const startIdx = days.indexOf(startDay);
  const endIdx = days.indexOf(endDay);
  if (startIdx < 0 || endIdx < 0) return [];
  const dayList = days.slice(startIdx, endIdx + 1).map((d) => dayMap[d]);
  const to24h = (hour: string, mer: string) => {
    const h = parseInt(hour, 10);
    if (mer.toLowerCase() === "am") return h === 12 ? 0 : h;
    return h === 12 ? 12 : h + 12;
  };
  const opens = `${to24h(openHour, openMer).toString().padStart(2, "0")}:00`;
  const closes = `${to24h(closeHour, closeMer).toString().padStart(2, "0")}:00`;
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayList,
      opens,
      closes,
    },
  ];
}

const MEDICAL_SPECIALTIES = ["Neurology", "Geriatric"];

export function buildMedicalOrganizationSchema(): SchemaObject {
  const danversAddress = parseAddressParts("99 Conifer Hill Drive, Danvers, MA 01923");
  const bayAreaAddress = parseAddressParts("2520 Samaritan Dr, Suite 201B, San Jose, CA 95124");
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": ORG_ID,
    name: brand.name,
    url: SITE_URL,
    description: brand.footerTagline,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    medicalSpecialty: MEDICAL_SPECIALTIES,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: toE164(brand.phoneHref),
        contactType: "customer service",
        areaServed: ["US-MA", "US-CA"],
        availableLanguage: ["English"],
      },
    ],
    address: [danversAddress, bayAreaAddress]
      .filter((a): a is NonNullable<typeof a> => a !== null)
      .map((a) => ({
        "@type": "PostalAddress",
        ...a,
        addressCountry: "US",
      })),
    areaServed: [
      { "@type": "State", name: "Massachusetts" },
      { "@type": "State", name: "California" },
    ],
  };
}

export function buildWebSiteSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: brand.name,
    description: brand.footerTagline,
    publisher: { "@id": ORG_ID },
  };
}

export function buildBreadcrumbSchema(
  items: ReadonlyArray<{ name: string; url: string }>,
): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildMedicalClinicSchema(
  location: Location,
  detail: LocationDetail,
): SchemaObject | null {
  if (location.kind !== "clinic" || !detail.contact) return null;
  const addressParts = parseAddressParts(detail.contact.address);
  if (!addressParts) return null;
  const geo = parseGeoFromMapEmbed(detail.contact.mapEmbedSrc);
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${SITE_URL}${location.href}#clinic`,
    name: `Mindspan ${location.city}`,
    url: `${SITE_URL}${location.href}`,
    description: detail.hero.lead,
    image: detail.hero.image ? `${SITE_URL}${detail.hero.image}` : undefined,
    telephone: toE164(detail.contact.phoneHref),
    email: detail.contact.email,
    medicalSpecialty: MEDICAL_SPECIALTIES,
    address: { "@type": "PostalAddress", ...addressParts, addressCountry: "US" },
    geo: geo ? { "@type": "GeoCoordinates", ...geo } : undefined,
    openingHoursSpecification: parseHoursLine(detail.contact.hours),
    parentOrganization: { "@id": ORG_ID },
    priceRange: "$$",
    paymentAccepted: "Insurance, Medicare",
  };
}

export function buildPhysicianSchema(
  location: Location,
  provider: ProviderProfile,
): SchemaObject {
  const lastName = provider.name.split(",")[0].split(" ").slice(-1)[0].toLowerCase();
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}${location.href}#physician-${lastName}`,
    name: provider.name,
    image: `${SITE_URL}${provider.image}`,
    description: provider.bio,
    medicalSpecialty: ["Neurology"],
    knowsAbout: [...provider.specialties],
    hasCredential: provider.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: cert.toLowerCase().includes("board")
        ? "certification"
        : "professional",
      name: cert,
    })),
    alumniOf: provider.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu,
    })),
    worksFor: { "@id": `${SITE_URL}${location.href}#clinic` },
    affiliation: provider.affiliations
      .split(/[·,]/)
      .map((a) => a.trim())
      .filter(Boolean)
      .map((name) => ({ "@type": "Hospital", name })),
  };
}

export function buildVideoServiceSchema(location: Location): SchemaObject | null {
  if (location.kind !== "video") return null;
  const stateName = location.state;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${location.href}#service`,
    name: `Mindspan Video Visits - ${stateName}`,
    description: location.summary,
    url: `${SITE_URL}${location.href}`,
    provider: { "@id": ORG_ID },
    serviceType: "Telehealth neurology",
    category: "Medical",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceType: "Video visit",
      availableLanguage: ["English"],
    },
    areaServed: {
      "@type": "State",
      name: stateName,
    },
    termsOfService: `${SITE_URL}/tos`,
  };
}

export function buildFaqSchema(items: ReadonlyArray<FAQItem>): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function locationBreadcrumbItems(
  location: Location,
): ReadonlyArray<{ name: string; url: string }> {
  return [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Locations", url: `${SITE_URL}/locations` },
    { name: `${location.city}, ${location.state}`, url: `${SITE_URL}${location.href}` },
  ];
}
