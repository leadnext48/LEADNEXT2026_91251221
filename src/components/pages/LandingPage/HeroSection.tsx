'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { playfair } from '@/app/fonts'

// ─── Slideshow assets (order matters) ────────────────────────────────────────
const SLIDES = [
  '/convert/LEAD30.webp',
  '/convert/LEAD03.webp',
  '/convert/LEAD53.webp',
  '/convert/LEAD60.webp',
]

// ─── Timing ───────────────────────────────────────────────────────────────────
const SLIDE_HOLD_MS = 4000   // each image stays on screen this long
const FADE_MS       = 2000   // crossfade length — long fade = liquid feel
const KENBURNS_MS   = 24000  // slow, subtle zoom for a living, premium look

export default function HeroSection() {
  const svgRef        = useRef<SVGSVGElement>(null)
  const leadTextRef   = useRef<SVGTextElement>(null)
  const textGroupRef  = useRef<SVGGElement>(null)
  const contentRef    = useRef<HTMLDivElement>(null)
  const scrollRef     = useRef<HTMLDivElement>(null)
  const headlineRef   = useRef<HTMLHeadingElement>(null)
  const rafRef        = useRef<number>(0)

  // Which slide is currently fading in
  const [slide, setSlide] = useState(0)

  /* ── Slideshow — automatic, infinite crossfade ───────────────── */
  useEffect(() => {
    const id = setInterval(() => {
      setSlide(prev => (prev + 1) % SLIDES.length)
    }, SLIDE_HOLD_MS)
    return () => clearInterval(id)
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

    /* Phase 3 — reveal slideshow + content */
    const reveal = () => {
      svg.style.opacity = '0'
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

        /* ── Background slideshow ─────────────────────────────── */
        .lc-slideshow {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #06090f;
        }
        .lc-slide {
          object-fit: cover;
          object-position: center;
          opacity: 0;
          /* long, symmetric ease = buttery fade out / fade in */
          transition: opacity ${FADE_MS}ms cubic-bezier(0.45, 0, 0.55, 1);
          will-change: opacity;
          /* slow, gentle zoom so the stills feel alive & liquid */
          animation: lc-kenburns ${KENBURNS_MS}ms ease-in-out infinite alternate;
        }
        .lc-slide.lc-slide-active {
          opacity: 1;
        }
        @keyframes lc-kenburns {
          from { transform: scale(1.00); }
          to   { transform: scale(1.07); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lc-slide { animation: none; }
        }
      `}</style>

      <section style={{
        position:   'relative',
        width:      '100%',
        height:     '100vh',
        overflow:   'hidden',
        background: '#06090f',
      }}>

        {/* ── Background: automatic infinite crossfade slideshow ───── */}
        <div className="lc-slideshow">
          {SLIDES.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`lc-slide${i === slide ? ' lc-slide-active' : ''}`}
            />
          ))}
        </div>

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
