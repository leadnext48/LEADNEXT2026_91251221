'use client';

/*
  WhyChooseLead.tsx
  Changes from original:
  1. HeroIllustration removed entirely (ref + JSX)
  2. Stats (95%+, 200+, 10+) removed from center-left content
  3. Tiny orbital particles scattered across the full black section (CSS only, zero JS)
  4. Lottie size reduced so rows stay compact
*/

import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { cinzel, playfair } from '@/app/fonts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users, BookOpen, Briefcase, FlaskConical,
  Globe, TrendingUp, ArrowDownCircle, Sparkles,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);
}

/* ── Tokens ──────────────────────────────────────────────────────────────── */
const BLACK    = '#080808';
const WHITE    = '#ffffff';
const NAVY     = '#0a2463';
const HEADER_H = 64;

const navyGrad: React.CSSProperties = {
  background: 'linear-gradient(90deg,#0D0D0D 0%,#0a2463 62%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

const CARDS = [
  { n: '01', icon: Users,        title: 'Expert Faculty',         body: 'Guided by Guinness World Record holder Dr. Thomas George K. — mentors focused on real-world projects and experiential learning that prepares you from day one.' },
  { n: '02', icon: BookOpen,     title: 'Modern Curriculum',      body: 'Digital Marketing, Analytics, Robotics, and AI built into every programme. An Entrepreneurial MBA that evolves with industry, never behind it.' },
  { n: '03', icon: Briefcase,    title: 'Industry Partnerships',  body: 'Live collaborations with 200+ companies including ITC, Deloitte, and Wipro — real internships and client projects that build your portfolio.' },
  { n: '04', icon: FlaskConical, title: 'Research Opportunities', body: 'LEAD Research Centre, an approved Ph.D. hub under KUFOS, driving impactful academic and applied industry research initiatives.' },
  { n: '05', icon: Globe,        title: 'Global Exposure',        body: 'A multicultural community spanning 10+ nations. International projects and global faculty partnerships from your very first semester.' },
  { n: '06', icon: TrendingUp,   title: 'Career Support',         body: '95%+ placement record. Training, mentorship, alumni network, and a startup incubation cell — graduate fully industry-ready.' },
];

/* ══════════════════════════════════════════════════════════════════════════
   SCATTERED PARTICLES — pure CSS
══════════════════════════════════════════════════════════════════════════ */
const PARTICLES: Array<{
  x: string; y: string;
  r: number; opacity: number;
  duration: number; delay: number;
  orbitR: number;
}> = [
  { x: '8%',  y: '12%', r: 1.5, opacity: 0.30, duration: 12, delay: 0,   orbitR: 6  },
  { x: '15%', y: '28%', r: 1.0, opacity: 0.20, duration: 16, delay: 2,   orbitR: 4  },
  { x: '6%',  y: '45%', r: 2.0, opacity: 0.18, duration: 20, delay: 5,   orbitR: 8  },
  { x: '22%', y: '8%',  r: 1.0, opacity: 0.25, duration: 14, delay: 1,   orbitR: 5  },
  { x: '32%', y: '18%', r: 1.5, opacity: 0.15, duration: 18, delay: 7,   orbitR: 7  },
  { x: '78%', y: '10%', r: 1.5, opacity: 0.28, duration: 15, delay: 3,   orbitR: 6  },
  { x: '88%', y: '22%', r: 1.0, opacity: 0.22, duration: 11, delay: 0.5, orbitR: 4  },
  { x: '68%', y: '15%', r: 2.0, opacity: 0.16, duration: 22, delay: 6,   orbitR: 9  },
  { x: '92%', y: '38%', r: 1.0, opacity: 0.20, duration: 17, delay: 4,   orbitR: 5  },
  { x: '75%', y: '32%', r: 1.5, opacity: 0.14, duration: 19, delay: 8,   orbitR: 7  },
  { x: '4%',  y: '62%', r: 1.0, opacity: 0.18, duration: 13, delay: 2.5, orbitR: 4  },
  { x: '12%', y: '72%', r: 1.5, opacity: 0.24, duration: 21, delay: 1,   orbitR: 6  },
  { x: '94%', y: '58%', r: 1.0, opacity: 0.20, duration: 16, delay: 3.5, orbitR: 5  },
  { x: '86%', y: '68%', r: 1.5, opacity: 0.16, duration: 24, delay: 0,   orbitR: 8  },
  { x: '38%', y: '72%', r: 1.0, opacity: 0.18, duration: 18, delay: 4,   orbitR: 5  },
  { x: '55%', y: '80%', r: 1.5, opacity: 0.22, duration: 14, delay: 6,   orbitR: 6  },
  { x: '72%', y: '75%', r: 1.0, opacity: 0.16, duration: 20, delay: 2,   orbitR: 4  },
  { x: '48%', y: '14%', r: 1.0, opacity: 0.20, duration: 15, delay: 5,   orbitR: 5  },
  { x: '25%', y: '55%', r: 2.5, opacity: 0.10, duration: 26, delay: 3,   orbitR: 10 },
  { x: '80%', y: '50%', r: 2.5, opacity: 0.10, duration: 28, delay: 1,   orbitR: 10 },
];

function ScatteredParticles() {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, zIndex: 2,
      pointerEvents: 'none', userSelect: 'none', overflow: 'hidden',
    }}>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="wcl-particle"
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width:  p.r * 2,
            height: p.r * 2,
            borderRadius: '50%',
            background: 'white',
            opacity: p.opacity,
            ['--pr' as any]: `${p.orbitR}px`,
            animationDuration: `${p.duration}s`,
            animationDelay:    `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function WhyChooseLead() {
  const containerRef     = useRef<HTMLDivElement>(null);
  const cornerTLRef      = useRef<HTMLDivElement>(null);
  const cornerBRRef      = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const titleWrapRef     = useRef<HTMLDivElement>(null);

  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('/Back to school!.json')
      .then(r => r.json())
      .then(d => setAnimationData(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const SCROLL_DIST = window.innerHeight * 5;

      gsap.set(titleWrapRef.current, {
        transformPerspective: 1100,
        transformOrigin: '50% 50%',
        force3D: true,
        opacity: 0,
        scale: 0.12,
      });
      gsap.set('.wcl-overlay', { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:       containerRef.current,
          start:         `top top+=${HEADER_H}`,
          end:           `+=${SCROLL_DIST}`,
          pin:           true,
          pinSpacing:    true,
          scrub:         1,
          anticipatePin: 1,
        },
      });

      tl.to(
        [cornerTLRef.current, cornerBRRef.current],
        { opacity: 0, duration: 0.16, ease: 'power2.inOut' }, 0.02);
      tl.to(
        centerContentRef.current,
        { opacity: 0, duration: 0.14, ease: 'power2.out' }, 0.02);
      tl.to(
        titleWrapRef.current,
        { opacity: 1, duration: 0.06, ease: 'none' }, 0.16);
      tl.fromTo(
        titleWrapRef.current,
        { scale: 0.12 },
        { scale: 15, duration: 0.58, ease: 'power2.inOut' }, 0.18);
      tl.to(
        '.wcl-overlay',
        { opacity: 1, duration: 0.22, ease: 'power1.in' }, 0.58);
      tl.to(
        titleWrapRef.current,
        { opacity: 0, duration: 0.10, ease: 'power1.inOut' }, 0.60);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const GAP_TOP    = `calc(${HEADER_H}px + max(1rem, 2.5vh))`;
  const GAP_BOTTOM = 'clamp(5rem, 11vh, 7rem)';
  const SIDE_PAD   = 'clamp(1.2rem, 5vw, 5.5rem)';

  return (
    <div style={{ overflowX: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes wclParticleFloat {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(var(--pr), calc(var(--pr) * -0.6)); }
          50%  { transform: translate(calc(var(--pr) * 0.4), var(--pr)); }
          75%  { transform: translate(calc(var(--pr) * -0.8), calc(var(--pr) * 0.3)); }
          100% { transform: translate(0, 0); }
        }
        .wcl-particle {
          animation: wclParticleFloat linear infinite;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
        }
        .wcl-corner-line1,
        .wcl-corner-line2 {
          display: block;
          font-weight: 900;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          line-height: 0.91;
          font-size: clamp(2.6rem, 5.5vw, 7rem);
        }
        .wcl-corner-line1 { color: #ffffff; }
        .wcl-corner-line2 {
          background: linear-gradient(90deg, #ffffff 0%, rgba(147,197,253,0.68) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @media (max-width:900px)  { .wcl-corner-line1,.wcl-corner-line2 { font-size: clamp(2.4rem,4.8vw,5rem); } }
        @media (max-width:700px)  { .wcl-corner-line1,.wcl-corner-line2 { font-size: clamp(2rem,5.2vw,3.6rem); } }
        @media (max-width:600px)  { .wcl-corner-line1,.wcl-corner-line2 { font-size: clamp(1.8rem,6.5vw,2.8rem); } }
        @media (max-height:560px) { .wcl-corner-line1,.wcl-corner-line2 { font-size: clamp(1.2rem,3.8vw,2rem); } }

        .wcl-center-content {
          position: absolute;
          left: clamp(1.2rem, 5vw, 5.5rem);
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          max-width: clamp(240px, 33vw, 460px);
        }
        @media (max-height:560px) { .wcl-center-content { display:none; } }
        @media (max-width:600px)  { .wcl-center-content { display:none; } }

        @keyframes wclBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
        .wcl-scroll-hint { animation: wclBounce 2.2s ease-in-out infinite; }

        /* ── [B] section layout ── */
        .wcl-section-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(1.2rem, 2.5vw, 2.5rem);
          align-items: start;
          margin-bottom: clamp(0.55rem, 1vw, 0.9rem);
        }
        /* Lottie column — constrained so it doesn't push rows apart */
        .wcl-header-lottie {
          display: flex;
          align-items: center;
          justify-content: center;
          /* Cap the column itself so Lottie can never overflow */
          max-height: 320px;
          overflow: hidden;
        }
        .wcl-row1 {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(0.55rem, 1vw, 0.9rem);
          margin-bottom: clamp(0.55rem, 1vw, 0.9rem);
        }
        .wcl-row2 {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(0.55rem, 1vw, 0.9rem);
        }
        @media (max-width:900px) {
          .wcl-section-header { grid-template-columns: 1fr; }
          .wcl-header-lottie  { display: none; }
          .wcl-row2           { grid-template-columns: repeat(2,minmax(0,1fr)); }
        }
        @media (max-width:540px) {
          .wcl-row1 { grid-template-columns: 1fr; }
          .wcl-row2 { grid-template-columns: 1fr; }
        }

        /* ── Premium card ── */
        .wcl-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(10,36,99,0.10);
          background: #ffffff;
          transition: border-color .28s ease, box-shadow .28s ease, transform .28s ease, background .28s ease;
          cursor: default;
        }
        .wcl-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #0a2463 0%, #1e3a8a 100%);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform .32s cubic-bezier(0.22,1,0.36,1);
        }
        .wcl-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #0a2463, #1e3a8a);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .32s cubic-bezier(0.22,1,0.36,1);
        }
        .wcl-card:hover {
          border-color: rgba(10,36,99,0.22) !important;
          box-shadow: 0 14px 42px rgba(10,36,99,0.10), 0 2px 8px rgba(10,36,99,0.06) !important;
          transform: translateY(-3px);
          background: linear-gradient(160deg, rgba(10,36,99,0.025) 0%, #ffffff 55%) !important;
        }
        .wcl-card:hover::before { transform: scaleY(1); }
        .wcl-card:hover::after  { transform: scaleX(1); }
        .wcl-card:hover .wcl-card-icon {
          background: linear-gradient(135deg, rgba(10,36,99,0.12), rgba(30,58,138,0.08)) !important;
          border-color: rgba(10,36,99,0.28) !important;
        }
        .wcl-card:hover .wcl-card-num { opacity: 0.10 !important; }
        @media (prefers-reduced-motion: reduce) {
          .wcl-card::before, .wcl-card::after { transition: none; }
          .wcl-card:hover { transform: none; }
          .wcl-scroll-hint { animation: none; }
          .wcl-particle { animation: none; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          [A]  PINNED ANIMATION SECTION — 100vh, black
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={containerRef}
        style={{
          height: '100vh',
          overflow: 'hidden',
          overflowX: 'hidden',
          position: 'relative', zIndex: 20,
          background: BLACK, boxSizing: 'border-box',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.052) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none', zIndex: 0,
        }}/>

        <ScatteredParticles />

        {/* TOP-LEFT corner */}
        <div ref={cornerTLRef} style={{ position: 'absolute', top: GAP_TOP, left: SIDE_PAD, zIndex: 10, maxWidth: '48vw' }}>
          <p className={cinzel.className} style={{
            fontSize: 'clamp(11px,0.7vw,13px)', letterSpacing: '0.36em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)',
            margin: '0 0 0.5rem', fontWeight: 600,
          }}>LEAD College</p>
          <h2 className={cinzel.className} style={{ margin: 0 }}>
            <span className="wcl-corner-line1">Reimagine</span>
            <span className="wcl-corner-line2">Your Future.</span>
          </h2>
        </div>

        {/* BOTTOM-RIGHT corner */}
        <div ref={cornerBRRef} style={{ position: 'absolute', bottom: GAP_BOTTOM, right: SIDE_PAD, zIndex: 10, textAlign: 'right', maxWidth: '48vw' }}>
          <h2 className={cinzel.className} style={{ margin: 0 }}>
            <span className="wcl-corner-line1">Real Learning.</span>
            <span className="wcl-corner-line2">Real World.</span>
          </h2>
          <p className={cinzel.className} style={{
            fontSize: 'clamp(11px,0.7vw,13px)', letterSpacing: '0.36em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
            margin: '0.55rem 0 0', fontWeight: 600,
          }}>Since 2012</p>
        </div>

        {/* CENTER-LEFT */}
        <div ref={centerContentRef} className="wcl-center-content">
          <div style={{ width: 36, height: 1.5, background: 'rgba(255,255,255,0.28)', marginBottom: '1.1rem' }}/>
          <p className={playfair.className} style={{
            fontSize: 'clamp(0.85rem,1.05vw,1.05rem)',
            color: 'rgba(255,255,255,0.90)', lineHeight: 1.84,
            margin: '0 0 clamp(1.8rem,3.5vh,2.8rem)',
          }}>
            Empowering students through innovation, global exposure, and personalised
            mentorship — built for real-world success from day one.
          </p>
          <div className="wcl-scroll-hint" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowDownCircle size={14} color="rgba(255,255,255,0.25)" strokeWidth={1.5}/>
            <span className={cinzel.className} style={{
              fontSize: 'clamp(11px,0.7vw,13px)', letterSpacing: '0.26em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 600,
            }}>Scroll to Discover</span>
          </div>
        </div>

        {/* SCALING TITLE */}
        <div
          ref={titleWrapRef}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 5, pointerEvents: 'none', userSelect: 'none',
          }}
        >
          <div style={{ textAlign: 'center', lineHeight: 0.88 }}>
            <span className={cinzel.className} style={{
              display: 'block', fontSize: 'min(17vw,18rem)', fontWeight: 700,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)', marginBottom: '0.02em',
            }}>WHY</span>
            <span className={cinzel.className} style={{
              display: 'block', fontSize: 'min(17vw,18rem)', fontWeight: 900,
              letterSpacing: '-0.04em', textTransform: 'uppercase', color: WHITE,
            }}>CHOOSE</span>
            <span className={cinzel.className} style={{
              display: 'block', fontSize: 'min(17vw,18rem)', fontWeight: 900,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: WHITE, marginTop: '0.02em',
            }}>LEAD</span>
          </div>
        </div>

        {/* White overlay flash */}
        <div className="wcl-overlay" aria-hidden="true" style={{
          position: 'absolute', inset: 0, backgroundColor: WHITE,
          zIndex: 15, opacity: 0, pointerEvents: 'none',
          transform: 'translateZ(0)',
        }}/>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          [B]  NORMAL SCROLL SECTION — white
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', zIndex: 21,
        backgroundColor: WHITE,
        overflowX: 'hidden',
        padding: 'clamp(3.5rem,7vh,6rem) clamp(1.4rem,6vw,6rem)',
        boxSizing: 'border-box',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${NAVY}04 1px,transparent 1px),linear-gradient(90deg,${NAVY}04 1px,transparent 1px)`,
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }}/>

        <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto' }}>

          <div className="wcl-section-header">
            {/* LEFT col: heading + row1 cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem,2vh,1.6rem)' }}>
              <div style={{
                paddingBottom: 'clamp(0.8rem,1.8vh,1.3rem)',
                borderBottom: '1px solid rgba(10,36,99,0.10)',
              }}>
                <p className={cinzel.className} style={{
                  fontSize: 'clamp(11px,0.7vw,13px)', letterSpacing: '0.36em',
                  textTransform: 'uppercase', color: `${NAVY}55`,
                  margin: '0 0 0.4rem', fontWeight: 600,
                }}>LEAD College</p>
                <h2 className={cinzel.className} style={{
                  fontSize: 'clamp(2rem,3.8vw,4.8rem)',
                  fontWeight: 900, letterSpacing: '-0.03em',
                  textTransform: 'uppercase', margin: 0, lineHeight: 0.92,
                  ...navyGrad,
                }}>
                  Excellence,<br />By Make.
                </h2>
              </div>
              <div className="wcl-row1">
                {CARDS.slice(0, 2).map(({ n, icon: Icon, title, body }) => (
                  <Card key={title} n={n} Icon={Icon} title={title} body={body} cinzel={cinzel} playfair={playfair} NAVY={NAVY} WHITE={WHITE} />
                ))}
              </div>
            </div>

            {/* RIGHT col: Lottie — tightly sized to match left col height */}
            <div className="wcl-header-lottie">
              {animationData ? (
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  style={{
                    width: 'clamp(160px, 22vw, 300px)', /* ← reduced from 36vw/480px */
                    height: 'auto',
                    maxHeight: '300px',
                  }}
                />
              ) : (
                <div style={{
                  width: 'clamp(160px,22vw,300px)', aspectRatio: '1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.07,
                }}>
                  <Sparkles size={80} color={NAVY} strokeWidth={0.6}/>
                </div>
              )}
            </div>
          </div>

          <div className="wcl-row2">
            {CARDS.slice(2, 6).map(({ n, icon: Icon, title, body }) => (
              <Card key={title} n={n} Icon={Icon} title={title} body={body} cinzel={cinzel} playfair={playfair} NAVY={NAVY} WHITE={WHITE} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

/* ── Card component ─────────────────────────────────────────── */
function Card({
  n, Icon, title, body, cinzel, playfair, NAVY, WHITE,
}: {
  n: string; Icon: React.ElementType; title: string; body: string;
  cinzel: { className: string }; playfair: { className: string };
  NAVY: string; WHITE: string;
}) {
  return (
    <div className="wcl-card" style={{
      padding: 'clamp(1rem,1.8vw,1.5rem)',
      display: 'flex', flexDirection: 'column', gap: '0.6rem',
      boxSizing: 'border-box',
    }}>
      <span className={`wcl-card-num ${cinzel.className}`} aria-hidden="true" style={{
        position: 'absolute', top: '0.55rem', right: '0.8rem',
        fontSize: 'clamp(2rem,2.8vw,3.2rem)', fontWeight: 900,
        lineHeight: 1, color: NAVY, opacity: 0.04,
        letterSpacing: '-0.04em', pointerEvents: 'none', userSelect: 'none',
        transition: 'opacity .28s ease',
      }}>{n}</span>

      <div className="wcl-card-icon" style={{
        width: 36, height: 36,
        border: '1px solid rgba(10,36,99,0.14)',
        background: 'linear-gradient(135deg, rgba(10,36,99,0.06) 0%, rgba(30,58,138,0.03) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'background .28s ease, border-color .28s ease',
        borderRadius: '4px',
      }}>
        <Icon size={14} color={NAVY} strokeWidth={1.6}/>
      </div>

      <p className={cinzel.className} style={{
        fontSize: 'clamp(11px,0.72vw,13px)',
        fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.1em', color: NAVY, margin: 0, lineHeight: 1.2,
      }}>{title}</p>

      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, rgba(10,36,99,0.18) 0%, transparent 100%)',
        flexShrink: 0,
      }}/>

      <p className={playfair.className} style={{
        fontSize: 'clamp(14px,0.90vw,16px)',
        color: '#4a5568', margin: 0, lineHeight: 1.74, flex: 1,
      }}>{body}</p>
    </div>
  );
}
