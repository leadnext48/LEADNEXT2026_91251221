"use client";

/*  The original (v1) homepage, preserved. It now lives behind a password gate
    at /home so it can be shown on request but isn't part of public navigation.
    This is the exact composition that used to render at "/". */

import FeaturedVideoSection from "@/components/pages/LandingPage/FeaturedVideoSection";
import { FeatureStepsDemo } from "@/components/pages/LandingPage/FeatureStepsDemo";
import { PhotoGallery } from "@/components/pages/LandingPage/GalleryHero";
import HeroSection from "@/components/pages/LandingPage/HeroSection";
import OriginalThinkersSection from "@/components/pages/LandingPage/OriginalThinkersSection";
import ProgramsSection from "@/components/pages/LandingPage/ProgramsSection";
import SuccessStoriesSection from "@/components/pages/LandingPage/success-stories-section";
import WhyChooseLead from "@/components/pages/LandingPage/Whychooselead";
import { SmoothScrollHero } from "@/components/ui/modern-hero";
import { TestimonialsV2 } from "@/components/ui/testimonial-v2";

export default function LegacyHomepage() {
  return (
    <main>
      <HeroSection />
      <SmoothScrollHero />
      <OriginalThinkersSection />
      <WhyChooseLead />
      <FeaturedVideoSection />
      <ProgramsSection />
      <div className="mt-16 mb-24 sm:mt-20 sm:mb-28 lg:mt-24 lg:mb-32">
        <SuccessStoriesSection />
      </div>
      <div className="mb-24 sm:mb-28 lg:mb-32">
        <FeatureStepsDemo />
      </div>
      <PhotoGallery />
      <TestimonialsV2 />
    </main>
  );
}
