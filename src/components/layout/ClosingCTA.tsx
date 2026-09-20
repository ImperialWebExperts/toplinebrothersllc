import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CTA } from "@/lib/site";

/**
 * The last thing before the footer on every page, so no page is a dead end. It sits directly on
 * the footer (also black); the footer draws the inverse-hairline rule between them.
 * The top line is contained inside the band: a full-bleed white rule would vanish into the white page above.
 */
export default function ClosingCTA() {
  return (
    <section aria-label="Request a quote" className="on-dark bg-inverse-canvas pt-12 md:pt-16">
      <Container>
        <div className="flex flex-col gap-8 border-t-4 border-inverse-ink pb-12 pt-8 md:flex-row md:items-center md:justify-between md:gap-12 md:pb-16 md:pt-10">
          <div className="max-w-prose">
            <h2 className="type-headline text-inverse-ink">{CTA.closingHeading}</h2>
            <p className="type-body-lg mt-3 text-inverse-ink-muted">{CTA.closingBody}</p>
          </div>
          <Button href={CTA.primaryHref} className="w-full shrink-0 md:w-auto">
            {CTA.primary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
