// Cloudflare Worker — serves static Next.js export from ./out
// plus /api endpoints that append to Google Sheets and /media/* from R2.

import { onRequestPost as bookHandler } from "./functions/api/book";
import { onRequestPost as waitlistHandler } from "./functions/api/waitlist";
import { onRequestPost as referHandler } from "./functions/api/refer";
import type { SheetsEnv } from "./functions/_lib/sheets";

interface Env extends SheetsEnv {
  ASSETS: Fetcher;
  MEDIA: R2Bucket;
}

// Large media (video) is served from R2 at /media/<key>, not from static
// assets: static assets cap files at 25 MiB and answer Range requests with
// a full 200, which leaves video unseekable in Chrome. Keys are versioned
// (a new cut gets a new key), so responses are immutable and If-Range can
// be ignored. _headers does not apply here, so all headers are set below.
const MEDIA_PREFIX = "/media/";
const MEDIA_KEY = /^[a-z0-9][a-z0-9_-]*(\/[a-z0-9][a-z0-9._-]*)+$/;
const MEDIA_HEADERS: Record<string, string> = {
  "Accept-Ranges": "bytes",
  "Cache-Control": "public, max-age=31536000, immutable",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
};
const CONDITIONAL_HEADERS = [
  "if-match",
  "if-none-match",
  "if-modified-since",
  "if-unmodified-since",
];

type ByteRange = { offset: number; length?: number } | { suffix: number };

// Single ranges only ("bytes=a-b", "bytes=a-", "bytes=-n"). Anything else
// is ignored and answered with a full 200, which RFC 9110 allows.
function parseRange(value: string | null): ByteRange | undefined {
  const m = value?.trim().match(/^bytes=(\d*)-(\d*)$/);
  if (!m || (m[1] === "" && m[2] === "")) return undefined;
  if (m[1] === "") return { suffix: Number(m[2]) };
  const offset = Number(m[1]);
  if (m[2] === "") return { offset };
  const end = Number(m[2]);
  return end >= offset ? { offset, length: end - offset + 1 } : undefined;
}

function mediaHeaders(obj: R2Object): Headers {
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  for (const [k, v] of Object.entries(MEDIA_HEADERS)) headers.set(k, v);
  headers.set("ETag", obj.httpEtag);
  headers.set("Last-Modified", obj.uploaded.toUTCString());
  return headers;
}

function mediaNotFound(): Response {
  return new Response("Not found", {
    status: 404,
    headers: { "X-Robots-Tag": "noindex" },
  });
}

async function rangeNotSatisfiable(env: Env, key: string): Promise<Response> {
  const head = await env.MEDIA.head(key);
  if (!head) return mediaNotFound();
  const headers = mediaHeaders(head);
  headers.set("Content-Range", `bytes */${head.size}`);
  return new Response(null, { status: 416, headers });
}

async function serveMedia(request: Request, env: Env, url: URL): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const key = url.pathname.slice(MEDIA_PREFIX.length);
  if (!MEDIA_KEY.test(key)) return mediaNotFound();

  if (request.method === "HEAD") {
    const head = await env.MEDIA.head(key);
    if (!head) return mediaNotFound();
    const headers = mediaHeaders(head);
    headers.set("Content-Length", String(head.size));
    return new Response(null, { status: 200, headers });
  }

  const onlyIf = new Headers();
  for (const name of CONDITIONAL_HEADERS) {
    const value = request.headers.get(name);
    if (value) onlyIf.set(name, value);
  }
  const range = parseRange(request.headers.get("range"));

  let obj: R2ObjectBody | R2Object | null;
  try {
    obj = await env.MEDIA.get(key, { onlyIf, range });
  } catch (err) {
    if (range) return rangeNotSatisfiable(env, key); // R2 InvalidRange
    throw err;
  }
  if (!obj) return mediaNotFound();

  const headers = mediaHeaders(obj);
  if (!("body" in obj) || !obj.body) {
    // A precondition failed: If-None-Match / If-Modified-Since mean 304,
    // If-Match / If-Unmodified-Since mean 412.
    const notModified = onlyIf.has("if-none-match") || onlyIf.has("if-modified-since");
    return new Response(null, { status: notModified ? 304 : 412, headers });
  }

  const size = obj.size;
  if (!range) {
    headers.set("Content-Length", String(size));
    return new Response(obj.body, { status: 200, headers });
  }

  // R2 returns fewer bytes when a range runs past the end, so clamp.
  const start = "suffix" in range ? Math.max(0, size - range.suffix) : range.offset;
  const end =
    "suffix" in range || range.length === undefined
      ? size - 1
      : Math.min(range.offset + range.length, size) - 1;
  if (start > end) {
    await obj.body.cancel();
    return rangeNotSatisfiable(env, key);
  }
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(obj.body, { status: 206, headers });
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

    if (url.pathname.startsWith(MEDIA_PREFIX)) {
      return serveMedia(request, env, url);
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
