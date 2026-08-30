"use client";

/*
  Farm & Nature — LEAD College
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
  Sprout, Leaf, Sun, Recycle,
  Star, TreePine, Wind, Users,
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
  faint:      "#111",
} as const;

const G = {
  green90:  "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
  greenD:   "linear-gradient(135deg,#005C9F 0%,#1e3a8a 100%)",
  goldH:    "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
} as const;

const TYPE = {
  eyebrow: {
    fontSize:      "clamp(.66rem,.72vw,.74rem)" as string,
    letterSpacing: ".22em",
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
  "Study and live within 24 acres of lush, green natural landscape",
  "Benefit from vegetables and poultry grown on the campus farm",
  "Experience a calm, focused academic atmosphere shaped by nature",
  "Understand sustainability through daily campus living, not just theory",
  "Develop values of self-reliance and responsible resource management",
  "Carry forward LEAD's philosophy of holistic, nature-integrated education",
];

/* ═══════════════════════════════════════════════════════════════
   §1  HERO
═══════════════════════════════════════════════════════════════ */
function HeroSection(): React.JSX.Element {
  const STRIP_ITEMS = [
    { icon: TreePine, label: "24-Acre Green Campus",  sub: "Lush landscape all around" },
    { icon: Sprout,   label: "Working Farm",          sub: "Vegetables & poultry on site" },
    { icon: Recycle,  label: "Built for Sustainability", sub: "Self-reliant campus living" },
  ];

  return (
    <>
      <style>{`
        .farm-hero {
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
        .farm-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,92,159,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,92,159,.04) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none; z-index: 0;
        }
        .farm-hero-bg-text {
          position: absolute; right: -0.04em; bottom: -0.12em;
          font-size: clamp(10rem,20vw,32rem);
          font-weight: 800; line-height: 1;
          letter-spacing: -0.06em;
          color: rgba(0,92,159,.03);
          pointer-events: none; user-select: none;
          z-index: 0; white-space: nowrap;
        }
        .farm-hero-inner {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1.3fr 0.85fr;
          gap: clamp(1.5rem,3vw,3rem);
          align-items: center;
          flex: 1; min-height: 0; width: 100%; min-width: 0;
        }
        .farm-hero-strip {
          padding: clamp(.8rem,1.6vh,1.3rem) 0;
          border-top: 1px solid rgba(0,92,159,.1);
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: .5rem;
          margin-top: clamp(1.2rem,2.5vh,2rem);
          width: 100%; min-width: 0;
        }
        .farm-strip-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0 .75rem;
          border-right: 1px solid rgba(0,92,159,.1);
          min-width: 0; overflow: hidden;
        }
        .farm-strip-item:first-child { padding-left: 0; }
        .farm-strip-item:last-child  { border-right: none; }
        .farm-strip-text { min-width: 0; overflow: hidden; }
        .farm-strip-label {
          display: block;
          font-size: clamp(.7rem,.66vw,.74rem);
          letter-spacing: .08em; text-transform: uppercase;
          color: #333; font-weight: 700;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .farm-strip-sub {
          display: block;
          font-size: clamp(.6rem,.75vw,.72rem);
          color: #111;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        @media(max-width:767px){
          .farm-hero { padding: 5rem 1.25rem 0; height: auto; min-height: 100svh; }
          .farm-hero-inner { grid-template-columns: 1fr; }
          .farm-hero-right, .farm-hero-bg-text { display: none; }
          .farm-hero-strip { grid-template-columns: 1fr; gap: .6rem; }
          .farm-strip-item { padding: .55rem 0; gap: 10px; flex-direction: row; align-items: center; border-right: none; border-bottom: 1px solid rgba(0,92,159,.1); }
          .farm-strip-item:first-child { padding-left: 0; padding-top: 0; }
          .farm-strip-item:last-child { border-bottom: none; padding-bottom: 0; }
          .farm-strip-label, .farm-strip-sub { white-space: normal; overflow: visible; text-overflow: clip; }
        }
        @media(min-width:768px) and (max-width:1100px){
          .farm-hero { padding-left: 3rem; padding-right: 3rem; }
        }
      `}</style>

      <section className="farm-hero">
        <div className="farm-hero-bg-text" aria-hidden="true">FARM</div>

        <div className="farm-hero-inner">
          {/* LEFT */}
          <div style={{ minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(.6rem,1.3vh,1rem)", overflow: "hidden" }}>
              <span style={{ display: "inline-block", width: 24, height: 1.5, flexShrink: 0, background: C.green }} />
              <span style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(.7rem,.72vw,.74rem)",
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
              <span style={{ display: "block", color: "#0D0D0D" }}>Rooted in the</span>
              <span style={{ display: "block", background: G.green90, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
                Land We Learn On
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
                fontSize: "clamp(0.92rem,1.05vw,1rem)",
                lineHeight: 1.8,
                color: "#111",
                margin: 0,
              }}>
              Spread across 24 acres of lush green landscape, LEAD College integrates sustainability into the very fabric of daily campus life. The farm cultivates vegetables and poultry that supply the campus canteen — making self-reliance, environmental consciousness, and responsible living not just values taught, but values lived.
            </motion.p>

            <motion.div
              className="farm-hero-strip"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .42, ease: "easeOut" }}>
              {STRIP_ITEMS.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="farm-strip-item">
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: "rgba(0,92,159,.06)",
                      border: "1px solid rgba(0,92,159,.12)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon size={14} color={C.green} strokeWidth={1.6} />
                    </div>
                    <div className="farm-strip-text">
                      <strong className="farm-strip-label" style={{ fontFamily: cinzel.style.fontFamily }}>{s.label}</strong>
                      <span className="farm-strip-sub" style={{ fontFamily: playfair.style.fontFamily }}>{s.sub}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT — hero photo
              Using a well-known stable Unsplash photo ID of a lush green farm/field:
              photo-1500382017468-9049fed747ef by Ant Rozetsky — rolling green farmland */}
          <div className="farm-hero-right">
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .2, ease: "easeOut" }}>
              <div style={{ position: "relative", height: 340, overflow: "hidden", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,.12)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: C.green, zIndex: 2, borderRadius: "16px 0 0 16px" }} />
                <img
                  src="/convert/LEAD23.webp"
                  alt="LEAD College farm and green campus"
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
   §2  POSTER
═══════════════════════════════════════════════════════════════ */
function PosterSection(): React.JSX.Element {
  const isMobile = useIsMobile();
  const tags = [
    "24-Acre Campus", "Vegetable Cultivation", "Poultry",
    "Farm-to-Canteen", "Green Landscape", "Sustainable Living",
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

          {/* LEFT — overlapping image layout */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

            <div style={{ position: "relative", height: "clamp(320px,38vw,480px)" }}>
              <div style={{
                position: "absolute", top: 0, left: 0,
                width: "76%", height: "88%",
                borderRadius: 20, overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,92,159,.18)", zIndex: 1,
              }}>
                {/* photo-1416879595882-3373a0480b5b — vegetable garden rows, by Markus Spiske */}
                <img
                  src="/convert/LEAD24x.webp"
                  alt="Farm cultivation at LEAD"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 50%,rgba(5,13,26,.55) 100%)" }} />
                <div style={{
                  position: "absolute", bottom: 16, left: 16,
                  background: "rgba(5,13,26,.72)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,.1)", borderRadius: 10,
                  padding: ".45rem .9rem", display: "flex", alignItems: "center", gap: ".55rem",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, flexShrink: 0 }} />
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.66rem,.7vw,.72rem)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", fontWeight: 600 }}>Grown on Campus, Served Daily</span>
                </div>
              </div>

              <div style={{
                position: "absolute", bottom: 0, right: 0,
                width: "48%", height: "58%",
                borderRadius: 16, overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0,0,0,.22)", zIndex: 2, border: "4px solid #fff",
              }}>
                {/* photo-1464226184884-fa280b87c399 — lush green rolling hills, by Ales Krivec */}
                <img
                  src="/convert/LEAD22.webp"
                  alt="Lush green campus at LEAD"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              <div style={{
                position: "absolute", bottom: 12, left: -10, zIndex: 0,
                width: 64, height: 64,
                backgroundImage: `radial-gradient(${C.green}33 1.5px, transparent 1.5px)`,
                backgroundSize: "10px 10px",
              }} />
              <div style={{
                position: "absolute", top: 20, left: -16, bottom: 40,
                width: 3, borderRadius: 2, background: G.green90, zIndex: 0,
              }} />
            </div>

            <div style={{ background: "#fff", borderRadius: 14, padding: "1.2rem 1.4rem", border: `1px solid ${C.parchment}` }}>
              <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: C.green, marginBottom: ".75rem" }}>What the Farm Provides…</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                {tags.map(t => (
                  <span key={t} style={{
                    fontFamily: playfair.style.fontFamily,
                    fontSize: "clamp(.72rem,.82vw,.78rem)",
                    background: "#fff", border: `1px solid ${C.parchment}`,
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
            <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: C.green, marginBottom: ".6rem" }}>What Makes Our Farm Unique</p>
            <h2 style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(1rem,1.6vw,2rem)",
              fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "-.025em", color: C.text, margin: "0 0 .8rem", lineHeight: 1.05,
            }}>
              Cultivate,<br />Sustain &<br />Flourish
            </h2>

            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VP}
              transition={{ duration: .4, delay: .1, ease: "easeOut" }}
              style={{ width: 36, height: 2.5, background: G.goldH, marginBottom: "1.2rem", transformOrigin: "left" }} />

            <div style={{ borderLeft: `3px solid ${C.green}55`, paddingLeft: "1.2rem", marginBottom: "1.6rem" }}>
              <p style={{
                fontFamily: playfair.style.fontFamily,
                fontSize: "clamp(.9rem,1.05vw,1.02rem)",
                fontWeight: 600, lineHeight: 1.65, color: C.text, margin: "0 0 .4rem",
              }}>
                "The farm is not a feature of the campus — it is the campus speaking its values aloud: that real education is grown, not just taught."
              </p>
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.faint, margin: 0, fontWeight: 600 }}>
                — Campus & Sustainability, LEAD College
              </p>
            </div>

            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,.95vw,1rem)", lineHeight: 1.82, color: C.muted, margin: "0 0 1.4rem" }}>
              Across 24 acres of greenery, the LEAD campus farm actively cultivates the
              vegetables and poultry that supply the campus canteen. This is not a
              symbolic gesture — it is a working, productive cycle of growth, harvest,
              and responsible consumption that students witness and benefit from every day.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}>
              {[
                { t: "24 acres of lush, carefully maintained green campus landscape" },
                { t: "On-campus cultivation of vegetables and poultry for the canteen" },
                { t: "A living model of sustainability, self-reliance, and environmental care" },
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
                  <span style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,.9vw,1rem)", color: C.muted, lineHeight: 1.4 }}>{p.t}</span>
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
    { icon: TreePine, label: "24-Acre Green Campus",      desc: "A sprawling, lush landscape that surrounds students with natural beauty — creating a calm and focused environment for academic life",                  dark: true  },
    { icon: Sprout,   label: "On-Campus Cultivation",     desc: "Vegetables and poultry grown right on campus supply the canteen, creating a direct, meaningful link between the land and the dining table",            dark: false },
    { icon: Recycle,  label: "Sustainability in Practice", desc: "Sustainability at LEAD is not a lecture topic — it is embedded into how the campus operates, resourced, and feeds itself every single day",            dark: false },
    { icon: Leaf,     label: "Environmental Consciousness", desc: "Students develop a natural awareness of environmental responsibility simply by living within a campus that models it at every level",                   dark: true  },
    { icon: Wind,     label: "Calm & Focused Atmosphere", desc: "The green surroundings create an atmosphere of quiet focus — a natural antidote to the intensity of academic study and a space for clear thinking",      dark: false },
    { icon: Sun,      label: "Holistic Development",      desc: "LEAD's integration of nature and education reflects its philosophy: that well-rounded individuals are shaped by both knowledge and their environment",    dark: false },
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
          Six Reasons<br />Nature Is Part of the Curriculum
        </motion.h2>

        <motion.p
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.1}
          style={{
            fontFamily: playfair.style.fontFamily,
            fontSize: "clamp(0.92rem,1vw,1rem)",
            lineHeight: 1.85, color: C.muted,
            maxWidth: 780, margin: "0 0 clamp(2.5rem,5vh,4rem)",
          }}>
          The LEAD campus farm is not an add-on — it is the institution's belief made
          visible. Across 24 acres, students witness food being grown, resources being managed,
          and sustainability being practised not as a module, but as a way of life. The land
          teaches what no lecture alone can.
        </motion.p>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "repeat(3,minmax(0,1fr))",
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
                  background: card.dark ? "linear-gradient(135deg,#005C9F 0%,#1e3a8a 100%)" : "#fff",
                  border: card.dark ? "none" : `1px solid rgba(0,92,159,.1)`,
                  boxShadow: card.dark ? "0 8px 32px rgba(0,92,159,.18)" : "0 2px 16px rgba(0,92,159,.05)",
                }}>
                {!card.dark && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: G.green90, borderRadius: "18px 18px 0 0" }} />
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
                  color: card.dark ? "#fff" : C.text, margin: "0 0 .45rem",
                }}>{card.label}</h3>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(0.92rem,.85vw,1rem)",
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
   §4  COLLABORATION
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
      }} aria-hidden="true">GREEN</div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SPACE.sectionX}`, position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "clamp(3rem,6vw,7rem)",
          alignItems: "start",
        }}>

          {/* LEFT */}
          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: C.green, marginBottom: ".6rem" }}>Farm Life & Sustainability</p>
            <h2 style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(1.2rem,2.4vw,3rem)",
              fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "-.03em", color: C.text,
              margin: "0 0 .8rem", lineHeight: .95,
            }}>
              Education<br />Grown from the Ground
            </h2>
            <div style={{ width: 36, height: 2.5, background: G.goldH, marginBottom: "1.2rem", borderRadius: 2 }} />

            <p style={{
              fontFamily: playfair.style.fontFamily,
              fontSize: "clamp(0.92rem,.95vw,1rem)",
              lineHeight: 1.82, color: C.muted,
              margin: "0 0 1.6rem",
            }}>
              The LEAD farm is a living extension of the institution's values. When students
              see vegetables harvested and poultry raised right here on campus — and then
              served in the canteen — sustainability stops being an abstract concept and
              becomes something they witness and participate in every day.
            </p>

            <div style={{
              borderRadius: 18, overflow: "hidden", aspectRatio: "4/3",
              boxShadow: "0 16px 48px rgba(0,92,159,.14)",
              border: `1px solid ${C.parchment}`, position: "relative",
            }}>
              {/* photo-1500382017468-9049fed747ef — rolling green farmland at golden hour */}
              <img
                src="/convert/LEAD25x.webp"
                alt="LEAD campus farm and green fields"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(0,92,159,.28) 100%)" }} />
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
              }} aria-hidden="true">24</div>
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.66rem,.7vw,.72rem)", letterSpacing: ".14em", textTransform: "uppercase", color: C.faint, margin: 0, lineHeight: 1.5 }}>
                Acres of green<br />campus landscape<br />at LEAD College
              </p>
            </div>
          </motion.div>

          {/* RIGHT — checklist */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
            style={{ paddingTop: isMobile ? 0 : "clamp(3.6rem,5.5vw,6.4rem)" }}>
            {COLLAB_POINTS.map((pt, i) => (
              <motion.div key={i} variants={STAGGER_ITEM} style={{
                display: "flex", alignItems: "flex-start", gap: "1rem",
                paddingBottom: i < COLLAB_POINTS.length - 1 ? "1rem" : 0,
                marginBottom: i < COLLAB_POINTS.length - 1 ? "1rem" : 0,
                borderBottom: i < COLLAB_POINTS.length - 1 ? `1px solid ${C.parchment}` : "none",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                  background: "rgba(0,92,159,.07)", border: `1px solid rgba(0,92,159,.15)`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1,
                }}>
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".72rem", fontWeight: 800, color: C.green, letterSpacing: ".1em" }}>0{i + 1}</span>
                </div>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,.95vw,1rem)", lineHeight: 1.7, color: C.muted, margin: 0 }}>{pt}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   §5  COMMUNITY
═══════════════════════════════════════════════════════════════ */
function CommunitySection(): React.JSX.Element {
  const isMobile = useIsMobile();
  const pillars = [
    { icon: Sprout,   title: "Farm to Table",           desc: "Vegetables and poultry cultivated on campus reach the canteen directly — a visible, functioning loop of growth, harvest, and nourishment that students are part of every day." },
    { icon: Leaf,     title: "Sustainability as a Value", desc: "At LEAD, environmental consciousness is not taught in isolation. It is woven into how the campus is run, resourced, and sustained — making it second nature to every student." },
    { icon: TreePine, title: "Nature as a Classroom",   desc: "Twenty-four acres of green landscape provide more than a beautiful setting. They create a calming, grounding environment that supports focus, well-being, and holistic growth." },
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
          <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: C.green, margin: 0, whiteSpace: "nowrap" }}>The LEAD Farm Spirit</p>
          <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.12)" }} />
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.05}
          style={{ textAlign: "center", marginBottom: "clamp(1.8rem,3.5vh,2.8rem)" }}>
          <div style={{
            fontFamily: playfair.style.fontFamily, fontSize: "clamp(3rem,6vw,7rem)",
            lineHeight: 0.72, color: C.green, opacity: 0.1, userSelect: "none", marginBottom: "-.3rem",
          }} aria-hidden="true">"</div>
          <h2 style={{
            fontFamily: playfair.style.fontFamily,
            fontSize: "clamp(.88rem,1.45vw,1.55rem)",
            fontWeight: 400, lineHeight: 1.5, color: C.text,
            maxWidth: 680, margin: "0 auto .75rem",
          }}>
            Walk across the LEAD campus and feel what it means to live sustainably —
            where the earth beneath your feet is tended with care, and every meal
            carries the story of where it began.
          </h2>
          <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: C.faint, fontWeight: 600 }}>— Campus & Sustainability, LEAD College</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.08}
          style={{ marginBottom: "clamp(1.8rem,3.5vh,2.8rem)" }}>
          <div style={{
            borderRadius: 20, overflow: "hidden",
            aspectRatio: isMobile ? "4/3" : "21/7",
            boxShadow: "0 12px 40px rgba(0,92,159,.1)", position: "relative",
          }}>
            {/* photo-1501004318641-b39e6451bec6 — peaceful green plant close-up, by Scott Webb */}
            <img
              src="/convert/LEAD21.webp"
              alt="LEAD campus green landscape and farm"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,92,159,.35) 0%,transparent 60%)" }} />
            <div style={{ position: "absolute", left: "clamp(1.5rem,4vw,4rem)", top: "50%", transform: "translateY(-50%)" }}>
              <p style={{ fontFamily: cinzel.style.fontFamily, ...TYPE.eyebrow, color: "rgba(255,255,255,.7)", margin: "0 0 .5rem" }}>LEAD College</p>
              <p style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(.9rem,1.8vw,2rem)",
                fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "-.02em", color: "#fff", margin: 0, lineHeight: 1.1,
              }}>Where the Land<br />Is Part of the Lesson</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,minmax(0,1fr))", gap: "1rem" }}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} variants={STAGGER_ITEM} style={{
                background: "#fff", borderRadius: 14, padding: "1.4rem 1.5rem",
                border: `1px solid ${C.parchment}`,
                boxShadow: "0 2px 14px rgba(0,92,159,.05)",
                borderBottom: `3px solid ${C.green}`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, background: "rgba(0,92,159,.07)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".75rem",
                }}>
                  <Icon size={16} color={C.green} strokeWidth={1.7} />
                </div>
                <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.75vw,.74rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: C.text, margin: "0 0 .4rem" }}>{p.title}</h3>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,.88vw,1rem)", lineHeight: 1.7, color: C.muted, margin: 0 }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.2}
          style={{ marginTop: "clamp(1.8rem,3.5vh,2.8rem)", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.1)" }} />
          <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(0.92rem,.9vw,1rem)", color: C.faint, margin: 0, textAlign: "center", maxWidth: 480 }}>
            At LEAD, sustainability is not a course — it is a campus.
            Twenty-four acres of living proof that education and the earth can grow together.
          </p>
          <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.1)" }} />
        </motion.div>

      </div>
    </section>
  );
}

export default function Farm(): React.JSX.Element {
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