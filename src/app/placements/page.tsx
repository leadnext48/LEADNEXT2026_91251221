import type { Metadata } from "next";
import PlacementsPage from "@/components/pages/Academics/Placementspage";

export const metadata: Metadata = {
  title: "Placements & Career Outcomes",
  description:
    "LEAD College placements: 90%+ placement records across batches, packages up to ₹21.67 LPA, and 200+ recruiters including Federal Bank, HDFC Life and Axis Bank, backed by six months of pre-placement training.",
  keywords: [
    "LEAD College placements",
    "MBA placements Kerala",
    "MBA placement record Palakkad",
    "top MBA recruiters Kerala",
    "highest package LEAD College",
  ],
  alternates: { canonical: "/placements" },
  openGraph: {
    type: "website",
    url: "/placements",
    title: "Placements & Career Outcomes | LEAD College",
    description:
      "90%+ placement records, packages up to ₹21.67 LPA, and 200+ recruiters — Federal Bank, HDFC Life, Axis Bank, ITC — with six months of pre-placement training.",
    images: ["/logolead.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Placements & Career Outcomes | LEAD College",
    description:
      "90%+ placements, packages up to ₹21.67 LPA, and 200+ recruiters at LEAD College, Palakkad.",
    images: ["/logolead.png"],
  },
};

export default function PlacementsRoute() {
  return (
    <main>
      <PlacementsPage />
    </main>
  );
}
