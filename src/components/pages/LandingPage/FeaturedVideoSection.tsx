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
            fontSize: 'clamp(0.44rem, 0.66vw, 0.6rem)',
            letterSpacing: '0.34em',
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
            fontSize: 'clamp(0.8rem, 0.95vw, 0.92rem)',
            color: '#777',
            margin: '0.8rem 0 0',
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          A closer look at life, learning, and the LEAD College experience.
        </p>
      </div>

      {/* Video frame — 16:9. Thumbnail facade until the user clicks play. */}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#000',
            border: '1px solid rgba(0,92,159,0.12)',
            boxShadow: '0 24px 70px rgba(0,92,159,0.14)',
          }}
        >
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Featured Video — LEAD College"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                padding: 0,
                border: 'none',
                cursor: 'pointer',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Featured video preview"
                loading="lazy"
                onError={(e) => {
                  // Not every video has a maxres thumbnail (404); fall back to
                  // hqdefault, which always exists.
                  const img = e.currentTarget;
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = '1';
                    img.src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                  }
                }}
                onLoad={(e) => {
                  // Some videos return a tiny gray "unavailable" placeholder
                  // (120x90) with a 200 status instead of a 404 — catch that too.
                  const img = e.currentTarget;
                  if (!img.dataset.fallback && img.naturalWidth <= 120) {
                    img.dataset.fallback = '1';
                    img.src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                  }
                }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Subtle dark overlay for contrast */}
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(7,17,28,0.15), rgba(7,17,28,0.35))',
                }}
              />
              {/* Play button */}
              <span
                style={{
                  position: 'relative',
                  width: 'clamp(56px, 7vw, 84px)',
                  height: 'clamp(56px, 7vw, 84px)',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.92)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s ease, background 0.2s ease',
                }}
                className="qa-video-play"
              >
                <span
                  style={{
                    display: 'block',
                    width: 0,
                    height: 0,
                    marginLeft: '18%',
                    borderTop: 'clamp(9px, 1.1vw, 13px) solid transparent',
                    borderBottom: 'clamp(9px, 1.1vw, 13px) solid transparent',
                    borderLeft: 'clamp(15px, 1.9vw, 22px) solid ' + BLUE,
                  }}
                />
              </span>
              <style>{`
                .qa-video-play:hover { transform: scale(1.08); background: #fff; }
              `}</style>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
