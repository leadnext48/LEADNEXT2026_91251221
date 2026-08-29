'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cinzel, playfair } from '@/app/fonts';
import {
  FileText,
  ArrowUpRight,
  GraduationCap,
  Users,
  Briefcase,
  Landmark,
  type LucideIcon,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BLUE = '#005C9F';
const DARK = '#07111C';

type Policy = { label: string; href: string };
type Category = { id: string; title: string; icon: LucideIcon; items: Policy[] };

const p = (label: string, file: string): Policy => ({ label, href: `/policies/${file}` });

/* ── Policy library — files live in public/policies/ ── */
const CATEGORIES: Category[] = [
  {
    id: 'academic',
    title: 'Academic & Research',
    icon: GraduationCap,
    items: [
      p('Academic Integrity Policy', 'academic-integrity-policy.pdf'),
      p('Examination Policy', 'exam-policy.pdf'),
      p('Research Policy', 'research-policy.pdf'),
      p('Faculty Development Policy', 'faculty-development-policy.pdf'),
      p('Mentor–Mentee Policy', 'mentor-mentee-policy.pdf'),
      p('Internship Manual (2024–26)', 'internship-manual-2024-26.pdf'),
    ],
  },
  {
    id: 'student',
    title: 'Student Policies',
    icon: Users,
    items: [
      p('Admission Policy (2024)', 'admission-policy.pdf'),
      p('Anti-Ragging Policy', 'anti-ragging-policy.pdf'),
      p('Code of Conduct Policy', 'code-of-conduct-policy.pdf'),
      p('Scholarship Policy for Students', 'scholarship-policy.pdf'),
      p('Placement Policy', 'placement-policy.pdf'),
      p('Student Handbook (2025–27)', 'student-handbook-2025-27.pdf'),
      p('Policy for Differently Abled Students & Staff', 'differently-abled-policy.pdf'),
      p('Disciplinary Procedures', 'disciplinary-procedures.pdf'),
    ],
  },
  {
    id: 'hr',
    title: 'Human Resources',
    icon: Briefcase,
    items: [
      p('Employee Handbook (2025–26)', 'employee-handbook-2025-26.pdf'),
      p('Recruitment & Selection Policy', 'recruitment-selection-policy.pdf'),
      p('Promotion Policy', 'promotion-policy.pdf'),
      p('Employee Exit Policy', 'employee-exit-policy.pdf'),
      p('Leave Policy', 'leave-policy.pdf'),
      p('Maternity Leave Policy', 'maternity-leave-policy.pdf'),
      p('Paternity Leave Policy', 'paternity-leave-policy.pdf'),
      p('Time & Attendance Policy', 'time-attendance-policy.pdf'),
      p('Welfare Policy', 'welfare-policy.pdf'),
      p('Service (EGRC) Policy', 'service-egrc-policy.pdf'),
    ],
  },
  {
    id: 'governance',
    title: 'Governance & Operations',
    icon: Landmark,
    items: [
      p('Financial Powers & Delegation of Authority', 'financial-powers-and-delegation-policy.pdf'),
      p('IT Policy', 'it-policy.pdf'),
      p('Grievance Redressal Policy', 'grievance-redressal-policy.pdf'),
    ],
  },
];

export default function PoliciesPage() {
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
  const activeCat = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];

  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const libRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* ── Entry + scroll-reveal animations (mirrors the IQAC page) ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (hero) {
        const eyebrow = hero.querySelector('.pol-eyebrow') as HTMLElement | null;
        const title = titleRef.current;
        const sub = hero.querySelector('.pol-hero-sub') as HTMLElement | null;
        if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: -12 });
        if (title) gsap.set(title, { opacity: 0, y: 52 });
        if (sub) gsap.set(sub, { opacity: 0, y: 20 });
        const tl = gsap.timeline({ delay: 0.08, defaults: { ease: 'power3.out' } });
        if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.55 });
        if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.9 }, '-=0.25');
        if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.7 }, '-=0.45');
      }

      const lib = libRef.current;
      if (lib) {
        const hdr = lib.querySelector('.pol-lib-hdr');
        const layout = lib.querySelector('.pol-layout');
        [hdr, layout].forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { opacity: 0, y: i === 0 ? -10 : 32 });
          gsap.to(el, {
            opacity: 1, y: 0, duration: i === 0 ? 0.65 : 0.75, delay: i === 0 ? 0 : 0.15,
            ease: 'power3.out', scrollTrigger: { trigger: lib, start: 'top 78%' },
          });
        });
      }
    });
    return () => ctx.revert();
  }, []);

  /* ── Sliding pill: keep it under the active tab ── */
  const positionPill = () => {
    const sidebar = sidebarRef.current;
    const pill = pillRef.current;
    const activeTab = sidebar?.querySelector('.pol-tab.active') as HTMLElement | null;
    if (!sidebar || !pill || !activeTab) return;
    pill.style.top = activeTab.offsetTop + 'px';
    pill.style.height = activeTab.offsetHeight + 'px';
    pill.style.left = activeTab.offsetLeft + 'px';
    pill.style.width = activeTab.offsetWidth + 'px';
  };
  useLayoutEffect(() => {
    // first placement without the slide transition, then re-enable it
    const pill = pillRef.current;
    if (pill) pill.style.transition = 'none';
    positionPill();
    requestAnimationFrame(() => { if (pill) pill.style.transition = ''; });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useLayoutEffect(() => { positionPill(); }, [active]);
  useEffect(() => {
    const onResize = () => {
      const pill = pillRef.current;
      if (pill) pill.style.transition = 'none';
      positionPill();
      requestAnimationFrame(() => { if (pill) pill.style.transition = ''; });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Animate the document list whenever the category changes ── */
  useEffect(() => {
    const items = panelRef.current?.querySelectorAll('.pol-dl');
    if (items && items.length) {
      gsap.fromTo(items, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' });
    }
  }, [active]);

  return (
    <>
      <style>{`
        /* Hide hero elements before GSAP runs so they animate in cleanly (no flash of un-animated text on first paint) */
        .pol-hero .pol-eyebrow, .pol-hero .pol-hero-title, .pol-hero .pol-hero-sub { opacity: 0; }
        .pol-hero {
          height: 100svh; max-height: 100svh; background: #fff;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
          padding: clamp(4rem, 8vh, 6rem) clamp(1.5rem, 10vw, 9rem) 3.5rem;
          box-sizing: border-box;
        }
        .pol-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(0,92,159,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,92,159,0.04) 1px, transparent 1px);
          background-size: 80px 80px; pointer-events: none; z-index: 0;
        }
        .pol-hero-bg-text {
          position: absolute; right: -0.04em; bottom: -0.16em; font-family: var(--font-cinzel, serif);
          font-size: clamp(9rem, 26vw, 34rem); font-weight: 800; line-height: 1;
          color: rgba(0,92,159,0.03); pointer-events: none; user-select: none; z-index: 0; letter-spacing: -0.06em; white-space: nowrap;
        }
        .pol-hero-inner { position: relative; z-index: 2; max-width: 900px; }
        .pol-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: clamp(0.7rem, 1.5vh, 1.2rem); }
        .pol-hero-title { font-size: clamp(2rem, 5.5vw, 7rem); font-weight: 800; line-height: 0.92; letter-spacing: -0.03em; text-transform: uppercase; margin: 0 0 clamp(1rem, 2vh, 1.6rem); }
        .pol-hero-sub { max-width: 560px; }
        .pol-lib { background: #fff; padding: clamp(3.5rem, 8vh, 7rem) clamp(1.5rem, 10vw, 9rem); }
        .pol-layout { display: grid; grid-template-columns: 300px 1fr; gap: 0; margin-top: clamp(2.5rem, 5vh, 4rem); border: 1px solid rgba(0,92,159,0.09); border-radius: 4px; overflow: hidden; }
        .pol-sidebar { background: #f5f8fc; border-right: 1px solid rgba(0,92,159,0.09); padding: 0.5rem; position: relative; }
        .pol-pill { position: absolute; border-radius: 10px; background: ${BLUE}; pointer-events: none; z-index: 0; transition: top 0.42s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.42s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.42s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.42s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .pol-tab { display: flex; align-items: center; gap: 12px; padding: 1rem; cursor: pointer; border-radius: 10px; transition: color 0.2s ease; border: none; background: transparent; width: 100%; text-align: left; position: relative; z-index: 1; }
        .pol-tab:hover:not(.active) { background: rgba(0,92,159,0.06); }
        .pol-tab.active .pol-tab-label { color: #fff !important; }
        .pol-tab.active .pol-tab-count { color: rgba(255,255,255,0.65) !important; }
        .pol-tab.active .pol-tab-icon { background: rgba(255,255,255,0.18) !important; }
        .pol-tab.active .pol-tab-icon svg { color: #fff !important; stroke: #fff !important; }
        .pol-tab-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(0,92,159,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.25s ease; }
        .pol-panel { background: #fff; padding: 1.8rem 2rem; }
        .pol-panel-header { display: flex; align-items: center; gap: 10px; padding-bottom: 1rem; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(0,92,159,0.08); }
        .pol-dl { display: flex; align-items: center; gap: 14px; padding: 0.9rem 1rem; margin: 0 -0.5rem; border-radius: 6px; text-decoration: none; transition: background 0.2s ease, transform 0.2s ease; }
        .pol-dl:hover { background: rgba(0,92,159,0.05); transform: translateX(4px); }
        .pol-dl:hover .pol-dl-arrow { opacity: 1; transform: translate(0,0); }
        .pol-dl:hover .pol-dl-label { color: ${BLUE}; }
        .pol-dl-icon { width: 34px; height: 34px; border-radius: 8px; background: rgba(0,92,159,0.07); border: 1px solid rgba(0,92,159,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, border-color 0.2s ease; }
        .pol-dl:hover .pol-dl-icon { background: rgba(0,92,159,0.12); border-color: rgba(0,92,159,0.25); }
        .pol-dl-label { flex: 1; transition: color 0.2s ease; }
        .pol-dl-badge { font-size: 0.72rem; padding: 2px 7px; background: rgba(0,92,159,0.07); border: 1px solid rgba(0,92,159,0.2); border-radius: 100px; color: ${BLUE}; font-weight: 700; letter-spacing: 0.06em; font-family: var(--font-cinzel, serif); text-transform: uppercase; white-space: nowrap; }
        .pol-dl-arrow { opacity: 0; transform: translate(-4px, 4px); transition: opacity 0.2s ease, transform 0.2s ease; flex-shrink: 0; }
        .pol-mobile-nav { display: none; }
        .pol-select { width: 100%; padding: 0.9rem 2.5rem 0.9rem 1rem; border: 1px solid rgba(0,92,159,0.2); border-radius: 10px; background-color: #f5f8fc; font-family: var(--font-cinzel, serif); font-size: 0.72rem; font-weight: 700; color: ${BLUE}; text-transform: uppercase; letter-spacing: 0.05em; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23005C9F' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; cursor: pointer; }
        @media (max-width: 900px) {
          .pol-layout { grid-template-columns: 1fr; }
          .pol-sidebar { display: none; }
          .pol-mobile-nav { display: block; margin-bottom: 1rem; }
          .pol-panel { padding: 1.2rem 1.1rem; }
        }
        @media (max-width: 600px) { .pol-hero { padding-bottom: 4rem; } }
      `}</style>

      <div className="overflow-x-hidden">
        {/* HERO */}
        <section ref={heroRef} className="pol-hero">
          <div className="pol-hero-bg-text" aria-hidden="true">POLICIES</div>
          <div className="pol-hero-inner">
            <div className="pol-eyebrow">
              <span style={{ display: 'inline-block', width: 28, height: 1.5, background: BLUE }} />
              <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.66rem, 0.8vw, 0.74rem)', letterSpacing: '0.3em', textTransform: 'uppercase', color: BLUE, fontWeight: 600 }}>
                LEAD College — Institutional Governance
              </span>
            </div>
            <h1 ref={titleRef} className="pol-hero-title" style={{ fontFamily: cinzel.style.fontFamily }}>
              <span style={{ display: 'block', color: '#0D0D0D' }}>Policies &amp;</span>
              <span style={{ display: 'block', background: `linear-gradient(90deg, ${BLUE} 0%, #1e3a8a 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>Regulations.</span>
            </h1>
            <div className="pol-hero-sub">
              <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${BLUE}, #1e3a8a)`, marginBottom: 'clamp(1rem, 2vh, 1.6rem)' }} />
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.88rem, 1.05vw, 1rem)', lineHeight: 1.85, color: '#666', margin: 0 }}>
                A consolidated library of LEAD College&apos;s institutional policies — spanning academic, student, human-resource, and governance matters — that define our standards, safeguard our community, and guide day-to-day operations.
              </p>
            </div>
          </div>
        </section>

        {/* POLICY LIBRARY */}
        <section ref={libRef} className="pol-lib">
          <div className="pol-lib-hdr">
            <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.66rem, 0.78vw, 0.74rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: BLUE, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: 18, height: 1.5, background: BLUE }} />
              Document Library
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(1.3rem, 2.5vw, 2.8rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: DARK, margin: 0, lineHeight: 1.1 }}>
                Institutional Policies.
              </h2>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.78rem, 0.95vw, 0.9rem)', color: '#777', margin: 0, maxWidth: 400, lineHeight: 1.7 }}>
                Browse by category. All documents open in a new tab for viewing or download.
              </p>
            </div>
          </div>

          <div className="pol-mobile-nav">
            <select
              aria-label="Select a policy category"
              className="pol-select"
              value={active}
              onChange={(e) => setActive(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.title} — {c.items.length} document{c.items.length !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="pol-layout">
            <div className="pol-sidebar" ref={sidebarRef}>
              <div className="pol-pill" ref={pillRef} />
              {CATEGORIES.map((c) => {
                const isActive = c.id === active;
                return (
                  <button key={c.id} className={`pol-tab${isActive ? ' active' : ''}`} onClick={() => setActive(c.id)}>
                    <span className="pol-tab-icon">
                      <c.icon size={15} color={BLUE} strokeWidth={1.5} />
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span className="pol-tab-label" style={{ display: 'block', fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.66rem, 0.78vw, 0.72rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#334', marginBottom: 2 }}>{c.title}</span>
                      <span className="pol-tab-count" style={{ display: 'block', fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.68rem, 0.82vw, 0.76rem)', color: '#aaa' }}>{c.items.length} document{c.items.length !== 1 ? 's' : ''}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pol-panel" ref={panelRef}>
              <div className="pol-panel-header">
                <activeCat.icon size={18} color={BLUE} strokeWidth={1.5} />
                <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.7rem, 1vw, 0.9rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: DARK, margin: 0 }}>{activeCat.title}</h3>
                <span style={{ marginLeft: 'auto', fontFamily: cinzel.style.fontFamily, fontSize: '0.74rem', fontWeight: 700, color: 'rgba(0,92,159,0.3)', letterSpacing: '0.08em' }}>
                  {String(activeCat.items.length).padStart(2, '0')} DOCS
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {activeCat.items.map((item) => (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="pol-dl">
                    <span className="pol-dl-icon">
                      <FileText size={14} color={BLUE} strokeWidth={1.6} />
                    </span>
                    <span className="pol-dl-label" style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.78rem, 0.92vw, 0.88rem)', color: '#334', lineHeight: 1.5 }}>
                      {item.label}
                    </span>
                    <span className="pol-dl-badge">PDF</span>
                    <span className="pol-dl-arrow">
                      <ArrowUpRight size={14} color={BLUE} strokeWidth={2} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
