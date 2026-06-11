import type { MetadataRoute } from "next"

// Generates /robots.txt — allows all crawlers and points to the sitemap.
// Keep the host/sitemap domain in sync with SITE_URL in layout.tsx.
const SITE_URL = "https://lead.ac.in"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
