import { SITE, CITIES, RENTAL_CATEGORIES } from "@/lib/site";
import { LOGO } from "@/lib/seo";

type Json = Record<string, unknown>;

const LANGUAGE = "en-US";
const REGION_AREA = `${SITE.region}, California`;

// Stable ids let one page's nodes point at each other, and at the business defined on Home and
// Contact, instead of repeating them.
const BUSINESS_ID = `${SITE.url}/#business`;
const WEBSITE_ID = `${SITE.url}/#website`;

const pageUrl = (path: string) => (path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`);

// Omits telephone, address, openingHours, foundingDate, sameAs and priceRange on purpose. Add them
// here once the client confirms them (sameAs: once social or listing profiles exist). Never publish
// invented contact data.
export function localBusinessSchema(): Json {
  const logo = `${SITE.url}${LOGO.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: SITE.name,
    legalName: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    url: pageUrl("/"),
    email: SITE.email,
    logo: { "@type": "ImageObject", url: logo, width: LOGO.width, height: LOGO.height },
    image: logo,
    contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: SITE.email },
    audience: { "@type": "Audience", audienceType: SITE.audience },
    areaServed: [
      { "@type": "AdministrativeArea", name: REGION_AREA },
      ...CITIES.map((c) => ({
        "@type": "City",
        name: c.name,
        containedInPlace: { "@type": "AdministrativeArea", name: REGION_AREA },
      })),
    ],
    // Categories only. No prices: none are confirmed.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Equipment rental",
      itemListElement: RENTAL_CATEGORIES.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${c.label} rental`, serviceType: `${c.label} rental` },
      })),
    },
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: pageUrl("/"),
    name: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    inLanguage: LANGUAGE,
    publisher: { "@id": BUSINESS_ID },
  };
}

type WebPageInput = {
  type: "WebPage" | "AboutPage" | "ContactPage";
  path: string;
  name: string;
  description: string;
  /** Set false on Home, which has no breadcrumb trail. */
  breadcrumb?: boolean;
};

// No dateModified or datePublished: the real dates are unknown, and a made-up date is a false freshness signal.
export function webPageSchema({ type, path, name, description, breadcrumb = true }: WebPageInput): Json {
  const url = pageUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: LANGUAGE,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

// The last item in the trail is the current page; its href must match the path given to webPageSchema.
export function breadcrumbSchema(trail: readonly { name: string; href: string }[]): Json {
  const current = trail[trail.length - 1];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl(current.href)}#breadcrumb`,
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: pageUrl(t.href),
    })),
  };
}

/** Joins nodes into one JSON-LD document, so a page ships a single connected graph. */
export function graph(...nodes: Json[]): Json {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map((node) => {
      const copy = { ...node };
      delete copy["@context"];
      return copy;
    }),
  };
}
