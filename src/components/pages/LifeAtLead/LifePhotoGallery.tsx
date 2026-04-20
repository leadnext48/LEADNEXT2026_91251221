"use client";

import React from "react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, RADIUS } from "@/lib/design-tokens";
import LifeAtLeadHero from "./LifeAtLeadHero";
import LifeGallery from "./LifeGallery";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&q=80&auto=format&fit=crop", alt: "Classroom engagement" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80&auto=format&fit=crop", alt: "Incubation activities" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop", alt: "Student celebrations" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop", alt: "Sports events" },
  { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80&auto=format&fit=crop", alt: "Campus life" },
  { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80&auto=format&fit=crop", alt: "Industry interactions" },
  { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80&auto=format&fit=crop", alt: "Cultural events" },
  { src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80&auto=format&fit=crop", alt: "Leadership programs" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop", alt: "Campus greenery" },
];

export default function LifePhotoGallery() {
  return (
    <>
      <LifeAtLeadHero
        title="Photo Gallery"
        description="The Photo Gallery documents memorable campus moments — from classroom engagement and incubation activities to sports events and celebrations."
        imageSrc="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&q=80&auto=format&fit=crop"
      />

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: `${SPACE.sectionY} ${SPACE.sectionX}`,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: SPACE.colGapLg }}>
          <p
            style={{
              fontFamily: cinzel.style.fontFamily,
              ...TYPE.eyebrow,
              color: COLORS.primary,
              marginBottom: "0.75rem",
            }}
          >
            Campus Moments
          </p>
          <h2
            style={{
              fontFamily: cinzel.style.fontFamily,
              ...TYPE.display3,
              color: COLORS.dark,
              margin: "0 0 1rem",
            }}
          >
            Capturing the LEAD Spirit
          </h2>
          <p
            style={{
              fontFamily: playfair.style.fontFamily,
              ...TYPE.body,
              color: COLORS.textMuted,
              maxWidth: "55ch",
              margin: "0 auto",
            }}
          >
            It reflects the vibrancy, diversity, and spirit of the LEAD community while preserving institutional memories.
          </p>
        </div>

        <LifeGallery items={PHOTOS} />
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}

function CTASection() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <section
      style={{
        background: COLORS.bgSoft,
        padding: `${SPACE.sectionY} ${SPACE.sectionX}`,
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontFamily: cinzel.style.fontFamily,
          ...TYPE.display3,
          color: COLORS.dark,
          margin: "0 0 1.5rem",
        }}
      >
        Explore Campus Life at LEAD
      </h2>
      <a
        href="/life-at-lead"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-block",
          fontFamily: cinzel.style.fontFamily,
          fontSize: "0.85rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#fff",
          background: hovered ? COLORS.primaryDark : COLORS.primary,
          padding: "0.9rem 2.5rem",
          borderRadius: RADIUS.pill,
          textDecoration: "none",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        Discover More
      </a>
    </section>
  );
}
