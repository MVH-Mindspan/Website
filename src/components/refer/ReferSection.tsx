"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { Reveal } from "@/components/molecules/Reveal";
import { ReferForm } from "./ReferForm";

type AltAction = { label: string; value: string; href: string | null };

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  form: {
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    privacy: string;
  };
  alt: {
    title: string;
    phone: AltAction;
    fax: AltAction;
    email: AltAction;
  };
};

export function ReferSection({ eyebrow, title, lead, form, alt }: Props) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section
      style={{
        background: c.cream,
        paddingTop: "max(120px, 14vh)",
        paddingBottom: "72px",
      }}
    >
      <Container>
        <Reveal style={{ maxWidth: "44rem" }}>
          <Eyebrow color={c.accentText}>{eyebrow}</Eyebrow>
          <Heading
            as="h1"
            variant="h2"
            fontFamily={theme.fonts.heading}
            color={c.ink}
            className="mt-4"
          >
            {title}
          </Heading>
          <Lead size="md" color={alpha(c.ink, 0.7)} className="mt-3" maxWidth="56ch">
            {lead}
          </Lead>
        </Reveal>

        <div className="refer-grid" style={{ marginTop: 32 }}>
          <Reveal className="refer-form-col">
            <ReferForm copy={form} />
          </Reveal>

          <Reveal className="refer-aside-col" delay={1}>
            <aside
              style={{
                position: "sticky",
                top: 96,
                background: alpha(c.brandGreen, 0.04),
                border: `1px solid ${alpha(c.brandGreen, 0.12)}`,
                borderRadius: "1.25rem",
                padding: "28px",
              }}
            >
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.micro,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: c.brandGreen,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {alt.title}
              </p>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: typeScale.bodySm,
                  color: alpha(c.ink, 0.7),
                  lineHeight: 1.55,
                  marginBottom: 20,
                }}
              >
                Many practices send referrals by phone or secure fax. We accept either.
              </p>

              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                }}
              >
                <AltRow {...alt.phone} icon={<PhoneIcon />} />
                <AltRow {...alt.fax} icon={<FaxIcon />} />
                <AltRow {...alt.email} icon={<MailIcon />} />
              </ul>

            </aside>
          </Reveal>
        </div>
      </Container>

      <style jsx>{`
        .refer-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.8fr) minmax(280px, 360px);
          gap: 56px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .refer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}

function AltRow({
  label,
  value,
  href,
  icon,
}: AltAction & { icon: React.ReactNode }) {
  const { theme } = useTheme();
  const c = theme.colors;

  const inner = (
    <>
      <span
        aria-hidden
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: alpha(c.brandGreen, 0.08),
          color: c.brandGreen,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.micro,
            color: alpha(c.ink, 0.6),
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.body,
            color: c.ink,
            fontWeight: 600,
            letterSpacing: "-0.005em",
          }}
        >
          {value}
        </span>
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            textDecoration: "none",
            padding: "8px 0",
          }}
        >
          {inner}
        </a>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0" }}>
          {inner}
        </div>
      )}
    </li>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 2.5h2.4l1.2 3-1.6 1a8 8 0 0 0 4.5 4.5l1-1.6 3 1.2V13a.5.5 0 0 1-.5.5A11 11 0 0 1 2.5 3a.5.5 0 0 1 .5-.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FaxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 5V2h8v3M3 5h10a1 1 0 0 1 1 1v5H2V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M5 11h6v3H5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect
        x="2"
        y="3.5"
        width="12"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
