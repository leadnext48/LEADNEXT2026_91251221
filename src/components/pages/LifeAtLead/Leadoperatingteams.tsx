"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Lottie from "lottie-react";
import {
  UserCheck, Briefcase, Coffee, BookOpen, Camera, Calendar, Leaf,
  Heart, Award, Trophy, Palette, FlaskConical, Radio, Globe, Settings,
  Users, Star, Mic, Code, ShoppingBag, Bike, BookMarked, Zap,
  GraduationCap,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, GRADIENTS } from "@/lib/design-tokens";

/* ─── HOOKS ─── */
function useInView(threshold = 0.15): [React.RefCallback<HTMLElement>, boolean] {
  const [visible, setVisible] = useState(false);
  const obsRef = useRef<IntersectionObserver | null>(null);
  const ref = useCallback<React.RefCallback<HTMLElement>>((node) => {
    if (obsRef.current) { obsRef.current.disconnect(); obsRef.current = null; }
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(node);
    obsRef.current = obs;
  }, [threshold]);
  useEffect(() => () => obsRef.current?.disconnect(), []);
  return [ref, visible];
}

function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const u = () => setM(mq.matches); u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, [bp]);
  return m;
}

/* ─── DATA ─── */
const LOTS = [
  { id: 1,  icon: UserCheck,    name: "Admission",              incharge: "Mr. Rohit / Sinoj",      desc: "Manages student recruitment, campus visits, and the end-to-end admission journey for every incoming cohort." },
  { id: 2,  icon: Briefcase,    name: "Placement",              incharge: "Mr. Ajay Japamani",       desc: "Drives industry connections, recruitment drives, and comprehensive career readiness programmes for graduates." },
  { id: 3,  icon: Coffee,       name: "Canteen",                incharge: "Dr. Raies Hamid",         desc: "Oversees campus dining operations, vendor management, and the overall student food & beverage experience." },
  { id: 4,  icon: BookOpen,     name: "OBT",                    incharge: "Mr. Sijin TC",            desc: "Organises outbound training and experiential learning activities for holistic cohort development." },
  { id: 5,  icon: Camera,       name: "Leadography",            incharge: "Mr. Shankar Raman R",     desc: "Handles all photography, videography, and visual documentation of campus life and institutional events." },
  { id: 6,  icon: Calendar,     name: "Events",                 incharge: "Dr. Sheena MS",           desc: "Plans and executes institutional events, fests, and flagship programmes with precision and creativity." },
  { id: 7,  icon: Leaf,         name: "Greening",               incharge: "Dr. Linda Silvya J",      desc: "Champions sustainability, green campus initiatives, and environmental awareness drives throughout the year." },
  { id: 8,  icon: Heart,        name: "ISR",                    incharge: "Dr. Sona R",              desc: "Leads institutional social responsibility projects and meaningful community engagement programmes." },
  { id: 9,  icon: Award,        name: "Training",               incharge: "Dr. Naibi Kurian",        desc: "Coordinates skill-building workshops, professional certifications, and industry-aligned development sessions." },
  { id: 10, icon: Trophy,       name: "Competition",            incharge: "Mr. Frackson C Viyano",   desc: "Identifies, prepares, and fields students for inter-institutional competitions and prestigious national contests." },
  { id: 11, icon: Palette,      name: "Arts & Sports",          incharge: "Mr. Ranjith Karat",       desc: "Nurtures cultural expression and athletic excellence through structured year-round co-curricular activities." },
  { id: 12, icon: FlaskConical, name: "Research & Consultancy", incharge: "Mr. Shaju Meetna",        desc: "Facilitates student-led research projects and live consultancy engagements with industry and community partners." },
  { id: 13, icon: Radio,        name: "LEAD Media",             incharge: "Dr. Arjun K P",           desc: "Manages college media channels including newsletters, social media, and all digital content production." },
  { id: 14, icon: Globe,        name: "Hospitality & PR",       incharge: "Ms. Krishnapriya",        desc: "Handles guest relations, external communications, and the institution's professional public-facing image." },
  { id: 15, icon: Settings,     name: "Administration",         incharge: "Dr. Jith R",              desc: "Coordinates day-to-day campus operations, records management, and all administrative support functions." },
];

const CLUBS = [
  { id: 1,  name: "JCI",                        incharge: "Dr. Sabina A Nair",        icon: Users },
  { id: 2,  name: "Rotaract",                   incharge: "Dr. Mohammed Irshad V K",  icon: Globe },
  { id: 3,  name: "Lions Clubs International",  incharge: "Dr. Jamsheer Khan K",      icon: Heart },
  { id: 4,  name: "Y's Men Club",               incharge: "Dr. Krishnapriya",         icon: Star },
  { id: 5,  name: "Toastmasters International", incharge: "Dr. Rajani",               icon: Mic },
  { id: 6,  name: "SheLeads",                   incharge: "Dr. Dhanalakshmi M",       icon: Award },
  { id: 7,  name: "IEEE",                       incharge: "Mr. Shankar Raman R",      icon: Zap },
  { id: 8,  name: "NIPM",                       incharge: "Dr. Archana P V",          icon: Briefcase },
  { id: 9,  name: "Antinarcotics Club",          incharge: "Mr. Pramod V",             icon: ShoppingBag },
  { id: 10, name: "Tourism Club",               incharge: "Dr. Muhammed Iqbal",       icon: Bike },
  { id: 11, name: "Trading Club",               incharge: "Dr. Syamraj K P",          icon: Trophy },
  { id: 12, name: "IEDC",                       incharge: "Dr. Sarithambika K P",     icon: FlaskConical },
  { id: 13, name: "LEADreads",                  incharge: "Dr. A K Pratheepa",        icon: BookMarked },
  { id: 14, name: "AI and Coding",              incharge: "Mr. Abel Jo Paul",         icon: Code },
];


/* ════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════ */
function HeroSection() {
  const [animData, setAnimData] = useState<any>(null);

  useEffect(() => {
    fetch("/learning.json")
      .then(r => r.json())
      .then(d => setAnimData(d));
  }, []);

  const STRIP = [
    { label: "15 Operating Teams", sub: "Student-led units" },
    { label: "14 Active Clubs",    sub: "Campus communities" },
    { label: "100% Student-Led",   sub: "Real responsibility" },
  ];
  const pills = ["Leadership", "Accountability", "Teamwork", "Real-World Learning"];

  return (
    <>
      <style>{`
        html, body { overflow-x: clip; }
        .lot-hero {
          height: calc(100svh - 64px);
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: clamp(1rem,3vh,2rem) clamp(1.25rem,6vw,8rem) 0;
          width: 100%;
          box-sizing: border-box;
        }
        .lot-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,92,159,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,92,159,.04) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none; z-index: 0;
        }
        .lot-hero-bg-text {
          position: absolute; right: 0; bottom: -0.12em;
          font-size: clamp(16rem,32vw,48rem);
          font-weight: 800; line-height: 1; letter-spacing: -0.06em;
          color: rgba(0,92,159,.03);
          pointer-events: none; user-select: none; z-index: 0; white-space: nowrap;
        }
        .lot-hero-inner {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1.3fr 0.8fr;
          gap: clamp(1.5rem,3vw,3rem);
          align-items: center;
          flex: 1; min-height: 0; width: 100%; min-width: 0;
        }
        .lot-hero-strip {
          padding: clamp(.8rem,1.6vh,1.3rem) 0;
          border-top: 1px solid rgba(0,92,159,.10);
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: .5rem;
          margin-top: clamp(1.2rem,2.5vh,2rem);
          width: 100%; min-width: 0;
        }
        .lot-strip-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0 .75rem;
          border-right: 1px solid rgba(0,92,159,.10);
          min-width: 0; overflow: hidden;
        }
        .lot-strip-item:first-child { padding-left: 0; }
        .lot-strip-item:last-child  { border-right: none; }
        .lot-strip-label {
          display: block; font-size: clamp(.7rem,.75vw,.74rem);
          letter-spacing: .08em; text-transform: uppercase;
          color: #333; font-weight: 700;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .lot-strip-sub {
          display: block; font-size: clamp(.6rem,.75vw,.72rem); color: #111;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        @media (max-width: 767px) {
          .lot-hero { padding: 5rem 1.25rem 2.5rem; height: auto; min-height: 100svh; overflow-x: hidden; }
          .lot-hero-inner { grid-template-columns: 1fr; align-items: start; }
          .lot-hero-right, .lot-hero-bg-text { display: none; }
          .lot-hero h1 { white-space: normal !important; }
          .lot-hero-strip { grid-template-columns: 1fr; gap: .5rem; }
          .lot-strip-item {
            padding: .55rem 0; gap: 10px;
            flex-direction: row; align-items: center;
            border-right: none; border-bottom: 1px solid rgba(0,92,159,.10);
            overflow: visible;
          }
          .lot-strip-item:first-child { padding-left: 0; padding-top: 0; }
          .lot-strip-item:last-child { border-bottom: none; }
          .lot-strip-label, .lot-strip-sub { white-space: normal; overflow: visible; text-overflow: clip; }
        }
      `}</style>

      <section className={`lot-hero ${cinzel.className}`}>
        <div className="lot-hero-bg-text" aria-hidden="true">LOT</div>

        <div className="lot-hero-inner">
          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(.6rem,1.3vh,1rem)", overflow: "hidden" }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1.5, flexShrink: 0, background: COLORS.primary }} />
              <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.7rem,.75vw,.74rem)", letterSpacing: "clamp(.08em,.2vw,.2em)", textTransform: "uppercase", color: COLORS.primary, fontWeight: 600, whiteSpace: "nowrap" }}>
                LEAD College — Student-Led Excellence
              </span>
            </motion.div>

            {/* H1 — reduced size so "Operating Teams." stays on one line */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .1, ease: "easeOut" }}
              style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(1.9rem,4vw,5rem)",   /* ← reduced from 5.5vw/7rem */
                fontWeight: 800,
                lineHeight: .92,
                letterSpacing: "-.03em",
                textTransform: "uppercase",
                margin: "0 0 clamp(.9rem,1.8vh,1.6rem)",
                whiteSpace: "nowrap",                  /* ← prevents wrapping */
              }}
            >
              <span style={{ display: "block", color: "#0D0D0D" }}>LEAD</span>
              <span style={{
                display: "block",
                background: `linear-gradient(90deg,${COLORS.primary} 0%,#1e3a8a 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}>
                Operating Teams.
              </span>
            </motion.h1>

            {/* Rule */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: .45, delay: .25, ease: "easeOut" }}
              style={{ width: 36, height: 2, background: `linear-gradient(90deg,${COLORS.primary},#1e3a8a)`, marginBottom: "clamp(.9rem,1.8vh,1.4rem)", transformOrigin: "left" }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .3, ease: "easeOut" }}
              style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1rem,1.05vw,1rem)", lineHeight: 1.8, color: "#111", margin: 0 }}
            >
              15 student-led functional units managing every facet of campus life — from admissions
              and placements to arts, research, and sustainability. Each team is a real leadership
              laboratory, where students learn by doing with full ownership and accountability.
            </motion.p>

            {/* Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: .38, ease: "easeOut" }}
              style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "clamp(.8rem,1.6vh,1.2rem)", marginBottom: "clamp(.6rem,1.2vh,1rem)" }}
            >
              {pills.map(t => (
                <div key={t} style={{
                  display: "flex", alignItems: "center",
                  background: "rgba(0,92,159,.05)", border: "1px solid rgba(0,92,159,.12)",
                  borderRadius: 100, padding: ".32rem .9rem",
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "clamp(.66rem,.7vw,.72rem)", letterSpacing: ".12em",
                  textTransform: "uppercase" as const, color: COLORS.primary, fontWeight: 600,
                }}>{t}</div>
              ))}
            </motion.div>

            {/* Strip */}
            <motion.div
              className="lot-hero-strip"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .42, ease: "easeOut" }}
            >
              {STRIP.map(s => (
                <div key={s.label} className="lot-strip-item">
                  <div style={{ minWidth: 0 }}>
                    <strong className="lot-strip-label" style={{ fontFamily: cinzel.style.fontFamily }}>{s.label}</strong>
                    <span className="lot-strip-sub" style={{ fontFamily: playfair.style.fontFamily }}>{s.sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Lottie */}
          <div className="lot-hero-right">
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .2, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {animData
                ? <Lottie animationData={animData} loop autoplay style={{ width: "clamp(400px,48vw,680px)", height: "auto" }} />
                : <div style={{ width: 500, height: 420, background: "rgba(0,92,159,.04)", borderRadius: 16 }} />
              }
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ════════════════════════════════════════════════════
   ABOUT SECTION
════════════════════════════════════════════════════ */
function AboutSection() {
  const [ref, visible] = useInView(0.2);
  const [statsRef, statsVisible] = useInView(0.3);
  const isMobile = useIsMobile();

  return (
    <section ref={ref as React.RefCallback<HTMLDivElement>} style={{ background: "#ffffff", padding: `${SPACE.sectionY} 0` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "1rem", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>
          How It Works
        </p>
        <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.5rem,2.8vw,3rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#0D0D0D", margin: "0 0 1.5rem", maxWidth: 700, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease" }}>
          The LOT System
        </h2>
        <div style={{ width: 48, height: 2, background: GRADIENTS.primary90, borderRadius: 2, marginBottom: "2.5rem", opacity: visible ? 1 : 0, transform: visible ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "opacity 0.5s 0.25s ease, transform 0.5s 0.25s ease" }} />

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "2rem 3rem", marginBottom: "clamp(2.5rem,5vh,4rem)" }}>
          {[
            "LEAD operates through 15 LEAD Operating Teams (LOTs), student-led functional units responsible for every campus activity and institutional initiative. Each LOT is guided by a faculty head, ensuring structured learning, accountability, and effective execution.",
            "These teams manage areas such as events, communication, operations, innovation, social outreach, and more. Through active participation in LOTs, students gain hands-on experience in planning, coordination, and leadership — with real outcomes.",
            "The LOT system transforms campus activities into leadership laboratories, enabling students to learn management by practising it in real time. Every decision has weight. Every outcome is owned.",
          ].map((para, i) => (
            <p key={i} style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1rem,1.05vw,1rem)", lineHeight: 1.88, color: "#111", margin: 0, opacity: visible ? 1 : 0, transition: `opacity 0.7s ${0.2 + i * 0.1}s ease` }}>{para}</p>
          ))}
        </div>

        {/* Stat bar */}
        <div ref={statsRef as React.RefCallback<HTMLDivElement>} style={{
          borderTop: "1px solid rgba(0,92,159,0.1)", borderBottom: "1px solid rgba(0,92,159,0.1)",
          display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, minmax(0, 1fr))",
          opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          {[
            { value: "15",   label: "Operating Teams",    sub: "Active student-led units" },
            { value: "14",   label: "Student Clubs",      sub: "Professional & social chapters" },
            { value: "29",   label: "Faculty In-Charges", sub: "Dedicated leadership oversight" },
            { value: "100%", label: "Student-Led",        sub: "Hands-on management practice" },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              padding: "clamp(1.5rem,3vh,2.5rem) clamp(1.2rem,2vw,2rem)",
              background: "#ffffff",
              borderRight: (!isMobile && i < arr.length - 1) ? "1px solid rgba(0,92,159,0.1)" : "none",
              borderBottom: (isMobile && i < 2) ? "1px solid rgba(0,92,159,0.1)" : "none",
            }}>
              <div style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 900, color: COLORS.primary, lineHeight: 1, marginBottom: ".4rem", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.7rem,.8vw,.74rem)", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#0D0D0D", marginBottom: ".35rem" }}>{s.label}</div>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1rem,.85vw,1rem)", color: "#111", lineHeight: 1.4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   LOTs — card grid
════════════════════════════════════════════════════ */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

function LotsSection() {
  const [headerRef, headerVisible] = useInView(0.3);
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#ffffff", padding: `${SPACE.sectionY} 0` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <div ref={headerRef as React.RefCallback<HTMLDivElement>} style={{ marginBottom: "clamp(2.5rem,5vh,4rem)" }}>
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "0.5rem", opacity: headerVisible ? 1 : 0, transition: "opacity 0.6s ease" }}>All 15 Teams</p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.4rem,2.5vw,2.8rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#0D0D0D", margin: 0, lineHeight: 1.1, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease" }}>
            The Functional Units
          </h2>
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.04 }}
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: "1.5rem" }}
        >
          {LOTS.map((lot, i) => <LotCard key={lot.id} lot={lot} index={i} />)}
        </motion.div>
      </div>
    </section>
  );
}

function LotCard({ lot, index }: { lot: typeof LOTS[number]; index: number }) {
  const Icon = lot.icon;
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      style={{
        background: "#ffffff", borderRadius: 16,
        padding: "1.75rem 1.75rem 1.5rem",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        cursor: "default", minHeight: 260,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ width: 58, height: 58, borderRadius: 14, background: "rgba(0,92,159,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={26} color={COLORS.primary} strokeWidth={1.7} />
        </div>
        <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "1.8rem", fontWeight: 900, color: "rgba(0,0,0,0.07)", lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none" }}>
          {String(lot.id).padStart(2, "0")}
        </span>
      </div>
      <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1rem,1.25vw,1.15rem)", fontWeight: 700, color: "#0D0D0D", margin: "0 0 0.65rem", letterSpacing: "0.01em", lineHeight: 1.2 }}>
        {lot.name}
      </h3>
      <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1rem,0.95vw,1rem)", lineHeight: 1.75, color: "#111", margin: "0 0 auto", paddingBottom: "1.25rem", flex: 1 }}>
        {lot.desc}
      </p>
      <div style={{ paddingTop: "1.1rem", borderTop: "1px solid rgba(0,92,159,0.1)", display: "flex", alignItems: "center", gap: "0.7rem" }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(0,92,159,0.07)", border: "1px solid rgba(0,92,159,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <GraduationCap size={16} color={COLORS.primary} strokeWidth={1.9} />
        </div>
        <div>
          <div style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(0.66rem,0.7vw,0.72rem)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,92,159,0.5)", marginBottom: "3px" }}>
            Faculty In-Charge
          </div>
          <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.9rem,1vw,0.95rem)", fontWeight: 600, color: "#0D0D0D", lineHeight: 1.2 }}>
            {lot.incharge}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   CLUBS DESCRIPTION
════════════════════════════════════════════════════ */
function ClubsDescSection() {
  const [ref, visible] = useInView(0.2);

  return (
    <section ref={ref as React.RefCallback<HTMLDivElement>} style={{ background: COLORS.primary, padding: `${SPACE.sectionY} 0`, overflow: "hidden", position: "relative" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: "-0.05em", bottom: "-0.15em", fontFamily: cinzel.style.fontFamily, fontSize: "clamp(14rem,28vw,40rem)", fontWeight: 800, lineHeight: 1, color: "rgba(255,255,255,0.04)", pointerEvents: "none", userSelect: "none", letterSpacing: "-0.06em" }}>C</div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${SPACE.sectionX}`, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 760 }}>
          <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.66rem,.72vw,.72rem)", letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", fontWeight: 600, display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(.7rem,1.5vh,1.2rem)", opacity: visible ? 1 : 0, transition: "opacity .6s" }}>
            <span style={{ display: "inline-block", width: 28, height: 1.5, background: "rgba(255,255,255,.4)" }} />
            Student Clubs
          </p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(2rem,5.5vw,6rem)", fontWeight: 800, lineHeight: .92, letterSpacing: "-0.03em", textTransform: "uppercase", color: "#fff", margin: "0 0 clamp(1rem,2vh,1.8rem)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity .8s .1s, transform .8s .1s" }}>
            Clubs at<br />LEAD.
          </h2>
          <div style={{ width: 40, height: 2, background: "rgba(255,255,255,.4)", marginBottom: "clamp(1rem,2vh,1.6rem)", opacity: visible ? 1 : 0, transition: "opacity .5s .3s" }} />
          <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1rem,1.1vw,1.05rem)", lineHeight: 1.85, color: "#fff", margin: 0, opacity: visible ? 1 : 0, transition: "opacity .7s .35s" }}>
            Clubs at LEAD provide vibrant platforms to explore interests, develop new skills, and engage creatively beyond the classroom. These student-driven groups organise activities, discussions, competitions, and collaborative projects in management, innovation, culture, communication, and social initiatives — guided by faculty mentors who foster leadership, teamwork, and community.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════
   CLUBS — card grid
════════════════════════════════════════════════════ */
function ClubsSection() {
  const [headerRef, headerVisible] = useInView(0.3);
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#F7F9FC", padding: `${SPACE.sectionY} 0` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}` }}>
        <div ref={headerRef as React.RefCallback<HTMLDivElement>} style={{ marginBottom: "clamp(2.5rem,5vh,4rem)" }}>
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: COLORS.primary, marginBottom: "0.5rem", opacity: headerVisible ? 1 : 0, transition: "opacity 0.6s ease" }}>Student Clubs</p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.4rem,2.5vw,2.8rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#0D0D0D", margin: 0, lineHeight: 1.1, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease" }}>
            14 Active Clubs
          </h2>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.04 }} style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(4, minmax(0, 1fr))", gap: "1.25rem" }}>
          {CLUBS.map((club, i) => <ClubCard key={club.id} club={club} index={i} />)}
        </motion.div>
      </div>
    </section>
  );
}

function ClubCard({ club, index }: { club: typeof CLUBS[number]; index: number }) {
  const Icon = club.icon;
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      style={{
        background: "#ffffff", borderRadius: 16,
        padding: "1.6rem 1.5rem 1.4rem",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        cursor: "default", minHeight: 210,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.1rem" }}>
        <div style={{ width: 52, height: 52, borderRadius: 13, background: "rgba(0,92,159,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={24} color={COLORS.primary} strokeWidth={1.7} />
        </div>
        <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "1.6rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none", color: "transparent", WebkitTextStroke: "1.5px rgba(0,92,159,0.12)" }}>
          {String(club.id).padStart(2, "0")}
        </span>
      </div>
      <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(0.9rem,1.1vw,1.02rem)", fontWeight: 700, color: "#0D0D0D", margin: "0 0 auto", letterSpacing: "0.01em", lineHeight: 1.25, paddingBottom: "1rem", flex: 1 }}>
        {club.name}
      </h3>
      <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(0,92,159,0.1)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(0,92,159,0.08)", border: "1px solid rgba(0,92,159,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <GraduationCap size={14} color={COLORS.primary} strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(0.66rem,0.7vw,0.72rem)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,92,159,0.45)", marginBottom: "3px" }}>
            Faculty In-Charge
          </div>
          <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.88rem,0.98vw,0.93rem)", fontWeight: 600, color: "#0D0D0D", lineHeight: 1.2 }}>
            {club.incharge}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── EXPORT ─── */
export default function LeadOperatingTeams() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <LotsSection />
      <ClubsDescSection />
      <ClubsSection />
    </>
  );
}