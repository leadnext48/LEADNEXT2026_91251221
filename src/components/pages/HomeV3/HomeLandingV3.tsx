"use client";

/*  LEAD College — Homepage V3 (Taste-skill build)
    ------------------------------------------------------------------
    Design read: premium editorial-institutional MBA/MCA landing.
    Dials: VARIANCE 7 · MOTION 5 · DENSITY 3.
    Redesign-overhaul: new visual language, brand preserved
      (Cinzel + Playfair, navy #0a2463 / royal #005C9F, white theme).
    All content and images reused from the live homepage.
    Skill compliance: zero em-dashes, one accent, eyebrow rationing,
      asymmetric hero that fits the viewport, real images, motivated
      motion, reduced-motion honored, min-h-[100dvh] (no h-screen). */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Instagram, Facebook, Linkedin, Youtube, Phone,
  ArrowRight, ArrowUpRight,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { Header, ApplyModal } from "@/components/ui/header-3";
import RecruitersSection from "@/components/pages/HomeV2/RecruitersSection";
import { FeatureStepsDemo } from "@/components/pages/LandingPage/FeatureStepsDemo";

/* ---------- content (facts reused from the live site, copy cleaned) ---------- */

const CONTACT = {
  mobile: "+91 9497713693",
  email: "info@lead.ac.in",
};

const SOCIAL = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/lead_college_official/?hl=en", Icon: Instagram },
  { key: "facebook",  label: "Facebook",  href: "https://www.facebook.com/leadcollegeofficial/",          Icon: Facebook },
  { key: "linkedin",  label: "LinkedIn",  href: "https://in.linkedin.com/school/lead-college-autonomous/", Icon: Linkedin },
  { key: "youtube",   label: "YouTube",   href: "https://www.youtube.com/@leadcollegeofficial",            Icon: Youtube },
];

const ACCRED = Array.from({ length: 7 }, (_, i) => `/accreditations/${i + 1}.webp`);

const APPLY = {
  mba: "https://admission.lead.ac.in/lead-college-of-management-mba-application",
  mca: "https://admission.lead.ac.in/lead-college-of-management-mca-application",
  brochure: "/LEAD-MBA-Brochure-2026-28.pdf",
};

const PROGRAMS = [
  {
    id: "mba",
    short: "MBA",
    full: "Master of Business Administration",
    tagline: "Where strategy meets ambition.",
    meta: "AICTE Approved · 2 Years · Residential",
    description:
      "A management programme focused on entrepreneurship, leadership, and industry-ready skills, with live projects, internships every semester, and mentorship from Guinness World Record holder Dr. Thomas George K.",
    highlights: ["10+ Specializations", "Live Industry Projects", "Startup Incubation", "95%+ Placements"],
    image: "/convert/LEAD30.webp",
    explore: "/mba",
    apply: APPLY.mba,
  },
  {
    id: "mca",
    short: "MCA",
    full: "Master of Computer Applications",
    tagline: "Engineer the future.",
    meta: "AICTE Approved · 2 Years · Residential",
    description:
      "An advanced computer-applications programme built around AI, Machine Learning, Cloud, and Data Science, with an industry-aligned curriculum, a one-year internship, modern labs, and research opportunities.",
    highlights: ["AI, ML, Cloud, Data Science", "1-Year Internship", "Modern Computing Labs", "Top Tech Placements"],
    image: "/convert/LEAD33.webp",
    explore: "/mca",
    apply: APPLY.mca,
  },
];

const NUMBERS = [
  { value: "22 LPA", label: "Highest Package" },
  { value: "100%", label: "Placement Assurance" },
  { value: "3000+", label: "Global Alumni" },
  { value: "10+", label: "Specializations" },
  { value: "40+", label: "Expert Faculty" },
  { value: "15+", label: "Years of Excellence" },
];

const WHY = [
  { n: "01", title: "Expert Faculty", body: "Guided by Guinness World Record holder Dr. Thomas George K., with mentors focused on real-world projects and experiential learning from day one." },
  { n: "02", title: "Modern Curriculum", body: "Digital Marketing, Analytics, Robotics, and AI built into every programme. An entrepreneurial MBA that evolves with industry, never behind it." },
  { n: "03", title: "Industry Partnerships", body: "Live collaborations with 200+ companies including ITC, Deloitte, and Wipro, with real internships and client projects that build your portfolio." },
  { n: "04", title: "Research Opportunities", body: "The LEAD Research Centre, an approved Ph.D. hub under KUFOS, drives impactful academic and applied industry research." },
  { n: "05", title: "Global Exposure", body: "A multicultural community spanning 10+ nations, with international projects and global faculty partnerships from your first semester." },
  { n: "06", title: "Career Support", body: "A 95%+ placement record, with training, mentorship, an alumni network, and a startup incubation cell that graduates you industry-ready." },
];

const GALLERY = [
  "/convert/DSC06898.webp",
  "/convert/photo_1_2024-11-25_17-10-18.jpeg",
  "/convert/DSC07270.webp",
  "/convert/IMG_1261.jpeg",
  "/convert/DSC00254.webp",
  "/convert/photo_8_2025-05-07_12-00-48.jpeg",
  "/convert/DSC06679.webp",
  "/convert/DSC000912.webp",
  "/convert/DSC00075.webp",
];

const TESTIMONIALS = [
  { text: "The placement support here is genuinely structured. Resume reviews, mock interviews, a real career launchpad.", name: "Ananya Menon", role: "MBA, 2024 to 2026 Batch", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" },
  { text: "What stood out was the mentorship. Faculty were accessible, practical, and focused on making learning career-relevant.", name: "Fathima Azeez", role: "MCA, Final Year 2023 to 2026", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" },
  { text: "The training felt industry-like. Presentations, teamwork, and real feedback prepared me for my first job.", name: "Rahul Das", role: "MBA Graduate, Business Analyst", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" },
  { text: "A calm campus, a strong academic structure, and great student life. The right place to build focus.", name: "Meera Suresh", role: "MBA, 2023 to 2025 Batch", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" },
];

/* ---------- motion helpers (motivated: storytelling reveals only) ---------- */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Reveal({
  children, className, delay = 0, y = 26,
}: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ---------- page ---------- */

export default function HomeLandingV3() {
  const [applyOpen, setApplyOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className={`v3 ${playfair.className}`}>
      <style>{CSS}</style>

      {/* slim contact strip (brand element, large mobile tap targets) */}
      <div className="v3-strip">
        <div className="v3-strip-in">
          <a href={`tel:${CONTACT.mobile.replace(/\s/g, "")}`} className="v3-strip-phone">
            <Phone size={14} /> <span>{CONTACT.mobile}</span>
          </a>
          <div className="v3-strip-right">
            <span className={`v3-strip-adm ${cinzel.className}`}>Admissions 2026 Open</span>
            <div className="v3-strip-social">
              {SOCIAL.map(({ key, href, label, Icon }) => (
                <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Header />

      {/* ══════════ HERO — asymmetric editorial split ══════════ */}
      <section className="v3-hero">
        <motion.div
          className="v3-hero-copy"
          variants={reduce ? undefined : heroStagger}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <motion.p variants={heroItem} className={`v3-eyebrow ${cinzel.className}`}>
            <span className="v3-eyebrow-dash" />Autonomous · Palakkad, Kerala
          </motion.p>
          <motion.h1 variants={heroItem} className={`v3-hero-title ${cinzel.className}`}>
            Leaders are<br />made <span className="v3-accent">here.</span>
          </motion.h1>
          <motion.p variants={heroItem} className="v3-hero-sub">
            An autonomous, AICTE-approved business school shaping industry-ready MBA and MCA
            leaders since 2010.
          </motion.p>
          <motion.div variants={heroItem} className="v3-hero-cta">
            <button type="button" onClick={() => setApplyOpen(true)} className="v3-btn v3-btn-solid">
              Apply Now <ArrowUpRight size={16} />
            </button>
            <a href="#programmes" className="v3-btn v3-btn-outline">
              Explore Programmes <ArrowRight size={16} />
            </a>
          </motion.div>
          <motion.dl variants={heroItem} className="v3-hero-stats">
            <div><dt className={cinzel.className}>95%+</dt><dd>Placement record</dd></div>
            <div><dt className={cinzel.className}>3000+</dt><dd>Global alumni</dd></div>
            <div><dt className={cinzel.className}>200+</dt><dd>Recruiting partners</dd></div>
          </motion.dl>
        </motion.div>

        <motion.div
          className="v3-hero-media"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <Image
            src="/convert/LEAD53.webp"
            alt="Students on the LEAD College campus in Dhoni, Palakkad"
            fill priority sizes="(max-width: 980px) 100vw, 46vw"
            className="v3-hero-img"
          />
          <span className={`v3-hero-est ${cinzel.className}`}>Established 2010</span>
        </motion.div>
      </section>

      {/* ══════════ ACCREDITATION LOGO STRIP (logos only) ══════════ */}
      <section className="v3-accred" aria-label="Accreditations and recognition">
        <div className="v3-wrap">
          <p className={`v3-accred-label ${cinzel.className}`}>Accredited and recognised by</p>
          <div className="v3-accred-row">
            {ACCRED.map((src) => (
              <span key={src} className="v3-accred-cell">
                <Image src={src} alt="Accreditation body" width={96} height={96} className="v3-accred-img" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHO WE ARE — editorial split ══════════ */}
      <section className="v3-who v3-wrap" id="about">
        <Reveal className="v3-who-media">
          <Image
            src="/convert/LEAD02.webp"
            alt="The LEAD College campus"
            fill sizes="(max-width: 980px) 100vw, 44vw"
            className="v3-cover"
          />
          <div className="v3-who-badge">
            <span className={`v3-who-badge-v ${cinzel.className}`}>58 to 3000+</span>
            <span className="v3-who-badge-l">students, in fifteen years</span>
          </div>
        </Reveal>

        <div className="v3-who-copy">
          <Reveal>
            <h2 className={`v3-h2 ${cinzel.className}`}>Not just a campus.<br />A promise.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="v3-lead">
              Education rooted in courage, clarity, and conscience.
            </p>
            <p className="v3-body">
              Founded in Palakkad, LEAD grew from 58 determined students into a thriving autonomous
              institution affiliated to the University of Calicut. With industry-integrated learning,
              close mentorship, and a solar-powered residential campus, we pair academic rigour with
              character, and progress with purpose.
            </p>
            <div className="v3-who-links">
              <Link href="/the-lead-story" className={`v3-textlink ${cinzel.className}`}>The LEAD Story <ArrowRight size={14} /></Link>
              <Link href="/governance" className={`v3-textlink ${cinzel.className}`}>Governance <ArrowRight size={14} /></Link>
              <Link href="/iqac" className={`v3-textlink ${cinzel.className}`}>Quality and Accreditation <ArrowRight size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ PROGRAMMES — two editorial cards ══════════ */}
      <section className="v3-prog" id="programmes">
        <div className="v3-wrap">
          <Reveal className="v3-prog-head">
            <p className={`v3-eyebrow ${cinzel.className}`}><span className="v3-eyebrow-dash" />Two Prestigious Degrees</p>
            <h2 className={`v3-h2 ${cinzel.className}`}>Crafted for the bold.</h2>
          </Reveal>

          <div className="v3-prog-grid">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1} className="v3-card">
                <div className="v3-card-media">
                  <Image src={p.image} alt={p.full} fill sizes="(max-width: 980px) 100vw, 46vw" className="v3-cover" />
                  <span className={`v3-card-tag ${cinzel.className}`}>{p.short}</span>
                </div>
                <div className="v3-card-body">
                  <p className={`v3-card-meta ${cinzel.className}`}>{p.meta}</p>
                  <h3 className={`v3-card-title ${cinzel.className}`}>{p.full}</h3>
                  <p className="v3-card-tagline">{p.tagline}</p>
                  <p className="v3-body">{p.description}</p>
                  <ul className="v3-card-hl">
                    {p.highlights.map((h) => <li key={h} className={cinzel.className}>{h}</li>)}
                  </ul>
                  <div className="v3-card-cta">
                    <a href={p.apply} target="_blank" rel="noreferrer" className="v3-btn v3-btn-solid">
                      Apply for {p.short} <ArrowUpRight size={14} />
                    </a>
                    <Link href={p.explore} className="v3-btn v3-btn-ghost">
                      Explore {p.short} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NUMBERS — dark band ══════════ */}
      <section className="v3-nums">
        <div className="v3-wrap">
          <Reveal>
            <h2 className={`v3-h2 v3-h2-light ${cinzel.className}`}>A legacy written in results.</h2>
          </Reveal>
          <div className="v3-nums-grid">
            {NUMBERS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="v3-num">
                <span className={`v3-num-v ${cinzel.className}`}>{s.value}</span>
                <span className="v3-num-l">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY LEAD — numbered editorial list ══════════ */}
      <section className="v3-why v3-wrap">
        <Reveal className="v3-why-head">
          <h2 className={`v3-h2 ${cinzel.className}`}>Why students choose LEAD.</h2>
        </Reveal>
        <div className="v3-why-list">
          {WHY.map((w, i) => (
            <Reveal key={w.n} delay={(i % 2) * 0.06} className="v3-why-row">
              <span className={`v3-why-n ${cinzel.className}`}>{w.n}</span>
              <div>
                <h3 className={`v3-why-t ${cinzel.className}`}>{w.title}</h3>
                <p className="v3-why-b">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════ PLACEMENTS — reused recruiter orbit ══════════ */}
      <RecruitersSection />

      {/* ══════════ CAMPUS — film-strip marquee (single marquee on page) ══════════ */}
      <section className="v3-campus" id="campus">
        <div className="v3-wrap">
          <Reveal className="v3-campus-head">
            <p className={`v3-eyebrow ${cinzel.className}`}><span className="v3-eyebrow-dash" />Campus Life</p>
            <h2 className={`v3-h2 ${cinzel.className}`}>Moments that stay.</h2>
          </Reveal>
        </div>
        <div className="v3-film" aria-label="Life at LEAD College">
          <div className={`v3-film-track ${reduce ? "is-static" : ""}`}>
            {[...GALLERY, ...GALLERY].map((src, i) => (
              <span key={i} className="v3-film-cell">
                <Image src={src} alt="Life at LEAD College" fill sizes="32vw" className="v3-cover" />
              </span>
            ))}
          </div>
        </div>
        <div className="v3-wrap v3-center">
          <Link href="/life-at-lead/gallery" className="v3-btn v3-btn-solid">
            Explore Full Gallery <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* ══════════ VOICES — testimonials ══════════ */}
      <section className="v3-voices v3-wrap">
        <Reveal className="v3-voices-head">
          <h2 className={`v3-h2 ${cinzel.className}`}>In their own words.</h2>
        </Reveal>
        <div className="v3-voices-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08} className="v3-voice">
              <p className="v3-voice-q">{t.text}</p>
              <div className="v3-voice-by">
                <Image src={t.image} alt={t.name} width={44} height={44} className="v3-voice-av" />
                <span>
                  <strong className={cinzel.className}>{t.name}</strong>
                  <em>{t.role}</em>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════ FACILITIES — reused ══════════ */}
      <div className="v3-facilities"><FeatureStepsDemo /></div>

      {/* ══════════ ADMISSIONS CTA ══════════ */}
      <section className="v3-cta">
        <div className="v3-wrap v3-cta-in">
          <Reveal>
            <h2 className={`v3-cta-title ${cinzel.className}`}>Admissions 2026 are open.</h2>
            <p className="v3-cta-sub">
              Applications for the MBA and MCA programmes are now live. Start yours today.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="v3-cta-btns">
            <button type="button" onClick={() => setApplyOpen(true)} className="v3-btn v3-btn-onblue">
              Apply Now <ArrowUpRight size={15} />
            </button>
            <a href={APPLY.brochure} target="_blank" rel="noreferrer" className="v3-btn v3-btn-onblue-ghost">
              Download Brochure <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>
      </section>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}

/* ════════════════════════ styles (white theme, navy/royal accent) ════════════════════════ */
const CSS = `
.v3{--navy:#0a2463;--royal:#005C9F;--ink:#0e1524;--muted:#5a6576;--line:#e6eaf1;--tint:#f4f7fc;
  background:#fff;color:var(--ink);overflow-x:clip;line-height:1.6;}
.v3 *{box-sizing:border-box;}
.v3-wrap{max-width:1200px;margin:0 auto;padding:0 clamp(1.15rem,4vw,2.6rem);}
.v3-cover{object-fit:cover;}
.v3-center{display:flex;justify-content:center;margin-top:clamp(2rem,4vw,3rem);}

/* eyebrow (rationed: hero, who, programmes, campus only) */
.v3-eyebrow{display:flex;align-items:center;gap:.7rem;font-size:.74rem;letter-spacing:.24em;text-transform:uppercase;font-weight:600;color:var(--royal);margin:0 0 1rem;}
.v3-eyebrow-dash{display:inline-block;width:30px;height:1.5px;background:var(--royal);flex-shrink:0;}

/* headings */
.v3-h2{font-size:clamp(1.9rem,3.8vw,3.2rem);line-height:1.05;font-weight:700;letter-spacing:-.015em;color:var(--navy);margin:0;}
.v3-h2-light{color:#fff;}
.v3-lead{font-size:clamp(1.15rem,1.8vw,1.5rem);line-height:1.5;font-weight:500;color:var(--ink);margin:0 0 1.1rem;max-width:34ch;}
.v3-body{font-size:1rem;line-height:1.85;color:#20293a;margin:0 0 1.4rem;max-width:60ch;}

/* buttons (one shape system: 6px radius; contrast audited) */
.v3-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.5rem;border-radius:6px;
  font-family:${cinzel.style.fontFamily};font-size:.74rem;letter-spacing:.12em;text-transform:uppercase;font-weight:600;
  text-decoration:none;cursor:pointer;border:1px solid transparent;white-space:nowrap;
  transition:transform .2s ease,background .2s ease,color .2s ease,box-shadow .2s ease,border-color .2s ease;}
.v3-btn:hover{transform:translateY(-2px);}
.v3-btn:active{transform:translateY(0) scale(.98);}
.v3-btn-solid{background:var(--navy);color:#fff;box-shadow:0 10px 26px -8px rgba(10,36,99,.5);}
.v3-btn-solid:hover{background:#0b2c7c;box-shadow:0 16px 36px -10px rgba(10,36,99,.55);}
.v3-btn-outline{background:transparent;color:var(--navy);border-color:rgba(10,36,99,.28);}
.v3-btn-outline:hover{background:rgba(10,36,99,.04);border-color:var(--navy);}
.v3-btn-ghost{background:transparent;color:var(--royal);border-color:rgba(0,92,159,.28);}
.v3-btn-ghost:hover{background:rgba(0,92,159,.05);border-color:var(--royal);}
.v3-btn-onblue{background:#fff;color:var(--navy);}
.v3-btn-onblue:hover{background:#eef4ff;}
.v3-btn-onblue-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.55);}
.v3-btn-onblue-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff;}

/* strip */
.v3-strip{background:linear-gradient(90deg,#081b4c,var(--navy) 45%,var(--royal));color:#dbe6f5;font-size:.8rem;}
.v3-strip-in{max-width:1400px;margin:0 auto;padding:.5rem clamp(1rem,4vw,2rem);display:flex;align-items:center;justify-content:space-between;gap:1rem;}
.v3-strip-phone{color:#eaf1fb;text-decoration:none;display:inline-flex;align-items:center;gap:.45rem;font-weight:500;}
.v3-strip-phone:hover{color:#fff;}
.v3-strip-right{display:flex;align-items:center;gap:1rem;}
.v3-strip-adm{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:#ffd98a;font-weight:600;}
.v3-strip-social{display:flex;gap:.15rem;}
.v3-strip-social a{color:#dbe6f5;display:inline-flex;padding:6px;border-radius:6px;transition:color .2s,background .2s;}
.v3-strip-social a:hover{color:#fff;background:rgba(255,255,255,.12);}
@media(max-width:520px){.v3-strip-adm{display:none;}.v3-strip-social a{padding:7px;}}

/* hero */
.v3-hero{display:grid;grid-template-columns:1fr;gap:clamp(2rem,4vw,3.5rem);align-items:center;
  max-width:1200px;margin:0 auto;padding:clamp(2.5rem,6vh,4.5rem) clamp(1.15rem,4vw,2.6rem) clamp(3rem,6vh,4.5rem);}
@media(min-width:981px){.v3-hero{grid-template-columns:1.05fr .95fr;min-height:calc(100dvh - 120px);}}
.v3-hero-title{font-size:clamp(2.6rem,6.2vw,5rem);line-height:1;font-weight:700;letter-spacing:-.02em;color:var(--navy);margin:0 0 1.1rem;}
.v3-accent{color:var(--royal);}
.v3-hero-sub{font-size:clamp(1.02rem,1.2vw,1.12rem);line-height:1.7;color:#20293a;max-width:34rem;margin:0 0 1.7rem;}
.v3-hero-cta{display:flex;flex-wrap:wrap;gap:.85rem;margin-bottom:clamp(2rem,4vw,2.6rem);}
.v3-hero-stats{display:flex;flex-wrap:wrap;gap:clamp(1.4rem,4vw,2.6rem);margin:0;padding-top:1.6rem;border-top:1px solid var(--line);}
.v3-hero-stats dt{font-size:clamp(1.5rem,2.4vw,2rem);font-weight:700;color:var(--navy);line-height:1;}
.v3-hero-stats dd{margin:.35rem 0 0;font-size:.76rem;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);font-weight:600;}
.v3-hero-media{position:relative;width:100%;aspect-ratio:4/5;border-radius:10px;overflow:hidden;
  box-shadow:0 50px 90px -40px rgba(10,36,99,.55);}
@media(min-width:981px){.v3-hero-media{aspect-ratio:auto;height:min(74vh,640px);}}
.v3-hero-img{object-fit:cover;object-position:center 22%;}
.v3-hero-est{position:absolute;left:1.1rem;bottom:1.1rem;z-index:2;padding:.5rem .9rem;border-radius:6px;
  background:rgba(10,36,99,.72);backdrop-filter:blur(6px);color:#fff;font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;font-weight:600;}

/* accreditation strip */
.v3-accred{background:var(--tint);border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:clamp(1.8rem,3vw,2.6rem) 0;}
.v3-accred-label{text-align:center;font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:0 0 1.3rem;}
.v3-accred-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:clamp(1.4rem,4vw,3.4rem);}
.v3-accred-cell{width:clamp(58px,8vw,84px);height:clamp(58px,8vw,84px);display:flex;align-items:center;justify-content:center;
  filter:grayscale(1);opacity:.72;transition:filter .3s,opacity .3s,transform .3s;}
.v3-accred-cell:hover{filter:none;opacity:1;transform:translateY(-3px);}
.v3-accred-img{width:100%;height:100%;object-fit:contain;}

/* who we are */
.v3-who{display:grid;grid-template-columns:1fr;gap:clamp(2rem,5vw,4rem);align-items:center;padding:clamp(3.6rem,8vw,7rem) clamp(1.15rem,4vw,2.6rem);}
@media(min-width:981px){.v3-who{grid-template-columns:.86fr 1.14fr;}}
.v3-who-media{position:relative;aspect-ratio:4/3;border-radius:10px;overflow:hidden;box-shadow:0 40px 80px -40px rgba(10,36,99,.5);}
.v3-who-badge{position:absolute;left:1rem;bottom:1rem;z-index:2;background:rgba(255,255,255,.94);backdrop-filter:blur(6px);
  border-radius:8px;padding:.8rem 1.1rem;box-shadow:0 14px 30px -14px rgba(10,36,99,.5);}
.v3-who-badge-v{display:block;font-size:1.25rem;font-weight:700;color:var(--navy);line-height:1;}
.v3-who-badge-l{display:block;margin-top:.35rem;font-size:.72rem;color:var(--muted);letter-spacing:.02em;}
.v3-who-links{display:flex;flex-wrap:wrap;gap:1.4rem;margin-top:1.6rem;}
.v3-textlink{display:inline-flex;align-items:center;gap:.4rem;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;font-weight:600;color:var(--navy);text-decoration:none;border-bottom:1px solid transparent;padding-bottom:2px;transition:border-color .2s,color .2s;}
.v3-textlink:hover{color:var(--royal);border-color:var(--royal);}

/* programmes */
.v3-prog{padding:clamp(3.6rem,8vw,7rem) 0;background:#fff;}
.v3-prog-head{margin-bottom:clamp(2.2rem,4vw,3.2rem);}
.v3-prog-grid{display:grid;grid-template-columns:1fr;gap:clamp(1.6rem,3vw,2.4rem);}
@media(min-width:820px){.v3-prog-grid{grid-template-columns:1fr 1fr;}}
.v3-card{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:#fff;
  box-shadow:0 30px 60px -44px rgba(10,36,99,.5);transition:transform .3s ease,box-shadow .3s ease;}
.v3-card:hover{transform:translateY(-4px);box-shadow:0 40px 80px -40px rgba(10,36,99,.55);}
.v3-card-media{position:relative;aspect-ratio:16/10;}
.v3-card-media::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,36,99,0) 55%,rgba(10,36,99,.5));}
.v3-card-tag{position:absolute;left:1rem;bottom:.7rem;z-index:2;font-size:clamp(2.4rem,5vw,3.4rem);font-weight:800;color:rgba(255,255,255,.9);line-height:1;letter-spacing:-.03em;}
.v3-card-body{padding:clamp(1.5rem,3vw,2.2rem);display:flex;flex-direction:column;flex:1;}
.v3-card-meta{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:0 0 .7rem;}
.v3-card-title{font-size:clamp(1.4rem,2.2vw,1.9rem);line-height:1.15;font-weight:700;color:var(--navy);margin:0 0 .4rem;}
.v3-card-tagline{font-size:1.05rem;color:var(--royal);margin:0 0 1rem;font-weight:500;}
.v3-card-hl{list-style:none;margin:0 0 1.6rem;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:.55rem 1.2rem;}
.v3-card-hl li{position:relative;padding-left:1.2rem;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;color:#33404f;font-weight:600;line-height:1.5;}
.v3-card-hl li::before{content:"";position:absolute;left:0;top:.4em;width:7px;height:7px;border:2px solid var(--royal);border-radius:50%;}
.v3-card-cta{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:auto;}
@media(max-width:420px){.v3-card-hl{grid-template-columns:1fr;}}

/* numbers */
.v3-nums{background:linear-gradient(150deg,#06133a,var(--navy) 60%,#0b2c78);padding:clamp(3.4rem,7vw,6rem) 0;position:relative;overflow:hidden;}
.v3-nums::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:36px 36px;opacity:.5;pointer-events:none;}
.v3-nums .v3-h2{margin-bottom:clamp(2rem,4vw,3rem);max-width:22ch;}
.v3-nums-grid{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(1.6rem,3vw,2.4rem) 1rem;}
@media(max-width:640px){.v3-nums-grid{grid-template-columns:repeat(2,1fr);}}
.v3-num-v{display:block;font-size:clamp(1.9rem,3.4vw,3rem);font-weight:700;color:#fff;line-height:1;}
.v3-num-l{display:block;margin-top:.55rem;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#9db2d8;font-weight:600;}

/* why */
.v3-why{padding:clamp(3.6rem,8vw,7rem) clamp(1.15rem,4vw,2.6rem);}
.v3-why-head{margin-bottom:clamp(2.2rem,4vw,3.2rem);}
.v3-why-list{display:grid;grid-template-columns:1fr;gap:0 clamp(2rem,5vw,4.5rem);}
@media(min-width:820px){.v3-why-list{grid-template-columns:1fr 1fr;}}
.v3-why-row{display:grid;grid-template-columns:auto 1fr;column-gap:1.3rem;padding:1.7rem 0;border-top:1px solid var(--line);}
.v3-why-n{font-size:1.4rem;font-weight:700;color:var(--royal);line-height:1;padding-top:.15rem;}
.v3-why-t{margin:0 0 .5rem;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;font-weight:700;color:var(--navy);}
.v3-why-b{margin:0;font-size:.98rem;line-height:1.75;color:#20293a;}

/* campus film strip */
.v3-campus{padding:clamp(3.6rem,8vw,6rem) 0;background:#fff;}
.v3-campus-head{margin-bottom:clamp(1.6rem,3vw,2.4rem);}
.v3-film{overflow:hidden;margin:clamp(1rem,2vw,2rem) 0;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);}
.v3-film-track{display:flex;gap:1rem;width:max-content;animation:v3Film 52s linear infinite;}
.v3-film-track.is-static{animation:none;flex-wrap:wrap;width:100%;justify-content:center;}
@keyframes v3Film{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.v3-film-cell{position:relative;flex:0 0 auto;width:clamp(220px,30vw,360px);height:clamp(280px,36vw,440px);border-radius:8px;overflow:hidden;box-shadow:0 24px 50px -26px rgba(10,36,99,.5);}
@media(prefers-reduced-motion:reduce){.v3-film-track{animation:none;flex-wrap:wrap;width:100%;justify-content:center;}}

/* voices */
.v3-voices{padding:clamp(3.6rem,8vw,7rem) clamp(1.15rem,4vw,2.6rem);background:var(--tint);}
.v3-voices-head{margin-bottom:clamp(2rem,4vw,3rem);}
.v3-voices-grid{display:grid;grid-template-columns:1fr;gap:1.3rem;}
@media(min-width:720px){.v3-voices-grid{grid-template-columns:1fr 1fr;}}
.v3-voice{background:#fff;border:1px solid var(--line);border-radius:10px;padding:1.8rem 1.6rem;display:flex;flex-direction:column;gap:1.3rem;box-shadow:0 24px 50px -40px rgba(10,36,99,.45);}
.v3-voice-q{font-size:1.02rem;line-height:1.7;color:#20293a;margin:0;}
.v3-voice-by{display:flex;align-items:center;gap:.8rem;margin-top:auto;}
.v3-voice-av{border-radius:50%;object-fit:cover;flex-shrink:0;box-shadow:0 0 0 3px var(--tint);}
.v3-voice-by span{display:flex;flex-direction:column;}
.v3-voice-by strong{font-size:.8rem;letter-spacing:.03em;color:var(--navy);text-transform:uppercase;font-weight:600;}
.v3-voice-by em{font-size:.8rem;color:var(--muted);font-style:normal;margin-top:.15rem;}

.v3-facilities{padding-bottom:clamp(3rem,7vw,6rem);}

/* cta */
.v3-cta{background:linear-gradient(135deg,var(--navy),var(--royal));position:relative;overflow:hidden;padding:clamp(3.2rem,7vw,5.5rem) 0;}
.v3-cta::before{content:"";position:absolute;right:-6%;top:-70%;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.12),transparent 66%);pointer-events:none;}
.v3-cta-in{position:relative;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;}
.v3-cta-title{font-size:clamp(1.8rem,3.6vw,3rem);line-height:1.08;font-weight:700;color:#fff;margin:0;letter-spacing:-.01em;max-width:20ch;}
.v3-cta-sub{color:#d7e2f5;font-size:1.05rem;line-height:1.7;margin:.9rem 0 0;max-width:44ch;}
.v3-cta-btns{display:flex;flex-wrap:wrap;gap:.85rem;}
`;
