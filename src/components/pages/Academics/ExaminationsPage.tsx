"use client";

import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { cinzel, playfair } from "@/app/fonts";
import { Ticket, BarChart2, SearchCode, Accessibility, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const COLOR_ONE = "#020818";
const BANNER_BG = "#071a4a"; // darker blue for banner
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Gradient title style (matching Deans page) ───────────────────────────────
const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #0D0D0D 0%, #0a2463 62%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  paddingBottom: "0.06em",
};

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, translateY: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    translateY: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.1 },
  }),
};

const slideLeft: Variants = {
  hidden: { opacity: 0, translateX: -60 },
  visible: { opacity: 1, translateX: 0, transition: { duration: 0.8, ease: EASE } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, translateX: 60 },
  visible: { opacity: 1, translateX: 0, transition: { duration: 0.8, ease: EASE } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

function ScrollingBanner() {
  const items = [
    "ACADEMIC EXCELLENCE", "INTEGRITY", "TRANSPARENCY",
    "OUTCOME-BASED EVALUATION", "CONTINUOUS ASSESSMENT", "AUTONOMOUS STATUS",
  ];
  return (
    <div className="overflow-hidden py-3" style={{ backgroundColor: BANNER_BG }}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`${cinzel.className} text-xs tracking-[0.25em] text-white/90 font-semibold`}>
            {item}
            <span className="mx-6 text-blue-300">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ResponsibilityCard({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ willChange: "opacity, transform" }}
      className="group relative bg-white border border-gray-100 p-8 hover:border-blue-200 hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500" style={{ backgroundColor: COLOR_ONE }} />
      <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#020818] transition-colors duration-300">
          <span className="text-blue-700 group-hover:text-white transition-colors duration-300">{icon}</span>
        </div>
        <h4 className={`${cinzel.className} text-sm font-bold tracking-widest text-gray-900 mb-3 uppercase`}>{title}</h4>
        <p className={`${playfair.className} text-gray-600 text-sm leading-relaxed`}>{desc}</p>
      </div>
    </motion.div>
  );
}

function FacultyCard({ name, role, qualifications, email, initials, delay }: { name: string; role: string; qualifications?: string; email: string; initials: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ willChange: "opacity, transform" }}
      className="group relative bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
    >
      <div className="h-1" style={{ background: `linear-gradient(to right, ${COLOR_ONE}, #1d4ed8, #93c5fd)` }} />
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-2 border-blue-200 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-125" />
            <div className="absolute inset-0 rounded-full border border-blue-100 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-100 group-hover:scale-110" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLOR_ONE} 0%, #1e3a8a 100%)` }}>
              <span className={`${cinzel.className} text-white text-2xl font-bold`}>{initials}</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h4 className={`${cinzel.className} text-base font-bold tracking-wide text-gray-900 mb-2`}>{name}</h4>
          <p className={`${playfair.className} text-blue-700 font-semibold text-sm mb-3 italic`}>{role}</p>
          {qualifications && <p className={`${playfair.className} text-gray-500 text-xs mb-4 tracking-wide`}>{qualifications}</p>}
          <a href={`mailto:${email}`} className={`${playfair.className} text-xs text-gray-400 hover:text-blue-700 transition-colors duration-200 flex items-center justify-center gap-2`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            {email}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Paginated Resource Section ───────────────────────────────────────────────

type ResourceType = "result" | "notice" | "schedule" | "calendar";

interface ResourceItem { title: string; type: ResourceType; fileUrl?: string | null; }

const colors: Record<ResourceType, string> = {
  result: "bg-green-50 text-green-700 border-green-200",
  notice: "bg-amber-50 text-amber-700 border-amber-200",
  schedule: "bg-blue-50 text-blue-700 border-blue-200",
  calendar: "bg-purple-50 text-purple-700 border-purple-200",
};
const labels: Record<ResourceType, string> = {
  result: "RESULT", notice: "NOTICE", schedule: "SCHEDULE", calendar: "CALENDAR",
};

function ResourceRow({ title, type, fileUrl }: { title: string; type: ResourceType; fileUrl?: string | null }) {
  return (
    <div className="group flex items-center justify-between p-5 border-b border-gray-100 last:border-b-0 hover:bg-blue-50/30 transition-colors duration-200">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex-shrink-0 w-8 h-10 bg-white border border-gray-200 flex items-center justify-center group-hover:border-blue-300 transition-colors">
          <svg width="14" height="16" viewBox="0 0 24 28" fill="none" stroke="#9ca3af" strokeWidth="1.5" className="group-hover:stroke-blue-500 transition-colors">
            <path d="M4 2h10l6 6v18H4z" />
            <path d="M14 2v6h6" />
            <line x1="8" y1="14" x2="16" y2="14" />
            <line x1="8" y1="18" x2="14" y2="18" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className={`${playfair.className} text-gray-800 text-sm font-medium truncate group-hover:text-blue-900 transition-colors`}>{title}</p>
        </div>
        <span className={`${cinzel.className} text-[12px] font-bold px-2 py-0.5 border rounded-full flex-shrink-0 ${colors[type]}`}>{labels[type]}</span>
      </div>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        {fileUrl ? (
          <motion.a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${cinzel.className} text-[12px] font-semibold tracking-widest px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 flex items-center gap-1`}
            style={{ backgroundColor: COLOR_ONE }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v13M7 10l5 5 5-5" />
              <path d="M3 20h18" />
            </svg>
            DOWNLOAD
          </motion.a>
        ) : (
          <span className={`${cinzel.className} text-[12px] font-semibold tracking-widest px-4 py-2 text-gray-400 border border-gray-200 flex items-center`}>
            AWAITING FILE
          </span>
        )}
      </div>
    </div>
  );
}

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-1 mt-3">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={14} />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-6 h-6 flex items-center justify-center transition-all duration-200 ${cinzel.className} text-[12px] font-bold tracking-wide
            ${p === current
              ? "bg-[#020818] text-white"
              : "text-gray-400 hover:text-gray-700"
            }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

const PAGE_SIZE = 4;

function PaginatedResourceGroup({ label, items }: { label: string; items: ResourceItem[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const visible = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mb-10">
      <h3 className={`${cinzel.className} text-xs font-bold tracking-[0.3em] text-gray-400 mb-4 uppercase`}>— {label}</h3>
      {items.length === 0 ? (
        <div className={`${playfair.className} border border-gray-200 p-5 text-sm text-gray-400 italic`}>
          No documents published yet.
        </div>
      ) : (
        <>
          <motion.div
            key={page}
            initial={{ opacity: 0, translateY: 6 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ willChange: "opacity, transform" }}
            className="border border-gray-200"
          >
            {visible.map((item) => (
              <ResourceRow key={item.title} title={item.title} type={item.type} fileUrl={item.fileUrl} />
            ))}
          </motion.div>
          <Pagination current={page} total={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export interface ExamResourcesData {
  results: ResourceItem[];
  notices: ResourceItem[];
  schedules: ResourceItem[];
}

export default function ExaminationsPage({
  results = [],
  notices = [],
  schedules = [],
}: Partial<ExamResourcesData>) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className={`${cinzel.className} ${playfair.className} bg-white text-gray-900 overflow-x-hidden`}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex flex-col overflow-hidden bg-white">
        {/* Parallax background — grid removed */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full bg-blue-50/70 blur-[100px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-100/40 blur-[80px]" />
        </motion.div>

        {/* Hero Content — left ~55%, illustration right ~45% */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex items-center flex-1 w-full max-w-7xl mx-auto px-6 lg:px-16"
        >
          {/* Left: text */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center mb-4"
              style={{ gap: "clamp(8px,1vw,18px)" }}
            >
              <div className="h-px bg-[#0a2463]" style={{ width: "clamp(24px,2.5vw,44px)" }} />
              <span
                className={`${cinzel.className} text-[#0a2463] uppercase font-medium tracking-widest`}
                style={{ fontSize: "clamp(11px,0.72vw,13px)" }}
              >
                Academic Affairs
              </span>
            </motion.div>

            {/* H1 — gradient, tighter size */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                className={`${cinzel.className} font-black leading-none tracking-tight`}
                style={{
                  fontSize: "clamp(2.6rem,5vw,4.2rem)",
                  ...gradientTextStyle,
                }}
              >
                EXAMINATIONS
              </motion.h1>
            </div>

            {/* Rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              style={{ originX: 0, backgroundColor: "#0a2463" }}
              className="h-px mb-6 max-w-sm w-full opacity-20"
            />

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className={`${playfair.className}`}
              style={{
                color: "#555",
                fontSize: "clamp(12px,0.9vw,15px)",
                lineHeight: 1.75,
                maxWidth: "clamp(300px,34vw,520px)",
              }}
            >
              LEAD College follows a robust, transparent, and outcome-based examination system
              aligned with its autonomous status. The evaluation framework emphasizes continuous
              assessment, skill-based evaluation, and authentic measurement of learning outcomes —
              conducted with integrity, confidentiality, and fairness.
            </motion.p>

            {/* Tags */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 mt-6"
            >
              {["Fairness", "Transparency", "Technology-Enabled"].map((tag) => (
                <span
                  key={tag}
                  className={`${cinzel.className} text-[12px] tracking-widest px-4 py-2 border border-blue-200 text-blue-700 bg-blue-50`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Unsplash illustration area */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            className="hidden lg:flex w-[45%] h-full items-center justify-end pointer-events-none select-none"
          >
            <div className="relative w-full max-w-[480px] aspect-[4/3]">
              {/* Decorative frame lines */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#0a2463]/20" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#0a2463]/20" />
              <div className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl">
                <img
                  src="/convert/LEAD56.jpg"
                  alt="Examination hall"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.85)" }}
                />
                <div className="absolute inset-0" style={{ background: "rgba(10,36,99,0.08)" }} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-blue-400 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── SCROLLING BANNER ─────────────────────────────────────────────── */}
      <ScrollingBanner />

      {/* ── ABOUT OFFICE ─────────────────────────────────────────────────── */}
      <section id="office" className="py-28 bg-white relative overflow-hidden">
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-60" />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* Left: Unsplash photo */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto overflow-hidden rounded-sm shadow-xl">
              <img
                src="/convert/LEAD49.webp"
                alt="Academic integrity"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.9)" }}
              />
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(180deg, #0a2463, #1d4ed8)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, rgba(2,8,24,0.6), transparent)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className={`${cinzel.className} text-white/50 text-[12px] tracking-[0.22em] uppercase mb-1`}>Office of Examinations</p>
                <p className={`${playfair.className} text-white text-sm font-semibold`}>LEAD College</p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 text-white px-6 py-3 shadow-xl"
              style={{ backgroundColor: COLOR_ONE }}
            >
              <span className={`${cinzel.className} text-xs tracking-widest`}>OFFICE OF EXAMINATIONS</span>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className={`${cinzel.className} text-blue-600 text-xs tracking-[0.3em] uppercase mb-4 block`}>
              About Our Office
            </span>

            <h2
              className={`${cinzel.className} text-4xl font-bold leading-tight mb-6`}
              style={gradientTextStyle}
            >
              UPHOLDING ACADEMIC
              <br />
              INTEGRITY
            </h2>
            <div className="w-12 h-0.5 bg-blue-700 mb-8" />

            <p
              className={`${playfair.className} mb-5`}
              style={{ color: "#555", fontSize: "clamp(12px,0.9vw,15px)", lineHeight: 1.75 }}
            >
              The Office of Examinations at LEAD College is dedicated to maintaining the highest
              standards of academic integrity and ensuring fair, transparent, and efficient
              conduct of all examinations.
            </p>
            <p
              className={`${playfair.className} mb-8`}
              style={{ color: "#555", fontSize: "clamp(12px,0.9vw,15px)", lineHeight: 1.75 }}
            >
              Our mission is to facilitate a seamless examination process that upholds the
              institution's commitment to excellence in education — supported by technology-enabled
              processes and clear academic regulations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── RESPONSIBILITIES ──────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionReveal className="text-center mb-16">
            <span className={`${cinzel.className} text-blue-600 text-xs tracking-[0.4em] uppercase block mb-4`}>What We Do</span>
            <h2 className={`${cinzel.className} text-4xl font-bold`} style={gradientTextStyle}>KEY RESPONSIBILITIES</h2>
            <div className="w-12 h-0.5 bg-blue-700 mx-auto mt-6" />
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>, title: "Planning & Scheduling", desc: "Comprehensive planning and scheduling of all university examinations across programs and semesters." },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 12l2 2 4-4" /></svg>, title: "Hall Tickets", desc: "Preparation and issuance of hall tickets ensuring every eligible student can participate." },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 1 0-16 0" /></svg>, title: "Invigilators", desc: "Systematic appointment and briefing of qualified invigilators for all examination halls." },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="12" y2="15" /></svg>, title: "Question Papers", desc: "Secure handling, confidential dispatch, and safe custody of all question papers." },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>, title: "Results Processing", desc: "Accurate and timely processing and publication of examination results for all students." },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>, title: "Record Maintenance", desc: "Maintaining comprehensive and secure examination records for institutional and regulatory purposes." },
            ].map((item, i) => (
              <ResponsibilityCard key={i} icon={item.icon} title={item.title} desc={item.desc} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT SUPPORT — dark bg ─────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ backgroundColor: COLOR_ONE }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className={`${cinzel.className} text-blue-300 text-xs tracking-[0.4em] uppercase block mb-4`}>For Students</span>
              <h2 className={`${cinzel.className} text-4xl font-bold text-white mb-6 leading-tight`}>
                STUDENT<br />SUPPORT SERVICES
              </h2>
              <div className="w-12 h-0.5 bg-blue-400 mb-8" />
              <p className={`${playfair.className} text-blue-100 mb-6`} style={{ fontSize: "clamp(12px,0.9vw,15px)", lineHeight: 1.75 }}>
                Our dedicated support team provides comprehensive guidance on all examination
                procedures, ensuring every student is well-informed and prepared.
              </p>
              <p className={`${playfair.className} text-blue-200`} style={{ fontSize: "clamp(12px,0.9vw,15px)", lineHeight: 1.75 }}>
                We address queries related to hall tickets, results, revaluation processes,
                and special examination requirements for students with specific needs — because
                every student deserves equitable access to academic success.
              </p>
            </motion.div>

            <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Hall Tickets", desc: "Download & queries", icon: <Ticket size={28} strokeWidth={1.5} /> },
                { title: "Results", desc: "Viewing & understanding", icon: <BarChart2 size={28} strokeWidth={1.5} /> },
                { title: "Revaluation", desc: "Process & guidelines", icon: <SearchCode size={28} strokeWidth={1.5} /> },
                { title: "Special Needs", desc: "Accommodation support", icon: <Accessibility size={28} strokeWidth={1.5} /> },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-colors duration-300 ">
                  <div className="text-blue-200 mb-3">{item.icon}</div>
                  <h4 className={`${cinzel.className} text-white text-sm font-bold tracking-wide mb-1`}>{item.title}</h4>
                  <p className={`${playfair.className} text-blue-300 text-xs`}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FACULTY ───────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionReveal className="text-center mb-16">
            <span className={`${cinzel.className} text-blue-600 text-xs tracking-[0.4em] uppercase block mb-4`}>Leadership</span>
            <h2 className={`${cinzel.className} text-4xl font-bold`} style={gradientTextStyle}>EXAMINATION CONTROLLERS</h2>
            <div className="w-12 h-0.5 bg-blue-700 mx-auto mt-6 mb-4" />
            <p className={`${playfair.className} text-gray-500 max-w-xl mx-auto italic`} style={{ fontSize: "clamp(12px,0.9vw,15px)" }}>
              Our experienced examination faculty ensure the highest standards of academic integrity and institutional excellence.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <FacultyCard name="Dr. Sheena M S" role="Chief Examination Controller" qualifications="M.Com · NET · JRF · PhD · PDF" email="dr.sheena@lead.ac.in" initials="SMS" delay={0} />
            <FacultyCard name="Mr. Prabhakaran P V" role="Joint Controller of Examinations" email="prabhakaran@lead.ac.in" initials="PPV" delay={1} />
          </div>
        </div>
      </section>

      {/* ── RESULTS & NOTICES ─────────────────────────────────────────────── */}
      <section id="results" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <SectionReveal className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className={`${cinzel.className} text-blue-600 text-xs tracking-[0.4em] uppercase block mb-4`}>Downloads</span>
                <h2 className={`${cinzel.className} text-4xl font-bold`} style={gradientTextStyle}>RESULTS & NOTICES</h2>
                <div className="w-12 h-0.5 bg-blue-700 mt-6" />
              </div>
              <p className={`${playfair.className} text-gray-500 max-w-sm italic`} style={{ fontSize: "clamp(12px,0.9vw,14px)" }}>
                All documents are available for download. Click Download for official copies.
              </p>
            </div>
          </SectionReveal>

          <PaginatedResourceGroup label="EXAMINATION RESULTS" items={results} />
          <PaginatedResourceGroup label="NOTICES & CIRCULARS" items={notices} />
          <PaginatedResourceGroup label="SCHEDULES & CALENDARS" items={schedules} />

          <motion.p
            variants={fadeIn}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${playfair.className} text-gray-400 text-xs italic mt-6 text-center`}
          >
            Documents are updated regularly. For archived results, please contact the Office of Examinations.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: COLOR_ONE }}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-900/30 blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <SectionReveal>
            <span className={`${cinzel.className} text-blue-400 text-xs tracking-[0.4em] uppercase block mb-6`}>Get In Touch</span>
            <h2 className={`${cinzel.className} text-4xl md:text-5xl font-black text-white mb-6 leading-tight`}>
              HAVE QUESTIONS ABOUT
              <br />
              YOUR <span className="text-blue-400">EXAMINATION?</span>
            </h2>
            <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-8" />
            <p className={`${playfair.className} text-gray-300 max-w-xl mx-auto mb-10`} style={{ fontSize: "clamp(12px,0.9vw,15px)", lineHeight: 1.75 }}>
              Our examination office team is here to assist you. Reach out for any queries
              regarding hall tickets, results, schedules, or revaluation.
            </p>
            <div className="flex justify-center">
              <motion.a
                href="mailto:examinations@lead.ac.in"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`${cinzel.className} text-xs tracking-[0.2em] px-12 py-4 border border-white/40 text-white hover:border-white hover:bg-white/10 transition-all duration-300`}
              >
                EMAIL THE OFFICE
              </motion.a>
            </div>
          </SectionReveal>
        </div>
      </section>

    </div>
  );
}