import type { Metadata } from "next";
import AdmissionsPage from "@/components/pages/Admissions/Admissions";

export const metadata: Metadata = {
  title: "MBA & MCA Admissions",
  description:
    "Apply to LEAD College, Palakkad — MBA & MCA admissions: eligibility, selection process, key dates and step-by-step guidance to begin your application.",
  keywords: [
    "LEAD College admissions",
    "MBA admission Kerala",
    "MCA admission Kerala",
    "MBA admission Palakkad",
    "MCA admission Palakkad",
    "how to apply LEAD College",
  ],
  alternates: { canonical: "/admissions" },
  openGraph: {
    type: "website",
    url: "/admissions",
    title: "MBA & MCA Admissions | LEAD College",
    description:
      "Eligibility, selection process, key dates and step-by-step application guidance for LEAD College's MBA and MCA programmes in Palakkad, Kerala.",
    images: ["/logolead.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA & MCA Admissions | LEAD College",
    description:
      "Eligibility, process, dates and guidance to apply for the MBA & MCA at LEAD College, Palakkad.",
    images: ["/logolead.png"],
  },
};

export default function AdmissionsRoute() {
  return (
    <main>
      <AdmissionsPage />
    </main>
  );
}
