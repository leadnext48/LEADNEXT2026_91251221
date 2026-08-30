"use client";

import React, {
  useEffect, useRef, useState, useCallback, CSSProperties,
  useMemo,
} from "react";
import Image from "next/image";
import {
  TrendingUp, Award, Users, Building2, ArrowUpRight,
  MapPin, Mail, Phone, ChevronRight, BarChart2, Star,
  Briefcase, CheckCircle, Percent, Calendar, Clock,
  ShoppingBag, Dumbbell, Shirt, Heart, ShoppingCart,
  Cpu, GraduationCap, Package,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import Lottie from "lottie-react";

/* ─── Brand ─────────────────────────────────────────── */
const BLUE  = "#1e3a8a";
const NAVY  = "#0f1e4a";
const WHITE = "#ffffff";

/* ─── Gradient text ─────────────────────────────────── */
const GRAD_TEXT: CSSProperties = {
  background: "linear-gradient(90deg, #000000 0%, #1e3a8a 60%, #1e3a8a 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  display: "inline",
};

/* ─── Typography ────────────────────────────────────── */
const C  = `'Cinzel', serif`;
const PF = `'Playfair Display', serif`;

const eyebrowStyle = (light = false): CSSProperties => ({
  fontFamily: C, fontSize: "0.74rem",
  letterSpacing: "0.26em", textTransform: "uppercase",
  color: light ? "rgba(255,255,255,0.4)" : BLUE,
  display: "flex", alignItems: "center", gap: "0.65rem",
  marginBottom: "1rem",
});
const h2Style = (sz = "clamp(2rem,3.5vw,3.2rem)"): CSSProperties => ({
  fontFamily: C, fontSize: sz,
  fontWeight: 700, lineHeight: 1.1,
  letterSpacing: "0.01em", margin: "0 0 1.2rem",
});
const bodyStyle: CSSProperties = {
  fontFamily: PF, fontSize: "clamp(0.92rem,1vw,1rem)",
  lineHeight: 1.9, color: "#555",
};
const rule = (light = false) => (
  <span style={{
    display: "inline-block", width: 28, height: 1,
    background: light ? "rgba(255,255,255,0.3)" : BLUE,
    opacity: light ? 1 : 0.45, flexShrink: 0,
  }} />
);

/* ─── Data ──────────────────────────────────────────── */
const BATCH_CHART = [
  { b: "2018–20", med: 3.0,  avg: 3.5,  high: 10.0,  placed: 98.59 },
  { b: "2019–21", med: 3.6,  avg: 4.2,  high: 12.0,  placed: 97.50 },
  { b: "2020–22", med: 4.0,  avg: 4.3,  high: 12.0,  placed: 95.00 },
  { b: "2021–23", med: 4.75, avg: 5.0,  high: 14.0,  placed: 96.36 },
  { b: "2022–24", med: 4.2,  avg: 4.53, high: 14.13, placed: 95.28 },
  { b: "2023–25", med: 4.75, avg: 5.29, high: 12.16, placed: 91.86 },
  { b: "2024–26", med: 5.0,  avg: 5.86, high: 21.67, placed: null  },
];

const HIGHLIGHTS = [
  { batch: "2020–22", median: "₹4.0 LPA",  p80: "₹5.3 LPA",  high: "₹12.0 LPA",  placed: "95.00%", cos: "170+", topCo: "Federal Bank"         },
  { batch: "2021–23", median: "₹4.75 LPA", p80: "₹7.0 LPA",  high: "₹14.0 LPA",  placed: "96.36%", cos: "200+", topCo: "Federal Bank"         },
  { batch: "2022–24", median: "₹4.2 LPA",  p80: "₹4.6 LPA",  high: "₹14.13 LPA", placed: "95.28%", cos: "200+", topCo: "Federal Bank"         },
  { batch: "2023–25", median: "₹4.75 LPA", p80: "₹7.27 LPA", high: "₹12.16 LPA", placed: "91.86%", cos: "184",  topCo: "Jaro Education"       },
  { batch: "2024–26", median: "₹5.0 LPA",  p80: "₹8.5 LPA",  high: "₹21.67 LPA", placed: "73.45%",      cos: "219+", topCo: "Amana Insurance Brokers" },
];

const SECTORS = [
  { name: "Marketing & Sales",      pct: 58.2 },
  { name: "BFSI",                   pct: 16.5 },
  { name: "Analytics & IT",         pct: 8.8  },
  { name: "HR & Consulting",        pct: 6.0  },
  { name: "Manufacturing & Retail", pct: 5.5  },
  { name: "Operations & SCM",       pct: 4.9  },
];
const SECTOR_BLUES = ["#0f1e4a","#1e3a8a","#2a52a8","#3b6fc4","#6b9ed4","#a8c8ea"];

const INTERN_LOGOS = Array.from({ length: 10 }, (_, i) => ({
  src: `/logos/internship/${i + 1}.png`,
  name: `Internship Partner ${i + 1}`,
}));

const RECRUITER_LOGOS = Array.from({ length: 48 }, (_, i) => ({
  src: `/logos/recruiters/${i + 1}.png`,
  name: `Recruiter ${i + 1}`,
}));

const CONTACTS = [
  { name: "Prof. G R Nair",      role: "Dean – Corporate Relations",     email: "gr.nair@lead.ac.in",        phone: "+91 97784 17773" },
  { name: "Mr. Ajay Japamani",   role: "Training & Placement Officer",   email: "ajay@lead.ac.in",           phone: "+91 98099 83878" },
  { name: "Mr. George Joseph",   role: "Manager – Corporate Relations",  email: "george.joseph@lead.ac.in",  phone: "+91 73067 02476" },
  { name: "Mr. Abhinav Nambi K", role: "Sr. Executive – Placements",     email: "placement@lead.ac.in",      phone: "+91 96560 41460" },
];

const PROCESS = [
  { n: "01", t: "Pre-Placement Training",  b: "Six months of structured workshops — aptitude, communication, mock interviews, domain case studies — before the placement season opens." },
  { n: "02", t: "Profile Registration",    b: "Students build verified profiles reviewed by faculty and industry mentors. Domain, specialisation, and career goals are mapped to company requirements." },
  { n: "03", t: "Company Engagement",      b: "The placement cell conducts year-round corporate outreach. 219+ companies engaged the 2024–26 batch as of February 2026." },
  { n: "04", t: "Selection & Offer",       b: "Drives, PPOs, and walk-in processes facilitated on campus. Real-time guidance through every round of selection." },
  { n: "05", t: "Post-Offer Support",      b: "Offer documentation, salary negotiation guidance, and pre-joining orientation. LEAD walks alongside every student from offer to Day 1." },
];

const TESTIMONIALS = [
  { name: "Arjun Menon",      placed: "Placed at HDFC Life",         role: "Sales Manager",              batch: "2022–24", spec: "Marketing", pkg: "₹6.2 LPA",  q: "The rigour of training at LEAD gave me a distinct edge — not just in aptitude but in articulating value in every interview room. HDFC Life was my first choice, and I walked in prepared." },
  { name: "Sreelakshmi R.",   placed: "Placed at Axis Bank",          role: "Relationship Officer",       batch: "2021–23", spec: "Finance",   pkg: "₹5.5 LPA",  q: "My journey from a small town to a national bank began here. The placement team left no door untried on my behalf. I still remember the mock interview sessions that made the real ones feel easy." },
  { name: "Vishnu Prasad",    placed: "Offer from Federal Bank",      role: "Credit Analyst",             batch: "2020–22", spec: "Finance",   pkg: "₹14 LPA",   q: "14 LPA straight out of campus. The confidence LEAD instilled — that was the real differentiator. Three years later, I lead a team of six." },
  { name: "Anjali Thomas",    placed: "Placed at ITC Limited",        role: "Area Sales Executive",       batch: "2022–24", spec: "Marketing", pkg: "₹7.0 LPA",  q: "ITC was a dream for me. The internship exposure and the domain-specific case studies during the MBA made sure I was ready when the opportunity arrived." },
  { name: "Mohammed Farhan",  placed: "Placed at Bajaj Finserv",      role: "Business Development Exec.", batch: "2023–25", spec: "Finance",   pkg: "₹5.8 LPA",  q: "The placement cell didn't just connect me with a company — they prepared me for a career. The structured process gave me clarity on what I wanted and how to get it." },
  { name: "Divya Krishnan",   placed: "Placed at PolicyBazaar",       role: "Insurance Advisor",          batch: "2021–23", spec: "Marketing", pkg: "₹6.0 LPA",  q: "What sets LEAD apart is that the learning never felt theoretical. Every case study, every presentation was preparing us for exactly this kind of role." },
  { name: "Rahul Nambiar",    placed: "Placed at IndusInd Bank",      role: "Branch Banking Officer",     batch: "2023–25", spec: "Finance",   pkg: "₹5.2 LPA",  q: "47% of our batch interned outside Kerala. That exposure — navigating a new city, a new organisation — it shapes you in ways no classroom can. And employers notice." },
  { name: "Priya Suresh",     placed: "Placed at Asian Paints",       role: "Territory Sales Manager",    batch: "2022–24", spec: "Marketing", pkg: "₹6.8 LPA",  q: "Asian Paints recruited from LEAD for the third consecutive year. That kind of trust doesn't come from a brochure — it comes from the quality of students they've seen." },
  { name: "Arun Chandran",    placed: "Offer from Jaro Education",    role: "Corporate Training Lead",    batch: "2023–25", spec: "HR",        pkg: "₹12.16 LPA", q: "The highest package in my batch came down to one thing — showing up every day at LEAD with intent. The institution rewards that. And so do the companies." },
];

/* ─── useInView (re-triggers on leave/enter) ────────── */
function useInView(threshold = 0.12): [React.RefCallback<Element>, boolean] {
  const [vis, set] = useState(false);
  const obs = useRef<IntersectionObserver | null>(null);
  const ref = useCallback<React.RefCallback<Element>>((node) => {
    obs.current?.disconnect();
    if (!node) return;
    obs.current = new IntersectionObserver(
      (e) => set(e[0].isIntersecting), { threshold }
    );
    obs.current.observe(node);
  }, [threshold]);
  useEffect(() => () => obs.current?.disconnect(), []);
  return [ref, vis];
}

/* ─── Animated counter ──────────────────────────────── */
function Cnt({ n, d = 0, s = "" }: { n: number; d?: number; s?: string }) {
  const [v, sv] = useState(0);
  const [ref, vis] = useInView(0.3);
  const ran = useRef(false);
  useEffect(() => {
    if (!vis) { ran.current = false; sv(0); return; }
    if (ran.current) return;
    ran.current = true;
    const T = 1600, t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / T, 1);
      sv(parseFloat((n * (1 - Math.pow(1 - p, 3))).toFixed(d)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [vis, n, d]);
  return <span ref={ref as React.RefCallback<HTMLSpanElement>}>{v.toFixed(d)}{s}</span>;
}

/* ─── Reveal ────────────────────────────────────────── */
function Rev({ children, delay = 0, x = 0, y = 22, style = {} }: {
  children: React.ReactNode; delay?: number; x?: number; y?: number; style?: CSSProperties;
}) {
  const [ref, vis] = useInView(0.1);
  return (
    <div ref={ref as React.RefCallback<HTMLDivElement>} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : `translate(${x}px,${y}px)`,
      transition: `opacity .8s ${delay}s cubic-bezier(.22,1,.36,1), transform .8s ${delay}s cubic-bezier(.22,1,.36,1)`,
      ...style,
    }}>{children}</div>
  );
}

/* ─── Donut chart ───────────────────────────────────── */
function Donut() {
  const [ref, vis] = useInView(0.15);
  const R = 88, cx = 110, cy = 110, sw = 26, circ = 2 * Math.PI * R;
  let cum = 0;
  const slices = SECTORS.map((s, i) => {
    const start = cum;
    cum += s.pct / 100;
    return { ...s, start, color: SECTOR_BLUES[i] };
  });
  return (
    <div ref={ref as React.RefCallback<HTMLDivElement>}
      style={{ display: "flex", alignItems: "center", gap: "2.5rem", flexWrap: "wrap" }}>
      <svg viewBox="0 0 220 220" style={{ width: "clamp(160px,18vw,200px)", flexShrink: 0 }}>
        {slices.map((sl, i) => {
          const len = (sl.pct / 100) * circ;
          const gap = circ - len;
          const rot = sl.start * 360 - 90;
          return (
            <circle key={sl.name}
              cx={cx} cy={cy} r={R}
              fill="none" stroke={sl.color} strokeWidth={sw}
              strokeDasharray={vis ? `${len} ${gap}` : `0 ${circ}`}
              transform={`rotate(${rot} ${cx} ${cy})`}
              style={{ transition: `stroke-dasharray 1.1s ${i * 0.13}s cubic-bezier(.22,1,.36,1)` }}
            />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle"
          style={{ fontFamily: C, fontSize: 18, fontWeight: 700, fill: BLUE }}>2024</text>
        <text x={cx} y={cy + 14} textAnchor="middle"
          style={{ fontFamily: PF, fontSize: 12, fill: "#aaa" }}>Season</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1, minWidth: 180 }}>
        {slices.map(sl => (
          <div key={sl.name} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: sl.color, flexShrink: 0 }} />
            <span style={{ fontFamily: PF, fontSize: "0.83rem", color: "#444", flex: 1, lineHeight: 1.8 }}>{sl.name}</span>
            <span style={{ fontFamily: C, fontSize: "0.78rem", fontWeight: 700, color: BLUE }}>{sl.pct.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Line chart ── */
function LineChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [ref, vis] = useInView(0.4);
  const animFired = useRef(false);
  const W = 940, H = 290, PX = 80, PY = 44;
  const n = BATCH_CHART.length;
  const xS = (W - PX * 2) / (n - 1);
  const toX = (i: number) => PX + i * xS;

  const yMin = 2.5, yMax = 5.5;
  const mY = (v: number) => H - PY - ((v - yMin) / (yMax - yMin)) * (H - PY * 2);
  const mkD = (pts: [number, number][]) =>
    pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const mPts: [number, number][] = BATCH_CHART.map((d, i) => [toX(i), mY(d.med)]);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll<SVGPathElement>("path.animated");
    if (!vis) {
      animFired.current = false;
      paths.forEach(p => {
        p.style.transition = "none";
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      return;
    }
    if (animFired.current) return;
    animFired.current = true;
    paths.forEach(p => {
      const len = p.getTotalLength();
      p.style.transition = "none";
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.getBoundingClientRect();
      p.style.transition = "stroke-dashoffset 3.5s 0.9s cubic-bezier(.22,1,.36,1)";
      p.style.strokeDashoffset = "0";
    });
  }, [vis]);

  const yTicks = [3, 3.5, 4, 4.5, 5, 5.5];

  return (
    <div ref={ref as React.RefCallback<HTMLDivElement>} style={{ width: "100%" }}>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE} stopOpacity=".18" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </linearGradient>
        </defs>
        {yTicks.map(v => (
          <g key={v}>
            <line x1={PX} y1={mY(v)} x2={W - PX} y2={mY(v)}
              stroke="rgba(30,58,138,.06)" strokeWidth="1" />
            <text x={PX - 10} y={mY(v) + 4} textAnchor="end"
              style={{ fontFamily: PF, fontSize: 12, fill: "#ccc" }}>₹{v}L</text>
          </g>
        ))}
        {BATCH_CHART.map((d, i) => (
          <text key={d.b} x={toX(i)} y={H - 10} textAnchor="middle"
            style={{ fontFamily: PF, fontSize: 12, fill: "#bbb" }}>{d.b}</text>
        ))}
        <path d={mkD(mPts) + ` L${toX(n - 1)},${H - PY} L${toX(0)},${H - PY} Z`}
          fill="url(#lg)" />
        <path className="animated" d={mkD(mPts)}
          fill="none" stroke={BLUE} strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round" />
        {mPts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5"
            fill={WHITE} stroke={BLUE} strokeWidth="2.5"
            style={{ opacity: vis ? 1 : 0, transition: `opacity .3s ${1.4 + i * .12}s` }} />
        ))}
        {BATCH_CHART.map((d, i) => (
          <text key={d.b + "val"} x={toX(i)} y={mY(d.med) - 10} textAnchor="middle"
            style={{ fontFamily: C, fontSize: 12, fontWeight: 700, fill: BLUE,
              opacity: vis ? 1 : 0, transition: `opacity .3s ${1.5 + i * .12}s` }}>
            ₹{d.med}L
          </text>
        ))}
      </svg>
      <div style={{ display: "flex", gap: "2.5rem", paddingLeft: PX, marginTop: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="26" height="8">
            <line x1="0" y1="4" x2="26" y2="4" stroke={BLUE} strokeWidth="2.5" />
          </svg>
          <span style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.72rem", color: "#bbb" }}>Median Salary (LPA) — 7 Graduating Batches</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
export default function PlacementsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes marqueeRev { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        *{box-sizing:border-box;}
      `}</style>
      <main style={{ background: WHITE, color: "#0D0D0D", overflowX: "hidden", fontFamily: PF }}>
        <HeroSection />
        <TrajectorySection />
        <SectorSection />
        <RecruitersSection />
        <InternshipSection />
        <ProcessSection />
        <VoicesSection />
        <HireSection />
      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   § 1  HERO
═══════════════════════════════════════════════════════ */
function HeroSection() {
  const [ref, vis] = useInView(0.05);
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/career.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <section
      ref={ref as React.RefCallback<HTMLElement>}
      style={{
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1.5rem,3vh,3rem) clamp(2rem,5vw,5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background LEAD Text */}
      <div
        style={{
          position: "absolute",
          bottom: "-4%",
          right: "-1%",
          fontFamily: C,
          fontSize: "clamp(4rem,14vw,14rem)", // reduced
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(30,58,138,0.04)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
          opacity: vis ? 1 : 0,
          transition: "opacity 1.5s .3s",
        }}
      >
        LEAD
      </div>

      {/* Layout */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(2rem,5vw,5rem)",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT CONTENT */}
        <div style={{ flex: "1 1 480px" }}>
          <div
            style={{
              ...eyebrowStyle(),
              marginBottom: "0.8rem",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateX(-12px)",
              transition: "opacity .7s, transform .7s",
            }}
          >
            {rule()} LEAD College (Autonomous) · Placements & Careers
          </div>

          <h1
            style={{
              fontFamily: C,
              fontSize: "clamp(1.8rem,4.2vw,4.8rem)", // reduced ~20%
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: "0 0 0.6em",
              maxWidth: "16ch",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(30px)",
              transition:
                "opacity .9s .1s cubic-bezier(.22,1,.36,1), transform .9s .1s cubic-bezier(.22,1,.36,1)",
            }}
          >
            Where ambition
            <br />
            <span style={GRAD_TEXT}>finds its place.</span>
          </h1>

          <div
            style={{
              width: 36,
              height: 2,
              background: BLUE,
              margin: "0 0 1rem",
              transformOrigin: "left",
              transform: vis ? "scaleX(1)" : "scaleX(0)",
              transition:
                "transform .7s .35s cubic-bezier(.22,1,.36,1)",
            }}
          />

          <p
            style={{
              ...bodyStyle,
              maxWidth: "52ch",
              marginBottom: "1.8rem",
              fontSize: "clamp(0.92rem,0.9vw,1rem)", // enlarged for readability
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(14px)",
              transition:
                "opacity .8s .4s, transform .8s .4s cubic-bezier(.22,1,.36,1)",
            }}
          >
            For six consecutive batches, every eligible and prepared student at LEAD has received a placement offer.
            This page documents that record — the companies, the salaries, the sectors, and the process behind it.
            Not a pitch. A proof.
          </p>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
              gap: "1.2rem",
              borderTop: "1px solid rgba(30,58,138,.1)",
              paddingTop: "1.2rem",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(12px)",
              transition:
                "opacity .8s .5s, transform .8s .5s cubic-bezier(.22,1,.36,1)",
            }}
          >
            {[
              { n: "21.67", s: " LPA", l: "Highest Package\n2024–26 Batch" },
              { n: "500+", s: "", l: "Recruiting Companies\nAcross 6 Batches" },
              { n: "95%+", s: "", l: "Average Placement\nRate" },
              { n: "219+", s: "", l: "Companies Engaged\nCurrent Batch" },
            ].map((st) => (
              <div key={st.l}>
                <div
                  style={{
                    fontFamily: C,
                    fontWeight: 700,
                    fontSize: "clamp(0.9rem,1.4vw,1.6rem)", // reduced ~20%
                    color: BLUE,
                    lineHeight: 1,
                  }}
                >
                  {st.n}{st.s}
                </div>
                <div
                  style={{
                    fontFamily: PF,
                    fontStyle: "italic",
                    fontSize: "0.74rem",
                    color: "#aaa",
                    marginTop: "0.25rem",
                    whiteSpace: "pre-line",
                    lineHeight: 1.4,
                  }}
                >
                  {st.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT LOTTIE */}
        <div
          style={{
            flex: "1 1 340px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: vis ? 1 : 0,
            transition: "opacity 1.2s .8s",
          }}
        >
          {animationData && (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{
                width: "clamp(200px,26vw,380px)", // slightly reduced
                height: "auto",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   § 2  TRAJECTORY
═══════════════════════════════════════════════════════ */
function TrajectorySection() {
  const [hdr, hdrVis] = useInView(0.08);
  const [active, setActive] = useState(4);
  const h = HIGHLIGHTS[active];

  return (
    <section style={{ background: WHITE, padding: "clamp(4rem,8vh,7rem) clamp(2rem,5vw,5rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div ref={hdr as React.RefCallback<HTMLDivElement>} style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            ...eyebrowStyle(), justifyContent: "center",
            opacity: hdrVis ? 1 : 0, transition: "opacity .7s",
          }}>{rule()} Placement Data Retrospective · 2018 to 2026</div>

          <h2 style={{
            fontFamily: C, fontSize: "clamp(1.5rem,3vw,3rem)",
            fontWeight: 700, lineHeight: 1.1, letterSpacing: "0.01em", margin: "0 0 0.8rem",
            opacity: hdrVis ? 1 : 0, transform: hdrVis ? "none" : "translateY(22px)",
            transition: "opacity .8s .1s, transform .8s .1s cubic-bezier(.22,1,.36,1)",
          }}>
            <span style={GRAD_TEXT}>A consistent record of career outcomes.</span>
          </h2>

          <p style={{
            ...bodyStyle, fontSize: "clamp(0.92rem,0.9vw,1rem)", maxWidth: "58ch", margin: "0 auto",
            opacity: hdrVis ? 1 : 0, transition: "opacity .8s .2s",
          }}>
            Median salary has grown from ₹3 LPA to ₹5 LPA across seven graduating batches.
            Highest package reached ₹21.67 LPA in 2024–26.
          </p>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <LineChart />
        </div>

        <div style={{ marginTop: "5rem", marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: C, fontSize: "clamp(1rem,1.6vw,1.4rem)", fontWeight: 700, letterSpacing: "0.04em", color: "#0D0D0D", marginBottom: "0.6rem" }}>Year-wise Placement Summary</div>
          <div style={{ fontFamily: PF, fontStyle: "italic", fontSize: "clamp(0.92rem,1vw,1rem)", color: "#888", marginBottom: "1.5rem", maxWidth: "52ch" }}>
            Select a graduating batch to view detailed salary, placement rate, and company data for that academic year.
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {HIGHLIGHTS.map((hh, i) => (
            <button key={hh.batch} onClick={() => setActive(i)} style={{
              fontFamily: C, fontSize: "0.74rem", letterSpacing: "0.14em",
              textTransform: "uppercase", padding: "0.55rem 1.1rem",
              background: active === i ? BLUE : "transparent",
              color: active === i ? WHITE : BLUE,
              border: `1px solid ${active === i ? BLUE : "rgba(30,58,138,.2)"}`,
              cursor: "pointer", transition: "all .2s",
            }}>{hh.batch}</button>
          ))}
          </div>
        </div>

        <style>{`
          .pl-summary-grid { grid-template-columns: repeat(5, minmax(0, 1fr)) auto; }
          @media (max-width: 900px){
            .pl-summary-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .pl-summary-report { grid-column: 1 / -1; flex-direction: row !important; align-items: center !important; }
          }
          @media (max-width: 560px){
            .pl-summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
        `}</style>
        <div className="pl-summary-grid" style={{
          display: "grid",
          gap: "1px", background: "rgba(30,58,138,.07)",
          border: "1px solid rgba(30,58,138,.07)",
        }}>
          {[
            { label: "Median CTC",      val: h.median, sub: "All eligible students",  Icon: BarChart2    },
            { label: "80th Percentile", val: h.p80,    sub: "Top quartile earners",   Icon: TrendingUp   },
            { label: "Highest Package", val: h.high,   sub: h.topCo,                  Icon: Star         },
            { label: "Eligible Placed", val: h.placed, sub: "Of opt-in students",     Icon: CheckCircle  },
            { label: "Companies",       val: h.cos,    sub: "Visited campus",         Icon: Briefcase    },
          ].map(item => (
            <div key={item.label} style={{ background: WHITE, padding: "1.5rem 1.25rem" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid rgba(30,58,138,.12)`, display: "flex", alignItems: "center", justifyContent: "center", color: BLUE, marginBottom: "0.9rem" }}>
                <item.Icon size={13} strokeWidth={1.8} />
              </div>
              <div style={{ fontFamily: C, fontWeight: 700, fontSize: "clamp(1rem,1.5vw,1.4rem)", color: BLUE, marginBottom: "0.3rem" }}>{item.val}</div>
              <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.2rem" }}>{item.label}</div>
              <div style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.72rem", color: "#ccc", lineHeight: 1.4 }}>{item.sub}</div>
            </div>
          ))}

          <a className="pl-summary-report" style={{
            background: BLUE, padding: "1.75rem 1.5rem",
            display: "flex", flexDirection: "column",
            alignItems: "flex-start", justifyContent: "space-between",
            textDecoration: "none", minWidth: 140, gap: "1rem",
          }}>
            <div>
              <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: "0.4rem" }}>Batch {h.batch}</div>
              <div style={{ fontFamily: C, fontSize: "0.72rem", fontWeight: 600, color: WHITE, letterSpacing: "0.06em", lineHeight: 1.4 }}>View<br />Detailed<br />Report</div>
            </div>
            <ArrowUpRight size={16} color="rgba(255,255,255,.5)" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   § 3  SECTOR
═══════════════════════════════════════════════════════ */
function SectorSection() {
  const [ref, vis] = useInView(0.1);
  return (
    <section style={{ background: WHITE, padding: "clamp(4rem,8vh,7rem) clamp(2rem,5vw,5rem)" }}>
      <style>{`
        @media (max-width: 640px){
          .pl-sector-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .pl-sector-frame { display: none !important; }
          .pl-sector-offset { left: 0 !important; bottom: 0 !important; }
        }
      `}</style>
      <div className="pl-sector-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(3rem,6vw,7rem)", alignItems: "center" }}
        ref={ref as React.RefCallback<HTMLDivElement>}>
        <div>
          <div style={{ ...eyebrowStyle(false), opacity: vis ? 1 : 0, transition: "opacity .7s" }}>{rule(false)} Sector Distribution · 2024–26</div>
          <h2 style={{
            ...h2Style(), color: "#0D0D0D",
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
            transition: "opacity .8s .1s, transform .8s .1s cubic-bezier(.22,1,.36,1)",
          }}>Every industry<br />has a LEAD alumni.</h2>
          <p style={{ ...bodyStyle, color: "#666", maxWidth: "42ch", marginBottom: "2.5rem", opacity: vis ? 1 : 0, transition: "opacity .8s .2s" }}>
            Marketing & Sales commands 58% of all placed roles. BFSI, Analytics, and HR follow —
            reflecting the breadth of LEAD's MBA specialisations and the diversity of recruiting companies.
          </p>
          <Donut />
        </div>
        <div style={{
          position: "relative",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(28px)",
          transition: "opacity .9s .2s, transform .9s .2s cubic-bezier(.22,1,.36,1)",
        }}>
          <div className="pl-sector-frame" style={{ position: "absolute", top: -16, right: -16, width: "60%", height: "60%", border: "1px solid rgba(30,58,138,.15)", pointerEvents: "none" }} />
          <div style={{ overflow: "hidden", boxShadow: "0 24px 56px rgba(0,0,0,.12)" }}>
            <div style={{ width: "100%", aspectRatio: "4/3", position: "relative", display: "block" }}>
              <Image
                src="/convert/LEAD37.webp"
                alt="Corporate environment"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", filter: "brightness(.9)" }}
              />
            </div>
          </div>
          <div className="pl-sector-offset" style={{ position: "absolute", bottom: "-1.5rem", left: "-1.5rem", width: "42%", aspectRatio: "1/1", overflow: "hidden", border: `4px solid ${WHITE}`, boxShadow: "0 12px 32px rgba(0,0,0,.15)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src="/convert/LEAD15.webp"
                alt="Team"
                fill
                sizes="(max-width: 768px) 42vw, 21vw"
                style={{ objectFit: "cover", filter: "brightness(.9)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   § 4  TOP RECRUITERS — 5-row image marquee
═══════════════════════════════════════════════════════ */


function RecruitersSection() {
  const duplicatedLogos = useMemo(
    () => [...RECRUITER_LOGOS, ...RECRUITER_LOGOS],
    []
  );

  return (
    <section
      style={{
        background: WHITE,
        padding: "clamp(3.5rem,6vh,5.5rem) 0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(2rem,5vw,5rem)",
          marginBottom: "3rem",
          textAlign: "center",
        }}
      >
        <div style={{ ...eyebrowStyle(), justifyContent: "center" }}>
          {rule()} Recruiting Partners
        </div>

        <h2 style={h2Style()}>
          <span style={GRAD_TEXT}>The best are already here.</span>
        </h2>

        <p
          style={{
            ...bodyStyle,
            maxWidth: "52ch",
            margin: "0 auto",
          }}
        >
          45 companies across banking, FMCG, retail, ed-tech, and manufacturing actively recruit from LEAD —
          a growing roster that returns, batch after batch.
        </p>
      </div>

      {/* Marquee Area */}
      <div
        className="pl-marquee-wrap"
        style={{
          margin: "0 auto",
          height: "420px",
          overflow: "hidden",
          position: "relative",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="pl-marquee-grid"
          style={{
            display: "grid",
            gap: "1.4rem",
            animation: "verticalMarquee 28s linear infinite",
          }}
        >
          {duplicatedLogos.map((logo, i) => (
            <div
              key={i}
              style={{
                height: 95,
                position: "relative",
                background: WHITE,
                border: "1px solid rgba(30,58,138,.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .35s cubic-bezier(.22,1,.36,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 28px rgba(30,58,138,.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="150px"
                style={{
                  objectFit: "contain",
                  padding: "16px",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* GLOBAL KEYFRAMES — THIS FIXES HARD REFRESH ISSUE */}
      <style>
        {`
          @keyframes verticalMarquee {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          .pl-marquee-wrap { width: 75%; }
          .pl-marquee-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
          @media (max-width: 1024px){
            .pl-marquee-wrap { width: 88%; }
            .pl-marquee-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          }
          @media (max-width: 700px){
            .pl-marquee-wrap { width: 92%; }
            .pl-marquee-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }
          @media (max-width: 480px){
            .pl-marquee-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
        `}
      </style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   § 5  INTERNSHIP
═══════════════════════════════════════════════════════ */
function InternshipSection() {
  const [ref, vis] = useInView(0.06);
  const sectors = [
    { n: "Retail Sports",  c: 69,  Icon: Dumbbell     },
    { n: "Manufacturing",  c: 57,  Icon: Package       },
    { n: "Retail Fashion", c: 53,  Icon: Shirt         },
    { n: "Others",         c: 41,  Icon: Briefcase     },
    { n: "Healthcare",     c: 22,  Icon: Heart         },
    { n: "E-Commerce",     c: 20,  Icon: ShoppingCart  },
    { n: "IT & ITES",      c: 11,  Icon: Cpu           },
    { n: "Education",      c: 10,  Icon: GraduationCap },
  ];
  const maxC = 69;

  const geoData = [
    { l: "Outside Home State", c: 170, p: 47 },
    { l: "Inside Home State",  c: 139, p: 39 },
    { l: "Home Town",          c: 50,  p: 14 },
  ];

  const phases = [
    {
      num: "Phase 01",
      season: "Autumn / Winter",
      label: "First Immersion",
      dur: "3 Months",
      note: "MBA programme only. Students complete their first semester and transition into their initial industry placement — a 90-day deep-dive into a real organisational environment.",
    },
    {
      num: "Phase 02",
      season: "Monsoon / Early Autumn",
      label: "Field Deployment",
      dur: "3 Months",
      note: "A full summer-to-autumn cycle in the field. Students are placed pan-India — 47% outside their home state — to build independence, professional resilience, and cross-market exposure.",
    },
    {
      num: "Phase 03",
      season: "Autumn / Winter",
      label: "Strategic Close",
      dur: "3 Months",
      note: "The final phase before final placements. Roles become increasingly senior; many students receive pre-placement offers from internship hosts. This phase directly feeds into the placement season.",
    },
  ];

  return (
    <section style={{ background: WHITE, padding: "clamp(4rem,8vh,7rem) clamp(2rem,5vw,5rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }} ref={ref as React.RefCallback<HTMLDivElement>}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ ...eyebrowStyle(), opacity: vis ? 1 : 0, transition: "opacity .7s" }}>{rule()} Experiential Learning · Before the Placement</div>
          <h2 style={{
            fontFamily: C, fontSize: "clamp(2.2rem,5vw,4.8rem)", fontWeight: 700,
            lineHeight: 1.0, letterSpacing: "0.01em", margin: "0 0 1rem", maxWidth: "20ch",
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)",
            transition: "opacity .9s .1s cubic-bezier(.22,1,.36,1), transform .9s .1s cubic-bezier(.22,1,.36,1)",
          }}>
            The internship<br /><span style={GRAD_TEXT}>that defines futures.</span>
          </h2>
          <div style={{ width: 44, height: 2, background: BLUE, margin: "0 0 1.5rem", transformOrigin: "left", transform: vis ? "scaleX(1)" : "scaleX(0)", transition: "transform .7s .3s cubic-bezier(.22,1,.36,1)" }} />
          <p style={{ ...bodyStyle, maxWidth: "60ch", opacity: vis ? 1 : 0, transition: "opacity .8s .3s" }}>
            Three structured phases spanning nine months. Real stipends from real organisations.
            Pan-India exposure that 47% of students experience outside their home state — building the
            professional maturity and independence that recruiting companies recognise immediately.
          </p>
        </div>

        {/* Stipend stat cards */}
        <style>{`
          @media (max-width: 640px){
            .pl-stipend-grid { grid-template-columns: minmax(0, 1fr) !important; }
            .pl-phase-grid { grid-template-columns: minmax(0, 1fr) !important; }
            .pl-geo-grid { grid-template-columns: minmax(0, 1fr) !important; }
          }
        `}</style>
        <div className="pl-stipend-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.25rem", maxWidth: 560, marginBottom: "4rem" }}>
          {[
            { l: "Average Monthly Stipend", v: "₹11,890", sub: "Latest Batch · Phase 1", dark: true  },
            { l: "Highest Stipend Offered",  v: "₹73,000", sub: "Top Performer",          dark: false },
          ].map((c, i) => (
            <div key={c.l} style={{
              background: c.dark ? BLUE : WHITE,
              border: c.dark ? "none" : "1px solid rgba(30,58,138,.12)",
              borderTop: `2px solid ${BLUE}`, padding: "1.75rem",
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
              transition: `opacity .8s ${.4 + i * .12}s, transform .8s ${.4 + i * .12}s cubic-bezier(.22,1,.36,1)`,
            }}>
              <div style={{ fontFamily: C, fontWeight: 700, fontSize: "clamp(1.5rem,2.5vw,2.2rem)", color: c.dark ? WHITE : BLUE, lineHeight: 1, marginBottom: "0.5rem" }}>{c.v}</div>
              <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: c.dark ? "rgba(255,255,255,.45)" : "#bbb", marginBottom: "0.2rem" }}>{c.l}</div>
              <div style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.72rem", color: c.dark ? "rgba(255,255,255,.35)" : "#ccc" }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Phase timeline */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: BLUE, marginBottom: "2.5rem", opacity: vis ? 1 : 0, transition: "opacity .7s .3s" }}>The 9-Month Internship Cycle</div>

          <div className="pl-phase-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 0, position: "relative" }}>
      
            {phases.map((ph, i) => (
              <div key={ph.num} style={{
                position: "relative", zIndex: 1,
                borderLeft: i > 0 ? "1px solid rgba(30,58,138,.07)" : "none",
                opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
                transition: `opacity .8s ${.2 + i * .18}s, transform .8s ${.2 + i * .18}s cubic-bezier(.22,1,.36,1)`,
              }}>
                <div style={{ height: 3, background: i === 0 ? BLUE : i === 1 ? "rgba(30,58,138,.45)" : "rgba(30,58,138,.2)", marginBottom: 0 }} />

                <div style={{ padding: "2rem 2rem 2.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                      background: i === 0 ? BLUE : "transparent",
                      border: `1.5px solid ${i === 0 ? BLUE : "rgba(30,58,138,.25)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: C, fontWeight: 700, fontSize: "0.85rem", color: i === 0 ? WHITE : BLUE, letterSpacing: "-0.02em" }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div style={{ flex: 1, height: 1, background: "rgba(30,58,138,.08)" }} />
                  </div>

                  <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: BLUE, opacity: 0.55, marginBottom: "0.4rem" }}>{ph.num}</div>
                  <div style={{ fontFamily: C, fontSize: "clamp(0.85rem,1.1vw,1.05rem)", fontWeight: 700, color: "#0D0D0D", letterSpacing: "0.03em", marginBottom: "1.5rem", lineHeight: 1.2 }}>{ph.label}</div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.5rem" }}>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.35rem 0.85rem", background: "rgba(30,58,138,.04)",
                      border: "1px solid rgba(30,58,138,.1)", borderRadius: 2,
                      alignSelf: "flex-start",
                    }}>
                      <Calendar size={10} color={BLUE} strokeWidth={1.8} />
                      <span style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE }}>{ph.season}</span>
                    </div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.35rem 0.85rem", background: "rgba(30,58,138,.02)",
                      border: "1px solid rgba(30,58,138,.06)", borderRadius: 2,
                      alignSelf: "flex-start",
                    }}>
                      <Clock size={10} color="#aaa" strokeWidth={1.8} />
                      <span style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa" }}>{ph.dur}</span>
                    </div>
                  </div>

                  <p style={{ fontFamily: PF, fontSize: "1rem", lineHeight: 1.9, color: "#666", margin: 0 }}>{ph.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector bars */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: BLUE, marginBottom: "1.25rem" }}>Internship sector distribution — 359 students</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {sectors.map((s, i) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(30,58,138,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <s.Icon size={12} color={BLUE} strokeWidth={1.5} />
                </div>
                <div style={{ width: 128, flexShrink: 0 }}>
                  <span style={{ fontFamily: PF, fontSize: "0.83rem", color: "#555" }}>{s.n}</span>
                </div>
                <div style={{ flex: 1, height: 2, background: "rgba(30,58,138,.07)", position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, height: "100%", background: BLUE,
                    width: vis ? `${(s.c / maxC) * 100}%` : "0%",
                    transition: `width 1.3s ${i * .07}s cubic-bezier(.22,1,.36,1)`,
                  }} />
                </div>
                <span style={{ fontFamily: C, fontSize: "0.8rem", fontWeight: 700, color: BLUE, width: 32, textAlign: "right" }}>{s.c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Geographic reach + Logo partners — true 50/50, equal height ── */}
        <div className="pl-geo-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 0, alignItems: "stretch" }}>

          {/* LEFT — Geographic reach */}
          <div style={{ paddingRight: "3rem", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: BLUE, marginBottom: "1.5rem" }}>Geographic reach</div>

            {/* Cards grow to fill available space equally */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
              {geoData.map((loc, i) => (
                <div key={loc.l} style={{
                  display: "flex", alignItems: "center",
                  padding: "1.25rem 1.5rem",
                  border: "1px solid rgba(30,58,138,.08)",
                  borderLeft: i === 0 ? `3px solid ${BLUE}` : "1px solid rgba(30,58,138,.08)",
                  background: i === 0 ? "rgba(30,58,138,.02)" : "transparent",
                  gap: "1.5rem",
                  flex: 1,
                  opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-14px)",
                  transition: `opacity .7s ${.3 + i * .1}s, transform .7s ${.3 + i * .1}s cubic-bezier(.22,1,.36,1)`,
                }}>
                  <div style={{ fontFamily: C, fontWeight: 700, fontSize: "2.2rem", color: BLUE, lineHeight: 1, flexShrink: 0, minWidth: 72 }}>{loc.p}%</div>
                  <div style={{ width: 1, height: 40, background: "rgba(30,58,138,.1)", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: PF, fontSize: "0.95rem", color: "#333", fontWeight: 600, marginBottom: "0.2rem" }}>{loc.l}</div>
                    <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa" }}>{loc.c} students</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom note — pinned to bottom, aligns with right side note */}
            <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.72rem", color: "#aaa", marginTop: "0.75rem", lineHeight: 1.6, marginBottom: 0 }}>
              47% of students interned outside their home state — building cross-market exposure and professional resilience.
            </p>
          </div>

          {/* RIGHT — Internship partners static 5-3-2 grid */}
          <div style={{ paddingLeft: "3rem", borderLeft: "1px solid rgba(30,58,138,.08)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: BLUE, marginBottom: "1.5rem" }}>Internship partners</div>

            {/* Logo grid — grows to fill space */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>

              {/* Row 1 — 5 logos */}

                     <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.5rem", flex: 1 }}>
                {INTERN_LOGOS.slice(8, 10).map((p, i) => (
                  <div key={i} style={{
                    position: "relative",
                    background: WHITE,
                    // border: "1px solid rgba(30,58,138,.09)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    minHeight: 60,
                  }}>
                    <Image
                      src={p.src} alt={p.name} fill
                      sizes="(max-width: 1200px) 25vw, 300px"
                      style={{ objectFit: "contain", padding: "10px" }}
                    />
                  </div>
                ))}
              </div>
       

              {/* Row 2 — 3 logos */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.5rem", flex: 1 }}>
                {INTERN_LOGOS.slice(5, 8).map((p, i) => (
                  <div key={i} style={{
                    position: "relative",
                    background: WHITE,
                 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    minHeight: 60,
                  }}>
                    <Image
                      src={p.src} alt={p.name} fill
                      sizes="(max-width: 1200px) 17vw, 200px"
                      style={{ objectFit: "contain", padding: "10px"}}
                    />
                  </div>
                ))}
              </div>
                     <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "0.5rem", flex: 1 }}>
                {INTERN_LOGOS.slice(0, 5).map((p, i) => (
                  <div key={i} style={{
                    position: "relative",
                    background: WHITE,
                 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    minHeight: 60,
                  }}>
                    <Image
                      src={p.src} alt={p.name} fill
                      sizes="(max-width: 1200px) 10vw, 120px"
                      style={{ objectFit: "contain", padding: "10px" }}
                    />
                  </div>
                ))}
              </div>

              {/* Row 3 — 2 logos */}
       
            </div>

            {/* Bottom note — pinned to bottom, aligns with left side note */}
            <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.72rem", color: "#aaa", marginTop: "0.75rem", lineHeight: 1.6, marginBottom: 0 }}>
              Decathlon · Kirloskar Brothers · Sheenlac Paints · Bigbasket · Westside · Aster · Van Heusen · Allen Solly and more.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   § 6  PROCESS
═══════════════════════════════════════════════════════ */
function ProcessSection() {
  const [ref, vis] = useInView(0.08);
  return (
    <section style={{ background: NAVY, padding: "clamp(4rem,8vh,7rem) clamp(2rem,5vw,5rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }} ref={ref as React.RefCallback<HTMLDivElement>}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ ...eyebrowStyle(true), justifyContent: "center", opacity: vis ? 1 : 0, transition: "opacity .7s" }}>{rule(true)} The preparation</div>
          <h2 style={{
            ...h2Style("clamp(2rem,3.5vw,3.2rem)"), color: WHITE,
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(22px)",
            transition: "opacity .8s .1s, transform .8s .1s cubic-bezier(.22,1,.36,1)",
          }}>Achievement is not accidental.<br />
            <span style={{ color: "rgba(150,190,255,.8)" }}>It is a structured outcome.</span>
          </h2>
          <p style={{ ...bodyStyle, color: "rgba(255,255,255,0.9)", maxWidth: "52ch", margin: "0 auto", opacity: vis ? 1 : 0, transition: "opacity .8s .2s" }}>
            LEAD's placement preparation begins on Day 1 of the programme — not a week before the interviews open.
            Every student passes through five deliberate stages before an offer arrives.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1px", background: "rgba(255,255,255,.04)" }}>
          {PROCESS.map((s, i) => (
            <div key={s.n} style={{
              background: NAVY, padding: "2rem 1.5rem",
              borderTop: "1px solid rgba(255,255,255,.04)",
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)",
              transition: `opacity .7s ${i * .1}s, transform .7s ${i * .1}s cubic-bezier(.22,1,.36,1)`,
            }}>
              <div style={{ fontFamily: C, fontSize: "2.8rem", fontWeight: 700, color: "rgba(255,255,255,0.28)", lineHeight: 1, marginBottom: "1.25rem" }}>{s.n}</div>
              <h3 style={{ fontFamily: C, fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,.72)", margin: "0 0 0.75rem" }}>{s.t}</h3>
              <p style={{ fontFamily: PF, fontSize: "clamp(0.92rem,.9vw,1rem)", lineHeight: 1.85, color: "rgba(255,255,255,0.9)", margin: 0 }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   § 7  VOICES — Infinite auto-scrolling carousel
═══════════════════════════════════════════════════════ */
function VoicesSection() {
  const [ref, vis] = useInView(0.1);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Mobile: tapping the carousel toggles pause; tapping anywhere outside resumes.
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsPaused(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section style={{ background: WHITE, padding: "clamp(4rem,8vh,7rem) 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(2rem,5vw,5rem)", marginBottom: "3rem" }}
        ref={ref as React.RefCallback<HTMLDivElement>}>
        <div style={{ ...eyebrowStyle(), opacity: vis ? 1 : 0, transition: "opacity .7s" }}>{rule()} Alumni voices</div>
        <h2 style={{
          ...h2Style(),
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
          transition: "opacity .8s .1s, transform .8s .1s cubic-bezier(.22,1,.36,1)",
        }}>
          Success leaves a voice.<br /><span style={GRAD_TEXT}>It speaks through our alumni.</span>
        </h2>
      </div>

      <div
        ref={wrapRef}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") setIsPaused(true); }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse") setIsPaused(false); }}
        onClick={() => setIsPaused((p) => !p)}
        style={{ overflow: "hidden", cursor: "pointer", WebkitTapHighlightColor: "transparent" }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            width: "max-content",
            animation: `carouselScroll 42s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
            padding: "0.5rem clamp(2rem,5vw,5rem)",
          }}>
          {items.map((t, i) => (
            <div key={i} style={{
              width: "clamp(300px,28vw,400px)",
              flexShrink: 0,
              padding: "2rem",
              border: "1px solid rgba(30,58,138,.1)",
              borderTop: `2px solid ${BLUE}`,
              position: "relative",
              background: WHITE,
            }}>
              <div style={{ position: "absolute", top: "0.75rem", right: "1.25rem", fontFamily: PF, fontSize: "4.5rem", color: "rgba(30,58,138,.05)", lineHeight: 1, userSelect: "none" }}>"</div>

              <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "clamp(0.92rem,.95vw,1rem)", lineHeight: 1.9, color: "#444", margin: "0 0 1.75rem", minHeight: "6em" }}>{t.q}</p>

              <div style={{ width: 24, height: 1, background: "rgba(30,58,138,.15)", marginBottom: "1rem" }} />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <div style={{ fontFamily: C, fontSize: "0.72rem", fontWeight: 700, color: "#0D0D0D", letterSpacing: "0.04em", marginBottom: "0.2rem" }}>{t.name}</div>
                  <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE, opacity: 0.7, marginBottom: "0.15rem" }}>{t.placed}</div>
                  <div style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.72rem", color: "#bbb" }}>{t.role} · Batch {t.batch}</div>
                </div>
                <div style={{
                  flexShrink: 0, padding: "0.3rem 0.65rem",
                  background: "rgba(30,58,138,.04)", border: "1px solid rgba(30,58,138,.1)",
                }}>
                  <div style={{ fontFamily: C, fontWeight: 700, fontSize: "0.8rem", color: BLUE, lineHeight: 1 }}>{t.pkg}</div>
                  <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.11em", textTransform: "uppercase", color: "#bbb", marginTop: "0.2rem" }}>Package</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem", padding: "0 clamp(2rem,5vw,5rem)" }}>
        <span style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.72rem", color: "#ccc" }}>Tap or hover to pause · 9 alumni stories</span>
      </div>

      <style>{`
        @keyframes carouselScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   § 8  HIRE FROM LEAD
═══════════════════════════════════════════════════════ */
function HireSection() {
  const [ref, vis] = useInView(0.08);
  return (
    <section style={{ background: WHITE, padding: "clamp(4rem,8vh,7rem) clamp(2rem,5vw,5rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }} ref={ref as React.RefCallback<HTMLDivElement>}>

        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ ...eyebrowStyle(false), justifyContent: "center", opacity: vis ? 1 : 0, transition: "opacity .7s" }}>{rule(false)} For recruiters</div>
          <h2 style={{
            ...h2Style("clamp(2.2rem,4vw,3.8rem)"), color: "#0D0D0D",
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)",
            transition: "opacity .8s .1s, transform .8s .1s cubic-bezier(.22,1,.36,1)",
          }}>
            Hire from LEAD.<br />
            <span style={GRAD_TEXT}>Build tomorrow's leaders.</span>
          </h2>
          <p style={{ ...bodyStyle, color: "#666", maxWidth: "54ch", margin: "0 auto", opacity: vis ? 1 : 0, transition: "opacity .8s .2s" }}>
            LEAD's placement cell provides end-to-end recruitment support — from job description alignment to Day 1 onboarding.
            Whether you are a first-time recruiter or a returning partner, connect with any member of our team directly below.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1px", background: "rgba(30,58,138,.07)", marginBottom: "4rem" }}>
          {[
            { t: "Domain-Trained Talent",         d: "Specialisations in Finance, Marketing, HR, Business Analytics, and Operations — hire exactly the profile your role demands." },
            { t: "Pre-Screened Candidates",        d: "Every eligible student is assessed for communication, aptitude, and domain readiness before company visits begin." },
            { t: "Industry-Integrated Curriculum", d: "Students work on live projects, sector case competitions, and industry simulations throughout the MBA programme." },
            { t: "Full Recruitment Support",       d: "From scheduling to documentation — our placement cell manages end-to-end logistics for every visiting recruiter." },
          ].map((item, i) => (
            <div key={item.t} style={{
              background: WHITE, padding: "2rem 1.5rem",
              borderTop: `2px solid rgba(30,58,138,.1)`,
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
              transition: `opacity .7s ${.2 + i * .1}s, transform .7s ${.2 + i * .1}s cubic-bezier(.22,1,.36,1)`,
            }}>
              <ChevronRight size={14} color={BLUE} style={{ marginBottom: "1rem", opacity: 0.5 }} />
              <h4 style={{ fontFamily: C, fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0D0D0D", margin: "0 0 0.6rem" }}>{item.t}</h4>
              <p style={{ fontFamily: PF, fontSize: "1rem", lineHeight: 1.8, color: "#666", margin: 0 }}>{item.d}</p>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "1.75rem" }}>Placement cell · direct contacts</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(255px,1fr))", gap: "1px", background: "rgba(30,58,138,.07)", marginBottom: "2.5rem" }}>
            {CONTACTS.map((c, i) => (
              <div key={c.name} style={{
                background: WHITE, padding: "1.75rem",
                borderLeft: i === 0 ? `2px solid ${BLUE}` : "2px solid transparent",
                opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)",
                transition: `opacity .7s ${.3 + i * .1}s, transform .7s ${.3 + i * .1}s cubic-bezier(.22,1,.36,1)`,
              }}>
                <div style={{ fontFamily: C, fontSize: "0.82rem", fontWeight: 600, color: "#0D0D0D", marginBottom: "0.2rem", letterSpacing: "0.02em" }}>{c.name}</div>
                <div style={{ fontFamily: C, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE, opacity: 0.7, marginBottom: "1.1rem" }}>{c.role}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <a href={`mailto:${c.email}`} style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
                    <Mail size={12} color="#aaa" />
                    <span style={{ fontFamily: PF, fontSize: "0.82rem", color: "#555", lineHeight: 1.9 }}>{c.email}</span>
                  </a>
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
                    <Phone size={12} color="#aaa" />
                    <span style={{ fontFamily: PF, fontSize: "0.82rem", color: "#555", lineHeight: 1.9 }}>{c.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        
        </div>
      </div>
    </section>
  );
}