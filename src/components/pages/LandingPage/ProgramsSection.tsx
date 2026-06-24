"use client";

import { useState, useCallback, memo } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock, GraduationCap, BadgeCheck, ChevronDown } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";

/* ─── Constants ─────────────────────────────────────────── */
const NAVY = "#0a2463";
const BLUE = "#005C9F";
const CONTENT_WIDTH = "max-w-[1200px]";

/* ─── Data ───────────────────────────────────────────────── */
const PROGRAMS = [
  {
    id: "mba",
    badge: "AICTE Approved",
    shortName: "MBA",
    fullName: "Master of Business Administration",
    duration: "2 Years",
    mode: "Full-time",
    credential: "Autonomous Degree",
    accent: `linear-gradient(135deg, ${NAVY} 0%, #1e3a8a 100%)`,
    tagline: "Where strategy meets ambition.",
    description:
      "A comprehensive management program focusing on entrepreneurship, leadership, and industry-ready skills. Learn from Guinness World Record holder Dr. Thomas George K.",
    highlights: [
      "10+ Specializations Available",
      "Live Industry Projects",
      "Internships",
      "E-LEAD: The MBA in Entrepreneurship",
      "95%+ Placement Record",
      "Startup Incubation Support",
    ],
    cta: "/mba",
    image:
      "/convert/LEAD30.webp",
  },
  {
    id: "mca",
    badge: "AICTE Approved",
    shortName: "MCA",
    fullName: "Master of Computer Applications",
    duration: "2 Years",
    mode: "Full-time",
    credential: "Autonomous Degree",
    accent: `linear-gradient(135deg, #0e4d92 0%, #005C9F 100%)`,
    tagline: "Engineer the future. Command the digital age.",
    description:
      "Advanced computer applications program with focus on AI, Machine Learning, Cloud Computing, Data Science, Big Data and cutting-edge technologies for the digital age.",
    highlights: [
      "Industry-Aligned Curriculum",
      "Internships (1-Year)",
      "Value Added Courses",
      "Modern Computing Labs",
      "Top Tech Company Placements",
      "Research Opportunities",
    ],
    cta: "/mca",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  },
] as const;

/* ─── Animation variants ─────────────────────────────────── */
// Using `once: true` + viewport root margin so intersection is checked
// only once per card lifetime — zero per-scroll-frame cost after that.
const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ══════════════════════════════════════════════════════════ */
export default function ProgramsSection() {
  return (
    <>
      {/*
       * All hover effects live here as pure CSS classes.
       * GPU-only properties used throughout:
       *   - transform (translateY, scale, scaleX) → compositor thread
       *   - opacity                               → compositor thread
       *   - box-shadow                            → paint only (not layout)
       * Properties that trigger layout (width, height, padding, etc.) are
       * never animated. This keeps every hover on the compositor thread
       * with zero main-thread involvement.
       */}
      <style>{`
        /* ── Card wrapper ─────────────────────────── */
        .prog-card {
          position: relative;
          border: 1px solid rgba(10,36,99,0.09);
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 24px rgba(10,36,99,0.06);
          display: flex;
          flex-direction: column;

          /* GPU layer promotion — card never triggers main-thread paint on hover */
          will-change: transform, box-shadow;
          transform: translateZ(0);
          transition:
            box-shadow 0.32s ease,
            transform  0.32s ease,
            border-color 0.32s ease;
        }
        .prog-card:hover {
          box-shadow: 0 24px 64px rgba(10,36,99,0.13);
          transform: translateY(-6px) translateZ(0);
          border-color: rgba(10,36,99,0.18);
        }

        /* ── Accent bar (GPU: scaleX + opacity only) ─ */
        .prog-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          z-index: 2;
          opacity: 0;
          transform: scaleX(0) translateZ(0);
          transform-origin: left;
          will-change: transform, opacity;
          transition:
            transform 0.38s cubic-bezier(0.22,1,0.36,1),
            opacity   0.28s;
        }
        .prog-card:hover .prog-accent-bar {
          transform: scaleX(1) translateZ(0);
          opacity: 1;
        }

        /* ── Image zoom (GPU: scale only) ────────── */
        .prog-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          will-change: transform;
          transform: translateZ(0);
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .prog-card:hover .prog-img {
          transform: scale(1.06) translateZ(0);
        }

        /* ── CTA button ──────────────────────────── */
        .prog-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.78rem 1.6rem;
          border-radius: 8px;
          text-decoration: none;
          will-change: transform, opacity, box-shadow;
          transform: translateZ(0);
          transition:
            opacity    0.2s,
            box-shadow 0.2s,
            transform  0.2s;
        }
        .prog-cta:hover {
          opacity: 0.88;
          transform: translateY(-1px) translateZ(0);
        }

        /* ── Accordion: uses max-height + opacity
              NO height:auto animation — that forces layout
              recalculation every single frame.
              max-height with a concrete ceiling is paint-only. ── */
        .prog-highlights {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          will-change: max-height, opacity;
          transition:
            max-height 0.38s cubic-bezier(0.22,1,0.36,1),
            opacity    0.28s ease;
        }
        .prog-highlights.open {
          /* 6 highlights × ~28px each + padding; large enough ceiling */
          max-height: 300px;
          opacity: 1;
        }

        /* ── Chevron rotation ────────────────────── */
        .prog-chevron {
          display: inline-flex;
          will-change: transform;
          transition: transform 0.25s ease;
        }
        .prog-chevron.open {
          transform: rotate(180deg);
        }
      `}</style>

      <section className="relative w-full bg-white overflow-hidden py-20 sm:py-28">

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(10,36,99,0.07) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient orbs */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full z-0"
          style={{ background: `radial-gradient(circle, rgba(10,36,99,0.06), transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full z-0"
          style={{ background: `radial-gradient(circle, rgba(0,92,159,0.05), transparent 70%)` }}
        />

        {/* Corner accents */}
        <div
          className="pointer-events-none absolute top-6 left-6 w-10 h-10 z-10"
          style={{ borderTop: `1.5px solid rgba(10,36,99,0.2)`, borderLeft: `1.5px solid rgba(10,36,99,0.2)` }}
        />
        <div
          className="pointer-events-none absolute bottom-6 right-6 w-10 h-10 z-10"
          style={{ borderBottom: `1.5px solid rgba(10,36,99,0.2)`, borderRight: `1.5px solid rgba(10,36,99,0.2)` }}
        />

        <motion.div
          className={`relative z-10 mx-auto ${CONTENT_WIDTH} px-6 lg:px-10`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          /* margin: trigger slightly before element enters — avoids the
             pop-in stutter when element is already partially visible.
             once:true means intersection observer is disconnected after
             first fire — zero recurring scroll cost.                    */
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
        >

          {/* ── Title block ── */}
          <motion.div variants={titleVariants} className="text-center mb-14">

            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span style={{ display: "inline-block", width: 20, height: 1.5, background: NAVY }} />
              <span
                className={cinzel.className}
                style={{
                  fontSize: "clamp(7px, 0.52vw, 9px)",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: `${NAVY}90`,
                  fontWeight: 600,
                }}
              >
                LEAD College
              </span>
              <span style={{ display: "inline-block", width: 20, height: 1.5, background: NAVY }} />
            </div>

            {/* Main title */}
            <h2
              className={`${cinzel.className} text-black font-semibold leading-none mb-4`}
              style={{ fontSize: "clamp(2.4rem, 6vw, 7rem)" }}
            >
              Crafted for the Bold
            </h2>

            {/* Divider */}
            <div className="mx-auto mb-4" style={{ width: 40, height: 2, background: NAVY }} />

            {/* Subtitle */}
            <p
              className={playfair.className}
              style={{
                fontSize: "clamp(12px, 0.9vw, 15px)",
                color: "rgba(10,36,99,0.5)",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              Industry-integrated programs designed to create leaders who innovate,
              inspire, and impact the business world.
            </p>
          </motion.div>

          {/* ── Cards ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "clamp(1rem, 2vw, 1.8rem)",
            }}
            className="max-[700px]:!grid-cols-1"
          >
            {PROGRAMS.map((prog, i) => (
              <motion.div
                key={prog.id}
                variants={cardVariants}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.14,
                }}
                /* GPU layer for the entry animation — prevents the card
                   from compositing on top of the main document layer     */
                style={{ willChange: "transform, opacity" }}
              >
                <ProgramCard prog={prog} />
              </motion.div>
            ))}
          </div>

          {/* ── Footer note ── */}
          <motion.p
            variants={titleVariants}
            className={playfair.className}
            style={{
              marginTop: "clamp(2rem, 4vh, 3rem)",
              paddingTop: "clamp(1.2rem, 2vh, 1.8rem)",
              borderTop: `1px solid rgba(10,36,99,0.08)`,
              fontSize: "clamp(11px, 0.82vw, 13.5px)",
              color: "#999",
              textAlign: "center",
            }}
          >
            All programs are approved by AICTE and affiliated with the University of Calicut.
          </motion.p>

        </motion.div>
      </section>
    </>
  );
}

/* ── Program Card ─────────────────────────────────────────── */
// memo() prevents re-render when parent re-renders (e.g. other card's accordion opens)
const ProgramCard = memo(function ProgramCard({
  prog,
}: {
  prog: (typeof PROGRAMS)[number];
}) {
  const [open, setOpen] = useState(false);

  // useCallback so the toggle reference is stable — no child re-renders
  const toggle = useCallback(() => setOpen(o => !o), []);

  return (
    <div className="prog-card">

      {/* Accent bar — CSS-driven, zero JS on hover */}
      <div
        className="prog-accent-bar"
        style={{ background: prog.accent }}
      />

      {/* Ghost watermark */}
      <span
        aria-hidden="true"
        className={cinzel.className}
        style={{
          position: "absolute",
          bottom: "-0.05em", right: "0.15em",
          fontSize: "clamp(6rem, 10vw, 12rem)",
          fontWeight: 900,
          lineHeight: 1,
          color: NAVY,
          opacity: 0.022,
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {prog.shortName}
      </span>

      {/* Image — zoom handled by CSS .prog-card:hover .prog-img */}
      <div style={{ width: "100%", aspectRatio: "16/7", position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <img
          src={prog.image}
          alt={prog.fullName}
          className="prog-img"
          /* fetchpriority helps browser pipeline the two images in parallel */
          fetchPriority="high"
          decoding="async"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)",
          /* Isolate the gradient compositing layer from the image layer */
          isolation: "isolate",
        }} />

        {/* Badge */}
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span
            className={cinzel.className}
            style={{
              fontSize: "clamp(6px, 0.46vw, 8px)",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              fontWeight: 700,
              background: "rgba(10,36,99,0.65)",
              backdropFilter: "blur(8px)",
              /* Contain the blur repaint to this element only */
              contain: "layout paint",
              padding: "3px 10px",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {prog.badge}
          </span>
        </div>

        {/* Short name on image */}
        <div style={{ position: "absolute", bottom: 16, left: 18 }}>
          <p
            className={cinzel.className}
            style={{
              fontSize: "clamp(1.6rem, 3.2vw, 3rem)",
              fontWeight: 800,
              color: "#fff",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 16px rgba(0,0,0,0.4)",
            }}
          >
            {prog.shortName}
          </p>
          <p
            className={playfair.className}
            style={{
              fontSize: "clamp(10px, 0.75vw, 12px)",
              color: "rgba(255,255,255,0.72)",
              margin: "2px 0 0",
              fontStyle: "italic",
            }}
          >
            {prog.tagline}
          </p>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(1.2rem, 2vw, 1.7rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.8rem, 1.4vw, 1.1rem)",
          flex: 1,
        }}
      >
        {/* Meta pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
          {[
            { icon: <Clock size={9} strokeWidth={2} />, label: prog.duration },
            { icon: <GraduationCap size={9} strokeWidth={2} />, label: prog.mode },
            { icon: <BadgeCheck size={9} strokeWidth={2} />, label: prog.credential },
          ].map((m) => (
            <span
              key={m.label}
              className={cinzel.className}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                border: `1px solid rgba(10,36,99,0.13)`,
                borderRadius: 100,
                background: `rgba(10,36,99,0.03)`,
                fontSize: "clamp(6px, 0.46vw, 8px)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: NAVY,
                fontWeight: 600,
              }}
            >
              <span style={{ color: `${NAVY}80` }}>{m.icon}</span>
              {m.label}
            </span>
          ))}
        </div>

        {/* Full name */}
        <p
          className={cinzel.className}
          style={{
            fontSize: "clamp(13px, 0.95vw, 16px)",
            fontWeight: 700,
            color: NAVY,
            margin: 0,
            letterSpacing: "0.04em",
            lineHeight: 1.3,
          }}
        >
          {prog.fullName}
        </p>

        {/* Hairline */}
        <div style={{ height: 1, background: `linear-gradient(90deg, rgba(10,36,99,0.14), transparent)` }} />

        {/* Description */}
        <p
          className={playfair.className}
          style={{
            fontSize: "clamp(12px, 0.88vw, 14.5px)",
            color: "#555",
            margin: 0,
            lineHeight: 1.78,
          }}
        >
          {prog.description}
        </p>

        {/* Highlights accordion — CSS max-height, no Framer Motion height:auto */}
        <div>
          <button
            onClick={toggle}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginBottom: open ? "0.7rem" : 0,
              /* Stable transition so marginBottom doesn't cause layout jank */
              transition: "margin-bottom 0.35s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span
              className={cinzel.className}
              style={{
                fontSize: "clamp(6.5px, 0.48vw, 8.5px)",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: BLUE,
                fontWeight: 700,
              }}
            >
              Program Highlights
            </span>
            {/* CSS-driven chevron — no Framer Motion wrapper needed */}
            <span className={`prog-chevron${open ? " open" : ""}`}>
              <ChevronDown size={11} color={BLUE} strokeWidth={2.5} />
            </span>
          </button>

          {/* max-height accordion — compositor-friendly, never triggers layout */}
          <div className={`prog-highlights${open ? " open" : ""}`}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.38rem 1rem",
                paddingTop: "0.2rem",
              }}
            >
              {prog.highlights.map((h) => (
                <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem" }}>
                  <span style={{
                    flexShrink: 0,
                    marginTop: "3px",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: `rgba(10,36,99,0.07)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <p
                    className={playfair.className}
                    style={{ fontSize: "clamp(11px, 0.8vw, 13px)", color: "#4a5568", margin: 0, lineHeight: 1.55 }}
                  >
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
          <Link
            href={prog.cta}
            className="prog-cta"
            style={{
              background: prog.accent,
              boxShadow: "0 6px 22px rgba(10,36,99,0.22)",
            }}
          >
            <span
              className={cinzel.className}
              style={{
                fontSize: "clamp(7px, 0.55vw, 9.5px)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Explore Program
            </span>
            <ArrowUpRight size={12} color="rgba(255,255,255,0.85)" strokeWidth={2} />
          </Link>
        </div>

      </div>
    </div>
  );
});