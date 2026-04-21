"use client";

import { useTheme } from "@/lib/theme-context";
import { MindspanHome } from "@/components/home-legacy/MindspanHome";
import { VideoHero } from "@/components/organisms/sections/VideoHero";
import { EditorialIntro } from "@/components/organisms/sections/EditorialIntro";
import { TeaserBanner } from "@/components/organisms/sections/TeaserBanner";
import { EditorialStages } from "@/components/organisms/sections/EditorialStages";
import { StatsBand } from "@/components/organisms/sections/StatsBand";
import { SplitCards } from "@/components/organisms/sections/SplitCards";
import { FeatureCardGrid } from "@/components/organisms/sections/FeatureCardGrid";
import { AudienceCards } from "@/components/organisms/sections/AudienceCards";
import { LocationCards } from "@/components/organisms/sections/LocationCards";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import {
  homeHero,
  announcement,
  journey,
  journeyIntro,
  stats,
  protocols,
  protocolsIntro,
  technology,
  technologyIntro,
  audiences,
  audiencesIntro,
  locations,
  locationsIntro,
  finalCta,
} from "@/content";
import { flags } from "@/lib/featureFlags";

export default function HomePage() {
  const { theme } = useTheme();

  if (theme.structure === "v1") {
    return <MindspanHome />;
  }

  const visibleTechCards = technology.filter(
    (c) => c.id !== "mindy" || flags.showMindy
  );

  return (
    <>
      <VideoHero
        video={homeHero.video}
        poster={homeHero.poster}
        headline={homeHero.headline}
        subTagline={homeHero.subTagline}
        subhead={homeHero.subhead}
        cta={homeHero.cta}
      />
      <TeaserBanner
        href={announcement.href}
        ariaLabel={announcement.ariaLabel}
        primary={announcement.primary}
        badge={announcement.badge}
      />
      <EditorialStages stages={journey} />
      <StatsBand stats={stats} />
      <SplitCards
        intro={protocolsIntro}
        core={protocols.core}
        edge={flags.showEdgeProtocol ? protocols.edge : undefined}
      />
      <FeatureCardGrid
        id="technology"
        intro={technologyIntro}
        cards={visibleTechCards}
        columns={visibleTechCards.length === 2 ? 2 : 3}
      />
      <AudienceCards intro={audiencesIntro} audiences={audiences} />
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
