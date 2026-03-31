# Anthropic Editorial Redesign — index.html

**Date:** 2026-03-31
**Scope:** index.html only (project pages untouched)
**Approach:** Editorial Narrative (Approach A)
**Deployment target:** GitHub Pages (static, no build step)

---

## Overview

Reimagine Vrinda Parashar's portfolio homepage as a warm, editorial long-form story using Anthropic's brand identity. Replace the current dark, rose/teal/violet tech aesthetic with a light, sand-toned magazine-style layout driven by typography and whitespace.

**Why:** The current dark theme with spinning orb and particle canvas creates visual noise that distracts from Vrinda's story. An editorial approach lets the content lead — hiring managers read a narrative, not decode a dashboard.

---

## Design System

### CSS Custom Properties (single source of truth in `style.css`)

```css
:root {
  /* Colors */
  --bg: #faf9f5;
  --bg-card: #ffffff;
  --bg-subtle: #e8e6dc;
  --bg-dark: #141413;
  --text: #141413;
  --text-secondary: #6b6960;
  --text-muted: #b0aea5;
  --border: #e8e6dc;
  --accent-orange: #d97757;
  --accent-blue: #6a9bcc;
  --accent-green: #788c5d;

  /* RGB variants for rgba() usage */
  --bg-rgb: 250,249,245;
  --accent-orange-rgb: 217,119,87;
  --accent-blue-rgb: 106,155,204;
  --accent-green-rgb: 120,140,93;

  /* Typography */
  --font-heading: 'Poppins', Arial, sans-serif;
  --font-body: 'Lora', Georgia, serif;
  --font-mono: 'Space Mono', monospace;
}
```

**Rules:**
- Zero hardcoded color values in inline `<style>` blocks
- All inline styles in index.html move to style.css
- Every color reference uses a variable — no raw hex in component styles

### Font Loading

Replace current Google Fonts link (Cormorant Garamond + Syne + Space Mono) with:
```
Poppins (400, 600, 700)
Lora (400, 600, 700, 400i)
Space Mono (400, 700)
```
Keep `preconnect` hints for fonts.googleapis.com and fonts.gstatic.com.

---

## Section-by-Section Design

### 1. Navigation

- Fixed top, `rgba(250,249,245,.88)` background with backdrop blur (keep current pattern)
- Nav mark: Poppins italic, `#141413` (changes from current Cormorant Garamond serif to sans-serif)
- Nav links: Space Mono uppercase, `#b0aea5`, hover → `--accent-orange`
- Border bottom: `#e8e6dc`

### 2. Hero

**Remove entirely:**
- Canvas particle background (`#bgCanvas`)
- Data orb with spinning rings and stat chips
- Ticker strip (skill marquee at hero bottom)
- Marquee divider section (between hero and about)

**New hero layout:**
- Full viewport, `#faf9f5` background
- Single column, left-aligned text block with generous left padding
- Eyebrow: Space Mono, `#d97757`, text: **"Turning messy data into revenue decisions"**
- Name: Poppins bold, `#141413`, `clamp(4.5rem, 9vw, 8.5rem)` — "Vrinda Parashar"
- Role band: Poppins, white text on `#d97757` background, clip-path arrow shape (keep current)
- Description paragraph: Lora, `#6b6960`, bold terms in `#141413`
- CTA button: `#d97757` bg, white text, no glow/shadow on hover — subtle lift only
- Ghost link: `#e8e6dc` border, `#6b6960` text, hover → `--accent-blue`

**Key metrics row** (replaces stat chips):
- Horizontal bar below hero paragraph
- 3 stats: "2M+ Monthly Sessions · -15% RTO · +40% Prepaid Adoption"
- Stat values in Poppins bold, `#d97757`
- Labels in Space Mono, `#b0aea5`
- Thin `#e8e6dc` vertical dividers between stats

**Scroll animation:** Fade-up reveal only (`.reveal` class), no spinning/rotating animations.

### 3. About

**Layout:** Keep 2-column (portrait left, text right). Same structure.

**Changes:**
- Background: `#faf9f5` (page default)
- Section label "01 · About": Space Mono, `#d97757`
- Section title: Poppins bold, `#141413`, italic words in `#d97757`
- Portrait: `#e8e6dc` border, no dark overlay
- Portrait tag at bottom: `#141413` text, `#d97757` left-border accent, white bg (no glass)
- Education badge: `#e8e6dc` background, `#141413` text, orange icon bg
- Body text: Lora, `#6b6960`, bold in `#141413`
- Same 3 paragraphs — content unchanged

**Section divider:** Thin `#e8e6dc` line below About section.

### 4. Experience

**Layout:** Keep 2-column card structure (company left, details right).

**Changes:**
- Section background: `#ffffff` (cards) with outer area `#faf9f5`
- Cards: White bg, `#e8e6dc` 1px border
- Hover: Left border `#d97757`, background `rgba(217,119,87,.03)` — no gradient
- Company name: Poppins, `#141413`
- Period: Space Mono, `#d97757`
- Badges:
  - Current: `rgba(120,140,93,.1)` bg, `#788c5d` text/border
  - Promoted: `rgba(217,119,87,.1)` bg, `#d97757` text/border
  - Past: `rgba(176,174,165,.15)` bg, `#b0aea5` text
- Metric values: `#6a9bcc` (blue)
- Role title: Poppins, `#141413`
- Bullet dots: `#d97757`
- Bullet text: Lora, `#6b6960`, bold in `#141413`

### 5. Skills Mosaic

**Layout:** Keep 12-column grid with same column spans (w5, w4, w3, w6, w6).

**Changes:**
- Tiles: White bg, `#e8e6dc` gap borders
- Hover: `rgba(217,119,87,.03)`
- Category h4: Poppins, `#d97757` uppercase
- Description: Lora, `#6b6960`
- Emoji icons: Keep as-is
- Pills: `#e8e6dc` border, `#141413` text, hover → `#6a9bcc` border/text
- Watermark letters: `rgba(20,20,19,.03)`

### 6. Projects Grid

**Layout:** Keep 2x2 grid.

**Changes:**
- Cards: White bg, `#e8e6dc` borders
- Hover: `rgba(217,119,87,.03)`
- Top accent bar: Cycles orange → blue → green → orange
- Number watermarks: `rgba(20,20,19,.03)`
- Titles: Poppins, `#141413`
- Descriptions: Lora, `#6b6960`
- Tags: Unified style — `#e8e6dc` bg, `#141413` text (no per-card coloring)
- Outcome metrics: Space Mono, `#b0aea5`, bold in `#6a9bcc`
- CTA: `#d97757`, arrow shifts right on hover

### 7. Contact

**Layout:** Keep centered layout with watermark.

**Changes:**
- Background: `#ffffff` (slightly brighter than page)
- "Hello." watermark: `rgba(20,20,19,.04)`
- Heading: Poppins bold, `#141413`, italic in `#d97757`
- Subtext: Lora, `#6b6960`
- Email: Poppins, `#141413`, underline `#e8e6dc`, hover → `#d97757`
- Buttons: `#e8e6dc` border, `#6b6960` text, hover → `#d97757` bg + white text

### 8. Footer

- Background: `#faf9f5`
- Top border: `#e8e6dc`
- Text: Space Mono, `#b0aea5`

---

## What Gets Removed

- `<canvas id="bgCanvas">` and all particle JS
- `.hero-right` (orb, rings, chips)
- `.hero-ticker` (scrolling skill strip)
- `.marquee-divider` (word marquee between hero and about)
- All inline `<style>` in index.html (moves to style.css)
- `window.PARTICLE_COUNT` and `window.PARTICLE_LINES` script config

## What Stays

- All content/copy (text unchanged)
- Scroll reveal animation system (`.reveal` + IntersectionObserver)
- Responsive breakpoints (same structure, values adjusted)
- Reduced motion accessibility support
- All project card links to project-*.html pages
- main.js file (particle code removed, scroll reveal kept)
- style.css file (rebuilt with new design system)
- Portrait image (`public/vrinda-parashar.png`)

---

## GitHub Pages Deployment

- Purely static — no build step needed
- Create empty `.nojekyll` file in repo root
- Create `.gitignore` with: `.DS_Store`, `.claude/`, `.code-review-graph/`
- Track `public/` directory (contains portrait image — must be committed)
- All asset paths must be relative (no leading `/`)
- No server-side dependencies

---

## Implementation Checklist (from code review)

These issues were found by automated review and should be fixed during implementation:

### Accessibility
- Wrap all content sections in `<main>` landmark element
- Change `<div class="exp-section">` and `<div class="contact-wrap">` to `<section>`
- Add `aria-hidden="true"` to decorative emoji spans
- Add `rel="noopener noreferrer"` to all `target="_blank"` links

### Performance
- Add `width`, `height`, and `loading="lazy"` to portrait `<img>`
- Add favicon (`<link rel="icon">`)

### SEO
- Add `og:image`, `og:url` meta tags
- Add Twitter Card meta tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- Add `<link rel="canonical">`
