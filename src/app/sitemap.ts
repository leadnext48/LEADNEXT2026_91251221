import type { MetadataRoute } from "next"

// Generates /sitemap.xml from the site's static routes.
// Dynamic routes (faculty/[slug], governance/[slug], life-at-lead/events/[slug])
// are intentionally omitted — add them here if/when their slugs are known.
const SITE_URL = "https://lead.ac.in"

const ROUTES = [
  "", // home
  "/the-lead-story",
  "/dhoni",
  "/chairman",
  "/vision-and-mission",
  "/rti",
  "/governance",
  "/mba",
  "/mca",
  "/recognition",
  "/faculty",
  "/placements",
  "/calendar",
  "/examinations",
  "/research",
  "/journal",
  "/entrepreneurship",
  "/director",
  "/deputy-director",
  "/registrar",
  "/deans",
  "/program-office",
  "/iqac",
  "/admissions",
  "/grievance-redressal",
  "/library",
  "/life-at-lead",
  "/life-at-lead/turning-point",
  "/life-at-lead/obt",
  "/life-at-lead/mentoring",
  "/life-at-lead/lot",
  "/life-at-lead/curio",
  "/life-at-lead/sports",
  "/life-at-lead/hostel",
  "/life-at-lead/canteen",
  "/life-at-lead/pets",
  "/life-at-lead/farm-nature",
  "/life-at-lead/gallery",
  "/life-at-lead/photo-gallery",
  "/life-at-lead/studio",
  "/life-at-lead/events",
  "/life-at-lead/social-media",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }))
}
