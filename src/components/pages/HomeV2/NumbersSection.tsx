"use client";

/*  LEAD by the Numbers — /home-local, compact copy.
    Background is the site's original (STATIC) ImageMarqueeBackground, sat on
    the right at reduced opacity with a left white fade — exactly as it looked
    on the homepage before. Section is a full 100vh so it reads as one complete
    section at a glance. Content scaled down. Kept local so `/` stays untouched. */

import Link from "next/link";
import { cinzel, playfair } from "@/app/fonts";
import { ArrowUpRight, FileText } from "lucide-react";
import { ImageMarqueeBackground } from "@/components/ui/image-marquee-bg";

const STATS = [
  { value: "22 LPA", label: "Highest Package" },
  { value: "100%", label: "Placement Assurance" },
  { value: "3000+", label: "Global Alumni Network" },
  { value: "10+", label: "Specializations Offered" },
  { value: "40+", label: "Expert Faculty Members" },
  { value: "15+", label: "Years of Excellence" },
];

export default function NumbersSection() {
  return (
    <section className="nb">
      <style>{NB_CSS}</style>

      {/* static image cluster (original look), right-hand side, faded */}
      <div className="nb-bg" aria-hidden="true">
        <div className="nb-cluster">
          <ImageMarqueeBackground className="h-full w-full" />
        </div>
        <div className="nb-fade" />
      </div>

      <div className="nb-inner">
        <h2 className={`nb-h2 ${cinzel.className}`}>LEAD by the Numbers</h2>
        <h3 className={`nb-h3 ${cinzel.className}`}>A legacy written in results.</h3>
        <p className={`nb-p ${playfair.className}`}>
          At LEAD, performance isn&rsquo;t presented — it&rsquo;s built. From placements to
          specializations, every milestone reflects a campus designed for clarity,
          competence, and real-world confidence.
        </p>

        <div className="nb-grid">
          {STATS.map((s) => (
            <div key={s.label} className="nb-stat">
              <div className={`nb-v ${cinzel.className}`}>{s.value}</div>
              <div className={`nb-l ${cinzel.className}`}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="nb-cta">
          <Link href="/placements" className="nb-btn nb-btn-solid">
            <span className={cinzel.className}>Explore Placement Record</span>
            <ArrowUpRight size={11} strokeWidth={2.5} />
          </Link>
          <Link href="/placements" className="nb-btn nb-btn-ghost">
            <FileText size={11} strokeWidth={2} />
            <span className={cinzel.className}>2024–26 Placement Summary</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

const NB_CSS = `
.nb{position:relative;width:100%;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:#fff;padding:clamp(2rem,5vh,3.5rem) 0;box-sizing:border-box;}
.nb-inner{position:relative;z-index:2;max-width:1240px;margin:0 auto;padding:0 clamp(1.15rem,4vw,3.2rem);width:100%;}
.nb-inner > *{max-width:640px;}

/* content — scaled down proportionally */
.nb-h2{font-size:clamp(1.4rem,2.9vw,2.35rem);line-height:1.05;font-weight:700;margin:0;letter-spacing:-.01em;
  background:linear-gradient(90deg,#0D0D0D 0%,#005C9F 62%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.nb-h3{font-size:clamp(.98rem,1.5vw,1.3rem);font-weight:600;color:#0e1524;margin:.55rem 0 0;}
.nb-p{font-size:clamp(.82rem,1vw,.94rem);line-height:1.75;color:rgba(14,21,36,.7);margin:.75rem 0 0;max-width:36rem;}
.nb-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem 1.6rem;margin:2rem 0 0;max-width:560px;}
.nb-v{font-size:clamp(1.25rem,2.1vw,1.9rem);font-weight:700;color:#0e1524;letter-spacing:.01em;line-height:1;}
.nb-l{font-size:clamp(.68rem,.8vw,.76rem);letter-spacing:.04em;text-transform:uppercase;font-weight:600;color:rgba(14,21,36,.62);margin-top:.5rem;}
.nb-cta{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.9rem;}
.nb-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.62rem 1.15rem;border-radius:7px;text-decoration:none;transition:transform .2s,box-shadow .2s,background .2s;}
.nb-btn span{font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;font-weight:700;}
.nb-btn:hover{transform:translateY(-2px);}
.nb-btn-solid{background:linear-gradient(135deg,#0a2463 0%,#005C9F 100%);box-shadow:0 5px 18px rgba(10,36,99,.26);}
.nb-btn-solid span{color:#fff;}.nb-btn-solid svg{color:rgba(255,255,255,.85);}
.nb-btn-ghost{background:#fff;border:1px solid rgba(10,36,99,.25);}
.nb-btn-ghost span{color:rgba(10,36,99,.7);}.nb-btn-ghost svg{color:rgba(10,36,99,.5);}
.nb-btn-ghost:hover{border-color:rgba(10,36,99,.5);}

/* background — original static cluster, right side, faded */
.nb-bg{position:absolute;inset:0;z-index:0;pointer-events:none;}
.nb-cluster{position:absolute;right:-10%;top:0;bottom:0;width:60%;opacity:.4;display:flex;align-items:center;}
.nb-fade{position:absolute;inset:0;background:
  linear-gradient(90deg,#fff 30%,rgba(255,255,255,.4) 58%,rgba(255,255,255,0) 82%),
  linear-gradient(180deg,#fff,rgba(255,255,255,0) 14%,rgba(255,255,255,0) 86%,#fff);}
@media(max-width:768px){.nb{min-height:auto;padding:clamp(3rem,7vw,5rem) 0;}.nb-cluster{opacity:.14;right:-24%;width:78%;}.nb-inner > *{max-width:100%;}}
@media(max-width:640px){.nb-grid{grid-template-columns:repeat(2,1fr);}}
`;
