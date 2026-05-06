"use client";

import { useTheme } from "@/lib/theme-context";
import { alpha } from "@/lib/themes";
import { type as typeScale } from "@/lib/tokens";
import { Container } from "@/components/atoms/Container";
import {
  CMS_AUTHOR_DISCLAIMER,
  IANACARE_PARTNER_DISCLOSURE,
} from "@/content/guide-disclosures";

export function CmsDisclosure({
  includePartnerNote = false,
}: {
  includePartnerNote?: boolean;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <section style={{ background: c.cream, padding: "32px 0 48px" }}>
      <Container>
        <div
          className="max-w-3xl"
          style={{
            fontFamily: theme.fonts.body,
            fontSize: typeScale.bodySm,
            color: alpha(c.ink, 0.55),
            lineHeight: 1.55,
            borderTop: `1px solid ${alpha(c.ink, 0.08)}`,
            paddingTop: 20,
          }}
        >
          <p>{CMS_AUTHOR_DISCLAIMER}</p>
          {includePartnerNote && (
            <p className="mt-3">{IANACARE_PARTNER_DISCLOSURE}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
