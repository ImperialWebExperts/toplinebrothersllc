import { CATEGORIES, CITIES } from "@/lib/site";

// Shared by QuoteForm (client) and /api/quote (server) so both validate with the same rules.
// Field list is fixed by CLAUDE.md (name, phone or email, category, need, dates, city, delivery or
// pickup). Do not add fields without asking.
export type Fields = {
  name: string;
  contact: string;
  category: string;
  need: string;
  start: string;
  length: string;
  city: string;
  fulfilment: "delivery" | "pickup";
  website: string; // honeypot
};

// ?category= and ?city= are user input: only accept values the selects actually offer, otherwise
// state would hold a value the <select> cannot display.
export const CATEGORY_SLUGS: readonly string[] = CATEGORIES.map((c) => c.slug);
export const CITY_SLUGS: readonly string[] = [...CITIES.map((c) => c.slug), "other"];

// Every field is required. category and fulfilment always hold a value (the select and the radio
// both start selected), so only fields that can be empty are checked. Listed in on-screen order:
// focus goes to the first one that fails.
export const REQUIRED_FIELDS = ["name", "contact", "need", "start", "length", "city"] as const satisfies readonly (keyof Fields)[];

// Upper bounds so a bad client cannot push huge strings into an email body.
export const MAX_LENGTH: Record<"name" | "contact" | "need" | "start" | "length", number> = {
  name: 100,
  contact: 254,
  need: 2000,
  start: 10,
  length: 100,
};

const EMAIL = /^[A-Za-z0-9._%+'-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
// 10-digit US number (area code and exchange start 2-9), optional leading 1.
const US_PHONE = /^1?[2-9]\d{2}[2-9]\d{6}$/;

export const isEmail = (value: string) => EMAIL.test(value.trim());

// The business is in California, so "today" is the Pacific date, on the form and on the server alike.
// en-CA formats as YYYY-MM-DD, the same shape a date input produces.
export const todayPacific = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(new Date());

function isRealDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isPhone(value: string) {
  if (!/^\+?[\d\s().-]+$/.test(value)) return false; // digits and phone punctuation only, no letters
  const digits = value.replace(/\D/g, "");
  if (US_PHONE.test(digits)) return true;
  // Non-US numbers are accepted only with a leading + and a country code (E.164: 8-15 digits).
  return value.startsWith("+") && !digits.startsWith("1") && digits.length >= 8 && digits.length <= 15;
}

export function fieldError(key: keyof Fields, raw: string): string | undefined {
  const value = raw.trim();
  switch (key) {
    case "name":
      return value ? undefined : "Please enter your name.";
    case "contact":
      if (!value) return "Add a phone number or email so we can reply.";
      if (value.includes("@")) {
        return EMAIL.test(value) ? undefined : "Enter a valid email address, like name@example.com.";
      }
      return isPhone(value) ? undefined : "Enter a valid phone number or email address.";
    case "need":
      return value ? undefined : "Tell us what equipment the job needs.";
    case "start":
      if (!value) return "Choose a rental start date.";
      if (!isRealDate(value)) return "Enter a valid start date.";
      return value < todayPacific() ? "Choose today or a later date." : undefined;
    case "length":
      return value ? undefined : "Enter how long you need the rental, like 3 days.";
    case "city":
      return value ? undefined : "Select the job site city.";
    default:
      return undefined;
  }
}
