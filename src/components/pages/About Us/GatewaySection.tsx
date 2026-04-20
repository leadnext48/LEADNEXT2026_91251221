"use client";

import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cinzel, playfair } from "@/app/fonts";
import {
  Droplets,
  Eye,
  Home,
  Landmark,
  MapPin,
  Mountain,
  Shield,
  TreePine,
  Leaf,
  Aperture,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   THEME TOKENS
═══════════════════════════════════════════════════════ */
const THEME = {
  bg: "#ffffff",
  text: "#0f1115",
  muted: "#6b7280",
  mutedBg: "rgba(6,95,70,0.05)",
  mutedBorder: "rgba(6,95,70,0.12)",
  gradStart: "#065f46",
  gradMid: "#10b981",
  gradEnd: "#34d399",
  shadow: "0 10px 30px rgba(6,95,70,0.10)",
} as const;

const GRADIENT_90 =
  "linear-gradient(90deg, var(--gradient-start, #065f46) 70%, var(--gradient-mid, #10b981) 90%, var(--gradient-end, #10b981) 100%)";

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
type LucideIcon = React.FC<{ size?: number; color?: string; strokeWidth?: number }>;

interface PlaceItem  { icon: LucideIcon; label: string; href: string }
interface DescCardProps { visible: boolean; delay: number; title: string; text: string; icon?: LucideIcon }
interface PlaceCardProps { icon: LucideIcon; label: string; href: string; index: number; visible: boolean }

/* ═══════════════════════════════════════════════════════
   STATIC DATA
   Link sources (all verified live):
   • dtpcpalakkad.com  — Official District Tourism Promotion Council, Govt. of Kerala
   • keralatourism.org — Official Kerala Tourism, Govt. of Kerala
   • parambikulam.org  — Official Parambikulam Tiger Reserve
   • silentvalley.gov.in — Official Silent Valley National Park (.gov.in)
   • wikipedia.org     — Kollengode Palace & Kalpathy (no government page exists)
═══════════════════════════════════════════════════════ */
const PLACES: readonly PlaceItem[] = [
  {
    icon: Droplets,
    label: "Dhoni Waterfalls & Hills",
    href: "https://www.dtpcpalakkad.com/destination/dhoni-waterfall",
  },
  {
    icon: Landmark,
    label: "Palakkad Fort (Tipu Sultan Fort)",
    href: "https://www.keralatourism.org/destination/tipus-fort-palakkad/130/",
  },
  {
    icon: Droplets,
    label: "Malampuzha Dam & Gardens",
    href: "https://www.keralatourism.org/destination/malampuzha-dam-garden-palakkad/124/",
  },
  {
    icon: TreePine,
    label: "Silent Valley National Park",
    href: "http://silentvalley.gov.in/",
  },
  {
    icon: Home,
    label: "Kollengode Palace",
    href: "https://en.wikipedia.org/wiki/Kollengode_Palace",
  },
  {
    icon: Shield,
    label: "Parambikulam Tiger Reserve",
    href: "https://parambikulam.org/",
  },
  {
    icon: Mountain,
    label: "Nelliyampathy Hills",
    href: "https://www.keralatourism.org/destination/nelliyampathy-hills-palakkad/152/",
  },
  {
    icon: Eye,
    label: "Kava View Point",
    href: "https://www.dtpcpalakkad.com/destination/kava-viewpoint",
  },
  {
    icon: Droplets,
    label: "Meenvallam Waterfalls",
    href: "https://www.dtpcpalakkad.com/destination/meenvallam-waterfall",
  },
  {
    icon: MapPin,
    label: "Kalpathy Heritage Village",
    href: "https://en.wikipedia.org/wiki/Kalpathy",
  },
] as const;

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useInView(threshold = 0.15): [React.RefCallback<HTMLDivElement>, boolean] {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback<React.RefCallback<HTMLDivElement>>((node) => {
    if (observerRef.current) { observerRef.current.disconnect(); observerRef.current = null; }
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => { setVisible(entries[0].isIntersecting); },
      { threshold }
    );
    obs.observe(node);
    observerRef.current = obs;
  }, [threshold]);

  useEffect(() => () => observerRef.current?.disconnect(), []);
  return [ref, visible];
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, [breakpoint]);
  return isMobile;
}

/* ═══════════════════════════════════════════════════════
   SHARED STYLES
═══════════════════════════════════════════════════════ */
const GRAD_TEXT: CSSProperties = {
  background: GRADIENT_90,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.05))",
};

const SERIF = `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`;

/* ═══════════════════════════════════════════════════════
   IMAGE PANEL
═══════════════════════════════════════════════════════ */
function ImageComposition({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: 420,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(32px)",
      transition: "opacity 0.9s 0.2s cubic-bezier(.22,1,.36,1), transform 0.9s 0.2s cubic-bezier(.22,1,.36,1)",
    }}>
      {/* Decorative frame */}
      <div style={{
        position: "absolute",
        top: -16, right: -16,
        width: "65%", height: "65%",
        border: "2px solid rgba(6,95,70,0.18)",
        borderRadius: 4,
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Main tall image */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "72%",
        marginLeft: "auto",
        overflow: "hidden",
        borderRadius: 4,
        boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
      }}>
        <img
          src="/dhon1.jpg"
          alt="Lush green forest in Kerala Western Ghats"
          style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(6,95,70,0.04) 0%, rgba(6,95,70,0.18) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Accent square image */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0,
        width: "46%",
        overflow: "hidden",
        borderRadius: 4,
        border: "4px solid #fff",
        boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s 0.5s cubic-bezier(.22,1,.36,1), transform 0.7s 0.5s cubic-bezier(.22,1,.36,1)",
      }}>
        <img
          src="/dhon2.jpg"
          alt="Palakkad hills"
          style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DESC CARD
═══════════════════════════════════════════════════════ */
const DescCard = React.memo<DescCardProps>(function DescCard({ visible, delay, title, text, icon: Icon }) {
  return (
    <div style={{
      position: "relative",
      background: "#fff",
      border: `1px solid ${THEME.mutedBorder}`,
      borderTop: "3px solid #065f46",
      borderRadius: 4,
      padding: "clamp(20px, 3vw, 32px)",
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(6,95,70,0.07)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.75s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.75s ${delay}s cubic-bezier(.22,1,.36,1)`,
    }}>
      <span style={{
        fontFamily: cinzel.style.fontFamily,
        fontSize: "5rem", fontWeight: 900,
        color: "rgba(6,95,70,0.05)",
        position: "absolute", top: "0.5rem", right: "1rem",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.04em",
      }}>{delay === 0 ? "01" : "02"}</span>

      <div style={{
        width: 44, height: 44,
        borderRadius: "50%",
        background: GRADIENT_90,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1.2rem",
        boxShadow: "0 8px 20px rgba(6,95,70,0.25)",
        transform: visible ? "scale(1)" : "scale(0.9)",
        transition: `transform 0.6s ${delay + 0.08}s cubic-bezier(.22,1,.36,1)`,
      }}>
        {Icon ? <Icon size={18} color="#fff" strokeWidth={2} /> : null}
      </div>

      <h4 style={{
        fontFamily: cinzel.style.fontFamily,
        fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
        fontWeight: 600,
        letterSpacing: "0.03em",
        margin: "0 0 0.75rem",
        ...GRAD_TEXT,
      }}>{title}</h4>

      <p style={{
        fontFamily: playfair.style.fontFamily,
        fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
        lineHeight: 1.9,
        color: "#555",
        margin: 0,
      }}>{text}</p>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════
   PLACE CARD — clickable <a>, verified public link
═══════════════════════════════════════════════════════ */
const PlaceCard = React.memo<PlaceCardProps>(function PlaceCard({ icon: Icon, label, href, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
        background: hovered ? "rgba(6,95,70,0.04)" : "#fff",
        border: `1px solid ${hovered ? "rgba(6,95,70,0.22)" : THEME.mutedBorder}`,
        borderRadius: 4,
        padding: "12px 16px",
        cursor: "pointer",
        userSelect: "none",
        boxShadow: hovered ? THEME.shadow : "none",
        transform: visible
          ? hovered ? "translateY(-3px)" : "translateY(0)"
          : "translateY(22px)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.55s ${index * 0.06}s cubic-bezier(.22,1,.36,1),
                     transform 0.55s ${index * 0.06}s cubic-bezier(.22,1,.36,1),
                     box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease`,
      }}
    >
      <div style={{
        width: 34, height: 34,
        borderRadius: "50%",
        background: GRADIENT_90,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        opacity: hovered ? 1 : 0.7,
        transition: "opacity 0.3s ease",
        boxShadow: hovered ? "0 4px 14px rgba(6,95,70,0.25)" : "none",
      }}>
        <Icon size={15} color="#fff" strokeWidth={2} />
      </div>

      <span style={{
        fontFamily: playfair.style.fontFamily,
        fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
        lineHeight: 1.9,
        color: THEME.text,
      }}>{label}</span>

      <span style={{
        marginLeft: "auto",
        fontSize: "0.75rem",
        color: "#065f46",
        opacity: hovered ? 0.6 : 0,
        transition: "opacity 0.25s ease",
        flexShrink: 0,
      }}>↗</span>
    </a>
  );
});

/* ═══════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════ */
export default function GatewaySection() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [heroRef,   heroVisible]   = useInView(0.1);
  const [descRef,   descVisible]   = useInView(0.1);
  const [placesRef, placesVisible] = useInView(0.1);
  const isMobile = useIsMobile(768);

  return (
    <section style={{
      background: THEME.bg,
      color: THEME.text,
      fontFamily: `${playfair.style.fontFamily}, ${SERIF}`,
      overflowX: "clip",
    }}>

      {/* ══ HERO ══ */}
      <div
        ref={heroRef}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "center",
        }}
      >
        <div ref={headerRef}>
          <p style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#065f46",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1)",
          }}>
            <span style={{
              display: "inline-block", width: 28, height: 1,
              background: "#065f46", opacity: 0.5, flexShrink: 0,
            }} />
            Discover
          </p>

          <h2 style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: "0.02em",
            margin: "0 0 1.25rem",
            ...GRAD_TEXT,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.8s 0.1s cubic-bezier(.22,1,.36,1), transform 0.8s 0.1s cubic-bezier(.22,1,.36,1)",
          }}>
            Gateway to<br />Kerala
          </h2>

          <div style={{
            width: 48, height: 3, borderRadius: 2,
            background: GRADIENT_90,
            marginBottom: "1.5rem",
            opacity: headerVisible ? 0.8 : 0,
            transform: headerVisible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "opacity 0.6s 0.3s ease, transform 0.6s 0.3s cubic-bezier(.22,1,.36,1)",
          }} />

          <p style={{
            fontFamily: playfair.style.fontFamily,
            fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
            lineHeight: 1.9,
            color: "#555",
            maxWidth: "52ch",
            margin: 0,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.8s 0.25s cubic-bezier(.22,1,.36,1), transform 0.8s 0.25s cubic-bezier(.22,1,.36,1)",
          }}>
            Nestled in the foothills of the Western Ghats, LEAD College sits
            in Dhoni — a region of breathtaking natural beauty and deep
            cultural heritage. Palakkad, the historic gateway to Kerala,
            surrounds the campus with heritage, ecology, and legacy.
          </p>

          <div style={{
            marginTop: "2rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s 0.4s cubic-bezier(.22,1,.36,1), transform 0.7s 0.4s cubic-bezier(.22,1,.36,1)",
          }}>
            {[
              { num: "39km", label: "From Palakkad city" },
              { num: "2010", label: "Established" },
              { num: "700+", label: "Students" },
            ].map((s, i) => (
              <div key={s.label} style={{
                paddingLeft: i === 0 ? 0 : "2rem",
                borderLeft: i === 0 ? "none" : "1px solid rgba(6,95,70,0.15)",
              }}>
                <div style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "clamp(1.2rem, 1.8vw, 1.8rem)",
                  color: "#065f46",
                  lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: playfair.style.fontFamily,
                  fontStyle: "italic",
                  fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
                  color: "#888",
                  marginTop: "0.3rem",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <ImageComposition visible={heroVisible} />
      </div>

      {/* ── thin rule ── */}
      <div style={{
        height: 1,
        margin: "0 clamp(1.5rem, 5vw, 4rem)",
        background: "linear-gradient(90deg, transparent, rgba(6,95,70,0.15) 30%, rgba(6,95,70,0.15) 70%, transparent)",
      }} />

      {/* ══ DESCRIPTION CARDS ══ */}
      <div
        ref={descRef}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "clamp(1.25rem, 3vw, 2rem)",
        }}
      >
        <DescCard
          visible={descVisible} delay={0} icon={Leaf}
          title="A Campus Among Nature"
          text="LEAD College of Management sits in Dhoni — a tranquil pocket of the Western Ghats where lush greenery, clean air, and whispering streams shape an environment unlike any other campus in Kerala. Close enough to Palakkad town for convenience, yet far enough to preserve the calm that turns learning into something deeper."
        />
        <DescCard
          visible={descVisible} delay={0.15} icon={Aperture}
          title="Palakkad — The Gateway"
          text="Known as Kerala's historic gateway, Palakkad is where the Western Ghats open into fertile plains. Cultural art forms, heritage architecture, and a strong tradition of learning define this district — a region that has shaped generations of thinkers and professionals, now home to LEAD College's next chapter."
        />
      </div>

      {/* ══ PLACES TO VISIT ══ */}
      <div
        ref={placesRef}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)",
        }}
      >
        <div style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
          <p style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#065f46",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            opacity: placesVisible ? 1 : 0,
            transform: placesVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1)",
          }}>
            <span style={{
              display: "inline-block", width: 28, height: 1,
              background: "#065f46", opacity: 0.5, flexShrink: 0,
            }} />
            Around Palakkad
          </p>
          <h3 style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
            fontWeight: 700,
            letterSpacing: "0.02em",
            margin: 0,
            ...GRAD_TEXT,
            opacity: placesVisible ? 1 : 0,
            transform: placesVisible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.7s 0.08s cubic-bezier(.22,1,.36,1), transform 0.7s 0.08s cubic-bezier(.22,1,.36,1)",
          }}>Places to Visit</h3>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 340px",
          gap: "clamp(2rem, 4vw, 4rem)",
          alignItems: "start",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: "clamp(10px, 1.5vw, 16px)",
          }}>
            {PLACES.map((place, i) => (
              <PlaceCard
                key={place.label}
                icon={place.icon}
                label={place.label}
                href={place.href}
                index={i}
                visible={placesVisible}
              />
            ))}
          </div>

          {!isMobile && (
            <div style={{
              position: "sticky",
              top: "2rem",
              overflow: "hidden",
              borderRadius: 4,
              boxShadow: "0 20px 50px rgba(0,0,0,0.14)",
              opacity: placesVisible ? 1 : 0,
              transform: placesVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s 0.3s cubic-bezier(.22,1,.36,1), transform 0.8s 0.3s cubic-bezier(.22,1,.36,1)",
            }}>
              <img
                src="/dhon3.jpg"
                alt="Kerala nature"
                style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                padding: "2rem 1.5rem 1.5rem",
                background: "linear-gradient(0deg, rgba(6,95,70,0.85) 0%, transparent 100%)",
              }}>
                <p style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "0.58rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                  margin: "0 0 0.3rem",
                }}>Western Ghats</p>
                <p style={{
                  fontFamily: playfair.style.fontFamily,
                  fontSize: "1rem",
                  color: "#fff",
                  margin: 0,
                  fontStyle: "italic",
                }}>Nature surrounds you</p>
              </div>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}