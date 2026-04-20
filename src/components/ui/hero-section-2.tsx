"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { playfair, cinzel } from "@/app/fonts";
import { useEffect, useRef } from "react";

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  heading: React.ReactNode;
  subtitle: string;
  backgroundImage: string;
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className, heading, subtitle, backgroundImage, ...props }, ref) => {
    const sectionRef  = useRef<HTMLElement>(null);
    const headingRef  = useRef<HTMLHeadingElement>(null);
    const dividerRef  = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const statsRef    = useRef<HTMLDivElement>(null);
    const mobileImageRef  = useRef<HTMLDivElement>(null);
    const desktopImageRef = useRef<HTMLDivElement>(null);

    // ── GSAP — completely untouched ──────────────────────────────────────────
    useEffect(() => {
      let cancelled = false;

      (async () => {
        const gsapPkg = await import("gsap");
        const gsap = gsapPkg.gsap || gsapPkg.default || gsapPkg;
        if (cancelled) return;

        const timeline = gsap.timeline({ delay: 0.2 });

        timeline
          .to(headingRef.current, {
            rotationX: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)",
            duration: 0.8, ease: "power3.inOut",
          }, 0)
          .to(dividerRef.current, {
            rotationX: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)",
            duration: 0.8, ease: "power3.inOut",
          }, 0.08)
          .to(subtitleRef.current, {
            rotationX: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)",
            duration: 0.8, ease: "power3.inOut",
          }, 0.16);

        if (statsRef.current) {
          const statItems = statsRef.current.querySelectorAll(".stat-item");

          timeline.to(statItems, {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
          }, 0.4);

          statItems.forEach((item) => {
            const numberEl   = item.querySelector(".stat-number");
            const targetValue = parseInt(numberEl?.getAttribute("data-value") || "0");

            gsap.to(numberEl, {
              innerText: targetValue,
              duration: 2.4,
              delay: 0.4,
              ease: "power2.out",
              snap: { innerText: 1 },
              onUpdate: function () {
                if (numberEl) {
                  numberEl.textContent = Math.round(
                    parseFloat(numberEl.textContent || "0")
                  ).toString();
                }
              },
            });
          });
        }

        if (mobileImageRef.current) {
          gsap.to(mobileImageRef.current, {
            opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
          });
        }

        if (desktopImageRef.current) {
          gsap.to(desktopImageRef.current, {
            clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
            duration: 1.2, ease: "circ.out",
          });
        }
      })();

      return () => { cancelled = true; };
    }, []);

    // Shared horizontal padding value — used on both the text block and stats
    // so their left edges are perfectly flush.
    const SIDE_PAD = "clamp(1.5rem, 4vw, 3.5rem)";
    const TOP_PAD  = "clamp(1.5rem, 3.5vw, 3rem)";

    return (
      <section
        ref={sectionRef}
        className={cn(
          "relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background text-foreground md:flex-row",
          playfair.className,
          className
        )}
        {...props}
      >
        {/* ── MOBILE IMAGE — crisp, no overlays ─────────────────────────────── */}
        <div
          ref={mobileImageRef}
          className="relative h-[38vh] w-full bg-cover bg-center md:hidden"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: 0,
            transform: "scale(1.05)",
          }}
        />

        {/* ── LEFT COLUMN ───────────────────────────────────────────────────── */}
        <div
          className="flex w-full flex-col justify-center md:w-1/2 lg:w-3/5"
          style={{ perspective: "900px" }}
        >

          {/* ── Text block: eyebrow + heading + divider + subtitle ── */}
          <div
            style={{
              transformStyle: "preserve-3d",
              padding: `${TOP_PAD} ${SIDE_PAD} 0`,
            }}
          >
            {/* Eyebrow */}
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.6rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#1e3a8a",
              marginBottom: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
            }}>
              <span style={{
                display: "inline-block",
                width: 28, height: 1,
                background: "#1e3a8a", opacity: 0.5, flexShrink: 0,
              }} />
              Our College
            </p>

            {/* Heading — GSAP target untouched; whiteSpace nowrap keeps it one line */}
            <h1
              ref={headingRef}
              className={cn("font-bold leading-[1.1]", cinzel.className)}
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4.75rem)",
                whiteSpace: "nowrap",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                background: "linear-gradient(90deg, #000000 0%, #1e3a8a 60%, #1e3a8a 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                opacity: 0,
                transform: "rotateX(80deg) translateY(-36px) scale(0.86)",
                filter: "blur(4px)",
                transformOrigin: "center top",
              }}
            >
              {heading}
            </h1>

            {/* Divider — GSAP target untouched */}
            <div
              ref={dividerRef}
              style={{
                margin: "1rem 0",
                height: 3, width: 48,
                background: "#1e3a8a", borderRadius: 2,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                opacity: 0,
                transform: "rotateX(80deg) translateY(-36px) scale(0.86)",
                filter: "blur(4px)",
                transformOrigin: "center top",
              }}
            />

            {/* Subtitle — GSAP target, matches LeadStorySection .ls-body */}
            <p
              ref={subtitleRef}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
                lineHeight: 1.9,
                color: "#555",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                opacity: 0,
                transform: "rotateX(80deg) translateY(-36px) scale(0.86)",
                filter: "blur(4px)",
                transformOrigin: "center top",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* ── Stats row ─────────────────────────────────────────────────────
               Sits OUTSIDE the 52ch cap so the 4 columns breathe across the
               full column width. Left padding matches the text block above for
               perfect alignment. The first stat has no left border; subsequent
               ones do — giving visual separation without starting from div edge.
          ─────────────────────────────────────────────────────────────────── */}
          <div
            ref={statsRef}
            style={{
              marginTop: "1.75rem",
              paddingLeft: SIDE_PAD,
              paddingRight: SIDE_PAD,
              paddingBottom: TOP_PAD,
              borderTop: "1px solid rgba(30,58,138,0.1)",
              paddingTop: "1.25rem",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
            }}
          >
            {[
              { value: 700, suffix: "+", label: "Students" },
              { value: 60,  suffix: "+", label: "Faculty Members" },
              { value: 100, suffix: "+", label: "Startups Nurtured" },
              { value: 85,  suffix: "%", label: "Solar Energy" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="stat-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  opacity: 0,
                  transform: "translateY(30px)",
                  /* first stat: no left border (it already starts at the text edge).
                     rest: thin separator that aligns cleanly within the row. */
                  paddingLeft: i === 0 ? 0 : "1.5rem",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(30,58,138,0.13)",
                }}
              >
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 2vw, 2.4rem)",
                  color: "#1e3a8a",
                  lineHeight: 1,
                }}>
                  <span className="stat-number" data-value={stat.value}>0</span>
                  {stat.suffix}
                </div>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(0.7rem, 0.78vw, 0.8rem)",
                  color: "#888",
                  fontStyle: "italic",
                  marginTop: "0.4rem",
                  lineHeight: 1.45,
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* ── DESKTOP IMAGE — crisp, no overlays ────────────────────────────── */}
        <div
          ref={desktopImageRef}
          className="relative hidden w-full bg-cover bg-center md:block md:w-1/2 lg:w-2/5"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          }}
        />

      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };