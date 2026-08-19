// app/governance/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { cinzel, playfair } from "@/app/fonts";
import Link from "next/link";
import {
  Users, Shield, Briefcase, MessageSquare, GitBranch,
  GraduationCap, BookOpen, DollarSign, Award,
} from "lucide-react";

const BLUE = "#005C9F";

const governanceBodies = [
  { slug: "trust",              title: "The Trust",                       shortLabel: "The Trust",        icon: Shield        },
  { slug: "governing-body",     title: "Governing Body",                  shortLabel: "Governing Body",   icon: Users         },
  { slug: "ldc",                title: "Leadership Decision Council",      shortLabel: "LDC",              icon: Briefcase     },
  { slug: "pac",                title: "Program Advisory Committee",      shortLabel: "PAC",              icon: MessageSquare },
  { slug: "pcc",                title: "Program Core Committee",          shortLabel: "PCC",              icon: GitBranch     },
  { slug: "academic-council",   title: "Academic Council",                shortLabel: "Academic Council", icon: GraduationCap },
  { slug: "board-of-studies",   title: "Board of Studies",                shortLabel: "Board of Studies", icon: BookOpen      },
  { slug: "finance-committee",  title: "Finance Committee",               shortLabel: "Finance Committee",icon: DollarSign    },
  { slug: "iqac",               title: "Internal Quality Assurance Cell", shortLabel: "IQAC",             icon: Award         },
];

const HERO_STATS = [
  { val: "9",    label: "Statutory Bodies"  },
  { val: "2010", label: "Established"       },
  { val: "NBA",  label: "Accredited"        },
];

export default function GovernancePage() {
  const heroRef    = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);

  useEffect(() => {
    fetch("/Online Meetings.json").then(r => r.json()).then(setLottieData).catch(() => {});
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

      const hero = heroRef.current;
      if (hero) {
        const tl = gsap.timeline({ delay: 0.1 });
        tl.to(".gov-hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" })
          .to(".gov-hero-title",   { autoAlpha: 1, y: 0, duration: 1.0, ease: "power3.out" }, "-=0.35")
          .to(".gov-hero-sub",     { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.45")
          .to(".gov-hero-stats .gov-stat", { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3")
          .to(".gov-hero-marquee-wrap", { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "-=0.2");
      }

      const grid = gridRef.current;
      if (grid) {
        gsap.set(".gov-section-hdr", { autoAlpha: 0, y: -12 });
        gsap.set(".governance-tile", { autoAlpha: 0, y: 22, scale: 0.96 });

        gsap.to(".gov-section-hdr", {
          autoAlpha: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: grid, start: "top 82%" },
        });
        gsap.to(".governance-tile", {
          autoAlpha: 1, y: 0, scale: 1, duration: 0.55,
          stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: grid, start: "top 80%" },
        });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="gov-root">

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="gov-hero">

        <div className="gov-hero-wm" aria-hidden="true"
          style={{ fontFamily: cinzel.style.fontFamily }}>GOV</div>

        <div className="gov-hero-inner">
          <div className="gov-hero-text">

            <div className="gov-hero-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
              <span className="gov-eyebrow-dash" />
              LEAD College — Institutional Leadership
            </div>

            <h1 className="gov-hero-title" style={{ fontFamily: cinzel.style.fontFamily }}>
              <span style={{ display: "block", color: "#0D0D0D" }}>Governance</span>
              <span style={{
                display: "block",
                background: `linear-gradient(90deg, #0d0d0d 0%, ${BLUE} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent",
              }}>&amp; Structure.</span>
            </h1>

            <div className="gov-hero-sub">
              <div className="gov-hero-rule" />
              <p style={{ fontFamily: playfair.style.fontFamily }}>
                Institutional leadership, statutory bodies, and quality governance
                — the framework that drives every decision at LEAD College.
              </p>
            </div>

            <div className="gov-hero-stats">
              {HERO_STATS.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="gov-stat-sep" />}
                  <div className="gov-stat" style={{ fontFamily: cinzel.style.fontFamily }}>
                    <span className="gov-stat-val">{s.val}</span>
                    <span className="gov-stat-label" style={{ fontFamily: playfair.style.fontFamily }}>{s.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {lottieData && (
            <motion.div
              className="gov-hero-lottie"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.55 }}
              style={{ willChange: "transform, opacity" }}
            >
              <Lottie
                animationData={lottieData}
                loop
                autoplay
                style={{ width: "100%", height: "auto" }}
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              />
            </motion.div>
          )}
        </div>

        <div className="gov-hero-marquee-wrap">
          <div className="gov-marquee-track">
            {[
              "Governing Body","Academic Council","Finance Committee","Board of Studies",
              "IQAC","Program Advisory","Leadership Council","The Trust","Program Core Committee",
              "Governing Body","Academic Council","Finance Committee","Board of Studies",
              "IQAC","Program Advisory","Leadership Council","The Trust","Program Core Committee",
            ].map((item, i) => (
              <div key={i} className="gov-marquee-item">
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: BLUE, display: "inline-block", opacity: 0.5 }} />
                <span style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "0.48rem", letterSpacing: "0.28em",
                  textTransform: "uppercase", color: BLUE, opacity: 0.5, fontWeight: 600,
                }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          GRID SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="gov-grid-section">

        <div className="gov-section-hdr" ref={titleRef}>
          <p className="gov-section-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
            <span className="gov-eyebrow-dash" />
            Statutory Framework
          </p>
          <div className="gov-section-hdr-row">
            <h2 className="gov-section-title" style={{ fontFamily: cinzel.style.fontFamily }}>
              Institutional Structure.
            </h2>
            <p className="gov-section-desc" style={{ fontFamily: playfair.style.fontFamily }}>
              Nine statutory and advisory bodies governing academic, financial,
              and quality functions across LEAD College.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="governance-grid">
          {governanceBodies.map((body) => {
            const Icon = body.icon;
            return (
              <Link key={body.slug} href={`/governance/${body.slug}`} className="governance-tile">
                <div className="tile-left">
                  <div className="tile-iconWrap">
                    <Icon className="tile-icon" size={22} strokeWidth={1.6} />
                  </div>
                </div>
                <div className="tile-right">
                  <div className="tile-title" style={{ fontFamily: cinzel.style.fontFamily }}>{body.title}</div>
                  <div className="tile-label" style={{ fontFamily: playfair.style.fontFamily }}>{body.shortLabel}</div>
                </div>
                <div className="tile-arrow" aria-hidden="true">→</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STYLES
      ═══════════════════════════════════════════════════════ */}
      <style>{`
        .gov-root {
          background: #ffffff;
          color: #0f1115;
          overflow-x: hidden;
          font-family: ${playfair.style.fontFamily};
        }

        /* ═══ HERO ═══════════════════════════════════════════ */
        .gov-hero {
          height: 100svh;
          max-height: 100svh;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: clamp(4rem,8vh,6rem) clamp(1.5rem,10vw,9rem) 3.5rem;
          box-sizing: border-box;
        }

        .gov-hero-wm {
          position: absolute; right: -0.05em; bottom: -0.15em; z-index: 0;
          font-size: clamp(16rem,34vw,46rem); font-weight: 800;
          line-height: 1; letter-spacing: -0.06em;
          color: rgba(0,92,159,0.03);
          pointer-events: none; user-select: none;
        }

        .gov-hero-inner {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1fr clamp(220px, 32vw, 440px);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
          max-width: 1200px;
          width: 100%;
        }
        .gov-hero-text { display: flex; flex-direction: column; }
        .gov-hero-lottie {
          display: flex; align-items: center; justify-content: center;
        }
        @media(max-width: 900px) {
          .gov-hero-inner { grid-template-columns: 1fr; }
          .gov-hero-lottie { display: none; }
        }

        .gov-hero-eyebrow {
          opacity: 0; transform: translateY(-10px);
          display: flex; align-items: center; gap: 12px;
          margin-bottom: clamp(0.7rem,1.5vh,1.2rem);
          font-size: clamp(0.44rem,0.68vw,0.6rem);
          letter-spacing: 0.38em; text-transform: uppercase;
          color: ${BLUE}; font-weight: 600;
        }
        .gov-eyebrow-dash {
          display: inline-block; width: 28px; height: 1.5px;
          background: ${BLUE}; flex-shrink: 0;
        }

        .gov-hero-title {
          font-size: clamp(2rem,5.5vw,7rem);
          font-weight: 800; line-height: 0.92;
          letter-spacing: -0.03em; text-transform: uppercase;
          margin: 0 0 clamp(1rem,2vh,1.8rem);
          opacity: 0; transform: translateY(40px);
        }

        .gov-hero-sub {
          opacity: 0; transform: translateY(18px);
          margin-bottom: clamp(1.2rem,2.5vh,2.5rem);
        }
        .gov-hero-rule {
          width: 40px; height: 2px;
          background: linear-gradient(90deg,${BLUE},#1e3a8a);
          margin-bottom: clamp(1rem,2vh,1.6rem);
          border-radius: 1px;
        }
        .gov-hero-sub p {
          font-size: clamp(0.88rem,1.05vw,1rem);
          line-height: 1.85; color: #666; margin: 0;
          max-width: 520px;
        }

        /* ── Stats strip: always one line ── */
        .gov-hero-stats {
          display: flex; align-items: center;
          gap: 0;
          padding-top: clamp(0.8rem,1.5vh,1.5rem);
          border-top: 1px solid rgba(0,92,159,0.10);
          flex-wrap: nowrap;
          overflow: hidden;
        }
        .gov-stat {
          opacity: 0; transform: translateY(12px);
          display: flex; align-items: center; gap: clamp(6px,1vw,14px);
          padding: 0 clamp(0.5rem,2.5vw,2.5rem);
          border-right: 1px solid rgba(0,92,159,0.10);
          flex-shrink: 1; min-width: 0;
          white-space: nowrap;
        }
        .gov-stat:first-child { padding-left: 0; }
        .gov-stat:last-child  { border-right: none; }
        .gov-stat-val {
          font-size: clamp(1rem,1.8vw,1.6rem); font-weight: 800;
          color: ${BLUE}; line-height: 1;
          flex-shrink: 0;
        }
        .gov-stat-label {
          font-size: clamp(0.7rem,0.85vw,0.8rem);
          color: #777; line-height: 1.35;
        }
        .gov-stat-sep { display: none; }

        /* Marquee */
        .gov-hero-marquee-wrap {
          opacity: 0;
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 44px; overflow: hidden;
          border-top: 1px solid rgba(0,92,159,0.07);
          background: rgba(0,92,159,0.018);
          display: flex; align-items: center; z-index: 3;
        }
        .gov-marquee-track {
          display: flex; align-items: center; gap: 3rem;
          animation: govMarquee 28s linear infinite;
          white-space: nowrap; padding: 0 1.5rem;
        }
        @keyframes govMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .gov-marquee-item {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }

        /* ═══ GRID SECTION ═══════════════════════════════════ */
        .gov-grid-section {
          background: #ffffff;
          height: 100svh;
          max-height: 100svh;
          overflow: hidden;
          box-sizing: border-box;
          padding: clamp(2.5rem,5vh,4rem) clamp(1.5rem,8vw,8rem);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .gov-section-hdr {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto clamp(1.5rem,3vh,2.5rem);
          width: 100%;
        }
        .gov-section-eyebrow {
          display: flex; align-items: center; gap: 0.75rem;
          font-size: clamp(0.44rem,0.64vw,0.58rem);
          letter-spacing: 0.34em; text-transform: uppercase;
          color: ${BLUE}; font-weight: 600; margin-bottom: 0.6rem;
        }
        .gov-section-hdr-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          padding-bottom: clamp(1rem,2vh,1.6rem);
          border-bottom: 1px solid rgba(0,92,159,0.09);
        }
        .gov-section-title {
          margin: 0;
          font-size: clamp(1.8rem,3.5vw,4rem);
          font-weight: 700; letter-spacing: -0.025em;
          text-transform: uppercase; line-height: 0.95;
          background: linear-gradient(90deg,#0d0d0d 0%,${BLUE} 65%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
        }
        .gov-section-desc {
          font-size: clamp(0.82rem,0.98vw,0.94rem);
          line-height: 1.78; color: #666; margin: 0;
          max-width: 420px;
          text-align: left;
        }

        /* Grid */
        .governance-grid {
          position: relative; z-index: 1;
          width: 100%; max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: clamp(12px,1.6vw,18px);
        }

        /* Tile */
        .governance-tile {
          text-decoration: none; color: inherit;
          background: #fff;
          border: 1px solid rgba(0,92,159,0.09);
          border-radius: 12px;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: clamp(14px,1.5vw,18px);
          box-shadow: 0 2px 16px rgba(0,92,159,0.05);
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease, background 0.24s ease;
          position: relative; overflow: hidden;
          opacity: 0;
        }
        .governance-tile::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg,${BLUE},#1e3a8a);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .governance-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,92,159,0.12);
          border-color: rgba(0,92,159,0.22);
          background: linear-gradient(160deg,rgba(0,92,159,0.02) 0%,#fff 55%);
        }
        .governance-tile:hover::before { transform: scaleX(1); }

        .tile-left { display: flex; align-items: center; }
        .tile-iconWrap {
          width: 42px; height: 42px; border-radius: 10px;
          display: grid; place-items: center;
          background: rgba(0,92,159,0.07);
          border: 1px solid rgba(0,92,159,0.12);
          transition: background 0.24s ease, border-color 0.24s ease;
          flex-shrink: 0;
        }
        .governance-tile:hover .tile-iconWrap {
          background: rgba(0,92,159,0.13);
          border-color: rgba(0,92,159,0.25);
        }
        .tile-icon { color: ${BLUE}; }
        .tile-right {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; gap: 3px;
        }
        .tile-title {
          font-weight: 700; font-size: clamp(11.5px,0.92vw,13.5px);
          letter-spacing: 0.01em;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          color: #0f1115;
          transition: color 0.24s ease;
        }
        .governance-tile:hover .tile-title { color: ${BLUE}; }
        .tile-label {
          font-size: clamp(11px,0.82vw,12.5px); color: #6b7280;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .tile-arrow {
          font-size: 16px; color: rgba(0,92,159,0.55);
          transition: transform 0.24s ease, opacity 0.24s ease, color 0.24s ease;
          opacity: 0.6; flex-shrink: 0;
        }
        .governance-tile:hover .tile-arrow {
          transform: translateX(4px); opacity: 1; color: ${BLUE};
        }

        /* Responsive */
        @media(max-width: 900px) {
          /* Release the fixed-viewport lock so nothing clips or overlaps on mobile */
          .gov-hero {
            height: auto;
            min-height: 100svh;
            max-height: none;
            padding-bottom: 4.5rem;
          }
          .gov-grid-section {
            height: auto;
            min-height: auto;
            max-height: none;
            overflow: visible;
            padding-top: 4rem;
            padding-bottom: 4.5rem;
          }
          .governance-grid { grid-template-columns: repeat(2,1fr); }
          .gov-section-desc { text-align: left; max-width: none; }
          .gov-section-hdr-row { flex-direction: column; align-items: flex-start; }
        }
        @media(max-width: 580px) {
          .governance-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
          .gov-grid-section { padding: 3.5rem 1.5rem 4.5rem; }
        }
        @media(prefers-reduced-motion: reduce) {
          .gov-marquee-track { animation: none; }
          .gov-hero-eyebrow,.gov-hero-title,.gov-hero-sub,.gov-stat,.gov-hero-marquee-wrap {
            opacity: 1 !important; transform: none !important; visibility: visible !important;
          }
          .governance-tile { opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}