'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cinzel, playfair } from '@/app/fonts';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* ─────────── CONSTANTS ─────────── */
const BLUE  = '#1e3a8a';
const BLUE2 = '#005C9F';
const MCA_URL = 'https://admission.lead.ac.in/lead-college-of-management-mca-application';

/* ─────────── IMAGES ─────────── */
const IMG = {
  hero:       '/convert/LEAD11.webp',
  curriculum: '/convert/LEAD13.webp',
  social:     '/convert/LEAD30.webp',
  assessment: '/convert/LEAD50.webp',
  cta:        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=90&auto=format',
};

/* ─────────── STYLE HELPERS ─────────── */
const P: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 'clamp(1rem, 1vw, 1rem)',
  lineHeight: 1.8,
  color: '#111',
};
const TG: React.CSSProperties = {
  background: 'linear-gradient(90deg, #000 0%, #1e3a8a 60%, #1e3a8a 100%)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
};

/* ─────────── REUSABLE ATOMS ─────────── */
const Label = ({ text }: { text: string }) => (
  <span className={cinzel.className} style={{ fontSize: '0.74rem', letterSpacing: '0.26em', color: BLUE2, textTransform: 'uppercase', fontWeight: 600 }}>{text}</span>
);

const Title = ({ children, size = 'clamp(1.53rem,2.7vw,2.52rem)' }: { children: React.ReactNode; size?: string }) => (
  <h2 className={`${cinzel.className} font-bold uppercase mt-1.5`} style={{ ...TG, fontSize: size, lineHeight: 1.05 }}>
    {children}
  </h2>
);

const Btn = ({ href, label, primary, ext }: { href: string; label: string; primary?: boolean; ext?: boolean }) => (
  <a href={href} target={ext ? '_blank' : undefined} rel="noreferrer"
    className={`inline-flex items-center gap-1.5 ${cinzel.className} px-4 py-2 rounded-full font-semibold transition-all duration-300`}
    style={primary
      ? { background: BLUE, color: '#fff', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }
      : { background: 'transparent', color: BLUE, border: `1.5px solid ${BLUE}`, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
    {label}
  </a>
);

/* ─────────── DATA ─────────── */
const CURRICULUM_POINTS = [
  'Cloud Computing',
  'AI & Machine Learning',
  'Data Science & Big Data',
  'Generative AI',
  'Cyber Security & Forensics',
  'Modern Web Frameworks',
  'Software Engineering & QA',
  'Game Development',
];

const EXPERIENTIAL = [
  {
    title: 'Live Projects',
    desc: 'Work on real-world problems with industry practitioners and build professional networks.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
  },
  {
    title: 'Lab-Intensive Courses',
    desc: 'Extensive hands-on learning through laboratory assignments and application development.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
  },
  {
    title: 'Industry Internships',
    desc: 'Structured industry exposure that enhances employability and career readiness.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  },
];

const RESIDENTIAL_FEATURES = [
  { title: 'Continuous Learning',       desc: 'Continuous learning and peer collaboration in a focused residential environment.' },
  { title: 'Faculty Mentoring',          desc: 'Close faculty mentoring and guidance available round the clock on campus.' },
  { title: 'Holistic Development',       desc: 'Holistic development through teamwork and professional discipline.' },
  { title: 'Professional Culture',       desc: 'A professional culture essential for technology careers in the real world.' },
];

const FACULTY_ITEMS = [
  { title: 'Strong Credentials', desc: 'Highly qualified faculty with academic credentials and research focus in computer science domains.', path: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { title: 'Industry Exposure',  desc: 'Active industry engagement ensuring current, relevant, and applied teaching at all times.', path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { title: 'Continuous Growth',  desc: 'Ongoing faculty development aligned with global standards in technology and pedagogy.', path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
];

const ASSESSMENT_METHODS = [
  'Coding and application development assignments',
  'Lab-based evaluations and project demonstrations',
  'Case studies and problem-solving exercises',
  'Continuous assessment aligned with programme outcomes',
];

const CAREER_PATHS = [
  { title: 'Software Development', desc: 'Developers and designers',             path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { title: 'Data Science',         desc: 'Data scientists & Big Data engineers',  path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { title: 'Cloud & AI',           desc: 'Cloud computing & AI engineers',        path: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
  { title: 'Cyber Security',       desc: 'Security & forensics experts',          path: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { title: 'Game Development',     desc: 'Game developers & designers',           path: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
  { title: 'Generative AI',        desc: 'GenAI engineers & specialists',         path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { title: 'Entrepreneurship',     desc: 'Technology entrepreneurs',              path: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'And More',             desc: 'Emerging technology roles',             path: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function MCAPage() {
  const heroRef        = useRef<HTMLElement>(null);
  const commitRef      = useRef<HTMLElement>(null);
  const currRef        = useRef<HTMLElement>(null);
  const expRef         = useRef<HTMLElement>(null);
  const residentialRef = useRef<HTMLElement>(null);
  const facultyRef     = useRef<HTMLElement>(null);
  const assessRef      = useRef<HTMLElement>(null);
  const careerRef      = useRef<HTMLElement>(null);
  const ctaRef         = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero: CSS-first hidden, GSAP only animates IN ── */
      const htl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });
      htl.to('.h-img',    { scale: 1,   opacity: 1, duration: 2,   ease: 'power4.out' })
         .to('.h-line',   { opacity: 1, rotateX: 0, y: 0, scale: 1, filter: 'blur(0px)', duration: 1, stagger: 0.13, ease: 'power4.out' }, '-=1.3')
         .to('.h-sub',    { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
         .to('.h-badges', { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
         .to('.h-stat',   { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.35');

      gsap.to('.h-img', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.4 } });

      /* ── Generic reveal helper ── */
      const reveal = (cls: string, trigger: React.RefObject<HTMLElement | null>, from: object, extra?: object) =>
        gsap.fromTo(cls,
          { opacity: 0, ...from },
          { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: trigger.current, start: 'top 74%' }, ...extra }
        );

      if (commitRef.current)      { reveal('.cm-l', commitRef, { x: -45 }); reveal('.cm-r', commitRef, { x: 45 }); }
      if (currRef.current)        { reveal('.cu-img', currRef, { x: -45 }); reveal('.cu-txt', currRef, { x: 45 }); reveal('.cu-pt', currRef, { y: 20 }, { stagger: 0.07 }); }
      if (expRef.current)         { reveal('.ex-card', expRef, { y: 50, scale: 0.96 }, { stagger: 0.12 }); }
      if (residentialRef.current) { reveal('.re-l', residentialRef, { x: -45 }); reveal('.re-feat', residentialRef, { y: 22 }, { stagger: 0.1 }); }
      if (facultyRef.current)     { reveal('.fa-item', facultyRef, { y: 40 }, { stagger: 0.1 }); }
      if (assessRef.current)      { reveal('.as-txt', assessRef, { x: -45 }); reveal('.as-img', assessRef, { x: 45 }); reveal('.as-mth', assessRef, { y: 18 }, { stagger: 0.09 }); }
      if (careerRef.current)      { reveal('.ca-item', careerRef, { y: 40 }, { stagger: 0.07 }); }
      if (ctaRef.current) {
        gsap.fromTo('.cta-bg', { scale: 1.15, opacity: 0 }, { scale: 1.08, opacity: 1, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' } });
        reveal('.cta-line', ctaRef, { y: 60 }, { stagger: 0.12 });
        reveal('.cta-sub',  ctaRef, { y: 30 });
        reveal('.cta-btn',  ctaRef, { y: 20 }, { stagger: 0.12 });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.2, smoothWheel: true }}>
      <>
        {/* ── CSS-first hidden states — prevents hero flash / double render ── */}
        <style>{`
          .dot-grid { background-image: radial-gradient(circle, rgba(30,58,138,0.08) 1px, transparent 1px); background-size: 24px 24px; }
          .vh { height: 100vh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
          /* Mobile/tablet: two-column sections stack, so release the fixed viewport height
             and let content flow — prevents text cut-off and image/text overlap. */
          @media (max-width: 1023px) {
            .vh { height: auto; min-height: 100vh; overflow: visible; padding-top: 5.5rem; padding-bottom: 4rem; }
            /* Full-bleed image sections (hero, CTA) keep their clip so parallax stays contained */
            .vh.bg-black { overflow: hidden; padding-top: 0; padding-bottom: 0; }
          }

          .h-line   { opacity: 0; transform: rotateX(80deg) translateY(-30px) scale(0.88); filter: blur(4px); transform-style: preserve-3d; backface-visibility: hidden; }
          .h-sub    { opacity: 0; transform: translateY(22px); }
          .h-badges { opacity: 0; transform: translateY(22px); }
          .h-stat   { opacity: 0; transform: translateY(22px); }
          .h-img    { opacity: 0; transform: scale(1.1); }

          .cb { position: relative; overflow: hidden; transition: transform .3s ease, box-shadow .3s ease; }
          .cb::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,0.14); transform:translateX(-100%); transition:transform .4s ease; }
          .cb:hover::after { transform: translateX(0); }
          .cb:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(30,58,138,0.2); }
        `}</style>

        <div className="overflow-x-hidden bg-black">

          {/* ══════════════════════ §1 HERO ══════════════════════ */}
          <section ref={heroRef} className="vh relative bg-black">
            <div className="absolute inset-0 z-0">
              <Image src={IMG.hero} alt="MCA at LEAD" fill priority className="object-cover h-img" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="absolute inset-0 dot-grid opacity-[0.14] z-0 pointer-events-none" />
            <div className="absolute top-5 left-5 w-9 h-9 border-t border-l border-white/18 z-10" />
            <div className="absolute bottom-5 right-5 w-9 h-9 border-b border-r border-white/18 z-10" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 pt-28 pb-10">
              {/* Small eyebrow — punch line */}
              <p className={`h-line ${cinzel.className} uppercase text-white/70 mb-3`}
                style={{ fontSize: 'clamp(0.66rem,0.8vw,0.74rem)', letterSpacing: '0.28em', fontWeight: 600 }}>
                Engineering Digital Futures
              </p>

              {/* Big title — department name */}
              <h1 className={`${cinzel.className} uppercase font-bold leading-[0.9] mb-5`}
                style={{ fontSize: 'clamp(2.2rem,5.5vw,6rem)' }}>
                <span className="h-line block text-white">Department of</span>
                <span className="h-line block text-white">Computer</span>
                <span className="h-line block text-white">Applications</span>
              </h1>

              {/* 4 badges */}
              <div className="h-badges flex flex-wrap gap-2 mb-8">
                {['Autonomous', 'AICTE Approved', 'Industry-Aligned', 'Since 2024'].map(b => (
                  <span key={b} className={`${cinzel.className} px-3 py-1.5 rounded-full`}
                    style={{
                      background: 'rgba(255,255,255,0.1)', color: '#fff',
                      border: '1px solid rgba(255,255,255,0.28)',
                      backdropFilter: 'blur(8px)',
                      fontSize: 'clamp(0.66rem,0.8vw,0.74rem)',
                      textTransform: 'uppercase', letterSpacing: '0.12em',
                    }}>
                    {b}
                  </span>
                ))}
              </div>

              {/* Stats strip — unique content from page, not repeating badges */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
                {[
                                  { val: '100%',  lbl: 'Placement Support' },
                                          { val: 'Live',  lbl: 'Industry Projects' },
                  { val: '8+',    lbl: 'Specialisation Tracks' },
  
                  { val: '3',     lbl: 'Experiential Learning Modes' },
          
                ].map(s => (
                  <div key={s.val} className="h-stat">
                    <p className={cinzel.className} style={{ fontSize: 'clamp(1rem,1.8vw,1.7rem)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.val}</p>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.72rem', color: '#fff', marginTop: 3 }}>{s.lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════ §2 COMMITMENT ══════════════════════ */}
          <section ref={commitRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">

              {/* Left */}
              <div className="cm-l" style={{ opacity: 1 }}>
                <Label text="About the Programme" />
                <Title size="clamp(1.44rem,2.6vw,2.4rem)">LEAD MCA —<br />A Commitment to<br />Technological Excellence</Title>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {[
                    { v: 'AICTE',  l: 'Approved' },
                    { v: 'Auto',   l: 'Autonomous' },
                    { v: '100%',   l: 'Residential' },
                    { v: '2024',   l: 'Redesigned' },
                  ].map(s => (
                    <div key={s.l} className="bg-blue-50/60 rounded-xl p-3 border border-blue-100/50">
                      <p className={cinzel.className} style={{ fontSize: '1.25rem', fontWeight: 700, color: BLUE, lineHeight: 1 }}>{s.v}</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.72rem', color: '#111', marginTop: 2 }}>{s.l}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Btn href={MCA_URL} label="Apply for MCA" primary ext />
                  <Btn href="/admissions" label="Admissions Info" />
                </div>
              </div>

              {/* Right */}
              <div className="cm-r space-y-5" style={{ opacity: 1 }}>
                <p style={P}>
                  The Department of Computer Applications at LEAD College remains dedicated to continuous innovation, academic rigour, and societal relevance. Since its inception in 2010, the department has consistently upheld academic excellence, and with the conferment of autonomous status in 2024, the MCA programme has been comprehensively redesigned to align with cutting-edge technologies and industry expectations.
                </p>
                <p style={P}>
                  The programme is AICTE-approved and fully residential, providing an immersive learning environment that blends strong computing fundamentals with advanced, application-oriented skills. Students graduate not just with a degree, but with demonstrated technical competence, problem-solving ability, and the professional readiness demanded by today's technology sector.
                </p>
                <p style={P}>
                  Through a curriculum that is continuously refreshed, a faculty that bridges academia and industry, and a hands-on assessment model that rewards application over rote learning, the MCA at LEAD represents a benchmark for modern computing education in the region.
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════ §3 CURRICULUM ══════════════════════ */}
          <section ref={currRef} className="py-16 bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* Image */}
                <div className="cu-img relative h-[400px] overflow-hidden rounded-2xl shadow-xl" style={{ opacity: 1 }}>
                  <Image src={IMG.curriculum} alt="Digital Curriculum" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />
                </div>

                {/* Content */}
                <div className="cu-txt space-y-4" style={{ opacity: 1 }}>
                  <Label text="Curriculum" />
                  <Title size="clamp(1.3rem,2.4vw,2.2rem)">A Curriculum Built<br />for the Digital Era</Title>
                  <p style={P}>The MCA curriculum at LEAD is dynamic, modular, and continuously updated — leveraging autonomous status to ensure relevance for every incoming batch. Core focus areas include:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {CURRICULUM_POINTS.map(pt => (
                      <div key={pt} className="cu-pt flex items-start gap-2.5" style={{ opacity: 1 }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: BLUE }} />
                        <p style={{ ...P, margin: 0, fontSize: '1rem' }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                  <p style={P}>This modern curriculum equips students with industry-aligned technical competence and problem-solving capabilities required in real-world digital environments.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════ §4 EXPERIENTIAL LEARNING ══════════════════════ */}
          <section ref={expRef} className="py-16 bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <div>
                  <Label text="Learning by Doing" />
                  <Title size="clamp(1.44rem,2.52vw,2.25rem)">Experiential Learning,<br />Internships &amp; Live Projects</Title>
                </div>
                <p style={{ ...P, maxWidth: 280 }}>Learning by building, testing, and deploying real systems.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {EXPERIENTIAL.map(({ title, desc, icon }) => (
                  <div key={title} className="ex-card bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300" style={{ opacity: 1 }}>
                    {/* Mini inline illustration */}
                    <div className="w-full h-24 mb-4 flex items-center justify-center rounded-xl" style={{ background: 'rgba(30,58,138,0.04)' }}>
                      {title === 'Live Projects' && (
                        <svg viewBox="0 0 120 60" fill="none" style={{ width: 110, height: 55 }}>
                          <rect x="15" y="8" width="90" height="44" rx="5" fill="#dbeafe"/>
                          <rect x="15" y="8" width="90" height="12" rx="5" fill={BLUE} opacity="0.7"/>
                          <rect x="23" y="28" width="50" height="3.5" rx="1.8" fill={BLUE} opacity="0.3"/>
                          <rect x="23" y="35" width="35" height="3.5" rx="1.8" fill={BLUE} opacity="0.25"/>
                          <rect x="23" y="42" width="42" height="3.5" rx="1.8" fill={BLUE} opacity="0.25"/>
                          <circle cx="92" cy="38" r="10" fill={BLUE} opacity="0.12"/>
                          <path d="M87 38 L90 41 L97 33" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {title === 'Lab-Intensive Courses' && (
                        <svg viewBox="0 0 120 60" fill="none" style={{ width: 110, height: 55 }}>
                          <rect x="10" y="10" width="30" height="40" rx="4" fill="#dbeafe"/>
                          <rect x="15" y="16" width="20" height="3" rx="1.5" fill={BLUE} opacity="0.4"/>
                          <rect x="15" y="22" width="14" height="3" rx="1.5" fill={BLUE} opacity="0.3"/>
                          <rect x="15" y="28" width="18" height="3" rx="1.5" fill={BLUE} opacity="0.3"/>
                          <rect x="15" y="34" width="12" height="3" rx="1.5" fill={BLUE} opacity="0.25"/>
                          <rect x="46" y="10" width="64" height="40" rx="4" fill="#eff6ff"/>
                          <rect x="46" y="10" width="64" height="8" rx="4" fill={BLUE} opacity="0.65"/>
                          <rect x="52" y="24" width="52" height="3" rx="1.5" fill={BLUE} opacity="0.2"/>
                          <rect x="52" y="30" width="38" height="3" rx="1.5" fill={BLUE} opacity="0.18"/>
                          <rect x="52" y="36" width="44" height="3" rx="1.5" fill={BLUE} opacity="0.15"/>
                        </svg>
                      )}
                      {title === 'Industry Internships' && (
                        <svg viewBox="0 0 120 60" fill="none" style={{ width: 110, height: 55 }}>
                          <ellipse cx="60" cy="56" rx="44" ry="3.5" fill="#e5e7eb"/>
                          <circle cx="38" cy="28" r="12" fill={BLUE} opacity="0.75"/>
                          <ellipse cx="38" cy="52" rx="14" ry="20" fill={BLUE} opacity="0.6"/>
                          <circle cx="75" cy="30" r="11" fill={BLUE} opacity="0.65"/>
                          <ellipse cx="75" cy="52" rx="13" ry="18" fill={BLUE} opacity="0.5"/>
                          <rect x="45" y="20" width="22" height="14" rx="3" fill="#fff" stroke="rgba(30,58,138,0.25)" strokeWidth="1"/>
                          <rect x="48" y="24" width="16" height="2.5" rx="1" fill={BLUE} opacity="0.35"/>
                          <rect x="48" y="29" width="11" height="2.5" rx="1" fill={BLUE} opacity="0.25"/>
                        </svg>
                      )}
                    </div>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(30,58,138,0.07)' }}>
                      <svg className="w-5 h-5" style={{ color: BLUE }} fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                    </div>
                    <h3 className={cinzel.className} style={{ fontSize: 'clamp(0.72rem,0.92vw,0.86rem)', fontWeight: 700, color: '#111', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</h3>
                    <p style={P}>{desc}</p>
                  </div>
                ))}
              </div>

              <p style={{ ...P, marginTop: '2rem', textAlign: 'center', maxWidth: 680, margin: '2rem auto 0' }}>
                Through structured industry exposure, students work on real-world problems, interact with practitioners, and build professional networks — ensuring graduates are workplace-ready from day one.
              </p>
            </div>
          </section>

          {/* ══════════════════════ §5 RESIDENTIAL ══════════════════════ */}
          <section ref={residentialRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

              {/* Left: all text */}
              <div className="re-l space-y-5" style={{ opacity: 1 }}>
                <Label text="Campus Life" />
                <Title size="clamp(1.44rem,2.6vw,2.4rem)">Fully Residential &amp;<br />Immersive Learning</Title>
                <p style={P}>
                  The MCA programme is offered in a fully residential format at the serene campus in Dhoni, Palakkad, fostering continuous learning, peer collaboration, and close faculty mentoring throughout the academic year.
                </p>
                <div className="space-y-3 pt-1">
                  {RESIDENTIAL_FEATURES.map(({ title, desc }) => (
                    <div key={title} className="re-feat flex items-start gap-3" style={{ opacity: 1 }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: BLUE }} />
                      <div>
                        <p className={cinzel.className} style={{ fontSize: 'clamp(0.62rem,0.78vw,0.72rem)', fontWeight: 700, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{title}</p>
                        <p style={P}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <Btn href={MCA_URL} label="Apply for MCA" primary ext />
                </div>
              </div>

              {/* Right: image with overlay */}
              <div className="re-l relative h-[480px]" style={{ opacity: 1 }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={IMG.social} alt="LEAD residential campus" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="rounded-xl px-5 py-4 border border-white/18" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                      <p className={cinzel.className} style={{ color: '#fff', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>
                        Fully Residential Campus
                      </p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', color: '#fff', lineHeight: 1.55 }}>
                        Dhoni, Palakkad — a serene environment built for focus, growth &amp; innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════ §6 FACULTY ══════════════════════ */}
          <section ref={facultyRef} className="py-16 bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-10 text-center">
                <Label text="Our Faculty" />
                <Title size="clamp(1.44rem,2.52vw,2.25rem)">Faculty with Academic Depth<br />&amp; Industry Expertise</Title>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {FACULTY_ITEMS.map(({ title, desc, path }) => (
                  <div key={title} className="fa-item bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300" style={{ opacity: 1 }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(30,58,138,0.07)' }}>
                      <svg className="w-7 h-7" style={{ color: BLUE }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
                      </svg>
                    </div>
                    <h3 className={cinzel.className} style={{ fontSize: 'clamp(0.72rem,0.9vw,0.86rem)', fontWeight: 700, color: '#111', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</h3>
                    <p style={P}>{desc}</p>
                  </div>
                ))}
              </div>

              <p style={{ ...P, marginTop: '2.5rem', textAlign: 'center', maxWidth: 680, margin: '2.5rem auto 0' }}>
                Faculty actively engage in teaching, mentoring, curriculum development, and applied research — ensuring students benefit from both theoretical rigour and practical insight.
              </p>
            </div>
          </section>

          {/* ══════════════════════ §7 ASSESSMENT ══════════════════════ */}
          <section ref={assessRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

              {/* Left: text */}
              <div className="as-txt space-y-4" style={{ opacity: 1 }}>
                <Label text="Evaluation" />
                <Title size="clamp(1.44rem,2.6vw,2.4rem)">Skill-Based &amp;<br />Authentic Assessment</Title>
                <p style={P}>Assessment extends beyond conventional examinations. We adopt skill-based, authentic assessment methods that evaluate students' ability to apply knowledge in real-world contexts.</p>
                <div className="space-y-2.5">
                  {ASSESSMENT_METHODS.map(m => (
                    <div key={m} className="as-mth flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 bg-white hover:bg-blue-50/40 transition-colors duration-300" style={{ opacity: 1 }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: BLUE }} />
                      <p style={{ ...P, margin: 0 }}>{m}</p>
                    </div>
                  ))}
                </div>
                <p style={{ ...P, fontStyle: 'normal' }}>This approach ensures measurable attainment of both technical and professional competencies.</p>
              </div>

              {/* Right: image */}
              <div className="as-img relative h-[420px]" style={{ opacity: 1 }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={IMG.assessment} alt="Skill Assessment" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════ §8 CAREER PATHS — 100vh with illustration ══════════════════════ */}
          <section ref={careerRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_1.8fr] gap-14 items-center">

              {/* Left: heading + undraw illustration */}
              <div className="ca-item flex flex-col gap-6" style={{ opacity: 1 }}>
                <div>
                  <Label text="Career Outcomes" />
                  <Title size="clamp(1.44rem,2.6vw,2.4rem)">Career Pathways &amp;<br />Placement<br />Commitment</Title>
                  <p style={{ ...P, marginTop: '0.75rem' }}>Empowering diverse roles in the technology sector. With structured training and industry alignment, the department is committed to supporting students in achieving successful and rewarding careers.</p>
                </div>
                {/* Undraw-style tech career illustration */}
                <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 260, height: 'auto' }}>
                  <ellipse cx="120" cy="174" rx="90" ry="5" fill="#e5e7eb"/>
                  {/* Monitor */}
                  <rect x="55" y="30" width="130" height="90" rx="7" fill="#dbeafe"/>
                  <rect x="55" y="30" width="130" height="16" rx="7" fill={BLUE} opacity="0.8"/>
                  <rect x="55" y="38" width="130" height="8" fill={BLUE} opacity="0.8"/>
                  {/* Code lines on screen */}
                  <rect x="66" y="58" width="60" height="4" rx="2" fill={BLUE} opacity="0.3"/>
                  <rect x="66" y="66" width="40" height="4" rx="2" fill={BLUE} opacity="0.22"/>
                  <rect x="66" y="74" width="72" height="4" rx="2" fill={BLUE} opacity="0.22"/>
                  <rect x="66" y="82" width="50" height="4" rx="2" fill={BLUE} opacity="0.18"/>
                  <rect x="66" y="90" width="65" height="4" rx="2" fill={BLUE} opacity="0.18"/>
                  {/* Check mark badge */}
                  <circle cx="155" cy="78" r="14" fill={BLUE} opacity="0.12"/>
                  <path d="M148 78 L153 83 L163 71" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Monitor stand */}
                  <rect x="108" y="120" width="24" height="12" rx="2" fill="#bfdbfe"/>
                  <rect x="94" y="130" width="52" height="6" rx="3" fill="#93c5fd"/>
                  {/* Person sitting */}
                  <circle cx="120" cy="152" r="9" fill={BLUE} opacity="0.7"/>
                  <ellipse cx="120" cy="168" rx="12" ry="8" fill={BLUE} opacity="0.55"/>
                  {/* Floating tech tags */}
                  <rect x="10" y="50" width="36" height="14" rx="4" fill={BLUE} opacity="0.1"/>
                  <text x="15" y="61" fill={BLUE} fontSize="6" fontWeight="700" opacity="0.6">AI / ML</text>
                  <rect x="194" y="45" width="38" height="14" rx="4" fill={BLUE} opacity="0.1"/>
                  <text x="198" y="56" fill={BLUE} fontSize="6" fontWeight="700" opacity="0.6">Cloud</text>
                  <rect x="8" y="95" width="40" height="14" rx="4" fill={BLUE} opacity="0.1"/>
                  <text x="12" y="106" fill={BLUE} fontSize="6" fontWeight="700" opacity="0.55">Security</text>
                  <rect x="192" y="90" width="40" height="14" rx="4" fill={BLUE} opacity="0.1"/>
                  <text x="196" y="101" fill={BLUE} fontSize="6" fontWeight="700" opacity="0.55">Data Sci</text>
                </svg>
              </div>

              {/* Right: 4×2 career grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {CAREER_PATHS.map(({ title, desc, path }) => (
                  <div key={title} className="ca-item bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center" style={{ opacity: 1 }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: BLUE }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                      </svg>
                    </div>
                    <h3 className={cinzel.className} style={{ fontSize: 'clamp(0.66rem,0.8vw,0.74rem)', fontWeight: 700, color: '#111', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3 }}>{title}</h3>
                    <p style={{ ...P, fontSize: '1rem' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════ §9 CTA ══════════════════════ */}
          <section ref={ctaRef} className="vh relative bg-black" style={{ minHeight: '80vh' }}>
            <div className="absolute inset-0 z-0">
              <Image src={IMG.cta} alt="Shape Your Digital Future" fill className="object-cover cta-bg" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
              <h2 className={`${cinzel.className} uppercase font-bold leading-[0.9] mb-6`}
                style={{ fontSize: 'clamp(2.8rem,6vw,6.5rem)' }}>
                <span className="cta-line block text-white" style={{ opacity: 1 }}>Shape Your</span>
                <span className="cta-line block text-white" style={{ opacity: 1 }}>Digital Future</span>
              </h2>

              <p className="cta-sub max-w-2xl mx-auto mb-10"
                style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1rem,1.1vw,1.05rem)', lineHeight: 1.85, color: '#fff', opacity: 1 }}>
                Join the next generation of technology professionals, innovators, and digital architects at LEAD. Our MCA programme has been shaping computing careers since 2010 and comprehensively redesigned in 2024 to meet the demands of an AI-driven world. Whether you aspire to build software, engineer intelligent systems, or launch a technology venture, LEAD gives you the foundation, the skills, and the environment to do it. Your digital future begins here.
              </p>

              <div className="flex justify-center">
                <a href={MCA_URL} target="_blank" rel="noreferrer"
                  className={`cta-btn ${cinzel.className} px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105`}
                  style={{ background: '#fff', color: BLUE, fontSize: 'clamp(0.58rem,.78vw,.72rem)', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 1 }}>
                  Apply Now
                </a>
              </div>
            </div>
          </section>

        </div>
      </>
    </ReactLenis>
  );
}