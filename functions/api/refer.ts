import { appendRow, type SheetsEnv } from "../_lib/sheets";

const TAB = "pcp referrals";

type Payload = {
  location?: unknown;
  locationLabel?: unknown;
  referrer?: {
    firstName?: unknown;
    lastName?: unknown;
    email?: unknown;
    phone?: unknown;
    practice?: unknown;
  };
  patient?: {
    firstName?: unknown;
    lastName?: unknown;
    phone?: unknown;
  };
  notes?: unknown;
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

  const location = str(body.locationLabel) || str(body.location);
  const rFirst = str(body.referrer?.firstName);
  const rLast = str(body.referrer?.lastName);
  const rEmail = str(body.referrer?.email);
  const rPhone = str(body.referrer?.phone);
  const practice = str(body.referrer?.practice);
  const pFirst = str(body.patient?.firstName);
  const pLast = str(body.patient?.lastName);
  const pPhone = str(body.patient?.phone);
  const notes = str(body.notes);

  if (!location) return json(400, { error: "missing_location" });
  if (!rFirst || !rLast) return json(400, { error: "missing_referrer_name" });
  if (!isEmail(rEmail)) return json(400, { error: "invalid_referrer_email" });
  if (rPhone && digits(rPhone).length < 10) {
    return json(400, { error: "invalid_referrer_phone" });
  }
  if (!pFirst || !pLast) return json(400, { error: "missing_patient_name" });
  if (digits(pPhone).length < 10) return json(400, { error: "invalid_patient_phone" });

  try {
    await appendRow(env, TAB, [
      new Date().toISOString(),
      location,
      rFirst,
      rLast,
      rEmail,
      rPhone,
      practice,
      pFirst,
      pLast,
      pPhone,
      notes,
    ]);
  } catch (err) {
    console.error("refer.append_failed", (err as Error).message);
    return json(502, { error: "downstream_failed" });
  }

  return json(200, { ok: true });
}
