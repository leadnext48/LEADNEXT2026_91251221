"use client";

import React from "react";
import { CalendarDays, Mic, Award, Presentation, Users } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, RADIUS } from "@/lib/design-tokens";
import LifeAtLeadHero from "./LifeAtLeadHero";
import LifeSectionGrid from "./LifeSectionGrid";
import LifeFeatureCard from "./LifeFeatureCard";

const EVENT_TYPES = [
  {
    icon: Presentation,
    title: "Workshops & Seminars",
    description: "Industry-focused sessions bringing real-world expertise to students through interactive learning formats.",
  },
  {
    icon: Mic,
    title: "Industry Talks",
    description: "Renowned professionals share insights on leadership, management, and emerging industry trends.",
  },
  {
    icon: Award,
    title: "Competitions",
    description: "Business plan contests, case competitions, and innovation challenges that sharpen strategic thinking.",
  },
  {
    icon: CalendarDays,
    title: "Cultural Festivals",
    description: "Vibrant celebrations of art, culture, and talent that foster creativity and community spirit.",
  },
  {
    icon: Users,
    title: "Leadership Programs",
    description: "Structured programs designed to build leadership capacity through experiential and reflective learning.",
  },
];

export default function LifeEvents() {
  return (
    <>
      <LifeAtLeadHero
        title="Events"
        description="LEAD hosts a wide range of academic, cultural, entrepreneurial, and social events throughout the year. These include workshops, seminars, industry talks, competitions, festivals, and leadership programs."
        imageSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80&auto=format&fit=crop"
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
            Campus Events
          </p>
          <h2
            style={{
              fontFamily: cinzel.style.fontFamily,
              ...TYPE.display3,
              color: COLORS.dark,
              margin: "0 0 1rem",
            }}
          >
            A Dynamic Campus Calendar
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
            Events are often organized and managed by students through LOTs, providing practical exposure to planning and execution. Each event contributes to skill enhancement, confidence building, and institutional culture.
          </p>
        </div>

        <LifeSectionGrid columns={3}>
          {EVENT_TYPES.map((event) => (
            <LifeFeatureCard
              key={event.title}
              icon={event.icon}
              title={event.title}
              description={event.description}
            />
          ))}
        </LifeSectionGrid>
      </section>

      {/* CTA */}
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
          Discover More
        </a>
      </section>
    </>
  );
}
