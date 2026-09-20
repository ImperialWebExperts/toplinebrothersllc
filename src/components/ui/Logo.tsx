import Image from "next/image";

type Props = {
  /** "dark" = black badge for light surfaces. "light" = white badge for dark surfaces. */
  variant?: "dark" | "light";
  /** Rendered badge diameter in px. */
  size?: number;
  /** Eager-load only for logos that are above the fold (the header). */
  loading?: "eager" | "lazy";
  className?: string;
  /** Pass "" when the logo repeats a brand name already shown beside it (the header lockup). */
  alt?: string;
};

const BRAND_ALT = "Top Line Brothers LLC — power tool and access equipment rental";

// The supplied files carry a lot of internal padding: the badge is ~59% of the 1170px canvas and
// sits ~10px below its centre. DESIGN.md says to crop deliberately, so the image is drawn larger
// than its box and clipped. 1.5 leaves a thin margin around the ring; layout supplies clear space.
const CROP = 1.5;
const BADGE_OFFSET = 10 / 1170;

/**
 * Explicit dimensions go to next/image so the sticky header does not shift as it loads.
 * logo_white.png is for dark surfaces only (footer, closing band).
 */
export default function Logo({ variant = "dark", size = 48, loading = "lazy", className = "", alt = BRAND_ALT }: Props) {
  const src = variant === "light" ? "/brand/logo_white.png" : "/brand/logo_black.png";
  const inner = Math.round(size * CROP);
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        width={inner}
        height={inner}
        loading={loading}
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        style={{ marginTop: -inner * BADGE_OFFSET }}
      />
    </span>
  );
}
