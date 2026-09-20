import { CITIES, CTA, NAV, RENTAL_CATEGORIES, SITE } from "@/lib/site";

// A plain-text summary for AI crawlers and agents (the llms.txt convention). It is a cheap extra, not a
// ranking factor: no major engine has confirmed it reads the file. Built only from lib/site.ts, so it
// carries the same facts as the pages. Add phone, hours and address here once the client confirms them.
export const dynamic = "force-static";

const BLURBS: Record<string, string> = {
  "/how-renting-works": "How a rental works, what to bring, and answers to common questions.",
  "/service-area": "The cities we serve in the Imperial Valley.",
  "/about": "Company facts.",
  "/contact": "The quote form and contact email.",
};

const list = (items: readonly string[]) => new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(items);

export function GET() {
  const categories = RENTAL_CATEGORIES.map((c) => c.label.toLowerCase());

  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.name} is a California limited liability company. It rents ${list(categories)} to ${SITE.audience.toLowerCase()} in the ${SITE.region} and surrounding areas.`,
    "",
    "## Pages",
    `- [Home](${SITE.url}/): What we rent and where we serve.`,
    ...NAV.map((l) => {
      const label = l.href === CTA.primaryHref ? CTA.primary : l.label;
      return `- [${label}](${SITE.url}${l.href}): ${BLURBS[l.href] ?? ""}`.trimEnd();
    }),
    "",
    "## Equipment",
    ...RENTAL_CATEGORIES.map((c) => `- ${c.label}`),
    "",
    "## Service area",
    `All cities in the ${SITE.region} and surrounding areas, including ${list(CITIES.map((c) => c.name))}.`,
    "",
    "## Contact",
    `- Email: ${SITE.email}`,
    `- Request a quote: ${SITE.url}${CTA.primaryHref}`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
