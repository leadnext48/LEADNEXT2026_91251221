'use client';
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { cinzel, playfair } from "@/app/fonts";

const BLUE = "#005C9F";
const DARK = "#07111C";

/* ─── Repeat-in-view hook ────────────────────────────────────────────────── */
function useRepeatInView(
  onEnter: () => void,
  onLeave?: () => void,
  threshold = 0.12
) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onEnter();
        else onLeave?.();
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onEnter, onLeave]);
  return ref;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
type PillarBody = string | string[];   // string = prose, string[] = bullet list

interface Pillar {
  label: string;
  body: PillarBody;
  img: string;
  imgAlt: string;
}

const pillars: Pillar[] = [
  {
    label: "Our Vision",
    body: "To be a LEADER in management and technology education focusing on developing Leaders and Entrepreneurs.",
    img: "/convert/LEAD51.webp",
    imgAlt: "Person looking toward horizon, representing vision",
  },
  {
    label: "Our Mission",
    body: [
      "Contribute to and Enable: The development of individuals to enhance their competencies as Business Leaders and Entrepreneurs.",
      "Create and Deliver: Teaching learning platforms and curricula which embrace innovation and deliver contemporary knowledge and skills.",
      "Engage and Empower: Industry and societal stakeholders through outreach and extension activities.",
      "Innovate and Execute: Region-specific research, industry and society-based solutions.",
    ],
    img: "/convert/LEAD46.webp",
    imgAlt: "Students collaborating together, representing mission",
  },
  {
    label: "Values",
    body: [
      "Transparency",
      "Fair Play",
      "Ethics",
      "Sustainability",
    ],
    img: "/convert/LEAD45.webp",
    imgAlt: "Team working together, representing core values",
  },
];

const MBA_DATA = {
  peo: [
    { n: "PEO1", body: "Apply advanced management and entrepreneurial knowledge to create innovative business solutions." },
    { n: "PEO2", body: "Demonstrate ethical, analytical, and leadership skills for responsible decision-making." },
    { n: "PEO3", body: "Exhibit strong communication, teamwork, and adaptability for professional excellence." },
    { n: "PEO4", body: "Consistently uphold constitutional, ethical, and humanistic values in all endeavours." },
  ],
  po: [
    { n: "PO1", title: "Problem Solving",        body: "Apply knowledge of management theories and practices to solve business problems." },
    { n: "PO2", title: "Decision-Making",         body: "Foster analytical and critical thinking abilities for data-based decision making." },
    { n: "PO3", title: "Value-Based Leadership",  body: "Develop the ability to provide value-based leadership that drives ethical organisational culture." },
    { n: "PO4", title: "Communication",           body: "Understand, analyze, and communicate the global, economic, legal, and ethical aspects of business." },
    { n: "PO5", title: "Teamwork",                body: "Lead themselves and others in achieving organisational goals, while contributing effectively to team environments." },
  ],
  pso: [
    { n: "PSO1", title: "Entrepreneurial Leadership & Initiative", body: "Demonstrate an entrepreneurial mindset by proactively identifying opportunities and mobilizing resources to lead effectively in a complex global business environment." },
    { n: "PSO2", title: "Holistic Professional Competency",        body: "Integrate core management principles with modern digital and information technology skills to drive innovation and navigate the future of business." },
  ],
};

const MCA_DATA = {
  peo: [
    { n: "PEO1", body: "Graduates would demonstrate a comprehensive understanding of computer applications and emerging technologies, with an ability to analyze and solve complex problems in diverse domains." },
    { n: "PEO2", body: "Graduates will possess essential technical, analytical, and professional skills, along with leadership abilities, to effectively manage projects and contribute to team success in the IT industry." },
    { n: "PEO3", body: "Graduates will have the practical experience, industry-relevant skills, and an entrepreneurial mindset to excel in technology-driven careers." },
    { n: "PEO4", body: "Graduates will achieve an appreciation for ethical practices, human values, and social responsibility, preparing graduates to contribute positively to society and the technology landscape." },
  ],
  po: [
    { n: "PO1", title: "Computational Knowledge",       body: "Apply knowledge of computing fundamentals and domain-specific concepts to create effective computing solutions." },
    { n: "PO2", title: "Problem Analysis",              body: "Identify, analyze, and solve complex computing problems using foundational and domain-specific principles." },
    { n: "PO3", title: "Design & Development",          body: "Design and develop solutions that meet specific needs, considering public health, safety, cultural, societal, and environmental aspects." },
    { n: "PO4", title: "Research & Lifelong Learning",  body: "Conduct investigations using research-based knowledge and recognize the importance of lifelong learning to adapt to technological advancements." },
    { n: "PO5", title: "Ethics & Societal Impact",      body: "Apply ethical principles and assess societal, environmental, and cultural impacts of computing solutions, adhering to relevant standards." },
    { n: "PO6", title: "Project Management",            body: "Apply management principles to plan, organize, and execute computing projects effectively as a team member or leader." },
    { n: "PO7", title: "Teamwork & Communication",      body: "Communicate effectively and function as an individual or leader in diverse teams, fostering collaboration and multidisciplinary engagement." },
    { n: "PO8", title: "Innovation & Entrepreneurship", body: "Identify opportunities and engage in innovative and entrepreneurial activities to address emerging needs in computing technologies." },
  ],
  pso: [
    { n: "PSO1", title: "Software Solutions & System Innovation",          body: "Apply advanced computational knowledge and modern development tools to design, develop, and deploy intelligent, secure, and scalable software systems that address real-world and societal challenges." },
    { n: "PSO2", title: "Emerging Technologies & Entrepreneurial Practice", body: "Integrate and apply emerging technologies to innovate, research, and build technology-driven entrepreneurial solutions that contribute to sustainable digital transformation." },
  ],
};

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function VmHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const gsapPkg = await import("gsap");
      const gsap = (gsapPkg as any).gsap || (gsapPkg as any).default || gsapPkg;
      if (cancelled || !rootRef.current) return;
      const els = rootRef.current.querySelectorAll<HTMLElement>(".vm-h-child");
      gsap.timeline({ delay: 0.25 }).to(els, {
        rotationX: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)",
        transformOrigin: "center top", ease: "power3.inOut", duration: 0.9, stagger: 0.1,
      });
    })();
    return () => { cancelled = true; };
  }, []);

  const init: CSSProperties = {
    transformStyle: "preserve-3d", backfaceVisibility: "hidden",
    transformOrigin: "center top", opacity: 1,
    transform: "none", filter: "none",
  };

  return (
    <div className="vmh-root" ref={rootRef}>
      <div className="vmh-corner vmh-tl" aria-hidden="true" />
      <div className="vmh-corner vmh-br" aria-hidden="true" />
      <div className="vmh-content">
        <div className="vm-h-child vmh-eyebrow" style={{ ...init, fontFamily: cinzel.style.fontFamily }}>
          <span className="vmh-eyebrow-line" />
          LEAD College
        </div>
        <h1 className="vm-h-child vmh-title" style={{ ...init, fontFamily: cinzel.style.fontFamily }}>
          Vision &amp; Mission
        </h1>
        <p className="vm-h-child vmh-subtitle" style={{ ...init, fontFamily: playfair.style.fontFamily }}>
          Guiding principles that shape every mind, every decision, and every graduate
          who walks through our doors.
        </p>
      </div>
    </div>
  );
}

/* ─── Pillar body renderer ───────────────────────────────────────────────── */
function PillarBodyContent({ body, fontFamily }: { body: PillarBody; fontFamily: string }) {
  if (typeof body === "string") {
    return (
      <p className="pcard-body" style={{ fontFamily }}>{body}</p>
    );
  }
  return (
    <ul className="pcard-bullets">
      {body.map((item, i) => (
        <li key={i} className="pcard-bullet-item">
          <span className="pcard-bullet-dot" aria-hidden="true" />
          <span className="pcard-body" style={{ fontFamily }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Pillar row ─────────────────────────────────────────────────────────── */
function PillarRow({ pillar, index }: { pillar: Pillar; index: number }) {
  const rowRef  = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const delay   = index * 0.06;

  const animateIn = React.useCallback(() => {
    [numRef.current, textRef.current, imgRef.current].forEach(el => {
      if (!el) return;
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = el === imgRef.current ? "translateY(24px) scale(0.97)" : "translateY(28px)";
    });
    if (ruleRef.current) { ruleRef.current.style.transition = "none"; ruleRef.current.style.width = "0"; }
    rowRef.current?.getBoundingClientRect();
    setTimeout(() => {
      if (numRef.current) {
        numRef.current.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
        numRef.current.style.opacity = "1"; numRef.current.style.transform = "translateY(0)";
      }
      if (textRef.current) {
        textRef.current.style.transition = `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay+0.07}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay+0.07}s`;
        textRef.current.style.opacity = "1"; textRef.current.style.transform = "translateY(0)";
      }
      if (imgRef.current) {
        imgRef.current.style.transition = `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay+0.14}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay+0.14}s`;
        imgRef.current.style.opacity = "1"; imgRef.current.style.transform = "translateY(0) scale(1)";
      }
      if (ruleRef.current) {
        ruleRef.current.style.transition = `width 0.9s cubic-bezier(0.22,1,0.36,1) ${delay+0.2}s`;
        ruleRef.current.style.width = "100%";
      }
    }, 0);
  }, [delay]);

  const animateOut = React.useCallback(() => {
    [numRef.current, textRef.current, imgRef.current].forEach(el => {
      if (!el) return;
      el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      el.style.opacity = "0";
      el.style.transform = el === imgRef.current ? "translateY(24px) scale(0.97)" : "translateY(28px)";
    });
    if (ruleRef.current) { ruleRef.current.style.transition = "width 0.4s ease"; ruleRef.current.style.width = "0"; }
  }, []);

  const ref = useRepeatInView(animateIn, animateOut, 0.12);

  return (
    <div className="pcard" ref={ref}>
      <div ref={rowRef} style={{ display: "contents" }}>
        <div className="pcard-left">
          <span ref={numRef} className="pcard-index" style={{ fontFamily: cinzel.style.fontFamily, opacity: 0, transform: "translateY(28px)" }} aria-hidden="true">0{index + 1}</span>
          <div ref={textRef} className="pcard-text-wrap" style={{ opacity: 0, transform: "translateY(28px)" }}>
            <h2 className="pcard-label" style={{ fontFamily: cinzel.style.fontFamily }}>{pillar.label}</h2>
            <div className="pcard-divider" />
            <PillarBodyContent body={pillar.body} fontFamily={playfair.style.fontFamily} />
          </div>
        </div>
        <div ref={imgRef} className="pcard-img-wrap" style={{ opacity: 0, transform: "translateY(24px) scale(0.97)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pillar.img} alt={pillar.imgAlt} className="pcard-img" loading="lazy" decoding="async" />
        </div>
        <div ref={ruleRef} className="pcard-rule" style={{ width: 0 }} aria-hidden="true" />
      </div>
    </div>
  );
}

function PillarsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const animateHeader = React.useCallback(() => {
    const el = headerRef.current; if (!el) return;
    el.style.transition = "none"; el.style.opacity = "0"; el.style.transform = "translateY(20px)";
    el.getBoundingClientRect();
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    el.style.opacity = "1"; el.style.transform = "translateY(0)";
  }, []);
  const animateHeaderOut = React.useCallback(() => {
    const el = headerRef.current; if (!el) return;
    el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    el.style.opacity = "0"; el.style.transform = "translateY(20px)";
  }, []);
  const sectionRef = useRepeatInView(animateHeader, animateHeaderOut, 0.05);

  return (
    <section className="pillars-section" ref={sectionRef}>
      <div ref={headerRef} className="pillars-header" style={{ opacity: 0, transform: "translateY(20px)" }}>
        <div className="pillars-header-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
          <span className="ph-line" />Our Foundation
        </div>
      </div>
      {pillars.map((p, i) => (
        <PillarRow key={p.label} pillar={p} index={i} />
      ))}
    </section>
  );
}

/* ─── Programme Outcomes ─────────────────────────────────────────────────── */
type Dept   = "MBA" | "MCA";
type SubTab = "peo" | "po" | "pso";

const SUB_TABS: { key: SubTab; label: string; short: string }[] = [
  { key: "peo", label: "Programme Educational Objectives", short: "PEO" },
  { key: "po",  label: "Programme Outcomes",               short: "PO" },
  { key: "pso", label: "Programme Specific Outcomes",      short: "PSO" },
];

function ProgrammeOutcomes() {
  const [dept,   setDept]   = useState<Dept>("MBA");
  const [subTab, setSubTab] = useState<SubTab>("peo");

  const data  = dept === "MBA" ? MBA_DATA : MCA_DATA;

  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = listRef.current?.querySelectorAll<HTMLElement>(".po2-item");
    if (!els) return;
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "none";
      requestAnimationFrame(() => {
        el.style.transition = `opacity 0.45s ease ${i * 0.055}s, transform 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 0.055}s`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  }, [dept, subTab]);

  return (
    <section className="po2-section">

      <div className="po2-hdr">
        <div className="po2-eyebrow" style={{ fontFamily: cinzel.style.fontFamily }}>
          <span className="po2-eyebrow-line" />
          Outcome-Based Education
        </div>
        <div className="po2-hdr-row">
          <h2 className="po2-title" style={{ fontFamily: cinzel.style.fontFamily }}>
            Programme Objectives<br />
            <span className="po2-title-accent">&amp; Outcomes.</span>
          </h2>
          <div className="po2-dept-toggle">
            {(["MBA", "MCA"] as Dept[]).map(d => (
              <button
                key={d}
                className={`po2-dept-btn${dept === d ? " active" : ""}`}
                onClick={() => { setDept(d); setSubTab("peo"); }}
                style={{ fontFamily: cinzel.style.fontFamily }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="po2-subtabs">
        {SUB_TABS.map(t => (
          <button
            key={t.key}
            className={`po2-subtab${subTab === t.key ? " active" : ""}`}
            onClick={() => setSubTab(t.key)}
            style={{ fontFamily: cinzel.style.fontFamily }}
          >
            <span className="po2-subtab-short">{t.short}</span>
            <span className="po2-subtab-full">{t.label}</span>
          </button>
        ))}
      </div>

      <div ref={listRef} className={`po2-grid po2-grid--${subTab}`}>
        {subTab === "peo" && (data[subTab] as typeof MBA_DATA.peo).map((item) => (
          <div key={item.n} className="po2-item po2-peo-card">
            <span className="po2-ghost-num" aria-hidden="true">{item.n.replace(/\D/g, "")}</span>
            <div className="po2-num-badge" style={{ fontFamily: cinzel.style.fontFamily }}>{item.n}</div>
            <div className="po2-card-rule" />
            <p className="po2-body" style={{ fontFamily: playfair.style.fontFamily }}>{item.body}</p>
          </div>
        ))}
        {subTab === "po" && (data[subTab] as typeof MBA_DATA.po).map((item) => (
          <div key={item.n} className="po2-item po2-po-card">
            <span className="po2-ghost-num" aria-hidden="true">{item.n.replace(/\D/g, "")}</span>
            <div className="po2-po-top">
              <div className="po2-num-badge" style={{ fontFamily: cinzel.style.fontFamily }}>{item.n}</div>
              <p className="po2-po-title" style={{ fontFamily: cinzel.style.fontFamily }}>{item.title}</p>
            </div>
            <div className="po2-card-rule" />
            <p className="po2-body" style={{ fontFamily: playfair.style.fontFamily }}>{item.body}</p>
          </div>
        ))}
        {subTab === "pso" && (data[subTab] as typeof MBA_DATA.pso).map((item, i) => (
          <div key={item.n} className="po2-item po2-pso-card">
            <div className="po2-pso-orb" style={{ background: i === 0 ? `rgba(0,92,159,0.09)` : `rgba(30,58,138,0.07)`, borderColor: i === 0 ? `rgba(0,92,159,0.18)` : `rgba(30,58,138,0.14)` }}>
              <span className="po2-pso-orb-num" style={{ fontFamily: cinzel.style.fontFamily, color: i === 0 ? BLUE : "#1e3a8a" }}>{item.n}</span>
            </div>
            <div className="po2-pso-body">
              <p className="po2-pso-title" style={{ fontFamily: cinzel.style.fontFamily }}>{item.title}</p>
              <div className="po2-card-rule po2-card-rule--narrow" />
              <p className="po2-body" style={{ fontFamily: playfair.style.fontFamily }}>{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="po2-dept-watermark" aria-hidden="true" style={{ fontFamily: cinzel.style.fontFamily }}>{dept}</div>
    </section>
  );
}

/* ─── Root export ────────────────────────────────────────────────────────── */
export const VisionMissionPage: React.FC = () => (
  <div className="vm-root">
    <VmHero />
    <PillarsSection />
    <ProgrammeOutcomes />

    <style>{`
      .vm-root { background:#ffffff; color:#0d0d0d; overflow-x:clip; }
      .vm-root * { font-style:normal !important; }

      /* ══ HERO ══ */
      .vmh-root {
        position:relative; height:100svh; background:#ffffff;
        display:flex; align-items:center; justify-content:center;
        overflow:hidden; perspective:900px;
      }
      .vmh-corner { position:absolute; width:48px; height:48px; pointer-events:none; z-index:1; }
      .vmh-tl { top:28px;left:28px; border-top:1.5px solid rgba(0,92,159,0.28); border-left:1.5px solid rgba(0,92,159,0.28); }
      .vmh-br { bottom:28px;right:28px; border-bottom:1.5px solid rgba(0,92,159,0.28); border-right:1.5px solid rgba(0,92,159,0.28); }
      .vmh-content {
        position:relative; z-index:2; text-align:center;
        padding:0 clamp(1.5rem,5vw,4rem); transform-style:preserve-3d;
        display:flex; flex-direction:column; align-items:center;
        gap:clamp(0.8rem,1.5vh,1.4rem);
      }
      .vmh-eyebrow {
        display:flex; align-items:center; gap:0.8rem;
        font-size:clamp(0.66rem,0.85vw,0.74rem);
        letter-spacing:0.32em; text-transform:uppercase; color:${BLUE};
      }
      .vmh-eyebrow-line { width:28px; height:1px; background:${BLUE}; opacity:0.5; }
      .vmh-title {
        margin:0; font-size:clamp(2.8rem,7vw,7.5rem);
        font-weight:600; line-height:0.98; letter-spacing:-0.02em;
        background:linear-gradient(90deg,#0d0d0d 0%,${BLUE} 100%);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; color:transparent;
      }
      .vmh-subtitle { margin:0; max-width:560px; font-size:clamp(1rem,1.1vw,1rem); line-height:1.8; color:#111; }

      /* ══ PILLARS ══ */
      .pillars-section { background:#ffffff; padding:clamp(4rem,8vh,7rem) clamp(2rem,10vw,10rem); }
      .pillars-header { margin-bottom:clamp(2.5rem,5vh,4rem); }
      .pillars-header-eyebrow {
        display:flex; align-items:center; gap:0.7rem;
        font-size:clamp(0.66rem,0.8vw,0.74rem);
        letter-spacing:0.32em; text-transform:uppercase; color:${BLUE};
      }
      .ph-line { width:28px; height:1px; background:${BLUE}; opacity:0.5; }
      .pcard {
        position:relative; display:flex; align-items:flex-start;
        gap:clamp(2rem,5vw,5rem);
        padding:clamp(2.5rem,5vh,4rem) 0;
        margin-bottom:clamp(1rem,2.5vh,2rem);
      }
      .pcard-rule { position:absolute; bottom:0; left:0; height:1px; background:rgba(0,92,159,0.12); }
      .pcard-left { display:flex; align-items:flex-start; gap:clamp(1rem,2.5vw,2.5rem); flex:1; min-width:0; }
      .pcard-index {
        font-size:clamp(5rem,9vw,9rem); font-weight:800; line-height:1;
        flex-shrink:0; user-select:none; margin-top:0.05em;
        color:transparent; -webkit-text-stroke:1.5px rgba(13,13,13,0.35);
        transition:-webkit-text-stroke 0.4s ease;
      }
      .pcard:hover .pcard-index { -webkit-text-stroke:1.5px rgba(0,92,159,0.65); }
      .pcard-text-wrap { flex:1; min-width:0; }
      .pcard-label {
        font-size:clamp(2.2rem,4.5vw,5.5rem); font-weight:600;
        line-height:1; letter-spacing:-0.02em; color:#0d0d0d;
        margin:0 0 clamp(0.8rem,1.5vh,1.2rem);
      }
      .pcard-divider {
        width:32px; height:2px; background:${BLUE};
        margin-bottom:clamp(0.8rem,1.5vh,1.2rem);
        transition:width 0.4s ease;
      }
      .pcard:hover .pcard-divider { width:56px; }

      /* prose body */
      .pcard-body { font-size:clamp(1rem,1vw,1rem); line-height:1.85; color:#111; margin:0; max-width:560px; }

      /* bullet list body */
      .pcard-bullets {
        list-style:none; margin:0; padding:0;
        display:flex; flex-direction:column;
        gap:clamp(0.5rem,1vh,0.72rem);
        max-width:560px;
      }
      .pcard-bullet-item {
        display:flex; align-items:flex-start; gap:0.6rem;
      }
      .pcard-bullet-dot {
        flex-shrink:0; margin-top:0.5em;
        width:5px; height:5px; border-radius:50%;
        background:${BLUE}; opacity:0.5;
      }
      /* .pcard-body inside a bullet inherits prose styles, no max-width needed here */
      .pcard-bullet-item .pcard-body { max-width:none; }

      .pcard-img-wrap {
        width:clamp(180px,22vw,300px); flex-shrink:0; border-radius:8px;
        overflow:hidden; aspect-ratio:4/3;
        box-shadow:0 8px 32px rgba(0,0,0,0.10);
        transition:box-shadow 0.4s ease, transform 0.4s ease;
      }
      .pcard:hover .pcard-img-wrap { box-shadow:0 16px 48px rgba(0,92,159,0.15); transform:translateY(-4px); }
      .pcard-img { width:100%; height:100%; object-fit:cover; object-position:center; display:block; transition:transform 0.6s ease; }
      .pcard:hover .pcard-img { transform:scale(1.05); }
      @media(max-width:700px) {
        .pillars-section { padding:3rem 1.5rem; }
        .pcard { flex-direction:column; gap:1.5rem; }
        /* Stack the big index number ABOVE the text so the label + paragraph
           take the FULL width (were indented to the right of the number). */
        .pcard-left { flex-direction:column; gap:clamp(0.4rem,1.5vw,0.9rem); }
        .pcard-index { font-size:clamp(2.6rem,11vw,3.6rem); margin-top:0; }
        .pcard-text-wrap { width:100%; }
        .pcard-img-wrap { width:100%; aspect-ratio:16/7; }
        .pcard-label { font-size:clamp(2rem,8vw,3rem); }
      }
      @media(max-width:640px) {
        /* paragraphs full width — drop narrower-column cap so left edge aligns with heading */
        .pcard-body, .pcard-bullets { max-width:none; }
        /* images square on mobile */
        .pcard-img-wrap { aspect-ratio:1/1; }
        .pcard-img { object-fit:cover; }
      }

      /* ══ PROGRAMME OUTCOMES ══ */
      .po2-section {
        position:relative; overflow:hidden;
        background:#ffffff;
        padding:clamp(5rem,10vh,8rem) clamp(2rem,10vw,10rem);
        border-top:1px solid rgba(0,92,159,0.07);
      }
      .po2-section::before {
        content:'';
        position:absolute; inset:0;
        background-image:
          linear-gradient(rgba(0,92,159,0.025) 1px,transparent 1px),
          linear-gradient(90deg,rgba(0,92,159,0.025) 1px,transparent 1px);
        background-size:70px 70px;
        pointer-events:none; z-index:0;
      }
      .po2-dept-watermark {
        position:absolute; bottom:-0.12em; right:-0.04em;
        font-size:clamp(12rem,28vw,22rem); font-weight:900;
        line-height:1; color:rgba(0,92,159,0.028);
        pointer-events:none; user-select:none; z-index:0;
        letter-spacing:-0.06em;
      }
      .po2-hdr { position:relative; z-index:1; margin-bottom:clamp(1.5rem,3vh,2.5rem); }
      .po2-eyebrow {
        display:flex; align-items:center; gap:0.7rem; margin-bottom:0.8rem;
        font-size:clamp(0.66rem,0.8vw,0.74rem);
        letter-spacing:0.32em; text-transform:uppercase; color:${BLUE};
      }
      .po2-eyebrow-line { width:28px; height:1px; background:${BLUE}; opacity:0.5; }
      .po2-hdr-row {
        display:flex; align-items:flex-end; justify-content:space-between;
        flex-wrap:wrap; gap:1.2rem;
      }
      .po2-title {
        margin:0; font-size:clamp(1.6rem,3vw,3.2rem);
        font-weight:700; line-height:1.02; letter-spacing:-0.02em;
        text-transform:uppercase; color:${DARK};
      }
      .po2-title-accent {
        background:linear-gradient(90deg,${BLUE},#1e3a8a);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; color:transparent;
      }
      .po2-dept-toggle {
        display:inline-flex; padding:4px;
        background:rgba(0,92,159,0.06);
        border:1px solid rgba(0,92,159,0.12);
        border-radius:100px; gap:2px;
      }
      .po2-dept-btn {
        padding:8px 30px; border:none; cursor:pointer; border-radius:100px;
        font-size:clamp(0.66rem,0.82vw,0.74rem);
        font-weight:700; letter-spacing:0.18em; text-transform:uppercase;
        transition:background 0.28s, color 0.28s, box-shadow 0.28s;
      }
      .po2-dept-btn.active { background:${BLUE}; color:#fff; box-shadow:0 4px 18px rgba(0,92,159,0.28); }
      .po2-dept-btn:not(.active) { background:transparent; color:rgba(0,92,159,0.5); }
      .po2-dept-btn:not(.active):hover { background:rgba(0,92,159,0.08); color:${BLUE}; }
      .po2-subtabs {
        position:relative; z-index:1;
        display:flex; gap:0;
        border-bottom:1px solid rgba(0,92,159,0.10);
        margin-bottom:clamp(2rem,4vh,3rem);
        overflow-x:auto;
      }
      .po2-subtab {
        padding:10px 26px; border:none; background:transparent; cursor:pointer;
        position:relative; color:#aaa;
        font-size:clamp(0.66rem,0.82vw,0.74rem);
        font-weight:700; letter-spacing:0.14em; text-transform:uppercase;
        transition:color 0.22s; white-space:nowrap;
      }
      .po2-subtab::after {
        content:''; position:absolute; bottom:-1px; left:0; right:0;
        height:2px; background:${BLUE};
        transform:scaleX(0);
        transition:transform 0.28s cubic-bezier(0.22,1,0.36,1);
      }
      .po2-subtab.active { color:${BLUE}; }
      .po2-subtab.active::after { transform:scaleX(1); }
      .po2-subtab:hover:not(.active) { color:#555; }
      .po2-subtab-short { display:none; }
      @media(max-width:600px) {
        .po2-subtab-short { display:inline; }
        .po2-subtab-full  { display:none; }
      }
      .po2-num-badge {
        display:inline-flex; align-items:center; justify-content:center;
        min-width:34px; height:28px; padding:0 8px; border-radius:6px; flex-shrink:0;
        background:rgba(0,92,159,0.08); border:1px solid rgba(0,92,159,0.15);
        font-size:clamp(0.66rem,0.72vw,0.72rem); font-weight:800;
        letter-spacing:0.06em; color:${BLUE};
      }
      .po2-card-rule {
        height:1px; width:100%;
        background:linear-gradient(90deg,rgba(0,92,159,0.18),transparent);
        margin:0.7rem 0;
      }
      .po2-card-rule--narrow { margin:0.5rem 0 0.65rem; }
      .po2-ghost-num {
        position:absolute; bottom:-0.08em; right:0.12em;
        font-family:var(--font-cinzel,serif); font-weight:900;
        font-size:clamp(4rem,7vw,8rem); line-height:1;
        color:${BLUE}; opacity:0.032; pointer-events:none; user-select:none;
        letter-spacing:-0.04em;
      }
      .po2-body { font-size:clamp(1rem,0.95vw,1rem); line-height:1.82; color:#111; margin:0; }
      .po2-grid { position:relative; z-index:1; }
      .po2-grid--peo { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(0.75rem,1.5vw,1.1rem); }
      .po2-peo-card {
        position:relative; overflow:hidden;
        padding:clamp(1.2rem,2vw,1.8rem);
        border:1px solid rgba(0,92,159,0.09); border-radius:10px; background:#fff;
        transition:box-shadow 0.28s, transform 0.28s, border-color 0.28s;
      }
      .po2-peo-card::before {
        content:''; position:absolute; top:0; left:0; right:0; height:3px;
        background:linear-gradient(90deg,${BLUE},#1e3a8a);
        transform:scaleX(0); transform-origin:left;
        transition:transform 0.32s cubic-bezier(0.22,1,0.36,1);
      }
      .po2-peo-card:hover { box-shadow:0 14px 44px rgba(0,92,159,0.10); transform:translateY(-3px); border-color:rgba(0,92,159,0.20); }
      .po2-peo-card:hover::before { transform:scaleX(1); }
      .po2-grid--po { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(0.75rem,1.5vw,1.1rem); }
      .po2-po-card {
        position:relative; overflow:hidden;
        padding:clamp(1.2rem,2vw,1.8rem);
        border:1px solid rgba(0,92,159,0.09); border-radius:10px;
        background:#fff; display:flex; flex-direction:column; gap:0;
        transition:box-shadow 0.28s, transform 0.28s, border-color 0.28s;
      }
      .po2-po-card::before {
        content:''; position:absolute; left:0; top:0; bottom:0; width:3px;
        background:linear-gradient(180deg,${BLUE},#1e3a8a);
        transform:scaleY(0); transform-origin:bottom;
        transition:transform 0.32s cubic-bezier(0.22,1,0.36,1);
      }
      .po2-po-card:hover { box-shadow:0 14px 44px rgba(0,92,159,0.10); transform:translateY(-3px); border-color:rgba(0,92,159,0.20); }
      .po2-po-card:hover::before { transform:scaleY(1); }
      .po2-po-top { display:flex; align-items:center; gap:0.7rem; margin-bottom:0; }
      .po2-po-title {
        font-size:clamp(0.66rem,0.82vw,0.74rem); font-weight:700;
        text-transform:uppercase; letter-spacing:0.08em; color:${DARK}; margin:0; line-height:1.25;
      }
      .po2-grid--pso { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:clamp(0.75rem,1.5vw,1.3rem); }
      .po2-pso-card {
        position:relative; overflow:hidden;
        padding:clamp(1.4rem,2.5vw,2.2rem);
        border:1px solid rgba(0,92,159,0.09); border-radius:10px;
        background:linear-gradient(135deg,rgba(0,92,159,0.025) 0%,#fff 55%);
        display:flex; gap:clamp(1rem,2vw,1.6rem); align-items:flex-start;
        transition:box-shadow 0.28s, transform 0.28s, border-color 0.28s;
      }
      .po2-pso-card:hover { box-shadow:0 18px 52px rgba(0,92,159,0.12); transform:translateY(-3px); border-color:rgba(0,92,159,0.22); }
      .po2-pso-orb {
        width:54px; height:54px; flex-shrink:0; border-radius:14px; border:1px solid;
        display:flex; align-items:center; justify-content:center;
        transition:box-shadow 0.28s;
      }
      .po2-pso-card:hover .po2-pso-orb { box-shadow:0 6px 20px rgba(0,92,159,0.18); }
      .po2-pso-orb-num { font-size:clamp(0.66rem,0.72vw,0.72rem); font-weight:800; letter-spacing:0.06em; }
      .po2-pso-body { flex:1; min-width:0; }
      .po2-pso-title {
        font-size:clamp(0.66rem,0.82vw,0.74rem); font-weight:700;
        text-transform:uppercase; letter-spacing:0.08em; color:${DARK}; margin:0; line-height:1.3;
      }
      @media(max-width:1100px) {
        .po2-grid--peo { grid-template-columns:repeat(2,1fr); }
        .po2-grid--po  { grid-template-columns:repeat(2,1fr); }
      }
      @media(max-width:700px) {
        .po2-section { padding:3.5rem 1.5rem; }
        .po2-grid--peo, .po2-grid--po, .po2-grid--pso { grid-template-columns:1fr; }
        .po2-pso-card { flex-direction:column; }
        .po2-dept-watermark { display:none; }
      }
      @media(prefers-reduced-motion:reduce) {
        .po2-peo-card::before, .po2-po-card::before { transition:none; }
        .po2-peo-card:hover, .po2-po-card:hover, .po2-pso-card:hover { transform:none; }
      }
    `}</style>
  </div>
);

export default VisionMissionPage;