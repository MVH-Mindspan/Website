import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { ReferSection } from "@/components/refer/ReferSection";
import { referPage } from "@/content/pages/refer";
import { finalCta } from "@/content";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = referPage.metadata;

export default function ReferPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "For Referring Clinicians", url: `${SITE_URL}/providers` },
          { name: "Refer a Patient", url: `${SITE_URL}/providers/refer` },
        ])}
      />
      <ReferSection
        eyebrow={referPage.hero.eyebrow}
        title="Refer a patient in 30 seconds."
        lead={referPage.hero.lead}
        form={{
          submit: referPage.form.submit,
          submitting: referPage.form.submitting,
          successTitle: referPage.form.successTitle,
          successBody: referPage.form.successBody,
          privacy: referPage.form.privacy,
        }}
        alt={referPage.alt}
        locations={referPage.locations}
        defaultLocationId={referPage.defaultLocationId}
      />
      <FinalCTA {...finalCta} />
    </>
  );
}
