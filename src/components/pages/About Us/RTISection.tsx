"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { playfair, cinzel } from "@/app/fonts";
import Lottie from "lottie-react";

const BLUE = "#005C9F";

const steps = [
  { num: "01", text: "Submit a written request with your Name, Address, Contact Number, and the information sought. No reason is required." },
  { num: "02", text: "Address the signed request to the Public Information Officer, LEAD College (Autonomous), Dhoni P.O. Palakkad, Kerala – 678009." },
  { num: "03", text: "Include the required application fee of ₹10. Document copies are charged at rates fixed by the State Information Commission, Kerala." },
];

const officers = [
  { role: "Appellate Authority",        name: "Dr. Thomas George K.", email: "thomas@lead.ac.in", avatar: "/faculty/Dr. Thomas George K.jpg" },
  { role: "Public Information Officer", name: "Mrs. Yasmin Samad",    email: "yasmin@lead.ac.in", avatar: "/faculty/Yasmin.jpg" },
];

/* ─── Section 1: Hero ───────────────────────────────────────────────────── */
function RTIProcedureSection() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const load = () =>
      fetch("/data.json").then(r => r.json()).then(setAnimationData).catch(() => {});
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(load, { timeout: 2000 });
    } else {
      setTimeout(load, 200);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const gsapPkg = await import("gsap");
      const gsap    = (gsapPkg as any).gsap || (gsapPkg as any).default || gsapPkg;
      if (cancelled) return;

      gsap.timeline({ delay: 0.1 })
        .to(".rti-eyebrow",       { autoAlpha: 1, y: 0, duration: 0.6,  ease: "power3.out" })
        .to(".rti-title",         { autoAlpha: 1, y: 0, duration: 1.0,  ease: "power3.out" }, "-=0.35")
        .to(".rti-title-divider", { autoAlpha: 1, scaleX: 1, duration: 0.5, ease: "power2.out", transformOrigin: "left" }, "-=0.5")
        .to(".rti-intro",         { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.4")
        .to(".rti-note",          { autoAlpha: 1, y: 0, duration: 0.6,  ease: "power3.out" }, "-=0.35");
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="rti-s1">
      <div className="rti-corner rti-tl" aria-hidden="true" />
      <div className="rti-corner rti-tr" aria-hidden="true" />

      <div className="rti-s1-inner">
        <div className="rti-s1-left">
          <div className="rti-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
            <span className="rti-eyebrow-line" />
            Statutory Declaration · RTI Act 2005
          </div>
          <h2 className="rti-title" style={{ fontFamily: cinzel.style.fontFamily }}>
            Right to<br />Information
          </h2>
          <div className="rti-title-divider" />
          <p className="rti-intro" style={{ fontFamily: playfair.style.fontFamily }}>
            Under Section 4(1)(b) of the RTI Act 2005 — ensuring transparency
            and accountability in all college operations and governance.
          </p>
          <div className="rti-note" style={{ marginTop: "clamp(1.2rem,2.4vh,2rem)" }}>
            <p style={{ fontFamily: playfair.style.fontFamily }}>
              For appeals or grievances, contact the Appellate Authority within 30 days
              of receiving the PIO's decision or non-response.
            </p>
          </div>
        </div>

        <div className="rti-vline" aria-hidden="true" />

        {animationData && (
          <motion.div
            className="rti-s1-right"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.45 }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="rti-lottie-wrap">
              <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{ width: "100%", height: "auto" }}
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─── Section 2: Steps + Officers — no animation, plain render ─────────── */
function RTIOfficersSection() {
  return (
    <section className="rti-s2">
      <div className="rti-corner rti-bl" aria-hidden="true" />
      <div className="rti-corner rti-br" aria-hidden="true" />

      <div className="rti-s2-inner">

        {/* LEFT — Steps */}
        <div className="rti-s2-left">
          <div className="rti-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
            <span className="rti-eyebrow-line" />
            How to Apply
          </div>
          <h3 className="rti-s2-proc-title" style={{ fontFamily: cinzel.style.fontFamily }}>
            Request<br />Procedure
          </h3>
          <div className="rti-s2-divider" />
          <p className="rti-s2-desc" style={{ fontFamily: playfair.style.fontFamily }}>
            Filing an RTI request at LEAD College is a straightforward process. Under the RTI Act 2005,
            every citizen has the right to request information from a public authority. No justification
            is needed — simply follow the three steps below to submit your application.
          </p>

          {steps.map((step) => (
            <div key={step.num} className="rti-step">
              <span className="rti-step-num" style={{ fontFamily: cinzel.style.fontFamily }} aria-hidden="true">
                {step.num}
              </span>
              <p className="rti-step-text" style={{ fontFamily: playfair.style.fontFamily }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* VERTICAL DIVIDER — static */}
        <div className="rti-s2-vline-wrap" aria-hidden="true">
          <div className="rti-s2-vline" />
        </div>

        {/* RIGHT — Officers */}
        <div className="rti-s2-right">
          <div className="rti-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
            <span className="rti-eyebrow-line" />
            Officers In-Charge
          </div>
          <h3 className="rti-s2-title" style={{ fontFamily: cinzel.style.fontFamily }}>
            RTI<br />Contacts
          </h3>
          <p className="rti-s2-desc" style={{ fontFamily: playfair.style.fontFamily }}>
            The designated officers listed below are responsible for receiving and processing
            RTI applications on behalf of LEAD College. The Public Information Officer (PIO)
            handles all incoming requests and is obligated to furnish the requested information
            within 30 days. Should you be dissatisfied with the PIO's response — or in the
            event of non-response — you may escalate the matter to the Appellate Authority
            within 30 days of the deadline.
          </p>

          <div className="rti-officers-grid">
            {officers.map((officer) => (
              <div key={officer.name} className="rti-officer">
                <div className="rti-officer-accent" aria-hidden="true" />
                <div className="rti-avatar">
                  <Image
                    src={officer.avatar}
                    alt={officer.name}
                    fill
                    sizes="68px"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="rti-officer-info">
                  <p className="rti-officer-role"  style={{ fontFamily: cinzel.style.fontFamily }}>{officer.role}</p>
                  <p className="rti-officer-name"  style={{ fontFamily: cinzel.style.fontFamily }}>{officer.name}</p>
                  <p className="rti-officer-email" style={{ fontFamily: playfair.style.fontFamily }}>{officer.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Root export ───────────────────────────────────────────────────────── */
export default function RTISection() {
  return (
    <>
      <style>{`
        /* ── S1 hero targets — pre-hidden for GSAP ── */
        .rti-eyebrow,
        .rti-intro,
        .rti-note          { opacity: 0; transform: translateY(16px); }
        .rti-title         { opacity: 0; transform: translateY(20px); }
        .rti-title-divider { opacity: 0; transform: scaleX(0); transform-origin: left; }

        /* ── S2 overrides — undo any hidden state, plain visible ── */
        .rti-s2 .rti-eyebrow { opacity: 1; transform: none; }
        .rti-s2 p,
        .rti-s2 h3,
        .rti-s2 div { opacity: 1; transform: none; }

        /* ── Corners ── */
        .rti-corner { position:absolute; width:40px; height:40px; pointer-events:none; z-index:1; }
        .rti-tl { top:24px;    left:24px;  border-top:1.5px solid rgba(0,92,159,.22);    border-left:1.5px solid rgba(0,92,159,.22); }
        .rti-tr { top:24px;    right:24px; border-top:1.5px solid rgba(0,92,159,.22);    border-right:1.5px solid rgba(0,92,159,.22); }
        .rti-bl { bottom:24px; left:24px;  border-bottom:1.5px solid rgba(0,92,159,.22); border-left:1.5px solid rgba(0,92,159,.22); }
        .rti-br { bottom:24px; right:24px; border-bottom:1.5px solid rgba(0,92,159,.22); border-right:1.5px solid rgba(0,92,159,.22); }

        /* ── Eyebrow ── */
        .rti-eyebrow { display:flex; align-items:center; gap:.7rem; margin-bottom:clamp(1rem,1.8vh,1.5rem); font-size:clamp(.52rem,.7vw,.65rem); letter-spacing:.3em; text-transform:uppercase; color:#005C9F; }
        .rti-eyebrow-line { width:28px; height:1px; background:#005C9F; opacity:.5; flex-shrink:0; }

        /* ── S1 ── */
        .rti-s1 { height:100svh; background:#fff; position:relative; display:flex; align-items:center; overflow:hidden; }
        .rti-s1-inner { width:100%; max-width:1440px; margin:0 auto; padding:0 clamp(2rem,5vw,6rem); display:grid; grid-template-columns:45% auto 1fr; gap:clamp(1.5rem,3vw,3.5rem); align-items:center; }
        .rti-s1-left { min-width:0; }

        .rti-title { font-size:clamp(2.6rem,4.8vw,5rem); font-weight:600; line-height:1; letter-spacing:-.02em; margin:0; background:linear-gradient(90deg,#0d0d0d 0%,#005C9F 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; color:transparent; word-break:keep-all; }
        .rti-title-divider { width:40px; height:2px; background:#005C9F; margin:clamp(1.1rem,2.2vh,1.8rem) 0; }
        .rti-intro { font-size:clamp(.88rem,1.05vw,1rem); line-height:1.9; color:#555; margin:0; }

        .rti-note { padding:clamp(.9rem,1.8vh,1.3rem) clamp(1rem,2vw,1.4rem); border:1px solid rgba(0,92,159,.1); border-left:3px solid #005C9F; border-radius:0 8px 8px 0; background:rgba(0,92,159,.025); }
        .rti-note p { font-size:clamp(.75rem,.9vw,.85rem); line-height:1.75; color:#666; margin:0; }

        .rti-vline { width:1px; height:clamp(200px,38vh,340px); flex-shrink:0; background:linear-gradient(180deg,transparent,rgba(0,92,159,.15) 30%,rgba(0,92,159,.15) 70%,transparent); }
        .rti-s1-right { min-width:0; width:100%; display:flex; align-items:center; justify-content:center; }
        .rti-lottie-wrap { width:100%; max-width:clamp(260px,34vw,500px); position:relative; }

        @media (max-width:768px) {
          .rti-s1 { height:auto; min-height:100svh; padding:5rem 0; }
          .rti-s1-inner { grid-template-columns:1fr; gap:2rem; padding:0 1.5rem; }
          .rti-vline, .rti-s1-right { display:none; }
        }

        /* ── S2 ── */
        .rti-s2 { height:100svh; background:#fff; position:relative; display:flex; align-items:center; overflow:hidden; border-top:1px solid rgba(0,92,159,.08); }
        .rti-s2-inner { width:100%; max-width:1440px; margin:0 auto; padding:0 clamp(2rem,5vw,6rem); display:grid; grid-template-columns:1fr auto 1fr; gap:clamp(1.5rem,3vw,3.5rem); align-items:start; }
        .rti-s2-left, .rti-s2-right { min-width:0; }
        .rti-s2-vline-wrap { display:flex; align-self:stretch; align-items:center; justify-content:center; }
        .rti-s2-vline { width:1px; height:clamp(300px,55vh,500px); flex-shrink:0; background:linear-gradient(180deg,transparent,rgba(0,92,159,.15) 25%,rgba(0,92,159,.15) 75%,transparent); }

        .rti-s2-proc-title,
        .rti-s2-title { font-size:clamp(1.8rem,3.5vw,3.5rem); font-weight:600; line-height:1.05; letter-spacing:-.02em; margin:0 0 clamp(.6rem,1.2vh,1rem); background:linear-gradient(90deg,#0d0d0d 0%,#005C9F 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; color:transparent; word-break:keep-all; }
        .rti-s2-divider { width:40px; height:2px; background:#005C9F; margin:clamp(.8rem,1.6vh,1.4rem) 0 clamp(1rem,2vh,1.6rem); }
        .rti-s2-desc { font-size:clamp(.78rem,.92vw,.88rem); line-height:1.85; color:#666; margin:0 0 clamp(1rem,2vh,1.6rem); }

        .rti-step { display:flex; gap:clamp(.7rem,1.1vw,1.2rem); align-items:flex-start; padding:clamp(.65rem,1.3vh,1.1rem) 0; border-bottom:1px solid rgba(0,92,159,.07); cursor:default; }
        .rti-step:last-child { border-bottom:none; }
        .rti-step-num { font-size:clamp(1.4rem,2.5vw,3rem); font-weight:800; line-height:1; color:transparent; -webkit-text-stroke:1.5px rgba(0,92,159,.3); flex-shrink:0; user-select:none; min-width:2.6ch; transition:-webkit-text-stroke .25s ease; }
        .rti-step:hover .rti-step-num { -webkit-text-stroke:1.5px rgba(0,92,159,.7); }
        .rti-step-text { font-size:clamp(.78rem,1vw,.95rem); line-height:1.8; color:#555; padding-top:.25em; transition:color .25s ease; min-width:0; }
        .rti-step:hover .rti-step-text { color:#222; }

        .rti-officers-grid { display:grid; grid-template-columns:1fr; gap:clamp(.8rem,1.5vh,1.2rem); margin-bottom:clamp(.8rem,1.5vh,1.2rem); }
        .rti-officer { position:relative; overflow:hidden; display:flex; align-items:center; gap:clamp(.9rem,1.8vw,1.4rem); padding:clamp(1rem,2.2vh,1.5rem) clamp(1rem,2vw,1.5rem); background:#fff; border:1px solid rgba(0,92,159,.1); border-radius:10px; transition:border-color .28s ease,box-shadow .28s ease,transform .28s ease; cursor:default; }
        .rti-officer:hover { border-color:rgba(0,92,159,.28); box-shadow:0 8px 28px rgba(0,92,159,.08); transform:translateY(-3px); }
        .rti-officer-accent { position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#005C9F,rgba(255,255,255,.4),#005C9F,transparent); opacity:0; transition:opacity .25s ease; }
        .rti-officer:hover .rti-officer-accent { opacity:1; }

        .rti-avatar { position:relative; width:clamp(50px,5vw,68px); height:clamp(60px,6vw,80px); flex-shrink:0; border-radius:6px; overflow:hidden; background:#f0f4f8; border:1px solid rgba(0,92,159,.08); }
        .rti-officer-info { min-width:0; }
        .rti-officer-role  { font-size:clamp(.42rem,.58vw,.54rem); letter-spacing:.22em; text-transform:uppercase; color:#005C9F; margin:0; }
        .rti-officer-name  { font-size:clamp(.82rem,1.05vw,1rem); font-weight:600; color:#0d0d0d; margin:.2rem 0 .15rem; }
        .rti-officer-email { font-size:clamp(.68rem,.82vw,.78rem); color:#777; margin:0; transition:color .25s ease; }
        .rti-officer:hover .rti-officer-email { color:#005C9F; }

        @media (max-width:900px) {
          .rti-s2 { height:auto; min-height:100svh; padding:5rem 0; }
          .rti-s2-inner { grid-template-columns:1fr; gap:2.5rem; padding:0 1.5rem; }
          .rti-s2-vline-wrap { display:none; }
        }

        @media (prefers-reduced-motion:reduce) {
          .rti-officer, .rti-step-num, .rti-step-text, .rti-officer-accent, .rti-officer-email {
            transition: none !important;
          }
        }
      `}</style>

      <RTIProcedureSection />
      <RTIOfficersSection />
    </>
  );
}