import {
  CATEGORY_SLUGS,
  CITY_SLUGS,
  MAX_LENGTH,
  REQUIRED_FIELDS,
  fieldError,
  isEmail,
  type Fields,
} from "@/lib/quote";
import { sendQuoteEmail } from "@/lib/mail";
import { clientKey, rateLimit } from "@/lib/rateLimit";
import { CATEGORIES, CITIES } from "@/lib/site";

// Validates a quote request and emails it to the business. Transport, env vars and failure logging
// are in lib/mail.ts.
const json = (body: { ok: boolean }, status: number, headers?: HeadersInit) =>
  Response.json(body, { status, headers });

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
  // Counts every request, honeypot hits included, before any work is done.
  const limit = rateLimit(clientKey(request));
  if (!limit.ok) return json({ ok: false }, 429, { "Retry-After": String(limit.retryAfterSeconds) });

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

  const result = await sendQuoteEmail({
    subject,
    text,
    // Only when they gave an email, so Reply goes to the customer.
    replyTo: isEmail(fields.contact) ? fields.contact : undefined,
  });
  if (result === "not_configured") return json({ ok: false }, 500);
  if (result === "failed") return json({ ok: false }, 502);
  return json({ ok: true }, 200);
}
