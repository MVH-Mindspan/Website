"use client";

/* eslint-disable @next/next/no-img-element */
import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { Heading } from "@/components/atoms/Heading";
import { Lead } from "@/components/atoms/Lead";
import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import { BulletList } from "@/components/molecules/BulletList";
import { Reveal } from "@/components/molecules/Reveal";
import type { ProviderProfile as ProviderProfileType } from "@/content/pages/locationDetail";

export function ProviderProfile(props: ProviderProfileType) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <section style={{ background: c.sand, padding: "96px 0" }}>
      <Container>
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-14 items-start">
          <Reveal className="overflow-hidden rounded-[2rem]">
            <img
              src={props.image}
              alt={props.imageAlt}
              className="w-full object-cover"
              style={{ aspectRatio: "1/1", objectPosition: "center top" }}
              loading="lazy"
            />
          </Reveal>

          <Reveal>
            <Eyebrow color={c.accent}>{props.eyebrow}</Eyebrow>
            <Heading
              as="h2"
              variant="h2"
              color={c.ink}
              fontFamily={theme.fonts.heading}
              className="mt-4"
            >
              {props.name}
            </Heading>
            <p
              style={{
                fontFamily: theme.fonts.body,
                fontSize: typeScale.leadMd,
                color: alpha(c.ink, 0.7),
                marginTop: 8,
              }}
            >
              {props.role}
            </p>
            <Lead
              size="md"
              color={alpha(c.ink, 0.75)}
              maxWidth={false}
              className="mt-6"
              style={{ fontSize: typeScale.body, lineHeight: 1.65 }}
            >
              {props.bio}
            </Lead>

            <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-8">
              <ProviderBlock title="Specialties" color={c.ink}>
                <BulletList
                  items={props.specialties}
                  bulletColor={c.brandGreen}
                  color={alpha(c.ink, 0.78)}
                  className="text-[15px]"
                />
              </ProviderBlock>

              <ProviderBlock title="Certifications" color={c.ink}>
                <BulletList
                  items={props.certifications}
                  bulletColor={c.brandGreen}
                  color={alpha(c.ink, 0.78)}
                  className="text-[15px]"
                />
              </ProviderBlock>

              <ProviderBlock title="Education & Training" color={c.ink}>
                <BulletList
                  items={props.education}
                  bulletColor={c.brandGreen}
                  color={alpha(c.ink, 0.78)}
                  className="text-[15px]"
                />
              </ProviderBlock>

              <ProviderBlock title="Affiliations & availability" color={c.ink}>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    color: alpha(c.ink, 0.78),
                  }}
                >
                  {props.affiliations}
                </p>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    color: alpha(c.ink, 0.78),
                    marginTop: 10,
                  }}
                >
                  {props.availability}
                </p>
              </ProviderBlock>
            </div>

            <div className="mt-10">
              <Button
                href={props.cta.href}
                variant="primary"
                size="lg"
                iconRight={<ArrowIcon />}
              >
                {props.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ProviderBlock({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Eyebrow color={color} style={{ marginBottom: 12 }}>
        {title}
      </Eyebrow>
      {children}
    </div>
  );
}
