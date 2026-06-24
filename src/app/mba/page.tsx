import type { Metadata } from "next";
import MBACinematicPage from "@/components/pages/Academics/MBAPage";

export const metadata: Metadata = {
  title: "MBA Programme",
  description:
    "LEAD College's 2-year residential MBA — industry-integrated, with internships every semester, live industry & startup projects, and specialisations in Marketing, Finance, HR and Analytics.",
  keywords: [
    "MBA in Palakkad",
    "MBA in Kerala",
    "residential MBA Kerala",
    "industry integrated MBA",
    "best MBA college Kerala",
    "LEAD College MBA",
  ],
  alternates: { canonical: "/mba" },
  openGraph: {
    type: "website",
    url: "/mba",
    title: "MBA Programme | LEAD College",
    description:
      "A 2-year, industry-integrated residential MBA with internships every semester, live industry & startup projects, and specialisations in Marketing, Finance, HR and Analytics.",
    images: ["/convert/LEAD33.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA Programme | LEAD College",
    description:
      "A 2-year residential, industry-integrated MBA at LEAD College, Palakkad — internships every semester and four specialisations.",
    images: ["/convert/LEAD33.webp"],
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Master of Business Administration (MBA)",
  description:
    "A 2-year, industry-integrated and fully residential MBA at LEAD College, Palakkad, with internships every semester, live industry, research and startup projects, and specialisations in Marketing, Finance, Human Resources and Analytics. Affiliated to the University of Calicut.",
  url: "https://lead.ac.in/mba",
  provider: {
    "@type": "CollegeOrUniversity",
    name: "LEAD College",
    url: "https://lead.ac.in",
  },
  educationalCredentialAwarded: "Master of Business Administration (MBA)",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    courseWorkload: "P2Y",
    location: {
      "@type": "Place",
      name: "LEAD College",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dhoni PO",
        addressLocality: "Palakkad",
        addressRegion: "Kerala",
        postalCode: "678009",
        addressCountry: "IN",
      },
    },
  },
};

export default function MBARoute() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <MBACinematicPage />
    </main>
  );
}
