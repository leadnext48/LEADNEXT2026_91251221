"use client";

import React from "react";
import {
  Film,
  Camera,
  CalendarDays,
  Paintbrush,
  Leaf,
  PawPrint,
  Dumbbell,
  UtensilsCrossed,
  BedDouble,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import {
  COLORS,
  TYPE,
  SPACE,
  RADIUS,
} from "@/lib/design-tokens";
import LifeAtLeadHero from "@/components/pages/LifeAtLead/LifeAtLeadHero";
import LifeSectionGrid from "@/components/pages/LifeAtLead/LifeSectionGrid";
import LifeFeatureCard from "@/components/pages/LifeAtLead/LifeFeatureCard";

const sections = [
  {
    title: "Video Gallery",
    href: "/life-at-lead/video-gallery",
    description: "Visual stories capturing the energy and experiences of Life at LEAD.",
    icon: Film,
  },
  {
    title: "Photo Gallery",
    href: "/life-at-lead/photo-gallery",
    description: "Memorable campus moments from classrooms to celebrations.",
    icon: Camera,
  },
  {
    title: "Events",
    href: "/life-at-lead/events",
    description: "Academic, cultural, entrepreneurial, and social events throughout the year.",
    icon: CalendarDays,
  },
  {
    title: "Studio",
    href: "/life-at-lead/studio",
    description: "Turning Point, OBT, LOTs, Mentoring, and experiential programs.",
    icon: Paintbrush,
  },
  {
    title: "Farm & Nature",
    href: "/life-at-lead/farm-nature",
    description: "24 acres of green landscape integrating sustainability into daily living.",
    icon: Leaf,
  },
  {
    title: "Pets & Campus Life",
    href: "/life-at-lead/pets",
    description: "Unique biodiversity — snakes, emus, birds, fish, cats, and dogs.",
    icon: PawPrint,
  },
  {
    title: "Sports & Recreation",
    href: "/life-at-lead/sports",
    description: "Fitness, teamwork, resilience, and competitive spirit.",
    icon: Dumbbell,
  },
  {
    title: "Canteen",
    href: "/life-at-lead/canteen",
    description: "Hygienic, nutritious meals with farm-to-table freshness.",
    icon: UtensilsCrossed,
  },
  {
    title: "Hostel",
    href: "/life-at-lead/hostel",
    description: "Structured residential life fostering discipline and peer learning.",
    icon: BedDouble,
  },
];

export default function LifeAtLeadLanding() {
  return (
    <main>
      <LifeAtLeadHero
        title="Life at LEAD"
        description="Life at LEAD College extends far beyond classrooms and academic schedules. As a fully residential campus set amidst 24 acres of greenery at Dhoni, LEAD offers an immersive learning environment where students grow intellectually, professionally, and personally."
        imageSrc="https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1920&q=80&auto=format&fit=crop"
      />

      {/* Overview Section */}
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
            Campus Experience
          </p>
          <h2
            style={{
              fontFamily: cinzel.style.fontFamily,
              ...TYPE.display3,
              color: COLORS.dark,
              margin: "0 0 1rem",
            }}
          >
            Discover What Makes LEAD Unique
          </h2>
          <p
            style={{
              fontFamily: playfair.style.fontFamily,
              ...TYPE.body,
              color: COLORS.textMuted,
              maxWidth: "60ch",
              margin: "0 auto",
            }}
          >
            Every aspect of campus life is designed to nurture leadership,
            discipline, collaboration, and holistic development. Explore the
            many facets that make Life at LEAD an extraordinary experience.
          </p>
        </div>

        <LifeSectionGrid columns={3}>
          {sections.map((section) => (
            <LifeFeatureCard
              key={section.title}
              icon={section.icon}
              title={section.title}
              description={section.description}
              href={section.href}
            />
          ))}
        </LifeSectionGrid>
      </section>

      {/* Bottom highlight */}
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
            margin: "0 0 1rem",
          }}
        >
          Holistic Development at Its Best
        </h2>
        <p
          style={{
            fontFamily: playfair.style.fontFamily,
            ...TYPE.body,
            color: COLORS.textMuted,
            maxWidth: "55ch",
            margin: "0 auto 2rem",
          }}
        >
          Life at LEAD continues both on campus and across digital platforms,
          building a strong and connected academic community.
        </p>
        <a
          href="/admissions/overview"
          style={{
            display: "inline-block",
            fontFamily: cinzel.style.fontFamily,
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#fff",
            background: COLORS.primary,
            padding: "0.9rem 2.5rem",
            borderRadius: RADIUS.pill,
            textDecoration: "none",
          }}
        >
          Apply Now
        </a>
      </section>
    </main>
  );
}
