'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { cinzel, playfair } from '@/app/fonts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BLUE = '#005C9F';

const deans = [
  {
    id: 'kgv',
    prefix: 'Dean',
    role: 'Quality Assurance',
    name: 'Dr. K. G. Viswanathan',
    image: "/governing/gv43 - Dr. K G Viswanadhan.jpeg",
    tag: 'Academic Standards',
    description:
      'The Dean – Quality Assurance establishes and sustains a culture of continuous improvement across all academic and administrative functions. The office oversees outcome-based education, academic audits, assessment quality, and performance monitoring to ensure teaching–learning processes remain effective, consistent, and aligned with institutional objectives.',
    description2:
      'Through systematic data analysis, stakeholder feedback, and periodic reviews of student performance, the Dean ensures academic standards are maintained and enhanced. The role also involves developing quality frameworks, institutional benchmarks, and best practices that strengthen academic rigor and operational efficiency.',
    responsibilities: [
      'Outcome-based education implementation and oversight',
      'Academic audits and assessment quality monitoring',
      'Stakeholder feedback analysis and performance reviews',
      'Quality frameworks and institutional benchmarking',
      'Evidence-based decision-making and data governance',
    ],
  },
  {
    id: 'sindhu',
    prefix: 'Dean',
    role: 'Accreditations',
    name: 'Dr. Sindhu R.',
    image: "/governing/gv41 - Dr. Sindhu R.jpeg",
    tag: 'Institutional Credibility',
    description:
      "The Dean – Accreditations leads the institution's efforts to achieve and sustain national and international accreditation standards, strengthening LEAD College's credibility and reputation. The office plans, coordinates, and documents all accreditation-related activities, ensuring compliance with NBA, NAAC, and other regulatory authorities.",
    description2:
      "The role aligns academic processes, curriculum structures, governance systems, and outcome measurements with accreditation standards, while coordinating institutional self-studies and peer review preparations — ensuring quality is treated as an ongoing institutional practice rather than a one-time exercise.",
    responsibilities: [
      'NBA, NAAC, and professional accreditation coordination',
      'Institutional self-study and peer review preparation',
      'Compliance monitoring with statutory and regulatory bodies',
      'Alignment of academic processes with accreditation standards',
      'Continuous quality improvement and compliance tracking',
    ],
  },
  {
    id: 'irshad',
    prefix: 'Associate Dean',
    role: 'Academic Affairs',
    name: 'Dr. Mohammed Irshad',
    image: '/faculty/Irshad.webp',
    tag: 'Academic Excellence',
    description:
      'The Associate Dean – Academic Affairs focuses on academic excellence through effective program delivery, curriculum enrichment, faculty development, and industry integration. The role oversees academic innovation, research initiatives, and the incorporation of experiential learning such as internships, live projects, social immersion, and capstone projects.',
    description2:
      'By ensuring all programs remain contemporary, outcome-oriented, and professionally relevant, the Associate Dean serves as a key driver of the academic quality and intellectual vitality of LEAD College.',
    responsibilities: [
      'Program delivery and curriculum enrichment',
      'Faculty development and academic rigor',
      'Industry integration and academic innovation',
      'Research initiatives and intellectual development',
      'Internships, live projects, social immersion, and capstone oversight',
    ],
  },
  {
    id: 'pramod',
    prefix: 'Associate Dean',
    role: 'Student Affairs',
    name: 'Prof. Pramod',
    image: '/faculty/Pramod.webp',
    tag: 'Student Experience',
    description:
      'The Associate Dean – Student Affairs facilitates the overall student experience and ensures student needs are addressed in a structured and supportive manner. This includes guiding students on institutional policies, ensuring compliance with academic and behavioral standards, and supporting personal and professional development.',
    description2:
      'The role strengthens student engagement, addresses student concerns, and maintains effective communication with parents and guardians — fostering a disciplined, transparent, and student-centric campus environment.',
    responsibilities: [
      'Student experience and holistic development facilitation',
      'Institutional policy guidance and compliance support',
      'Personal and professional development mentoring',
      'Student engagement and concern resolution',
      'Parent and guardian communication management',
    ],
  },
];

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function DeansPage() {
  const heroRef  = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pre-hint GPU for all animated elements — avoids first-frame jank
    gsap.set([
      '.dn-dot-grid', '.dn-corner-tl', '.dn-corner-br',
      '.dn-hline-top', '.dn-hline-mid', '.dn-label',
      titleRef.current, '.dn-divider', introRef.current,
      '.dn-wing-pill', '.dn-quote-block', '.dn-roster-row',
    ], { willChange: 'opacity, transform' });

    // Hide everything that needs to animate in — use opacity only where possible,
    // avoid autoAlpha on complex containers (it triggers reflow via visibility toggle)
    gsap.set([
      '.dn-dot-grid', '.dn-corner-tl', '.dn-corner-br',
      '.dn-label', titleRef.current, introRef.current,
      '.dn-wing-pill', '.dn-quote-block', '.dn-roster-row',
    ], { opacity: 0 });

    gsap.set('.dn-hline-top', { scaleX: 0, transformOrigin: 'left' });
    gsap.set('.dn-hline-mid', { scaleX: 0, transformOrigin: 'left' });
    gsap.set('.dn-divider',   { scaleX: 0, transformOrigin: 'left' });

    gsap.set('.dn-corner-tl',  { x: -12, y: -12 });
    gsap.set('.dn-corner-br',  { x:  12, y:  12 });
    gsap.set(titleRef.current, { y: 44 });
    gsap.set(introRef.current, { y: 28 });
    gsap.set('.dn-label',      { y: -14 });
    gsap.set('.dn-wing-pill',  { y: 14 });
    gsap.set('.dn-quote-block',{ x: 30 });
    gsap.set('.dn-roster-row', { y: 12 });

    const ctx = gsap.context(() => {

      // Single timeline — use opacity + translate only (compositor-only props)
      const tl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: 'power3.out', force3D: true },
      });

      tl.to('.dn-dot-grid',   { opacity: 1, duration: 2.5 }, 0)
        .to('.dn-corner-tl',  { opacity: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .to('.dn-corner-br',  { opacity: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .to('.dn-hline-top',  { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 0.15)
        .to('.dn-hline-mid',  { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0.25)
        .to('.dn-label',      { opacity: 1, y: 0, duration: 0.7 }, 0.35)
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1.0 }, 0.5)
        .to('.dn-divider',    { scaleX: 1, duration: 0.6 }, 0.7)
        .to(introRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.8)
        .to('.dn-wing-pill',  { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 1.0)
        .to('.dn-quote-block',{ opacity: 1, x: 0, duration: 0.9 }, 0.85)
        .to('.dn-roster-row', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 1.1);

      // Dean scroll sections — batch all ScrollTriggers, one ctx per dean
      deans.forEach((d) => {
        // Pre-set scroll targets
        gsap.set(`.dn-img-${d.id}`,  { opacity: 0, x: -40, willChange: 'opacity, transform', force3D: true });
        gsap.set(`.dn-text-${d.id}`, { opacity: 0, x:  40, willChange: 'opacity, transform', force3D: true });
        gsap.set(`.dn-resp-${d.id}`, { opacity: 0, y:  16, willChange: 'opacity, transform', force3D: true });

        const trigger = `.dn-section-${d.id}`;
        const respTrigger = `.dn-resp-list-${d.id}`;

        ScrollTrigger.create({
          trigger,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(`.dn-img-${d.id}`,  { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', force3D: true });
            gsap.to(`.dn-text-${d.id}`, { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', force3D: true });
          },
        });

        ScrollTrigger.create({
          trigger: respTrigger,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.to(`.dn-resp-${d.id}`, {
              opacity: 1, y: 0,
              duration: 0.5, stagger: 0.08,
              ease: 'power2.out', force3D: true,
            });
          },
        });
      });

    });

    return () => {
      ctx.revert();
      // Clean up willChange after animations complete to free compositor layers
      gsap.set([
        '.dn-dot-grid', '.dn-corner-tl', '.dn-corner-br',
        '.dn-hline-top', '.dn-hline-mid', '.dn-label',
        titleRef.current, '.dn-divider', introRef.current,
        '.dn-wing-pill', '.dn-quote-block', '.dn-roster-row',
      ], { willChange: 'auto', clearProps: 'willChange' });
    };
  }, []);

  return (
    <>
      <style>{`
        .dn-hero {
          height: 100svh;
          background: #fff;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .dn-dot-grid {
          position: absolute; inset: 0; opacity: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,0.10) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none; z-index: 0;
          will-change: opacity;
        }

        .dn-hline-top {
          position: absolute; top: 24%; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,92,159,0.07) 15%, rgba(0,92,159,0.07) 85%, transparent);
          transform-origin: left; pointer-events: none; z-index: 0;
          will-change: transform;
        }
        .dn-hline-mid {
          position: absolute; top: 64%; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,92,159,0.07) 15%, rgba(0,92,159,0.07) 85%, transparent);
          transform-origin: left; pointer-events: none; z-index: 0;
          will-change: transform;
        }

        .dn-corner-tl, .dn-corner-br {
          position: absolute; width: 48px; height: 48px;
          pointer-events: none; z-index: 2; opacity: 0;
          will-change: opacity, transform;
        }
        .dn-corner-tl {
          top: 28px; left: 28px;
          border-top: 1.5px solid rgba(0,92,159,0.28);
          border-left: 1.5px solid rgba(0,92,159,0.28);
        }
        .dn-corner-br {
          bottom: 28px; right: 28px;
          border-bottom: 1.5px solid rgba(0,92,159,0.28);
          border-right: 1.5px solid rgba(0,92,159,0.28);
        }

        .dn-hero-inner {
          position: relative; z-index: 3;
          width: 100%;
          padding: 0 clamp(1.5rem, 11vw, 10rem);
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 6vw, 8rem);
          align-items: center;
        }

        .dn-wings-row {
          display: flex; flex-wrap: wrap; gap: 0.55rem;
          margin-top: clamp(1.2rem, 2.2vh, 1.8rem);
        }
        .dn-wing-pill {
          opacity: 0;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 4px 12px;
          border: 1px solid rgba(0,92,159,0.17);
          border-radius: 100px;
          background: rgba(0,92,159,0.03);
          will-change: opacity, transform;
        }

        .dn-section {
          height: 100svh;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        .dn-section-inner {
          position: relative; z-index: 2;
          width: 100%;
          padding: 0 clamp(1.5rem, 10vw, 9rem);
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: clamp(2rem, 5vw, 6rem);
          align-items: center;
        }
        .dn-section-inner.reverse {
          grid-template-columns: 1fr 260px;
        }
        .dn-section-inner.reverse .dn-img-col  { order: 2; }
        .dn-section-inner.reverse .dn-text-col { order: 1; }

        .dn-portrait {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          max-height: 400px;
          border-radius: 14px;
          overflow: hidden;
          background: linear-gradient(135deg, #e8f0f8, #d0e4f5);
          box-shadow: 0 14px 44px rgba(0,92,159,0.11);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          /* Release the fixed 100svh so the stacked content flows instead of
             the flex-centering pushing the "Deans." title up out of view. */
          .dn-hero {
            height: auto;
            min-height: 100svh;
            align-items: flex-start;
            padding: clamp(4.5rem, 11vh, 6.5rem) 0 clamp(2.5rem, 6vh, 4rem);
          }
          .dn-hero-inner {
            grid-template-columns: 1fr;
            padding: 0 1.5rem;
          }
          .dn-corner-tl { top: 12px; left: 12px; width: 30px; height: 30px; }
          .dn-corner-br { bottom: 12px; right: 12px; width: 30px; height: 30px; }
          .dn-section { height: auto; min-height: 100svh; padding: 4rem 0; }
          .dn-section-inner,
          .dn-section-inner.reverse {
            grid-template-columns: 1fr;
            padding: 0 1.5rem;
          }
          .dn-section-inner.reverse .dn-img-col  { order: 1; }
          .dn-section-inner.reverse .dn-text-col { order: 2; }
          .dn-portrait { max-height: 280px; }
        }
      `}</style>

      <div className="bg-white overflow-x-hidden">

        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section ref={heroRef} className="dn-hero">
          <div className="dn-dot-grid" />
          <div className="dn-hline-top" />
          <div className="dn-hline-mid" />
          <div className="dn-corner-tl" aria-hidden="true" />
          <div className="dn-corner-br" aria-hidden="true" />

          {(['01', '02', '03', '04'] as const).map((n, i) => (
            <div
              key={n}
              aria-hidden="true"
              style={{
                position: 'absolute',
                fontFamily: cinzel.style.fontFamily,
                fontSize: '0.52rem',
                letterSpacing: '0.2em',
                color: `rgba(0,92,159,${0.06 + i * 0.018})`,
                fontWeight: 700,
                top: `${18 + i * 18}%`,
                right: 'clamp(1.5rem, 5.5vw, 6rem)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              {n}
            </div>
          ))}

          <div className="dn-hero-inner">

            {/* LEFT */}
            <div>
              <div className="dn-label" style={{ opacity: 0, marginBottom: 'clamp(0.7rem, 1.4vh, 1.3rem)' }}>
                <span style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(0.48rem, 0.72vw, 0.65rem)',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: BLUE,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <span style={{ display: 'inline-block', width: 22, height: 1.5, background: BLUE }} />
                  Academic Leadership
                </span>
              </div>

              <h1
                ref={titleRef}
                style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(2.8rem, 6vw, 7.5rem)',
                  fontWeight: 700,
                  lineHeight: 0.94,
                  margin: '0 0 clamp(0.7rem, 1.4vh, 1.3rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  opacity: 0,
                }}
              >
                <span style={{ display: 'block', color: '#0D0D0D' }}>The</span>
                <span style={{
                  display: 'block',
                  background: `linear-gradient(90deg, #0D0D0D 0%, ${BLUE} 62%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  paddingBottom: '0.06em',
                }}>
                  Deans.
                </span>
              </h1>

              <div
                className="dn-divider"
                style={{
                  width: 44,
                  height: 2,
                  background: BLUE,
                  marginBottom: 'clamp(0.9rem, 1.8vh, 1.6rem)',
                  transformOrigin: 'left',
                }}
              />

              <div ref={introRef} style={{ opacity: 0 }}>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
                  lineHeight: 1.85,
                  color: '#555',
                  maxWidth: 430,
                  marginBottom: 'clamp(1rem, 2vh, 1.8rem)',
                }}>
                  LEAD College is guided by four dedicated academic leaders — two Deans and two Associate Deans — each stewarding a distinct pillar of institutional excellence: Quality Assurance, Accreditations, Academic Affairs, and Student Affairs. Together, they ensure a performance-driven, student-centric academic ecosystem where standards are upheld and futures are shaped.
                </p>
              </div>

              <div className="dn-wings-row">
                {[
                  { label: 'Quality Assurance', num: '01' },
                  { label: 'Accreditations',    num: '02' },
                  { label: 'Academic Affairs',  num: '03' },
                  { label: 'Student Affairs',   num: '04' },
                ].map(({ label, num }) => (
                  <div key={label} className="dn-wing-pill">
                    <span style={{
                      fontFamily: cinzel.style.fontFamily,
                      fontSize: 'clamp(0.38rem, 0.52vw, 0.46rem)',
                      color: 'rgba(0,92,159,0.45)',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                    }}>
                      {num}
                    </span>
                    <span style={{ width: 1, height: 10, background: 'rgba(0,92,159,0.2)', display: 'inline-block' }} />
                    <span style={{
                      fontFamily: cinzel.style.fontFamily,
                      fontSize: 'clamp(0.4rem, 0.58vw, 0.52rem)',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: BLUE,
                      fontWeight: 600,
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="dn-quote-block" style={{ opacity: 0 }}>
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: playfair.style.fontFamily,
                    fontSize: 'clamp(7rem, 14vw, 16rem)',
                    lineHeight: 1,
                    color: 'rgba(0,92,159,0.05)',
                    position: 'absolute',
                    marginTop: '-2.5rem',
                    marginLeft: '-1rem',
                    fontWeight: 700,
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  &ldquo;
                </div>

                <blockquote style={{
                  position: 'relative',
                  zIndex: 1,
                  margin: '0 0 clamp(1.5rem, 3vh, 2.5rem)',
                  paddingLeft: 'clamp(1rem, 1.8vw, 1.6rem)',
                  borderLeft: `3px solid ${BLUE}`,
                }}>
                  <p style={{
                    fontFamily: playfair.style.fontFamily,
                    fontSize: 'clamp(0.88rem, 1.2vw, 1.1rem)',
                    fontStyle: 'normal',
                    lineHeight: 1.72,
                    color: '#333',
                    margin: '0 0 0.9rem',
                  }}>
                    Through continuous monitoring, mentoring, and coordination, the Deans ensure that LEAD maintains high academic standards while nurturing responsible, industry-ready, and value-driven professionals.
                  </p>
                  <footer style={{
                    fontFamily: cinzel.style.fontFamily,
                    fontSize: 'clamp(0.4rem, 0.6vw, 0.55rem)',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: BLUE,
                    fontWeight: 600,
                  }}>
                    Academic Leadership — LEAD College
                  </footer>
                </blockquote>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {deans.map((d, i) => (
                  <div
                    key={d.id}
                    className="dn-roster-row"
                    style={{
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: 'clamp(0.65rem, 1.2vh, 1rem) 0',
                      borderBottom: i < deans.length - 1 ? '1px solid rgba(0,92,159,0.07)' : 'none',
                    }}
                  >
                    <span style={{
                      fontFamily: cinzel.style.fontFamily,
                      fontSize: 'clamp(0.5rem, 0.72vw, 0.64rem)',
                      fontWeight: 700,
                      color: 'rgba(0,92,159,0.28)',
                      width: 22,
                      flexShrink: 0,
                      letterSpacing: '0.05em',
                    }}>
                      0{i + 1}
                    </span>
                    <div>
                      <p style={{
                        fontFamily: cinzel.style.fontFamily,
                        fontSize: 'clamp(0.48rem, 0.7vw, 0.62rem)',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#1a1a1a',
                        margin: 0,
                      }}>
                        {d.name}
                      </p>
                      <p style={{
                        fontFamily: cinzel.style.fontFamily,
                        fontSize: 'clamp(0.4rem, 0.55vw, 0.5rem)',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: BLUE,
                        margin: '2px 0 0',
                      }}>
                        {d.prefix} — {d.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            INDIVIDUAL DEAN SECTIONS
        ═══════════════════════════════════════════ */}
        {deans.map((d, i) => {
          const isReverse = i % 2 === 1;
          return (
            <section
              key={d.id}
              className={`dn-section dn-section-${d.id}`}
              style={{ background: i % 2 === 0 ? '#fff' : '#f8fafd' }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(8rem, 18vw, 22rem)',
                  fontWeight: 800,
                  color: 'rgba(0,92,159,0.03)',
                  top: '50%',
                  right: isReverse ? 'auto' : '-1rem',
                  left: isReverse ? '-1rem' : 'auto',
                  transform: 'translateY(-50%)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                0{i + 1}
              </div>

              <div className={`dn-section-inner${isReverse ? ' reverse' : ''}`}>

                {/* Portrait */}
                <div className={`dn-img-col dn-img-${d.id}`}>
                  <div className="dn-portrait">
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: 3,
                      background: `linear-gradient(180deg, ${BLUE}, #1e3a8a)`,
                      zIndex: 2,
                    }} />
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className="object-cover object-top"
                      sizes="260px"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: -1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'linear-gradient(135deg, #e8f0f8 0%, #d0e4f5 100%)',
                    }}>
                      <span style={{
                        fontFamily: cinzel.style.fontFamily,
                        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                        fontWeight: 700,
                        color: BLUE,
                        opacity: 0.2,
                        letterSpacing: '0.05em',
                      }}>
                        {d.name.split(' ').filter(Boolean).slice(-2).map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.38), transparent)',
                      zIndex: 1,
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '0.9rem 0.9rem 0.9rem 1.1rem',
                      zIndex: 3,
                    }}>
                      <p style={{
                        fontFamily: cinzel.style.fontFamily,
                        fontSize: 'clamp(0.36rem, 0.5vw, 0.46rem)',
                        letterSpacing: '0.26em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.68)',
                        margin: '0 0 3px',
                      }}>
                        {d.prefix}
                      </p>
                      <p style={{
                        fontFamily: playfair.style.fontFamily,
                        fontSize: 'clamp(0.72rem, 1vw, 0.9rem)',
                        fontWeight: 600,
                        color: '#fff',
                        margin: 0,
                        lineHeight: 1.25,
                      }}>
                        {d.name}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    marginTop: '0.7rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '4px 11px',
                    background: '#fff',
                    border: '1px solid rgba(0,92,159,0.13)',
                    borderRadius: 100,
                    boxShadow: '0 2px 10px rgba(0,92,159,0.06)',
                  }}>
                    <span style={{
                      width: 5, height: 5,
                      borderRadius: '50%',
                      background: BLUE,
                      display: 'inline-block',
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: cinzel.style.fontFamily,
                      fontSize: 'clamp(0.36rem, 0.52vw, 0.47rem)',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: BLUE,
                      fontWeight: 600,
                    }}>
                      {d.tag}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className={`dn-text-col dn-text-${d.id}`}>
                  <span style={{
                    fontFamily: cinzel.style.fontFamily,
                    fontSize: 'clamp(0.4rem, 0.58vw, 0.52rem)',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: BLUE,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    marginBottom: 'clamp(0.4rem, 0.8vh, 0.7rem)',
                  }}>
                    <span style={{ width: 14, height: 1.5, background: BLUE, display: 'inline-block', flexShrink: 0 }} />
                    {d.prefix}
                  </span>

                  <h2 style={{
                    fontFamily: cinzel.style.fontFamily,
                    fontSize: 'clamp(1.1rem, 2vw, 2.2rem)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    background: 'linear-gradient(90deg, #000 0%, #1e3a8a 55%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    margin: '0 0 clamp(0.4rem, 0.8vh, 0.7rem)',
                  }}>
                    {d.role}
                  </h2>

                  <div style={{ width: 30, height: 2, background: BLUE, marginBottom: 'clamp(0.7rem, 1.4vh, 1.2rem)' }} />

                  <p style={{
                    fontFamily: playfair.style.fontFamily,
                    fontSize: 'clamp(0.72rem, 0.88vw, 0.84rem)',
                    lineHeight: 1.75,
                    color: '#555',
                    marginBottom: 'clamp(0.5rem, 1vh, 0.8rem)',
                  }}>
                    {d.description}
                  </p>

                  <p style={{
                    fontFamily: playfair.style.fontFamily,
                    fontSize: 'clamp(0.72rem, 0.88vw, 0.84rem)',
                    lineHeight: 1.75,
                    color: '#555',
                    marginBottom: 'clamp(0.8rem, 1.6vh, 1.4rem)',
                  }}>
                    {d.description2}
                  </p>

                  <p style={{
                    fontFamily: cinzel.style.fontFamily,
                    fontSize: 'clamp(0.36rem, 0.52vw, 0.47rem)',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: BLUE,
                    fontWeight: 600,
                    marginBottom: '0.6rem',
                  }}>
                    Key Responsibilities
                  </p>

                  <div className={`dn-resp-list-${d.id}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.42rem' }}>
                    {d.responsibilities.map((r) => (
                      <div key={r} className={`dn-resp-${d.id}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                        <span style={{
                          flexShrink: 0,
                          marginTop: 3,
                          width: 17, height: 17,
                          borderRadius: '50%',
                          background: 'rgba(0,92,159,0.07)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <CheckIcon />
                        </span>
                        <p style={{
                          fontFamily: playfair.style.fontFamily,
                          fontSize: 'clamp(0.69rem, 0.84vw, 0.8rem)',
                          lineHeight: 1.6,
                          color: '#555',
                          margin: 0,
                        }}>
                          {r}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

      </div>
    </>
  );
}