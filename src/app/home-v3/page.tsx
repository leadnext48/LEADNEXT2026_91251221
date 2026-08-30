import type { Metadata } from "next";
import HomeLandingV3 from "@/components/pages/HomeV3/HomeLandingV3";

// Preview of the redesigned homepage (Taste-skill build). Kept out of search
// indexes and not linked from public navigation — reachable only by URL, so it
// does not compete with the live homepage for ranking.
export const metadata: Metadata = {
  title: "Homepage Preview — LEAD College",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function HomeV3Route() {
  return <HomeLandingV3 />;
}
