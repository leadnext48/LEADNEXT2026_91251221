# LEAD College — Stakeholder Feedback Implementation Pass (Handoff Brief)

> **How to use this file:** This is the single source of truth for the current
> development pass. It was authored in a prior planning session whose chat context
> does NOT carry over. Do **not** rebuild the site or re-discover the project —
> continue from the current codebase exactly as it exists. Execute the scope in
> "WHAT TO DO NOW" below, after completing the inspection step.

---

## 0. Project facts (already true — don't re-derive)

- Next.js 16 (App Router), React 19, Tailwind v4, framer-motion **pinned to 12.29.0** (do not bump — a bump previously broke scroll animations).
- Sanity CMS integrated for Events / Social Media / Gallery / Exam notices (standalone Studio in `studio/`).
- A recent pass already: optimized images (~180MB → ~29MB, ~80% reduction — **do not regress this**), fixed the Original Thinkers parallax, restyled the home Featured Video, wired real footer socials, removed unused assets.
- Last commit should be `eecab57 Wire up real footer social links`.

---

## 1. LATEST STAKEHOLDER EMAIL (verbatim — Stephin PM, Sr. Digital Marketing Executive)

Key observations / required updates for the launched website:

1. **Homepage – UX & content visibility:** Homepage appears almost blank initially; content becomes visible only on mouse-move/scroll, which can look like it isn't loading. Wants more key info/sections visible upfront, clear navigation, content-rich structured homepage.
2. **LEAD Story / Milestones – scrolling UX:** In the LEAD Story milestone section, users are unsure whether to scroll up/down or interact otherwise. Transitions between milestones should be more intuitive and clearly guide the user, especially first-time visitors. Review scrolling behaviour, positioning, transitions.
3. **Governance Structure:** Content appears to overlap with the LEAD branding/logo, affecting readability. Review the whole governance section so nothing overlaps.
4. **Academics – Department pages:** Department of Management Studies (MBA) page has text/content over the image affecting readability; same in Department of Computer Applications (MCA). Text and images need sufficient separation, readable on desktop AND mobile.
5. **Faculty:** Some info outdated; college will provide updated info. (DEFER)
6. **Placements:** Wants current placement stats/achievements; college will provide stats, photos, achievements, names. (DEFER)
7. **Research / Research Centre:** In the "Distinguished PhD Award" section, **Dr. Thomas George K is shown as "Director" — must be "Chairman."**
8. **Quality Assurance & Accreditation:** Verify accreditation status + IQAC docs; college will provide. (DEFER)
9. **Library:** Large blank area; college will provide photos. (DEFER — owner sees no obvious blank area needing structural change now.)

Screenshots were mentioned but **NOT actually received** — do not assume screenshot access.

---

## 2. WHAT TO DO NOW (this pass) vs DEFER

### DO NOW (implementation)
1. **LEAD Story → premium vertical storytelling timeline** (main UX change — see §3)
2. **Governance main page → fix mobile layout** (hero overlaps section below; cards go under footer on mobile; desktop is fine — see §4)
3. **MBA / Management Studies page → mobile responsiveness** (text cut off, image/text overlap on mobile; desktop fine — see §5)
4. **MCA / Computer Applications page → mobile responsiveness** (same class of issues — see §5)
5. **Research designation fix:** "Distinguished PhD Award" section — Dr. Thomas George K **Director → Chairman**. Fix in the source/data driving it. Search occurrences; do NOT blind-replace the word "Director"; don't touch unrelated content.
6. Closely-related obvious responsive bugs discovered while doing the above.

### ANALYZE / MINOR FIX ONLY
- **Homepage initial visibility:** Inspect why the initial viewport feels empty (scroll-triggered animations, initial animation states starting at `opacity:0`, intersection observers, hero composition, client-side loading, image loading, timing). If there's an obvious low-risk technical cause hiding content on first load, fix it. **Do NOT start a full homepage redesign** — that's a separate phase.

### WAIT FOR COLLEGE INPUT (do NOT fabricate anything)
- Faculty info, Placement stats/photos/names, Accreditation/IQAC status & documents, Library photos.
- **Hard rule:** never invent faculty info, placement stats, achievements, accreditation status, IQAC docs, designations, awards, dates, or photos. Use only what's in the repo or explicitly provided.

---

## 3. LEAD STORY MILESTONE TIMELINE — DETAILED DESIGN BRIEF

**Current behaviour:** Below the LEAD Story content, milestone cards move **horizontally** as the user scrolls **vertically** (a scroll-linked horizontal progression). Visually impressive but confusing for first-time visitors (they don't realize it's progressing horizontally).

**Do NOT** just remove the animation and replace with a boring list. **Redesign into a premium vertical storytelling timeline.**

### Desired experience
- Milestones progress **vertically** as the user scrolls.
- Each milestone appears naturally as the user reaches it.
- **Years visually prominent** and easy to identify.
- Milestones **alternate left/right** (desktop).
- A timeline line **visually connects** the milestones and **progressively reveals**.
- Content reveals with **smooth, restrained** animation.
- Chronological progression is **immediately obvious**: *scroll down → next milestone appears.*

Conceptual only (do NOT implement a generic timeline component or template):
```
        1981
   ───────────
   Milestone content
        │
        ├────────────
                 1990
          Milestone content
        │
        ├────────────
       2000
   Milestone content
```

### Design quality bar (CRITICAL)
Must feel: **premium, editorial, institutional, elegant, modern, sophisticated, consistent with the existing LEAD identity.** Think high-end editorial / premium institutional websites — **NOT** generic AI-generated UI.

**Avoid the AI-generated aesthetic:** glassmorphism, purple/blue gradients, huge rounded cards, generic timeline templates, excessive shadows, floating blobs, random decorative elements, excessive pills, generic SaaS UI, overly flashy animations.

Ask for every element: *"Does this look like a deliberate design decision for LEAD College, or a generic AI component?"* If generic, rethink.

### Animation
Good: timeline line progressively revealing; year becoming prominent when its milestone enters viewport; subtle fade/slide entrance; alternate left/right; smooth scroll-triggered transitions.
Avoid: scroll-jacking, excessive parallax, long delays, animation that hides content or traps the user, **animation requiring hover**.

### Mobile
Clean **single-column** timeline. No horizontal scroll, no hover dependency, no clipping/overflow. Years stay prominent, timeline indicator visible, content readable, animations subtle. Do **not** force the desktop alternating layout onto mobile if it hurts readability.

---

## 4. GOVERNANCE MAIN PAGE — MOBILE FIX

Structure: main Governance page (hero + section below + cards for governing bodies) and individual body detail pages. **Detail pages are fine on mobile. Desktop is fine. Only the MAIN page on MOBILE is broken.**

Problem on mobile: hero overlaps the start of the section below it (heading/text hides under the hero); some cards at the bottom extend under/behind the footer.

**Find the real root cause** — inspect fixed heights, `min-height`, absolute positioning, negative margins, `overflow`, transforms, z-index, `100vh` calcs, hero sizing, footer positioning, responsive spacing. **Do not** just add random padding/offsets. Restore proper responsive document flow. Must work at small mobile, large mobile, tablet, desktop. Nothing hidden behind hero/footer, clipped, or overflowing horizontally.

---

## 5. MBA & MCA PAGES — MOBILE RESPONSIVENESS

Desktop acceptable; **mobile has text cut off, image/text overlap, insufficient spacing, desktop-based layout assumptions.** Fix the **root layout model**, not superficial patches. Check typography, image sizing, aspect ratios, padding/margins, absolute positioning, fixed heights, overflow, flex/grid, animation transforms. If the desktop intentionally overlays text on an image and that becomes unreadable on mobile, **create a proper mobile adaptation** rather than shrinking the desktop layout. Don't redesign desktop unnecessarily.

---

## 6. GENERAL RULES (apply to every change)

1. Inspect existing implementation → understand it → find root cause → make the **smallest clean architectural change** → preserve functionality → preserve design language → verify desktop after mobile changes and vice-versa.
2. Don't blindly rewrite components. Don't duplicate a component when the existing one can be cleanly improved. Don't add unnecessary dependencies. Don't replace animation libraries/architecture without a real reason.
3. **Responsive bar** — consider 320 / 360 / 375 / 390 / 414 / 768 / 1024 / desktop. Watch: horizontal overflow, text clipping, overlapping sections, fixed heights, absolute positioning, negative margins, `100vh` assumptions, animation transforms, images escaping containers, footer overlap, buttons exceeding viewport, oversized type, too-narrow cards. Fix the underlying layout model, not with piles of breakpoint hacks.
4. **Performance** — do NOT regress the ~80% image optimization. Preserve optimized formats + Next.js image optimization; avoid loading large images, heavy deps, needless client components, expensive scroll listeners; prefer CSS over JS where possible; new animations must be performant on mobile.
5. **Design principle** — do NOT make it look AI-generated. Keep it institutional, premium, editorial, thoughtful, distinctive, human-designed.
6. **Never fabricate** college content (see §2 WAIT list).

---

## 7. FIRST STEP — INSPECT & REPORT (before coding)

Do targeted inspection (don't re-discover the whole project). Then briefly report:
1. Which files/components control the **LEAD Story milestone** interaction?
2. Which control the **Governance main page**?
3. Which control the **MBA / Management Studies** page?
4. Which control the **MCA / Computer Applications** page?
5. Where is the **Research "Distinguished PhD Award" designation** stored?
6. What appears to be causing the reported **mobile** issues (root cause per item)?
7. Proposed implementation approach for each.

Priority order for implementation: **1) LEAD Story  2) Governance mobile  3) MBA mobile  4) MCA mobile  5) Research designation**, then closely-related responsive bugs.

### Validate (actually do it — don't claim checks you didn't run)
Desktop + mobile + intermediate widths; horizontal overflow; animations; navigation; footer positioning; console/runtime errors; and the project's build / lint / type checks.

---

## 8. ENVIRONMENT NOTE (important — root cause of the earlier confusion)

- The project sits inside an **actively-syncing OneDrive folder** (`OneDrive - LevelShift\Desktop\...`). OneDrive's "Known Folder Move" left an empty stale copy at the old `C:\Users\kasinath_s\Desktop\...` path and has been creating **conflict-duplicate files** (e.g. `.env - Copy.local`, duplicated configs/public assets).
- **Recommended cleanup (list before deleting):** identify OneDrive conflict duplicates and remove them. Pay special attention to any `*.env*copy*` / `.env - Copy.local` — it may contain the **Sanity API token** and should not linger.
- **Recommended prevention:** pause OneDrive sync while developing, or move the project to a non-synced path (e.g. `C:\dev\lead-web`). Developing a Next.js app inside live OneDrive sync causes file locks and this kind of corruption.
