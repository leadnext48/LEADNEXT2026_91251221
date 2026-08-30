"use client";

import Image from "next/image";
import { playfair, cinzel } from "@/app/fonts";
import { useEffect, useRef, useState } from "react";

const BLUE = "#005C9F";

/* ─── small hook: fires once when element enters viewport ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── awards data ─── */
const awards = [
  {
    num: "01",
    title: "Guinness World Record",
    year: "2018",
    desc: "Delivered the Longest Business Lesson for 72 continuous hours, November 3–5, 2018.",
  },
  {
    num: "02",
    title: "Smart Person of Palakkad",
    year: "2015",
    desc: "Awarded by the Honourable Chief Minister of Kerala in recognition of transformative impact.",
  },
  {
    num: "03",
    title: "Distinguished Edupreneur Award",
    year: "2015",
    desc: "Conferred by the National Foundation of Entrepreneurship Development (FED).",
  },
  {
    num: "04",
    title: "Outstanding Edupreneur",
    year: "2016",
    desc: "Recognised by Palghat Management Association for excellence in education leadership.",
  },
  {
    num: "05",
    title: "Vocational Excellence Award",
    year: "2016",
    desc: "Instituted by the Rotary Club of Palakkad Fort in honour of professional distinction.",
  },
  {
    num: "06",
    title: "Master of Management",
    year: "2016",
    desc: "Awarded at World Business Conclave 2016, Hong Kong by Stimulus Research Services International.",
  },
];

/* ═══════════════════════════════════════════════════
   SECTION 1 — Biography
═══════════════════════════════════════════════════ */
function BioSection() {
  const { ref, visible } = useInView(0.1);

  return (
    <>
      <style>{`
        .bio-section {
          background: #fff;
          position: relative;
          overflow: hidden;
          padding: clamp(4rem, 8vh, 7rem) 0;
        }

        /* dot grid */
        .bio-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,0.09) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        /* corner brackets */
        .bio-corner {
          position: absolute;
          width: 40px;
          height: 40px;
          pointer-events: none;
          z-index: 1;
        }
        .bio-corner-tl { top: 24px; left: 24px; border-top: 1.5px solid rgba(0,92,159,0.25); border-left: 1.5px solid rgba(0,92,159,0.25); }
        .bio-corner-br { bottom: 24px; right: 24px; border-bottom: 1.5px solid rgba(0,92,159,0.25); border-right: 1.5px solid rgba(0,92,159,0.25); }

        .bio-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 6vw, 6rem);
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: start;
        }

        /* ── image column ── */
        .bio-image-col {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .bio-image-col.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .bio-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }

        /* decorative offset border */
        .bio-image-frame::before {
          content: '';
          position: absolute;
          inset: -8px -8px 8px 8px;
          border: 1.5px solid rgba(0,92,159,0.18);
          border-radius: 2px;
          z-index: 2;
          pointer-events: none;
        }

        /* bottom gradient on image */
        .bio-image-frame::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,20,50,0.45), transparent);
          z-index: 1;
          pointer-events: none;
        }

        .bio-image-caption {
          font-size: clamp(0.66rem, 0.8vw, 0.74rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(0,92,159,0.5);
          display: flex;
          align-items: center;
          gap: 8px;
          padding-left: 2px;
        }
        .bio-image-caption::before {
          content: '';
          width: 16px;
          height: 1px;
          background: rgba(0,92,159,0.4);
          display: inline-block;
        }

        /* stat pills */
        .bio-stats {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: 0.4rem;
        }
        .bio-stat {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          padding: 0.55rem 0.8rem;
          border: 1px solid rgba(0,92,159,0.1);
          border-left: 2px solid ${BLUE};
          background: rgba(0,92,159,0.02);
        }
        .bio-stat-num {
          font-weight: 700;
          font-size: clamp(0.95rem, 1.4vw, 1.3rem);
          color: ${BLUE};
          line-height: 1;
        }
        .bio-stat-label {
          font-size: clamp(0.66rem, 0.8vw, 0.72rem);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #666;
        }

        /* ── text column ── */
        .bio-text-col {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
        }
        .bio-text-col.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .bio-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: clamp(1rem, 2vh, 1.5rem);
          font-size: clamp(0.72rem, 0.85vw, 0.76rem);
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${BLUE};
        }
        .bio-eyebrow-line {
          width: 30px;
          height: 1px;
          background: ${BLUE};
          opacity: 0.5;
        }

        .bio-headline {
          font-size: clamp(1.6rem, 3vw, 3rem);
          font-weight: 600;
          line-height: 1.1;
          margin: 0 0 clamp(1rem, 2.5vh, 2rem);
          color: #0d0d0d;
        }
        .bio-headline em {
          font-style: italic;
          background: linear-gradient(90deg, #0d0d0d 0%, ${BLUE} 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .bio-divider {
          width: 40px;
          height: 2px;
          background: ${BLUE};
          margin-bottom: clamp(1.2rem, 2.5vh, 2rem);
        }

        .bio-body p {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.92rem, 1vw, 1rem);
          line-height: 1.9;
          color: #555;
          margin: 0 0 1.2em;
        }
        .bio-body p:last-child { margin-bottom: 0; }

        /* pull quote */
        .bio-pull {
          border-left: 2px solid ${BLUE};
          margin: 1.8rem 0;
          padding: 0.6rem 0 0.6rem 1.4rem;
          font-size: clamp(0.9rem, 1.2vw, 1.1rem) !important;
          font-style: italic !important;
          color: #333 !important;
          line-height: 1.6 !important;
        }

        /* Mobile */
        @media (max-width: 900px) {
          .bio-section { overflow-x: hidden; }
          .bio-inner {
            grid-template-columns: minmax(0, 1fr);
            gap: clamp(2rem, 5vw, 3rem);
          }
          .bio-image-col {
            flex-direction: column;
            align-items: stretch;
            gap: 1.2rem;
            width: 100%;
            max-width: 100%;
          }
          .bio-image-frame {
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
            flex-shrink: 0;
            aspect-ratio: 3/4;
          }
          /* neutralize decorative negative offset so it can't poke past the edge */
          .bio-image-frame::before {
            inset: 0;
          }
          .bio-text-col {
            width: 100%;
            max-width: 100%;
            min-width: 0;
          }
          .bio-body p {
            overflow-wrap: break-word;
            word-break: break-word;
          }
          .bio-stats { flex-direction: column; }
        }
      `}</style>

      <section className="bio-section" ref={ref as React.RefObject<HTMLElement>}>
        <div className="bio-dot-grid" />
        <div className="bio-corner bio-corner-tl" />
        <div className="bio-corner bio-corner-br" />

        <div className="bio-inner">

          {/* IMAGE COLUMN */}
          <div className={`bio-image-col ${visible ? "visible" : ""}`}>
            <div className="bio-image-frame">
              <Image
                src="/thomman.webp"
                alt="Dr. Thomas George K (Thomman)"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width:768px) 140px, 300px"
              />
            </div>

            <div
              className="bio-image-caption"
              style={{ fontFamily: cinzel.style.fontFamily }}
            >
              Dr. Thomas George K
            </div>

            {/* Quick stats */}
            <div className="bio-stats">
              {[
                { num: "30+", label: "Years in Higher Education" },
                { num: "50+", label: "Countries Trained In" },
                { num: "72h", label: "World Record Lesson" },
              ].map(s => (
                <div className="bio-stat" key={s.label}>
                  <span
                    className="bio-stat-num"
                    style={{ fontFamily: cinzel.style.fontFamily }}
                  >{s.num}</span>
                  <span
                    className="bio-stat-label"
                    style={{ fontFamily: cinzel.style.fontFamily }}
                  >{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TEXT COLUMN */}
          <div className={`bio-text-col ${visible ? "visible" : ""}`}>

            <div className="bio-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
              <span className="bio-eyebrow-line" />
              About the Chairman
            </div>

            <h2
              className="bio-headline"
              style={{ fontFamily: playfair.style.fontFamily }}
            >
              Educator. Innovator.<br /><em>Global Leader.</em>
            </h2>

            <div className="bio-divider" />

            <div className="bio-body">
              <p>
                Dr. Thomas George K, fondly known as ThommaN, is a distinguished
                edupreneur, international trainer, TEDx speaker, and Guinness World
                Record holder with over three decades of experience in higher
                education, leadership development, and corporate training. As the
                Founder, Chairman, and Director of LEAD College,
                Palakkad, he has played a transformative role in redefining management
                education in Kerala and beyond.
              </p>

              <p className="bio-pull">
                "Under his visionary leadership, LEAD College emerged as Kerala's first
                residential business school focused on Leadership and Entrepreneurship
                Development."
              </p>

              <p>
                His academic and strategic direction emphasises experiential learning,
                innovation, global exposure, and value-based leadership — earning
                prestigious NBA and NAAC accreditations and preparing students to excel
                in a dynamic professional environment.
              </p>

              <p>
                A globally certified International Trainer, Dr. Thomas has delivered
                impactful programs across more than 50 countries, positively influencing
                hundreds of thousands of students, professionals, and leaders. He is also
                the founder of De'LEAD International, a UAE-based training organisation,
                and the driving force behind startup incubation and international
                scholarship programs.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION 2 — Awards (bento card grid)
═══════════════════════════════════════════════════ */

/* Lucide-style SVG icons — inline so no extra dep needed */
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconAward = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
    <path d="M2 12h20"/>
  </svg>
);
const IconBadge = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
const IconRotate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
  </svg>
);

const awardsWithIcons = [
  { ...awards[0], Icon: IconTrophy,  size: "large" },
  { ...awards[1], Icon: IconStar,    size: "small" },
  { ...awards[2], Icon: IconAward,   size: "small" },
  { ...awards[3], Icon: IconBadge,   size: "small" },
  { ...awards[4], Icon: IconRotate,  size: "small" },
  { ...awards[5], Icon: IconGlobe,   size: "large" },
];

function AwardsSection() {
  const { ref, visible } = useInView(0.08);

  return (
    <>
      <style>{`
        @keyframes card-reveal {
          from { opacity: 0; transform: translateY(28px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes shimmer-sweep {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* ── Section ── */
        .aw2-section {
          background: #ffffff;
          position: relative;
          overflow: hidden;
          padding: clamp(4rem, 9vh, 8rem) 0;
        }

        /* dot grid — blue dots on white */
        .aw2-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,0.07) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

        /* faint blue ambient glow */
        .aw2-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 70vw; height: 50vw;
          max-width: 900px; max-height: 600px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,92,159,0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .aw2-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 6vw, 6rem);
        }

        /* ── Header ── */
        .aw2-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: clamp(2.5rem, 5vh, 4rem);
          gap: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .aw2-header.visible { opacity: 1; transform: translateY(0); }

        .aw2-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: 0.8rem;
          font-size: clamp(0.7rem, 0.8vw, 0.74rem);
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: ${BLUE};
        }
        .aw2-eyebrow-line { width: 28px; height: 1px; background: ${BLUE}; opacity: 0.5; }

        .aw2-title {
          font-size: clamp(1.8rem, 3.2vw, 3.2rem);
          font-weight: 600;
          color: #0d0d0d;
          margin: 0;
          line-height: 1.08;
        }

        .aw2-subtitle {
          font-size: clamp(0.92rem, 0.9vw, 1rem);
          line-height: 1.75;
          color: #888;
          max-width: 320px;
          text-align: right;
          margin: 0;
          flex-shrink: 0;
          font-style: italic;
        }

        /* ── Bento grid
           3 cols, 3 rows:
           Row 1: [card1 col-span-1] [card2 col-span-2]
           Row 2: [card3 col-span-2] [card4 col-span-1]
           Row 3: [card5 col-span-1] [card6 col-span-2] — wait, 6 cols used = 3+3 ✓ no orphan
           Actually cleaner: 3 rows of 2 cards each, alternating 1+2 / 2+1 / 1+2
        ── */
        .aw2-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        /* Row 1: card1=1col, card2=2col */
        .aw2-card:nth-child(1) { grid-column: span 1; }
        .aw2-card:nth-child(2) { grid-column: span 2; }
        /* Row 2: card3=2col, card4=1col */
        .aw2-card:nth-child(3) { grid-column: span 2; }
        .aw2-card:nth-child(4) { grid-column: span 1; }
        /* Row 3: card5=1col, card6=2col */
        .aw2-card:nth-child(5) { grid-column: span 1; }
        .aw2-card:nth-child(6) { grid-column: span 2; }

        /* ── Card ── */
        .aw2-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(0,92,159,0.1);
          border-radius: 12px;
          padding: clamp(1.4rem, 2.5vw, 2rem);
          overflow: hidden;
          cursor: default;
          opacity: 0;
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.3s ease;
        }
        .aw2-card.visible {
          animation: card-reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .aw2-card:hover {
          border-color: rgba(0,92,159,0.25);
          box-shadow: 0 8px 32px rgba(0,92,159,0.08);
          transform: translateY(-3px);
        }

        /* shimmer top-border sweep on hover */
        .aw2-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            transparent 100%
          );
          border-radius: 12px 12px 0 0;
          transition: background 0s;
        }
        .aw2-card:hover .aw2-card-accent {
          background: linear-gradient(
            90deg,
            transparent,
            ${BLUE},
            rgba(0,92,159,0.3),
            ${BLUE},
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer-sweep 1.6s linear infinite;
        }

        /* ── icon box — top right corner, medium, blue ── */
        .aw2-card-icon {
          position: absolute;
          top: clamp(1rem, 1.8vw, 1.5rem);
          right: clamp(1rem, 1.8vw, 1.5rem);
          width: 28px;
          height: 28px;
          color: rgba(0,92,159,0.25);
          transition: color 0.35s ease;
          flex-shrink: 0;
        }
        .aw2-card:hover .aw2-card-icon {
          color: ${BLUE};
        }

        /* ── year tag ── */
        .aw2-card-year {
          display: inline-flex;
          align-items: center;
          font-size: clamp(0.66rem, 0.7vw, 0.72rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${BLUE};
          border: 1px solid rgba(0,92,159,0.18);
          border-radius: 2px;
          padding: 0.22rem 0.6rem;
          margin-bottom: clamp(0.7rem, 1.2vh, 1rem);
          width: fit-content;
          transition: border-color 0.3s, background 0.3s;
        }
        .aw2-card:hover .aw2-card-year {
          border-color: rgba(0,92,159,0.4);
          background: rgba(0,92,159,0.04);
        }

        /* ── title ── */
        .aw2-card-title {
          font-size: clamp(0.78rem, 1.05vw, 1rem);
          font-weight: 600;
          color: #0d0d0d;
          margin: 0 0 0.45rem;
          letter-spacing: 0.02em;
          line-height: 1.3;
          padding-right: 2.5rem; /* avoid overlap with icon */
          transition: color 0.3s;
        }
        .aw2-card:hover .aw2-card-title { color: ${BLUE}; }

        /* wider cards get bigger title */
        .aw2-card:nth-child(2) .aw2-card-title,
        .aw2-card:nth-child(3) .aw2-card-title,
        .aw2-card:nth-child(6) .aw2-card-title {
          font-size: clamp(0.88rem, 1.2vw, 1.1rem);
        }

        /* ── desc ── */
        .aw2-card-desc {
          font-size: clamp(0.9rem, 0.82vw, 1rem);
          line-height: 1.72;
          color: #777;
          margin: 0;
          font-style: italic;
          transition: color 0.3s;
        }
        .aw2-card:hover .aw2-card-desc { color: #555; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .aw2-grid { grid-template-columns: 1fr 1fr; }
          .aw2-card:nth-child(1),
          .aw2-card:nth-child(2),
          .aw2-card:nth-child(3),
          .aw2-card:nth-child(4),
          .aw2-card:nth-child(5),
          .aw2-card:nth-child(6) { grid-column: span 1; }
          /* pair up: 1+2 / 3+4 / 5+6 — all equal, no orphan */
          .aw2-header { flex-direction: column; align-items: flex-start; }
          .aw2-subtitle { text-align: left; }
        }

        @media (max-width: 480px) {
          .aw2-grid { grid-template-columns: 1fr; }
          .aw2-card:nth-child(n) { grid-column: span 1; }
        }
      `}</style>

      <section className="aw2-section" ref={ref as React.RefObject<HTMLElement>}>
        <div className="aw2-glow" aria-hidden="true" />

        <div className="aw2-inner">

          {/* Header */}
          <div className={`aw2-header ${visible ? "visible" : ""}`}>
            <div>
              <div className="aw2-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
                <span className="aw2-eyebrow-line" />
                Feathers in His Cap
              </div>
              <h2 className="aw2-title" style={{ fontFamily: playfair.style.fontFamily }}>
                Recognitions &amp; Honours
              </h2>
            </div>
            <p className="aw2-subtitle" style={{ fontFamily: playfair.style.fontFamily }}>
              Celebrating Dr. Thomas George's contributions to education,
              entrepreneurship, and global leadership.
            </p>
          </div>

          {/* Bento grid */}
          <div className="aw2-grid" role="list">
            {awardsWithIcons.map((award, i) => {
              const { Icon } = award;
              return (
                <div
                  key={award.num}
                  className={`aw2-card ${visible ? "visible" : ""}`}
                  style={{ animationDelay: visible ? `${i * 0.09}s` : "0s" }}
                  role="listitem"
                >
                  {/* shimmer top accent */}
                  <div className="aw2-card-accent" aria-hidden="true" />

                  {/* medium icon — top right */}
                  <div className="aw2-card-icon" aria-hidden="true">
                    <Icon />
                  </div>

                  {/* year */}
                  <div className="aw2-card-year" style={{ fontFamily: cinzel.style.fontFamily }}>
                    {award.year}
                  </div>

                  {/* title */}
                  <p className="aw2-card-title" style={{ fontFamily: cinzel.style.fontFamily }}>
                    {award.title}
                  </p>

                  {/* desc */}
                  <p className="aw2-card-desc" style={{ fontFamily: playfair.style.fontFamily }}>
                    {award.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   EXPORT — both sections together
═══════════════════════════════════════════════════ */
export default function DirectorOverlaySection() {
  return (
    <>
      <BioSection />
      <AwardsSection />
    </>
  );
}