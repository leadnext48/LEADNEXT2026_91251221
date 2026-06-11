"use client";

/*
  Curio — Final Version
  ─────────────────────────────────────────────────────────────────
  Fonts:       Cinzel + Playfair Display (from @/app/fonts)
  Palette:     V1 blue design system (#005C9F / #1e3a8a / #F7F9FC)
  UI approach: V2 layout — full-bleed hero, masonry highlights,
               poster section, dark collaboration band, warm close.
*/

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Coffee, MessageCircle, Users, Lightbulb,
  Zap, Heart, Star, BookOpen,
  type LucideIcon,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";

/* ─── PALETTE — V1 blue system (OBT design tokens) ─── */
const C = {
  green:      "#005C9F",   /* primary blue  — replaces forest green  */
  greenDark:  "#1e3a8a",   /* dark blue     — replaces espresso-green */
  greenLight: "#2563eb",   /* mid blue      — replaces mid forest     */
  gold:       "#005C9F",   /* = primary     — replaces antique gold   */
  goldLight:  "#3b82f6",   /* light blue    — replaces bright gold    */
  cream:      "#F7F9FC",   /* cool off-white bg — replaces warm cream */
  sand:       "#EEF2F8",   /* light blue-grey — replaces warm sand    */
  parchment:  "#DBEAFE",   /* blue-tinted border — replaces parchment */
  text:       "#0D0D0D",   /* same near-black as OBT                  */
  muted:      "#555",      /* same muted as OBT                       */
  faint:      "#888",      /* same faint as OBT                       */
} as const;

const G = {
  green90:  "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
  greenD:   "linear-gradient(135deg,#005C9F 0%,#1e3a8a 100%)",
  goldH:    "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
} as const;

const TYPE = {
  eyebrow: {
    fontSize:      "clamp(.4rem,.58vw,.52rem)" as string,
    letterSpacing: ".28em",
    textTransform: "uppercase" as const,
    fontWeight:    600,
  },
} as const;

const SPACE = { sectionX: "clamp(1.5rem,6vw,8rem)" } as const;

/* ─── ANIMATIONS — identical preset names, same logic ─── */
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
interface HighlightCard { icon: LucideIcon; label: string; desc: string; size: "tall" | "wide" | "normal"; }

const HIGHLIGHTS: HighlightCard[] = [
  { icon: Coffee,        label: "Refreshments",     desc: "Snacks, beverages & quick bites at the ready throughout the day",            size: "tall"   },
  { icon: MessageCircle, label: "Conversations",     desc: "A lively space that sparks every kind of exchange",                          size: "normal" },
  { icon: Lightbulb,     label: "Ideas Hub",         desc: "Where startup sparks & project thoughts begin over a cup of tea",            size: "wide"   },
  { icon: Users,         label: "Networking",         desc: "Students across batches & programs meet and connect naturally here",         size: "normal" },
  { icon: BookOpen,      label: "Study Breaks",       desc: "A convenient pause point between classes that refreshes the mind",           size: "normal" },
  { icon: Heart,         label: "Community",          desc: "Friendships that span batches, programs and last beyond every semester",     size: "normal" },
];

const COLLAB_POINTS = [
  "Discuss academic assignments and group projects",
  "Exchange perspectives on classroom learning",
  "Plan campus activities and events",
  "Brainstorm entrepreneurial ideas and initiatives",
  "Interact informally with faculty members and mentors",
  "Build cross-batch and cross-program friendships",
];

/* ═══════════════════════════════════════════════════════════════
   §1  HERO — TP-style: white bg, stat strip, photo right
═══════════════════════════════════════════════════════════════ */
function HeroSection(): React.JSX.Element {
  const STRIP_ITEMS = [
    { icon: Coffee,  label: "All-Day Refreshments", sub: "Open from morning to night" },
    { icon: Users,   label: "All Batches Welcome",  sub: "Cross-program community"    },
    { icon: Heart,   label: "Community at Heart",   sub: "Where bonds are built"      },
  ];

  return (
    <>
      <style>{`
        .curio-hero {
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
        .curio-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,92,159,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,92,159,.04) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none; z-index: 0;
        }
        .curio-hero-bg-text {
          position: absolute; right: -0.04em; bottom: -0.12em;
          font-size: clamp(14rem,28vw,42rem);
          font-weight: 800; line-height: 1;
          letter-spacing: -0.06em;
          color: rgba(0,92,159,.03);
          pointer-events: none; user-select: none;
          z-index: 0; white-space: nowrap;
        }
        .curio-hero-inner {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1.3fr 0.85fr;
          gap: clamp(1.5rem,3vw,3rem);
          align-items: center;
          flex: 1; min-height: 0; width: 100%; min-width: 0;
        }
        .curio-hero-strip {
          padding: clamp(.8rem,1.6vh,1.3rem) 0;
          border-top: 1px solid rgba(0,92,159,.1);
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: .5rem;
          margin-top: clamp(1.2rem,2.5vh,2rem);
          width: 100%; min-width: 0;
        }
        .curio-strip-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0 .75rem;
          border-right: 1px solid rgba(0,92,159,.1);
          min-width: 0; overflow: hidden;
        }
        .curio-strip-item:first-child { padding-left: 0; }
        .curio-strip-item:last-child  { border-right: none; }
        .curio-strip-text { min-width: 0; overflow: hidden; }
        .curio-strip-label {
          display: block;
          font-size: clamp(.48rem,.6vw,.56rem);
          letter-spacing: .08em; text-transform: uppercase;
          color: #333; font-weight: 700;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .curio-strip-sub {
          display: block;
          font-size: clamp(.6rem,.75vw,.72rem);
          color: #777;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        @media(max-width:767px){
          .curio-hero { padding: 5rem 1.25rem 0; height: auto; min-height: 100svh; }
          .curio-hero-inner { grid-template-columns: 1fr; }
          .curio-hero-right, .curio-hero-bg-text { display: none; }
          .curio-hero-strip { grid-template-columns: repeat(3,1fr); gap: .25rem; }
          .curio-strip-item { padding: 0 .4rem; gap: 6px; flex-direction: column; align-items: flex-start; }
          .curio-strip-item:first-child { padding-left: 0; }
        }
        @media(min-width:768px) and (max-width:1100px){
          .curio-hero { padding-left: 3rem; padding-right: 3rem; }
        }
      `}</style>

      <section className="curio-hero">
        <div className="curio-hero-bg-text" aria-hidden="true">CURIO</div>

        <div className="curio-hero-inner">
          {/* LEFT */}
          <div style={{ minWidth:0 }}>
            {/* Eyebrow line */}
            <motion.div
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:.5, ease:"easeOut" }}
              style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"clamp(.6rem,1.3vh,1rem)", overflow:"hidden" }}>
              <span style={{ display:"inline-block", width:24, height:1.5, flexShrink:0, background:C.green }} />
              <span style={{
                fontFamily:    cinzel.style.fontFamily,
                fontSize:      "clamp(.5rem,.65vw,.58rem)",
                letterSpacing: "clamp(.08em,.2vw,.2em)",
                textTransform: "uppercase",
                color:         C.green,
                fontWeight:    600,
                whiteSpace:    "nowrap", overflow:"hidden", textOverflow:"ellipsis",
              }}>LEAD College — Campus Life</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:.65, delay:.1, ease:"easeOut" }}
              style={{
                fontFamily:    cinzel.style.fontFamily,
                fontSize:      "clamp(2.4rem,5.5vw,7rem)",
                fontWeight:    800, lineHeight:.92,
                letterSpacing: "-.03em",
                textTransform: "uppercase",
                margin:        "0 0 clamp(.9rem,1.8vh,1.6rem)",
              }}>
              <span style={{ display:"block", color:"#0D0D0D" }}>The</span>
              <span style={{ display:"block", background:G.green90, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", color:"transparent" }}>
                Curio Hub.
              </span>
            </motion.h1>

            {/* Rule */}
            <motion.div
              initial={{ scaleX:0 }} animate={{ scaleX:1 }}
              transition={{ duration:.45, delay:.25, ease:"easeOut" }}
              style={{ width:36, height:2, background:G.green90, marginBottom:"clamp(.9rem,1.8vh,1.4rem)", transformOrigin:"left" }} />

            {/* Descriptor */}
            <motion.p
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:.55, delay:.3, ease:"easeOut" }}
              style={{
                fontFamily: playfair.style.fontFamily,
                fontSize:   "clamp(.88rem,1.05vw,.98rem)",
                lineHeight: 1.8,
                color:      "#666",
                margin:     0,
              }}>
              The vibrant refreshment and social hub at the heart of LEAD campus — where students recharge, connect, and build ideas together over every cup of tea.
            </motion.p>

            {/* Stat strip */}
            <motion.div
              className="curio-hero-strip"
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:.55, delay:.42, ease:"easeOut" }}>
              {STRIP_ITEMS.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="curio-strip-item">
                    <div style={{
                      width:32, height:32, borderRadius:8,
                      background:"rgba(0,92,159,.06)",
                      border:"1px solid rgba(0,92,159,.12)",
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                    }}>
                      <Icon size={14} color={C.green} strokeWidth={1.6} />
                    </div>
                    <div className="curio-strip-text">
                      <strong className="curio-strip-label" style={{ fontFamily:cinzel.style.fontFamily }}>{s.label}</strong>
                      <span className="curio-strip-sub" style={{ fontFamily:playfair.style.fontFamily }}>{s.sub}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT — photo with left blue accent bar */}
          <div className="curio-hero-right">
            <motion.div
              initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:.7, delay:.2, ease:"easeOut" }}>
              <div style={{ position:"relative", height:340, overflow:"hidden", borderRadius:16, boxShadow:"0 20px 60px rgba(0,0,0,.12)" }}>
                <div style={{ position:"absolute", left:0, top:0, bottom:0, width:6, background:C.green, zIndex:2, borderRadius:"16px 0 0 16px" }} />
                <img
                  src="/convert/LEAD60.webp"
                  alt="Students at Curio"
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .6s ease" }}
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
   §2  HIGHLIGHTS — 100vh, infinite auto-scroll marquee banner
═══════════════════════════════════════════════════════════════ */
function HighlightsSection(): React.JSX.Element {
  const isMobile = useIsMobile();

  const cards = [
    { icon: Coffee,        label: "Refreshments",  desc: "Fresh beverages, snacks & quick bites available throughout the entire day for every student on campus",               dark: true  },
    { icon: MessageCircle, label: "Conversations", desc: "A lively, open space designed to spark meaningful exchanges — casual debates, life advice, and everything between",   dark: false },
    { icon: Lightbulb,     label: "Ideas Hub",     desc: "Startup concepts, course insights, and creative sparks — the best ideas at LEAD often begin here over a cup of tea", dark: false },
    { icon: Users,         label: "Networking",    desc: "Students from all batches and programs naturally converge at Curio, breaking barriers and forging new connections",    dark: true  },
    { icon: BookOpen,      label: "Study Breaks",  desc: "The ideal pause point between intense academic sessions — step away, breathe, reset, and return with fresh focus",    dark: false },
    { icon: Heart,         label: "Community",     desc: "Friendships that outlast every semester are born here — bonds that extend well beyond programs and batch years",      dark: false },
  ];

  return (
    <section style={{
      minHeight:     "100vh",
      background:    "#fff",
      display:       "flex",
      flexDirection: "column",
      justifyContent:"center",
      padding:       "clamp(3.5rem,7vh,6rem) 0",
      boxSizing:     "border-box",
    }}>
      <div style={{ maxWidth:1280, margin:"0 auto", width:"100%", padding:`0 ${SPACE.sectionX}`, boxSizing:"border-box" }}>

        {/* Eyebrow */}
        <motion.p
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}
          style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:C.green, marginBottom:".5rem" }}>
          Major Highlights
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.05}
          style={{
            fontFamily:    cinzel.style.fontFamily,
            fontSize:      "clamp(1.6rem,3.2vw,4rem)",
            fontWeight:    800, textTransform:"uppercase",
            letterSpacing: "-.03em", color:C.text,
            margin:        "0 0 clamp(1.2rem,2.5vh,2rem)", lineHeight:.92,
          }}>
          Six Reasons<br />To Visit Every Day.
        </motion.h2>

        {/* Body paragraph */}
        <motion.p
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.1}
          style={{
            fontFamily: playfair.style.fontFamily,
            fontSize:   "clamp(.86rem,1vw,.96rem)",
            lineHeight: 1.85, color:C.muted,
            maxWidth:   780, margin:"0 0 clamp(2.5rem,5vh,4rem)",
          }}>
          At LEAD, learning does not stop at the classroom door. Curio creates an environment
          where informal conversations become learning moments, where ideas formed over tea
          turn into projects, and where students from different batches and disciplines
          discover unexpected common ground. It is the one space on campus where every student
          — regardless of program or year — genuinely belongs.
        </motion.p>

        {/* 3 × 2 card grid */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
          style={{
            display:             "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)",
            gap:                 "1rem",
          }}>
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i} variants={STAGGER_ITEM}
                style={{
                  position:     "relative",
                  borderRadius: 18,
                  padding:      "1.6rem 1.5rem 1.5rem",
                  overflow:     "hidden",
                  background:   card.dark
                    ? "linear-gradient(135deg,#005C9F 0%,#1e3a8a 100%)"
                    : "#fff",
                  border: card.dark
                    ? "none"
                    : `1px solid rgba(0,92,159,.1)`,
                  boxShadow: card.dark
                    ? "0 8px 32px rgba(0,92,159,.18)"
                    : "0 2px 16px rgba(0,92,159,.05)",
                }}>
                {/* top accent bar for light cards */}
                {!card.dark && (
                  <div style={{
                    position:"absolute", top:0, left:0, right:0,
                    height:3, background:G.green90,
                    borderRadius:"18px 18px 0 0",
                  }} />
                )}

                {/* icon */}
                <div style={{
                  width:42, height:42, borderRadius:11,
                  background: card.dark ? "rgba(255,255,255,.12)" : "rgba(0,92,159,.07)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  marginBottom:"1rem",
                }}>
                  <Icon size={18} color={card.dark ? "#fff" : C.green} strokeWidth={1.6} />
                </div>

                <h3 style={{
                  fontFamily:    cinzel.style.fontFamily,
                  fontSize:      "clamp(.65rem,.78vw,.73rem)",
                  fontWeight:    700, textTransform:"uppercase", letterSpacing:".1em",
                  color:         card.dark ? "#fff" : C.text,
                  margin:        "0 0 .45rem",
                }}>{card.label}</h3>

                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize:   "clamp(.74rem,.82vw,.78rem)",
                  lineHeight: 1.72,
                  color:      card.dark ? "rgba(255,255,255,.62)" : C.muted,
                  margin:     0,
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
   §3  POSTER — full-bleed typographic editorial poster section
═══════════════════════════════════════════════════════════════ */
function PosterSection(): React.JSX.Element {
  const isMobile = useIsMobile();
  const tags = [
    "Business Ideas","Group Assignments","Cross-Batch Friendships",
    "Faculty Interaction","Open Dialogue","Creative Discussions",
  ];

  return (
    <section style={{
      background:   "#fff",
      padding:      "clamp(5rem,10vh,8rem) 0 clamp(3rem,6vh,5.5rem)",
      position:     "relative",
      overflow:     "hidden",
    }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 ${SPACE.sectionX}`, position:"relative", zIndex:2 }}>
        <div style={{
          display:             "grid",
          gridTemplateColumns: isMobile ? "1fr" : ".9fr 1.1fr",
          gap:                 "clamp(3rem,6vw,8rem)",
          alignItems:          "center",
        }}>

          {/* LEFT — Unsplash photo + tag cloud below */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}
            style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>

            {/* Photo block */}
            <div style={{
              position:     "relative",
              borderRadius: 20,
              overflow:     "hidden",
              aspectRatio:  "4/3",
              boxShadow:    "0 20px 60px rgba(0,92,159,.13)",
            }}>
              <img
                src="/convert/LEAD69.webp"
                alt="Students collaborating at Curio"
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
              />
              {/* subtle dark overlay for depth */}
              <div style={{
                position:"absolute", inset:0,
                background:"linear-gradient(180deg,transparent 40%,rgba(5,13,26,.45) 100%)",
              }} />
              {/* floating badge */}
              <div style={{
                position:      "absolute", bottom:18, left:18,
                background:    "rgba(5,13,26,.72)",
                backdropFilter:"blur(10px)",
                border:        "1px solid rgba(255,255,255,.1)",
                borderRadius:  10,
                padding:       ".5rem 1rem",
                display:       "flex", alignItems:"center", gap:".6rem",
              }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:C.green, flexShrink:0 }} />
                <span style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.42rem,.54vw,.5rem)", letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,.75)", fontWeight:600 }}>Campus Hangout Hub</span>
              </div>
            </div>

            {/* Tag cloud below photo */}
            <div style={{
              background:   "#fff",
              borderRadius: 14,
              padding:      "1.2rem 1.4rem",
              border:       `1px solid ${C.parchment}`,
            }}>
              <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:C.green, marginBottom:".75rem" }}>Curio Is Where…</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem" }}>
                {tags.map(t => (
                  <span key={t} style={{
                    fontFamily:   playfair.style.fontFamily,
                    fontSize:     "clamp(.72rem,.82vw,.78rem)",
                    background:   "#fff",
                    border:       `1px solid ${C.parchment}`,
                    borderRadius: 100, padding:".28rem .8rem",
                    color:        C.muted, lineHeight:1.4,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — poster-style text block */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.15}>
            <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:C.green, marginBottom:".6rem" }}>What Makes Curio Unique</p>
            <h2 style={{
              fontFamily:    cinzel.style.fontFamily,
              fontSize:      "clamp(1.3rem,2.3vw,2.8rem)",
              fontWeight:    800, textTransform:"uppercase",
              letterSpacing: "-.025em", color:C.text, margin:"0 0 .8rem", lineHeight:.95,
            }}>
              Relaxation.<br />Interaction.<br />Creativity.
            </h2>

            <motion.div
              initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={VP}
              transition={{ duration:.4, delay:.1, ease:"easeOut" }}
              style={{ width:36, height:2.5, background:G.goldH, marginBottom:"1.2rem", transformOrigin:"left" }} />

            <div style={{ borderLeft:`3px solid ${C.green}55`, paddingLeft:"1.2rem", marginBottom:"1.6rem" }}>
              <p style={{
                fontFamily: playfair.style.fontFamily,
                fontSize:   "clamp(.9rem,1.05vw,1.02rem)",
                fontWeight: 600, 
                lineHeight: 1.65, color:C.text, margin:"0 0 .4rem",
              }}>
                "Unlike typical campus cafeterias or kiosks, Curio is deeply integrated into the rhythm of student life at LEAD."
              </p>
              <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:".44rem", letterSpacing:".18em", textTransform:"uppercase", color:C.faint, margin:0, fontWeight:600 }}>
                — Curio, LEAD College
              </p>
            </div>

            <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.82rem,.92vw,.88rem)", lineHeight:1.82, color:C.muted, margin:"0 0 1.4rem" }}>
              The informal nature of Curio allows students to express themselves freely —
              making it a hub of conversation, creativity, and community bonding where
              friendships across batches and programs are naturally formed.
            </p>

            {/* 3 feature pills — vertical */}
            <div style={{ display:"flex", flexDirection:"column", gap:".7rem" }}>
              {[
                { t:"Spontaneous business idea discussions" },
                { t:"Group projects in a relaxed setting" },
                { t:"Ideas, opinions & perspectives flow freely" },
              ].map((p, i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:".85rem",
                  background:"#fff", borderRadius:12, padding:".7rem 1rem",
                  border:`1px solid ${C.parchment}`,
                }}>
                  <div style={{
                    width:22, height:22, borderRadius:6, flexShrink:0,
                    background:`rgba(0,92,159,.07)`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <Star size={10} color={C.gold} strokeWidth={1.8} fill={C.gold} />
                  </div>
                  <span style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.78rem,.88vw,.84rem)", color:C.muted, lineHeight:1.4 }}>{p.t}</span>
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
   §4  COLLABORATION — dark full-width with checklist + big number
═══════════════════════════════════════════════════════════════ */
function CollaborationSection(): React.JSX.Element {
  const isMobile = useIsMobile();

  return (
    <section style={{
      background:  "linear-gradient(160deg,#050d1a 0%,#0d2044 50%,#1e3a8a 100%)",
      minHeight:   "100vh",
      display:     "flex",
      alignItems:  "center",
      padding:     "clamp(3.5rem,7vh,6rem) 0",
      position:    "relative",
      overflow:    "hidden",
    }}>
      {/* dot grid */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`radial-gradient(rgba(255,255,255,.03) 1px,transparent 1px)`,
        backgroundSize:"32px 32px",
      }} />
      {/* ghost watermark */}
      <div style={{
        position:"absolute", right:"-0.04em", bottom:"-.15em",
        fontFamily:cinzel.style.fontFamily,
        fontSize:"clamp(10rem,22vw,28rem)",
        fontWeight:900, letterSpacing:"-.06em",
        color:"rgba(255,255,255,.025)",
        userSelect:"none", pointerEvents:"none", lineHeight:1,
      }} aria-hidden="true">IDEAS</div>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 ${SPACE.sectionX}`, position:"relative", zIndex:2 }}>
        <div style={{
          display:             "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap:                 "clamp(3rem,6vw,8rem)",
          alignItems:          "center",
        }}>

          {/* LEFT — heading */}
          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:`rgba(255,255,255,.3)`, marginBottom:".6rem" }}>Collaboration & Ideas</p>
            <h2 style={{
              fontFamily:    cinzel.style.fontFamily,
              fontSize:      "clamp(1.2rem,2.4vw,3rem)",
              fontWeight:    800, textTransform:"uppercase",
              letterSpacing: "-.03em", color:"#fff",
              margin:"0 0 .8rem", lineHeight:.95,
            }}>
              A Space<br />For Exchange and relationship.
            </h2>
            <div style={{ width:36, height:2.5, background:G.goldH, marginBottom:"1.2rem", borderRadius:2 }} />
            <p style={{
              fontFamily: playfair.style.fontFamily,
              fontSize:   "clamp(.82rem,.92vw,.88rem)",
              lineHeight: 1.82, color:"rgba(255,255,255,.5)",
              margin:"0 0 2rem",
            }}>
              Many important discussions that shape student learning begin in informal settings.
              Curio often becomes the place where students brainstorm solutions, discuss
              case studies, or refine project ideas.
            </p>

            {/* big decorative number */}
            <div style={{
              fontFamily:    cinzel.style.fontFamily,
              fontSize:      "clamp(5rem,10vw,12rem)",
              fontWeight:    900,
              lineHeight:    1,
              letterSpacing: "-.06em",
              color:         "rgba(255,255,255,.07)",
              userSelect:    "none",
            }} aria-hidden="true">06</div>
            <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.44rem,.56vw,.52rem)", letterSpacing:".2em", textTransform:"uppercase", color:`rgba(255,255,255,.22)`, marginTop:".3rem" }}>Ways students use Curio every day</p>
          </motion.div>

          {/* RIGHT — checklist */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}>
            {COLLAB_POINTS.map((pt, i) => (
              <motion.div key={i} variants={STAGGER_ITEM} style={{
                display:      "flex",
                alignItems:   "flex-start",
                gap:          "1rem",
                paddingBottom: i < COLLAB_POINTS.length - 1 ? "1rem" : 0,
                marginBottom: i < COLLAB_POINTS.length - 1 ? "1rem" : 0,
                borderBottom: i < COLLAB_POINTS.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
              }}>
                <div style={{
                  width:28, height:28, borderRadius:8, flexShrink:0,
                  background:`rgba(0,92,159,.1)`,
                  border:`1px solid rgba(0,92,159,.2)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  marginTop:2,
                }}>
                  <span style={{ fontFamily:cinzel.style.fontFamily, fontSize:".44rem", fontWeight:800, color:C.goldLight, letterSpacing:".1em" }}>0{i+1}</span>
                </div>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize:   "clamp(.82rem,.92vw,.88rem)",
                  lineHeight: 1.7,
                  color:      "rgba(255,255,255,.58)",
                  margin:     0,
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
   §5  COMMUNITY — warm cream closing with horizontal rule design
═══════════════════════════════════════════════════════════════ */
function CommunitySection(): React.JSX.Element {
  const isMobile = useIsMobile();
  const pillars = [
    { icon: Users,  title:"Cross-Batch Bonds",    desc:"Students from every program and batch naturally meet at Curio — forming friendships that outlast their time at LEAD." },
    { icon: Zap,    title:"Balance & Wellbeing",  desc:"Short breaks between sessions restore focus and energy, keeping students sharp through the demands of residential campus life." },
    { icon: Heart,  title:"Community Spirit",     desc:"Shared moments over tea and conversation become the foundation of the community every LEAD student carries forward." },
  ];

  return (
    <section style={{
      background:     "#fff",
      minHeight:      "100vh",
      display:        "flex",
      alignItems:     "center",
      boxSizing:      "border-box",
      padding:        "clamp(2.5rem,5vh,4rem) 0",
    }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 ${SPACE.sectionX}`, width:"100%" }}>

        {/* TOP rule + eyebrow */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}
          style={{ display:"flex", alignItems:"center", gap:"1.5rem", marginBottom:"clamp(1.8rem,3.5vh,2.8rem)" }}>
          <div style={{ flex:1, height:1, background:"rgba(0,92,159,.12)" }} />
          <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:C.green, margin:0, whiteSpace:"nowrap" }}>
            The LEAD Community Spirit
          </p>
          <div style={{ flex:1, height:1, background:"rgba(0,92,159,.12)" }} />
        </motion.div>

        {/* Big decorative quote mark + pull quote */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.05}
          style={{ textAlign:"center", marginBottom:"clamp(1.8rem,3.5vh,2.8rem)" }}>
          <div style={{
            fontFamily:   playfair.style.fontFamily,
            fontSize:     "clamp(3rem,6vw,7rem)",
            lineHeight:   0.72,
            color:        C.green,
            opacity:      0.1,
            userSelect:   "none",
            marginBottom: "-.3rem",
          }} aria-hidden="true">"</div>
          <h2 style={{
            fontFamily:  playfair.style.fontFamily,
            fontSize:    "clamp(.88rem,1.45vw,1.55rem)",
            fontWeight:  400,
            lineHeight:  1.5,
            color:       C.text,
            maxWidth:    680,
            margin:      "0 auto .75rem",
          }}>
            Curio represents the informal heart of the campus — a place where students
            recharge, connect, and continue their learning in a relaxed and friendly atmosphere.
          </h2>
          <p style={{
            fontFamily:    cinzel.style.fontFamily,
            fontSize:      ".44rem",
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color:         C.faint,
            fontWeight:    600,
          }}>— Curio, LEAD College</p>
        </motion.div>

        {/* Three pillar cards */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
          style={{
            display:             "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
            gap:                 "1rem",
          }}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} variants={STAGGER_ITEM} style={{
                background:   "#fff",
                borderRadius: 14,
                padding:      "1.4rem 1.5rem",
                border:       `1px solid ${C.parchment}`,
                boxShadow:    "0 2px 14px rgba(0,92,159,.05)",
                borderBottom: `3px solid ${C.green}`,
              }}>
                <div style={{
                  width:36, height:36, borderRadius:9,
                  background: "rgba(0,92,159,.07)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  marginBottom:".75rem",
                }}>
                  <Icon size={16} color={C.green} strokeWidth={1.7} />
                </div>
                <h3 style={{
                  fontFamily:    cinzel.style.fontFamily,
                  fontSize:      "clamp(.6rem,.75vw,.7rem)",
                  fontWeight:    700,
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  color:         C.text,
                  margin:        "0 0 .4rem",
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize:   "clamp(.76rem,.86vw,.82rem)",
                  lineHeight: 1.7,
                  color:      C.muted,
                  margin:     0,
                }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom closing line */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.2}
          style={{ marginTop:"clamp(1.8rem,3.5vh,2.8rem)", display:"flex", alignItems:"center", gap:"1.5rem" }}>
          <div style={{ flex:1, height:1, background:"rgba(0,92,159,.1)" }} />
          <p style={{
            fontFamily: playfair.style.fontFamily,
            fontSize:   "clamp(.78rem,.88vw,.84rem)",
            color:      C.faint,
            margin:     0,
            textAlign:  "center",
            maxWidth:   480,
          }}>
            Within the residential culture of LEAD, Curio plays a unique role in
            strengthening community life — one cup, one conversation at a time.
          </p>
          <div style={{ flex:1, height:1, background:"rgba(0,92,159,.1)" }} />
        </motion.div>

      </div>
    </section>
  );
}

/* ─── EXPORT ─── */
export default function Curio(): React.JSX.Element {
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