"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, Facebook, Youtube, ExternalLink } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";

const C = {
  blue:     "#005C9F",
  blueDark: "#1e3a8a",
  text:     "#0D0D0D",
  muted:    "#555",
  faint:    "#888",
  border:   "#E8EEF4",
} as const;

const G = {
  blue: "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
} as const;

const SECTIONX = "clamp(1.5rem,6vw,8rem)";
const PER_PAGE = 9;

type Platform = "instagram" | "facebook" | "youtube";

interface SocialCard {
  id: string;
  platform: Platform;
  title: string;
  description: string;
  handle: string;
  url: string;
  image: string | null;
  followers: string;
  cta: string;
}

const PLATFORM_META: Record<Platform, {
  label: string;
  color: string;
  gradient: string;
  Icon: React.FC<{ size?: number; strokeWidth?: number; color?: string }>;
}> = {
  instagram: {
    label: "Instagram",
    color: "#E1306C",
    gradient: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    Icon: Instagram,
  },
  facebook: {
    label: "Facebook",
    color: "#1877F2",
    gradient: "linear-gradient(135deg,#1877F2,#0a56c2)",
    Icon: Facebook,
  },
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    gradient: "linear-gradient(135deg,#FF0000,#cc0000)",
    Icon: Youtube,
  },
};

export interface SocialChannel {
  id: string;
  platform: Platform;
  title: string;
  description: string;
  handle: string;
  url: string;
  image: string | null;
  followers: string;
  cta: string;
}

const GRID_CONTAINER: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
};
const GRID_ITEM: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ─── HERO ─── */
function HeroSection() {
  return (
    <>
      <style>{`
        .social-hero {
          width: 100%;
          height: 100vh;
          min-height: 100vh;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          padding: 0 ${SECTIONX};
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .social-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .social-hero-watermark {
          position: absolute; right: -0.02em; bottom: -0.08em;
          font-size: clamp(5rem,13vw,18rem);
          font-weight: 800; line-height: 1;
          letter-spacing: -0.06em;
          color: rgba(0,92,159,.03);
          pointer-events: none; user-select: none;
          white-space: nowrap;
        }
        .social-hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          width: 100%;
        }
        .social-hero-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(0,92,159,.15) 0%, transparent 100%);
          margin: 0;
        }
      `}</style>

      <section className="social-hero">
        <div className="social-hero-watermark" aria-hidden="true">SOCIAL MEDIA</div>
        <div className="social-hero-inner">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(.7rem,1.4vh,1.1rem)" }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1.5, background: C.blue, flexShrink: 0 }} />
            <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.74rem)", letterSpacing: ".16em", textTransform: "uppercase", color: C.blue, fontWeight: 600 }}>
              Life at LEAD — Digital Presence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1.6rem,3.6vw,4.8rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-.03em", textTransform: "uppercase", margin: 0 }}
          >
            <span style={{ display: "block", color: C.text }}>Connect With</span>
            <span style={{ display: "block", background: G.blue, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
              LEAD Online
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.38, delay: 0.22 }}
            style={{ width: 36, height: 2, background: G.blue, margin: "clamp(.9rem,1.8vh,1.4rem) 0 clamp(1.2rem,2.4vh,1.8rem)", transformOrigin: "left" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            style={{ maxWidth: 780 }}
          >
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.86rem,1vw,.96rem)", lineHeight: 1.82, color: "#666", margin: "0 0 .9rem" }}>
              LEAD maintains an active social media presence to engage students, alumni, industry partners, and prospective applicants. Regular updates highlight achievements, events, academic initiatives, and campus life.
            </p>
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.92rem,.95vw,1rem)", lineHeight: 1.75, color: "#999", margin: "0 0 .9rem" }}>
              Digital engagement ensures transparency, connectivity, and extended community interaction beyond the physical campus.
            </p>
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.92rem,.95vw,1rem)", lineHeight: 1.75, color: "#999", margin: 0 }}>
              Life at LEAD continues both on campus and across digital platforms, building a strong and connected academic community.
            </p>
          </motion.div>

        </div>
      </section>
      <div className="social-hero-rule" />
    </>
  );
}

/* ─── SOCIAL CARD ─── */
function SocialCard({ card }: { card: SocialCard }) {
  const meta = PLATFORM_META[card.platform];
  const Icon = meta.Icon;

  const anchorStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform .5s ease",
  };

  return (
    <motion.div variants={GRID_ITEM} style={{ display: "flex", flexDirection: "column" }}>
      <a href={card.url} target="_blank" rel="noopener noreferrer" style={anchorStyle}>

        <div style={{ position: "relative", borderRadius: "12px 12px 0 0", overflow: "hidden", aspectRatio: "16/10", flexShrink: 0, background: "#f0f4f8" }}>
          {card.image ? (
            <img
              src={card.image}
              alt={card.title}
              style={imgStyle}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: meta.gradient }}>
              <Icon size={54} strokeWidth={1.4} color="rgba(255,255,255,0.92)" />
            </div>
          )}
          <div style={{ position: "absolute", top: 10, right: 10, background: meta.gradient, borderRadius: 8, padding: "5px 9px", display: "flex", alignItems: "center", gap: 5, boxShadow: "0 2px 8px rgba(0,0,0,.18)" }}>
            <Icon size={11} strokeWidth={2} color="#fff" />
            <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.64rem,.74vw,.7rem)", letterSpacing: ".14em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>
              {meta.label}
            </span>
          </div>
        </div>

        <div style={{ flex: 1, background: "#ffffff", border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "1rem 1.1rem 1.15rem", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0,92,159,.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".38rem", marginBottom: ".45rem" }}>
            <Icon size={10} color={meta.color} strokeWidth={1.8} />
            <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.62rem,.72vw,.7rem)", letterSpacing: ".14em", textTransform: "uppercase", color: C.faint, fontWeight: 600 }}>
              {card.handle}
            </span>
          </div>
          <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.66rem,.8vw,.76rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: C.text, margin: "0 0 .45rem", lineHeight: 1.35 }}>
            {card.title}
          </h3>
          <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.92rem,.85vw,1rem)", lineHeight: 1.65, color: C.faint, margin: "0 0 auto" }}>
            {card.description}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: ".85rem" }}>
            <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.6rem,.68vw,.68rem)", letterSpacing: ".1em", textTransform: "uppercase", color: C.faint, fontWeight: 600 }}>
              {card.followers}
            </span>
            <div
              style={{ display: "inline-flex", alignItems: "center", gap: ".38rem", fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.62rem,.7vw,.7rem)", letterSpacing: ".18em", textTransform: "uppercase", color: C.blue, fontWeight: 700, borderBottom: `1px solid rgba(0,92,159,.25)`, paddingBottom: "1px", transition: "gap .2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = ".6rem"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = ".38rem"; }}
            >
              Visit
              <ExternalLink size={9} strokeWidth={2.2} />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* ─── PAGINATION ─── */
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const Btn = ({ children, page, active = false, disabled = false }: { children: React.ReactNode; page: number | null; active?: boolean; disabled?: boolean }) => (
    <button
      onClick={() => { if (page !== null && !disabled) onChange(page); }}
      disabled={disabled}
      style={{ width: 32, height: 32, borderRadius: 8, border: active ? "none" : `1px solid ${C.border}`, background: active ? G.blue : "#ffffff", color: active ? "#fff" : disabled ? "#ccc" : C.muted, fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.72rem,.8vw,.8rem)", fontWeight: 700, letterSpacing: ".06em", cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .18s ease", boxShadow: active ? "0 4px 14px rgba(0,92,159,.2)" : "none", flexShrink: 0 }}
    >
      {children}
    </button>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".35rem", marginTop: "clamp(2.5rem,5vh,4rem)" }}>
      <Btn page={current - 1} disabled={current === 1}><ChevronLeft size={13} strokeWidth={2} /></Btn>
      {pages.map((p, i) =>
        p === "…"
          ? <span key={`el-${i}`} style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".8rem", color: C.faint, padding: "0 .18rem" }}>…</span>
          : <Btn key={p} page={p} active={p === current}>{p}</Btn>
      )}
      <Btn page={current + 1} disabled={current === total}><ChevronRight size={13} strokeWidth={2} /></Btn>
    </div>
  );
}

/* ─── GRID SECTION ─── */
function GridSection({ cards }: { cards: SocialCard[] }) {
  const [page, setPage] = useState(1);

  // Sentinel ref — scrolls to "All Channels / LEAD Digital Space", not page top
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(cards.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = cards.slice(start, start + PER_PAGE);

  const handlePageChange = (p: number) => {
    setPage(p);
    setTimeout(() => {
      scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  };

  return (
    <section style={{ background: "#ffffff", padding: "clamp(3rem,6vh,5rem) 0 clamp(4rem,8vh,7rem)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SECTIONX}` }}>

        {/* Zero-height scroll target — sits just above the "All Channels" header */}
        <div ref={scrollAnchorRef} style={{ scrollMarginTop: "80px" }} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45 }}
          style={{ marginBottom: "clamp(1.8rem,3.5vh,2.8rem)" }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: ".8rem" }}>
            <div>
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.74rem)", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, color: C.blue, margin: "0 0 .28rem" }}>
                All Channels
              </p>
              <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1rem,1.9vw,2.2rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.025em", color: C.text, margin: 0, lineHeight: 0.95 }}>
                LEAD Digital Space
              </h2>
            </div>
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.7rem,.8vw,.76rem)", color: C.faint, margin: 0, alignSelf: "flex-end" }}>
              Showing {start + 1}–{Math.min(start + PER_PAGE, cards.length)} of {cards.length} channels
            </p>
          </div>
          <div style={{ height: 1, background: "linear-gradient(90deg,rgba(0,92,159,.18) 0%,transparent 100%)", marginTop: "1.1rem" }} />
        </motion.div>

        <style>{`
          .sm-grid-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          @media (max-width: 900px){ .sm-grid-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
          @media (max-width: 600px){ .sm-grid-cards { grid-template-columns: 1fr; } }
        `}</style>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="sm-grid-cards"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            variants={GRID_CONTAINER}
            style={{ display: "grid", gap: "1.5rem" }}
          >
            {visible.map((card) => (
              <SocialCard key={card.id} card={card} />
            ))}
          </motion.div>
        </AnimatePresence>

        <Pagination current={page} total={totalPages} onChange={handlePageChange} />
      </div>
    </section>
  );
}

/* ─── PAGE EXPORT ─── */
export default function SocialMediaPage({ channels }: { channels: SocialChannel[] }) {
  return (
    <div style={{ background: "#ffffff", overflowX: "hidden" }}>
      <HeroSection />
      <GridSection cards={channels} />
    </div>
  );
}