import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2'; // Adjust the import path as needed

export default function HeroSectionDemo() {
  return (
    <div className="w-full">
      <HeroSection
       
        
        heading={
          <>
         
            <span className="text-primary">THE LEAD STORY</span>
          </>
        }
        subtitle="LEAD began as a dream in 2010, but today it stands as a promise kept. It’s not just a place to study — it’s a space to grow, explore, and become. Every classroom carries ambition, every mentor builds confidence, and every student carries a story in the making. We’re here to shape futures with purpose, not pressure. Because at LEAD, we don’t just teach — we transform."

        backgroundImage="/bgmask.jpg"
       
      />
    </div>
  );
}
