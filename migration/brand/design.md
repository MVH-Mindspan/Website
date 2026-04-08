# Design System

## Overview
Mindspan’s visual identity is rooted in a sense of modern, clinical compassion. The layout is high-density but clean, utilizing generous vertical spacing (padding-section-large) and a modular card-based structure. The tone is professional yet accessible, balancing high-tech cognitive science (digital twins, AI) with warm, family-oriented imagery. Motion is subtle, characterized by gentle fade-ins and vertical translations (opacity:0 to 1, translate3d(0, 15%, 0)) as the user scrolls. The design system uses a "Golden Ratio Optical Alignment System" (LiftKit) which governs font scaling and padding for a balanced, rhythmic feel.

## Colors
### Brand Palette
- **Primary (Deep Green)**: `#083630` — Used for main headings, footer backgrounds, and primary brand identity.
- **Secondary (Vibrant Orange)**: `#fb4d17` — Used for calls-to-action (CTAs) and secondary accents.
- **Primary Light**: `#1f514a` — Used for borders and softer dark surfaces.
- **Neutral Dark**: `#111111` — Deep black for text and high-contrast elements.

### Backgrounds & Neutrals
- **BG Primary (Light Cream/Grey)**: `#efeeeb` — Main section background.
- **BG Secondary (Soft Sand)**: `#dad6c9` — Alternate section and card background.
- **Soft White**: `#fffc` (approx. white with transparency).
- **Opaque White**: `#ffffff80`.
- **Border Primary**: `#efeff2`.

## Typography
Mindspan employs a sophisticated font hierarchy focused on legibility and authority.
- **Headings**: PT Serif (400, 700) — Used for large display titles (e.g., `.text-5xl`, `.text-6xl`) to convey a traditional medical and editorial feel. Sizing ranges from `2.5rem` to `3.5rem` with tight letter spacing (-0.03em).
- **Secondary Headings/Accents**: Bitter (400, 700, Italic) — Used for emphasis and specialized labels.
- **Body/UI**: Inter (300-700) — The primary workhorse for descriptions, button text, and navigation. Base body text is `1.0625rem` with a `1.47` line height. Small text (UI labels) is set at `.875rem`.

## Elevation
- **Shadows**: The system uses a multi-tier shadow system (`--shadow-sm` to `--shadow-2xl`). High elevation (`--shadow-xl`) is reserved for floating elements like the mobile navigation menu or specialized cards.
- **Cards**: Cards are primarily defined by borders (`1px solid #0000001a`) or slight background shifts rather than heavy drop shadows, maintaining a "flat-plus" aesthetic.
- **Layering**: Overlays and dropdowns use a blur effect (7.5px backdrop-filter) to provide depth without color clutter.

## Components
- **Primary Button**: Pill-shaped (`99rem` radius) with a transition scale effect (0.975 on hover). Features a dual-text "slide" effect (button-text is-first/is-second).
- **Pricing/Feature Cards**: Large blocks with heavy padding (`8rem`), rounded corners (`20px`), and internal bullet lists using custom SVG checkmarks.
- **Location Cards**: Dark-themed interactive cards (`loc-card-dark`) using Deep Green backgrounds and white text transitions.
- **Navbar**: A floating, rounded container (`border-radius: 1.25rem`) that collapses into a custom three-line hamburger menu on mobile.
- **Digital Twin Visuals**: High-resolution imagery with a characteristic blue/tech glow, often set within rounded wrappers or as parallax backgrounds.

## Do's and Don'ts
### Do's
- Use serif headings for major section titles to maintain a trustworthy medical tone.
- Maintain the "weeks, not months" messaging hierarchy by using the Secondary Orange for emphasis.
- Use the Golden Ratio scale for all padding and margin increments to ensure optical balance.
- Preserve the high-contrast Deep Green for footers to ground the page.

### Don'ts
- Do not use generic sans-serifs for main headings; it breaks the brand's editorial feel.
- Avoid sharp corners on buttons or containers; the system requires a minimum `0.75rem` radius or full pill-shape.
- Do not clutter the background with patterns; rely on clean neutral fills (Cream/Grey).

## Assets
- **Image**: [Arrow Right Icon](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/684a4e269c7239d01cb2677a_arrow%20right.svg) — contexts: img[src]
- **Background**: [Success Image 4](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/684a4e269c7239d01cb26790_success%20image%204.webp) — contexts: css url()
- **Background**: [Success Image 3](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/684a4e269c7239d01cb26791_success%20image%203.webp) — contexts: css url()
- **Background**: [404 Background](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/684a4e269c7239d01cb267cc_404%20background.svg) — contexts: css url()
- **Background**: [Scroll Card Img One](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/684a4e269c7239d01cb267d1_success%20-%20scroll%20card%20img%20one.webp) — contexts: css url()
- **Background**: [More Background](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/684a4e269c7239d01cb26826_more.webp) — contexts: css url()
- **Icon**: [Apple Touch Icon](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68632965e5399aeb3a4fb1bf_Webicon256.png) — contexts: link[rel="apple-touch-icon"]
- **Background**: [No Logo Image](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68633055ff42f4684ad08633_Create%20Image%20No%20Logo.png) — contexts: css url()
- **Image**: [Hero Image 1080p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68633237312d265c6fb56c78_hero2-p-1080.png) — contexts: img[srcset]
- **Image**: [Hero Image 500p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68633237312d265c6fb56c78_hero2-p-500.png) — contexts: img[srcset]
- **Image**: [Hero Image 800p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68633237312d265c6fb56c78_hero2-p-800.png) — contexts: img[srcset]
- **Image**: [Hero Image Main](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68633237312d265c6fb56c78_hero2.png) — contexts: img[src], img[srcset], css url()
- **Background**: [African American Illustration](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/6865d0a92dee646df2558d8a_Professionally%20Illustrated%20Middle%20Aged%20African%20American%20/(3/) — contexts: css url()
- **Background**: [Hero Woman Image](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/6865d199a6d0860977a11295_herowoman2.png) — contexts: css url()
- **Icon**: [Shortcut Icon](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/686dea90da79f51eae0a3c90_Webicon.png) — contexts: link[rel="shortcut icon"]
- **Image**: [OG Meta Image](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/689afdffe8152f62585ffc77_hero2424%201.png) — contexts: meta[og:image]
- **Image**: [Digital Brain Twin 1080p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/689bc2773239decea6983da3_Digital%20Brain%20Frontal%20View%201-p-1080.jpg) — Digital brain twin visualization showing personalized cognitive health model
- **Image**: [Digital Brain Twin 1600p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/689bc2773239decea6983da3_Digital%20Brain%20Frontal%20View%201-p-1600.jpg) — Digital brain twin visualization showing personalized cognitive health model
- **Image**: [Digital Brain Twin 2000p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/689bc2773239decea6983da3_Digital%20Brain%20Frontal%20View%201-p-2000.jpg) — Digital brain twin visualization showing personalized cognitive health model
- **Image**: [Digital Brain Twin 500p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/689bc2773239decea6983da3_Digital%20Brain%20Frontal%20View%201-p-500.jpg) — Digital brain twin visualization showing personalized cognitive health model
- **Image**: [Digital Brain Twin 800p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/689bc2773239decea6983da3_Digital%20Brain%20Frontal%20View%201-p-800.jpg) — Digital brain twin visualization showing personalized cognitive health model
- **Image**: [Digital Brain Twin Main](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/689bc2773239decea6983da3_Digital%20Brain%20Frontal%20View%201.jpg) — Digital brain twin visualization showing personalized cognitive health model
- **Image**: [Clinic Consultation 1080p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68afa5914f72678d3fb319fe_providerhero1-p-1080.png) — Family receiving cognitive health care consultation at Mindspan clinic
- **Image**: [Clinic Consultation 500p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68afa5914f72678d3fb319fe_providerhero1-p-500.png) — Family receiving cognitive health care consultation at Mindspan clinic
- **Image**: [Clinic Consultation 800p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68afa5914f72678d3fb319fe_providerhero1-p-800.png) — Family receiving cognitive health care consultation at Mindspan clinic
- **Image**: [Clinic Consultation Main](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68afa5914f72678d3fb319fe_providerhero1.png) — Family receiving cognitive health care consultation at Mindspan clinic
- **Background**: [Clinic Interior Image](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/68cb8540b9d3e6b0603e3bb6_c327bd3e-0ccc-4ba2-9373-2f57ccf7e9da.jpeg) — contexts: css url()
- **Background**: [Banana Pro Image](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/695f0fb60117ea93627e4032_Nano%20Banana%20Pro%20Image%20/(2/) — contexts: css url()
- **Image**: [Green Logo 1080p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/697687f93923a91a494caf9e_Logo%20green%402x-p-1080.png) — contexts: img[srcset]
- **Image**: [Green Logo 500p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/697687f93923a91a494caf9e_Logo%20green%402x-p-500.png) — contexts: img[srcset]
- **Image**: [Green Logo 800p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/697687f93923a91a494caf9e_Logo%20green%402x-p-800.png) — contexts: img[srcset]
- **Image**: [Green Logo Main](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/697687f93923a91a494caf9e_Logo%20green%402x.png) — contexts: img[src], img[srcset]
- **Image**: [White Logo Slogan 1080p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/6976883ba9e7ed6e5a320ec9_Mindspan%20logo%20with%20slogan%20white%402x-p-1080.png) — contexts: img[srcset]
- **Image**: [White Logo Slogan 500p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/6976883ba9e7ed6e5a320ec9_Mindspan%20logo%20with%20slogan%20white%402x-p-500.png) — contexts: img[srcset]
- **Image**: [White Logo Slogan 800p](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/6976883ba9e7ed6e5a320ec9_Mindspan%20logo%20with%20slogan%20white%402x-p-800.png) — contexts: img[srcset]
- **Image**: [White Logo Slogan Main](https://cdn.prod.website-files.com/684a4e269c7239d01cb2665e/6976883ba9e7ed6e5a320ec9_Mindspan%20logo%20with%20slogan%20white%402x.png) — contexts: img[src], img[srcset]
- **Background**: [Checkbox Checkmark](https://d3e54v103j8qbb.cloudfront.net/static/custom-checkbox-checkmark.589d534424.svg) — contexts: css url()
- **Embed**: [GTM Iframe](https://www.googletagmanager.com/ns.html?id=GTM-KCJ3RJL2) — contexts: iframe[src]