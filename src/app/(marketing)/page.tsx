"use client";

import { useTheme } from "@/lib/theme-context";
import { MindspanHome } from "@/components/home-legacy/MindspanHome";
import { VideoHero } from "@/components/organisms/sections/VideoHero";
import { TeaserBanner } from "@/components/organisms/sections/TeaserBanner";
import { EditorialStages } from "@/components/organisms/sections/EditorialStages";
import { StatsBand } from "@/components/organisms/sections/StatsBand";
import { SplitCards } from "@/components/organisms/sections/SplitCards";
import { AudienceCards } from "@/components/organisms/sections/AudienceCards";
import { Testimonials } from "@/components/organisms/sections/Testimonials";
import { ProvidersPreview } from "@/components/organisms/sections/ProvidersPreview";
import { LocationCards } from "@/components/organisms/sections/LocationCards";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import {
  homeHero,
  announcement,
  journey,
  stats,
  protocols,
  protocolsIntro,
  audiences,
  audiencesIntro,
  locations,
  locationsIntro,
  finalCta,
  testimonials,
  testimonialsIntro,
  providersPreview,
  providersPreviewIntro,
} from "@/content";
import { flags } from "@/lib/featureFlags";

export default function HomePage() {
  const { theme } = useTheme();

  if (theme.structure === "v1") {
    return <MindspanHome />;
  }

  return (
    <>
      <VideoHero
        video={homeHero.video}
        poster={homeHero.poster}
        headline={homeHero.headline}
        subTagline={homeHero.subTagline}
        subhead={homeHero.subhead}
        cta={homeHero.cta}
        coverage={homeHero.coverage}
      />
      <TeaserBanner
        href={announcement.href}
        ariaLabel={announcement.ariaLabel}
        primary={announcement.primary}
        badge={announcement.badge}
      />
      <EditorialStages stages={journey} />
      <StatsBand stats={stats} />
      <AudienceCards intro={audiencesIntro} audiences={audiences} />
      <Testimonials intro={testimonialsIntro} quotes={testimonials} />
      <SplitCards
        intro={protocolsIntro}
        core={protocols.core}
        edge={flags.showEdgeProtocol ? protocols.edge : undefined}
      />
      <ProvidersPreview intro={providersPreviewIntro} providers={providersPreview} />
      <LocationCards id="locations" intro={locationsIntro} locations={locations} />
      <FinalCTA
        eyebrow={finalCta.eyebrow}
        title={finalCta.title}
        lead={finalCta.lead}
        primary={finalCta.primary}
        secondary={finalCta.secondary}
        signature={finalCta.signature}
      />
    </>
  );
}
