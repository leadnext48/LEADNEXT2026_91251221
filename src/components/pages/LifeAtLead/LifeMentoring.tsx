"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  GraduationCap,
  Heart,
  Compass,
  ShieldCheck,
  Users,
  TrendingUp,
  Target,
  Sparkles,
  CheckCircle,
  BookOpen,
  MessageCircle,
  Star,
  BarChart2,
  Lightbulb,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, SHADOWS, RADIUS, TRANS, GRADIENTS } from "@/lib/design-tokens";

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useInView(threshold = 0.15): [React.RefCallback<HTMLDivElement>, boolean] {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const ref = useCallback<React.RefCallback<HTMLDivElement>>(
    (node) => {
      if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }
      if (!node) return;
      const obs = new IntersectionObserver(
        (entries) => setVisible(entries[0].isIntersecting),
        { threshold }
      );
      obs.observe(node);
      observerRef.current = obs;
    },
    [threshold]
  );
  useEffect(() => () => observerRef.current?.disconnect(), []);
  return [ref, visible];
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

/* ═══════════════════════════════════════════════════════
   MOTION VARIANTS
═══════════════════════════════════════════════════════ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = "", visible }: { target: number; suffix?: string; visible: boolean }) {
  const [count, setCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!visible) { setCount(0); return; }
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    timerRef.current = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timerRef.current!); }
      else setCount(Math.floor(current));
    }, 1800 / steps);
    return () => clearInterval(timerRef.current!);
  }, [visible, target]);
  return <span>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════
   SECTION 1 — HERO
   Matches IQAC hero style exactly:
   - Pure white bg with subtle grid
   - Ghost large bg letter
   - Cinzel uppercase title with gradient second line
   - Thin line eyebrow
   - Subtitle with rule
   - Pillar strip at bottom
   - Marquee ticker
   - Strict 100svh
═══════════════════════════════════════════════════════ */
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const PILLARS = [
    { icon: GraduationCap, label: "Academic Guidance",      sub: "Progress tracking & support" },
    { icon: Heart,         label: "Personal Growth",        sub: "Wellbeing & self-awareness" },
    { icon: Compass,       label: "Career Direction",       sub: "Pathways & professional prep" },
    { icon: ShieldCheck,   label: "Professional Behaviour", sub: "Values & workplace readiness" },
    { icon: Users,         label: "100% Students",          sub: "Every student, personally mentored" },
  ];

  const MARQUEE_ITEMS = [
    "Academic Guidance", "Personal Growth", "Career Direction", "Professional Behaviour",
    "Leadership Development", "Reflective Learning", "Faculty Mentors", "100% Students Mentored",
  ];

  return (
    <>
      <style>{`
        .mh-section {
          height: calc(100svh - 64px);
          max-height: 100svh;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: clamp(1rem,3vh,2rem) clamp(1.5rem,10vw,9rem) 3.5rem;
          box-sizing: border-box;
        }
        .mh-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,92,159,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,92,159,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none; z-index: 0;
        }
        .mh-bg-text {
          position: absolute;
          right: -0.05em; bottom: -0.15em;
          font-size: clamp(18rem,38vw,52rem);
          font-weight: 800; line-height: 1;
          color: rgba(0,92,159,0.03);
          pointer-events: none; user-select: none;
          z-index: 0; letter-spacing: -0.06em;
        }
        .mh-inner { position: relative; z-index: 2; max-width: 900px; }
        .mh-eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: clamp(0.7rem,1.5vh,1.2rem);
        }
        .mh-title {
          font-size: clamp(2rem,5.5vw,7rem);
          font-weight: 800; line-height: 0.92;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin: 0 0 clamp(1rem,2vh,1.8rem);
        }
        .mh-strip {
          position: relative; z-index: 2;
          margin-top: clamp(1rem,2.5vh,2.5rem);
          padding-top: clamp(0.8rem,1.5vh,1.5rem);
          border-top: 1px solid rgba(0,92,159,0.10);
          overflow: hidden;
        }
        .mh-strip-track {
          display: flex; align-items: stretch; gap: 0; flex-wrap: wrap; width: 100%;
        }
        /* Items are rendered twice for the seamless mobile loop; the duplicate
           half is hidden on desktop where the strip is a static row. */
        .mh-strip-track > .mh-strip-item:nth-child(n+6) { display: none; }
        .mh-strip-item {
          display: flex; align-items: center; gap: 14px;
          padding: 0 clamp(1.5rem,3vw,2.5rem);
          border-right: 1px solid rgba(0,92,159,0.10);
          flex: 1; min-width: 160px;
        }
        .mh-strip-item:first-child { padding-left: 0; }
        .mh-strip-item:last-child { border-right: none; }
        .mh-marquee-wrap {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 44px; overflow: hidden;
          border-top: 1px solid rgba(0,92,159,0.07);
          background: rgba(0,92,159,0.018);
          display: flex; align-items: center; z-index: 3;
        }
        .mh-marquee-track {
          display: flex; align-items: center; gap: 3rem;
          animation: mhMarquee 28s linear infinite;
          white-space: nowrap; padding: 0 1.5rem;
        }
        @keyframes mhMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .mh-marquee-item { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        @media (max-width: 600px) {
          .mh-marquee-wrap { display: none; }
          .mh-section {
            height: auto;
            max-height: none;
            min-height: 100svh;
            justify-content: flex-start;
            gap: 1.5rem;
          }
          /* Mobile: seamless infinite auto-loop so users don't have to guess
             the strip is swipeable. */
          .mh-strip { overflow: hidden; }
          .mh-strip-track {
            flex-wrap: nowrap;
            width: max-content;
            animation: mhStripScroll 24s linear infinite;
          }
          .mh-strip-track > .mh-strip-item:nth-child(n+6) { display: flex; }
          .mh-strip-item { flex: 0 0 auto; min-width: 0; }
        }
        @keyframes mhStripScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mh-marquee-track { animation: none; }
          .mh-strip-track { animation: none; flex-wrap: wrap; width: 100%; }
          .mh-strip-track > .mh-strip-item:nth-child(n+6) { display: none; }
        }
      `}</style>

      <section ref={heroRef} className="mh-section">
        <div className="mh-bg-text" aria-hidden="true" style={{ fontFamily: cinzel.style.fontFamily }}>M</div>

        <motion.div className="mh-inner" style={{ opacity: contentOpacity }}>
          {/* Eyebrow */}
          <motion.div
            className="mh-eyebrow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1.5, background: COLORS.primary }} />
            <span style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(0.66rem,0.8vw,0.74rem)",
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: COLORS.primary, fontWeight: 600,
            }}>LEAD College — Life at LEAD</span>
          </motion.div>

          {/* Title — same two-line IQAC pattern */}
          <motion.h1
            className="mh-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: cinzel.style.fontFamily }}
          >
            <span style={{ display: "block", color: "#0D0D0D" }}>Mentoring</span>
            <span style={{
              display: "block",
              background: `linear-gradient(90deg, ${COLORS.primary} 0%, #1e3a8a 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}>&amp; Guidance.</span>
          </motion.h1>

          {/* Sub */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ width: 40, height: 2, background: `linear-gradient(90deg,${COLORS.primary},#1e3a8a)`, marginBottom: "clamp(1rem,2vh,1.6rem)" }} />
            <p style={{
              fontFamily: playfair.style.fontFamily,
              fontSize: "clamp(0.88rem,1.05vw,1rem)",
              lineHeight: 1.85, color: "#111", margin: 0, maxWidth: 520,
            }}>
              Each student is guided by a dedicated faculty mentor who closely monitors academic progress,
              personal development, career direction, and overall well-being — ensuring continuous growth
              throughout the journey.
            </p>
          </motion.div>
        </motion.div>

        {/* Pillar strip */}
        <motion.div
          className="mh-strip"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mh-strip-track">
          {[...PILLARS, ...PILLARS].map((b, i) => (
            <div key={i} className="mh-strip-item">
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "rgba(0,92,159,0.06)",
                borderWidth: 1, borderStyle: "solid", borderColor: "rgba(0,92,159,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <b.icon size={16} color={COLORS.primary} strokeWidth={1.8} />
              </div>
              <div>
                <p style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "clamp(0.66rem,0.72vw,0.72rem)", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "#334", margin: "0 0 2px",
                }}>{b.label}</p>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(0.85rem,1vw,1rem)", color: "#111", margin: 0, lineHeight: 1.35,
                }}>{b.sub}</p>
              </div>
            </div>
          ))}
          </div>
        </motion.div>

        {/* Marquee */}
        <div className="mh-marquee-wrap">
          <div className="mh-marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <div key={i} className="mh-marquee-item">
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: COLORS.primary, display: "inline-block", opacity: 0.5 }} />
                <span style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "0.74rem", letterSpacing: "0.22em", textTransform: "uppercase",
                  color: COLORS.primary, opacity: 0.5, fontWeight: 600,
                }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — PHILOSOPHY
═══════════════════════════════════════════════════════ */
function PhilosophySection() {
  const [ref, visible] = useInView(0.15);
  const isMobile = useIsMobile();

  return (
    <section ref={ref} style={{ background: "#ffffff", padding: `${SPACE.sectionY} 0`, overflow: "hidden" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: `0 ${SPACE.sectionX}`,
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: "clamp(3rem,6vw,5rem)", alignItems: "center",
      }}>
        <div>
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "1rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>Our Philosophy</p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: "0 0 1.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease" }}>
            Beyond Academics,<br />Building Leaders
          </h2>
          <div style={{ width: 48, height: 2, borderRadius: 2, background: GRADIENTS.primary90, marginBottom: "1.5rem", opacity: visible ? 1 : 0, transform: visible ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "opacity 0.5s 0.25s ease, transform 0.5s 0.25s ease" }} />
          <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: "#111", marginBottom: "1.25rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease" }}>
            Beyond academics, mentors help students develop clarity in career goals, improve interpersonal effectiveness, and strengthen professional behavior. Regular mentoring interactions foster accountability, reflection, and personal growth.
          </p>
          <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: "#111", margin: 0, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease" }}>
            The mentoring culture at LEAD reflects the institution's belief that leadership development requires personalized attention, consistent guidance, and value-based engagement.
          </p>
        </div>

        <div style={{ position: "relative", minHeight: 420, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "opacity 0.9s 0.2s ease, transform 0.9s 0.2s ease" }}>
          <div style={{ position: "absolute", top: -12, right: -12, width: "65%", height: "55%", borderWidth: 1, borderStyle: "solid", borderColor: COLORS.border, borderRadius: RADIUS.sm, pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1, width: "75%", marginLeft: "auto", overflow: "hidden", borderRadius: RADIUS.card, boxShadow: SHADOWS.hero }}>
            <img src="/convert/LEAD14.webp" alt="Mentor guiding a student" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} loading="lazy" />
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "48%", overflow: "hidden", borderRadius: RADIUS.card, borderWidth: 4, borderStyle: "solid", borderColor: "#fff", boxShadow: "0 14px 40px rgba(0,0,0,0.12)", zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s 0.5s ease, transform 0.7s 0.5s ease" }}>
            <img src="/convert/LEAD35.webp" alt="Students collaborating" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 3 — FRAMEWORK CARDS
   FIX: no border shorthand + longhand conflict.
   All border properties written individually.
═══════════════════════════════════════════════════════ */
const FRAMEWORK_CARDS = [
  { icon: GraduationCap, title: "Academic Progress", description: "Mentors track each student's academic trajectory, identify areas for improvement, and provide targeted guidance. From coursework to research, every academic milestone is supported through structured one-on-one interactions." },
  { icon: Heart, title: "Personal Development", description: "Beyond grades, mentors foster self-awareness, emotional intelligence, and resilience. Through reflective conversations, students develop integrity, empathy, and a growth-oriented mindset essential for leadership." },
  { icon: Compass, title: "Career Direction", description: "Mentors help students gain clarity on career aspirations, industry opportunities, and professional pathways. From internship readiness to placement preparation, each student receives strategic guidance." },
  { icon: ShieldCheck, title: "Professional Behaviour", description: "Developing professional maturity is a core outcome of mentoring. Students learn workplace etiquette, communication effectiveness, ethical decision-making, and the discipline required to thrive in competitive environments." },
];

function FrameworkSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: "#ffffff", padding: `${SPACE.sectionY} 0` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={stagger} style={{ textAlign: "center", marginBottom: SPACE.colGapLg }}>
          <motion.p variants={fadeUp} custom={0} style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "0.75rem" }}>Framework</motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: "0 0 1rem" }}>Four Pillars of Mentoring</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }} variants={stagger} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: SPACE.colGapMd }}>
          {FRAMEWORK_CARDS.map((card, i) => <FrameworkCard key={card.title} {...card} index={i} />)}
        </motion.div>
      </div>
    </section>
  );
}

function FrameworkCard({ icon: Icon, title, description, index }: { icon: typeof GraduationCap; title: string; description: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  // FIX: All six border properties written separately — no shorthand conflicts
  const bc = hovered ? COLORS.borderHov : COLORS.border;
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "#ffffff",
        borderTopWidth: 2, borderTopStyle: "solid", borderTopColor: COLORS.primary,
        borderRightWidth: 1, borderRightStyle: "solid", borderRightColor: bc,
        borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: bc,
        borderLeftWidth: 1, borderLeftStyle: "solid", borderLeftColor: bc,
        borderRadius: RADIUS.card,
        padding: SPACE.cardPadLg,
        boxShadow: hovered ? SHADOWS.cardHov : SHADOWS.card,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: TRANS.lift,
        overflow: "hidden",
      }}
    >
      <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "5rem", fontWeight: 900, color: "rgba(0,92,159,0.04)", position: "absolute", top: "0.5rem", right: "1rem", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div style={{ width: 44, height: 44, borderRadius: RADIUS.sm, background: "rgba(0,92,159,0.07)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(0,92,159,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", transform: hovered ? "scale(1.06)" : "scale(1)", transition: TRANS.normal }}>
        <Icon size={20} color={COLORS.primary} strokeWidth={2} />
      </div>
      <h3 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.heading, color: COLORS.primary, margin: "0 0 0.75rem", letterSpacing: "0.02em" }}>{title}</h3>
      <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: "#111", margin: 0 }}>{description}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4 — TIMELINE
   FIX: Removed sticky/parallax entirely.
   Normal scroll — IntersectionObserver activates each item
   as it enters view. Line fills via CSS transition.
   Period tags removed.
═══════════════════════════════════════════════════════ */
const TIMELINE_STAGES = [
  { icon: Users, title: "Orientation Mentoring", description: "From the first day on campus, each student is assigned a dedicated faculty mentor. Initial sessions focus on understanding the student's background, aspirations, and learning style. Mentors help students acclimate to the LEAD culture, set academic expectations, and build the foundation for a productive journey." },
  { icon: GraduationCap, title: "Academic Progress Mentoring", description: "As students settle into their academic rhythm, mentoring shifts to tracking coursework performance, skill development, and intellectual growth. Mentors identify strengths and gaps, recommend resources, and guide students toward deeper engagement with their chosen specialisation." },
  { icon: Target, title: "Career Mentoring", description: "With a clearer academic foundation, mentoring evolves to professional readiness. Mentors guide students through internship preparation, industry networking, placement readiness, and career strategy — ensuring each student approaches the professional world with clarity and confidence." },
  { icon: Sparkles, title: "Leadership Development", description: "Throughout the journey, mentoring weaves in leadership principles — accountability, ethical decision-making, team effectiveness, and personal vision. By graduation, students carry forward not just knowledge, but the mindset and character required to lead with purpose." },
];

function TimelineSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: "#ffffff", padding: `${SPACE.sectionY} 0` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={stagger}
          style={{ textAlign: "center", marginBottom: SPACE.colGapLg }}
        >
          <motion.p variants={fadeUp} custom={0} style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "0.75rem" }}>The Journey</motion.p>
          <motion.h2 variants={fadeUp} custom={1} style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: 0 }}>How Mentoring Evolves</motion.h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2rem,4vw,3rem)" }}>
          {TIMELINE_STAGES.map((stage, i) => (
            <TimelineItem key={stage.title} {...stage} index={i} isMobile={!!isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ icon: Icon, title, description, index, isMobile }: { icon: typeof Users; title: string; description: string; index: number; isMobile: boolean }) {
  const [ref, visible] = useInView(0.3);
  const [hovered, setHovered] = useState(false);
  const bc = hovered ? COLORS.borderHov : COLORS.border;
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: isMobile ? "1rem" : "2rem",
        alignItems: "flex-start",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ${index * 0.05}s ease, transform 0.55s ${index * 0.05}s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Node — always white bg, always blue icon, no state changes */}
      <div style={{
        flexShrink: 0,
        width: isMobile ? 40 : 48,
        height: isMobile ? 40 : 48,
        borderRadius: "50%",
        background: "#ffffff",
        borderWidth: 2, borderStyle: "solid", borderColor: COLORS.primary,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={isMobile ? 16 : 20} color={COLORS.primary} strokeWidth={2} />
      </div>
      {/* Card */}
      <div style={{
        background: "#ffffff",
        borderWidth: 1, borderStyle: "solid", borderColor: bc,
        borderRadius: RADIUS.card,
        padding: SPACE.cardPadMd,
        flex: 1,
        boxShadow: hovered ? SHADOWS.cardHov : SHADOWS.card,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: TRANS.lift,
      }}>
        <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1rem,1.5vw,1.2rem)", fontWeight: 700, color: COLORS.dark, margin: "0 0 0.75rem", letterSpacing: "0.02em" }}>{title}</h3>
        <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.9rem,1.1vw,1.05rem)", lineHeight: 1.8, color: "#111", margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 5 — ACADEMIC GUIDANCE
═══════════════════════════════════════════════════════ */
const GUIDANCE_POINTS = [
  { icon: BarChart2, title: "Performance Tracking", body: "Mentors review academic performance each semester and provide data-driven feedback that helps students understand trends in their learning." },
  { icon: BookOpen, title: "Learning Strategies", body: "Structured sessions guide students toward effective study methods, research practices, and subject comprehension techniques." },
  { icon: MessageCircle, title: "Constructive Feedback", body: "Regular, candid conversations help students refine analytical thinking, presentation skills, and classroom engagement." },
  { icon: CheckCircle, title: "Outcome Alignment", body: "Every mentoring discussion ties back to program learning outcomes, ensuring students remain purposefully on track." },
];

function AcademicGuidanceSection() {
  const [ref, visible] = useInView(0.15);
  const isMobile = useIsMobile();
  return (
    <section ref={ref} style={{ background: "#ffffff", padding: `${SPACE.sectionY} 0` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(3rem,6vw,5rem)", alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "1rem", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>Individual Guidance</p>
            <h2 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: "0 0 1.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease" }}>
              Academic Progress,<br />Personally Tracked
            </h2>
            <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: "#111", marginBottom: "1.25rem", opacity: visible ? 1 : 0, transition: "opacity 0.7s 0.2s ease" }}>
              Mentors play an active role in tracking the academic progress of students and ensuring that they remain aligned with program expectations and learning outcomes. Through regular interactions, faculty mentors help students understand their strengths, identify areas of improvement, and adopt effective learning strategies.
            </p>
            <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: "#111", opacity: visible ? 1 : 0, transition: "opacity 0.7s 0.3s ease" }}>
              By fostering disciplined academic habits and intellectual curiosity, mentoring helps students develop a strong foundation for professional success.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) minmax(0, 1fr)", gap: "1.25rem" }}>
            {GUIDANCE_POINTS.map((pt, i) => (
              <div key={pt.title} style={{ background: "#ffffff", borderWidth: 1, borderStyle: "solid", borderColor: COLORS.border, borderRadius: RADIUS.card, padding: "1.5rem", boxShadow: SHADOWS.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ${i * 0.1 + 0.2}s ease, transform 0.6s ${i * 0.1 + 0.2}s ease` }}>
                <div style={{ width: 36, height: 36, borderRadius: RADIUS.sm, background: "rgba(0,92,159,0.07)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(0,92,159,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.9rem" }}>
                  <pt.icon size={17} color={COLORS.primary} strokeWidth={2} />
                </div>
                <h4 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "0.85rem", fontWeight: 700, color: COLORS.dark, margin: "0 0 0.5rem", letterSpacing: "0.02em" }}>{pt.title}</h4>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "1rem", lineHeight: 1.75, color: "#111", margin: 0 }}>{pt.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 6 — FEEDBACK & REFLECTION
   FIX: All cards white bg, no off-white.
═══════════════════════════════════════════════════════ */
const REFLECTION_STEPS = [
  { num: "01", title: "Assess", body: "Review progress against goals set in the previous cycle." },
  { num: "02", title: "Reflect", body: "Discuss what worked, what didn't, and why — without judgment." },
  { num: "03", title: "Reframe", body: "Identify actionable improvements and new perspectives." },
  { num: "04", title: "Commit", body: "Set specific, measurable goals for the next mentoring period." },
];

function FeedbackReflectionSection() {
  const [ref, visible] = useInView(0.15);
  const isMobile = useIsMobile();
  return (
    <section ref={ref} style={{ background: "#ffffff", padding: `${SPACE.sectionY} 0` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <div style={{ textAlign: "center", marginBottom: SPACE.colGapLg }}>
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "0.75rem", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>Continuous Improvement</p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: "0 0 1rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease" }}>Feedback &amp; Reflection Cycle</h2>
          <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: "#111", maxWidth: "52ch", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.7s 0.2s ease" }}>
            Mentors facilitate discussions that help students assess achievements, learn from mistakes, and set meaningful goals for improvement.
          </p>
        </div>

        {/* Steps — white bg */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {REFLECTION_STEPS.map((step, i) => (
            <div key={step.num} style={{ position: "relative", padding: "2rem 1.5rem", background: "#ffffff", borderWidth: 1, borderStyle: "solid", borderColor: COLORS.border, borderRadius: RADIUS.card, boxShadow: SHADOWS.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ${i * 0.1 + 0.2}s ease, transform 0.6s ${i * 0.1 + 0.2}s ease` }}>
              {i < REFLECTION_STEPS.length - 1 && !isMobile && (
                <div style={{ position: "absolute", right: "-0.76rem", top: "50%", transform: "translateY(-50%)", width: "1.5rem", height: 1, background: COLORS.border, zIndex: 2 }} />
              )}
              <div style={{ fontFamily: cinzel.style.fontFamily, fontSize: "2.5rem", fontWeight: 800, color: "rgba(0,92,159,0.07)", lineHeight: 1, marginBottom: "0.75rem" }}>{step.num}</div>
              <h4 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "1rem", fontWeight: 700, color: COLORS.dark, margin: "0 0 0.5rem" }}>{step.title}</h4>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "1rem", lineHeight: 1.75, color: "#111", margin: 0 }}>{step.body}</p>
            </div>
          ))}
        </div>

        {/* Pull quote — intentional blue accent */}
        <div style={{ background: COLORS.primary, borderRadius: RADIUS.card, padding: "3rem clamp(2rem,5vw,4rem)", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: "2rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s 0.6s ease, transform 0.7s 0.6s ease" }}>
          <Lightbulb size={40} color="rgba(255,255,255,0.35)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.2rem,2vw,1.6rem)", fontWeight: 700, color: "#fff", margin: "0 0 0.75rem", lineHeight: 1.3 }}>
              "Through this cycle of reflection and guidance, mentoring becomes a transformative experience for students."
            </p>
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "0.95rem", color: "#fff", margin: 0 }}>Constructive feedback cultivates self-discipline, accountability, and a growth-oriented mindset.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 7 — STORYTELLING QUOTE
═══════════════════════════════════════════════════════ */
function StorytellingSection() {
  const [ref, visible] = useInView(0.15);
  return (
    <section ref={ref} style={{ position: "relative", overflow: "hidden", minHeight: 560 }}>
      <img src="/convert/LEAD33.webp" alt="Mentor and student" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,42,73,0.93) 0%, rgba(0,92,159,0.8) 100%)" }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 960, margin: "0 auto", padding: `${SPACE.sectionY} ${SPACE.sectionX}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(6rem,12vw,10rem)", lineHeight: 0.6, color: "rgba(255,255,255,0.1)", marginBottom: "1.5rem", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>"</div>
        <blockquote style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "0.01em", color: "#fff", margin: "0 0 2.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s 0.15s ease, transform 0.8s 0.15s ease" }}>
          Guidance today shapes<br />leaders tomorrow.
        </blockquote>
        <div style={{ width: 64, height: 1, background: "rgba(255,255,255,0.25)", marginBottom: "2.5rem", opacity: visible ? 1 : 0, transition: "opacity 0.6s 0.35s ease" }} />
        <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1rem,1.4vw,1.25rem)", lineHeight: 1.85, color: "#fff", maxWidth: "60ch", margin: 0, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.7s 0.45s ease, transform 0.7s 0.45s ease" }}>
          At LEAD, the mentor–student relationship extends far beyond office hours and academic reviews. It is a continuous, trust-based partnership where mentors invest in understanding each student's unique potential. Through regular conversations, guided reflection, and real-time support, mentoring becomes the thread that connects academic experience with personal transformation.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 8 — LEADERSHIP CULTURE
═══════════════════════════════════════════════════════ */
const LEADERSHIP_VALUES = [
  { icon: Star, label: "Integrity" },
  { icon: Heart, label: "Empathy" },
  { icon: Users, label: "Teamwork" },
  { icon: ShieldCheck, label: "Responsibility" },
  { icon: Lightbulb, label: "Initiative" },
  { icon: TrendingUp, label: "Accountability" },
];

function LeadershipCultureSection() {
  const [ref, visible] = useInView(0.15);
  const isMobile = useIsMobile();
  return (
    <section ref={ref} style={{ background: "#ffffff", padding: `${SPACE.sectionY} 0`, overflowX: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(3rem,6vw,5rem)", alignItems: "center" }}>
          <div style={{ position: "relative", minHeight: 380, order: isMobile ? -1 : 0, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transition: "opacity 0.9s 0.15s ease, transform 0.9s 0.15s ease" }}>
            <div style={{ borderRadius: RADIUS.card, overflow: "hidden", boxShadow: SHADOWS.hero }}>
              <img src="/convert/LEAD34.webp" alt="Leadership culture" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} loading="lazy" />
            </div>
            <div style={{ position: "absolute", bottom: -20, right: -16, background: "#ffffff", borderRadius: RADIUS.card, padding: "1.25rem 1.5rem", boxShadow: "0 16px 48px rgba(0,0,0,0.12)", borderWidth: 1, borderStyle: "solid", borderColor: COLORS.border, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s 0.5s ease, transform 0.7s 0.5s ease" }}>
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: COLORS.primary, margin: "0 0 0.8rem" }}>Core Values</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {LEADERSHIP_VALUES.map((val) => (
                  <div key={val.label} style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "rgba(0,92,159,0.06)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(0,92,159,0.12)", borderRadius: RADIUS.pill, padding: "0.3rem 0.75rem" }}>
                    <val.icon size={10} color={COLORS.primary} strokeWidth={2} />
                    <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", color: COLORS.dark }}>{val.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "1rem", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>Leadership Culture</p>
            <h2 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: "0 0 1.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease" }}>
              Building a Culture<br />of Leadership
            </h2>
            <div style={{ width: 48, height: 2, background: GRADIENTS.primary90, borderRadius: 2, marginBottom: "1.5rem", opacity: visible ? 1 : 0, transform: visible ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "opacity 0.5s 0.25s ease, transform 0.5s 0.25s ease" }} />
            <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: "#111", marginBottom: "1.25rem", opacity: visible ? 1 : 0, transition: "opacity 0.7s 0.2s ease" }}>
              The mentoring culture at LEAD is deeply connected to the institution's broader mission of developing ethical and socially responsible leaders. Faculty mentors encourage students to explore their potential, challenge themselves, and develop the courage to take initiative.
            </p>
            <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: "#111", opacity: visible ? 1 : 0, transition: "opacity 0.7s 0.3s ease" }}>
              Students are guided to think beyond personal success and to understand the importance of contributing positively to organizations and society. Mentors emphasize values such as integrity, empathy, teamwork, and responsible leadership — grounded in ethical awareness and social responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 9 — IMPACT COUNTERS
   FIX: All cards white bg. Border via individual props.
═══════════════════════════════════════════════════════ */
const IMPACT_DATA = [
  { value: 100, suffix: "%", label: "Students Mentored" },
  { value: 15, suffix: "+", label: "Faculty Mentors" },
  { value: 4, suffix: "", label: "Mentoring Pillars" },
  { value: 700, suffix: "+", label: "Lives Shaped" },
];

function ImpactSection() {
  const [ref, visible] = useInView(0.2);
  const isMobile = useIsMobile();
  return (
    <section ref={ref} style={{ background: "#ffffff", padding: `${SPACE.sectionY} 0` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <div style={{ textAlign: "center", marginBottom: SPACE.colGapLg }}>
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "0.75rem", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>Impact</p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.display3, color: COLORS.dark, margin: "0 0 1rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease" }}>The Mentoring Difference</h2>
          <p style={{ fontFamily: playfair.style.fontFamily, ...TYPE.body, color: "#111", maxWidth: "50ch", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.7s 0.2s ease" }}>
            Every number represents a student whose journey was shaped by personalized, consistent, and committed mentorship.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))", gap: SPACE.colGapMd }}>
          {IMPACT_DATA.map((item, i) => (
            <div key={item.label} style={{
              textAlign: "center",
              padding: SPACE.cardPadLg,
              background: "#ffffff",
              borderRadius: RADIUS.card,
              boxShadow: SHADOWS.card,
              // FIX: all border properties individually
              borderTopWidth: 2, borderTopStyle: "solid", borderTopColor: COLORS.primary,
              borderRightWidth: 1, borderRightStyle: "solid", borderRightColor: COLORS.border,
              borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: COLORS.border,
              borderLeftWidth: 1, borderLeftStyle: "solid", borderLeftColor: COLORS.border,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.6s ${i * 0.1 + 0.3}s ease, transform 0.6s ${i * 0.1 + 0.3}s ease`,
            }}>
              <div style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, color: COLORS.primary, lineHeight: 1, marginBottom: "0.5rem" }}>
                <AnimatedCounter target={item.value} suffix={item.suffix} visible={visible} />
              </div>
              <div style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.caption, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.textMuted }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function LifeMentoring() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <FrameworkSection />
      <TimelineSection />
      <AcademicGuidanceSection />
      <FeedbackReflectionSection />
      <StorytellingSection />
      <LeadershipCultureSection />
      <ImpactSection />
    </>
  );
}