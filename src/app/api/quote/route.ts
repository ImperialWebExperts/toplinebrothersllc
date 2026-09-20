import {
  CATEGORY_SLUGS,
  CITY_SLUGS,
  MAX_LENGTH,
  REQUIRED_FIELDS,
  fieldError,
  isEmail,
  type Fields,
} from "@/lib/quote";
import { CATEGORIES, CITIES, SITE } from "@/lib/site";

// Emails each quote request to SITE.email through Resend's REST API (plain fetch, no SDK).
// Env: RESEND_API_KEY (required), QUOTE_FROM_EMAIL (optional). Until a domain is verified in Resend,
// the default onboarding@resend.dev sender can only deliver to the address that owns the Resend account.
const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "onboarding@resend.dev";

const json = (body: { ok: boolean }, status: number) => Response.json(body, { status });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// Returns a validated Fields object, or null if anything is off. Never trusts the client's own checks.
function parse(payload: unknown): Fields | null {
  if (!isRecord(payload)) return null;
  const str = (key: keyof Fields) => (typeof payload[key] === "string" ? (payload[key] as string).trim() : null);

  const name = str("name");
  const contact = str("contact");
  const category = str("category");
  const need = str("need");
  const start = str("start");
  const length = str("length");
  const city = str("city");
  const fulfilment = str("fulfilment");
  if (
    name === null || contact === null || category === null || need === null ||
    start === null || length === null || city === null
  ) return null;

  if (fulfilment !== "delivery" && fulfilment !== "pickup") return null;
  if (!CATEGORY_SLUGS.includes(category) || !CITY_SLUGS.includes(city)) return null;

  const fields: Fields = { name, contact, category, need, start, length, city, fulfilment, website: "" };
  for (const key of REQUIRED_FIELDS) {
    if (fieldError(key, fields[key])) return null;
    if (fields[key].length > MAX_LENGTH[key as keyof typeof MAX_LENGTH]) return null;
  }
  return fields;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (isRecord(payload) && typeof payload.website === "string" && payload.website !== "") {
    return json({ ok: true }, 200);
  }

  const fields = parse(payload);
  if (!fields) return json({ ok: false }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Quote request not sent: RESEND_API_KEY is not set.");
    return json({ ok: false }, 500);
  }

  const categoryLabel = CATEGORIES.find((c) => c.slug === fields.category)?.label ?? fields.category;
  const cityLabel = fields.city === "other" ? "Other / nearby" : CITIES.find((c) => c.slug === fields.city)?.name ?? fields.city;

  // Subject uses only labels from lib/site.ts, never raw user text, so it cannot carry header tricks.
  const subject = `New quote request: ${categoryLabel} - ${cityLabel}`;
  const text = [
    `Name: ${fields.name}`,
    `Phone or email: ${fields.contact}`,
    `Equipment category: ${categoryLabel}`,
    `Job site city: ${cityLabel}`,
    `Rental start date: ${fields.start}`,
    `Rental length: ${fields.length}`,
    `Delivery or pickup: ${fields.fulfilment}`,
    "",
    "What they need:",
    fields.need,
  ].join("\n");

  let response: Response;
  try {
    response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL ?? DEFAULT_FROM,
        to: [SITE.email],
        subject,
        text,
        // Only when they gave an email, so Reply goes to the customer.
        ...(isEmail(fields.contact) ? { reply_to: fields.contact } : {}),
      }),
    });
  } catch {
    console.error("Quote request not sent: could not reach Resend.");
    return json({ ok: false }, 502);
  }

  if (!response.ok) {
    // Status only. The body and the request both contain customer details.
    console.error(`Quote request not sent: Resend responded ${response.status}.`);
    return json({ ok: false }, 502);
  }
  return json({ ok: true }, 200);
}
