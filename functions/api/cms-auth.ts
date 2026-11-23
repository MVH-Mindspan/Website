// GitHub OAuth for the Decap CMS editor at /admin.
//
// Decap opens a popup at /api/cms/auth. We send it to GitHub, GitHub sends
// it back to /api/cms/callback with a code, we swap the code for a token and
// hand the token to the editor window with Decap's postMessage handshake.
// No token is stored anywhere on our side.

export interface CmsAuthEnv {
  GITHUB_OAUTH_CLIENT_ID?: string;
  GITHUB_OAUTH_CLIENT_SECRET?: string;
}

const STATE_COOKIE = "cms_oauth_state";
const STATE_TTL_SECONDS = 600;
const DEFAULT_SCOPE = "repo";
const ALLOWED_SCOPES = new Set(["repo", "public_repo", "user", "user:email"]);

function randomState(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

function stateCookie(value: string, maxAge: number): string {
  return [
    `${STATE_COOKIE}=${encodeURIComponent(value)}`,
    "Path=/api/cms",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ].join("; ");
}

function escapeForScript(s: string): string {
  // Safe to embed inside a JS string literal in <script>.
  return JSON.stringify(s).replace(/</g, "\\u003c");
}

// The popup page Decap expects. It announces itself, waits for the editor
// window to answer, then posts the result to that window's origin only.
function handshakePage(provider: string, payload: string): Response {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Signing in</title></head>
<body style="font-family:system-ui;padding:2rem;color:#201E17;background:#FBF7F0">
<p>Finishing sign in. You can close this window if it does not close itself.</p>
<script>
(function () {
  var message = ${escapeForScript(payload)};
  function receive(e) {
    window.opener.postMessage(message, e.origin);
    window.removeEventListener("message", receive, false);
  }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:" + ${escapeForScript(provider)}, "*");
})();
</script>
</body></html>`;
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
      "Set-Cookie": stateCookie("", 0),
    },
  });
}

function errorPage(message: string): Response {
  return handshakePage("github", `authorization:github:error:${JSON.stringify({ message })}`);
}

export async function handleCmsAuth(request: Request, env: CmsAuthEnv): Promise<Response> {
  if (!env.GITHUB_OAUTH_CLIENT_ID) {
    return new Response("CMS sign in is not configured.", { status: 503 });
  }
  const url = new URL(request.url);
  const requested = (url.searchParams.get("scope") ?? DEFAULT_SCOPE)
    .split(/[\s,]+/)
    .filter((s) => ALLOWED_SCOPES.has(s));
  const scope = requested.length ? requested.join(" ") : DEFAULT_SCOPE;
  const state = randomState();

  const target = new URL("https://github.com/login/oauth/authorize");
  target.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
  target.searchParams.set("redirect_uri", `${url.origin}/api/cms/callback`);
  target.searchParams.set("scope", scope);
  target.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: target.toString(),
      "Set-Cookie": stateCookie(state, STATE_TTL_SECONDS),
      "Cache-Control": "no-store",
    },
  });
}

export async function handleCmsCallback(request: Request, env: CmsAuthEnv): Promise<Response> {
  if (!env.GITHUB_OAUTH_CLIENT_ID || !env.GITHUB_OAUTH_CLIENT_SECRET) {
    return new Response("CMS sign in is not configured.", { status: 503 });
  }
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expected = readCookie(request, STATE_COOKIE);

  if (!code) return errorPage("GitHub did not return a code.");
  if (!state || !expected || state !== expected) {
    return errorPage("Sign in expired or was tampered with. Close this window and try again.");
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "mindspan-cms-auth",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/cms/callback`,
    }),
  });

  if (!res.ok) return errorPage(`GitHub returned ${res.status}.`);
  const data = (await res.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };
  if (!data.access_token) {
    return errorPage(data.error_description ?? data.error ?? "No token returned.");
  }

  return handshakePage(
    "github",
    `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}`,
  );
}
