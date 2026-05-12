import { buildMetadata } from "@/lib/seo";

export type StateChoice = "MA" | "CA" | "Other";
export type CareOptionKind = "clinic" | "video";

export type CareOption = {
  id: string;
  city: string;
  state: string;
  description: string;
  kind: CareOptionKind;
  image: string;
  imageAlt?: string;
  address?: string;
};

export const bookingPage = {
  metadata: buildMetadata({
    title: "Book a Visit | Mindspan",
    description:
      "Schedule your first visit with a Mindspan neurologist. Choose your location, tell us about yourself, and our team will be in touch within one business day.",
    canonical: "/book-a-visit",
  }),
  shell: {
    skipToMain: "Skip to main content",
    backToSite: "Back to site",
    exitConfirm: "Leave booking? Your progress so far will be cleared.",
    progressLabels: ["Where", "How", "You", "Confirm"],
  },
  state: {
    eyebrow: "Start here",
    title: "Where do you live?",
    lead: "We see patients in Massachusetts and California today.",
    choices: [
      { id: "MA", title: "Massachusetts", subtitle: "We see patients here" },
      { id: "CA", title: "California", subtitle: "We see patients here" },
      { id: "Other", title: "Somewhere else", subtitle: "Join the waitlist for your area" },
    ],
    existingPatient: {
      label: "Already a current patient or caregiver?",
      cta: "Book an appointment",
      href: "https://oncehub.com/mindspan_danvers",
    },
  },
  care: {
    eyebrow: "Visit format",
    title: "How would you like to be seen?",
    lead: "Visit one of our clinics, or see your provider over video, whatever works best for you.",
    takingPatients: "Taking patients",
    optionsByState: {
      MA: [
        {
          id: "danvers",
          city: "Danvers",
          state: "Massachusetts",
          description: "In-person clinic, north of Boston",
          kind: "clinic",
          image: "/assets/danvers-clinic.webp",
          imageAlt: "Mindspan Danvers clinic on Boston’s North Shore",
          address: "99 Conifer Hill Drive, Danvers, MA 01923",
        },
        {
          id: "video-ma",
          city: "Video visit",
          state: "From anywhere in Massachusetts",
          description:
            "See your provider on your phone or computer, no driving, no waiting room",
          kind: "video",
          image: "/assets/video-visit-poster.webp",
          imageAlt: "Mindspan video visit, anywhere in Massachusetts",
        },
      ],
      CA: [
        {
          id: "bay-area",
          city: "Bay Area",
          state: "California",
          description: "In-person clinic",
          kind: "clinic",
          image: "/assets/bay-area-clinic.webp",
          imageAlt: "Mindspan Bay Area clinic exterior in San Jose, California",
          address: "2520 Samaritan Dr, Suite 201B, San Jose, CA 95124",
        },
        {
          id: "video-ca",
          city: "Video visit",
          state: "From anywhere in California",
          description:
            "See your provider on your phone or computer, no driving, no waiting room",
          kind: "video",
          image: "/assets/video-visit-poster.webp",
          imageAlt: "Mindspan video visit, anywhere in California",
        },
      ],
    } satisfies Record<"MA" | "CA", CareOption[]>,
  },
  details: {
    eyebrowSelf: "Your details",
    eyebrowCaregiver: "Caregiver details",
    titleSelf: "Tell us about yourself",
    titleCaregiver: "Your contact info",
    leadSelf: "We just need a few details so our team can reach you.",
    leadCaregiver: "We'll use these details to reach you about their care.",
    bookingForLegend: "Who is this visit for?",
    bookingForChoices: [
      { id: "self" as const, title: "Myself", subtitle: "I'm the patient" },
      {
        id: "loved-one" as const,
        title: "A loved one",
        subtitle: "I'm helping arrange their care",
      },
    ],
    patientGroup: {
      title: "About the patient",
      subtitle: "A few details about the person you're booking for.",
    },
    selfGroup: {
      title: "About you",
      subtitle: "So our team knows how to reach you.",
    },
    fieldLabels: {
      bookingFor: "Who is this visit for",
      patientFirstName: "Patient's first name",
      patientLastName: "Patient's last name",
      relationship: "Your relationship to the patient",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone number",
    } as Record<string, string>,
    placeholders: {
      firstName: "Jane",
      lastName: "Smith",
      patientFirstName: "John",
      patientLastName: "Smith",
      email: "jane@example.com",
      phone: "(555) 123-4567",
      relationship: "Select a relationship",
    },
    relationshipOptions: [
      { label: "Spouse or partner", value: "spouse-partner" },
      { label: "Parent", value: "parent" },
      { label: "Adult child", value: "adult-child" },
      { label: "Sibling", value: "sibling" },
      { label: "Other family member", value: "other-family" },
      { label: "Friend", value: "friend" },
      { label: "Professional caregiver", value: "professional-caregiver" },
      { label: "Other", value: "other" },
    ] as { label: string; value: string }[],
    phoneHint: "US numbers only. We use this for scheduling reminders.",
    emailHint: "Optional",
    errors: {
      bookingForRequired: "Please select who this visit is for",
      firstNameRequired: "Please enter your first name",
      lastNameRequired: "Please enter your last name",
      emailInvalid: "Please enter a valid email address",
      phoneRequired: "Please enter your phone number",
      phoneInvalid: "Please enter a 10-digit US phone number",
      patientFirstNameRequired: "Please enter the patient's first name",
      patientLastNameRequired: "Please enter the patient's last name",
      relationshipRequired: "Please tell us your relationship",
    },
    errorSummary: {
      one: "Please fix this field before continuing:",
      many: (n: number) => `Please fix these ${n} fields before continuing:`,
    },
  },
  review: {
    eyebrow: "Confirm",
    title: "Almost done",
    lead: "Confirm everything looks right and we'll be in touch.",
    submit: "Confirm and submit",
    submitting: "Submitting...",
    submittingAria: "Sending your booking request, please wait",
    privacy: "Your information is secure and only used to schedule your visit.",
    edit: "Edit",
    sectionLabels: {
      visit: "Visit type",
      patient: "Patient",
      yourContactCaregiver: "Your contact info",
      yourDetails: "Your details",
    },
    rowLabels: {
      name: "Name",
      relationship: "Relationship",
      email: "Email",
      phone: "Phone",
    },
    relationshipLabels: {
      "spouse-partner": "Spouse or partner",
      parent: "Parent",
      "adult-child": "Adult child",
      sibling: "Sibling",
      "other-family": "Other family member",
      friend: "Friend",
      "professional-caregiver": "Professional caregiver",
      other: "Other",
    } as Record<string, string>,
    submitMissing:
      "Some required information is missing. Please go back and complete every step.",
    success: {
      title: "You're all set",
      body:
        "Our team will reach out within one business day to schedule your visit.",
      backToHome: "Back to homepage",
    },
  },
  waitlist: {
    eyebrow: "Waitlist",
    title: "We're not in your state yet",
    lead:
      "Drop your details and we'll let you know the moment Mindspan opens up in your area.",
    submit: "Join the waitlist",
    submitting: "Joining...",
    submittingAria: "Submitting your information, please wait",
    privacy:
      "We'll only use your information to let you know when we're available.",
    fieldLabels: {
      firstName: "First name",
      email: "Email",
      phone: "Phone number",
    } as Record<string, string>,
    placeholders: {
      firstName: "Jane",
      email: "jane@example.com",
      phone: "(555) 123-4567",
    },
    errors: {
      firstNameRequired: "Please enter your first name",
      emailRequired: "Please enter your email",
      emailInvalid: "Please enter a valid email address",
      phoneRequired: "Please enter your phone number",
      phoneInvalid: "Please enter a 10-digit US phone number",
    },
    success: {
      title: "You're on the list",
      body: "We'll reach out the moment Mindspan is available in your area.",
      backToHome: "Back to homepage",
    },
  },
  submitErrors: {
    client:
      "Something in your information didn't come through. Please double-check and try again, or email us at hello@mindspan.co.",
    server:
      "Our scheduling system is having a hiccup. Please try again in a moment, or email us at hello@mindspan.co.",
    timeout:
      "That took longer than expected. Please check your connection and try again.",
    network:
      "We couldn't reach our servers. Please check your connection and try again, or email us at hello@mindspan.co.",
    submitErrorTitle: "We couldn't submit your information.",
    retry: "Try again",
    emailFallback: "Or email us at hello@mindspan.co",
    emailHref: "mailto:hello@mindspan.co",
  },
  srHeadings: {
    state: "Step: Where do you live?",
    care: "Step: How would you like to be seen?",
    details: "Step: Your details",
    review: "Step: Review and confirm",
    waitlist: "Step: Join the waitlist",
    submitted: "Submission complete",
  },
};
