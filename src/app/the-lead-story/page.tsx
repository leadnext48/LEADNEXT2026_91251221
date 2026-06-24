import type { Metadata } from "next";
import HorizontalParallaxTimeline from "@/components/pages/About Us/HorizontalParallaxTimeline";
import HeroSectionDemo from "@/components/pages/About Us/TheLeadStory";

export const metadata: Metadata = {
  title: "About Us — Our Story",
  description:
    "Founded in 2010 in Palakkad, LEAD College grew from 58 determined students into a thriving autonomous institution where education is rooted in courage, conscience and transformation.",
  keywords: [
    "About LEAD College",
    "LEAD College story",
    "LEAD College history",
    "autonomous college Palakkad",
    "LEAD College Kerala",
  ],
  alternates: { canonical: "/the-lead-story" },
  openGraph: {
    type: "article",
    url: "/the-lead-story",
    title: "About Us — The LEAD College Story",
    description:
      "From 58 students in 2010 to a thriving autonomous institution in Palakkad — the story of LEAD College, where we don't just teach, we transform.",
    images: ["/convert/LEAD01.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — The LEAD College Story",
    description:
      "From 58 students in 2010 to a thriving autonomous institution in Palakkad — the LEAD College story.",
    images: ["/convert/LEAD01.webp"],
  },
};

export default function LeadStory() {
  return (
    <main>
      <HeroSectionDemo />
      <HorizontalParallaxTimeline />
    </main>
  );
}
