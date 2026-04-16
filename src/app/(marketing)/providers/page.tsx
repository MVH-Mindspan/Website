import { PageHero } from "@/components/organisms/sections/PageHero";
import { ProvidersSection } from "@/components/organisms/sections/ProvidersSection";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { providersPage } from "@/content/pages/providers";
import { providers, providersIntro, finalCta } from "@/content";

export const metadata = providersPage.metadata;

export default function ProvidersPage() {
  return (
    <>
      <PageHero {...providersPage.hero} />
      <ProvidersSection
        intro={providersIntro}
        refer={providers.refer}
        join={providers.join}
      />
      <FinalCTA {...finalCta} />
    </>
  );
}
