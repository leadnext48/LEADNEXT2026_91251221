import type { Metadata } from "next"
import Footer from "@/components/pages/Footer"
import "./globals.css"
import ScrollHeader from "@/components/layout/ScrollHeader"

// ── Site-wide SEO constants ──────────────────────────────────────────────
// NOTE: SITE_URL is the canonical production domain. Update it if the site
// is deployed under a different host so canonical/OG/sitemap URLs stay correct.
const SITE_URL = "https://lead.ac.in"
const SITE_NAME = "LEAD College of Management"
const TITLE = "LEAD College of Management | MBA & MCA in Palakkad, Kerala"
const DESCRIPTION =
  "LEAD College of Management (Autonomous) is an AICTE-approved institution in Dhoni, Palakkad offering industry-integrated MBA and MCA programmes — a 95%+ placement record, global exposure, and mentorship from seasoned professionals. Affiliated to the University of Calicut."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Child pages that set their own `title` get "<Page> | LEAD College of Management"
    template: "%s | LEAD College of Management",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "LEAD College of Management",
    "LEAD College Palakkad",
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
        alt: "LEAD College of Management",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ScrollHeader />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Sticky Footer */}
        <Footer />
      </body>
    </html>
  )
}