// Mindspan homepage content.
// Voice: a kind, experienced neurologist talking to a worried family in the waiting room.
// Warm, specific, human. No brand slogans. No pitch-deck claims.
// Aligned with the Mindspan Content & PR Posture Guide (Apr 2026).

export const brand = {
  headline: "Memory is precious. So is your time.",
  subhead:
    "Mindspan is a team of neurologists and care partners who help families get real answers about memory and thinking — without the months of waiting.",
  subTagline: "Neurology care, the way it should feel.",
  reassurance:
    "We’re neurologists. We see patients in clinic and on video. We bill insurance.",
  primaryCta: "Book a visit",
  primaryCtaHref: "https://assessment.mindspan.co/",
  secondaryCta: "Find a clinic",
  secondaryCtaHref: "#locations",
};

export const nav = [
  { label: "What to expect", href: "#expect" },
  { label: "How we think", href: "#how-we-think" },
  { label: "For families", href: "#families" },
  { label: "For doctors", href: "#doctors" },
  { label: "Locations", href: "#locations" },
];

// Things patients and families actually wonder about.
// Reframed from "brand pillars" into honest answers.
export const expectations = [
  {
    kicker: "How soon?",
    title: "You’ll be seen in weeks, not months.",
    body:
      "If you think something might be wrong, waiting six months for a specialist isn’t acceptable. You can talk to our team this week, and meet with a neurologist soon after.",
  },
  {
    kicker: "Who’s in the room?",
    title: "Your family is welcome. Your doctor stays in the loop.",
    body:
      "Bring your spouse, your adult child, whoever helps you most. We’ll also share notes with your primary care doctor so everyone taking care of you is working from the same page.",
  },
  {
    kicker: "What will we actually do?",
    title: "A thoughtful look at the whole picture.",
    body:
      "We go through your history, any tests you’ve had, and what you’re experiencing right now. Then we explain what we think is going on — in plain language, not medical jargon.",
  },
  {
    kicker: "And then what?",
    title: "A plan, and a team that answers the phone.",
    body:
      "You’ll leave with a care plan that fits your life, and a team you can actually reach when a question comes up. Because questions always come up.",
  },
];

// Walk-through of a first visit.
export const howItWorks = [
  {
    title: "A first conversation",
    body:
      "A 30-minute call with a care partner on our team. No forms to wrestle with first. Tell us what’s going on. We’ll listen, answer questions, and tell you honestly whether we’re the right fit.",
  },
  {
    title: "Meeting your neurologist",
    body:
      "An unhurried visit — in one of our clinics or on video — where a Mindspan neurologist goes through your history, any recent tests, and where you are today. You’ll leave knowing what they’re seeing and why.",
  },
  {
    title: "Looking at it together",
    body:
      "We combine what we’ve learned about you with decades of research from patients who’ve been where you are now. It helps us see which treatments and changes are most likely to help — specifically for you.",
  },
  {
    title: "Ongoing partnership",
    body:
      "You don’t get handed a prescription and sent home. Your Mindspan team stays with you. Things change; we adjust. A family member has a question; we answer it. You’re not doing this alone anymore.",
  },
];

export const locations = [
  { city: "Danvers", state: "Massachusetts", href: "/locations/danvers" },
  { city: "Telehealth", state: "Massachusetts", href: "/locations/telehealth-ma" },
  { city: "Irvine", state: "California", href: "/locations/irvine" },
  { city: "Bay Area", state: "California", href: "/locations/bay-area" },
];

// Three audiences, written directly to each reader.
export const audiences = [
  {
    id: "families",
    kicker: "If you’re caring for a parent or spouse",
    title: "You don’t have to keep figuring this out alone.",
    body:
      "You’ve probably spent months — maybe years — noticing changes, making calls, and being told to wait and see. We know that’s exhausting, and we know it’s lonely. You can bring your loved one to us, and we’ll take it from here together.",
    cta: "Book a visit",
    href: "https://assessment.mindspan.co/",
  },
  {
    id: "patients",
    kicker: "If you’ve noticed changes in yourself",
    title: "You deserve to be taken seriously.",
    body:
      "Maybe a word slipped that used to come easily. Maybe you walked into a room and forgot why. It might be nothing — it might be something. Either way, you deserve a neurologist who sits with you, explains what’s happening, and tells you what to do next.",
    cta: "Book a visit",
    href: "https://assessment.mindspan.co/",
  },
  {
    id: "doctors",
    kicker: "If you’re a primary care physician",
    title: "A neurology partner who makes your life easier.",
    body:
      "Your patients with cognitive concerns need more time than a 15-minute visit allows. We can see them quickly, communicate clearly, and send clean notes back to you. You stay their trusted doctor — we handle the cognitive specialty piece.",
    cta: "Learn about referrals",
    href: "/providers",
  },
];

// What we actually look at during an assessment — written like a real doctor talking, not a spec sheet.
export const whatWeLookAt = [
  "Your medical history, and what’s changed recently",
  "Any labs, imaging, or cognitive tests you’ve already had",
  "How you’re doing day to day — at home, at work, with family",
  "Lifestyle factors that quietly shape brain health",
  "Medications that might be helping or hurting",
  "What matters most to you, and what you’re hoping for",
];
