// Cloudflare Worker — serves static Next.js export from ./out
// plus dummy /api endpoints for the booking funnel.

interface Env {
  ASSETS: Fetcher;
}

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

    if (url.pathname.startsWith("/ingest/")) {
      return proxyPostHog(request, url);
    }

    if (url.pathname === "/api/book" || url.pathname === "/api/waitlist") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }
      if (request.method !== "POST") {
        return jsonResponse({ ok: false, error: "Method not allowed" }, { status: 405 });
      }
      try {
        const payload = await request.json();
        // Dummy: log and ack. Wire to real destination later.
        console.log(`[${url.pathname}]`, JSON.stringify(payload));
        return jsonResponse({ ok: true });
      } catch {
        return jsonResponse({ ok: false, error: "Invalid JSON" }, { status: 400 });
      }
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
