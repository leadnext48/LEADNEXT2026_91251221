"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { cinzel, playfair } from "@/app/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface LifeAtLeadHeroProps {
  title: string;
  description: string;
  imageSrc: string;
  /** Page-level label shown above the headline, e.g. "Farm & Nature" */
  eyebrow?: string;
  /** CTA buttons — all rendered as ghost white pills */
  ctas?: { label: string; href: string }[];
  /** Stats strip at the bottom */
  stats?: { val: string; lbl: string }[];
}

export default function LifeAtLeadHero({
  title,
  description,
  imageSrc,
  eyebrow = "Life at LEAD",
  ctas = [],
  stats = [],
}: LifeAtLeadHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05, defaults: { ease: "power3.out" } });

      /* Image — subtle scale-in, GPU compositor only */
      gsap.set(".lal-img",     { opacity: 0, scale: 1.04 });
      tl.to(".lal-img",        { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" });

      /* Eyebrow */
      gsap.set(".lal-eyebrow", { opacity: 0, y: -14 });
      tl.to(".lal-eyebrow",    { opacity: 1, y: 0, duration: 0.55 }, "-=1.1");

      /* Headline lines — pure translateY + opacity, zero rotateX/blur */
      gsap.set(".lal-line",    { opacity: 0, y: 36 });
      tl.to(".lal-line",       { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 }, "-=0.9");

      /* Divider */
      gsap.set(".lal-bar",     { opacity: 0, scaleX: 0 });
      tl.to(".lal-bar",        { opacity: 1, scaleX: 1, duration: 0.45, transformOrigin: "center" }, "-=0.5");

      /* Subtitle */
      gsap.set(".lal-sub",     { opacity: 0, y: 20 });
      tl.to(".lal-sub",        { opacity: 1, y: 0, duration: 0.6 }, "-=0.35");

      /* CTA buttons */
      gsap.set(".lal-btns",    { opacity: 0, y: 20 });
      tl.to(".lal-btns",       { opacity: 1, y: 0, duration: 0.55 }, "-=0.4");

      /* Stats */
      gsap.set(".lal-stat",    { opacity: 0, y: 18 });
      tl.to(".lal-stat",       { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, "-=0.35");

      /* Scroll indicator — last to appear */
      gsap.set(".lal-scroll",  { opacity: 0 });
      tl.to(".lal-scroll",     { opacity: 1, duration: 0.7 }, "-=0.2");

      /* Parallax on hero image */
      gsap.to(".lal-img", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  /* Split at newlines or <br> for multi-line headlines */
  const lines = title.split(/\n|<br\s*\/?>/i);

  return (
    <>
      <style>{`
        .lal-hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: #000;
        }
        .lal-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        /* Ghost pill shimmer on hover */
        .lal-cb {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        .lal-cb::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.12);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .lal-cb:hover::after { transform: translateX(0); }
        .lal-cb:hover        { transform: translateY(-2px); }
        /* Scroll chevron bounce */
        @keyframes lal-bounce {
          0%, 100% { transform: translateY(0);   opacity: 0.45; }
          50%       { transform: translateY(7px); opacity: 0.9;  }
        }
        .lal-chevron { animation: lal-bounce 1.9s ease-in-out infinite; }
      `}</style>

      <section ref={heroRef} className="lal-hero">

        {/* ── Background image ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover lal-img"
            style={{ opacity: 1 }}
          />
          {/* Bottom-heavy gradient so stats stay readable */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.48) 50%, rgba(0,0,0,0.14) 100%)" }} />
          {/* Subtle top vignette */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 35%)" }} />
        </div>

        {/* ── Dot grid ── */}
        <div
          className="lal-dot-grid"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        />

        {/* ── Four corner brackets ── */}
        <div style={{ position: "absolute", top: 20, left: 20, width: 36, height: 36, borderTop: "1px solid rgba(255,255,255,0.18)", borderLeft: "1px solid rgba(255,255,255,0.18)", zIndex: 10 }} />
        <div style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, borderTop: "1px solid rgba(255,255,255,0.18)", borderRight: "1px solid rgba(255,255,255,0.18)", zIndex: 10 }} />
        <div style={{ position: "absolute", bottom: 20, left: 20, width: 36, height: 36, borderBottom: "1px solid rgba(255,255,255,0.18)", borderLeft: "1px solid rgba(255,255,255,0.18)", zIndex: 10 }} />
        <div style={{ position: "absolute", bottom: 20, right: 20, width: 36, height: 36, borderBottom: "1px solid rgba(255,255,255,0.18)", borderRight: "1px solid rgba(255,255,255,0.18)", zIndex: 10 }} />

        {/* ── Centred content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 900,
            padding: "0 clamp(1.5rem, 5vw, 3rem)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Eyebrow — symmetric rule lines either side */}
          <div
            className="lal-eyebrow"
            style={{
              opacity: 1,
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "clamp(0.9rem, 1.8vh, 1.5rem)",
            }}
          >
            <span style={{ display: "inline-block", width: 22, height: 1, background: "rgba(255,255,255,0.38)", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(0.66rem, 0.82vw, 0.74rem)",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.62)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              LEAD College — {eyebrow}
            </span>
            <span style={{ display: "inline-block", width: 22, height: 1, background: "rgba(255,255,255,0.38)", flexShrink: 0 }} />
          </div>

          {/* Headline — all lines pure white */}
          <h1
            style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(2.4rem, 6.5vw, 6.5rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: "0 0 clamp(1rem, 2vh, 1.6rem)",
              color: "#fff",
            }}
          >
            {lines.map((line, i) => (
              <span
                key={i}
                className="lal-line"
                style={{ display: "block", opacity: 1, color: "#fff" }}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Divider — centred, white */}
          <div
            className="lal-bar"
            style={{
              width: 44,
              height: 2,
              background: "rgba(255,255,255,0.48)",
              borderRadius: 2,
              marginBottom: "clamp(1rem, 2vh, 1.6rem)",
              opacity: 1,
            }}
          />

          {/* Description */}
          <p
            className="lal-sub"
            style={{
              opacity: 1,
              fontFamily: playfair.style.fontFamily,
              fontSize: "clamp(0.95rem, 0.98vw, 1rem)",
              lineHeight: 1.8,
              color: "#fff",
              maxWidth: 560,
              margin: "0 0 clamp(1.4rem, 2.8vh, 2.4rem)",
            }}
          >
            {description}
          </p>

          {/* CTA buttons — all ghost white */}
          {ctas.length > 0 && (
            <div
              className="lal-btns"
              style={{
                opacity: 1,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
                marginBottom: stats.length > 0 ? "clamp(2rem, 4vh, 3.2rem)" : 0,
              }}
            >
              {ctas.map((cta, i) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  className="lal-cb"
                  style={{
                    fontFamily: cinzel.style.fontFamily,
                    fontSize: "clamp(0.72rem, 0.85vw, 0.76rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.11em",
                    fontWeight: 600,
                    padding: "0.6rem 1.4rem",
                    borderRadius: 999,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#fff",
                    /* slightly brighter fill on the first/primary button */
                    background: i === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  {cta.label}
                  {i === 0 && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Stats strip — centred */}
          {stats.length > 0 && (
            <div
              style={{
                paddingTop: "clamp(1rem, 2vh, 1.5rem)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "clamp(1.5rem, 4vw, 3.5rem)",
              }}
            >
              {stats.map((s) => (
                <div key={s.val} className="lal-stat" style={{ opacity: 1, textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: cinzel.style.fontFamily,
                      fontSize: "clamp(1rem, 1.9vw, 1.8rem)",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1,
                      margin: 0,
                    }}
                  >
                    {s.val}
                  </p>
                  <p
                    style={{
                      fontFamily: playfair.style.fontFamily,
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.44)",
                      marginTop: 4,
                      lineHeight: 1.45,
                    }}
                  >
                    {s.lbl}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Scroll to view gallery indicator ── */}
        <div
          className="lal-scroll"
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            opacity: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(0.66rem, 0.7vw, 0.72rem)",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Scroll to view gallery
          </span>
          <div className="lal-chevron">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

      </section>
    </>
  );
}