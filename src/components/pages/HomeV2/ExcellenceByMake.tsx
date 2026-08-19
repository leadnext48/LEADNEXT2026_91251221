"use client";

/*  "Excellence, By Make." — the white cards section from the homepage's
    WhyChooseLead, pulled out on its own (WITHOUT the pinned "Reimagine Your
    Future / WHY CHOOSE LEAD" scroll-zoom that precedes it on the homepage). */

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { cinzel, playfair } from "@/app/fonts";
import { Users, BookOpen, Briefcase, FlaskConical, Globe, TrendingUp, Sparkles } from "lucide-react";

const NAVY = "#0a2463";
const navyGrad: React.CSSProperties = {
  background: "linear-gradient(90deg,#0D0D0D 0%,#0a2463 62%)",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent",
};

const CARDS = [
  { n: "01", icon: Users,        title: "Expert Faculty",         body: "Guided by Guinness World Record holder Dr. Thomas George K. — mentors focused on real-world projects and experiential learning that prepares you from day one." },
  { n: "02", icon: BookOpen,     title: "Modern Curriculum",      body: "Digital Marketing, Analytics, Robotics, and AI built into every programme. An Entrepreneurial MBA that evolves with industry, never behind it." },
  { n: "03", icon: Briefcase,    title: "Industry Partnerships",  body: "Live collaborations with 200+ companies including ITC, Deloitte, and Wipro — real internships and client projects that build your portfolio." },
  { n: "04", icon: FlaskConical, title: "Research Opportunities", body: "LEAD Research Centre, an approved Ph.D. hub under KUFOS, driving impactful academic and applied industry research initiatives." },
  { n: "05", icon: Globe,        title: "Global Exposure",        body: "A multicultural community spanning 10+ nations. International projects and global faculty partnerships from your very first semester." },
  { n: "06", icon: TrendingUp,   title: "Career Support",         body: "95%+ placement record. Training, mentorship, alumni network, and a startup incubation cell — graduate fully industry-ready." },
];

function Card({ n, Icon, title, body }: { n: string; Icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="ebm-card">
      <span className={`ebm-num ${cinzel.className}`} aria-hidden="true">{n}</span>
      <div className="ebm-icon"><Icon size={14} color={NAVY} strokeWidth={1.6} /></div>
      <p className={`ebm-t ${cinzel.className}`}>{title}</p>
      <div className="ebm-hair" />
      <p className={`ebm-b ${playfair.className}`}>{body}</p>
    </div>
  );
}

export default function ExcellenceByMake() {
  const [anim, setAnim] = useState<unknown>(null);
  useEffect(() => {
    fetch("/Back to school!.json").then((r) => r.json()).then(setAnim).catch(() => {});
  }, []);

  return (
    <section className="ebm">
      <style>{EBM_CSS}</style>
      <div className="ebm-wrap">
        <div className="ebm-header rv">
          <div className="ebm-head-left">
            <div className="ebm-head-top">
              <p className={`ebm-eyebrow ${cinzel.className}`}>LEAD College</p>
              <h2 className={`ebm-h2 ${cinzel.className}`} style={navyGrad}>Excellence,<br />By Make.</h2>
            </div>
            <div className="ebm-row1">
              {CARDS.slice(0, 2).map((c) => <Card key={c.title} n={c.n} Icon={c.icon} title={c.title} body={c.body} />)}
            </div>
          </div>
          <div className="ebm-lottie">
            {anim ? (
              <Lottie animationData={anim} loop autoplay style={{ width: "clamp(160px,22vw,300px)", height: "auto", maxHeight: 300 }} />
            ) : (
              <div className="ebm-lottie-fallback"><Sparkles size={80} color={NAVY} strokeWidth={0.6} /></div>
            )}
          </div>
        </div>

        <div className="ebm-row2 rv">
          {CARDS.slice(2, 6).map((c) => <Card key={c.title} n={c.n} Icon={c.icon} title={c.title} body={c.body} />)}
        </div>
      </div>
    </section>
  );
}

const EBM_CSS = `
.ebm{position:relative;background:#fff;overflow-x:hidden;padding:clamp(3.4rem,7vh,6rem) clamp(1.4rem,6vw,6rem);box-sizing:border-box;}
.ebm::before{content:"";position:absolute;inset:0;background-image:linear-gradient(${NAVY}04 1px,transparent 1px),linear-gradient(90deg,${NAVY}04 1px,transparent 1px);background-size:60px 60px;pointer-events:none;}
.ebm-wrap{position:relative;max-width:1320px;margin:0 auto;}
.ebm-header{display:grid;grid-template-columns:1fr 1fr;gap:clamp(1.2rem,2.5vw,2.5rem);align-items:start;margin-bottom:clamp(.55rem,1vw,.9rem);}
.ebm-head-left{display:flex;flex-direction:column;gap:clamp(1rem,2vh,1.6rem);}
.ebm-head-top{padding-bottom:clamp(.8rem,1.8vh,1.3rem);border-bottom:1px solid rgba(10,36,99,.10);}
.ebm-eyebrow{font-size:clamp(7px,.5vw,9px);letter-spacing:.42em;text-transform:uppercase;color:${NAVY}55;margin:0 0 .4rem;font-weight:600;}
.ebm-h2{font-size:clamp(2rem,3.8vw,4.8rem);font-weight:900;letter-spacing:-.03em;text-transform:uppercase;margin:0;line-height:.92;}
.ebm-lottie{display:flex;align-items:center;justify-content:center;max-height:320px;overflow:hidden;}
.ebm-lottie-fallback{width:clamp(160px,22vw,300px);aspect-ratio:1;display:flex;align-items:center;justify-content:center;opacity:.07;}
.ebm-row1{display:grid;grid-template-columns:1fr 1fr;gap:clamp(.55rem,1vw,.9rem);}
.ebm-row2{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(.55rem,1vw,.9rem);}
@media(max-width:900px){.ebm-header{grid-template-columns:1fr;}.ebm-lottie{display:none;}.ebm-row2{grid-template-columns:repeat(2,1fr);}}
@media(max-width:540px){.ebm-row1{grid-template-columns:1fr;}.ebm-row2{grid-template-columns:1fr;}}

.ebm-card{position:relative;overflow:hidden;border:1px solid rgba(10,36,99,.10);background:#fff;padding:clamp(1rem,1.8vw,1.5rem);display:flex;flex-direction:column;gap:.6rem;box-sizing:border-box;transition:border-color .28s,box-shadow .28s,transform .28s,background .28s;}
.ebm-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#0a2463,#1e3a8a);transform:scaleY(0);transform-origin:bottom;transition:transform .32s cubic-bezier(.22,1,.36,1);}
.ebm-card::after{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#0a2463,#1e3a8a);transform:scaleX(0);transform-origin:left;transition:transform .32s cubic-bezier(.22,1,.36,1);}
.ebm-card:hover{border-color:rgba(10,36,99,.22);box-shadow:0 14px 42px rgba(10,36,99,.10);transform:translateY(-3px);background:linear-gradient(160deg,rgba(10,36,99,.025) 0%,#fff 55%);}
.ebm-card:hover::before{transform:scaleY(1);}
.ebm-card:hover::after{transform:scaleX(1);}
.ebm-num{position:absolute;top:.55rem;right:.8rem;font-size:clamp(2rem,2.8vw,3.2rem);font-weight:900;line-height:1;color:${NAVY};opacity:.04;letter-spacing:-.04em;pointer-events:none;}
.ebm-icon{width:36px;height:36px;border:1px solid rgba(10,36,99,.14);background:linear-gradient(135deg,rgba(10,36,99,.06),rgba(30,58,138,.03));display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:4px;transition:background .28s,border-color .28s;}
.ebm-card:hover .ebm-icon{background:linear-gradient(135deg,rgba(10,36,99,.12),rgba(30,58,138,.08));border-color:rgba(10,36,99,.28);}
.ebm-t{font-size:clamp(8.5px,.68vw,11px);font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:${NAVY};margin:0;line-height:1.2;}
.ebm-hair{height:1px;background:linear-gradient(90deg,rgba(10,36,99,.18) 0%,transparent 100%);}
.ebm-b{font-size:clamp(12px,.9vw,14px);color:#4a5568;margin:0;line-height:1.74;}
`;
