"use client";

import { useCallback, useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { Field } from "@/components/molecules/Field";
import { Reveal } from "@/components/molecules/Reveal";
import { ReferForm } from "./ReferForm";

type AltAction = { label: string; value: string; href: string | null };

type Contact = { value: string; href: string | null };

type ReferLocation = {
  id: string;
  label: string;
  phone: Contact;
  fax: Contact;
  hours: string;
};

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
    promptNoLocation: string;
    email: AltAction;
  };
  locations: ReadonlyArray<ReferLocation>;
  defaultLocationId?: string;
};

export function ReferSection({
  eyebrow,
  title,
  lead,
  form,
  alt,
  locations,
  defaultLocationId = "",
}: Props) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [locationId, setLocationId] = useState(defaultLocationId);
  const [locationError, setLocationError] = useState<string | undefined>();
  const selectedLocation = locations.find((l) => l.id === locationId);

  const handleLocationChange = useCallback((id: string) => {
    setLocationId(id);
    setLocationError(undefined);
  }, []);

  const validateLocation = useCallback(() => {
    if (!locationId) {
      setLocationError("Please select a clinic to refer to");
      return false;
    }
    setLocationError(undefined);
    return true;
  }, [locationId]);

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

        <Reveal>
          <div
            style={{
              marginTop: 32,
              background: "#fff",
              border: `1px solid ${alpha(c.brandGreen, 0.16)}`,
              borderRadius: "1.25rem",
              padding: "24px 28px",
              boxShadow: `0 4px 24px -20px ${alpha(c.ink, 0.18)}`,
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
                marginBottom: 6,
              }}
            >
              Step 1 · Which clinic?
            </p>
            <div className="refer-clinic-row">
              <div className="refer-clinic-copy">
                <Heading
                  as="h2"
                  variant="h4"
                  fontFamily={theme.fonts.heading}
                  color={c.ink}
                >
                  Which clinic would you like to refer to?
                </Heading>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.bodySm,
                    color: alpha(c.ink, 0.65),
                    lineHeight: 1.55,
                    marginTop: 6,
                  }}
                >
                  This routes the referral to that clinic and updates the phone and fax shown
                  on the right.
                </p>
              </div>
              <div className="refer-clinic-field">
                <Field
                  id="refer-locationId"
                  label="Refer to"
                  as="select"
                  required
                  value={locationId}
                  error={locationError}
                  onChange={handleLocationChange}
                  placeholder="Select a clinic…"
                  options={locations.map((l) => ({ label: l.label, value: l.id }))}
                />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="refer-grid" style={{ marginTop: 24 }}>
          <Reveal className="refer-form-col">
            <ReferForm
              copy={form}
              locationId={locationId}
              locationLabel={selectedLocation?.label ?? ""}
              onValidateLocation={validateLocation}
            />
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
                {selectedLocation
                  ? `Sending to Mindspan ${selectedLocation.label}.`
                  : alt.promptNoLocation}
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
                {selectedLocation && (
                  <>
                    <AltRow
                      label={`Call · ${selectedLocation.hours}`}
                      value={selectedLocation.phone.value}
                      href={selectedLocation.phone.href}
                      icon={<PhoneIcon />}
                    />
                    <AltRow
                      label="Secure fax"
                      value={selectedLocation.fax.value}
                      href={selectedLocation.fax.href}
                      icon={<FaxIcon />}
                    />
                  </>
                )}
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
        @media (max-width: 1024px) {
          .refer-grid {
            gap: 40px;
          }
        }
        @media (max-width: 960px) {
          .refer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        .refer-clinic-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(240px, 320px);
          gap: 32px;
          align-items: end;
          margin-top: 8px;
        }
        @media (max-width: 720px) {
          .refer-clinic-row {
            grid-template-columns: 1fr;
            gap: 16px;
            align-items: start;
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
