import type { Metadata } from "next"
import Footer from "@/components/pages/Footer"
import "./globals.css"
import ScrollHeader from "@/components/layout/ScrollHeader"

// ── Site-wide SEO constants ──────────────────────────────────────────────
// NOTE: SITE_URL is the canonical production domain. Update it if the site
// is deployed under a different host so canonical/OG/sitemap URLs stay correct.
const SITE_URL = "https://lead.ac.in"
const SITE_NAME = "LEAD College"
// Former name — kept only as an SEO alias so visitors searching the old brand
// ("LEAD College of Management") still find the site. Not shown to users.
const FORMER_NAME = "LEAD College of Management"
const TITLE = "LEAD College | MBA & MCA in Palakkad, Kerala"
const DESCRIPTION =
  "LEAD College (Autonomous) is an AICTE-approved institution in Dhoni, Palakkad offering industry-integrated MBA and MCA programmes — internships every semester, a strong 90%+ placement record, and mentorship from seasoned professionals. Affiliated to the University of Calicut."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Child pages that set their own `title` get "<Page> | LEAD College"
    template: "%s | LEAD College",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "LEAD College",
    "LEAD College Palakkad",
    "LEAD College of Management", // former name — retained for search discoverability
    "MBA in Kerala",
    "MCA in Kerala",
    "MBA in Palakkad",
    "MCA in Palakkad",
    "best MBA college in Kerala",
    "autonomous business school Kerala",
    "AICTE approved MBA college",
    "residential MBA college Kerala",
    "University of Calicut affiliated college",
    "Dhoni Palakkad",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/logolead.png",
        width: 600,
        height: 272,
        alt: "LEAD College",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logolead.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

// ── Structured data (JSON-LD) for rich Google results ─────────────────────
// CollegeOrUniversity + WebSite graph. Contact details mirror the site Footer.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["CollegeOrUniversity", "EducationalOrganization"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: FORMER_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logolead.png`,
      image: `${SITE_URL}/logolead.png`,
      description: DESCRIPTION,
      foundingDate: "2010",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dhoni PO",
        addressLocality: "Palakkad",
        addressRegion: "Kerala",
        postalCode: "678009",
        addressCountry: "IN",
      },
      email: "info@lead.ac.in",
      telephone: "+91-9497713693",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9497713693",
          email: "info@lead.ac.in",
          contactType: "admissions",
          areaServed: "IN",
          availableLanguage: ["en", "ml"],
        },
      ],
      founder: { "@type": "Person", name: "Dr. Thomas George" },
      affiliation: { "@type": "CollegeOrUniversity", name: "University of Calicut" },
      // Real institutional recognitions (as shown on the site).
      award: [
        "AICTE Approved",
        "NAAC Accredited (B++)",
        "NBA Accredited",
        "ISO 21001:2018 Certified",
        "UGC Recognised",
        "Autonomous status — University of Calicut",
      ],
      // Entity consolidation: authoritative + official profiles for the SAME
      // institution. Helps Google/AI confidently identify LEAD as one entity
      // and stop dropping it from results.
      sameAs: [
        "https://en.wikipedia.org/wiki/LEAD_College_of_Management",
        "https://www.wikidata.org/wiki/Q61801485",
        "https://in.linkedin.com/school/lead-college-autonomous/",
        "https://www.instagram.com/lead_college_official/",
        "https://www.facebook.com/leadcollegeofficial/",
        "https://www.youtube.com/@leadcollegeofficial",
        "https://collegedunia.com/college/55254-lead-college-of-management-palakkad",
        "https://www.shiksha.com/college/lead-college-of-management-palakkad-43312",
        "https://www.careers360.com/colleges/lead-college-of-management-palakkad",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />

        <ScrollHeader />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Sticky Footer */}
        <Footer />
      </body>
    </html>
  )
}
