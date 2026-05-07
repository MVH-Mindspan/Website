"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

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
        session_recording: {
          // Mask every input value and every visible text node from session
          // replay. Caregivers fill in personal health info on this site, so
          // we err hard on privacy. Heatmaps and click targets still work.
          maskAllInputs: true,
          maskTextSelector: "*",
        },
      });
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
      {children}
    </>
  );
}
