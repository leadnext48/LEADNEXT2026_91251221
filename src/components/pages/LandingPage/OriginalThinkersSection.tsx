"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import Link from "next/link";
import { cinzel, playfair } from "@/app/fonts";
import { ArrowUpRight } from "lucide-react";

/* ─── Constants ────────────────────────────────────────────────────────── */
const IMAGE_SIZE     = 400;
const CONTENT_WIDTH  = "max-w-[1200px]";
const NAVY           = "#0a2463";

const TOP_IMAGE   = "land1.png";
const LEFT_IMAGE  = "land2.jpg";
const RIGHT_IMAGE = "land3.jpg";

const VISION_LOTTIE_PATH  = "/Businessman looks through the telescope on a rocket.json";
const MISSION_LOTTIE_PATH = "/Super Businessman Delivering Parcel.json";
const CORE_LOTTIE_PATH    = "/Creative Idea.json";

/* ─── Card data ────────────────────────────────────────────────────────── */
type CardItem =
  | { type: "text"; text: string }
  | { type: "bullets"; items: string[] };

interface CardDef {
  id: string;
  lottiePath: string;
  title: string;
  content: CardItem[];
}

const CARDS: CardDef[] = [
  {
    id: "vision",
    lottiePath: VISION_LOTTIE_PATH,
    title: "Our Vision",
    content: [
      {
        type: "text",
        text: "To be a LEADER in management and technology education focusing on developing Leaders and Entrepreneurs.",
      },
    ],
  },
  {
    id: "mission",
    lottiePath: MISSION_LOTTIE_PATH,
    title: "Our Mission",
    content: [
      {
        type: "bullets",
        items: [
          "Contribute to and Enable: The development of individuals to enhance their competencies as Business Leaders and Entrepreneurs.",
          "Create and Deliver: Teaching learning platforms and curricula which embrace innovation and deliver contemporary knowledge and skills.",
          "Engage and Empower: Industry and societal stakeholders through outreach and extension activities.",
          "Innovate and Execute: Region-specific research, industry and society-based solutions.",
        ],
      },
    ],
  },
  {
    id: "core",
    lottiePath: CORE_LOTTIE_PATH,
    title: "Values",
    content: [
      {
        type: "bullets",
        items: [
          "Transparency",
          "Fair Play",
          "Ethics",
          "Sustainability",
        ],
      },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════════ */
export default function OriginalThinkersSection() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef  = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end start"],
  });

  /* Image entrance */
  const topImageY   = useTransform(scrollYProgress, [0.05, 0.28], [-900,  -80]);
  const leftImageX  = useTransform(scrollYProgress, [0.05, 0.28], [-900, -240]);
  const rightImageX = useTransform(scrollYProgress, [0.05, 0.28], [ 900,  240]);

  /* Image group exit */
  const imageGroupRawY = useTransform(scrollYProgress, [0.28, 0.50], [0, -1400]);
  const imageGroupY    = useTransform(imageGroupRawY, y => y + 80);
  const imageOpacity   = useTransform(scrollYProgress, [0.05, 0.22, 0.34, 0.44, 0.56], [0, 1, 1, 0.4, 0]);

  const [titleHeight, setTitleHeight] = useState(280);
  useEffect(() => {
    const measure = () => {
      if (titleRef.current) setTitleHeight(titleRef.current.offsetHeight + 8);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const contentY   = useTransform(scrollYProgress, [0.50, 0.68], [900, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);

  /* Lottie data */
  const [lotties, setLotties] = useState<Record<string, any>>({});
  useEffect(() => {
    Promise.all(
      CARDS.map(c => fetch(c.lottiePath).then(r => r.json()))
    ).then(results => {
      const map: Record<string, any> = {};
      CARDS.forEach((c, i) => { map[c.id] = results[i]; });
      setLotties(map);
    }).catch(console.error);
  }, []);

  return (
    <section className="relative bg-white">
      <style>{`
        /* ── Card hover lift ── */
        .ot-card {
          transition: box-shadow .28s ease, transform .28s ease, border-color .28s ease;
        }
        .ot-card:hover {
          box-shadow: 0 18px 52px rgba(10,36,99,0.12) !important;
          transform: translateY(-4px);
          border-color: rgba(10,36,99,0.22) !important;
        }
        .ot-card:hover .ot-card-accent {
          opacity: 1 !important;
          transform: scaleX(1) !important;
        }

        /* ── Card grid — equal height rows via align-items stretch ── */
        .ot-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.8rem, 1.6vw, 1.4rem);
          align-items: stretch;   /* all cards same height */
        }
        @media (max-width: 900px) {
          .ot-cards-row { grid-template-columns: 1fr; }
        }

        /* ── Lottie container ── */
        .ot-lottie-wrap {
          width: 100%;
          aspect-ratio: 1;
          max-width: 160px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ot-lottie-wrap > div {
          width: 100% !important;
          height: 100% !important;
        }

        /* ── Bullet list inside card ── */
        .ot-bullet-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.62rem;
        }
        .ot-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          line-height: 1.72;
        }
        .ot-bullet-dot {
          flex-shrink: 0;
          margin-top: 0.42em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0a2463;
          opacity: 0.55;
        }
      `}</style>

      {/* 580vh — enough for all animation phases plus card viewing */}
      <div ref={stickyRef} className="relative h-[580vh]">
        <div className="sticky top-0" style={{ minHeight: "100vh" }}>

          {/* ═══ TITLE ═══ */}
          <motion.div
            ref={titleRef}
            style={{ scale: titleScale, transformOrigin: "top center" }}
            className="absolute top-0 left-0 right-0 z-30 bg-white"
          >
            <div className={`mx-auto ${CONTENT_WIDTH}`}>
              <div
                className="flex items-center justify-center gap-3 pb-3"
                style={{ paddingTop: "calc(64px + clamp(1.2rem, 2.5vh, 2rem))" }}
              >
                <span style={{ display: "inline-block", width: 20, height: 1.5, background: NAVY }} />
                <span
                  className={cinzel.className}
                  style={{
                    fontSize: "clamp(7px,0.52vw,9px)",
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: `${NAVY}90`,
                    fontWeight: 600,
                  }}
                >
                  LEAD College of Management
                </span>
                <span style={{ display: "inline-block", width: 20, height: 1.5, background: NAVY }} />
              </div>

              <h2
                className={`${cinzel.className} text-black font-semibold text-center leading-none pb-8`}
                style={{
                  fontSize: "clamp(2.6rem, 6.5vw, 8rem)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Original Thinkers
              </h2>

              <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${NAVY}18,transparent)` }} />
            </div>
          </motion.div>

          {/* ═══ IMAGE GROUP ═══ */}
          <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
            <motion.div
              style={{ y: imageGroupY, opacity: imageOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.img src={TOP_IMAGE}   alt="" style={{ y: topImageY }}   className="absolute rounded-2xl shadow-2xl object-cover" width={IMAGE_SIZE} height={IMAGE_SIZE} />
              <motion.img src={LEFT_IMAGE}  alt="" style={{ x: leftImageX }}  className="absolute rounded-2xl shadow-2xl object-cover" width={IMAGE_SIZE} height={IMAGE_SIZE} />
              <motion.img src={RIGHT_IMAGE} alt="" style={{ x: rightImageX }} className="absolute rounded-2xl shadow-2xl object-cover" width={IMAGE_SIZE} height={IMAGE_SIZE} />
            </motion.div>
          </div>

          {/* ═══ CONTENT PANEL ═══ */}
          <motion.div
            style={{ y: contentY }}
            className="relative bg-white z-20"
          >
            <div
              className={`mx-auto ${CONTENT_WIDTH} px-6 lg:px-10 pb-20`}
              style={{ paddingTop: titleHeight + 24 }}
            >

              {/* ── TOP STRIP ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "clamp(2rem,4vw,4rem)",
                  alignItems: "center",
                  paddingBottom: "clamp(1.6rem,3vh,2.4rem)",
                  marginBottom: "clamp(1.4rem,2.8vh,2.2rem)",
                  borderBottom: `1px solid rgba(10,36,99,0.10)`,
                }}
              >
                <p
                  className={playfair.className}
                  style={{
                    fontSize: "clamp(13px,1vw,15.5px)",
                    lineHeight: 1.88,
                    color: "#555",
                    margin: 0,
                    maxWidth: 680,
                  }}
                >
                  Established in 2010 in Palakkad, Kerala, LEAD College of Management was
                  built on an unwavering belief — that education rooted in courage and
                  conscience could transform lives. From 58 students who refused to leave
                  during adversity, to a thriving autonomous institution, every milestone
                  was earned through integrity, perseverance, and a relentless commitment
                  to learners. At LEAD, we don't just teach — we transform.
                </p>

                <Link
                  href="/the-lead-story"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    padding: "0.78rem 1.5rem",
                    background: `linear-gradient(90deg,${NAVY},#1e3a8a)`,
                    borderRadius: 8,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    boxShadow: "0 6px 22px rgba(10,36,99,0.22)",
                    transition: "opacity .2s, transform .2s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = "0.87"; el.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = "1";    el.style.transform = "translateY(0)"; }}
                >
                  <span
                    className={cinzel.className}
                    style={{ fontSize: "clamp(8px,0.62vw,10px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}
                  >
                    Discover Our Story
                  </span>
                  <ArrowUpRight size={12} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                </Link>
              </div>

              {/* ── THREE CARDS ── */}
              <div className="ot-cards-row">
                {CARDS.map(card => (
                  <BigCard
                    key={card.id}
                    anim={lotties[card.id]}
                    title={card.title}
                    content={card.content}
                    lottieScale={card.id === "mission" ? 1.35 : 1}
                    cinzel={cinzel}
                    playfair={playfair}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ── Premium full-height card ─────────────────────────────────────────── */
function BigCard({
  anim,
  title,
  content,
  lottieScale = 1,
  cinzel,
  playfair,
}: {
  anim: any;
  title: string;
  content: CardItem[];
  lottieScale?: number;
  cinzel: { className: string };
  playfair: { className: string };
}) {
  return (
    <div
      className="ot-card"
      style={{
        position: "relative",
        border: "1px solid rgba(10,36,99,0.09)",
        background: "#ffffff",
        borderRadius: 14,
        overflow: "hidden",
        /* Uniform padding on all cards — Mission has the most content so this
           size naturally accommodates it; the grid's align-items:stretch
           stretches Vision and Values to the same height automatically.     */
        padding: "clamp(1.6rem,2.6vw,2.2rem)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(0.9rem,1.8vw,1.3rem)",
        boxShadow: "0 2px 20px rgba(10,36,99,0.06)",
        /* Ensure all cards share the same min-height derived from the tallest */
        height: "100%",
      }}
    >
      {/* Top accent bar — slides in on hover */}
      <div
        className="ot-card-accent"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg,${NAVY},#1e3a8a)`,
          opacity: 0,
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "opacity .32s ease, transform .32s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Ghost letter watermark */}
      <span
        aria-hidden="true"
        className={cinzel.className}
        style={{
          position: "absolute",
          bottom: "-0.1em", right: "0.2em",
          fontSize: "clamp(5rem,8vw,9rem)",
          fontWeight: 900,
          lineHeight: 1,
          color: NAVY,
          opacity: 0.028,
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {title[0]}
      </span>

      {/* Lottie */}
      <div className="ot-lottie-wrap">
        {anim
          ? <Lottie
              animationData={anim}
              loop
              autoplay
              style={{
                width: "100%",
                height: "100%",
                transform: lottieScale !== 1 ? `scale(${lottieScale})` : undefined,
                transformOrigin: "center center",
              }}
            />
          : <div style={{ width: "100%", height: "100%", background: "rgba(10,36,99,0.04)", borderRadius: 8 }} />
        }
      </div>

      {/* Gradient hairline */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg,rgba(10,36,99,0.18) 0%,transparent 100%)",
        flexShrink: 0,
      }} />

      {/* Title */}
      <p
        className={cinzel.className}
        style={{
          fontSize: "clamp(12px,0.92vw,15px)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: NAVY,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </p>

      {/* Content — plain text or bullet list */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        {content.map((block, bi) =>
          block.type === "text" ? (
            <p
              key={bi}
              className={playfair.className}
              style={{
                fontSize: "clamp(12.5px,0.92vw,15px)",
                color: "#4a5568",
                margin: 0,
                lineHeight: 1.78,
              }}
            >
              {block.text}
            </p>
          ) : (
            <ul key={bi} className="ot-bullet-list">
              {block.items.map((item, ii) => (
                <li key={ii} className="ot-bullet-item">
                  <span className="ot-bullet-dot" />
                  <span
                    className={playfair.className}
                    style={{
                      fontSize: "clamp(12.5px,0.92vw,15px)",
                      color: "#4a5568",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
}