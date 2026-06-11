'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cinzel, playfair } from '@/app/fonts';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* ─────────── CONSTANTS ─────────── */
const BLUE  = '#1e3a8a';
const BLUE2 = '#005C9F';
const MBA_URL = 'https://admission.lead.ac.in/lead-college-of-management-mba-application';

/* ─────────── IMAGES ─────────── */
const IMG = {
  hero:        '/convert/LEAD33.webp',
  curriculum:  '/convert/LEAD55.webp',
  int1:        '/convert/LEAD38.webp',
  int2:        '/convert/LEAD16.webp',
  int3:        '/convert/LEAD13.webp',
  social:      '/convert/LEAD31.webp',
  residential: '/convert/LEAD52.webp',
  assessment:  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=90&auto=format',
  cta:         '/convert/LEAD32.webp',
};

/* ─────────── STYLE HELPERS ─────────── */
const P: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 'clamp(0.75rem, 0.88vw, 0.88rem)',
  lineHeight: 1.8,
  color: '#555',
};
const TG: React.CSSProperties = {
  background: 'linear-gradient(90deg, #000 0%, #1e3a8a 60%, #1e3a8a 100%)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
};

/* ─────────── REUSABLE ATOMS ─────────── */
const Label = ({ text }: { text: string }) => (
  <span className={cinzel.className} style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: BLUE2, textTransform: 'uppercase', fontWeight: 600 }}>{text}</span>
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
      ? { background: BLUE, color: '#fff', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em' }
      : { background: 'transparent', color: BLUE, border: `1.5px solid ${BLUE}`, fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
    {label}
  </a>
);

/* ─────────── DATA ─────────── */
const INTERNSHIPS = [
  { n: '01', sem: 'Semester I',   img: IMG.int1, desc: 'Business immersion and functional exposure across departments.' },
  { n: '02', sem: 'Semester II',  img: IMG.int2, desc: 'Domain-specific and analytics-driven assignments with industry partners.' },
  { n: '03', sem: 'Semester III', img: IMG.int3, desc: 'Strategic, consulting, or entrepreneurial projects with real outcomes.' },
];

const PROJECTS = [
  { title: 'Industry Project',  desc: 'In collaboration with corporates, solving real business challenges.',           icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> },
  { title: 'Research Project', desc: 'Aligned with contemporary business problems and academic inquiry.',             icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
  { title: 'Startup Project',  desc: 'Work on your own ventures or incubated entrepreneurial ideas.',                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> },
];

const FACULTY_ITEMS = [
  { title: 'Academic Credentials', desc: 'Strong academic credentials from premier national and international institutions.', path: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { title: 'Industry Experience',  desc: 'Extensive industry experience across diverse sectors, bridging theory and practice.', path: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'Global Perspectives',  desc: 'International exposure in teaching, research, consulting, and academic exchange.', path: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

const ASSESSMENT_METHODS = [
  'Live projects and case analyses',
  'Analytics assignments and tool-based evaluations',
  'Simulations, presentations, and strategic reports',
  'Continuous assessment aligned with learning outcomes',
];

const LEADERSHIP_PATHS = [
  { title: 'Corporate Leadership', desc: 'Leadership roles in global corporations and conglomerates.',    path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { title: 'Consulting & Analytics', desc: 'Strategic consulting and data-driven decision-making roles.',  path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { title: 'Entrepreneurship',      desc: 'Building, launching, and scaling innovative startups.',        path: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Digital Careers',       desc: 'Emerging digital, technology, and managerial career paths.',   path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
];

const RESIDENTIAL_FEATURES = [
  { title: 'Continuous Interaction',  desc: 'Uninterrupted faculty–student interaction fostering deep learning relationships and mentoring.' },
  { title: 'Peer Learning',            desc: 'Collaborative residential environment for peer learning, leadership development, and group growth.' },
  { title: 'Professional Culture',     desc: 'Discipline, collaboration, and professional culture embedded in serene Dhoni, Palakkad.' },
];

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function MBAPage() {
  const heroRef        = useRef<HTMLElement>(null);
  const commitRef      = useRef<HTMLElement>(null);
  const currRef        = useRef<HTMLElement>(null);
  const intRef         = useRef<HTMLElement>(null);
  const socialRef      = useRef<HTMLElement>(null);
  const projectRef     = useRef<HTMLElement>(null);
  const residentialRef = useRef<HTMLElement>(null);
  const facultyRef     = useRef<HTMLElement>(null);
  const assessRef      = useRef<HTMLElement>(null);
  const leadersRef     = useRef<HTMLElement>(null);
  const ctaRef         = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero: CSS-first hidden state, GSAP animates IN only ── */
      const htl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });
      htl.to('.h-img',  { scale: 1, opacity: 1, duration: 2, ease: 'power4.out' })
         .to('.h-line', { opacity: 1, rotateX: 0, y: 0, scale: 1, filter: 'blur(0px)', duration: 1, stagger: 0.13, ease: 'power4.out' }, '-=1.3')
         .to('.h-sub',  { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
         .to('.h-badges', { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
         .to('.h-stat', { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.35');

      gsap.to('.h-img', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.4 } });

      /* ── Generic scroll reveal helper ── */
      const reveal = (cls: string, trigger: React.RefObject<HTMLElement | null>, from: object, extra?: object) =>
        gsap.fromTo(cls,
          { opacity: 0, ...from },
          { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: trigger.current, start: 'top 74%' }, ...extra }
        );

      if (commitRef.current)      { reveal('.cm-l', commitRef, { x: -45 }); reveal('.cm-r', commitRef, { x: 45 }); }
      if (currRef.current)        { reveal('.cu-img', currRef, { x: -45 }); reveal('.cu-txt', currRef, { x: 45 }); reveal('.cu-pt', currRef, { y: 20 }, { stagger: 0.1 }); }
      if (intRef.current)         { reveal('.in-card', intRef, { y: 50, scale: 0.96 }, { stagger: 0.12 }); }
      if (socialRef.current)      { reveal('.so-img', socialRef, { x: -45 }); reveal('.so-txt', socialRef, { x: 45 }); reveal('.so-hl', socialRef, { y: 16 }, { stagger: 0.09 }); }
      if (projectRef.current)     { reveal('.pr-card', projectRef, { y: 50, scale: 0.96 }, { stagger: 0.12 }); }
      if (residentialRef.current) { reveal('.re-l', residentialRef, { x: -45 }); reveal('.re-feat', residentialRef, { y: 22 }, { stagger: 0.1 }); }
      if (facultyRef.current)     { reveal('.fa-item', facultyRef, { y: 40 }, { stagger: 0.1 }); }
      if (assessRef.current)      { reveal('.as-txt', assessRef, { x: -45 }); reveal('.as-img', assessRef, { x: 45 }); reveal('.as-mth', assessRef, { y: 18 }, { stagger: 0.09 }); }
      if (leadersRef.current)     { reveal('.ld-item', leadersRef, { y: 40 }, { stagger: 0.1 }); }
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
        {/* ── CSS-first hidden states for hero (prevents flash / double render) ── */}
        <style>{`
          .dot-grid { background-image: radial-gradient(circle, rgba(30,58,138,0.08) 1px, transparent 1px); background-size: 24px 24px; }
          .vh { height: 100vh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }

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
              <Image src={IMG.hero} alt="MBA at LEAD" fill priority className="object-cover h-img" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="absolute inset-0 dot-grid opacity-[0.14] z-0 pointer-events-none" />
            <div className="absolute top-5 left-5 w-9 h-9 border-t border-l border-white/18 z-10" />
            <div className="absolute bottom-5 right-5 w-9 h-9 border-b border-r border-white/18 z-10" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 pt-28 pb-10">
              {/* Small eyebrow */}
              <p className={`h-line ${cinzel.className} uppercase text-white/70 mb-3`}
                style={{ fontSize: 'clamp(0.5rem,0.72vw,0.65rem)', letterSpacing: '0.35em', fontWeight: 600 }}>
                Designing Leaders
              </p>

              {/* Big title */}
              <h1 className={`${cinzel.className} uppercase font-bold leading-[0.9] mb-5`}
                style={{ fontSize: 'clamp(2.2rem,5.5vw,6rem)' }}>
                <span className="h-line block text-white">Department of</span>
                <span className="h-line block text-white">Management</span>
                <span className="h-line block text-white">Studies</span>
              </h1>

              {/* 4 badges */}
              <div className="h-badges flex flex-wrap gap-2 mb-8">
                {['Autonomous', 'AICTE Approved', 'Since 2010', 'Industry-Aligned'].map(b => (
                  <span key={b}
                    className={`${cinzel.className} px-3 py-1.5 rounded-full`}
                    style={{
                      background: 'rgba(255,255,255,0.1)', color: '#fff',
                      border: '1px solid rgba(255,255,255,0.28)',
                      backdropFilter: 'blur(8px)',
                      fontSize: 'clamp(0.44rem,.62vw,.58rem)',
                      textTransform: 'uppercase', letterSpacing: '0.16em',
                    }}>
                    {b}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
                {[
                  { val: '360',    lbl: 'MBA Seats' },
                  { val: 'NBA',    lbl: 'Accredited' },
                  { val: 'Since 2010', lbl: 'Years of Excellence' },
                  { val: '3',      lbl: 'Internships' },
                ].map(s => (
                  <div key={s.val} className="h-stat">
                    <p className={cinzel.className} style={{ fontSize: 'clamp(1rem,1.8vw,1.7rem)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.val}</p>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{s.lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════ §2 COMMITMENT ══════════════════════ */}
          <section ref={commitRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">

              {/* Left */}
              <div className="cm-l" style={{ opacity: 0 }}>
                <Label text="About the Programme" />
                <Title size="clamp(1.44rem,2.6vw,2.4rem)">LEAD MBA —<br />A Commitment to<br />Continuous Excellence</Title>
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {[
                    { v: '360', l: 'MBA Seats' },
                    { v: 'NBA', l: 'Accredited' },
                    { v: '3',   l: 'Internships' },
                    { v: '100%', l: 'Residential' },
                  ].map(s => (
                    <div key={s.l} className="bg-blue-50/60 rounded-xl p-3 border border-blue-100/50">
                      <p className={cinzel.className} style={{ fontSize: '1.25rem', fontWeight: 700, color: BLUE, lineHeight: 1 }}>{s.v}</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.65rem', color: '#666', marginTop: 2 }}>{s.l}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Btn href={MBA_URL} label="Apply for MBA" primary ext />
                  <Btn href="/admissions" label="Admissions Info" />
                </div>
              </div>

              {/* Right */}
              <div className="cm-r space-y-5" style={{ opacity: 0 }}>
                <p style={P}>
                  The MBA programme at LEAD College is built on a singular conviction — that management education must be dynamic, purposeful, and rooted in real-world practice. Since its inception in 2010, the Department of Management Studies has continuously evolved its approach, integrating modern pedagogy with experiential learning to produce graduates who are genuinely prepared for the demands of industry and society.
                </p>
                <p style={P}>
                  The Department remains dedicated to continuous innovation, academic excellence, and societal impact. With a dynamic curriculum, immersive residential model, strong industry connect, and future-oriented pedagogy, the MBA programme stands as a benchmark for contemporary management education in the region.
                </p>
                <p style={P}>
                  The next-generation MBA programme combines academic rigour with digital mastery, three structured internships, live project work, social immersion, and leadership development — designed for a rapidly evolving global business environment where adaptability and accountability are non-negotiable. Every element, from classroom instruction to co-curricular engagement, is intentionally designed to shape professionals who lead with integrity and act with purpose.
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════ §3 CURRICULUM ══════════════════════ */}
          <section ref={currRef} className="py-16 bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* Image */}
                <div className="cu-img relative h-[400px] overflow-hidden rounded-2xl shadow-xl" style={{ opacity: 0 }}>
                  <Image src={IMG.curriculum} alt="Evolving Curriculum" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />
                </div>

                {/* Content */}
                <div className="cu-txt space-y-4" style={{ opacity: 0 }}>
                  <Label text="Curriculum" />
                  <Title size="clamp(1.3rem,2.4vw,2.2rem)">A Curriculum<br />That Evolves</Title>
                  <p style={P}>At LEAD, the MBA curriculum is not static. Leveraging autonomous status, the syllabus is reviewed and refined for every incoming batch, incorporating:</p>
                  <div className="space-y-2">
                    {['Current industry trends and digital disruptions', 'Emerging technologies and business models', 'Regulatory and market developments'].map(pt => (
                      <div key={pt} className="cu-pt flex items-start gap-3" style={{ opacity: 0 }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: BLUE }} />
                        <p style={{ ...P, margin: 0 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                  <p style={P}>The curriculum integrates management fundamentals with advanced digital, analytical, and strategic competencies, making it one of the most modern MBA programmes in the region.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════ §4 INTERNSHIPS ══════════════════════ */}
          <section ref={intRef} className="py-16 bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <div>
                  <Label text="Real-World Exposure" />
                  <Title size="clamp(1.44rem,2.52vw,2.25rem)">Three Internships</Title>
                </div>
                <p style={{ ...P, maxWidth: 280 }}>Real industry exposure across all three semesters.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {INTERNSHIPS.map(({ n, sem, img, desc }) => (
                  <div key={n} className="in-card group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white flex flex-col" style={{ opacity: 0 }}>
                    {/* Image — scale-[1.3] wrapper prevents parallax gap */}
                    <div className="relative overflow-hidden" style={{ height: 240, flexShrink: 0 }}>
                      <div className="absolute inset-0 scale-[1.3] origin-center">
                        <Image src={img} alt={sem} fill className="object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
                      <div className="absolute top-5 left-5 z-20">
                        <span className={cinzel.className} style={{ fontSize: '2.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>{n}</span>
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 z-20">
                        <h3 className={cinzel.className} style={{ fontSize: 'clamp(0.9rem,1.2vw,1.1rem)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{sem}</h3>
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <p style={{ ...P, margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ ...P, marginTop: '2rem', textAlign: 'center', maxWidth: 680, margin: '2rem auto 0' }}>
                Each internship is structured, mentored, and assessed — enabling students to apply classroom learning to real-world business challenges well before graduation.
              </p>
            </div>
          </section>

          {/* ══════════════════════ §5 SOCIAL IMMERSION ══════════════════════ */}
          <section ref={socialRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

              {/* Image */}
              <div className="so-img relative h-[400px]" style={{ opacity: 0 }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={IMG.social} alt="Social Immersion" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="backdrop-blur-md rounded-xl px-4 py-3 border border-white/18" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <p className={cinzel.className} style={{ color: '#fff', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 2 }}>Learning with Purpose</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.74rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>Real communities. Real challenges. Real management.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="so-txt space-y-4" style={{ opacity: 0 }}>
                <Label text="Experiential Component" />
                <Title size="clamp(1.44rem,2.6vw,2.4rem)">Social<br />Immersion</Title>
                <p style={P}>An integral component designed to sensitize students to societal realities while applying management principles to real-world social contexts. Through structured field engagement, students identify social and developmental challenges, analyse them using managerial frameworks, and propose sustainable, practical solutions.</p>
                <div className="space-y-2">
                  {[
                    'Direct engagement with communities and social enterprises',
                    'Foster empathy, ethical awareness, and inclusive leadership',
                    'Sustainable, practical solutions to social challenges',
                  ].map(pt => (
                    <div key={pt} className="so-hl flex items-start gap-3 border-l-4 pl-4 py-2" style={{ borderColor: BLUE, opacity: 0 }}>
                      <p style={{ ...P, margin: 0 }}>{pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════ §6 FINAL PROJECT MODEL ══════════════════════ */}
          <section ref={projectRef} className="py-16 bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                  <Label text="Capstone Experience" />
                  <Title size="clamp(1.44rem,2.52vw,2.25rem)">Final Project Model</Title>
                  <p style={{ ...P, marginTop: '0.5rem', maxWidth: 380 }}>Choose your pathway: Industry, Research, or Startup.</p>
                </div>
                {/* Undraw-style pathway illustration */}
                <div className="flex-shrink-0 hidden lg:block" style={{ width: 200, height: 100 }}>
                  <svg viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    <ellipse cx="110" cy="96" rx="90" ry="4" fill="#e5e7eb"/>
                    {/* Three path forks */}
                    <line x1="110" y1="20" x2="110" y2="50" stroke={BLUE} strokeWidth="2" strokeLinecap="round"/>
                    <line x1="110" y1="50" x2="50" y2="75" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 2"/>
                    <line x1="110" y1="50" x2="110" y2="75" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 2"/>
                    <line x1="110" y1="50" x2="170" y2="75" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 2"/>
                    {/* Nodes */}
                    <circle cx="110" cy="16" r="8" fill={BLUE}/>
                    <circle cx="50" cy="80" r="8" fill={BLUE} opacity="0.7"/>
                    <circle cx="110" cy="80" r="8" fill={BLUE} opacity="0.7"/>
                    <circle cx="170" cy="80" r="8" fill={BLUE} opacity="0.7"/>
                    {/* Labels */}
                    <text x="106" y="20" fill="#fff" fontSize="7" fontWeight="700">★</text>
                    <text x="26" y="94" fill={BLUE} fontSize="5.5" fontWeight="600">Industry</text>
                    <text x="88" y="94" fill={BLUE} fontSize="5.5" fontWeight="600">Research</text>
                    <text x="150" y="94" fill={BLUE} fontSize="5.5" fontWeight="600">Startup</text>
                  </svg>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {PROJECTS.map(({ title, desc, icon }, idx) => (
                  <div key={title} className="pr-card bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300" style={{ opacity: 0 }}>
                    {/* Mini undraw illustration per card */}
                    <div className="w-full h-28 mb-4 flex items-center justify-center rounded-xl" style={{ background: 'rgba(30,58,138,0.04)' }}>
                      {idx === 0 && (
                        <svg viewBox="0 0 120 60" fill="none" style={{ width: 110, height: 55 }}>
                          <rect x="20" y="10" width="80" height="40" rx="5" fill="#dbeafe"/>
                          <rect x="20" y="10" width="80" height="10" rx="5" fill={BLUE} opacity="0.8"/>
                          <rect x="28" y="28" width="30" height="3" rx="1.5" fill={BLUE} opacity="0.4"/>
                          <rect x="28" y="34" width="22" height="3" rx="1.5" fill={BLUE} opacity="0.3"/>
                          <rect x="28" y="40" width="26" height="3" rx="1.5" fill={BLUE} opacity="0.3"/>
                          <circle cx="85" cy="38" r="10" fill={BLUE} opacity="0.15"/>
                          <path d="M80 38 L83 41 L90 34" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg viewBox="0 0 120 60" fill="none" style={{ width: 110, height: 55 }}>
                          <rect x="30" y="8" width="60" height="44" rx="5" fill="#dbeafe"/>
                          <rect x="38" y="16" width="44" height="4" rx="2" fill={BLUE} opacity="0.5"/>
                          <rect x="38" y="24" width="32" height="3" rx="1.5" fill={BLUE} opacity="0.35"/>
                          <rect x="38" y="31" width="38" height="3" rx="1.5" fill={BLUE} opacity="0.3"/>
                          <rect x="38" y="38" width="28" height="3" rx="1.5" fill={BLUE} opacity="0.3"/>
                          <circle cx="90" cy="15" r="8" fill={BLUE} opacity="0.12"/>
                          <text x="86.5" y="19" fill={BLUE} fontSize="9" fontWeight="700" opacity="0.6">?</text>
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg viewBox="0 0 120 60" fill="none" style={{ width: 110, height: 55 }}>
                          <ellipse cx="60" cy="56" rx="40" ry="3" fill="#e5e7eb"/>
                          <polygon points="60,8 75,30 90,30 78,42 83,56 60,46 37,56 42,42 30,30 45,30" fill={BLUE} opacity="0.8"/>
                          <circle cx="60" cy="8" r="6" fill={BLUE}/>
                          <line x1="88" y1="30" x2="88" y2="46" stroke={BLUE} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                        </svg>
                      )}
                    </div>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(30,58,138,0.07)' }}>
                      <svg className="w-5 h-5" style={{ color: BLUE }} fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                    </div>
                    <h3 className={cinzel.className} style={{ fontSize: 'clamp(0.75rem,0.95vw,0.9rem)', fontWeight: 700, color: '#111', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</h3>
                    <p style={P}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════ §7 RESIDENTIAL ══════════════════════ */}
          <section ref={residentialRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

              {/* Left: all text */}
              <div className="re-l space-y-5" style={{ opacity: 0 }}>
                <Label text="Campus Life" />
                <Title size="clamp(1.44rem,2.6vw,2.4rem)">Fully Residential.<br />Fully Immersive.</Title>
                <p style={P}>
                  The LEAD MBA is built on a fully residential model nestled in the serene surroundings of Dhoni, Palakkad. This environment fosters continuous faculty–student interaction, peer learning, and a culture of professional discipline that classroom-only programmes simply cannot replicate.
                </p>
                <div className="space-y-3 pt-1">
                  {RESIDENTIAL_FEATURES.map(({ title, desc }) => (
                    <div key={title} className="re-feat flex items-start gap-3" style={{ opacity: 0 }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: BLUE }} />
                      <div>
                        <p className={cinzel.className} style={{ fontSize: 'clamp(0.62rem,0.78vw,0.72rem)', fontWeight: 700, color: BLUE, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{title}</p>
                        <p style={P}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <Btn href={MBA_URL} label="Apply for MBA" primary ext />
                </div>
              </div>

              {/* Right: image with overlay */}
              <div className="re-l relative h-[480px]" style={{ opacity: 0 }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={IMG.residential}
                    alt="LEAD residential campus"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Blue left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />
                  {/* Bottom overlay card */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="rounded-xl px-5 py-4 border border-white/18" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                      <p className={cinzel.className} style={{ color: '#fff', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 4 }}>
                        Fully Residential Campus
                      </p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.55 }}>
                        Dhoni, Palakkad — a serene environment built for focus, growth &amp; leadership.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════ §8 FACULTY ══════════════════════ */}
          <section ref={facultyRef} className="py-16 bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-10 text-center">
                <Label text="Our Faculty" />
                <Title size="clamp(1.44rem,2.52vw,2.25rem)">Faculty with National<br />&amp; International Exposure</Title>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {FACULTY_ITEMS.map(({ title, desc, path }) => (
                  <div key={title} className="fa-item bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300" style={{ opacity: 0 }}>
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
            </div>
          </section>

          {/* ══════════════════════ §9 ASSESSMENT ══════════════════════ */}
          <section ref={assessRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

              {/* Left: text */}
              <div className="as-txt space-y-4" style={{ opacity: 0 }}>
                <Label text="Evaluation" />
                <Title size="clamp(1.44rem,2.6vw,2.4rem)">Skill-Based<br />Assessment</Title>
                <p style={P}>Assessment goes beyond traditional examinations. We adopt authentic, skill-based evaluation methods to ensure measurable managerial and digital competence.</p>
                <div className="space-y-2.5">
                  {ASSESSMENT_METHODS.map(m => (
                    <div key={m} className="as-mth flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 bg-white hover:bg-blue-50/40 transition-colors duration-300" style={{ opacity: 0 }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: BLUE }} />
                      <p style={{ ...P, margin: 0 }}>{m}</p>
                    </div>
                  ))}
                </div>
                <p style={{ ...P, fontStyle: 'italic' }}>This approach ensures graduates possess demonstrable skills, not just academic knowledge.</p>
              </div>

              {/* Right: image */}
              <div className="as-img relative h-[420px]" style={{ opacity: 0 }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={IMG.assessment} alt="Skill Assessment" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════ §10 LEADERSHIP PATHS — 100vh with illustration ══════════════════════ */}
          <section ref={leadersRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_1.6fr] gap-14 items-center">

              {/* Left: heading + undraw illustration */}
              <div className="ld-item flex flex-col gap-6" style={{ opacity: 0 }}>
                <div>
                  <Label text="Career Outcomes" />
                  <Title size="clamp(1.44rem,2.6vw,2.4rem)">Preparing<br />Leaders for<br />Industry &amp;<br />Society</Title>
                </div>
                {/* Undraw-style leadership illustration */}
                <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 260, height: 'auto' }}>
                  <ellipse cx="120" cy="194" rx="90" ry="5" fill="#e5e7eb"/>
                  {/* Podium / stage */}
                  <rect x="60" y="140" width="120" height="50" rx="4" fill={BLUE} opacity="0.08"/>
                  <rect x="80" y="148" width="80" height="8" rx="2" fill={BLUE} opacity="0.2"/>
                  {/* Center person — presenter */}
                  <circle cx="120" cy="100" r="16" fill={BLUE} opacity="0.85"/>
                  <ellipse cx="120" cy="148" rx="18" ry="28" fill={BLUE} opacity="0.75"/>
                  {/* Raised arm */}
                  <path d="M120 118 Q145 105 155 90" stroke={BLUE} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.75"/>
                  {/* Legs */}
                  <line x1="112" y1="174" x2="105" y2="192" stroke={BLUE} strokeWidth="5" strokeLinecap="round" opacity="0.55"/>
                  <line x1="128" y1="174" x2="135" y2="192" stroke={BLUE} strokeWidth="5" strokeLinecap="round" opacity="0.55"/>
                  {/* Left audience person */}
                  <circle cx="62" cy="120" r="11" fill={BLUE} opacity="0.55"/>
                  <ellipse cx="62" cy="158" rx="13" ry="22" fill={BLUE} opacity="0.45"/>
                  <line x1="55" y1="178" x2="49" y2="192" stroke={BLUE} strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
                  <line x1="69" y1="178" x2="75" y2="192" stroke={BLUE} strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
                  {/* Right audience person */}
                  <circle cx="178" cy="120" r="11" fill={BLUE} opacity="0.55"/>
                  <ellipse cx="178" cy="158" rx="13" ry="22" fill={BLUE} opacity="0.45"/>
                  <line x1="171" y1="178" x2="165" y2="192" stroke={BLUE} strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
                  <line x1="185" y1="178" x2="191" y2="192" stroke={BLUE} strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
                  {/* Speech / idea bubble */}
                  <ellipse cx="160" cy="72" rx="22" ry="13" fill={BLUE} opacity="0.1"/>
                  <path d="M148 81 l-5 8 l9-3" fill={BLUE} opacity="0.1"/>
                  <text x="150" y="76" fill={BLUE} fontSize="11" fontWeight="700" opacity="0.5">✓!</text>
                  {/* Stars / achievement marks */}
                  <circle cx="40" cy="80" r="4" fill={BLUE} opacity="0.12"/>
                  <circle cx="200" cy="70" r="5" fill={BLUE} opacity="0.1"/>
                  <circle cx="30" cy="150" r="3" fill={BLUE} opacity="0.1"/>
                  {/* Floor line */}
                  <line x1="20" y1="193" x2="220" y2="193" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Right: 4 career path cards */}
              <div className="grid grid-cols-2 gap-4">
                {LEADERSHIP_PATHS.map(({ title, desc, path }) => (
                  <div key={title} className="ld-item bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300" style={{ opacity: 0 }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: BLUE }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                      </svg>
                    </div>
                    <h3 className={cinzel.className} style={{ fontSize: 'clamp(0.68rem,0.82vw,0.78rem)', fontWeight: 700, color: '#111', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3 }}>{title}</h3>
                    <p style={{ ...P, fontSize: '0.75rem' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════ §11 CTA — restored cinematic version ══════════════════════ */}
          <section ref={ctaRef} className="vh relative bg-black" style={{ minHeight: '80vh' }}>
            <div className="absolute inset-0 z-0">
              <Image src={IMG.cta} alt="Begin Your Journey" fill className="object-cover cta-bg" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
              <h2 className={`${cinzel.className} uppercase font-bold leading-[0.9] mb-6`}
                style={{ fontSize: 'clamp(2.8rem,6vw,6.5rem)' }}>
                <span className="cta-line block text-white" style={{ opacity: 0 }}>Begin Your</span>
                <span className="cta-line block text-white" style={{ opacity: 0 }}>Journey</span>
              </h2>

              <p className="cta-sub max-w-2xl mx-auto mb-10"
                style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(0.9rem,1.1vw,1.05rem)', lineHeight: 1.85, color: 'rgba(255,255,255,0.88)', opacity: 0 }}>
                Join the next generation of business leaders, innovators, and change-makers at LEAD. Our MBA programme has been shaping industry-ready professionals since 2010 — through rigorous academics, real-world internships, and a fully residential campus that builds character alongside competence. Whether you aspire to lead a corporation, launch a venture, or drive meaningful social change, LEAD gives you the foundation, the network, and the mindset to do it. Your journey begins here.
              </p>

              <div className="flex justify-center">
                <a href={MBA_URL} target="_blank" rel="noreferrer"
                  className={`cta-btn ${cinzel.className} px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105`}
                  style={{ background: '#fff', color: BLUE, fontSize: 'clamp(0.58rem,.78vw,.72rem)', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0 }}>
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