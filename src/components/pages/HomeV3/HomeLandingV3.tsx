"use client";

/*  LEAD College — Homepage V3 (Taste-skill build, full revamp)
    ------------------------------------------------------------------
    Design read: bold cinematic dark editorial homepage for an ambitious
      MBA/MCA institution, for design-conscious students and recruiters,
      modern-grotesque kinetic language.
    Dials: VARIANCE 8 · MOTION 6 · DENSITY 3.
    A deliberate break from the site's brand system: near-black theme,
      single ember accent, Space Grotesk + Manrope (not Cinzel/Playfair,
      not navy/royal). Custom nav, all-new layouts and components.
    Only the content and images are reused from the live site.
    Skill compliance: one theme (dark), one accent, zero em-dashes in copy,
      eyebrow rationing, real images, motivated Motion reveals, one marquee,
      reduced-motion honored, min-h-[100dvh] (no h-screen). */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowRight, Menu, X, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { spaceGrotesk, manrope } from "@/app/fonts";

/* ---------- content (reused facts, copy cleaned of em-dashes) ---------- */

const APPLY = {
  general: "/admissions",
  mba: "https://admission.lead.ac.in/lead-college-of-management-mba-application",
  mca: "https://admission.lead.ac.in/lead-college-of-management-mca-application",
  brochure: "/LEAD-MBA-Brochure-2026-28.pdf",
};

const NAV = [
  { label: "About", href: "#about" },
  { label: "Programmes", href: "#programmes" },
  { label: "Placements", href: "#placements" },
  { label: "Campus", href: "#campus" },
  { label: "Contact", href: "/admissions" },
];

const HERO_STATS = [
  { v: "95%+", l: "Placement record" },
  { v: "3000+", l: "Global alumni" },
  { v: "200+", l: "Recruiting partners" },
  { v: "2010", l: "Established" },
];

const PROGRAMS = [
  {
    id: "mba", n: "01", short: "MBA",
    full: "Master of Business Administration",
    tagline: "Where strategy meets ambition.",
    meta: "AICTE Approved · 2 Years · Residential",
    description:
      "A management programme built on entrepreneurship, leadership, and industry-ready skills, with live projects, internships every semester, and mentorship from Guinness World Record holder Dr. Thomas George K.",
    highlights: ["10+ Specializations", "Live Industry Projects", "Startup Incubation", "95%+ Placements"],
    image: "/convert/LEAD30.webp",
    explore: "/mba", apply: APPLY.mba,
  },
  {
    id: "mca", n: "02", short: "MCA",
    full: "Master of Computer Applications",
    tagline: "Engineer the future.",
    meta: "AICTE Approved · 2 Years · Residential",
    description:
      "An advanced computing programme around AI, Machine Learning, Cloud, and Data Science, with an industry-aligned curriculum, a one-year internship, modern labs, and research opportunities.",
    highlights: ["AI, ML, Cloud, Data", "1-Year Internship", "Modern Labs", "Top Tech Placements"],
    image: "/convert/LEAD33.webp",
    explore: "/mca", apply: APPLY.mca,
  },
];

const NUMBERS = [
  { v: "22 LPA", l: "Highest package" },
  { v: "100%", l: "Placement assurance" },
  { v: "3000+", l: "Global alumni" },
  { v: "40+", l: "Expert faculty" },
];

const WHY = [
  { n: "01", title: "Expert Faculty", body: "Mentors led by Guinness World Record holder Dr. Thomas George K., focused on real projects from day one." },
  { n: "02", title: "Modern Curriculum", body: "Digital marketing, analytics, robotics, and AI built into every programme. It evolves with industry, never behind it." },
  { n: "03", title: "Industry Partnerships", body: "Live collaborations with 200+ companies including ITC, Deloitte, and Wipro, with real internships and client projects." },
  { n: "04", title: "Research", body: "The LEAD Research Centre, an approved Ph.D. hub under KUFOS, drives applied and academic research." },
  { n: "05", title: "Global Exposure", body: "A multicultural community across 10+ nations, with international projects from your first semester." },
  { n: "06", title: "Career Support", body: "A 95%+ placement record with training, mentorship, an alumni network, and a startup incubation cell." },
];

const RECRUITERS = Array.from({ length: 48 }, (_, i) => `/logos/recruiters/${i + 1}.png`);

const GALLERY = [
  "/convert/DSC06898.webp",
  "/convert/photo_1_2024-11-25_17-10-18.jpeg",
  "/convert/DSC07270.webp",
  "/convert/IMG_1261.jpeg",
  "/convert/DSC00254.webp",
  "/convert/DSC06679.webp",
  "/convert/DSC000912.webp",
];

const SOCIAL = [
  { key: "instagram", href: "https://www.instagram.com/lead_college_official/?hl=en", Icon: Instagram, label: "Instagram" },
  { key: "facebook", href: "https://www.facebook.com/leadcollegeofficial/", Icon: Facebook, label: "Facebook" },
  { key: "linkedin", href: "https://in.linkedin.com/school/lead-college-autonomous/", Icon: Linkedin, label: "LinkedIn" },
  { key: "youtube", href: "https://www.youtube.com/@leadcollegeofficial", Icon: Youtube, label: "YouTube" },
];

const TESTIMONIALS = [
  { text: "The placement support here is genuinely structured. Resume reviews, mock interviews, a real career launchpad.", name: "Ananya Menon", role: "MBA, 2024 to 2026" },
  { text: "What stood out was the mentorship. Faculty were accessible, practical, and focused on career-relevant learning.", name: "Fathima Azeez", role: "MCA, Final Year" },
  { text: "The training felt industry-like. Presentations, teamwork, and real feedback prepared me for my first job.", name: "Rahul Das", role: "MBA, Business Analyst" },
  { text: "A calm campus, a strong academic structure, and great student life. The right place to build focus.", name: "Meera Suresh", role: "MBA, 2023 to 2025" },
];

/* ---------- motion ---------- */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Reveal({ children, className, delay = 0, y = 30 }:
  { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const item: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

/* ---------- page ---------- */

export default function HomeLandingV3() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className={`x3 ${manrope.className}`}>
      <style>{CSS}</style>

      {/* ══════════ NAV ══════════ */}
      <header className="x3-nav">
        <div className="x3-nav-in">
          <a href="#top" className={`x3-logo ${spaceGrotesk.className}`}>
            LEAD<span>Autonomous</span>
          </a>
          <nav className="x3-nav-links">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="x3-nav-link">{n.label}</a>
            ))}
          </nav>
          <div className="x3-nav-right">
            <Link href={APPLY.general} className="x3-btn x3-btn-accent x3-nav-apply">Apply</Link>
            <button type="button" className="x3-burger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="x3-menu" role="dialog" aria-modal="true">
          <button type="button" className="x3-menu-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={26} />
          </button>
          <nav className="x3-menu-links">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className={spaceGrotesk.className} onClick={() => setMenuOpen(false)}>{n.label}</a>
            ))}
            <Link href={APPLY.general} className="x3-btn x3-btn-accent" onClick={() => setMenuOpen(false)}>Apply Now</Link>
          </nav>
        </div>
      )}

      {/* ══════════ HERO ══════════ */}
      <section className="x3-hero" id="top">
        <div className="x3-hero-grid">
          <motion.div
            className="x3-hero-copy"
            variants={reduce ? undefined : stagger}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
          >
            <motion.p variants={item} className="x3-kicker">
              <span className="x3-kicker-dot" />Autonomous business school · Palakkad
            </motion.p>
            <motion.h1 variants={item} className={`x3-hero-title ${spaceGrotesk.className}`}>
              Leaders are<br />made <span className="x3-em">here</span>.
            </motion.h1>
            <motion.p variants={item} className="x3-hero-sub">
              An AICTE-approved MBA and MCA institution shaping industry-ready leaders since 2010.
            </motion.p>
            <motion.div variants={item} className="x3-hero-cta">
              <Link href={APPLY.general} className="x3-btn x3-btn-accent">Apply Now <ArrowUpRight size={17} /></Link>
              <a href="#programmes" className="x3-btn x3-btn-line">Explore Programmes <ArrowRight size={16} /></a>
            </motion.div>
          </motion.div>

          <motion.div
            className="x3-hero-media"
            initial={reduce ? false : { opacity: 0, clipPath: "inset(12% 0 12% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          >
            <Image
              src="/convert/LEAD53.webp"
              alt="Students on the LEAD College campus in Dhoni, Palakkad"
              fill priority sizes="(max-width: 900px) 100vw, 44vw"
              className="x3-hero-img"
            />
            <span className={`x3-hero-badge ${spaceGrotesk.className}`}>Est. 2010</span>
          </motion.div>
        </div>

        <div className="x3-hero-stats">
          {HERO_STATS.map((s) => (
            <div key={s.l} className="x3-hstat">
              <span className={`x3-hstat-v ${spaceGrotesk.className}`}>{s.v}</span>
              <span className="x3-hstat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ WHO WE ARE ══════════ */}
      <section className="x3-about" id="about">
        <div className="x3-wrap x3-about-grid">
          <Reveal className="x3-about-l">
            <p className="x3-kicker"><span className="x3-kicker-dot" />Since 2010</p>
            <h2 className={`x3-h2 ${spaceGrotesk.className}`}>
              From <span className="x3-em">58 students</span> to a movement.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="x3-about-r">
            <p className="x3-lead">
              LEAD grew from 58 determined students into a thriving autonomous institution affiliated
              to the University of Calicut.
            </p>
            <p className="x3-body">
              With industry-integrated learning, close mentorship, and a solar-powered residential
              campus in Palakkad, we pair academic rigour with character, and progress with purpose.
            </p>
            <div className="x3-about-links">
              <Link href="/the-lead-story" className="x3-tlink">The LEAD Story <ArrowRight size={15} /></Link>
              <Link href="/governance" className="x3-tlink">Governance <ArrowRight size={15} /></Link>
              <Link href="/iqac" className="x3-tlink">Accreditation <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ PROGRAMMES — full-width alternating rows ══════════ */}
      <section className="x3-prog" id="programmes">
        <div className="x3-wrap">
          <Reveal>
            <p className="x3-kicker"><span className="x3-kicker-dot" />Two prestigious degrees</p>
            <h2 className={`x3-h2 x3-prog-h ${spaceGrotesk.className}`}>Crafted for the bold.</h2>
          </Reveal>
        </div>

        {PROGRAMS.map((p, i) => (
          <Reveal key={p.id} className={`x3-prow ${i % 2 ? "x3-prow-rev" : ""}`}>
            <div className="x3-prow-media">
              <Image src={p.image} alt={p.full} fill sizes="(max-width: 900px) 100vw, 50vw" className="x3-cover" />
            </div>
            <div className="x3-prow-copy">
              <span className={`x3-prow-n ${spaceGrotesk.className}`}>{p.n}</span>
              <p className="x3-prow-meta">{p.meta}</p>
              <h3 className={`x3-prow-title ${spaceGrotesk.className}`}>{p.full}</h3>
              <p className="x3-prow-tag">{p.tagline}</p>
              <p className="x3-body">{p.description}</p>
              <ul className="x3-prow-hl">
                {p.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
              <div className="x3-prow-cta">
                <a href={p.apply} target="_blank" rel="noreferrer" className="x3-btn x3-btn-accent">Apply for {p.short} <ArrowUpRight size={15} /></a>
                <Link href={p.explore} className="x3-btn x3-btn-line">Explore {p.short} <ArrowRight size={15} /></Link>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ══════════ NUMBERS — oversized ══════════ */}
      <section className="x3-nums">
        <div className="x3-wrap">
          <Reveal><h2 className={`x3-h2 ${spaceGrotesk.className}`}>A legacy written in results.</h2></Reveal>
          <div className="x3-nums-grid">
            {NUMBERS.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.07} className="x3-bignum">
                <span className={`x3-bignum-v ${spaceGrotesk.className}`}>{s.v}</span>
                <span className="x3-bignum-l">{s.l}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY — bento ══════════ */}
      <section className="x3-why">
        <div className="x3-wrap">
          <Reveal><h2 className={`x3-h2 ${spaceGrotesk.className}`}>Why students choose LEAD.</h2></Reveal>
          <div className="x3-bento">
            {WHY.map((w, i) => (
              <Reveal key={w.n} delay={(i % 3) * 0.06} className={`x3-cell x3-cell-${i}`}>
                <span className={`x3-cell-n ${spaceGrotesk.className}`}>{w.n}</span>
                <h3 className={`x3-cell-t ${spaceGrotesk.className}`}>{w.title}</h3>
                <p className="x3-cell-b">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PLACEMENTS — recruiter logo marquee (single marquee) ══════════ */}
      <section className="x3-place" id="placements">
        <div className="x3-wrap">
          <Reveal>
            <p className="x3-kicker"><span className="x3-kicker-dot" />Placements</p>
            <h2 className={`x3-h2 ${spaceGrotesk.className}`}>219+ recruiters. One outcome.</h2>
            <p className="x3-body x3-place-sub">
              From national banks to fast-growing enterprises, recruiters engage every batch across
              marketing, BFSI, analytics, and consulting. Our graduates are sought after.
            </p>
          </Reveal>
        </div>
        <div className="x3-marquee" aria-label="Recruiting partners">
          <div className={`x3-marquee-track ${reduce ? "is-static" : ""}`}>
            {[...RECRUITERS, ...RECRUITERS].map((src, i) => (
              <span key={i} className="x3-logo">
                <Image src={src} alt="Recruiting partner" width={150} height={70} className="x3-logo-img" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CAMPUS — asymmetric gallery ══════════ */}
      <section className="x3-campus" id="campus">
        <div className="x3-wrap">
          <Reveal>
            <p className="x3-kicker"><span className="x3-kicker-dot" />Campus life</p>
            <h2 className={`x3-h2 ${spaceGrotesk.className}`}>Moments that stay.</h2>
          </Reveal>
          <div className="x3-gal">
            {GALLERY.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 0.05} className={`x3-gal-cell x3-gal-${i}`}>
                <Image src={src} alt="Life at LEAD College" fill sizes="(max-width: 900px) 50vw, 25vw" className="x3-cover" />
              </Reveal>
            ))}
          </div>
          <div className="x3-center">
            <Link href="/life-at-lead/gallery" className="x3-btn x3-btn-line">Explore Full Gallery <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ══════════ VOICES ══════════ */}
      <section className="x3-voices">
        <div className="x3-wrap">
          <Reveal><h2 className={`x3-h2 ${spaceGrotesk.className}`}>In their own words.</h2></Reveal>
          <div className="x3-voices-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 0.08} className="x3-quote">
                <span className={`x3-quote-mark ${spaceGrotesk.className}`}>&ldquo;</span>
                <p className="x3-quote-t">{t.text}</p>
                <div className="x3-quote-by">
                  <strong className={spaceGrotesk.className}>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="x3-cta">
        <div className="x3-wrap x3-cta-in">
          <Reveal>
            <h2 className={`x3-cta-title ${spaceGrotesk.className}`}>Admissions 2026 are open.</h2>
            <p className="x3-cta-sub">Applications for MBA and MCA are live. Start yours today.</p>
          </Reveal>
          <Reveal delay={0.08} className="x3-cta-btns">
            <Link href={APPLY.general} className="x3-btn x3-btn-accent x3-btn-lg">Apply Now <ArrowUpRight size={17} /></Link>
            <a href={APPLY.brochure} target="_blank" rel="noreferrer" className="x3-btn x3-btn-line x3-btn-lg">Download Brochure <ArrowRight size={16} /></a>
          </Reveal>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="x3-foot">
        <div className="x3-wrap x3-foot-grid">
          <div className="x3-foot-brand">
            <span className={`x3-logo ${spaceGrotesk.className}`}>LEAD<span>Autonomous</span></span>
            <p className="x3-foot-addr">
              LEAD College (Autonomous)<br />Dhoni PO, Palakkad, Kerala 678009
            </p>
            <a href="tel:+919497713693" className="x3-foot-link">+91 9497713693</a>
            <a href="mailto:info@lead.ac.in" className="x3-foot-link">info@lead.ac.in</a>
          </div>
          <div className="x3-foot-col">
            <h4 className={spaceGrotesk.className}>Explore</h4>
            <a href="#about">About</a>
            <a href="#programmes">Programmes</a>
            <Link href="/admissions">Admissions</Link>
            <Link href="/placements">Placements</Link>
            <Link href="/life-at-lead/gallery">Campus Life</Link>
          </div>
          <div className="x3-foot-col">
            <h4 className={spaceGrotesk.className}>Connect</h4>
            <div className="x3-foot-social">
              {SOCIAL.map(({ key, href, Icon, label }) => (
                <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="x3-wrap x3-foot-bottom">
          <span>© 2026 LEAD College (Autonomous). All rights reserved.</span>
          <span>Palakkad, Kerala, India</span>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════ styles — dark cinematic, ember accent ════════════════════════ */
const CSS = `
.x3{--bg:#0a0a0b;--bg2:#121215;--card:#161619;--line:rgba(255,255,255,.1);
  --text:#f3f1ea;--muted:#b6b4ac;--faint:#86847e;--accent:#ff5b2e;--accent-ink:#0a0a0b;
  background:var(--bg);color:var(--text);overflow-x:clip;line-height:1.6;
  font-feature-settings:"ss01";}
.x3 *{box-sizing:border-box;}
.x3-wrap{max-width:1240px;margin:0 auto;padding:0 clamp(1.2rem,4vw,3rem);}
.x3-cover{object-fit:cover;}
.x3-center{display:flex;justify-content:center;margin-top:clamp(2rem,4vw,3rem);}
.x3-em{color:var(--accent);}

/* kicker (rationed) */
.x3-kicker{display:flex;align-items:center;gap:.6rem;font-size:.76rem;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:var(--faint);margin:0 0 1.2rem;}
.x3-kicker-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);flex-shrink:0;}

/* headings + text */
.x3-h2{font-size:clamp(2rem,4.6vw,3.6rem);line-height:1.02;font-weight:700;letter-spacing:-.02em;color:var(--text);margin:0;}
.x3-lead{font-size:clamp(1.2rem,1.9vw,1.6rem);line-height:1.45;font-weight:500;color:var(--text);margin:0 0 1.2rem;letter-spacing:-.01em;}
.x3-body{font-size:1.02rem;line-height:1.8;color:var(--muted);margin:0 0 1.4rem;max-width:60ch;}

/* buttons (one shape: pill; contrast audited) */
.x3-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.5rem;border-radius:100px;
  font-family:${spaceGrotesk.style.fontFamily};font-size:.86rem;font-weight:600;letter-spacing:.01em;
  text-decoration:none;cursor:pointer;border:1px solid transparent;white-space:nowrap;
  transition:transform .2s ease,background .2s ease,color .2s ease,border-color .2s ease,box-shadow .2s ease;}
.x3-btn:hover{transform:translateY(-2px);}
.x3-btn:active{transform:translateY(0) scale(.98);}
.x3-btn-lg{padding:1rem 1.9rem;font-size:.92rem;}
.x3-btn-accent{background:var(--accent);color:var(--accent-ink);box-shadow:0 10px 30px -10px rgba(255,91,46,.6);}
.x3-btn-accent:hover{background:#ff6d44;box-shadow:0 16px 40px -12px rgba(255,91,46,.7);}
.x3-btn-line{background:transparent;color:var(--text);border-color:rgba(255,255,255,.22);}
.x3-btn-line:hover{border-color:var(--text);background:rgba(255,255,255,.05);}

/* nav */
.x3-nav{position:sticky;top:0;z-index:50;background:rgba(10,10,11,.72);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);}
.x3-nav-in{max-width:1320px;margin:0 auto;padding:.85rem clamp(1.2rem,4vw,2.4rem);display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:64px;}
.x3-logo{display:flex;flex-direction:column;line-height:1;font-weight:700;font-size:1.3rem;letter-spacing:.02em;color:var(--text);text-decoration:none;}
.x3-logo span{font-family:${manrope.style.fontFamily};font-size:.56rem;letter-spacing:.32em;text-transform:uppercase;color:var(--faint);font-weight:600;margin-top:3px;}
.x3-nav-links{display:flex;align-items:center;gap:2rem;}
.x3-nav-link{font-size:.9rem;font-weight:500;color:var(--muted);text-decoration:none;transition:color .2s;}
.x3-nav-link:hover{color:var(--text);}
.x3-nav-right{display:flex;align-items:center;gap:1rem;}
.x3-burger{display:none;background:none;border:none;color:var(--text);cursor:pointer;padding:4px;}
@media(max-width:900px){.x3-nav-links{display:none;}.x3-nav-apply{display:none;}.x3-burger{display:inline-flex;}}

/* mobile menu */
.x3-menu{position:fixed;inset:0;z-index:60;background:rgba(10,10,11,.98);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;}
.x3-menu-close{position:absolute;top:1.3rem;right:1.3rem;background:none;border:none;color:var(--text);cursor:pointer;}
.x3-menu-links{display:flex;flex-direction:column;align-items:center;gap:1.6rem;}
.x3-menu-links a:not(.x3-btn){font-size:1.8rem;font-weight:600;color:var(--text);text-decoration:none;letter-spacing:-.01em;}
.x3-menu-links .x3-btn{margin-top:1rem;}

/* hero */
.x3-hero{padding:clamp(2.4rem,5vw,4rem) 0 clamp(2.4rem,5vw,3.5rem);max-width:1240px;margin:0 auto;padding-left:clamp(1.2rem,4vw,3rem);padding-right:clamp(1.2rem,4vw,3rem);}
.x3-hero-grid{display:grid;grid-template-columns:1fr;gap:clamp(2rem,4vw,3.5rem);align-items:center;}
@media(min-width:901px){.x3-hero-grid{grid-template-columns:1.08fr .92fr;min-height:calc(100dvh - 200px);}}
.x3-hero-title{font-size:clamp(2.8rem,8vw,6.2rem);line-height:.96;font-weight:700;letter-spacing:-.035em;margin:0 0 1.3rem;}
.x3-hero-sub{font-size:clamp(1.05rem,1.4vw,1.25rem);line-height:1.6;color:var(--muted);max-width:32rem;margin:0 0 2rem;}
.x3-hero-cta{display:flex;flex-wrap:wrap;gap:.85rem;}
.x3-hero-media{position:relative;width:100%;aspect-ratio:4/5;border-radius:16px;overflow:hidden;border:1px solid var(--line);}
@media(min-width:901px){.x3-hero-media{aspect-ratio:auto;height:min(72vh,620px);}}
.x3-hero-img{object-fit:cover;object-position:center 22%;}
.x3-hero-badge{position:absolute;left:1rem;bottom:1rem;padding:.5rem 1rem;border-radius:100px;background:var(--accent);color:var(--accent-ink);font-size:.74rem;font-weight:700;letter-spacing:.04em;}
.x3-hero-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:1.4rem;margin-top:clamp(2.2rem,4vw,3.2rem);padding-top:2rem;border-top:1px solid var(--line);}
@media(min-width:640px){.x3-hero-stats{grid-template-columns:repeat(4,1fr);}}
.x3-hstat-v{display:block;font-size:clamp(1.6rem,2.6vw,2.3rem);font-weight:700;letter-spacing:-.02em;color:var(--text);line-height:1;}
.x3-hstat-l{display:block;margin-top:.5rem;font-size:.8rem;color:var(--faint);letter-spacing:.02em;}

/* about */
.x3-about{padding:clamp(4rem,9vw,8rem) 0;}
.x3-about-grid{display:grid;grid-template-columns:1fr;gap:clamp(1.6rem,4vw,3.5rem);align-items:start;}
@media(min-width:901px){.x3-about-grid{grid-template-columns:1fr 1fr;}}
.x3-about-links{display:flex;flex-wrap:wrap;gap:1.4rem;margin-top:1.4rem;}
.x3-tlink{display:inline-flex;align-items:center;gap:.4rem;font-family:${spaceGrotesk.style.fontFamily};font-size:.86rem;font-weight:600;color:var(--text);text-decoration:none;border-bottom:1px solid var(--accent);padding-bottom:3px;transition:color .2s,gap .2s;}
.x3-tlink:hover{color:var(--accent);gap:.7rem;}

/* programmes */
.x3-prog{padding:clamp(3rem,6vw,5rem) 0 clamp(4rem,9vw,8rem);}
.x3-prog-h{margin-top:.4rem;margin-bottom:clamp(2.5rem,5vw,4rem);}
.x3-prow{display:grid;grid-template-columns:1fr;gap:clamp(1.6rem,4vw,3.5rem);align-items:center;
  max-width:1240px;margin:0 auto;padding:clamp(1.6rem,3vw,2.4rem) clamp(1.2rem,4vw,3rem);}
@media(min-width:901px){.x3-prow{grid-template-columns:1fr 1fr;}.x3-prow-rev .x3-prow-media{order:2;}}
.x3-prow-media{position:relative;aspect-ratio:16/11;border-radius:16px;overflow:hidden;border:1px solid var(--line);}
.x3-prow-n{display:block;font-size:clamp(2.4rem,5vw,3.6rem);font-weight:700;color:var(--accent);line-height:1;letter-spacing:-.03em;margin-bottom:.8rem;}
.x3-prow-meta{font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--faint);font-weight:600;margin:0 0 .7rem;}
.x3-prow-title{font-size:clamp(1.6rem,2.8vw,2.4rem);line-height:1.08;font-weight:700;letter-spacing:-.02em;margin:0 0 .5rem;color:var(--text);}
.x3-prow-tag{font-size:1.1rem;color:var(--accent);margin:0 0 1.1rem;font-weight:500;}
.x3-prow-hl{list-style:none;margin:0 0 1.7rem;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:.6rem 1.4rem;}
.x3-prow-hl li{position:relative;padding-left:1.3rem;font-size:.86rem;color:var(--muted);font-weight:500;}
.x3-prow-hl li::before{content:"";position:absolute;left:0;top:.5em;width:8px;height:2px;background:var(--accent);}
.x3-prow-cta{display:flex;flex-wrap:wrap;gap:.7rem;}
@media(max-width:420px){.x3-prow-hl{grid-template-columns:1fr;}}

/* numbers */
.x3-nums{padding:clamp(4rem,9vw,8rem) 0;background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
.x3-nums .x3-h2{margin-bottom:clamp(2.4rem,5vw,3.5rem);}
.x3-nums-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(2rem,4vw,3rem) 1.5rem;}
@media(min-width:820px){.x3-nums-grid{grid-template-columns:repeat(4,1fr);}}
.x3-bignum-v{display:block;font-size:clamp(2.6rem,5.2vw,4.4rem);font-weight:700;color:var(--text);line-height:.95;letter-spacing:-.03em;}
.x3-bignum-l{display:block;margin-top:.7rem;font-size:.86rem;color:var(--faint);letter-spacing:.02em;}

/* why bento */
.x3-why{padding:clamp(4rem,9vw,8rem) 0;}
.x3-why .x3-h2{margin-bottom:clamp(2.4rem,5vw,3.5rem);}
.x3-bento{display:grid;grid-template-columns:1fr;gap:1rem;}
@media(min-width:680px){.x3-bento{grid-template-columns:repeat(2,1fr);}}
@media(min-width:1000px){.x3-bento{grid-template-columns:repeat(3,1fr);}}
.x3-cell{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:clamp(1.6rem,2.5vw,2.2rem);display:flex;flex-direction:column;transition:border-color .25s ease,transform .25s ease;}
.x3-cell:hover{border-color:rgba(255,91,46,.5);transform:translateY(-4px);}
/* rhythm: first and fourth cells lean on the accent */
.x3-cell-0{background:linear-gradient(150deg,rgba(255,91,46,.16),rgba(255,91,46,.04));border-color:rgba(255,91,46,.35);}
@media(min-width:1000px){.x3-cell-0{grid-column:span 1;grid-row:span 1;}.x3-cell-3{background:linear-gradient(150deg,rgba(255,91,46,.1),transparent);}}
.x3-cell-n{font-family:${spaceGrotesk.style.fontFamily};font-size:.9rem;font-weight:700;color:var(--accent);letter-spacing:.04em;margin-bottom:1.2rem;}
.x3-cell-t{font-size:1.15rem;font-weight:700;letter-spacing:-.01em;color:var(--text);margin:0 0 .6rem;}
.x3-cell-b{font-size:.92rem;line-height:1.7;color:var(--muted);margin:0;}

/* placements marquee */
.x3-place{padding:clamp(4rem,9vw,7rem) 0;background:var(--bg2);border-top:1px solid var(--line);}
.x3-place-sub{max-width:46rem;}
.x3-marquee{margin-top:clamp(2.4rem,4vw,3.4rem);overflow:hidden;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);}
.x3-marquee-track{display:flex;gap:1rem;width:max-content;animation:x3Marq 70s linear infinite;}
.x3-marquee-track.is-static{animation:none;flex-wrap:wrap;width:100%;justify-content:center;}
@keyframes x3Marq{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.x3-logo{flex:0 0 auto;width:clamp(120px,14vw,168px);height:clamp(74px,9vw,96px);border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;padding:.9rem 1.1rem;}
.x3-logo-img{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;}
@media(prefers-reduced-motion:reduce){.x3-marquee-track{animation:none;flex-wrap:wrap;width:100%;justify-content:center;}}

/* campus asymmetric gallery */
.x3-campus{padding:clamp(4rem,9vw,8rem) 0;}
.x3-gal{display:grid;grid-template-columns:repeat(2,1fr);gap:.9rem;margin-top:clamp(2rem,4vw,3rem);grid-auto-rows:180px;}
@media(min-width:760px){.x3-gal{grid-template-columns:repeat(4,1fr);grid-auto-rows:200px;}}
.x3-gal-cell{position:relative;border-radius:14px;overflow:hidden;border:1px solid var(--line);}
@media(min-width:760px){
  .x3-gal-0{grid-column:span 2;grid-row:span 2;}
  .x3-gal-3{grid-column:span 2;}
  .x3-gal-6{grid-column:span 2;}
}

/* voices */
.x3-voices{padding:clamp(4rem,9vw,8rem) 0;background:var(--bg2);border-top:1px solid var(--line);}
.x3-voices .x3-h2{margin-bottom:clamp(2.4rem,5vw,3.5rem);}
.x3-voices-grid{display:grid;grid-template-columns:1fr;gap:1.2rem;}
@media(min-width:760px){.x3-voices-grid{grid-template-columns:1fr 1fr;}}
.x3-quote{position:relative;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:2rem 1.8rem 1.7rem;overflow:hidden;}
.x3-quote-mark{position:absolute;top:.4rem;right:1.3rem;font-size:4.5rem;line-height:1;color:rgba(255,91,46,.22);}
.x3-quote-t{font-size:1.08rem;line-height:1.65;color:var(--text);margin:0 0 1.4rem;position:relative;}
.x3-quote-by{display:flex;flex-direction:column;gap:.2rem;}
.x3-quote-by strong{font-size:.92rem;font-weight:700;color:var(--text);letter-spacing:-.01em;}
.x3-quote-by span{font-size:.82rem;color:var(--faint);}

/* cta */
.x3-cta{padding:clamp(4rem,9vw,7rem) 0;background:radial-gradient(120% 140% at 100% 0%,rgba(255,91,46,.22),transparent 55%),var(--bg);}
.x3-cta-in{display:flex;align-items:flex-end;justify-content:space-between;gap:2.2rem;flex-wrap:wrap;}
.x3-cta-title{font-size:clamp(2.2rem,5vw,4rem);line-height:1;font-weight:700;letter-spacing:-.03em;color:var(--text);margin:0;max-width:16ch;}
.x3-cta-sub{color:var(--muted);font-size:1.1rem;line-height:1.6;margin:1rem 0 0;}
.x3-cta-btns{display:flex;flex-wrap:wrap;gap:.85rem;}

/* footer */
.x3-foot{background:var(--bg2);border-top:1px solid var(--line);padding:clamp(3rem,6vw,4.5rem) 0 2rem;}
.x3-foot-grid{display:grid;grid-template-columns:1fr;gap:2.4rem;}
@media(min-width:760px){.x3-foot-grid{grid-template-columns:1.6fr 1fr 1fr;}}
.x3-foot-brand .x3-logo{margin-bottom:1.1rem;}
.x3-foot-addr{color:var(--muted);font-size:.92rem;line-height:1.7;margin:0 0 1rem;}
.x3-foot-link{display:block;color:var(--muted);text-decoration:none;font-size:.92rem;line-height:1.9;transition:color .2s;}
.x3-foot-link:hover{color:var(--accent);}
.x3-foot-col h4{font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);font-weight:700;margin:0 0 1.1rem;}
.x3-foot-col a{display:block;color:var(--muted);text-decoration:none;font-size:.94rem;line-height:2;transition:color .2s;}
.x3-foot-col a:hover{color:var(--text);}
.x3-foot-social{display:flex;gap:.6rem;}
.x3-foot-social a{width:40px;height:40px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--muted);transition:color .2s,border-color .2s,transform .2s;}
.x3-foot-social a:hover{color:var(--accent);border-color:var(--accent);transform:translateY(-3px);}
.x3-foot-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.6rem;margin-top:clamp(2.4rem,4vw,3.4rem);padding-top:1.6rem;border-top:1px solid var(--line);color:var(--faint);font-size:.82rem;}
`;
