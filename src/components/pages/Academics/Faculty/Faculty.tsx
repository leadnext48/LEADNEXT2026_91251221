// app/faculty/page.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { cinzel, playfair } from "@/app/fonts";
import Link from "next/link";
import Image from "next/image";
import { facultyData } from "./Facultydata";

const BLUE = "#005C9F";

const HERO_STATS = [
  { val: "40+", label: "Faculty Members" },
  { val: "2",   label: "Departments"     },
  { val: "NBA", label: "Accredited"      },
];

const DEPT_DESC: Record<string, string> = {
  MBA: "Master of Business Administration — seasoned practitioners, researchers, and mentors driving management excellence at LEAD College.",
  MCA: "Master of Computer Applications — technology-forward faculty pioneering innovation in computing, AI, and applied sciences.",
};

/** Strip titles and get initials for fallback avatar */
function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function FacultyPage() {
  const heroRef  = useRef<HTMLElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"MBA" | "MCA">("MBA");
  const [lottieData, setLottieData] = useState<any>(null);

  const departments = ["MBA", "MCA"] as const;
  const filtered = facultyData.filter((f) => f.department === activeTab);

  useEffect(() => {
    fetch("/teaching.json").then(r => r.json()).then(setLottieData).catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const gsapPkg       = await import("gsap");
      const gsap          = (gsapPkg as any).gsap || (gsapPkg as any).default || gsapPkg;
      const stPkg         = await import("gsap/ScrollTrigger").catch(() => import("gsap/dist/ScrollTrigger")) as any;
      const ScrollTrigger = stPkg.default || stPkg.ScrollTrigger || stPkg;
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(".fac-hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(".fac-hero-title",   { autoAlpha: 1, y: 0, duration: 1.0, ease: "power3.out" }, "-=0.35")
        .to(".fac-hero-sub",     { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.45")
        .to(".fac-hero-stats .fac-stat", { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3")
        .to(".fac-hero-marquee-wrap", { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "-=0.2");

      if (gridRef.current) {
        gsap.set(".fac-section-hdr", { autoAlpha: 0, y: -12 });
        gsap.to(".fac-section-hdr", {
          autoAlpha: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
        });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Animate cards on tab change
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const gsapPkg = await import("gsap");
      const gsap    = (gsapPkg as any).gsap || (gsapPkg as any).default || gsapPkg;
      if (cancelled) return;
      gsap.fromTo(".faculty-card",
        { autoAlpha: 0, y: 24, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04, ease: "power3.out" },
      );
    })();
    return () => { cancelled = true; };
  }, [activeTab]);

  return (
    <div className="fac-root">

      {/* ═══ HERO ════════════════════════════════════════════ */}
      <section ref={heroRef} className="fac-hero">
        <div className="fac-hero-wm" aria-hidden="true" style={{ fontFamily: cinzel.style.fontFamily }}>FAC</div>
        <div className="fac-hero-inner">
          <div className="fac-hero-text">
            <div className="fac-hero-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
              <span className="fac-eyebrow-dash" />
              LEAD College — Academic Excellence
            </div>
            <h1 className="fac-hero-title" style={{ fontFamily: cinzel.style.fontFamily }}>
              <span style={{ display: "block", color: "#0D0D0D" }}>Our</span>
              <span style={{
                display: "block",
                background: `linear-gradient(90deg, #0d0d0d 0%, ${BLUE} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent",
              }}>Faculty.</span>
            </h1>
            <div className="fac-hero-sub">
              <div className="fac-hero-rule" />
              <p style={{ fontFamily: playfair.style.fontFamily }}>
                Scholars, practitioners, and mentors — the people who shape
                every learner at LEAD College, Palakkad.
              </p>
            </div>
            <div className="fac-hero-stats">
              {HERO_STATS.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="fac-stat-div" />}
                  <div className="fac-stat" style={{ fontFamily: cinzel.style.fontFamily }}>
                    <span className="fac-stat-val">{s.val}</span>
                    <span className="fac-stat-label" style={{ fontFamily: playfair.style.fontFamily }}>{s.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {lottieData && (
            <motion.div
              className="fac-hero-lottie"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.55 }}
              style={{ willChange: "transform, opacity" }}
            >
              <Lottie
                animationData={lottieData}
                loop autoplay
                style={{ width: "100%", height: "auto" }}
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              />
            </motion.div>
          )}
        </div>

        {/* Marquee */}
        <div className="fac-hero-marquee-wrap">
          <div className="fac-marquee-track">
            {[
              "Transformational Leadership","Research Excellence","Industry Connect","Experiential Learning",
              "Innovation","Mentorship","Academic Rigour","Entrepreneurship","Technology","Analytics",
              "Transformational Leadership","Research Excellence","Industry Connect","Experiential Learning",
              "Innovation","Mentorship","Academic Rigour","Entrepreneurship","Technology","Analytics",
            ].map((item, i) => (
              <div key={i} className="fac-marquee-item">
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: BLUE, display: "inline-block", opacity: 0.5 }} />
                <span style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "0.74rem", letterSpacing: "0.22em",
                  textTransform: "uppercase", color: BLUE, opacity: 0.5, fontWeight: 600,
                }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FACULTY GRID SECTION ════════════════════════════ */}
      <section className="fac-grid-section">
        <div className="fac-section-hdr">
          <p className="fac-section-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
            <span className="fac-eyebrow-dash" />
            Academic Departments
          </p>
          <div className="fac-section-hdr-row">
            <h2 className="fac-section-title" style={{ fontFamily: cinzel.style.fontFamily }}>Meet the Team.</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="fac-tabs">
          {departments.map((dept) => (
            <button
              key={dept}
              className={`fac-tab${activeTab === dept ? " fac-tab--active" : ""}`}
              onClick={() => setActiveTab(dept)}
              style={{ fontFamily: cinzel.style.fontFamily }}
            >
              <span className="fac-tab-full">
                {dept === "MBA" ? "Master of Business Administration" : "Master of Computer Applications"}
              </span>
              <span className="fac-tab-short">{dept}</span>
            </button>
          ))}
        </div>

        <p className="fac-dept-desc" style={{ fontFamily: playfair.style.fontFamily }}>
          {DEPT_DESC[activeTab]}
        </p>

        <div ref={gridRef} className="faculty-grid">
          {filtered.length === 0 && (
            <p className="fac-empty" style={{ fontFamily: playfair.style.fontFamily }}>
              Faculty profiles coming soon.
            </p>
          )}
          {filtered.map((member) => (
            <Link key={member.slug} href={`/faculty/${member.slug}`} className="faculty-card">

              {/* ── Square Avatar ── */}
              <div className="fc-avatar-wrap">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.full_name}
                    fill
                    sizes="(max-width: 580px) 45vw, (max-width: 900px) 30vw, 220px"
                    loading="lazy"
                    quality={80}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                ) : (
                  <div className="fc-avatar-initials" style={{ fontFamily: cinzel.style.fontFamily }}>
                    {getInitials(member.full_name)}
                  </div>
                )}

                {/* Subtle blue tint overlay on hover */}
                <div className="fc-avatar-overlay" aria-hidden="true" />
              </div>

              {/* ── Info block ── */}
              <div className="fc-info">
                <h3 className="fc-name" style={{ fontFamily: cinzel.style.fontFamily }}>
                  {member.full_name}
                </h3>
                <p className="fc-desig" style={{ fontFamily: playfair.style.fontFamily }}>
                  {member.designation}
                </p>
                <div className="fc-cta">
                  <span style={{ fontFamily: cinzel.style.fontFamily }}>View Profile</span>
                  <span className="fc-arrow" aria-hidden="true">→</span>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </section>

      {/* ═══ STYLES ══════════════════════════════════════════ */}
      <style>{`
        .fac-root {
          background: #ffffff; color: #0f1115; overflow-x: hidden;
          font-family: ${playfair.style.fontFamily};
        }

        /* ── HERO ─────────────────────────────────────────── */
        .fac-hero {
          height: 100svh; max-height: 100svh;
          background: #fff;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
          padding: clamp(4rem,8vh,6rem) clamp(1.5rem,10vw,9rem) 3.5rem;
          box-sizing: border-box;
        }
        .fac-hero-wm {
          position: absolute; right: -0.05em; bottom: -0.15em; z-index: 0;
          font-size: clamp(16rem,34vw,46rem); font-weight: 800; line-height: 1;
          letter-spacing: -0.06em; color: rgba(0,92,159,0.03);
          pointer-events: none; user-select: none;
        }
        .fac-hero-inner {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1fr clamp(220px, 32vw, 440px);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
          max-width: 1200px; width: 100%;
        }
        .fac-hero-text { display: flex; flex-direction: column; }
        .fac-hero-lottie { display: flex; align-items: center; justify-content: center; }
        @media(max-width: 900px) {
          .fac-hero-inner { grid-template-columns: 1fr; }
          .fac-hero-lottie { display: none; }
        }

        .fac-hero-eyebrow {
          opacity: 0; transform: translateY(-10px);
          display: flex; align-items: center; gap: 12px;
          margin-bottom: clamp(0.7rem,1.5vh,1.2rem);
          font-size: clamp(0.66rem,0.8vw,0.74rem);
          letter-spacing: 0.32em; text-transform: uppercase;
          color: ${BLUE}; font-weight: 600;
        }
        .fac-eyebrow-dash {
          display: inline-block; width: 28px; height: 1.5px;
          background: ${BLUE}; flex-shrink: 0;
        }
        .fac-hero-title {
          font-size: clamp(2rem,5.5vw,7rem);
          font-weight: 800; line-height: 0.92;
          letter-spacing: -0.03em; text-transform: uppercase;
          margin: 0 0 clamp(1rem,2vh,1.8rem);
          opacity: 0; transform: translateY(40px);
        }
        .fac-hero-sub {
          opacity: 0; transform: translateY(18px);
          margin-bottom: clamp(1.2rem,2.5vh,2.5rem);
        }
        .fac-hero-rule {
          width: 40px; height: 2px;
          background: linear-gradient(90deg,${BLUE},#1e3a8a);
          margin-bottom: clamp(1rem,2vh,1.6rem); border-radius: 1px;
        }
        .fac-hero-sub p {
          font-size: clamp(0.88rem,1.05vw,1rem);
          line-height: 1.85; color: #666; margin: 0; max-width: 520px;
        }
        .fac-hero-stats {
          display: flex; align-items: center; flex-wrap: wrap; gap: 0;
          padding-top: clamp(0.8rem,1.5vh,1.5rem);
          border-top: 1px solid rgba(0,92,159,0.10);
        }
        .fac-stat {
          opacity: 0; transform: translateY(12px);
          display: flex; align-items: center; gap: 10px;
          padding: clamp(0.3rem,0.5vh,0.5rem) clamp(1rem,2vw,2rem);
          border-right: 1px solid rgba(0,92,159,0.10); white-space: nowrap;
        }
        .fac-stat:first-child { padding-left: 0; }
        .fac-stat:last-child  { border-right: none; }
        .fac-stat-div { display: none; }
        .fac-stat-val   { font-size: clamp(1rem,1.8vw,1.6rem); font-weight: 800; color: ${BLUE}; line-height: 1; white-space: nowrap; }
        .fac-stat-label { font-size: clamp(0.7rem,0.85vw,0.8rem); color: #777; line-height: 1.35; white-space: nowrap; }

        .fac-hero-marquee-wrap {
          opacity: 0;
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 44px; overflow: hidden;
          border-top: 1px solid rgba(0,92,159,0.07);
          background: rgba(0,92,159,0.018);
          display: flex; align-items: center; z-index: 3;
        }
        .fac-marquee-track {
          display: flex; align-items: center; gap: 3rem;
          animation: facMarquee 28s linear infinite;
          white-space: nowrap; padding: 0 1.5rem;
        }
        @keyframes facMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .fac-marquee-item { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        /* ── GRID SECTION ───────────────────────────────────── */
        .fac-grid-section {
          background: #f8f9fb; min-height: 100svh; box-sizing: border-box;
          padding: clamp(2.5rem,5vh,4.5rem) clamp(1.5rem,8vw,8rem) clamp(3rem,6vh,5rem);
          display: flex; flex-direction: column;
        }
        .fac-section-hdr {
          max-width: 1200px; margin: 0 auto clamp(1.5rem,2.5vh,2rem); width: 100%;
        }
        .fac-section-eyebrow {
          display: flex; align-items: center; gap: 0.75rem;
          font-size: clamp(0.66rem,0.78vw,0.74rem);
          letter-spacing: 0.28em; text-transform: uppercase;
          color: ${BLUE}; font-weight: 600; margin-bottom: 0.6rem;
        }
        .fac-section-hdr-row {
          display: flex; align-items: flex-end;
          padding-bottom: clamp(1rem,2vh,1.4rem);
          border-bottom: 1px solid rgba(0,92,159,0.09);
        }
        .fac-section-title {
          margin: 0;
          font-size: clamp(1.8rem,3.5vw,4rem);
          font-weight: 700; letter-spacing: -0.025em;
          text-transform: uppercase; line-height: 0.95;
          background: linear-gradient(90deg,#0d0d0d 0%,${BLUE} 65%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
        }
        .fac-tabs {
          max-width: 1200px; margin: 0 auto clamp(1rem,2vh,1.5rem); width: 100%;
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .fac-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 22px; border: 1px solid rgba(0,92,159,0.15);
          border-radius: 100px;
          font-size: clamp(0.72rem,0.88vw,0.82rem);
          letter-spacing: 0.04em; font-weight: 600; cursor: pointer;
          background: #fff; color: #6b7280;
          transition: all 0.22s ease;
        }
        .fac-tab-short { display: none; }
        @media(max-width:560px) {
          .fac-tab-full { display: none; }
          .fac-tab-short { display: inline; }
        }
        .fac-tab:hover { border-color: rgba(0,92,159,0.35); color: ${BLUE}; }
        .fac-tab--active { background: ${BLUE}; color: #fff; border-color: ${BLUE}; box-shadow: 0 4px 18px rgba(0,92,159,0.22); }
        .fac-tab--active:hover { color: #fff; }
        .fac-dept-desc {
          max-width: 1200px; margin: 0 auto clamp(1.5rem,3vh,2.5rem); width: 100%;
          font-size: clamp(0.83rem,0.98vw,0.94rem); line-height: 1.78; color: #666;
        }

        /* ── Faculty Grid ───────────────────────────────────── */
        .faculty-grid {
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(160px,17vw,210px), 1fr));
          gap: clamp(16px,2vw,24px);
        }
        .fac-empty {
          grid-column: 1/-1; text-align: center;
          color: #9ca3af; font-style: italic; padding: 3rem 0; font-size: 1rem;
        }

        /* ── Faculty Card ───────────────────────────────────── */
        .faculty-card {
          text-decoration: none; color: inherit;
          display: flex; flex-direction: column; align-items: stretch; text-align: left;
          background: #fff;
          border: 1px solid rgba(0,92,159,0.09);
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,92,159,0.04);
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.28s ease,
                      border-color 0.28s ease;
          position: relative; overflow: hidden; opacity: 0;
        }

        /* Top accent bar */
        .faculty-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, ${BLUE}, #1e3a8a);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
          z-index: 4;
        }
        .faculty-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 44px rgba(0,92,159,0.13);
          border-color: rgba(0,92,159,0.20);
        }
        .faculty-card:hover::before { transform: scaleX(1); }

        /* ── Square Avatar ──────────────────────────────────── */
        .fc-avatar-wrap {
          width: 100%;
          aspect-ratio: 4 / 3;          /* landscape portrait — editorial feel */
          position: relative;
          overflow: hidden;
          background: #dbeafe;
          border-radius: 0;              /* no rounding — square flush to card */
          border-bottom: 1px solid rgba(0,92,159,0.08);
          flex-shrink: 0;
        }

        /* Hover overlay — blue tint wash */
        .fc-avatar-overlay {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(
            160deg,
            rgba(0,92,159,0) 40%,
            rgba(0,92,159,0.18) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .faculty-card:hover .fc-avatar-overlay { opacity: 1; }

        /* Initials fallback */
        .fc-avatar-initials {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 800; color: ${BLUE};
          letter-spacing: 0.05em; user-select: none;
        }

        /* ── Info Block ─────────────────────────────────────── */
        .fc-info {
          padding: clamp(12px,1.2vw,16px) clamp(14px,1.4vw,18px) clamp(10px,1vw,14px);
          display: flex; flex-direction: column; gap: 3px;
          flex: 1;
        }
        .fc-name {
          font-size: clamp(12.5px,1.25vw,14.5px); font-weight: 700;
          margin: 0; color: #0f1115; line-height: 1.35;
          letter-spacing: 0.01em;
          transition: color 0.22s ease;
        }
        .faculty-card:hover .fc-name { color: ${BLUE}; }

        .fc-desig {
          font-size: clamp(10.5px,0.95vw,12.5px); color: #6b7280;
          margin: 0; line-height: 1.5;
        }

        /* CTA row */
        .fc-cta {
          display: flex; align-items: center; gap: 6px;
          margin-top: clamp(8px,0.8vw,12px);
          font-size: clamp(11px,0.9vw,13px);
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(0,92,159,0.5);
          font-family: ${cinzel.style.fontFamily};
          font-weight: 600;
          transition: color 0.22s ease;
        }
        .faculty-card:hover .fc-cta { color: ${BLUE}; }
        .fc-arrow {
          display: inline-block;
          transition: transform 0.22s ease;
          font-size: 12px;
        }
        .faculty-card:hover .fc-arrow { transform: translateX(4px); }

        /* ── Responsive ─────────────────────────────────────── */
        @media(max-width:900px) {
          .fac-section-hdr-row { flex-direction: column; align-items: flex-start; text-align: left; }
          .fac-section-title { text-align: left; }
          .faculty-grid { grid-template-columns: repeat(auto-fill, minmax(150px,1fr)); }
        }
        @media(max-width:580px) {
          .faculty-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 14px; }
          .fac-grid-section { padding: 3rem 1.2rem 4rem; }
          .fac-hero { padding: 3rem 1.5rem 3.5rem; }
          /* Left-align the stats so a wrapped tag (e.g. NBA Accredited) sits
             directly under the first stat, not centered like an inverted triangle. */
          .fac-hero-stats { justify-content: flex-start; gap: 8px 18px; }
          .fac-stat {
            border-right: none;
            padding: clamp(0.3rem,0.5vh,0.5rem) 0;
          }
          .fac-stat:first-child { padding-left: 0; }
        }
        @media(prefers-reduced-motion:reduce) {
          .fac-marquee-track { animation: none; }
          .fac-hero-eyebrow,.fac-hero-title,.fac-hero-sub,.fac-stat,.fac-hero-marquee-wrap {
            opacity:1 !important; transform:none !important; visibility:visible !important;
          }
          .faculty-card { opacity:1 !important; }
        }
      `}</style>
    </div>
  );
}