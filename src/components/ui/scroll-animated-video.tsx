'use client'
import React, { CSSProperties, JSX, ReactNode, useEffect, useMemo, useRef } from "react";
import { cinzel, playfair } from "@/app/fonts";

/* =========================
   Types
========================= */

type Source = { mp4?: string; webm?: string; ogg?: string };
type VideoLike = string | Source;

type Eases = {
  container?: string;
  overlay?: string;
  text?: string;
};

export type HeroScrollVideoProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  credits?: ReactNode;

  media?: VideoLike;
  poster?: string;
  mediaType?: "video" | "image";
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;

  overlay?: {
    caption?: ReactNode;
    heading?: ReactNode;
    paragraphs?: ReactNode[];
    extra?: ReactNode;
  };

  initialBoxSize?: number;
  targetSize?: { widthVw: number; heightVh: number; borderRadius?: number } | "fullscreen";
  scrollHeightVh?: number;
  showHeroExitAnimation?: boolean;
  showHeroEntranceAnimation?: boolean;
  sticky?: boolean;
  overlayBlur?: number;
  overlayRevealDelay?: number;
  eases?: Eases;

  smoothScroll?: boolean;
  lenisOptions?: Record<string, unknown>;

  className?: string;
  style?: CSSProperties;
};

/* =========================
   Defaults
========================= */

const DEFAULTS = {
  initialBoxSize: 360,
  targetSize: "fullscreen" as const,
  scrollHeightVh: 280,
  overlayBlur: 10,
  overlayRevealDelay: 0.35,
  eases: {
    container: "expo.out",
    overlay: "expo.out",
    text: "power3.inOut",
  } as Eases,
};

/* =========================
   Helpers
========================= */

function isSourceObject(m?: VideoLike): m is Source {
  return !!m && typeof m !== "string";
}

/* =========================
   Component
========================= */

export const HeroScrollVideo: React.FC<HeroScrollVideoProps> = ({
  title = "Dhoni Unfolded",
  subtitle = "Verdant. Tranquil. Inspiring.",
  meta,
  credits = (
    <>
      <p>In celebration of</p>
      <p>Dhoni's pristine wilderness</p>
    </>
  ),

  media = "/dhoni.mp4",
  poster,
  mediaType = "video",
  muted = true,
  loop = true,
  playsInline = true,
  autoPlay = true,

  overlay = {
    caption: undefined,
    heading: "Exploring Dhoni",
    paragraphs: [
      `Tucked amidst the emerald folds of the Western Ghats, Dhoni stands as a sanctuary where nature reveals its timeless wonders in every breeze, trail, and cascade. Just a short journey from Palakkad town, this forested haven celebrates the harmony of lush greenery, whispering streams, and the invigorating rhythm of Dhoni Waterfalls — a destination that has long captivated trekkers, explorers, and seekers of untouched beauty.`,
      `For the community of LEAD College, Dhoni is more than a scenic backdrop — it is a living classroom, an inspiration for environmental stewardship, and an emblem of the balance between human curiosity and nature's quiet strength.`,
    ],
    extra: null,
  },

  initialBoxSize = DEFAULTS.initialBoxSize,
  targetSize = DEFAULTS.targetSize,
  scrollHeightVh = DEFAULTS.scrollHeightVh,
  showHeroExitAnimation = true,
  showHeroEntranceAnimation = true,
  sticky = true,
  overlayBlur = DEFAULTS.overlayBlur,
  overlayRevealDelay = DEFAULTS.overlayRevealDelay,
  eases = DEFAULTS.eases,

  smoothScroll = true,
  lenisOptions,

  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayCaptionRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);

  const isClient = typeof window !== "undefined";

  const cssVars: CSSProperties = useMemo(
    () => ({
      ["--initial-size" as any]: `${initialBoxSize}px`,
      ["--overlay-blur" as any]: `${overlayBlur}px`,
    }),
    [initialBoxSize, overlayBlur]
  );

  // ---------------------------------------------------------------------------
  // Scroll + GSAP wiring
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isClient) return;

    let gsap: any;
    let ScrollTrigger: any;
    let CustomEase: any;
    let LenisCtor: any;
    let lenis: any;

    let heroEntranceTl: any;
    let heroExitTl: any;
    let mainTl: any;
    let overlayDarkenEl: HTMLDivElement | null = null;

    let rafCb: ((t: number) => void) | null = null;

    let cancelled = false;

    (async () => {
      const gsapPkg = await import("gsap");
      gsap = gsapPkg.gsap || gsapPkg.default || gsapPkg;

      const ScrollTriggerPkg =
        (await import("gsap/ScrollTrigger").catch(() =>
          import("gsap/dist/ScrollTrigger")
        )) || {};
      ScrollTrigger =
        ScrollTriggerPkg.default ||
        (ScrollTriggerPkg as any).ScrollTrigger ||
        ScrollTriggerPkg;

      const CustomEasePkg =
        (await import("gsap/CustomEase").catch(() =>
          import("gsap/dist/CustomEase")
        )) || {};
      CustomEase =
        CustomEasePkg.default ||
        (CustomEasePkg as any).CustomEase ||
        CustomEasePkg;

      gsap.registerPlugin(ScrollTrigger, CustomEase);

      if (cancelled) return;

      // Lenis smooth scroll
      if (smoothScroll) {
        const try1 = await import("@studio-freight/lenis").catch(() => null);
        const try2 = try1 || (await import("lenis").catch(() => null));
        LenisCtor = try2?.default || (try2 as any)?.Lenis;
        if (LenisCtor) {
          lenis = new LenisCtor({
            duration: 0.8,
            smoothWheel: true,
            gestureOrientation: "vertical",
            ...lenisOptions,
          });
          rafCb = (time: number) => lenis?.raf(time * 1000);
          gsap.ticker.add(rafCb);
          gsap.ticker.lagSmoothing(0);
          lenis?.on?.("scroll", ScrollTrigger.update);
        }
      }

      const containerEase = eases.container ?? "expo.out";
      const overlayEase = eases.overlay ?? "expo.out";
      const textEase = eases.text ?? "power3.inOut";

      const container = containerRef.current!;
      const overlayEl = overlayRef.current!;
      const overlayCaption = overlayCaptionRef.current!;
      const overlayContent = overlayContentRef.current!;
      const headline = headlineRef.current!;

      // ---------------------------------------------------------------------------
      // Darkening overlay (injected element)
      // ---------------------------------------------------------------------------
      if (container) {
        overlayDarkenEl = document.createElement("div");
        overlayDarkenEl.setAttribute("data-auto-darken", "true");
        overlayDarkenEl.style.position = "absolute";
        overlayDarkenEl.style.inset = "0";
        overlayDarkenEl.style.background = "rgba(0,0,0,0)";
        overlayDarkenEl.style.pointerEvents = "none";
        overlayDarkenEl.style.zIndex = "1";
        container.appendChild(overlayDarkenEl);
      }

      // ---------------------------------------------------------------------------
      // Headline ENTRANCE animation
      // The hidden initial state is applied via inline styles on each
      // .hsv-headline > * child (see headlineChildInitialStyle in JSX).
      // GSAP only animates TO visible — no flash before GSAP loads.
      // ---------------------------------------------------------------------------
      if (showHeroEntranceAnimation && headline) {
        const headlineElements = headline.querySelectorAll<HTMLElement>(".hsv-headline > *");

        heroEntranceTl = gsap.timeline({ delay: 0.3 });

        headlineElements.forEach((el, i) => {
          heroEntranceTl.to(
            el,
            {
              rotationX: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              transformOrigin: "center top",
              ease: textEase,
              duration: 0.8,
            },
            i * 0.08
          );
        });
      }

      // ---------------------------------------------------------------------------
      // Headline EXIT animation (scroll-triggered)
      // ---------------------------------------------------------------------------
      if (showHeroExitAnimation && headline) {
        heroExitTl = gsap.timeline({
          scrollTrigger: {
            trigger: headline,
            start: "top top",
            end: "top+=420 top",
            scrub: 1.1,
          },
        });

        headline
          .querySelectorAll<HTMLElement>(".hsv-headline > *")
          .forEach((el, i) => {
            heroExitTl.to(
              el,
              {
                rotationX: 80,
                y: -36,
                scale: 0.86,
                opacity: 0,
                filter: "blur(4px)",
                transformOrigin: "center top",
                ease: textEase,
              },
              i * 0.08
            );
          });
      }

      // ---------------------------------------------------------------------------
      // Main sticky expansion timeline
      //
      // gsap.set() is REQUIRED here for scroll-driven (scrubbed) elements.
      // It registers each element into GSAP's rendering pipeline so that the
      // scrubbed .to() calls interpolate smoothly every frame without fighting
      // React's inline styles or reading computed styles mid-scroll.
      // ---------------------------------------------------------------------------
      const triggerEl = rootRef.current?.querySelector(
        "[data-sticky-scroll]"
      ) as HTMLElement;

      if (!triggerEl || !container || !overlayEl) return;

      // Set initial states via GSAP so the scrub timeline owns these properties
      gsap.set(container, {
        width: initialBoxSize,
        height: initialBoxSize,
        borderRadius: 20,
        filter: "none",
        clipPath: "inset(0 0 0 0)",
      });
      gsap.set(overlayEl, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(overlayContent, {
        filter: `blur(${overlayBlur}px)`,
        scale: 1.05,
      });
      gsap.set([overlayContent, overlayCaption], { y: 30 });

      mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
        },
      });

      // Target size
      const target = (() => {
        if (targetSize === "fullscreen") {
          return { width: "92vw", height: "92vh", borderRadius: 0 };
        }
        return {
          width: `${targetSize.widthVw ?? 92}vw`,
          height: `${targetSize.heightVh ?? 92}vh`,
          borderRadius: targetSize.borderRadius ?? 0,
        };
      })();

      // Animate the container to expand
      mainTl
        .to(
          container,
          {
            width: target.width,
            height: target.height,
            borderRadius: target.borderRadius,
            ease: containerEase,
          },
          0
        )
        // Darken as it expands
        .to(
          overlayDarkenEl,
          {
            backgroundColor: "rgba(0,0,0,0.4)",
            ease: "power2.out",
          },
          0
        )
        // Reveal overlay panel
        .to(
          overlayEl,
          {
            clipPath: "inset(0% 0 0 0)",
            backdropFilter: `blur(${overlayBlur}px)`,
            ease: overlayEase,
          },
          overlayRevealDelay
        )
        // Caption slides in
        .to(overlayCaption, { y: 0, ease: overlayEase }, overlayRevealDelay + 0.05)
        // Content slides in and unblurs
        .to(
          overlayContent,
          {
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            ease: overlayEase,
          },
          overlayRevealDelay + 0.05
        );

      // Try to play video
      const videoEl = container.querySelector("video") as HTMLVideoElement | null;
      if (videoEl) {
        const tryPlay = () => videoEl.play().catch(() => {});
        tryPlay();
        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top top",
          onEnter: tryPlay,
        });
      }
    })();

    return () => {
      cancelled = true;
      try { heroEntranceTl?.kill?.(); } catch {}
      try { heroExitTl?.kill?.(); } catch {}
      try { mainTl?.kill?.(); } catch {}
      try {
        if (ScrollTrigger?.getAll && rootRef.current) {
          ScrollTrigger.getAll().forEach((t: any) =>
            rootRef.current!.contains(t.trigger) && t.kill(true)
          );
        }
      } catch {}
      try {
        if (overlayDarkenEl?.parentElement) {
          overlayDarkenEl.parentElement.removeChild(overlayDarkenEl);
        }
      } catch {}
      try {
        if (rafCb && gsap?.ticker) {
          gsap.ticker.remove(rafCb);
          gsap.ticker.lagSmoothing(1000, 16);
        }
      } catch {}
      try {
        lenis?.off?.("scroll", ScrollTrigger?.update);
        lenis?.destroy?.();
      } catch {}
    };
  }, [
    isClient,
    initialBoxSize,
    targetSize,
    scrollHeightVh,
    overlayBlur,
    overlayRevealDelay,
    eases.container,
    eases.overlay,
    eases.text,
    showHeroExitAnimation,
    showHeroEntranceAnimation,
    sticky,
    smoothScroll,
    JSON.stringify(lenisOptions),
  ]);

  // ---------------------------------------------------------------------------
  // Media rendering
  // ---------------------------------------------------------------------------
  const renderMedia = () => {
    if (mediaType === "image") {
      const src = typeof media === "string" ? media : media?.mp4 || "";
      return (
        <img
          src={src}
          alt=""
          loading="eager"
          fetchPriority="high"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    }

    const sources: JSX.Element[] = [];
    if (typeof media === "string") {
      sources.push(<source key="mp4" src={media} type="video/mp4" />);
    } else if (isSourceObject(media)) {
      if (media.webm) sources.push(<source key="webm" src={media.webm} type="video/webm" />);
      if (media.mp4)  sources.push(<source key="mp4"  src={media.mp4}  type="video/mp4" />);
      if (media.ogg)  sources.push(<source key="ogg"  src={media.ogg}  type="video/ogg" />);
    }

    return (
      <video
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        autoPlay={autoPlay}
        preload="auto"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        {sources}
      </video>
    );
  };

  // ---------------------------------------------------------------------------
  // Headline children: hidden initial state applied as inline styles.
  // This prevents the flash-before-GSAP issue (the original bug) WITHOUT
  // interfering with the scroll timeline, because headline elements are
  // NOT scrub-driven — they only play once on entrance.
  // ---------------------------------------------------------------------------
  const headlineChildInitialStyle: CSSProperties = {
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
    transformOrigin: "center top",
    opacity: 0,
    transform: "rotateX(80deg) translateY(-36px) scale(0.86)",
    filter: "blur(4px)",
  };

  // ---------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------
  return (
    <div
      ref={rootRef}
      className={["hsv-root", className].filter(Boolean).join(" ")}
      style={{ ...cssVars, ...style }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Headline / hero area                                                */}
      {/* Each child gets headlineChildInitialStyle so it's hidden on first   */}
      {/* paint. GSAP entrance animates them visible. No flash.               */}
      {/* ------------------------------------------------------------------ */}
      <div className="hsv-container" ref={headlineRef}>
        <div className="hsv-headline">
          <h1 className="hsv-title" style={headlineChildInitialStyle}>
            {title}
          </h1>
          {subtitle ? (
            <h2 className="hsv-subtitle" style={headlineChildInitialStyle}>
              {subtitle}
            </h2>
          ) : null}
          {meta ? (
            <div className="hsv-meta" style={headlineChildInitialStyle}>
              {meta}
            </div>
          ) : null}
          {credits ? (
            <div className="hsv-credits" style={headlineChildInitialStyle}>
              {credits}
            </div>
          ) : null}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Sticky scroll section                                               */}
      {/* NO inline styles on container / overlay / overlayContent here.      */}
      {/* Their initial states are owned by gsap.set() inside the effect,     */}
      {/* so the scrubbed timeline interpolates them smoothly every frame.    */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="hsv-scroll"
        data-sticky-scroll
        style={{ height: `${Math.max(150, scrollHeightVh)}vh` }}
      >
        <div className={`hsv-sticky ${sticky ? "is-sticky" : ""}`}>
          <div className="hsv-media" ref={containerRef}>
            {renderMedia()}

            <div className="hsv-overlay" ref={overlayRef}>
              {overlay?.caption ? (
                <div className="hsv-caption" ref={overlayCaptionRef}>
                  {overlay.caption}
                </div>
              ) : null}
              <div className="hsv-overlay-content" ref={overlayContentRef}>
                {overlay?.heading ? <h3>{overlay.heading}</h3> : null}
                {overlay?.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {overlay?.extra}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Scoped styles – LIGHT THEME ONLY                                    */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        .hsv-root {
          --bg: #ffffff;
          --text: #0f1115;
          --muted: #6b7280;
          --muted-bg: rgba(15,17,21,0.06);
          --muted-border: rgba(15,17,21,0.12);
          --overlay-bg: rgba(10,10,14,0.42);
          --overlay-text: #ffffff;
          --gradient-start: #065f46;
          --gradient-mid: #10b981;
          --gradient-end: #34d399;
          --shadow: 0 10px 30px rgba(0,0,0,0.08);

          background: var(--bg);
          color: var(--text);
          font-family: ${playfair.style.fontFamily}, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          overflow-x: clip;
        }

        .hsv-container {
          height: 100vh;
          display: grid;
          place-items: center;
          padding: clamp(16px, 3vw, 40px);
          perspective: 900px;
        }

        .hsv-headline {
          text-align: center;
          transform-style: preserve-3d;
          max-width: min(100%, 1100px);
        }

        .hsv-title {
          margin: 0 0 .6rem 0;
          font-size: clamp(40px, 8vw, 96px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.02em;
          text-wrap: balance;
          font-family: ${cinzel.style.fontFamily}, ui-serif, Georgia, serif;
          background: linear-gradient(90deg, var(--gradient-start) 70%, var(--gradient-mid) 90%, var(--gradient-end) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 2px 0 rgba(0,0,0,0.05));
        }
        .hsv-subtitle {
          margin: 0 0 1.25rem 0;
          font-size: clamp(18px, 3.5vw, 28px);
          font-weight: 500;
          letter-spacing: 0.06em;
          font-family: ${playfair.style.fontFamily}, ui-serif, Georgia, serif;
          color: var(--muted);
        }
        .hsv-credits {
          margin-top: 1.1rem;
          font-family: ${playfair.style.fontFamily}, ui-serif, Georgia, serif;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          color: var(--muted);
          font-style: italic;
        }

        .hsv-scroll { position: relative; }
        .hsv-sticky.is-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          place-items: center;
        }

        .hsv-media {
          position: relative;
          width: var(--initial-size);
          height: var(--initial-size);
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          display: grid;
          place-items: center;
          box-shadow: var(--shadow);
        }

        .hsv-overlay {
          position: absolute;
          inset: 0;
          background: var(--overlay-bg);
          color: var(--overlay-text);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(60px, 8vw, 100px) clamp(16px, 4vw, 40px) clamp(16px, 4vw, 40px);
          clip-path: inset(100% 0 0 0);
          backdrop-filter: blur(0px);
          z-index: 2;
        }

        .hsv-caption {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          position: absolute;
          top: clamp(8px, 3vw, 24px);
          left: 0;
          width: 100%;
          text-align: center;
          opacity: 0.95;
        }

        .hsv-overlay-content {
          margin-top: 0;
          max-width: 75ch;
          display: grid;
          gap: 1.2rem;
        }
        .hsv-overlay-content h3 {
          font-size: clamp(28px, 5vw, 52px);
          line-height: 1.15;
          margin: 0;
          font-weight: 600;
          letter-spacing: -0.01em;
          font-family: ${cinzel.style.fontFamily}, ui-serif, Georgia, serif;
          background: linear-gradient(90deg, var(--gradient-start) 0%, var(--gradient-mid) 50%, var(--gradient-end) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-wrap: balance;
          position: relative;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .hsv-overlay-content h3::after {
          content: "";
          display: block;
          width: 72px;
          height: 3px;
          border-radius: 999px;
          margin: 14px auto 0 auto;
          background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
          opacity: 0.9;
        }
        .hsv-overlay-content p {
          font-size: clamp(15px, 2vw, 18px);
          line-height: 1.8;
          margin: 0;
          font-family: ${playfair.style.fontFamily}, ui-serif, Georgia, serif;
          color: #f3f4f6;
          opacity: 0.96;
          text-align: justify;
          text-indent: 2em;
        }

        @media (max-width: 900px) {
          .hsv-overlay-content {
            max-width: 90%;
            padding: 0 1rem;
          }
          .hsv-overlay-content p {
            text-align: left;
            text-indent: 0;
          }
          .hsv-overlay {
            padding: clamp(50px, 6vw, 80px) clamp(12px, 3vw, 24px) clamp(12px, 3vw, 24px);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroScrollVideo;