"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { Reveal } from "@/components/molecules/Reveal";
import type { ClinicContact as ClinicContactType } from "@/content/pages/locationDetail";

export function ClinicContact(props: ClinicContactType) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section id="visit" style={{ background: c.cream, padding: "96px 0" }}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
          <Reveal
            className="overflow-hidden rounded-[2rem]"
            style={{ minHeight: 360 }}
          >
            <iframe
              title="Clinic location map"
              src={props.mapEmbedSrc}
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0, minHeight: 360 }}
            />
          </Reveal>

          <Reveal
            className="rounded-[2rem] p-8 md:p-10"
            style={{
              background: c.skySoft,
              border: `1px solid ${alpha(c.ink, 0.06)}`,
            }}
          >
            <Eyebrow color={c.accent}>Visit us</Eyebrow>
            <Heading
              as="h2"
              variant="h3"
              color={c.ink}
              fontFamily={theme.fonts.heading}
              className="mt-3"
            >
              Clinic details
            </Heading>

            <dl className="mt-8 grid gap-y-6 gap-x-8 sm:grid-cols-2">
              <ContactRow label="Address" color={c.ink}>
                <span
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.body,
                    lineHeight: 1.55,
                    color: alpha(c.ink, 0.82),
                  }}
                >
                  {props.address}
                </span>
              </ContactRow>

              <ContactRow label="Hours" color={c.ink}>
                <span
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.body,
                    lineHeight: 1.55,
                    color: alpha(c.ink, 0.82),
                  }}
                >
                  {props.hours}
                </span>
              </ContactRow>

              <ContactRow label="Phone" color={c.ink}>
                <a
                  href={props.phoneHref}
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.body,
                    color: c.brandGreen,
                    fontWeight: 600,
                  }}
                >
                  {props.phone}
                </a>
              </ContactRow>

              <ContactRow label="Email" color={c.ink}>
                <a
                  href={props.emailHref}
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: typeScale.body,
                    color: c.brandGreen,
                    fontWeight: 600,
                    wordBreak: "break-word",
                  }}
                >
                  {props.email}
                </a>
              </ContactRow>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                href={props.newPatient.href}
                variant="primary"
                size="lg"
                iconRight={<ArrowIcon />}
              >
                {props.newPatient.label}
              </Button>
              <Button
                href={props.existingPatient.href}
                variant="ghostDark"
                size="lg"
              >
                {props.existingPatient.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt>
        <Eyebrow color={color} style={{ marginBottom: 6 }}>
          {label}
        </Eyebrow>
      </dt>
      <dd style={{ margin: 0 }}>{children}</dd>
    </div>
  );
}
