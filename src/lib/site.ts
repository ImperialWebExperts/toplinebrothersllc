export const SITE = {
  name: "Top Line Brothers LLC",
  shortName: "Top Line Brothers",
  email: "toplinebrothersllc@gmail.com",
  // TODO: replace with the real production domain once registered. Until then set
  // NEXT_PUBLIC_SITE_URL at build time, or edit the fallback here. Canonicals, sitemap,
  // Open Graph and JSON-LD all read this one value.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, ""),
  description:
    "Top Line Brothers LLC rents power tools and access equipment to contractors, tradesmen, and property owners across the Imperial Valley and surrounding areas.",
  region: "Imperial Valley",
  audience: "Contractors, tradesmen, and property owners",
} as const;

export type NavLink = { label: string; href: string };

export const NAV: readonly NavLink[] = [
  { label: "How renting works", href: "/how-renting-works" },
  { label: "Service area", href: "/service-area" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const CTA = {
  primary: "Request a quote",
  primaryHref: "/contact",
  secondary: "How renting works",
  secondaryHref: "/how-renting-works",
  closingHeading: "Ready to rent? Request a quote.",
  closingBody: "Power tools and access equipment across the Imperial Valley.",
} as const;

// Shown on /contact and /contact/thanks. Pickup vs. delivery is unconfirmed, so it is not named here.
export const NEXT_STEPS: readonly string[] = [
  "We review your request and check availability.",
  "We reply with pricing and what's needed to book.",
  "You confirm, and we schedule your rental.",
];

export type Category = { slug: string; label: string };

export const CATEGORIES: readonly Category[] = [
  { slug: "power-tools", label: "Power Tools" },
  { slug: "access-equipment", label: "Access Equipment" },
  { slug: "not-sure", label: "Not sure" },
] as const;

// The categories the company actually rents. "Not sure" is a form option, not something we rent.
export const RENTAL_CATEGORIES: readonly Category[] = CATEGORIES.filter((c) => c.slug !== "not-sure");

export type City = { name: string; slug: string };

// [PLACEHOLDER] confirm the final city list with the client.
export const CITIES: readonly City[] = [
  "El Centro", "Calexico", "Brawley", "Imperial", "Holtville",
  "Calipatria", "Westmorland", "Heber", "Seeley", "Niland",
].map((name) => ({ name, slug: name.toLowerCase().replace(/\s+/g, "-") }));

// Cities named in Home's running copy, alphabetical. The full list lives on /service-area.
const HOME_CITY_NAMES: readonly string[] = [
  "Brawley", "Calexico", "Calipatria", "El Centro", "Holtville", "Imperial", "Westmorland",
];
export const HOME_CITIES: readonly City[] = CITIES
  .filter((c) => HOME_CITY_NAMES.includes(c.name))
  .sort((a, b) => a.name.localeCompare(b.name));

export const INDEXABLE_ROUTES: readonly string[] = [
  "/", "/how-renting-works", "/service-area", "/about", "/contact",
] as const;
