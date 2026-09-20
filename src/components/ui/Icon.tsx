/**
 * Inline SVG icons. 24px, outline, 2px stroke, miter joins and butt caps to match the angular
 * logo. Icons carry meaning (trust points, checklist items, form errors, disclosure state);
 * they are never decoration, so they are hidden from assistive tech and the text beside them
 * says the same thing.
 */
const PATHS = {
  check: "M4 12l5 5L20 6",
  plus: "M12 4v16M4 12h16",
  minus: "M4 12h16",
  close: "M5 5l14 14M19 5L5 19",
  menu: "M3 6h18M3 12h18M3 18h18",
  "chevron-down": "M6 9l6 6 6-6",
  // A square with an exclamation mark: the form error marker.
  alert: "M3 3h18v18H3zM12 7v7M12 17v1",
  // Document: legal entity.
  document: "M5 3h10l4 4v14H5zM15 3v4h4M8 12h8M8 16h8",
  // Angular map pin: service area.
  pin: "M12 21l-7-9V4h14v8zM10 8h4v4h-4z",
  // Toolbox: power tools.
  toolbox: "M3 8h18v12H3zM8 8V4h8v4M3 13h18",
  // Ladder: access equipment.
  ladder: "M7 3v18M17 3v18M7 7h10M7 12h10M7 17h10",
  // Shield: the client-confirmed equipment guarantee on Home. Insurance and licensing would use it too,
  // but they are unconfirmed, so they only appear beside a placeholder.
  shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z",
  // Instagram: square frame, lens, and flash dot (a small square, since butt caps drop a zero-length line).
  instagram: "M3 3h18v18H3zM12 8a4 4 0 100 8 4 4 0 000-8zM16.5 6.5h1v1h-1z",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      className={`shrink-0 ${className}`}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
