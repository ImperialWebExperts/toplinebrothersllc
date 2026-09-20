import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { CardLink } from "@/components/ui/Card";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { CITIES, CTA, SITE } from "@/lib/site";

const PATH = "/service-area";
const TITLE = "Service Area — Imperial Valley";
const DESCRIPTION = `${SITE.shortName} rents power tools and access equipment across all cities in the ${SITE.region} and surrounding areas.`;

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function ServiceAreaPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ type: "WebPage", path: PATH, name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Service Area", href: PATH }]),
        )}
      />

      <Section hero>
        <h1 className="type-display-lg">Equipment rental across the {SITE.region}</h1>
        <p className="type-subhead mt-6 max-w-prose text-ink-muted">
          We serve all cities in the {SITE.region} and the surrounding areas. If your job site
          is nearby but not listed, ask us.
        </p>
      </Section>

      <Section>
        <h2 className="type-headline">Cities we serve</h2>
        {/* City cards: 4 columns on desktop, 2 on tablet, 1 under 480px. */}
        <ul className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:mt-10 md:gap-6 lg:grid-cols-4">
          {CITIES.map((c) => (
            <li key={c.slug}>
              <CardLink href={`/contact?city=${c.slug}`}>
                <h3 className="type-body-strong">Serving {c.name}</h3>
                <span className="type-body mt-auto underline decoration-1 underline-offset-[3px] group-hover:decoration-2">
                  {CTA.primary}
                </span>
              </CardLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="type-headline">Outside this list?</h2>
        <p className="type-body-lg mt-4 max-w-prose text-ink-muted">
          Not sure your job site is covered? Send the location with your request and we will
          confirm.
        </p>
        <Button href={CTA.primaryHref} className="mt-6">Ask about your location</Button>
      </Section>
    </>
  );
}
