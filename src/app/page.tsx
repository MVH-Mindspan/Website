import Nav from "@/components/mindspan/Nav";
import Hero from "@/components/mindspan/Hero";
import {
  GoalsBand,
  Pillars,
  AssistCTA,
  HowItWorks,
  DigitalTwin,
  Locations,
  StartingPoint,
  FooterCTA,
  SiteFooter,
} from "@/components/mindspan/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GoalsBand />
        <Pillars />
        <AssistCTA />
        <HowItWorks />
        <DigitalTwin />
        <Locations />
        <StartingPoint />
        <FooterCTA />
        <SiteFooter />
      </main>
    </>
  );
}
