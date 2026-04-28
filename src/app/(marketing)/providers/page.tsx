import { PageHero } from "@/components/organisms/sections/PageHero";
import { ProvidersSection } from "@/components/organisms/sections/ProvidersSection";
import { AudienceCards } from "@/components/organisms/sections/AudienceCards";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { providersPage } from "@/content/pages/providers";
import { providers, providersIntro, audiences, finalCta } from "@/content";

export const metadata = providersPage.metadata;

const pcpAudiences = audiences.filter((a) => a.id === "doctors");

export default function ProvidersPage() {
  return (
    <>
      <PageHero {...providersPage.hero} />
      <AudienceCards
        intro={{
          eyebrow: "Primary care",
          title: "A neurology partner who makes your life easier.",
          lead: "For PCPs, geriatricians, and care teams referring patients with cognitive concerns.",
        }}
        audiences={pcpAudiences}
      />
      <ProvidersSection
        intro={providersIntro}
        refer={providers.refer}
        join={providers.join}
      />
      <FinalCTA {...finalCta} />
    </>
  );
}
