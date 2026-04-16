export type Audience = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  bullets?: readonly string[];
};

export const audiencesIntro = {
  eyebrow: "Who we see",
  title: "Wherever you are coming from, you are in the right place.",
  lead: "A short note, directly to you.",
  image: "/assets/consultation-1.png",
  imageAlt: "A consultation in a sunlit room",
} as const;

export const audiences: Audience[] = [
  {
    id: "families",
    kicker: "If you\u2019re caring for a parent or spouse",
    title: "You don\u2019t have to keep figuring this out alone.",
    body:
      "You\u2019ve probably spent months, maybe years, noticing changes, making calls, and being told to wait and see. We know that\u2019s exhausting, and we know it\u2019s lonely. You can bring your loved one to us, and we\u2019ll take it from here together.",
    cta: "Book a visit",
    href: "/book-a-visit",
  },
  {
    id: "patients",
    kicker: "If you\u2019ve noticed changes in yourself",
    title: "You deserve to be taken seriously.",
    body:
      "Maybe a word slipped that used to come easily. Maybe you walked into a room and forgot why. It might be nothing, it might be something. Either way, you deserve a neurologist who sits with you, explains what\u2019s happening, and tells you what to do next.",
    cta: "Start a free assessment",
    href: "/book-a-visit",
  },
  {
    id: "doctors",
    kicker: "If you\u2019re a primary care physician",
    title: "A neurology partner who makes your life easier.",
    body:
      "Your patients with cognitive concerns need more time than a 15-minute visit allows. We can see them quickly, communicate clearly, and send clean notes back to you. You stay their trusted doctor, we handle the cognitive specialty piece.",
    cta: "Learn about referrals",
    href: "/providers",
  },
];
