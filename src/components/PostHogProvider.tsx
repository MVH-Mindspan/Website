"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !posthog.__loaded) return;
    let url = window.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += `?${qs}`;
    posthog.capture("$pageview", { $current_url: url });
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
    if (!key) return;
    if (posthog.__loaded) return;

    posthog.init(key, {
      api_host: host,
      ui_host: "https://us.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      person_profiles: "identified_only",
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "*",
      },
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") ph.debug(false);
      },
    });
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
