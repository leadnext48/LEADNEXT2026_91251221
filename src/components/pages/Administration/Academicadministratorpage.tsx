'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cinzel, playfair } from '@/app/fonts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ADMIN_IMAGE   = '/administration/academicadmin.webp';
const MEETING_IMAGE = '/convert/noxzyqwow62n4ligjn6f.webp';

const BLUE = '#005C9F';

/* ── Credential icons ── */
const IconBuilding = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V12h6v9"/>
  </svg>
);
const IconBriefcase = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12.01"/>
  </svg>
);
const IconAcademic = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const credentials = [
  { Icon: IconBuilding,  text: 'Registrar — LEAD College (Autonomous)' },
  { Icon: IconBriefcase, text: '10 Years of Industrial Experience' },
  { Icon: IconAcademic,  text: '22 Years of Teaching Experience' },
];

export default function AcademicAdministratorPage() {
  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const roleRef     = useRef<HTMLDivElement>(null);
  const pillarsRef  = useRef<HTMLDivElement>(null);
  const imgElRef    = useRef<HTMLImageElement>(null);

  // Track whether the hero portrait has loaded
  const [heroImageReady, setHeroImageReady] = useState(false);

  // Run hero animation only once image is ready
  useEffect(() => {
    if (!heroImageReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });

      tl.fromTo(imageRef.current,
          { autoAlpha: 0, y: 60, scale: 0.96 },
          { autoAlpha: 1, y: 0,  scale: 1, duration: 1.4, ease: 'power4.out' })
        .fromTo('.aa-dot-grid',   { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 0)
        .fromTo('.aa-corner-tl',  { autoAlpha: 0, x: -12, y: -12 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .fromTo('.aa-corner-br',  { autoAlpha: 0, x:  12, y:  12 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .fromTo('.aa-hline',      { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0.15)
        .fromTo('.aa-year',       { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.9)
        .fromTo(titleRef.current,   { autoAlpha: 0, y: 40  }, { autoAlpha: 1, y: 0, duration: 1   }, 0.4)
        .fromTo(dividerRef.current, { scaleX: 0             }, { scaleX: 1,          duration: 0.6 }, 0.6)
        .fromTo(nameRef.current,    { autoAlpha: 0, y: 20  }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.7)
        .fromTo('.aa-cred-item',    { autoAlpha: 0, y: 20  }, { autoAlpha: 1, y: 0, stagger: 0.12 }, 0.85);

      if (roleRef.current) {
        gsap.fromTo('.aa-role-img',
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: roleRef.current, start: 'top 72%' } });
        gsap.fromTo('.aa-role-content',
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: roleRef.current, start: 'top 72%' } });
        gsap.fromTo('.aa-role-item',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: '.aa-role-items', start: 'top 78%' } });
      }

      if (pillarsRef.current) {
        gsap.fromTo('.aa-pillar',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power2.out',
            scrollTrigger: { trigger: pillarsRef.current, start: 'top 75%' } });
      }
    });

    return () => ctx.revert();
  }, [heroImageReady]);

  // If the image is already in browser cache (e.g. back-navigation),
  // the onLoad event won't fire — check immediately after mount too.
  useEffect(() => {
    const el = imgElRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setHeroImageReady(true);
    }
  }, []);

  /* ── Data ── */
  const pillars = [
    { num: '01', label: 'Academic Scheduling',      desc: 'Planning and coordinating the academic calendar, timetables, and scheduling of examinations and institutional events.' },
    { num: '02', label: 'Regulatory Compliance',    desc: 'Ensuring adherence to statutory norms, University affiliations, and relevant Government and regulatory body requirements.' },
    { num: '03', label: 'Apex Body Coordination',   desc: 'Conducting and documenting meetings of the Governing Body, Academic Council, Board of Studies, and LDC with full compliance tracking.' },
    { num: '04', label: 'Documentation & Records',  desc: 'Maintaining accurate institutional records, regulatory submissions, and timely information flow across all academic functions.' },
    { num: '05', label: 'Faculty Support',          desc: 'Facilitating faculty professional effectiveness, work-life balance consultations, and developmental guidance.' },
    { num: '06', label: 'Campus Discipline',        desc: 'Upholding operational harmony, campus discipline, and a structured environment conducive to academic excellence.' },
  ];

  return (
    <>
      <style>{`
        .aa-hero-section {
          height: 100svh;
          background: #ffffff;
          display: flex;
          align-items: stretch;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
        }

        .aa-dot-grid {
          position: absolute;
          inset: 0;
          opacity: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,0.11) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        .aa-hline {
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

        .aa-image-bg {
          position: absolute;
          right: 0; top: 0;
          width: 50%; height: 100%;
          background: linear-gradient(160deg,
            rgba(0,92,159,0.03) 0%,
            rgba(0,92,159,0.07) 60%,
            rgba(0,92,159,0.04) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        .aa-vline {
          position: absolute;
          left: 50%;
          top: 8%; height: 84%;
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

        .aa-corner-tl,
        .aa-corner-br {
          position: absolute;
          width: 52px; height: 52px;
          pointer-events: none;
          z-index: 2;
          opacity: 0;
        }
        .aa-corner-tl {
          top: 28px; left: 28px;
          border-top:  1.5px solid rgba(0,92,159,0.3);
          border-left: 1.5px solid rgba(0,92,159,0.3);
        }
        .aa-corner-br {
          bottom: 28px; right: 28px;
          border-bottom: 1.5px solid rgba(0,92,159,0.3);
          border-right:  1.5px solid rgba(0,92,159,0.3);
        }

        .aa-accent-dot {
          position: absolute;
          width: 5px; height: 5px;
          background: #005C9F;
          opacity: 0.15;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }

        .aa-year {
          position: absolute;
          bottom: 30px; left: 200px;
          font-size: clamp(0.45rem, 0.65vw, 0.6rem);
          letter-spacing: 0.3em;
          color: rgba(0,92,159,0.38);
          z-index: 3;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
        }
        .aa-year::before {
          content: '';
          display: inline-block;
          width: 18px; height: 1px;
          background: rgba(0,92,159,0.38);
        }

        .aa-inner {
          width: 100%;
          padding: 0 200px;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: clamp(1rem, 3vw, 3rem);
          position: relative;
          z-index: 2;
        }

        .aa-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(1.5rem, 3vh, 3rem) 0;
          min-width: 0;
        }

        .aa-image-wrap {
          position: relative;
          height: 100svh;
          min-width: 0;
          opacity: 0;
        }

        @media (max-width: 640px) {
          .aa-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            padding: 0 24px;
            gap: 0;
          }
          .aa-text-col   { padding-top: clamp(1rem,4vw,2rem); padding-bottom: 0.5rem; order: 1; }
          .aa-image-wrap { order: 2; height: 45svh; }
          .aa-image-bg   { width: 100%; top: 55%; height: 45%; }
          .aa-year       { left: 24px; }
          .aa-vline      { display: none; }
          .aa-corner-tl  { top: 12px; left: 12px; width: 32px; height: 32px; }
          .aa-corner-br  { bottom: 12px; right: 12px; width: 32px; height: 32px; }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .aa-inner { padding: 0 80px; gap: 1rem; }
          .aa-year  { left: 80px; }
        }
      `}</style>

      <div className="bg-white overflow-x-hidden">

        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section
          ref={sectionRef}
          className={`aa-hero-section ${playfair.className}`}
        >
          <div className="aa-dot-grid" />
          <div className="aa-hline" />
          <div className="aa-image-bg" />
          <div className="aa-vline" />

          <div className="aa-corner-tl" aria-hidden="true" />
          <div className="aa-corner-br" aria-hidden="true" />

          <div className="aa-accent-dot" style={{ top: '16%', left: '47%' }}    aria-hidden="true" />
          <div className="aa-accent-dot" style={{ top: '84%', left: '53%' }}    aria-hidden="true" />
          <div className="aa-accent-dot" style={{ top: '38%', right: '195px' }} aria-hidden="true" />

          <div className="aa-year" aria-hidden="true">LEAD COLLEGE — PALAKKAD</div>

          <div className="aa-inner">

            {/* LEFT: Text */}
            <div className="aa-text-col">

              <h1
                ref={titleRef}
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: 'clamp(2.2rem, 4.5vw, 6.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.0,
                  margin: '0 0 clamp(0.8rem,1.5vh,1.5rem)',
                  textTransform: 'lowercase',
                  opacity: 0,
                  paddingBottom: '0.1em',
                  overflow: 'visible',
                }}
              >
                <span style={{ display: 'block', color: '#0D0D0D' }}>the</span>
                <span style={{
                  display: 'block',
                  background: `linear-gradient(90deg, #0D0D0D 0%, ${BLUE} 70%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  paddingBottom: '0.12em',
                  overflow: 'visible',
                }}>
                  registrar.
                </span>
              </h1>

              <div
                ref={dividerRef}
                style={{
                  width: 40, height: 2,
                  background: BLUE,
                  marginBottom: 'clamp(0.8rem,1.5vh,1.5rem)',
                  transformOrigin: 'left',
                }}
              />

              <div ref={nameRef} style={{ opacity: 0, marginBottom: 'clamp(1rem,2vh,2rem)' }}>
                <p style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(0.75rem, 1.2vw, 1.4rem)',
                  fontWeight: 600,
                  margin: 0,
                }}>
                  Ms. Yasmin Samad
                </p>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.5rem,0.9vh,0.9rem)',
                borderTop: '1px solid rgba(0,0,0,0.08)',
                paddingTop: 'clamp(0.7rem,1.2vh,1.2rem)',
              }}>
                {credentials.map(({ Icon, text }) => (
                  <div
                    key={text}
                    className="aa-cred-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontFamily: cinzel.style.fontFamily,
                      fontSize: 'clamp(0.5rem, 0.85vw, 0.9rem)',
                      letterSpacing: '0.08em',
                      color: '#222',
                      opacity: 0,
                    }}
                  >
                    <span style={{ color: BLUE, flexShrink: 0 }}><Icon /></span>
                    <span style={{ position: 'relative', paddingBottom: 5 }}>
                      {text}
                      <span style={{
                        position: 'absolute',
                        left: 0, bottom: 0,
                        width: '100%', height: 1,
                        background: `linear-gradient(90deg, rgba(0,92,159,0.4), transparent)`,
                      }} />
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT: Portrait */}
            <div ref={imageRef} className="aa-image-wrap">
              <div aria-hidden="true" style={{
                position: 'absolute',
                inset: '5% 8%',
                border: '1px solid rgba(0,92,159,0.08)',
                pointerEvents: 'none',
                zIndex: 0,
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute',
                bottom: 0, left: '10%', right: '10%',
                height: '30%',
                background: 'radial-gradient(ellipse at center bottom, rgba(0,92,159,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
              }} />
              <Image
                ref={imgElRef}
                src={ADMIN_IMAGE}
                alt="Ms. Yasmin Samad — Registrar, LEAD College"
                fill
                priority
                fetchPriority="high"
                className="object-contain object-bottom"
                sizes="(max-width:640px)100vw,(max-width:900px)50vw,44vw"
                style={{ zIndex: 1 }}
                onLoad={() => setHeroImageReady(true)}
              />
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            ROLE OVERVIEW
        ═══════════════════════════════════════════ */}
        <section ref={roleRef} className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="aa-role-img relative">
                <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={MEETING_IMAGE}
                    alt="Registrar at work"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: BLUE }} />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white border border-gray-100 shadow-xl rounded-xl px-6 py-4 z-10">
                  <p className={`${cinzel.className} text-2xl font-bold`} style={{ color: BLUE }}>32+</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.78rem', color: '#555' }}>
                    Years of Combined Experience
                  </p>
                </div>
              </div>

              <div className="aa-role-content space-y-6">
                <div className="space-y-2">
                  <span
                    className={`${cinzel.className} text-xs uppercase tracking-[0.3em] font-semibold`}
                    style={{ color: BLUE }}
                  >
                    Academic Operations & Student Support
                  </span>
                  <h2
                    className={`${cinzel.className} text-3xl md:text-4xl font-bold leading-[1.1] uppercase`}
                    style={{
                      background: 'linear-gradient(90deg, #000000 0%, #1e3a8a 60%, #1e3a8a 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    The Office of the<br /> Registrar
                  </h2>
                </div>

                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', lineHeight: 1.9, color: '#555' }}>
                  The Registrar plays a central role in process facilitation, quality assurance, and institutional compliance, ensuring that the academic and administrative functions of LEAD College operate efficiently, transparently, and in alignment with regulatory and institutional requirements.
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', lineHeight: 1.9, color: '#555' }}>
                  The office is responsible for liaison and coordination with the LEAD Development Council (LDC), the affiliating University, and relevant Government and regulatory bodies, while overseeing the conduct of apex body meetings including the Governing Body, Academic Council, and Board of Studies.
                </p>

                <div className="aa-role-items space-y-3 pt-2">
                  {[
                    'Adherence to academic policies and statutory norms',
                    'Liaison with University, LDC, and regulatory bodies',
                    'Apex body meeting coordination and documentation',
                    'Academic scheduling and institutional reporting',
                    'Faculty support, well-being, and developmental guidance',
                    'Campus discipline and operational harmony',
                  ].map((item) => (
                    <div key={item} className="aa-role-item flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BLUE }} />
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.82rem, 1vw, 0.93rem)', lineHeight: 1.8, color: '#555' }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            OPERATIONAL PILLARS
        ═══════════════════════════════════════════ */}
        <section ref={pillarsRef} className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">

            <div className="text-center mb-16 space-y-3">
              <span
                className={`${cinzel.className} text-xs uppercase tracking-[0.3em] font-semibold`}
                style={{ color: BLUE }}
              >
                Administrative Framework
              </span>
              <h2
                className={`${cinzel.className} text-3xl md:text-4xl font-bold uppercase`}
                style={{
                  background: 'linear-gradient(90deg, #000000 0%, #1e3a8a 60%, #1e3a8a 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                  Key Deliverables of the<br />Registrar&apos;s Office
              </h2>
              <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: BLUE }} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p) => (
                <div
                  key={p.num}
                  className="aa-pillar group relative bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
                >
                  <div className={`${cinzel.className} absolute top-5 right-6 text-5xl font-bold text-gray-100 group-hover:text-blue-50 transition-colors duration-300 select-none leading-none`}>
                    {p.num}
                  </div>
                  <div className="relative z-10 space-y-3">
                    <div className="w-8 h-0.5" style={{ background: BLUE }} />
                    <h3 className={`${cinzel.className} text-base font-bold uppercase tracking-wide`} style={{ color: '#111' }}>
                      {p.label}
                    </h3>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.80rem, 1vw, 0.88rem)', lineHeight: 1.85, color: '#666' }}>
                      {p.desc}
                    </p>
                  </div>
                  <div
                    className="absolute left-0 top-6 bottom-6 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    style={{ background: BLUE }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}