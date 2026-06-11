"use client";

import { FeatureSteps } from "@/components/ui/feature-section";
import { cinzel } from "@/app/fonts";
import { MorphingTextDemo } from "../../ui/morphing-text-demo";

const features = [
  {
    step: "Step 1",
    title: "Secure Residential Living",
    content:
      "LEAD provides comfortable residential hostels with secure access, calm study-friendly spaces, and a community built for lasting friendships.",
    image:
      "/convert/LEAD57.jpg",
  },
  {
    step: "Step 2",
    title: "Move. Train. Thrive.",
    content:
      "LEAD supports active student life with modern sports facilities, fitness zones, and wellness-focused spaces that keep you energised beyond academics.",
    image:
      "/convert/LEAD58.webp",
  },
  {
    step: "Step 3",
    title: "Green Spaces, Clear Minds",
    content:
      "LEAD offers serene green pockets and relaxing recreational spaces — a peaceful Palakkad setting that helps students reset, breathe, and stay inspired.",
    image:
      "/convert/LEAD21.webp",
  },
];

export function FeatureStepsDemo() {
  return (
    <div className="w-full">
 
 

      {/* spacing between video and feature section */}
      <div className="mt-14">
        <FeatureSteps
          features={features}
          title="Comfort, Culture, and Calm — All-in-One Campus"
          autoPlayInterval={3000}
          imageHeight="h-[500px]"
        />
      </div>
    </div>
  );
}