/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — Life at LEAD & shared
═══════════════════════════════════════════════════════ */

/** Colour palette */
export const COLORS = {
  primary: "#005C9F",
  primaryLight: "#0077CC",
  primaryDark: "#004A7F",
  dark: "#07111C",
  darkMuted: "#1a2332",
  text: "#07111C",
  textMuted: "#555",
  bg: "#ffffff",
  bgSoft: "#f8fafc",
  border: "rgba(0, 92, 159, 0.12)",
  borderHov: "rgba(0, 92, 159, 0.24)",
} as const;

/** Typography presets (use with inline style `fontSize`, `fontWeight`, `lineHeight`) */
export const TYPE = {
  display4: { fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1 },
  display3: { fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15 },
  display2: { fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 600, lineHeight: 1.2 },
  heading:  { fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)", fontWeight: 600, lineHeight: 1.3 },
  body:     { fontSize: "clamp(0.88rem, 1vw, 1rem)", fontWeight: 400, lineHeight: 1.8 },
  caption:  { fontSize: "clamp(0.72rem, 0.85vw, 0.82rem)", fontWeight: 400, lineHeight: 1.6 },
  eyebrow:  { fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase" as const },
} as const;

/** Spacing tokens */
export const SPACE = {
  sectionY: "clamp(4rem, 8vw, 7rem)",
  sectionX: "clamp(1.5rem, 5vw, 4rem)",
  colGapMd: "clamp(1.25rem, 2.5vw, 2rem)",
  colGapLg: "clamp(2rem, 4vw, 3.5rem)",
  cardPadMd: "clamp(1.25rem, 2.5vw, 2rem)",
  cardPadLg: "clamp(1.5rem, 3vw, 2.5rem)",
} as const;

/** Box-shadow presets */
export const SHADOWS = {
  card: "0 4px 20px rgba(0, 92, 159, 0.08)",
  cardHov: "0 12px 36px rgba(0, 92, 159, 0.16)",
  hero: "0 24px 60px rgba(0, 0, 0, 0.18)",
} as const;

/** Gradient presets */
export const GRADIENTS = {
  imageSoft: "linear-gradient(180deg, rgba(7,17,28,0.15) 0%, rgba(7,17,28,0.65) 100%)",
  primary90: "linear-gradient(90deg, #005C9F 0%, #0077CC 100%)",
  primary180: "linear-gradient(180deg, #005C9F 0%, #0077CC 100%)",
  cardOverlay: "linear-gradient(180deg, transparent 40%, rgba(7,17,28,0.7) 100%)",
} as const;

/** Border-radius presets */
export const RADIUS = {
  card: "8px",
  cardLg: "12px",
  pill: "999px",
  sm: "4px",
} as const;

/** Transition presets */
export const TRANS = {
  lift: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease",
  normal: "all 0.3s cubic-bezier(.22,1,.36,1)",
  slow: "all 0.6s cubic-bezier(.22,1,.36,1)",
  fadeUp: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
} as const;
