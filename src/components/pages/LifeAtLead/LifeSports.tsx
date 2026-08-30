"use client";

import React from "react";
import { Dumbbell, Trophy, Heart, Zap } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, RADIUS } from "@/lib/design-tokens";
import LifeAtLeadHero from "./LifeAtLeadHero";
import LifeSectionGrid from "./LifeSectionGrid";
import LifeFeatureCard from "./LifeFeatureCard";
import LifeGallery from "./LifeGallery";

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Indoor & Outdoor Sports",
    description:
      "LEAD provides facilities and opportunities for indoor and outdoor sports, encouraging students to maintain physical health alongside academic rigor.",
  },
  {
    icon: Trophy,
    title: "Competitive Spirit",
    description:
      "Sports activities promote teamwork, resilience, stress management, and competitive spirit. Students participate in inter-collegiate and intra-collegiate events.",
  },
  {
    icon: Heart,
    title: "Wellness & Balance",
    description:
      "Recreational spaces provide balance, ensuring that students remain energized and motivated. The institution believes that leadership development must include physical vitality.",
  },
  {
    icon: Zap,
    title: "Emotional Well-being",
    description:
      "Physical fitness and recreation form an integral part of campus life. The institution believes that leadership development must include physical vitality and emotional well-being.",
  },
];

const GALLERY_ITEMS = [
  { src: "https://images.unsplash.com/photo-1461896836934-bd45ba8b2cda?w=600&q=80&auto=format&fit=crop", alt: "Sports ground" },
  { src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80&auto=format&fit=crop", alt: "Indoor games" },
  { src:"/sports2.jpg", alt: "Team sports" },
];

export default function LifeSports() {
  return (
    <>
      <LifeAtLeadHero
        title="Sports & Recreation"
        description="Physical fitness and recreation form an integral part of campus life. LEAD provides facilities and opportunities for indoor and outdoor sports, encouraging students to maintain physical health alongside academic rigor."
        imageSrc="/sports1.jpg"
      />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: `${SPACE.sectionY} ${SPACE.sectionX}` }}>
        <div style={{ textAlign: "center", marginBottom: SPACE.colGapLg }}>
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "0.75rem" }}>
            Fitness & Recreation
          </p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: "0 0 1rem" }}>
            Strength Through Sport
          </h2>
        </div>

        <div className="lifesports-features">
          <style>{`
            @media (max-width: 640px) {
              .lifesports-features > div {
                grid-template-columns: minmax(0, 1fr) !important;
              }
            }
          `}</style>
          <LifeSectionGrid columns={2}>
            {FEATURES.map((f) => (
              <LifeFeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </LifeSectionGrid>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${SPACE.sectionX} ${SPACE.sectionY}` }}>
        <h3 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display2, color: COLORS.dark, textAlign: "center", marginBottom: SPACE.colGapLg }}>
          Sports at LEAD
        </h3>
        <LifeGallery items={GALLERY_ITEMS} />
      </section>

      {/* CTA */}
      <section style={{ background: COLORS.bgSoft, padding: `${SPACE.sectionY} ${SPACE.sectionX}`, textAlign: "center" }}>
        <h2 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: "0 0 1.5rem" }}>
          Explore Campus Life at LEAD
        </h2>
        <a href="/life-at-lead" style={{ display: "inline-block", fontFamily: cinzel.style.fontFamily, fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: COLORS.primary, padding: "0.9rem 2.5rem", borderRadius: RADIUS.pill, textDecoration: "none" }}>
          Discover More
        </a>
      </section>
    </>
  );
}
