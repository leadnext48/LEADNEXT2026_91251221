"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Lottie from "lottie-react";
import {
  Users, Compass, Shield, Brain,
  Flame, Eye, Award,
  type LucideIcon,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";

/* ─── DESIGN TOKENS ─── */
const COLORS = {
  primary:     "#005C9F",
  primaryDark: "#1e3a8a",
  bg:          "#F7F9FC",
  text:        "#0D0D0D",
  muted:       "#111",
  faint:       "#888",
} as const;

const GRADIENTS = {
  primary90: "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
} as const;

const TYPE = {
  eyebrow: {
    fontSize:      "clamp(.66rem,.8vw,.74rem)",
    letterSpacing: ".28em",
    textTransform: "uppercase" as const,
    fontWeight:    600,
  },
} as const;

const SPACE = { sectionX: "clamp(1.5rem,6vw,8rem)" } as const;

/* ─── ANIMATION PRESETS ─── */
const FADE_UP: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};
const STAGGER_CONTAINER: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const STAGGER_ITEM: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const VP = { once: true, amount: 0.1 } as const;

/* ─── HOOKS ─── */
function useIsMobile(bp = 768): boolean {
  const [m, setM] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const u = () => setM(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, [bp]);
  return m;
}

/* ─── DATA TYPES ─── */
interface Objective  { icon: LucideIcon; title: string; desc: string; }
interface Activity   { title: string; desc: string; number: string; }
interface ClosingItem { icon: LucideIcon; label: string; desc: string; }

/* ─── DATA ─── */
const OBJECTIVES: Objective[] = [
  {
    icon:  Compass,
    title: "Leadership Development",
    desc:  "Participants learn to take initiative, make decisions under pressure, and guide teams toward common goals. Activities require students to step forward as leaders and understand that leadership is about influence, collaboration, and accountability — not authority.",
  },
  {
    icon:  Users,
    title: "Teamwork & Collaboration",
    desc:  "Tasks cannot be completed individually. Participants learn how diverse perspectives contribute to better solutions and how mutual support strengthens team performance through trust-building and coordination.",
  },
  {
    icon:  Brain,
    title: "Problem Solving & Strategic Thinking",
    desc:  "Outdoor challenges simulate real-world managerial situations where teams must analyze problems, plan strategies, and execute solutions within limited time and resources — enhancing analytical thinking and creativity.",
  },
  {
    icon:  Shield,
    title: "Emotional Resilience & Confidence",
    desc:  "OBT pushes participants beyond their comfort zones through physical challenges and unfamiliar situations. Students confront fears, build resilience, and discover capabilities they did not previously recognize.",
  },
];

const ACTIVITIES: Activity[] = [
  { title: "Adventure-Based Challenges",     desc: "Outdoor activities requiring courage, balance, and focus — teaching students to trust themselves and their teammates while managing fear and uncertainty in unpredictable environments.", number: "01" },
  { title: "Trust-Building Exercises",       desc: "Structured exercises where participants learn to rely on one another, understand the importance of integrity, and build the mutual support that underpins effective leadership and teamwork.", number: "02" },
  { title: "Team Simulations",               desc: "Complex challenges requiring planning, communication, and collective problem-solving — mirroring organizational scenarios where leaders must coordinate resources and manage group dynamics.", number: "03" },
  { title: "Leadership Rotation Activities", desc: "Participants take turns assuming leadership roles during exercises. Each student experiences both leadership and followership, understanding the responsibilities and challenges of guiding a team.", number: "04" },
];

const REFLECTION_QUESTIONS: string[] = [
  "What challenges did the team encounter?",
  "How did communication influence outcomes?",
  "What leadership behaviours emerged during the activity?",
  "What could have been done differently?",
];

const CLOSING_ITEMS: ClosingItem[] = [
  { icon: Eye,   label: "Self-Awareness",   desc: "Students develop deeper understanding of their own behaviours, triggers, and capabilities." },
  { icon: Users, label: "Team Leadership",  desc: "Experience both leading and following — understanding the full spectrum of collaborative leadership." },
  { icon: Flame, label: "Purposeful Action", desc: "Emerge with renewed energy and a concrete, actionable mindset toward goals." },
  { icon: Award, label: "Career Readiness", desc: "Competencies developed are directly transferable to professional environments and future roles." },
];

/* ════════════════════════════════════════════════════════════════
   HERO SECTION — Turning Point style: text left, image right
════════════════════════════════════════════════════════════════ */
function HeroSection(): React.JSX.Element {
  const pills: string[] = ["Leadership", "Resilience", "Teamwork", "Problem Solving"];
  const STRIP_ITEMS = [
    { label: "Experiential Learning", sub: "Beyond the classroom" },
    { label: "Leadership-Focused",    sub: "Build real skills" },
    { label: "LEAD College",          sub: "Outbound Programme" },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overflow-x: hidden; }

        .obt-hero {
          height: 100svh;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: clamp(3rem,7vh,5rem) clamp(1.25rem,6vw,8rem) 0;
          width: 100%;
        }
        .obt-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,92,159,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,92,159,.04) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none; z-index: 0;
        }
        .obt-hero-bg-text {
          position: absolute; right: 0; bottom: -0.12em;
          font-size: clamp(16rem,32vw,48rem);
          font-weight: 800; line-height: 1;
          letter-spacing: -0.06em;
          color: rgba(0,92,159,.03);
          pointer-events: none; user-select: none;
          z-index: 0; white-space: nowrap;
        }
        .obt-hero-inner {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1.3fr 0.8fr;
          gap: clamp(1.5rem,3vw,3rem);
          align-items: center;
          flex: 1; min-height: 0;
          width: 100%; min-width: 0;
        }
        .obt-hero-strip {
          padding: clamp(.8rem,1.6vh,1.3rem) 0;
          border-top: 1px solid rgba(0,92,159,.10);
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: .5rem;
          margin-top: clamp(1.2rem,2.5vh,2rem);
          width: 100%; min-width: 0;
        }
        .obt-strip-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0 .75rem;
          border-right: 1px solid rgba(0,92,159,.10);
          min-width: 0; overflow: hidden;
        }
        .obt-strip-item:first-child { padding-left: 0; }
        .obt-strip-item:last-child  { border-right: none; }
        .obt-strip-label {
          display: block;
          font-size: clamp(.68rem,.75vw,.74rem);
          letter-spacing: .08em; text-transform: uppercase;
          color: #333; font-weight: 700;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .obt-strip-sub {
          display: block;
          font-size: clamp(.6rem,.75vw,.72rem);
          color: #111;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        @media (max-width: 767px) {
          .obt-hero { padding: 5rem 1.25rem 3rem; height: auto; min-height: 100svh; justify-content: flex-start; }
          .obt-hero-inner { grid-template-columns: 1fr; }
          .obt-hero-bg-text { display: none; }
          /* Show the training photo on mobile too (page looked dry without it). */
          .obt-hero-right { margin-top: 1.75rem; }
          /* Stack the three tags one per row, left-aligned, full text (were
             cramped into 3 columns so long labels overlapped the next card). */
          .obt-hero-strip { grid-template-columns: 1fr; gap: .85rem; }
          .obt-strip-item { padding: 0; gap: 10px; flex-direction: row; align-items: center; border-right: none; overflow: visible; }
          .obt-strip-item:first-child { padding-left: 0; }
          .obt-strip-label, .obt-strip-sub { white-space: normal; overflow: visible; text-overflow: clip; }
        }
      `}</style>

      <section className={`obt-hero ${cinzel.className}`}>
        <div className="obt-hero-bg-text" aria-hidden="true">OBT</div>

        <div className="obt-hero-inner">

          {/* LEFT — text */}
          <div style={{ minWidth: 0 }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(.6rem,1.3vh,1rem)", overflow: "hidden" }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1.5, flexShrink: 0, background: COLORS.primary }} />
              <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.74rem)", letterSpacing: "clamp(.08em,.2vw,.2em)", textTransform: "uppercase", color: COLORS.primary, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                LEAD College — Experiential Learning
              </span>
            </motion.div>

            {/* H1 — matching TP style */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(2.4rem,5.5vw,7rem)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-.03em", textTransform: "uppercase", margin: "0 0 clamp(.9rem,1.8vh,1.6rem)" }}
            >
              <span style={{ display: "block", color: COLORS.text }}>Outbound</span>
              <span style={{ display: "block", background: GRADIENTS.primary90, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                Training.
              </span>
            </motion.h1>

            {/* Rule */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
              style={{ width: 36, height: 2, background: GRADIENTS.primary90, marginBottom: "clamp(.9rem,1.8vh,1.4rem)", transformOrigin: "left" }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
              style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.88rem,1.05vw,.98rem)", lineHeight: 1.8, color: "#111", margin: 0 }}
            >
              An immersive outdoor leadership programme that moves learning beyond the conventional
              classroom — placing students in dynamic environments where they apply teamwork,
              resilience, and decision-making in real time.
            </motion.p>

            {/* Pills row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
              style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "clamp(.8rem,1.6vh,1.2rem)", marginBottom: "clamp(.6rem,1.2vh,1rem)" }}
            >
              {pills.map((t) => (
                <div key={t} style={{
                  display: "flex", alignItems: "center", gap: ".5rem",
                  background: "rgba(0,92,159,.05)", border: "1px solid rgba(0,92,159,.12)",
                  borderRadius: 100,
                  padding: ".32rem .9rem",
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "clamp(.66rem,.8vw,.74rem)",
                  letterSpacing: ".12em", textTransform: "uppercase" as const,
                  color: COLORS.primary, fontWeight: 600,
                }}>{t}</div>
              ))}
            </motion.div>

            {/* Strip — matching TP hero strip */}
            <motion.div
              className="obt-hero-strip"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: "easeOut" }}
            >
              {STRIP_ITEMS.map((s) => (
                <div key={s.label} className="obt-strip-item">
                  <div style={{ minWidth: 0 }}>
                    <strong className="obt-strip-label" style={{ fontFamily: cinzel.style.fontFamily }}>{s.label}</strong>
                    <span className="obt-strip-sub" style={{ fontFamily: playfair.style.fontFamily }}>{s.sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — image matching TP hero right panel */}
          <div className="obt-hero-right">
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <div style={{ position: "relative", height: 300, overflow: "hidden", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,.12)" }}>
                {/* Blue left accent bar — same as TP */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: COLORS.primary, zIndex: 2, borderRadius: "16px 0 0 16px" }} />
                <img
                  src="/convert/IMG_1261.jpeg"
                  alt="OBT outdoor leadership training"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,28,65,.22) 0%,transparent 60%)" }} />
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   PHILOSOPHY SECTION — Lottie replaces undraw SVG
════════════════════════════════════════════════════════════════ */
function PhilosophySection(): React.JSX.Element {
  const isMobile = useIsMobile();
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/help.json").then(r => r.json()).then(d => setAnimationData(d));
  }, []);

  const truths: { title: string; desc: string }[] = [
    { title: "Action & Responsibility", desc: "Leadership emerges through taking initiative and owning outcomes — not waiting to be led." },
    { title: "Trust & Communication",   desc: "Effective teams are built on honest communication and genuine trust between members." },
    { title: "Hidden Capabilities",     desc: "Challenges reveal potential that formal learning rarely surfaces — growth lives outside comfort zones." },
    { title: "Resilience by Experience", desc: "Perseverance and confidence grow only through facing real uncertainty, not simulated scenarios." },
  ];

  return (
    <section style={{ background: "#ffffff", padding: "clamp(3rem,6vh,5rem) 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <div style={{
          display:             "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap:                 "clamp(2.5rem,5vw,6rem)",
          alignItems:          "center",
        }}>

          {/* LEFT — text + 2×2 truth grid */}
          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: ".6rem" }}>Our Philosophy</p>
            <h2 style={{
              fontFamily:    cinzel.style.fontFamily,
              fontSize:      "clamp(1.3rem,2.3vw,2.8rem)",
              fontWeight:    800,
              lineHeight:    0.95,
              letterSpacing: "-.025em",
              textTransform: "uppercase",
              color:         COLORS.text,
              margin:        "0 0 .8rem",
            }}>
              Learn By<br />Doing. Reflect.<br />Apply.
            </h2>
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VP}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              style={{ width: 36, height: 2, background: GRADIENTS.primary90, borderRadius: 2, marginBottom: "1.2rem", transformOrigin: "left" }}
            />

            <div style={{ borderLeft: `3px solid ${COLORS.primary}`, paddingLeft: "1.2rem", marginBottom: "1.6rem" }}>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.88rem,1vw,.96rem)", fontWeight: 600, fontStyle: "normal", lineHeight: 1.65, color: COLORS.text, margin: "0 0 .5rem" }}>
                "Students often enter with assumptions about their abilities. The outdoor environment
                disrupts routine patterns and challenges participants to engage with uncertainty."
              </p>
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#111", margin: 0, fontWeight: 600 }}>
                — OBT Philosophy, LEAD College
              </p>
            </div>

            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.8, color: "#111", margin: "0 0 1.4rem" }}>
              The OBT program is rooted in experiential learning principles — learning by doing,
              reflecting, and applying insights to real-life contexts. Students begin to understand
              important leadership truths:
            </p>

            {/* 2×2 truth grid */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: ".85rem" }}>
              {truths.map((t, i) => (
                <div key={i} style={{
                  background:   "#ffffff",
                  borderRadius: 12,
                  padding:      "1rem 1.1rem",
                  border:       "1px solid rgba(0,92,159,.07)",
                  borderLeft:   `3px solid ${COLORS.primary}`,
                }}>
                  <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.74rem)", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: COLORS.text, margin: "0 0 .35rem" }}>{t.title}</p>
                  <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.65, color: COLORS.muted, margin: 0 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Lottie, plain on white */}
          {!isMobile && animationData && (
            <motion.div
              initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.15}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{ width: "clamp(220px,28vw,420px)", height: "auto" }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   OBJECTIVES SECTION — unchanged
════════════════════════════════════════════════════════════════ */
function ObjectivesSection(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#fff", padding: "clamp(2.5rem,5vh,4.5rem) 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}
          style={{ textAlign: "center", marginBottom: "clamp(2rem,4vh,3.5rem)" }}
        >
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: ".5rem" }}>What You Develop</p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.2rem,2.2vw,2.7rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.025em", color: COLORS.text, margin: 0, lineHeight: 1 }}>
            Learning Objectives
          </h2>
          <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", color: "#111", maxWidth: 440, margin: ".8rem auto 0", lineHeight: 1.65 }}>
            Four core dimensions of growth that OBT is specifically designed to activate.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,minmax(0,1fr))", gap: "1.2rem" }}
        >
          {OBJECTIVES.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <motion.div key={i} variants={STAGGER_ITEM} style={{
                background: "#ffffff", borderRadius: 16, padding: "1.8rem",
                border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 2px 14px rgba(0,0,0,.04)",
                display: "flex", gap: "1.2rem", alignItems: "flex-start",
              }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(0,92,159,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Icon size={20} color={COLORS.primary} strokeWidth={1.7} />
                </div>
                <div>
                  <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.72rem,.84vw,.8rem)", fontWeight: 700, color: COLORS.text, margin: "0 0 .55rem", letterSpacing: ".03em", textTransform: "uppercase", lineHeight: 1.3 }}>{obj.title}</h3>
                  <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.78, color: COLORS.muted, margin: 0 }}>{obj.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   ACTIVITIES SECTION — unchanged
════════════════════════════════════════════════════════════════ */
function ActivitiesSection(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#fff", padding: "clamp(3rem,6vh,5rem) 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(2.5rem,5vw,6rem)", alignItems: "flex-start" }}>

          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: ".5rem" }}>Program Structure</p>
            <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.2rem,2.2vw,2.7rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.025em", color: COLORS.text, margin: "0 0 .6rem", lineHeight: 1 }}>
              Activities &<br />Training Modules
            </h2>
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VP}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              style={{ width: 36, height: 2, background: GRADIENTS.primary90, borderRadius: 2, marginBottom: "1.1rem", transformOrigin: "left" }}
            />
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.78, color: "#111", margin: "0 0 1.6rem", maxWidth: 400 }}>
              Four carefully designed training modules — each targeting a distinct dimension of leadership, teamwork, and personal development.
            </p>

            <motion.div
              initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
              style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: ".85rem" }}
            >
              {ACTIVITIES.map((act, i) => (
                <motion.div key={i} variants={STAGGER_ITEM} style={{
                  background: "#ffffff", borderRadius: 14, padding: "1.2rem 1.3rem",
                  border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 2px 12px rgba(0,0,0,.04)",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(2rem,3.2vw,2.6rem)", fontWeight: 900, color: "rgba(0,92,159,.07)", lineHeight: 1, position: "absolute", top: ".5rem", right: ".8rem", userSelect: "none" }}>{act.number}</div>
                  <div style={{ width: 4, height: 28, background: GRADIENTS.primary90, borderRadius: 2, marginBottom: ".7rem" }} />
                  <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.74rem)", fontWeight: 700, color: COLORS.text, margin: "0 0 .45rem", letterSpacing: ".04em", textTransform: "uppercase", lineHeight: 1.35, paddingRight: "1.5rem" }}>{act.title}</h3>
                  <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.7, color: COLORS.muted, margin: 0 }}>{act.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — image collage */}
          {!isMobile && (
            <motion.div
              initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.15}
              style={{ position: "relative", height: 480, paddingTop: "3.5rem" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={VP} transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
                style={{ position: "absolute", top: 40, left: 0, right: 60, height: 340, borderRadius: 18, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.16)" }}
              >
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: GRADIENTS.primary90, zIndex: 2, borderRadius: "18px 0 0 18px" }} />
                <img
              src="/convert/AJD08797.JPG"
                  alt="Leadership group training"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .7s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,28,65,.22) 0%,transparent 60%)" }} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={VP} transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
                style={{ position: "absolute", bottom: 0, right: 0, width: "55%", height: 210, borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,.18)", border: "3px solid #fff", zIndex: 3 }}
              >
                <img
                      src="/convert/IMG_9422.JPG"
                  alt="Outdoor team activity"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .7s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,28,65,.3) 0%,transparent 55%)" }} />
              </motion.div>

              <div style={{ position: "absolute", top: 20, right: 30, width: 100, height: 100, borderRadius: "50%", background: `linear-gradient(135deg,${COLORS.primary}14,${COLORS.primaryDark}08)`, border: `1px solid rgba(0,92,159,.1)`, zIndex: 0 }} />

              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={VP} transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                style={{ position: "absolute", top: 30, right: 10, background: COLORS.primary, borderRadius: 12, padding: ".8rem 1.1rem", zIndex: 4, boxShadow: "0 12px 32px rgba(0,92,159,.28)" }}
              >
                <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "1.4rem", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1 }}>04</p>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: ".74rem", color: "#fff", margin: "3px 0 0" }}>Modules</p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   MENTORING & REFLECTION SECTION — unchanged
════════════════════════════════════════════════════════════════ */
function MentoringSection(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#ffffff", padding: "clamp(3rem,6vh,5rem) 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(2.5rem,5vw,6rem)", alignItems: "center" }}>

          {!isMobile && (
            <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0} style={{ position: "relative" }}>
              <div style={{ position: "relative", height: 400, borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.13)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: GRADIENTS.primary90, zIndex: 2, borderRadius: "20px 0 0 20px" }} />
                <img
                     src="/convert/AJD09072.JPG"
                  alt="Faculty mentoring students"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.35) 0%,transparent 55%)" }} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={VP} transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                style={{ position: "absolute", bottom: -20, right: -20, background: "#fff", border: "1px solid rgba(0,0,0,.07)", boxShadow: "0 16px 40px rgba(0,0,0,.12)", borderRadius: 12, padding: ".9rem 1.2rem", zIndex: 10 }}
              >
                <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "1.4rem", fontWeight: 800, color: COLORS.primary, margin: 0, lineHeight: 1 }}>1:1</p>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: ".72rem", color: "#111", margin: "4px 0 0" }}>Personal Mentoring</p>
              </motion.div>
            </motion.div>
          )}

          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.1}>
            <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: ".6rem" }}>A Defining Feature</p>
            <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.2rem,2.2vw,2.6rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.02em", color: COLORS.text, margin: "0 0 .8rem", lineHeight: 1.05 }}>
              Mentoring &<br />Guided Reflection.
            </h2>
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VP}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              style={{ width: 36, height: 2, background: GRADIENTS.primary90, borderRadius: 2, marginBottom: "1.2rem", transformOrigin: "left" }}
            />
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.8, color: "#111", margin: "0 0 1.2rem" }}>
              A structured mentoring and reflection process accompanies each activity. Faculty mentors and facilitators guide students in interpreting their experiences and connecting them to real-life leadership principles.
            </p>

            <div style={{ marginBottom: "1.4rem" }}>
              <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.74rem)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: COLORS.text, marginBottom: ".8rem" }}>
                Guided Reflection Questions
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
                {REFLECTION_QUESTIONS.map((q, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: ".75rem" }}>
                    <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".72rem", fontWeight: 700, color: COLORS.primary, opacity: 0.55, letterSpacing: ".1em", flexShrink: 0, marginTop: 3, minWidth: "1.2rem" }}>Q{i + 1}</span>
                    <p style={{ fontFamily: playfair.style.fontFamily, fontStyle: "normal", fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.6, color: COLORS.muted, margin: 0 }}>{q}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "1.2rem 1.4rem", border: "1px solid rgba(0,92,159,.08)", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
              <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.74rem)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: COLORS.text, marginBottom: ".5rem" }}>
                Personalized Mentoring
              </h3>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.75, color: "#111", margin: 0 }}>
                Faculty mentors observe participation and provide individual feedback on leadership style, teamwork, and decision-making — helping students identify areas for improvement and develop actionable strategies for growth.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   CLOSING SECTION — unchanged
════════════════════════════════════════════════════════════════ */
function ClosingSection(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#ffffff", padding: "clamp(3rem,6vh,5rem) 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}
          style={{ textAlign: "center", marginBottom: "clamp(2rem,4vh,3.5rem)" }}
        >
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: ".5rem" }}>OBT & The LEAD Philosophy</p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.2rem,2.2vw,2.7rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.025em", color: COLORS.text, margin: 0, lineHeight: 1 }}>
            A Leadership Laboratory.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr .9fr", gap: "clamp(2rem,4vw,5rem)", alignItems: "center" }}>

          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <div style={{ borderLeft: `3px solid ${COLORS.primary}`, paddingLeft: "1.2rem", marginBottom: "1.6rem" }}>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.9rem,1.05vw,1rem)", fontWeight: 600, fontStyle: "normal", lineHeight: 1.65, color: COLORS.text, margin: "0 0 .5rem" }}>
                "OBT is not merely an outdoor activity — it is a leadership laboratory where students experience the realities of teamwork, decision-making, and resilience in action."
              </p>
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#111", margin: 0, fontWeight: 600 }}>
                — LEAD College OBT Program
              </p>
            </div>
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.8, color: "#111", margin: "0 0 1rem" }}>
              Outbound Training embodies LEAD College's broader educational philosophy that meaningful learning must combine knowledge, experience, and reflection. By integrating physical challenges with intellectual reflection and mentoring, OBT creates a holistic learning experience.
            </p>
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.8, color: "#111", margin: 0 }}>
              The program strengthens both personal character and professional competence — helping students transition from passive learners to active contributors and responsible leaders.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
            style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}
          >
            {CLOSING_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} variants={STAGGER_ITEM} style={{
                  background: "#fff", borderRadius: 12, padding: "1rem 1.2rem",
                  border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 2px 10px rgba(0,0,0,.04)",
                  display: "flex", gap: ".85rem", alignItems: "flex-start",
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(0,92,159,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <Icon size={16} color={COLORS.primary} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.74rem)", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: COLORS.text, margin: "0 0 .3rem" }}>{item.label}</h4>
                    <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,1vw,1rem)", lineHeight: 1.65, color: "#111", margin: 0 }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPORT ─── */
export default function OutboundTraining(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <ObjectivesSection />
      <ActivitiesSection />
      <MentoringSection />
      <ClosingSection />
    </>
  );
}