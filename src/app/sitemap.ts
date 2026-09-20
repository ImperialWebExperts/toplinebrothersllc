import type { MetadataRoute } from "next";
import { INDEXABLE_ROUTES, SITE } from "@/lib/site";

// No lastModified: nothing here knows when a page really changed, and stamping every build as
// "modified now" teaches crawlers to ignore the field. Add real dates if they are ever tracked.
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
