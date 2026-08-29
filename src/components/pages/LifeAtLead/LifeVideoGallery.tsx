"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera, X, ZoomIn } from "lucide-react";
import { cinzel, playfair } from "@/app/fonts";
import LifeAtLeadHero from "./LifeAtLeadHero";

/* ─── PALETTE ─── */
const C = {
  blue:   "#005C9F",
  text:   "#0D0D0D",
  muted:  "#555",
  faint:  "#888",
  border: "#E8EEF4",
} as const;

const G = {
  blue: "linear-gradient(90deg,#005C9F 0%,#1e3a8a 100%)",
} as const;

const SECTIONX = "clamp(1.5rem,6vw,8rem)";
const PER_PAGE = 12;

/* ─── PHOTOS DATA ─── */
export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

/* ─── ANIMATIONS ─── */
const GRID_CONTAINER: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};
const GRID_ITEM: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════════════════════ */
function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: Photo[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const photo = photos[index];

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdrop}
        style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1rem,4vw,3rem)", backdropFilter: "blur(6px)" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s ease", zIndex: 2 }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.2)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.1)"; }}>
          <X size={18} strokeWidth={2} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} disabled={index === 0} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", color: index === 0 ? "rgba(255,255,255,.25)" : "#fff", cursor: index === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s ease", zIndex: 2 }} onMouseEnter={e => { if (index !== 0) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.2)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.1)"; }}>
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} disabled={index === photos.length - 1} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", color: index === photos.length - 1 ? "rgba(255,255,255,.25)" : "#fff", cursor: index === photos.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s ease", zIndex: 2 }} onMouseEnter={e => { if (index !== photos.length - 1) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.2)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.1)"; }}>
          <ChevronRight size={20} strokeWidth={2} />
        </button>
        <motion.div key={index} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.22 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "min(90vw, 1100px)", width: "100%" }}>
          <img src={photo.src} alt={photo.alt} style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", borderRadius: 10, display: "block", boxShadow: "0 24px 80px rgba(0,0,0,.6)" }} />
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <Camera size={13} color="rgba(255,255,255,.6)" strokeWidth={1.8} />
              <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.76rem)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", fontWeight: 600 }}>{photo.caption}</span>
            </div>
            <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.66rem,.72vw,.72rem)", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", fontWeight: 600, flexShrink: 0 }}>{index + 1} / {photos.length}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PHOTO CARD
═══════════════════════════════════════════════════════════════ */
function PhotoCard({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={GRID_ITEM} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: hovered ? "0 8px 28px rgba(0,92,159,.13)" : "0 2px 12px rgba(0,92,159,.04)", background: "#fff", cursor: "pointer", transform: hovered ? "translateY(-3px)" : "translateY(0)", transition: "box-shadow .25s ease, transform .25s ease" }}>
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#f0f4f8", flexShrink: 0 }}>
        <img src={photo.src} alt={photo.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform .5s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(0,0,0,0.28)" : "rgba(0,0,0,0)", transition: "background .3s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.7)", transition: "opacity .25s ease, transform .25s ease", boxShadow: "0 4px 16px rgba(0,0,0,.25)" }}>
            <ZoomIn size={18} color={C.blue} strokeWidth={2} />
          </div>
        </div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,92,159,0.85)", borderRadius: 8, padding: "5px 8px", display: "flex", alignItems: "center", gap: 4, backdropFilter: "blur(4px)", opacity: hovered ? 0 : 1, transition: "opacity .2s ease" }}>
          <Camera size={11} strokeWidth={2} color="#fff" />
        </div>
      </div>
      <div style={{ padding: ".7rem 1rem .8rem", display: "flex", alignItems: "center", gap: ".4rem" }}>
        <Camera size={10} color={C.blue} strokeWidth={1.8} />
        <span style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.76rem)", letterSpacing: ".08em", textTransform: "uppercase", color: C.muted, fontWeight: 600 }}>{photo.caption}</span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGINATION
═══════════════════════════════════════════════════════════════ */
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) pages.push(i);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  const Btn = ({ children, page, active = false, disabled = false }: { children: React.ReactNode; page: number | null; active?: boolean; disabled?: boolean }) => (
    <button onClick={() => { if (page !== null && !disabled) onChange(page); }} disabled={disabled} style={{ width: 32, height: 32, borderRadius: 8, border: active ? "none" : `1px solid ${C.border}`, background: active ? G.blue : "#ffffff", color: active ? "#fff" : disabled ? "#ccc" : C.muted, fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.72rem,.8vw,.8rem)", fontWeight: 700, letterSpacing: ".06em", cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .18s ease", boxShadow: active ? "0 4px 14px rgba(0,92,159,.2)" : "none", flexShrink: 0 }}>{children}</button>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".35rem", marginTop: "clamp(2.5rem,5vh,4rem)" }}>
      <Btn page={current - 1} disabled={current === 1}><ChevronLeft size={13} strokeWidth={2} /></Btn>
      {pages.map((p, i) =>
        p === "…"
          ? <span key={`el-${i}`} style={{ fontFamily: cinzel.style.fontFamily, fontSize: ".74rem", color: C.faint, padding: "0 .18rem" }}>…</span>
          : <Btn key={p} page={p} active={p === current}>{p}</Btn>
      )}
      <Btn page={current + 1} disabled={current === total}><ChevronRight size={13} strokeWidth={2} /></Btn>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GRID SECTION
═══════════════════════════════════════════════════════════════ */
function GridSection({ photos }: { photos: Photo[] }) {
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sentinel div placed above the section header — pagination scrolls here,
  // not to window top. scrollMarginTop accounts for the fixed navbar.
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(photos.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = photos.slice(start, start + PER_PAGE);

  const handlePageChange = (p: number) => {
    setPage(p);
    // One tick delay lets React flush the new page before scrolling
    setTimeout(() => {
      scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  };

  const openLightbox  = (localIndex: number) => setLightboxIndex(start + localIndex);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto     = () => { if (lightboxIndex !== null && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1); };
  const nextPhoto     = () => { if (lightboxIndex !== null && lightboxIndex < photos.length - 1) setLightboxIndex(lightboxIndex + 1); };

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox photos={photos} index={lightboxIndex} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />
      )}

      <section style={{ background: "#ffffff", padding: "clamp(3rem,6vh,5rem) 0 clamp(4rem,8vh,7rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: `0 ${SECTIONX}` }}>

          {/* Zero-height scroll target — sits just above the "All Photos" header */}
          <div ref={scrollAnchorRef} style={{ scrollMarginTop: "80px" }} />

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45 }}
            style={{ marginBottom: "clamp(1.8rem,3.5vh,2.8rem)" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: ".8rem" }}>
              <div>
                <p style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(.68rem,.8vw,.76rem)", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, color: C.blue, margin: "0 0 .28rem" }}>
                  All Photos
                </p>
                <h2 style={{ fontFamily: cinzel.style.fontFamily, fontSize: "clamp(1rem,1.9vw,2.2rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-.025em", color: C.text, margin: 0, lineHeight: 0.95 }}>
                  LEAD Photo Gallery
                </h2>
              </div>
              <p style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(.7rem,.8vw,.76rem)", color: C.faint, margin: 0, alignSelf: "flex-end" }}>
                Showing {start + 1}–{Math.min(start + PER_PAGE, photos.length)} of {photos.length} photos
              </p>
            </div>
            <div style={{ height: 1, background: "linear-gradient(90deg,rgba(0,92,159,.18) 0%,transparent 100%)", marginTop: "1.1rem" }} />
          </motion.div>

          {/* Grid — 4 columns × 3 rows = 12 per page */}
          <style>{`
            .gal-grid-photos { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            @media (max-width: 1024px){ .gal-grid-photos { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
            @media (max-width: 720px){ .gal-grid-photos { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
            @media (max-width: 460px){ .gal-grid-photos { grid-template-columns: 1fr; } }
          `}</style>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="gal-grid-photos"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
              variants={GRID_CONTAINER}
              style={{ display: "grid", gap: "1.25rem" }}
            >
              {visible.map((photo, i) => (
                <PhotoCard key={photo.id} photo={photo} onClick={() => openLightbox(i)} />
              ))}
            </motion.div>
          </AnimatePresence>

          <Pagination current={page} total={totalPages} onChange={handlePageChange} />
        </div>
      </section>
    </>
  );
}

/* ─── PAGE EXPORT ─── */
export default function LifePhotoGallery({ photos = [] }: { photos?: Photo[] }) {
  return (
    <div style={{ background: "#ffffff" }}>
      <LifeAtLeadHero
        title="Photo Gallery"
        description="The Photo Gallery documents memorable campus moments — from classroom engagement and incubation activities to sports events and celebrations. It reflects the vibrancy, diversity, and spirit of the LEAD community while preserving institutional memories."
        imageSrc="/convert/LEAD32.webp"
      />
      <GridSection photos={photos} />
    </div>
  );
}