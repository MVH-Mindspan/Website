import { PageHero } from "@/components/organisms/sections/PageHero";
import { ProvidersSection } from "@/components/organisms/sections/ProvidersSection";
import { ProvidersPreview } from "@/components/organisms/sections/ProvidersPreview";
import { SimpleSteps } from "@/components/organisms/sections/SimpleSteps";
import { SplitCards } from "@/components/organisms/sections/SplitCards";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { providersPage } from "@/content/pages/providers";
import {
  providers,
  providersIntro,
  providersPreview,
  providersPreviewClinicianIntro,
  coManagement,
  coManagementIntro,
  coManagementClosing,
  referralPathway,
  referralPathwayIntro,
} from "@/content";

export const metadata = providersPage.metadata;

export default function ProvidersPage() {
  return (
    <>
      <PageHero {...providersPage.hero} />
      <div id="how-we-work">
        <SplitCards
          intro={coManagementIntro}
          core={coManagement.core}
          edge={coManagement.edge}
          closing={coManagementClosing}
          tone="sand"
        />
      </div>
      <SimpleSteps intro={referralPathwayIntro} stages={referralPathway} />
      <ProvidersPreview
        intro={providersPreviewClinicianIntro}
        providers={providersPreview}
        tone="cream"
      />
      <ProvidersSection
        intro={providersIntro}
        refer={providers.refer}
        join={providers.join}
      />
      <FinalCTA {...providersPage.finalCta} />
    </>
  );
}
