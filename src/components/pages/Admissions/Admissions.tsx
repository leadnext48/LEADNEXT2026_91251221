'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cinzel, playfair } from '@/app/fonts';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* ─────────── CONSTANTS ─────────── */
const BLUE  = '#1e3a8a';
const BLUE2 = '#005C9F';
const MBA_URL = 'https://admission.lead.ac.in/lead-college-of-management-mba-application';
const MCA_URL = 'https://admission.lead.ac.in/lead-college-of-management-mca-application';

const IMG = {
  hero:    '/convert/LEAD02.webp',
  prog1:   '/convert/LEAD33.webp',
  prog2:   '/convert/LEAD66.webp',
  prog3:   '/convert/LEAD11.webp',
  prog4:   '/convert/LEAD45.webp',
  about:   '/convert/LEAD61.webp',
  news:    '/convert/LEAD30.webp',
  contact: '/convert/LEAD65.webp',
  // ✅ CHANGED: professor mid-lecture in a modern hall — clearly college, not vague
  video:   '/convert/LEAD13.webp',
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

/* ─────────── INLINE SVG ICONS ─────────── */
const Ico = {
  shield:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  check:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>,
  target:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  users:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  book:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  pin:      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  phone:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016.09 17.9l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
  mail:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  monitor:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  msg:      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  info:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>,
  arrow:    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bar:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  clock:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  star:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/></svg>,
};

/* ─────────── UNDRAW ILLUSTRATIONS ─────────── */
const UndrawGraduation = () => (
  <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="100" cy="132" rx="80" ry="6" fill="#e5e7eb"/>
    <rect x="68" y="72" width="64" height="56" rx="6" fill="#dbeafe"/>
    <rect x="78" y="82" width="44" height="5" rx="2.5" fill="#93c5fd"/>
    <rect x="78" y="93" width="30" height="3.5" rx="1.8" fill="#bfdbfe"/>
    <rect x="78" y="103" width="36" height="3.5" rx="1.8" fill="#bfdbfe"/>
    <rect x="78" y="113" width="24" height="3.5" rx="1.8" fill="#bfdbfe"/>
    <polygon points="100,18 116,52 136,52 122,68 128,92 100,76 72,92 78,68 64,52 84,52" fill={BLUE} opacity="0.85"/>
    <circle cx="100" cy="18" r="9" fill={BLUE}/>
    <rect x="92" y="8" width="16" height="5" rx="2.5" fill={BLUE}/>
    <rect x="127" y="52" width="3.5" height="30" rx="1.8" fill={BLUE} opacity="0.45"/>
    <rect x="120" y="80" width="16" height="4" rx="2" fill={BLUE} opacity="0.35"/>
  </svg>
);

const UndrawFAQ = () => (
  <svg viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="90" cy="124" rx="72" ry="5" fill="#e5e7eb"/>
    <rect x="18" y="38" width="82" height="60" rx="9" fill="#dbeafe"/>
    <path d="M100 56 L132 44 L132 74 L100 66 Z" fill="#bfdbfe"/>
    <rect x="28" y="52" width="50" height="4.5" rx="2.3" fill="#93c5fd"/>
    <rect x="28" y="63" width="36" height="3.5" rx="1.8" fill="#bfdbfe"/>
    <rect x="28" y="73" width="44" height="3.5" rx="1.8" fill="#bfdbfe"/>
    <circle cx="148" cy="26" r="20" fill={BLUE} opacity="0.09"/>
    <circle cx="148" cy="26" r="12" fill={BLUE} opacity="0.14"/>
    <text x="143" y="32" fill={BLUE} fontSize="15" fontWeight="700" fontFamily="serif">?</text>
  </svg>
);

const UndrawProcess = () => (
  <svg viewBox="0 0 240 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="120" cy="86" rx="100" ry="4" fill="#e5e7eb"/>
    {[0,1,2,3,4].map(i => (
      <g key={i}>
        <circle cx={24 + i*48} cy="44" r="18" fill={i===0?BLUE:'#dbeafe'} opacity={i===0?1:0.9}/>
        <text x={i===0?17:17} y="49" fill={i===0?'#fff':BLUE} fontSize="11" fontWeight="700" fontFamily="monospace">{`0${i+1}`}</text>
        {i<4 && <rect x={42+i*48} y="42" width="28" height="3.5" rx="1.8" fill="#93c5fd" opacity="0.45"/>}
      </g>
    ))}
  </svg>
);

const UndrawQMS = () => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="100" cy="124" rx="80" ry="5" fill="#e5e7eb"/>
    <rect x="30" y="30" width="140" height="82" rx="10" fill="#f0f9ff"/>
    <rect x="30" y="30" width="140" height="24" rx="10" fill={BLUE}/>
    <rect x="30" y="44" width="140" height="10" fill={BLUE}/>
    <circle cx="44" cy="42" r="5" fill="rgba(255,255,255,0.3)"/>
    <circle cx="58" cy="42" r="5" fill="rgba(255,255,255,0.2)"/>
    <circle cx="72" cy="42" r="5" fill="rgba(255,255,255,0.15)"/>
    {[0,1,2,3].map(i=>(
      <g key={i}>
        <circle cx="48" cy={72+i*14} r="5" fill={BLUE} opacity={0.7-i*0.1}/>
        <text x="45.5" y={75.5+i*14} fill="#fff" fontSize="7" fontWeight="700">{i+1}</text>
        <rect x="58" y={69+i*14} width="90" height="5" rx="2.5" fill="#bfdbfe"/>
      </g>
    ))}
  </svg>
);

/* ─────────── DATA ─────────── */
const programs = [
  { code:'01', title:'MBA', subtitle:'Master of Business Administration', tag:'NBA Accredited · AICTE Approved',
    bullets:['Multiple internships every semester','Live projects & experiential learning','Skill-based outcome-oriented assessment','Career preparation & placement support'],
    applyHref: MBA_URL, viewHref:'/mba', img: IMG.prog1 },
  { code:'02', title:'MBA – Entrepreneurship', subtitle:'Specialisation Track', tag:'Autonomous · Innovation-Focused',
    bullets:['Opportunity identification & business modelling','Structured incubation & mentoring','Startup validation & scaling support','Business launch capstone project'],
    applyHref: MBA_URL, viewHref:'/entrepreneurship', img: IMG.prog2 },
  { code:'03', title:'MCA', subtitle:'Master of Computer Applications', tag:'Autonomous · AICTE Approved',
    bullets:['Strong computing & programming foundation','Hands-on modern technologies learning','Industry-oriented project work','Career & placement support'],
    applyHref: MCA_URL, viewHref:'/mca', img: IMG.prog3 },
  { code:'04', title:'Doctoral Program', subtitle:'PhD in Management', tag:'KUFOS University Research Centre',
    bullets:['Advanced research capability development','Strong methodological training','Industry & policy-relevant research','Academic & professional research careers'],
    applyHref: MBA_URL, viewHref:'/research', img: IMG.prog4 },
];

const steps = [
  { n:'01', title:'Register',         desc:'Create your account on the admission portal.' },
  { n:'02', title:'Verify Email',     desc:'Confirm via the link sent to your inbox.' },
  { n:'03', title:'Fill Application', desc:'Enter academic & personal details online.' },
  { n:'04', title:'Pay Fee',          desc:'Secure payment via multiple online options.' },
  { n:'05', title:'Submit',           desc:'Review and finalise your application.' },
];

const faqs = [
  { q:'Am I eligible to apply for the MBA program?', a:'You must be a graduate or in your final year. Eligibility: 50% (General), 45% (OBC), or Pass Mark (SC/ST). The LEAD-MBA is AICTE approved, NBA accredited, affiliated with the University of Calicut. Intake 2024-25: 360 seats — 50% merit quota, 50% management quota.' },
  { q:'Am I eligible for MBA – Entrepreneurship?', a:'Same graduate eligibility criteria apply. Designed for aspiring entrepreneurs, family business leaders, and innovation-driven professionals who wish to launch or scale ventures.' },
  { q:'What are the admission requirements for MCA?', a:"Bachelor's degree with Mathematics at 10+2 or graduation level. Minimum 50% aggregate (45% for reserved categories). AICTE approved, affiliated with the University of Calicut." },
  { q:'Who can apply for the Doctoral Program?', a:'Open to academicians, professionals, and researchers. Applicants should hold a postgraduate degree in Management or related disciplines. LEAD is a recognised research centre of KUFOS University, Kerala.' },
  { q:'When and how does the selection process happen?', a:"uLEAD selection cycle begins December 1st each year. Multiple cycles over 8 months. Program commences first week of September, preceded by the mandatory 'Turning Point' pre-course induction." },
  { q:'How are the programs delivered?', a:'Fully residential programs with academic, co-curricular, and extracurricular activities including outbound training, experiential learning, and field trips — supported by the LEAD Operations & Mentor Models.' },
  { q:'What are the placement outcomes at LEAD?', a:'200+ recruiting companies. 95%+ placement rate. Median salary ₹4.2 LPA, highest ₹21.67 LPA. MCA graduates placed as Software Engineers, Data Analysts, System Architects, and Web Developers.' },
  { q:'How can I contact the admissions team?', a:'Call/WhatsApp: +91 8838095207 or 0491 2503693. Email: info@lead.ac.in. Use the LEAD QMS from your application dashboard for the fastest response.' },
];

const vleadCriteria = [
  { icon: Ico.book,   label: 'Academic Background',       desc: 'Undergraduate scores & discipline alignment' },
  { icon: Ico.target, label: 'Aptitude & Communication',  desc: 'Reasoning, articulation & analytical skills' },
  { icon: Ico.star,   label: 'Motivation & Career Clarity', desc: 'Purpose-driven intent & career orientation' },
  { icon: Ico.users,  label: 'Learning Attitude',          desc: 'Openness, curiosity & professional readiness' },
];

const instructions = [
  { icon: Ico.monitor, title: 'Online Application Only',    body: 'Applications are accepted exclusively through the official LEAD online portal. No offline or email-based submissions accepted.' },
  { icon: Ico.mail,    title: 'Email Communication',        body: 'The email ID used during registration is used for all correspondence until enrolment. Changes are not permitted under any circumstances.' },
  { icon: Ico.msg,     title: 'Query Management System',    body: 'Use the LEAD QMS for the fastest response: Login → Dashboard → "Any Queries? Ask Us" → select category → submit.' },
];

const newsFeatures = [
  { icon: Ico.shield, label: 'Professional Discipline',   desc: 'Time management & accountability' },
  { icon: Ico.users,  label: 'Peer Learning',              desc: 'Collaborative academic engagement' },
  { icon: Ico.bar,    label: 'Leadership Skills',          desc: 'Communication & decision-making' },
  { icon: Ico.clock,  label: 'Personal Growth',            desc: 'Career focus & self-development' },
];

/* ─────────── FAQ ROW ─────────── */
function FAQRow({ item, index, open, onToggle }: { item: { q: string; a: string }; index: number; open: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.style.maxHeight = open ? `${bodyRef.current.scrollHeight}px` : '0px';
    bodyRef.current.style.opacity = open ? '1' : '0';
  }, [open]);
  return (
    <div className="faq-row border-b border-gray-100" style={{ opacity: 0 }}>
      <button onClick={onToggle} className="w-full flex items-start gap-4 py-4 text-left focus:outline-none">
        <span className={cinzel.className} style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: open ? BLUE2 : '#ccc', transition: 'color .3s', flexShrink: 0, paddingTop: 2 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={`${cinzel.className} flex-1 font-semibold uppercase tracking-wide`} style={{ fontSize: 'clamp(0.6rem,0.82vw,0.78rem)', color: open ? '#000' : '#333', transition: 'color .3s', lineHeight: 1.5 }}>
          {item.q}
        </span>
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', color: open ? BLUE2 : '#aaa' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div ref={bodyRef} style={{ maxHeight: 0, overflow: 'hidden', opacity: 0, transition: 'max-height 0.35s ease, opacity 0.3s ease' }}>
        <div className="pb-3 pl-9 pr-6"><p style={{ ...P, fontSize: '0.78rem' }}>{item.a}</p></div>
      </div>
    </div>
  );
}

/* ─────────── SMALL CTA BUTTON ─────────── */
const Btn = ({ href, label, primary, ext }: { href: string; label: string; primary?: boolean; ext?: boolean }) => (
  <a href={href} target={ext ? '_blank' : undefined} rel="noreferrer"
    className={`inline-flex items-center gap-1.5 ${cinzel.className} px-4 py-2 rounded-full font-semibold transition-all duration-300`}
    style={primary
      ? { background: BLUE, color: '#fff', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em' }
      : { background: 'transparent', color: BLUE, border: `1.5px solid ${BLUE}`, fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
    {label}
    {primary && <span style={{ color: 'rgba(255,255,255,0.7)' }}>{Ico.arrow}</span>}
  </a>
);

/* ─────────── SECTION LABEL ─────────── */
const Label = ({ text }: { text: string }) => (
  <span className={cinzel.className} style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: BLUE2, textTransform: 'uppercase', fontWeight: 600 }}>{text}</span>
);

/* ─────────── SECTION TITLE ─────────── */
const Title = ({ children, size = 'clamp(1.53rem,2.7vw,2.52rem)' }: { children: React.ReactNode; size?: string }) => (
  <h2 className={`${cinzel.className} font-bold uppercase mt-1.5`} style={{ ...TG, fontSize: size, lineHeight: 1.05 }}>
    {children}
  </h2>
);

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function AdmissionsPage() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef    = useRef<HTMLElement>(null);
  const aboutRef   = useRef<HTMLElement>(null);
  const progsRef   = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const newsRef    = useRef<HTMLElement>(null);
  const faqRef     = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ delay: 0.05, defaults: { ease: 'power3.out' } });

      gsap.set('.h-img', { opacity: 0, scale: 1.04 });
      tl.to('.h-img', { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out' });

      gsap.set('.h-line', { opacity: 0, y: 36 });
      tl.to('.h-line', { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 }, '-=1.0');

      gsap.set('.h-sub',  { opacity: 0, y: 22 });
      gsap.set('.h-btns', { opacity: 0, y: 22 });
      gsap.set('.h-stat', { opacity: 0, y: 18 });
      tl.to('.h-sub',  { opacity: 1, y: 0, duration: 0.6 }, '-=0.35');
      tl.to('.h-btns', { opacity: 1, y: 0, duration: 0.55 }, '-=0.4');
      tl.to('.h-stat', { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, '-=0.35');

      gsap.to('.h-img', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      const reveal = (
        selector: string,
        trigger: React.RefObject<HTMLElement | null>,
        yFrom = 40,
        xFrom = 0,
        stagger = 0.1,
        start = 'top 76%'
      ) => {
        const els = trigger.current?.querySelectorAll(selector);
        if (!els?.length) return;
        gsap.set(els, { opacity: 0, y: yFrom, x: xFrom });
        gsap.to(els, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.72,
          ease: 'power2.out',
          stagger,
          scrollTrigger: {
            trigger: trigger.current,
            start,
          },
        });
      };

      if (aboutRef.current) {
        reveal('.ab-l', aboutRef, 0, -40);
        reveal('.ab-r', aboutRef, 0,  40);
      }

      if (progsRef.current) {
        reveal('.pc', progsRef, 45, 0, 0.1);
      }

      if (processRef.current) {
        gsap.fromTo(
          '.wz-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.3, ease: 'power2.inOut', scrollTrigger: { trigger: processRef.current, start: 'top 74%' } }
        );
        reveal('.wz-s', processRef, 40, 0, 0.09);
        reveal('.vc',   processRef, 30, 0, 0.08);
        reveal('.ic',   processRef, 0, -20, 0.08);
      }

      if (newsRef.current) {
        reveal('.nw-l', newsRef, 0, -40);
        reveal('.nw-r', newsRef, 0,  40);
        reveal('.nf',   newsRef, 18, 0, 0.08);
      }

      if (faqRef.current) {
        reveal('.fq-l',   faqRef, 0, -25);
        reveal('.faq-row', faqRef, 14, 0, 0.05);
      }

      if (videoRef.current) {
        reveal('.vw', videoRef, 28);
      }

      if (contactRef.current) {
        reveal('.cc', contactRef, 22, 0, 0.1);
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.1, smoothWheel: true, syncTouch: false }}>
      <>
        <style>{`
          .dot-grid {
            background-image: radial-gradient(circle, rgba(30,58,138,0.08) 1px, transparent 1px);
            background-size: 24px 24px;
          }
          .vh {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
          }
          .pc {
            transition: transform 0.35s cubic-bezier(.23,1,.32,1), box-shadow 0.3s ease;
            will-change: transform;
          }
          .pc:hover {
            transform: translateY(-5px);
            box-shadow: 0 18px 45px rgba(30,58,138,0.1);
          }
          .vc, .ic, .nf-i {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .vc:hover, .ic:hover, .nf-i:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 28px rgba(30,58,138,0.08);
          }
          .cb {
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .cb::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.14);
            transform: translateX(-100%);
            transition: transform 0.4s ease;
          }
          .cb:hover::after { transform: translateX(0); }
          .cb:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 26px rgba(30,58,138,0.2);
          }
          .ob {
            transition: all 0.3s ease;
            color: #1e3a8a;
          }
          .ob:hover {
            background: #1e3a8a !important;
            color: #ffffff !important;
            border-color: #1e3a8a !important;
            transform: translateY(-2px);
          }
          .play-btn {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .play-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 0 0 10px rgba(255,255,255,0.1);
          }
          .wz-line { transform-origin: left; }
        `}</style>

        <div className="overflow-x-hidden bg-black">

          {/* ════════════════════════════════
              §1  HERO — 100vh
          ════════════════════════════════ */}
          <section ref={heroRef} className="vh relative bg-black">
            <div className="absolute inset-0 z-0">
              <Image src={IMG.hero} alt="LEAD College campus" fill priority className="object-cover h-img" style={{ opacity: 0 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/12" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="absolute inset-0 dot-grid opacity-[0.14] z-0 pointer-events-none" />
            <div className="absolute top-5 left-5 w-9 h-9 border-t border-l border-white/18 z-10" />
            <div className="absolute bottom-5 right-5 w-9 h-9 border-b border-r border-white/18 z-10" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 pt-28 pb-10">
              <h1 className={`${cinzel.className} uppercase font-bold leading-[0.9] mb-5`}
                style={{ fontSize: 'clamp(2.6rem,7vw,7rem)' }}>
                <span className="h-line block text-white" style={{ opacity: 0 }}>Begin Your</span>
                <span className="h-line block text-white" style={{ opacity: 0 }}>Journey</span>
              </h1>
              <p className="h-sub max-w-lg text-white/72 mb-7" style={{ opacity: 0, fontFamily: "'Playfair Display',serif", fontSize: 'clamp(0.8rem,.95vw,.95rem)', lineHeight: 1.72 }}>
                Admission to LEAD College is the first step toward becoming part of a dynamic academic community committed to developing competent professionals, entrepreneurs, and technology specialists.
              </p>
              <div className="h-btns flex flex-wrap gap-2.5 mb-10" style={{ opacity: 0 }}>
                {[
                  { label:'Apply for MBA',          href: MBA_URL },
                  { label:'Apply for MCA',          href: MCA_URL },
                  { label:'MBA – Entrepreneurship', href: MBA_URL },
                  { label:'Doctoral Enquiry',       href: MBA_URL },
                ].map(b => (
                  <a key={b.label} href={b.href}
                    target={b.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    className={`cb ${cinzel.className} px-4 py-2.5 rounded-full font-semibold`}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.3)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      fontSize: 'clamp(0.5rem,.7vw,.68rem)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                    }}>
                    {b.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-8">
                {[
                  { val:'21.67 LPA', lbl:'Highest Package 2024–26 Batch' },
                  { val:'500+',      lbl:'Recruiting Companies Across 6 Batches' },
                  { val:'95%+',      lbl:'Average Placement Rate' },
                  { val:'219+',      lbl:'Companies Engaged Current Batch' },
                ].map(s=>(
                  <div key={s.val} className="h-stat" style={{ opacity: 0 }}>
                    <p className={cinzel.className} style={{ fontSize:'clamp(1.1rem,2vw,1.9rem)', fontWeight:700, color:'#fff', lineHeight:1 }}>{s.val}</p>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.62rem', color:'rgba(255,255,255,0.48)', marginTop:3, maxWidth:140 }}>{s.lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              §2  ABOUT LEAD — 100vh
          ════════════════════════════════ */}
          <section ref={aboutRef} id="about" className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
              <div className="ab-l" style={{ opacity: 0 }}>
                <Label text="About LEAD" />
                <Title>Not Your<br />Usual College</Title>
                <div className="space-y-2.5 mt-4 mb-5">
                  <p style={P}><strong>LEAD</strong> — Leadership &amp; Entrepreneurship Academy, Dhoni — is nestled in the arms of nature at Dhoni, Palakkad. With 12+ years of management education, we are driven by an entrepreneurial spirit that sets us apart from convention.</p>
                  <p style={P}>We are a fully residential college focused on building stellar careers through our unique ABCDE teaching-learning concept. Our admission process, <strong>VLEAD</strong>, is designed for holistic evaluation — marks are only one element of the selection criteria.</p>
                  <p style={P}>Our teaching philosophy emphasises application-based learning, skill development, and strong industry alignment — producing graduates who are industry-ready and socially responsible.</p>
                </div>
                <div className="grid grid-cols-4 gap-2.5 mb-5">
                  {[{v:'360',l:'MBA Seats'},{v:'2+',l:'PG Programs'},{v:'NBA',l:'Accredited'},{v:'100%',l:'Residential'}].map(s=>(
                    <div key={s.v} className="bg-blue-50/60 rounded-xl p-3 text-center border border-blue-100/50">
                      <p className={cinzel.className} style={{ fontSize:'1.25rem', fontWeight:700, color:BLUE, lineHeight:1 }}>{s.v}</p>
                      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.65rem', color:'#666', marginTop:2 }}>{s.l}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Btn href={MBA_URL} label="Apply for MBA" primary ext />
                  <Btn href={MCA_URL} label="Apply for MCA" ext />
                </div>
              </div>
              <div className="ab-r relative h-[380px]" style={{ opacity: 0 }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={IMG.about} alt="LEAD campus life" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: BLUE }} />
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              §3  PROGRAMS — free height
          ════════════════════════════════ */}
          <section ref={progsRef} id="programs" className="py-16 bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <div>
                  <Label text="Programs Offered" />
                  <Title size="clamp(1.44rem,2.52vw,2.25rem)">Choose Your Pathway</Title>
                </div>
                <p style={{ ...P, fontSize:'0.78rem', maxWidth:260 }}>Four programs for industry, entrepreneurship, technology &amp; academia.</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                {programs.map(prog => (
                  <div key={prog.code} className="pc relative rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white flex flex-col" style={{ opacity:0 }}>
                    <div className="relative h-28 flex-shrink-0 overflow-hidden">
                      <Image src={prog.img} alt={prog.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/68 to-transparent" />
                      <span className={cinzel.className} style={{ position:'absolute', top:8, right:10, fontSize:'2.2rem', fontWeight:800, color:'rgba(255,255,255,0.09)', lineHeight:1 }}>{prog.code}</span>
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className={cinzel.className} style={{ fontSize:'0.43rem', letterSpacing:'0.15em', textTransform:'uppercase', background:'rgba(255,255,255,0.12)', backdropFilter:'blur(6px)', color:'#fff', padding:'2px 7px', borderRadius:999, border:'1px solid rgba(255,255,255,0.16)' }}>{prog.tag}</span>
                      </div>
                    </div>
                    <div className="p-3.5 flex flex-col flex-1">
                      <h3 className={cinzel.className} style={{ fontSize:'clamp(0.7rem,1vw,0.92rem)', fontWeight:700, color:'#111', marginBottom:1 }}>{prog.title}</h3>
                      <p className={cinzel.className} style={{ fontSize:'0.5rem', letterSpacing:'0.16em', color:BLUE2, textTransform:'uppercase', marginBottom:8 }}>{prog.subtitle}</p>
                      <div className="w-5 h-0.5 mb-2.5" style={{ background:BLUE }} />
                      <ul className="space-y-1 mb-3.5 flex-1">
                        {prog.bullets.map(b=>(
                          <li key={b} className="flex items-start gap-1.5">
                            <div className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0" style={{ background:BLUE2 }} />
                            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.67rem', lineHeight:1.6, color:'#555' }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-1.5 mt-auto">
                        <a href={prog.applyHref} target="_blank" rel="noreferrer"
                          className={`cb ${cinzel.className} flex-1 text-center py-2 rounded-full font-semibold`}
                          style={{ background:BLUE, color:'#fff', fontSize:'0.54rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>
                          Apply Now
                        </a>
                        <a href={prog.viewHref}
                          className={`ob ${cinzel.className} flex-1 text-center py-2 rounded-full font-semibold border`}
                          style={{ color:BLUE, borderColor:BLUE, fontSize:'0.54rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>
                          View Course
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              §4  VLEAD + WIZARD + INSTRUCTIONS
          ════════════════════════════════ */}
          <section ref={processRef} id="apply" className="py-16 bg-white relative overflow-hidden px-8 md:px-14">
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="relative z-10 max-w-6xl mx-auto w-full">
              <div className="mb-5 text-center">
                <Label text="Selection & Application" />
                <Title size="clamp(1.44rem,2.52vw,2.25rem)">The VLEAD Framework</Title>
              </div>
              <div className="grid lg:grid-cols-3 gap-4">

                {/* Col 1: VLEAD */}
                <div className="vc bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3" style={{ opacity:0 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:BLUE, color:'#fff' }}>{Ico.shield}</div>
                    <h3 className={cinzel.className} style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#111' }}>The VLEAD Process</h3>
                  </div>
                  <p style={{ ...P, fontSize:'0.74rem' }}>
                    <strong>VLEAD</strong> is LEAD's holistic selection framework — designed to identify candidates with the right attitude and potential, not just academic scores. Our uLEAD cycle begins <strong>December 1st</strong> each year, with multiple rounds over 8 months.
                  </p>
                  <div className="w-full h-20"><UndrawGraduation /></div>
                  <div className="grid grid-cols-2 gap-2">
                    {vleadCriteria.map(c=>(
                      <div key={c.label} className="rounded-xl p-2.5 border border-blue-100/60 flex flex-col gap-1" style={{ background:'rgba(30,58,138,0.025)' }}>
                        <div className="flex items-center gap-1.5">
                          <span style={{ color:BLUE }}>{c.icon}</span>
                          <p className={cinzel.className} style={{ fontSize:'0.52rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#111' }}>{c.label}</p>
                        </div>
                        <p style={{ ...P, fontSize:'0.68rem' }}>{c.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-3 text-center mt-auto" style={{ background:BLUE }}>
                    <p className={cinzel.className} style={{ color:'#fff', fontSize:'0.58rem', letterSpacing:'0.08em', lineHeight:1.65 }}>
                      Potential &amp; mindset matter<br />as much as academic marks.
                    </p>
                  </div>
                </div>

                {/* Col 2: 5-step wizard */}
                <div className="wz-s bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col" style={{ opacity:0 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:BLUE, color:'#fff' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                    </div>
                    <h3 className={cinzel.className} style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#111' }}>5-Step Application</h3>
                  </div>
                  <div className="w-full h-14 mb-3"><UndrawProcess /></div>
                  <div className="flex-1 space-y-0">
                    {steps.map((step, i) => (
                      <div key={step.n} className="relative flex gap-3">
                        {i < steps.length - 1 && (
                          <div className="absolute left-[11px] top-[24px] bottom-0 w-px" style={{ background: i===0 ? BLUE : '#e5e7eb' }} />
                        )}
                        <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 z-10 mt-1"
                          style={{ background: i===0 ? BLUE : '#f3f4f6', border:`1.5px solid ${i===0 ? BLUE : '#e5e7eb'}` }}>
                          <span className={cinzel.className} style={{ fontSize:'0.48rem', fontWeight:700, color: i===0 ? '#fff' : '#666' }}>{step.n}</span>
                        </div>
                        <div className="pb-3.5">
                          <p className={cinzel.className} style={{ fontSize:'0.62rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#111', marginBottom:1 }}>{step.title}</p>
                          <p style={{ ...P, fontSize:'0.68rem' }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-3 border border-blue-100 mt-2 mb-3" style={{ background:'rgba(30,58,138,0.03)' }}>
                    <p className={cinzel.className} style={{ fontSize:'0.55rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:BLUE, marginBottom:4 }}>Program Commencement</p>
                    <div className="flex items-center gap-2">
                      <span style={{ color:BLUE }}>{Ico.clock}</span>
                      <p style={{ ...P, fontSize:'0.7rem' }}>First week of September, preceded by the <em>Turning Point</em> pre-course induction program.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a href={MBA_URL} target="_blank" rel="noreferrer" className={`cb ${cinzel.className} flex-1 text-center py-2.5 rounded-full font-semibold`}
                      style={{ background:BLUE, color:'#fff', fontSize:'0.54rem', textTransform:'uppercase', letterSpacing:'0.12em' }}>
                      Start MBA
                    </a>
                    <a href={MCA_URL} target="_blank" rel="noreferrer" className={`ob ${cinzel.className} flex-1 text-center py-2.5 rounded-full font-semibold border`}
                      style={{ color:BLUE, borderColor:BLUE, fontSize:'0.54rem', textTransform:'uppercase', letterSpacing:'0.12em' }}>
                      Start MCA
                    </a>
                  </div>
                </div>

                {/* Col 3: Instructions */}
                <div className="ic bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3" style={{ opacity:0 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:BLUE, color:'#fff' }}>{Ico.info}</div>
                    <h3 className={cinzel.className} style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#111' }}>Important Instructions</h3>
                  </div>
                  {instructions.map(ins=>(
                    <div key={ins.title} className="rounded-xl p-3 border border-gray-100 flex gap-3 items-start" style={{ background:'rgba(30,58,138,0.02)' }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:'rgba(30,58,138,0.07)', color:BLUE }}>{ins.icon}</div>
                      <div>
                        <p className={cinzel.className} style={{ fontSize:'0.58rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#111', marginBottom:3 }}>{ins.title}</p>
                        <p style={{ ...P, fontSize:'0.7rem' }}>{ins.body}</p>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl p-3.5 border border-blue-100 mt-auto" style={{ background:'rgba(30,58,138,0.035)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span style={{ color:BLUE }}>{Ico.msg}</span>
                      <p className={cinzel.className} style={{ fontSize:'0.58rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:BLUE }}>QMS — How to Use</p>
                    </div>
                    <div className="w-full h-20 mb-2"><UndrawQMS /></div>
                    <div className="space-y-1.5">
                      {['Register & verify your email','Login → open dashboard','Click "Any Queries? Ask Us"','Select category and submit'].map((s,i)=>(
                        <div key={s} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:BLUE }}>
                            <span className={cinzel.className} style={{ fontSize:'0.42rem', color:'#fff', fontWeight:700 }}>{i+1}</span>
                          </div>
                          <p style={{ ...P, fontSize:'0.68rem' }}>{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              §5  CAMPUS LIFE / NEWS — 100vh
          ════════════════════════════════ */}
          <section ref={newsRef} className="vh bg-white px-8 md:px-14">
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
              <div className="nw-l relative h-[380px]" style={{ opacity:0 }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={IMG.news} alt="LEAD campus community" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background:BLUE }} />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/14 backdrop-blur-md rounded-xl px-4 py-3 border border-white/18">
                      <p className={cinzel.className} style={{ color:'#fff', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:2 }}>Fully Residential Campus</p>
                      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.74rem', color:'rgba(255,255,255,0.78)', lineHeight:1.5 }}>Dhoni, Palakkad — a serene environment built for focus, growth &amp; leadership.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nw-r" style={{ opacity:0 }}>
                <Label text="Life at LEAD" />
                <Title size="clamp(1.44rem,2.7vw,2.52rem)">An Entrepreneurial<br />Learning Community</Title>
                <div className="space-y-2.5 mt-4 mb-5">
                  <p style={P}>With a strong legacy in management and professional education, LEAD is driven by an entrepreneurial culture and a commitment to developing industry-ready and socially responsible professionals.</p>
                  <p style={P}>Our unique teaching–learning philosophy emphasises application-based learning, skill development, and strong industry alignment — cultivating professionals who lead with purpose and act with integrity.</p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {newsFeatures.map(f => (
                    <div key={f.label} className="nf nf-i flex items-start gap-2.5 bg-blue-50/45 rounded-xl p-3 border border-blue-100/45" style={{ opacity:0 }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:'rgba(30,58,138,0.07)', color:BLUE }}>{f.icon}</div>
                      <div>
                        <p className={cinzel.className} style={{ fontSize:'0.58rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#111', marginBottom:2 }}>{f.label}</p>
                        <p style={{ ...P, fontSize:'0.7rem' }}>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Btn href={MBA_URL} label="Apply for MBA" primary ext />
                  <Btn href={MCA_URL} label="Apply for MCA" ext />
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              §6  FAQ — 100vh
          ════════════════════════════════ */}
          <section ref={faqRef} id="faq" className="vh bg-white relative overflow-hidden px-8 md:px-14">
            <div className={`${cinzel.className} absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 font-bold uppercase`}
              style={{ fontSize:'clamp(6rem,16vw,16rem)', color:'rgba(30,58,138,0.027)', lineHeight:1, letterSpacing:'-0.04em' }} aria-hidden="true">FAQ</div>
            <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[210px_1fr] gap-10 items-start">
              <div className="fq-l lg:sticky lg:top-16 self-start" style={{ opacity:0 }}>
                <Label text="Got Questions?" />
                <Title size="clamp(1.35rem,2.52vw,2.34rem)">Every<br />Answer<br />Here.</Title>
                <p style={{ ...P, fontSize:'0.74rem', marginTop:8 }}>Still need help? Reach us via LEAD QMS or call +91 9497713693.</p>
                <div className="mt-4 w-full max-w-[160px]"><UndrawFAQ /></div>
                <div className="mt-4 space-y-2">
                  <Btn href={MBA_URL} label="Apply for MBA" primary ext />
                  <Btn href={MCA_URL} label="Apply for MCA" ext />
                </div>
              </div>
              <div className="faq-list">
                {faqs.map((item, i) => (
                  <FAQRow key={i} item={item} index={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              §7  VIDEO — free height
          ════════════════════════════════ */}
          <section ref={videoRef} className="py-16 bg-white px-8 md:px-14">
            <div className="max-w-5xl mx-auto w-full">
              <div className="text-center mb-6">
                <Label text="Discover LEAD" />
                <Title size="clamp(1.44rem,2.7vw,2.52rem)">Watch Our Admissions Story</Title>
                <p className="mt-2.5 max-w-md mx-auto" style={{ ...P, fontSize:'0.8rem' }}>
                  Learn about our programs, campus life, and what makes LEAD a truly unique learning community.
                </p>
              </div>

              <div className="vw relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio:'16/9', opacity:0 }}>
                {!videoPlaying ? (
                  <div className="relative w-full h-full">
                    {/* ✅ CHANGED: professor-in-lecture-hall thumbnail — clearly college context */}
                    <Image src={IMG.video} alt="LEAD admissions video thumbnail" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/42 flex flex-col items-center justify-center gap-4">
                      <button
                        onClick={() => setVideoPlaying(true)}
                        className="play-btn w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl"
                        aria-label="Play admissions video"
                      >
                        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                          <path d="M7 5l18 9-18 9V5z" fill={BLUE}/>
                        </svg>
                      </button>
                      <span className={cinzel.className} style={{ color:'#fff', fontSize:'0.58rem', letterSpacing:'0.3em', textTransform:'uppercase', opacity:0.72 }}>
                        Click to Play
                      </span>
                    </div>
                  </div>
                ) : (
                  // ✅ CHANGED: real LEAD video — VrkT32NhEM4 starting at 1:41
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/VrkT32NhEM4?start=101&autoplay=1&rel=0&modestbranding=1"
                    title="LEAD College — Admissions"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              §8  CONTACT — 100vh
          ════════════════════════════════ */}
          <section ref={contactRef} id="contact" className="vh bg-white relative overflow-hidden px-8 md:px-14">
            <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
            <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <Label text="Get in Touch" />
                <Title size="clamp(1.44rem,2.7vw,2.52rem)">We're Here<br />to Help</Title>
                <div className="space-y-3 mt-5">
                  {[
                    { icon:Ico.pin,   label:'Campus Address', lines:['LEAD College (Autonomous)','Dhoni PO, Palakkad, Kerala – 678009'] },
                    { icon:Ico.phone, label:'Phone Numbers',  lines:['0491-2553693 / 2553663','+91 9497713693  ·  +91 8838095207'] },
                    { icon:Ico.mail,  label:'Email Address',  lines:['info@lead.ac.in','mail@lead.ac.in'] },
                  ].map(card=>(
                    <div key={card.label} className="cc flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ opacity:0 }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'rgba(30,58,138,0.06)', color:BLUE }}>{card.icon}</div>
                      <div>
                        <h4 className={cinzel.className} style={{ fontSize:'0.58rem', letterSpacing:'0.2em', textTransform:'uppercase', color:BLUE2, marginBottom:4, fontWeight:600 }}>{card.label}</h4>
                        {card.lines.map(line=><p key={line} style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.82rem', color:'#444', lineHeight:1.75 }}>{line}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cc relative h-[390px]" style={{ opacity:0 }}>
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                  <Image src={IMG.contact} alt="LEAD College" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className={cinzel.className} style={{ color:'#fff', fontSize:'clamp(1rem,1.7vw,1.5rem)', fontWeight:700, lineHeight:1.1, marginBottom:8, textTransform:'uppercase' }}>
                      Ready to Begin<br />Your Journey?
                    </h3>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.78rem', color:'rgba(255,255,255,0.7)', marginBottom:14, lineHeight:1.65 }}>
                      Join LEAD — where learning is practical, growth is continuous, and leadership is a way of life.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label:'MBA',              href: MBA_URL,   p:true  },
                        { label:'MCA',              href: MCA_URL,   p:false },
                        { label:'Entrepreneurship', href: MBA_URL,   p:false },
                        { label:'Doctoral',         href: MBA_URL,   p:false },
                      ].map(({ label, href, p }) => (
                        <a key={label} href={href}
                          target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                          className={`cb ${cinzel.className} px-3.5 py-1.5 rounded-full font-semibold`}
                          style={p
                            ? { background:'#fff', color:BLUE, fontSize:'0.55rem', textTransform:'uppercase', letterSpacing:'0.1em' }
                            : { background:'rgba(255,255,255,0.11)', color:'#fff', border:'1px solid rgba(255,255,255,0.28)', backdropFilter:'blur(4px)', fontSize:'0.55rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </>
    </ReactLenis>
  );
}