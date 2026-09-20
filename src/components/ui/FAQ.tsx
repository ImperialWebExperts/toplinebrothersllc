import JsonLd from "@/components/seo/JsonLd";
import Icon from "@/components/ui/Icon";
import { faqSchema } from "@/lib/schema";

/**
 * `a` is a string for a confirmed answer. Only string answers are emitted in the
 * FAQPage JSON-LD, so a ReactNode answer stays out of structured data.
 */
export type FaqItem = { q: string; a: React.ReactNode };

/**
 * Native <details>/<summary>: works without JS and every answer stays in the
 * DOM for crawlers and answer engines. The indicator swaps plus for minus with no rotation.
 */
export default function FAQ({ items, schema = true }: { items: readonly FaqItem[]; schema?: boolean }) {
  const answered = items.filter((i): i is { q: string; a: string } => typeof i.a === "string");
  return (
    <div className="border-t border-hairline-soft">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-hairline-soft">
          <summary className="type-body-lg flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-6 font-semibold [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <Icon name="plus" className="h-6 w-6 group-open:hidden" />
            <Icon name="minus" className="hidden h-6 w-6 group-open:block" />
          </summary>
          <p className="type-body max-w-prose pb-6 text-ink-muted">{item.a}</p>
        </details>
      ))}
      {schema && answered.length > 0 ? <JsonLd data={faqSchema(answered)} /> : null}
    </div>
  );
}
