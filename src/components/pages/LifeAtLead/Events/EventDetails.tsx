"use client";

/*
  Event Detail — LEAD College
  ─────────────────────────────────────────────────────────────────
  Changes:
    - Pure white (#ffffff) everywhere — no gray/tinted sections
    - No category badge above title
    - Breadcrumb → Date → Title layout (breadcrumb NOT sticky)
    - Route updated to /life-at-lead/events/[slug]
    - Reads slug via useParams()
*/

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";

export interface EventDetailData {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  gallery: string[];
  excerpt: string;
  body: string;
}

/* ─── PALETTE ─── */
const C = {
  blue:   "#005C9F",
  text:   "#0D0D0D",
  muted:  "#555",
  faint:  "#888",
  border: "#E8EEF4",
} as const;

const G = {
  blue: "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
} as const;

const SECTIONX = "clamp(1.5rem,6vw,8rem)";

/* ─── SPLIT BODY ───
   First 2 paragraphs → right column (beside image)
   Remaining           → full-width below
─────────────────────────────────────────────────── */
function splitBody(body: string): { first: string[]; rest: string[] } {
  const paras = body.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  return { first: paras.slice(0, 2), rest: paras.slice(2) };
}

/* ─── EVENT GALLERY — linear manual carousel + click-to-zoom lightbox ─── */
function EventGallery({ images, title }: { images: string[]; title: string }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);
  const [scrollable, setScrollable] = React.useState(false);
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  const updateEdges = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    setScrollable(el.scrollWidth > el.clientWidth + 1);
  }, []);

  React.useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  // Move exactly one image per click (not looped, not automatic).
  const step = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const amount = first ? first.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Lightbox: keyboard nav + Escape + lock background scroll.
  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") setLightbox((v) => (v === null ? v : Math.min(images.length - 1, v + 1)));
      else if (e.key === "ArrowLeft") setLightbox((v) => (v === null ? v : Math.max(0, v - 1)));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, images.length]);

  if (!images.length) return null;

  const ctrlBtn = (disabled: boolean): React.CSSProperties => ({
    width: 40, height: 40, borderRadius: "50%",
    border: `1px solid ${C.border}`, background: "#fff", color: C.blue,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.35 : 1,
    boxShadow: "0 2px 10px rgba(0,92,159,.06)",
    transition: "opacity .2s ease, background .2s ease",
  });
  const lbBtn: React.CSSProperties = {
    position: "absolute", width: 46, height: 46, borderRadius: "50%",
    border: "1px solid rgba(255,255,255,.3)", background: "rgba(255,255,255,.09)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2,
    backdropFilter: "blur(4px)",
  };

  return (
    <div style={{ marginTop: "clamp(3rem,6vh,5rem)" }}>
      <style>{`
        .eg-track { scrollbar-width: thin; scrollbar-color: rgba(0,92,159,.25) transparent; }
        .eg-track::-webkit-scrollbar { height: 6px; }
        .eg-track::-webkit-scrollbar-thumb { background: rgba(0,92,159,.22); border-radius: 100px; }
        .eg-track::-webkit-scrollbar-track { background: transparent; }
        .eg-item { flex: 0 0 calc((100% - 2rem) / 3); }
        @media (max-width: 900px){ .eg-item { flex-basis: calc((100% - 1rem) / 2); } }
        @media (max-width: 560px){ .eg-item { flex-basis: 100%; } }
      `}</style>

      {/* header: title (left) + carousel controls (right) */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "clamp(1.1rem,2.4vh,1.6rem)" }}>
        <div>
          <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.66rem,.8vw,.74rem)", letterSpacing: ".2em", textTransform: "uppercase", color: C.blue, fontWeight: 700, margin: "0 0 .35rem" }}>Gallery</p>
          <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1rem,1.9vw,2rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.02em", color: C.text, margin: 0, lineHeight: 1 }}>Event Photos</h2>
          <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.72rem,.85vw,.8rem)", color: C.faint, margin: ".55rem 0 0" }}>Click any photo to view it full size.</p>
        </div>
        {scrollable && (
          <div style={{ display: "flex", gap: ".55rem", flexShrink: 0 }}>
            <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous photos" style={ctrlBtn(atStart)}><ChevronLeft size={18} strokeWidth={2} /></button>
            <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next photos" style={ctrlBtn(atEnd)}><ChevronRight size={18} strokeWidth={2} /></button>
          </div>
        )}
      </div>

      {/* horizontal track — 3 / 2 / 1 medium images visible, snaps one at a time */}
      <div ref={trackRef} className="eg-track" style={{ display: "flex", gap: "1rem", overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: ".6rem", WebkitOverflowScrolling: "touch" }}>
        {images.map((src, t) => (
          <button
            key={t}
            type="button"
            className="eg-item"
            onClick={() => setLightbox(t)}
            aria-label={`View photo ${t + 1} full size`}
            style={{
              scrollSnapAlign: "start", padding: 0, border: `1px solid ${C.border}`, background: "#f0f4f8",
              borderRadius: 14, overflow: "hidden", cursor: "zoom-in",
              height: "clamp(190px, 24vw, 280px)", boxShadow: "0 6px 22px rgba(0,92,159,.07)",
              transition: "transform .25s ease, box-shadow .25s ease",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 12px 32px rgba(0,92,159,.13)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 6px 22px rgba(0,92,159,.07)"; }}
          >
            <img src={src} alt={`${title} — photo ${t + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </button>
        ))}
      </div>

      {/* lightbox — full image, no cropping */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(7,17,28,.9)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1rem,4vw,3rem)" }}
        >
          <button type="button" aria-label="Close" onClick={() => setLightbox(null)} style={{ ...lbBtn, top: 18, right: 18 }}>
            <X size={22} strokeWidth={2} />
          </button>
          {lightbox > 0 && (
            <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setLightbox((v) => (v === null ? v : Math.max(0, v - 1))); }} style={{ ...lbBtn, left: "clamp(.6rem,2vw,2rem)", top: "50%", transform: "translateY(-50%)" }}>
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
          )}
          {lightbox < images.length - 1 && (
            <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); setLightbox((v) => (v === null ? v : Math.min(images.length - 1, v + 1))); }} style={{ ...lbBtn, right: "clamp(.6rem,2vw,2rem)", top: "50%", transform: "translateY(-50%)" }}>
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          )}
          <img
            src={images[lightbox]}
            alt={`${title} — photo ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", borderRadius: 10, boxShadow: "0 20px 70px rgba(0,0,0,.5)" }}
          />
          <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", padding: "6px 14px", borderRadius: 100, background: "rgba(255,255,255,.1)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: cinzel.style.fontFamily, fontSize: ".74rem", letterSpacing: ".12em", fontWeight: 700 }}>
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function EventDetailPage({ event }: { event: EventDetailData; related?: EventDetailData[] }) {
  const { first, rest } = splitBody(event.body);

  return (
    <>
      <style>{`
        .ed-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem,5vw,5rem);
          align-items: start;
        }
        @media(max-width:767px){
          .ed-split { grid-template-columns: 1fr; }
        }
      `}</style>

      <main style={{ background: "#ffffff", minHeight: "100vh" }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: `clamp(5.5rem,10vh,8rem) ${SECTIONX} clamp(4rem,8vh,7rem)`,
        }}>

          {/* ══ 1. BREADCRUMB — inline, not sticky, top of content ══ */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .35 }}
            aria-label="breadcrumb"
            style={{
              display: "flex", alignItems: "center", gap: ".45rem",
              marginBottom: "clamp(1rem,2vh,1.5rem)",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/life-at-lead/events"
              style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(.74rem,1.5vw,.82rem)",
                letterSpacing: ".16em", textTransform: "uppercase",
                color: C.blue, fontWeight: 700, textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: ".35rem",
                transition: "opacity .15s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = ".7"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <ArrowLeft size={15} strokeWidth={2.2} />
              All Events
            </Link>
            <ChevronRight size={14} color={C.faint} strokeWidth={1.8} />
            <span style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(.74rem,1.5vw,.82rem)",
              letterSpacing: ".12em", textTransform: "uppercase",
              color: C.faint, fontWeight: 600,
              maxWidth: "55vw",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{event.title}</span>
          </motion.nav>

          {/* ══ 2. DATE ══ */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .38, delay: .08 }}
            style={{
              display: "flex", alignItems: "center", gap: ".42rem",
              marginBottom: "clamp(.65rem,1.2vh,.95rem)",
            }}
          >
            <Calendar size={15} color={C.faint} strokeWidth={1.6} />
            <span style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(.74rem,1.5vw,.82rem)",
              letterSpacing: ".16em", textTransform: "uppercase",
              color: C.faint, fontWeight: 600,
            }}>{event.date}</span>
          </motion.div>

          {/* ══ 3. TITLE ══ */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55, delay: .14 }}
            style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(1.2rem,2.8vw,3.6rem)",
              fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "-.028em", color: C.text,
              margin: "0 0 clamp(.7rem,1.4vh,1rem)",
              lineHeight: .95, maxWidth: 860,
            }}
          >{event.title}</motion.h1>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: .38, delay: .22 }}
            style={{
              width: 36, height: 2, background: G.blue,
              transformOrigin: "left",
              marginBottom: "clamp(1rem,2vh,1.4rem)",
            }}
          />

          {/* ══ EXCERPT ══ */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: .45, delay: .28 }}
            style={{
              fontFamily: playfair.style.fontFamily,
              fontSize: "clamp(.88rem,1.05vw,.98rem)",
              lineHeight: 1.75, color: C.muted,
              maxWidth: 720,
              margin: "0 0 clamp(2.5rem,5vh,4rem)",
            }}
          >{event.excerpt}</motion.p>

          {/* ══ SPLIT: IMAGE LEFT + FIRST 2 PARAS RIGHT ══ */}
          <motion.div
            className="ed-split"
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55, delay: .18 }}
          >
            {/* LEFT — image */}
            <div style={{
              borderRadius: 16, overflow: "hidden",
              boxShadow: "0 18px 55px rgba(0,92,159,.12)",
              border: `1px solid ${C.border}`,
              position: "relative",
            }}>
              <img
                src={event.image}
                alt={event.title}
                style={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(180deg,transparent 65%,rgba(0,92,159,.15) 100%)",
              }} />
            </div>

            {/* RIGHT — first 2 paragraphs */}
            <div style={{ paddingTop: ".2rem" }}>
              {first.map((para, i) => (
                <p key={i} style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(.86rem,1vw,.96rem)",
                  lineHeight: 1.86, color: C.muted,
                  margin: i < first.length - 1 ? "0 0 1.4rem" : 0,
                }}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* ══ REMAINING BODY — full width ══ */}
          {rest.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: .3 }}
              style={{ marginTop: "clamp(2rem,4vh,3rem)" }}
            >
              <div style={{
                height: 1,
                background: "linear-gradient(90deg,rgba(0,92,159,.15) 0%,transparent 100%)",
                marginBottom: "clamp(1.8rem,3.5vh,2.5rem)",
              }} />
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,480px),1fr))",
                gap: "0 clamp(2.5rem,5vw,5rem)",
              }}>
                {rest.map((para, i) => (
                  <p key={i} style={{
                    fontFamily: playfair.style.fontFamily,
                    fontSize: "clamp(.92rem,.98vw,1rem)",
                    lineHeight: 1.88, color: C.muted,
                    margin: "0 0 1.4rem",
                  }}>{para}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══ EVENT GALLERY ══ */}
          {event.gallery && event.gallery.length > 0 && (
            <EventGallery images={event.gallery} title={event.title} />
          )}

          {/* ══ BACK BUTTON ══ */}
          <div style={{
            marginTop: "clamp(2.5rem,5vh,4rem)",
            display: "flex", alignItems: "center", gap: "1.5rem",
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.08)" }} />
            <Link
              href="/life-at-lead/events"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".5rem",
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(.74rem,1.5vw,.82rem)",
                letterSpacing: ".18em", textTransform: "uppercase",
                color: C.blue, fontWeight: 700, textDecoration: "none",
                border: `1px solid rgba(0,92,159,.18)`,
                borderRadius: 8, padding: ".6rem 1.15rem",
                background: "#ffffff",
                transition: "background .2s ease, border-color .2s ease",
              }}
              onMouseEnter={ev => {
                const el = ev.currentTarget as HTMLElement;
                el.style.background = "rgba(0,92,159,.04)";
                el.style.borderColor = "rgba(0,92,159,.35)";
              }}
              onMouseLeave={ev => {
                const el = ev.currentTarget as HTMLElement;
                el.style.background = "#ffffff";
                el.style.borderColor = "rgba(0,92,159,.18)";
              }}
            >
              <ArrowLeft size={12} strokeWidth={2} />
              Back to All Events
            </Link>
            <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.08)" }} />
          </div>

        </div>
      </main>
    </>
  );
}