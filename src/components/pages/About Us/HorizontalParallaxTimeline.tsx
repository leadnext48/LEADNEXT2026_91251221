"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const ROYAL_BLUE = "#1e3a8a";

// ─── Icons ────────────────────────────────────────────────────────────────────
const icons = [
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/><path d="M12 12C12 7 7 3 2 3c0 5 4 9 10 9z"/><path d="M12 12c0-5 5-9 10-9-1 5-5 9-10 9z"/>
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M8.56 14.35L7 22l5-3 5 3-1.56-7.65"/>
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
];

const milestones = [
  { number: 1, year: "2010", title: "A Vision Becomes a Campus", text: "In 2010, a dream rose in Palakkad — to shape leaders with courage, clarity, and conscience. LEAD College (Autonomous) began its journey with 120 students and a mission rooted in purpose." },
  { number: 2, year: "2011", title: "Faith Through the First Storm", text: "The early days brought regulatory challenges that tested the foundation. Yet 58 students stayed, believing in the vision. LEAD stood by them with free education, food, and shelter." },
  { number: 3, year: "2012", title: "The First Leaders Step Forward", text: "The first 58 graduates stepped out as symbols of determination and promise. Their success became our first signature. By the end of 2012, the institution grew swiftly — rising from 58 to 360+ learners." },
  { number: 4, year: "2015–2020", title: "Milestones of Trust and Excellence", text: "With AICTE approval, NAAC B++, NBA, ISO 21001:2018, GSAAA recognition, and autonomous status under the University of Calicut, LEAD earned its place through consistent quality and academic strength." },
  { number: 5, year: "2023", title: "Innovation Expands: MCA Begins", text: "In 2023, LEAD opened a new horizon with the MCA program and an intake of 120 students — designed to unite technology, business insight, and innovation for the future ahead." },
  { number: 6, year: "Today", title: "A Greener Future, A Stronger Legacy", text: "Today, LEAD stands as an eco-conscious, plastic-free, solar-powered campus with modern facilities and a learner-first spirit — where excellence meets empathy, and ambition grows with integrity." },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

    :root { --blue: ${ROYAL_BLUE}; }

    html.lenis, html.lenis body { height: auto; }
    .lenis.lenis-smooth { scroll-behavior: auto !important; }

    /* ── Appear Title ─────────────────────────────────────── */
    .appear-title { display: block; }
    .appear-title .lw { display: block; overflow: hidden; }
    .appear-title .li {
      display: block;
      transform: translateY(110%);
      transition: transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .appear-title.visible .li { transform: translateY(0%); }
    .appear-title .lw:nth-child(2) .li { transition-delay: 0.1s; }
    .appear-title .lw:nth-child(3) .li { transition-delay: 0.2s; }

    /* ── Section ─────────────────────────────────────────── */
    .ls-section { background: #fff; overflow-x: hidden; }

    /* ═══════════════════════════════════════════════════════
       HERO LAYOUT
       ─────────────────────────────────────────────────────
       Row 1: [Our Story label] ── [blank]
       Row 2: [Big heading]     ── [Image tall]
       Row 3: [Body copy]       ── [Image cont.]
       ═══════════════════════════════════════════════════════ */
    .ls-hero {
      padding: 7rem 8vw 6rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      column-gap: 5rem;
      row-gap: 0;
      align-items: start;
    }
    @media (max-width: 900px) {
      .ls-hero {
        grid-template-columns: 1fr;
        padding: 5rem 6vw 4rem;
        text-align: center;
      }
      .ls-hero-left { align-items: center; }
      .ls-label { justify-content: center; }
      .ls-body { max-width: 60ch; margin-left: auto; margin-right: auto; }
      .ls-hero-image-wrap { grid-row: auto; margin-top: 3.5rem; width: 100%; max-width: 460px; margin-left: auto; margin-right: auto; }
      /* Hide the small accent photo on mobile — it shrinks too much to look good */
      .ls-hero-accent-sq { display: none !important; }
      /* Keep the decorative badge/frame INSIDE the image on mobile so they don't
         stick out past the screen edge (was causing horizontal overflow). */
      .ls-img-badge { left: 0.75rem; top: 0.75rem; }
      .ls-img-frame { display: none; }
    }

    /* Left column: label + heading stacked */
    .ls-hero-left {
      grid-column: 1;
      grid-row: 1 / 3;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    /* Right column: image panel spanning both rows */
    .ls-hero-image-wrap {
      grid-column: 2;
      grid-row: 1 / 3;
      position: relative;
      align-self: stretch;
    }

    /* ── Label ─────────────────────────────────────────── */
    .ls-label {
      font-family: 'Cinzel', serif;
      font-size: 0.72rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--blue);
      margin-bottom: 1.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .ls-label::before {
      content: '';
      display: inline-block;
      width: 28px; height: 1px;
      background: var(--blue); opacity: 0.5;
    }

    /* ── Heading ──────────────────────────────────────── */
    .ls-heading {
      font-family: 'Cinzel', serif;
      font-size: clamp(1.85rem, 3.2vw, 3.3rem);
      line-height: 1.1;
      font-weight: 700;
      color: #0D0D0D;
      letter-spacing: 0.02em;
      margin-bottom: 2.25rem;
    }
    .ls-heading .gw {
      background: linear-gradient(90deg, #000 0%, #1e3a8a 55%, #1e3a8a 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    /* ── Body copy — sits BELOW heading in the same left col ── */
    .ls-body {
      font-family: 'Playfair Display', serif;
      font-size: clamp(0.92rem, 1.05vw, 1.02rem);
      line-height: 1.9;
      color: #555;
      max-width: 56ch;
    }



    /* ── Image composition ────────────────────────────── */
    .ls-img-main {
      width: 100%;
      aspect-ratio: 4 / 5;
      object-fit: cover;
      display: block;
      border-radius: 3px;
      filter: grayscale(12%);
    }
    .ls-img-accent {
      position: absolute;
      bottom: -2rem;
      left: -2.5rem;
      width: 46%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 3px;
      border: 4px solid #fff;
      box-shadow: 0 12px 40px rgba(0,0,0,0.18);
    }
    /* Blue decorative frame */
    .ls-img-frame {
      position: absolute;
      top: -1.2rem;
      right: -1.2rem;
      width: 55%;
      height: 55%;
      border: 2px solid rgba(30,58,138,0.2);
      border-radius: 3px;
      pointer-events: none;
      z-index: 0;
    }
    /* Years badge */
    .ls-img-badge {
      position: absolute;
      top: 1.5rem;
      left: -1.75rem;
      background: var(--blue);
      color: #fff;
      padding: 0.9rem 1.1rem;
      border-radius: 2px;
      text-align: center;
      box-shadow: 0 8px 24px rgba(30,58,138,0.35);
      z-index: 3;
    }
    .ls-img-badge-num {
      font-family: 'Cinzel', serif;
      font-size: 1.8rem;
      font-weight: 900;
      line-height: 1;
      display: block;
    }
    .ls-img-badge-txt {
      font-family: 'Cinzel', serif;
      font-size: 0.6rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0.75;
      display: block;
      margin-top: 0.25rem;
    }

    /* ── Divider ─────────────────────────────────────────── */
    .ls-divider {
      height: 1px;
      margin: 0 8vw;
      background: linear-gradient(90deg, transparent, var(--blue) 30%, var(--blue) 70%, transparent);
      opacity: 0.1;
    }

    /* ═══════════════════════════════════════════════════════
       VERTICAL STORYTELLING TIMELINE
       ═══════════════════════════════════════════════════════ */
    .ls-tl-wrap {
      background: #fff;
      border-top: 1px solid rgba(30,58,138,0.07);
      padding-top: 4.5rem;
    }
    .ls-tl-header {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 8vw 1rem;
    }
    .ls-tl-eyebrow {
      font-family: 'Cinzel', serif;
      font-size: 0.72rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--blue);
      display: flex; align-items: center; gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .ls-tl-eyebrow::before {
      content: '';
      display: inline-block;
      width: 28px; height: 1px;
      background: var(--blue); opacity: 0.4;
    }
    .ls-tl-title {
      font-family: 'Cinzel', serif;
      font-size: clamp(1.55rem, 2.9vw, 2.5rem);
      font-weight: 700;
      line-height: 1.12;
      letter-spacing: 0.01em;
      color: #0D0D0D;
    }

    /* ── Timeline body ─────────────────────────────────────── */
    .ls-tl {
      position: relative;
      max-width: 1100px;
      margin: 0 auto;
      padding: 3rem 8vw 6rem;
    }
    /* central rail */
    .ls-tl-rail {
      position: absolute;
      top: 3rem; bottom: 6rem;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      background: rgba(30,58,138,0.10);
      border-radius: 2px;
      overflow: hidden;
    }
    .ls-tl-rail-fill {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, var(--blue) 0%, #3b5bbf 100%);
      transform-origin: top center;
    }

    /* ── Row ───────────────────────────────────────────────── */
    .ls-tl-row {
      position: relative;
      display: grid;
      /* fixed centre channel reserves clear space for the node so text can never collide with it */
      grid-template-columns: 1fr 96px 1fr;
      column-gap: 0;
      align-items: start;
      margin-bottom: 4.75rem;
    }
    .ls-tl-row:last-child { margin-bottom: 0; }

    .ls-tl-content { padding-top: 0.15rem; min-width: 0; }
    .ls-tl-row.left  .ls-tl-content { grid-column: 1; text-align: right; padding-right: 1.75rem; }
    .ls-tl-row.right .ls-tl-content { grid-column: 3; text-align: left;  padding-left: 1.75rem; }

    .ls-tl-year {
      font-family: 'Cinzel', serif;
      font-size: clamp(2rem, 3.6vw, 3.15rem);
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.015em;
      color: var(--blue);
      display: block;
      margin-bottom: 0.85rem;
    }
    .ls-tl-ct {
      font-family: 'Cinzel', serif;
      font-size: 1.02rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #0D0D0D;
      margin-bottom: 0.7rem;
      line-height: 1.4;
    }
    .ls-tl-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.02rem;
      line-height: 1.8;
      color: #4a5563;
      max-width: 46ch;
      display: inline-block;
    }

    /* node on rail */
    .ls-tl-node {
      position: absolute;
      top: 0.15rem;
      left: 50%;
      transform: translateX(-50%);
      width: 48px; height: 48px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid rgba(30,58,138,0.18);
      color: var(--blue);
      display: flex; align-items: center; justify-content: center;
      z-index: 2;
      box-shadow: 0 4px 18px rgba(30,58,138,0.12);
    }

    /* ── Mobile: single-column, rail on the left ───────────── */
    @media (max-width: 820px) {
      .ls-tl { padding: 2.5rem 6vw 4rem; }
      .ls-tl-rail { top: 2.5rem; bottom: 4rem; left: 24px; transform: none; }
      .ls-tl-row {
        grid-template-columns: 1fr;
        column-gap: 0;
        padding-left: 72px;   /* clears the rail + node so text never collides */
        margin-bottom: 3.25rem;
      }
      .ls-tl-row.left  .ls-tl-content,
      .ls-tl-row.right .ls-tl-content {
        grid-column: 1;
        text-align: left;
        padding-left: 0;
        padding-right: 0;
      }
      .ls-tl-node { left: 24px; width: 44px; height: 44px; }
      .ls-tl-text { max-width: none; }
    }
  `}</style>
);

// ─── AppearTitle ─────────────────────────────────────────────────────────────
function AppearTitle({ lines }: { lines: React.ReactNode[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <span ref={ref} className={`appear-title ${isInView ? "visible" : ""}`}>
      {lines.map((line, i) => (
        <span key={i} className="lw"><span className="li">{line}</span></span>
      ))}
    </span>
  );
}

// ─── Image Panel with parallax ───────────────────────────────────────────────
function ImagePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      className="ls-hero-image-wrap"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      {/* Decorative offset frame */}
      <div className="ls-img-frame" />

      {/* Years badge */}
      <motion.div
        className="ls-img-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="ls-img-badge-num">15</span>
        <span className="ls-img-badge-txt">Years of<br/>Excellence</span>
      </motion.div>

      {/* Main image with subtle parallax */}
      <div style={{ overflow: "hidden", borderRadius: 3, position: "relative", zIndex: 1 }}>
        <motion.img
          src="/convert/LEAD03.webp"
          alt="LEAD College campus"
          className="ls-img-main"
          style={{ y: imgY }}
        />
        {/* Subtle blue tint overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(30,58,138,0.04) 0%, rgba(30,58,138,0.15) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Accent square image bottom-left — hidden on mobile (too small to read) */}
      <motion.div
        className="ls-hero-accent-sq"
        style={{
          position: "absolute", bottom: "-1.5rem", left: "-2rem",
          width: "42%", aspectRatio: "1/1",
          overflow: "hidden", borderRadius: 3, zIndex: 2,
          border: "4px solid #fff",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/convert/LEAD04.webp"
          alt="Students at LEAD"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Timeline Row ─────────────────────────────────────────────────────────────
function TimelineRow({ number, year, title, text, side }: { number: number; year: string; title: string; text: string; side: "left" | "right" }) {
  const Icon = icons[number - 1];
  const reveal = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
  } as const;

  return (
    <div className={`ls-tl-row ${side}`}>
      <motion.div
        className="ls-tl-content"
        {...reveal}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="ls-tl-year">{year}</span>
        <h3 className="ls-tl-ct">{title}</h3>
        <p className="ls-tl-text">{text}</p>
      </motion.div>

      <motion.div
        className="ls-tl-node"
        initial={{ opacity: 0, scale: 0.55 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon />
      </motion.div>
    </div>
  );
}

// ─── Vertical Timeline ────────────────────────────────────────────────────────
function VerticalTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 55%"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="ls-tl" ref={ref}>
      <div className="ls-tl-rail">
        <motion.div className="ls-tl-rail-fill" style={{ scaleY: railScale }} />
      </div>
      {milestones.map((m, i) => (
        <TimelineRow
          key={m.number}
          number={m.number}
          year={m.year}
          title={m.title}
          text={m.text}
          side={i % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
}

// ─── Lenis ────────────────────────────────────────────────────────────────────
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function LeadStorySection() {
  useLenis();

  return (
    <>
      <FontStyle />
      <section className="ls-section">

        {/* ══ HERO: Label · Heading · Body · Stats  ←→  Image ══ */}
        <div className="ls-hero">

          {/* LEFT COLUMN: everything textual */}
          <div className="ls-hero-left">
            {/* Label */}
            <motion.span
              className="ls-label"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Story
            </motion.span>

            {/* Heading */}
            <h2 className="ls-heading">
              <AppearTitle
                lines={[
                  "Fifteen years",
                  <>of shaping <span className="gw">leaders</span></>,
                  "with purpose.",
                ]}
              />
            </h2>

            {/* Body copy — naturally follows heading */}
            <motion.p
              className="ls-body"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              LEAD College's journey began not with grand buildings, but with an
              unwavering belief — that education rooted in courage and conscience
              could transform lives. From 58 students who refused to leave during
              adversity, to a thriving, accredited institution of thousands, every
              milestone was earned the hard way: through integrity, perseverance,
              and a relentless commitment to our learners. These are the chapters
              that define who we are.
            </motion.p>
          </div>

          {/* RIGHT COLUMN: image composition */}
          <ImagePanel />

        </div>

        <div className="ls-divider" />

        {/* ══ VERTICAL MILESTONE TIMELINE ══ */}
        <div className="ls-tl-wrap">
          <div className="ls-tl-header">
            <p className="ls-tl-eyebrow">Milestones &amp; Legacy</p>
            <h2 className="ls-tl-title">The chapters that shaped LEAD.</h2>
          </div>
          <VerticalTimeline />
        </div>

      </section>
    </>
  );
}