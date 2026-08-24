'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cinzel, playfair } from '@/app/fonts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileText,
  ExternalLink,
  ShieldCheck,
  Award,
  BarChart3,
  Landmark,
  BookOpen,
  ArrowUpRight,
  Download,
  Compass,
  Gamepad2,
  TrendingUp,
  Network,
  FlipHorizontal,
  FolderKanban,
  Users,
  Monitor,
  Globe,
  Link,
  CalendarClock,
  ScrollText,
  Building2,
  Stamp,
  BadgeCheck,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BLUE = '#005C9F';
const DARK = '#07111C';

/* ── Accreditation document links — files live in public/accreditations/… ── */
const aicteApprovalLinks = [
  '2010-2011', '2011-2012', '2012-2013', '2013-2014', '2014-2015', '2015-2016',
  '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022',
  '2022-2023', '2023-2024', '2024-2025', '2025-2026', '2026-2027',
].map((y) => ({ label: y.replace('-', '–'), href: `/accreditations/aicte/${y}.pdf`, type: 'pdf' }));

const nirfLinks = Array.from({ length: 9 }, (_, i) => 2018 + i).map((y) => ({
  label: `NIRF ${y}`, href: `/accreditations/nirf/nirf-${y}.pdf`, type: 'pdf',
}));

/* ── Mandatory disclosures data ── */
const disclosures = [
  {
    id: 'aicte',
    icon: Landmark,
    title: 'AICTE Essentials',
    links: [
      { label: 'SWAYAM – Free Online Education',        href: 'https://swayam.gov.in',                                           type: 'web'  },
      { label: 'Unnat Bharat Abhiyan',                  href: 'https://unnatbharatabhiyan.gov.in',                               type: 'web'  },
      { label: 'Vidyalakshmi Portal',                   href: 'https://www.vidyalakshmi.co.in',                                  type: 'web'  },
      { label: 'National Academic Depository',          href: 'https://nad.gov.in',                                              type: 'web'  },
      { label: 'Grievance Redressal Online',            href: 'https://www.ugc.ac.in/grievance/',                                type: 'link' },
      { label: 'Anti-Ragging',                          href: 'https://www.antiragging.in',                                      type: 'web'  },
      { label: 'ICC / Anti-Ragging Cell / Grievances', href: 'https://forms.zohopublic.com/leadcollegeofmanagement/form/GRIEVANCEREDRESSAL/formperma/vdCKdzPkMhxq2RdB2u0FyNwheayXPV6c10_ita5cqZk',  type: 'link' },
    ],
  },
  {
    id: 'aicte-approvals',
    icon: ScrollText,
    title: 'AICTE Approvals',
    links: aicteApprovalLinks,
  },
  {
    id: 'autonomous',
    icon: Building2,
    title: 'Autonomous Status',
    links: [
      { label: 'UGC Autonomous Status',               href: '/accreditations/autonomous/ugc-autonomous-status.pdf',              type: 'pdf' },
      { label: 'University Autonomous Order (2023)',   href: '/accreditations/autonomous/university-autonomous-order-2023.pdf',  type: 'pdf' },
    ],
  },
  {
    id: 'government',
    icon: Stamp,
    title: 'Government Approval',
    links: [
      { label: 'Government Approval — MBA & MCA', href: '/accreditations/government/government-approval-mba-mca.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'nba',
    icon: ShieldCheck,
    title: 'NBA',
    links: [
      { label: 'NBA Accreditation Certificate (valid till 30 Jun 2025)', href: '/accreditations/nba/nba-accreditation-2025.pdf', type: 'pdf' },
      { label: 'SAR 2021', href: '#sar-2021', type: 'pdf' },
      { label: 'SAR 2025', href: '#sar-2025', type: 'pdf' },
    ],
  },
  {
    id: 'naac',
    icon: Award,
    title: 'NAAC',
    links: [
      { label: 'SSR', href: '#ssr', type: 'pdf' },
    ],
  },
  {
    id: 'nirf',
    icon: BarChart3,
    title: 'NIRF',
    links: nirfLinks,
  },
  {
    id: 'iso',
    icon: BadgeCheck,
    title: 'ISO Certification',
    links: [
      { label: 'ISO Certificate 2014', href: '/accreditations/iso/iso-2014.pdf', type: 'pdf' },
      { label: 'ISO Certificate 2021', href: '/accreditations/iso/iso-2021.pdf', type: 'pdf' },
      { label: 'ISO Certificate 2023', href: '/accreditations/iso/iso-2023.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'hlact',
    icon: Globe,
    title: 'HLACT',
    links: [
      { label: 'HLACT UK Accreditation', href: '/accreditations/hlact/hlact-uk.png', type: 'doc' },
    ],
  },
  {
    id: 'financial',
    icon: BookOpen,
    title: 'Financial Statements',
    links: [
      { label: 'Audited Financials 2020–21', href: '#fin-2021', type: 'pdf' },
      { label: 'Audited Financials 2021–22', href: '#fin-2022', type: 'pdf' },
      { label: 'Audited Financials 2022–23', href: '#fin-2023', type: 'pdf' },
      { label: 'Audited Financials 2023–24', href: '#fin-2024', type: 'pdf' },
      { label: 'Audited Financials 2024–25', href: '#fin-2025', type: 'pdf' },
    ],
  },
];

/* badge label + icon per link type */
function LinkBadge({ type }: { type: string }) {
  if (type === 'pdf')  return <span style={badgeStyle('#005C9F')}>PDF</span>;
  if (type === 'web')  return <span style={badgeStyle('#0c7a3e')}>Web</span>;
  if (type === 'link') return <span style={badgeStyle('#7c3aed')}>Link</span>;
  return <span style={badgeStyle('#888')}>Doc</span>;
}
function LinkIcon({ type }: { type: string }) {
  if (type === 'web')  return <Globe  size={14} color={BLUE} strokeWidth={1.6} />;
  if (type === 'link') return <Link   size={14} color={BLUE} strokeWidth={1.6} />;
  return <FileText size={14} color={BLUE} strokeWidth={1.6} />;
}
function badgeStyle(color: string): React.CSSProperties {
  return {
    fontSize: '0.65rem',
    padding: '2px 7px',
    background: `${color}12`,
    border: `1px solid ${color}33`,
    borderRadius: 100,
    color,
    fontWeight: 700,
    letterSpacing: '0.06em',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-cinzel, serif)',
    textTransform: 'uppercase',
  };
}

/* ── Persona data ── */
const personas = [
  {
    id: 'sindhu',
    name: 'Dr. Sindhu R.',
    role: 'Head of Accreditation',
    image: "/iqac/gv41 - Dr. Sindhu R.jpeg",
    tag: 'Accreditation & Standards',
    description:
      'Dr. Sindhu R. leads LEAD College\'s accreditation efforts, coordinating all activities related to NBA, NAAC, NIRF, and regulatory compliance. Her work ensures that LEAD\'s programs meet and exceed national and international quality benchmarks.',
  },
  {
    id: 'kgv',
    name: 'Dr. K. G. Viswanathan',
    role: 'Head of IQAC',
    image: "/iqac/gv43 - Dr. K G Viswanadhan.jpeg",
    tag: 'Internal Quality Assurance',
    description:
      'Dr. K. G. Viswanathan leads the Internal Quality Assurance Cell at LEAD College, overseeing the implementation of quality systems, academic audit processes, outcome-based education frameworks, and continuous improvement initiatives across all departments.',
  },
];

const accredBodies = [
  { label: 'IQAC',  sub: 'Internal Quality Assurance Cell' },
  { label: 'NBA',   sub: 'National Board of Accreditation' },
  { label: 'NAAC',  sub: 'National Assessment & Accreditation Council' },
  { label: 'NIRF',  sub: 'National Institutional Ranking Framework' },
  { label: 'AICTE', sub: 'All India Council for Technical Education' },
];

/* ── Faculty Initiatives data ── */
const INNOVATIONS = [
  {
    icon: Compass,
    title: 'Expeditionary Learning',
    body: 'Immersive field-based learning journeys that connect classroom theory to real-world challenges and industry environments.',
  },
  {
    icon: Gamepad2,
    title: 'Structured Gamified Modules',
    body: 'Curriculum delivered through carefully designed game mechanics that reinforce core concepts and boost engagement.',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Data-Driven Analysis',
    body: 'Live datasets and analytics tools integrated into coursework, training students to derive insights from current market information.',
  },
  {
    icon: Network,
    title: 'Lateral Learning Frameworks',
    body: 'Cross-disciplinary connections that encourage students to draw parallels between management domains and adjacent fields.',
  },
  {
    icon: FlipHorizontal,
    title: 'Flipped Classroom Models',
    body: 'Pre-session content delivery frees in-class time for deeper discussion, problem-solving, and collaborative exercises.',
  },
  {
    icon: FolderKanban,
    title: 'Project-Based Learning',
    body: 'Sustained, outcome-driven projects that replicate real business scenarios and develop end-to-end problem-solving skills.',
  },
  {
    icon: Users,
    title: 'Collaborative Learning Environments',
    body: 'Structured peer-to-peer learning frameworks that mirror professional team dynamics and sharpen interpersonal competencies.',
  },
  {
    icon: Monitor,
    title: 'Technology-Enhanced Instruction',
    body: 'Digital tools, simulations, and AI-assisted feedback loops woven seamlessly into the delivery of every programme.',
  },
];

/* ── Programme Outcomes data ── */
const MBA_DATA = {
  dept: 'MBA',
  color: '#005C9F',
  peo: [
    { n: 'PEO1', body: 'Apply advanced management and entrepreneurial knowledge to create innovative business solutions.' },
    { n: 'PEO2', body: 'Demonstrate ethical, analytical, and leadership skills for responsible decision-making.' },
    { n: 'PEO3', body: 'Exhibit strong communication, teamwork, and adaptability for professional excellence.' },
    { n: 'PEO4', body: 'Consistently uphold constitutional, ethical, and humanistic values in all endeavours.' },
  ],
  po: [
    { n: 'PO1', title: 'Problem Solving',          body: 'Apply knowledge of management theories and practices to solve business problems.' },
    { n: 'PO2', title: 'Decision-Making',           body: 'Foster analytical and critical thinking abilities for data-based decision making.' },
    { n: 'PO3', title: 'Value-Based Leadership',    body: 'Develop the ability to provide value-based leadership that drives ethical organisational culture.' },
    { n: 'PO4', title: 'Communication',             body: 'Understand, analyze, and communicate the global, economic, legal, and ethical aspects of business.' },
    { n: 'PO5', title: 'Teamwork',                  body: 'Lead themselves and others in achieving organisational goals, while contributing effectively to team environments.' },
  ],
  pso: [
    { n: 'PSO1', title: 'Entrepreneurial Leadership & Initiative', body: 'Demonstrate an entrepreneurial mindset by proactively identifying opportunities and mobilizing resources to lead effectively in a complex global business environment.' },
    { n: 'PSO2', title: 'Holistic Professional Competency',        body: 'Integrate core management principles with modern digital and information technology skills to drive innovation and navigate the future of business.' },
  ],
};

const MCA_DATA = {
  dept: 'MCA',
  color: '#1e3a8a',
  peo: [
    { n: 'PEO1', body: 'Graduates would demonstrate a comprehensive understanding of computer applications and emerging technologies, with an ability to analyze and solve complex problems in diverse domains.' },
    { n: 'PEO2', body: 'Graduates will possess essential technical, analytical, and professional skills, along with leadership abilities, to effectively manage projects and contribute to team success in the IT industry.' },
    { n: 'PEO3', body: 'Graduates will have the practical experience, industry-relevant skills, and an entrepreneurial mindset to excel in technology-driven careers.' },
    { n: 'PEO4', body: 'Graduates will achieve an appreciation for ethical practices, human values, and social responsibility, preparing graduates to contribute positively to society and the technology landscape.' },
  ],
  po: [
    { n: 'PO1', title: 'Computational Knowledge',         body: 'Apply knowledge of computing fundamentals and domain-specific concepts to create effective computing solutions.' },
    { n: 'PO2', title: 'Problem Analysis',                body: 'Identify, analyze, and solve complex computing problems using foundational and domain-specific principles.' },
    { n: 'PO3', title: 'Design & Development',            body: 'Design and develop solutions that meet specific needs, considering public health, safety, cultural, societal, and environmental aspects.' },
    { n: 'PO4', title: 'Research & Lifelong Learning',    body: 'Conduct investigations using research-based knowledge and recognize the importance of lifelong learning to adapt to technological advancements.' },
    { n: 'PO5', title: 'Ethics & Societal Impact',        body: 'Apply ethical principles and assess societal, environmental, and cultural impacts of computing solutions, adhering to relevant standards.' },
    { n: 'PO6', title: 'Project Management',              body: 'Apply management principles to plan, organize, and execute computing projects effectively as a team member or leader.' },
    { n: 'PO7', title: 'Teamwork & Communication',        body: 'Communicate effectively and function as an individual or leader in diverse teams, fostering collaboration and multidisciplinary engagement.' },
    { n: 'PO8', title: 'Innovation & Entrepreneurship',   body: 'Identify opportunities and engage in innovative and entrepreneurial activities to address emerging needs in computing technologies.' },
  ],
  pso: [
    { n: 'PSO1', title: 'Software Solutions & System Innovation',       body: 'Apply advanced computational knowledge and modern development tools to design, develop, and deploy intelligent, secure, and scalable software systems that address real-world and societal challenges.' },
    { n: 'PSO2', title: 'Emerging Technologies & Entrepreneurial Practice', body: 'Integrate and apply emerging technologies to innovate, research, and build technology-driven entrepreneurial solutions that contribute to sustainable digital transformation.' },
  ],
};

type DisclosureLink = { label: string; href: string; type: string };

export default function QualityAssurancePage({
  meetingMinutes = [],
}: {
  meetingMinutes?: DisclosureLink[];
}) {
  const [activeDept, setActiveDept] = useState<'MBA'|'MCA'>('MBA');
  const [activePOTab, setActivePOTab] = useState<'peo'|'po'|'pso'>('peo');

  /* Meeting-minutes files are read from the folder at build time (see app/iqac/page.tsx).
     Appended as a sub-section under Mandatory Disclosures only when files exist. */
  const disclosureSections = meetingMinutes.length
    ? [
        ...disclosures,
        {
          id: 'meeting-minutes',
          icon: CalendarClock,
          title: 'Meeting Minutes',
          links: meetingMinutes,
        },
      ]
    : disclosures;

  const heroRef    = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const overviewRef  = useRef<HTMLElement>(null);
  const personasRef  = useRef<HTMLElement>(null);
  const linkBandRef  = useRef<HTMLElement>(null);
  const discRef      = useRef<HTMLElement>(null);
  const fiRef        = useRef<HTMLElement>(null);
  const outcomesRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const reveal = (
        selector: string,
        trigger: Element | null,
        opts: { y?: number; x?: number; stagger?: number; delay?: number; duration?: number } = {}
      ) => {
        const { y = 36, x = 0, stagger = 0, delay = 0, duration = 0.72 } = opts;
        if (!trigger) return;
        const els = trigger.querySelectorAll(selector);
        if (!els.length) return;
        gsap.set(els, { opacity: 0, y, x });
        gsap.to(els, {
          opacity: 1, y: 0, x: 0, duration, delay, ease: 'power2.out', stagger,
          scrollTrigger: { trigger, start: 'top 78%' },
        });
      };

      const revealEl = (
        el: Element | null,
        trigger: Element | null,
        opts: { y?: number; x?: number; delay?: number; duration?: number } = {}
      ) => {
        if (!el || !trigger) return;
        const { y = 36, x = 0, delay = 0, duration = 0.8 } = opts;
        gsap.set(el, { opacity: 0, y, x });
        gsap.to(el, {
          opacity: 1, y: 0, x: 0, duration, delay, ease: 'power3.out',
          scrollTrigger: { trigger, start: 'top 78%' },
        });
      };

      const hero = heroRef.current;
      if (hero) {
        const eyebrow = hero.querySelector('.qa-eyebrow') as HTMLElement | null;
        const title   = titleRef.current;
        const sub     = hero.querySelector('.qa-hero-sub') as HTMLElement | null;
        const rows    = hero.querySelectorAll('.qa-accred-row');
        const marquee = hero.querySelector('.qa-hero-marquee-wrap') as HTMLElement | null;

        if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: -12 });
        if (title)   gsap.set(title,   { opacity: 0, y: 52 });
        if (sub)     gsap.set(sub,     { opacity: 0, y: 20 });
        if (rows.length) gsap.set(rows, { opacity: 0, y: 16 });
        if (marquee) gsap.set(marquee, { opacity: 0 });

        const tl = gsap.timeline({ delay: 0.08, defaults: { ease: 'power3.out' } });
        if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.55 });
        if (title)   tl.to(title,   { opacity: 1, y: 0, duration: 0.9 }, '-=0.25');
        if (sub)     tl.to(sub,     { opacity: 1, y: 0, duration: 0.7 }, '-=0.45');
        if (rows.length) tl.to(rows, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 }, '-=0.4');
        if (marquee) tl.to(marquee, { opacity: 1, duration: 0.8 }, '-=0.3');
      }

      const overview = overviewRef.current;
      if (overview) {
        reveal('.qa-aov-text', overview, { x: -40, y: 0, duration: 0.85 });
        reveal('.qa-aov-logos', overview, { x: 40, y: 0, delay: 0.12, duration: 0.85 });
        reveal('.qa-logo-cell', overview, { y: 22, stagger: 0.07, delay: 0.2 });
      }

      const personasSec = personasRef.current;
      if (personasSec) {
        reveal('.qa-persona-card', personasSec, { y: 48, stagger: 0.14, duration: 0.8 });
      }

      const linkBand = linkBandRef.current;
      if (linkBand) {
        revealEl(linkBand.querySelector('.qa-link-band-content'), linkBand, { y: 22, duration: 0.7 });
      }

      const disc = discRef.current;
      if (disc) {
        revealEl(disc.querySelector('.qa-disc-hdr'), disc, { y: -10, duration: 0.65 });
        revealEl(disc.querySelector('.qa-disc-layout'), disc, { y: 32, delay: 0.15, duration: 0.75 });
      }

      const fi = fiRef.current;
      if (fi) {
        revealEl(fi.querySelector('.qa-fi-hdr'), fi, { y: -10, duration: 0.65 });
        revealEl(fi.querySelector('.qa-fi-intro-text'), fi, { x: -36, y: 0, delay: 0.1, duration: 0.82 });
        reveal('.qa-fi-card', fi, { y: 28, stagger: 0.06, delay: 0.15, duration: 0.5 });
        revealEl(fi.querySelector('.qa-fi-cta'), fi, { y: 18, delay: 0.22, duration: 0.65 });
      }

      const outcomes = outcomesRef.current;
      if (outcomes) {
        revealEl(outcomes.querySelector('.qa-po-hdr'), outcomes, { y: -10, duration: 0.65 });
        revealEl(outcomes.querySelector('.qa-po-tab-bar'), outcomes, { y: 14, delay: 0.12, duration: 0.55 });
        reveal('.qa-po-item', outcomes, { y: 26, stagger: 0.06, delay: 0.18, duration: 0.48 });
      }

      requestAnimationFrame(() => {
        const pill    = document.getElementById('qa-disc-pill');
        const sidebar = document.getElementById('qa-disc-sidebar');
        const first   = sidebar?.querySelector('.qa-disc-tab') as HTMLElement | null;
        if (pill && sidebar && first) {
          const sRect = sidebar.getBoundingClientRect();
          const tRect = first.getBoundingClientRect();
          pill.style.transition = 'none';
          pill.style.top    = (tRect.top - sRect.top + sidebar.scrollTop) + 'px';
          pill.style.height = tRect.height + 'px';
          requestAnimationFrame(() => { pill.style.transition = ''; });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.qa-po-item');
    gsap.fromTo(items,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeDept, activePOTab]);

  const activeData = activeDept === 'MBA' ? MBA_DATA : MCA_DATA;

  return (
    <>
      <style>{`
        /* Hide hero elements before GSAP runs so they animate in cleanly (no flash of un-animated text on first paint) */
        .qa-hero .qa-eyebrow, .qa-hero .qa-hero-title, .qa-hero .qa-hero-sub, .qa-hero .qa-accred-row, .qa-hero .qa-hero-marquee-wrap { opacity: 0; }
        .qa-hero {
          height: 100svh; max-height: 100svh; background: #fff;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
          padding: clamp(4rem, 8vh, 6rem) clamp(1.5rem, 10vw, 9rem) 3.5rem;
          box-sizing: border-box;
        }
        .qa-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(0,92,159,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,92,159,0.04) 1px, transparent 1px);
          background-size: 80px 80px; pointer-events: none; z-index: 0;
        }
        .qa-hero-bg-text {
          position: absolute; right: -0.05em; bottom: -0.15em;
          font-family: var(--font-cinzel, serif);
          font-size: clamp(18rem, 38vw, 52rem); font-weight: 800; line-height: 1;
          color: rgba(0,92,159,0.03); pointer-events: none; user-select: none; z-index: 0; letter-spacing: -0.06em;
        }
        .qa-hero-inner { position: relative; z-index: 2; max-width: 900px; }
        .qa-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: clamp(0.7rem, 1.5vh, 1.2rem); }
        .qa-hero-title { font-size: clamp(2rem, 5.5vw, 7rem); font-weight: 800; line-height: 0.92; letter-spacing: -0.03em; text-transform: uppercase; margin: 0 0 clamp(1rem, 2vh, 1.8rem); }
        .qa-hero-sub { max-width: 520px; margin-bottom: clamp(1.2rem, 2.5vh, 2.5rem); }
        .qa-accred-strip {
          position: relative; z-index: 2; margin-top: clamp(1rem, 2.5vh, 2.5rem);
          padding-top: clamp(0.8rem, 1.5vh, 1.5rem); border-top: 1px solid rgba(0,92,159,0.10);
          display: flex; align-items: stretch; gap: 0; flex-wrap: wrap;
        }
        .qa-accred-row { display: flex; align-items: center; gap: 14px; padding: 0 clamp(1.5rem, 3vw, 2.5rem); border-right: 1px solid rgba(0,92,159,0.10); flex: 1; min-width: 160px; }
        .qa-accred-row:first-child { padding-left: 0; }
        .qa-accred-row:last-child { border-right: none; }
        .qa-hero-marquee-wrap { position: absolute; bottom: 0; left: 0; right: 0; height: 44px; overflow: hidden; border-top: 1px solid rgba(0,92,159,0.07); background: rgba(0,92,159,0.018); display: flex; align-items: center; z-index: 3; }
        .qa-marquee-track { display: flex; align-items: center; gap: 3rem; animation: marquee 28s linear infinite; white-space: nowrap; padding: 0 1.5rem; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .qa-marquee-item { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .qa-personas-section { background: #fff; height: 100svh; max-height: 100svh; overflow: hidden; box-sizing: border-box; padding: clamp(2.5rem, 5vh, 4rem) clamp(1.5rem, 10vw, 9rem); display: flex; flex-direction: column; justify-content: center; }
        .qa-personas-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1rem, 2.5vw, 2rem); margin-top: clamp(1.2rem, 2.5vh, 2rem); flex: 1; min-height: 0; }
        .qa-persona-card { background: #fff; border: 1px solid rgba(0,92,159,0.09); border-radius: 4px; overflow: hidden; transition: box-shadow 0.3s ease, transform 0.3s ease; display: flex; flex-direction: column; min-height: 0; will-change: transform; }
        .qa-persona-card:hover { box-shadow: 0 20px 60px rgba(0,92,159,0.10); transform: translateY(-4px); }
        .qa-portrait-wrap { position: relative; width: 100%; flex: 1; min-height: 0; overflow: hidden; background: linear-gradient(135deg, #e8f0f8, #d0e4f5); flex-shrink: 1; }
        .qa-portrait-wrap img { object-fit: cover; object-position: top center; }
        .qa-portrait-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(7,17,28,0.72) 0%, rgba(7,17,28,0.1) 55%, transparent 100%); z-index: 1; }
        .qa-portrait-name { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem 1.2rem; z-index: 2; }
        .qa-persona-body { padding: clamp(0.9rem, 1.5vw, 1.4rem) clamp(1rem, 2vw, 1.6rem); display: flex; flex-direction: column; gap: 0.6rem; flex-shrink: 0; }
        .qa-link-band { background: ${DARK}; padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 10vw, 9rem); }
        .qa-disclosures-section { background: #fff; padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 10vw, 9rem); }
        .qa-disc-layout { display: grid; grid-template-columns: 280px 1fr; gap: 0; margin-top: clamp(3rem, 6vh, 5rem); border: 1px solid rgba(0,92,159,0.09); border-radius: 4px; overflow: hidden; }
        .qa-disc-sidebar { background: #f5f8fc; border-right: 1px solid rgba(0,92,159,0.09); padding: 0.5rem; overflow: hidden; position: relative; }
        .qa-disc-pill { position: absolute; left: 0.5rem; right: 0.5rem; border-radius: 10px; background: ${BLUE}; pointer-events: none; z-index: 0; transition: top 0.42s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.42s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .qa-disc-tab { display: flex; align-items: center; gap: 12px; padding: 1rem 1rem; cursor: pointer; border-radius: 10px; transition: color 0.2s ease; position: relative; z-index: 1; border: none; background: transparent; user-select: none; width: 100%; }
        .qa-disc-tab.active .qa-disc-tab-label { color: #fff !important; }
        .qa-disc-tab.active .qa-disc-tab-count { color: rgba(255,255,255,0.65) !important; }
        .qa-disc-tab.active .qa-disc-tab-icon { background: rgba(255,255,255,0.18) !important; }
        .qa-disc-tab.active .qa-disc-tab-icon svg { color: #fff !important; stroke: #fff !important; }
        .qa-disc-tab:hover:not(.active) { background: rgba(0,92,159,0.06); }
        .qa-disc-panel { background: #fff; padding: 1.8rem 2rem; display: flex; flex-direction: column; }
        .qa-disc-panel-header { display: flex; align-items: center; gap: 10px; padding-bottom: 1rem; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(0,92,159,0.08); }
        .qa-dl-link { display: flex; align-items: center; gap: 14px; padding: 0.9rem 1rem; margin: 0 -0.5rem; border-radius: 6px; text-decoration: none; transition: background 0.2s ease, transform 0.2s ease; cursor: pointer; position: relative; }
        .qa-dl-link:hover { background: rgba(0,92,159,0.05); transform: translateX(4px); }
        .qa-dl-link:hover .qa-dl-arrow { opacity: 1; transform: translate(0, 0); }
        .qa-dl-link:hover .qa-dl-label { color: ${BLUE}; }
        .qa-dl-icon-wrap { width: 34px; height: 34px; border-radius: 8px; background: rgba(0,92,159,0.07); border: 1px solid rgba(0,92,159,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s ease, border-color 0.2s ease; }
        .qa-dl-link:hover .qa-dl-icon-wrap { background: rgba(0,92,159,0.12); border-color: rgba(0,92,159,0.25); }
        .qa-dl-label { flex: 1; transition: color 0.2s ease; }
        .qa-dl-arrow { opacity: 0; transform: translate(-4px, 4px); transition: opacity 0.2s ease, transform 0.2s ease; flex-shrink: 0; }
        .qa-disc-panel-section { display: none; }
        .qa-disc-panel-section.visible { display: block; }
        .qa-disc-mobile-nav { display: none; }
        .qa-disc-select { width: 100%; padding: 0.9rem 2.5rem 0.9rem 1rem; border: 1px solid rgba(0,92,159,0.2); border-radius: 10px; background-color: #f5f8fc; font-family: var(--font-cinzel, serif); font-size: 0.72rem; font-weight: 700; color: #005C9F; text-transform: uppercase; letter-spacing: 0.05em; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23005C9F' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; cursor: pointer; }
        .qa-accred-overview { background: #fff; height: 100svh; max-height: 100svh; overflow: hidden; box-sizing: border-box; padding: clamp(3rem, 6vh, 5rem) clamp(1.5rem, 10vw, 9rem); display: flex; flex-direction: column; justify-content: center; position: relative; }
        .qa-arc { position: absolute; top: -30%; right: -15%; width: clamp(400px, 55vw, 800px); height: clamp(400px, 55vw, 800px); border-radius: 50%; border: 1px solid rgba(0,92,159,0.055); pointer-events: none; z-index: 0; }
        .qa-arc::after { content: ''; position: absolute; top: 12%; left: 12%; right: 12%; bottom: 12%; border-radius: 50%; border: 1px solid rgba(0,92,159,0.04); }
        .qa-accred-overview-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2.5rem, 5vw, 6rem); align-items: center; height: 100%; }
        .qa-logo-banner { display: flex; flex-direction: column; gap: clamp(1.2rem, 2.5vh, 2rem); }
        .qa-logo-row { display: flex; gap: clamp(1rem, 2.5vw, 2rem); justify-content: space-between; align-items: center; }
        .qa-logo-cell { position: relative; flex: 1; height: clamp(70px, 9vh, 110px); overflow: hidden; display: flex; align-items: center; justify-content: center; transition: opacity 0.25s ease, transform 0.25s ease; }
        .qa-logo-cell:hover { opacity: 0.8; transform: translateY(-2px); }
        .qa-faculty-initiatives { background: #fff; padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 10vw, 9rem); border-top: 1px solid rgba(0,92,159,0.08); position: relative; overflow: hidden; }
        .qa-fi-wm { position: absolute; right: -0.04em; bottom: -0.12em; font-family: var(--font-cinzel, serif); font-size: clamp(10rem, 22vw, 32rem); font-weight: 800; line-height: 1; letter-spacing: -0.06em; color: rgba(0,92,159,0.022); pointer-events: none; user-select: none; z-index: 0; }
        .qa-fi-inner { position: relative; z-index: 1; }
        .qa-fi-body { display: grid; grid-template-columns: 360px 1fr; gap: clamp(3rem, 6vw, 6rem); align-items: start; margin-top: clamp(3rem, 6vh, 5rem); }
        .qa-fi-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(0.75rem, 1.5vw, 1rem); }
        .qa-fi-card { padding: clamp(1rem, 2vw, 1.4rem); border: 1px solid rgba(0,92,159,0.09); border-radius: 4px; background: #fff; display: flex; flex-direction: column; gap: 0.75rem; transition: box-shadow 0.28s ease, transform 0.28s ease, border-color 0.28s ease; cursor: default; will-change: transform; }
        .qa-fi-card:hover { box-shadow: 0 12px 40px rgba(0,92,159,0.09); transform: translateY(-3px); border-color: rgba(0,92,159,0.22); }
        .qa-fi-card:hover .qa-fi-card-icon-wrap { background: ${BLUE}; border-color: ${BLUE}; }
        .qa-fi-card:hover .qa-fi-card-icon-wrap svg { stroke: #fff; }
        .qa-fi-card-icon-wrap { width: 38px; height: 38px; border-radius: 8px; background: rgba(0,92,159,0.07); border: 1px solid rgba(0,92,159,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.25s ease, border-color 0.25s ease; }
        .qa-fi-year-badge { display: inline-flex; align-items: center; gap: 8px; padding: 5px 13px; background: rgba(0,92,159,0.06); border: 1px solid rgba(0,92,159,0.14); border-radius: 100px; width: fit-content; margin-bottom: clamp(0.6rem, 1.2vh, 1rem); }
        .qa-fi-cta { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; margin-top: clamp(3rem, 6vh, 5rem); padding: clamp(1.4rem, 2.5vh, 2rem) clamp(1.6rem, 3vw, 2.4rem); background: linear-gradient(100deg, rgba(0,92,159,0.04) 0%, rgba(30,58,138,0.04) 100%); border: 1px solid rgba(0,92,159,0.10); border-radius: 8px; }
        .qa-fi-cta-btn { display: inline-flex; align-items: center; gap: 11px; padding: 13px 26px; background: linear-gradient(90deg, ${BLUE} 0%, #1e3a8a 100%); border-radius: 8px; text-decoration: none; transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; box-shadow: 0 6px 22px rgba(0,92,159,0.25); cursor: pointer; border: none; will-change: transform; }
        .qa-fi-cta-btn:hover { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,92,159,0.32); }
        .qa-outcomes-section { background: #fff; padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 10vw, 9rem); position: relative; overflow: hidden; }
        .qa-outcomes-section::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(0,92,159,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(0,92,159,0.028) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; z-index: 0; }
        .qa-po-hdr, .qa-po-tab-bar { position: relative; z-index: 1; }
        .qa-po-content { position: relative; z-index: 1; }
        .qa-dept-toggle { display: inline-flex; background: rgba(0,92,159,0.06); border: 1px solid rgba(0,92,159,0.12); border-radius: 100px; padding: 4px; gap: 2px; }
        .qa-dept-btn { padding: 8px 28px; border-radius: 100px; border: none; cursor: pointer; font-family: var(--font-cinzel, serif); font-size: clamp(0.44rem, 0.66vw, 0.6rem); font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; transition: background 0.28s ease, color 0.28s ease, box-shadow 0.28s ease; }
        .qa-dept-btn.active { background: ${BLUE}; color: #fff; box-shadow: 0 4px 16px rgba(0,92,159,0.30); }
        .qa-dept-btn:not(.active) { background: transparent; color: rgba(0,92,159,0.55); }
        .qa-dept-btn:not(.active):hover { background: rgba(0,92,159,0.08); color: ${BLUE}; }
        .qa-po-subtabs { display: flex; gap: 0; border-bottom: 1px solid rgba(0,92,159,0.10); margin: clamp(2rem,4vh,3.5rem) 0 0; }
        .qa-po-subtab { padding: 10px 28px; border: none; background: transparent; cursor: pointer; position: relative; font-family: var(--font-cinzel, serif); font-size: clamp(0.48rem, 0.7vw, 0.64rem); font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #aaa; transition: color 0.22s ease; }
        .qa-po-subtab::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 2px; background: ${BLUE}; transform: scaleX(0); transition: transform 0.28s cubic-bezier(0.22,1,0.36,1); }
        .qa-po-subtab.active { color: ${BLUE}; }
        .qa-po-subtab.active::after { transform: scaleX(1); }
        .qa-po-subtab:hover:not(.active) { color: #555; }
        .qa-peo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(0.75rem, 1.5vw, 1.1rem); margin-top: clamp(1.8rem, 3.5vh, 2.8rem); }
        .qa-peo-card { position: relative; padding: clamp(1.2rem, 2vw, 1.8rem); border: 1px solid rgba(0,92,159,0.09); border-radius: 8px; background: #fff; overflow: hidden; transition: box-shadow 0.28s, transform 0.28s, border-color 0.28s; will-change: transform; }
        .qa-peo-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, ${BLUE}, #1e3a8a); transform: scaleX(0); transform-origin: left; transition: transform 0.32s cubic-bezier(0.22,1,0.36,1); }
        .qa-peo-card:hover { box-shadow: 0 14px 44px rgba(0,92,159,0.10); transform: translateY(-3px); border-color: rgba(0,92,159,0.20); }
        .qa-peo-card:hover::before { transform: scaleX(1); }
        .qa-po-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(0.75rem, 1.5vw, 1.1rem); margin-top: clamp(1.8rem, 3.5vh, 2.8rem); }
        .qa-po-card { position: relative; padding: clamp(1.2rem, 2vw, 1.8rem); border: 1px solid rgba(0,92,159,0.09); border-radius: 8px; background: #fff; overflow: hidden; display: flex; flex-direction: column; gap: 0.7rem; transition: box-shadow 0.28s, transform 0.28s, border-color 0.28s; will-change: transform; }
        .qa-po-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, ${BLUE}, #1e3a8a); transform: scaleY(0); transform-origin: bottom; transition: transform 0.32s cubic-bezier(0.22,1,0.36,1); }
        .qa-po-card:hover { box-shadow: 0 14px 44px rgba(0,92,159,0.10); transform: translateY(-3px); border-color: rgba(0,92,159,0.20); }
        .qa-po-card:hover::before { transform: scaleY(1); }
        .qa-pso-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(0.75rem, 1.5vw, 1.1rem); margin-top: clamp(1.8rem, 3.5vh, 2.8rem); }
        .qa-pso-card { position: relative; padding: clamp(1.4rem, 2.5vw, 2.2rem); border: 1px solid rgba(0,92,159,0.09); border-radius: 8px; background: linear-gradient(135deg, rgba(0,92,159,0.025) 0%, #fff 60%); overflow: hidden; display: flex; gap: clamp(1rem, 2vw, 1.6rem); align-items: flex-start; transition: box-shadow 0.28s, transform 0.28s, border-color 0.28s; will-change: transform; }
        .qa-pso-card:hover { box-shadow: 0 18px 52px rgba(0,92,159,0.12); transform: translateY(-3px); border-color: rgba(0,92,159,0.22); }
        .qa-card-num-ghost { position: absolute; font-family: var(--font-cinzel, serif); font-weight: 900; font-size: clamp(4rem, 7vw, 8rem); line-height: 1; color: ${BLUE}; opacity: 0.03; bottom: -0.1em; right: 0.1em; pointer-events: none; user-select: none; letter-spacing: -0.04em; }
        .qa-num-badge { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; background: rgba(0,92,159,0.07); border: 1px solid rgba(0,92,159,0.14); flex-shrink: 0; font-family: var(--font-cinzel, serif); font-size: 0.5rem; font-weight: 800; color: ${BLUE}; letter-spacing: 0.04em; }
        @media (max-width: 1280px) { .qa-fi-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 1100px) { .qa-peo-grid { grid-template-columns: repeat(2, 1fr); } .qa-po-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 1024px) { .qa-personas-grid { grid-template-columns: 1fr; } .qa-disc-layout { grid-template-columns: 220px 1fr; } .qa-accred-overview-inner { grid-template-columns: 1fr; gap: 1.5rem; } .qa-accred-overview { height: auto; min-height: 100svh; } .qa-fi-body { grid-template-columns: 1fr; } .qa-fi-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .qa-disc-layout { grid-template-columns: 1fr; } .qa-disc-sidebar { display: none; } .qa-disc-mobile-nav { display: block; margin-bottom: 1rem; } .qa-disc-panel { padding: 1.2rem 1.1rem; } .qa-accred-strip { overflow-x: auto; flex-wrap: nowrap; } .qa-accred-row { min-width: 140px; } .qa-fi-cards { grid-template-columns: repeat(2, 1fr); } .qa-pso-grid { grid-template-columns: 1fr; } .qa-peo-grid { grid-template-columns: 1fr; } .qa-po-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .qa-hero { padding-bottom: 4rem; } .qa-hero-marquee-wrap { display: none; } .qa-fi-cards { grid-template-columns: 1fr; } .qa-fi-cta { flex-direction: column; align-items: flex-start; } }
        @media (prefers-reduced-motion: reduce) { .qa-marquee-track { animation: none; } }
      `}</style>

      <div className="overflow-x-hidden">

        {/* §1 HERO */}
        <section ref={heroRef} className="qa-hero">
          <div className="qa-hero-bg-text" aria-hidden="true">QA</div>
          <div className="qa-hero-inner">
            <div className="qa-eyebrow">
              <span style={{ display: 'inline-block', width: 28, height: 1.5, background: BLUE }} />
              <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.44rem, 0.68vw, 0.6rem)', letterSpacing: '0.38em', textTransform: 'uppercase', color: BLUE, fontWeight: 600 }}>
                LEAD College — Academic Excellence
              </span>
            </div>
            <h1 ref={titleRef} className="qa-hero-title" style={{ fontFamily: cinzel.style.fontFamily }}>
              <span style={{ display: 'block', color: '#0D0D0D' }}>Quality Assurance</span>
              <span style={{ display: 'block', background: `linear-gradient(90deg, ${BLUE} 0%, #1e3a8a 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>&amp; Accreditation.</span>
            </h1>
            <div className="qa-hero-sub">
              <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${BLUE}, #1e3a8a)`, marginBottom: 'clamp(1rem, 2vh, 1.6rem)' }} />
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.88rem, 1.05vw, 1rem)', lineHeight: 1.85, color: '#666', margin: 0 }}>
                The Quality &amp; Accreditation function ensures LEAD College maintains the highest academic and institutional standards — through data-driven monitoring, continuous improvement, and compliance with national and international quality benchmarks.
              </p>
            </div>
          </div>
          <div className="qa-accred-strip">
            {accredBodies.map((b) => (
              <div key={b.label} className="qa-accred-row">
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(0,92,159,0.06)', border: '1px solid rgba(0,92,159,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.34rem, 0.5vw, 0.44rem)', fontWeight: 800, letterSpacing: '0.02em', color: BLUE }}>{b.label}</span>
                </div>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)', color: '#777', margin: 0, lineHeight: 1.35 }}>{b.sub}</p>
              </div>
            ))}
          </div>
          <div className="qa-hero-marquee-wrap">
            <div className="qa-marquee-track">
              {['IQAC','NBA Accreditation','NAAC','NIRF Ranking','Outcome-Based Education','Academic Audits','Regulatory Compliance','AICTE','Continuous Improvement','Quality Benchmarks','IQAC','NBA Accreditation','NAAC','NIRF Ranking','Outcome-Based Education','Academic Audits','Regulatory Compliance','AICTE','Continuous Improvement','Quality Benchmarks'].map((item, i) => (
                <div key={i} className="qa-marquee-item">
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: BLUE, display: 'inline-block', opacity: 0.5 }} />
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: BLUE, opacity: 0.5, fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* §2 ACCREDITATION OVERVIEW */}
        <section ref={overviewRef} className="qa-accred-overview">
          <div className="qa-arc" aria-hidden="true" />
          <div className="qa-accred-overview-inner">
            <div className="qa-aov-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.42rem, 0.62vw, 0.56rem)', letterSpacing: '0.36em', textTransform: 'uppercase', color: BLUE, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 clamp(0.8rem, 1.5vh, 1.2rem)' }}>
                <span style={{ display: 'inline-block', width: 20, height: 1.5, background: BLUE }} />
                Standards &amp; Recognition
              </p>
              <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(1.4rem, 2.8vw, 3.2rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.95, color: DARK, margin: '0 0 clamp(1rem, 2vh, 1.6rem)' }}>
                <span style={{ display: 'block' }}>Accredited.</span>
                <span style={{ display: 'block', background: `linear-gradient(90deg, ${BLUE}, #1e3a8a)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Recognised.</span>
                <span style={{ display: 'block' }}>Trusted.</span>
              </h2>
              <div style={{ width: 36, height: 2, background: BLUE, marginBottom: 'clamp(1rem, 2vh, 1.6rem)', borderRadius: 1 }} />
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.8rem, 0.95vw, 0.92rem)', lineHeight: 1.85, color: '#555', margin: '0 0 clamp(1rem, 2vh, 1.6rem)', maxWidth: 460 }}>
                The Quality &amp; Accreditation function ensures that LEAD College maintains the highest academic and institutional standards. The unit oversees outcome-based education, continuous assessment systems, academic audits, stakeholder feedback, and compliance with regulatory and accreditation requirements.
              </p>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.78rem, 0.9vw, 0.88rem)', lineHeight: 1.82, color: '#777', margin: 0, maxWidth: 460 }}>
                Through data-driven monitoring and periodic reviews, this office drives continuous improvement — ensuring programs remain current, effective, and aligned with national and international quality benchmarks.
              </p>
            </div>
            <div className="qa-aov-logos" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="qa-logo-banner">
                <div className="qa-logo-row">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="qa-logo-cell">
                      <Image src={`/accreditations/${n}.webp`} alt={`Accreditation body ${n}`} fill sizes="(max-width: 768px) 30vw, 15vw" style={{ objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>
                <div className="qa-logo-row">
                  {[4, 5, 6].map((n) => (
                    <div key={n} className="qa-logo-cell">
                      <Image src={`/accreditations/${n}.webp`} alt={`Accreditation body ${n}`} fill sizes="(max-width: 768px) 30vw, 15vw" style={{ objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* §3 PERSONAS */}
        <section ref={personasRef} className="qa-personas-section">
          <div>
            <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.44rem, 0.66vw, 0.6rem)', letterSpacing: '0.34em', textTransform: 'uppercase', color: BLUE, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: 18, height: 1.5, background: BLUE }} />
              IQAC Leadership
            </p>
            <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(1.3rem, 2.5vw, 2.8rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: DARK, margin: 0, lineHeight: 1.1 }}>
              The People Behind Quality Assurance.
            </h2>
          </div>
          <div className="qa-personas-grid">
            {personas.map((p) => (
              <div key={p.id} className="qa-persona-card">
                <div className="qa-portrait-wrap">
                  <Image src={p.image} alt={`Portrait of ${p.name}`} fill sizes="(max-width: 1024px) 100vw, 50vw" quality={90} style={{ objectFit: 'cover', objectPosition: 'top center' }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                  <div className="qa-portrait-overlay" />
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${BLUE}, #1e3a8a)`, zIndex: 3 }} />
                  <div style={{ position: 'absolute', inset: 0, zIndex: -1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: '4rem', fontWeight: 700, color: BLUE, opacity: 0.15 }}>
                      {p.name.split(' ').filter(Boolean).slice(-2).map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="qa-portrait-name">
                    <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.36rem, 0.5vw, 0.46rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>{p.role}</p>
                    <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#fff', margin: 0, lineHeight: 1.15 }}>{p.name}</p>
                  </div>
                </div>
                <div className="qa-persona-body">
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 11px', background: 'rgba(0,92,159,0.06)', border: '1px solid rgba(0,92,159,0.12)', borderRadius: 100, width: 'fit-content' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: BLUE, display: 'inline-block' }} />
                    <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.36rem, 0.52vw, 0.46rem)', letterSpacing: '0.24em', textTransform: 'uppercase', color: BLUE, fontWeight: 600 }}>{p.tag}</span>
                  </div>
                  <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)', lineHeight: 1.82, color: '#555', margin: 0 }}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* §4 IQAC LINK BAND */}
        <section ref={linkBandRef} className="qa-link-band">
          <div className="qa-link-band-content">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.44rem, 0.66vw, 0.6rem)', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginBottom: '0.5rem' }}>IQAC Documentation</p>
                <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(1.1rem, 2.2vw, 2.2rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#fff', margin: 0, lineHeight: 1.1 }}>IQAC Formation Letter</h3>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.76rem, 0.93vw, 0.88rem)', color: 'rgba(255,255,255,0.40)', margin: 'clamp(0.5rem, 1vh, 0.8rem) 0 0', lineHeight: 1.6 }}>
                  Official formation document establishing the Internal Quality Assurance Cell at LEAD College.
                </p>
              </div>
              <a href="/accreditations/iqac-formation-letter.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 26px', background: 'rgba(0,92,159,0.22)', border: '1px solid rgba(0,92,159,0.5)', borderRadius: 8, textDecoration: 'none', transition: 'background 0.25s, border-color 0.25s, transform 0.2s', cursor: 'pointer' }} onMouseEnter={e => { const t = e.currentTarget as HTMLElement; t.style.background = 'rgba(0,92,159,0.38)'; t.style.borderColor = 'rgba(0,92,159,0.75)'; t.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { const t = e.currentTarget as HTMLElement; t.style.background = 'rgba(0,92,159,0.22)'; t.style.borderColor = 'rgba(0,92,159,0.5)'; t.style.transform = ''; }}>
                <FileText size={17} color="#fff" strokeWidth={1.5} />
                <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.44rem, 0.66vw, 0.6rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#fff', fontWeight: 600 }}>Download Letter</span>
                <Download size={13} color="rgba(255,255,255,0.55)" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>

        {/* §5 MANDATORY DISCLOSURES */}
        <section ref={discRef} className="qa-disclosures-section">
          <div className="qa-disc-hdr">
            <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.44rem, 0.66vw, 0.6rem)', letterSpacing: '0.34em', textTransform: 'uppercase', color: BLUE, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: 18, height: 1.5, background: BLUE }} />
              Regulatory Compliance
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(1.3rem, 2.5vw, 2.8rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: DARK, margin: 0, lineHeight: 1.1 }}>Mandatory Disclosures.</h2>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.78rem, 0.95vw, 0.9rem)', color: '#777', margin: 0, maxWidth: 400, lineHeight: 1.7 }}>
                All statutory disclosure documents as required by AICTE, NBA, NAAC, NIRF, and governing bodies.
              </p>
            </div>
          </div>

          <div className="qa-disc-mobile-nav">
            <select
              aria-label="Select a category to view documents"
              className="qa-disc-select"
              defaultValue={disclosureSections[0]?.id}
              onChange={(e) => {
                const btn = document.querySelector(`.qa-disc-tab[data-panel="${e.target.value}"]`) as HTMLElement | null;
                btn?.click();
              }}
            >
              {disclosureSections.map((d) => (
                <option key={d.id} value={d.id}>{d.title} — {d.links.length} document{d.links.length !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="qa-disc-layout">
            <div className="qa-disc-sidebar" id="qa-disc-sidebar">
              <div className="qa-disc-pill" id="qa-disc-pill" />
              {disclosureSections.map((d, i) => (
                <button
                  key={d.id}
                  className={`qa-disc-tab${i === 0 ? ' active' : ''}`}
                  data-panel={d.id}
                  onClick={(e) => {
                    const clicked = e.currentTarget as HTMLElement;
                    document.querySelectorAll('.qa-disc-tab').forEach(el => el.classList.remove('active'));
                    clicked.classList.add('active');
                    const pill = document.getElementById('qa-disc-pill');
                    const sidebar = document.getElementById('qa-disc-sidebar');
                    if (pill && sidebar) {
                      const sRect = sidebar.getBoundingClientRect();
                      const tRect = clicked.getBoundingClientRect();
                      pill.style.top    = (tRect.top - sRect.top + sidebar.scrollTop) + 'px';
                      pill.style.height = tRect.height + 'px';
                    }
                    document.querySelectorAll('.qa-disc-panel-section').forEach(el => el.classList.remove('visible'));
                    const target = document.querySelector(`.qa-panel-${d.id}`);
                    if (target) target.classList.add('visible');
                  }}
                >
                  <div className="qa-disc-tab-icon" style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,92,159,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.25s ease' }}>
                    <d.icon size={15} color={BLUE} strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <p className="qa-disc-tab-label" style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.52rem, 0.72vw, 0.64rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#334', margin: '0 0 2px', transition: 'color 0.25s ease', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.title}</p>
                    <p className="qa-disc-tab-count" style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.62rem, 0.76vw, 0.7rem)', color: '#aaa', margin: 0, transition: 'color 0.25s ease' }}>{d.links.length} document{d.links.length !== 1 ? 's' : ''}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="qa-disc-panel">
              {disclosureSections.map((d, i) => (
                <div key={d.id} className={`qa-disc-panel-section qa-panel-${d.id}${i === 0 ? ' visible' : ''}`}>
                  <div className="qa-disc-panel-header">
                    <d.icon size={18} color={BLUE} strokeWidth={1.5} />
                    <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.7rem, 1vw, 0.9rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: DARK, margin: 0 }}>{d.title}</h3>
                    <span style={{ marginLeft: 'auto', fontFamily: cinzel.style.fontFamily, fontSize: '0.6rem', fontWeight: 700, color: 'rgba(0,92,159,0.3)', letterSpacing: '0.08em' }}>
                      {String(d.links.length).padStart(2, '0')} DOCS
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {d.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="qa-dl-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="qa-dl-icon-wrap">
                          <LinkIcon type={link.type} />
                        </div>
                        <span className="qa-dl-label" style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.78rem, 0.92vw, 0.88rem)', color: '#334', lineHeight: 1.5 }}>
                          {link.label}
                        </span>
                        <LinkBadge type={link.type} />
                        <div className="qa-dl-arrow">
                          <ArrowUpRight size={14} color={BLUE} strokeWidth={2} />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* §6 FACULTY INITIATIVES */}
        <section ref={fiRef} className="qa-faculty-initiatives">
          <div className="qa-fi-wm" aria-hidden="true">FI</div>
          <div className="qa-fi-inner">
            <div className="qa-fi-hdr">
              <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.44rem, 0.66vw, 0.6rem)', letterSpacing: '0.34em', textTransform: 'uppercase', color: BLUE, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: 18, height: 1.5, background: BLUE }} />
                Pedagogical Innovation
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.2rem' }}>
                <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(1.3rem, 2.5vw, 2.8rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: DARK, margin: 0, lineHeight: 1.1 }}>
                  Faculty Initiatives on<br />
                  <span style={{ background: `linear-gradient(90deg, ${BLUE} 0%, #1e3a8a 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>Teaching &amp; Learning.</span>
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  {['Home', 'Faculty Initiatives'].map((crumb, ci) => (
                    <span key={crumb} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      {ci > 0 && <span style={{ color: 'rgba(0,92,159,0.3)', fontSize: '0.7rem' }}>/</span>}
                      <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.42rem, 0.6vw, 0.54rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: ci === 1 ? BLUE : '#aaa', fontWeight: ci === 1 ? 700 : 500 }}>{crumb}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="qa-fi-body">
              <div className="qa-fi-intro-text">
                <div className="qa-fi-year-badge">
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: BLUE, display: 'inline-block' }} />
                  <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.4rem, 0.58vw, 0.52rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: BLUE, fontWeight: 700 }}>Academic Years 2022–2025</span>
                </div>
                <h3 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.8rem, 1.1vw, 1.1rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: DARK, margin: '0 0 clamp(0.8rem, 1.5vh, 1.2rem)', lineHeight: 1.2 }}>
                  Institutional Commitment to Pedagogical Innovation
                </h3>
                <div style={{ width: 36, height: 2, background: BLUE, marginBottom: 'clamp(1rem, 2vh, 1.6rem)', borderRadius: 1 }} />
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.8rem, 0.95vw, 0.92rem)', lineHeight: 1.85, color: '#555', margin: '0 0 clamp(0.8rem, 1.5vh, 1.1rem)' }}>
                  LEAD College has institutionalised a culture of pedagogical innovation — a strategic move beyond traditional lecture-based delivery to a dynamic, learner-centric model aligned with Outcome-Based Education (OBE) principles.
                </p>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.78rem, 0.92vw, 0.88rem)', lineHeight: 1.82, color: '#777', margin: '0 0 clamp(0.8rem, 1.5vh, 1.1rem)' }}>
                  Over the past three academic years, our faculty have systematically designed, implemented, and refined a portfolio of diverse instructional strategies that promote experiential learning, critical thinking, and real-world application.
                </p>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.78rem, 0.92vw, 0.88rem)', lineHeight: 1.82, color: '#777', margin: 0 }}>
                  Each initiative is reproducible across courses and faculty, and serves as a foundation developed further through iterative feedback and technological integration — ensuring our curriculum remains responsive to industry needs.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: 'clamp(1.4rem, 2.5vh, 2rem)', paddingTop: 'clamp(1.2rem, 2vh, 1.6rem)', borderTop: '1px solid rgba(0,92,159,0.08)' }}>
                  {[{ num: '8', label: 'Teaching Innovations' }, { num: '3', label: 'Academic Years' }].map(s => (
                    <div key={s.label}>
                      <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(1.6rem, 2.5vw, 2.8rem)', fontWeight: 800, color: BLUE, margin: 0, lineHeight: 1 }}>{s.num}</p>
                      <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.68rem, 0.82vw, 0.76rem)', color: '#888', margin: '0.2rem 0 0', lineHeight: 1.3 }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="qa-fi-cards">
                {INNOVATIONS.map((item) => (
                  <div key={item.title} className="qa-fi-card">
                    <div className="qa-fi-card-icon-wrap">
                      <item.icon size={16} color={BLUE} strokeWidth={1.6} />
                    </div>
                    <div>
                      <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.52rem, 0.7vw, 0.64rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: DARK, margin: '0 0 0.4rem', lineHeight: 1.3 }}>{item.title}</p>
                      <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.7rem, 0.84vw, 0.8rem)', lineHeight: 1.72, color: '#666', margin: 0 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="qa-fi-cta">
              <div>
                <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.44rem, 0.64vw, 0.58rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, marginBottom: '0.3rem' }}>Comprehensive Summary</p>
                <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.82rem, 0.98vw, 0.94rem)', lineHeight: 1.6, color: '#555', margin: 0, maxWidth: 560 }}>
                  A detailed, comprehensive overview of the innovative teaching methodologies implemented by our faculty — sorted chronologically and alphabetically, covering 2022–2025.
                </p>
              </div>
              <a href="/accreditations/faculty-initiatives/faculty-initiatives-2022-2025.docx" target="_blank" rel="noopener noreferrer" className="qa-fi-cta-btn">
                <FileText size={16} color="#fff" strokeWidth={1.5} />
                <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.44rem, 0.66vw, 0.6rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>View Detailed Table</span>
                <ArrowUpRight size={14} color="rgba(255,255,255,0.7)" strokeWidth={2} />
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}