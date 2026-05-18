export type Audience = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  bullets?: readonly string[];
  caption?: string;
};

export const audiencesIntro = {
  eyebrow: "Who we see",
  title: "Wherever you are coming from, you are in the right place.",
  lead:
    "Some of you are here for a parent or spouse. Others are here because of something you have noticed in yourself. Either way, you are not too early, and you are not alone.",
  image: "/assets/consultation-1.webp",
  imageAlt: "A consultation in a sunlit room",
} as const;

export const audiences: Audience[] = [
  {
    id: "families",
    kicker: "If you\u2019re caring for a parent or spouse",
    title: "You don\u2019t have to keep figuring this out alone.",
    body:
      "You\u2019ve been noticing changes, making calls, and being told to wait. Bring your loved one to us. We\u2019ll take it from here together.",
    cta: "Book a visit",
    href: "/book-a-visit",
  },
  {
    id: "patients",
    kicker: "If you\u2019ve noticed changes in yourself",
    title: "You deserve to be taken seriously.",
    body:
      "Maybe a word slipped. Maybe you walked into a room and forgot why. It might be nothing, but you deserve to know either way.",
    cta: "Start a free assessment today",
    href: "https://assessment.mindspan.co/",
  },
  {
    id: "doctors",
    kicker: "If you\u2019re a primary care physician",
    title: "A neurology partner who makes your life easier.",
    body:
      "Your patients with cognitive concerns need more time than a 15-minute visit allows. We see them quickly and send clean notes back. You stay their doctor, we handle the specialty piece.",
    cta: "Learn about referrals",
    href: "/providers",
  },
];
