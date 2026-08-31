"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { cinzel, playfair } from "@/app/fonts";
import Lottie from "lottie-react";
import {
  ArrowUpRight,
  BookOpen,
  Home,
  Wifi,
  FlaskConical,
  Microscope,
  Lightbulb,
  Leaf,
  BarChart2,
  GraduationCap,
  Trophy,
  Globe,
  Library,
  Network,
  Briefcase,
  ClipboardList,
  CheckCircle2,
  Mail,
  MapPin,
  Send,
  FileText,
  UserCheck,
  Banknote,
  BookMarked,
} from "lucide-react";

/* ─── design tokens ──────────────────────────────────────────────────────── */
const NAVY  = "#0a2463";
const WHITE = "#ffffff";
const OFF   = "#f7f8fc";
const MUTED = "#8494b4";
const E     = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─── animated counter ───────────────────────────────────────────────────── */
function Num({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const id = setInterval(() => {
      cur += to / 55;
      if (cur >= to) { setV(to); clearInterval(id); }
      else setV(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

/* ─── section eyebrow ────────────────────────────────────────────────────── */
function Eyebrow({ n, label, light = false }: { n: string; label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <div className="h-px w-7" style={{ backgroundColor: light ? "rgba(255,255,255,0.3)" : NAVY }} />
      <span
        className={`${cinzel.className} uppercase tracking-[0.38em]`}
        style={{ fontSize: "12px", color: light ? "rgba(255,255,255,0.3)" : MUTED }}
      >
        {n} / {label}
      </span>
    </div>
  );
}

/* ─── feature card with bullet list ─────────────────────────────────────── */
function FeatureItem({
  icon: Icon, title, items, delay, light = false,
}: {
  icon: React.ElementType; title: string; items: string[]; delay: number; light?: boolean;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const tc = light ? "white" : NAVY;
  const mc = light ? "#fff" : "#111";
  const bc = light ? "rgba(255,255,255,0.10)" : `${NAVY}10`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: E }}
      className="group p-6 sm:p-7 relative overflow-hidden transition-all duration-300"
      style={{ border: `1px solid ${bc}`, backgroundColor: light ? "rgba(255,255,255,0.04)" : WHITE }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 origin-left"
        style={{ backgroundColor: light ? "rgba(255,255,255,0.2)" : NAVY }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35 }}
      />
      <div
        className="w-9 h-9 flex items-center justify-center mb-5"
        style={{ border: `1px solid ${bc}`, backgroundColor: light ? "rgba(255,255,255,0.06)" : OFF }}
      >
        <Icon size={15} strokeWidth={1.5} color={light ? "rgba(255,255,255,0.70)" : NAVY} />
      </div>
      <h4
        className={`${cinzel.className} uppercase tracking-wider font-bold mb-4`}
        style={{ fontSize: "clamp(11px,0.85vw,13px)", color: tc }}
      >
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
              style={{ backgroundColor: light ? "rgba(255,255,255,0.45)" : `${NAVY}45` }}
            />
            <span
              className={`${playfair.className} leading-relaxed`}
              style={{ fontSize: "clamp(15px,0.9vw,16px)", color: mc, lineHeight: 1.65 }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   01 — HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ghostY  = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const smoothY = useSpring(ghostY, { stiffness: 80, damping: 22 });

  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch("/Woman discovering business statistics.json").then(r => r.json()).then(d => setAnimationData(d));
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: NAVY }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <motion.p
          style={{ y: smoothY, fontSize: "clamp(90px,18vw,280px)", color: "rgba(255,255,255,0.03)", letterSpacing: "-0.04em", lineHeight: 0.85, marginLeft: "-0.01em" }}
          className={`${cinzel.className} font-black leading-none`}
        >
          LEAD
        </motion.p>
      </div>
      <div
        className="absolute top-0 bottom-0 pointer-events-none hidden lg:block"
        style={{ right: "22%", width: "1px", background: `linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%)` }}
      />
      <div className="relative z-10 flex items-center justify-end px-8 sm:px-14 pt-10">
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: E }}>
          <span className={`${cinzel.className} uppercase tracking-widest`} style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)" }}>
            In Collaboration with KUFOS
          </span>
        </motion.div>
      </div>
      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 flex-1 flex items-center px-8 sm:px-14"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-[55%] flex flex-col justify-center pl-0 lg:pl-12 xl:pl-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: E }}
              className="flex items-center gap-4 mb-5"
            >
              <div className="w-8 h-px" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
              <span className={`${cinzel.className} uppercase tracking-[0.38em]`} style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)" }}>
                Doctoral Research Program · Full-Time Ph.D.
              </span>
            </motion.div>
            <div className="overflow-hidden mb-1">
              <motion.h1
                initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.55, ease: E }}
                className={`${cinzel.className} font-bold uppercase text-white leading-none`}
                style={{ fontSize: "clamp(2.6rem,5vw,4.2rem)", letterSpacing: "-0.02em" }}
              >
                RESEARCH
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.68, ease: E }}
                className={`${cinzel.className} font-bold uppercase leading-none`}
                style={{ fontSize: "clamp(2.6rem,5vw,4.2rem)", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.22)" }}
              >
                CENTRE
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-5">
              <motion.p
                initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.82, ease: E }}
                className={`${cinzel.className} uppercase tracking-widest`}
                style={{ fontSize: "clamp(9px,0.75vw,13px)", letterSpacing: "0.22em", padding: "3px 10px", backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", display: "inline-block" }}
              >
                Pioneering Excellence in Doctoral Research
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.98, ease: E }}
              className={`${playfair.className} mb-6`}
              style={{
                fontSize: "clamp(0.92rem,0.9vw,1rem)",
                color: "#fff",
                lineHeight: 1.78,
                maxWidth: "clamp(300px,34vw,500px)",
              }}
            >
              LEAD Research Centre, in collaboration with KUFOS, offers a fully-funded
              full-time Ph.D. programme designed for scholars who are serious about making
              an impact.
            </motion.p>
            {/* Hero stat strip removed per request */}
          </div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="hidden lg:flex w-[45%] items-center justify-center pointer-events-none select-none"
          >
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{ width: "clamp(240px,28vw,400px)", height: "auto" }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   02 — ABOUT
═══════════════════════════════════════════════════════════════════════════ */
function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  const paraStyle: React.CSSProperties = {
    fontSize: "clamp(15px,1vw,16px)",
    color: "#111",
    lineHeight: 1.82,
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-white py-24 sm:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${NAVY}06 1px, transparent 1px), linear-gradient(90deg, ${NAVY}06 1px, transparent 1px)`, backgroundSize: "80px 80px" }}
      />
      <div className={`${cinzel.className} absolute -left-6 top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none`} style={{ fontSize: "clamp(160px,28vw,400px)", color: `${NAVY}03`, letterSpacing: "-0.05em" }}>02</div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.85, ease: E }}>
            <Eyebrow n="02" label="About" />
            <h2 className={`${cinzel.className} font-bold uppercase leading-none mb-10`} style={{ fontSize: "clamp(24px,3.4vw,52px)", color: NAVY, letterSpacing: "-0.025em" }}>
              ABOUT<br />LEAD<br />RESEARCH<br />CENTRE
            </h2>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4, ease: E }} className="p-5 mb-8" style={{ border: `1px solid ${NAVY}14`, backgroundColor: OFF }}>
              <p className={`${cinzel.className} uppercase tracking-widest mb-1`} style={{ fontSize: "12px", color: MUTED }}>University Affiliation</p>
              <p className={`${cinzel.className} font-bold uppercase`} style={{ fontSize: "12px", color: NAVY }}>KUFOS</p>
              <p className={`${playfair.className} mt-0.5`} style={{ fontSize: "12px", color: "#111" }}>Kerala University of Fisheries and Ocean Studies</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: FlaskConical,  label: "Research-Focused Environment" },
                { icon: GraduationCap, label: "Distinguished Faculty" },
                { icon: Banknote,      label: "Complete Financial Support" },
                { icon: Trophy,        label: "KUFOS Affiliation" },
              ].map(({ icon: Icon, label }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + i * 0.07, ease: E }} className="flex items-center gap-3 px-4 py-3" style={{ border: `1px solid ${NAVY}0e`, backgroundColor: OFF }}>
                  <Icon size={13} strokeWidth={1.5} color={NAVY} />
                  <span className={`${cinzel.className} uppercase tracking-wider`} style={{ fontSize: "14px", color: "#111", fontWeight: 600 }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay: 0.18, ease: E }}>
            <p className={`${playfair.className} leading-relaxed mb-6`} style={paraStyle}>
              LEAD College (Autonomous) is committed to making research more accessible
              and impactful for aspiring researchers across India. Our Research Centre
              represents a milestone in our journey towards academic excellence.
            </p>
            <p className={`${playfair.className} leading-relaxed mb-6`} style={paraStyle}>
              In collaboration with KUFOS, we have established a comprehensive doctoral
              research program that provides full-time research scholars with unparalleled
              support, mentorship, and resources — ensuring you have everything needed to
              produce high-quality scholarly work.
            </p>
            <p className={`${playfair.className} leading-relaxed`} style={paraStyle}>
              Our vision is to create a thriving research ecosystem that fosters innovation,
              encourages critical thinking, and produces scholarly work that contributes
              meaningfully to academic knowledge and societal development.
            </p>
            <div className="mt-10 pl-6 border-l-2" style={{ borderColor: `${NAVY}20` }}>
              <p className={`${playfair.className}`} style={{ fontSize: "clamp(15px,1vw,16px)", color: "#111", lineHeight: 1.75 }}>
                "A thriving research ecosystem that fosters innovation and produces
                high-quality scholarly work contributing to societal development."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   03 — WHAT MAKES IT UNIQUE
═══════════════════════════════════════════════════════════════════════════ */
function Unique() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const features = [
    { icon: Library,      title: "World-Class Infrastructure",  items: ["Nalanda Library · 10,000+ books", "Digital research databases", "Dedicated research labs", "High-speed computing facilities", "Conference & seminar rooms"] },
    { icon: GraduationCap,title: "Expert Mentorship",           items: ["One-on-one mentorship sessions", "Regular progress reviews", "Research methodology workshops", "Publication writing support", "Conference coaching"] },
    { icon: ClipboardList, title: "Research Support",           items: ["Proposal development assistance", "Statistical analysis tools", "Plagiarism checking software", "Reference management tools", "Thesis formatting support"] },
    { icon: Network,       title: "Collaboration & Networking", items: ["Research colloquiums & seminars", "Guest lectures by scholars", "Inter-institutional collaborations", "Industry partnerships", "Alumni researcher network"] },
    { icon: Home,          title: "Residential Facilities",     items: ["Fully furnished single rooms", "24/7 electricity & water", "High-speed WiFi", "Common study areas", "Safe & secure campus"] },
    { icon: Briefcase,     title: "Career Development",         items: ["Teaching methodology training", "Academic job placement", "Industry research opportunities", "Post-doctoral fellowship guidance", "Professional skill workshops"] },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden py-24 sm:py-32" style={{ backgroundColor: NAVY }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: "100% 70px" }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E }}>
            <Eyebrow n="03" label="Why LEAD" light />
            <h2 className={`${cinzel.className} font-bold uppercase text-white leading-none`} style={{ fontSize: "clamp(28px,4.5vw,68px)", letterSpacing: "-0.025em" }}>
              WHAT MAKES<br />US UNIQUE?
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className={`${playfair.className} max-w-xs leading-relaxed`} style={{ fontSize: "1rem", color: "#fff" }}>
            Comprehensive support system designed for research excellence.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FeatureItem key={f.title} icon={f.icon} title={f.title} items={f.items} delay={i * 0.07} light />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   04 — FACULTY
═══════════════════════════════════════════════════════════════════════════ */
function Faculty() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const guides = [
    {
      initials: "TG",
      image: "/faculty/Dr. Thomas George K.jpg",
      name: "Dr. Thomas George K",
      role: "Chairman & Ph.D. Guide",
      bio: "Visionary academic leader with 25+ years of experience in entrepreneurship, international training, and institutional development. Expertise in strategic management, organizational behavior, and educational innovation.",
      tags: ["Strategic Management and Implementation", "Entrepreneurship", "Leadership"],
    },
    {
      initials: "BR",
      name: "Dr. Balamourougane R",
      image: "/faculty/bala.jpeg",
      role: "Associate Professor & Ph.D. Guide",
      bio: "Passionate educator combining academic rigor with practical industry insights, having worked on multiple industry-academia collaborative research projects and contributions to quality management research and industry academia",
      tags: ["Quality Management", "Organizational Research", "Industry-Academia"],
    },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, ${NAVY}06 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: E }}
          className="mb-14"
        >
          <Eyebrow n="04" label="Faculty" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            {/* CHANGED: clamp(28px,4.5vw,68px) → clamp(40px,5.8vw,88px) */}
            <h2
              className={`${cinzel.className} font-bold uppercase leading-none`}
              style={{ fontSize: "clamp(40px,5.8vw,88px)", color: NAVY, letterSpacing: "-0.025em" }}
            >
              DISTINGUISHED<br />PH.D. GUIDES
            </h2>
            <p className={`${playfair.className} max-w-xs leading-relaxed`} style={{ fontSize: "1rem", color: "#111" }}>
              Approved by KUFOS — Kerala University of Fisheries and Ocean Studies.
            </p>
          </div>
        </motion.div>

        {/* CHANGED: max-w-3xl → max-w-5xl for wider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl">
          {guides.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.12, ease: E }}
              className="group flex flex-col relative overflow-hidden"
              style={{ border: `1px solid ${NAVY}0e`, backgroundColor: WHITE }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                style={{ backgroundColor: NAVY }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Avatar + name — slightly more padding since card is wider */}
              <div className="flex flex-col items-center pt-10 pb-7 px-8" style={{ backgroundColor: OFF }}>
                <div
                  className="w-32 h-32 rounded-full mb-5 relative overflow-hidden flex-shrink-0"
                  style={{ border: "6px solid white", boxShadow: `0 0 0 1px ${NAVY}15` }}
                >
                  <img src={g.image} alt={g.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3
                  className={`${cinzel.className} font-bold uppercase text-center leading-tight`}
                  style={{ fontSize: "clamp(12px,0.98vw,15px)", color: NAVY }}
                >
                  {g.name}
                </h3>
                <p className={`${playfair.className} text-center mt-1.5`} style={{ fontSize: "13px", color: "#111" }}>{g.role}</p>
              </div>

              {/* Body */}
              <div className="flex-1 p-8">
                <p
                  className={`${playfair.className} leading-relaxed mb-6`}
                  style={{ fontSize: "clamp(0.92rem,0.92vw,1rem)", color: "#111", lineHeight: 1.8 }}
                >
                  {g.bio}
                </p>

                {/* ── Research Area Tags — solid navy, prominent ── */}
                <div className="pt-5 border-t" style={{ borderColor: `${NAVY}10` }}>
                  <p
                    className={`${cinzel.className} uppercase tracking-[0.22em] mb-3`}
                    style={{ fontSize: "12px", color: MUTED }}
                  >
                    Research Areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {g.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`${cinzel.className} uppercase tracking-wider px-3 py-1.5`}
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.1em",
                          color: WHITE,
                          backgroundColor: NAVY,
                          border: `1px solid ${NAVY}`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   05 — RESEARCH AREAS
═══════════════════════════════════════════════════════════════════════════ */
function ResearchAreas() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const areas = [
    { icon: BarChart2,    title: "Business Management",       desc: "Strategic management, organizational behavior, HRM, marketing research, financial management, and business analytics." },
    { icon: Microscope,   title: "Fisheries & Ocean Studies",  desc: "Marine science, fisheries management, aquaculture, ocean conservation, sustainable fishing, and marine biotechnology." },
    { icon: Wifi,         title: "Technology & Innovation",    desc: "IT management, digital transformation, innovation adoption, and emerging technologies in business contexts." },
    { icon: Lightbulb,    title: "Entrepreneurship",           desc: "Startup ecosystems, entrepreneurial behavior, business incubation, social entrepreneurship, and innovation-driven enterprises." },
    { icon: Leaf,         title: "Sustainability Studies",     desc: "Sustainable practices, corporate social responsibility, environmental management, and circular economy." },
    { icon: FlaskConical, title: "Applied Research",           desc: "Industry-specific research, case study methodologies, action research, consultancy projects, and practical solutions." },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden py-24 sm:py-32" style={{ backgroundColor: NAVY }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-14 lg:gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: E }} className="lg:sticky lg:top-24">
            <Eyebrow n="05" label="Scope" light />
            <h2 className={`${cinzel.className} font-bold uppercase text-white leading-none mb-6`} style={{ fontSize: "clamp(28px,4vw,62px)", letterSpacing: "-0.025em" }}>RESEARCH<br />AREAS</h2>
            <p className={`${playfair.className} leading-relaxed`} style={{ fontSize: "clamp(0.92rem,0.9vw,1rem)", color: "#fff", lineHeight: 1.75 }}>
              Diverse fields of doctoral research under KUFOS spanning science, technology, management, and sustainability.
            </p>
            <div className="mt-10 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <span className={`${cinzel.className} font-black text-white`} style={{ fontSize: "clamp(36px,4vw,58px)" }}>6</span>
              <p className={`${playfair.className} mt-1`} style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>Major Research Domains</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            {areas.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.08, ease: E }} className="group p-6 sm:p-7 relative overflow-hidden transition-all duration-300" style={{ backgroundColor: NAVY }}>
                <motion.div className="absolute top-0 left-0 right-0 h-0.5 origin-left" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.35 }} />
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Icon size={16} strokeWidth={1.5} color="rgba(255,255,255,0.55)" />
                </div>
                <h4 className={`${cinzel.className} uppercase tracking-wider font-bold mb-3 text-white`} style={{ fontSize: "11px" }}>{title}</h4>
                <p className={`${playfair.className} leading-relaxed`} style={{ fontSize: "clamp(0.9rem,0.9vw,1rem)", color: "#fff", lineHeight: 1.75 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   06 — BENEFITS
═══════════════════════════════════════════════════════════════════════════ */
function Benefits() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const highlights = [
    { icon: Banknote, value: "₹15,000", label: "Monthly Stipend",   desc: "Guaranteed financial support throughout your research tenure." },
    { icon: Home,     value: "100%",    label: "Free Accommodation", desc: "Fully furnished on-campus rooms — completely free of charge." },
    { icon: BookOpen, value: "24/7",    label: "Library Access",     desc: "Physical and digital resources including international journals." },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${NAVY}04 1px, transparent 1px)`, backgroundSize: "100% 80px" }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E }} className="mb-14">
          <Eyebrow n="06" label="Benefits" />
          <h2 className={`${cinzel.className} font-bold uppercase leading-none`} style={{ fontSize: "clamp(28px,4.5vw,68px)", color: NAVY, letterSpacing: "-0.025em" }}>COMPREHENSIVE<br />BENEFITS</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-px" style={{ backgroundColor: `${NAVY}10` }}>
          {highlights.map(({ icon: Icon, value, label, desc }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1, ease: E }} className="group relative bg-white p-8 overflow-hidden hover:bg-[#f7f8fc] transition-colors duration-300">
              <motion.div className="absolute top-0 left-0 right-0 h-0.5 origin-left" style={{ backgroundColor: NAVY }} initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.35 }} />
              <div className="w-10 h-10 flex items-center justify-center mb-6" style={{ backgroundColor: `${NAVY}08` }}>
                <Icon size={16} strokeWidth={1.5} color={NAVY} />
              </div>
              <p className={`${cinzel.className} font-black leading-none mb-2`} style={{ fontSize: "clamp(28px,3.5vw,52px)", color: NAVY }}>{value}</p>
              <h4 className={`${cinzel.className} uppercase tracking-wider font-bold mb-3`} style={{ fontSize: "11px", color: NAVY }}>{label}</h4>
              <p className={`${playfair.className} leading-relaxed`} style={{ fontSize: "1rem", color: "#111" }}>{desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4, ease: E }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px" style={{ backgroundColor: `${NAVY}10` }}>
          {[
            { icon: UserCheck,    label: "1:1 Mentoring" },
            { icon: FileText,     label: "Publication Support" },
            { icon: Globe,        label: "Conference Funding" },
            { icon: FlaskConical, label: "Research Labs" },
            { icon: BookMarked,   label: "Reference Tools" },
            { icon: Briefcase,    label: "Career Support" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="group bg-white p-4 flex flex-col items-center text-center hover:bg-[#f7f8fc] transition-colors duration-300">
              <div className="w-8 h-8 flex items-center justify-center mb-3" style={{ backgroundColor: `${NAVY}07` }}>
                <Icon size={13} strokeWidth={1.5} color={NAVY} />
              </div>
              <span className={`${cinzel.className} uppercase tracking-wider`} style={{ fontSize: "14px", color: "#111", fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   07 — ELIGIBILITY & APPLICATION
═══════════════════════════════════════════════════════════════════════════ */
function Eligibility() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const criteria = [
    "Bachelor's Degree with minimum 50% marks from recognized university",
    "Master's Degree (completed or final semester) in relevant discipline",
    "Valid qualifying scores — CAT / GMAT / UGC NET / SET / GATE",
    "Strong academic record and demonstrated research aptitude",
    "Ability to commit full-time (3–4 years) for doctoral research",
    "Good communication skills in English",
    "Research proposal in proposed area of study",
  ];

  const documents = [
    "Duly filled application form with photograph",
    "Updated CV / Resume",
    "Statement of Purpose (1,000–1,500 words)",
    "Research proposal (2,000–3,000 words)",
    "All academic transcripts and degree certificates",
    "Qualifying examination scorecards",
    "Two letters of recommendation from academic referees",
    "Government-issued photo ID proof",
    "Recent passport-sized photographs (3 copies)",
    "Experience certificates (if applicable)",
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden py-24 sm:py-32" style={{ backgroundColor: NAVY }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className={`${cinzel.className} absolute -right-6 bottom-0 font-black leading-none pointer-events-none select-none`} style={{ fontSize: "clamp(160px,28vw,400px)", color: "rgba(255,255,255,0.025)", letterSpacing: "-0.05em" }}>07</div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: E }} className="mb-12">
          <Eyebrow n="07" label="Apply" light />
          <h2 className={`${cinzel.className} font-bold uppercase text-white leading-none`} style={{ fontSize: "clamp(28px,4.5vw,68px)", letterSpacing: "-0.025em" }}>ELIGIBILITY &<br />APPLICATION</h2>
          <p className={`${playfair.className} mt-4 max-w-xl`} style={{ fontSize: "clamp(0.92rem,0.9vw,1rem)", color: "#fff", lineHeight: 1.75 }}>
            Now accepting applications for full-time Ph.D. positions under KUFOS. Limited seats available for the upcoming academic year.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.85, ease: E }} className="p-7 sm:p-8" style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                <CheckCircle2 size={15} strokeWidth={1.5} color="rgba(255,255,255,0.4)" />
              </div>
              <span className={`${cinzel.className} uppercase tracking-widest text-white font-bold`} style={{ fontSize: "11px" }}>Eligibility Criteria</span>
            </div>
            <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              {criteria.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: E }} className="flex items-start gap-3 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
                  <span className={`${playfair.className} leading-relaxed`} style={{ fontSize: "clamp(0.9rem,0.88vw,1rem)", color: "#fff", lineHeight: 1.75 }}>{c}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.85, delay: 0.12, ease: E }} className="p-7 sm:p-8" style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                <FileText size={15} strokeWidth={1.5} color="rgba(255,255,255,0.4)" />
              </div>
              <span className={`${cinzel.className} uppercase tracking-widest text-white font-bold`} style={{ fontSize: "11px" }}>Application Documents</span>
            </div>
            <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              {documents.map((d, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: E }} className="flex items-start gap-3 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span className={`${cinzel.className} font-black flex-shrink-0 mt-0.5`} style={{ fontSize: "12px", color: "rgba(255,255,255,0.18)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={`${playfair.className} leading-relaxed`} style={{ fontSize: "clamp(0.9rem,0.88vw,1rem)", color: "#fff", lineHeight: 1.75 }}>{d}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   08 — CTA
═══════════════════════════════════════════════════════════════════════════ */
function CTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${NAVY}06 1px, transparent 1px), linear-gradient(90deg, ${NAVY}06 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <motion.div style={{ y: bgY }} className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <span className={`${cinzel.className} font-black leading-none`} style={{ fontSize: "clamp(110px,20vw,300px)", color: `${NAVY}04`, letterSpacing: "-0.04em", marginLeft: "-0.02em" }}>APPLY</span>
      </motion.div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-14 lg:gap-20 items-start">
          <motion.div initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, ease: E }} className="text-left">
            <Eyebrow n="08" label="Begin" />
            <h2 className={`${cinzel.className} font-bold uppercase leading-none mb-6`} style={{ fontSize: "clamp(36px,6vw,92px)", color: NAVY, letterSpacing: "-0.03em", lineHeight: 0.93, textAlign: "left" }}>BEGIN YOUR<br />RESEARCH<br />JOURNEY</h2>
            <p className={`${playfair.className} leading-relaxed max-w-md mb-10`} style={{ fontSize: "clamp(0.92rem,0.9vw,1rem)", color: "#111", lineHeight: 1.75 }}>
              Join LEAD Research Centre and pursue your doctoral degree under the expert guidance of distinguished faculty. Limited positions available for committed researchers ready to make meaningful academic contributions.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4" style={{ border: `1px solid ${NAVY}0e`, backgroundColor: OFF }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${NAVY}08` }}>
                  <Mail size={13} strokeWidth={1.5} color={NAVY} />
                </div>
                <div>
                  <p className={`${cinzel.className} uppercase tracking-widest mb-0.5`} style={{ fontSize: "12px", color: MUTED }}>Email</p>
                  <p className={`${playfair.className} font-medium`} style={{ fontSize: "14px", color: NAVY }}>research@lead.ac.in</p>
                  <p className={`${playfair.className}`} style={{ fontSize: "13px", color: "#111" }}>info@lead.ac.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4" style={{ border: `1px solid ${NAVY}0e`, backgroundColor: OFF }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${NAVY}08` }}>
                  <MapPin size={13} strokeWidth={1.5} color={NAVY} />
                </div>
                <div>
                  <p className={`${cinzel.className} uppercase tracking-widest mb-0.5`} style={{ fontSize: "12px", color: MUTED }}>Address</p>
                  <p className={`${playfair.className} font-medium leading-relaxed`} style={{ fontSize: "14px", color: NAVY }}>LEAD College (Autonomous)<br />Dhoni, Palakkad District<br />Kerala 678014, India</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 36 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.85, delay: 0.2, ease: E }} className="flex flex-col gap-3">
            <div id="apply" className="p-8 mb-2" style={{ border: `1px solid ${NAVY}12`, backgroundColor: NAVY }}>
              <p className={`${cinzel.className} uppercase tracking-widest mb-2`} style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>Full-Time Ph.D. Position</p>
              <h3 className={`${cinzel.className} font-bold uppercase text-white leading-none mb-4`} style={{ fontSize: "clamp(18px,2vw,28px)", letterSpacing: "-0.02em" }}>APPLY NOW</h3>
              <p className={`${playfair.className} mb-6`} style={{ fontSize: "1rem", color: "#fff", lineHeight: 1.7 }}>
                Submit your application for full-time Research Scholar positions. Limited seats for the upcoming academic year.
              </p>
              <a
                href="https://forms.zohopublic.com/leadcollegeofmanagement/form/Research/formperma/jcCR9-cfzhA9TeelltUP8qXvG4eck1HKAFFFXyPE9D4"
                target="_blank"
                rel="noopener noreferrer"
                className={`${cinzel.className} group w-full flex items-center justify-between bg-white px-6 py-4 font-bold uppercase tracking-[0.16em] hover:bg-white/90 transition-colors duration-300`}
                style={{ fontSize: "11px", color: NAVY }}
              >
                <div className="flex items-center gap-3">
                  <Send size={12} strokeWidth={1.5} />
                  <span>Submit Your Application</span>
                </div>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "3–4 Yrs",   label: "Duration" },
                { val: "Full-Time", label: "Commitment" },
                { val: "KUFOS",     label: "Affiliation" },
                { val: "Limited",   label: "Seats Available" },
              ].map((m) => (
                <div key={m.label} className="p-4" style={{ border: `1px solid ${NAVY}0e`, backgroundColor: OFF }}>
                  <span className={`${cinzel.className} font-black block`} style={{ fontSize: "14px", color: NAVY }}>{m.val}</span>
                  <span className={`${playfair.className}`} style={{ fontSize: "11px", color: MUTED }}>{m.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function LEADResearchCentrePage() {
  return (
    <div className={`${cinzel.className} ${playfair.className} overflow-x-hidden`}>
      <Hero />
      <About />
      <Unique />
      <Faculty />
      <ResearchAreas />
      <Benefits />
      <Eligibility />
      <CTA />
    </div>
  );
}