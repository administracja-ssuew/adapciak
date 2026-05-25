# Phase 1: Animacje — Research

**Researched:** 2026-05-25
**Domain:** Vanilla JS animations — countdown timer, CSS parallax, IntersectionObserver counters, DOM text update
**Confidence:** HIGH

---

## Summary

Phase 1 adds an animation layer to an already-working single-file HTML page. The page is a brownfield
improvement: existing JS uses IntersectionObserver for `.reveal` elements and a `navObs` for active nav
links. Both observers must co-exist with new animation code without touching the same DOM targets or
sharing state.

All four requirements are achievable with zero external dependencies. The most technically nuanced task
is ANIM-02 (parallax): CSS-only `background-attachment: fixed` is the best-performing and safest
cross-browser choice for the background image, while the logo element can use a passive scroll listener
with `requestAnimationFrame` throttling. A new "Liczby" stats section must be inserted between hero and
"O wydarzeniu" to satisfy ANIM-03.

**Primary recommendation:** Write all new code as self-contained vanilla JS appended to the existing
`<script>` block. Keep CSS additions inside the existing `<style>` block. Insert the stats section in
exactly one location (line ~218 in index.html, after `</section>` of the hero). Touch the badge text
at line 200 and nothing else for ANIM-04.

---

## Project Constraints (from CLAUDE.md)

- Single `index.html` file — no npm, no bundler, no node_modules
- All JS must be inline in the same HTML file
- Tailwind CDN already loaded (`https://cdn.tailwindcss.com?plugins=forms,container-queries`)
- No heavy external libraries (particle.js, GSAP, etc. are out)
- Must work on: Chrome, Firefox, Safari, Edge, iOS Safari, Android Chrome
- Hosting: Vercel static — no server-side logic

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANIM-01 | Countdown timer (days/hours/min/sec) to 30.08.2026, updates every second, in or below hero | `setInterval` + `Date` diff; four `<span>` elements updated in-place |
| ANIM-02 | Logo and hero background move with parallax on scroll | `background-attachment: fixed` for bg; passive scroll listener + `translateY` for logo |
| ANIM-03 | Numbers in stats section animate 0 → target value when section enters viewport | New stats section HTML required; second IntersectionObserver separate from `revealObs` |
| ANIM-04 | Hero badge text changes from "TBA 2025 • WROCŁAW • UEW" to "30.08–06.09.2026 • WROCŁAW • UEW" | One-line text change at line 200 of index.html |
</phase_requirements>

---

## Standard Stack

### Core — already in the file, no installs needed

| Tool | Source | Purpose |
|------|--------|---------|
| Vanilla JS ES6 | inline `<script>` | All animation logic |
| CSS custom properties / transitions | inline `<style>` | Parallax, counter reveal |
| `IntersectionObserver` | browser built-in | Triggering counter animation; already used for `.reveal` |
| `setInterval` | browser built-in | Countdown timer tick |
| `requestAnimationFrame` | browser built-in | Scroll throttle for parallax logo |
| Tailwind CDN | already loaded | Stats section layout classes |

### No external libraries needed

Everything required is already available in modern browsers. No CDN links need to be added.

---

## Architecture Patterns

### Existing JS structure (must integrate with)

```
<script>
  /* Hamburger menu */
  /* Scroll reveal — IntersectionObserver: revealObs */
  /* Active nav link — IntersectionObserver: navObs */
  /* Form placeholder: handleFormSubmit() */
</script>
```

New code appends four independent blocks **after** the existing code:

```
<script>
  /* ... existing ... */

  /* ─── ANIM-04: Badge date text ─── */
  /* ─── ANIM-01: Countdown timer ─── */
  /* ─── ANIM-02: Parallax ─── */
  /* ─── ANIM-03: Number counters ─── */
</script>
```

### Pattern 1: Countdown Timer (ANIM-01)

**What:** Compute `Math.floor((target - now) / unit)` for each unit; write to four pre-named `<span>` elements. Run via `setInterval(tick, 1000)` and call `tick()` immediately on load to avoid 1-second blank flash.

**Target date:** `new Date('2026-08-30T00:00:00')` — local time is fine (event is in Poland, visitors are Polish students).

**HTML to insert** (inside the hero `<div class="relative z-10 ...">`, after the CTA buttons div):

```html
<!-- ANIM-01 countdown -->
<div id="countdown" class="flex gap-6 mt-6 reveal reveal-delay-4">
  <div class="flex flex-col items-center">
    <span id="cd-days" class="font-display-hero text-display-hero text-white" style="font-size:56px;line-height:1;">00</span>
    <span class="font-section-label text-section-label text-primary uppercase">Dni</span>
  </div>
  <div class="flex flex-col items-center">
    <span id="cd-hours" class="font-display-hero text-display-hero text-white" style="font-size:56px;line-height:1;">00</span>
    <span class="font-section-label text-section-label text-primary uppercase">Godz</span>
  </div>
  <div class="flex flex-col items-center">
    <span id="cd-mins" class="font-display-hero text-display-hero text-white" style="font-size:56px;line-height:1;">00</span>
    <span class="font-section-label text-section-label text-primary uppercase">Min</span>
  </div>
  <div class="flex flex-col items-center">
    <span id="cd-secs" class="font-display-hero text-display-hero text-white" style="font-size:56px;line-height:1;">00</span>
    <span class="font-section-label text-section-label text-primary uppercase">Sek</span>
  </div>
</div>
```

**JS pattern:**

```javascript
// Source: MDN Date, verified against browser APIs
(function initCountdown() {
  const TARGET = new Date('2026-08-30T00:00:00');
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs'),
  };
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      Object.values(els).forEach(el => el.textContent = '00');
      return;
    }
    const totalSec = Math.floor(diff / 1000);
    els.d.textContent = pad(Math.floor(totalSec / 86400));
    els.h.textContent = pad(Math.floor((totalSec % 86400) / 3600));
    els.m.textContent = pad(Math.floor((totalSec % 3600) / 60));
    els.s.textContent = pad(totalSec % 60);
  }
  tick();
  setInterval(tick, 1000);
})();
```

**Confidence:** HIGH — standard pattern, nothing framework-specific.

---

### Pattern 2: Parallax (ANIM-02)

**What:** Two separate effects — background image parallax and logo parallax.

**Background image parallax — CSS-only approach:**

```css
/* Add to existing <style> block */
#start {
  background-attachment: fixed;
}
```

`background-attachment: fixed` causes the background to scroll at viewport speed (fixed to the viewport), creating the appearance of slower movement relative to page content. This is GPU-accelerated on desktop browsers.

**Mobile caveat (CRITICAL):** iOS Safari and most Android browsers do NOT support `background-attachment: fixed` on elements with `background-size: cover`. It either renders incorrectly or falls back to `scroll`. The safe mobile strategy is to disable it on touch devices:

```css
@media (hover: none) {
  /* touch/mobile devices: disable fixed attachment */
  #start { background-attachment: scroll; }
}
```

`hover: none` is the correct media query for touch-only devices. Confidence: HIGH — this is a documented iOS Safari limitation.

**Logo parallax — JS scroll listener:**

The logo is `<img src="./ADAPCIAK_LOGO.png" ... class="logo-blend mx-auto">` inside a `reveal reveal-delay-1` div. Parallax on logo requires inline `transform: translateY(...)` applied via JS.

Key constraints:
- Must not interfere with the `reveal` class opacity/transform transition that runs on first load
- Use `requestAnimationFrame` throttling to avoid scroll jank
- Apply only when hero section is in viewport (no wasted work)

```javascript
// Source: MDN scroll events + rAF throttling pattern
(function initParallax() {
  const hero = document.getElementById('start');
  const logo = hero.querySelector('.logo-blend');
  let ticking = false;

  function applyParallax() {
    const scrollY = window.scrollY;
    const heroH = hero.offsetHeight;
    if (scrollY > heroH) return; // outside hero, skip
    // Logo moves at ~40% of scroll speed
    logo.style.transform = 'translateY(' + (scrollY * 0.4) + 'px)';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }, { passive: true }); // passive: true = no scroll blocking
})();
```

**Anti-pattern to avoid:** Setting `transform` on the `.reveal` div itself — the `.reveal` CSS already uses `transform: translateY(36px)` in its initial state, which would conflict. Apply parallax to the `<img>` element directly, not the wrapper div.

**Confidence:** HIGH for CSS background, HIGH for JS logo pattern.

---

### Pattern 3: Stats Section + Number Counters (ANIM-03)

**What:** A new section must be added to the HTML (the page currently has NO stats section). Insert between hero `</section>` (line 217) and the `<!-- O WYDARZENIU -->` comment (line 222).

**Stats section HTML:**

```html
<!-- ══════════════════════════════════════════════════════
     LICZBY — stats strip
══════════════════════════════════════════════════════ -->
<section id="liczby" class="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-b border-surface-border">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-3 gap-gutter text-center">

      <div class="reveal flex flex-col items-center gap-2">
        <span class="font-display-hero text-white" style="font-size:64px;line-height:1;">
          <span class="counter" data-target="6">0</span>
        </span>
        <span class="font-section-label text-section-label text-primary uppercase">Edycji</span>
      </div>

      <div class="reveal reveal-delay-1 flex flex-col items-center gap-2">
        <span class="font-display-hero text-white" style="font-size:64px;line-height:1;">
          <span class="counter" data-target="500">0</span><span class="text-primary">+</span>
        </span>
        <span class="font-section-label text-section-label text-primary uppercase">Uczestników</span>
      </div>

      <div class="reveal reveal-delay-2 flex flex-col items-center gap-2">
        <span class="font-display-hero text-white" style="font-size:64px;line-height:1;">
          <span class="counter" data-target="3">0</span>
        </span>
        <span class="font-section-label text-section-label text-primary uppercase">Sceny</span>
      </div>

    </div>
  </div>
</section>
```

**Counter animation — separate IntersectionObserver:**

The existing `revealObs` is limited to `.reveal` elements and adds class `visible`. A separate observer for `.counter` elements avoids any coupling. The counter observer `unobserve`s after firing (same pattern as `revealObs`).

```javascript
// Source: MDN IntersectionObserver API
(function initCounters() {
  const DURATION = 1800; // ms

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      // easeOutQuart for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));
})();
```

**Integration with existing `revealObs`:** No conflict. `revealObs` targets `.reveal` elements (the wrapper divs). `counterObs` targets `.counter` spans inside those wrappers. They observe different DOM nodes, run independently, and both call `unobserve` after firing. The `.reveal` animation plays slightly before the counter hits 50% viewport threshold, so the number appears with the fade-in — correct UX sequencing.

**Confidence:** HIGH.

---

### Pattern 4: Badge Date Update (ANIM-04)

**What:** One-line text change. Line 200 of index.html:

```html
<!-- BEFORE -->
<span class="font-section-label text-section-label text-primary uppercase">TBA 2025 • WROCŁAW • UEW</span>

<!-- AFTER -->
<span class="font-section-label text-section-label text-primary uppercase">30.08–06.09.2026 • WROCŁAW • UEW</span>
```

This is a static HTML text change — no JS needed. The `–` character is an en-dash (Unicode U+2013), consistent with Polish typographic convention.

**Confidence:** HIGH.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cross-browser parallax | Custom scroll math per browser | CSS `background-attachment: fixed` + `@media (hover:none)` disable | Browser compositor handles GPU acceleration; hand-rolled versions cause jank |
| Scroll throttle | `setTimeout` or debounce loop | `requestAnimationFrame` with ticking flag | rAF is synchronized with display refresh; setTimeout can fire between frames |
| Easing function for counters | Complex easing library | Inline `1 - Math.pow(1 - t, 4)` (easeOutQuart) | 1 line, no dependency |
| Counter observer conflicts | Shared observer with branching logic | Two separate `IntersectionObserver` instances | Clean separation, no state sharing risk |

---

## Common Pitfalls

### Pitfall 1: iOS Safari `background-attachment: fixed` breakage
**What goes wrong:** On iOS Safari, `background-attachment: fixed` combined with `background-size: cover` causes the background to display at wrong size, zoom, or not at all.
**Why it happens:** iOS Safari has never supported `background-attachment: fixed` on in-flow elements due to compositing limitations.
**How to avoid:** Use `@media (hover: none)` to fall back to `background-attachment: scroll` on touch devices.
**Warning signs:** Test on real iOS Safari or Chrome DevTools device emulation.

### Pitfall 2: Countdown timer 1-second blank flash
**What goes wrong:** Timer shows "00 00 00 00" for one second on load if you only use `setInterval`.
**Why it happens:** `setInterval` fires after the first delay.
**How to avoid:** Call `tick()` once immediately before calling `setInterval(tick, 1000)`.

### Pitfall 3: Parallax conflicting with `.reveal` transform
**What goes wrong:** Logo disappears or jumps because parallax `transform: translateY(...)` overwrites the `transform: translateY(36px)` used by `.reveal` initial state.
**Why it happens:** Both use the `transform` CSS property. Last write wins.
**How to avoid:** Apply parallax `translateY` to the `<img>` element (`logo-blend`), NOT to its wrapper div (which has the `reveal` class). The `reveal` transition on the wrapper completes in 700ms and sets transform to `translateY(0)` — after that, only the img element moves.

### Pitfall 4: Scroll listener performance on mobile
**What goes wrong:** Without `passive: true`, scroll listeners block the browser's touch scroll optimizations, causing visible lag on mobile.
**How to avoid:** Always add `{ passive: true }` to scroll event listeners that do not call `e.preventDefault()`.

### Pitfall 5: Counter runs before `.reveal` fade-in completes
**What goes wrong:** Counter animation fires at 50% viewport visibility but the parent `.reveal` div may still be at opacity 0 if the element entered the viewport from below quickly.
**How to avoid:** Either raise the counter observer threshold to 0.6 or add a small delay before starting the animation. Setting threshold to 0.5 on the counter and 0.12 on revealObs means revealObs fires first; by the time the element reaches 50%, the 700ms reveal transition has started. Acceptable sequencing.

### Pitfall 6: Stats section nav anchor
**What goes wrong:** No `id="liczby"` means no scroll anchor. Not a blocker for Phase 1, but keep id consistent with the section so Phase 2 can add it to the nav if desired.
**How to avoid:** Add `id="liczby"` to the section from the start (included in HTML above).

---

## Code Examples

### Complete countdown JS (production-ready)
```javascript
// Source: MDN Date, standard vanilla JS pattern
(function initCountdown() {
  const TARGET = new Date('2026-08-30T00:00:00');
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs'),
  };
  if (!els.d) return; // guard: HTML not yet inserted
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      Object.values(els).forEach(el => el.textContent = '00');
      return;
    }
    const t = Math.floor(diff / 1000);
    els.d.textContent = pad(Math.floor(t / 86400));
    els.h.textContent = pad(Math.floor((t % 86400) / 3600));
    els.m.textContent = pad(Math.floor((t % 3600) / 60));
    els.s.textContent = pad(t % 60);
  }
  tick();
  setInterval(tick, 1000);
})();
```

### CSS additions (append to existing `<style>`)
```css
/* ANIM-02 — Parallax background */
#start { background-attachment: fixed; }
@media (hover: none) {
  #start { background-attachment: scroll; }
}
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `setTimeout` recursion for countdown | `setInterval` + immediate call | Simpler, no drift accumulation |
| jQuery `.animate()` for counters | `requestAnimationFrame` + easing fn | No dependency, same visual result |
| `parallax.js` library | CSS `background-attachment: fixed` + JS for logo | Zero weight, better mobile |
| `scroll` event without passive flag | `{ passive: true }` listener option | Required for mobile scroll performance |

---

## Environment Availability

Step 2.6: SKIPPED — this phase is purely HTML/CSS/JS inline edits with no external dependencies beyond the CDNs already loaded in the file.

---

## Open Questions

1. **Stats numbers accuracy**
   - What we know: Placeholder numbers used — "6 edycji", "500+ uczestników", "3 sceny"
   - What's unclear: Are these the actual numbers? The organizers may have different stats.
   - Recommendation: Planner should note that these are placeholder values. The implementer should confirm real numbers with the client before shipping, but the animation code works with any `data-target` value.

2. **Countdown: local vs UTC time**
   - What we know: `new Date('2026-08-30T00:00:00')` uses browser local time. Polish students will be in Poland (UTC+2 in summer).
   - What's unclear: Should the countdown target midnight Warsaw time for everyone, including visitors in other timezones?
   - Recommendation: For a local Polish event page, browser-local time is acceptable. If the exact second matters, use `new Date('2026-08-29T22:00:00Z')` (midnight Warsaw CEST = UTC+2). Note this for the implementer.

3. **Parallax scroll depth on hero**
   - What we know: The hero is `min-h-[90vh]`. A 40% parallax factor means logo travels 0.4 * 90vh ≈ 36vh down before leaving hero.
   - What's unclear: Whether this looks good at all common viewport heights.
   - Recommendation: Planner should include a manual visual check step at 1080p, 768p, and mobile viewports. The 0.4 factor can be adjusted to 0.3 or 0.25 if the effect is too strong.

---

## Sources

### Primary (HIGH confidence)
- MDN Web Docs — IntersectionObserver API: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
- MDN Web Docs — background-attachment: https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
- MDN Web Docs — requestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
- MDN Web Docs — Date: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
- Existing index.html codebase — direct inspection of existing observers, CSS classes, DOM structure

### Secondary (MEDIUM confidence)
- iOS Safari `background-attachment: fixed` incompatibility: documented in caniuse.com (https://caniuse.com/background-attachment) and widely confirmed in iOS WebKit bug tracker
- `@media (hover: none)` for touch detection: MDN, https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover

### Tertiary (LOW confidence)
- Specific parallax factor values (0.4, 0.3) — based on common usage patterns, requires visual validation

---

## Metadata

**Confidence breakdown:**
- ANIM-01 (countdown): HIGH — standard Date math, well-known pattern
- ANIM-02 (parallax): HIGH for technique, LOW for the specific factor value (visual judgment needed)
- ANIM-03 (counters + new section): HIGH — direct extension of existing IntersectionObserver pattern already in file
- ANIM-04 (badge text): HIGH — trivial text replacement

**Research date:** 2026-05-25
**Valid until:** 2026-11-25 (stable browser APIs, no expiry risk)
