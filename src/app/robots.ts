import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// One wildcard rule covers every crawler, search and AI alike, so there are no per-bot rules.
// /contact/thanks also sets noindex in its own metadata.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/contact/thanks", "/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
