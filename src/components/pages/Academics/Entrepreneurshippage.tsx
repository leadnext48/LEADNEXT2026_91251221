"use client";

import { useState, useEffect, useRef, FC, JSX } from "react";
import React from "react";
import {
  Lightbulb, BarChart2, FileText, Cpu, TrendingUp, Banknote,
  GraduationCap, Globe, Rocket, FlaskConical, Network,
  Target, BookOpen, Mail, ChevronRight, Zap, Layers, Star,
  CheckCircle2, ArrowRight, Building2, Sparkles, LucideIcon,
  MousePointer2, ChevronDown, ArrowUpRight,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import Lottie from "lottie-react";

/* ─── Brand ─────────────────────────────────────────────────────────────── */
const NAVY = "#0a2463";

/* ─── Standardized style tokens (matching Deans / Calendar / Examinations) ─ */

// Gradient title: black → navy, same as every other page
const gradientTitle: React.CSSProperties = {
  background: "linear-gradient(90deg, #0D0D0D 0%, #0a2463 62%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  paddingBottom: "0.06em",
  display: "block",
};

// Standard paragraph: Playfair, #555, clamp size, 1.75 line-height
const paraStyle: React.CSSProperties = {
  color: "#555",
  fontSize: "clamp(12px, 0.9vw, 15px)",
  lineHeight: 1.75,
};

// Dark-bg paragraph (navy sections): same size, white-ish
const paraLightStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.72)",
  fontSize: "clamp(12px, 0.9vw, 15px)",
  lineHeight: 1.75,
};

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Panel = "bi" | "iedc";
interface ServiceItem { icon: LucideIcon; title: string; desc: string; }
interface StatItem { val: number; suffix: string; label: string; sub: string; }

/* ─── Animated counter ───────────────────────────────────────────────────── */
const Counter: FC<{ to: number; suffix?: string }> = ({ to, suffix = "" }) => {
  const [v, setV] = useState(0);
  const [fired, setFired] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired) { setFired(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [fired]);
  useEffect(() => {
    if (!fired) return;
    let cur = 0;
    const step = to / 60;
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { setV(to); clearInterval(id); } else setV(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [fired, to]);
  return <span ref={ref}>{v}{suffix}</span>;
};

/* ─── Eyebrow — standardized ─────────────────────────────────────────────── */
const Eyebrow: FC<{ text: string; light?: boolean }> = ({ text, light = false }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="h-px w-7 flex-shrink-0" style={{ background: light ? "rgba(255,255,255,0.3)" : NAVY }} />
    <span
      className={`${cinzel.className} uppercase tracking-[0.38em]`}
      style={{ fontSize: "10px", color: light ? "rgba(255,255,255,0.5)" : "rgba(10,36,99,0.55)", fontWeight: 600 }}
    >
      {text}
    </span>
  </div>
);

/* ─── Scroll-reveal ──────────────────────────────────────────────────────── */
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const Reveal: FC<{ children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none"; className?: string }> = ({
  children, delay = 0, direction = "up", className = ""
}) => {
  const { ref, visible } = useScrollReveal();
  const getTransform = () => {
    if (direction === "up") return "translateY(40px)";
    if (direction === "left") return "translateX(-40px)";
    if (direction === "right") return "translateX(40px)";
    return "none";
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : getTransform(),
      transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════ */
export default function EntrepreneurshipPage(): JSX.Element {
  const [activePanel, setActivePanel] = useState<Panel | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/Bussiness.json").then(r => r.json()).then(d => setAnimationData(d));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (activePanel && panelRef.current) {
      const top = panelRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [activePanel]);

  const heroTextParallax = scrollY * 0.18;

  /* ─── Data ── */
  const biServices: ServiceItem[] = [
    { icon: Lightbulb,  title: "Idea Nurturing",     desc: "Expert mentorship and market validation frameworks to refine your business concept from first spark to fundable thesis." },
    { icon: BarChart2,  title: "Market Research",    desc: "Comprehensive analysis of market potential, competitive landscape, and real customer needs before you build." },
    { icon: FileText,   title: "Project Report",     desc: "Detailed business plans and project reports prepared to investor-ready standards for funding and execution." },
    { icon: Cpu,        title: "Technology Support", desc: "Access to the latest technologies and technical expertise to build, prototype, and scale your venture quickly." },
    { icon: TrendingUp, title: "Financial Analysis", desc: "Cost-benefit analysis, financial modelling, and investment readiness preparation that stands up to scrutiny." },
    { icon: Banknote,   title: "Funding Assistance", desc: "Direct introductions to investors, angel networks, and financial institutions aligned to your stage and sector." },
  ];
  const biStats: StatItem[] = [
    { val: 28,  suffix: "",  label: "Active Start-ups",     sub: "Ventures being nurtured on campus right now" },
    { val: 15,  suffix: "",  label: "Successful Graduates", sub: "Entrepreneurs who have launched and scaled" },
    { val: 100, suffix: "%", label: "Dedicated Focus",      sub: "Every resource aimed at making job creators" },
  ];
  const iedcServices: ServiceItem[] = [
    { icon: FlaskConical,   title: "Experimentation",      desc: "Hands-on experimentation with real-world technologies, enabling rapid iteration and a bias for learning by doing." },
    { icon: Network,        title: "Collaboration",         desc: "Cross-disciplinary teamwork inside a vibrant academic entrepreneurial community that challenges your thinking." },
    { icon: Layers,         title: "Prototype Development", desc: "Build working prototypes and MVPs using state-of-the-art labs, fabrication tools, and production equipment." },
    { icon: GraduationCap, title: "Mentorship Programs",   desc: "Structured guidance from experienced industry practitioners and distinguished academic experts who have done it." },
    { icon: BookOpen,       title: "Academic Integration",  desc: "Entrepreneurial learning seamlessly woven into the academic curriculum, earning credit as you build real ventures." },
    { icon: Target,         title: "Market Validation",     desc: "Proven frameworks to test, validate, and iterate on ideas using real market feedback — not classroom hypotheticals." },
  ];
  const iedcStats: StatItem[] = [
    { val: 700, suffix: "+", label: "Student Community",  sub: "Entrepreneurs-in-training at LEAD College" },
    { val: 6,   suffix: "",  label: "Active Programs",    sub: "Workshops, Ideathons, Competitions & more" },
    { val: 1,   suffix: "st",label: "Launch Pad",         sub: "First step in every student startup journey" },
  ];
  const iedcAmenities = ["Dedicated Workspace","Startup School","Incubation Centre","Expert Mentors","Financial Support","Scale Assistance"];
  const iedcPrograms  = ["Evangelization Sessions","Technology Workshops","Ideathons & Competitions","Founder Story Series","Startup School","Incubation Support"];
  const forwardPillars: { icon: LucideIcon; label: string }[] = [
    { icon: Star,     label: "Autonomous Status"   },
    { icon: BookOpen, label: "Enhanced Curriculum"  },
    { icon: Rocket,   label: "E-School Vision"      },
    { icon: Network,  label: "All Under One Roof"   },
  ];
  const selCards = [
    { id: "bi" as Panel,   icon: Building2, title: "LEAD-BI",   subtitle: "Business Incubator",           desc: "Transform from job seeker to job creator — a structured incubation programme with mentoring, modelling, and funding all under one roof.", cta: "Explore Business Incubator",   img: "/convert/LEAD66.webp" },
    { id: "iedc" as Panel, icon: Sparkles,  title: "LEAD IEDC", subtitle: "Innovation & Entrepreneurship", desc: "A Kerala Startup Mission initiative giving students the platform, technology, mentorship, and capital to build real ventures from campus.",    cta: "Explore Innovation Centre",    img: "/convert/LEAD44.webp" },
  ];
  const marqueeWords = ["Incubation","Mentorship","Innovation","Funding","Prototyping","Ideathons","E-School","Startup School","Market Research","Entrepreneurship"];

  return (
    <div className={`${cinzel.className} ${playfair.className} min-h-screen bg-white`}>

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-white"
      >
        {/* Grid texture — matches Calendar/Examinations */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${NAVY}07 1px, transparent 1px), linear-gradient(90deg, ${NAVY}07 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-50/60 blur-[100px] pointer-events-none" />

        {/* Ghost watermark */}
        <div
          className={`${cinzel.className} absolute bottom-0 left-0 pointer-events-none select-none leading-none font-black`}
          style={{ fontSize: "clamp(90px,18vw,260px)", color: "rgba(10,36,99,0.025)", letterSpacing: "-0.04em", transform: `translateY(${scrollY * -0.12}px)` }}
        >
          LEAD
        </div>

        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center"
          style={{ transform: `translateY(${-heroTextParallax}px)` }}
        >
          {/* LEFT */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center py-12 lg:py-0">

            <Reveal delay={80}>
              <Eyebrow text="Innovation · Incubation · Impact" />
            </Reveal>

            {/* H1 — gradient black to navy, font-bold (700) matching Deans page */}
            <Reveal delay={160}>
              <div className="overflow-hidden mb-3">
                <h1
                  className={`${cinzel.className} font-bold leading-none tracking-tight`}
                  style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)", ...gradientTitle }}
                >
                  ENTRE/TECH­PRENEURSHIP
                </h1>
              </div>
            </Reveal>

            {/* Rule */}
            <Reveal delay={220}>
              <div className="h-px mb-5 max-w-sm w-full opacity-20" style={{ backgroundColor: NAVY, transformOrigin: "left" }} />
            </Reveal>

            {/* Badge */}
            <Reveal delay={260}>
              <div className="mb-4">
                <span
                  className={`${cinzel.className} inline-block uppercase`}
                  style={{ fontSize: "clamp(9px,0.75vw,13px)", letterSpacing: "0.22em", padding: "3px 10px", backgroundColor: "#d6e4ff", color: NAVY }}
                >
                  LEAD College · Entrepreneurship Programme
                </span>
              </div>
            </Reveal>

            {/* Description */}
            <Reveal delay={300}>
              <p className={`${playfair.className} mb-6`} style={{ ...paraStyle, maxWidth: "clamp(300px,34vw,480px)" }}>
                Crafting the next generation of entrepreneurs at LEAD College — through structured incubation, expert mentorship, and a campus ecosystem built for venture creation.
              </p>
            </Reveal>

            {/* Stats + CTA strip */}
            <Reveal delay={360}>
              <div className="flex items-center flex-wrap gap-x-6 gap-y-3 pt-4 border-t" style={{ borderColor: `${NAVY}12` }}>
                {[
                  { value: "28",   label: "Active Start-ups" },
                  { value: "700+", label: "Student Community" },
                  { value: "15",   label: "Graduates Launched" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span
                      className={`${cinzel.className} font-bold leading-none`}
                      style={{
                        fontSize: "clamp(16px,1.6vw,26px)",
                        background: "linear-gradient(90deg, #0D0D0D 0%, #0a2463 62%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundClip: "text", color: "transparent",
                      }}
                    >{stat.value}</span>
                    <span className={`${playfair.className} text-gray-400 tracking-wide`} style={{ fontSize: "clamp(9px,0.68vw,11px)" }}>{stat.label}</span>
                  </div>
                ))}
                <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                <a
                  href="#programmes"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("programmes")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`${cinzel.className} group inline-flex items-center gap-2 uppercase tracking-[0.18em] font-bold px-6 py-3 transition-opacity duration-300 hover:opacity-80`}
                  style={{ fontSize: "10px", backgroundColor: NAVY, color: "white" }}
                >
                  <span>Explore Programmes</span>
                  <ArrowRight size={11} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Lottie illustration (same as Placements page) */}
          <Reveal delay={420} direction="right" className="hidden lg:flex w-[45%] items-center justify-center">
            <div className="w-full flex items-center justify-center" style={{ maxWidth: "420px" }}>
              {animationData ? (
                <Lottie animationData={animationData} loop autoplay style={{ width: "clamp(240px,28vw,400px)", height: "auto" }} />
              ) : (
                /* Fallback decorative while lottie loads */
                <div className="w-full aspect-square flex items-center justify-center opacity-10">
                  <Rocket size={120} color={NAVY} strokeWidth={0.5} />
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${NAVY}30, transparent)` }} />
      </section>

      {/* ════════════════════════════
          ABOUT
      ════════════════════════════ */}
      <section className="py-24 overflow-hidden" style={{ background: "white", borderBottom: `1px solid ${NAVY}10` }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">

            <Reveal direction="left">
              <div>
                <Eyebrow text="About the Programme" />
                <h2 className={`${cinzel.className} font-bold leading-none tracking-tight mb-6`} style={{ fontSize: "clamp(26px,3.5vw,50px)", ...gradientTitle }}>
                  A CULTURE<br />OF ENTERPRISE
                </h2>
                <div className="relative overflow-hidden mt-8" style={{ aspectRatio: "4/3" }}>
                  <img
                    src="/convert/LEAD05.webp"
                    alt="Students collaborating on entrepreneurship"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(10,36,99,0.7), transparent)" }}>
                    <p className={`${cinzel.className} text-white`} style={{ fontSize: "8px", letterSpacing: "0.28em", opacity: 0.7, textTransform: "uppercase" }}>CAMPUS INNOVATION · LEAD COLLEGE</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div className="pt-8">
                <p className={`${playfair.className} mb-5`} style={{ ...paraStyle, fontSize: "clamp(13px,1vw,16px)" }}>
                  Entrepreneurship is a core focus area at LEAD College. The institution nurtures entrepreneurial thinking through specialised academic tracks, experiential learning, mentoring, and startup-oriented projects.
                </p>
                <p className={`${playfair.className} mb-10`} style={{ ...paraStyle }}>
                  Students are encouraged to ideate, validate, and develop business ventures — supported by expert guidance, industry exposure, and an ecosystem that promotes innovation, risk-taking, and sustainable enterprise creation.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: `${NAVY}10` }}>
                  {[
                    { label: "Ideation",   sub: "Structured process" },
                    { label: "Validation", sub: "Real-world testing"  },
                    { label: "Mentoring",  sub: "Industry-led"        },
                    { label: "Scaling",    sub: "Campus to market"    },
                  ].map((a) => (
                    <div
                      key={a.label}
                      className="bg-white px-5 py-5 hover:bg-[#f0f4fb] transition-colors duration-300"
                    >
                      <p className={`${cinzel.className} font-bold mb-1`} style={{ fontSize: "10px", color: NAVY, letterSpacing: "0.1em" }}>{a.label}</p>
                      <p className={`${playfair.className}`} style={{ fontSize: "12px", color: "#5a6d8a" }}>{a.sub}</p>
                    </div>
                  ))}
                </div>

                {/* What makes LEAD different — fills the space below the grid */}
                <div className="mt-8 space-y-4">
                  <p className={`${cinzel.className} uppercase`} style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(10,36,99,0.45)", fontWeight: 600 }}>What makes LEAD different</p>
                  {[
                    { n: "01", title: "Autonomous MBA + Startup in Parallel", desc: "LEAD's autonomous status allows students to pursue an industry-aligned MBA while simultaneously building their venture — no compromises, both tracks run together." },
                    { n: "02", title: "Campus-to-Market Ecosystem",           desc: "From idea generation in the classroom to prototype labs, incubation support, and investor introductions — the entire entrepreneurial journey happens under one roof." },
                    { n: "03", title: "Industry Mentors, Not Just Faculty",    desc: "Every entrepreneur-in-training is guided by practitioners who have built, failed, and scaled businesses — not just academics who have studied them." },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className="flex gap-4 p-4 hover:bg-[#f7f9fc] transition-colors duration-300"
                      style={{ border: "1px solid rgba(10,36,99,0.07)" }}
                    >
                      <span className={`${cinzel.className} font-bold flex-shrink-0 mt-0.5`} style={{ fontSize: "9px", color: "rgba(10,36,99,0.3)", letterSpacing: "0.08em" }}>{item.n}</span>
                      <div>
                        <p className={`${cinzel.className} font-bold mb-1`} style={{ fontSize: "10px", color: NAVY, letterSpacing: "0.06em" }}>{item.title}</p>
                        <p className={`${playfair.className}`} style={{ fontSize: "13px", color: "#555", lineHeight: 1.7 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          PATHWAY SELECTOR
      ════════════════════════════ */}
      <section id="programmes" className="py-24 overflow-hidden" style={{ background: "#f7f9fc" }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-14">

          <Reveal>
            <div className="text-center mb-6">
              <Eyebrow text="Our Programmes" />
              <h2 className={`${cinzel.className} font-bold leading-none tracking-tight mx-auto mb-4`} style={{ fontSize: "clamp(24px,3vw,46px)", ...gradientTitle, maxWidth: 560, display: "block" }}>
                CHOOSE YOUR<br />PATHWAY
              </h2>
              <p className={`${playfair.className} mx-auto`} style={{ ...paraStyle, maxWidth: 440, textAlign: "center" }}>
                Two distinct programmes. One shared mission — building the next generation of entrepreneurs.
              </p>
            </div>
          </Reveal>

          {/* Prominent click instruction */}
          <Reveal delay={100}>
            <div className="flex items-center justify-center gap-3 mb-10 mt-4">
              <div
                className={`${cinzel.className} flex items-center gap-3 px-6 py-3 border`}
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  color: NAVY,
                  borderColor: NAVY,
                  backgroundColor: "rgba(10,36,99,0.04)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                <MousePointer2 size={14} color={NAVY} />
                Click a card to reveal its full programme details below
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {selCards.map(({ id, icon: Icon, title, subtitle, desc, cta, img }, idx) => {
              const isActive = activePanel === id;
              return (
                <Reveal key={id} delay={idx * 120} direction={idx === 0 ? "left" : "right"}>
                  <button
                    onClick={() => setActivePanel(isActive ? null : id)}
                    className="text-left w-full transition-all duration-300"
                    style={{
                      border: isActive ? `2px solid ${NAVY}` : "1.5px solid #dde3ef",
                      backgroundColor: isActive ? NAVY : "white",
                      transform: isActive ? "translateY(-3px)" : "translateY(0)",
                      boxShadow: isActive ? `0 20px 56px rgba(10,36,99,0.28)` : "none",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    aria-pressed={isActive}
                  >
                    {/* Card image */}
                    <div className="relative overflow-hidden" style={{ height: 180 }}>
                      <img
                        src={img}
                        alt={title}
                        className="w-full h-full object-cover transition-all duration-500"
                        style={{
                          filter: isActive ? "brightness(0.55) saturate(0.4)" : "brightness(0.72) saturate(0.8)",
                          transform: isActive ? "scale(1.04)" : "scale(1)",
                        }}
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}>
                          <Icon size={13} strokeWidth={1.5} color="white" />
                        </div>
                        <span className={`${cinzel.className} text-white font-bold`} style={{ fontSize: "11px", letterSpacing: "0.08em", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{title}</span>
                      </div>
                      {/* Status badge */}
                      <div className="absolute bottom-3 right-4 flex items-center gap-1.5" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", padding: "4px 10px" }}>
                        {isActive ? (
                          <>
                            <CheckCircle2 size={9} color="rgba(255,255,255,0.9)" />
                            <span className={`${cinzel.className} uppercase text-white`} style={{ fontSize: "7px", letterSpacing: "0.25em", opacity: 0.95 }}>Selected</span>
                          </>
                        ) : (
                          <>
                            <MousePointer2 size={9} color="rgba(255,255,255,0.85)" />
                            <span className={`${cinzel.className} uppercase text-white`} style={{ fontSize: "7px", letterSpacing: "0.25em", opacity: 0.9 }}>Click to explore</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-7 relative">
                      <span className={`${cinzel.className} font-black absolute bottom-3 right-4 leading-none select-none pointer-events-none`} style={{ fontSize: 72, color: isActive ? "rgba(255,255,255,0.04)" : "rgba(10,36,99,0.04)", letterSpacing: "-0.04em" }}>
                        {id === "bi" ? "01" : "02"}
                      </span>
                      <p className={`${cinzel.className} font-bold mb-1`} style={{ fontSize: "clamp(28px,3.5vw,42px)", letterSpacing: "-0.02em", color: isActive ? "#ffffff" : NAVY, lineHeight: 1 }}>{title}</p>
                      <p className={`${cinzel.className} uppercase mb-4`} style={{ fontSize: "8.5px", letterSpacing: "0.28em", color: isActive ? "rgba(255,255,255,0.5)" : "rgba(10,36,99,0.48)" }}>{subtitle}</p>
                      <p className={`${playfair.className} leading-relaxed mb-5`} style={{ fontSize: "14px", color: isActive ? "rgba(255,255,255,0.78)" : "#2c3e5e", lineHeight: 1.75 }}>{desc}</p>

                      {/* CTA row */}
                      <div className="flex items-center justify-between px-4 py-3" style={{
                        background: isActive ? "rgba(255,255,255,0.1)" : "rgba(10,36,99,0.06)",
                        border: `1px solid ${isActive ? "rgba(255,255,255,0.16)" : "rgba(10,36,99,0.12)"}`,
                      }}>
                        <span className={`${cinzel.className} uppercase`} style={{ fontSize: "8.5px", letterSpacing: "0.26em", color: isActive ? "rgba(255,255,255,0.7)" : NAVY, fontWeight: 600 }}>
                          {isActive ? "Currently Viewing ↓ Scroll below" : cta}
                        </span>
                        <ArrowRight size={12} color={isActive ? "rgba(255,255,255,0.5)" : NAVY} style={{ flexShrink: 0 }} />
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          CONTENT PANEL
      ════════════════════════════ */}
      <div ref={panelRef}>
        {activePanel === null && (
          <section className="py-12 text-center" style={{ background: "white", borderTop: `1px solid ${NAVY}10` }}>
            <div className="flex flex-col items-center gap-3">
              <ChevronDown size={18} color={`${NAVY}30`} className="animate-bounce" />
              <p className={`${cinzel.className} uppercase`} style={{ fontSize: "9px", letterSpacing: "0.32em", color: `${NAVY}40` }}>Select a programme above to reveal full details</p>
            </div>
          </section>
        )}
        {activePanel === "bi"   && <BIPanel   key="bi-panel"   stats={biStats}   services={biServices}   pillars={forwardPillars} />}
        {activePanel === "iedc" && <IEDCPanel key="iedc-panel" stats={iedcStats} services={iedcServices} amenities={iedcAmenities} programs={iedcPrograms} />}
      </div>

      {/* ════════════════════════════
          MARQUEE
      ════════════════════════════ */}
      <div className="overflow-hidden border-t border-b py-4" style={{ background: NAVY, borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "epMarquee 26s linear infinite", display: "inline-flex" }}>
          {[...Array(3)].map((_, r) =>
            marqueeWords.map((t, i) => (
              <span key={`${r}-${i}`} className={`${cinzel.className} uppercase flex items-center gap-5 whitespace-nowrap`} style={{ fontSize: "9px", letterSpacing: "0.35em", color: "rgba(255,255,255,0.45)" }}>
                <span className="w-1 h-1 rounded-full inline-block" style={{ background: "rgba(255,255,255,0.22)" }} />
                {t}
              </span>
            ))
          )}
        </div>
        <style>{`@keyframes epMarquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   BI PANEL
════════════════════════════════════════════════════════ */
interface BIPanelProps { stats: StatItem[]; services: ServiceItem[]; pillars: { icon: LucideIcon; label: string }[]; }

const BIPanel: FC<BIPanelProps> = ({ stats, services, pillars }) => (
  <div style={{ animation: "epPanelFade 0.7s cubic-bezier(0.22,1,0.36,1)" }}>
    <style>{`@keyframes epPanelFade { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }`}</style>

    {/* Intro */}
    <section className="py-20 bg-white overflow-hidden" style={{ borderTop: `1px solid ${NAVY}10` }}>
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <Reveal direction="left">
            <div>
              <Eyebrow text="Business Incubator" />
              <h2 className={`${cinzel.className} font-bold leading-none mb-3`} style={{ fontSize: "clamp(42px,6vw,80px)", ...gradientTitle }}>LEAD-BI</h2>
              <p className={`${cinzel.className} uppercase mb-7`} style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(10,36,99,0.48)" }}>Crafting Next Gen Entrepreneurs</p>
              <div className="flex flex-wrap gap-2">
                {["Incubation","Mentoring","Modelling","Funding"].map(t => (
                  <span key={t} className={`${cinzel.className} uppercase px-4 py-2`} style={{ fontSize: "8px", letterSpacing: "0.3em", color: NAVY, border: "1px solid rgba(10,36,99,0.18)", background: "rgba(10,36,99,0.04)" }}>{t}</span>
                ))}
              </div>
              <div className="relative overflow-hidden mt-8" style={{ aspectRatio: "16/10" }}>
                <img src="/convert/LEAD15.webp" alt="Business incubation" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.18) 0%, transparent 60%)" }} />
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <div>
              {/* Both paragraphs same size — no hierarchy */}
              <p className={`${playfair.className} mb-5`} style={{ ...paraStyle }}>
                Transform from Job Seeker to Job Creator with our exclusive Entrepreneurial Development Programme.
              </p>
              <p className={`${playfair.className} mb-8`} style={{ ...paraStyle }}>
                LEAD-BI holds the special privilege of offering aspiring young entrepreneurs the opportunity to pursue a recognised autonomous MBA Degree — while simultaneously chasing their dream of becoming an entrepreneur within two years on campus.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[["01","Incubation"],["02","Mentoring"],["03","Modelling"],["04","Funding"]].map(([n,l]) => (
                  <div key={l} className="flex items-center gap-3 px-4 py-3 hover:bg-[#edf1f9] transition-colors duration-300" style={{ border: "1px solid rgba(10,36,99,0.09)", background: "#f7f9fc", cursor: "default" }}>
                    <span className={`${cinzel.className}`} style={{ fontSize: "9px", color: "rgba(10,36,99,0.4)", minWidth: 22 }}>{n}</span>
                    <span className={`${playfair.className} font-semibold`} style={{ fontSize: "15px", color: NAVY }}>{l}</span>
                    <CheckCircle2 size={13} strokeWidth={1.5} color={NAVY} style={{ marginLeft: "auto", opacity: 0.5 }} />
                  </div>
                ))}
              </div>

              {/* Content to fill the gap before the promise banner */}
              <div className="space-y-3">
                <p className={`${cinzel.className} uppercase`} style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(10,36,99,0.45)", fontWeight: 600 }}>Who should apply</p>
                {[
                  { icon: "→", text: "MBA students with a validated business idea and the drive to build it during their programme." },
                  { icon: "→", text: "Aspiring founders seeking structured support — from concept to prototype to funded startup." },
                  { icon: "→", text: "Students who want to graduate not just with a degree, but with a running venture." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start p-4" style={{ background: "#f7f9fc", border: "1px solid rgba(10,36,99,0.07)" }}>
                    <span className={`${cinzel.className} flex-shrink-0 mt-0.5`} style={{ fontSize: "11px", color: NAVY, opacity: 0.5 }}>{item.icon}</span>
                    <p className={`${playfair.className}`} style={{ ...paraStyle, fontSize: "13px" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Promise card */}
        <Reveal delay={80}>
          <div className="mt-12 p-8 relative overflow-hidden" style={{ background: NAVY }}>
            <div className={`${cinzel.className} font-black absolute -top-3 -right-2 select-none pointer-events-none leading-none`} style={{ fontSize: 100, color: "rgba(255,255,255,0.03)", letterSpacing: "-0.04em" }}>E</div>
            <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center">
              <div>
                <p className={`${cinzel.className} uppercase mb-2`} style={{ fontSize: "8px", letterSpacing: "0.38em", color: "rgba(255,255,255,0.35)" }}>Our Promise</p>
                <p className={`${playfair.className} leading-snug`} style={{ fontSize: "clamp(17px,1.5vw,24px)", color: "rgba(255,255,255,0.92)", maxWidth: 480, fontWeight: 600 }}>
                  "From B-School fame to E-School excellence — crafting vibrant entrepreneurs."
                </p>
                <p className={`${cinzel.className} uppercase mt-3`} style={{ fontSize: "8px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.3)" }}>Dr P Rajan · LEAD BI Foundation</p>
              </div>
              <div className="flex justify-end">
                <a href="mailto:rajan@lead.ac.in" className={`${cinzel.className} flex items-center gap-3 px-6 py-3.5 uppercase hover:bg-white/15 transition-all duration-250`} style={{ fontSize: "9px", letterSpacing: "0.25em", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", textDecoration: "none", background: "rgba(255,255,255,0.06)" }}>
                  <Mail size={12} strokeWidth={1.5} />rajan@lead.ac.in
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Apply CTA — BI */}
    <section className="py-16 bg-white" style={{ borderTop: `1px solid ${NAVY}10` }}>
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8" style={{ border: `1.5px solid ${NAVY}`, background: "rgba(10,36,99,0.02)" }}>
            <div>
              <p className={`${cinzel.className} uppercase mb-1`} style={{ fontSize: "9px", letterSpacing: "0.32em", color: "rgba(10,36,99,0.45)" }}>Ready to build your venture?</p>
              <p className={`${playfair.className} font-semibold`} style={{ fontSize: "clamp(16px,1.4vw,22px)", color: NAVY, lineHeight: 1.3 }}>
                Join LEAD-BI — Start your entrepreneurial journey today.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="https://admission.lead.ac.in/lead-college-of-management-mba-application/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${cinzel.className} inline-flex items-center gap-2 uppercase tracking-[0.18em] font-bold px-7 py-4 transition-all duration-300 hover:opacity-90`}
                style={{ fontSize: "10px", backgroundColor: NAVY, color: "white", textDecoration: "none" }}
              >
                Apply Now <ArrowUpRight size={12} />
              </a>
              <a
                href="mailto:rajan@lead.ac.in"
                className={`${cinzel.className} inline-flex items-center gap-2 uppercase tracking-[0.18em] font-bold px-7 py-4 transition-all duration-300 hover:bg-[#f0f4fb]`}
                style={{ fontSize: "10px", border: `1px solid ${NAVY}`, color: NAVY, textDecoration: "none" }}
              >
                Enquire <Mail size={12} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Stats */}
    <div style={{ background: "#f7f9fc", borderTop: `1px solid ${NAVY}10`, borderBottom: `1px solid ${NAVY}10` }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(10,36,99,0.08)]">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="px-10 py-12">
              <p className={`${cinzel.className} font-black leading-none mb-3`} style={{ fontSize: "clamp(44px,5vw,70px)", color: NAVY }}><Counter to={s.val} suffix={s.suffix} /></p>
              <p className={`${cinzel.className} uppercase mb-2`} style={{ fontSize: "9px", letterSpacing: "0.28em", color: "rgba(10,36,99,0.5)" }}>{s.label}</p>
              <p className={`${playfair.className}`} style={{ ...paraStyle, fontSize: "13px" }}>{s.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>

    {/* Services */}
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <Eyebrow text="Support Services" />
              <h3 className={`${cinzel.className} font-bold leading-none tracking-tight`} style={{ fontSize: "clamp(22px,3vw,44px)", ...gradientTitle }}>ENTREPRENEURIAL<br />SUPPORT SERVICES</h3>
            </div>
            <p className={`${playfair.className} max-w-[260px]`} style={{ ...paraStyle }}>End-to-end support from idea validation to funded startup.</p>
          </div>
        </Reveal>
        <ServiceGrid services={services} />
      </div>
    </section>

    {/* Way Forward */}
    <section className="py-20 overflow-hidden" style={{ background: NAVY }}>
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
          <Reveal direction="left">
            <div>
              <div className={`${cinzel.className} font-black leading-none select-none`} style={{ fontSize: "clamp(70px,11vw,150px)", color: "rgba(255,255,255,0.04)", letterSpacing: "-0.04em", marginBottom: -16 }}>E</div>
              <Eyebrow text="The Way Forward" light />
              <h3 className={`${cinzel.className} font-bold leading-none tracking-tight text-white`} style={{ fontSize: "clamp(24px,3.5vw,50px)" }}>E-SCHOOL<br />EXCELLENCE</h3>
              <div className="flex flex-wrap gap-2 mt-7">
                {pillars.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.12] transition-colors duration-300" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", cursor: "default" }}>
                    <Icon size={10} strokeWidth={1.5} color="rgba(255,255,255,0.45)" />
                    <span className={`${cinzel.className} uppercase`} style={{ fontSize: "8px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.55)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <div>
              <div className="relative overflow-hidden mb-7" style={{ aspectRatio: "16/9" }}>
                <img src="/convert/LEAD70.webp" alt="Modern entrepreneurship school" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" style={{ filter: "brightness(0.7) saturate(0.6)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,36,99,0.5) 0%, transparent 60%)" }} />
                <div className="absolute bottom-4 left-4">
                  <p className={`${cinzel.className} uppercase text-white`} style={{ fontSize: "8px", letterSpacing: "0.32em", opacity: 0.6 }}>THE FUTURE OF LEAD</p>
                </div>
              </div>
              {/* All three paragraphs — same style */}
              <p className={`${playfair.className} mb-5`} style={{ ...paraLightStyle }}>
                We have pledged our journey from present B-School fame to E-School excellence to craft the vibrant entrepreneurs. Our autonomous status allows us to design cutting-edge curriculum tailored specifically for entrepreneurship development.
              </p>
              <p className={`${playfair.className} mb-5`} style={{ ...paraLightStyle }}>
                It holds the special privilege bestowed on aspiring young men and women to avail the opportunity of doing a recognised autonomous MBA Degree and simultaneously chasing the dream of becoming an entrepreneur within a span of two years of education and training on campus.
              </p>
              <p className={`${playfair.className}`} style={{ ...paraLightStyle }}>
                Our all-under-one-roof model — Incubation, Mentoring, Modelling, Funding — will facilitate as a catalyst to achieve it. Within three years the dream of having an E-School in place of a B-School will come true.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
);

/* ════════════════════════════════════════════════════════
   IEDC PANEL
════════════════════════════════════════════════════════ */
interface IEDCPanelProps { stats: StatItem[]; services: ServiceItem[]; amenities: string[]; programs: string[]; }

const IEDCPanel: FC<IEDCPanelProps> = ({ stats, services, amenities, programs }) => (
  <div style={{ animation: "epPanelFade 0.7s cubic-bezier(0.22,1,0.36,1)" }}>

    {/* Intro — navy */}
    <section className="py-20 relative overflow-hidden" style={{ background: NAVY, borderTop: `1px solid ${NAVY}10` }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="max-w-7xl mx-auto px-8 sm:px-14 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <Reveal direction="left">
            <div>
              <Eyebrow text="Innovation & Entrepreneurship Development Centre" light />
              <h2 className={`${cinzel.className} font-bold leading-none mb-3 text-white`} style={{ fontSize: "clamp(42px,6vw,80px)" }}>LEAD IEDC</h2>
              <p className={`${cinzel.className} uppercase mb-7`} style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.42)" }}>Innovation &amp; Entrepreneurship</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Engineering Partnership","Global Exposure","Initial Funding","Entrepreneur Community"].map(t => (
                  <span key={t} className={`${cinzel.className} uppercase px-3 py-2`} style={{ fontSize: "7.5px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.58)", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)" }}>{t}</span>
                ))}
              </div>
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src="/convert/LEAD44.webp" alt="IEDC innovation lab" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" style={{ filter: "brightness(0.65) saturate(0.7)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,36,99,0.65) 0%, transparent 55%)" }} />
                <div className="absolute bottom-4 left-4"><p className={`${cinzel.className} uppercase text-white`} style={{ fontSize: "8px", letterSpacing: "0.32em", opacity: 0.6 }}>LEAD IEDC LAB</p></div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <div>
              {/* All three paragraphs — unified paraLightStyle, no size hierarchy */}
              <p className={`${playfair.className} mb-5`} style={{ ...paraLightStyle }}>
                The Innovation and Entrepreneurship Development Centers (IEDC) at LEAD College Autonomous have created a platform enabling students to transform their inventive concepts into prototypes for viable products and services.
              </p>
              <p className={`${playfair.className} mb-5`} style={{ ...paraLightStyle }}>
                This platform serves as an optimal starting point for students venturing into entrepreneurship — providing access to cutting-edge technology, superior infrastructure, outstanding mentorship, initial funding, and exposure on a global scale.
              </p>
              <p className={`${playfair.className} mb-8`} style={{ ...paraLightStyle }}>
                Supported by <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Kerala Startup Mission</strong> — a flagship initiative fostering innovation culture in academic institutions across Kerala.
              </p>

              {/* Content to fill the empty space in the navy bg column */}
              <div className="space-y-0 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className={`${cinzel.className} uppercase pt-6 mb-4`} style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>What IEDC offers you</p>
                {[
                  { n: "01", title: "Prototype Lab Access",   desc: "Hands-on access to fabrication tools, maker spaces, and digital labs to build and test your product ideas on campus." },
                  { n: "02", title: "Initial Seed Funding",   desc: "Selected IEDC ventures receive seed grants and financial support through Kerala Startup Mission to move from idea to MVP." },
                  { n: "03", title: "Global Exposure",        desc: "Students represent LEAD at national and international startup events, competitions, and innovation summits." },
                  { n: "04", title: "Mentored by Practitioners", desc: "Industry leaders and serial entrepreneurs guide IEDC students through structured mentorship sessions and office hours." },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="flex gap-4 py-4 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    <span className={`${cinzel.className} flex-shrink-0 font-bold`} style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", minWidth: 22, marginTop: 2 }}>{item.n}</span>
                    <div>
                      <p className={`${cinzel.className} uppercase mb-1`} style={{ fontSize: "9px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>{item.title}</p>
                      <p className={`${playfair.className}`} style={{ ...paraLightStyle, fontSize: "13px" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* Apply CTA — IEDC */}
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8" style={{ border: `1.5px solid ${NAVY}`, background: "rgba(10,36,99,0.02)" }}>
            <div>
              <p className={`${cinzel.className} uppercase mb-1`} style={{ fontSize: "9px", letterSpacing: "0.32em", color: "rgba(10,36,99,0.45)" }}>Join the innovation community</p>
              <p className={`${playfair.className} font-semibold`} style={{ fontSize: "clamp(16px,1.4vw,22px)", color: NAVY, lineHeight: 1.3 }}>
                Be part of LEAD IEDC — where student ideas become real ventures.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="https://admission.lead.ac.in/lead-college-of-management-mba-application/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${cinzel.className} inline-flex items-center gap-2 uppercase tracking-[0.18em] font-bold px-7 py-4 transition-all duration-300 hover:opacity-90`}
                style={{ fontSize: "10px", backgroundColor: NAVY, color: "white", textDecoration: "none" }}
              >
                Apply Now <ArrowUpRight size={12} />
              </a>
              <a
                href="mailto:rajan@lead.ac.in"
                className={`${cinzel.className} inline-flex items-center gap-2 uppercase tracking-[0.18em] font-bold px-7 py-4 transition-all duration-300 hover:bg-[#f0f4fb]`}
                style={{ fontSize: "10px", border: `1px solid ${NAVY}`, color: NAVY, textDecoration: "none" }}
              >
                Enquire <Mail size={12} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Stats */}
    <div style={{ background: "#f7f9fc", borderTop: `1px solid ${NAVY}10`, borderBottom: `1px solid ${NAVY}10` }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(10,36,99,0.08)]">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="px-10 py-12">
              <p className={`${cinzel.className} font-black leading-none mb-3`} style={{ fontSize: "clamp(44px,5vw,70px)", color: NAVY }}><Counter to={s.val} suffix={s.suffix} /></p>
              <p className={`${cinzel.className} uppercase mb-2`} style={{ fontSize: "9px", letterSpacing: "0.28em", color: "rgba(10,36,99,0.5)" }}>{s.label}</p>
              <p className={`${playfair.className}`} style={{ ...paraStyle, fontSize: "13px" }}>{s.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>

    {/* Focus Areas */}
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <Eyebrow text="IEDC Framework" />
              <h3 className={`${cinzel.className} font-bold leading-none tracking-tight`} style={{ fontSize: "clamp(22px,3vw,44px)", ...gradientTitle }}>KEY FOCUS<br />AREAS</h3>
            </div>
            <p className={`${playfair.className} max-w-[260px]`} style={{ ...paraStyle }}>IEDCs are the first launch pad for a student's entrepreneurial journey.</p>
          </div>
        </Reveal>
        <ServiceGrid services={services} />
      </div>
    </section>

    {/* Mission + Programs */}
    <section className="py-20 overflow-hidden" style={{ background: "#f7f9fc", borderTop: `1px solid ${NAVY}10` }}>
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal direction="left">
            <div>
              <Eyebrow text="Our Mission" />
              <h3 className={`${cinzel.className} font-bold leading-none tracking-tight mb-7`} style={{ fontSize: "clamp(22px,3vw,42px)", ...gradientTitle }}>PREMIER<br />ENTREPRENEUR<br />SCHOOL</h3>
              {/* All paragraphs same style */}
              <p className={`${playfair.className} mb-5`} style={{ ...paraStyle, fontSize: "clamp(13px,1vw,16px)" }}>
                Lead aspires to establish itself as the premier entrepreneurship school in India. With a student population exceeding 700, a dynamic entrepreneurial community, and LEAD IEDC organising impactful programmes, we are dedicated to nurturing entrepreneurs with passion and energy.
              </p>
              <p className={`${playfair.className} mb-6`} style={{ ...paraStyle }}>
                Our amenities encompass workspace, a startup school, an incubation centre, skilled mentors, and financial assistance extending from the initial idea phase to the scaling stage.
              </p>
              <div className="relative overflow-hidden mb-6" style={{ aspectRatio: "16/9" }}>
                <img src="/convert/LEAD45.webp" alt="Students in workshop" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.12) 0%, transparent 50%)" }} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {amenities.map(a => (
                  <div key={a} className="flex items-center gap-2.5 px-4 py-3 hover:bg-[#edf1f9] hover:border-[rgba(10,36,99,0.2)] transition-all duration-300" style={{ border: "1px solid rgba(10,36,99,0.1)", background: "white", cursor: "default" }}>
                    <Zap size={10} strokeWidth={1.5} color={NAVY} style={{ flexShrink: 0, opacity: 0.5 }} />
                    <span className={`${cinzel.className} uppercase`} style={{ fontSize: "8px", letterSpacing: "0.2em", color: "#2c3e5e" }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <div>
              <div style={{ border: "1px solid rgba(10,36,99,0.1)", background: "white" }}>
                <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(10,36,99,0.07)", background: "rgba(10,36,99,0.02)" }}>
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className={`${cinzel.className} uppercase ml-2`} style={{ fontSize: "8px", letterSpacing: "0.3em", color: "rgba(10,36,99,0.38)" }}>Programmes &amp; Events</span>
                </div>
                {programs.map((p, i) => (
                  <div key={p} className="flex items-center gap-3 px-5 py-4 hover:bg-[#f7f9fc] transition-colors duration-250" style={{ borderBottom: i < programs.length - 1 ? "1px solid rgba(10,36,99,0.06)" : "none" }}>
                    <ChevronRight size={11} strokeWidth={1.5} color="rgba(10,36,99,0.35)" style={{ flexShrink: 0 }} />
                    <span className={`${playfair.className} font-medium`} style={{ fontSize: "14px", color: "#2c3e5e", lineHeight: 1.75 }}>{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-6" style={{ border: "1px solid rgba(10,36,99,0.1)", background: "white" }}>
                <p className={`${cinzel.className} uppercase mb-3`} style={{ fontSize: "8px", letterSpacing: "0.38em", color: "rgba(10,36,99,0.38)" }}>About IEDC</p>
                <p className={`${playfair.className} leading-relaxed`} style={{ ...paraStyle }}>
                  IEDC is a flagship initiative of Kerala Startup Mission — an umbrella programme that plays an instrumental role in fostering innovation culture in academic institutions across the State of Kerala.
                </p>
              </div>
              <div className="mt-4 relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img src="/convert/LEAD39.webp" alt="IEDC events" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,36,99,0.4) 0%, transparent 60%)" }} />
                <div className="absolute bottom-4 left-4"><p className={`${cinzel.className} uppercase text-white`} style={{ fontSize: "8px", letterSpacing: "0.28em", opacity: 0.65 }}>IEDC EVENTS · LEAD COLLEGE</p></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
);

/* ─── Shared service grid ─────────────────────────────────────────────────── */
const ServiceGrid: FC<{ services: ServiceItem[] }> = ({ services }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(10,36,99,0.08)" }}>
    {services.map(({ icon: Icon, title, desc }, i) => (
      <Reveal key={title} delay={i * 60}>
        <div className="group bg-white p-8 h-full hover:bg-[#f0f4fb] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ backgroundColor: NAVY }} />
          <div className="w-9 h-9 flex items-center justify-center mb-5" style={{ background: "rgba(10,36,99,0.05)", border: "1px solid rgba(10,36,99,0.09)" }}>
            <Icon size={14} strokeWidth={1.5} color={NAVY} />
          </div>
          <p className={`${cinzel.className} font-semibold uppercase mb-3`} style={{ fontSize: "10px", letterSpacing: "0.18em", color: NAVY }}>{title}</p>
          <p className={`${playfair.className} leading-relaxed`} style={{ ...paraStyle, fontSize: "13.5px" }}>{desc}</p>
        </div>
      </Reveal>
    ))}
  </div>
);