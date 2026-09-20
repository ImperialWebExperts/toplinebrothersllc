import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/about";
const TITLE = "About";
const DESCRIPTION = `${SITE.name} is a California limited liability company renting power tools and access equipment in the ${SITE.region}.`;

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FACTS: readonly [string, string][] = [
  ["Legal name", SITE.name],
  ["Business type", "California limited liability company"],
  ["Activity", "Power tool and access equipment rental"],
  ["Service area", `${SITE.region} and surrounding areas`],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ type: "AboutPage", path: PATH, name: `About ${SITE.name}`, description: DESCRIPTION }),
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About", href: PATH }]),
        )}
      />

      <Section hero>
        <h1 className="type-display-lg">About {SITE.name}</h1>
        <p className="type-subhead mt-6 max-w-prose text-ink-muted">
          {SITE.name} is a California limited liability company renting power tools and access
          equipment to contractors, tradesmen, and property owners in the {SITE.region}.
        </p>
      </Section>

      <Section>
        <h2 className="type-headline">Company facts</h2>
        <dl className="mt-8 max-w-3xl border-t border-hairline-soft md:mt-10">
          {FACTS.map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-hairline-soft py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
              <dt className="type-body-sm font-medium text-ink-muted">{k}</dt>
              <dd className="type-body">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
