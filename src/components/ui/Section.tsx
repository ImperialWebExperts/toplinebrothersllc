import Container from "@/components/ui/Container";

type Props = {
  id?: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
  /** The first section under the header: no top line, tighter top padding. */
  hero?: boolean;
};

/**
 * Every major section opens with the top line: a 4px ink rule. It marks "a new section starts
 * here" and nothing else, so it never goes on cards, tiles, or inputs.
 * Vertical rhythm is 48px / 64px / 96px (mobile / tablet / desktop); sections stack with top
 * padding only, and <main> supplies the space before the closing band.
 */
export default function Section({ id, label, children, className = "", hero = false }: Props) {
  const padding = hero ? "pt-10 md:pt-14 lg:pt-16" : "pt-12 md:pt-16 lg:pt-24";
  return (
    <section id={id} aria-label={label} className={`${padding} ${className}`}>
      <Container>{hero ? children : <div className="border-t-4 border-ink pt-8 md:pt-10">{children}</div>}</Container>
    </section>
  );
}
