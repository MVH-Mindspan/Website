import posthog from "posthog-js";

export const ANALYTICS_EVENTS = {
  bookingStarted: "booking_started",
  bookingStepViewed: "booking_step_viewed",
  bookingSubmitted: "booking_submitted",
  bookingSubmitFailed: "booking_submit_failed",
  bookingAbandoned: "booking_abandoned",
  waitlistSubmitted: "waitlist_submitted",
  waitlistSubmitFailed: "waitlist_submit_failed",
  ctaClicked: "cta_clicked",
} as const;

type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type Props = Record<string, string | number | boolean | null | undefined>;

export function track(event: AnalyticsEvent, properties?: Props) {
  if (typeof window === "undefined") return;
  if (!posthog.__loaded) return;
  posthog.capture(event, properties);
}
