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
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ChevronRight } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { getEventBySlug, EVENTS } from "@/components/pages/LifeAtLead/Events/data";

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

/* ─── RELATED EVENTS ─── */
function RelatedEvents({ current }: { current: string }) {
  const related = EVENTS.filter(e => e.slug !== current).slice(0, 3);
  return (
    <div style={{ marginTop: "clamp(3rem,6vh,5rem)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.4rem", marginBottom: "clamp(1.4rem,3vh,2rem)" }}>
        <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.1)" }} />
        <span style={{
          fontFamily: cinzel.style.fontFamily,
          fontSize: "clamp(.4rem,.52vw,.48rem)",
          letterSpacing: ".26em", textTransform: "uppercase",
          color: C.blue, fontWeight: 700, whiteSpace: "nowrap",
        }}>More Events</span>
        <div style={{ flex: 1, height: 1, background: "rgba(0,92,159,.1)" }} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(clamp(200px,20vw,290px),1fr))",
        gap: "1.1rem",
      }}>
        {related.map(e => (
          <Link key={e.slug} href={`/life-at-lead/events/${e.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                borderRadius: 12, overflow: "hidden",
                border: `1px solid ${C.border}`,
                background: "#ffffff",
                boxShadow: "0 2px 10px rgba(0,92,159,.05)",
                transition: "transform .22s ease, box-shadow .22s ease",
              }}
              onMouseEnter={ev => {
                const el = ev.currentTarget as HTMLElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 8px 26px rgba(0,92,159,.1)";
              }}
              onMouseLeave={ev => {
                const el = ev.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 10px rgba(0,92,159,.05)";
              }}
            >
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <img src={e.image} alt={e.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: ".8rem 1rem .95rem", background: "#ffffff" }}>
                <p style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "clamp(.6rem,.72vw,.68rem)",
                  fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: ".05em", color: C.text,
                  margin: "0 0 .28rem", lineHeight: 1.32,
                }}>{e.title}</p>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "clamp(.64rem,.74vw,.7rem)",
                  color: C.faint, margin: 0,
                }}>{e.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function EventDetailPage() {
  const params = useParams();
  const slug   = typeof params?.slug === "string"
    ? params.slug
    : Array.isArray(params?.slug) ? params.slug[0] : "";

  const event = getEventBySlug(slug);

  /* ── Not found ── */
  if (!event) {
    return (
      <main style={{
        background: "#ffffff", minHeight: "60vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "1.2rem",
      }}>
        <p style={{
          fontFamily: cinzel.style.fontFamily,
          fontSize: "clamp(.68rem,.88vw,.82rem)",
          letterSpacing: ".2em", textTransform: "uppercase", color: C.faint,
        }}>Event not found</p>
        <Link href="/life-at-lead/events" style={{
          fontFamily: cinzel.style.fontFamily,
          fontSize: "clamp(.38rem,.5vw,.46rem)",
          letterSpacing: ".18em", textTransform: "uppercase",
          color: C.blue, fontWeight: 700, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: ".45rem",
        }}>
          <ArrowLeft size={12} strokeWidth={2} />
          Back to All Events
        </Link>
      </main>
    );
  }

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
                fontSize: "clamp(.38rem,.48vw,.44rem)",
                letterSpacing: ".16em", textTransform: "uppercase",
                color: C.blue, fontWeight: 700, textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: ".35rem",
                transition: "opacity .15s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = ".7"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <ArrowLeft size={11} strokeWidth={2.2} />
              All Events
            </Link>
            <ChevronRight size={10} color={C.faint} strokeWidth={1.8} />
            <span style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(.38rem,.48vw,.44rem)",
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
            <Calendar size={11} color={C.faint} strokeWidth={1.6} />
            <span style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(.38rem,.48vw,.44rem)",
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
                    fontSize: "clamp(.84rem,.98vw,.92rem)",
                    lineHeight: 1.88, color: C.muted,
                    margin: "0 0 1.4rem",
                  }}>{para}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══ RELATED EVENTS ══ */}
          <RelatedEvents current={event.slug} />

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
                fontSize: "clamp(.38rem,.5vw,.46rem)",
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