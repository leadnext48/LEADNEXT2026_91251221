"use client";

/*  Dhoni hero — lightweight replacement for the old scroll-animated-video.
    The previous hero loaded GSAP + ScrollTrigger + CustomEase + Lenis and ran
    a scroll-hijacked "tumble/expand" timeline, which was the main cause of the
    slow load on this page. This version uses a plain autoplay background video
    (poster-first, preload=metadata) and a simple CSS fade-in. No JS animation
    libraries, no scroll listeners. */

import { cinzel, playfair } from "@/app/fonts";

export default function DhoniHero() {
  return (
    <>
      <style>{CSS}</style>

      <section className="dh-hero">
        <video
          className="dh-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/dhon1.jpg"
          aria-hidden="true"
        >
          <source src="/dhoni.mp4" type="video/mp4" />
        </video>
        <div className="dh-hero-scrim" />

        <div className="dh-hero-inner">
          <p className={`dh-eyebrow ${cinzel.className}`}>LEAD College &middot; Dhoni, Palakkad</p>
          <h1 className={`dh-title ${cinzel.className}`}>Dhoni Unfolded</h1>
          <p className={`dh-sub ${playfair.className}`}>Verdant. Tranquil. Inspiring.</p>
        </div>
      </section>

      <section className="dh-content">
        <div className="dh-content-in">
          <h2 className={`dh-h2 ${cinzel.className}`}>Exploring Dhoni</h2>
          <p className={`dh-p ${playfair.className}`}>
            Tucked amidst the emerald folds of the Western Ghats, Dhoni stands as a sanctuary
            where nature reveals its timeless wonders in every breeze, trail, and cascade. Just a
            short journey from Palakkad town, this forested haven celebrates the harmony of lush
            greenery, whispering streams, and the invigorating rhythm of Dhoni Waterfalls, a
            destination that has long captivated trekkers, explorers, and seekers of untouched
            beauty.
          </p>
          <p className={`dh-p ${playfair.className}`}>
            For the community of LEAD College, Dhoni is more than a scenic backdrop. It is a living
            classroom, an inspiration for environmental stewardship, and an emblem of the balance
            between human curiosity and nature&rsquo;s quiet strength.
          </p>
        </div>
      </section>
    </>
  );
}

const CSS = `
.dh-hero{position:relative;min-height:88vh;display:flex;align-items:flex-end;overflow:hidden;background:#04140c;}
.dh-hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.dh-hero-scrim{position:absolute;inset:0;background:linear-gradient(0deg,rgba(4,20,12,.85) 0%,rgba(4,20,12,.25) 45%,rgba(4,20,12,.35) 100%);}
.dh-hero-inner{position:relative;z-index:2;max-width:1400px;width:100%;margin:0 auto;padding:0 clamp(1.15rem,4vw,3rem) clamp(2.4rem,6vh,4.5rem);text-align:left;}
.dh-eyebrow{font-size:clamp(.7rem,.9vw,.8rem);letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.82);font-weight:600;margin:0 0 1rem;
  animation:dhRise .8s cubic-bezier(.16,1,.3,1) .1s both;}
.dh-title{font-size:clamp(2.6rem,7vw,5.5rem);line-height:1;font-weight:700;letter-spacing:-.01em;margin:0;
  background:linear-gradient(90deg,#e8fff3 0%,#7ff0b8 60%,#34d399 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;
  animation:dhRise .9s cubic-bezier(.16,1,.3,1) .24s both;}
.dh-sub{font-size:clamp(1.05rem,1.6vw,1.4rem);letter-spacing:.06em;color:rgba(255,255,255,.9);margin:.9rem 0 0;
  animation:dhRise .9s cubic-bezier(.16,1,.3,1) .4s both;}
@keyframes dhRise{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:none;}}
@media(prefers-reduced-motion:reduce){.dh-eyebrow,.dh-title,.dh-sub{animation:none;}}

.dh-content{background:#fff;padding:clamp(3.4rem,8vw,6.5rem) 0;}
.dh-content-in{max-width:1400px;margin:0 auto;padding:0 clamp(1.15rem,4vw,3rem);text-align:left;}
.dh-h2{font-size:clamp(1.8rem,4vw,3rem);line-height:1.05;font-weight:700;letter-spacing:-.01em;margin:0 0 1.4rem;
  background:linear-gradient(90deg,#065f46 0%,#10b981 55%,#34d399 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;}
.dh-p{font-size:clamp(1rem,1.1vw,1.05rem);line-height:1.85;color:#111;margin:0 0 1.3rem;max-width:76ch;}
.dh-p:last-child{margin-bottom:0;}
`;
