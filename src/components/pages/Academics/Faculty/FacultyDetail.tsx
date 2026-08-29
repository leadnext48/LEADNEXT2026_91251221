// app/faculty/[slug]/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { cinzel, playfair } from "@/app/fonts";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Mail, ExternalLink, Linkedin,
  Briefcase, FlaskConical, GraduationCap, Star, Search,
  Clock, Building2, Microscope,
} from "lucide-react";
import { useParams } from "next/navigation";
import { facultyData } from "./Facultydata";

const BLUE = "#005C9F";

function ensureUrl(raw: string): string {
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}
function isValidUrl(val: string | null | undefined): val is string {
  if (!val) return false;
  if (/^\d+$/.test(val.trim())) return false;
  return /^(https?:\/\/|www\.)/i.test(val.trim());
}
function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, "")
    .split(" ").filter(Boolean).slice(0, 2)
    .map((w) => w[0].toUpperCase()).join("");
}

export default function FacultyDetailPage() {
  const params    = useParams();
  const slug      = params.slug as string;
  const isClient  = typeof window !== "undefined";
  const [imgReady, setImgReady] = useState(false);
  const animFired = useRef(false);

  if (!facultyData || !Array.isArray(facultyData)) {
    return (
      <div style={{ padding: "4rem 6vw", fontFamily: cinzel.style.fontFamily }}>
        <Link href="/faculty" style={{ color: BLUE, display: "flex", alignItems: "center", gap: 8, marginBottom: 32, textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <ArrowLeft size={14} /> Faculty
        </Link>
        <h1 style={{ fontSize: "1.5rem", color: "#c00" }}>Data load error</h1>
      </div>
    );
  }

  const member = facultyData.find((f) => f.slug === slug);
  if (!member) {
    return (
      <div style={{ padding: "4rem 6vw", fontFamily: cinzel.style.fontFamily }}>
        <Link href="/faculty" style={{ color: BLUE, display: "flex", alignItems: "center", gap: 8, marginBottom: 32, textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <ArrowLeft size={14} /> Faculty
        </Link>
        <h1 style={{ fontSize: "1.5rem", color: "#111" }}>Faculty member not found</h1>
      </div>
    );
  }

  const teaching = member.teaching_experience ?? 0;
  const industry = member.industry_experience ?? 0;
  const research = member.research_experience ?? 0;
  const totalExp = teaching + industry + research;
  const maxExp   = Math.max(teaching, industry, research, 1);

  const expStats = ([
    { val: teaching, label: "Teaching", Icon: GraduationCap },
    { val: industry, label: "Industry",  Icon: Building2 },
    { val: research, label: "Research",  Icon: FlaskConical },
  ] as const).filter(({ val }) => val > 0);

  /* ── GSAP fires once after image ready ──────────────────────── */
  useEffect(() => {
    if (!isClient || !imgReady || animFired.current) return;
    animFired.current = true;
    let cancelled = false;

    (async () => {
      const gsapPkg = await import("gsap");
      const gsap    = (gsapPkg as any).gsap || (gsapPkg as any).default || gsapPkg;
      const stPkg   = await import("gsap/ScrollTrigger")
                        .catch(() => import("gsap/dist/ScrollTrigger")) as any;
      const ST      = stPkg.default || stPkg.ScrollTrigger || stPkg;
      gsap.registerPlugin(ST);
      if (cancelled) return;

      gsap.set(".fd-root", { visibility: "visible" });

      gsap.fromTo(".fd-sidebar",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
      );
      gsap.fromTo(".fd-identity > *",
        { opacity: 0, x: 36 },
        { opacity: 1, x: 0, duration: 0.72, stagger: 0.07, ease: "power3.out", delay: 0.12 }
      );
      document.querySelectorAll<HTMLElement>(".fd-card").forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 24 },
          {
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
            opacity: 1, y: 0, duration: 0.55, ease: "power3.out",
          }
        );
      });
    })();

    return () => {
      cancelled = true;
      (async () => {
        const stPkg = await import("gsap/ScrollTrigger")
                        .catch(() => import("gsap/dist/ScrollTrigger")) as any;
        const ST = stPkg.default || stPkg.ScrollTrigger || stPkg;
        ST?.getAll?.().forEach((t: any) => t.kill(true));
      })();
    };
  }, [isClient, imgReady, slug]);

  return (
    <div className="fd-root">
      <div className="fd-layout">

        {/* ══ LEFT STICKY SIDEBAR ═══════════════════════════════ */}
        <aside className="fd-sidebar">
          {member.image ? (
            <Image
              src={member.image}
              alt={`Photo of ${member.full_name}`}
              fill priority
              sizes="(max-width: 768px) 100vw, 38vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              onLoad={() => setImgReady(true)}
            />
          ) : (
            <div className="fd-fallback" ref={(el) => { if (el && !imgReady) setImgReady(true); }}>
              <span style={{ fontFamily: cinzel.style.fontFamily }} className="fd-fallback-initials">
                {getInitials(member.full_name)}
              </span>
            </div>
          )}
          <div className="fd-sidebar-overlay" aria-hidden="true" />
          <div className="fd-sidebar-badge">
            <span style={{ fontFamily: cinzel.style.fontFamily }}>{member.department}</span>
          </div>
        </aside>

        {/* ══ RIGHT SCROLLABLE PANEL ════════════════════════════ */}
        <div className="fd-scroll-panel">

          {/* ── IDENTITY: first viewport ── */}
          <div className="fd-identity">

            <Link href="/faculty" className="fd-back">
              <ArrowLeft size={13} strokeWidth={2} /><span>All Faculty</span>
            </Link>

            <div className="fd-name-wrap">
              <h1 className="fd-name" style={{ fontFamily: cinzel.style.fontFamily }}>
                {member.full_name}
              </h1>
              <p className="fd-designation" style={{ fontFamily: playfair.style.fontFamily }}>
                {member.designation}
              </p>
              {member.institutional_roles && (
                <p className="fd-role" style={{ fontFamily: cinzel.style.fontFamily }}>
                  {member.institutional_roles}
                </p>
              )}
            </div>

            <div className="fd-rule" />

            {/* Social pills */}
            {(member.email || isValidUrl(member.linkedin) || isValidUrl(member.google_scholar) ||
              isValidUrl(member.researchgate_scopus) || member.orcid_id) && (
              <div className="fd-socials">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="fd-social-link" title={member.email}>
                    <Mail size={12} strokeWidth={1.8} /><span>{member.email}</span>
                  </a>
                )}
                {isValidUrl(member.linkedin) && (
                  <a href={ensureUrl(member.linkedin!)} target="_blank" rel="noreferrer" className="fd-social-link">
                    <Linkedin size={12} strokeWidth={1.8} /><span>LinkedIn</span>
                  </a>
                )}
                {isValidUrl(member.google_scholar) && (
                  <a href={ensureUrl(member.google_scholar!)} target="_blank" rel="noreferrer" className="fd-social-link">
                    <Search size={12} strokeWidth={1.8} /><span>Scholar</span>
                  </a>
                )}
                {isValidUrl(member.researchgate_scopus) && (
                  <a href={ensureUrl(member.researchgate_scopus!)} target="_blank" rel="noreferrer" className="fd-social-link">
                    <Microscope size={12} strokeWidth={1.8} /><span>ResearchGate</span>
                  </a>
                )}
                {member.orcid_id && (
                  <a href={`https://orcid.org/${member.orcid_id}`} target="_blank" rel="noreferrer" className="fd-social-link">
                    <ExternalLink size={12} strokeWidth={1.8} /><span>ORCID</span>
                  </a>
                )}
              </div>
            )}

            {/*
              ── EXPERIENCE STATS ────────────────────────────────────
              Uniform inline chips: icon · label · bold number · "yrs"
              All text is the same visual weight — nothing dominates.
              Separated by a faint left border accent, not bubbles.
            */}
            {totalExp > 0 && (
              <div className="fd-exp-row">
                {expStats.map(({ val, label, Icon }) => (
                  <div key={label} className="fd-exp-chip">
                    <div className="fd-exp-chip-icon">
                      <Icon size={13} strokeWidth={1.7} color={BLUE} />
                    </div>
                    <div className="fd-exp-chip-body">
                      <span className="fd-exp-chip-label" style={{ fontFamily: cinzel.style.fontFamily }}>
                        {label}
                      </span>
                      <span className="fd-exp-chip-val" style={{ fontFamily: cinzel.style.fontFamily }}>
                        {val}+ <span className="fd-exp-chip-unit" style={{ fontFamily: playfair.style.fontFamily }}>yrs</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Scroll nudge */}
            <div className="fd-scroll-hint" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M3.5 8.5 7 12l3.5-3.5" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: cinzel.style.fontFamily }}>Scroll for profile</span>
            </div>
          </div>

          {/* ── CREDENTIAL CARDS ── */}
          <div className="fd-credentials">

            <div className="fd-section-label">
              <span className="fd-section-dash" />
              <span style={{ fontFamily: cinzel.style.fontFamily }}>Profile &amp; Credentials</span>
            </div>

            {member.professional_biography && (
              <div className="fd-card">
                <div className="fd-card-hdr">
                  <div className="fd-card-ico"><Star size={14} strokeWidth={1.7} color={BLUE} /></div>
                  <h2 style={{ fontFamily: cinzel.style.fontFamily }}>Professional Biography</h2>
                </div>
                <p className="fd-bio" style={{ fontFamily: playfair.style.fontFamily }}>
                  {member.professional_biography}
                </p>
              </div>
            )}

            <div className="fd-card">
              <div className="fd-card-hdr">
                <div className="fd-card-ico"><GraduationCap size={14} strokeWidth={1.7} color={BLUE} /></div>
                <h2 style={{ fontFamily: cinzel.style.fontFamily }}>Educational Qualifications</h2>
              </div>
              {member.educational_qualifications?.length > 0 ? (
                <div className="fd-qual-list">
                  {member.educational_qualifications.map((q, i) => (
                    <div key={i} className="fd-qual-row">
                      <span className="fd-qual-year" style={{ fontFamily: cinzel.style.fontFamily }}>
                        {q.year || "—"}
                      </span>
                      <div className="fd-qual-body">
                        <div className="fd-qual-degree" style={{ fontFamily: cinzel.style.fontFamily }}>
                          {q.degree}{q.discipline ? ` — ${q.discipline}` : ""}
                        </div>
                        <div className="fd-qual-inst" style={{ fontFamily: playfair.style.fontFamily }}>
                          {q.institution}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="fd-nil">NIL</p>}
            </div>

            <div className="fd-dual-card">
              <div className="fd-card fd-dual-half">
                <div className="fd-card-hdr">
                  <div className="fd-card-ico"><Briefcase size={14} strokeWidth={1.7} color={BLUE} /></div>
                  <h2 style={{ fontFamily: cinzel.style.fontFamily }}>Areas of Expertise</h2>
                </div>
                {member.areas_of_expertise?.length > 0 ? (
                  <div className="fd-tags">
                    {member.areas_of_expertise.map((t, i) => (
                      <span key={i} className="fd-tag" style={{ fontFamily: playfair.style.fontFamily }}>{t}</span>
                    ))}
                  </div>
                ) : <p className="fd-nil">NIL</p>}
              </div>

              <div className="fd-card fd-dual-half">
                <div className="fd-card-hdr">
                  <div className="fd-card-ico"><FlaskConical size={14} strokeWidth={1.7} color={BLUE} /></div>
                  <h2 style={{ fontFamily: cinzel.style.fontFamily }}>Research Interests</h2>
                </div>
                {member.research_interests?.length > 0 ? (
                  <div className="fd-tags">
                    {member.research_interests.map((t, i) => (
                      <span key={i} className="fd-tag fd-tag--alt" style={{ fontFamily: playfair.style.fontFamily }}>{t}</span>
                    ))}
                  </div>
                ) : <p className="fd-nil">NIL</p>}
              </div>
            </div>

            {totalExp > 0 && (
              <div className="fd-card">
                <div className="fd-card-hdr">
                  <div className="fd-card-ico"><Clock size={14} strokeWidth={1.7} color={BLUE} /></div>
                  <h2 style={{ fontFamily: cinzel.style.fontFamily }}>Experience Breakdown</h2>
                </div>
                <div className="fd-exp-bars">
                  {([
                    { label: "Teaching", val: teaching, Icon: GraduationCap },
                    { label: "Industry", val: industry, Icon: Building2 },
                    { label: "Research", val: research, Icon: FlaskConical },
                  ] as const).map(({ label, val, Icon }) => (
                    <div key={label} className="fd-bar-row">
                      <div className="fd-bar-lbl">
                        <Icon size={12} strokeWidth={1.6} color={BLUE} />
                        <span style={{ fontFamily: cinzel.style.fontFamily }}>{label}</span>
                      </div>
                      <div className="fd-bar-track">
                        <div className="fd-bar-fill"
                          style={{ width: val > 0 ? `${Math.min((val / maxExp) * 100, 100)}%` : "0%" }} />
                      </div>
                      <span className="fd-bar-yrs" style={{ fontFamily: cinzel.style.fontFamily }}>
                        {val > 0 ? `${val} yrs` : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        /*
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CRITICAL: Do NOT use a bare * { } reset here.
          Styles inside a Next.js <style> tag injected from a
          component are global — they bleed onto every element on
          the page including the header and footer, destroying their
          padding and spacing. Only scope to .fd-* classes.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        */
        .fd-root *,
        .fd-root *::before,
        .fd-root *::after {
          box-sizing: border-box;
        }

        .fd-root {
          background: #fff;
          width: 100%;
          visibility: visible;
          /* No min-height / height — let the global page layout (body flex-col)
             control document height. Setting min-height:100vh here would squish
             the fixed ScrollHeader and compress the footer. */
        }

        .fd-layout {
          display: flex;
          align-items: flex-start; /* required for position:sticky to work in flex */
          width: 100%;
        }

        /* ── LEFT STICKY SIDEBAR ──────────────────────────────── */
        .fd-sidebar {
          position: sticky;
          top: 0;
          flex-shrink: 0;
          width: 38%;
          height: 100svh;
          overflow: hidden;
          background: linear-gradient(155deg, #cfe1f5 0%, #bfdbfe 100%);
          opacity: 1; /* GSAP reveals */
        }
        .fd-sidebar-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(to bottom, transparent 55%, rgba(5,20,40,0.62) 100%);
        }
        .fd-sidebar-badge {
          position: absolute;
          bottom: 22px;
          left: 22px;
          z-index: 2;
          background: rgba(255,255,255,0.13);
          border: 1px solid rgba(255,255,255,0.28);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #fff;
          font-size: clamp(0.66rem, 0.8vw, 0.74rem);
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
        }
        .fd-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        }
        .fd-fallback-initials {
          font-size: clamp(5rem, 11vw, 10rem);
          font-weight: 900;
          color: ${BLUE};
          opacity: 0.28;
          letter-spacing: 0.06em;
          user-select: none;
        }

        /* ── RIGHT PANEL ──────────────────────────────────────── */
        .fd-scroll-panel {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        /* ── IDENTITY BLOCK ───────────────────────────────────── */
        .fd-identity {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(12px, 1.6vh, 20px);
          padding: clamp(2.5rem, 5vh, 5rem) clamp(2rem, 4.5vw, 5rem);
          border-bottom: 1px solid rgba(0,92,159,.08);
        }
        .fd-identity > * { opacity: 1; } /* GSAP stagger reveals */

        .fd-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: ${BLUE};
          text-decoration: none;
          font-family: ${cinzel.style.fontFamily};
          font-size: clamp(0.66rem, 0.82vw, 0.74rem);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.65;
          transition: gap 0.2s, opacity 0.2s;
          align-self: flex-start;
        }
        .fd-back:hover { gap: 12px; opacity: 1; }

        .fd-name-wrap { display: flex; flex-direction: column; gap: 6px; }

        .fd-name {
          font-size: clamp(2rem, 4.5vw, 4.2rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          background: linear-gradient(92deg, #0a0a0a 0%, ${BLUE} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          margin: 0;
          padding: 0;
        }
        .fd-designation {
          font-size: clamp(0.88rem, 1.15vw, 1.05rem);
          color: #374151;
          font-weight: 500;
          font-style: normal;
          line-height: 1.4;
          margin: 0;
          padding: 0;
        }
        .fd-role {
          font-size: clamp(0.66rem, 0.78vw, 0.74rem);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: ${BLUE};
          font-weight: 700;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }

        .fd-rule {
          width: 40px;
          height: 2px;
          flex-shrink: 0;
          background: linear-gradient(90deg, ${BLUE}, #1e3a8a);
          border-radius: 1px;
        }

        /* Social pills */
        .fd-socials { display: flex; flex-wrap: wrap; gap: 6px; }
        .fd-social-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 13px;
          border-radius: 100px;
          background: rgba(0,92,159,.06);
          border: 1px solid rgba(0,92,159,.15);
          color: ${BLUE};
          text-decoration: none;
          font-family: ${cinzel.style.fontFamily};
          font-size: clamp(0.66rem, 0.78vw, 0.74rem);
          font-weight: 600;
          letter-spacing: 0.06em;
          max-width: 240px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .fd-social-link:hover { background: ${BLUE}; border-color: ${BLUE}; color: #fff; }

        /*
          ── EXPERIENCE ROW ─────────────────────────────────────────
          Compact inline chips, uniform text sizing throughout.
          Icon on left, then "Teaching · 11+ yrs" on one line.
          No bubble border, separated by a left accent bar — clearly
          different from the social pills but not oversized.
        */
        .fd-exp-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 4px;
        }
        .fd-exp-chip {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 14px 9px 10px;
          background: rgba(0,92,159,.04);
          border: 1px solid rgba(0,92,159,.11);
          border-left: 3px solid ${BLUE};
          border-radius: 8px;
        }
        .fd-exp-chip-icon {
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          background: rgba(0,92,159,.09);
          border-radius: 6px;
          flex-shrink: 0;
        }
        .fd-exp-chip-body {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .fd-exp-chip-label {
          font-size: clamp(0.66rem, 0.7vw, 0.72rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b7280;
          line-height: 1;
        }
        .fd-exp-chip-val {
          font-size: clamp(0.82rem, 1vw, 0.94rem);
          font-weight: 800;
          color: ${BLUE};
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .fd-exp-chip-unit {
          font-size: 0.78em;
          font-weight: 500;
          color: #9ca3af;
          letter-spacing: 0.02em;
        }

        /* Scroll hint */
        .fd-scroll-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          color: ${BLUE};
          opacity: 0.48;
          font-size: clamp(0.66rem, 0.72vw, 0.72rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ── CREDENTIALS SECTION ──────────────────────────────── */
        .fd-credentials {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vh, 20px);
          padding: clamp(2.5rem, 4.5vh, 4rem) clamp(2rem, 4.5vw, 5rem) clamp(3rem, 5vh, 5rem);
          background: #fafbfd;
          border-top: 1px solid rgba(0,92,159,.06);
        }
        .fd-section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(0.66rem, 0.74vw, 0.74rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${BLUE};
          font-weight: 700;
          margin-bottom: 4px;
        }
        .fd-section-dash {
          display: inline-block;
          width: 22px;
          height: 1.5px;
          background: ${BLUE};
          flex-shrink: 0;
        }

        .fd-card {
          background: #fff;
          border: 1px solid rgba(0,92,159,.08);
          border-radius: 14px;
          padding: clamp(18px, 2.2vw, 28px);
          box-shadow: 0 1px 10px rgba(0,92,159,.04);
          opacity: 1; /* GSAP scroll-triggered */
        }
        .fd-card-hdr {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: clamp(12px, 1.5vh, 18px);
          padding-bottom: clamp(10px, 1.2vh, 14px);
          border-bottom: 1px solid rgba(0,92,159,.06);
        }
        .fd-card-ico {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          flex-shrink: 0;
          background: rgba(0,92,159,.07);
          border: 1px solid rgba(0,92,159,.12);
          display: grid;
          place-items: center;
        }
        .fd-card-hdr h2 {
          font-size: clamp(0.8rem, 1.1vw, 1rem);
          font-weight: 700;
          color: #0f1115;
          letter-spacing: 0.01em;
          margin: 0;
          padding: 0;
        }

        .fd-bio {
          font-size: clamp(0.84rem, 0.98vw, 0.96rem);
          line-height: 1.9;
          color: #374151;
          text-align: justify;
          margin: 0;
        }

        .fd-qual-list { display: flex; flex-direction: column; gap: 12px; }
        .fd-qual-row  { display: flex; gap: 12px; align-items: flex-start; }
        .fd-qual-year {
          font-size: clamp(0.64rem, 0.76vw, 0.72rem);
          font-weight: 700;
          color: ${BLUE};
          min-width: 44px;
          flex-shrink: 0;
          padding-top: 2px;
          letter-spacing: 0.04em;
        }
        .fd-qual-body { display: flex; flex-direction: column; gap: 2px; }
        .fd-qual-degree {
          font-size: clamp(0.76rem, 0.92vw, 0.88rem);
          font-weight: 700;
          color: #0f1115;
          line-height: 1.3;
          margin: 0;
        }
        .fd-qual-inst {
          font-size: clamp(0.68rem, 0.8vw, 0.76rem);
          color: #6b7280;
          line-height: 1.5;
          margin: 0;
        }

        .fd-dual-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(10px, 1.5vw, 16px);
        }

        .fd-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .fd-tag {
          display: inline-block;
          background: rgba(0,92,159,.06);
          border: 1px solid rgba(0,92,159,.14);
          color: ${BLUE};
          font-size: clamp(0.64rem, 0.78vw, 0.74rem);
          padding: 4px 12px;
          border-radius: 100px;
          line-height: 1.5;
        }
        .fd-tag--alt {
          background: rgba(30,58,138,.05);
          border-color: rgba(30,58,138,.15);
          color: #1e3a8a;
        }

        .fd-nil {
          font-size: clamp(0.72rem, 0.84vw, 0.82rem);
          color: #9ca3af;
          font-style: italic;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .fd-exp-bars  { display: flex; flex-direction: column; gap: 12px; }
        .fd-bar-row   { display: flex; align-items: center; gap: 10px; }
        .fd-bar-lbl   {
          display: flex;
          align-items: center;
          gap: 5px;
          width: 90px;
          flex-shrink: 0;
          font-size: clamp(0.64rem, 0.76vw, 0.74rem);
          color: #374151;
        }
        .fd-bar-track {
          flex: 1;
          height: 5px;
          background: rgba(0,92,159,.10);
          border-radius: 3px;
          overflow: hidden;
        }
        .fd-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, ${BLUE}, #1e3a8a);
          border-radius: 3px;
          transition: width 1.1s ease;
        }
        .fd-bar-yrs {
          width: 48px;
          flex-shrink: 0;
          text-align: right;
          font-size: clamp(0.64rem, 0.76vw, 0.72rem);
          color: ${BLUE};
          font-weight: 700;
        }

        /* ══ RESPONSIVE ══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .fd-sidebar { width: 42%; }
          .fd-dual-card { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .fd-layout { flex-direction: column; }
          .fd-sidebar {
            position: relative;
            width: 100%;
            height: 60vw;
            max-height: 420px;
          }
          .fd-identity {
            min-height: auto;
            padding: 2rem 1.5rem 2.5rem;
            gap: 14px;
          }
          .fd-name { font-size: clamp(2rem, 8vw, 3rem) !important; }
          .fd-credentials { padding: 2rem 1.5rem 3rem; }
          .fd-dual-card { grid-template-columns: 1fr; }
          .fd-exp-row { gap: 7px; }
        }

        @media (max-width: 480px) {
          .fd-name { font-size: clamp(1.8rem, 9vw, 2.6rem) !important; }
          .fd-social-link { font-size: 0.74rem; padding: 5px 10px; }
          .fd-exp-chip { padding: 7px 11px 7px 8px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .fd-root         { visibility: visible !important; }
          .fd-sidebar      { opacity: 1 !important; transform: none !important; }
          .fd-identity > * { opacity: 1 !important; transform: none !important; }
          .fd-card         { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}