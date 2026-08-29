'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cinzel, playfair } from '@/app/fonts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DEPUTY_IMAGE  = '/administration/deputydirector.png';
const MEETING_IMAGE = '/convert/vkskfce2zjmedmxzoa4w.webp';

const BLUE = '#005C9F';

/* ── Credential icons ── */
const IconBuilding = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V12h6v9"/>
  </svg>
);
const IconAcademic = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const IconTarget = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const credentials = [
  { Icon: IconBuilding, text: 'Deputy Director — LEAD College (Autonomous)' },
  { Icon: IconAcademic, text: 'Ph.D. Economics — Jawaharlal Nehru University' },
  { Icon: IconTarget,   text: '27+ Years Teaching & Research Experience' },
];

export default function DeputyDirectorPage() {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const roleRef     = useRef<HTMLDivElement>(null);
  const pillarsRef  = useRef<HTMLDivElement>(null);
  const messageRef  = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        paused: true,
        delay: 0.1,
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(imageRef.current,
          { autoAlpha: 0, y: 60, scale: 0.96 },
          { autoAlpha: 1, y: 0,  scale: 1, duration: 1.4, ease: 'power4.out' })
        .fromTo('.dd-dot-grid',   { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 0)
        .fromTo('.dd-corner-tl',  { autoAlpha: 0, x: -12, y: -12 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .fromTo('.dd-corner-br',  { autoAlpha: 0, x:  12, y:  12 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .fromTo('.dd-hline',      { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0.15)
        .fromTo('.dd-year',       { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.9)
        .fromTo(labelRef.current,   { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.6 }, 0.3)
        .fromTo(titleRef.current,   { autoAlpha: 0, y: 40  }, { autoAlpha: 1, y: 0, duration: 1   }, 0.4)
        .fromTo(dividerRef.current, { scaleX: 0             }, { scaleX: 1,          duration: 0.6 }, 0.6)
        .fromTo(nameRef.current,    { autoAlpha: 0, y: 20  }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.7)
        .fromTo('.dd-cred-item',    { autoAlpha: 0, y: 20  }, { autoAlpha: 1, y: 0, stagger: 0.12 }, 0.85);

      tlRef.current = tl;

      if (roleRef.current) {
        gsap.fromTo('.dd-role-img',
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: roleRef.current, start: 'top 72%' } });
        gsap.fromTo('.dd-role-content',
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: roleRef.current, start: 'top 72%' } });
        gsap.fromTo('.dd-role-item',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: '.dd-role-items', start: 'top 78%' } });
      }

      if (pillarsRef.current) {
        gsap.fromTo('.dd-pillar',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power2.out',
            scrollTrigger: { trigger: pillarsRef.current, start: 'top 75%' } });
      }

      if (messageRef.current) {
        gsap.fromTo('.dd-msg-header',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: messageRef.current, start: 'top 75%' } });
        gsap.fromTo('.dd-msg-para',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: '.dd-msg-body', start: 'top 75%' } });
        gsap.fromTo('.dd-msg-sig',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.dd-msg-sig', start: 'top 88%' } });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (imageReady && tlRef.current) {
      tlRef.current.play();
    }
  }, [imageReady]);

  /* ── Data ── */
  const pillars = [
    { num: '01', label: 'Operational Efficiency',    desc: 'Ensuring smooth day-to-day functioning of all academic and administrative processes across the institution.' },
    { num: '02', label: 'Policy Implementation',     desc: 'Translating institutional strategy into actionable policies and procedures aligned with regulatory and quality standards.' },
    { num: '03', label: 'Student Experience',        desc: 'Overseeing holistic student development through academic support, co-curricular engagement, and pastoral care.' },
    { num: '04', label: 'Academic Coordination',     desc: 'Facilitating seamless coordination between departments to uphold curriculum delivery and learning outcomes.' },
    { num: '05', label: 'Infrastructure Management', desc: 'Supervising campus infrastructure, resources, and services to maintain a world-class learning environment.' },
    { num: '06', label: 'Institutional Compliance',  desc: 'Ensuring adherence to accreditation standards, regulatory requirements, and institutional governance frameworks.' },
  ];

  const messageParagraphs = [
    `We are living in an era where the world is being reshaped faster than ever before—by technology, economic shifts, climate realities, social change, and geopolitical uncertainties. In such a time, education cannot remain static. It must evolve in both spirit and structure.`,
    `Management education, especially, must move beyond traditional frameworks and become a platform that prepares young minds to lead in complexity, respond to uncertainty, and create value that is meaningful and sustainable.`,
    `The future will not belong to those who simply possess knowledge, but to those who can think critically, learn continuously, adapt quickly, and innovate responsibly. Industry today demands professionals who can blend business understanding with digital intelligence, creativity, and human-centered problem solving. Equally important, today's learners aspire for purpose-driven careers, experiential learning, and opportunities that allow them to contribute to society while achieving personal growth. New insights from learning science and the reforms enabled by the National Education Policy (NEP) call for a shift toward multidisciplinary, competency-based, and holistic education.`,
    `At LEAD, we believe education must build not only skilled professionals, but responsible citizens. In a world increasingly driven by artificial intelligence, the greatest differentiator will be human values—integrity, empathy, ethical courage, respect for diversity, and responsibility toward society and the environment. Our goal is to shape managers and entrepreneurs who can create better organizations, better products, and better solutions—while remaining grounded as good human beings.`,
    `LEAD stands for leadership and entrepreneurship with purpose. We envision an institution that inspires learners to dream bigger, act responsibly, and lead with both competence and conscience. We are committed to nurturing future leaders who do not merely succeed in the world, but who contribute to making the world better.`,
  ];

  return (
    <>
      <style>{`
        .dd-hero-section {
          height: 100svh;
          background: #ffffff;
          display: flex;
          align-items: stretch;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
        }

        .dd-dot-grid {
          position: absolute;
          inset: 0;
          opacity: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,0.11) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        .dd-hline {
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

        .dd-image-bg {
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

        .dd-vline {
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

        .dd-corner-tl,
        .dd-corner-br {
          position: absolute;
          width: 52px; height: 52px;
          pointer-events: none;
          z-index: 2;
          opacity: 0;
        }
        .dd-corner-tl {
          top: 28px; left: 28px;
          border-top:  1.5px solid rgba(0,92,159,0.3);
          border-left: 1.5px solid rgba(0,92,159,0.3);
        }
        .dd-corner-br {
          bottom: 28px; right: 28px;
          border-bottom: 1.5px solid rgba(0,92,159,0.3);
          border-right:  1.5px solid rgba(0,92,159,0.3);
        }

        .dd-accent-dot {
          position: absolute;
          width: 5px; height: 5px;
          background: #005C9F;
          opacity: 0.15;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }

        .dd-year {
          position: absolute;
          bottom: 30px; left: 200px;
          font-size: clamp(0.66rem, 0.85vw, 0.74rem);
          letter-spacing: 0.24em;
          color: rgba(0,92,159,0.38);
          z-index: 3;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
        }
        .dd-year::before {
          content: '';
          display: inline-block;
          width: 18px; height: 1px;
          background: rgba(0,92,159,0.38);
        }

        .dd-inner {
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

        .dd-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(1.5rem, 3vh, 3rem) 0;
          min-width: 0;
        }

        .dd-image-wrap {
          position: relative;
          height: 100svh;
          min-width: 0;
          opacity: 0;
        }

        @media (max-width: 640px) {
          .dd-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            padding: 0 24px;
            gap: 0;
          }
          .dd-text-col   { padding-top: clamp(1rem,4vw,2rem); padding-bottom: 0.5rem; order: 1; }
          .dd-image-wrap { order: 2; height: 45svh; }
          .dd-image-bg   { width: 100%; top: 55%; height: 45%; }
          .dd-year       { left: 24px; }
          .dd-vline      { display: none; }
          .dd-corner-tl  { top: 12px; left: 12px; width: 32px; height: 32px; }
          .dd-corner-br  { bottom: 12px; right: 12px; width: 32px; height: 32px; }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .dd-inner { padding: 0 80px; gap: 1rem; }
          .dd-year  { left: 80px; }
        }
      `}</style>

      <div className="bg-white overflow-x-hidden">

        {/* ═══ HERO ═══ */}
        <section ref={sectionRef} className={`dd-hero-section ${playfair.className}`}>
          <div className="dd-dot-grid" />
          <div className="dd-hline" />
          <div className="dd-image-bg" />
          <div className="dd-vline" />

          <div className="dd-corner-tl" aria-hidden="true" />
          <div className="dd-corner-br" aria-hidden="true" />

          <div className="dd-accent-dot" style={{ top: '16%', left: '47%' }}    aria-hidden="true" />
          <div className="dd-accent-dot" style={{ top: '84%', left: '53%' }}    aria-hidden="true" />
          <div className="dd-accent-dot" style={{ top: '38%', right: '195px' }} aria-hidden="true" />

          <div className="dd-year" aria-hidden="true">LEAD COLLEGE — PALAKKAD</div>

          <div className="dd-inner">

            {/* LEFT: Text */}
            <div className="dd-text-col">
              <h1
                ref={titleRef}
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: 'clamp(2.8rem, 5.5vw, 7.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.0,
                  margin: '0 0 clamp(0.8rem,1.5vh,1.5rem)',
                  textTransform: 'lowercase',
                  opacity: 1,
                  paddingBottom: '0.1em',
                  overflow: 'visible',
                }}
              >
                <span style={{ display: 'block', color: '#0D0D0D' }}>the deputy</span>
                <span style={{
                  display: 'block',
                  background: `linear-gradient(90deg, #0D0D0D 0%, ${BLUE} 70%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  paddingBottom: '0.12em',
                  overflow: 'visible',
                }}>
                  director.
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

              <div ref={nameRef} style={{ opacity: 1, marginBottom: 'clamp(1rem,2vh,2rem)' }}>
                <p style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(0.75rem, 1.2vw, 1.4rem)',
                  fontWeight: 600,
                  margin: 0,
                }}>
                  Prof. Rajkishan S. S.
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
                    className="dd-cred-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontFamily: cinzel.style.fontFamily,
                      fontSize: 'clamp(0.5rem, 0.85vw, 0.9rem)',
                      letterSpacing: '0.08em',
                      color: '#222',
                      opacity: 1,
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
            <div ref={imageRef} className="dd-image-wrap">
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
                src={DEPUTY_IMAGE}
                alt="Prof. Rajkishan S. S. — Deputy Director, LEAD College"
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

        {/* ═══ DEPUTY DIRECTOR ROLE OVERVIEW ═══ */}
        <section ref={roleRef} className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="dd-role-img relative">
                <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={MEETING_IMAGE}
                    alt="Deputy Director in coordination meeting"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: BLUE }} />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white border border-gray-100 shadow-xl rounded-xl px-6 py-4 z-10">
                  <p className={`${cinzel.className} text-2xl font-bold`} style={{ color: BLUE }}>27+</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.78rem', color: '#555' }}>
                    Years of Teaching Experience
                  </p>
                </div>
              </div>

              <div className="dd-role-content space-y-6">
                <div className="space-y-2">
                  <span
                    className={`${cinzel.className} text-xs uppercase tracking-[0.3em] font-semibold`}
                    style={{ color: BLUE }}
                  >
                    Operational Leadership
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
                    The Office of<br />the Deputy Director
                  </h2>
                </div>

                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', lineHeight: 1.9, color: '#555' }}>
                  The Deputy Director supports the Director in executing institutional strategy and managing day-to-day operations. This role ensures effective coordination across academic, administrative, student services, and infrastructure functions.
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', lineHeight: 1.9, color: '#555' }}>
                  The Deputy Director plays a critical role in operational efficiency, policy implementation, student experience management, and the seamless functioning of academic and co-curricular activities.
                </p>

                <div className="dd-role-items space-y-3 pt-2">
                  {[
                    'Day-to-day institutional operations management',
                    'Cross-functional academic & administrative coordination',
                    'Policy implementation and compliance oversight',
                    'Student experience and services management',
                    'Co-curricular and campus life coordination',
                  ].map((item) => (
                    <div key={item} className="dd-role-item flex items-start gap-3">
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

        {/* ═══ OPERATIONAL PILLARS ═══ */}
        <section ref={pillarsRef} className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">

            <div className="text-center mb-16 space-y-3">
              <span
                className={`${cinzel.className} text-xs uppercase tracking-[0.3em] font-semibold`}
                style={{ color: BLUE }}
              >
                Operational Framework
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
                  Key Deliverables of<br />Operational Excellence
              </h2>
              <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: BLUE }} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p) => (
                <div
                  key={p.num}
                  className="dd-pillar group relative bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
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

        {/* ═══ MESSAGE FROM THE DEPUTY DIRECTOR ═══ */}
        <section ref={messageRef} className="py-24 bg-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg,#1e3a8a,#1e3a8a 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#1e3a8a,#1e3a8a 1px,transparent 1px,transparent 60px)',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">

            <div className="dd-msg-header text-center mb-14 space-y-4">
              <span
                className={`${cinzel.className} text-xs uppercase tracking-[0.3em] font-semibold`}
                style={{ color: BLUE }}
              >
                Deputy Director's Communication
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
                Message from<br />the Deputy Director
              </h2>
              <div className="w-16 h-0.5 mx-auto" style={{ background: BLUE }} />
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #000000, #1e3a8a, #005C9F)' }} />

              <div className="p-8 md:p-12 space-y-6">
                <p
                  className={`${cinzel.className} text-sm uppercase tracking-[0.2em] font-semibold`}
                  style={{ color: BLUE }}
                >
                  Dear Students, Parents, and Stakeholders,
                </p>

                <blockquote
                  className="relative pl-6 py-2 my-4"
                  style={{ borderLeft: `4px solid ${BLUE}` }}
                >
                  <div
                    className="absolute -top-2 -left-1 text-5xl leading-none select-none"
                    style={{ color: 'rgba(0,92,159,0.15)' }}
                  >"</div>
                  <p
                    className="relative z-10 italic"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', lineHeight: 1.9, color: '#444' }}
                  >
                    The future will not belong to those who simply possess knowledge, but to those who can think critically, learn continuously, adapt quickly, and innovate responsibly.
                  </p>
                </blockquote>

                <div className="dd-msg-body space-y-5">
                  {messageParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className="dd-msg-para"
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', lineHeight: 1.9, color: '#555' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-8 mt-8">
                  <div className="dd-msg-sig flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div
                      className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md"
                      style={{ border: `2px solid rgba(0,92,159,0.2)` }}
                    >
                      <Image
                        src={DEPUTY_IMAGE}
                        alt="Prof. Rajkishan S. S."
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="space-y-1">
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 600, color: '#111' }}>
                        Prof. Rajkishan S. S.
                      </p>
                      <p
                        className={`${cinzel.className} text-xs uppercase tracking-[0.25em] font-semibold`}
                        style={{ color: BLUE }}
                      >
                        Deputy Director, LEAD College
                      </p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.78rem', color: '#888' }}>
                        LEAD College (Autonomous), Palakkad
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}