import posthog from "posthog-js";

export const ANALYTICS_EVENTS = {
  bookingStarted: "booking_started",
  bookingStepViewed: "booking_step_viewed",
  bookingStateSelected: "booking_state_select",
  bookingSubmitted: "booking_submitted",
  bookingCompleted: "booking_complete",
  bookingSubmitFailed: "booking_submit_failed",
  bookingAbandoned: "booking_abandoned",
  waitlistSubmitted: "waitlist_submitted",
  waitlistSubmitFailed: "waitlist_submit_failed",
  ctaClicked: "cta_clicked",
  telClicked: "tel_click",
  assessmentOutboundClicked: "assessment_outbound_click",
  providersCtaClicked: "providers_cta_click",
  referFormStarted: "refer_form_start",
  referFormSubmitted: "refer_form_submit",
} as const;

type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type Props = Record<string, string | number | boolean | null | undefined>;

// Events fired before posthog.init completes (React runs child effects
// before the provider's init effect, so mount-time events like
// booking_started land here) are buffered and flushed once loaded.
// Bounded so a missing key (local dev, preview) can't grow it forever.
const preInitEvents: Array<[AnalyticsEvent, Props | undefined]> = [];
const PRE_INIT_LIMIT = 100;

export function track(event: AnalyticsEvent, properties?: Props) {
  if (typeof window === "undefined") return;
  if (!posthog.__loaded) {
    if (preInitEvents.length < PRE_INIT_LIMIT) {
      preInitEvents.push([event, properties]);
    }
    return;
  }
  flushPreInitEvents();
  posthog.capture(event, properties);
}

/** Called by PostHogProvider right after posthog.init succeeds. */
export function flushPreInitEvents() {
  if (typeof window === "undefined" || !posthog.__loaded) return;
  while (preInitEvents.length > 0) {
    const [event, properties] = preInitEvents.shift()!;
    posthog.capture(event, properties);
  }
}

export const ASSESSMENT_HOST = "assessment.mindspan.co";

export type Funnel = "assessment" | "booking" | "referral";

/** Which of the three conversion funnels a CTA href belongs to, if any. */
export function funnelFor(href: string): Funnel | undefined {
  if (href.includes(ASSESSMENT_HOST)) return "assessment";
  if (href.startsWith("tel:") || href.startsWith("/book-a-visit")) return "booking";
  if (href.startsWith("/providers")) return "referral";
  return undefined;
}

const UTM_STORAGE_KEY = "mindspan:landing:v1";

// Campaign params we carry through to assessment.mindspan.co so the
// assessment funnel keeps its attribution. Never add anything here that
// could identify a person (no names, phones, emails, DOBs).
const PASSTHROUGH_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
] as const;

type LandingContext = {
  params: Record<string, string>;
  referrer: string;
};

/**
 * Capture campaign params + the external referrer once per session, on the
 * page the visitor landed on. First touch wins so in-site navigation does
 * not overwrite the original attribution.
 */
export function captureLandingContext() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(UTM_STORAGE_KEY)) return;
    const search = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    for (const key of PASSTHROUGH_PARAMS) {
      const value = search.get(key);
      if (value) params[key] = value;
    }
    const referrer =
      document.referrer && !document.referrer.includes("mindspan.co")
        ? document.referrer
        : "";
    if (Object.keys(params).length === 0 && !referrer) return;
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify({ params, referrer }));
  } catch {
    // Storage unavailable — attribution passthrough silently degrades.
  }
}

function readLandingContext(): LandingContext | null {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LandingContext>;
    return { params: parsed.params ?? {}, referrer: parsed.referrer ?? "" };
  } catch {
    return null;
  }
}

/**
 * Append the stored campaign params (and original external referrer) to an
 * assessment.mindspan.co URL so the handoff keeps attribution. Params already
 * present on the URL are never overwritten.
 */
export function decorateAssessmentUrl(url: URL): string {
  const landing = readLandingContext();
  if (landing) {
    for (const [key, value] of Object.entries(landing.params)) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    if (landing.referrer && !url.searchParams.has("utm_referrer")) {
      url.searchParams.set("utm_referrer", landing.referrer);
    }
  }
  return url.toString();
}
