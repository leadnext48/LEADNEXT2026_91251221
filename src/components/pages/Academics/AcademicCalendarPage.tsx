"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cinzel, playfair } from "@/app/fonts";

/* ─── Dynamic Academic Session Logic ─────────────────────────────────────── */
function getAcademicSession() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const sessionStart = month >= 7 ? year : year - 1;
  const sessionEnd = sessionStart + 1;

  return {
    start: sessionStart,
    end: sessionEnd,
    label: `${sessionStart}–${sessionEnd}`,
    shortLabel: `${String(sessionStart).slice(2)}–${String(sessionEnd).slice(2)}`,
    currentMonthYear: now.toLocaleString("en-US", { month: "long", year: "numeric" }),
    currentYear: year,
  };
}

const session = getAcademicSession();

/* ─── SVG Icons ──────────────────────────────────────────────────────────── */
function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function AcademicCalendarPage() {
  const downloadRef = useRef(null);
  const isInView = useInView(downloadRef, { once: true, margin: "-60px" });

  return (
    <div className={`${cinzel.className} ${playfair.className} bg-white text-gray-900 antialiased`}>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col overflow-hidden bg-white min-h-screen">

        <div className="relative flex-1 flex flex-col lg:flex-row">

          {/* ── Left: Text ── */}
          <div className="relative z-10 flex flex-col justify-center w-full lg:w-[55%] px-6 sm:px-10 md:px-14 lg:px-[clamp(24px,5vw,100px)] py-14 lg:py-0">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center mb-4 lg:mb-[clamp(10px,1.8vh,32px)]"
              style={{ gap: "clamp(8px,1vw,18px)" }}
            >
              <div className="h-px bg-[#0a2463]" style={{ width: "clamp(24px,2.5vw,48px)" }} />
              <span
                className={`${cinzel.className} text-[#0a2463] uppercase font-medium tracking-widest`}
                style={{ fontSize: "clamp(8px,0.75vw,14px)" }}
              >
                Academic Affairs
              </span>
            </motion.div>

            {/* H1 */}
            <div className="overflow-hidden mb-3 lg:mb-[clamp(8px,1.3vh,22px)]">
              <motion.h1
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`${cinzel.className} font-bold uppercase`}
                style={{
                  fontSize: "clamp(36px,5.5vw,88px)",
                  lineHeight: 0.93,
                  letterSpacing: "-0.02em",
                }}
              >
                <span
                  style={{
                    display: "block",
                    background: "linear-gradient(90deg, #0D0D0D 0%, #0a2463 62%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Academic
                </span>
                <span
                  style={{
                    display: "block",
                    background: "linear-gradient(90deg, #0D0D0D 0%, #0a2463 62%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Calendar
                </span>
              </motion.h1>
            </div>

            {/* Session Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mb-4 lg:mb-[clamp(10px,1.8vh,28px)]"
            >
              <span
                className={`${cinzel.className} inline-block bg-[#d6e4ff] text-[#0a2463] uppercase`}
                style={{
                  fontSize: "clamp(9px,0.75vw,13px)",
                  letterSpacing: "0.22em",
                  padding: "4px 12px",
                }}
              >
                Academic Session {session.label}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className={`${playfair.className}`}
              style={{
                color: "#111",
                fontSize: "clamp(16px,0.82vw,16px)",
                lineHeight: 2.0,
                maxWidth: "clamp(300px,36vw,580px)",
              }}
            >
              The Academic Calendar at LEAD College is carefully structured to ensure academic
              discipline, transparency, and effective time management. It outlines the schedule
              of semesters, instructional periods, assessments, internships, examinations,
              co-curricular activities, and institutional events. The calendar is published in
              advance and adhered to strictly, providing clarity and predictability for students
              and faculty while supporting smooth academic operations.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="flex flex-wrap border-t border-gray-100"
              style={{
                gap: "clamp(20px,2.8vw,52px)",
                marginTop: "clamp(16px,2.2vh,36px)",
                paddingTop: "clamp(16px,2.2vh,36px)",
              }}
            >
              {[
                { value: "2",    label: "Semesters" },
                { value: "180+", label: "Instructional Days" },
                { value: "12",   label: "Co-curricular Events" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className={`${cinzel.className} font-bold`}
                    style={{
                      fontSize: "clamp(18px,1.8vw,30px)",
                      background: "linear-gradient(90deg, #0D0D0D 0%, #0a2463 62%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className={`${playfair.className} text-gray-400 tracking-wide mt-0.5`}
                    style={{ fontSize: "clamp(10px,0.75vw,13px)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full lg:w-[45%] overflow-hidden"
            style={{ minHeight: "300px" }}
          >
            <div className="absolute inset-0 bg-[#0a2463]" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "clamp(32px,4vw,72px) clamp(32px,4vw,72px)",
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute top-[14%] right-[14%] border border-white/10 rounded-full"
              style={{ width: "clamp(100px,16vw,260px)", height: "clamp(100px,16vw,260px)" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-[21%] right-[21%] border border-white/15 rounded-full"
              style={{ width: "clamp(64px,10vw,168px)", height: "clamp(64px,10vw,168px)" }}
            />

            {/* Glassmorphic Calendar Card */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ padding: "clamp(16px,3vw,60px)" }}
            >
              <div
                className="w-full rounded-2xl"
                style={{
                  maxWidth: "clamp(200px,24vw,380px)",
                  padding: "clamp(14px,1.8vw,30px)",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 56px rgba(0,0,0,0.3)",
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "clamp(8px,1.2vh,20px)" }}>
                  <span
                    className={`${cinzel.className} text-white uppercase`}
                    style={{ fontSize: "clamp(9px,0.8vw,14px)", letterSpacing: "0.16em" }}
                  >
                    {session.currentMonthYear}
                  </span>
                  <div
                    className="rounded-full bg-[#2952c8] flex items-center justify-center"
                    style={{ width: "clamp(16px,1.4vw,22px)", height: "clamp(16px,1.4vw,22px)" }}
                  >
                    <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
                      <path d="M3 5l2 2 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-7" style={{ gap: "2px", marginBottom: "clamp(6px,0.8vh,12px)" }}>
                  {["S","M","T","W","T","F","S"].map((d, i) => (
                    <div key={i} className={`${cinzel.className} text-center text-white/30 py-0.5`} style={{ fontSize: "clamp(11px,0.7vw,12px)" }}>{d}</div>
                  ))}
                  {(() => {
                    const now = new Date();
                    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
                    const today = now.getDate();
                    return Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const isToday = day === today;
                      const isWeekend = [0, 6].includes(new Date(now.getFullYear(), now.getMonth(), day).getDay());
                      return (
                        <div
                          key={i}
                          className={`${playfair.className} text-center py-0.5 rounded transition-all ${isToday ? "bg-[#2952c8] text-white font-semibold" : isWeekend ? "text-white/30" : "text-white/60"}`}
                          style={{ fontSize: "clamp(11px,0.72vw,13px)" }}
                        >
                          {day}
                        </div>
                      );
                    });
                  })()}
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "clamp(6px,0.8vh,12px)", marginTop: "clamp(6px,0.8vh,12px)" }}>
                  {[
                    { color: "bg-[#2952c8]",     label: "Mid-term Examinations" },
                    { color: "bg-emerald-500/70", label: "Industrial Internship" },
                  ].map((ev) => (
                    <div key={ev.label} className="flex items-center" style={{ gap: "clamp(5px,0.5vw,8px)", marginBottom: "clamp(3px,0.3vh,6px)" }}>
                      <span className={`rounded-full flex-shrink-0 ${ev.color}`} style={{ width: "clamp(5px,0.45vw,8px)", height: "clamp(5px,0.45vw,8px)" }} />
                      <span className={`${playfair.className} text-white/60`} style={{ fontSize: "clamp(11px,0.72vw,13px)" }}>{ev.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Watermark */}
            <div className="absolute bottom-3 left-4">
              <span className={`${cinzel.className} text-white/10 font-black tracking-wider`} style={{ fontSize: "clamp(22px,4.5vw,72px)" }}>LEAD</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2952c8]/30 to-transparent" />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — DOWNLOAD
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={downloadRef}
        className="relative flex flex-col items-center justify-center bg-white overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0a2463]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0a2463]/15 to-transparent" />

        <div
          className="relative z-10 w-full px-6 sm:px-10 md:px-14"
          style={{ maxWidth: "min(80vw, 1100px)", minWidth: "min(100%, 480px)" }}
        >

          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center mb-5 lg:mb-[clamp(10px,2vh,28px)]"
            style={{ gap: "clamp(10px,1vw,16px)" }}
          >
            <div className="h-px bg-[#0a2463]" style={{ width: "clamp(24px,2.5vw,44px)" }} />
            <span
              className={`${cinzel.className} text-[#0a2463] uppercase font-medium`}
              style={{ fontSize: "clamp(8px,0.7vw,12px)", letterSpacing: "0.35em" }}
            >
              Resources
            </span>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 20px 70px rgba(10,36,99,0.10), 0 5px 20px rgba(10,36,99,0.05)",
              border: "1px solid rgba(10,36,99,0.08)",
            }}
          >
            <div className="absolute inset-0 bg-white" />
            <div
              className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#0a2463] via-[#2952c8] to-[#0a2463]"
              style={{ height: "clamp(2px,0.22vw,4px)" }}
            />

            <div className="relative flex flex-col lg:flex-row">

              {/* Left: Content */}
              <div
                className="flex-1"
                style={{ padding: "clamp(20px,4vh,60px) clamp(20px,3vw,56px)" }}
              >
                {/* Icon + badge */}
                <div className="flex items-start mb-4 lg:mb-[clamp(12px,1.8vh,26px)]" style={{ gap: "clamp(10px,1vw,18px)" }}>
                  <div
                    className="flex-shrink-0 rounded-xl bg-[#0a2463] flex items-center justify-center text-white"
                    style={{
                      width: "clamp(38px,3.6vw,58px)",
                      height: "clamp(38px,3.6vw,58px)",
                      boxShadow: "0 5px 16px rgba(10,36,99,0.28)",
                    }}
                  >
                    <FileIcon />
                  </div>
                  <div className="pt-0.5">
                    <span
                      className={`${cinzel.className} inline-block bg-[#d6e4ff] text-[#0a2463] uppercase mb-1`}
                      style={{
                        fontSize: "clamp(11px,0.7vw,12px)",
                        letterSpacing: "0.16em",
                        padding: "3px 8px",
                      }}
                    >
                      PDF Document
                    </span>
                    <p className={`${playfair.className} text-[#111]`} style={{ fontSize: "clamp(11px,0.72vw,13px)", lineHeight: 1.9 }}>
                      Published by Office of Academic Affairs
                    </p>
                  </div>
                </div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className={`${cinzel.className} font-bold uppercase`}
                  style={{
                    fontSize: "clamp(22px,3.2vw,52px)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.01em",
                    marginBottom: "clamp(10px,1.4vh,20px)",
                    background: "linear-gradient(90deg, #0D0D0D 0%, #0a2463 62%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    paddingBottom: "0.06em",
                  }}
                >
                  Download<br />Academic<br />Calendar
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`${playfair.className}`}
                  style={{
                    color: "#111",
                    fontSize: "clamp(16px,0.9vw,16px)",
                    lineHeight: 2.0,
                    marginBottom: "clamp(16px,2vh,30px)",
                  }}
                >
                  Access the complete Academic Calendar for the {session.label} session. This document
                  contains semester schedules, examination dates, holidays, and all institutional
                  events in a structured, printable format.
                </motion.p>

                {/* CTA button */}
                <motion.a
                  href={`/academic-calendar-${session.label.replace("–", "-")}.pdf`}
                  download
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${cinzel.className} inline-flex items-center gap-2 bg-[#0a2463] text-white uppercase rounded-lg transition-all duration-300 group relative overflow-hidden`}
                  style={{
                    fontSize: "clamp(9px,0.78vw,13px)",
                    letterSpacing: "0.14em",
                    padding: "clamp(10px,1.1vh,16px) clamp(18px,1.8vw,32px)",
                    boxShadow: "0 5px 20px rgba(10,36,99,0.30)",
                  }}
                >
                  <motion.span
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                  />
                  <span className="relative z-10">Download Academic Calendar</span>
                  <span className="relative z-10 group-hover:translate-y-0.5 transition-transform duration-300">
                    <DownloadIcon />
                  </span>
                </motion.a>

                {/* Meta line */}
                <p
                  className={`${playfair.className} text-[#111] tracking-wide`}
                  style={{ fontSize: "clamp(11px,0.7vw,13px)", marginTop: "clamp(6px,0.7vh,10px)", lineHeight: 1.9 }}
                >
                  PDF · 2.4 MB · Last updated: July {session.start}
                </p>
              </div>

              {/* Right: Decorative Panel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative hidden sm:flex items-center justify-center overflow-hidden flex-shrink-0 bg-[#0a2463]"
                style={{ width: "clamp(130px,18vw,280px)", minHeight: "220px" }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
                    backgroundSize: "clamp(16px,1.5vw,24px) clamp(16px,1.5vw,24px)",
                  }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-white/10 rounded-full"
                  style={{ width: "clamp(80px,12vw,190px)", height: "clamp(80px,12vw,190px)" }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-white/15 rounded-full"
                  style={{ width: "clamp(50px,7.5vw,120px)", height: "clamp(50px,7.5vw,120px)" }}
                />
                <div className="relative z-10 text-center px-4">
                  <div className={`${cinzel.className} text-white/20 font-black mb-1`} style={{ fontSize: "clamp(28px,5vw,80px)", lineHeight: 1 }}>
                    {String(session.start).slice(2)}
                  </div>
                  <div className={`${cinzel.className} text-white/20 font-black`} style={{ fontSize: "clamp(28px,5vw,80px)", lineHeight: 1 }}>
                    {String(session.end).slice(2)}
                  </div>
                  <div className={`${cinzel.className} text-white/40 uppercase`} style={{ fontSize: "clamp(11px,0.7vw,12px)", letterSpacing: "0.2em", marginTop: "clamp(6px,0.7vh,12px)" }}>
                    Academic Session
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}