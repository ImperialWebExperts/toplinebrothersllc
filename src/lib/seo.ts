import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const TITLE_TEMPLATE = `%s | ${SITE.name}`;

// Brand images, both derived from logo_black.png (see CLAUDE.md, rule 3). The share image is the
// badge centred on white at the 1.91:1 ratio link previews use.
export const LOGO = { path: "/brand/logo_black.png", width: 1170, height: 1170 } as const;
export const SHARE_IMAGE = {
  path: "/brand/og-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name} logo`,
} as const;

/** `path` is left out for the layout's fallback, so a page with no metadata of its own claims no URL. */
type Social = { title: string; description: string; path?: string };

/**
 * Open Graph and Twitter tags. Next replaces `openGraph` wholesale when a page sets its own, rather
 * than merging it with the layout's, so every page needs the complete set. Relative URLs resolve
 * against `metadataBase`.
 */
export function socialMetadata({ title, description, path }: Social): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      ...(path ? { url: path } : {}),
      title,
      description,
      images: [{ url: SHARE_IMAGE.path, width: SHARE_IMAGE.width, height: SHARE_IMAGE.height, alt: SHARE_IMAGE.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: SHARE_IMAGE.path, alt: SHARE_IMAGE.alt }],
    },
  };
}

type PageSeo = {
  /** A string takes the layout's title template; `{ absolute }` skips it. */
  title: string | { absolute: string };
  description: string;
  path: string;
};

/** Title, description, canonical, Open Graph and Twitter for one indexable page. */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const socialTitle = typeof title === "string" ? TITLE_TEMPLATE.replace("%s", title) : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...socialMetadata({ title: socialTitle, description, path }),
  };
}
