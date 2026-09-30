import { SITE_URL } from "@/lib/seo";
import { brand } from "@/content/brand";
import { clinicList, type Clinic } from "@/content/clinics";
import type { Location } from "@/content/locations";
import {
  getLocationDetail,
  type ProviderProfile,
} from "@/content/pages/locationDetail";
import type { ProviderPreview } from "@/content/providersPreview";
import type { FAQItem } from "@/content/faq";

type SchemaObject = Record<string, unknown>;

const CONTEXT = "https://schema.org";
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_URL = `${SITE_URL}/assets/mindspan-logo-horizontal-dark.png`;
const LINKEDIN_URL = "https://www.linkedin.com/company/mindspan-group-inc";
// A schema.org MedicalSpecialty enumeration member ("Neurology" is not one).
const MEDICAL_SPECIALTY = "Neurologic";
const ABPN = {
  "@type": "Organization",
  name: "American Board of Psychiatry and Neurology",
  url: "https://www.abpn.org/",
};

// FAQ items kept out of FAQPage markup until their answers are confirmed.
// "medicare" (faq.ts) and "advantage" (guide.ts) mention Medicaid, which is
// pending owner review.
export const UNCONFIRMED_FAQ_IDS: readonly string[] = ["medicare", "advantage"];

function toE164(phoneHref: string): string {
  return phoneHref.replace(/^tel:/, "");
}

function npiRegistryUrl(npi: string): string {
  return `https://npiregistry.cms.hhs.gov/provider-view/${npi}`;
}

function npiIdentifier(npi: string): SchemaObject {
  return { "@type": "PropertyValue", propertyID: "NPI", value: npi };
}

export function clinicSchemaId(clinic: Clinic): string {
  return `${SITE_URL}${clinic.pageHref}#clinic`;
}

export function clinicianSchemaId(clinic: Clinic, provider: ProviderProfile): string {
  return `${SITE_URL}${clinic.pageHref}#dr-${provider.familyName.toLowerCase()}`;
}

/** Organization + WebSite, rendered once per page by the marketing layout. */
export function buildSiteGraph(): SchemaObject {
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": ORG_ID,
        name: brand.name,
        alternateName: ["MindSpan", "Mind Span"],
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: LOGO_URL },
        description: brand.footerTagline,
        telephone: toE164(brand.phoneHref),
        sameAs: [LINKEDIN_URL],
        medicalSpecialty: MEDICAL_SPECIALTY,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: toE164(brand.phoneHref),
            contactType: "customer service",
            areaServed: ["US-MA", "US-CA"],
            availableLanguage: ["English"],
          },
        ],
        areaServed: [
          { "@type": "State", name: "Massachusetts" },
          { "@type": "State", name: "California" },
        ],
        subOrganization: clinicList.map((clinic) => ({ "@id": clinicSchemaId(clinic) })),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: brand.name,
        description: brand.footerTagline,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function buildBreadcrumbSchema(
  items: ReadonlyArray<{ name: string; url: string }>,
): SchemaObject {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * One stable MedicalClinic entity per clinic (`/locations/<slug>#clinic`), so
 * every page that mentions a clinic describes the same node.
 */
export function buildClinicSchema(
  clinic: Clinic,
  opts: { clinician?: ProviderProfile } = {},
): SchemaObject {
  const { address, geo, openingHours } = clinic;
  return {
    "@context": CONTEXT,
    "@type": "MedicalClinic",
    "@id": clinicSchemaId(clinic),
    name: clinic.name,
    legalName: clinic.legalName,
    alternateName: [...clinic.alternateName],
    url: `${SITE_URL}${clinic.pageHref}`,
    description: clinic.description,
    image: `${SITE_URL}${clinic.image}`,
    telephone: toE164(clinic.phoneHref),
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    hasMap: clinic.hasMapUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...openingHours.days],
        opens: openingHours.opens,
        closes: openingHours.closes,
      },
    ],
    areaServed: clinic.areaServed.map((area) => ({ "@type": area.type, name: area.name })),
    medicalSpecialty: MEDICAL_SPECIALTY,
    isAcceptingNewPatients: true,
    paymentAccepted: "Medicare",
    identifier: npiIdentifier(clinic.npi),
    sameAs: [npiRegistryUrl(clinic.npi)],
    parentOrganization: { "@id": ORG_ID },
    employee: opts.clinician
      ? { "@id": clinicianSchemaId(clinic, opts.clinician) }
      : undefined,
  };
}

/**
 * Every clinic node, each linked to its lead clinician. A page that links the
 * clinicians must also render their nodes (`buildAllCliniciansSchema`), or the
 * `employee` references don't resolve; pass `withClinicians: false` otherwise.
 */
export function buildAllClinicsSchema({
  withClinicians = true,
}: { withClinicians?: boolean } = {}): SchemaObject[] {
  return clinicList.map((clinic) =>
    buildClinicSchema(clinic, {
      clinician: withClinicians ? getLocationDetail(clinic.slug)?.provider : undefined,
    }),
  );
}

export function buildClinicianSchema(
  clinic: Clinic,
  provider: ProviderProfile,
): SchemaObject {
  const { npi } = provider;
  const affiliations = [{ "@id": clinicSchemaId(clinic) }, { "@id": ORG_ID }];
  return {
    "@context": CONTEXT,
    "@type": ["Person", "IndividualPhysician"],
    "@id": clinicianSchemaId(clinic, provider),
    name: [provider.givenName, provider.additionalName, provider.familyName]
      .filter(Boolean)
      .join(" "),
    givenName: provider.givenName,
    additionalName: provider.additionalName,
    familyName: provider.familyName,
    honorificPrefix: "Dr.",
    honorificSuffix: provider.honorificSuffix,
    jobTitle: provider.role,
    image: `${SITE_URL}${provider.image}`,
    description: provider.bio,
    url: `${SITE_URL}${clinic.pageHref}`,
    medicalSpecialty: MEDICAL_SPECIALTY,
    knowsAbout: [...provider.specialties],
    practicesAt: affiliations,
    worksFor: affiliations,
    hospitalAffiliation: provider.hospitalAffiliations.map((h) => ({
      "@type": "Hospital",
      name: h.name,
      address: h.locality
        ? {
            "@type": "PostalAddress",
            addressLocality: h.locality,
            addressRegion: h.region,
            addressCountry: "US",
          }
        : undefined,
    })),
    alumniOf: provider.alumniOf.map((name) => ({ "@type": "EducationalOrganization", name })),
    hasCredential: provider.boardCertifications.map((specialty) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Board certification",
      name: `Board Certified in ${specialty}`,
      recognizedBy: ABPN,
    })),
    memberOf: provider.memberOf?.map((name) => ({ "@type": "Organization", name })),
    isAcceptingNewPatients: true,
    ...(npi
      ? { usNPI: npi, identifier: npiIdentifier(npi), sameAs: [npiRegistryUrl(npi)] }
      : {}),
  };
}

/** Every clinic's lead clinician, with the same @ids the location pages use. */
export function buildAllCliniciansSchema(): SchemaObject[] {
  return clinicList.flatMap((clinic) => {
    const provider = getLocationDetail(clinic.slug)?.provider;
    return provider ? [buildClinicianSchema(clinic, provider)] : [];
  });
}

/**
 * Non-clinic team member (e.g. the Clinical Director): a plain Person working
 * for the organization. No physician type or NPI until licensure is confirmed.
 */
export function buildTeamMemberSchema(
  person: ProviderPreview & { givenName: string; familyName: string },
  pageHref: string,
): SchemaObject {
  return {
    "@context": CONTEXT,
    "@type": "Person",
    "@id": `${SITE_URL}${pageHref}#dr-${person.familyName.toLowerCase()}`,
    name: `${person.givenName} ${person.familyName}`,
    givenName: person.givenName,
    familyName: person.familyName,
    honorificPrefix: "Dr.",
    honorificSuffix: person.honorificSuffix,
    jobTitle: person.role,
    image: person.image ? `${SITE_URL}${person.image}` : undefined,
    description: person.bio,
    url: `${SITE_URL}${pageHref}`,
    worksFor: { "@id": ORG_ID },
  };
}

export function buildVideoServiceSchema(location: Location): SchemaObject | null {
  if (location.kind !== "video") return null;
  const stateName = location.state;
  return {
    "@context": CONTEXT,
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

/** Drop FAQ items by id (e.g. unconfirmed answers, or items already marked up on another page). */
export function excludeFaqItems(
  items: ReadonlyArray<FAQItem>,
  ids: ReadonlyArray<string>,
): FAQItem[] {
  return items.filter((item) => !ids.includes(item.id));
}

export function buildFaqSchema(items: ReadonlyArray<FAQItem>): SchemaObject {
  return {
    "@context": CONTEXT,
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
