import { buildMetadata } from "@/lib/seo";
import type {
  LegalBlock,
  LegalSection,
} from "@/components/organisms/sections/LegalDocument";

const intro: LegalBlock[] = [
  {
    kind: "p",
    text: "These Terms of Service describe access and use of Mindspan's website, software, and digital platforms that provide dementia pre-screening services and related tools for users, caregivers, and care recipients.",
  },
];

const sections: LegalSection[] = [
  {
    number: "1",
    heading: "How we administer the service",
    subsections: [
      {
        number: "1.1",
        heading: "Eligibility",
        blocks: [
          {
            kind: "p",
            text: "Users must be able to form legally binding contracts and comply with applicable laws. Minors (under 18) may only access the Service with parental supervision and approval. Parents become subject to these Terms when permitting minor access.",
          },
        ],
      },
      {
        number: "1.2",
        heading: "User accounts",
        blocks: [
          {
            kind: "definitions",
            items: [
              {
                term: "(a) Your User Account",
                description:
                  "Accounts provide access to established services and functionalities. Users do not own accounts nor possess rights to data stored on Mindspan servers.",
              },
              {
                term: "(b) Care Recipient Accounts",
                description:
                  "Care recipients have individual accounts accessible by associated caregivers as permitted by law. These Terms bind both care recipients and caregivers.",
              },
              {
                term: "(c) Connecting Via Third-Party Services",
                description:
                  "Connecting through third-party services grants Mindspan permission to access and store login credentials and access tokens from those services.",
              },
              {
                term: "(d) Account Security",
                description:
                  'Users must provide accurate information, maintain password security, and not share credentials. "Mindspan will not be liable for...any losses caused by any unauthorized use" of accounts. Users must notify immediately of security breaches.',
              },
              {
                term: "(e) Account Settings",
                description:
                  "Users can control account aspects through device and settings pages. Providing email addresses constitutes consent for service-related notices and marketing communications. Users may opt out of marketing emails via unsubscribe links.",
              },
            ],
          },
        ],
      },
      {
        number: "1.3",
        heading: "The services",
        blocks: [
          {
            kind: "definitions",
            items: [
              {
                term: "(a) Access to Dementia Pre-Screening Services",
                description:
                  'Mindspan provides technology enabling access to dementia pre-screening tools. "Mindspan is not a healthcare provider, insurance provider, or a prescription fulfillment." The company\'s role is limited to preliminary results and referrals to third-party providers.',
              },
              {
                term: "(b) Changes, Suspension, and Termination",
                description:
                  'Users may deactivate accounts anytime. Mindspan may change, stop, or limit services without prior notice. The company may suspend or terminate accounts "without liability, with or without cause, and for any or no reason."',
              },
            ],
          },
        ],
      },
      {
        number: "1.4",
        heading: "Your interactions with other users",
        blocks: [
          {
            kind: "callout",
            text: "YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS, INCLUDING SHARING OF INFORMATION, WITH OTHER USERS.",
          },
          {
            kind: "p",
            text: "Users must ensure they have authorizations to share medical information. Mindspan disclaims all liability from user interactions.",
          },
        ],
      },
    ],
  },
  {
    number: "2",
    heading: "Not medical advice",
    blocks: [
      {
        kind: "callout",
        text: "MINDSPAN IS NOT A LICENSED HEALTHCARE PROVIDER AND MINDSPAN DOES NOT OFFER MEDICAL ADVICE UNDER THESE TERMS OR THE SERVICES.",
      },
      {
        kind: "p",
        text: "The Services do not constitute medical practice, healthcare services, diagnosis, or treatment. Content is for informational purposes only and doesn't guarantee accuracy or completeness.",
      },
      {
        kind: "callout",
        text: "THE USE OF THE SERVICES AND ANY OUTPUTS ARE NOT A SUBSTITUTE FOR MEDICAL ADVICE.",
      },
      {
        kind: "p",
        text: "Users should contact trained medical professionals for diagnosis and treatment. For medical emergencies, users should **CALL 911 OR VISIT THE NEAREST EMERGENCY ROOM IMMEDIATELY.**",
      },
      {
        kind: "p",
        text: '"MINDSPAN IS NOT A REFERRAL SERVICE AND DOES NOT REFER, RECOMMEND OR ENDORSE ANY PARTICULAR TEST, PROCEDURE, OPINION, OR OTHER INFORMATION." Users rely on content at their own risk and should independently confirm information with other sources.',
      },
    ],
  },
  {
    number: "3",
    heading: "Access to the services; services restrictions",
    subsections: [
      {
        number: "3.1",
        heading: "Access to the services",
        blocks: [
          {
            kind: "p",
            text: 'Users receive a "non-exclusive, limited, non-transferable, and freely revocable right to access and use the Services, solely for your personal use." Mindspan reserves all rights not expressly granted.',
          },
        ],
      },
      {
        number: "3.2",
        heading: "Restrictions and acceptable use",
        blocks: [
          { kind: "p", text: "Users may not:" },
          {
            kind: "list",
            items: [
              "(a) Disassemble, reverse engineer, decode, or decompile the Services",
              "(b) Use automated tools to access services in ways exceeding normal human usage",
              "(c) Use content for machine learning, artificial intelligence training, or natural person identification technologies",
              "(d) Buy, sell, or transfer API keys without prior written consent",
              "(e) Copy, rent, lease, sell, loan, transfer, assign, license, or sublicense any part of the Services or Mindspan's intellectual property",
              "(f) Use services in ways that impact server stability, service operation, or other applications' behavior",
              "(g) Impose unreasonable or disproportionately large loads on infrastructure",
              "(h) Use services in violation of applicable law, contractual obligations, or rights including intellectual property and privacy rights; fraudulently; deceptively; promoting hatred or violence; or objectionably",
              "(i) Use services in competition with Mindspan or to develop competing products",
              "(j) Access content through unauthorized means",
              "(k) Bypass access prevention or restriction measures",
              "(l) Interfere with, compromise, or decipher transmissions to/from servers",
              "(m) Use services to transmit spam, chain letters, or unsolicited email",
              "(n) Use services for commercial solicitation",
              "(o) Transmit invalid data, viruses, worms, or software agents",
              "(p) Impersonate others, misrepresent affiliations, hide identity, or engage in fraud",
              "(q) Collect or harvest personal information from users",
              "(r) Reference Mindspan in ways implying endorsement without prior written consent",
            ],
          },
        ],
      },
    ],
  },
  {
    number: "4",
    heading: "User grants, covenants, representations and warranties",
    subsections: [
      {
        number: "4.1",
        heading: "User content ownership",
        blocks: [
          {
            kind: "p",
            text: 'Users or their licensors own information, data, and content collected or submitted ("User Content").',
          },
        ],
      },
      {
        number: "4.2",
        heading: "User content license",
        blocks: [
          {
            kind: "p",
            text: 'Users grant Mindspan an "irrevocable, perpetual, transferable, sublicensable (through multiple tiers), fully paid, royalty-free, and worldwide right and license" to use, copy, store, modify, distribute, reproduce, publish, create derivative works of, and display User Content for maintaining services, improvement purposes, data analysis, and other business purposes.',
          },
        ],
      },
      {
        number: "4.3",
        heading: "User affirmations and warranties",
        blocks: [
          { kind: "p", text: "Users affirm they have:" },
          {
            kind: "list",
            items: [
              "(a) Written consent from all identifiable individuals mentioned in User Content",
              "(b) Obtained all legally required consents for third-party information",
              "(c) Ensured User Content doesn't violate law or infringe third-party rights",
              "(d) Verified User Content doesn't contain classified government information or violate confidentiality rights",
              "(e) Obtained all necessary rights to use User Content without liability for guild fees, residuals, or royalties",
              "(f) Not uploaded personal information of children under 13 or applicable digital consent age",
              "(g) Not included nudity, sexual content, hate speech, threats, abusive content, discriminatory material, violence, fake profiles, illegal content, malicious code, unauthorized personal information, spam, or objectionable content",
              "(h) Ensured User Content is truthful and accurate to their knowledge",
            ],
          },
        ],
      },
      {
        number: "4.4",
        heading: "Responsibility and liability",
        blocks: [
          {
            kind: "callout",
            text: "WE CLAIM NO OWNERSHIP RIGHTS OVER YOUR USER CONTENT. WE TAKE NO RESPONSIBILITY AND ASSUME NO LIABILITY FOR ANY USER CONTENT.",
          },
          {
            kind: "p",
            text: "Users bear sole responsibility for consequences of submitting, posting, displaying, sharing, or making User Content available through services.",
          },
        ],
      },
    ],
  },
  {
    number: "5",
    heading: "Intellectual property",
    subsections: [
      {
        number: "5.1",
        heading: "Intellectual property rights definition",
        blocks: [
          {
            kind: "p",
            text: "Intellectual Property Rights include patent rights, copyright, trademark, trade dress, moral rights, personality rights, trade secrets, and all other intellectual property rights and registrations under applicable law.",
          },
        ],
      },
      {
        number: "5.2",
        heading: "Mindspan intellectual property",
        blocks: [
          {
            kind: "p",
            text: 'Mindspan (or its licensors) owns all rights, title, and interest in services, displayed materials and content, software, algorithms, code, technology, and intellectual property underlying services (excluding User Content). "Nothing in these Terms will be deemed to create a license in or under any such Intellectual Property Rights," and users may not access, sell, license, rent, modify, distribute, copy, reproduce, transmit, display, perform, publish, adapt, edit, or create derivative works without express permission.',
          },
        ],
      },
      {
        number: "5.3",
        heading: "Output",
        blocks: [
          {
            kind: "callout",
            text: "USE OF THE SERVICES MAY RESULT IN INCORRECT OUTPUT OR CONTENT THAT DOES NOT ACCURATELY REFLECT REALITY.",
          },
          {
            kind: "p",
            text: 'Output may contain "hallucinations" and may be inaccurate, objectionable, or inappropriate. **WE SHALL NOT BE LIABLE FOR ANY DAMAGES...AS A RESULT OF OR RELATING TO ANY OUTPUT.**',
          },
        ],
      },
      {
        number: "5.4",
        heading: "Usage data",
        blocks: [
          {
            kind: "p",
            text: 'Mindspan collects diagnostic, technical, usage, and related information ("Usage Data"), which Mindspan owns exclusively. Users assign all rights to Usage Data to Mindspan. Mindspan may use Usage Data for providing services, improvement, monitoring, research, analytics, and sharing with third parties in de-identified or aggregated form.',
          },
        ],
      },
      {
        number: "5.5",
        heading: "Feedback",
        blocks: [
          {
            kind: "p",
            text: 'Users assign all rights in suggestions, recommendations, and feedback ("Feedback") to Mindspan. Mindspan may freely use Feedback for any purpose without attribution or compensation. Feedback is Mindspan\'s Confidential Information.',
          },
        ],
      },
    ],
  },
  {
    number: "6",
    heading: "Privacy; data security",
    subsections: [
      {
        number: "6.1",
        heading: "Privacy",
        blocks: [
          {
            kind: "p",
            text: "Users acknowledge Mindspan may collect, use, and disclose personal information and aggregated/anonymized data as described in the Privacy Notice, and that personal information may be transferred to and processed in the United States.",
          },
        ],
      },
      {
        number: "6.2",
        heading: "Security",
        blocks: [
          {
            kind: "p",
            text: "Mindspan cares about data integrity and security but cannot guarantee unauthorized parties won't defeat security measures or misuse data. Users acknowledge providing data at their own risk.",
          },
        ],
      },
    ],
  },
  {
    number: "7",
    heading: "Text messaging and calls",
    subsections: [
      {
        number: "7.1",
        heading: "General",
        blocks: [
          {
            kind: "p",
            text: "Providing telephone numbers constitutes consent to receive autodialed or prerecorded calls and text messages for account security, access assistance, account servicing, or Terms enforcement.",
          },
        ],
      },
      {
        number: "7.2",
        heading: "Consent to transactional messages",
        blocks: [
          {
            kind: "p",
            text: "Users expressly consent to Mindspan contacting them via written, electronic, or verbal means, including manual dialing, emails, prerecorded messages, or automatic dialing systems for completing transactions and servicing accounts, even if numbers are registered on Do-Not-Call registries. Message and data rates apply.",
          },
        ],
      },
      {
        number: "7.3",
        heading: "Consent to promotional messages",
        blocks: [
          {
            kind: "p",
            text: "Users may enroll to receive recurring SMS/text messages about account news, alerts, and promotional offers. Enrollment constitutes agreement to receive texts using automatic dialing systems. Message and data rates apply, and users are responsible for all charges.",
          },
        ],
      },
      {
        number: "7.4",
        heading: "Unsubscribing from promotional messages",
        blocks: [
          {
            kind: "p",
            text: 'Users may opt out by replying "STOP," "QUIT," "END," "CANCEL," or "UNSUBSCRIBE" to promotional texts. Users may receive one final confirmation text. Users may reply "HELP" for additional assistance.',
          },
        ],
      },
    ],
  },
  {
    number: "8",
    heading: "Additional terms for apps",
    subsections: [
      {
        number: "8.1",
        heading: "General",
        blocks: [
          {
            kind: "p",
            text: 'Mobile devices must be compatible with Apps. Users are responsible for data charges. Mindspan grants "a non-exclusive, limited, non-transferable, and freely revocable license to use a compiled code copy of the App(s) under your User Account on one (1) or more mobile devices" for personal use only.',
          },
          {
            kind: "p",
            text: "Users may not: modify, disassemble, decompile, or reverse engineer Apps (except as prohibited by law); rent, lease, loan, resell, sublicense, or distribute Apps; make copies; remove security features or restrictions; or delete copyright notices.",
          },
          {
            kind: "p",
            text: "Mindspan may automatically upgrade Apps, and users consent to such upgrades. Third-party code is covered by applicable open source licenses. Mindspan and third-party partners retain all rights.",
          },
        ],
      },
      {
        number: "8.2",
        heading: "iOS app",
        blocks: [
          {
            kind: "p",
            text: "iOS Apps acquired from Apple App Store are governed by Apple's terms, not Apple's responsibility. Apple provides no warranty or support and isn't responsible for failures to conform to warranty, product liability claims, regulatory compliance failures, or third-party infringement claims. Mindspan is solely responsible for infringement claims.",
          },
        ],
      },
      {
        number: "8.3",
        heading: "Android app",
        blocks: [
          {
            kind: "p",
            text: "Android Apps from Google Play Store are provided by Mindspan only. These Terms are between users and Mindspan, not Google. Users must comply with Google Play Terms of Service. Google is not responsible or liable regarding Android Apps.",
          },
        ],
      },
    ],
  },
  {
    number: "9",
    heading: "Your use of third-party services",
    blocks: [
      {
        kind: "p",
        text: "Services may contain links to third-party sites, materials, and services not controlled by Mindspan. Using third-party services requires compliance with third-party terms and conditions. Mindspan doesn't endorse or assume responsibility for third-party services.",
      },
      {
        kind: "p",
        text: 'Users access third-party services at their own risk. Mindspan terms and Privacy Notice don\'t apply to third-party services. "You expressly relieve us from any and all liability arising from your access to and/or use of any Third-Party Service." Users interact with third parties solely at their own risk. Mindspan isn\'t responsible for third-party losses or damages.',
      },
    ],
  },
  {
    number: "10",
    heading: "Release",
    blocks: [
      {
        kind: "p",
        text: "Users release Mindspan from all claims, damages, obligations, losses, liabilities, costs, debts, and expenses arising from disputes between users and third parties. Users waive any law preventing release of unknown claims.",
      },
    ],
  },
  {
    number: "11",
    heading: "Indemnity",
    blocks: [
      {
        kind: "p",
        text: "Users will defend, indemnify, and hold Mindspan, subsidiaries, affiliates, agents, suppliers, licensors, employees, contractors, officers, and directors harmless from claims, damages, obligations, losses, liabilities, costs, debts, and expenses (including legal fees) arising from:",
      },
      {
        kind: "list",
        items: [
          "(a) Access to or use of services, including Output use",
          "(b) Terms violations and representation/warranty breaches",
          "(c) Third-party right violations, including privacy and intellectual property rights",
          "(d) Applicable Law violations",
          "(e) User Content or account-submitted content, including misleading or inaccurate information",
          "(f) Willful misconduct",
          "(g) Third-party access using user credentials",
        ],
      },
    ],
  },
  {
    number: "12",
    heading: "No warranty; disclaimers",
    blocks: [
      {
        kind: "callout",
        text: 'THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.',
      },
      {
        kind: "p",
        text: 'Use is at user risk. **TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES...ARE PROVIDED WITHOUT WARRANTIES OF ANY KIND.**',
      },
      {
        kind: "p",
        text: "Mindspan doesn't warrant content accuracy, comprehensiveness, reliability, usefulness, or correctness; that services meet requirements; that services are available, uninterrupted, or secure; that defects will be corrected; or that services are virus-free.",
      },
      {
        kind: "callout",
        text: "ANY CONTENT DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICES IS SO OBTAINED AT YOUR OWN RISK.",
      },
      {
        kind: "p",
        text: "Users bear sole responsibility for system damage or data loss.",
      },
      {
        kind: "p",
        text: '**WITHOUT LIMITING THE FOREGOING IN THIS SECTION 12, YOU ACKNOWLEDGE THAT WE HAVE NO CONTROL OVER...WHICH USERS GAIN ACCESS TO THE SERVICES,** what users access, effects on users, user interpretation, or resulting user actions.',
      },
      {
        kind: "p",
        text: '"MINDSPAN DOES NOT WARRANT, ENDORSE, GUARANTEE, RECOMMEND, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY ANY THIRD PARTY." Mindspan won\'t monitor third-party transactions.',
      },
      {
        kind: "p",
        text: "Some jurisdictions don't allow exclusions of implied warranties or limitations on certain damages, so exclusions may not apply. Users have specific legal rights varying by jurisdiction.",
      },
    ],
  },
  {
    number: "13",
    heading: "Limitation of liability",
    blocks: [
      {
        kind: "callout",
        text: "YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISPUTE WITH US IS THE CANCELLATION OR TERMINATION OF YOUR ACCOUNT WITH US.",
      },
      {
        kind: "callout",
        text: "IN NO EVENT SHALL OUR OR ANY MINDSPAN INDEMNITEE'S CUMULATIVE LIABILITY TO YOU FOR ANY AND ALL CLAIMS...EXCEED ONE-HUNDRED ($100) DOLLARS.",
      },
      {
        kind: "p",
        text: "Liability limitations apply regardless of whether allegations are based on contract, tort, negligence, strict liability, or other bases, even if Mindspan was advised of damage possibilities.",
      },
      {
        kind: "callout",
        text: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL ANY MINDSPAN INDEMNITEE BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, including profits, goodwill, use, or data losses.",
      },
      {
        kind: "p",
        text: "Mindspan assumes no liability for: content errors, mistakes, or inaccuracies; personal injury or property damage; unauthorized access to servers or personal information; transmission interruptions or cessation; bugs, viruses, or Trojan horses; content errors or omissions; or third-party defamatory or illegal conduct.",
      },
      {
        kind: "p",
        text: "Some jurisdictions don't allow exclusions of incidental or consequential damages, so exclusions may not apply.",
      },
    ],
  },
  {
    number: "14",
    heading: "Governing law, arbitration, and class action/jury trial waiver",
    subsections: [
      {
        number: "14.1",
        heading: "Governing law",
        blocks: [
          {
            kind: "p",
            text: "Services are deemed based in Delaware. These Terms are governed by Delaware's internal substantive laws without applying conflict of laws principles. The Federal Arbitration Act governs the Arbitration Agreement interpretation and enforcement, preempting state laws.",
          },
          {
            kind: "p",
            text: "If FAA doesn't apply to Arbitration Agreement issues, applicable state law or mutually agreed jurisdiction governs. The UN Convention on Contracts for International Sale of Goods is excluded.",
          },
          {
            kind: "p",
            text: "Users submit to exclusive Delaware federal and state court jurisdiction for injunctive or equitable relief preventing actual or threatened infringement, misappropriation, or violation of Mindspan's data security, Confidential Information, or Intellectual Property Rights.",
          },
          {
            kind: "p",
            text: "Delaware is the proper forum for arbitration award appeals or proceedings if the Arbitration Agreement is unenforceable. These Terms were originally drafted in English, and English versions govern.",
          },
        ],
      },
      {
        number: "14.2",
        heading: "Arbitration agreement",
        blocks: [
          {
            kind: "definitions",
            items: [
              {
                term: "(a) General",
                description:
                  'The Arbitration Agreement applies to disputes arising from these Terms, service access or use, transactions through services, or other relationship aspects. "This Arbitration Agreement will apply...to all Claims that arose or were asserted before or after your consent to these Terms."',
              },
              {
                term: "(b) Opting Out of Arbitration Agreement",
                description:
                  "New users may opt out within thirty (30) days of accepting Terms by emailing legal@mindspan.co with full legal names and opting out intent. Opting out doesn't affect other Terms provisions.",
              },
              {
                term: "(c) Dispute-Resolution Process",
                description:
                  "Users first contact legal@mindspan.co to informally resolve claims. If unresolved after sixty (60) days, claims are exclusively resolved through binding arbitration by JAMS before a single arbitrator under JAMS Optional Expedited Arbitration Procedures.",
              },
              {
                term: "(d) Arbitration Logistics",
                description:
                  "Arbitration occurs in the user's U.S. county (if applicable) or Sussex County, Delaware, unless parties agree otherwise. For commercial users, each party pays JAMS fees and Arbitrator fees per Rules, and awards include arbitration costs, reasonable attorneys' fees, and reasonable witness costs.",
              },
              {
                term: "(e) Non-Commercial Users",
                description:
                  "For individuals using services non-commercially: JAMS may require initiation fees unless fee waivers are obtained; awards may include arbitration costs, reasonable attorneys' fees, and reasonable witness costs; and users may sue in small claims courts without prior arbitration, though informal dispute resolution still applies.",
              },
              {
                term: "(f) Arbitrator Authority",
                description:
                  "The Arbitrator has exclusive authority over disputes regarding Arbitration Agreement scope, interpretation, applicability, enforceability, formation, and any unconscionability or illusory provision claims. The Arbitrator determines threshold arbitrability issues and defenses.",
              },
              {
                term: "(g) Equitable Relief",
                description:
                  "Nothing prevents Mindspan from seeking injunctive or equitable relief for data security, Confidential Information, or Intellectual Property Rights violations, or users from asserting small claims court claims on individual bases only.",
              },
              {
                term: "(h) Severability",
                description:
                  "If Arbitration Agreement provisions are voided, unenforceable, or unlawful, those provisions sever without impacting remaining provisions, which remain in force. If the Class Action/Jury Trial Waiver is voided because preventing public injunctive relief claims, those claims sever from arbitration and may be litigated civilly. Other claims remain subject to arbitration.",
              },
            ],
          },
        ],
      },
      {
        number: "14.3",
        heading: "Class action/jury trial waiver",
        blocks: [
          {
            kind: "callout",
            text: "BY ENTERING INTO THESE TERMS, YOU AND MINDSPAN ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO BRING, JOIN, OR PARTICIPATE IN ANY PURPORTED CLASS ACTION, COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR OTHER REPRESENTATIVE PROCEEDING.",
          },
          {
            kind: "p",
            text: "This applies to all users regardless of personal, commercial, or other use purposes. The Class Action/Jury Trial Waiver applies to class arbitration. Unless otherwise agreed, arbitrators cannot consolidate claims from multiple persons or entities. Arbitrators may award relief only to individual claimants on individual claims, not affecting other users.",
          },
        ],
      },
    ],
  },
  {
    number: "15",
    heading: "U.S. government restricted rights",
    blocks: [
      {
        kind: "p",
        text: "Services used by or on behalf of the U.S. Government are deemed commercial computer software or documentation. Government agencies and contractors receive only rights granted to all users under 48 C.F.R. §227.7202 and 48 C.F.R. §12.212.",
      },
    ],
  },
  {
    number: "16",
    heading: "Export controls",
    blocks: [
      {
        kind: "p",
        text: "Users understand services may be subject to export control laws. Users comply with all applicable import, export, re-export control, trade, economic sanctions laws, including Export Administration Regulations, OFAC sanctions, and International Traffic in Arms Regulations.",
      },
      {
        kind: "p",
        text: "Users represent and warrant they're not listed on the OFAC Specially Designated Nationals list or sanctioned parties lists, and aren't located in, nationals of, or residents of sanctioned countries or terrorist-supporting regions.",
      },
    ],
  },
  {
    number: "17",
    heading: "General provisions",
    subsections: [
      {
        number: "17.1",
        heading: "Assignment",
        blocks: [
          {
            kind: "p",
            text: "Users may not transfer or assign Terms or granted rights and licenses without prior express written consent. Mindspan may assign without restriction. Unauthorized transfers or assignments are void.",
          },
        ],
      },
      {
        number: "17.2",
        heading: "Notification procedures and changes to these terms",
        blocks: [
          {
            kind: "p",
            text: "Mindspan may provide notifications via email, written notice, or service postings. Mindspan determines notification forms, though users may opt out as required by law. Mindspan isn't responsible for automatic email filtering.",
          },
          {
            kind: "p",
            text: "Mindspan may modify or update Terms anytime. Users should review periodically. When Terms change materially, the last modification date updates and users are notified. Terms apply to service access effective as of access start, even if before publication. Continued service use after changes constitutes acceptance.",
          },
          {
            kind: "p",
            text: "Users not accepting Terms changes may not access or use services.",
          },
        ],
      },
      {
        number: "17.3",
        heading: "Entire agreement; severability",
        blocks: [
          {
            kind: "p",
            text: "These Terms, together with amendments and additional agreements, constitute the entire agreement concerning services. Statements from employees or representatives are excluded. Except as stated in the Arbitration Agreement, if provisions are deemed invalid, invalidity doesn't affect remaining provisions' validity, which remain in full force.",
          },
        ],
      },
      {
        number: "17.4",
        heading: "No waiver",
        blocks: [
          {
            kind: "p",
            text: "No waiver of Terms terms constitutes further waiver. Failure to assert rights doesn't constitute waiver.",
          },
        ],
      },
      {
        number: "17.5",
        heading: "California residents",
        blocks: [
          {
            kind: "p",
            text: "Per Cal. Civ. Code §1789.3, California residents may report complaints to the Complaint Assistance Unit, Division of Consumer Services, California Department of Consumer Affairs, 1625 North Market Blvd., Suite N 112 Sacramento, CA 95834, (800) 952-5210, or (916) 445-1254.",
          },
        ],
      },
      {
        number: "17.6",
        heading: "Contact",
        blocks: [
          {
            kind: "p",
            text: "For questions about Terms or services, contact legal@mindspan.co.",
          },
        ],
      },
    ],
  },
];

export const tosPage = {
  metadata: buildMetadata({
    title: "Terms of Service | Mindspan",
    description:
      "The terms governing your use of the Mindspan website, software, and digital platforms.",
    canonical: "/tos",
  }),
  hero: {
    eyebrow: "Legal",
    title: "Terms of Service",
    lead: "Last updated: May 7, 2025",
  },
  document: { intro, sections },
} as const;
