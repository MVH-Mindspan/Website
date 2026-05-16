import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import {
  PageHero,
  EditorialStages,
  SplitCards,
  FeatureCardGrid,
  AudienceCards,
  ProviderProfile,
  CareTeamGrid,
  InPersonClinicsBand,
  ClinicContact,
  FinalCTA,
} from "@/components/organisms/sections";
import { getLocation, finalCta } from "@/content";
import {
  getLocationPage,
  allLocationSlugs,
} from "@/content/pages/locationDetail";
import { JsonLd } from "@/lib/json-ld";
import {
  buildMedicalClinicSchema,
  buildPhysicianSchema,
  buildVideoServiceSchema,
  buildBreadcrumbSchema,
  locationBreadcrumbItems,
} from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allLocationSlugs();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return getLocationPage(location).metadata;
}

export default async function LocationDetailPage({ params }: Params) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const { detail } = getLocationPage(location);

  const clinicSchema =
    location.kind === "clinic" ? buildMedicalClinicSchema(location, detail) : null;
  const serviceSchema =
    location.kind === "video" ? buildVideoServiceSchema(location) : null;
  const breadcrumb = buildBreadcrumbSchema(locationBreadcrumbItems(location));

  return (
    <>
      <JsonLd id="ld-breadcrumb" data={breadcrumb} />
      {clinicSchema && <JsonLd id="ld-clinic" data={clinicSchema} />}
      {serviceSchema && <JsonLd id="ld-service" data={serviceSchema} />}
      {location.kind === "clinic" && detail.provider && (
        <JsonLd
          id="ld-physician"
          data={buildPhysicianSchema(location, detail.provider)}
        />
      )}
      <PageHero
        eyebrow={detail.hero.eyebrow}
        title={detail.hero.title}
        lead={detail.hero.lead}
        location={detail.hero.location}
        availability={detail.hero.availability}
        image={detail.hero.image}
        imageAlt={detail.hero.imageAlt}
        video={detail.hero.video}
        poster={detail.hero.poster}
      >
        {detail.hero.primaryCta && (
          <Button
            href={detail.hero.primaryCta.href}
            variant="primary"
            size="lg"
            iconRight={<ArrowIcon />}
          >
            {detail.hero.primaryCta.label}
          </Button>
        )}
      </PageHero>

      {detail.services && (
        <FeatureCardGrid
          id="services"
          intro={detail.services.intro}
          cards={detail.services.cards}
          columns={4}
          rounded={false}
          primary={detail.services.primary}
          secondary={detail.services.secondary}
        />
      )}

      {detail.provider && <ProviderProfile {...detail.provider} />}

      {detail.stages && (
        <EditorialStages
          intro={detail.stages.intro}
          stages={detail.stages.items}
        />
      )}

      {detail.whyChoose && (
        <SplitCards
          intro={detail.whyChoose.intro}
          core={detail.whyChoose.core}
          edge={detail.whyChoose.edge}
          closing={detail.whyChoose.closing}
          cta={detail.whyChoose.cta}
        />
      )}

      {detail.howItWorks && (
        <FeatureCardGrid
          id="how-it-works"
          intro={detail.howItWorks.intro}
          cards={detail.howItWorks.cards}
          columns={4}
          rounded={false}
          tone="sand"
        />
      )}

      {detail.careTeam && (
        <CareTeamGrid
          intro={detail.careTeam.intro}
          providers={detail.careTeam.providers}
        />
      )}

      {detail.contact && <ClinicContact {...detail.contact} />}

      {detail.inPersonClinics && (
        <InPersonClinicsBand
          intro={detail.inPersonClinics.intro}
          clinics={detail.inPersonClinics.clinics}
        />
      )}

      {detail.audiences && (
        <AudienceCards
          intro={detail.audiences.intro}
          audiences={detail.audiences.items}
        />
      )}

      {detail.guide && (
        <SplitCards
          intro={detail.guide.intro}
          core={detail.guide.core}
          edge={detail.guide.edge}
          cta={detail.guide.cta}
          footnote={detail.guide.footnote}
        />
      )}

      {detail.finalCta ? (
        <FinalCTA
          eyebrow={detail.finalCta.eyebrow}
          title={detail.finalCta.title}
          lead={detail.finalCta.lead}
          primary={detail.finalCta.primary}
          secondary={detail.finalCta.secondary}
          signature={detail.finalCta.signature}
        />
      ) : (
        <FinalCTA {...finalCta} />
      )}
    </>
  );
}
