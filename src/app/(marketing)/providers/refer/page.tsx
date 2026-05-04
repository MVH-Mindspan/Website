import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { ReferSection } from "@/components/refer/ReferSection";
import { referPage } from "@/content/pages/refer";
import { finalCta } from "@/content";

export const metadata = referPage.metadata;

export default function ReferPage() {
  return (
    <>
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
      />
      <FinalCTA {...finalCta} />
    </>
  );
}
