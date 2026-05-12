import { appendRow, type SheetsEnv } from "../_lib/sheets";

const TAB = "appointments";

type Payload = {
  state?: unknown;
  careOption?: unknown;
  bookingFor?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  patientFirstName?: unknown;
  patientLastName?: unknown;
  relationship?: unknown;
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

  const state = str(body.state);
  const careOption = str(body.careOption);
  const bookingFor = str(body.bookingFor);
  const firstName = str(body.firstName);
  const lastName = str(body.lastName);
  const email = str(body.email);
  const phone = str(body.phone);
  const patientFirstName = str(body.patientFirstName);
  const patientLastName = str(body.patientLastName);
  const relationship = str(body.relationship);

  if (!state || !careOption || !bookingFor || !firstName || !lastName) {
    return json(400, { error: "missing_required_fields" });
  }
  if (email && !isEmail(email)) return json(400, { error: "invalid_email" });
  if (digits(phone).length < 10) return json(400, { error: "invalid_phone" });
  if (bookingFor === "loved-one") {
    if (!patientFirstName || !patientLastName || !relationship) {
      return json(400, { error: "missing_patient_fields" });
    }
  }

  // For "self" bookings, mirror booker into Patient columns so the team can
  // scan the patient name without having to interpret the Booking For flag.
  const resolvedPatientFirst = bookingFor === "self" ? firstName : patientFirstName;
  const resolvedPatientLast = bookingFor === "self" ? lastName : patientLastName;
  const resolvedRelationship = bookingFor === "self" ? "" : relationship;

  try {
    await appendRow(env, TAB, [
      new Date().toISOString(),
      state,
      careOption,
      bookingFor,
      firstName,
      lastName,
      email,
      phone,
      resolvedPatientFirst,
      resolvedPatientLast,
      resolvedRelationship,
    ]);
  } catch (err) {
    console.error("book.append_failed", (err as Error).message);
    return json(502, { error: "downstream_failed" });
  }

  return json(200, { ok: true });
}
