"use client";

import React from "react";
import { BedDouble, Users, Clock, Shield } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, RADIUS } from "@/lib/design-tokens";
import LifeAtLeadHero from "./LifeAtLeadHero";
import LifeSectionGrid from "./LifeSectionGrid";
import LifeFeatureCard from "./LifeFeatureCard";

const FEATURES = [
  {
    icon: BedDouble,
    title: "Safe & Well-Maintained",
    description:
      "As a fully residential institution, LEAD provides a structured and disciplined hostel environment that supports focused academic engagement. Students benefit from safe, well-maintained accommodations.",
  },
  {
    icon: Users,
    title: "Community & Peer Learning",
    description:
      "Residential life fosters community bonding, time management, and shared responsibility. The hostel environment plays a significant role in shaping professional discipline and interpersonal maturity.",
  },
  {
    icon: Clock,
    title: "Disciplined Routine",
    description:
      "The structured residential environment encourages students to develop time management skills and a disciplined approach to academics and daily life.",
  },
  {
    icon: Shield,
    title: "Immersive Learning Culture",
    description:
      "Living on campus strengthens the immersive learning culture that defines Life at LEAD. The hostel is designed to encourage collaboration and peer learning.",
  },
];

export default function LifeHostel() {
  return (
    <>
      <LifeAtLeadHero
        title="Hostel"
        description="As a fully residential institution, LEAD provides a structured and disciplined hostel environment that supports focused academic engagement. Students benefit from safe, well-maintained accommodations designed to encourage collaboration and peer learning."
        imageSrc="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1920&q=80&auto=format&fit=crop"
      />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: `${SPACE.sectionY} ${SPACE.sectionX}` }}>
        <div style={{ textAlign: "center", marginBottom: SPACE.colGapLg }}>
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "0.75rem" }}>
            Residential Life
          </p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: "0 0 1rem" }}>
            Home Away From Home
          </h2>
          <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: COLORS.textMuted, maxWidth: "55ch", margin: "0 auto" }}>
            Residential life fosters community bonding, time management, and shared responsibility. Living on campus strengthens the immersive learning culture that defines Life at LEAD.
          </p>
        </div>

        <LifeSectionGrid columns={2}>
          {FEATURES.map((f) => (
            <LifeFeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </LifeSectionGrid>
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
