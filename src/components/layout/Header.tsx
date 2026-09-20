import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import MobileNav from "@/components/layout/MobileNav";
import NavLink from "@/components/layout/NavLink";
import { CTA, NAV, SITE } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-canvas">
      {/* Utility bar: desktop only, a quiet trust line. Add the phone number on the right once confirmed. */}
      <div className="type-caption hidden h-9 bg-surface-1 text-ink-muted lg:block">
        <Container className="flex h-full items-center justify-between">
          <p>Serving the {SITE.region} and surrounding areas</p>
          <a href={`mailto:${SITE.email}`} className="link text-ink-muted">
            {SITE.email}
          </a>
        </Container>
      </div>

      <div className="border-b border-hairline-soft">
        <Container className="flex h-16 items-center gap-6 lg:h-[72px]">
          {/* Lockup: badge plus the name as real text, so crawlers and screen readers get it too. */}
          <Link href="/" className="mr-auto flex min-h-12 items-center gap-3">
            <Logo variant="dark" size={48} loading="eager" alt="" />
            <span className="font-display text-[15px] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] [font-stretch:110%] sm:text-lg md:[font-stretch:125%]">
              <span className="block">Top Line</span>
              <span className="block">Brothers</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV.map((l) => (
              <NavLink key={l.href} href={l.href} className="type-body-strong inline-flex min-h-12 items-center whitespace-nowrap">
                {l.label}
              </NavLink>
            ))}
            <Button href={CTA.primaryHref} className="whitespace-nowrap">
              {CTA.primary}
            </Button>
          </nav>

          {/* Between 768px and 1023px the full nav does not fit, so the quote action stays in the bar beside the menu.
              The wrapper hides it, not a class on Button: Button sets its own display, which beats a bare `hidden`. */}
          <div className="hidden md:block lg:hidden">
            <Button href={CTA.primaryHref} className="whitespace-nowrap">
              {CTA.primary}
            </Button>
          </div>
          <MobileNav />
        </Container>
      </div>
    </header>
  );
}
