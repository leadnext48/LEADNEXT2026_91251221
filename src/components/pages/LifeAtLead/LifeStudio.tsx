"use client";

import React from "react";
import { Compass, Users, Star, Mountain, Award } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, SHADOWS, RADIUS, TRANS } from "@/lib/design-tokens";
import LifeAtLeadHero from "./LifeAtLeadHero";
import LifeSectionGrid from "./LifeSectionGrid";
import LifeFeatureCard from "./LifeFeatureCard";

const STUDIO_SECTIONS = [
  {
    icon: Compass,
    title: "Turning Point – The 7‑Day Flagship Program",
    description:
      "Turning Point is LEAD's signature seven-day immersive program designed to transform mindsets and build leadership foundations. Conducted at the beginning of the academic journey, this intensive experience focuses on self-discovery, team building, discipline, and personal accountability. The program integrates experiential learning activities, reflective exercises, group challenges, and leadership workshops.",
  },
  {
    icon: Mountain,
    title: "OBT (Outbound Training)",
    description:
      "Outbound Training at LEAD is an experiential, outdoor learning program designed to build leadership, resilience, and team effectiveness. Conducted in structured real-world environments, OBT challenges students through physically and mentally engaging activities that demand collaboration, strategic thinking, and problem-solving under dynamic conditions.",
  },
  {
    icon: Users,
    title: "LOTs (Learning Operating Teams)",
    description:
      "LEAD operates through 15 Learning Operating Teams, which serve as student-led functional units responsible for various campus activities and institutional initiatives. Each LOT is guided by a faculty head, ensuring structured learning, accountability, and effective execution. These teams manage events, communication, operations, discipline, innovation, social outreach, and more.",
  },
  {
    icon: Star,
    title: "Mentoring",
    description:
      "Each student is guided by a dedicated faculty mentor who closely monitors academic progress, personal development, career direction, and overall well-being. This structured mentoring system ensures continuous feedback, guidance, and encouragement throughout the academic journey. The mentoring culture reflects LEAD's belief that leadership development requires personalized attention.",
  },
  {
    icon: Award,
    title: "Student Accolades",
    description:
      "Students at LEAD consistently achieve recognition in academics, entrepreneurship, industry competitions, and co-curricular platforms. From winning business plan contests to excelling in corporate internships and social initiatives, LEAD students demonstrate strong competence and confidence. Student accolades are celebrated as milestones of growth, innovation, and leadership excellence.",
  },
];

export default function LifeStudio() {
  return (
    <>
      <LifeAtLeadHero
        title="Studio"
        description="LEAD's flagship programs and experiential learning formats transform students into leaders through immersive, hands-on experiences that go far beyond the classroom."
        imageSrc="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80&auto=format&fit=crop"
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
            Experiential Learning
          </p>
          <h2
            style={{
              fontFamily: cinzel.style.fontFamily,
              ...TYPE.display3,
              color: COLORS.dark,
              margin: "0 0 1rem",
            }}
          >
            Programs That Transform
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
            Turning Point sets the tone for the entire academic experience, aligning students with the institution's expectations of excellence, integrity, and growth.
          </p>
        </div>

        <LifeSectionGrid columns={2}>
          {STUDIO_SECTIONS.map((s) => (
            <LifeFeatureCard
              key={s.title}
              icon={s.icon}
              title={s.title}
              description={s.description}
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
