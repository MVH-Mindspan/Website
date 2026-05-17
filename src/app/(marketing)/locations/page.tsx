import { PageHero } from "@/components/organisms/sections/PageHero";
import { LocationCards } from "@/components/organisms/sections/LocationCards";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { locationsPage } from "@/content/pages/locations";
import { locations, finalCta } from "@/content";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = locationsPage.metadata;

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Locations", url: `${SITE_URL}/locations` },
        ])}
      />
      <PageHero {...locationsPage.hero} />
      <LocationCards locations={locations} groupByKind tone="sand" />
      <FinalCTA {...finalCta} />
    </>
  );
}
