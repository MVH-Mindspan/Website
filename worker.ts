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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

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
