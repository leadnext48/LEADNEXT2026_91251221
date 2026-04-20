'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { playfair } from '@/app/fonts'

// ─── Asset paths ────────────────────────────────────────────────────────────
const WEBM_SRC  = '/WEBMOUT.webm'
const MP4_SRC   = '/MP4OUT1.mp4'
const IMAGE_SRC = '/bgmask.jpg'

// ─── Safari detection (client-only, runs once) ───────────────────────────────
function isSafariBrowser(): boolean {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent
  // Safari contains "Safari" but NOT "Chrome" or "Chromium"
  return /Safari/i.test(ua) && !/Chrome|Chromium|CriOS/i.test(ua)
}

// ─── Mobile detection — matches Tailwind's md breakpoint (768 px) ────────────
function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}

export default function HeroSection() {
  const svgRef        = useRef<SVGSVGElement>(null)
  const leadTextRef   = useRef<SVGTextElement>(null)
  const textGroupRef  = useRef<SVGGElement>(null)
  const contentRef    = useRef<HTMLDivElement>(null)
  const scrollRef     = useRef<HTMLDivElement>(null)
  const headlineRef   = useRef<HTMLHeadingElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const rafRef        = useRef<number>(0)

  // true  → show static image  (mobile OR video failed to load)
  const [useImage, setUseImage]     = useState(false)
  // true  → we're on Safari desktop
  const [isSafari, setIsSafari]     = useState(false)
  const [videoOpacity, setVideoOpacity] = useState(1)

  // Resolve environment on first client render
  useEffect(() => {
    if (isMobileViewport()) {
      setUseImage(true)    // mobile: always use image, never try video
    } else {
      setIsSafari(isSafariBrowser())
    }
  }, [])

  /* ── Fit headline to 80 vw via binary search ─────────────── */
  const fitHeadline = useCallback(() => {
    const el = headlineRef.current
    if (!el) return
    const target = window.innerWidth * 0.80
    let lo = 10, hi = 400, mid = lo
    el.style.fontSize = `${hi}px`
    if (el.scrollWidth <= target) { setHeadlineFontSize(hi); return }
    for (let i = 0; i < 20; i++) {
      mid = (lo + hi) / 2
      el.style.fontSize = `${mid}px`
      if (el.scrollWidth < target) lo = mid; else hi = mid
    }
    setHeadlineFontSize(Math.floor(mid))
  }, []) // eslint-disable-line

  const [headlineFontSize, setHeadlineFontSize] = useState(64)

  useEffect(() => {
    fitHeadline()
    window.addEventListener('resize', fitHeadline)
    return () => window.removeEventListener('resize', fitHeadline)
  }, [fitHeadline])

  /* ── Main animation — identical to original ────────────────── */
  useEffect(() => {
    const W  = window.innerWidth
    const H  = window.innerHeight
    const CX = W / 2
    const CY = H / 2

    const svg       = svgRef.current!
    const leadText  = leadTextRef.current!
    const textGroup = textGroupRef.current!

    const fontSize = Math.round(Math.min(W * 0.1175, H * 0.26))
    leadText.setAttribute('font-size', String(fontSize))
    leadText.setAttribute('x', String(CX))
    leadText.setAttribute('y', String(CY))

    /* Phase 1 — fade in LEAD cutout */
    const fadeInText = () => {
      let t0: number | null = null
      const tick = (now: number) => {
        if (t0 === null) t0 = now
        const t = Math.min((now - t0) / 750, 1)
        leadText.setAttribute('opacity', String(t))
        if (t < 1) rafRef.current = requestAnimationFrame(tick)
        else setTimeout(startScale, 1500)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    /* Phase 2 — exponential scale-up */
    const startScale = () => {
      let t0: number | null = null
      const tick = (now: number) => {
        if (t0 === null) t0 = now
        const t     = Math.min((now - t0) / 2300, 1)
        const eased = t === 0 ? 0 : Math.pow(2, 10 * t - 10)
        const scale = 1 + (28 - 1) * eased

        textGroup.setAttribute(
          'transform',
          `translate(${CX},${CY}) scale(${scale}) translate(${-CX},${-CY})`
        )

        if (t > 0.58) {
          const fade = (t - 0.58) / 0.42
          svg.style.opacity = String(Math.max(0, 1 - fade))
        }

        if (t < 1) rafRef.current = requestAnimationFrame(tick)
        else reveal()
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    /* Phase 3 — show video/image + content */
    const reveal = () => {
      svg.style.opacity = '0'
      videoRef.current?.play().catch(() => {})
      setTimeout(() => {
        contentRef.current?.classList.add('lc-visible')
        scrollRef.current?.classList.add('lc-visible')
      }, 400)
    }

    const startAnim = () => {
      const timer = setTimeout(fadeInText, 250)
      return () => clearTimeout(timer)
    }

    let cleanup = () => {}
    document.fonts.ready.then(() => { cleanup = startAnim() ?? (() => {}) })

    return () => {
      cleanup()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ─── Video error handler: silently fall back to static image ───────────────
  const handleVideoError = useCallback(() => {
    setUseImage(true)
  }, [])

  return (
    <>
      <style>{`
        .lc-fade-up {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 1.2s ease, transform 1.2s ease;
          pointer-events: none;
        }
        .lc-fade-up.lc-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .lc-headline {
          white-space: nowrap;
          display: block;
          line-height: 1;
        }

        @keyframes lc-pulse {
          0%, 100% { opacity: 0.25; transform: scaleY(1); }
          50%       { opacity: 0.65; transform: scaleY(0.5); }
        }
        .lc-scroll-line {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.22);
          animation: lc-pulse 2.2s ease-in-out infinite;
        }

        .lc-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: opacity 1s ease;
          will-change: opacity;
          transform: translateZ(0);
        }

        .lc-bg-image {
          position: absolute;
          inset: 0;
          object-fit: cover;
          object-position: center;
        }
      `}</style>

      <section style={{
        position:   'relative',
        width:      '100%',
        height:     '100vh',
        overflow:   'hidden',
        background: '#06090f',
      }}>

        {/* ── Background: image (mobile or fallback) OR video (desktop) ───── */}
        {useImage ? (
          /* Static image — always on mobile, or after video error */
          <Image
            src={IMAGE_SRC}
            alt=""
            fill
            priority
            className="lc-bg-image"
            style={{ zIndex: 0 }}
            sizes="100vw"
          />
        ) : (
          /*
           * Desktop video element
           * Source order matters for codec selection:
           *   - Safari ignores WebM; it picks MP4.
           *   - Chrome/Firefox/Edge pick the first supported format (WebM).
           * We detect Safari and swap order so Safari gets MP4 first,
           * avoiding a wasted network request for the WebM it can't use.
           *
           * onError fires for: 404, network failure, unsupported codec, etc.
           * In all those cases we silently fall back to the image.
           */
          <video
            ref={videoRef}
            className="lc-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={handleVideoError}
            style={{ opacity: videoOpacity, zIndex: 0 }}
          >
            {isSafari ? (
              /* Safari: MP4 first, WebM as secondary (unreachable in Safari but harmless) */
              <>
                <source src={MP4_SRC}  type="video/mp4" />
                <source src={WEBM_SRC} type="video/webm" />
              </>
            ) : (
              /* Chrome / Edge / Firefox: WebM first (smaller), MP4 fallback */
              <>
                <source src={WEBM_SRC} type="video/webm" />
                <source src={MP4_SRC}  type="video/mp4" />
              </>
            )}
          </video>
        )}

        {/* ── SVG white overlay with LEAD cutout ──────────────── */}
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style={{
            position:      'absolute',
            inset:         0,
            zIndex:        2,
            pointerEvents: 'none',
          }}
        >
          <defs>
            <mask id="lead-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <g ref={textGroupRef}>
                <text
                  ref={leadTextRef}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  fontFamily="Impact, 'Arial Black', 'Arial Bold', sans-serif"
                  fontWeight="900"
                  letterSpacing="-0.01em"
                  opacity="0"
                >
                  LEAD
                </text>
              </g>
            </mask>
          </defs>
          <rect
            x="0" y="0"
            width="100%" height="100%"
            fill="white"
            mask="url(#lead-mask)"
          />
        </svg>

        {/* ── Bottom-left hero content ─────────────────────────── */}
        <div
          ref={contentRef}
          className="lc-fade-up"
          style={{
            position:      'absolute',
            bottom:        'clamp(2rem, 5vh, 4rem)',
            left:          'clamp(1.5rem, 4vw, 4rem)',
            right:         'clamp(1.5rem, 4vw, 4rem)',
            zIndex:        5,
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'flex-start',
            gap:           '0.75rem',
          }}
        >
          <p
            className={playfair.className}
            style={{
              fontWeight:    400,
              fontStyle:     'normal',
              fontSize:      'clamp(0.65rem, 1vw, 0.85rem)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.38)',
            }}
          >
            Learn &nbsp;·&nbsp; Excel &nbsp;·&nbsp; Achieve &nbsp;·&nbsp; Dream
          </p>

          <h1
            ref={headlineRef}
            className={`${playfair.className} lc-headline`}
            style={{
              fontWeight:    700,
              fontStyle:     'normal',
              fontSize:      `${headlineFontSize}px`,
              color:         '#ffffff',
              letterSpacing: '-0.01em',
              textShadow: `
                0 1px 0   rgba(0,0,0,0.6),
                0 2px 0   rgba(0,0,0,0.5),
                0 3px 0   rgba(0,0,0,0.38),
                0 4px 0   rgba(0,0,0,0.26),
                0 5px 0   rgba(0,0,0,0.15),
                0 6px 0   rgba(0,0,0,0.08),
                0 12px 24px rgba(0,0,0,0.55)
              `,
            }}
          >
            Excellence in Education
          </h1>

          <p
            className={playfair.className}
            style={{
              fontWeight:    400,
              fontStyle:     'normal',
              fontSize:      'clamp(0.68rem, 1.05vw, 0.9rem)',
              letterSpacing: '0.06em',
              color:         'rgba(255,255,255,0.32)',
              marginTop:     '0.2rem',
            }}
          >
            LEAD College of Management &nbsp;·&nbsp; Dhoni, Palakkad
          </p>
        </div>

        {/* ── Scroll hint — bottom right ───────────────────────── */}
        <div
          ref={scrollRef}
          className="lc-fade-up"
          style={{
            position:      'absolute',
            bottom:        '2rem',
            right:         'clamp(1.5rem, 4vw, 4rem)',
            zIndex:        5,
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           '0.5rem',
          }}
        >
          <span style={{
            fontFamily:    'system-ui, sans-serif',
            fontSize:      '0.5rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.22)',
          }}>
            Scroll
          </span>
          <div className="lc-scroll-line" />
        </div>

      </section>
    </>
  )
}