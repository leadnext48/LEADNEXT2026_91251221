import type { Metadata } from "next";
import MCACinematicPage from "@/components/pages/Academics/MCAPage";

export const metadata: Metadata = {
  title: "MCA Programme",
  description:
    "LEAD College's 2-year MCA — a future-ready programme spanning AI & Machine Learning, Data Science, Cloud Computing, Generative AI and Cyber Security, with lab-intensive learning and industry internships.",
  keywords: [
    "MCA in Palakkad",
    "MCA in Kerala",
    "AI MCA Kerala",
    "Data Science MCA",
    "Cloud Computing MCA",
    "LEAD College MCA",
  ],
  alternates: { canonical: "/mca" },
  openGraph: {
    type: "website",
    url: "/mca",
    title: "MCA Programme | LEAD College",
    description:
      "A future-ready 2-year MCA covering AI & Machine Learning, Data Science, Cloud, Generative AI and Cyber Security, with lab-intensive learning and industry internships.",
    images: ["/convert/LEAD11.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MCA Programme | LEAD College",
    description:
      "A future-ready 2-year MCA at LEAD College, Palakkad — AI/ML, Data Science, Cloud, GenAI and Cyber Security.",
    images: ["/convert/LEAD11.webp"],
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Master of Computer Applications (MCA)",
  description:
    "A 2-year, future-ready MCA at LEAD College, Palakkad, covering Cloud Computing, AI & Machine Learning, Data Science & Big Data, Generative AI, Cyber Security & Forensics, modern web frameworks and software engineering, with lab-intensive learning and industry internships. Affiliated to the University of Calicut.",
  url: "https://lead.ac.in/mca",
  provider: {
    "@type": "CollegeOrUniversity",
    name: "LEAD College",
    url: "https://lead.ac.in",
  },
  educationalCredentialAwarded: "Master of Computer Applications (MCA)",
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

export default function MCARoute() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <MCACinematicPage />
    </main>
  );
}
