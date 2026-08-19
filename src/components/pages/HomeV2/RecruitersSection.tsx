"use client";

/*  "The Best Are Already Here" — recruiters teaser for /home.
    A three-row gently-moving grid of recruiter logos (alternating directions),
    with an informative header. Stats + CTA intentionally omitted — those live
    in the adjacent "LEAD by the Numbers" section, so this stays purely visual. */

import Image from "next/image";
import { cinzel, playfair } from "@/app/fonts";

const LOGOS = Array.from({ length: 48 }, (_, i) => `/logos/recruiters/${i + 1}.png`);
const ROW_1 = LOGOS.slice(0, 16);
const ROW_2 = LOGOS.slice(16, 32);
const ROW_3 = LOGOS.slice(32, 48);

function Row({ logos, cls }: { logos: string[]; cls: string }) {
  return (
    <div className="rq-row">
      <div className={`rq-track ${cls}`}>
        {[...logos, ...logos].map((src, i) => (
          <span key={i} className="rq-logo">
            <Image src={src} alt="Recruiting partner" width={190} height={96} className="rq-img" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RecruitersSection() {
  return (
    <section className="rq">
      <style>{RQ_CSS}</style>
      <div className="rq-inner">
        <header className="rq-head rv">
          <p className={`rq-eyebrow ${cinzel.className}`}><span className="rq-dash" />Placements &middot; 2024&ndash;26</p>
          <h2 className={`rq-title ${cinzel.className}`}>The Best Are Already Here.</h2>
          <p className={`rq-sub ${playfair.className}`}>
            From national banks to fast-growing enterprises, 219+ recruiters engaged the
            2024&ndash;26 batch &mdash; offering roles across marketing, BFSI, analytics,
            and consulting. Our graduates don&rsquo;t just find jobs; they&rsquo;re sought after.
          </p>
        </header>
      </div>

      {/* three-row moving logo grid */}
      <div className="rq-marquee rv" aria-label="Recruiting partners">
        <Row logos={ROW_1} cls="rq-l2r rq-s1" />
        <Row logos={ROW_2} cls="rq-r2l rq-s2" />
        <Row logos={ROW_3} cls="rq-l2r rq-s3" />
      </div>
    </section>
  );
}

const RQ_CSS = `
.rq{position:relative;background:linear-gradient(180deg,#fff 0%,#f3f7fc 100%);padding:clamp(3.2rem,6.5vw,5.5rem) 0;overflow:hidden;}
.rq-inner{max-width:1240px;margin:0 auto;padding:0 clamp(1.15rem,4vw,3.2rem);}
.rq-head{text-align:center;max-width:760px;margin:0 auto;}
.rq-eyebrow{display:flex;align-items:center;justify-content:center;gap:.8rem;font-size:.6rem;letter-spacing:.34em;text-transform:uppercase;color:#005C9F;font-weight:600;margin:0 0 1rem;}
.rq-dash{display:inline-block;width:24px;height:1.5px;background:#005C9F;}
.rq-title{font-size:clamp(2rem,4.6vw,3.5rem);line-height:1.02;font-weight:700;letter-spacing:-.015em;margin:0;
  background:linear-gradient(90deg,#0D0D0D 0%,#005C9F 64%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.rq-sub{font-size:clamp(.9rem,1.05vw,1.02rem);line-height:1.75;color:#46505f;margin:1rem auto 0;max-width:44rem;}

/* moving logo rows */
.rq-marquee{margin:clamp(2.4rem,4.5vw,3.4rem) 0 0;display:flex;flex-direction:column;gap:1rem;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);}
.rq-row{overflow:hidden;}
.rq-track{display:flex;gap:1rem;width:max-content;will-change:transform;}
.rq-l2r{animation-name:rqL2R;animation-timing-function:linear;animation-iteration-count:infinite;}
.rq-r2l{animation-name:rqR2L;animation-timing-function:linear;animation-iteration-count:infinite;}
.rq-s1{animation-duration:66s;}
.rq-s2{animation-duration:82s;}
.rq-s3{animation-duration:74s;}
@keyframes rqL2R{from{transform:translateX(-50%);}to{transform:translateX(0);}}
@keyframes rqR2L{from{transform:translateX(0);}to{transform:translateX(-50%);}}
/* logos shown directly — no container box, and larger to fill the section */
.rq-logo{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:clamp(150px,16vw,210px);height:clamp(94px,11vw,132px);}
.rq-img{max-width:90%;height:auto;max-height:84%;width:auto;object-fit:contain;}
@media(prefers-reduced-motion:reduce){.rq-l2r,.rq-r2l{animation:none;}.rq-track{flex-wrap:wrap;width:100%;justify-content:center;}}
`;
