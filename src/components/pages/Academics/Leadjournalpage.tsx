"use client";

import "./book3d.css";
import React, { useRef, useEffect, useState, memo } from "react";
import {
  motion, useInView, useScroll, useTransform,
  LazyMotion, domAnimation, m,
} from "framer-motion";
import { cinzel, playfair } from "@/app/fonts";
import {
  ArrowUpRight, Globe, CheckCircle2, Award, Eye, Zap, Users, Star,
  FileText, Send, ExternalLink, BarChart2, Lightbulb, TrendingUp,
  DollarSign, Landmark, AlignLeft, Quote, Link2, UserCheck, Hash,
} from "lucide-react";

const NAVY  = "#0a2463";
const WHITE = "#ffffff";
const OFF   = "#f7f8fc";
const MUTED = "#8494b4";
const E = [0.22, 1, 0.36, 1] as [number, number, number, number];

const gradientText: React.CSSProperties = {
  background: "linear-gradient(90deg, #0D0D0D 0%, #0a2463 62%)",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  backgroundClip: "text", color: "transparent",
  paddingBottom: "0.06em", display: "block",
};
const GPU: React.CSSProperties = { willChange: "opacity, transform" };

function Num({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const id = setInterval(() => {
      cur += to / 50;
      if (cur >= to) { setV(to); clearInterval(id); }
      else setV(Math.floor(cur));
    }, 18);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

const Book3D = memo(function Book3D() {
  return (
    <div className="b3d-container" style={{ transform: "translateZ(0)" }}>
      <div className="b3d-book">
        <span className="b3d-shadow" />
        <div className="b3d-back" />
        <div className="b3d-cover-end" />
        <div className="b3d-page b3d-page-last" />
        <div className="b3d-page b3d-page-5" />
        <div className="b3d-page b3d-page-4" />
        <div className="b3d-page b3d-page-3" />
        <div className="b3d-page b3d-page-2" />
        <div className="b3d-page b3d-page-1" />
        <div className="b3d-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/journal.jpg" alt="LEADER Journal Cover" className="b3d-cover-img" />
        </div>
      </div>
    </div>
  );
});

function Hero() {
  return (
    <LazyMotion features={domAnimation} strict>
      <section
        className="relative flex flex-col overflow-hidden bg-white min-h-screen"
        style={{
          // @ts-ignore
          animationTimeline: "scroll()",
          animationName: "heroFade",
          animationDuration: "1ms",
          animationFillMode: "both",
          animationTimingFunction: "linear",
          animationRangeStart: "0vh",
          animationRangeEnd: "60vh",
        }}
      >
        <style>{`@keyframes heroFade { from { opacity:1; } to { opacity:0; } }`}</style>

        {/* grid removed — only the soft radial blur remains */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-50/60 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center">

            {/* LEFT */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center py-12 lg:py-0">
              <m.div initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }}
                transition={{ type:"tween", duration:0.55, delay:0.15, ease:E }} style={GPU}
                className="flex items-center mb-3">
                <div className="h-px bg-[#0a2463] mr-3" style={{ width:"clamp(24px,2.5vw,44px)" }} />
                <span className={`${cinzel.className} text-[#0a2463] uppercase font-medium tracking-widest`}
                  style={{ fontSize:"clamp(8px,0.72vw,13px)" }}>
                  Peer-Reviewed · Open Access · Business Management
                </span>
              </m.div>

              <m.h1 className={`${cinzel.className} font-black leading-none tracking-tight mb-3`}
                style={{ fontSize:"clamp(2.6rem,5vw,4.2rem)", ...gradientText, ...GPU }}
                initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
                transition={{ type:"tween", duration:0.65, delay:0.05, ease:E }}>
                LEADER
              </m.h1>

              <m.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ type:"tween", duration:0.45, delay:0.35, ease:E }} style={GPU} className="mb-4">
                <span className={`${cinzel.className} inline-block uppercase`}
                  style={{ fontSize:"clamp(9px,0.75vw,13px)", letterSpacing:"0.22em",
                    padding:"3px 10px", backgroundColor:"#d6e4ff", color:NAVY }}>
                  International Journal of Business Management
                </span>
              </m.div>

              <m.p className={`${playfair.className} mb-5`}
                style={{ color:"#555", fontSize:"clamp(14px,0.9vw,16px)", lineHeight:1.8,
                  maxWidth:"clamp(300px,36vw,540px)", ...GPU }}
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ type:"tween", duration:0.5, delay:0.5, ease:E }}>
                LEADER is a peer-reviewed, open-access international journal dedicated to advancing
                scholarly knowledge across business management, finance, economics, entrepreneurship,
                and organizational studies. We serve as a rigorous platform for researchers,
                academicians, and industry practitioners to disseminate original findings and
                evidence-based insights that shape contemporary business thinking. Each submission
                undergoes a thorough double-blind review process, ensuring that only methodologically
                sound and intellectually significant work reaches our global readership.
              </m.p>

              {/* Stats + CTA — border-t removed */}
              <m.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ type:"tween", duration:0.5, delay:0.62, ease:E }} style={GPU}
                className="flex items-center flex-wrap gap-x-6 gap-y-3 pt-4">
                {[
                  { value:"200+", label:"Articles"  },
                  { value:"40+",  label:"Countries" },
                  { value:"6",    label:"Domains"   },
                ].map(stat => (
                  <div key={stat.label} className="flex flex-col">
                    <span className={`${cinzel.className} font-bold leading-none`}
                      style={{ fontSize:"clamp(16px,1.6vw,26px)",
                        background:"linear-gradient(90deg,#0D0D0D 0%,#0a2463 62%)",
                        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                        backgroundClip:"text", color:"transparent" }}>
                      {stat.value}
                    </span>
                    <span className={`${playfair.className} text-gray-400 tracking-wide`}
                      style={{ fontSize:"clamp(11px,0.7vw,13px)" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
                <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                <a href="https://leaderjournal.in/" target="_blank" rel="noopener noreferrer"
                  className={`${cinzel.className} group inline-flex items-center gap-2 uppercase tracking-[0.18em] font-bold px-6 py-3 transition-opacity duration-300 hover:opacity-80`}
                  style={{ fontSize:"12px", backgroundColor:NAVY, color:WHITE }}>
                  <span>Visit Journal</span>
                  <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </m.div>
            </div>

            {/* RIGHT — Book3D */}
            <m.div initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ type:"tween", duration:0.9, delay:0.4 }} style={GPU}
              className="hidden lg:flex w-[45%] h-full items-center justify-end pointer-events-none select-none">
              <Book3D />
            </m.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background:`linear-gradient(90deg,transparent,${NAVY}30,transparent)` }} />
      </section>
    </LazyMotion>
  );
}

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-12%" });
  const stats = [
    { val:6,   suf:"",  label:"Research Domains"   },
    { val:40,  suf:"+", label:"Countries Reached"  },
    { val:200, suf:"+", label:"Articles Published" },
  ];
  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden py-20 sm:py-28" style={{ backgroundColor:NAVY }}>
      <div className={`${cinzel.className} absolute -right-4 top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none`}
        style={{ fontSize:"clamp(180px,30vw,420px)", color:"rgba(255,255,255,0.03)", letterSpacing:"-0.05em" }}>01</div>
      <div className="absolute top-0 bottom-0 left-[42%] w-px hidden lg:block" style={{ backgroundColor:"rgba(255,255,255,0.06)" }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-14 lg:gap-28 items-center">
          <motion.div initial={{ opacity:0, y:36 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.85, ease:E }} style={GPU}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-7" style={{ backgroundColor:"rgba(255,255,255,0.3)" }} />
              <span className={`${cinzel.className} uppercase tracking-[0.38em]`} style={{ fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>01 / About</span>
            </div>
            <h2 className={`${cinzel.className} font-black uppercase text-white leading-none mb-12`} style={{ fontSize:"clamp(34px,5vw,74px)", letterSpacing:"-0.025em" }}>ABOUT<br />LEADER</h2>
            <div className="space-y-7">
              {stats.map((s,i) => (
                <motion.div key={s.label} initial={{ opacity:0, x:-24 }} animate={inView?{opacity:1,x:0}:{}}
                  transition={{ duration:0.6, delay:0.3+i*0.1, ease:E }} style={GPU}>
                  <div className="flex items-baseline gap-3">
                    <span className={`${cinzel.className} font-black text-white leading-none`} style={{ fontSize:"clamp(30px,3.5vw,54px)" }}><Num to={s.val} suffix={s.suf} /></span>
                    <span className={`${playfair.className}`} style={{ fontSize:"13px", color:"rgba(255,255,255,0.45)" }}>{s.label}</span>
                  </div>
                  {i<2 && <div className="mt-3 h-px w-full" style={{ backgroundColor:"rgba(255,255,255,0.07)" }} />}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, y:36 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.85, delay:0.18, ease:E }} style={GPU}>
            <p className={`${playfair.className} leading-relaxed mb-6`} style={{ fontSize:"clamp(14px,0.9vw,16px)", color:"rgba(255,255,255,0.72)", lineHeight:1.75 }}>
              LEADER is a prestigious peer-reviewed academic journal dedicated to publishing high-quality research in business management and related disciplines. We provide a platform for researchers, academicians, and practitioners to share original findings and scholarly insights that advance global business knowledge.
            </p>
            <p className={`${playfair.className} leading-relaxed mb-10`} style={{ fontSize:"clamp(14px,0.9vw,16px)", color:"rgba(255,255,255,0.72)", lineHeight:1.75 }}>
              We maintain rigorous peer-review standards and international publishing practices — ensuring publication of only the most impactful and methodologically sound research, maintaining the highest standards of scholarly communication.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon:CheckCircle2, label:"Double-Blind Review" },
                { icon:Globe,        label:"International Reach" },
                { icon:Eye,          label:"100% Open Access"    },
                { icon:Zap,          label:"Fast Publication"    },
              ].map(({ icon:Icon, label },i) => (
                <motion.div key={label} initial={{ opacity:0, y:14 }} animate={inView?{opacity:1,y:0}:{}}
                  transition={{ duration:0.5, delay:0.5+i*0.07, ease:E }}
                  style={{ ...GPU, border:"1px solid rgba(255,255,255,0.12)", backgroundColor:"rgba(255,255,255,0.06)" }}
                  className="flex items-center gap-3 px-4 py-3">
                  <Icon size={13} strokeWidth={1.5} color="rgba(255,255,255,0.6)" />
                  <span className={`${cinzel.className} uppercase tracking-wider`} style={{ fontSize:"12px", color:"rgba(255,255,255,0.80)" }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyPublish() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-12%" });
  const items = [
    { icon:Award,        title:"Academic Excellence", desc:"Recognized platform for high-impact business research."       },
    { icon:CheckCircle2, title:"Rigorous Review",     desc:"Double-blind peer review by domain experts."                  },
    { icon:Eye,          title:"Global Visibility",   desc:"Maximum reach and citation opportunities worldwide."           },
    { icon:Zap,          title:"Fast Publication",    desc:"Quick turnaround from submission to final print."              },
    { icon:FileText,     title:"Diverse Topics",      desc:"All domains of business management and entrepreneurship."      },
    { icon:Star,         title:"Quality Standards",   desc:"Highest standards of research ethics and communication."       },
  ];
  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-white py-20 sm:py-28">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`linear-gradient(${NAVY}04 1px,transparent 1px)`, backgroundSize:"100% 80px" }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7, ease:E }} style={GPU} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-7" style={{ backgroundColor:NAVY }} />
            <span className={`${cinzel.className} uppercase tracking-[0.38em]`} style={{ fontSize:"12px", color:MUTED }}>02 / Why Publish</span>
          </div>
          <h2 className={`${cinzel.className} font-black uppercase leading-none`} style={{ fontSize:"clamp(30px,4.5vw,68px)", letterSpacing:"-0.025em", ...gradientText }}>WHY PUBLISH<br />WITH LEADER?</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor:`${NAVY}10` }}>
          {items.map(({ icon:Icon, title, desc },i) => (
            <motion.div key={title} initial={{ opacity:0, y:22 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.6, delay:i*0.07, ease:E }} style={GPU}
              className="group relative bg-white p-6 lg:p-8 hover:bg-[#f7f8fc] transition-colors duration-300 overflow-hidden">
              <motion.div className="absolute top-0 left-0 right-0 h-0.5 origin-left" style={{ backgroundColor:NAVY }}
                initial={{ scaleX:0 }} whileHover={{ scaleX:1 }} transition={{ duration:0.35, ease:E }} />
              <div className="w-9 h-9 flex items-center justify-center mb-5" style={{ backgroundColor:`${NAVY}08` }}>
                <Icon size={14} strokeWidth={1.5} color={NAVY} />
              </div>
              <h4 className={`${cinzel.className} uppercase tracking-wider font-bold mb-2`} style={{ fontSize:"12px", color:NAVY }}>{title}</h4>
              <p className={`${playfair.className} leading-relaxed`} style={{ fontSize:"clamp(14px,0.9vw,16px)", color:MUTED }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchAreas() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-12%" });
  const areas = [
    { icon:TrendingUp, title:"Business Management", items:["Strategic Management","Organizational Behavior","Operations Management","Business Analytics"] },
    { icon:BarChart2,  title:"Marketing",           items:["Digital Marketing","Consumer Behavior","Brand Management","Marketing Strategy"] },
    { icon:DollarSign, title:"Finance",             items:["Financial Management","Investment Analysis","Risk Management","Corporate Finance"] },
    { icon:Users,      title:"Human Resources",     items:["HRM Practices","Employee Engagement","Talent Management","Org Development"] },
    { icon:Lightbulb,  title:"Entrepreneurship",    items:["Startup Ecosystems","Innovation Management","Social Entrepreneurship","Business Incubation"] },
    { icon:Landmark,   title:"Economics",           items:["Microeconomics","Macroeconomics","Development Economics","Behavioral Economics"] },
  ];
  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-28" style={{ backgroundColor:NAVY }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-[1fr_2.2fr] gap-14 lg:gap-20 items-start">
          <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7, ease:E }} style={GPU} className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-7">
              <div className="h-px w-7" style={{ backgroundColor:"rgba(255,255,255,0.28)" }} />
              <span className={`${cinzel.className} uppercase tracking-[0.38em]`} style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)" }}>03 / Scope</span>
            </div>
            <h2 className={`${cinzel.className} font-black uppercase text-white leading-none mb-6`} style={{ fontSize:"clamp(30px,4.5vw,68px)", letterSpacing:"-0.025em" }}>RESEARCH<br />AREAS</h2>
            <p className={`${playfair.className} mb-8`} style={{ fontSize:"clamp(14px,0.9vw,16px)", color:"rgba(255,255,255,0.9)", lineHeight:1.78 }}>
              LEADER welcomes original research across six core disciplines of business and management. Each domain encompasses a broad spectrum of sub-topics, encouraging interdisciplinary approaches and comparative studies that contribute meaningfully to global academic discourse.
            </p>
            <div className="flex flex-wrap gap-2">
              {[{label:"6 Domains"},{label:"24 Topics"},{label:"Open Scope"}].map(({label}) => (
                <span key={label} className={`${cinzel.className} uppercase tracking-widest`}
                  style={{ fontSize:"12px", padding:"4px 10px", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.5)" }}>{label}</span>
              ))}
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {areas.map(({ icon:Icon, title, items },i) => (
              <motion.div key={title} initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ duration:0.6, delay:0.1+i*0.08, ease:E }}
                style={{ ...GPU, border:"1px solid rgba(255,255,255,0.12)", backgroundColor:"rgba(255,255,255,0.05)" }}
                className="p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{ border:"1px solid rgba(255,255,255,0.2)", backgroundColor:"rgba(255,255,255,0.08)" }}>
                    <Icon size={13} strokeWidth={1.5} color="rgba(255,255,255,0.8)" />
                  </div>
                  <span className={`${cinzel.className} uppercase tracking-wider font-bold leading-tight`}
                    style={{ fontSize:"clamp(11px,0.8vw,13px)", color:"white" }}>{title}</span>
                </div>
                <div style={{ height:"1px", backgroundColor:"rgba(255,255,255,0.08)" }} />
                <div className="flex flex-col gap-2">
                  {items.map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor:"rgba(255,255,255,0.4)" }} />
                      <span className={`${playfair.className}`}
                        style={{ fontSize:"clamp(11px,0.82vw,13px)", color:"rgba(255,255,255,0.7)", lineHeight:1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Guidelines() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-12%" });
  const steps = [
    { n:"01", label:"Visit Portal",      desc:"Go to leaderjournal.in and open the author submission portal." },
    { n:"02", label:"Create Account",    desc:"Register using your institutional email address." },
    { n:"03", label:"Upload Manuscript", desc:"Submit your 3,000–8,000 word article with APA citations." },
    { n:"04", label:"Peer Review",       desc:"Double-blind expert review — typically 4–6 weeks." },
    { n:"05", label:"Revise & Accept",   desc:"Incorporate feedback; receive formal acceptance notice." },
    { n:"06", label:"Publication",       desc:"Your article goes live; certificate of publication issued." },
  ];
  const specs = [
    { icon:AlignLeft,  label:"Word Count",    value:"3,000 – 8,000 words" },
    { icon:Quote,      label:"Abstract",       value:"150 – 250 words" },
    { icon:Hash,       label:"Keywords",       value:"4 – 6 terms" },
    { icon:Link2,      label:"Citations",      value:"APA 7th Edition" },
    { icon:FileText,   label:"Figures/Tables", value:"With captions" },
    { icon:UserCheck,  label:"Author Details", value:"Separate cover page" },
  ];
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor:WHITE }}>
      <div className="flex flex-col lg:flex-row w-full">
        <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}}
          transition={{ duration:0.85, ease:E }} style={GPU}
          className="flex-1 px-8 sm:px-14 pt-20 sm:pt-28 pb-16 lg:pb-24">
          <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ duration:0.7, ease:E }} style={GPU} className="flex items-center gap-3 mb-8">
            <div className="h-px w-7" style={{ backgroundColor:NAVY }} />
            <span className={`${cinzel.className} uppercase tracking-[0.38em]`} style={{ fontSize:"12px", color:MUTED }}>04 / Guidelines</span>
          </motion.div>
          <h2 className={`${cinzel.className} font-black uppercase leading-none mb-10`}
            style={{ fontSize:"clamp(26px,3.5vw,52px)", letterSpacing:"-0.02em", ...gradientText }}>MANUSCRIPT<br />SPECS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {specs.map(({ icon:Icon, label, value },i) => (
              <motion.div key={label} initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay:0.2+i*0.07, ease:E }}
                style={{ ...GPU, border:`1px solid ${NAVY}10`, backgroundColor:OFF }}
                className="group flex items-start gap-4 p-4 transition-all duration-300 hover:border-[#0a2463]/25">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor:`${NAVY}08` }}>
                  <Icon size={13} strokeWidth={1.5} color={NAVY} />
                </div>
                <div>
                  <p className={`${cinzel.className} uppercase tracking-widest mb-0.5`} style={{ fontSize:"12px", color:MUTED }}>{label}</p>
                  <p className={`${playfair.className} font-medium`} style={{ fontSize:"clamp(12px,0.9vw,15px)", color:NAVY }}>{value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}}
          transition={{ duration:0.85, delay:0.1, ease:E }}
          style={{ ...GPU, backgroundColor:NAVY }}
          className="flex-1 px-8 sm:px-14 py-16 lg:py-24">
          <h2 className={`${cinzel.className} font-black uppercase leading-none mb-10 text-white`}
            style={{ fontSize:"clamp(26px,3.5vw,52px)", letterSpacing:"-0.02em" }}>SUBMISSION<br />FLOW</h2>
          <div className="space-y-0">
            {steps.map((s,i) => (
              <motion.div key={s.n} initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}}
                transition={{ duration:0.55, delay:0.3+i*0.09, ease:E }}
                style={{ ...GPU, borderColor:"rgba(255,255,255,0.07)" }}
                className="group flex gap-5 py-4 border-b last:border-b-0">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300 group-hover:border-white/40"
                  style={{ borderColor:"rgba(255,255,255,0.15)" }}>
                  <span className={`${cinzel.className} font-black`} style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)" }}>{s.n}</span>
                </div>
                <div>
                  <p className={`${cinzel.className} uppercase tracking-wider font-bold mb-0.5`} style={{ fontSize:"12px", color:"rgba(255,255,255,0.8)" }}>{s.label}</p>
                  <p className={`${playfair.className} leading-relaxed`} style={{ fontSize:"clamp(14px,0.9vw,16px)", color:"rgba(255,255,255,0.9)", lineHeight:1.75 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-12%" });
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["-10%","10%"]);
  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20 sm:py-28" style={{ backgroundColor:NAVY }}>
      <motion.div style={{ y:bgY }} className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <span className={`${cinzel.className} font-black leading-none`}
          style={{ fontSize:"clamp(120px,22vw,340px)", color:"rgba(255,255,255,0.025)", letterSpacing:"-0.04em", marginLeft:"-0.02em" }}>SUBMIT</span>
      </motion.div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-24 items-center">
          <motion.div initial={{ opacity:0, y:36 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.85, ease:E }} style={GPU}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-7 bg-white/25" />
              <span className={`${cinzel.className} uppercase tracking-[0.38em] text-white/25`} style={{ fontSize:"12px" }}>05 / Submit</span>
            </div>
            <h2 className={`${cinzel.className} font-black uppercase text-white leading-none mb-6`}
              style={{ fontSize:"clamp(38px,6.5vw,100px)", letterSpacing:"-0.03em", lineHeight:0.92 }}>
              READY TO<br />PUBLISH YOUR<br />RESEARCH?
            </h2>
            <p className={`${playfair.className} leading-relaxed max-w-md`}
              style={{ fontSize:"clamp(14px,0.9vw,16px)", color:"rgba(255,255,255,0.9)", lineHeight:1.75 }}>
              Join hundreds of researchers who have published in LEADER Journal. Share your findings with the global academic community.
            </p>
          </motion.div>
          <motion.div initial={{ opacity:0, x:36 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.85, delay:0.2, ease:E }} style={GPU} className="flex flex-col gap-3">
            <a href="https://leaderjournal.in/" target="_blank" rel="noopener noreferrer"
              className={`${cinzel.className} group flex items-center justify-between px-7 py-5 bg-white font-bold uppercase tracking-[0.16em] hover:bg-white/90 transition-colors duration-300`}
              style={{ fontSize:"12px", color:NAVY }}>
              <div className="flex items-center gap-3"><Send size={13} strokeWidth={1.5} /><span>Submit Your Manuscript Now</span></div>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
            <a href="https://leaderjournal.in/" target="_blank" rel="noopener noreferrer"
              className={`${cinzel.className} group flex items-center justify-between px-7 py-4 font-bold uppercase tracking-[0.16em] transition-all duration-300`}
              style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", border:"1px solid rgba(255,255,255,0.12)" }}
              onMouseEnter={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,0.35)"; el.style.color="rgba(255,255,255,0.8)"; }}
              onMouseLeave={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,0.12)"; el.style.color="rgba(255,255,255,0.5)"; }}>
              <div className="flex items-center gap-3"><ExternalLink size={13} strokeWidth={1.5} /><span>Visit Journal Website</span></div>
              <ArrowUpRight size={13} />
            </a>
            <div className="flex items-center gap-6 pt-3 mt-1 border-t" style={{ borderColor:"rgba(255,255,255,0.08)" }}>
              {[{val:"100%",label:"Open Access"},{val:"Free",label:"To Submit"},{val:"Fast",label:"Review"}].map(m => (
                <div key={m.label} className="flex flex-col">
                  <span className={`${cinzel.className} font-black text-white`} style={{ fontSize:"16px" }}>{m.val}</span>
                  <span className={`${playfair.className}`} style={{ fontSize:"12px", color:"rgba(255,255,255,0.28)" }}>{m.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function LEADJournalPage() {
  return (
    <div className={`${cinzel.className} ${playfair.className} overflow-x-hidden`}>
      <Hero />
      <About />
      <WhyPublish />
      <ResearchAreas />
      <Guidelines />
      <CTA />
    </div>
  );
}