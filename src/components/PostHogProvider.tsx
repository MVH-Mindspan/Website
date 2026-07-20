"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { AnalyticsBridge } from "@/components/AnalyticsBridge";
import { flushPreInitEvents } from "@/lib/analytics";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !posthog.__loaded) return;
    try {
      let url = window.origin + pathname;
      const qs = searchParams?.toString();
      if (qs) url += `?${qs}`;
      posthog.capture("$pageview", { $current_url: url });
    } catch {
      // Swallow analytics errors. Page navigation must never break because
      // of an adblocker, network failure, or PostHog internal issue.
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    // Default to the same-origin reverse proxy (see public/_redirects).
    // Override with NEXT_PUBLIC_POSTHOG_HOST in local dev where the proxy
    // doesn't apply, e.g. `https://us.i.posthog.com`.
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest";
    // Skip silently if there's no key configured (preview deploys, local dev
    // without the env var, etc.). The app must render the same either way.
    if (!key) return;
    if (posthog.__loaded) return;

    try {
      posthog.init(key, {
        api_host: host,
        ui_host: "https://us.posthog.com",
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: true,
        person_profiles: "identified_only",
        // Write the identity cookie on .mindspan.co so the assessment app
        // (assessment.mindspan.co, same PostHog project) sees the same
        // distinct_id and the funnel joins across the subdomain handoff.
        cross_subdomain_cookie: true,
        session_recording: {
          // Mask every input value and every visible text node from session
          // replay. Caregivers fill in personal health info on this site, so
          // we err hard on privacy. Heatmaps and click targets still work.
          maskAllInputs: true,
          maskTextSelector: "*",
        },
      });
      // Expose the instance like the snippet install does, so QA tooling and
      // browser debugging can reach it.
      (window as Window & { posthog?: typeof posthog }).posthog = posthog;
      // Deliver anything track() buffered before init (e.g. mount-time
      // events from components whose effects ran before this one).
      flushPreInitEvents();
    } catch {
      // Init can throw if a tracking blocker mangles the script, or if the
      // browser blocks storage access. Children must still render.
    }
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <AnalyticsBridge />
      {children}
    </>
  );
}
