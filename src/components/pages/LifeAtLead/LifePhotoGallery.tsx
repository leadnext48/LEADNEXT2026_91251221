"use client";

import React from "react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, RADIUS } from "@/lib/design-tokens";
import LifeAtLeadHero from "./LifeAtLeadHero";
import LifeGallery from "./LifeGallery";

interface GalleryItem {
  src: string;
  alt: string;
}

export default function LifePhotoGallery({ photos = [] }: { photos?: GalleryItem[] }) {
  return (
    <>
      <LifeAtLeadHero
        title="Photo Gallery"
        description="The Photo Gallery documents memorable campus moments — from classroom engagement and incubation activities to sports events and celebrations."
        imageSrc="/convert/LEAD32.webp"
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

        <LifeGallery items={photos} />
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
