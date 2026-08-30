'use client'
import React, { useEffect, useRef } from "react";
import { cinzel, playfair } from "@/app/fonts";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { useParams } from "next/navigation";

import Image from "next/image";
import { governanceData } from "./governanceData";

export default function GovernanceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const compositionRef = useRef<HTMLDivElement | null>(null);
  const compositionTitleRef = useRef<HTMLHeadingElement | null>(null);

  const isClient = typeof window !== "undefined";

  const bodyData = governanceData.find((body) => body.slug === slug);

  if (!bodyData) {
    return (
      <div className="governance-detail-root">
        <div className="hero-section">
          <div className="hero-inner">
            <Link href="/governance" className="back-button">
              <ArrowLeft size={16} />
              <span>Back to Governance</span>
            </Link>
            <h1 className="governance-detail-title">Body not found</h1>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!isClient) return;

    let gsap: any;
    let ScrollTrigger: any;
    let titleTl: any;
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

      gsap.registerPlugin(ScrollTrigger);

      if (cancelled) return;

      const title = titleRef.current;
      const content = contentRef.current;
      const composition = compositionRef.current;
      const compositionTitle = compositionTitleRef.current;

      if (title) {
        gsap.set(title, { y: 40, opacity: 0 });
        titleTl = gsap.to(title, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2,
        });
      }

      if (content) {
        gsap.set(content, { y: 30, opacity: 0 });
        gsap.to(content, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4,
        });
      }

      if (compositionTitle) {
        gsap.set(compositionTitle, { y: 30, opacity: 0 });
        gsap.to(compositionTitle, {
          scrollTrigger: {
            trigger: compositionTitle,
            start: "top 85%",
            end: "top 65%",
            scrub: 1,
          },
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        });
      }

      if (composition) {
        const members = composition.querySelectorAll<HTMLElement>(".member-card");
        gsap.set(members, { scale: 0.8, opacity: 0, y: 20 });
        gsap.to(members, {
          scrollTrigger: {
            trigger: composition,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
          scale: 1, opacity: 1, y: 0, duration: 0.6,
          ease: "back.out(1.2)", stagger: 0.05,
        });
      }
    })();

    return () => {
      cancelled = true;
      try { titleTl?.kill?.(); } catch {}
      try {
        if (ScrollTrigger?.getAll && rootRef.current) {
          ScrollTrigger.getAll().forEach((t: any) => {
            if (rootRef.current!.contains(t.trigger)) t.kill(true);
          });
        }
      } catch {}
    };
  }, [isClient, slug]);

  return (
    <div ref={rootRef} className="governance-detail-root">

      {/* ── Hero: 100vh ── */}
      <div className="hero-section">
        <div className="hero-inner">

          <div className="breadcrumb-row">
            <Link href="/governance" className="back-button">
              <ArrowLeft size={15} />
              <span>Back to Governance</span>
            </Link>
          </div>

          <h1 ref={titleRef} className="governance-detail-title">
            {bodyData.title}
          </h1>

          <div ref={contentRef} className="content-section">
            <div className="description-section">
              <p className="description-text">{bodyData.description}</p>
            </div>

            <div className="info-cards-grid">
              <div className="info-card">
                <h3 className="info-card-title">Term</h3>
                <p className="info-card-text">{bodyData.term}</p>
              </div>
              <div className="info-card">
                <h3 className="info-card-title">Meetings</h3>
                <p className="info-card-text">{bodyData.meetings}</p>
              </div>
            </div>

            <p className="scroll-hint">↓ Scroll to see composition</p>

          </div>

        </div>
      </div>

      {/* ── Composition: below the fold ── */}
      <div ref={compositionRef} className="composition-section">
        <div className="composition-inner">
          <h2 ref={compositionTitleRef} className="composition-title">
            Composition
          </h2>

          <div className="members-grid">
            {bodyData.composition.map((member, index) => (
              <div key={index} className="member-card">
                <div className="member-avatar">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={140}
                      height={140}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      unoptimized={true}
                      onError={(e) => {
                        const imgElement = e.target as HTMLImageElement;
                        imgElement.style.display = "none";
                        const parent = imgElement.parentElement;
                        if (parent && !parent.querySelector(".user-icon-fallback")) {
                          const fallbackDiv = document.createElement("div");
                          fallbackDiv.className = "user-icon-fallback";
                          fallbackDiv.innerHTML =
                            '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                          parent.appendChild(fallbackDiv);
                        }
                      }}
                    />
                  ) : (
                    <User size={36} strokeWidth={1.5} />
                  )}
                </div>
                <div className="member-info">
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-designation">{member.designation}</p>
                  {member.role && <p className="member-role">{member.role}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .governance-detail-root {
          --bg: #ffffff;
          --text: #0f1115;
          --muted: #6b7280;
          --card-bg: #f9fafb;
          --gradient-start: #000000;
          --gradient-end: #005C9F;
          background: var(--bg);
          color: var(--text);
          font-family: ${playfair.style.fontFamily}, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        }

        /* ── Hero ── */
        .hero-section {
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .hero-inner {
          width: 70%;
          max-width: 860px;
          display: flex;
          flex-direction: column;
          margin-top: -4vh;
        }

        /* ── Breadcrumb ── */
        .breadcrumb-row {
          margin-bottom: 18px;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--gradient-end);
          font-size: clamp(12px, 1.2vw, 14px);
          font-weight: 500;
          text-decoration: none;
          transition: gap 0.3s ease, color 0.3s ease;
          font-family: ${cinzel.style.fontFamily}, ui-serif, Georgia, serif;
          letter-spacing: 0.03em;
        }

        .back-button:hover {
          gap: 11px;
          color: var(--gradient-start);
        }

        /* ── Page title ── */
        .governance-detail-title {
          text-align: center;
          font-size: clamp(28px, 4.2vw, 58px);
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0 0 0 0;
          font-family: ${cinzel.style.fontFamily}, ui-serif, Georgia, serif;
          background: linear-gradient(90deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1.15;
        }

        /* ── Content ── */
        .content-section {
          margin-top: 36px;
        }

        .description-section {
          margin-bottom: 24px;
        }

        .description-text {
          font-size: clamp(16px, 1.3vw, 16px);
          line-height: 1.85;
          color: var(--text);
          text-align: justify;
          margin: 0;
        }

        .info-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(14px, 1.5vw, 22px);
        }

        .info-card {
          background: var(--card-bg);
          padding: clamp(16px, 1.8vw, 24px);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .info-card-title {
          font-size: clamp(15px, 1.6vw, 20px);
          font-weight: 600;
          margin: 0 0 clamp(8px, 0.8vw, 12px) 0;
          font-family: ${cinzel.style.fontFamily}, ui-serif, Georgia, serif;
          color: var(--gradient-end);
        }

        .info-card-text {
          font-size: clamp(16px, 1.1vw, 16px);
          line-height: 1.7;
          color: #111;
          margin: 0;
        }

        /* ── Scroll hint ── */
        .scroll-hint {
          text-align: center;
          margin: clamp(20px, 2vw, 28px) 0 0 0;
          font-size: clamp(11px, 1vw, 13px);
          color: #111;
          letter-spacing: 0.08em;
          opacity: 0.6;
          animation: fadeUpDown 2.2s ease-in-out infinite;
        }

        @keyframes fadeUpDown {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50%       { opacity: 0.75; transform: translateY(4px); }
        }

        /* ── Composition ── */
        .composition-section {
          background: var(--bg);
          padding: clamp(48px, 7vw, 80px) 0;
        }

        .composition-inner {
          width: 70%;
          max-width: 860px;
          margin: 0 auto;
        }

        .composition-title {
          text-align: center;
          font-size: clamp(26px, 3.2vw, 42px);
          font-weight: 600;
          margin: 0 0 clamp(32px, 4vw, 52px) 0;
          font-family: ${cinzel.style.fontFamily}, ui-serif, Georgia, serif;
          color: var(--text);
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(160px, 18vw, 220px), 1fr));
          gap: clamp(20px, 2.5vw, 32px);
        }

        .member-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(18px, 2vw, 28px) clamp(14px, 1.5vw, 22px);
          background: var(--card-bg);
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .member-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .member-avatar {
         width: clamp(96px, 11vw, 140px);
height: clamp(96px, 11vw, 140px);
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: clamp(12px, 1.2vw, 18px);
          overflow: hidden;
          position: relative;
          color: var(--muted);
          flex-shrink: 0;
        }

        .user-icon-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .member-info { width: 100%; }

        .member-name {
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 600;
          margin: 0 0 clamp(4px, 0.4vw, 8px) 0;
          font-family: ${cinzel.style.fontFamily}, ui-serif, Georgia, serif;
          color: var(--text);
          line-height: 1.3;
        }

        .member-designation {
          font-size: clamp(11px, 1.1vw, 14px);
          line-height: 1.5;
          color: #111;
          margin: 0 0 clamp(3px, 0.3vw, 6px) 0;
        }

        .member-role {
          font-size: clamp(11px, 1vw, 13px);
          line-height: 1.5;
          color: var(--gradient-end);
          font-weight: 500;
          margin: 0;
          font-style: normal;
        }

        @media (max-width: 900px) {
          .hero-inner,
          .composition-inner {
            width: 86%;
            max-width: none;
          }
        }

        @media (max-width: 600px) {
          .hero-inner,
          .composition-inner {
            width: 92%;
          }
          .info-cards-grid {
            grid-template-columns: 1fr;
          }
          .description-text {
            text-align: left;
          }
        }

        @media (max-width: 400px) {
          .hero-inner,
          .composition-inner {
            width: 96%;
          }
        }
      `}</style>
    </div>
  );
}