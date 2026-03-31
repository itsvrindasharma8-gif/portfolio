# Anthropic Editorial Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild index.html from a dark, particle-heavy tech aesthetic into a warm, light, editorial portfolio using Anthropic's brand identity — typography-driven storytelling with zero visual noise.

**Architecture:** Single-page static HTML/CSS/JS site. All styles move from inline `<style>` to a centralized CSS variable-driven design system in `style.css`. Canvas particles removed; scroll-reveal kept. Project pages untouched.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties), vanilla JS (IntersectionObserver). Google Fonts (Poppins, Lora, Space Mono). Deployed via GitHub Pages.

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `index.html` | Rewrite | Homepage with new semantic structure, no inline styles |
| `style.css` | Rewrite | Design system + all component styles (shared across pages) |
| `main.js` | Modify | Remove particle canvas code, keep scroll reveal |
| `.nojekyll` | Create | GitHub Pages bypass |
| `.gitignore` | Create | Exclude macOS/tool files |

Project pages (`project-*.html`) are NOT modified. The new `style.css` keeps their shared styles intact at the bottom.

---

### Task 1: GitHub Pages Foundation

**Files:**
- Create: `.nojekyll`
- Create: `.gitignore`

- [ ] **Step 1: Create `.nojekyll` file**

```bash
touch .nojekyll
```

- [ ] **Step 2: Create `.gitignore`**

```gitignore
.DS_Store
.claude/
.code-review-graph/
```

- [ ] **Step 3: Track the portrait image**

```bash
git add public/vrinda-parashar.png
```

- [ ] **Step 4: Commit**

```bash
git add .nojekyll .gitignore public/
git commit -m "infra: add .nojekyll, .gitignore, track portrait image for GitHub Pages"
```

---

### Task 2: Design System — CSS Variables + Reset

**Files:**
- Rewrite: `style.css` (lines 1–50)

This task creates the foundation. We replace ALL existing `style.css` content with the new design system variables and reset. Project page shared styles are re-added at the bottom of the file.

- [ ] **Step 1: Write the new design system and reset**

Replace the entire `style.css` with:

```css
/* === Anthropic Editorial Design System === */
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

/* === Reset === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  line-height: 1.6;
}

/* === Animations === */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1);
}
.reveal.in { opacity: 1; transform: none; }
.d1 { transition-delay: .1s; }
.d2 { transition-delay: .2s; }
.d3 { transition-delay: .3s; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(36px); }
  to { opacity: 1; transform: none; }
}

/* === Accessibility === */
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  * { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}

/* === Responsive Base === */
@media (max-width: 768px) {
  nav { padding: 1.5rem 2rem; }
  footer { padding: 2rem; flex-direction: column; gap: .5rem; text-align: center; }
}
```

- [ ] **Step 2: Verify no visual breakage yet**

At this point `style.css` has only the design system. The index.html still has its inline `<style>` which will continue to work. Project pages will lose their shared styles temporarily — this is expected. We fix this in Task 10.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "style: replace design system with Anthropic editorial variables and reset"
```

---

### Task 3: Rewrite main.js — Remove Particles, Keep Scroll Reveal

**Files:**
- Rewrite: `main.js`

- [ ] **Step 1: Replace main.js entirely**

```javascript
/* main.js — shared across all pages */
(function () {
  /* ── Scroll Reveal ── */
  var obs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

  /* ── Auto-discover Animation Observers ── */
  document.querySelectorAll('[data-anim-target]').forEach(function (container) {
    var target = container.dataset.animTarget;
    var prop = container.dataset.animProp || 'width';
    var attr = container.dataset.animAttr || 'w';
    var o = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.querySelectorAll(target).forEach(function (el) {
            el.style[prop] = (el.dataset[attr] || 0) + '%';
          });
          o.unobserve(e.target);
        }
      });
    }, { threshold: .3 });
    o.observe(container);
  });
})();
```

This removes: canvas particles, `PARTICLE_COLORS`, `PARTICLE_COUNT`, `PARTICLE_LINES`, all canvas drawing code.
This keeps: IntersectionObserver scroll reveal, auto-discover animation observers.

- [ ] **Step 2: Commit**

```bash
git add main.js
git commit -m "js: remove particle canvas, keep scroll reveal and animation observers"
```

---

### Task 4: Rewrite index.html — HTML Structure + Head

**Files:**
- Rewrite: `index.html`

This is the largest task. We rebuild the entire HTML with the new editorial structure. No inline `<style>` block. All content/copy stays identical.

- [ ] **Step 1: Write the complete new index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Vrinda Parashar — Data & Web Analyst specializing in GA4, Power BI, SQL, and e-commerce analytics.">
  <meta property="og:title" content="Vrinda Parashar · Data Analyst">
  <meta property="og:description" content="Data & Web Analyst specializing in GA4, Power BI, SQL, and e-commerce analytics.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://vrindaparashar.com/">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Vrinda Parashar · Data Analyst">
  <meta name="twitter:description" content="Data & Web Analyst specializing in GA4, Power BI, SQL, and e-commerce analytics.">
  <link rel="canonical" href="https://vrindaparashar.com/">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
  <title>Vrinda Parashar · Data Analyst</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>

<nav>
  <a href="index.html" class="nav-mark">Vrinda Parashar</a>
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<main>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-content">
      <div>
        <div class="hero-eyebrow"><span class="eyebrow-line"></span>Turning messy data into revenue decisions</div>
        <h1 class="hero-name">Vrinda<br>Parashar</h1>
        <div class="hero-band">Data Analyst · E-commerce Growth</div>
        <p class="hero-desc">Most analysts show you <strong>what</strong> happened. I find <strong>why</strong> — and what to do about it. At RedTape, that meant spotting a 36% checkout leak, cutting RTO by 15%, and building the dashboards that turned 2M+ monthly sessions into strategy.</p>
        <div class="hero-ctas">
          <a href="mailto:vrindaparashar2003@gmail.com" class="btn-primary">Let's Connect</a>
          <a href="https://linkedin.com/in/vrinda-parashar2024" target="_blank" rel="noopener noreferrer" class="btn-ghost">LinkedIn →</a>
        </div>
      </div>
      <div class="hero-metrics">
        <div class="metric-item">
          <span class="metric-val">2M+</span>
          <span class="metric-lbl">Monthly Sessions</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric-item">
          <span class="metric-val">-15%</span>
          <span class="metric-lbl">RTO Reduction</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric-item">
          <span class="metric-val">+40%</span>
          <span class="metric-lbl">Prepaid Adoption</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section class="section" id="about">
    <div class="sec-header reveal">
      <div class="sec-num">01 · About</div>
      <h2 class="sec-title">I ask <em>"so what?"</em><br>before anyone else</h2>
    </div>
    <div class="about-grid">
      <div class="about-left reveal">
        <div class="about-portrait">
          <img src="public/vrinda-parashar.png" alt="Vrinda Parashar" width="290" height="387" loading="lazy" />
          <div class="portrait-tag">
            <div class="pt-title">Vrinda Parashar</div>
            <div class="pt-sub">Data &amp; Web Analyst · Delhi</div>
          </div>
        </div>
        <div class="edu-badge">
          <div class="edu-icon" aria-hidden="true">🎓</div>
          <div>
            <div class="edu-deg">B.Sc. Computer Science (Hons)</div>
            <div class="edu-school">Calcutta University · 2021–2024</div>
          </div>
        </div>
      </div>
      <div class="about-text">
        <p class="reveal">I don't build dashboards for the sake of dashboards. I dig into messy transaction data — <strong>100K+ monthly records across 35K+ SKUs</strong> — to find the checkout leak nobody noticed, the RTO pattern eating into margins, and the prepaid incentive that actually shifts customer behaviour.</p>
        <p class="reveal d1">At <strong>RedTape Limited</strong>, my work spans 5+ brand websites generating 2M+ monthly sessions. The Power BI dashboards I built didn't just visualise data — they changed how the operations team made decisions: <strong>-15% RTO, +40% prepaid adoption, +17% inventory accuracy.</strong></p>
        <p class="reveal d2">My edge: I've done the operational work — cataloguing, SEO, marketplace management — so I understand the business context behind every dataset. I don't analyse in a vacuum. I ask "so what?" before anyone else has to.</p>
      </div>
    </div>
  </section>

  <!-- EXPERIENCE -->
  <section class="exp-section" id="experience">
    <div class="exp-inner">
      <div class="sec-header reveal">
        <div class="sec-num">02 · Experience</div>
        <h2 class="sec-title">Results I've <em>shipped,</em><br>not just reported</h2>
      </div>
      <div class="exp-cards">
        <div class="exp-card reveal">
          <div class="exp-left">
            <div class="exp-company">RedTape Limited</div>
            <div class="exp-period">Sep 2025 · Present</div>
            <span class="badge cur">Current Role</span>
            <div class="exp-metrics">
              <div class="metric"><span class="metric-val">2M+</span><span class="metric-lbl">Sessions/mo</span></div>
              <div class="metric"><span class="metric-val">35K+</span><span class="metric-lbl">SKUs</span></div>
            </div>
          </div>
          <div class="exp-right">
            <div class="exp-role">Data &amp; E-commerce Analyst · Website &amp; SEO Analytics — <em>promoted from Cataloguing Executive within 3 months</em></div>
            <ul class="exp-list">
              <li>Spotted a <strong>36% checkout drop-off</strong> no one had quantified; funnel analysis led to UI fixes that lifted conversion by 2.5%</li>
              <li>Built prepaid vs COD dashboards that <strong>shifted 40% of orders to prepaid</strong>, directly reducing RTO costs</li>
              <li>Extracted and segmented 100K+ monthly transaction records by payment type, geography, and behaviour using SQL</li>
              <li>Designed a 2-year Power BI sales dashboard across 1M+ transactions for seasonal forecasting and inventory planning</li>
              <li>Automated stock monitoring for fast-moving SKUs, eliminating reactive restocking decisions</li>
              <li>Analysed traffic and sales across 5+ brand websites generating 2M+ monthly sessions to identify revenue leaks</li>
            </ul>
          </div>
        </div>
        <div class="exp-card reveal d1">
          <div class="exp-left">
            <div class="exp-company">RedTape Limited</div>
            <div class="exp-period">Jul 2025 · Sep 2025</div>
            <span class="badge promoted">Promoted</span>
          </div>
          <div class="exp-right">
            <div class="exp-role">Cataloguing Executive · Marketplace Operations</div>
            <ul class="exp-list">
              <li>Managed product catalogues across Flipkart, Myntra, and major marketplaces — learned the operational side that most analysts never see</li>
              <li>This ground-level exposure to catalogue data, search ranking, and listing accuracy is what let me ask better questions later as an analyst</li>
              <li>Optimised product attributes and SEO to improve organic discoverability across platforms</li>
            </ul>
          </div>
        </div>
        <div class="exp-card reveal d2">
          <div class="exp-left">
            <div class="exp-company">The Chief Hustler</div>
            <div class="exp-period">Apr 2024 · Dec 2024</div>
            <span class="badge past">Remote</span>
            <div class="exp-metrics"><div class="metric"><span class="metric-val">+60%</span><span class="metric-lbl">Organic Sales</span></div></div>
          </div>
          <div class="exp-right">
            <div class="exp-role">E-commerce Operations Associate · Growth &amp; Analytics</div>
            <ul class="exp-list">
              <li>Grew organic sales on Amazon and Etsy by <strong>60%</strong> through listing optimisation and keyword strategy</li>
              <li>Built structured Excel reports that turned weekly guesswork into data-backed decisions</li>
              <li>Managed WordPress sites end-to-end — learnt to connect SEO, UX, and analytics into one picture</li>
              <li>Performed web analytics QA across JS, HTML, and tag implementations to validate event tracking accuracy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SKILLS -->
  <section class="section" id="skills">
    <div class="sec-header reveal">
      <div class="sec-num">03 · Skills</div>
      <h2 class="sec-title">How I <em>get to</em><br>the answer</h2>
    </div>
    <div class="skills-mosaic reveal">
      <div class="skill-tile w5">
        <span class="skill-tile-icon" aria-hidden="true">📊</span>
        <h4>Data Analysis &amp; Visualisation</h4>
        <p>Building intelligence dashboards that distil millions of rows into clear, actionable business decisions.</p>
        <div class="pills"><span class="pill">Power BI</span><span class="pill">Advanced Excel</span><span class="pill">Funnel Analysis</span><span class="pill">Sales Forecasting</span><span class="pill">Data Cleaning</span></div>
        <div class="skill-big">BI</div>
      </div>
      <div class="skill-tile w4">
        <span class="skill-tile-icon" aria-hidden="true">🌐</span>
        <h4>Web &amp; Product Analytics</h4>
        <p>GA4 event tracking, GTM implementation, and Search Console insights to optimise every digital touchpoint.</p>
        <div class="pills"><span class="pill">GA4</span><span class="pill">Google Tag Manager</span><span class="pill">Search Console</span></div>
        <div class="skill-big">GA4</div>
      </div>
      <div class="skill-tile w3">
        <span class="skill-tile-icon" aria-hidden="true">💻</span>
        <h4>Programming</h4>
        <div class="pills"><span class="pill">SQL (MySQL)</span><span class="pill">Python</span><span class="pill">Java</span><span class="pill">PHP</span><span class="pill">JavaScript</span></div>
        <div class="skill-big">&lt;/&gt;</div>
      </div>
      <div class="skill-tile w6">
        <span class="skill-tile-icon" aria-hidden="true">🛒</span>
        <h4>E-commerce &amp; Marketplaces</h4>
        <p>End-to-end marketplace management across India's biggest platforms — from listing to fulfilment analytics.</p>
        <div class="pills"><span class="pill">Shopify</span><span class="pill">Amazon Seller Central</span><span class="pill">Flipkart</span><span class="pill">Myntra</span><span class="pill">Etsy</span><span class="pill">WordPress</span></div>
      </div>
      <div class="skill-tile w6">
        <span class="skill-tile-icon" aria-hidden="true">🔍</span>
        <h4>SEO &amp; Growth</h4>
        <p>Keyword research, technical audits, and content optimisation strategies that compound over time.</p>
        <div class="pills"><span class="pill">SEMrush</span><span class="pill">Keyword Research</span><span class="pill">Meta Optimisation</span><span class="pill">Technical SEO</span><span class="pill">SERP Analysis</span></div>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section class="section" id="projects">
    <div class="sec-header reveal">
      <div class="sec-num">04 · Projects</div>
      <h2 class="sec-title">Work that <em>moved</em><br>the needle</h2>
    </div>
    <div class="projects-grid">

      <a href="project-funnel.html" class="proj-card reveal">
        <div class="proj-accent"></div>
        <div class="proj-num">01</div>
        <span class="proj-icon" aria-hidden="true">🔬</span>
        <h3>E-commerce Funnel &amp; Conversion Analysis</h3>
        <p>Analysed 100K+ transaction records to study user purchase behaviour. Identified checkout-stage drop-off using funnel segmentation with advanced SQL queries.</p>
        <div class="proj-stack"><span class="ptag">SQL</span><span class="ptag">Power BI</span><span class="ptag">Funnel Analysis</span><span class="ptag">Behavioural Segmentation</span></div>
        <div class="proj-result">Outcome: <strong>+2.5% conversion rate</strong> after targeted UI improvements</div>
        <div class="proj-cta">View Project <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </a>

      <a href="project-sales.html" class="proj-card reveal d1">
        <div class="proj-accent"></div>
        <div class="proj-num">02</div>
        <span class="proj-icon" aria-hidden="true">📈</span>
        <h3>Sales Forecasting &amp; Prepaid Order Optimisation</h3>
        <p>Built a 2-year historical sales dashboard across 1M+ transactions for seasonal forecasting, inventory optimisation, and RTO reduction.</p>
        <div class="proj-stack"><span class="ptag">Power BI</span><span class="ptag">Forecasting</span><span class="ptag">RTO Analysis</span><span class="ptag">Regional Segmentation</span></div>
        <div class="proj-result">Outcome: <strong>+40% prepaid · -15% RTO · +17% inventory accuracy</strong></div>
        <div class="proj-cta">View Project <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </a>

      <a href="project-inventory.html" class="proj-card reveal d2">
        <div class="proj-accent"></div>
        <div class="proj-num">03</div>
        <span class="proj-icon" aria-hidden="true">📦</span>
        <h3>Automated Inventory Monitoring Dashboard</h3>
        <p>Designed a dashboard to identify fast-selling SKUs and reduce stock-out risk through data-backed reorder timing insights for proactive inventory management.</p>
        <div class="proj-stack"><span class="ptag">Dashboard Design</span><span class="ptag">SKU Analysis</span><span class="ptag">Inventory Planning</span><span class="ptag">Automation</span></div>
        <div class="proj-result">Outcome: <strong>Eliminated reactive restocking decisions</strong></div>
        <div class="proj-cta">View Project <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </a>

      <a href="project-bakery.html" class="proj-card reveal d3">
        <div class="proj-accent"></div>
        <div class="proj-num">04</div>
        <span class="proj-icon" aria-hidden="true">🍰</span>
        <h3>Bakery Management System</h3>
        <p>Developed a full-stack database-driven ordering platform with backend order management, user authentication, and a fully responsive customer-facing interface from scratch.</p>
        <div class="proj-stack"><span class="ptag">PHP</span><span class="ptag">MySQL</span><span class="ptag">HTML/CSS</span><span class="ptag">JavaScript</span></div>
        <div class="proj-result">Outcome: <strong>End-to-end full-stack delivery</strong></div>
        <div class="proj-cta">View Project <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      </a>

    </div>
  </section>

  <!-- CONTACT -->
  <section class="contact-wrap" id="contact">
    <div class="contact-bg-txt">Hello.</div>
    <div class="contact-inner">
      <div class="sec-num reveal">05 · Contact</div>
      <h2 class="reveal">Have data?<br>Let's find <em>the story</em></h2>
      <p class="contact-sub reveal">I'm looking for a role where I can keep finding the narratives hiding in complex data — and turning them into revenue-moving decisions. If that sounds like what your team needs, let's talk.</p>
      <a href="mailto:vrindaparashar2003@gmail.com" class="c-email reveal">vrindaparashar2003@gmail.com</a>
      <div class="c-row reveal">
        <a href="tel:+919875395143" class="c-link">📞 +91 98753 95143</a>
        <a href="https://linkedin.com/in/vrinda-parashar2024" target="_blank" rel="noopener noreferrer" class="c-link">🔗 LinkedIn Profile</a>
      </div>
    </div>
  </section>

</main>

<footer>
  <p>© 2026 Vrinda Parashar · Built with care</p>
  <p>B.Sc. Computer Science (Hons) · Calcutta University</p>
</footer>

<script src="main.js"></script>
<noscript><style>.reveal{opacity:1;transform:none;transition:none}</style></noscript>
</body>
</html>
```

Key changes from original HTML:
- Removed: `<canvas id="bgCanvas">`, entire `<style>` block, `.hero-right` (orb/chips), `.hero-ticker`, `.marquee-divider`, `window.PARTICLE_COUNT/LINES` scripts
- Added: `<main>` wrapper, semantic `<section>` for experience/contact, `aria-hidden="true"` on emojis, `rel="noopener noreferrer"` on external links, `width`/`height`/`loading` on portrait img, favicon, canonical URL, OG/Twitter meta tags
- Changed: Hero eyebrow text, `<br>` in name instead of `.line2` span, hero metrics row replaces orb chips, Google Fonts URL updated to Poppins+Lora

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: rebuild index.html with Anthropic editorial structure — semantic, accessible, no inline styles"
```

---

### Task 5: Write Homepage Component Styles

**Files:**
- Append to: `style.css`

Now we add all the homepage component styles that were previously inline. These go after the design system in `style.css`.

- [ ] **Step 1: Append navigation styles**

```css
/* =============================================
   NAVIGATION
   ============================================= */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 5rem;
  background: rgba(var(--bg-rgb), .88);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-mark {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 600;
  color: var(--text);
  letter-spacing: .04em;
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}
.nav-links a {
  font-family: var(--font-mono);
  font-size: .62rem;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: .18em;
  text-transform: uppercase;
  transition: color .3s;
}
.nav-links a:hover { color: var(--accent-orange); }
```

- [ ] **Step 2: Append hero styles**

```css
/* =============================================
   HERO
   ============================================= */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10rem 5rem 4rem;
  position: relative;
  z-index: 2;
}
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: .65rem;
  color: var(--accent-orange);
  letter-spacing: .2em;
  text-transform: uppercase;
  margin-bottom: 1.8rem;
  animation: fadeUp .8s .2s both;
}
.eyebrow-line {
  width: 2.5rem;
  height: 1px;
  background: var(--accent-orange);
}
.hero-name {
  font-family: var(--font-heading);
  font-size: clamp(4.5rem, 9vw, 8.5rem);
  line-height: .95;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
  animation: fadeUp .9s .35s both;
}
.hero-band {
  display: inline-flex;
  align-items: center;
  background: var(--accent-orange);
  padding: .5rem 2.2rem .5rem 1.2rem;
  font-family: var(--font-heading);
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 2rem;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%);
  animation: fadeUp .8s .5s both;
}
.hero-desc {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--text-secondary);
  max-width: 560px;
  margin-bottom: 3rem;
  animation: fadeUp .8s .65s both;
}
.hero-desc strong { color: var(--text); font-weight: 600; }
.hero-ctas {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  animation: fadeUp .8s .8s both;
}
.btn-primary {
  display: inline-block;
  background: var(--accent-orange);
  color: #fff;
  padding: .9rem 2.2rem;
  font-family: var(--font-heading);
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: transform .3s;
}
.btn-primary:hover { transform: translateY(-2px); }
.btn-ghost {
  display: inline-block;
  color: var(--text-secondary);
  padding: .9rem 2rem;
  font-family: var(--font-mono);
  font-size: .65rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid var(--border);
  transition: all .3s;
}
.btn-ghost:hover { border-color: var(--accent-blue); color: var(--accent-blue); }

/* Hero Metrics Row */
.hero-metrics {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  animation: fadeUp .8s .9s both;
}
.metric-item { text-align: center; }
.metric-item .metric-val {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-orange);
  display: block;
}
.metric-item .metric-lbl {
  font-family: var(--font-mono);
  font-size: .55rem;
  color: var(--text-muted);
  letter-spacing: .1em;
  text-transform: uppercase;
}
.metric-divider {
  width: 1px;
  height: 2.5rem;
  background: var(--border);
}
```

- [ ] **Step 3: Append section shared styles**

```css
/* =============================================
   SHARED SECTION
   ============================================= */
.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 5rem;
  position: relative;
  z-index: 1;
}
.sec-num {
  font-family: var(--font-mono);
  font-size: .6rem;
  color: var(--accent-orange);
  letter-spacing: .2em;
  display: flex;
  align-items: center;
  gap: .8rem;
  margin-bottom: 1rem;
}
.sec-num::before {
  content: '';
  width: 1.5rem;
  height: 1px;
  background: var(--accent-orange);
}
.sec-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--text);
}
.sec-title em { font-style: italic; color: var(--accent-orange); }
.sec-header { margin-bottom: 4rem; }
```

- [ ] **Step 4: Append about styles**

```css
/* =============================================
   ABOUT
   ============================================= */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 6rem;
  align-items: start;
  margin-top: 3rem;
}
.about-left { position: sticky; top: 8rem; }
.about-portrait {
  width: 100%;
  aspect-ratio: 3/4;
  max-width: 290px;
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
.about-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.portrait-tag {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  background: var(--bg-card);
  padding: 1rem;
  border-left: 2px solid var(--accent-orange);
}
.pt-title {
  font-family: var(--font-heading);
  font-size: .78rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: .04em;
}
.pt-sub {
  font-family: var(--font-mono);
  font-size: .6rem;
  color: var(--accent-orange);
  margin-top: .25rem;
}
.edu-badge {
  margin-top: 1.5rem;
  background: var(--bg-subtle);
  padding: 1.4rem;
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
.edu-icon {
  width: 46px;
  height: 46px;
  background: rgba(var(--accent-orange-rgb), .1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.edu-deg {
  font-family: var(--font-heading);
  font-size: .82rem;
  font-weight: 700;
  color: var(--text);
}
.edu-school {
  font-family: var(--font-mono);
  font-size: .6rem;
  color: var(--text-muted);
  letter-spacing: .06em;
  margin-top: .3rem;
}
.about-text p {
  font-family: var(--font-body);
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.9;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}
.about-text p strong { color: var(--text); font-weight: 600; }
```

- [ ] **Step 5: Append experience styles**

```css
/* =============================================
   EXPERIENCE
   ============================================= */
.exp-section {
  background: var(--bg-card);
  margin: 0;
  max-width: 100%;
}
.exp-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 5rem;
}
.exp-cards {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--border);
  margin-top: 4rem;
}
.exp-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  display: grid;
  grid-template-columns: 270px 1fr;
  position: relative;
  overflow: hidden;
  transition: border-color .4s, background .4s;
  cursor: default;
}
.exp-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent-orange);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform .5s cubic-bezier(.4,0,.2,1);
}
.exp-card:hover {
  border-color: rgba(var(--accent-orange-rgb), .2);
  background: rgba(var(--accent-orange-rgb), .02);
}
.exp-card:hover::before { transform: scaleY(1); }
.exp-left {
  padding: 2.5rem;
  border-right: 1px solid var(--border);
}
.exp-company {
  font-family: var(--font-heading);
  font-size: 1.55rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: .35rem;
}
.exp-period {
  font-family: var(--font-mono);
  font-size: .6rem;
  color: var(--accent-orange);
  letter-spacing: .1em;
  margin-bottom: 1.2rem;
}
.badge {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: .6rem;
  font-weight: 700;
  padding: .3rem .8rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.badge.cur {
  background: rgba(var(--accent-green-rgb), .1);
  border: 1px solid rgba(var(--accent-green-rgb), .3);
  color: var(--accent-green);
}
.badge.promoted {
  background: rgba(var(--accent-orange-rgb), .1);
  border: 1px solid rgba(var(--accent-orange-rgb), .3);
  color: var(--accent-orange);
}
.badge.past {
  background: rgba(var(--text-muted), .15);
  border: 1px solid rgba(var(--text-muted), .3);
  color: var(--text-muted);
}
.exp-metrics {
  display: flex;
  gap: .75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}
.exp-metrics .metric {
  background: var(--bg-subtle);
  padding: .5rem .9rem;
}
.exp-metrics .metric-val {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-blue);
  display: block;
}
.exp-metrics .metric-lbl {
  font-family: var(--font-mono);
  font-size: .52rem;
  color: var(--text-muted);
  letter-spacing: .07em;
  text-transform: uppercase;
}
.exp-right { padding: 2.5rem; }
.exp-role {
  font-family: var(--font-heading);
  font-size: .95rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.4rem;
}
.exp-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .7rem;
}
.exp-list li {
  display: grid;
  grid-template-columns: 8px 1fr;
  gap: .9rem;
  font-family: var(--font-body);
  font-size: .9rem;
  line-height: 1.72;
  color: var(--text-secondary);
}
.exp-list li::before {
  content: '';
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-orange);
  margin-top: .68rem;
  flex-shrink: 0;
}
.exp-list li strong { color: var(--text); font-weight: 600; }
```

- [ ] **Step 6: Append skills styles**

```css
/* =============================================
   SKILLS MOSAIC
   ============================================= */
.skills-mosaic {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1px;
  background: var(--border);
  margin-top: 3.5rem;
}
.skill-tile {
  background: var(--bg-card);
  padding: 2rem;
  transition: background .3s;
  position: relative;
  overflow: hidden;
}
.skill-tile:hover { background: rgba(var(--accent-orange-rgb), .03); }
.skill-tile.w5 { grid-column: span 5; }
.skill-tile.w4 { grid-column: span 4; }
.skill-tile.w3 { grid-column: span 3; }
.skill-tile.w6 { grid-column: span 6; }
.skill-tile h4 {
  font-family: var(--font-heading);
  font-size: .68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .15em;
  color: var(--accent-orange);
  margin-bottom: .7rem;
}
.skill-tile p {
  font-family: var(--font-body);
  font-size: .9rem;
  color: var(--text-secondary);
  line-height: 1.7;
}
.skill-tile-icon {
  font-size: 1.7rem;
  margin-bottom: .9rem;
  display: block;
}
.skill-big {
  font-family: var(--font-heading);
  font-size: 5rem;
  font-weight: 700;
  color: rgba(var(--bg-dark), .03);
  position: absolute;
  bottom: -1rem;
  right: .8rem;
  line-height: 1;
  pointer-events: none;
}
.pills {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin-top: .75rem;
}
.pill {
  font-family: var(--font-mono);
  font-size: .72rem;
  font-weight: 700;
  padding: .38rem .85rem;
  border: 1px solid var(--border);
  color: var(--text);
  letter-spacing: .05em;
  transition: all .2s;
  background: var(--bg-subtle);
}
.pill:hover {
  border-color: var(--accent-blue);
  color: var(--accent-blue);
  background: rgba(var(--accent-blue-rgb), .06);
}
```

- [ ] **Step 7: Append projects styles**

```css
/* =============================================
   PROJECTS
   ============================================= */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  margin-top: 3.5rem;
}
.proj-card {
  background: var(--bg-card);
  padding: 2.8rem;
  position: relative;
  overflow: hidden;
  transition: background .3s;
  cursor: pointer;
  text-decoration: none;
  display: block;
  color: inherit;
}
.proj-card:hover { background: rgba(var(--accent-orange-rgb), .03); }
.proj-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
}
.proj-card:nth-child(1) .proj-accent { background: var(--accent-orange); }
.proj-card:nth-child(2) .proj-accent { background: var(--accent-blue); }
.proj-card:nth-child(3) .proj-accent { background: var(--accent-green); }
.proj-card:nth-child(4) .proj-accent { background: var(--accent-orange); }
.proj-num {
  font-family: var(--font-heading);
  font-size: 5.5rem;
  font-weight: 700;
  color: rgba(var(--bg-dark), .03);
  position: absolute;
  top: .2rem;
  right: 1.2rem;
  line-height: 1;
  pointer-events: none;
}
.proj-icon {
  font-size: 1.8rem;
  margin-bottom: 1.4rem;
  display: block;
}
.proj-card h3 {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: .7rem;
  line-height: 1.25;
}
.proj-card p {
  font-family: var(--font-body);
  font-size: .9rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.4rem;
}
.proj-stack {
  display: flex;
  gap: .38rem;
  flex-wrap: wrap;
}
.ptag {
  font-family: var(--font-mono);
  font-size: .56rem;
  padding: .24rem .62rem;
  letter-spacing: .05em;
  background: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text);
}
.proj-result {
  margin-top: 1.4rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: .6rem;
  color: var(--text-muted);
  letter-spacing: .07em;
}
.proj-result strong { color: var(--accent-blue); }
.proj-cta {
  display: flex;
  align-items: center;
  gap: .5rem;
  margin-top: 1.2rem;
  font-family: var(--font-mono);
  font-size: .6rem;
  color: var(--accent-orange);
  letter-spacing: .1em;
  text-transform: uppercase;
}
.proj-cta svg { transition: transform .3s; }
.proj-card:hover .proj-cta svg { transform: translateX(4px); }
```

- [ ] **Step 8: Append contact styles**

```css
/* =============================================
   CONTACT
   ============================================= */
.contact-wrap {
  background: var(--bg-card);
  color: var(--text);
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact-bg-txt {
  position: absolute;
  font-family: var(--font-heading);
  font-size: 24vw;
  font-weight: 700;
  font-style: italic;
  color: rgba(var(--bg-dark), .04);
  white-space: nowrap;
  pointer-events: none;
  bottom: -3rem;
  left: 50%;
  transform: translateX(-50%);
  line-height: 1;
}
.contact-inner {
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 6rem 2rem;
}
.contact-inner .sec-num {
  color: var(--accent-orange);
  justify-content: center;
}
.contact-inner .sec-num::before { background: var(--accent-orange); }
.contact-inner h2 {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 700;
  line-height: 1;
  color: var(--text);
  margin-bottom: 1rem;
}
.contact-inner h2 em { font-style: italic; color: var(--accent-orange); }
.contact-sub {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto 2.5rem;
}
.c-email {
  display: block;
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2.5vw, 1.8rem);
  font-weight: 400;
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  padding-bottom: .5rem;
  transition: color .3s;
  margin-bottom: 2rem;
}
.c-email:hover { color: var(--accent-orange); }
.c-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.c-link {
  display: flex;
  align-items: center;
  gap: .6rem;
  font-family: var(--font-mono);
  font-size: .65rem;
  color: var(--text-secondary);
  text-decoration: none;
  letter-spacing: .1em;
  padding: .85rem 1.5rem;
  border: 1px solid var(--border);
  transition: all .3s;
}
.c-link:hover {
  background: var(--accent-orange);
  color: #fff;
  border-color: var(--accent-orange);
}
```

- [ ] **Step 9: Append footer styles**

```css
/* =============================================
   FOOTER
   ============================================= */
footer {
  background: var(--bg);
  padding: 2rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border);
}
footer p {
  font-family: var(--font-mono);
  font-size: .6rem;
  color: var(--text-muted);
  letter-spacing: .1em;
}
```

- [ ] **Step 10: Append homepage responsive styles**

```css
/* =============================================
   HOMEPAGE RESPONSIVE
   ============================================= */
@media (max-width: 960px) {
  nav { padding: 1.5rem 2rem; }
  .hero-content { padding: 8rem 2rem 3rem; }
  .hero-metrics { flex-direction: column; gap: 1rem; }
  .metric-divider { width: 2.5rem; height: 1px; }
  .section { padding: 5rem 2rem; }
  .about-grid { grid-template-columns: 1fr; gap: 3rem; }
  .about-left { position: static; }
  .exp-inner { padding: 5rem 2rem; }
  .exp-card { grid-template-columns: 1fr; }
  .exp-left { border-right: none; border-bottom: 1px solid var(--border); }
  .skill-tile { grid-column: span 12 !important; }
  .projects-grid { grid-template-columns: 1fr; }
  footer { padding: 2rem; flex-direction: column; gap: .5rem; text-align: center; }
}
```

- [ ] **Step 11: Commit**

```bash
git add style.css
git commit -m "style: add all homepage component styles using Anthropic editorial design system"
```

---

### Task 6: Add Project Page Shared Styles Back

**Files:**
- Append to: `style.css`

The project pages (`project-*.html`) still need their shared styles. These come from the original `style.css` bottom section, updated to use the new design system variables where applicable.

- [ ] **Step 1: Append project page shared styles**

```css
/* =============================================
   PROJECT PAGE SHARED STYLES
   (used by project-*.html pages)
   ============================================= */

/* === Project Hero === */
.proj-hero {
  min-height: 55vh;
  display: flex;
  align-items: flex-end;
  padding: 9rem 5rem 5rem;
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
}
.proj-hero-bg { position: absolute; inset: 0; }
.proj-eyebrow {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: .62rem;
  color: var(--accent-orange);
  letter-spacing: .2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  animation: fadeUp .8s .2s both;
}
.proj-eyebrow-line { width: 2rem; height: 1px; background: var(--accent-orange); }
.proj-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 700;
  line-height: 1;
  color: var(--text);
  margin-bottom: 1.5rem;
  animation: fadeUp .9s .35s both;
}
.proj-title em { font-style: italic; color: var(--accent-orange); }
.proj-tags { display: flex; gap: .5rem; flex-wrap: wrap; animation: fadeUp .8s .5s both; }

/* === Project Body === */
.proj-body { max-width: 1100px; margin: 0 auto; padding: 6rem 5rem; position: relative; z-index: 1; }
.proj-section { margin-bottom: 5rem; }
.proj-section-label {
  font-family: var(--font-mono);
  font-size: .6rem;
  color: var(--accent-orange);
  letter-spacing: .2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: .8rem;
  margin-bottom: 1.5rem;
}
.proj-section-label::before { content: ''; width: 1.5rem; height: 1px; background: var(--accent-orange); }
.proj-section h2 {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1.5rem;
  line-height: 1.15;
}
.proj-section p {
  font-family: var(--font-body);
  font-size: 1.12rem;
  line-height: 1.9;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
}
.proj-section p strong { color: var(--text); font-weight: 600; }

/* === Metrics Row === */
.metrics-row {
  display: grid;
  gap: 1px;
  background: var(--border);
  margin: 3rem 0;
  animation: fadeUp .8s .4s both;
}
.metric-block { background: var(--bg-card); padding: 2rem; text-align: center; }
.metric-big {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent-orange);
  display: block;
  line-height: 1;
}
.metric-desc {
  font-family: var(--font-mono);
  font-size: .58rem;
  color: var(--text-muted);
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-top: .5rem;
  display: block;
}

/* === Insight Cards === */
.insight-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); margin: 2rem 0; }
.insight-card { background: var(--bg-card); padding: 2rem; border-top: 2px solid; }
.insight-card h4 { font-family: var(--font-heading); font-size: .78rem; font-weight: 700; color: var(--text); margin-bottom: .7rem; }
.insight-card p { font-family: var(--font-body); font-size: 1rem; color: var(--text-secondary); line-height: 1.75; }

/* === Outcome Block === */
.outcome-block {
  background: rgba(var(--accent-orange-rgb), .04);
  border: 1px solid rgba(var(--accent-orange-rgb), .15);
  padding: 3rem;
  margin: 2rem 0;
  position: relative;
}
.outcome-block::before {
  content: 'OUTCOME';
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-family: var(--font-mono);
  font-size: .55rem;
  color: rgba(var(--accent-orange-rgb), .3);
  letter-spacing: .2em;
}
.outcome-block h3 { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 600; color: var(--text); margin-bottom: .8rem; }
.outcome-block p { font-family: var(--font-body); font-size: 1.1rem; line-height: 1.85; color: var(--text-secondary); }

/* === Project Navigation === */
.proj-nav { display: flex; justify-content: space-between; align-items: center; padding: 3rem 0; border-top: 1px solid var(--border); margin-top: 4rem; }
.proj-nav a {
  font-family: var(--font-mono);
  font-size: .65rem;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: .1em;
  text-transform: uppercase;
  transition: color .3s;
  display: flex;
  align-items: center;
  gap: .5rem;
}
.proj-nav a:hover { color: var(--accent-orange); }
.proj-nav .next-proj h4 { font-family: var(--font-heading); font-size: 1.3rem; font-weight: 600; color: var(--text); margin-top: .4rem; text-align: right; }

/* === Project Page Responsive === */
@media (max-width: 768px) {
  .proj-hero { padding: 8rem 2rem 4rem; }
  .proj-body { padding: 4rem 2rem; }
  .metrics-row { grid-template-columns: 1fr 1fr; }
  .insight-grid { grid-template-columns: 1fr; }
  .proj-nav { flex-direction: column; gap: 2rem; }
}
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "style: add project page shared styles back with new design system variables"
```

---

### Task 7: Visual Verification and Final Polish

**Files:**
- Potentially tweak: `style.css`, `index.html`

- [ ] **Step 1: Open index.html in browser and verify**

Open `index.html` locally in a browser. Check:
- [ ] Navigation is fixed, blurred, warm background
- [ ] Hero has light sand background, no particles, no orb
- [ ] Eyebrow says "Turning messy data into revenue decisions"
- [ ] Name renders large in Poppins, dark on light
- [ ] Metrics row shows 3 stats with dividers below hero paragraph
- [ ] About section: portrait with light border, text in Lora
- [ ] Experience: white cards with light borders, orange hover accent
- [ ] Skills: white tiles, orange headings, unified pills
- [ ] Projects: white cards, cycling accent bars (orange/blue/green/orange)
- [ ] Contact: white background, centered, "Hello." watermark barely visible
- [ ] Footer: sand background, muted text
- [ ] All links work (email, LinkedIn, project pages)
- [ ] Scroll reveal animations fire correctly
- [ ] Reduced motion: enable in OS settings, verify no animations

- [ ] **Step 2: Fix any visual issues found**

Address spacing, color, or layout issues discovered during verification. Commit any fixes.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: visual polish and final adjustments for Anthropic editorial redesign"
```

---

## Self-Review

**1. Spec coverage check:**

| Spec Section | Plan Task | Status |
|---|---|---|
| CSS Custom Properties design system | Task 2 | Covered |
| Font Loading (Poppins, Lora, Space Mono) | Task 4 (head) | Covered |
| Navigation | Task 5 (nav styles) | Covered |
| Hero (remove orb/ticker/marquee, add metrics row) | Task 4 (HTML) + Task 5 (styles) | Covered |
| About section | Task 4 (HTML) + Task 5 (styles) | Covered |
| Experience section | Task 4 (HTML) + Task 5 (styles) | Covered |
| Skills mosaic | Task 4 (HTML) + Task 5 (styles) | Covered |
| Projects grid | Task 4 (HTML) + Task 5 (styles) | Covered |
| Contact section | Task 4 (HTML) + Task 5 (styles) | Covered |
| Footer | Task 4 (HTML) + Task 5 (styles) | Covered |
| Remove canvas particles | Task 3 (JS) + Task 4 (HTML) | Covered |
| Move inline styles to style.css | Task 5 (all component styles) | Covered |
| `<main>` landmark | Task 4 (HTML) | Covered |
| `<section>` for experience/contact | Task 4 (HTML) | Covered |
| `aria-hidden` on emojis | Task 4 (HTML) | Covered |
| `rel="noopener noreferrer"` | Task 4 (HTML) | Covered |
| `width`/`height`/`loading` on portrait | Task 4 (HTML) | Covered |
| Favicon | Task 4 (HTML) | Covered |
| OG/Twitter meta tags | Task 4 (HTML) | Covered |
| Canonical URL | Task 4 (HTML) | Covered |
| `.nojekyll` file | Task 1 | Covered |
| `.gitignore` | Task 1 | Covered |
| Track `public/` | Task 1 | Covered |
| Project page shared styles preserved | Task 6 | Covered |

**2. Placeholder scan:** No TBDs, TODOs, or "implement later" found. All steps have complete code.

**3. Type consistency:** CSS class names referenced in HTML (Task 4) match those defined in styles (Task 5). Verified: `.hero-metrics`, `.metric-item`, `.metric-divider`, `.metric-item .metric-val`, `.metric-item .metric-lbl`, `.btn-primary`, `.btn-ghost`, all other class names carry over from original with consistent naming.
