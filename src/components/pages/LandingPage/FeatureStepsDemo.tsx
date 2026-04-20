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
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&auto=format&fit=crop&q=80",
  },
  {
    step: "Step 2",
    title: "Move. Train. Thrive.",
    content:
      "LEAD supports active student life with modern sports facilities, fitness zones, and wellness-focused spaces that keep you energised beyond academics.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=80",
  },
  {
    step: "Step 3",
    title: "Green Spaces, Clear Minds",
    content:
      "LEAD offers serene green pockets and relaxing recreational spaces — a peaceful Palakkad setting that helps students reset, breathe, and stay inspired.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
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