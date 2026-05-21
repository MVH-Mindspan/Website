// Cloudflare Worker — serves static Next.js export from ./out
// plus /api endpoints that append to Google Sheets.

import { onRequestPost as bookHandler } from "./functions/api/book";
import { onRequestPost as waitlistHandler } from "./functions/api/waitlist";
import { onRequestPost as referHandler } from "./functions/api/refer";
import type { SheetsEnv } from "./functions/_lib/sheets";

interface Env extends SheetsEnv {
  ASSETS: Fetcher;
}

const API_HANDLERS: Record<
  string,
  (ctx: { request: Request; env: SheetsEnv }) => Promise<Response>
> = {
  "/api/book": bookHandler,
  "/api/waitlist": waitlistHandler,
  "/api/refer": referHandler,
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...(init.headers || {}),
    },
  });
}

const POSTHOG_API_HOST = "https://us.i.posthog.com";
const POSTHOG_ASSETS_HOST = "https://us-assets.i.posthog.com";

async function proxyPostHog(request: Request, url: URL): Promise<Response> {
  const isStatic = url.pathname.startsWith("/ingest/static/");
  const targetBase = isStatic ? POSTHOG_ASSETS_HOST : POSTHOG_API_HOST;
  const targetPath = isStatic
    ? url.pathname.replace("/ingest/static/", "/static/")
    : url.pathname.replace(/^\/ingest/, "");
  const target = `${targetBase}${targetPath}${url.search}`;

  const upstream = new Request(target, request);
  upstream.headers.delete("cookie");
  return fetch(upstream);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/locations/bay-area-ca") {
      return Response.redirect(
        `${url.origin}/locations/bay-area${url.search}`,
        301,
      );
    }

    if (url.pathname.startsWith("/ingest/")) {
      return proxyPostHog(request, url);
    }

    const handler = API_HANDLERS[url.pathname];
    if (handler) {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }
      if (request.method !== "POST") {
        return jsonResponse({ ok: false, error: "Method not allowed" }, { status: 405 });
      }
      const res = await handler({ request, env });
      const merged = new Headers(res.headers);
      for (const [k, v] of Object.entries(CORS_HEADERS)) merged.set(k, v);
      return new Response(res.body, { status: res.status, headers: merged });
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
