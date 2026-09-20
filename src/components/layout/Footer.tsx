import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { NAV, SITE, SOCIAL } from "@/lib/site";

const linkClass = "inline-flex min-h-12 items-center text-inverse-ink hover:underline underline-offset-[3px]";
const headingClass = "type-body-strong mb-2 text-inverse-ink";

export default function Footer() {
  return (
    <footer className="on-dark bg-inverse-canvas text-inverse-ink-muted">
      <Container>
        {/* inverse-hairline separates the closing band from the footer; they read as one black block. */}
        <div className="type-body-sm grid gap-10 border-t border-inverse-hairline py-12 md:grid-cols-3 md:py-16">
          <div>
            <Logo variant="light" size={96} />
            <p className="mt-4 max-w-[34ch]">{SITE.description}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className={headingClass}>Site</h2>
            <ul>
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Service area</h2>
            <p className="max-w-[30ch]">All cities in the {SITE.region} and surrounding areas.</p>
            <h2 className={`${headingClass} mt-6`}>Contact</h2>
            <a href={`mailto:${SITE.email}`} className={`${linkClass} underline`}>
              {SITE.email}
            </a>
            <h2 className={`${headingClass} mt-6`}>Social</h2>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-3`}>
              <Icon name="instagram" />
              Instagram
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <p className="type-body-sm border-t border-inverse-hairline pb-12 pt-6">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </Container>
    </footer>
  );
}
