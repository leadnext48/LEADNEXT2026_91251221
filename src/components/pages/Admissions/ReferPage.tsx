'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cinzel, playfair } from '@/app/fonts';
import { Users, UserCheck, GraduationCap, Trophy } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BLUE = '#005C9F';
const DARK = '#07111C';

const STEPS = [
  { icon: UserCheck,     title: 'Share Their Details', body: 'Enter the prospective student’s name and contact, along with your own details.' },
  { icon: GraduationCap, title: 'They Apply',           body: 'Our admissions team reaches out and guides your referral through the MBA / MCA application.' },
  { icon: Trophy,        title: 'Claim Your MG',        body: 'Every referral is tracked to your Mentor Group — so your MG claim is recorded accurately.' },
];

export default function ReferPage() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (hero) {
        const eyebrow = hero.querySelector('.ref-eyebrow') as HTMLElement | null;
        const title = titleRef.current;
        const sub = hero.querySelector('.ref-hero-sub') as HTMLElement | null;
        const steps = hero.querySelectorAll('.ref-step');
        if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: -12 });
        if (title) gsap.set(title, { opacity: 0, y: 52 });
        if (sub) gsap.set(sub, { opacity: 0, y: 20 });
        if (steps.length) gsap.set(steps, { opacity: 0, y: 18 });
        const tl = gsap.timeline({ delay: 0.08, defaults: { ease: 'power3.out' } });
        if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.55 });
        if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.9 }, '-=0.25');
        if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.7 }, '-=0.45');
        if (steps.length) tl.to(steps, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.3');
      }
      const body = bodyRef.current;
      if (body) {
        const hdr = body.querySelector('.ref-form-hdr');
        const card = body.querySelector('.ref-form-card');
        [hdr, card].forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { opacity: 0, y: i === 0 ? -10 : 32 });
          gsap.to(el, {
            opacity: 1, y: 0, duration: i === 0 ? 0.65 : 0.8, delay: i === 0 ? 0 : 0.12,
            ease: 'power3.out', scrollTrigger: { trigger: body, start: 'top 80%' },
          });
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* Hide hero elements before GSAP runs so they animate in cleanly (no flash) */
        .ref-hero .ref-eyebrow, .ref-hero .ref-hero-title, .ref-hero .ref-hero-sub, .ref-hero .ref-step { opacity: 0; }
        .ref-hero {
          min-height: 100svh; background: #fff; display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
          padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 10vw, 9rem) clamp(3rem, 6vh, 5rem);
          box-sizing: border-box;
        }
        .ref-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(0,92,159,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,92,159,0.04) 1px, transparent 1px);
          background-size: 80px 80px; pointer-events: none; z-index: 0;
        }
        .ref-hero-bg-text {
          position: absolute; right: -0.04em; bottom: -0.16em; font-family: var(--font-cinzel, serif);
          font-size: clamp(9rem, 26vw, 34rem); font-weight: 800; line-height: 1;
          color: rgba(0,92,159,0.03); pointer-events: none; user-select: none; z-index: 0; letter-spacing: -0.06em; white-space: nowrap;
        }
        .ref-hero-inner { position: relative; z-index: 2; max-width: 1000px; }
        .ref-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: clamp(0.7rem, 1.5vh, 1.2rem); }
        .ref-hero-title { font-size: clamp(2rem, 5.5vw, 6.5rem); font-weight: 800; line-height: 0.92; letter-spacing: -0.03em; text-transform: uppercase; margin: 0 0 clamp(1rem, 2vh, 1.6rem); }
        .ref-hero-sub { max-width: 560px; }
        .ref-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(1rem, 2vw, 1.6rem); margin-top: clamp(2rem, 4vh, 3rem); }
        .ref-step { display: flex; flex-direction: column; gap: 0.6rem; padding: clamp(1rem, 2vw, 1.4rem); border: 1px solid rgba(0,92,159,0.10); border-radius: 8px; background: #fff; }
        .ref-step-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(0,92,159,0.07); border: 1px solid rgba(0,92,159,0.12); display: flex; align-items: center; justify-content: center; }
        @media (max-width: 820px) { .ref-steps { grid-template-columns: 1fr; } }
        .ref-form-section { background: #fff; padding: clamp(3.5rem, 8vh, 7rem) clamp(1.5rem, 10vw, 9rem); border-top: 1px solid rgba(0,92,159,0.08); }
        .ref-form-card { max-width: 780px; margin: clamp(2rem, 4vh, 3rem) auto 0; border: 1px solid rgba(0,92,159,0.10); border-radius: 16px; box-shadow: 0 18px 55px rgba(0,92,159,0.10); padding: clamp(1rem, 2.5vw, 1.75rem); background: #fff; }
      `}</style>

      <div className="overflow-x-hidden">
        {/* HERO */}
        <section ref={heroRef} className="ref-hero">
          <div className="ref-hero-bg-text" aria-hidden="true">REFER</div>
          <div className="ref-hero-inner">
            <div className="ref-eyebrow">
              <span style={{ display: 'inline-block', width: 28, height: 1.5, background: BLUE }} />
              <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.66rem, 0.8vw, 0.74rem)', letterSpacing: '0.32em', textTransform: 'uppercase', color: BLUE, fontWeight: 600 }}>
                Admissions — Referral Programme
              </span>
            </div>
            <h1 ref={titleRef} className="ref-hero-title" style={{ fontFamily: cinzel.style.fontFamily }}>
              <span style={{ display: 'block', color: '#0D0D0D' }}>Refer a</span>
              <span style={{ display: 'block', background: `linear-gradient(90deg, ${BLUE} 0%, #1e3a8a 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>Student.</span>
            </h1>
            <div className="ref-hero-sub">
              <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${BLUE}, #1e3a8a)`, marginBottom: 'clamp(1rem, 2vh, 1.6rem)' }} />
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.88rem, 1.05vw, 1rem)', lineHeight: 1.85, color: '#111', margin: 0 }}>
                Know a future MBA or MCA student? Refer them to LEAD College and help them begin their journey. Submit the details below and our admissions team will take it forward &mdash; every referral is tracked to your Mentor Group (MG) for your claim.
              </p>
            </div>

            <div className="ref-steps">
              {STEPS.map((s) => (
                <div key={s.title} className="ref-step">
                  <span className="ref-step-icon"><s.icon size={18} color={BLUE} strokeWidth={1.6} /></span>
                  <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.6rem, 0.8vw, 0.72rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: DARK, margin: 0 }}>{s.title}</p>
                  <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.92rem, 0.9vw, 1rem)', lineHeight: 1.7, color: '#111', margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM */}
        <section ref={bodyRef} className="ref-form-section">
          <div className="ref-form-hdr" style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(0.66rem, 0.78vw, 0.74rem)', letterSpacing: '0.28em', textTransform: 'uppercase', color: BLUE, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '0.6rem' }}>
              <span style={{ display: 'inline-block', width: 18, height: 1.5, background: BLUE }} />
              MG Claim
            </p>
            <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: 'clamp(1.3rem, 2.5vw, 2.8rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', color: DARK, margin: 0, lineHeight: 1.1 }}>
              Referral Form
            </h2>
            <p style={{ fontFamily: playfair.style.fontFamily, fontSize: 'clamp(0.92rem, 0.95vw, 1rem)', color: '#111', margin: '0.8rem auto 0', maxWidth: 480, lineHeight: 1.7 }}>
              Fill in the details below. All information is submitted securely to the LEAD admissions team.
            </p>
          </div>

          <div className="ref-form-card">
            <div className="npf_wgts" data-height="500px" data-w="330b6c013d72f1c5eeac87222b4bcdeb" />
          </div>
        </section>
      </div>

      {/* Meritto (NoPaperForms) inline widget loader — scoped to this page */}
      <Script src="https://widgets.in8.nopaperforms.com/emwgts.js" strategy="afterInteractive" />
    </>
  );
}
