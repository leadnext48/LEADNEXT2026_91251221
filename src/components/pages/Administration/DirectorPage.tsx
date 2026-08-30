'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cinzel, playfair } from '@/app/fonts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DIRECTOR_IMAGE = '/administration/director.png';
const MEETING_IMAGE  = '/convert/ue2c6ukku5cecojxhit2.webp';

const BLUE = '#005C9F';

/* ── Credential icons ── */
const IconBuilding = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V12h6v9"/>
  </svg>
);
const IconAward = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const IconAcademic = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const credentials = [
  { Icon: IconBuilding, text: 'Director — LEAD College (Autonomous)' },
  { Icon: IconAward,    text: 'Alumnus — IIM Ahmedabad · Doctorate, Symbiosis International University' },
  { Icon: IconAcademic, text: '26 Years of Industry & Academic Experience' },
];

export default function DirectorPage() {
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
        .fromTo('.dir-dot-grid',  { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 0)
        .fromTo('.dir-corner-tl', { autoAlpha: 0, x: -12, y: -12 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .fromTo('.dir-corner-br', { autoAlpha: 0, x:  12, y:  12 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9 }, 0.2)
        .fromTo('.dir-hline',     { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0.15)
        .fromTo('.dir-year',      { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.9)
        .fromTo(labelRef.current,   { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.6 }, 0.3)
        .fromTo(titleRef.current,   { autoAlpha: 0, y: 40  }, { autoAlpha: 1, y: 0, duration: 1   }, 0.4)
        .fromTo(dividerRef.current, { scaleX: 0             }, { scaleX: 1,          duration: 0.6 }, 0.6)
        .fromTo(nameRef.current,    { autoAlpha: 0, y: 20  }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.7)
        .fromTo('.dir-cred-item',   { autoAlpha: 0, y: 20  }, { autoAlpha: 1, y: 0, stagger: 0.12 }, 0.85);

      tlRef.current = tl;

      if (roleRef.current) {
        gsap.fromTo('.dir-role-img',
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: roleRef.current, start: 'top 72%' } });
        gsap.fromTo('.dir-role-content',
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: roleRef.current, start: 'top 72%' } });
        gsap.fromTo('.dir-role-item',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: '.dir-role-items', start: 'top 78%' } });
      }

      if (pillarsRef.current) {
        gsap.fromTo('.dir-pillar',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power2.out',
            scrollTrigger: { trigger: pillarsRef.current, start: 'top 75%' } });
      }

      if (messageRef.current) {
        gsap.fromTo('.dir-msg-header',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: messageRef.current, start: 'top 75%' } });
        gsap.fromTo('.dir-msg-para',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: '.dir-msg-body', start: 'top 75%' } });
        gsap.fromTo('.dir-msg-sig',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.dir-msg-sig', start: 'top 88%' } });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (imageReady && tlRef.current) {
      tlRef.current.play();
    }
  }, [imageReady]);

  const pillars = [
    { num: '01', label: 'Academic Excellence',    desc: 'Outcome-based education with continuous curriculum evolution aligned to industry and global standards.' },
    { num: '02', label: 'Institutional Growth',   desc: 'Strategic planning that ensures sustainable expansion of programmes, infrastructure, and institutional reach.' },
    { num: '03', label: 'Industry Partnerships',  desc: 'Deep collaborations with corporates, startups, and public institutions to bridge education with employment.' },
    { num: '04', label: 'Global Collaborations',  desc: 'International academic ties that bring global perspectives into the campus learning ecosystem.' },
    { num: '05', label: 'Innovation Integration', desc: 'Embedding entrepreneurship, digital literacy, and emerging technology across all academic programmes.' },
    { num: '06', label: 'Social Responsibility',  desc: 'Embedding empathy, ethics, and community engagement as foundational dimensions of leadership formation.' },
  ];

  const messageParagraphs = [
    `Education today stands at a critical intersection of knowledge, technology, and real-world application. The role of higher education is no longer limited to imparting theoretical understanding; it must enable learners to think critically, adapt continuously, and create value in dynamic professional environments. At LEAD College, our academic vision is built around this philosophy—learning that is relevant, skill-driven, technology-enabled, and aligned with the future of work.`,
    `Our approach to curriculum design focuses on integrating managerial knowledge with digital capability, analytical thinking, and experiential learning. Continuous curriculum renewal, outcome-based education, and authentic assessment ensure that students develop competencies in application, problem-solving, decision-making, and innovation rather than mere conceptual familiarity. Internships, live projects, social immersion, research, and capstone experiences are embedded to bridge the gap between classroom learning and professional practice.`,
    `Equally important is our commitment to faculty excellence and academic innovation. We continuously invest in faculty development to align teaching with industry expectations, emerging technologies, and modern pedagogical practices, including the responsible use of digital tools and Artificial Intelligence in learning. This ensures that the learning environment remains contemporary, engaging, and future-ready.`,
    `Research and intellectual inquiry form another important dimension of our academic ecosystem. We encourage applied, interdisciplinary, and industry-linked research that contributes to knowledge creation while addressing real organizational and societal challenges. Our goal is to cultivate a culture of curiosity, evidence-based thinking, and continuous academic growth.`,
    `At LEAD, academic excellence is guided by a larger purpose—to develop responsible professionals who combine competence with integrity, innovation with ethics, and ambition with social sensitivity. We remain committed to building a learning ecosystem that empowers students to become confident leaders, thoughtful decision-makers, and lifelong learners.`,
    `I warmly invite you to be part of this academic journey at LEAD, where learning is purposeful, relevant, and designed for the future.`,
  ];

  return (
    <>
      <style>{`
        .dir-hero-section {
          height: 100svh;
          background: #ffffff;
          display: flex;
          align-items: stretch;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
        }
        .dir-dot-grid {
          position: absolute; inset: 0; opacity: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,0.11) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none; z-index: 0;
        }
        .dir-hline {
          position: absolute; top: 50%; left: 0; width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,92,159,0.1) 15%, rgba(0,92,159,0.1) 85%, transparent 100%);
          transform-origin: left; pointer-events: none; z-index: 0;
        }
        .dir-image-bg {
          position: absolute; right: 0; top: 0; width: 50%; height: 100%;
          background: linear-gradient(160deg, rgba(0,92,159,0.03) 0%, rgba(0,92,159,0.07) 60%, rgba(0,92,159,0.04) 100%);
          pointer-events: none; z-index: 0;
        }
        .dir-vline {
          position: absolute; left: 50%; top: 8%; height: 84%; width: 1px;
          background: linear-gradient(180deg, transparent 0%, rgba(0,92,159,0.13) 25%, rgba(0,92,159,0.13) 75%, transparent 100%);
          pointer-events: none; z-index: 1;
        }
        .dir-corner-tl, .dir-corner-br {
          position: absolute; width: 52px; height: 52px;
          pointer-events: none; z-index: 2; opacity: 0;
        }
        .dir-corner-tl { top: 28px; left: 28px; border-top: 1.5px solid rgba(0,92,159,0.3); border-left: 1.5px solid rgba(0,92,159,0.3); }
        .dir-corner-br { bottom: 28px; right: 28px; border-bottom: 1.5px solid rgba(0,92,159,0.3); border-right: 1.5px solid rgba(0,92,159,0.3); }
        .dir-accent-dot {
          position: absolute; width: 5px; height: 5px;
          background: #005C9F; opacity: 0.15; border-radius: 50%;
          pointer-events: none; z-index: 1;
        }
        .dir-year {
          position: absolute; bottom: 30px; left: 200px;
          font-size: clamp(0.66rem, 0.8vw, 0.74rem); letter-spacing: 0.22em;
          color: rgba(0,92,159,0.38); z-index: 3; pointer-events: none;
          display: flex; align-items: center; gap: 10px; opacity: 0;
        }
        .dir-year::before {
          content: ''; display: inline-block; width: 18px; height: 1px;
          background: rgba(0,92,159,0.38);
        }
        .dir-inner {
          width: 100%; padding: 0 200px; box-sizing: border-box;
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; gap: clamp(1rem, 3vw, 3rem);
          position: relative; z-index: 2;
        }
        .dir-text-col {
          display: flex; flex-direction: column; justify-content: center;
          padding: clamp(1.5rem, 3vh, 3rem) 0; min-width: 0;
        }
        .dir-image-wrap { position: relative; height: 100svh; min-width: 0; opacity: 0; }
        @media (max-width: 640px) {
          .dir-inner { grid-template-columns: 1fr; grid-template-rows: auto 1fr; padding: 0 24px; gap: 0; }
          .dir-text-col { padding-top: clamp(1rem,4vw,2rem); padding-bottom: 0.5rem; order: 1; }
          .dir-image-wrap { order: 2; height: 45svh; }
          .dir-image-bg { width: 100%; top: 55%; height: 45%; }
          .dir-year { left: 24px; }
          .dir-vline { display: none; }
          .dir-corner-tl { top: 12px; left: 12px; width: 32px; height: 32px; }
          .dir-corner-br { bottom: 12px; right: 12px; width: 32px; height: 32px; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .dir-inner { padding: 0 80px; gap: 1rem; }
          .dir-year { left: 80px; }
        }
      `}</style>

      <div className="bg-white overflow-x-hidden">

        {/* ═══ HERO ═══ */}
        <section ref={sectionRef} className={`dir-hero-section ${playfair.className}`}>
          <div className="dir-dot-grid" />
          <div className="dir-hline" />
          <div className="dir-image-bg" />
          <div className="dir-vline" />
          <div className="dir-corner-tl" aria-hidden="true" />
          <div className="dir-corner-br" aria-hidden="true" />
          <div className="dir-accent-dot" style={{ top: '16%', left: '47%' }}    aria-hidden="true" />
          <div className="dir-accent-dot" style={{ top: '84%', left: '53%' }}    aria-hidden="true" />
          <div className="dir-accent-dot" style={{ top: '38%', right: '195px' }} aria-hidden="true" />

          <div className="dir-inner">
            <div className="dir-text-col">
              <h1
                ref={titleRef}
                style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: 'clamp(2.8rem, 5.5vw, 7.5rem)',
                  fontWeight: 600, lineHeight: 1.0,
                  margin: '0 0 clamp(0.8rem,1.5vh,1.5rem)',
                  textTransform: 'lowercase', opacity: 1,
                  paddingBottom: '0.1em', overflow: 'visible',
                }}
              >
                <span style={{ display: 'block', color: '#0D0D0D' }}>the</span>
                <span style={{
                  display: 'block',
                  background: `linear-gradient(90deg, #0D0D0D 0%, ${BLUE} 70%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  color: 'transparent', paddingBottom: '0.12em', overflow: 'visible',
                }}>director.</span>
              </h1>

              <div ref={dividerRef} style={{ width: 40, height: 2, background: BLUE, marginBottom: 'clamp(0.8rem,1.5vh,1.5rem)', transformOrigin: 'left' }} />

              <div ref={nameRef} style={{ opacity: 1, marginBottom: 'clamp(1rem,2vh,2rem)' }}>
                <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.75rem, 1.2vw, 1.4rem)', fontWeight: 600, margin: 0 }}>
                  Dr. Sreekanth S. V.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,0.9vh,0.9rem)', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 'clamp(0.7rem,1.2vh,1.2rem)' }}>
                {credentials.map(({ Icon, text }) => (
                  <div key={text} className="dir-cred-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.72rem, 0.9vw, 0.9rem)', letterSpacing: '0.06em', color: '#222', opacity: 1 }}>
                    <span style={{ color: BLUE, flexShrink: 0 }}><Icon /></span>
                    <span style={{ position: 'relative', paddingBottom: 5 }}>
                      {text}
                      <span style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, background: `linear-gradient(90deg, rgba(0,92,159,0.4), transparent)` }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={imageRef} className="dir-image-wrap">
              <div aria-hidden="true" style={{ position: 'absolute', inset: '5% 8%', border: '1px solid rgba(0,92,159,0.08)', pointerEvents: 'none', zIndex: 0 }} />
              <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '30%', background: 'radial-gradient(ellipse at center bottom, rgba(0,92,159,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
              <Image
                src={DIRECTOR_IMAGE}
                alt="Dr. Sreekanth S. V. — Director, LEAD College"
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

        {/* ═══ ROLE OVERVIEW ═══ */}
        <section ref={roleRef} className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="dir-role-img relative">
                <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl">
                  <Image src={MEETING_IMAGE} alt="Director in strategic meeting" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: BLUE }} />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white border border-gray-100 shadow-xl rounded-xl px-6 py-4 z-10">
                  <p className={`${cinzel.className} text-2xl font-bold`} style={{ color: BLUE }}>26+</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.78rem', color: '#555' }}>Years of Industry & Academic Experience</p>
                </div>
              </div>
              <div className="dir-role-content space-y-6">
                <div className="space-y-2">
                  <span className={`${cinzel.className} text-xs uppercase tracking-[0.3em] font-semibold`} style={{ color: BLUE }}>Institutional Leadership</span>
                  <h2 className={`${cinzel.className} text-3xl md:text-4xl font-bold leading-[1.1] uppercase`} style={{ background: 'linear-gradient(90deg, #000000 0%, #1e3a8a 60%, #1e3a8a 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    The Office of<br />the Director
                  </h2>
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.92rem, 1vw, 1rem)', lineHeight: 1.9, color: '#555' }}>
                  The Director provides the strategic vision and overall leadership for LEAD College, ensuring that the institution remains aligned with its mission of developing ethical, industry-ready, and socially responsible leaders.
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.92rem, 1vw, 1rem)', lineHeight: 1.9, color: '#555' }}>
                  The office oversees academic excellence, institutional growth, industry partnerships, global collaborations, and the integration of innovation into learning. With a strong focus on outcome-based education and employability, the Director guides the college toward continuous academic and institutional advancement.
                </p>
                <div className="dir-role-items space-y-3 pt-2">
                  {['Strategic vision and institutional direction','Academic oversight and quality assurance','Industry and global partnership development','Outcome-based education and employability','Innovation and entrepreneurship integration'].map(item => (
                    <div key={item} className="dir-role-item flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BLUE }} />
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.92rem, 1vw, 1rem)', lineHeight: 1.8, color: '#555' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STRATEGIC PILLARS ═══ */}
        <section ref={pillarsRef} className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16 space-y-3">
              <span className={`${cinzel.className} text-xs uppercase tracking-[0.3em] font-semibold`} style={{ color: BLUE }}>Strategic Framework</span>
              <h2 className={`${cinzel.className} text-3xl md:text-4xl font-bold uppercase`} style={{ background: 'linear-gradient(90deg, #000000 0%, #1e3a8a 60%, #1e3a8a 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Key Deliverables of<br />Institutional Leadership
              </h2>
              <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: BLUE }} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map(p => (
                <div key={p.num} className="dir-pillar group relative bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
                  <div className={`${cinzel.className} absolute top-5 right-6 text-5xl font-bold text-gray-100 group-hover:text-blue-50 transition-colors duration-300 select-none leading-none`}>{p.num}</div>
                  <div className="relative z-10 space-y-3">
                    <div className="w-8 h-0.5" style={{ background: BLUE }} />
                    <h3 className={`${cinzel.className} text-base font-bold uppercase tracking-wide`} style={{ color: '#111' }}>{p.label}</h3>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.92rem, 1vw, 1rem)', lineHeight: 1.85, color: '#666' }}>{p.desc}</p>
                  </div>
                  <div className="absolute left-0 top-6 bottom-6 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" style={{ background: BLUE }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MESSAGE FROM THE DIRECTOR ═══ */}
        <section ref={messageRef} className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg,#1e3a8a,#1e3a8a 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#1e3a8a,#1e3a8a 1px,transparent 1px,transparent 60px)' }} />
          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
            <div className="dir-msg-header text-center mb-14 space-y-4">
              <span className={`${cinzel.className} text-xs uppercase tracking-[0.3em] font-semibold`} style={{ color: BLUE }}>Director's Communication</span>
              <h2 className={`${cinzel.className} text-3xl md:text-4xl font-bold uppercase`} style={{ background: 'linear-gradient(90deg, #000000 0%, #1e3a8a 60%, #1e3a8a 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Message from<br />the Director
              </h2>
              <div className="w-16 h-0.5 mx-auto" style={{ background: BLUE }} />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #000000, #1e3a8a, #005C9F)' }} />
              <div className="p-8 md:p-12 space-y-6">
                <p className={`${cinzel.className} text-sm uppercase tracking-[0.2em] font-semibold`} style={{ color: BLUE }}>Dear Students, Faculty Members, and Stakeholders,</p>
                <blockquote className="relative pl-6 py-2 my-4" style={{ borderLeft: `4px solid ${BLUE}` }}>
                  <div className="absolute -top-2 -left-1 text-5xl leading-none select-none" style={{ color: 'rgba(0,92,159,0.15)' }}>"</div>
                  <p className="relative z-10 italic" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', lineHeight: 1.9, color: '#444' }}>
                    Learning that is relevant, skill-driven, technology-enabled, and aligned with the future of work — this is the academic vision at LEAD College.
                  </p>
                </blockquote>
                <div className="dir-msg-body space-y-5">
                  {messageParagraphs.map((para, i) => (
                    <p key={i} className="dir-msg-para" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.92rem, 1vw, 1rem)', lineHeight: 1.9, color: '#555' }}>{para}</p>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <div className="dir-msg-sig flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md" style={{ border: `2px solid rgba(0,92,159,0.2)` }}>
                      <Image src={DIRECTOR_IMAGE} alt="Dr. Sreekanth S. V." fill className="object-cover object-top" />
                    </div>
                    <div className="space-y-1">
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 600, color: '#111' }}>Dr. Sreekanth S. V.</p>
                      <p className={`${cinzel.className} text-xs uppercase tracking-[0.25em] font-semibold`} style={{ color: BLUE }}>Director, LEAD College</p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.78rem', color: '#888' }}>MBA · Doctorate, Symbiosis International University · Alumnus, IIM Ahmedabad</p>
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