import { buildMetadata } from "@/lib/seo";
import type {
  LegalBlock,
  LegalSection,
} from "@/components/organisms/sections/LegalDocument";

const intro: LegalBlock[] = [
  {
    kind: "p",
    text: 'Mindspan Group, Inc. and affiliated healthcare practices ("Mindspan PC") deliver dementia care services via telehealth technology. By agreeing to this consent, you have elected to receive these services. Direct questions about technology appropriateness, associated risks, or provider credentials to your Mindspan PC provider.',
  },
  {
    kind: "p",
    text: "Only use Mindspan Services after reading this information and determining they suit your needs. Contact legal@mindspan.co with questions.",
  },
];

const sections: LegalSection[] = [
  {
    number: "1",
    heading: "Use of telehealth",
    blocks: [
      {
        kind: "callout",
        text: "THE MINDSPAN SERVICES ARE NOT AN EMERGENCY RESPONSE UNIT. YOU MUST DIAL 911 IMMEDIATELY FOR MEDICAL EMERGENCIES.",
      },
      {
        kind: "p",
        text: '"Telehealth" involves electronic information and communication technologies enabling providers to deliver healthcare to patients at different physical locations. This may include assessment, diagnosis, consultation, treatment, education, and care management. Communication can encompass electronic transfer of medical records, images, health information, live audio/video conversations, and analysis of data from medical or wearable devices.',
      },
      {
        kind: "p",
        text: "While telehealth offers potential benefits, associated risks exist. Telehealth services don't substitute for in-person healthcare in all cases. You must review and agree to this Informed Consent to use the Services.",
      },
    ],
  },
  {
    number: "2",
    heading: "Risks associated with telehealth",
    blocks: [
      { kind: "p", text: "Potential risks include:" },
      {
        kind: "list",
        items: [
          "Limitations on availability and appropriateness of specific health services offered remotely (information transmitted may prove insufficient for appropriate medical decision-making; inability to conduct certain tests or assess vital signs in-person may prevent diagnosis or treatment)",
          "Confidentiality and security concerns regarding health information transmission through potentially unsecure electronic and telecommunication technologies",
          "Technological issues during telehealth visits (alternative communication methods may be provided for connectivity problems)",
          "Regulatory requirements in certain jurisdictions may limit provider treatment options, especially regarding prescriptions",
        ],
      },
    ],
  },
  {
    number: "3",
    heading: "Privacy and confidentiality",
    blocks: [
      {
        kind: "p",
        text: "Privacy and confidentiality laws protecting health information apply to Mindspan Services. Your personal health information may be electronically transmitted to healthcare providers in other areas, including out-of-state locations. Your healthcare provider may disclose your personal health information, except as prohibited by federal or state law.",
      },
    ],
  },
  {
    number: "4",
    heading: "Accuracy of information submitted to Mindspan PC provider",
    blocks: [
      {
        kind: "p",
        text: "You're solely responsible for ensuring submitted information is accurate, complete, and current. Mindspan PC providers will rely on this information for diagnosis and treatment planning. Inaccurate, incomplete, or outdated information may cause treatment delays or misdiagnosis.",
      },
    ],
  },
  {
    number: "5",
    heading: "Release and waiver",
    blocks: [
      {
        kind: "p",
        text: "You acknowledge and agree to limit, disclaim, and release Mindspan PC from liability regarding Telehealth Technology use and Mindspan Services provision.",
      },
    ],
  },
  {
    number: "6",
    heading: "Expenses",
    blocks: [
      {
        kind: "p",
        text: "You're responsible for professional fees associated with Mindspan Services (which may change over time) and costs of any prescribed medications or supplies.",
      },
    ],
  },
  {
    number: "7",
    heading: "Other legal terms",
    blocks: [
      {
        kind: "p",
        text: "This Consent cannot be amended except in writing through mutual agreement. If any provision becomes unenforceable or invalid, other provisions continue with the same effect.",
      },
    ],
  },
  {
    number: "8",
    heading: "Right to revoke",
    blocks: [
      {
        kind: "p",
        text: "You may revoke this Consent by sending written notice to Mindspan PC containing your name and address. Revocation means you cannot receive care using Telehealth Technology. Revocation becomes effective upon receipt, except it doesn't affect actions taken by Mindspan PC providers in reliance on this Consent before receiving your written notice.",
      },
    ],
  },
  {
    number: "9",
    heading: "Insurance & patient responsibility",
    blocks: [
      {
        kind: "p",
        text: "Mindspan PC accepts payment from select federal and state health care programs (Medicare, Medicaid) and certain insurance plans. Mindspan PC will attempt to bill any insurance for rendered services. If services aren't covered or patient responsibility exists, Mindspan PC may unenroll the user and terminate the relationship.",
      },
    ],
  },
  {
    number: "10",
    heading: "Additional state-specific consents",
    blocks: [
      {
        kind: "p",
        text: "The following consents apply to users in specified states:",
      },
      {
        kind: "definitions",
        items: [
          {
            term: "Alaska",
            description:
              "Your primary care provider may obtain a copy of your telehealth encounter records. (Alaska Stat. § 08.64.364).",
          },
          {
            term: "Arizona",
            description:
              "You're entitled to existing confidentiality protections (A.R.S. § 12-2292). Medical reports from RPM Services are part of your medical record (A.R.S. § 12-2291). Image or information dissemination for research/educational purposes requires your consent unless authorized by law. (Ariz. Rev. Stat. Ann. § 36-3602).",
          },
          {
            term: "Connecticut",
            description:
              "Your primary care provider may obtain a copy of your RPM Services records. (Conn. Gen. Stat. Ann. § 19a-906).",
          },
          {
            term: "District of Columbia",
            description:
              "You've been informed of alternate communication forms for urgent matters. (D.C. Mun. Regs. tit. 17, § 4618.10).",
          },
          {
            term: "Georgia",
            description:
              "You've received clear, appropriate, accurate follow-up instructions for emergent care related to RPM Services. (Ga. Comp. R. & Regs. 360-3-.07(7)).",
          },
          {
            term: "Iowa",
            description:
              "If registering a formal complaint about a provider, visit: https://medicalboard.iowa.gov/consumers/filing-complaint",
          },
          {
            term: "Idaho",
            description:
              "If registering a formal complaint about a provider, visit: https://bom.idaho.gov/BOMPortal/AgencyAdditional.aspx?Agency=425&AgencyLinkID=650",
          },
          {
            term: "Indiana",
            description:
              "If registering a formal complaint about a provider, visit: https://www.in.gov/attorneygeneral/2434.htm",
          },
          {
            term: "Kansas",
            description:
              "If you have a primary care provider, the RPM Services provider must send a report within three business days to such provider regarding treatment and services rendered. (Kan. Stat. Ann. § 40-2,212(2)(d)(1)(A)).",
          },
          {
            term: "Kentucky",
            description:
              "If registering a formal complaint about a provider, visit: https://kbml.ky.gov/grievances/Pages/default.aspx",
          },
          {
            term: "Maine",
            description:
              "If registering a formal complaint about a provider, visit: https://www.maine.gov/md/discipline/file-complaint.html",
          },
          {
            term: "New Hampshire",
            description:
              "The Mindspan PC provider may forward your medical records to your primary care or treating provider. (N.H. Rev. Stat. § 329:1-d).",
          },
          {
            term: "New Jersey",
            description:
              "You have the right to request a copy of your medical information. Your medical information may be forwarded to your primary care provider, healthcare provider of record, or, upon request, other healthcare providers. (N.J. Rev. Stat. Ann. § 45:1-62).",
          },
          {
            term: "Oklahoma",
            description:
              "If registering a formal complaint about a provider, visit: http://www.okmedicalboard.org/complaint.",
          },
          {
            term: "Rhode Island",
            description:
              "If using email or text-based technology to communicate with your Mindspan PC provider, you understand permitted transmission types and circumstances requiring alternate communication. You've discussed security measures (encryption, password-protected screen savers, reliable authentication techniques) and potential privacy risks.",
          },
          {
            term: "South Carolina",
            description:
              "Your medical records may be distributed per applicable law and regulation to other treating healthcare practitioners. (S.C. Code Ann. § 40-47-37).",
          },
          {
            term: "South Dakota",
            description:
              "You've received disclosures regarding RPM Services, RPM Technology, and limitations. (S.D. SB136 (not yet codified)).",
          },
          {
            term: "Texas",
            description:
              "Your medical records may be sent to your primary care physician. (Tex. Occ. Code Ann. § 111.005). Notice: Complaints about physicians and other Texas Medical Board licensees/registrants may be reported to: Texas Medical Board, Attention: Investigations, 333 Guadalupe, Tower 3, Suite 610, P.O. Box 2018, MC-263, Austin, Texas 78768-2018. Complaint filing assistance: 1-800-201-9353. More information: www.tmb.state.tx.us.",
          },
          {
            term: "Utah",
            description:
              "You understand (i) any additional Mindspan Services fees and payment methods; (ii) health information disclosure recipients and purposes, plus consent governing release to third parties; (iii) your patient health information rights; (iv) RPM Technology appropriate uses and limitations, including emergency health situations. Mindspan Services meet industry security and privacy standards and comply with referenced Utah regulations. You were warned of potential privacy risks despite security measures and that information may be lost due to technical failures; you agree to hold Provider harmless for such loss. You've been provided Mindspan PC's website location and contact information. You can (i) access, supplement, and amend patient-provided personal health information; (ii) obtain upon request an electronic or hard copy of your medical record documenting Telehealth Services, including this Consent; and (iii) request medical record transfer to another provider. (Utah Admin. Code r. 156-1-602).",
          },
          {
            term: "Virginia",
            description:
              "You've received details on security measures taken with RPM Technology use and potential privacy risks despite such measures. You agree to hold Mindspan PC harmless for information lost due to technical failures and provide express consent to forward patient-identifiable information to third parties. (Virginia Board of Medicine Guidance Document 85-12).",
          },
        ],
      },
    ],
  },
  {
    number: "11",
    heading: "Consent",
    blocks: [
      {
        kind: "p",
        text: "By accepting this Informed Consent, you confirm understanding and agreement to:",
      },
      {
        kind: "list",
        items: [
          "I give informed consent to Telehealth Technology use by Mindspan PC.",
          "I have read the above information and had opportunity to ask questions.",
          "I understand benefits and risks of receiving Mindspan Services via Telehealth Technology.",
          "I understand the provider may determine in sole discretion that my condition isn't suitable for Telehealth Technology treatment, requiring in-person medical care or alternative sources.",
          "I understand I may withhold or withdraw telehealth consent anytime by contacting Mindspan PC at legal@mindspan.co; otherwise, consent renews upon each new telehealth encounter.",
          "I understand Telehealth Technology may provide potential benefits, but no benefits or specific results are guaranteed.",
          "I understand my right to access health and wellness information from Mindspan Services delivered via telehealth per applicable laws and regulations.",
          "I agree and authorize Mindspan PC providers to release Mindspan Services information to Mindspan and affiliates.",
          "I authorize Mindspan PC to contact my healthcare professionals and obtain copies of useful medical records for treatment success. I acknowledge I can rescind this authorization anytime.",
        ],
      },
    ],
  },
];

export const informedConsentPage = {
  metadata: buildMetadata({
    title: "Informed Consent | Mindspan",
    description:
      "Informed consent for receiving telehealth dementia care services through Mindspan and affiliated practices.",
    canonical: "/informed-consent",
  }),
  hero: {
    eyebrow: "Legal",
    title: "Informed Consent",
    lead: "Last updated: May 7, 2025",
  },
  document: { intro, sections },
} as const;
