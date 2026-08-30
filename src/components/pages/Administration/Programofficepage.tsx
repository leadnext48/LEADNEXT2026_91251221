'use client';

import { useEffect, useRef } from 'react';
import { cinzel, playfair } from '@/app/fonts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CalendarDays, Users, GraduationCap, ClipboardList, Briefcase,
  Network, BookOpen, ArrowRight, CheckCircle2, Building2, Layers,
  BarChart3, Cpu, LibraryBig, Hotel, Wifi,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BLUE = '#005C9F';
const DARK = '#07111C';

const functions = [
  {
    id: 'planning', num: '01', icon: CalendarDays,
    title: 'Academic Planning & Program Execution', short: 'Calendar & Scheduling', color: '#0A7ACC',
    description: 'The Program Office is responsible for preparing and implementing the annual academic calendar, semester plans, course schedules, and session-level coordination. It ensures that classrooms, teaching–learning tools, IT and AV facilities, and all other academic resources are available and ready for effective program delivery.',
    detail: 'The office closely monitors the conduct of daily academic sessions, ensuring lectures, guest sessions, workshops, and experiential learning activities are carried out as planned without disruption. It also coordinates the availability and scheduling of internal and visiting faculty, industry experts, and resource persons — maintaining the rhythm of academic life throughout the year.',
    points: ['Annual academic calendar and semester planning', 'Course scheduling and session-level coordination', 'Classroom, AV, and IT resource allocation', 'Faculty availability and timetable management', 'Daily session monitoring and disruption prevention'],
  },
  {
    id: 'faculty', num: '02', icon: Users,
    title: 'Faculty Coordination & Academic Support', short: 'Faculty & Resources', color: '#0E6BB5',
    description: 'Working in close collaboration with the Deans and academic leadership, the Program Office provides comprehensive support to faculty — enabling them to focus entirely on high-quality teaching and student engagement.',
    detail: 'By handling course planning logistics, learning material distribution, LMS compliance, and coordination with support services such as the library, IT, and administration, the office removes operational friction and empowers faculty to deliver their best. The result is a well-supported teaching community and a consistent, enriching classroom experience.',
    points: ['Course planning and session scheduling support', 'Distribution of learning materials and case studies', 'LMS compliance and academic documentation', 'Coordination with library, IT, and admin services', 'Facilitating teaching requirements and logistics'],
  },
  {
    id: 'students', num: '03', icon: GraduationCap,
    title: 'Student Services & Engagement', short: 'Student Support', color: '#115EA3',
    description: 'For students, the Program Office serves as a central, always-accessible support system — addressing academic queries, managing records, issuing official documents, and ensuring timely communication of institutional updates.',
    detail: 'Through timely communication and accessible support across attendance, academic records, certificates, and policy guidance, the office helps maintain clarity, discipline, and a positive academic experience. Student feedback is actively gathered and channelled to continuously improve program quality and responsiveness.',
    points: ['Academic queries related to courses, electives, and policies', 'Attendance and academic record management', 'Transcripts, bonafide certificates, and internship letters', 'Communication of academic guidelines and updates', 'Student feedback coordination for program improvement'],
  },
  {
    id: 'examination', num: '04', icon: ClipboardList,
    title: 'Examination & Evaluation Coordination', short: 'Exams & Evaluation', color: '#1256A0',
    description: 'The Program Office works in coordination with the Examination and Evaluation function to ensure the smooth, fair, and timely conduct of all internal assessments and examinations throughout the academic year.',
    detail: 'Responsibilities span the full examination lifecycle — from scheduling and venue allocation to invigilation coordination, infrastructure readiness, and communicating evaluation-related updates to students. The office acts as the operational backbone that makes every assessment seamlessly executable.',
    points: ['Examination scheduling and venue planning', 'Coordination of invigilation and logistical arrangements', 'Infrastructure and technology readiness', 'Communication of evaluation processes and timelines', 'Student concern facilitation during assessments'],
  },
  {
    id: 'experiential', num: '05', icon: Briefcase,
    title: 'Experiential Learning & Industry Interface', short: 'Industry & Learning', color: '#0A4D8C',
    description: "In alignment with LEAD's practice-oriented learning approach, the Program Office coordinates the full spectrum of experiential components that bring real-world relevance to academic programs.",
    detail: "From internship scheduling to corporate engagement sessions, the office ensures that workshops, seminars, certifications, and guest lectures are seamlessly woven into the academic calendar without disrupting core course delivery. This integration is central to LEAD's promise of producing industry-connected professionals.",
    points: ['Internship scheduling and documentation support', 'Industry interactions and corporate sessions', 'Workshops, seminars, and certification programs', 'Guest lectures and expert engagements', 'Seamless integration into the academic schedule'],
  },
  {
    id: 'operational', num: '06', icon: Network,
    title: 'Operational Coordination & Institutional Interface', short: 'Institutional Bridge', color: '#083F74',
    description: 'The Program Office works closely with every campus function — including hostel, library, IT services, and administration — to provide integrated support for academic and co-curricular activities.',
    detail: 'Beyond day-to-day coordination, the office assists academic leadership in preparing detailed reports on program performance, student progress, and institutional requirements. This cross-functional role makes it the connective tissue of the institution, ensuring nothing operates in silos.',
    points: ['Cross-functional coordination with all campus units', 'Academic and co-curricular activity support', 'Program performance and progress reporting', 'Institutional requirement management', 'Alignment between academic and administrative goals'],
  },
  {
    id: 'enabling', num: '07', icon: BookOpen,
    title: 'Enabling a Structured Learning Experience', short: 'Learning Environment', color: '#063363',
    description: 'By continuously monitoring operations, coordinating stakeholders, and responding to emerging requirements, the Program Office ensures that campus life and academic delivery function in perfect harmony.',
    detail: 'Acting as the bridge between planning and execution, the office plays a pivotal role in maintaining academic discipline, operational efficiency, and an enriching, industry-connected learning journey for every cohort at LEAD College. It is where strategy meets action.',
    points: ['Continuous operations monitoring and responsiveness', 'Stakeholder coordination across all functions', 'Academic discipline and efficiency maintenance', 'Industry-connected learning journey facilitation', 'Bridging institutional planning and daily execution'],
  },
];

const ecosystem = [
  { icon: Building2,    label: 'Academic Leadership', desc: 'Deans, Directors, Advisors' },
  { icon: GraduationCap, label: 'Students',           desc: 'Every cohort at LEAD' },
  { icon: Users,        label: 'Faculty',              desc: 'Internal & visiting faculty' },
  { icon: LibraryBig,   label: 'Library',              desc: 'Learning resources' },
  { icon: Cpu,          label: 'IT Services',          desc: 'Infrastructure & LMS' },
  { icon: Hotel,        label: 'Hostel & Admin',       desc: 'Campus life support' },
  { icon: Wifi,         label: 'Industry Partners',    desc: 'Corporates & experts' },
  { icon: BarChart3,    label: 'Accreditation',        desc: 'Quality & compliance' },
];

const metrics = [
  { val: '7',    label: 'Core Functions',     sub: 'Integrated operational pillars' },
  { val: '360°', label: 'Operational Scope',  sub: 'End-to-end academic coverage' },
  { val: '8+',   label: 'Departments Served', sub: 'Cross-campus coordination' },
  { val: '1',    label: 'Unified Office',      sub: 'Single point of coordination' },
];

const CheckDot = () => (
  <CheckCircle2 size={14} color={BLUE} strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2 }} />
);

export default function ProgramOfficePage() {
  const heroRef  = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── 1. Pre-hint GPU for every animated element ──────────────────────
    const heroEls = [
      '.po-dot-grid', '.po-corner-tl', '.po-corner-br', '.po-hline',
      '.po-eyebrow', '.po-title-bar', '.po-hero-tag', '.po-fn-row',
      titleRef.current, subRef.current,
    ];
    gsap.set(heroEls, { willChange: 'opacity, transform', force3D: true });

    // ── 2. Hide everything upfront (no autoAlpha — avoids visibility reflow) ──
    gsap.set([
      '.po-dot-grid', '.po-corner-tl', '.po-corner-br',
      '.po-eyebrow', '.po-hero-tag', '.po-fn-row',
      titleRef.current, subRef.current,
    ], { opacity: 0 });

    gsap.set('.po-hline',      { scaleX: 0, transformOrigin: 'left center' });
    gsap.set('.po-title-bar',  { scaleX: 0, transformOrigin: 'left center' });
    gsap.set('.po-corner-tl',  { x: -14, y: -14 });
    gsap.set('.po-corner-br',  { x:  14, y:  14 });
    gsap.set('.po-eyebrow',    { y: -14 });
    gsap.set(titleRef.current, { y: 50 });
    gsap.set(subRef.current,   { y: 30 });
    gsap.set('.po-hero-tag',   { x: -14 });
    gsap.set('.po-fn-row',     { y: 10 });

    // Scroll-animated elements
    gsap.set([
      '.po-metric', '.po-intro-text', '.po-intro-line',
      '.po-section-hdr', '.po-eco-hdr', '.po-eco-center', '.po-eco-node',
      '.po-closing-content',
    ], { opacity: 0, willChange: 'opacity, transform', force3D: true });

    gsap.set('.po-intro-line', { scaleY: 0, transformOrigin: 'top center' });
    gsap.set('.po-intro-text', { y: 40 });
    gsap.set('.po-metric',     { y: 30 });
    gsap.set('.po-section-hdr',{ y: -10 });
    gsap.set('.po-eco-hdr',    { y: -14 });
    gsap.set('.po-eco-center', { scale: 0.85 });
    gsap.set('.po-eco-node',   { y: 20 });
    gsap.set('.po-closing-content', { y: 40 });

    functions.forEach((f) => {
      gsap.set(`.po-card-${f.id}`, { opacity: 0, y: 60, willChange: 'opacity, transform', force3D: true });
    });

    const ctx = gsap.context(() => {

      // ── HERO — fires once on mount (no scroll trigger needed, it's above fold) ──
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out', force3D: true } });

      tl.to('.po-dot-grid',    { opacity: 1, duration: 2.2, ease: 'power2.out' }, 0)
        .to('.po-corner-tl',   { opacity: 1, x: 0, y: 0, duration: 0.8 }, 0.15)
        .to('.po-corner-br',   { opacity: 1, x: 0, y: 0, duration: 0.8 }, 0.15)
        .to('.po-hline',       { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0.1)
        .to('.po-eyebrow',     { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .to(titleRef.current,  { opacity: 1, y: 0, duration: 1.0 }, 0.45)
        .to('.po-title-bar',   { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 0.65)
        .to(subRef.current,    { opacity: 1, y: 0, duration: 0.9 }, 0.75)
        .to('.po-hero-tag',    { opacity: 1, x: 0, duration: 0.5, stagger: 0.09 }, 0.9)
        .to('.po-fn-row',      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 }, 1.0);

      // ── METRICS BAND ──
      ScrollTrigger.create({
        trigger: '.po-metrics-band',
        start: 'top 80%',
        once: true,
        onEnter: () => gsap.to('.po-metric', { opacity: 1, y: 0, duration: 0.6, stagger: 0.14, ease: 'power3.out', force3D: true }),
      });

      // ── INTRO BAND ──
      ScrollTrigger.create({
        trigger: '.po-intro-band',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.po-intro-text', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', force3D: true });
          gsap.to('.po-intro-line', { opacity: 1, scaleY: 1, duration: 1.2, ease: 'power2.inOut', force3D: true });
        },
      });

      // ── FUNCTION SECTION HEADER ──
      ScrollTrigger.create({
        trigger: '.po-functions-section',
        start: 'top 85%',
        once: true,
        onEnter: () => gsap.to('.po-section-hdr', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', force3D: true }),
      });

      // ── FUNCTION CARDS — each individually ──
      functions.forEach((f) => {
        ScrollTrigger.create({
          trigger: `.po-card-${f.id}`,
          start: 'top 88%',
          once: true,
          onEnter: () => gsap.to(`.po-card-${f.id}`, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', force3D: true }),
        });
      });

      // ── ECOSYSTEM ──
      ScrollTrigger.create({
        trigger: '.po-ecosystem-section',
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.to('.po-eco-hdr',    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', force3D: true });
          gsap.to('.po-eco-center', { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)', force3D: true });
          gsap.to('.po-eco-node',   { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', force3D: true, delay: 0.1 });
        },
      });

      // ── CLOSING ──
      ScrollTrigger.create({
        trigger: '.po-closing-band',
        start: 'top 80%',
        once: true,
        onEnter: () => gsap.to('.po-closing-content', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', force3D: true }),
      });

    });

    return () => {
      ctx.revert();
      // Free compositor layers after animations are done
      gsap.set([
        ...heroEls,
        '.po-metric', '.po-intro-text', '.po-intro-line',
        '.po-section-hdr', '.po-eco-hdr', '.po-eco-center', '.po-eco-node',
        '.po-closing-content',
        ...functions.map(f => `.po-card-${f.id}`),
      ], { willChange: 'auto', clearProps: 'willChange' });
    };
  }, []);

  return (
    <>
      <style>{`
        .po-hero {
          min-height: 100svh;
          background: #fff;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          padding: clamp(5rem, 10vh, 8rem) 0;
        }
        .po-dot-grid {
          position: absolute; inset: 0; opacity: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,0.09) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none; z-index: 0;
          will-change: opacity;
        }
        .po-hline {
          position: absolute; top: 40%; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,92,159,0.08) 18%, rgba(0,92,159,0.08) 82%, transparent);
          transform-origin: left; pointer-events: none; z-index: 1;
          will-change: transform;
        }
        .po-corner-tl, .po-corner-br {
          position: absolute; width: 52px; height: 52px; pointer-events: none; z-index: 3; opacity: 0;
          will-change: opacity, transform;
        }
        .po-corner-tl { top: 28px; left: 28px; border-top: 1.5px solid rgba(0,92,159,0.22); border-left: 1.5px solid rgba(0,92,159,0.22); }
        .po-corner-br { bottom: 28px; right: 28px; border-bottom: 1.5px solid rgba(0,92,159,0.22); border-right: 1.5px solid rgba(0,92,159,0.22); }

        .po-hero-geo {
          position: absolute; top: 0; right: 0;
          width: clamp(280px, 40vw, 520px); height: clamp(280px, 40vw, 520px);
          border-radius: 0 0 0 100%;
          background: linear-gradient(135deg, rgba(0,92,159,0.04) 0%, rgba(0,92,159,0.02) 100%);
          pointer-events: none; z-index: 0;
        }
        .po-hero-geo-2 {
          position: absolute; bottom: 0; left: 0;
          width: clamp(180px, 25vw, 340px); height: clamp(180px, 25vw, 340px);
          border-radius: 0 100% 0 0;
          background: linear-gradient(315deg, rgba(0,92,159,0.03) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .po-hero-inner {
          position: relative; z-index: 4;
          width: 100%;
          padding: 0 clamp(1.5rem, 11vw, 10rem);
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: clamp(2rem, 6vw, 7rem);
          align-items: center;
        }
        .po-hero-tag {
          opacity: 0;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 4px 12px;
          border: 1px solid rgba(0,92,159,0.16);
          border-radius: 100px;
          background: rgba(0,92,159,0.04);
          will-change: opacity, transform;
        }

        .po-metrics-band {
          background: ${DARK};
          padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 11vw, 10rem);
        }
        .po-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
        }
        .po-metric {
          opacity: 0;
          background: rgba(255,255,255,0.02);
          padding: clamp(1.5rem, 3vh, 2.5rem) clamp(1.2rem, 2.5vw, 2rem);
          border-right: 1px solid rgba(255,255,255,0.05);
          transition: background 0.3s ease;
          will-change: opacity, transform;
        }
        .po-metric:last-child { border-right: none; }
        .po-metric:hover { background: rgba(0,92,159,0.1); }

        .po-intro-band {
          background: #f6f9fd;
          padding: clamp(4rem, 8vh, 7rem) clamp(1.5rem, 11vw, 10rem);
        }
        .po-intro-line {
          width: 3px;
          background: linear-gradient(180deg, ${BLUE}, #1e3a8a);
          transform-origin: top;
          opacity: 0;
          flex-shrink: 0;
          border-radius: 2px;
          align-self: stretch;
          will-change: opacity, transform;
        }

        .po-functions-section {
          background: #fff;
          padding: clamp(4rem, 8vh, 7rem) clamp(1.5rem, 11vw, 10rem);
        }
        .po-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
          margin-top: clamp(2.5rem, 5vh, 4rem);
        }
        .po-card {
          background: #fff;
          border-radius: 16px;
          padding: clamp(1.4rem, 2.5vw, 2rem);
          border: 1px solid rgba(0,92,159,0.08);
          box-shadow: 0 4px 24px rgba(0,92,159,0.05);
          position: relative; overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: default;
          will-change: opacity, transform;
        }
        .po-card:hover { transform: translateY(-6px); box-shadow: 0 18px 52px rgba(0,92,159,0.12); border-color: rgba(0,92,159,0.18); }
        .po-card:hover .po-card-arrow { opacity: 1; transform: translateX(0); }
        .po-card-arrow { opacity: 0; transform: translateX(-6px); transition: opacity 0.25s ease, transform 0.25s ease; }
        .po-card-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; }

        .po-deepdive-section {
          background: #f6f9fd;
          padding: clamp(4rem, 8vh, 7rem) 0;
        }
        .po-dd-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 8rem);
          align-items: center;
          padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 11vw, 10rem);
          border-bottom: 1px solid rgba(0,92,159,0.06);
        }
        .po-dd-row:last-child { border-bottom: none; }
        .po-dd-icon-panel {
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          min-height: 320px; border-radius: 20px;
          position: relative; overflow: hidden;
        }
        .po-dd-icon-panel-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,92,159,0.06) 0%, rgba(0,92,159,0.02) 100%);
        }
        .po-dd-icon-number {
          position: absolute;
          font-family: inherit;
          font-size: clamp(7rem, 14vw, 14rem);
          font-weight: 800;
          color: rgba(0,92,159,0.05);
          line-height: 1;
          user-select: none; pointer-events: none;
          bottom: -1rem; right: -0.5rem;
        }

        .po-ecosystem-section {
          background: #fff;
          padding: clamp(4rem, 8vh, 7rem) clamp(1.5rem, 11vw, 10rem);
        }
        .po-eco-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(1rem, 2vw, 1.4rem);
          margin-top: clamp(2.5rem, 5vh, 4rem);
        }
        .po-eco-node {
          opacity: 0;
          background: #f6f9fd;
          border: 1px solid rgba(0,92,159,0.08);
          border-radius: 14px;
          padding: clamp(1.2rem, 2.2vw, 1.8rem);
          display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          will-change: opacity, transform;
        }
        .po-eco-node:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,92,159,0.1); border-color: rgba(0,92,159,0.18); }
        .po-eco-center {
          opacity: 0;
          grid-column: 2 / 4;
          background: ${DARK};
          border-radius: 20px;
          padding: clamp(2rem, 4vw, 3rem);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          position: relative; overflow: hidden;
          min-height: 180px;
          will-change: opacity, transform;
        }

        .po-closing-band {
          background: ${DARK};
          padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 11vw, 10rem);
          position: relative; overflow: hidden;
        }
        .po-closing-dot-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,92,159,0.14) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .po-hero-inner { grid-template-columns: 1fr; }
          .po-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .po-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .po-eco-grid { grid-template-columns: repeat(2, 1fr); }
          .po-eco-center { grid-column: 1 / -1; }
          .po-dd-row { grid-template-columns: 1fr; }
          .po-dd-row.reverse .po-dd-img-col { order: 1; }
          .po-dd-row.reverse .po-dd-text-col { order: 2; }
        }
        @media (max-width: 640px) {
          .po-cards-grid { grid-template-columns: 1fr; }
          .po-intro-cols { grid-template-columns: minmax(0, 1fr) !important; }
          .po-metrics-grid { grid-template-columns: 1fr 1fr; }
          .po-eco-grid { grid-template-columns: 1fr 1fr; }
          .po-corner-tl { top: 14px; left: 14px; width: 32px; height: 32px; }
          .po-corner-br { bottom: 14px; right: 14px; width: 32px; height: 32px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .po-dot-grid, .po-corner-tl, .po-corner-br, .po-hline,
          .po-eyebrow, .po-title-bar, .po-hero-tag, .po-fn-row,
          .po-metric, .po-intro-text, .po-intro-line,
          .po-section-hdr, .po-eco-hdr, .po-eco-center, .po-eco-node,
          .po-closing-content {
            opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>

      <div className="overflow-x-hidden">

        {/* ═══════════════════════════════════ HERO */}
        <section ref={heroRef} className="po-hero">
          <div className="po-dot-grid" />
          <div className="po-hline" />
          <div className="po-hero-geo" aria-hidden="true" />
          <div className="po-hero-geo-2" aria-hidden="true" />
          <div className="po-corner-tl" aria-hidden="true" />
          <div className="po-corner-br" aria-hidden="true" />

          <div aria-hidden="true" style={{
            position: 'absolute', top: '20%', left: '35%',
            width: 500, height: 400, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,92,159,0.05) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }} />

          <div className="po-hero-inner">

            {/* LEFT */}
            <div>
              <div className="po-eyebrow" style={{ opacity: 1, marginBottom: 'clamp(0.8rem, 1.6vh, 1.4rem)' }}>
                <span style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(0.68rem, 0.8vw, 0.74rem)',
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: BLUE, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ display: 'inline-block', width: 22, height: 1.5, background: BLUE }} />
                </span>
              </div>

              <h1 ref={titleRef} style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: 'clamp(2.6rem, 5.5vw, 7rem)',
                fontWeight: 700,
                lineHeight: 0.93,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: '0 0 clamp(0.8rem, 1.6vh, 1.4rem)',
                opacity: 1,
              }}>
                <span style={{ display: 'block', color: '#0D0D0D' }}>The</span>
                <span style={{ display: 'block', color: '#0D0D0D' }}>Program</span>
                <span style={{
                  display: 'block',
                  background: `linear-gradient(90deg, ${BLUE} 0%, #1e3a8a 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  paddingBottom: '0.06em',
                }}>Office.</span>
              </h1>

              <div className="po-title-bar" style={{
                width: 52, height: 2,
                background: `linear-gradient(90deg, ${BLUE}, #1e3a8a)`,
                marginBottom: 'clamp(1rem, 2vh, 1.8rem)',
                transformOrigin: 'left',
              }} />

              <div ref={subRef} style={{ opacity: 1, maxWidth: 540 }}>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.85, color: '#555',
                  marginBottom: 'clamp(1.2rem, 2.4vh, 2rem)',
                }}>
                  The operational backbone of academic delivery at LEAD College — the primary interface between students, faculty, academic leadership, and all administrative units. Seven integrated functions. One unified purpose: a structured, responsive, and student-centric learning environment.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Academic Planning','Faculty Support','Student Services','Examinations','Experiential Learning','Institutional Interface','Structured Experience'].map((tag) => (
                  <div key={tag} className="po-hero-tag">
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: BLUE, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{
                      fontFamily: cinzel.style.fontFamily,
                      fontSize: 'clamp(0.66rem, 0.8vw, 0.72rem)',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: BLUE, fontWeight: 600,
                    }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — function index */}
            <div>
              <p style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: 'clamp(0.66rem, 0.8vw, 0.72rem)',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'rgba(0,92,159,0.5)', fontWeight: 600,
                marginBottom: '1rem',
              }}>Functions Index</p>
              {functions.map((f, i) => (
                <div key={f.id} className="po-fn-row" style={{
                  opacity: 1,
                  display: 'flex', alignItems: 'center', gap: '0.9rem',
                  padding: 'clamp(0.55rem, 1vh, 0.85rem) 0',
                  borderBottom: i < functions.length - 1 ? '1px solid rgba(0,92,159,0.06)' : 'none',
                }}>
                  <span style={{
                    fontFamily: cinzel.style.fontFamily,
                    fontSize: 'clamp(0.66rem, 0.8vw, 0.74rem)',
                    fontWeight: 700, color: 'rgba(0,92,159,0.3)',
                    width: 22, flexShrink: 0,
                  }}>{f.num}</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'rgba(0,92,159,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <f.icon size={13} color={BLUE} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: cinzel.style.fontFamily,
                      fontSize: 'clamp(0.66rem, 0.8vw, 0.72rem)',
                      fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: '#1a1a1a', margin: 0,
                    }}>{f.short}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════ METRICS BAND */}
        <section className="po-metrics-band">
          <div className="po-metrics-grid">
            {metrics.map((m) => (
              <div key={m.label} className="po-metric">
                <p style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                  fontWeight: 700, color: '#fff',
                  margin: 0, lineHeight: 1, letterSpacing: '-0.02em',
                }}>{m.val}</p>
                <p style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(0.68rem, 0.8vw, 0.74rem)',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                  margin: '8px 0 4px', fontWeight: 600,
                }}>{m.label}</p>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: 'clamp(0.7rem, 0.88vw, 0.82rem)',
                  color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.5,
                }}>{m.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════ INTRO BAND */}
        <section className="po-intro-band">
          <div className="po-intro-text" style={{ opacity: 1 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '3px 1fr',
              gap: 'clamp(1.5rem, 3vw, 3rem)', alignItems: 'stretch', maxWidth: 1000,
            }}>
              <div className="po-intro-line" />
              <div>
                <p style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(0.68rem, 0.8vw, 0.74rem)',
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: BLUE, fontWeight: 600,
                  marginBottom: 'clamp(0.7rem, 1.4vh, 1.1rem)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ display: 'inline-block', width: 18, height: 1.5, background: BLUE }} />
                  About the Program Office
                </p>
                <h2 style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(1.4rem, 2.8vw, 3.2rem)',
                  fontWeight: 700, lineHeight: 1.1,
                  textTransform: 'uppercase', letterSpacing: '-0.01em',
                  color: DARK, margin: '0 0 clamp(1.2rem, 2.5vh, 2rem)',
                }}>
                  The Operational Backbone<br />of Academic Delivery.
                </h2>
                <div className="po-intro-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(1rem, 2vw, 2.5rem)' }}>
                  <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.82rem, 1vw, 0.96rem)', lineHeight: 1.85, color: '#555', margin: 0 }}>
                    The Program Office at LEAD College ensures that every program is executed smoothly, efficiently, and in alignment with the institution's academic standards and industry orientation. It is the invisible force that keeps the academic engine running.
                  </p>
                  <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.82rem, 1vw, 0.96rem)', lineHeight: 1.85, color: '#555', margin: 0 }}>
                    Serving as the primary interface between students, faculty, academic leadership, and administrative units, the office plays a vital role in creating a structured, responsive, and student-centric learning environment that allows every stakeholder to perform at their best.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════ FUNCTION CARDS */}
        <section className="po-functions-section">
          <div className="po-section-hdr" style={{ opacity: 1, marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <p style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(0.68rem, 0.8vw, 0.74rem)',
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: BLUE, fontWeight: 600, marginBottom: '0.5rem',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ display: 'inline-block', width: 18, height: 1.5, background: BLUE }} />
                  Core Functions
                </p>
                <h2 style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 'clamp(1.3rem, 2.5vw, 2.8rem)',
                  fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '-0.01em', color: DARK, margin: 0, lineHeight: 1.1,
                }}>Seven Pillars of Operation.</h2>
              </div>
              <div style={{
                padding: '8px 18px',
                border: `1px solid rgba(0,92,159,0.16)`,
                borderRadius: 100,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <Layers size={12} color={BLUE} strokeWidth={1.8} />
              </div>
            </div>
          </div>

          <div className="po-cards-grid">
            {functions.map((f) => (
              <div key={f.id} className={`po-card po-card-${f.id}`} style={{ opacity: 1 }}>
                <div className="po-card-accent" style={{ background: `linear-gradient(90deg, ${f.color}, ${BLUE})` }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'clamp(0.8rem, 1.5vh, 1.2rem)', paddingTop: 'clamp(0.7rem, 1.3vh, 1rem)' }}>
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.66rem, 0.8vw, 0.74rem)', fontWeight: 700, color: 'rgba(0,92,159,0.3)', letterSpacing: '0.1em' }}>{f.num}</span>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(0,92,159,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <f.icon size={17} color={BLUE} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.68rem, 0.96vw, 0.88rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: DARK, lineHeight: 1.3, margin: '0 0 clamp(0.5rem, 1vh, 0.8rem)' }}>{f.title}</h3>
                <div style={{ width: 28, height: 2, background: f.color, marginBottom: 'clamp(0.7rem, 1.3vh, 1rem)', borderRadius: 1 }} />
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.7rem, 0.86vw, 0.8rem)', lineHeight: 1.78, color: '#666', marginBottom: 'clamp(0.8rem, 1.5vh, 1.2rem)' }}>{f.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {f.points.slice(0, 3).map((pt) => (
                    <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                      <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: BLUE, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.66rem, 0.8vw, 0.75rem)', lineHeight: 1.6, color: '#777' }}>{pt}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'clamp(0.9rem, 1.8vh, 1.4rem)', display: 'flex', alignItems: 'center', gap: 6, paddingTop: 'clamp(0.7rem, 1.3vh, 1rem)', borderTop: '1px solid rgba(0,92,159,0.07)' }}>
                  <div className="po-card-arrow"><ArrowRight size={11} color={BLUE} strokeWidth={2} /></div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}