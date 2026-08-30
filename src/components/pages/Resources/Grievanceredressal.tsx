"use client";

/*
  Grievance Redressal — LEAD College
  ─────────────────────────────────────────────────────────────────
  Sections:
    1. Hero (100vh, two-column with Lottie)
    2. Our Approach + Objectives
    3. Grievance Process (4-step 2×2 grid)
    4. Grievance Handling Committee
    5. Anti-Ragging CTA + Downloads
*/

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Lottie from "lottie-react";
import {
  Shield, Users, BookOpen, Scale,
  Mail, Phone, Download, ExternalLink,
  AlertTriangle, FileText,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";

/* ─── PALETTE ─── */
const C = {
  blue:   "#005C9F",
  text:   "#0D0D0D",
  muted:  "#444",
  faint:  "#666",
  border: "#E8EEF4",
} as const;

const G = { blue: "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)" } as const;

const TITLE_GRAD: React.CSSProperties = {
  background: "linear-gradient(90deg, #000000 0%, #1e3a8a 60%, #1e3a8a 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  display: "inline",
};

const SECTIONX = "clamp(1.5rem,6vw,8rem)";
const MAX_W    = 1280;

/* ─── STANDARD SIZES (matching OBT / LOT pages) ─── */
const SZ = {
  eyebrow:    "clamp(.66rem,.8vw,.74rem)",   // was .42rem → .52rem
  heading:    "clamp(1.6rem,3vw,3.8rem)",      // was 1.1rem → 1.6rem
  heroH1:     "clamp(2rem,3.8vw,5rem)",        // hero specific
  body:       "clamp(.9rem,1.05vw,1.02rem)",   // was .86rem → .9rem
  bodySmall:  "clamp(.85rem,.98vw,.95rem)",     // secondary body
  cardTitle:  "clamp(.72rem,.88vw,.84rem)",     // was .62rem → .72rem
  cardBody:   "clamp(.82rem,.96vw,.9rem)",      // was .74rem → .82rem
  label:      "clamp(.66rem,.72vw,.72rem)",     // badge / step labels
} as const;

const SECTION_PAD = "clamp(5rem,10vh,9rem)";   // was 4rem,8vh,7rem

/* ─── ANIMATIONS ─── */
const VP = { once: true, amount: 0.1 };
const FADE_UP: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: .55, delay: d, ease: "easeOut" } }),
};
const STAGGER: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ─── SHARED: EYEBROW ─── */
function Eyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(.7rem,1.4vh,1.1rem)" }}>
      <span style={{ display: "inline-block", width: 24, height: 1.5, background: C.blue, flexShrink: 0 }} />
      <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.eyebrow, letterSpacing: ".22em", textTransform: "uppercase", color: C.blue, fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
}

/* ─── SHARED: SECTION HEADING ─── */
function SectionHeading({ top, bottom }: { top: string; bottom: string }) {
  return (
    <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.heading, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.025em", lineHeight: .95, margin: 0 }}>
      <span style={{ display: "block" }}><span style={TITLE_GRAD}>{top}</span></span>
      <span style={{ display: "block" }}><span style={TITLE_GRAD}>{bottom}</span></span>
    </h2>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. HERO — two-column with Lottie
═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const [animData, setAnimData] = useState<any>(null);

  useEffect(() => {
    /* Reuse the same Lottie as Research Centre — adjust path if needed */
    fetch("/customer.json")
      .then(r => r.json())
      .then(d => setAnimData(d))
      .catch(() => {
        /* fallback: try another animation */
        fetch("/customer.json").then(r => r.json()).then(d => setAnimData(d));
      });
  }, []);

  return (
    <>
      <style>{`
        .griev-hero {
          width: 100%; height: auto; min-height: 100vh;
          background: #ffffff;
          position: relative; overflow: hidden;
          /* top padding clears the sticky header so the title isn't on the
             borderline; grows with content so nothing is clipped on mobile. */
          padding: clamp(5.5rem,11vh,8rem) ${SECTIONX} clamp(3rem,6vh,4.5rem);
          box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center;
        }
        .griev-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,.055) 1px, transparent 1px);
          background-size: 32px 32px; pointer-events: none;
        }
        .griev-hero-wm {
          position: absolute; right: -0.02em; bottom: -0.06em;
          font-size: clamp(5rem,14vw,20rem);
          font-weight: 800; line-height: 1; letter-spacing: -0.06em;
          color: rgba(0,92,159,.028);
          pointer-events: none; user-select: none; white-space: nowrap;
        }
        .griev-hero-inner {
          position: relative; z-index: 2;
          max-width: ${MAX_W}px; margin: 0 auto; width: 100%;
          display: grid;
          grid-template-columns: 1.3fr 0.8fr;
          gap: clamp(2rem,4vw,5rem);
          align-items: center;
        }
        .griev-hero-rule {
          width: 100%; height: 1px;
          background: linear-gradient(90deg,rgba(0,92,159,.15) 0%,transparent 100%);
        }
        @media(max-width:767px){
          .griev-hero-inner { grid-template-columns: 1fr !important; }
          .griev-hero-right { display: none; }
        }
      `}</style>

      <section className="griev-hero">
        <div className="griev-hero-wm" aria-hidden="true">GRIEVANCE</div>

        <div className="griev-hero-inner">
          {/* LEFT — text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
              <Eyebrow label="Student Support — LEAD College" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .08 }}
              style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.heroH1, fontWeight: 800, lineHeight: 1.0, letterSpacing: "-.03em", textTransform: "uppercase", margin: 0 }}>
              <span style={{ display: "block" }}><span style={TITLE_GRAD}>Grievance</span></span>
              <span style={{ display: "block" }}><span style={TITLE_GRAD}>Redressal &</span></span>
              <span style={{ display: "block" }}><span style={TITLE_GRAD}>Anti-Ragging</span></span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: .38, delay: .24 }}
              style={{ width: 36, height: 2, background: G.blue, margin: "clamp(1rem,2vh,1.6rem) 0 clamp(1.2rem,2.4vh,1.8rem)", transformOrigin: "left" }} />

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: .3 }}
              style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.85, color: "#666", maxWidth: 560, margin: "0 0 clamp(2rem,4vh,3rem)" }}>
              LEAD has an open communication system where each student belongs to a mentoring group mentored by a faculty member. The mentor is the guardian of the student in the college — ensuring every concern is heard, addressed, and resolved with care and accountability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .5, delay: .42 }}
              style={{ display: "flex", alignItems: "center", gap: ".85rem", flexWrap: "wrap" }}>
              {[
                { icon: Shield,   label: "Safe Campus" },
                { icon: Users,    label: "Mentor System" },
                { icon: Scale,    label: "Fair Process" },
                { icon: BookOpen, label: "Confidential" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: ".5rem", padding: ".55rem 1rem", border: `1px solid ${C.border}`, borderRadius: 100, background: "#fff" }}>
                  <Icon size={13} color={C.blue} strokeWidth={1.8} />
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.label, letterSpacing: ".14em", textTransform: "uppercase", color: C.muted, fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Lottie */}
          <motion.div
            className="griev-hero-right"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: .3 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {animData
              ? <Lottie animationData={animData} loop autoplay style={{ width: "clamp(260px,32vw,480px)", height: "auto" }} />
              : <div style={{ width: 340, height: 300, borderRadius: 16, background: "rgba(0,92,159,.04)" }} />
            }
          </motion.div>
        </div>
      </section>

      <div className="griev-hero-rule" />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. OUR APPROACH + OBJECTIVES
═══════════════════════════════════════════════════════════════ */
const OBJECTIVES = [
  { icon: Users,  title: "Address Student Matters", body: "Effectively solve various student-related matters through timely intervention and appropriate resolution mechanisms." },
  { icon: Shield, title: "Maintain Discipline",      body: "Ensure discipline and decorum in the college premises while fostering a respectful learning environment." },
  { icon: Scale,  title: "Build Accountability",     body: "Imbibe the feeling of accountability into students by showing that they are responsible for upholding the reputation of the institute." },
];

function ApproachSection() {
  return (
    <>
      <section style={{ background: "#ffffff", padding: `${SECTION_PAD} 0` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${SECTIONX}` }}>
          <div className="griev-approach-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3.5rem,7vw,8rem)", alignItems: "start" }}>

            {/* LEFT */}
            <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP}>
              <Eyebrow label="Our Philosophy" />
              <SectionHeading top="Our" bottom="Approach" />
              <div style={{ width: 36, height: 2, background: G.blue, margin: "clamp(1rem,2vh,1.6rem) 0 clamp(1.4rem,2.8vh,2.2rem)" }} />
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.88, color: C.muted, margin: "0 0 1.3rem" }}>
                LEAD has an open communication system where each student belongs to a mentoring group mentored by a faculty member. The mentor is the guardian of the student in the college.
              </p>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.bodySmall, lineHeight: 1.85, color: C.faint, margin: 0 }}>
                Regular mentor group meetings, individual mentee-mentor meetings, and close contacts with parents develop a strong relationship. This comprehensive approach ensures that students have multiple avenues to voice concerns and receive support throughout their academic journey.
              </p>
            </motion.div>

            {/* RIGHT — objective cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {OBJECTIVES.map(({ icon: Icon, title, body }) => (
                <motion.div key={title} variants={FADE_UP} style={{ display: "flex", gap: "1.1rem", alignItems: "flex-start", padding: "1.35rem 1.4rem", border: `1px solid ${C.border}`, borderRadius: 14, background: "#ffffff", boxShadow: "0 2px 12px rgba(0,92,159,.04)" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: "linear-gradient(135deg,rgba(0,92,159,.08),rgba(30,58,138,.08))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={C.blue} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.cardTitle, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.text, margin: "0 0 .45rem" }}>{title}</p>
                    <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.cardBody, lineHeight: 1.75, color: C.faint, margin: 0 }}>{body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>
      <style>{`@media(max-width:767px){ .griev-approach-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. GRIEVANCE PROCESS — 2×2 grid
═══════════════════════════════════════════════════════════════ */
const STEPS = [
  { num: "01", title: "Contact Your Mentor",            body: "Any grievance is brought to the mentor first and the mentor tries to address it at his/her level through discussion and mediation." },
  { num: "02", title: "College Administrator",           body: "If the case is not within the mentor's control or requires higher intervention, it is forwarded to the college Administrator for further action." },
  { num: "03", title: "Grievance Handling Committee",    body: "If not resolved at Mentor's level, the case is considered by the Grievance Handling Committee headed by the Director for formal resolution." },
  { num: "04", title: "Appeal to Chairman",              body: "Appeals over the decision of Grievance Handling Committee will be with the Chairman, ensuring a fair and transparent final review process." },
];

function ProcessSection() {
  return (
    <>
      <section style={{ background: "#ffffff", padding: `${SECTION_PAD} 0`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${SECTIONX}` }}>

          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} style={{ marginBottom: "clamp(3rem,6vh,5rem)", maxWidth: 640 }}>
            <Eyebrow label="How It Works" />
            <SectionHeading top="Grievance" bottom="Process" />
            <div style={{ width: 36, height: 2, background: G.blue, margin: "clamp(1rem,2vh,1.6rem) 0 clamp(1.2rem,2.4vh,1.8rem)" }} />
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.85, color: C.muted, margin: 0 }}>
              Anyone affected either physically or mentally by the act of anyone else whose act deviated from the specified guidelines in the campus can bring their grievances at a suitable level. Our multi-tiered approach ensures that every concern receives appropriate attention.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER} className="griev-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "1.5rem" }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.num} variants={FADE_UP} custom={i * 0.08} style={{ position: "relative", padding: "2rem 2.1rem", border: `1px solid ${C.border}`, borderRadius: 18, background: "#ffffff", boxShadow: "0 2px 16px rgba(0,92,159,.05)", overflow: "hidden" }}>
                {/* Large watermark number */}
                <div style={{ position: "absolute", top: "-0.1em", right: "0.2em", fontFamily: cinzel.style.fontFamily, fontSize: "clamp(5rem,9vw,11rem)", fontWeight: 800, lineHeight: 1, color: "rgba(0,92,159,.04)", pointerEvents: "none", userSelect: "none" }}>{step.num}</div>
                {/* Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: G.blue, marginBottom: "1.2rem" }}>
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.label, letterSpacing: ".08em", color: "#fff", fontWeight: 800 }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.cardTitle, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.text, margin: "0 0 .65rem", lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.cardBody, lineHeight: 1.78, color: C.muted, margin: 0 }}>{step.body}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
      <style>{`@media(max-width:640px){ .griev-steps-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. GRIEVANCE HANDLING COMMITTEE
═══════════════════════════════════════════════════════════════ */
const COMMITTEE = [
  { name: "Dr. Thomas George K", role: "Committee Member", email: "thomas@lead.ac.in",  phone: "+91 9447146479", avatar: "/faculty/Dr. Thomas George K.jpg" },
  { name: "Ms. Yasmin Samad",    role: "Committee Member", email: "yasmin@lead.ac.in",  phone: "+91 9446533287", avatar: "/faculty/Yasmin.jpg" },
];

function CommitteeSection() {
  return (
    <>
      <section style={{ background: "#ffffff", padding: `${SECTION_PAD} 0`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${SECTIONX}` }}>

          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} style={{ marginBottom: "clamp(2.5rem,5vh,4rem)", maxWidth: 680 }}>
            <Eyebrow label="Point of Contact" />
            <SectionHeading top="Grievance Handling" bottom="Committee" />
            <div style={{ width: 36, height: 2, background: G.blue, margin: "clamp(1rem,2vh,1.6rem) 0 clamp(1.2rem,2.4vh,1.8rem)" }} />
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.85, color: C.muted, margin: 0 }}>
              Our dedicated committee is available to address your concerns and ensure a safe campus environment. Committee members are committed to providing timely and effective resolution to all grievances while maintaining confidentiality and impartiality.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER} style={{ display: "flex", gap: "1.4rem", flexWrap: "wrap" }}>
            {COMMITTEE.map((member) => (
              <motion.div
                key={member.name}
                variants={FADE_UP}
                className="griev-member-card"
                style={{ flex: "1 1 300px", maxWidth: 420, padding: "1.8rem 1.9rem", border: `1px solid ${C.border}`, borderRadius: 18, background: "#ffffff", boxShadow: "0 2px 14px rgba(0,92,159,.05)", display: "flex", flexDirection: "column", gap: "1.2rem", position: "relative", overflow: "hidden" }}>

                <div className="griev-card-accent" aria-hidden="true" />

                {/* Avatar + name row */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <div style={{ position: "relative", width: 66, height: 76, flexShrink: 0, borderRadius: 10, overflow: "hidden", background: "#f0f4f8", border: `1px solid rgba(0,92,159,.08)` }}>
                    <Image src={member.avatar} alt={member.name} fill className="object-cover object-top" sizes="66px" />
                  </div>
                  <div>
                    <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.cardTitle, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.text, margin: 0, lineHeight: 1.3 }}>{member.name}</p>
                    <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.cardBody, color: C.blue, margin: ".25rem 0 0", fontWeight: 600 }}>{member.role}</p>
                  </div>
                </div>

                <div style={{ height: 1, background: C.border }} />

                <div style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}>
                  <a href={`mailto:${member.email}`} style={{ display: "flex", alignItems: "center", gap: ".65rem", textDecoration: "none" }}>
                    <Mail size={14} color={C.blue} strokeWidth={1.8} />
                    <span style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.cardBody, color: C.muted }}>{member.email}</span>
                  </a>
                  <a href={`tel:${member.phone.replace(/\s/g,"")}`} style={{ display: "flex", alignItems: "center", gap: ".65rem", textDecoration: "none" }}>
                    <Phone size={14} color={C.blue} strokeWidth={1.8} />
                    <span style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.cardBody, color: C.muted }}>{member.phone}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      <style>{`
        .griev-card-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #005C9F, rgba(255,255,255,.4), #005C9F, transparent);
          opacity: 0; transition: opacity .3s ease;
        }
        .griev-member-card:hover .griev-card-accent { opacity: 1; }
        .griev-member-card { transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease; }
        .griev-member-card:hover {
          border-color: rgba(0,92,159,.25) !important;
          box-shadow: 0 8px 28px rgba(0,92,159,.1) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. ANTI-RAGGING CTA + DOWNLOADS
═══════════════════════════════════════════════════════════════ */
const DOWNLOADS = [
  { label: "Student Grievance Redressal", icon: FileText },
  { label: "Anti-Ragging Committee",      icon: Shield   },
];

function CtaSection() {
  return (
    <>
      <section style={{ background: "#ffffff", padding: `${SECTION_PAD} 0`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${SECTIONX}` }}>

          <div className="griev-cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,6rem)", alignItems: "start" }}>

            {/* LEFT — Anti-Ragging Agreement */}
            <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP}>
              <Eyebrow label="Take Action" />
              <SectionHeading top="Anti-Ragging" bottom="Agreement" />
              <div style={{ width: 36, height: 2, background: G.blue, margin: "clamp(1rem,2vh,1.6rem) 0 clamp(1.2rem,2.4vh,1.8rem)" }} />

              <div style={{ display: "flex", gap: ".85rem", alignItems: "flex-start", padding: "1.1rem 1.3rem", background: "rgba(220,38,38,.04)", border: "1px solid rgba(220,38,38,.12)", borderRadius: 12, marginBottom: "1.6rem" }}>
                <AlertTriangle size={16} color="#dc2626" strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.bodySmall, lineHeight: 1.75, color: "#b91c1c", margin: 0 }}>
                  Ragging is a punishable offense under Indian law. Any violation will lead to strict disciplinary action including potential expulsion and legal consequences.
                </p>
              </div>

              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.85, color: C.muted, margin: "0 0 1.8rem" }}>
                By submitting this form, you acknowledge that you have read and understood the college's comprehensive anti-ragging policy and agree to abide by its guidelines.
              </p>

              <a
                href="https://forms.zohopublic.com/leadcollegeofmanagement/form/GRIEVANCEREDRESSAL/formperma/vdCKdzPkMhxq2RdB2u0FyNwheayXPV6c10_ita5cqZk"
                target="_blank" rel="noopener noreferrer"
                className="griev-cta-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: ".65rem", padding: ".9rem 1.8rem", background: G.blue, borderRadius: 10, fontFamily: cinzel.style.fontFamily, fontSize: SZ.label, letterSpacing: ".18em", textTransform: "uppercase", color: "#fff", fontWeight: 700, textDecoration: "none", boxShadow: "0 6px 20px rgba(0,92,159,.25)", transition: "opacity .2s ease, transform .2s ease" }}>
                Submit Grievance Form
                <ExternalLink size={13} strokeWidth={2.2} />
              </a>
            </motion.div>

            {/* RIGHT — Downloads */}
            <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0.15}>
              <Eyebrow label="Resources" />
              <SectionHeading top="Download" bottom="Documents" />
              <div style={{ width: 36, height: 2, background: G.blue, margin: "clamp(1rem,2vh,1.6rem) 0 clamp(1.2rem,2.4vh,1.8rem)" }} />
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: SZ.body, lineHeight: 1.85, color: C.muted, margin: "0 0 1.6rem" }}>
                Access the official documents related to student grievance redressal and anti-ragging policies of LEAD College.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {DOWNLOADS.map(({ label, icon: Icon }) => (
                  <button key={label} className="griev-dl-btn" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 1.4rem", border: `1px solid ${C.border}`, borderRadius: 14, background: "#ffffff", boxShadow: "0 2px 10px rgba(0,92,159,.04)", cursor: "pointer", width: "100%", transition: "box-shadow .2s ease, border-color .2s ease" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: "linear-gradient(135deg,rgba(0,92,159,.08),rgba(30,58,138,.08))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={17} color={C.blue} strokeWidth={1.8} />
                      </div>
                      <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: SZ.cardTitle, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.text }}>{label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: ".4rem", fontFamily: cinzel.style.fontFamily, fontSize: SZ.label, letterSpacing: ".14em", textTransform: "uppercase", color: C.blue, fontWeight: 700 }}>
                      <Download size={13} strokeWidth={2} />
                      PDF
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <style>{`
        .griev-cta-btn:hover { opacity: .88; transform: translateY(-1px); }
        .griev-dl-btn:hover { box-shadow: 0 6px 22px rgba(0,92,159,.1) !important; border-color: rgba(0,92,159,.25) !important; }
        @media(max-width:767px){ .griev-cta-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE EXPORT
═══════════════════════════════════════════════════════════════ */
export default function GrievanceRedressalPage() {
  return (
    <div style={{ background: "#ffffff" }}>
      <HeroSection />
      <ApproachSection />
      <ProcessSection />
      <CommitteeSection />
      <CtaSection />
    </div>
  );
}