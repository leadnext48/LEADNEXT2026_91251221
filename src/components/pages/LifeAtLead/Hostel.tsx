"use client";

/*
  Hostel — LEAD College
  ─────────────────────────────────────────────────────────────────
  Unified template matching Curio's design system exactly:
  Fonts:    Cinzel + Playfair Display (from @/app/fonts)
  Palette:  V1 blue design system (#005C9F / #1e3a8a / #F7F9FC)
  Sections: Hero → Poster → Highlights → Collaboration → Community
*/

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Home, Shield, Users, UtensilsCrossed,
  Star, Gamepad2, Moon, Heart,
  type LucideIcon,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";

/* ─── PALETTE — V1 blue system ─── */
const C = {
  green:      "#005C9F",
  greenDark:  "#1e3a8a",
  greenLight: "#2563eb",
  gold:       "#005C9F",
  goldLight:  "#3b82f6",
  cream:      "#F7F9FC",
  sand:       "#EEF2F8",
  parchment:  "#DBEAFE",
  text:       "#0D0D0D",
  muted:      "#111",
  faint:      "#888",
} as const;

const G = {
  green90:  "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
  greenD:   "linear-gradient(135deg,#005C9F 0%,#1e3a8a 100%)",
  goldH:    "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
} as const;

const TYPE = {
  eyebrow: {
    fontSize:      "clamp(.68rem,.78vw,.74rem)" as string,
    letterSpacing: ".2em",
    textTransform: "uppercase" as const,
    fontWeight:    600,
  },
} as const;

const SPACE = { sectionX: "clamp(1.5rem,6vw,8rem)" } as const;

/* ─── ANIMATIONS ─── */
const FADE_UP: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};
const STAGGER_CONTAINER: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const STAGGER_ITEM: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const VP = { once: true, amount: 0.1 } as const;

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

/* ─── DATA ─── */
const COLLAB_POINTS = [
  "Live in well-furnished, secure accommodations designed for focus and rest",
  "Build lifelong friendships through shared spaces and community living",
  "Develop time management and personal responsibility in a structured environment",
  "Enjoy nutritious, balanced meals that fuel both mind and body",
  "Unwind with recreational spaces offering indoor games and leisure activities",
  "Experience an immersive, always-on learning culture beyond the classroom",
];

/* ═══════════════════════════════════════════════════════════════
   §1  HERO
═══════════════════════════════════════════════════════════════ */
function HeroSection(): React.JSX.Element {
  const STRIP_ITEMS = [
    { icon: Home,    label: "Fully Residential",   sub: "Structured campus living" },
    { icon: Shield,  label: "Safe & Secure",        sub: "Round-the-clock care" },
    { icon: Users,   label: "Community Bonds",      sub: "Peers, mentors & belonging" },
  ];

  return (
    <>
      <style>{`
        .hostel-hero {
          height: 100svh;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          padding: clamp(3rem,7vh,5rem) clamp(1.25rem,6vw,8rem) 0;
          width: 100%;
        }
        .hostel-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,92,159,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,92,159,.04) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none; z-index: 0;
        }
        .hostel-hero-bg-text {
          position: absolute; right: -0.04em; bottom: -0.12em;
          font-size: clamp(10rem,20vw,32rem);
          font-weight: 800; line-height: 1;
          letter-spacing: -0.06em;
          color: rgba(0,92,159,.03);
          pointer-events: none; user-select: none;
          z-index: 0; white-space: nowrap;
        }
        .hostel-hero-inner {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1.3fr 0.85fr;
          gap: clamp(1.5rem,3vw,3rem);
          align-items: center;
          flex: 1; min-height: 0; width: 100%; min-width: 0;
        }
        .hostel-hero-strip {
          padding: clamp(.8rem,1.6vh,1.3rem) 0;
          border-top: 1px solid rgba(0,92,159,.1);
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: .5rem;
          margin-top: clamp(1.2rem,2.5vh,2rem);
          width: 100%; min-width: 0;
        }
        .hostel-strip-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0 .75rem;
          border-right: 1px solid rgba(0,92,159,.1);
          min-width: 0; overflow: hidden;
        }
        .hostel-strip-item:first-child { padding-left: 0; }
        .hostel-strip-item:last-child  { border-right: none; }
        .hostel-strip-text { min-width: 0; overflow: hidden; }
        .hostel-strip-label {
          display: block;
          font-size: clamp(.68rem,.72vw,.74rem);
          letter-spacing: .08em; text-transform: uppercase;
          color: #333; font-weight: 700;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .hostel-strip-sub {
          display: block;
          font-size: clamp(.6rem,.75vw,.72rem);
          color: #111;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        @media(max-width:767px){
          .hostel-hero { padding: 5rem 1.25rem 0; height: auto; min-height: 100svh; }
          .hostel-hero-inner { grid-template-columns: 1fr; }
          .hostel-hero-right, .hostel-hero-bg-text { display: none; }
          .hostel-hero-strip { grid-template-columns: 1fr; gap: .85rem; }
          .hostel-strip-item { padding: 0; gap: 10px; flex-direction: row; align-items: center; border-right: none; overflow: visible; }
          .hostel-strip-item:first-child { padding-left: 0; }
          .hostel-strip-label, .hostel-strip-sub { white-space: normal; overflow: visible; text-overflow: clip; }
        }
        @media(min-width:768px) and (max-width:1100px){
          .hostel-hero { padding-left: 3rem; padding-right: 3rem; }
        }
      `}</style>

      <section className="hostel-hero">
        <div className="hostel-hero-bg-text" aria-hidden="true">HOSTEL</div>

        <div className="hostel-hero-inner">
          {/* LEFT */}
          <div style={{ minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(.6rem,1.3vh,1rem)", overflow: "hidden" }}>
              <span style={{ display: "inline-block", width: 24, height: 1.5, flexShrink: 0, background: C.green }} />
              <span style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(.68rem,.78vw,.74rem)",
                letterSpacing: "clamp(.08em,.2vw,.2em)",
                textTransform: "uppercase",
                color: C.green,
                fontWeight: 600,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>LEAD College — Life at LEAD</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .1, ease: "easeOut" }}
              style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(1.6rem,3.6vw,4.8rem)",
                fontWeight: 800, lineHeight: 1.0,
                letterSpacing: "-.03em",
                textTransform: "uppercase",
                margin: "0 0 clamp(.9rem,1.8vh,1.6rem)",
              }}>
              <span style={{ display: "block", color: "#0D0D0D" }}>A Place to Stay</span>
              <span style={{ display: "block", background: G.green90, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                A Space to Grow
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: .45, delay: .25, ease: "easeOut" }}
              style={{ width: 36, height: 2, background: G.green90, marginBottom: "clamp(.9rem,1.8vh,1.4rem)", transformOrigin: "left" }} />

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .3, ease: "easeOut" }}
              style={{
                fontFamily: playfair.style.fontFamily,
                fontSize: "clamp(.88rem,1.05vw,.98rem)",
                lineHeight: 1.8,
                color: "#111",
                margin: 0,
              }}>
              At LEAD College, residential life is more than a place to sleep — it is the foundation of an immersive learning experience. Our hostels are thoughtfully designed to offer comfort, safety, and community, nurturing the discipline and camaraderie that shape confident, well-rounded professionals.
            </motion.p>

            <motion.div
              className="hostel-hero-strip"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .42, ease: "easeOut" }}>
              {STRIP_ITEMS.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="hostel-strip-item">
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: "rgba(0,92,159,.06)",
                      border: "1px solid rgba(0,92,159,.12)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon size={14} color={C.green} strokeWidth={1.6} />
                    </div>
                    <div className="hostel-strip-text">
                      <strong className="hostel-strip-label" style={{ fontFamily: cinzel.style.fontFamily }}>{s.label}</strong>
                      <span className="hostel-strip-sub" style={{ fontFamily: playfair.style.fontFamily }}>{s.sub}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT — hero photo */}
          <div className="hostel-hero-right">
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .2, ease: "easeOut" }}>
              <div style={{ position: "relative", height: 340, overflow: "hidden", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,.12)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: C.green, zIndex: 2, borderRadius: "16px 0 0 16px" }} />
                <img
                  src="/convert/LEAD57.jpg"
                  alt="Hostel at LEAD College"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   §2  POSTER — two-column editorial with 2 images + tag cloud
═══════════════════════════════════════════════════════════════ */
function PosterSection(): React.JSX.Element {
  const isMobile = useIsMobile();
  const tags = [
    "Furnished Rooms", "24/7 Security", "Hostel Mess",
    "Recreational Spaces", "Peer Community", "Dedicated Hostel Staff",
  ];

  return (
    <section style={{
      background: "#fff",
      padding: "clamp(5rem,10vh,8rem) 0 clamp(3rem,6vh,5.5rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}`, position: "relative", zIndex: 2 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : ".9fr 1.1fr",
          gap: "clamp(3rem,6vw,8rem)",
          alignItems: "center",
        }}>

          {/* LEFT — overlapping square image layout */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

            <div style={{ position: "relative", height: "clamp(320px,38vw,480px)" }}>

              {/* BIG square */}
              <div style={{
                position: "absolute",
                top: 0, left: 0,
                width: "76%",
                height: "88%",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,92,159,.18)",
                zIndex: 1,
              }}>
                <img
                  src="/convert/LEAD64x.webp"
                  alt="Hostel room at LEAD"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg,transparent 50%,rgba(5,13,26,.55) 100%)",
                }} />
                <div style={{
                  position: "absolute", bottom: 16, left: 16,
                  background: "rgba(5,13,26,.72)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 10,
                  padding: ".45rem .9rem",
                  display: "flex", alignItems: "center", gap: ".55rem",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, flexShrink: 0 }} />
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.66rem,.7vw,.72rem)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", fontWeight: 600 }}>Comfortable Living Spaces</span>
                </div>
              </div>

              {/* MEDIUM square */}
              <div style={{
                position: "absolute",
                bottom: 0, right: 0,
                width: "48%",
                height: "58%",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0,0,0,.22)",
                zIndex: 2,
                border: "4px solid #fff",
              }}>
                <img
                  src="/convert/LEAD63.webp"
                  alt="Hostel community at LEAD"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Decorative dot cluster */}
              <div style={{
                position: "absolute", bottom: 12, left: -10, zIndex: 0,
                width: 64, height: 64,
                backgroundImage: `radial-gradient(${C.green}33 1.5px, transparent 1.5px)`,
                backgroundSize: "10px 10px",
              }} />

              {/* Thin vertical rule */}
              <div style={{
                position: "absolute", top: 20, left: -16, bottom: 40,
                width: 3, borderRadius: 2,
                background: G.green90,
                zIndex: 0,
              }} />
            </div>

            {/* Tag cloud */}
            <div style={{
              background: "#fff",
              borderRadius: 14,
              padding: "1.2rem 1.4rem",
              border: `1px solid ${C.parchment}`,
            }}>
              <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: C.green, marginBottom: ".75rem" }}>Life at the Hostel Includes…</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                {tags.map(t => (
                  <span key={t} style={{
                    fontFamily: playfair.style.fontFamily,
                    fontSize: "clamp(.72rem,.82vw,.78rem)",
                    background: "#fff",
                    border: `1px solid ${C.parchment}`,
                    borderRadius: 100, padding: ".28rem .8rem",
                    color: C.muted, lineHeight: 1.4,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — editorial text */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.15}>
            <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: C.green, marginBottom: ".6rem" }}>What Makes Our Hostels Unique</p>
            <h2 style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(1rem,1.6vw,2rem)",
              fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "-.025em", color: C.text, margin: "0 0 .8rem", lineHeight: .95,
            }}>
              Shelter,<br />Sustain &<br />Flourish
            </h2>

            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VP}
              transition={{ duration: .4, delay: .1, ease: "easeOut" }}
              style={{ width: 36, height: 2.5, background: G.goldH, marginBottom: "1.2rem", transformOrigin: "left" }} />

            <div style={{ borderLeft: `3px solid ${C.green}55`, paddingLeft: "1.2rem", marginBottom: "1.6rem" }}>
              <p style={{
                fontFamily: playfair.style.fontFamily,
                fontSize: "clamp(.9rem,1.05vw,1.02rem)",
                fontWeight: 600,
                lineHeight: 1.65, color: C.text, margin: "0 0 .4rem",
              }}>
                "Our hostels are more than accommodation — they are where futures are shaped, friendships forged, and character quietly built, one shared evening at a time."
              </p>
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".74rem", letterSpacing: ".14em", textTransform: "uppercase", color: C.faint, margin: 0, fontWeight: 600 }}>
                — Residential Life, LEAD College
              </p>
            </div>

            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.92rem,1vw,1rem)", lineHeight: 1.82, color: C.muted, margin: "0 0 1.4rem" }}>
              Living on campus at LEAD means stepping into a structured, purposeful
              environment that complements your academic journey. Every detail — from
              well-furnished rooms to a nurturing peer community — is designed to help
              you focus, grow, and thrive.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}>
              {[
                { t: "Comfortable, well-furnished rooms built for rest and focus" },
                { t: "Safe living environment with round-the-clock security measures" },
                { t: "Vibrant community that fosters collaboration and lifelong friendships" },
              ].map((p, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: ".85rem",
                  background: "#fff", borderRadius: 12, padding: ".7rem 1rem",
                  border: `1px solid ${C.parchment}`,
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: `rgba(0,92,159,.07)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Star size={10} color={C.gold} strokeWidth={1.8} fill={C.gold} />
                  </div>
                  <span style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.92rem,.95vw,1rem)", color: C.muted, lineHeight: 1.4 }}>{p.t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   §3  HIGHLIGHTS — 6-card grid
═══════════════════════════════════════════════════════════════ */
function HighlightsSection(): React.JSX.Element {
  const isMobile = useIsMobile();

  const cards = [
    { icon: Home,            label: "Comfortable Living",      desc: "Well-furnished rooms designed to offer a cozy, relaxing retreat after long days of classes, workshops, and campus activities",               dark: true  },
    { icon: Shield,          label: "Secure & Supported",      desc: "Round-the-clock security measures and dedicated hostel staff ensure every student feels safe and looked after at all times",                dark: false },
    { icon: Users,           label: "Community Living",        desc: "Shared spaces bring together students from diverse backgrounds, sparking conversations, collaborations, and friendships that endure",       dark: false },
    { icon: UtensilsCrossed, label: "Healthy Dining",          desc: "Our hostel mess serves nutritious, balanced meals tailored to varied dietary preferences — because good food is the fuel for great minds",  dark: true  },
    { icon: Gamepad2,        label: "Recreational Spaces",     desc: "Indoor games, outdoor leisure areas, and common rooms give students space to unwind, recharge, and return to studies with renewed energy",   dark: false },
    { icon: Moon,            label: "Structured Discipline",   desc: "A thoughtfully managed residential environment cultivates time management, personal responsibility, and the rhythms of professional life",   dark: false },
  ];

  return (
    <section style={{
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "clamp(3.5rem,7vh,6rem) 0",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: `0 ${SPACE.sectionX}`, boxSizing: "border-box" }}>

        <motion.p
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}
          style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: C.green, marginBottom: ".5rem" }}>
          Major Highlights
        </motion.p>

        <motion.h2
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.05}
          style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "clamp(1.6rem,3.2vw,4rem)",
            fontWeight: 800, textTransform: "uppercase",
            letterSpacing: "-.03em", color: C.text,
            margin: "0 0 clamp(1.2rem,2.5vh,2rem)", lineHeight: .92,
          }}>
          Six Reasons<br />Home Is Where LEAD Is.
        </motion.h2>

        <motion.p
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.1}
          style={{
            fontFamily: playfair.style.fontFamily,
            fontSize: "clamp(.86rem,1vw,.96rem)",
            lineHeight: 1.85, color: C.muted,
            maxWidth: 780, margin: "0 0 clamp(2.5rem,5vh,4rem)",
          }}>
          At LEAD, the learning environment does not end at the classroom door. Residential
          life is a carefully considered extension of the academic experience — a space where
          discipline deepens, character strengthens, and community takes root. Whether you are
          far from home for the first time or a seasoned boarder, our hostels are built to
          welcome you completely.
        </motion.p>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3,minmax(0,1fr))",
            gap: "1rem",
          }}>
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i} variants={STAGGER_ITEM}
                style={{
                  position: "relative",
                  borderRadius: 18,
                  padding: "1.6rem 1.5rem 1.5rem",
                  overflow: "hidden",
                  background: card.dark
                    ? "linear-gradient(135deg,#005C9F 0%,#1e3a8a 100%)"
                    : "#fff",
                  border: card.dark ? "none" : `1px solid rgba(0,92,159,.1)`,
                  boxShadow: card.dark
                    ? "0 8px 32px rgba(0,92,159,.18)"
                    : "0 2px 16px rgba(0,92,159,.05)",
                }}>
                {!card.dark && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: 3, background: G.green90,
                    borderRadius: "18px 18px 0 0",
                  }} />
                )}
                <div style={{
                  width: 42, height: 42, borderRadius: 11,
                  background: card.dark ? "rgba(255,255,255,.12)" : "rgba(0,92,159,.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1rem",
                }}>
                  <Icon size={18} color={card.dark ? "#fff" : C.green} strokeWidth={1.6} />
                </div>
                <h3 style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "clamp(.65rem,.78vw,.73rem)",
                  fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em",
                  color: card.dark ? "#fff" : C.text,
                  margin: "0 0 .45rem",
                }}>{card.label}</h3>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(.92rem,.9vw,1rem)",
                  lineHeight: 1.72,
                  color: card.dark ? "#fff" : C.muted,
                  margin: 0,
                }}>{card.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   §4  COLLABORATION — cream bg, image left, checklist right
═══════════════════════════════════════════════════════════════ */
function CollaborationSection(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <section style={{
      background: C.cream,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "clamp(3.5rem,7vh,6rem) 0",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          `linear-gradient(rgba(0,92,159,.035) 1px, transparent 1px),
           linear-gradient(90deg, rgba(0,92,159,.035) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }} />
      <div style={{
        position: "absolute", right: "-0.04em", bottom: "-.1em",
        fontFamily: cinzel.style.fontFamily,
        fontSize: "clamp(10rem,22vw,28rem)",
        fontWeight: 900, letterSpacing: "-.06em",
        color: "rgba(0,92,159,.04)",
        userSelect: "none", pointerEvents: "none", lineHeight: 1,
      }} aria-hidden="true">HOME</div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}`, position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "clamp(3rem,6vw,7rem)",
          alignItems: "start",
        }}>

          {/* LEFT */}
          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: C.green, marginBottom: ".6rem" }}>Residential Life & Growth</p>
            <h2 style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(1.2rem,2.4vw,3rem)",
              fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "-.03em", color: C.text,
              margin: "0 0 .8rem", lineHeight: .95,
            }}>
              A Hearth<br />For Leaders.
            </h2>
            <div style={{ width: 36, height: 2.5, background: G.goldH, marginBottom: "1.2rem", borderRadius: 2 }} />

            <p style={{
              fontFamily: playfair.style.fontFamily,
              fontSize: "clamp(.92rem,1vw,1rem)",
              lineHeight: 1.82, color: C.muted,
              margin: "0 0 1.6rem",
            }}>
              Many of the most meaningful conversations — and life-defining realisations —
              happen not in lecture halls, but in the quiet corridors and shared rooms of
              a hostel. LEAD builds leaders not just through curriculum, but through the
              lived experience of community, responsibility, and belonging.
            </p>

            {/* Image */}
            <div style={{
              borderRadius: 18,
              overflow: "hidden",
              aspectRatio: "4/3",
              boxShadow: "0 16px 48px rgba(0,92,159,.14)",
              border: `1px solid ${C.parchment}`,
              position: "relative",
            }}>
              <img
                src="/convert/LEAD71.webp"
                alt="Students living together at LEAD hostel"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg,transparent 55%,rgba(0,92,159,.28) 100%)",
              }} />
            </div>

            <div style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(2.5rem,5vw,5rem)",
                fontWeight: 900, lineHeight: 1,
                letterSpacing: "-.05em",
                background: G.green90,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                userSelect: "none",
              }} aria-hidden="true">06</div>
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.66rem,.7vw,.72rem)", letterSpacing: ".14em", textTransform: "uppercase", color: C.faint, margin: 0, lineHeight: 1.5 }}>
                Ways students<br />grow through<br />residential life
              </p>
            </div>
          </motion.div>

          {/* RIGHT — checklist */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
            style={{ paddingTop: isMobile ? 0 : "clamp(3.6rem,5.5vw,6.4rem)" }}>
            {COLLAB_POINTS.map((pt, i) => (
              <motion.div key={i} variants={STAGGER_ITEM} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                paddingBottom: i < COLLAB_POINTS.length - 1 ? "1rem" : 0,
                marginBottom: i < COLLAB_POINTS.length - 1 ? "1rem" : 0,
                borderBottom: i < COLLAB_POINTS.length - 1 ? `1px solid ${C.parchment}` : "none",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                  background: "rgba(0,92,159,.07)",
                  border: `1px solid rgba(0,92,159,.15)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: 1,
                }}>
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".72rem", fontWeight: 800, color: C.green, letterSpacing: ".1em" }}>0{i + 1}</span>
                </div>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(.92rem,1vw,1rem)",
                  lineHeight: 1.7,
                  color: C.muted,
                  margin: 0,
                }}>{pt}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   §5  COMMUNITY — warm closing with 3 pillars + fourth image
═══════════════════════════════════════════════════════════════ */
function CommunitySection(): React.JSX.Element {
  const isMobile = useIsMobile();
  const pillars = [
    { icon: Users,   title: "Peer Learning & Bonds",    desc: "Sharing space with driven, curious peers creates an organic culture of mutual learning — study groups form over dinners, and ideas take shape in common rooms." },
    { icon: Heart,   title: "Wellbeing & Balance",      desc: "Residential life at LEAD is designed to support mental and physical wellbeing — giving students the grounded stability they need to truly excel academically." },
    { icon: Shield,  title: "Discipline & Maturity",    desc: "Living independently in a structured environment builds the professional habits, interpersonal maturity, and self-reliance that define effective leaders." },
  ];

  return (
    <section style={{
      background: "#fff",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      padding: "clamp(2.5rem,5vh,4rem) 0",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}`, width: "100%" }}>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}
          style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "clamp(1.8rem,3.5vh,2.8rem)" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.12)" }} />
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: C.green, margin: 0, whiteSpace: "nowrap" }}>
            The LEAD Hostel Spirit
          </p>
          <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.12)" }} />
        </motion.div>

        {/* Pull quote */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.05}
          style={{ textAlign: "center", marginBottom: "clamp(1.8rem,3.5vh,2.8rem)" }}>
          <div style={{
            fontFamily: playfair.style.fontFamily,
            fontSize: "clamp(3rem,6vw,7rem)",
            lineHeight: 0.72,
            color: C.green,
            opacity: 0.1,
            userSelect: "none",
            marginBottom: "-.3rem",
          }} aria-hidden="true">"</div>
          <h2 style={{
            fontFamily: playfair.style.fontFamily,
            fontSize: "clamp(.88rem,1.45vw,1.55rem)",
            fontWeight: 400,
            lineHeight: 1.5,
            color: C.text,
            maxWidth: 680,
            margin: "0 auto .75rem",
          }}>
            Step through the hostel doors and into a community that sustains you —
            where every shared meal, every late-night conversation, and every quiet
            morning builds the leader you are becoming.
          </h2>
          <p style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: ".74rem",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: C.faint,
            fontWeight: 600,
          }}>— Residential Life, LEAD College</p>
        </motion.div>

        {/* Fourth image — full-width panoramic */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.08}
          style={{ marginBottom: "clamp(1.8rem,3.5vh,2.8rem)" }}>
          <div style={{
            borderRadius: 20,
            overflow: "hidden",
            aspectRatio: isMobile ? "4/3" : "21/7",
            boxShadow: "0 12px 40px rgba(0,92,159,.1)",
            position: "relative",
          }}>
            <img
              src="/convert/photo_8_2025-05-07_12-00-48.jpeg"
              alt="LEAD hostel community living"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg,rgba(0,92,159,.35) 0%,transparent 60%)",
            }} />
            <div style={{ position: "absolute", left: "clamp(1.5rem,4vw,4rem)", top: "50%", transform: "translateY(-50%)" }}>
              <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: "rgba(255,255,255,.7)", margin: "0 0 .5rem" }}>LEAD College</p>
              <p style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(.9rem,1.8vw,2rem)",
                fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "-.02em",
                color: "#fff", margin: 0, lineHeight: 1.1,
              }}>Your Home<br />Away From Home</p>
            </div>
          </div>
        </motion.div>

        {/* Three pillar cards */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3,minmax(0,1fr))",
            gap: "1rem",
          }}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} variants={STAGGER_ITEM} style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.4rem 1.5rem",
                border: `1px solid ${C.parchment}`,
                boxShadow: "0 2px 14px rgba(0,92,159,.05)",
                borderBottom: `3px solid ${C.green}`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: "rgba(0,92,159,.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: ".75rem",
                }}>
                  <Icon size={16} color={C.green} strokeWidth={1.7} />
                </div>
                <h3 style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "clamp(.68rem,.76vw,.74rem)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  color: C.text,
                  margin: "0 0 .4rem",
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(.92rem,.9vw,1rem)",
                  lineHeight: 1.7,
                  color: C.muted,
                  margin: 0,
                }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom closing line */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.2}
          style={{ marginTop: "clamp(1.8rem,3.5vh,2.8rem)", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.1)" }} />
          <p style={{
            fontFamily: playfair.style.fontFamily,
            fontSize: "clamp(.92rem,.95vw,1rem)",
            color: "#111",
            margin: 0,
            textAlign: "center",
            maxWidth: 480,
          }}>
            Welcome home to LEAD College — where every corridor holds a story,
            every room a friendship, and every morning a new beginning.
          </p>
          <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.1)" }} />
        </motion.div>

      </div>
    </section>
  );
}

/* ─── EXPORT ─── */
export default function Hostel(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <PosterSection />
      <HighlightsSection />
      <CollaborationSection />
      <CommunitySection />
    </>
  );
}