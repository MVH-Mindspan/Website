import { buildMetadata } from "@/lib/seo";
import type {
  LegalBlock,
  LegalSection,
} from "@/components/organisms/sections/LegalDocument";

const intro: LegalBlock[] = [
  {
    kind: "p",
    text: 'Welcome! We are Mindspan, a provider of dementia care services for seniors, their families, and caregivers. This Privacy Notice explains how Mindspan Group, Inc. and its affiliated health care practices and health care providers ("Mindspan", "Company", "we", "us" or "our") collect, use, disclose, and otherwise process personal information in connection with our websites (the "Sites") and other websites we own and operate that link to this Privacy Notice, and the related content, platform, services, products, and other functionality offered on or through our services (collectively, the "Services").',
  },
];

const sections: LegalSection[] = [
  {
    number: "1",
    heading: "What is personal information?",
    blocks: [
      {
        kind: "p",
        text: 'When we use the term "personal information" in this Privacy Notice, we mean any data or information that identifies, relates to, describes, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular natural person or household or any other data or information that constitutes "personal data," "personal information," or "personally identifiable information." Personal information, however, does not include Protected Health Information.',
      },
      {
        kind: "p",
        text: "This Privacy Notice does not address our privacy practices relating to Mindspan job applicants, employees, and other personnel.",
      },
    ],
  },
  {
    number: "2",
    heading: "Our collection and use of personal information",
    blocks: [
      {
        kind: "p",
        text: "We collect personal information in a variety of ways. For example, you may provide us your personal information when you register for an account, send us messages, subscribe to our mailing lists, newsletters or other forms of marketing communications, or use some other feature of our Service.",
      },
      {
        kind: "p",
        text: "We may link or combine your activities and information collected from you on our websites and mobile apps with information we receive from third parties, as well as information we collect automatically through tracking technologies (defined below). This allows us to provide you with a personalized experience regardless of how you interact with us.",
      },
    ],
    subsections: [
      {
        heading: "Personal information collected from you",
        blocks: [
          {
            kind: "p",
            text: "We may collect the following categories of personal information submitted to us by individuals through the Services:",
          },
          {
            kind: "definitions",
            items: [
              {
                term: "Contact information",
                description:
                  "Including first and last name, email address, phone number, and your zip code. We use this information to fulfill your request or transaction, to communicate with you directly, and to send you marketing communications in accordance with your preferences.",
              },
              {
                term: "Account information",
                description:
                  "Including first and last name, email address, phone number, zip code, and any other information you provide to us. We use this information to administer your account, provide you with the relevant service and information, communicate with you regarding your account and your use of the Service, and for customer support purposes.",
              },
              {
                term: "Inquiry and communications information",
                description:
                  "Including your full name, email address, phone number, zip code, provider information, insurance information, and information provided in custom messages sent through the forms, to one of our email addresses, or via phone. We use this information to investigate and respond to your inquiries, and to communicate with you, to enhance the services we offer to our users and to manage and grow our organization.",
              },
              {
                term: "Newsletter and marketing emails",
                description:
                  'Including your name, date of birth, email address, phone number, current city, and applicable interests and communication preferences. We use this information to manage our communications with you and send you information about products and services we think may be of interest to you. If you wish to stop receiving email messages from us, simply click the "unsubscribe link" provided at the bottom of the email communication. Note that you cannot unsubscribe from certain services-related email communications (e.g., account verification, confirmations of transactions, technical or legal notices).',
              },
            ],
          },
          {
            kind: "p",
            text: "If you choose to contact us, we may need additional information to fulfill the request or respond to your inquiry. We may provide additional privacy disclosures where the scope of the request we receive or personal data we require fall outside the scope of this Privacy Notice. In that case, the additional privacy disclosures will govern how we may process the information you provide at that time.",
          },
        ],
      },
      {
        heading: "Personal information automatically collected",
        blocks: [
          {
            kind: "p",
            text: "We and our third-party partners may automatically collect information you provide to us and information about how you access and use our products and services when you engage with us. We typically collect this information through the use of a variety of our own and our third-party partners' automatic data collection technologies, including (i) cookies or small data files that are stored on an individual's computer and (ii) other, related technologies, such as web beacons, pixels, embedded scripts, mobile SDKs, location-identifying technologies and logging technologies. Information we collect automatically about you may be combined with other personal information we collect directly from you or receive from other sources.",
          },
          {
            kind: "p",
            text: "We, and our third-party partners, use automatic data collection technologies to automatically collect the following data when you use our services or otherwise engage with us:",
          },
          {
            kind: "definitions",
            items: [
              {
                term: "Information about your device and network",
                description:
                  "Including the device type, manufacturer, and model, operating system, IP address, browser type, Internet service provider, and unique identifiers associated with you, your device, or your network (including, for example, a persistent device identifier or advertising ID). We employ third-party technologies designed to allow us to recognize when two or more devices are likely being used by the same individual and may leverage these technologies (where permitted) to link information collected from different devices.",
              },
              {
                term: "Information about the way individuals use our services and interact with us",
                description:
                  "Including the site from which you came, the site to which you are going when you leave our services, how frequently you access our services, whether you open emails or click the links contained in emails, whether you access our services from multiple devices, and other browsing behavior and actions you take on our services (such as the pages you visit, the content you view, videos you watch, the communications you have through our services, and the content, links and ads you interact with). We employ third-party technologies designed to allow us to collect detailed information about browsing behavior and actions that you take on our services, which may record your mouse movements, scrolling, clicks, and keystroke activity on our services and other browsing, search or purchasing behavior. These third-party technologies may also record information you enter when you interact with our products or services, or engage in chat features or other communication platforms we provide.",
              },
              {
                term: "Information about your location",
                description:
                  "Including general geographic location that we or our third-party providers may derive from your IP address.",
              },
            ],
          },
          {
            kind: "p",
            text: "The information collected automatically through these tools allows us to improve your customer experience. For example, we may use this information to enhance and personalize your user experience, to monitor and improve our products and services, to offer communications features such as live and automated chat, and to improve the effectiveness of our products, services, offers, advertising, communications and customer service. We may also use this information to: (a) remember information so that you will not have to re-enter it during your visit or the next time you visit the site; (b) provide custom, personalized content and information, including targeted content and advertising; (c) identify you across multiple devices; (d) provide and monitor the effectiveness of our services; (e) monitor aggregate metrics such as total number of visitors, traffic, usage, and demographic patterns on our website; (f) diagnose or fix technology problems; and (g) otherwise to plan for and enhance our products and services.",
          },
          {
            kind: "p",
            text: "For information about the choices you may have in relation to our use of automatic data collection technologies, please refer to the Your Privacy Choices section below.",
          },
        ],
      },
      {
        heading: "Personal information from third parties",
        blocks: [
          {
            kind: "p",
            text: "We also obtain personal information from third parties; which we often combine with personal information we collect either automatically or directly from an individual.",
          },
          {
            kind: "p",
            text: "We may receive the same categories of personal information as described above from the following third parties:",
          },
          {
            kind: "definitions",
            items: [
              {
                term: "Mindspan Entities",
                description:
                  "We may receive personal information from other companies and brands owned or controlled by Mindspan, and other companies owned by or under common ownership as Mindspan.",
              },
              {
                term: "Service Providers",
                description:
                  "Our service providers that perform services solely on our behalf, such as survey and marketing providers and payment processors, collect personal information and often share some or all of this information with us. The information may include contact information, demographic information, payment information, information about your communications and related activities, and information about your orders. We may use this information to administer and facilitate our services, your orders, and our marketing activities.",
              },
              {
                term: "Business Partners",
                description:
                  "We may receive your information from our business partners, such as companies that offer their products and/or services on our Services. We may use this information to administer and facilitate our services, your orders, and our marketing activities.",
              },
              {
                term: "Other Sources",
                description:
                  "We may also collect personal data about you from other sources, including publicly available sources, third-party data providers, brand partnerships, or through transactions such as mergers and acquisitions.",
              },
            ],
          },
          {
            kind: "p",
            text: "Through the provision of our Services, we may also process deidentified information that cannot reasonably be used to infer information about, or otherwise be linked to, a particular consumer.",
          },
        ],
      },
      {
        heading: "Additional uses of personal information",
        blocks: [
          {
            kind: "p",
            text: "We may use personal information we collect to:",
          },
          {
            kind: "list",
            items: [
              "Fulfill or meet the reason the information was provided, such as to fulfill our contractual obligations, to deliver the Services you have requested and to process transactions;",
              "Verify your identity and entitlement to products or Services, when you contact us or access our Services;",
              "Communicate with individuals, including via email and telephone;",
              "Send you technical notices, security alerts, and support and administrative messages and to respond to your comments, questions, and customer service requests;",
              "For marketing and advertising purposes, including to market to you or offer you through email, information and updates on products or services we think that you may be interested in;",
              "Administer, improve and personalize our Services, including by recognizing an individual and remembering their information when they return to our Services;",
              "Facilitate customer benefits and services, including customer support;",
              "Identify and analyze how individuals use our Services;",
              "Conduct research and analytics on our customer and user base and our Services;",
              "Improve and customize our Services to address the needs and interests of our user base and other individuals we interact with;",
              "Test, enhance, update and monitor the Services, or diagnose or fix technology problems;",
              "Help maintain the safety, security and integrity of our property and Services, technology assets and business;",
              "To enforce our Terms of Service, to resolve disputes, to carry out our obligations and enforce our rights, and to protect our business interests and the interests and rights of third parties;",
              "Prevent, investigate or provide notice of fraud or unlawful or criminal activity;",
              "Comply with contractual and legal obligations and requirements;",
              "To fulfill any other purpose for which you provide personal information; and",
              "For any other lawful purpose, or other purpose that you consent to.",
            ],
          },
        ],
      },
    ],
  },
  {
    number: "3",
    heading: "Our disclosure of personal information",
    blocks: [
      {
        kind: "p",
        text: "We may also share, transmit, disclose, grant access to, make available, and provide personal information with and to third parties, as follows:",
      },
      {
        kind: "definitions",
        items: [
          {
            term: "Mindspan Entities",
            description:
              "We may share personal information with other companies owned or controlled by Mindspan, and other companies owned by or under common ownership as Mindspan, which also includes our subsidiaries (i.e., any organization we own or control) or our ultimate holding company (i.e., any organization that owns or controls us) and any subsidiaries it owns, particularly when we collaborate in providing the Services.",
          },
          {
            term: "Other Service Providers",
            description:
              "In addition to the third parties identified above, we engage other third-party service providers that perform business or operational services for us or on our behalf, such as website hosting, infrastructure provisioning, IT services, analytics services, payment processing services, and administrative services.",
          },
          {
            term: "Ad Networks and Advertising Partners",
            description:
              "We work with third-party ad networks and advertising partners to deliver advertising and personalized content on our Services, on other websites and services, and across other devices. These parties may collect information directly from a browser or device when an individual visits our Services through cookies or other data collection technologies. This information is used to provide and inform targeted advertising, as well as to provide advertising-related services such as reporting, attribution, analytics and market research.",
          },
          {
            term: "Business Partners",
            description:
              "From time to time, we may share personal data with our business partners, or we may allow our business partners to collect your personal information. Our business partners will use your information for their own business and commercial purposes, including to send you any information about their products or services that we believe will be of interest to you.",
          },
          {
            term: "Business Transaction or Reorganization",
            description:
              "We may take part in or be involved with a corporate business transaction, such as a merger, acquisition, joint venture, or financing or sale of company assets. We may disclose personal information to a third party during negotiation of, in connection with or as an asset in such a corporate business transaction. Personal information may also be disclosed in the event of insolvency, bankruptcy or receivership.",
          },
          {
            term: "Legal Obligations and Rights",
            description:
              "We may disclose personal information to third parties, such as legal advisors and law enforcement: in connection with the establishment, exercise, or defense of legal claims; to comply with laws or to respond to lawful requests and legal process; to protect our rights and property and the rights and property of others, including to enforce our agreements and policies; to detect, suppress, or prevent fraud; to protect the health and safety of us and others; or as otherwise required by applicable law.",
          },
          {
            term: "With Your Consent",
            description:
              "We may disclose personal information about an individual to certain other third parties or publicly with their consent or direction. For example, with an individual's consent or direction we may post their testimonial on our Sites or service-related publications.",
          },
        ],
      },
    ],
  },
  {
    number: "4",
    heading: "Your privacy choices",
    blocks: [
      {
        kind: "p",
        text: "The following privacy choices are made available to all individuals with whom we interact.",
      },
    ],
    subsections: [
      {
        heading: "Communication preferences",
        blocks: [
          {
            kind: "definitions",
            items: [
              {
                term: "Email communication preferences",
                description:
                  'You can stop receiving promotional email communications from us by clicking on the "unsubscribe" link provided in such communications. You may not opt-out of service-related communications (e.g., account verification, transactional communications, changes/updates to features of the Services, technical and security notices).',
              },
              {
                term: "Phone communication preferences",
                description:
                  "You can stop receiving promotional phone communications from us by informing the caller you no longer wish to receive promotional phone calls from us, following the instructions provided on the call for opting out of promotional phone calls (where available), or replying STOP to any one of our promotional text messages. Please note we may need to continue to communicate with you via phone for certain service-related messages (such as, sending a verification code to your phone via call or text for purposes of verifying the authenticity of a log-in attempt).",
              },
            ],
          },
        ],
      },
      {
        heading: "Automatic data collection preferences",
        blocks: [
          {
            kind: "p",
            text: "You may be able to utilize third-party tools and features to further restrict our use of automatic data collection technologies. For example, (i) most browsers allow you to change browser settings to limit automatic data collection technologies on websites, (ii) most email providers allow you to prevent the automatic downloading of images in emails that may contain automatic data collection technologies, and (iii) many devices allow you to change your device settings to limit automatic data collection technologies for device applications. Please note that blocking automatic data collection technologies through third-party tools and features may negatively impact your experience using our services, as some features and offerings may not work properly or at all. Depending on the third-party tool or feature you use, you may not be able to block all automatic data collection technologies or you may need to update your preferences on multiple devices or browsers. We do not have any control over these third-party tools and features and are not responsible if they do not function as intended.",
          },
        ],
      },
      {
        heading: "Targeted advertising preferences",
        blocks: [
          {
            kind: "p",
            text: "We engage third parties to help us facilitate targeted advertising designed to show you personalized ads based on predictions of your preferences and interests developed using personal data we maintain and personal data our third-party partners obtain from your activity over time and across nonaffiliated websites and other services. The data we and our third-party partners use for purposes of facilitating targeted advertising, as well as to provide advertising-related services such as reporting, attribution, analytics, and market research, are primarily collected through the use of a variety of automatic data collection technologies, including cookies, web beacons, pixels, embedded scripts, mobile SDKs, location-identifying technologies and logging technologies. We may share a common account identifier (such as a hashed email address or user ID) with our third-party advertising partners to help link the personal data we and our third-party partners collect to the same person, or otherwise target advertising to an individual on a third-party website or platform.",
          },
          {
            kind: "p",
            text: "In addition to taking the steps set forth in the Automatic Data Collection Preferences section above, you may be able to further exercise control over the advertisements that you see by leveraging one or more targeted advertising opt-out programs. For example:",
          },
          {
            kind: "definitions",
            items: [
              {
                term: "Device-Specific Opt-Out Programs",
                description:
                  "Certain devices provide individuals the option to turn off targeted advertising for the entire device (such as Apple devices through their App Tracking Transparency framework or Android devices through their opt out of ads personalization feature). Please refer to your device manufacturer's user guides for additional information about implementing any available device-specific targeted advertising opt-outs.",
              },
              {
                term: "Digital Advertising Alliance",
                description:
                  "The Digital Advertising Alliance allows individuals to opt out of receiving online interest-based targeted advertisements from companies that participate in their program. Please follow the instructions at https://www.optout.aboutads.info/?c=2&lang=EN for browser-based advertising and https://www.youradchoices.com/appchoices for app-based advertising to opt out of targeted advertising carried out by our third-party partners and other third parties that participate in the Digital Advertising Alliance's self-regulatory program.",
              },
              {
                term: "Network Advertising Initiative",
                description:
                  "The Network Advertising Initiative similarly allows individuals to opt out of receiving online interest-based targeted advertisements from companies that participate in their program. Please follow the instructions at https://www.optout.networkadvertising.org/?c=1 to opt out of browser-based targeted advertising carried out by our third-party partners and other third parties that participate in the Network Advertising Initiative's self-regulatory program.",
              },
              {
                term: "Platform-Specific Opt-Out Programs",
                description:
                  "Certain third-party platforms provide individuals the option to turn off targeted advertising for the entire platform (such as certain social media platforms). Please refer to your platform provider's user guides for additional information about implementing any available platform-specific targeted advertising opt-outs.",
              },
            ],
          },
          {
            kind: "p",
            text: "Please note that when you opt out of receiving interest-based advertisements through one of these programs, this does not mean you will no longer see advertisements from us or on our services. Instead, it means that the online ads you do see from relevant program participants should not be based on your interests. We are not responsible for the effectiveness of, or compliance with, any third parties' opt-out options or programs or the accuracy of their statements regarding their programs. In addition, program participants may still use automatic data collection technologies to collect information about your use of our services, including for analytics and fraud prevention as well as any other purpose permitted under the applicable advertising industry program.",
          },
        ],
      },
      {
        heading: "Modifying or deleting your personal information",
        blocks: [
          {
            kind: "p",
            text: "If you have any questions about reviewing, modifying, or deleting your information, you can contact us directly at privacy@mindspan.co. We may not be able to modify or delete your information in all circumstances.",
          },
        ],
      },
      {
        heading: "Partner-specific preferences",
        blocks: [
          {
            kind: "p",
            text: "Certain of our third-party providers and partners offer additional ways that you may exercise control over your personal data, or automatically impose limitations on the way we can use personal data in connection with the services they provide:",
          },
          {
            kind: "definitions",
            items: [
              {
                term: "Device-Specific / Platform-Specific Preferences",
                description:
                  "The device and/or platform you use to interact with us (such as your mobile device or social media provider), may provide you additional choices with regard to the data you choose to share with us. For example, many mobile devices allow you to change your device permissions to prevent our products and services from accessing certain types of information from your device (such as your contact lists or precise geolocation data), and many social media platforms allow you to change your platform permissions to prevent integrated products and services from accessing certain types of information connected with your profile. Please refer to your device or platform provider's user guides for additional information about implementing any available platform-specific targeted advertising opt-outs.",
              },
              {
                term: "Google Analytics",
                description:
                  "Google Analytics allows us to better understand how our customers interact with our services. For information on how Google Analytics collects and processes data, as well as how you can control information sent to Google, review Google's website here: www.google.com/policies/privacy/partners/. You can learn about Google Analytics' currently available opt-outs, including the Google Analytics Browser Add-On here: https://tools.google.com/dlpage/gaoptout/. We may also utilize certain forms of display advertising and other advanced features through Google Analytics. These features enable us to use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the DoubleClick advertising cookie) or other third-party cookies together to inform, optimize, and display ads based on your past visits to our services. You may control your advertising preferences or opt-out of certain Google advertising products by visiting the Google Ads Preferences Manager, currently available at https://www.adssettings.google.com/anonymous?ref=ps-tech&hl=en.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    number: "5",
    heading: "Children's personal information",
    blocks: [
      {
        kind: "p",
        text: "Our Services are not directed to, and we do not intend to, or knowingly, collect or solicit personal information from children under the age of 13. If an individual is under the age of 13, they should not use our Services or otherwise provide us with any personal information either directly or by other means. If a child under the age of 13 has provided personal information to us, we encourage the child's parent or guardian to contact us to request that we remove the personal information from our systems. If we learn that any personal information we collect has been provided by a child under the age of 13, we will promptly delete that personal information.",
      },
    ],
  },
  {
    number: "6",
    heading: "Links to third-party websites or services",
    blocks: [
      {
        kind: "p",
        text: "Our Services may include links to third-party websites, plug-ins and applications. Except where we post, link to or expressly adopt or refer to this Privacy Notice, this Privacy Notice does not apply to, and we are not responsible for, any personal information practices of third-party websites and online services or the practices of other third parties. To learn about the personal information practices of third parties, please visit their respective privacy notices.",
      },
    ],
  },
  {
    number: "7",
    heading: "Updates to this privacy notice",
    blocks: [
      {
        kind: "p",
        text: 'We may update this Privacy Notice from time to time. When we make changes to this Privacy Notice, we will change the "Last Updated" date at the beginning of this Privacy Notice. All changes shall be effective from the date of publication unless otherwise provided.',
      },
    ],
  },
  {
    number: "8",
    heading: "Contact us",
    blocks: [
      {
        kind: "p",
        text: "If you have any questions or requests in connection with this Privacy Notice or other privacy-related matters, please send an email to privacy@mindspan.co.",
      },
    ],
  },
];

export const privacyNoticePage = {
  metadata: buildMetadata({
    title: "Privacy Notice | Mindspan",
    description:
      "How Mindspan collects, uses, discloses, and protects personal information across our websites and services.",
    canonical: "/privacy-notice",
  }),
  hero: {
    eyebrow: "Legal",
    title: "Privacy Notice",
    lead: "Last updated: May 7, 2025",
  },
  document: { intro, sections },
} as const;
