import { appendRow, type SheetsEnv } from "../_lib/sheets";

const TAB = "waitlist";

type Payload = {
  firstName?: unknown;
  email?: unknown;
  phone?: unknown;
  state?: unknown;
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}
function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function digits(s: string): string {
  return s.replace(/\D/g, "");
}
function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: SheetsEnv;
}): Promise<Response> {
  const { request, env } = context;

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const firstName = str(body.firstName);
  const email = str(body.email);
  const phone = str(body.phone);
  const state = str(body.state);

  if (!firstName) return json(400, { error: "missing_name" });
  if (!isEmail(email)) return json(400, { error: "invalid_email" });
  if (digits(phone).length < 10) return json(400, { error: "invalid_phone" });

  try {
    await appendRow(env, TAB, [
      new Date().toISOString(),
      state,
      firstName,
      email,
      phone,
    ]);
  } catch (err) {
    console.error("waitlist.append_failed", (err as Error).message);
    return json(502, { error: "downstream_failed" });
  }

  return json(200, { ok: true });
}
