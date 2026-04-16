import { PageHero } from "@/components/organisms/sections/PageHero";
import { LocationCards } from "@/components/organisms/sections/LocationCards";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { locationsPage } from "@/content/pages/locations";
import { locations, finalCta } from "@/content";

export const metadata = locationsPage.metadata;

export default function LocationsPage() {
  return (
    <>
      <PageHero {...locationsPage.hero} />
      <LocationCards locations={locations} />
      <FinalCTA {...finalCta} />
    </>
  );
}
