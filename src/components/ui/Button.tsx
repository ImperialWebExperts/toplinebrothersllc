import Link from "next/link";

/**
 * primary   - the quote action, yellow. The one yellow thing in the system.
 * secondary - ink fill, the second action next to the primary.
 * outline   - tertiary, or secondary on busy surfaces.
 * onDark    - secondary/outline placed on an inverse band. Primary keeps its style on dark.
 * link      - a text link that needs a 48px touch target.
 */
type Variant = "primary" | "secondary" | "outline" | "onDark" | "link";

const base = "inline-flex min-h-12 items-center justify-center gap-2 text-center rounded-none";

// Padding lives in each variant: Tailwind orders same-property utilities by value, not class
// order, so a shared px-* in `base` would silently beat a smaller one here. The outline padding is
// 2px smaller on each axis to make room for its 2px border, so every button is the same size.
const variants: Record<Variant, string> = {
  primary:
    "type-button bg-primary px-6 py-[14px] text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-surface-2 disabled:text-ink-subtle disabled:hover:bg-surface-2",
  secondary: "type-button bg-ink px-6 py-[14px] text-inverse-ink hover:bg-inverse-surface",
  outline:
    "type-button border-2 border-ink px-[22px] py-3 text-ink hover:bg-ink hover:text-canvas",
  onDark: "type-button bg-inverse-ink px-6 py-[14px] text-ink hover:bg-surface-2",
  link: "type-button link",
};

type Props = {
  variant?: Variant;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Button({ variant = "primary", href, type = "button", disabled, className = "", children }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    // mailto:, tel: and absolute URLs are not routes, so they skip next/link.
    if (/^(mailto:|tel:|https?:)/.test(href)) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} className={`${cls} disabled:cursor-not-allowed`}>
      {children}
    </button>
  );
}
