import Link from "next/link";

type CardProps = { children: React.ReactNode; className?: string; soft?: boolean };

/**
 * Flat, bordered, square. No shadow. `soft` is for grouped content that should recede
 * (checklists, "what happens next"): surface fill, no border.
 */
export default function Card({ children, className = "", soft = false }: CardProps) {
  const surface = soft ? "bg-surface-1" : "border border-hairline bg-canvas";
  return <div className={`flex flex-col gap-4 p-6 ${surface} ${className}`}>{children}</div>;
}

/**
 * A whole card that navigates (city cards). Hover swaps the 1px border for a 2px ink border and
 * takes 1px back from the padding so the content does not shift. No movement or scale.
 */
export function CardLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col gap-4 border border-hairline bg-canvas p-6 hover:border-2 hover:border-ink hover:p-[23px] ${className}`}
    >
      {children}
    </Link>
  );
}
