"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { playfair, cinzel } from "@/app/fonts";

const BLUE = "#005C9F";

/* ───────────────── Credential Icons ───────────────── */
const IconBriefcase = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);

const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/>
  </svg>
);

const IconHeart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const credentials = [
    { Icon: IconHeart,     text: "Chairman — Prompt Charitable Trust" },
  { Icon: IconBriefcase, text: "Director of LEAD College (Autonomous)" },
  { Icon: IconShield,    text: "Chairman — NIPM Palakkad Chapter" },
  { Icon: IconStar,      text: "Guinness World Record Holder" },

];

export default function ChairmanSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLDivElement>(null);
  const credsRef    = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [imageReady, setImageReady] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        delay: 0.1,
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(imageRef.current,
        { autoAlpha: 0, y: 60, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.4, ease: "power4.out" }
      )
        .fromTo(".chairman-ghost-text", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 0)
        .fromTo(".chairman-dot-grid",   { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4 }, 0.1)
        .fromTo(".chairman-corner-tl",  { autoAlpha: 0, x: -12, y: -12 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .fromTo(".chairman-corner-br",  { autoAlpha: 0, x: 12,  y: 12  }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .fromTo(".chairman-hline",      { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0.15)
        .fromTo(".chairman-year",       { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.9)
        .fromTo(labelRef.current,       { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.6 }, 0.3)
        .fromTo(titleRef.current,       { autoAlpha: 0, y: 40  }, { autoAlpha: 1, y: 0, duration: 1   }, 0.4)
        .fromTo(dividerRef.current,     { scaleX: 0             }, { scaleX: 1,          duration: 0.6 }, 0.6)
        .fromTo(nameRef.current,        { autoAlpha: 0, y: 20  }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.7)
        .fromTo(".cred-item",           { autoAlpha: 0, y: 20  }, { autoAlpha: 1, y: 0, stagger: 0.12 }, 0.85);

      tlRef.current = tl;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (imageReady && tlRef.current) {
      tlRef.current.play();
    }
  }, [imageReady]);

  return (
    <>
      <style>{`
        .chairman-section {
          height: 100svh;
          background: #ffffff;
          display: flex;
          align-items: stretch;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
        }

        .chairman-dot-grid {
          position: absolute;
          inset: 0;
          opacity: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,0.11) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        .chairman-hline {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0,92,159,0.1) 15%,
            rgba(0,92,159,0.1) 85%,
            transparent 100%
          );
          transform-origin: left;
          pointer-events: none;
          z-index: 0;
        }

        .chairman-ghost-text {
          position: absolute;
          left: 160px;
          top: 50%;
          transform: translateY(-55%);
          font-size: clamp(9rem, 18vw, 20rem);
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(0,92,159,0.055);
          letter-spacing: -0.03em;
          white-space: nowrap;
          pointer-events: none;
          z-index: 0;
          user-select: none;
          line-height: 1;
          opacity: 0;
        }

        .chairman-image-bg {
          position: absolute;
          right: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(160deg,
            rgba(0,92,159,0.03) 0%,
            rgba(0,92,159,0.07) 60%,
            rgba(0,92,159,0.04) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        .chairman-vline {
          position: absolute;
          left: 50%;
          top: 8%;
          height: 84%;
          width: 1px;
          background: linear-gradient(180deg,
            transparent 0%,
            rgba(0,92,159,0.13) 25%,
            rgba(0,92,159,0.13) 75%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .chairman-corner-tl,
        .chairman-corner-br {
          position: absolute;
          width: 52px;
          height: 52px;
          pointer-events: none;
          z-index: 2;
          opacity: 0;
        }
        .chairman-corner-tl {
          top: 28px; left: 28px;
          border-top: 1.5px solid rgba(0,92,159,0.3);
          border-left: 1.5px solid rgba(0,92,159,0.3);
        }
        .chairman-corner-br {
          bottom: 28px; right: 28px;
          border-bottom: 1.5px solid rgba(0,92,159,0.3);
          border-right: 1.5px solid rgba(0,92,159,0.3);
        }

        .chairman-accent-dot {
          position: absolute;
          width: 5px; height: 5px;
          background: ${BLUE};
          opacity: 0.15;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }

        .chairman-year {
          position: absolute;
          bottom: 30px; left: 200px;
          font-size: clamp(0.66rem, 0.75vw, 0.74rem);
          letter-spacing: 0.3em;
          color: rgba(0,92,159,0.38);
          z-index: 3;
          pointer-events: none;
          display: flex; align-items: center; gap: 10px;
          opacity: 0;
        }
        .chairman-year::before {
          content: '';
          display: inline-block;
          width: 18px; height: 1px;
          background: rgba(0,92,159,0.38);
        }

        .chairman-inner {
          width: 100%;
          padding: 0 200px;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center;
          gap: clamp(1rem, 3vw, 3rem);
          position: relative;
          z-index: 2;
        }

        .chairman-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(1.5rem, 3vh, 3rem) 0;
          min-width: 0;
        }

        .chairman-image-wrap {
          position: relative;
          height: 100svh;
          min-width: 0;
          opacity: 0;
        }

        @media (max-width: 640px) {
          .chairman-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            padding: 0 24px;
            gap: 0;
          }
          .chairman-text { padding-top: clamp(1rem,4vw,2rem); padding-bottom: 0.5rem; order: 1; }
          .chairman-image-wrap { order: 2; height: 45svh; }
          .chairman-ghost-text { left: 20px; font-size: 7rem; }
          .chairman-image-bg { width: 100%; top: 55%; height: 45%; }
          .chairman-year { left: 24px; }
          .chairman-vline { display: none; }
          .chairman-corner-tl { top: 12px; left: 12px; width: 32px; height: 32px; }
          .chairman-corner-br { bottom: 12px; right: 12px; width: 32px; height: 32px; }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .chairman-inner { padding: 0 80px; gap: 1rem; }
          .chairman-ghost-text { left: 60px; }
          .chairman-year { left: 80px; }
        }
      `}</style>

      <section ref={sectionRef} className={`chairman-section ${playfair.className}`}>

        <div className="chairman-dot-grid" />
        <div className="chairman-hline" />
        <div className="chairman-image-bg" />
        <div className="chairman-vline" />

        <div className="chairman-corner-tl" aria-hidden="true" />
        <div className="chairman-corner-br" aria-hidden="true" />

        <div className="chairman-accent-dot" style={{ top: "16%", left: "47%" }} aria-hidden="true" />
        <div className="chairman-accent-dot" style={{ top: "84%", left: "53%" }} aria-hidden="true" />
        <div className="chairman-accent-dot" style={{ top: "38%", right: "195px" }} aria-hidden="true" />

        <div className="chairman-year" style={{ fontFamily: cinzel.style.fontFamily }} aria-hidden="true">
        
        </div>

        <div className="chairman-inner">

          {/* LEFT: Text */}
          <div className="chairman-text">

            <div ref={labelRef} style={{ opacity: 1, marginBottom: "clamp(0.6rem,1.2vh,1.2rem)" }}>
              <span style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(0.72rem, 0.9vw, 1rem)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: BLUE,
                display: "flex", alignItems: "center", gap: "0.7rem",
              }}>
                <span style={{ width: 30, height: 1, background: BLUE, opacity: 0.5 }} />
                Leadership
              </span>
            </div>

            <h1 ref={titleRef} style={{
              fontFamily: playfair.style.fontFamily,
              fontSize: "clamp(2.8rem, 5.5vw, 7.5rem)",
              fontWeight: 600, lineHeight: 1.0,
              margin: "0 0 clamp(0.8rem,1.5vh,1.5rem)",
              textTransform: "lowercase", opacity: 1,
              paddingBottom: "0.1em", overflow: "visible",
            }}>
              <span style={{ display: "block", color: "#0D0D0D" }}>the hand</span>
              <span style={{
                display: "block",
                background: `linear-gradient(90deg, #0D0D0D 0%, ${BLUE} 70%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                color: "transparent", paddingBottom: "0.12em", overflow: "visible",
              }}>that guides.</span>
            </h1>

            <div ref={dividerRef} style={{
              width: 40, height: 2, background: BLUE,
              marginBottom: "clamp(0.8rem,1.5vh,1.5rem)", transformOrigin: "left",
            }} />

            <div ref={nameRef} style={{ opacity: 1, marginBottom: "clamp(1rem,2vh,2rem)" }}>
              <p style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(1rem, 1.3vw, 1.5rem)",
                fontWeight: 600, margin: 0,
              }}>
                Dr. Thomas George K
                <span style={{
                  fontFamily: playfair.style.fontFamily,
                  color: "#111",
                  marginLeft: 8, fontSize: "0.9em",
                }}>(Thomman)</span>
              </p>
              <p style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(0.72rem, 0.9vw, 0.85rem)",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: BLUE, marginTop: 4,
              }}>
                Chairman &amp; Director
              </p>
            </div>

            {/* Credentials */}
            <div ref={credsRef} style={{
              display: "flex", flexDirection: "column",
              gap: "clamp(0.5rem,0.9vh,0.9rem)",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              paddingTop: "clamp(0.7rem,1.2vh,1.2rem)",
            }}>
              {credentials.map(({ Icon, text }) => (
                <div key={text} className="cred-item" style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "clamp(0.82rem, 0.9vw, 0.95rem)",
                  letterSpacing: "0.06em", color: "#111", opacity: 1,
                }}>
                  <span style={{ color: BLUE, flexShrink: 0 }}><Icon /></span>
                  <span style={{ position: "relative", paddingBottom: 5 }}>
                    {text}
                    <span style={{
                      position: "absolute", left: 0, bottom: 0,
                      width: "100%", height: 1,
                      background: "linear-gradient(90deg, rgba(0,92,159,0.4), transparent)",
                    }} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Image */}
          <div ref={imageRef} className="chairman-image-wrap">
            <div aria-hidden="true" style={{
              position: "absolute", inset: "5% 8%",
              border: "1px solid rgba(0,92,159,0.08)",
              pointerEvents: "none", zIndex: 0,
            }} />
            <div aria-hidden="true" style={{
              position: "absolute", bottom: 0, left: "10%", right: "10%", height: "30%",
              background: "radial-gradient(ellipse at center bottom, rgba(0,92,159,0.1) 0%, transparent 70%)",
              pointerEvents: "none", zIndex: 0,
            }} />
            <Image
              src="/thomman2.png"
              alt="Dr. Thomas George K (Thomman)"
              fill
              priority
              fetchPriority="high"
              onLoad={() => setImageReady(true)}
              className="object-contain object-bottom"
              sizes="(max-width:640px)100vw,(max-width:900px)50vw,44vw"
              style={{ zIndex: 1 }}
            />
          </div>

        </div>
      </section>
    </>
  );
}