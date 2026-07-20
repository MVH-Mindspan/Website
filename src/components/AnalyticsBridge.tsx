"use client";

import { useEffect } from "react";
import {
  ANALYTICS_EVENTS,
  ASSESSMENT_HOST,
  captureLandingContext,
  decorateAssessmentUrl,
  track,
} from "@/lib/analytics";

/**
 * Site-wide funnel instrumentation that individual organisms don't have to
 * know about. A single capture-phase click listener:
 *
 * - `tel:` links        → tel_click { location }
 * - assessment links    → assessment_outbound_click { location } and the
 *                         href is decorated with the stored UTM/referrer
 *                         params before the browser navigates
 * - /providers links    → providers_cta_click { location }
 *
 * `location` comes from the nearest [data-analytics-location] ancestor,
 * falling back to the enclosing section id, then the pathname. No event
 * ever carries user-entered data.
 */
export function AnalyticsBridge() {
  useEffect(() => {
    captureLandingContext();

    const onClick = (e: MouseEvent) => {
      try {
        const target = e.target as Element | null;
        const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
        if (!anchor) return;
        const rawHref = anchor.getAttribute("href") ?? "";
        const location =
          anchor
            .closest("[data-analytics-location]")
            ?.getAttribute("data-analytics-location") ||
          anchor.closest("section[id]")?.id ||
          window.location.pathname;

        if (rawHref.startsWith("tel:")) {
          track(ANALYTICS_EVENTS.telClicked, {
            location,
            number: rawHref.slice(4),
          });
          return;
        }

        let url: URL;
        try {
          url = new URL(anchor.href, window.location.href);
        } catch {
          return;
        }

        if (url.hostname === ASSESSMENT_HOST) {
          const decorated = decorateAssessmentUrl(url);
          anchor.href = decorated;
          track(ANALYTICS_EVENTS.assessmentOutboundClicked, {
            location,
            href: decorated,
          });
          return;
        }

        if (
          url.origin === window.location.origin &&
          (url.pathname === "/providers" ||
            url.pathname.startsWith("/providers/")) &&
          // Same-page anchor scrolls (e.g. "#how-we-work" on /providers)
          // are not entries into the referral funnel.
          url.pathname !== window.location.pathname
        ) {
          track(ANALYTICS_EVENTS.providersCtaClicked, {
            location,
            href: url.pathname,
          });
        }
      } catch {
        // Analytics must never break a click.
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
