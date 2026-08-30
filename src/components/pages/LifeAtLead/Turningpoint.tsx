"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import {
  Users, Clock, CheckCircle, Award, TrendingUp, Target, Compass,
  Shield, Flame, Eye, Brain, Sun,
} from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import { COLORS, TYPE, SPACE, GRADIENTS } from "@/lib/design-tokens";

/* ─── HOOKS ─── */
function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const u = () => setM(mq.matches); u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, [bp]);
  return m;
}

const FADE_UP: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};
const STAGGER_CONTAINER: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const STAGGER_ITEM: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const VP = { once: true, amount: 0.1 } as const;

/* ─── DATA ─── */
const DAYS = [
  { day: 1, theme: "Arrival &\nOrientation",  icon: Sun,     desc: "Setting the stage — participants arrive, connect, and step into the learning environment with clear intention and openness." },
  { day: 2, theme: "Self-\nDiscovery",         icon: Eye,     desc: "Deep introspection to uncover personal values, core strengths, and the defining stories that shape identity and behaviour." },
  { day: 3, theme: "Mindset &\nBeliefs",       icon: Brain,   desc: "Confronting limiting beliefs and conditioning the mind for growth, accountability, and genuine possibility thinking." },
  { day: 4, theme: "Leadership\nFoundations",  icon: Compass, desc: "Understanding leadership as a responsibility rooted in values, discipline, and genuine empathy for those we serve." },
  { day: 5, theme: "Resilience &\nChallenge",  icon: Shield,  desc: "High-energy experiential challenges designed to test and build resilience, trust, and the spirit of teamwork." },
  { day: 6, theme: "Purpose &\nVision",        icon: Target,  desc: "Clarity sessions to define personal and professional goals aligned with a larger, more meaningful sense of purpose." },
  { day: 7, theme: "Commitment\n& Action",     icon: Flame,   desc: "Participants emerge with a personal action plan, renewed energy, and a lasting commitment to transformation." },
];

const TESTIMONIALS = [
  { quote: "Turning Point was not just a training program; it was a deeply transformative experience. It helped me understand my strengths, confront my fears, and take responsibility for my choices. The clarity I gained continues to guide my decisions even today.", role: "Participant", accent: false },
  { quote: "I came expecting a leadership workshop, but what I experienced was much deeper. It reshaped my understanding of leadership as a responsibility rooted in values, discipline, and empathy. The lessons continue to influence my professional and personal life.", role: "Corporate Professional", accent: true },
  { quote: "Those seven days made me pause and rethink my priorities, my habits, and my aspirations. Turning Point helped me discover a sense of purpose I had never clearly articulated before.", role: "Student Participant", accent: false },
  { quote: "As a senior executive, I have attended many leadership programs. Turning Point stands apart because it addresses the human dimension of leadership — self-awareness, responsibility, and integrity.", role: "Senior Corporate Executive", accent: false },
  { quote: "Turning Point helped me realize that leadership begins with self-discipline and clarity of purpose. It challenged me to step outside my comfort zone and discover capabilities I didn't know I possessed.", role: "Young Professional", accent: false },
  { quote: "Some experiences leave a lasting imprint on your life. Turning Point is one of them. It made me reflect deeply on who I am, what I want to become, and how I can contribute meaningfully to society.", role: "Entrepreneur", accent: false },
];

const STATS = [
  { value: "7",       label: "Intensive Days",  sub: "Of transformational experience" },
  { value: "18+",     label: "Years of Impact", sub: "Continuously evolving program" },
  { value: "100%",    label: "Experiential",    sub: "No conventional classroom" },
  { value: "10,000+", label: "Participants",    sub: "Across all cohorts & batches" },
];

const IMGS = {
  aboutLeft:    "/convert/LEAD04.webp",
  visionBg:     "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
  participants: "/convert/DSC000912.webp",
  // ── FIXED: verified college campus walkway
  impactBg:     "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
};

const DAY_IMAGES = [
  "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=75",
];

function DirectorStyleImage({ src, alt, height = 420, badgeValue, badgeLabel, delay = 0 }: { src: string; alt: string; height?: number; badgeValue: string; badgeLabel: string; delay?: number; }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={delay} style={{ position: "relative" }}>
      <div style={{ position:"relative", height, overflow:"hidden", borderRadius:16, boxShadow:"0 20px 60px rgba(0,0,0,.12)" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:6, background:COLORS.primary, zIndex:2, borderRadius:"16px 0 0 16px" }} />
        <img src={src} alt={alt} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
      </div>
      <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={VP} transition={{ duration:.5, delay:delay+.3, ease:"easeOut" }}
        style={{ position:"absolute", bottom:-24, right:-24, background:"#fff", border:"1px solid rgba(0,0,0,.07)", boxShadow:"0 20px 50px rgba(0,0,0,.13)", borderRadius:12, padding:"1rem 1.4rem", zIndex:10 }}>
        <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:"1.6rem", fontWeight:700, color:COLORS.primary, margin:0, lineHeight:1 }}>{badgeValue}</p>
        <p style={{ fontFamily:playfair.style.fontFamily, fontSize:".78rem", color:"#555", margin:"4px 0 0" }}>{badgeLabel}</p>
      </motion.div>
    </motion.div>
  );
}

/* ════════════ HERO ════════════ */
function HeroSection() {
  const STRIP_ITEMS = [
    { icon:Users, label:"10,000+ Participants", sub:"Across all batches" },
    { icon:Clock, label:"7 Intensive Days",     sub:"Experiential learning" },
    { icon:Award, label:"18+ Years of Impact",  sub:"Continuously evolving" },
  ];
  return (
    <>
      <style>{`
        html, body { overflow-x: hidden; }
        .tp-hero { height: 100svh; background: #fff; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; box-sizing: border-box; padding: clamp(3rem,7vh,5rem) clamp(1.25rem,6vw,8rem) 0; width: 100%; }
        .tp-hero::before { content:''; position:absolute; inset:0; background-image: linear-gradient(rgba(0,92,159,.04) 1px,transparent 1px), linear-gradient(90deg,rgba(0,92,159,.04) 1px,transparent 1px); background-size:80px 80px; pointer-events:none; z-index:0; }
        .tp-hero-bg-text { position:absolute; right:0; bottom:-0.12em; font-size:clamp(16rem,32vw,48rem); font-weight:800; line-height:1; letter-spacing:-0.06em; color:rgba(0,92,159,.03); pointer-events:none; user-select:none; z-index:0; white-space:nowrap; }
        .tp-hero-inner { position:relative; z-index:2; display:grid; grid-template-columns:1.15fr 0.85fr; gap:clamp(1.5rem,3vw,3rem); align-items:stretch; flex:1; min-height:0; width:100%; min-width:0; }
        .tp-hero-left { display:flex; flex-direction:column; justify-content:center; }
        .tp-hero-strip { padding:clamp(.8rem,1.6vh,1.3rem) 0; border-top:1px solid rgba(0,92,159,.10); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:.5rem; margin-top:clamp(1.2rem,2.5vh,2rem); width:100%; min-width:0; }
        .tp-strip-item { display:flex; align-items:center; gap:10px; padding:0 .75rem; border-right:1px solid rgba(0,92,159,.10); min-width:0; overflow:hidden; }
        .tp-strip-item:first-child { padding-left:0; } .tp-strip-item:last-child { border-right:none; }
        .tp-strip-text { min-width:0; overflow:hidden; }
        .tp-strip-label { display:block; font-size:clamp(.68rem,.72vw,.74rem); letter-spacing:.05em; text-transform:uppercase; color:#333; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .tp-strip-sub { display:block; font-size:clamp(.6rem,.75vw,.72rem); color:#111; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .tp-hero-right { position:relative; align-self:flex-end; display:flex; align-items:flex-end; justify-content:center; height:100%; }
        .tp-thomman-img { position:relative; width:100%; height:100%; max-height:88svh; }
        @media (max-width:767px) { .tp-hero { padding:5rem 1.25rem 2.5rem; height:auto; min-height:100svh; } .tp-hero-inner { grid-template-columns:1fr; } .tp-hero-right, .tp-hero-bg-text { display:none; } .tp-hero-strip { display:flex; flex-direction:column; align-items:flex-start; gap:.75rem; } .tp-strip-item { padding:0; gap:8px; flex:0 1 auto; border-right:none; flex-direction:row; align-items:center; } .tp-strip-item:first-child { padding-left:0; } }
        @media (min-width:768px) and (max-width:1100px) { .tp-hero { padding-left:3rem; padding-right:3rem; } }
      `}</style>
      <section className={`tp-hero ${cinzel.className}`}>
        <div className="tp-hero-bg-text" aria-hidden="true">TP</div>
        <div className="tp-hero-inner">

          <div className="tp-hero-left" style={{ minWidth:0 }}>
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, ease:"easeOut" }} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"clamp(.6rem,1.3vh,1rem)", overflow:"hidden" }}>
              <span style={{ display:"inline-block", width:24, height:1.5, flexShrink:0, background:COLORS.primary }} />
              <span style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.68rem,.78vw,.74rem)", letterSpacing:"clamp(.08em,.2vw,.2em)", textTransform:"uppercase", color:COLORS.primary, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>LEAD College — Flagship Programme</span>
            </motion.div>
            <motion.h1 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:.65, delay:.1, ease:"easeOut" }} style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(2.4rem,5.5vw,7rem)", fontWeight:800, lineHeight:.92, letterSpacing:"-.03em", textTransform:"uppercase", margin:"0 0 clamp(.9rem,1.8vh,1.6rem)" }}>
              <span style={{ display:"block", color:"#0D0D0D" }}>Thomman's</span>
              <span style={{ display:"block", background:`linear-gradient(90deg,${COLORS.primary} 0%,#1e3a8a 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", color:"transparent" }}>Turning Point.</span>
            </motion.h1>
            <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:.45, delay:.25, ease:"easeOut" }} style={{ width:36, height:2, background:`linear-gradient(90deg,${COLORS.primary},#1e3a8a)`, marginBottom:"clamp(.9rem,1.8vh,1.4rem)", transformOrigin:"left" }} />
            <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.55, delay:.3, ease:"easeOut" }} style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.92rem,1.05vw,1rem)", lineHeight:1.8, color:"#111", margin:0 }}>
              An intensive seven-day journey of self-discovery, experiential challenge, and purposeful transformation — conceived and led by Dr. Thomas K George at LEAD College.
            </motion.p>
            <motion.div className="tp-hero-strip" initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:.55, delay:.42, ease:"easeOut" }}>
              {STRIP_ITEMS.map((s) => { const Icon = s.icon; return (
                <div key={s.label} className="tp-strip-item">
                  <div style={{ width:32, height:32, borderRadius:8, background:"rgba(0,92,159,.06)", border:"1px solid rgba(0,92,159,.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon size={14} color={COLORS.primary} strokeWidth={1.6} /></div>
                  <div className="tp-strip-text"><strong className="tp-strip-label" style={{ fontFamily:cinzel.style.fontFamily }}>{s.label}</strong><span className="tp-strip-sub" style={{ fontFamily:playfair.style.fontFamily }}>{s.sub}</span></div>
                </div>
              ); })}
            </motion.div>
          </div>

          <div className="tp-hero-right">
            <motion.div
              className="tp-thomman-img"
              initial={{ opacity:0, x:30 }}
              animate={{ opacity:1, x:0 }}
              transition={{ duration:.75, delay:.2, ease:"easeOut" }}
            >
              <Image
                src="/thomman_ctn.png"
                alt="Dr. Thomas K George — Thomman"
                fill
                priority
                sizes="(max-width:1100px) 40vw, 30vw"
                style={{
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.10))",
                }}
              />
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}

/* ════════════ ABOUT ════════════ */
function AboutSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background:"#fff", display:"flex", alignItems:"center", minHeight:"100vh", boxSizing:"border-box" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`clamp(3rem,6vh,5rem) ${SPACE.sectionX}`, width:"100%" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:"clamp(2rem,4vw,5rem)", alignItems:"center" }}>
          {!isMobile && (<DirectorStyleImage src={IMGS.aboutLeft} alt="Leadership workshop" height={336} badgeValue="7" badgeLabel="Intensive Days" />)}
          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:COLORS.primary, marginBottom:".6rem" }}>About the Program</p>
            <h2 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(1.3rem,2.3vw,2.7rem)", fontWeight:800, lineHeight:1, letterSpacing:"-.025em", textTransform:"uppercase", color:"#0D0D0D", margin:"0 0 .9rem" }}>Not a Workshop.<br />A Life-Redefining<br />Experience.</h2>
            <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={VP} transition={{ duration:.4, delay:.1, ease:"easeOut" }} style={{ width:36, height:2, background:GRADIENTS.primary90, borderRadius:2, marginBottom:"1.2rem", transformOrigin:"left" }} />
            <div style={{ borderLeft:`3px solid ${COLORS.primary}`, paddingLeft:"1.2rem", marginBottom:"1.4rem" }}>
              <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.92rem,1vw,1rem)", fontWeight:600, fontStyle:"normal", lineHeight:1.6, color:"#0D0D0D", margin:"0 0 .5rem" }}>"Every individual possesses untapped potential that can be activated through awareness, discipline, and purpose."</p>
              <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:".74rem", letterSpacing:".18em", textTransform:"uppercase", color:"#aaa", margin:0, fontWeight:600 }}>— Vision of Turning Point</p>
            </div>
            {[
              { label:"What It Is",   text:"A seven-day immersive journey combining reflective learning, experiential challenges, and deep group dynamics — unlike any conventional leadership training in format, depth, or lasting effect." },
              { label:"The Approach", text:"Participants learn by doing, reflecting, and applying insights in real-time. Every simulation, trust exercise, and storytelling session is engineered to create lasting transformation." },
              { label:"The Outcome",  text:"Individuals emerge with renewed self-awareness, clarity of purpose, and a concrete action plan — not just a certificate, but an internal shift that redefines their next chapter." },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom:".9rem" }}>
                <h3 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.68rem,.76vw,.74rem)", fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:COLORS.primary, marginBottom:".3rem" }}>{item.label}</h3>
                <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.92rem,.95vw,1rem)", lineHeight:1.75, color:"#111", margin:0 }}>{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════ VISION ════════════ */
function VisionSection() {
  const secRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target:secRef, offset:["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1],["-6%","6%"]);
  return (
    <section ref={secRef} style={{ minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", alignItems:"center" }}>
      <motion.div style={{ position:"absolute", inset:0, y:bgY, willChange:"transform" }}>
        <img src={IMGS.visionBg} alt="University campus" style={{ width:"100%", height:"115%", objectFit:"cover", marginTop:"-7.5%" }} />
        {/* ── DARKENED overlay for strong white text contrast ── */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(0,15,40,.97) 0%,rgba(0,28,72,.94) 50%,rgba(0,10,30,.92) 100%)" }} />
      </motion.div>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:1 }} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"clamp(3rem,6vh,5rem) clamp(1.5rem,5vw,6rem)", position:"relative", zIndex:2, width:"100%", boxSizing:"border-box" }}>
        <div style={{ maxWidth:560 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.66rem,.72vw,.72rem)", letterSpacing:".28em", textTransform:"uppercase", fontWeight:600, display:"flex", alignItems:"center", gap:10, marginBottom:"clamp(.6rem,1.2vh,1rem)", color:"rgba(255,255,255,.4)" }}>
              <span style={{ display:"inline-block", width:22, height:1.5, background:"rgba(255,255,255,.32)" }} />Vision & Philosophy
            </p>
            <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(2rem,4.4vw,5.6rem)", fontWeight:900, lineHeight:.88, letterSpacing:"-.04em", textTransform:"uppercase", color:"#fff", margin:"0 0 4px" }}>Real Change</p>
            <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(2rem,4.4vw,5.6rem)", fontWeight:900, lineHeight:.88, letterSpacing:"-.04em", textTransform:"uppercase", color:"#fff", margin:"0 0 clamp(1rem,2vh,1.6rem)", opacity:.5 }}>Begins Within.</p>
          </motion.div>
          <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={VP} transition={{ duration:.4, ease:"easeOut" }} style={{ width:36, height:2, background:"rgba(255,255,255,.28)", marginBottom:"clamp(.6rem,1.2vh,1rem)", transformOrigin:"left" }} />
          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={.1}>
            <h3 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.78rem,1.15vw,1.08rem)", fontWeight:700, letterSpacing:".05em", textTransform:"uppercase", lineHeight:1.3, margin:"0 0 clamp(.7rem,1.2vh,1rem)", color:"#fff" }}>A Space for Honest Transformation.</h3>
            <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.92rem,.95vw,1rem)", lineHeight:1.85, marginBottom:"1.4rem", color:"#fff" }}>Modern education and professional environments often emphasise knowledge and skills, but rarely address the deeper dimensions of personal transformation — mindset, values, discipline, and self-awareness. Turning Point creates a space where participants confront their beliefs, examine their habits, and discover the courage to act on what truly matters.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:".65rem" }}>
              {["Confront deeply-held beliefs, habits, and attitudes","Examine fears, aspirations, strengths, and limitations","Shift from passive learning to active personal transformation","Align personal ambitions with social responsibility and purpose"].map((pt, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:".7rem" }}>
                  <div style={{ width:17, height:17, borderRadius:"50%", border:"1.5px solid rgba(255,255,255,.24)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}><CheckCircle size={8} color="rgba(255,255,255,.48)" strokeWidth={2.5} /></div>
                  <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.9rem,.9vw,1rem)", margin:0, lineHeight:1.6, color:"#fff" }}>{pt}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════ 7-DAY JOURNEY ════════════ */
function JourneySection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background:"#F7F9FC", padding:"clamp(2.5rem,5vh,4rem) 0" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:`0 ${SPACE.sectionX}` }}>
        <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0} style={{ textAlign:"center", marginBottom:"clamp(2rem,4vh,3.5rem)" }}>
          <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:COLORS.primary, marginBottom:".5rem" }}>The Experience</p>
          <h2 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(1.2rem,2.2vw,2.7rem)", fontWeight:800, textTransform:"uppercase", letterSpacing:"-.025em", color:"#0D0D0D", margin:"0 0 .8rem", lineHeight:1 }}>The 7-Day Journey</h2>
          <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.92rem,.95vw,1rem)", color:"#111", maxWidth:440, margin:"0 auto", lineHeight:1.65 }}>Each day builds deliberately on the last — from self-awareness through to committed, purposeful action.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER} style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(4,minmax(0,1fr))", gap:"1rem", marginBottom:"1rem" }}>
          {DAYS.slice(0,4).map((day) => { const Icon = day.icon; return (
            <motion.div key={day.day} variants={STAGGER_ITEM} style={{ background:"#fff", borderRadius:14, overflow:"hidden", border:"1px solid rgba(0,0,0,.06)", boxShadow:"0 2px 14px rgba(0,0,0,.05)", display:"flex", flexDirection:"column" }}>
              <div style={{ height:118, overflow:"hidden", flexShrink:0, position:"relative" }}>
                <img src={DAY_IMAGES[day.day-1]} alt={day.theme.replace('\n',' ')} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.35) 0%,transparent 60%)" }} />
                <div style={{ position:"absolute", bottom:".65rem", left:".85rem", fontFamily:cinzel.style.fontFamily, fontSize:".72rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.7)" }}>Day {day.day}</div>
              </div>
              <div style={{ padding:"1.1rem", flex:1, display:"flex", flexDirection:"column", position:"relative" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:COLORS.primary, opacity:.25 }} />
                <div style={{ width:30, height:30, borderRadius:8, background:"rgba(0,92,159,.08)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:".7rem" }}><Icon size={14} color={COLORS.primary} strokeWidth={1.8} /></div>
                <h3 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.72rem,.82vw,.78rem)", fontWeight:700, color:"#0D0D0D", margin:"0 0 .55rem", letterSpacing:".03em", lineHeight:1.35, textTransform:"uppercase", whiteSpace:"pre-line" }}>{day.theme}</h3>
                <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.9rem,.9vw,1rem)", lineHeight:1.68, color:"#111", margin:0 }}>{day.desc}</p>
              </div>
            </motion.div>
          ); })}
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER} style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,minmax(0,1fr))", gap:"1rem" }}>
          {DAYS.slice(4).map((day) => { const Icon = day.icon; return (
            <motion.div key={day.day} variants={STAGGER_ITEM} style={{ background:"#fff", borderRadius:14, overflow:"hidden", border:"1px solid rgba(0,0,0,.06)", boxShadow:"0 2px 14px rgba(0,0,0,.05)", display:"flex", flexDirection:isMobile?"column":"row" }}>
              <div style={{ width:isMobile?"100%":150, height:isMobile?130:"auto", flexShrink:0, overflow:"hidden", position:"relative" }}>
                <img src={DAY_IMAGES[day.day-1]} alt={day.theme.replace('\n',' ')} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(0,0,0,.18) 0%,transparent 55%)" }} />
              </div>
              <div style={{ padding:"1.4rem", flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:".75rem" }}>
                  <span style={{ fontFamily:cinzel.style.fontFamily, fontSize:".72rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(0,92,159,.45)" }}>Day {day.day}</span>
                  <div style={{ width:30, height:30, borderRadius:8, background:"rgba(0,92,159,.08)", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon size={14} color={COLORS.primary} strokeWidth={1.8} /></div>
                </div>
                <h3 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.78rem,.88vw,.84rem)", fontWeight:700, color:"#0D0D0D", margin:"0 0 .6rem", letterSpacing:".025em", lineHeight:1.3, textTransform:"uppercase", whiteSpace:"pre-line" }}>{day.theme}</h3>
                <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.9rem,.9vw,1rem)", lineHeight:1.7, color:"#111", margin:0 }}>{day.desc}</p>
              </div>
            </motion.div>
          ); })}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════ PARTICIPANTS ════════════ */
function ParticipantsSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background:"#fff", display:"flex", alignItems:"center", padding:"clamp(3rem,6vh,5rem) 0", boxSizing:"border-box" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 ${SPACE.sectionX}`, width:"100%" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:"clamp(2rem,4vw,5rem)", alignItems:"center" }}>
          {!isMobile && (<DirectorStyleImage src={IMGS.participants} alt="Participants at Turning Point" height={336} badgeValue="18+" badgeLabel="Years of Impact" />)}
          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:COLORS.primary, marginBottom:".6rem" }}>Whom It's For</p>
            <h2 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(1.2rem,2.2vw,2.6rem)", fontWeight:800, textTransform:"uppercase", letterSpacing:"-.02em", color:"#0D0D0D", margin:"0 0 .9rem", lineHeight:1.05 }}>Anyone Who<br />Seeks Growth.</h2>
            <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={VP} transition={{ duration:.4, delay:.1, ease:"easeOut" }} style={{ width:36, height:2, background:GRADIENTS.primary90, borderRadius:2, marginBottom:"1.2rem", transformOrigin:"left" }} />
            {[
              { title:"Students & Young Professionals", body:"Whether you are beginning your academic journey or taking your first professional steps, Turning Point creates the mindset clarity and self-awareness needed to navigate the path ahead with intention. Many LEAD College students begin their academic journey here." },
              { title:"Corporate Professionals & Executives", body:"Senior leaders, managers, and C-suite executives come to rediscover the human dimension of leadership — moving beyond skill and strategy to examine the values, discipline, and empathy that truly define great leadership in any organisation." },
              { title:"Entrepreneurs & Social Leaders", body:"Founders, social innovators, and community leaders attend to reconnect with purpose, build resilience, and develop the emotional intelligence required to lead organisations and movements that genuinely matter beyond profit." },
              { title:"Educators & Anyone 18+", body:"Turning Point is open to anyone above 18 who desires meaningful personal growth. The program's power comes precisely from the diversity of its participants — multiple industries, life stages, and perspectives converging in one transformative space." },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom:"1.1rem", paddingBottom:"1.1rem", borderBottom:i<3?"1px solid rgba(0,92,159,.08)":"none" }}>
                <h3 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.68rem,.78vw,.74rem)", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"#0D0D0D", marginBottom:".4rem" }}>{item.title}</h3>
                <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.92rem,.95vw,1rem)", lineHeight:1.78, color:"#111", margin:0 }}>{item.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════ OUTCOMES ════════════ */
function OutcomesSection() {
  const isMobile = useIsMobile();
  const outcomes = [
    { title:"Personal Transformation", icon:Eye,        points:["Greater self-confidence & self-awareness","Clarity about life goals & priorities","Improved self-discipline & focus","Stronger emotional resilience","Renewed sense of purpose"] },
    { title:"Leadership Development",  icon:Compass,    points:["Decision-making under uncertainty","Collaborative teamwork skills","Conflict management & resolution","Effective communication","Ethical & value-based leadership"] },
    { title:"Professional Growth",     icon:TrendingUp, points:["Career path aligned with strengths","Professional behaviour & presence","Enhanced problem-solving ability","Teamwork & collaboration","Managing challenges under pressure"] },
    { title:"Mindset Shift",           icon:Brain,      points:["View challenges as opportunities","Take full personal responsibility","Think strategically about the future","Embrace continuous improvement","Develop empathy & social awareness"] },
  ];
  return (
    <section style={{ background:"#F7F9FC", padding:"clamp(2.5rem,5vh,4rem) 0" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 ${SPACE.sectionX}` }}>
        <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0} style={{ textAlign:"center", marginBottom:"clamp(2rem,4vh,3.5rem)" }}>
          <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:COLORS.primary, marginBottom:".5rem" }}>What You Gain</p>
          <h2 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(1.2rem,2.2vw,2.7rem)", fontWeight:800, textTransform:"uppercase", letterSpacing:"-.025em", color:"#0D0D0D", margin:0, lineHeight:1 }}>Transformational Outcomes.</h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER} style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(2,minmax(0,1fr))", gap:"1.2rem" }}>
          {outcomes.map((o) => { const Icon = o.icon; return (
            <motion.div key={o.title} variants={STAGGER_ITEM} style={{ background:"#fff", borderRadius:16, padding:"1.8rem", border:"1px solid rgba(0,0,0,.07)", boxShadow:"0 2px 14px rgba(0,0,0,.04)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:".8rem", marginBottom:"1.1rem" }}>
                <div style={{ width:42, height:42, borderRadius:11, background:"rgba(0,92,159,.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon size={20} color={COLORS.primary} strokeWidth={1.7} /></div>
                <h3 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.76rem,.88vw,.84rem)", fontWeight:700, color:"#0D0D0D", margin:0, letterSpacing:".02em", textTransform:"uppercase", lineHeight:1.3 }}>{o.title}</h3>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:".55rem" }}>
                {o.points.map((pt, j) => (
                  <div key={j} style={{ display:"flex", alignItems:"center", gap:".65rem" }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:COLORS.primary, opacity:.4, flexShrink:0 }} />
                    <span style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.9rem,.9vw,1rem)", color:"#111", lineHeight:1.5 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ); })}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════ IMPACT ════════════ */
function ImpactSection() {
  const secRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target:secRef, offset:["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1],["-6%","6%"]);
  const isMobile = useIsMobile();

  const MILESTONES = [
    { year: "2006", label: "Founded",         desc: "Turning Point launched by Dr. Thomas K George at LEAD College." },
    { year: "2010", label: "1,000 Lives",      desc: "First thousand participants transformed across diverse cohorts." },
    { year: "2015", label: "Corporate Reach",  desc: "Programme extended to senior executives and corporate leaders." },
    { year: "2020", label: "18+ Years",        desc: "Recognised as a flagship experiential leadership programme." },
    { year: "Now",  label: "10,000+ Changed",  desc: "A living, evolving programme that grows with every cohort." },
  ];

  const REACH_ITEMS = [
    { icon: Users,      label: "Students & Young Professionals",  desc: "Building the clarity and confidence needed to navigate the path ahead." },
    { icon: Award,      label: "Corporate Executives",            desc: "Rediscovering the human dimension of leadership beyond skill and strategy." },
    { icon: TrendingUp, label: "Entrepreneurs & Innovators",      desc: "Reconnecting with purpose and resilience to lead what truly matters." },
    { icon: Compass,    label: "Educators & Community Leaders",   desc: "Deepening self-awareness to serve and inspire those around them." },
  ];

  return (
    <section ref={secRef} style={{ minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", alignItems:"center" }}>
      <motion.div style={{ position:"absolute", inset:0, y:bgY, willChange:"transform" }}>
        <img src={IMGS.impactBg} alt="College campus" style={{ width:"100%", height:"115%", objectFit:"cover", marginTop:"-7.5%" }} />
        {/* ── DARKENED overlay for strong white text contrast ── */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(2,4,12,.97) 0%,rgba(2,4,12,.95) 100%)" }} />
      </motion.div>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.03) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", zIndex:1 }} />

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"clamp(3rem,6vh,5rem) clamp(1.5rem,5vw,6rem)", position:"relative", zIndex:2, width:"100%", boxSizing:"border-box" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0} style={{ textAlign:"center", marginBottom:"clamp(2rem,4vh,3.5rem)" }}>
          <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:"rgba(255,255,255,.32)", marginBottom:".5rem" }}>Program Reach</p>
          <h2 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(1.2rem,2.4vw,3rem)", fontWeight:800, textTransform:"uppercase", letterSpacing:"-.025em", color:"#fff", margin:0, lineHeight:1 }}>The Impact of Turning Point</h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER}
          style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,minmax(0,1fr))", borderTop:"1px solid rgba(255,255,255,.08)", borderBottom:"1px solid rgba(255,255,255,.08)", marginBottom:"clamp(2.5rem,5vh,4rem)" }}>
          {STATS.map((s, i, arr) => (
            <motion.div key={s.label} variants={STAGGER_ITEM}
              style={{ padding:"clamp(1.8rem,3.5vh,3rem) clamp(1rem,2vw,2rem)", borderRight:(!isMobile&&i<arr.length-1)?"1px solid rgba(255,255,255,.08)":"none", borderBottom:(isMobile&&i<2)?"1px solid rgba(255,255,255,.08)":"none" }}>
              <div style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(2.2rem,4.4vw,4.4rem)", fontWeight:900, color:"#fff", lineHeight:1, marginBottom:".4rem", letterSpacing:"-.04em" }}>{s.value}</div>
              <div style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.66rem,.72vw,.72rem)", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(255,255,255,.36)", marginBottom:".35rem" }}>{s.label}</div>
              <div style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.7rem,.78vw,.74rem)", color:"rgba(255,255,255,.22)", lineHeight:1.4 }}>{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:"clamp(2.5rem,5vw,5rem)", alignItems:"start" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0}>
            <div style={{ borderLeft:"3px solid rgba(255,255,255,.25)", paddingLeft:"1.4rem", marginBottom:"2rem" }}>
              <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.92rem,1.1vw,1.05rem)", fontWeight:600, fontStyle:"normal", lineHeight:1.7, color:"#fff", margin:"0 0 .7rem" }}>
                "Turning Point has influenced individuals across industries, generations, and geographies — returning to their organisations and communities with renewed clarity, stronger values, and the courage to lead with purpose."
              </p>
              <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:".74rem", letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,.3)", margin:0, fontWeight:600 }}>— LEAD College · Programme Record</p>
            </div>
            <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.66rem,.72vw,.72rem)", letterSpacing:".28em", textTransform:"uppercase", color:"rgba(255,255,255,.3)", fontWeight:700, marginBottom:"1.2rem" }}>Journey Through the Years</p>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {MILESTONES.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={VP} transition={{ duration:.5, delay:i*.08, ease:"easeOut" }}
                  style={{ display:"flex", gap:"1rem", paddingBottom: i < MILESTONES.length - 1 ? "1.1rem" : 0, position:"relative" }}>
                  {i < MILESTONES.length - 1 && (
                    <div style={{ position:"absolute", left:".7rem", top:"1.4rem", bottom:0, width:1, background:"rgba(255,255,255,.1)" }} />
                  )}
                  <div style={{ flexShrink:0, width:"1.4rem", height:"1.4rem", borderRadius:"50%", background:"rgba(255,255,255,.12)", border:"1.5px solid rgba(255,255,255,.22)", display:"flex", alignItems:"center", justifyContent:"center", marginTop:".1rem", zIndex:1 }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:"rgba(255,255,255,.6)" }} />
                  </div>
                  <div>
                    <div style={{ display:"flex", alignItems:"baseline", gap:".5rem", marginBottom:".2rem" }}>
                      <span style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.72rem,.82vw,.78rem)", fontWeight:700, color:"rgba(255,255,255,.7)", letterSpacing:".08em" }}>{m.year}</span>
                      <span style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.66rem,.72vw,.72rem)", fontWeight:600, textTransform:"uppercase", letterSpacing:".14em", color:"rgba(255,255,255,.35)" }}>{m.label}</span>
                    </div>
                    <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.9rem,.9vw,1rem)", lineHeight:1.55, color:"#fff", margin:0 }}>{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={.12}>
            <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.66rem,.72vw,.72rem)", letterSpacing:".28em", textTransform:"uppercase", color:"rgba(255,255,255,.3)", fontWeight:700, marginBottom:"1.2rem" }}>Who Has Been Transformed</p>
            <div style={{ display:"flex", flexDirection:"column", gap:".85rem", marginBottom:"1.6rem" }}>
              {REACH_ITEMS.map(({ icon: Icon, label, desc }, i) => (
                <motion.div key={label} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={VP} transition={{ duration:.5, delay:i*.09, ease:"easeOut" }}
                  style={{ display:"flex", gap:"1rem", alignItems:"flex-start", padding:"1rem 1.2rem", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:10 }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:"rgba(255,255,255,.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:".1rem" }}>
                    <Icon size={16} color="rgba(255,255,255,.55)" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.68rem,.78vw,.74rem)", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,.7)", margin:"0 0 .3rem" }}>{label}</p>
                    <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.9rem,.9vw,1rem)", lineHeight:1.6, color:"#fff", margin:0 }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={VP} transition={{ duration:.5, delay:.4, ease:"easeOut" }}
              style={{ padding:"1.2rem 1.4rem", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:10 }}>
              <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.92rem,.95vw,1rem)", lineHeight:1.7, color:"#fff", margin:"0 0 .8rem" }}>
                Turning Point runs as a residential programme at LEAD College, Dhoni, Palakkad — open to anyone above 18 who desires meaningful personal growth and transformation.
              </p>
              <a href="mailto:info@lead.ac.in" style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.68rem,.76vw,.74rem)", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(255,255,255,.65)", fontWeight:700, textDecoration:"none", borderBottom:"1px solid rgba(255,255,255,.25)", paddingBottom:".15rem" }}>
                Enquire About the Next Cohort →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════ TESTIMONIALS ════════════ */
function TestimonialsSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background:"#fff", padding:"clamp(2.5rem,5vh,4rem) 0" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:`0 ${SPACE.sectionX}` }}>
        <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={FADE_UP} custom={0} style={{ textAlign:"center", marginBottom:"clamp(2rem,4vh,3.5rem)" }}>
          <p style={{ fontFamily:cinzel.style.fontFamily, ...TYPE.eyebrow, color:COLORS.primary, marginBottom:".5rem" }}>Voices from Participants</p>
          <h2 style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(1.2rem,2.2vw,2.7rem)", fontWeight:800, textTransform:"uppercase", letterSpacing:"-.025em", color:"#0D0D0D", margin:0, lineHeight:1 }}>What They Say</h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={VP} variants={STAGGER_CONTAINER} style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,minmax(0,1fr))", gap:"1.2rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={STAGGER_ITEM} style={{ background:t.accent?COLORS.primary:"#fff", borderRadius:16, padding:"1.8rem", display:"flex", flexDirection:"column", border:`1px solid ${t.accent?COLORS.primary:"rgba(0,0,0,.07)"}`, boxShadow:t.accent?"0 16px 40px rgba(0,92,159,.22)":"0 2px 10px rgba(0,0,0,.05)" }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"4.4rem", lineHeight:.65, color:t.accent?"rgba(255,255,255,.13)":"rgba(0,92,159,.09)", marginBottom:".9rem", userSelect:"none" }}>"</div>
              <p style={{ fontFamily:playfair.style.fontFamily, fontSize:"clamp(.92rem,.95vw,1rem)", lineHeight:1.78, color:t.accent?"#fff":"#111", margin:"0 0 auto", flex:1, paddingBottom:"1.2rem" }}>{t.quote}</p>
              <div style={{ paddingTop:"1rem", borderTop:`1px solid ${t.accent?"rgba(255,255,255,.14)":"rgba(0,92,159,.09)"}`, display:"flex", alignItems:"center", gap:".7rem" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:t.accent?"rgba(255,255,255,.14)":"rgba(0,92,159,.07)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Users size={12} color={t.accent?"#fff":COLORS.primary} strokeWidth={2} />
                </div>
                <span style={{ fontFamily:cinzel.style.fontFamily, fontSize:"clamp(.66rem,.72vw,.72rem)", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:t.accent?"rgba(255,255,255,.52)":"#999" }}>{t.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function TurningPoint() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <VisionSection />
      <JourneySection />
      <ParticipantsSection />
      <OutcomesSection />
      <ImpactSection />
      <TestimonialsSection />
    </>
  );
}