'use client';

/*
  FeaturedVideoSection.tsx
  ------------------------------------------------------------------
  A performance-conscious YouTube section for the home page.

  • Nothing from YouTube loads on initial page load — we show only a
    lightweight thumbnail + play button (a "facade"). The actual player
    iframe is injected ONLY when the user clicks play. This keeps the
    homepage fast with zero scroll listeners.
  • Normal playback: the user decides when to play / pause / unmute /
    fullscreen via the native YouTube controls.

  To swap the video later, change VIDEO_ID.
*/

import { useState } from 'react';
import Image from 'next/image';
import { cinzel, playfair } from '@/app/fonts';

const VIDEO_ID = 'VrkT32NhEM4';
const BLUE = '#005C9F';
const DARK = '#07111C';

export default function FeaturedVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      style={{
        background: '#fff',
        padding: 'clamp(4rem, 9vh, 7rem) clamp(1.5rem, 10vw, 9rem)',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: '0 auto 2.5rem' }}>
        <p
          style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: 'clamp(0.66rem, 0.8vw, 0.74rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: BLUE,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: '0.6rem',
          }}
        >
          <span style={{ display: 'inline-block', width: 18, height: 1.5, background: BLUE }} />
          Featured Video
        </p>
        <h2
          style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: 'clamp(1.3rem, 2.5vw, 2.8rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: DARK,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Experience{' '}
          <span
            style={{
              background: `linear-gradient(90deg, ${BLUE} 0%, #1e3a8a 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            LEAD.
          </span>
        </h2>
        <p
          style={{
            fontFamily: playfair.style.fontFamily,
            fontSize: 'clamp(1rem, 1vw, 1rem)',
            color: '#111',
            margin: '0.8rem 0 0',
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          A closer look at life, learning, and the LEAD College experience.
        </p>
      </div>

      {/* Video frame — 16:9. Styled to match the Admissions Overview video.
          Thumbnail facade (local image) until the user clicks play. */}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{ aspectRatio: '16 / 9', background: '#000' }}
        >
          {playing ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Featured Video — LEAD College"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, border: 0 }}
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src="/convert/LEAD02.webp"
                alt="Featured video — LEAD College campus"
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/42 flex flex-col items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="fv-play-btn w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl"
                  aria-label="Play video"
                >
                  <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                    <path d="M7 5l18 9-18 9V5z" fill={BLUE} />
                  </svg>
                </button>
                <span
                  className={cinzel.className}
                  style={{ color: '#fff', fontSize: '0.74rem', letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.72 }}
                >
                  Click to Play
                </span>
              </div>
              <style>{`.fv-play-btn{transition:transform .2s ease}.fv-play-btn:hover{transform:scale(1.08)}`}</style>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
