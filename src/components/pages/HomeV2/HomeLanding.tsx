"use client";

/*  LEAD College — /home (POC homepage, v2)
    ------------------------------------------------------------------
    Rebuilt to the owner's direction:
      • Theme is WHITE + BLUE (navy #0a2463 / royal #005C9F) — no cream.
      • Fonts are the site's own: Cinzel (uppercase display) + Playfair.
      • Uses the real site <Header/> (always visible here) with a blue
        contact strip above it.
      • A commanding, cinematic "statement" hero — not an editorial page.
      • Editorial, layered sections instead of bento/box grids.
      • Generic "Apply Now" opens the header's MBA/MCA dialog; programme-
        specific buttons deep-link to the right application.
      • Placements = a colourful 3D revolving orbit of recruiter logos.
    All content/images reused from the existing site (see ./data). */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram, Facebook, Linkedin, Youtube, Phone, Mail, MapPin,
  ArrowRight, ArrowUpRight, Play,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { Header, ApplyModal } from "@/components/ui/header-3";
import NumbersSection from "./NumbersSection";
import RecruitersSection from "./RecruitersSection";
import ExcellenceByMake from "./ExcellenceByMake";
import { FeatureStepsDemo } from "@/components/pages/LandingPage/FeatureStepsDemo";
import { TestimonialsV2 } from "@/components/ui/testimonial-v2";
import {
  CONTACT, SOCIAL, PROGRAMS, GALLERY, VIDEO_ID,
} from "./data";

const SOCIAL_ICON: Record<string, React.ElementType> = {
  instagram: Instagram, facebook: Facebook, linkedin: Linkedin, youtube: Youtube,
};

const ACCRED = Array.from({ length: 7 }, (_, i) => `/accreditations/${i + 1}.webp`);
const CREDENTIALS = ["AICTE Approved", "NBA Accredited", "Autonomous", "University of Calicut"];

/* Rotating word inside the Who-We-Are lead sentence. Words are chosen so each
   fits "Not just a campus. A ___ — to education rooted in courage, clarity and
   conscience." The swap is a smooth left-to-right wipe (ChatGPT-style pan). */
const ROTATE_WORDS = ["commitment", "promise", "devotion"];
function RotatingWord() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % ROTATE_WORDS.length);
        setShow(true);
      }, 420);
    }, 2800);
    return () => clearInterval(id);
  }, []);
  return <em className={`hv-rot ${show ? "in" : "out"}`}>A {ROTATE_WORDS[i]}</em>;
}

function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("hv-js");

    // one-shot entrance
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    // Safety net: only reveal elements already in/above the viewport, so
    // below-the-fold sections still animate when the user scrolls to them.
    const t = setTimeout(() => els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("rv-in");
    }), 1400);

    // two-way reveal (entry + exit) — re-animates each time it enters/leaves
    const two = Array.from(document.querySelectorAll<HTMLElement>(".hv-2way"));
    const io2 = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("hv-2way-in", e.isIntersecting)),
      { threshold: 0.2, rootMargin: "0px 0px -12% 0px" }
    );
    two.forEach((el) => io2.observe(el));

    return () => { io.disconnect(); io2.disconnect(); clearTimeout(t); };
  }, []);
}

export default function HomeLanding() {
  useReveal();
  const [playing, setPlaying] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const openApply = () => setApplyOpen(true);
  const year = 2026;

  return (
    <div className={`hv ${playfair.className}`}>
      <style>{CSS}</style>

      {/* ══════════ BLUE CONTACT STRIP ══════════ */}
      <div className="hv-strip">
        <div className="hv-strip-in">
          <div className="hv-strip-left">
            <a href={`tel:${CONTACT.mobile.replace(/\s/g, "")}`}><Phone size={12} /> {CONTACT.mobile}</a>
            <span className="hv-strip-sep" />
            <a href={`mailto:${CONTACT.emails[0]}`}><Mail size={12} /> {CONTACT.emails[0]}</a>
            <span className="hv-strip-sep hv-hide-sm" />
            <span className="hv-strip-loc hv-hide-sm"><MapPin size={12} /> Dhoni, Palakkad, Kerala</span>
          </div>
          <div className="hv-strip-right">
            <span className={`hv-strip-adm ${cinzel.className}`}>Admissions {year} Open</span>
            <span className="hv-strip-sep" />
            <div className="hv-strip-social">
              {SOCIAL.map((s) => {
                const Icon = SOCIAL_ICON[s.key];
                return <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}><Icon size={13} /></a>;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ REAL SITE HEADER (always visible) ══════════ */}
      <Header />

      {/* ══════════ HERO — statement ══════════ */}
      <section className="hv-hero">
        <div className="hv-hero-bg">
          <Image src="/convert/LEAD53.webp" alt="LEAD College campus" fill priority sizes="100vw" className="hv-hero-img" />
        </div>
        <div className="hv-hero-scrim" />
        <span className={`hv-hero-est ${cinzel.className}`}>EST · 2010</span>

        <div className="hv-hero-inner">
          <p className={`hv-hero-eyebrow ${cinzel.className}`}><span className="hv-eb-dash" />LEAD College · Autonomous · Palakkad</p>
          <h1 className={`hv-hero-title ${cinzel.className}`}>
            Leaders are<br />made <span className="hv-grad">here.</span>
          </h1>
          <p className={`hv-hero-sub ${playfair.className}`}>
            An autonomous, AICTE-approved institution shaping courageous, industry-ready
            leaders since 2010 — through MBA &amp; MCA programmes built on internships,
            mentorship, and a 95%+ placement record.
          </p>
          <div className="hv-hero-cta">
            <button type="button" onClick={openApply} className="hv-btn hv-btn-solid">Apply Now <ArrowUpRight size={15} /></button>
            <a href="#programmes" className="hv-btn hv-btn-glass">Explore Programmes <ArrowRight size={15} /></a>
          </div>
        </div>

        <div className="hv-hero-bar">
          {CREDENTIALS.map((c) => <span key={c} className={cinzel.className}>{c}</span>)}
        </div>
      </section>

      {/* ══════════ WHO WE ARE ══════════ */}
      <section className="hv-manifesto" id="about">
        <div className="hv-wrap hv-mani-grid">
          {/* LEFT — prominent title + overlapping image collage */}
          <div className="hv-mani-left rv">
            <p className={`hv-eyebrow ${cinzel.className}`}><span className="hv-rule" />Since 2010</p>
            <h2 className={`hv-mani-h ${cinzel.className}`}>Who We Are</h2>
            <p className={`hv-accred-lead ${cinzel.className}`}>Accredited &amp; Recognised</p>
            <div className="hv-accred-grid">
              {ACCRED.map((src) => (
                <span key={src} className="hv-accred-cell">
                  <Image src={src} alt="Accreditation" width={90} height={90} className="hv-accred-img" />
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — lead statement (rotating word) + paragraph */}
          <div className="hv-mani-right rv">
            <h3 className={`hv-mani-lead ${playfair.className}`}>
              Not just a campus. <span className="hv-lead-hl"><RotatingWord /></span> — to
              education rooted in courage, clarity and conscience.
            </h3>
            <p className={`hv-p ${playfair.className}`}>
              Founded in Palakkad, LEAD grew from 58 determined students into a thriving
              autonomous institution affiliated to the University of Calicut. With
              industry-integrated learning, close mentorship, and a residential campus
              powered largely by solar energy, we pair academic rigour with character —
              progress with purpose.
            </p>
            <div className="hv-mani-links">
              <Link href="/the-lead-story" className="hv-textlink">The LEAD Story <ArrowRight size={14} /></Link>
              <Link href="/governance" className="hv-textlink">Governance <ArrowRight size={14} /></Link>
              <Link href="/iqac" className="hv-textlink">Quality &amp; Accreditation <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PROGRAMMES — alternating features ══════════ */}
      <section className="hv-prog" id="programmes">
        <div className="hv-wrap">
          <header className="hv-craft-head rv">
            <div className={`hv-craft-eyebrow ${cinzel.className}`}>
              <span className="hv-craft-dash" />LEAD College<span className="hv-craft-dash" />
            </div>
            <h2 className={`hv-craft-title ${cinzel.className}`}>Crafted for the Bold</h2>
            <p className={`hv-craft-kicker ${cinzel.className}`}>Two Prestigious Degrees</p>
            <div className="hv-craft-div" />
            <p className={`hv-craft-sub ${playfair.className}`}>
              Industry-integrated programmes designed to create leaders who innovate,
              inspire, and impact the business world.
            </p>
          </header>
        </div>
        {PROGRAMS.map((p, i) => (
          <article key={p.id} className={`hv-feat ${i % 2 ? "hv-feat-rev" : ""}`}>
            <div className="hv-feat-media hv-2way">
              <div className="hv-feat-img">
                <Image src={p.image} alt={p.full} fill sizes="(max-width:900px) 100vw, 52vw" className="hv-cover" />
                <span className={`hv-feat-ghost ${cinzel.className}`}>{p.short}</span>
              </div>
            </div>
            <div className="hv-feat-copy hv-2way">
              <span className={`hv-feat-index ${cinzel.className}`}>{String(i + 1).padStart(2, "0")}</span>
              <p className={`hv-feat-badge ${cinzel.className}`}>{p.badge} · {p.duration} · {p.mode}</p>
              <h3 className={`hv-feat-title ${cinzel.className}`}>{p.full}</h3>
              <p className={`hv-feat-tag ${playfair.className}`}>{p.tagline}</p>
              <p className={`hv-p ${playfair.className}`}>{p.description}</p>
              <ul className="hv-feat-hl">
                {p.highlights.map((h) => <li key={h} className={cinzel.className}>{h}</li>)}
              </ul>
              <div className="hv-feat-cta">
                <a href={p.apply} target="_blank" rel="noreferrer" className="hv-btn hv-btn-solid">Apply for {p.short} <ArrowUpRight size={14} /></a>
                <Link href={p.explore} className="hv-btn hv-btn-ghost">Explore {p.short} <ArrowRight size={14} /></Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ══════════ THE BEST ARE ALREADY HERE — recruiters + placements ══════════ */}
      <RecruitersSection />

      {/* ══════════ LEAD BY THE NUMBERS ══════════ */}
      <NumbersSection />

      {/* ══════════ EXCELLENCE BY MAKE (cards only, from the current homepage) ══════════ */}
      <ExcellenceByMake />

      {/* ══════════ CAMPUS — cinematic film strip ══════════ */}
      <section className="hv-campus" id="campus">
        <div className="hv-wrap">
          <header className="hv-sec-head rv">
            <p className={`hv-eyebrow ${cinzel.className}`}><span className="hv-rule" />Campus Life</p>
            <h2 className={`hv-h2 ${cinzel.className}`}>Moments that stay forever.</h2>
          </header>
        </div>
        <div className="hv-film" aria-label="Campus life">
          <div className="hv-film-track">
            {[...GALLERY, ...GALLERY].map((g, i) => (
              <span key={i} className="hv-film-cell">
                <Image src={g.src} alt="Life at LEAD College" fill sizes="34vw" className="hv-cover" />
              </span>
            ))}
          </div>
        </div>
        <div className="hv-wrap hv-center">
          <Link href="/life-at-lead/gallery" className="hv-btn hv-btn-solid">Explore Full Gallery <ArrowUpRight size={15} /></Link>
        </div>
      </section>

      {/* ══════════ VOICES — the site's own testimonials component ══════════ */}
      <TestimonialsV2 />

      {/* ══════════ FEATURED VIDEO — Experience LEAD ══════════ */}
      <section className="hv-video">
        <div className="hv-wrap">
          <header className="hv-sec-head rv">
            <p className={`hv-eyebrow ${cinzel.className}`}><span className="hv-rule" />Featured Film</p>
            <h2 className={`hv-h2 ${cinzel.className}`}>Experience LEAD.</h2>
          </header>
          <div className="hv-video-frame rv">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Featured Video — LEAD College"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button type="button" className="hv-video-facade" onClick={() => setPlaying(true)} aria-label="Play video">
                <Image src="/convert/LEAD02.webp" alt="Featured video — LEAD College" fill sizes="100vw" className="hv-cover" />
                <span className="hv-video-play"><Play size={22} fill="#fff" stroke="#fff" /></span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ ONE CAMPUS — facilities (pulled from the current homepage) ══════════ */}
      <div className="hv-lastpad"><FeatureStepsDemo /></div>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}

/* ════════════════════════ DESIGN SYSTEM (white + blue) ════════════════════════ */
const CSS = `
.hv{
  --navy:#0a2463; --royal:#005C9F; --blue:#1e3a8a; --ink:#0e1524; --muted:#5a6576;
  --line:#e5e9f0; --tintt:#f3f7fc; --tint:#eaf2fb;
  background:#fff; color:var(--ink); overflow-x:clip; line-height:1.6;
}
.hv *{box-sizing:border-box;}
.hv-wrap{max-width:1240px;margin:0 auto;padding:0 clamp(1.15rem,4vw,3.2rem);}
.hv em{font-style:italic;}
.hv-center{display:flex;justify-content:center;margin-top:clamp(2rem,4vw,3rem);}
.hv-hide-sm{}
.hv-cover{object-fit:cover;}

/* reveal */
.hv-js .rv{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);}
.hv-js .rv.rv-in{opacity:1;transform:none;}
/* stronger, smoother (butter) entrance for Who-We-Are + Crafted */
.hv-js .hv-mani-left.rv,.hv-js .hv-mani-right.rv{transform:translateY(48px);filter:blur(6px);transition:opacity 1.15s cubic-bezier(.22,1,.36,1),transform 1.15s cubic-bezier(.22,1,.36,1),filter 1.15s ease;}
.hv-js .hv-mani-right.rv{transition-delay:.16s;}
.hv-js .hv-mani-left.rv.rv-in,.hv-js .hv-mani-right.rv.rv-in{transform:none;filter:blur(0);}
.hv-js .hv-craft-head.rv{transform:translateY(36px) scale(.97);transition-duration:1.1s;transition-timing-function:cubic-bezier(.22,1,.36,1);}
.hv-js .hv-craft-head.rv.rv-in{transform:none;}
/* two-way (entry + exit) reveal — programme feature cards re-animate each pass */
.hv-js .hv-2way{opacity:0;filter:blur(3px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1),filter .9s ease;}
.hv-js .hv-2way.hv-2way-in{opacity:1;transform:none;filter:blur(0);}
.hv-js .hv-feat-media.hv-2way{transform:translateX(-52px) scale(.96);}
.hv-js .hv-feat-rev .hv-feat-media.hv-2way{transform:translateX(52px) scale(.96);}
.hv-js .hv-feat-copy.hv-2way{transform:translateY(42px);}
.hv-lastpad{padding-bottom:clamp(4rem,8vw,7rem);}
@media(prefers-reduced-motion:reduce){.hv-js .rv,.hv-js .hv-2way{opacity:1!important;transform:none!important;filter:none!important;transition:none!important;}}

/* buttons */
.hv-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.8rem 1.5rem;border-radius:3px;
  font-family:${cinzel.style.fontFamily};font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;font-weight:600;
  text-decoration:none;cursor:pointer;border:1px solid transparent;white-space:nowrap;
  transition:transform .22s ease,background .22s ease,color .22s ease,box-shadow .22s ease,border-color .22s ease;}
.hv-btn:hover{transform:translateY(-2px);}
.hv-btn-lg{padding:1rem 1.8rem;font-size:.7rem;}
.hv-btn-solid{background:var(--navy);color:#fff;box-shadow:0 10px 26px rgba(10,36,99,.28);}
.hv-btn-solid:hover{background:#0b2c7c;box-shadow:0 16px 38px rgba(10,36,99,.36);}
.hv-btn-ghost{background:transparent;color:var(--navy);border-color:rgba(10,36,99,.25);}
.hv-btn-ghost:hover{background:rgba(10,36,99,.045);border-color:var(--navy);}
.hv-btn-glass{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.5);backdrop-filter:blur(6px);}
.hv-btn-glass:hover{background:rgba(255,255,255,.2);border-color:#fff;}
.hv-btn-outline-light{background:transparent;color:#fff;border-color:rgba(255,255,255,.5);}
.hv-btn-outline-light:hover{background:rgba(255,255,255,.12);border-color:#fff;}

/* shared headings */
.hv-eyebrow{display:flex;align-items:center;gap:.7rem;font-size:.72rem;letter-spacing:.26em;text-transform:uppercase;font-weight:600;color:var(--royal);margin:0 0 1rem;}
.hv-eyebrow-light{color:#8fb4de;}
.hv-rule{display:inline-block;width:30px;height:1.5px;background:var(--royal);}
.hv-rule-light{background:#6d94c6;}
.hv-h2{font-family:${cinzel.style.fontFamily};font-size:clamp(1.7rem,3.7vw,3.1rem);line-height:1.05;font-weight:700;letter-spacing:-.01em;color:var(--navy);margin:0;text-transform:none;}
.hv-h2-light{color:#fff;}
.hv-sec-head{max-width:720px;margin:0 auto clamp(2.4rem,4vw,3.4rem);text-align:center;}
.hv-sec-head .hv-eyebrow{justify-content:center;}
.hv-p{color:#111;font-size:1.02rem;line-height:1.9;margin:0 0 1.2rem;}

/* ── blue strip ── */
.hv-strip{background:linear-gradient(90deg,#081b4c,var(--navy) 45%,var(--royal));color:#dbe6f5;font-size:.74rem;}
.hv-strip-in{max-width:1400px;margin:0 auto;padding:.5rem clamp(1rem,4vw,2rem);display:flex;align-items:center;justify-content:space-between;gap:1rem;}
.hv-strip a{color:#dbe6f5;text-decoration:none;display:inline-flex;align-items:center;gap:.35rem;transition:color .2s;}
.hv-strip a:hover{color:#fff;}
.hv-strip-left,.hv-strip-right{display:flex;align-items:center;gap:.85rem;}
.hv-strip-loc{display:inline-flex;align-items:center;gap:.35rem;color:#b8c8e0;}
.hv-strip-sep{width:1px;height:13px;background:rgba(255,255,255,.22);}
.hv-strip-adm{font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:#ffd98a;font-weight:600;}
.hv-strip-social{display:flex;gap:.65rem;flex-shrink:0;}
@media(max-width:760px){.hv-hide-sm{display:none!important;}}
@media(max-width:640px){.hv-strip-adm{display:none!important;}.hv-strip-left a:nth-of-type(2){display:none!important;}.hv-strip-left .hv-strip-sep,.hv-strip-right .hv-strip-sep{display:none!important;}.hv-strip-in{gap:.5rem;padding-top:.4rem;padding-bottom:.4rem;}.hv-strip{font-size:.82rem;}.hv-strip-social{gap:.35rem;}.hv-strip-social a{padding:6px;border-radius:6px;}.hv-strip-social svg{width:19px;height:19px;}.hv-strip-left a svg{width:16px;height:16px;}}
@media(max-width:520px){.hv-strip-left a span{font-size:.8rem;}.hv-strip-left a:first-child{gap:.4rem;}.hv-strip-social{gap:.3rem;}.hv-strip-social a{padding:7px;}.hv-strip-social svg{width:21px;height:21px;}.hv-strip-left a svg{width:17px;height:17px;}}

/* ── hero ── */
.hv-hero{position:relative;min-height:min(88vh,760px);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;background:#06122f;}
.hv-hero-bg{position:absolute;inset:0;}
/* object-position nudged down so the standing figure's head/face isn't cropped under the header (responsive %) */
.hv-hero-img{object-fit:cover;object-position:center 24%;transform:scale(1.04);animation:hvKen 20s ease-in-out infinite alternate;}
@keyframes hvKen{to{transform:scale(1.12);}}
@media(prefers-reduced-motion:reduce){.hv-hero-img{animation:none;}}
.hv-hero-scrim{position:absolute;inset:0;background:
  linear-gradient(90deg,rgba(6,15,42,.92) 0%,rgba(6,15,42,.55) 42%,rgba(6,15,42,.15) 72%,rgba(6,15,42,.35) 100%),
  linear-gradient(0deg,rgba(6,15,42,.9) 0%,rgba(6,15,42,.1) 46%);}
.hv-hero-est{position:absolute;top:clamp(1.2rem,4vw,2.4rem);right:clamp(1.2rem,4vw,2.6rem);z-index:3;
  writing-mode:vertical-rl;font-size:.62rem;letter-spacing:.42em;color:rgba(255,255,255,.55);font-weight:600;}
.hv-hero-inner{position:relative;z-index:2;max-width:1240px;width:100%;margin:0 auto;flex:1;display:flex;flex-direction:column;justify-content:center;padding:clamp(1.8rem,5vh,3.4rem) clamp(1.15rem,4vw,3.2rem);}
.hv-hero-eyebrow{color:#bcd2ef;justify-content:flex-start;margin-bottom:1rem;}
.hv-eb-dash{display:inline-block;width:32px;height:1.5px;background:#7ea6d6;}
.hv-hero-title{font-size:clamp(2.3rem,5.9vw,5.15rem);line-height:1;font-weight:700;letter-spacing:-.02em;color:#fff;margin:0 0 1.05rem;text-shadow:0 4px 40px rgba(0,0,0,.4);}
.hv-grad{background:linear-gradient(92deg,#7fb2ff,#c9dcff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.hv-hero-sub{font-size:clamp(1rem,1.05vw,1.05rem);line-height:1.75;color:#fff;max-width:35rem;margin:0 0 1.55rem;}
.hv-hero-cta{display:flex;flex-wrap:wrap;gap:.85rem;}
.hv-hero-bar{position:relative;z-index:2;border-top:1px solid rgba(255,255,255,.16);background:rgba(6,15,42,.35);backdrop-filter:blur(4px);}
.hv-hero-bar{display:flex;flex-wrap:wrap;max-width:1240px;margin:clamp(1.6rem,3vw,2.4rem) auto 0;width:100%;}
.hv-hero-bar span{flex:1 1 auto;min-width:160px;padding:1.1rem clamp(1.15rem,4vw,3.2rem);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.82);font-weight:600;border-right:1px solid rgba(255,255,255,.12);text-align:center;}
.hv-hero-bar span:last-child{border-right:none;}
@media(max-width:640px){.hv-hero-bar span{flex-basis:50%;border-bottom:1px solid rgba(255,255,255,.1);}}
/* hero entrance — GPU-only (transform + opacity), same rise-and-fade motion &
   easing as the Who-We-Are reveal. No filter:blur here on purpose: animating
   blur on the huge hero title repaints on the main thread and stutters while
   the page hydrates (badly on mobile). transform + opacity stay on the
   compositor thread, so this is smooth even during load. */
@keyframes hvRise{from{opacity:0;transform:translateY(34px);}to{opacity:1;transform:none;}}
.hv-hero-eyebrow,.hv-hero-title,.hv-hero-sub,.hv-hero-cta,.hv-hero-bar{will-change:transform,opacity;}
.hv-hero-eyebrow{animation:hvRise 1.1s cubic-bezier(.22,1,.36,1) .2s both;}
.hv-hero-title{animation:hvRise 1.2s cubic-bezier(.22,1,.36,1) .38s both;}
.hv-hero-sub{animation:hvRise 1.1s cubic-bezier(.22,1,.36,1) .6s both;}
.hv-hero-cta{animation:hvRise 1.1s cubic-bezier(.22,1,.36,1) .78s both;}
.hv-hero-bar{animation:hvRise 1.2s cubic-bezier(.22,1,.36,1) .95s both;}
@media(prefers-reduced-motion:reduce){.hv-hero-eyebrow,.hv-hero-title,.hv-hero-sub,.hv-hero-cta,.hv-hero-bar{animation:none;}}

/* ── section rhythm ── */
.hv-manifesto,.hv-prog,.hv-why,.hv-campus,.hv-video,.hv-voices,.hv-contact{padding:clamp(3.4rem,7vw,6.5rem) 0;}
.hv-why{background:var(--tintt);}
.hv-voices{background:var(--tintt);}

/* ── who we are ── */
.hv-mani-grid{display:grid;grid-template-columns:.92fr 1.08fr;gap:clamp(2rem,5vw,4.5rem);align-items:start;}
/* offset the text column down so left/right sit on a gentle diagonal */
.hv-mani-right{padding-top:clamp(2rem,6vw,5rem);}
.hv-mani-h{font-size:clamp(2.3rem,4.8vw,4rem);line-height:1;font-weight:700;margin:.35rem 0 0;letter-spacing:-.015em;
  background:linear-gradient(90deg,#0D0D0D 0%,#005C9F 62%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
/* accreditation grid — fills the Who-We-Are left column with a clean aligned grid */
.hv-accred-lead{margin:clamp(1.4rem,3vw,2rem) 0 .9rem;font-size:.72rem;letter-spacing:.24em;text-transform:uppercase;color:var(--muted);font-weight:600;}
.hv-accred-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem;max-width:440px;}
.hv-accred-cell{aspect-ratio:1/1;background:#fff;border:1px solid var(--line);border-radius:10px;display:flex;align-items:center;justify-content:center;padding:15%;box-shadow:0 10px 24px -14px rgba(10,36,99,.35);transition:transform .25s ease,box-shadow .25s ease;}
.hv-accred-cell:hover{transform:translateY(-3px);box-shadow:0 16px 32px -14px rgba(10,36,99,.42);}
.hv-accred-img{width:100%;height:100%;object-fit:contain;}
@media(max-width:800px){.hv-accred-grid{max-width:420px;}}
@media(max-width:480px){.hv-accred-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:.6rem;}}
/* lead statement + rotating word */
.hv-mani-lead{font-size:clamp(1.35rem,2.5vw,2.05rem);line-height:1.5;font-weight:500;color:var(--ink);margin:0 0 1.5rem;}
.hv-lead-hl{color:var(--royal);font-style:italic;font-weight:600;}
.hv-rot{display:inline-block;font-style:italic;}
.hv-rot.in{animation:hvRotIn .62s cubic-bezier(.22,1,.36,1) both;}
.hv-rot.out{animation:hvRotOut .4s ease both;}
@keyframes hvRotIn{from{clip-path:inset(0 100% 0 0);filter:blur(5px);opacity:.35;}to{clip-path:inset(0 0 0 0);filter:blur(0);opacity:1;}}
@keyframes hvRotOut{from{clip-path:inset(0 0 0 0);opacity:1;filter:blur(0);}to{clip-path:inset(0 0 0 100%);opacity:0;filter:blur(3px);}}
@media(prefers-reduced-motion:reduce){.hv-rot.in,.hv-rot.out{animation:none;}}
.hv-mani-links{display:flex;flex-wrap:wrap;gap:1.6rem;margin-top:.4rem;}
.hv-textlink{display:inline-flex;align-items:center;gap:.4rem;font-family:${cinzel.style.fontFamily};font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;font-weight:600;color:var(--navy);text-decoration:none;border-bottom:1px solid transparent;padding-bottom:2px;transition:border-color .2s,color .2s;}
.hv-textlink:hover{color:var(--royal);border-color:var(--royal);}
@media(max-width:800px){
  .hv-mani-grid{grid-template-columns:1fr;text-align:center;}
  .hv-mani-left{display:flex;flex-direction:column;align-items:center;}
  .hv-mani-right{padding-top:0;}
  .hv-manifesto .hv-eyebrow{justify-content:center;}
  .hv-accred-grid{margin-left:auto;margin-right:auto;}
  .hv-mani-links{justify-content:center;}
}

/* ── programmes: alternating feature ── */
.hv-prog{background:#fff;}
/* "Crafted for the Bold" title block (matches the current homepage treatment) */
.hv-craft-head{text-align:center;max-width:800px;margin:0 auto clamp(2.6rem,4vw,3.8rem);}
.hv-craft-eyebrow{display:flex;align-items:center;justify-content:center;gap:.85rem;font-size:.72rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(10,36,99,.55);font-weight:600;margin-bottom:1.1rem;}
.hv-craft-dash{display:inline-block;width:22px;height:1.5px;background:var(--navy);}
.hv-craft-title{font-size:clamp(2.2rem,5.6vw,5.4rem);font-weight:700;color:#0b0f18;line-height:1;letter-spacing:-.015em;margin:0;white-space:nowrap;}
.hv-craft-kicker{margin:.75rem 0 0;font-size:.72rem;letter-spacing:.34em;text-transform:uppercase;font-weight:600;color:var(--royal);}
.hv-craft-div{width:44px;height:2px;background:var(--navy);margin:1.05rem auto;}
@media(max-width:560px){.hv-craft-title{white-space:normal;}}
.hv-craft-sub{font-size:1rem;color:rgba(10,36,99,.55);max-width:560px;margin:0 auto;line-height:1.85;}
/* per-element entry animation on the feature (image slides in, copy rises) */
.hv-js .hv-feat-media.rv{opacity:0;transform:translateX(-46px);}
.hv-js .hv-feat-rev .hv-feat-media.rv{transform:translateX(46px);}
.hv-js .hv-feat-copy.rv{opacity:0;transform:translateY(32px);}
.hv-js .hv-feat-media.rv.rv-in,.hv-js .hv-feat-copy.rv.rv-in{opacity:1;transform:none;}
.hv-feat{max-width:1240px;margin:0 auto;padding:clamp(2rem,4vw,3.4rem) clamp(1.15rem,4vw,3.2rem);display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(2rem,5vw,4.5rem);align-items:stretch;}
.hv-feat-rev .hv-feat-media{order:2;}
.hv-feat-media{position:relative;}
.hv-feat-img{position:absolute;inset:0;border-radius:4px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(10,36,99,.5);}
.hv-feat-img::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,36,99,0) 55%,rgba(10,36,99,.5));}
.hv-feat-ghost{position:absolute;left:.4rem;bottom:-.15em;z-index:2;font-size:clamp(4rem,9vw,8rem);font-weight:900;line-height:1;color:rgba(255,255,255,.16);letter-spacing:-.04em;pointer-events:none;}
.hv-feat-index{display:block;font-size:1.1rem;font-weight:700;color:var(--royal);letter-spacing:.1em;margin-bottom:.9rem;}
.hv-feat-badge{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600;margin:0 0 .8rem;}
.hv-feat-title{font-size:clamp(1.5rem,2.6vw,2.3rem);line-height:1.1;font-weight:700;color:var(--navy);margin:0 0 .5rem;}
.hv-feat-tag{font-size:1.05rem;font-style:italic;color:var(--royal);margin:0 0 1.1rem;}
.hv-feat-hl{list-style:none;margin:0 0 1.6rem;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:.6rem 1.4rem;}
.hv-feat-hl li{position:relative;padding-left:1.3rem;font-size:.72rem;letter-spacing:.05em;text-transform:uppercase;color:#33404f;font-weight:600;line-height:1.5;}
.hv-feat-hl li::before{content:"";position:absolute;left:0;top:.35em;width:8px;height:8px;border:2px solid var(--royal);border-radius:50%;}
.hv-feat-cta{display:flex;flex-wrap:wrap;gap:.7rem;}
@media(max-width:860px){
  .hv-feat{grid-template-columns:1fr;gap:1.6rem;padding-left:clamp(1.4rem,6vw,2.4rem);padding-right:clamp(1.4rem,6vw,2.4rem);}
  .hv-feat-img{position:relative;inset:auto;aspect-ratio:16/12;height:auto;}
  .hv-feat-rev .hv-feat-media{order:0;}
  /* Mobile: centred, stacked, standard layout — not the laptop's left/right diagonal. */
  .hv-feat-copy{display:flex;flex-direction:column;align-items:center;text-align:center;}
  .hv-feat-hl{grid-template-columns:1fr 1fr;max-width:360px;margin-left:auto;margin-right:auto;text-align:left;}
  .hv-feat-cta{justify-content:center;}
  /* Kill the horizontal slide that pushed images half off-screen on phones;
     use a gentle vertical rise instead so the whole image stays visible. */
  .hv-js .hv-feat-media.hv-2way,
  .hv-js .hv-feat-rev .hv-feat-media.hv-2way{transform:translateY(26px) scale(.98);}
}
@media(max-width:460px){.hv-feat-hl{grid-template-columns:1fr;max-width:230px;}}

/* ── why: editorial list ── */
.hv-why-list{display:grid;grid-template-columns:1fr 1fr;gap:0 clamp(2rem,5vw,5rem);}
.hv-why-row{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:1.3rem;padding:1.7rem 0;border-top:1px solid var(--line);}
.hv-why-n{grid-row:1/3;font-size:1.5rem;font-weight:700;color:var(--royal);opacity:.9;line-height:1;padding-top:.15rem;}
.hv-why-t{margin:0 0 .5rem;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--navy);}
.hv-why-b{margin:0;font-size:.95rem;line-height:1.75;color:#4a5563;}
@media(max-width:800px){.hv-why-list{grid-template-columns:1fr;}}

/* ── numbers band ── */
.hv-nums{background:linear-gradient(150deg,#06133a,var(--navy) 60%,#0b2c78);padding:clamp(3.4rem,7vw,6rem) 0;position:relative;overflow:hidden;}
.hv-nums::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:36px 36px;opacity:.5;}
.hv-sec-head-light{position:relative;}
.hv-nums-row{position:relative;display:flex;flex-wrap:wrap;border:1px solid rgba(255,255,255,.14);border-radius:4px;}
.hv-num{flex:1 1 33.33%;min-width:150px;padding:2rem 1rem;text-align:center;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);}
.hv-num-v{display:block;font-size:clamp(1.8rem,3vw,2.7rem);font-weight:700;color:#fff;line-height:1;}
.hv-num-l{display:block;margin-top:.6rem;font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;color:#9db2d8;}
@media(min-width:641px){.hv-num:nth-child(3n){border-right:none;}.hv-num:nth-child(n+4){border-bottom:none;}}
@media(max-width:640px){.hv-num{flex-basis:50%;}.hv-num:nth-child(2n){border-right:none;}}

/* ── ORBIT (placements) ── */
.hv-orbit{position:relative;overflow:hidden;padding:clamp(3.4rem,7vw,5.5rem) 0 clamp(2rem,4vw,3rem);
  background:radial-gradient(120% 90% at 50% 12%,#0d2f7a 0%,#0a2463 42%,#050f2c 100%);}
.hv-orbit-stars{position:absolute;inset:0;background-image:
  radial-gradient(1.5px 1.5px at 20% 30%,rgba(255,255,255,.7),transparent),
  radial-gradient(1.5px 1.5px at 70% 20%,rgba(255,255,255,.5),transparent),
  radial-gradient(1px 1px at 40% 70%,rgba(255,255,255,.6),transparent),
  radial-gradient(1px 1px at 85% 60%,rgba(255,255,255,.45),transparent),
  radial-gradient(1.5px 1.5px at 55% 85%,rgba(255,255,255,.5),transparent),
  radial-gradient(1px 1px at 12% 80%,rgba(255,255,255,.5),transparent);
  opacity:.7;}
.hv-orbit-top{position:relative;z-index:2;text-align:center;max-width:720px;}
.hv-orbit-top>div{display:inline-flex;flex-direction:column;align-items:center;}
.hv-orbit-top .hv-eyebrow{justify-content:center;}
.hv-orbit-sub{color:#bcd0ef;font-size:1rem;line-height:1.7;margin:.9rem 0 1.6rem;max-width:36rem;}
.hv-orbit-stage{position:relative;z-index:1;height:clamp(360px,52vw,560px);margin-top:clamp(1rem,3vw,2rem);
  perspective:1300px;display:flex;align-items:center;justify-content:center;}
.hv-orbit-core{position:absolute;z-index:5;width:clamp(96px,13vw,140px);height:clamp(96px,13vw,140px);border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.15rem;
  background:radial-gradient(circle at 38% 32%,#2a5fc4,#0a2463 70%);
  box-shadow:0 0 0 1px rgba(255,255,255,.18),0 0 60px rgba(56,110,220,.6),inset 0 0 30px rgba(0,0,0,.4);}
.hv-core-v{font-size:clamp(1.2rem,2.4vw,1.9rem);font-weight:800;color:#fff;line-height:1;}
.hv-core-l{font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:#a9c1e8;}
.hv-ring{position:absolute;transform-style:preserve-3d;left:50%;top:50%;width:0;height:0;--r-out:clamp(180px,26vw,300px);--r-in:clamp(110px,16vw,188px);}
.hv-ring-out{animation:hvSpin 34s linear infinite;transform:rotateX(72deg);}
.hv-ring-in{animation:hvSpinR 26s linear infinite;transform:rotateX(72deg);}
@keyframes hvSpin{from{transform:rotateX(72deg) rotateY(0);}to{transform:rotateX(72deg) rotateY(360deg);}}
@keyframes hvSpinR{from{transform:rotateX(72deg) rotateY(0);}to{transform:rotateX(72deg) rotateY(-360deg);}}
.hv-planet{position:absolute;left:0;top:0;transform-style:preserve-3d;}
.hv-disc{display:flex;align-items:center;justify-content:center;width:clamp(58px,8vw,84px);height:clamp(58px,8vw,84px);
  margin:calc(clamp(58px,8vw,84px) / -2);border-radius:50%;background:#fff;
  box-shadow:0 8px 22px rgba(0,0,0,.35),0 0 0 4px rgba(255,255,255,.08);
  transform:rotateX(-72deg);/* billboard: undo the ring tilt so discs face the viewer */}
.hv-disc-sm{width:clamp(44px,6vw,64px);height:clamp(44px,6vw,64px);margin:calc(clamp(44px,6vw,64px) / -2);}
.hv-disc-img{width:72%;height:72%;object-fit:contain;}
.hv-orbit-flat{display:none;}
@media(prefers-reduced-motion:reduce){
  .hv-orbit-stage{display:none;}
  .hv-orbit-flat{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;max-width:900px;margin:2rem auto 0;position:relative;z-index:1;}
}

/* ── campus film strip ── */
.hv-campus{background:#fff;padding-bottom:clamp(3.4rem,7vw,6rem);}
.hv-film{overflow:hidden;margin:clamp(1rem,2vw,2rem) 0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);}
.hv-film-track{display:flex;gap:1rem;width:max-content;animation:hvFilm 48s linear infinite;}
@keyframes hvFilm{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.hv-film-cell{position:relative;flex:0 0 auto;width:clamp(230px,30vw,380px);height:clamp(300px,38vw,460px);border-radius:4px;overflow:hidden;box-shadow:0 24px 50px -22px rgba(10,36,99,.5);}
@media(prefers-reduced-motion:reduce){.hv-film-track{animation:none;flex-wrap:wrap;width:100%;justify-content:center;}}

/* ── video ── */
.hv-video-frame{position:relative;max-width:1040px;margin:0 auto;aspect-ratio:16/9;border-radius:6px;overflow:hidden;background:#000;box-shadow:0 40px 80px -30px rgba(10,36,99,.6);}
.hv-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}
.hv-video-facade{position:absolute;inset:0;width:100%;height:100%;border:0;cursor:pointer;padding:0;background:#000;}
.hv-video-facade::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(6,15,42,.55),rgba(6,15,42,.2));}
.hv-video-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2;width:74px;height:74px;border-radius:50%;
  background:var(--royal);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 10px rgba(255,255,255,.14),0 14px 34px rgba(0,0,0,.4);transition:transform .2s;}
.hv-video-facade:hover .hv-video-play{transform:translate(-50%,-50%) scale(1.08);}

/* ── voices ── */
.hv-voices-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;}
.hv-voice{position:relative;padding:2rem 1.6rem 1.6rem;background:#fff;border-radius:4px;box-shadow:0 20px 50px -30px rgba(10,36,99,.4);display:flex;flex-direction:column;gap:1.2rem;}
.hv-voice-mark{position:absolute;top:.4rem;left:1.1rem;font-size:3.2rem;color:rgba(0,92,159,.14);line-height:1;}
.hv-voice-q{position:relative;font-size:.98rem;line-height:1.72;color:#38414e;margin:.6rem 0 0;font-style:italic;}
.hv-voice-by{display:flex;align-items:center;gap:.7rem;margin-top:auto;}
.hv-voice-av{width:42px;height:42px;border-radius:50%;object-fit:cover;flex-shrink:0;box-shadow:0 0 0 3px var(--tint);}
.hv-voice-by span{display:flex;flex-direction:column;}
.hv-voice-by strong{font-size:.78rem;letter-spacing:.03em;color:var(--navy);text-transform:uppercase;font-weight:600;}
.hv-voice-by em{font-size:.76rem;color:var(--muted);font-style:normal;}
@media(max-width:1000px){.hv-voices-row{grid-template-columns:1fr 1fr;}}
@media(max-width:560px){.hv-voices-row{grid-template-columns:1fr;}}

/* ── social band ── */
.hv-social{background:linear-gradient(120deg,var(--navy),#123a8f);padding:clamp(3rem,6vw,5rem) 0;}
.hv-social-in{display:grid;grid-template-columns:1fr 1.35fr;gap:clamp(1.6rem,3vw,3rem);align-items:center;}
.hv-social-row{display:grid;grid-template-columns:repeat(4,1fr);gap:.9rem;}
.hv-social-link{display:flex;flex-direction:column;gap:.7rem;padding:1.3rem 1.1rem;border:1px solid rgba(255,255,255,.18);border-radius:3px;color:#fff;text-decoration:none;transition:background .2s,transform .2s,border-color .2s;}
.hv-social-link:hover{transform:translateY(-4px);background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.4);}
.hv-social-h{font-size:.72rem;color:#c7d6ee;word-break:break-word;}
@media(max-width:820px){.hv-social-in{grid-template-columns:1fr;}}
@media(max-width:520px){.hv-social-row{grid-template-columns:1fr 1fr;}}

/* ── admissions band ── */
.hv-admit{background:linear-gradient(135deg,#0a2463,#005C9F);position:relative;overflow:hidden;padding:clamp(3.2rem,6vw,5rem) 0;}
.hv-admit::before{content:"";position:absolute;right:-8%;top:-60%;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.12),transparent 66%);}
.hv-admit-in{position:relative;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;}
.hv-admit-title{font-size:clamp(1.7rem,3.6vw,3rem);line-height:1.06;font-weight:700;color:#fff;margin:0;letter-spacing:-.01em;max-width:34rem;}
.hv-admit-sub{color:#d3e0f3;font-size:1.02rem;line-height:1.7;margin:.9rem 0 0;}
.hv-admit-cta{display:flex;flex-wrap:wrap;gap:.85rem;}
.hv-admit .hv-btn-solid{background:#fff;color:var(--navy);}
.hv-admit .hv-btn-solid:hover{background:#eef4ff;}

/* ── contact ── */
.hv-contact-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(2rem,4vw,3.6rem);}
.hv-contact-list{list-style:none;margin:1.6rem 0;padding:0;display:flex;flex-direction:column;gap:1.15rem;}
.hv-contact-list li{display:flex;gap:.85rem;align-items:flex-start;font-size:.98rem;line-height:1.6;color:#39424f;}
.hv-contact-list svg{color:var(--royal);flex-shrink:0;margin-top:.15rem;}
.hv-contact-list a{color:var(--royal);text-decoration:none;}
.hv-contact-list a:hover{text-decoration:underline;}
.hv-contact-cta{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:.4rem;}
.hv-accred{background:var(--tintt);border:1px solid var(--line);border-radius:4px;padding:1.7rem;display:flex;flex-direction:column;gap:1.4rem;justify-content:center;}
.hv-accred-h{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin:0;font-weight:700;}
.hv-accred-row{display:flex;flex-wrap:wrap;gap:1.1rem;align-items:center;}
.hv-accred-logo img{height:54px;width:auto;object-fit:contain;}
.hv-accred-social{display:flex;gap:.85rem;}
.hv-accred-social a{width:42px;height:42px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--navy);background:#fff;transition:transform .2s,color .2s,border-color .2s;}
.hv-accred-social a:hover{transform:translateY(-3px);color:var(--royal);border-color:var(--royal);}
@media(max-width:820px){.hv-contact-grid{grid-template-columns:1fr;}}
`;
