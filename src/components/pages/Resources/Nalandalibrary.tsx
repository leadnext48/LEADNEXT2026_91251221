"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Lottie from "lottie-react";
import {
  BookOpen, Search, Users, Database,
  ExternalLink, ChevronRight,
  Globe, FileText, Monitor, BookMarked,
  GraduationCap, Layers, Lock, Wifi,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── PALETTE ─── */
const C = {
  blue:   "#005C9F",
  text:   "#0D0D0D",
  muted:  "#555",
  faint:  "#888",
  border: "#E8EEF4",
} as const;
const G = { blue: "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)" } as const;

const TITLE_GRAD: React.CSSProperties = {
  background: "linear-gradient(90deg, #000000 0%, #1e3a8a 60%, #1e3a8a 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "inline",
};

const SECTIONX = "clamp(1.5rem,6vw,8rem)";
const MAX_W    = 1280;
const VP       = { once: true, amount: 0.08 };

/* ─── STANDARD SIZES ─── */
const SZ = {
  eyebrow:   "clamp(.52rem,.68vw,.62rem)",
  heading:   "clamp(1.6rem,3vw,3.8rem)",
  heroH1:    "clamp(2rem,3.8vw,5rem)",
  heroSub:   "clamp(1rem,1.8vw,2.4rem)",   // tagline — roughly 48% of heroH1
  body:      "clamp(.9rem,1.05vw,1.02rem)",
  bodySmall: "clamp(.85rem,.98vw,.95rem)",
  cardTitle: "clamp(.72rem,.88vw,.84rem)",
  cardBody:  "clamp(.82rem,.96vw,.9rem)",
  label:     "clamp(.52rem,.62vw,.58rem)",
} as const;

const SECTION_PAD = "clamp(5rem,10vh,9rem)";

/* ─── ANIMATIONS — framer-motion kept for tab panel only ─── */
const TAB_PANEL: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: .38, ease: "easeOut" } },
};

/* ─── SHARED ATOMS ─── */
function Eyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(.7rem,1.4vh,1.1rem)" }}>
      <span style={{ display: "inline-block", width: 24, height: 1.5, background: C.blue, flexShrink: 0 }} />
      <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.eyebrow, letterSpacing: ".22em", textTransform: "uppercase", color: C.blue, fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
}

function SectionHeading({ top, bottom }: { top: string; bottom?: string }) {
  return (
    <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.heading, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.025em", lineHeight: .95, margin: 0 }}>
      <span style={{ display: "block" }}><span style={TITLE_GRAD}>{top}</span></span>
      {bottom && <span style={{ display: "block" }}><span style={TITLE_GRAD}>{bottom}</span></span>}
    </h2>
  );
}

function Divider() {
  return <div style={{ width: 36, height: 2, background: G.blue, margin: "clamp(1rem,2vh,1.6rem) 0 clamp(1.2rem,2.4vh,1.8rem)" }} />;
}

/* ─── INITIALS AVATAR FALLBACK ─── */
function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join("");

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg, #005C9F 0%, #1e3a8a 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: ".4rem",
    }}>
      <span style={{
        fontFamily: cinzel.style.fontFamily,
        fontSize: "clamp(2rem,5vw,3.5rem)",
        fontWeight: 800,
        color: "rgba(255,255,255,0.92)",
        letterSpacing: ".08em",
        lineHeight: 1,
      }}>
        {initials}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. HERO
═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const [animData, setAnimData] = useState<any>(null);

  useEffect(() => {
    fetch("/books.json")
      .then(r => r.json())
      .then(d => setAnimData(d))
      .catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        .lib-hero {
          width: 100%; height: 100vh; min-height: 600px;
          background: #ffffff; position: relative; overflow: hidden;
          padding: 0 ${SECTIONX}; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center;
        }
        .lib-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,.055) 1px, transparent 1px);
          background-size: 32px 32px; pointer-events: none;
        }
        .lib-hero-wm {
          position: absolute; right: -0.02em; bottom: -0.06em;
          font-size: clamp(5rem,14vw,20rem);
          font-family: var(--font-cinzel, serif);
          font-weight: 800; line-height: 1; letter-spacing: -0.06em;
          color: rgba(0,92,159,.028);
          pointer-events: none; user-select: none; white-space: nowrap;
        }
        .lib-hero-inner {
          position: relative; z-index: 2;
          max-width: ${MAX_W}px; margin: 0 auto; width: 100%;
          display: grid;
          grid-template-columns: 1.3fr 0.8fr;
          gap: clamp(2rem,4vw,5rem);
          align-items: center;
        }
        .lib-hero-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg,rgba(0,92,159,.15) 0%,transparent 100%);
        }
        .lib-stat-chip {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .55rem 1rem; border: 1px solid ${C.border};
          border-radius: 100px; background: #fff;
          font-family: var(--font-cinzel, serif);
          font-size: ${SZ.label}; letter-spacing: .14em;
          text-transform: uppercase; color: ${C.muted}; font-weight: 600;
        }
        .lib-opac-btn {
          display: inline-flex; align-items: center; gap: .55rem;
          padding: .9rem 1.8rem; background: ${G.blue};
          border-radius: 10px; text-decoration: none;
          font-family: var(--font-cinzel, serif);
          font-size: ${SZ.label}; letter-spacing: .18em;
          text-transform: uppercase; color: #fff; font-weight: 700;
          box-shadow: 0 6px 20px rgba(0,92,159,.25);
          transition: opacity .2s ease, transform .2s ease;
        }
        .lib-opac-btn:hover { opacity: .88; transform: translateY(-1px); }
        @media(max-width:767px){
          .lib-hero-inner { grid-template-columns: 1fr !important; }
          .lib-hero-right { display: none; }
        }
      `}</style>

      <section className="lib-hero">
        <div className="lib-hero-wm" aria-hidden="true">NALANDA</div>

        <div className="lib-hero-inner">
          {/* LEFT — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .45 }}>
              <Eyebrow label="LEAD College — Knowledge Centre" />
            </motion.div>

            {/*
              NALANDA — full hero size (heroH1)
              "The Library & Resource Centre" — tagline size (heroSub), lighter weight
            */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .08 }}
              style={{ margin: 0, lineHeight: 1 }}>

              {/* NALANDA — the name, big */}
              <span style={{
                display: "block",
                fontFamily: cinzel.style.fontFamily,
                fontSize: SZ.heroH1,
                fontWeight: 800,
                letterSpacing: "-.03em",
                textTransform: "uppercase",
                lineHeight: 1.0,
              }}>
                <span style={TITLE_GRAD}>NALANDA</span>
              </span>

              {/* Tagline — smaller, roman weight, not all-caps */}
              <span style={{
                display: "block",
                fontFamily: playfair.style.fontFamily,
                fontSize: SZ.heroSub,
                fontWeight: 500,
           
                letterSpacing: ".01em",
                lineHeight: 1.3,
                marginTop: "clamp(.3rem,.5vw,.6rem)",
                color: "#444",
              }}>
                The Library &amp; Resource Centre
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: .38, delay: .24 }}
              style={{ width: 36, height: 2, background: G.blue, margin: "clamp(1rem,2vh,1.6rem) 0 clamp(1.2rem,2.4vh,1.8rem)", transformOrigin: "left" }} />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: .3 }}
              style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.85, color: "#666", fontStyle: "italic", maxWidth: 520, margin: "0 0 clamp(2rem,4vh,3rem)" }}>
              Where Knowledge Knows No Bounds — a gateway to endless possibilities where curiosity meets discovery and minds are nurtured to think beyond limits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: .36 }}
              style={{ display: "flex", alignItems: "center", gap: "1.4rem", flexWrap: "wrap", marginBottom: "clamp(1.6rem,3vh,2.4rem)" }}>
              <div>
                <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.8rem,3.2vw,4rem)", fontWeight: 800, color: C.blue, lineHeight: 1 }}>10,000+</span>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.bodySmall, color: C.muted, margin: ".15rem 0 0" }}>Books &amp; Digital Resources</p>
              </div>
              <div style={{ width: 1, height: 48, background: C.border }} />
              <a href="https://leadcollege.embase.in/opac/#/" target="_blank" rel="noopener noreferrer" className="lib-opac-btn">
                <Search size={13} strokeWidth={2.2} />
                Search Library Catalog (OPAC)
                <ExternalLink size={11} strokeWidth={2.2} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .45, delay: .48 }}
              style={{ display: "flex", alignItems: "center", gap: ".75rem", flexWrap: "wrap" }}>
              {[
                { icon: BookOpen, label: "Physical Collection" },
                { icon: Database, label: "Digital Resources"  },
                { icon: Search,   label: "OPAC Search"        },
                { icon: Wifi,     label: "E-Resources"        },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="lib-stat-chip">
                  <Icon size={12} color={C.blue} strokeWidth={1.8} />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Lottie */}
          <motion.div
            className="lib-hero-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: .3 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {animData
              ? <Lottie animationData={animData} loop autoplay style={{ width: "clamp(260px,32vw,480px)", height: "auto" }} />
              : <div style={{ width: 340, height: 300, borderRadius: 16, background: "rgba(0,92,159,.04)" }} />
            }
          </motion.div>
        </div>
      </section>

      <div className="lib-hero-rule" />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. WELCOME + IMAGE
═══════════════════════════════════════════════════════════════ */
function WelcomeSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.set([".lib-welcome-text", ".lib-welcome-img"], {
      opacity: 0, willChange: "opacity, transform", force3D: true,
    });
    gsap.set(".lib-welcome-text", { x: -40 });
    gsap.set(".lib-welcome-img",  { x:  40 });

    ScrollTrigger.create({
      trigger: secRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(".lib-welcome-text", { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", force3D: true });
        gsap.to(".lib-welcome-img",  { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", force3D: true, delay: 0.1 });
      },
    });

    return () => {
      gsap.set([".lib-welcome-text", ".lib-welcome-img"], { willChange: "auto", clearProps: "willChange" });
    };
  }, []);

  return (
    <>
      <section ref={secRef} style={{ background: "#ffffff", minHeight: "100vh", padding: `clamp(5rem,10vh,9rem) 0`, boxSizing: "border-box", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${SECTIONX}`, width: "100%" }}>
          <div className="lib-welcome-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,7rem)", alignItems: "center" }}>

            {/* LEFT */}
            <div className="lib-welcome-text">
              <Eyebrow label="Welcome" />
              <SectionHeading top="Welcome to" bottom="Nalanda Library" />
              <Divider />
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.88, color: C.muted, margin: "0 0 1.3rem" }}>
                Welcome to the intellectual sanctuary of LEAD College — our Library and Resource Center. As the heart of academic exploration, this haven is more than just a repository of books; it's a gateway to endless possibilities, a space where curiosity meets discovery, and where minds are nurtured to think beyond limits.
              </p>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.bodySmall, lineHeight: 1.85, color: C.faint, margin: 0 }}>
                Our comprehensive collections span physical books, digital resources, e-journals, and research databases — curated to support every aspect of your academic journey at LEAD.
              </p>
              <div style={{ marginTop: "clamp(1.6rem,3vh,2.4rem)" }}>
                <a
                  href="https://leadcollege.embase.in/opac/#/"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", padding: ".9rem 1.8rem", background: G.blue, borderRadius: 10, fontFamily: cinzel.style.fontFamily, fontSize: SZ.label, letterSpacing: ".18em", textTransform: "uppercase", color: "#fff", fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 20px rgba(0,92,159,.25)", transition: "opacity .2s ease, transform .2s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = ".87"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}>
                  <Search size={13} strokeWidth={2.2} />
                  Search Library Catalog (OPAC)
                  <ExternalLink size={11} strokeWidth={2.2} />
                </a>
              </div>
            </div>

            {/* RIGHT — image */}
            <div className="lib-welcome-img" style={{ position: "relative" }}>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", boxShadow: "0 24px 64px rgba(0,92,159,.14)" }}>
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=80&auto=format&fit=crop"
                  alt="Library interior"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,18,51,.18) 0%, transparent 60%)" }} />
              </div>
              <div style={{ position: "absolute", bottom: "1.4rem", right: "1.4rem", background: "rgba(255,255,255,.95)", backdropFilter: "blur(8px)", borderRadius: 12, padding: ".75rem 1.1rem", boxShadow: "0 6px 24px rgba(0,0,0,.12)", zIndex: 3, display: "flex", alignItems: "center", gap: ".55rem" }}>
                <BookOpen size={16} color={C.blue} strokeWidth={1.8} />
                <div>
                  <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.cardTitle, fontWeight: 800, color: C.blue, margin: 0, letterSpacing: ".04em" }}>10,000+</p>
                  <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.label, color: C.faint, margin: 0 }}>Resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:767px){ .lib-welcome-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. OUR TEAM
═══════════════════════════════════════════════════════════════ */
const TEAM = [
  { name: "Dr. A K Pratheepa", role: "Librarian",        avatar: "/faculty/librarian.jpg" },
  { name: "Suraj S",           role: "Library Attender",  avatar: "/faculty/suraj.jpg"     },
];

/* Team member card with initials fallback */
function TeamCard({ member }: { member: typeof TEAM[number] }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className="lib-team-card-wrap lib-team-card"
      style={{
        width: 280, flexShrink: 0,
        border: `1px solid ${C.border}`, borderRadius: 18,
        background: "#fff", overflow: "hidden",
        boxShadow: "0 2px 14px rgba(0,92,159,.05)",
        transition: "box-shadow .3s ease, transform .3s ease, border-color .3s ease",
      }}>
      <div style={{ position: "relative", aspectRatio: "3/4", background: "#f0f4f8", overflow: "hidden" }}>
        {!imgFailed ? (
          <>
            <img
              src={member.avatar}
              alt={member.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
              onError={() => setImgFailed(true)}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(0,18,60,.45), transparent)" }} />
          </>
        ) : (
          <InitialsAvatar name={member.name} />
        )}
      </div>
      <div style={{ padding: "1.1rem 1.3rem 1.2rem", textAlign: "center" }}>
        <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.cardTitle, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.text, margin: "0 0 .25rem", lineHeight: 1.3 }}>{member.name}</p>
        <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.cardBody, color: C.blue, margin: 0, fontWeight: 600 }}>{member.role}</p>
      </div>
    </div>
  );
}

function TeamSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.set([".lib-team-hdr", ".lib-team-card-wrap"], {
      opacity: 0, willChange: "opacity, transform", force3D: true,
    });
    gsap.set(".lib-team-hdr",       { y: -20 });
    gsap.set(".lib-team-card-wrap", { y:  30 });

    ScrollTrigger.create({
      trigger: secRef.current,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(".lib-team-hdr",       { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", force3D: true });
        gsap.to(".lib-team-card-wrap", { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", force3D: true, delay: 0.15 });
      },
    });

    return () => {
      gsap.set([".lib-team-hdr", ".lib-team-card-wrap"], { willChange: "auto", clearProps: "willChange" });
    };
  }, []);

  return (
    <>
      <section ref={secRef} style={{ background: "#ffffff", padding: `${SECTION_PAD} 0`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${SECTIONX}` }}>

          <div className="lib-team-hdr" style={{ marginBottom: "clamp(2.5rem,5vh,4rem)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(.7rem,1.4vh,1.1rem)" }}>
              <span style={{ display: "inline-block", width: 24, height: 1.5, background: C.blue, flexShrink: 0 }} />
              <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.eyebrow, letterSpacing: ".22em", textTransform: "uppercase", color: C.blue, fontWeight: 600 }}>Our Team</span>
            </div>
            <SectionHeading top="Meet The Team" />
            <div style={{ width: 36, height: 2, background: G.blue, margin: "clamp(1rem,2vh,1.6rem) 0 clamp(1.2rem,2.4vh,1.8rem)" }} />
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.85, color: C.muted, maxWidth: 420, margin: 0 }}>
              Meet the dedicated professionals who make our library exceptional.
            </p>
          </div>

          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {TEAM.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .lib-team-card:hover {
          box-shadow: 0 10px 32px rgba(0,92,159,.12) !important;
          transform: translateY(-4px);
          border-color: rgba(0,92,159,.22) !important;
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. LIBRARY SERVICES
═══════════════════════════════════════════════════════════════ */
const INFO_SERVICES = [
  "Online Public Access Catalogue (OPAC)",
  "Online Resources Services (J-Gate and DELNET)",
  "Digital Room Facility",
  "News Clipping Service",
];
const RESEARCH_SERVICES = [
  "Reference / Referral Service",
  "Current Awareness Service (CAS)",
  "Selective Dissemination of Information (SDI)",
  "Query Based Service (QBS)",
  "Table of Contents Service (TOC)",
];
const LOAN_TABLE = [
  { category: "Faculty",  books: "200", journals: "05", cds: "05", duration: "180 Days" },
  { category: "Staff",    books: "03",  journals: "00", cds: "02", duration: "20 Days"  },
  { category: "Students", books: "05",  journals: "00", cds: "02", duration: "20 Days"  },
];

function ServiceBullet({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: ".65rem", padding: ".6rem 0", borderBottom: `1px solid ${C.border}` }}>
      <ChevronRight size={12} color={C.blue} strokeWidth={2.2} style={{ marginTop: 3, flexShrink: 0 }} />
      <span style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.cardBody, lineHeight: 1.6, color: C.muted }}>{label}</span>
    </div>
  );
}

function ServicesSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.set([".lib-svc-hdr", ".lib-svc-card", ".lib-circ-card"], {
      opacity: 0, willChange: "opacity, transform", force3D: true,
    });
    gsap.set(".lib-svc-hdr",   { y: -16 });
    gsap.set(".lib-svc-card",  { y:  40 });
    gsap.set(".lib-circ-card", { y:  40 });

    ScrollTrigger.create({
      trigger: secRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(".lib-svc-hdr",   { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", force3D: true });
        gsap.to(".lib-svc-card",  { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", force3D: true, delay: 0.1 });
        gsap.to(".lib-circ-card", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", force3D: true, delay: 0.3 });
      },
    });

    return () => {
      gsap.set([".lib-svc-hdr", ".lib-svc-card", ".lib-circ-card"], { willChange: "auto", clearProps: "willChange" });
    };
  }, []);

  return (
    <>
      <section ref={secRef} style={{ background: "#ffffff", padding: `${SECTION_PAD} 0`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${SECTIONX}` }}>

          <div className="lib-svc-hdr" style={{ marginBottom: "clamp(3rem,6vh,5rem)", maxWidth: 640 }}>
            <Eyebrow label="What We Offer" />
            <SectionHeading top="Library" bottom="Services" />
            <Divider />
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.85, color: C.muted, margin: 0 }}>
              Comprehensive services to support your academic and research needs — from discovery to delivery.
            </p>
          </div>

          <div className="lib-services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem", marginBottom: "1.4rem" }}>
            {[
              { icon: Monitor,    title: "Information Services", items: INFO_SERVICES },
              { icon: BookMarked, title: "Research Support",     items: RESEARCH_SERVICES },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="lib-svc-card"
                style={{ padding: "1.6rem 1.8rem", border: `1px solid ${C.border}`, borderRadius: 18, background: "#fff", boxShadow: "0 2px 14px rgba(0,92,159,.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginBottom: "1.2rem" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: "linear-gradient(135deg,rgba(0,92,159,.08),rgba(30,58,138,.08))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={C.blue} strokeWidth={1.8} />
                  </div>
                  <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.cardTitle, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.text, margin: 0 }}>{title}</h3>
                </div>
                {items.map(item => <ServiceBullet key={item} label={item} />)}
              </div>
            ))}
          </div>

          {/* Circulation Policy */}
          <div className="lib-circ-card"
            style={{ padding: "1.8rem 2rem", border: `1px solid ${C.border}`, borderRadius: 18, background: "#fff", boxShadow: "0 2px 14px rgba(0,92,159,.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginBottom: "1.2rem" }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: "linear-gradient(135deg,rgba(0,92,159,.08),rgba(30,58,138,.08))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileText size={18} color={C.blue} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.cardTitle, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.text, margin: 0 }}>Circulation Policy</h3>
            </div>
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.8, color: C.muted, margin: "0 0 .7rem" }}>
              Guidelines for borrowing and returning library materials. The LRC computerized library system with EMBASE Automation Software allows students, staff and faculty members to reserve and borrow learning resources.
            </p>
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.bodySmall, lineHeight: 1.78, color: C.faint, margin: "0 0 1.6rem" }}>
              Each member must present a valid staff/student card when borrowing or returning items. Books may be renewed in person — renewal is allowed twice. Books must be returned immediately if recalled by the Librarian.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: playfair.style.fontFamily }}>
                <thead>
                  <tr style={{ background: "linear-gradient(90deg,rgba(0,92,159,.07),rgba(30,58,138,.07))" }}>
                    {["Category", "Books", "Journals & Magazines", "CDs/DVDs", "Loan Duration"].map(h => (
                      <th key={h} style={{ padding: ".8rem 1rem", textAlign: "left", fontFamily: cinzel.style.fontFamily, fontSize: SZ.label, letterSpacing: ".1em", textTransform: "uppercase", color: C.blue, fontWeight: 700, whiteSpace: "nowrap", borderBottom: `2px solid rgba(0,92,159,.12)` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LOAN_TABLE.map((row, i) => (
                    <tr key={row.category} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "rgba(0,92,159,.015)" }}>
                      <td style={{ padding: ".75rem 1rem", fontFamily: cinzel.style.fontFamily, fontSize: SZ.label, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.text }}>{row.category}</td>
                      <td style={{ padding: ".75rem 1rem", fontSize: SZ.cardBody, color: C.muted }}>{row.books}</td>
                      <td style={{ padding: ".75rem 1rem", fontSize: SZ.cardBody, color: C.muted }}>{row.journals}</td>
                      <td style={{ padding: ".75rem 1rem", fontSize: SZ.cardBody, color: C.muted }}>{row.cds}</td>
                      <td style={{ padding: ".75rem 1rem", fontSize: SZ.cardBody, color: C.blue, fontWeight: 600 }}>{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:767px){ .lib-services-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. E-RESOURCES PORTAL — TABS
═══════════════════════════════════════════════════════════════ */
type ETab = "subscriptions" | "freebooks" | "digital" | "govt";

const E_TABS: { id: ETab; label: string; short: string; icon: React.ElementType }[] = [
  { id: "subscriptions", label: "Premium Subscriptions", short: "Subscriptions", icon: Lock          },
  { id: "freebooks",     label: "Free E-Books",          short: "Free E-Books",  icon: BookOpen       },
  { id: "digital",       label: "Digital Library",       short: "Digital",       icon: Database       },
  { id: "govt",          label: "Government Portals",    short: "Gov. Portals",  icon: GraduationCap  },
];

type ResourceItem = { name: string; url?: string; desc?: string };

const E_CONTENT: Record<ETab, { eyebrow: string; headline: string; sub: string; desc: string; items: ResourceItem[] }> = {
  subscriptions: {
    eyebrow: "Licensed Access", headline: "Premium", sub: "Subscriptions",
    desc: "Access industry-leading academic databases and business intelligence platforms, licensed exclusively for LEAD College students, faculty, and staff.",
    items: [
      { name: "SAGE Journals",              url: "https://journals.sagepub.com",                desc: "Peer-reviewed social science & humanities journals" },
      { name: "EBSCO",                      url: "https://www.ebsco.com",                       desc: "Full-text research databases across disciplines" },
      { name: "Drillbit",                   url: "https://drillbit.in",                         desc: "Plagiarism detection & academic integrity tool" },
      { name: "Business Standard",          url: "https://www.business-standard.com",           desc: "India's leading business newspaper — e-paper access" },
      { name: "IRINS",                      url: "https://irins.org",                           desc: "Indian Research Information Network System" },
      { name: "The Economic Times E-Paper", url: "https://epaper.economictimes.indiatimes.com", desc: "Daily financial & economic news" },
    ],
  },
  freebooks: {
    eyebrow: "Open Access", headline: "Discover Boundless", sub: "Wisdom",
    desc: "Explore thousands of free, legally available e-books across management, business, science, and more — accessible anytime, anywhere.",
    items: [
      { name: "Bookboon",  url: "https://bookboon.com",     desc: "Free textbooks & business e-books for students" },
      { name: "ManyBooks", url: "https://manybooks.net",    desc: "50,000+ free e-books in multiple formats" },
      { name: "PDF Drive",  url: "https://www.pdfdrive.com", desc: "World's largest PDF search engine" },
    ],
  },
  digital: {
    eyebrow: "Digital Collections", headline: "Discover Boundless", sub: "Wisdom",
    desc: "Access leading digital library services, open-access journals, and institutional repositories to support deep research and scholarship.",
    items: [
      { name: "DOAJ",            url: "https://doaj.org",             desc: "Directory of Open Access Journals" },
      { name: "Elsevier",        url: "https://www.elsevier.com",     desc: "Science, technology & health research" },
      { name: "Oxford Academic", url: "https://academic.oup.com",     desc: "Oxford University Press journals & books" },
      { name: "DELNET",          url: "https://delnet.in",            desc: "Developing Library Network — India" },
      { name: "e-Shodh Sindhu",  url: "https://ess.inflibnet.ac.in", desc: "INFLIBNET e-resources consortium for higher education" },
    ],
  },
  govt: {
    eyebrow: "Government Resources", headline: "Government", sub: "Educational Portals",
    desc: "Access official government-sponsored educational platforms offering free courses, resources, and national digital libraries.",
    items: [
      { name: "Swayam Prabha",            url: "https://swayamprabha.gov.in", desc: "32 DTH channels for higher quality education" },
      { name: "Education.gov.in",         url: "https://education.gov.in",    desc: "Ministry of Education — India" },
      { name: "Swayam",                   url: "https://swayam.gov.in",       desc: "Free online courses from India's best teachers" },
      { name: "INFLIBNET",                url: "https://inflibnet.ac.in",     desc: "Information & Library Network Centre, UGC" },
      { name: "Digital Library of India", url: "https://ndl.iitkgp.ac.in",   desc: "National Digital Library — 6.5M+ resources" },
    ],
  },
};

function EResourceCard({ item }: { item: ResourceItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.url ?? "#"}
      target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
        padding: "1.1rem 1.3rem",
        border: `1px solid ${hovered ? "rgba(0,92,159,.28)" : C.border}`,
        borderRadius: 14, background: "#fff",
        boxShadow: hovered ? "0 6px 22px rgba(0,92,159,.1)" : "0 2px 10px rgba(0,92,159,.04)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all .25s ease", textDecoration: "none",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: ".9rem" }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: hovered ? G.blue : "linear-gradient(135deg,rgba(0,92,159,.08),rgba(30,58,138,.08))", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .25s ease" }}>
          <Globe size={15} color={hovered ? "#fff" : C.blue} strokeWidth={1.8} style={{ transition: "color .25s ease" }} />
        </div>
        <div>
          <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.cardTitle, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.text, margin: 0, lineHeight: 1.3 }}>{item.name}</p>
          {item.desc && <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.cardBody, color: C.faint, margin: ".14rem 0 0", lineHeight: 1.5 }}>{item.desc}</p>}
        </div>
      </div>
      <ExternalLink size={13} color={hovered ? C.blue : C.faint} strokeWidth={1.8} style={{ flexShrink: 0, transition: "color .2s ease" }} />
    </a>
  );
}

function EResourcesSection() {
  const [activeTab, setActiveTab] = useState<ETab>("subscriptions");
  const secRef = useRef<HTMLElement>(null);
  const content = E_CONTENT[activeTab];

  useEffect(() => {
    gsap.set([".lib-eres-hdr"], { opacity: 0, y: -16, willChange: "opacity, transform", force3D: true });

    ScrollTrigger.create({
      trigger: secRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(".lib-eres-hdr", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", force3D: true });
      },
    });

    return () => {
      gsap.set(".lib-eres-hdr", { willChange: "auto", clearProps: "willChange" });
    };
  }, []);

  return (
    <>
      <section ref={secRef} style={{ background: "#ffffff", padding: `${SECTION_PAD} 0`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${SECTIONX}` }}>

          <div className="lib-eres-hdr" style={{ marginBottom: "clamp(3rem,6vh,5rem)", maxWidth: 680 }}>
            <Eyebrow label="Digital Resources" />
            <SectionHeading top="E-Resources" bottom="Portal" />
            <Divider />
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.85, color: C.muted, margin: 0 }}>
              Access our comprehensive digital resources and online platforms — curated for academic excellence at LEAD College.
            </p>
          </div>

          {/* Tab bar */}
          <div className="lib-tabbar" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.2rem", borderBottom: `1px solid ${C.border}`, paddingBottom: 0 }}>
            {E_TABS.map(tab => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: ".5rem",
                    padding: ".65rem 1.1rem",
                    border: "none",
                    borderBottom: active ? "2px solid #005C9F" : "2px solid transparent",
                    background: "none",
                    fontFamily: cinzel.style.fontFamily,
                    fontSize: SZ.label,
                    fontWeight: active ? 700 : 600,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: active ? C.blue : C.faint,
                    cursor: "pointer",
                    transition: "color .2s ease, border-color .2s ease",
                    marginBottom: "-1px",
                    whiteSpace: "nowrap",
                  }}>
                  <Icon size={13} strokeWidth={1.8} />
                  <span className="lib-tab-full">{tab.label}</span>
                  <span className="lib-tab-short">{tab.short}</span>
                </button>
              );
            })}
          </div>

          {/* Tab panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: .18 } }}
              variants={TAB_PANEL}>
              <div className="lib-panel-grid" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "clamp(2rem,4vw,4rem)", alignItems: "start" }}>
                <div>
                  <Eyebrow label={content.eyebrow} />
                  <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.1rem,2vw,2.6rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.025em", lineHeight: .95, margin: 0 }}>
                    <span style={{ display: "block" }}><span style={TITLE_GRAD}>{content.headline}</span></span>
                    <span style={{ display: "block" }}><span style={TITLE_GRAD}>{content.sub}</span></span>
                  </h3>
                  <Divider />
                  <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.bodySmall, lineHeight: 1.78, color: C.muted, margin: 0 }}>{content.desc}</p>
                  <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.label, letterSpacing: ".1em", textTransform: "uppercase", color: C.blue, fontWeight: 700, margin: "1.2rem 0 0" }}>
                    {content.items.length} Resource{content.items.length !== 1 ? "s" : ""} Available
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: ".95rem" }}>
                  {content.items.map(item => <EResourceCard key={item.name} item={item} />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      <style>{`
        .lib-tab-short { display: none; }
        @media(max-width:960px){ .lib-panel-grid { grid-template-columns: 1fr !important; } }
        @media(max-width:600px){
          .lib-tab-full { display: none; }
          .lib-tab-short { display: inline; }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE EXPORT
═══════════════════════════════════════════════════════════════ */
export default function NalandaLibraryPage() {
  return (
    <div style={{ background: "#ffffff" }}>
      <HeroSection />
      <WelcomeSection />
      <TeamSection />
      <ServicesSection />
      <EResourcesSection />
    </div>
  );
}