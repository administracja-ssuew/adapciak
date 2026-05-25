# Phase 2: Funkcjonalność i treść - Research

**Researched:** 2026-05-25
**Domain:** Vanilla JS interactivity — lightbox, Formspree, navbar scroll behaviour, back-to-top, meta tags
**Confidence:** HIGH (everything derived from direct code audit + locked architectural decisions; no library API uncertainty)

---

## Summary

Phase 2 completes the site's interactivity layer on top of the already-finished animation layer (Phase 1). All work stays inside the single `index.html` file — no npm, no bundler, no external JS libraries beyond Tailwind CDN. Every feature is implemented with vanilla JS and inline CSS following patterns already established in the file.

The most nuanced task is the lightbox (GAL-01/02): the gallery is NOT a grid of individual thumbnails — it is a 4-slide AUTO-CAROUSEL managed by `initGallerySlider()`. Lightbox must open against the currently active slide's image and share the same image array as the slider, without replacing the slider. The contact form already has the HTML skeleton with a `handleFormSubmit` stub — Phase 2 wires it to Formspree via `fetch()` and adds real success/error feedback. The navbar hide/show (UX-01) requires a new IntersectionObserver-free approach using a scroll-delta listener, because `#navbar` is `sticky` (not `fixed`) — a CSS `transition: transform` approach works cleanly. Back-to-top (UX-02) is a simple fixed button toggled by scroll position. Meta/content updates (CONT-01/02) are pure HTML edits.

**Primary recommendation:** Implement all five feature areas as separate, self-contained IIFE blocks appended to the existing `<script>` block, matching the code style of `initGallerySlider`, `initCountdown`, etc.

---

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Only HTML/CSS/JS inline — no frameworks, no npm, no bundler
- **Hosting**: Vercel (static), files must work without a server
- **Size**: No heavy libraries — custom CSS/JS or lightweight vanilla
- **Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge) + iOS Safari / Android Chrome
- **Single file**: Everything lives in `index.html`

---

<user_constraints>
## User Constraints (from CONTEXT.md)

No CONTEXT.md found for Phase 2 — no prior discussion phase was run. Constraints come from PROJECT.md and STATE.md accumulated decisions.

### Locked Decisions
- Stack: pure HTML + Tailwind CDN + inline JS — NO npm, NO bundler, NO external libraries beyond Tailwind CDN
- Single `index.html` file — everything inline
- Hosting: Vercel static, no server
- Lightbox: vanilla JS, zero external dependencies (decided at project init)
- Formspree for contact form (decided at project init)
- Countdown target: 30.08.2026 (midnight Warsaw CEST = `2026-08-29T22:00:00Z`)
- Color palette: primary `#F97316`, background `#FFFBF0`, dark sections `#1C1917`
- Images: `images/hero.jpg` and `images/galeria/1.jpg` through `4.jpg`

### Claude's Discretion
- Exact CSS for navbar hide/show transition
- Lightbox overlay visual design (overlay darkness, button placement)
- Back-to-top button visual style (must match existing design language)
- Exact wording of Formspree error message

### Deferred Ideas (OUT OF SCOPE)
- Particle animation background
- Admin panel
- Embedded Google Form
- Google Maps embed
- npm / bundler
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| GAL-01 | Clicking a gallery photo opens a lightbox with enlarged view | Lightbox targets active `.g-slide img` src; shares slide array with `initGallerySlider` |
| GAL-02 | Lightbox has prev/next navigation, Escape key close, click-outside close | Vanilla JS keyboard + click handlers; `data-index` attribute approach |
| GAL-03 | Gallery code structure supports adding files to `images/galeria/` with minimal HTML edits | Slides are already static HTML; adding a slide = one new `.g-slide` block + one `.g-dot` button |
| FORM-01 | Contact form sends via Formspree endpoint | Replace `handleFormSubmit` stub with real `fetch()` POST to Formspree |
| FORM-02 | User sees clear success or error message after submit | Show `#form-success` on resolve; show a new `#form-error` element on reject |
| CONT-01 | Meta tags updated with 2026 date | Edit `<meta name="description">`, `og:title`, `og:description` in `<head>` |
| CONT-02 | Social media links have placeholder `#` with HTML comment indicating where to insert URL | Links already use `#`; need explicit `<!-- WSTAW URL -->` comments |
| UX-01 | Navbar hides (slide up) on scroll down and appears (slide down) on scroll up on mobile | CSS `transform: translateY(-100%)` + `transition`; JS scroll-delta listener |
| UX-02 | Back-to-top button appears after scrolling > 400px and smoothly scrolls to top | Fixed button, toggled by scroll listener; `window.scrollTo({top:0, behavior:'smooth'})` |
</phase_requirements>

---

## Standard Stack

### Core
| Technique | Version | Purpose | Why Standard |
|-----------|---------|---------|--------------|
| Vanilla JS IIFE | ES6 | Feature isolation, matching existing pattern | All existing JS blocks use IIFE — `initGallerySlider`, `initCountdown`, `initCounters`, `initParallax` |
| Fetch API | Browser-native | POST form data to Formspree | No library needed; supported in all target browsers |
| IntersectionObserver | Browser-native | Already used for reveal/counter/navObs | Consistent with existing approach |
| CSS `transform` + `transition` | Browser-native | Navbar hide/show, lightbox fade | Already used throughout file |
| `position: fixed` | CSS | Lightbox overlay + back-to-top button | Standard approach for overlays |
| Formspree | Free tier | Form backend without server | Already decided; endpoint = `https://formspree.io/f/YOUR_FORM_ID` |

### Supporting
| Technique | Purpose | When to Use |
|-----------|---------|-------------|
| `requestAnimationFrame` throttle | Smooth scroll listener for navbar | Matches parallax approach in `initParallax` |
| `data-*` attributes | Passing slide index to lightbox | Avoids closures over mutable state |
| `FormData` | Encoding form fields for Formspree | Works natively with `fetch` |
| Material Symbols Outlined | Close, chevron icons in lightbox | Already loaded; use `close`, `chevron_left`, `chevron_right` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Formspree fetch | EmailJS | Both work; Formspree already decided |
| Scroll-delta JS for navbar | Pure CSS scroll-driven animations | CSS approach has weaker browser support on Safari iOS; JS is safer |
| Vanilla lightbox | GLightbox / PhotoSwipe | Forbidden — no external libraries |

**Installation:** None. No packages to install.

---

## Architecture Patterns

### Existing Code Structure to Follow
```
<style>          ← CSS classes for new components go here
  #lightbox { ... }
  #back-to-top { ... }
  /* navbar hide/show CSS */
</style>

<body>
  <nav id="navbar">   ← Add transition CSS class; JS toggler reads scrollY delta
  ...
  <section id="galeria">  ← Add cursor-pointer to .g-slide img; lightbox reads src from here
  <form onsubmit="handleFormSubmit(event)">  ← Replace stub body
  <!-- Lightbox overlay injected here via JS, or static hidden HTML -->
  <!-- Back-to-top button inserted before </body> -->
</body>

<script>
  /* existing blocks unchanged */
  /* NEW: initLightbox() IIFE */
  /* NEW: initNavbarScroll() IIFE */
  /* NEW: initBackToTop() IIFE */
  /* REPLACE: handleFormSubmit() */
</script>
```

### Pattern 1: Lightbox that co-exists with the Auto-Carousel

**What:** The carousel (`initGallerySlider`) manages `current` slide index internally. The lightbox reads the currently displayed image src from the active `.g-slide img` when clicked, then navigates independently using the same ordered image array.

**When to use:** Always — there is no separate thumbnail grid.

**Critical integration point:** The lightbox must NOT call `goTo()` from the slider — that function is scoped inside `initGallerySlider`'s closure. Instead, lightbox maintains its own index over the same image/alt data.

**Recommended approach — static HTML lightbox (preferred over JS-injected):**
```html
<!-- Insert before </body> -->
<div id="lightbox" class="hidden fixed inset-0 z-[9999] flex items-center justify-center"
     style="background: rgba(0,0,0,0.92);">
  <button id="lb-close" class="absolute top-4 right-4 text-white hover:text-primary transition-colors"
          aria-label="Zamknij">
    <span class="material-symbols-outlined" style="font-size:36px;">close</span>
  </button>
  <button id="lb-prev" class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-primary text-white transition-colors"
          aria-label="Poprzednie zdjęcie">
    <span class="material-symbols-outlined">chevron_left</span>
  </button>
  <button id="lb-next" class="absolute right-16 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-primary text-white transition-colors"
          aria-label="Następne zdjęcie">
    <span class="material-symbols-outlined">chevron_right</span>
  </button>
  <img id="lb-img" src="" alt="" class="max-h-[90vh] max-w-[90vw] object-contain"/>
</div>
```

```javascript
// Source: direct code audit + vanilla JS patterns
(function initLightbox() {
  // Build image list from the same slides already in the DOM
  var slides = Array.from(document.querySelectorAll('.g-slide'));
  if (!slides.length) return;
  var images = slides.map(function(s) {
    var img = s.querySelector('img');
    return { src: img.src, alt: img.alt };
  });

  var lb      = document.getElementById('lightbox');
  var lbImg   = document.getElementById('lb-img');
  var lbClose = document.getElementById('lb-close');
  var lbPrev  = document.getElementById('lb-prev');
  var lbNext  = document.getElementById('lb-next');
  var lbIndex = 0;

  function openLightbox(index) {
    lbIndex = (index + images.length) % images.length;
    lbImg.src = images[lbIndex].src;
    lbImg.alt = images[lbIndex].alt;
    lb.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Clicking active slide image opens lightbox at current carousel position
  slides.forEach(function(slide, i) {
    var img = slide.querySelector('img');
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      // Use carousel's current active slide index, not DOM index
      var activeDot = document.querySelector('.g-dot.active');
      var dots = Array.from(document.querySelectorAll('.g-dot'));
      var activeIndex = activeDot ? dots.indexOf(activeDot) : i;
      openLightbox(activeIndex);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', function() { openLightbox(lbIndex - 1); });
  lbNext.addEventListener('click', function() { openLightbox(lbIndex + 1); });

  // Click outside image closes
  lb.addEventListener('click', function(e) {
    if (e.target === lb) closeLightbox();
  });

  // Escape key closes
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && !lb.classList.contains('hidden')) openLightbox(lbIndex - 1);
    if (e.key === 'ArrowRight' && !lb.classList.contains('hidden')) openLightbox(lbIndex + 1);
  });
})();
```

### Pattern 2: Formspree Integration

**What:** Replace the existing `handleFormSubmit` stub (line 843–849 in index.html) with a real `fetch()` POST. The form element already has `onsubmit="handleFormSubmit(event)"`.

**Current stub (to replace):**
```javascript
function handleFormSubmit(e) {
  e.preventDefault();
  // Tu podłącz Formspree / EmailJS
  document.getElementById('form-success').classList.remove('hidden');
  e.target.reset();
}
```

**Replacement:**
```javascript
// Source: Formspree documentation pattern
function handleFormSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var btn  = form.querySelector('button[type="submit"]');
  var successEl = document.getElementById('form-success');
  var errorEl   = document.getElementById('form-error');

  btn.disabled = true;
  btn.textContent = 'Wysyłanie...';
  successEl.classList.add('hidden');
  errorEl.classList.add('hidden');

  fetch('https://formspree.io/f/YOUR_FORM_ID', { // <!-- WSTAW TU SWÓJ ENDPOINT FORMSPREE -->
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then(function(res) {
    btn.disabled = false;
    btn.textContent = 'WYŚLIJ WIADOMOŚĆ';
    if (res.ok) {
      successEl.classList.remove('hidden');
      form.reset();
    } else {
      errorEl.classList.remove('hidden');
    }
  })
  .catch(function() {
    btn.disabled = false;
    btn.textContent = 'WYŚLIJ WIADOMOŚĆ';
    errorEl.classList.remove('hidden');
  });
}
```

**HTML additions needed in the form section:**
- Add `name` attributes to existing inputs: `name="name"`, `name="email"`, `name="message"` (Formspree requires named fields)
- Add `#form-error` element below existing `#form-success`
- `action` attribute on `<form>` is NOT needed when using `fetch()`

### Pattern 3: Navbar Hide/Show on Scroll (UX-01)

**What:** On mobile, the sticky navbar slides up (hides) when scrolling down and slides back down (appears) when scrolling up. Desktop behavior unchanged.

**CSS additions:**
```css
/* Navbar slide transition */
#navbar {
  transition: transform 0.3s ease;
}
#navbar.nav-hidden {
  transform: translateY(-100%);
}
```

**JS:**
```javascript
(function initNavbarScroll() {
  var navbar   = document.getElementById('navbar');
  var lastY    = 0;
  var ticking  = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var currentY = window.scrollY;
        // Only hide on mobile — same breakpoint as Tailwind md: (768px)
        if (window.innerWidth < 768) {
          if (currentY > lastY && currentY > navbar.offsetHeight) {
            navbar.classList.add('nav-hidden');
          } else {
            navbar.classList.remove('nav-hidden');
          }
        } else {
          navbar.classList.remove('nav-hidden');
        }
        lastY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
```

**Critical note:** `#navbar` is `sticky` (not `fixed`). `transform: translateY(-100%)` still works on sticky elements — the element moves visually out of view and the space it occupies collapses. This is correct behavior.

### Pattern 4: Back-to-Top Button (UX-02)

**What:** Fixed button, bottom-right, appears after scrolling > 400px.

**HTML (insert before `</body>`):**
```html
<button id="back-to-top"
  class="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center bg-primary text-white shadow-lg hover:bg-primary-dark transition-all duration-300 opacity-0 pointer-events-none"
  aria-label="Wróć na górę">
  <span class="material-symbols-outlined">arrow_upward</span>
</button>
```

**CSS:**
```css
#back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
}
```

**JS:**
```javascript
(function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
```

### Pattern 5: Meta Tags + Social Media Comments (CONT-01/02)

**Current meta tags (lines 6–8 of index.html):**
```html
<meta name="description" content="Adapciak – flagowe wydarzenie Samorządu Studentów UEW we Wrocławiu. Dołącz do największej studenckiej imprezy integracyjnej!"/>
<meta property="og:title" content="Adapciak – SSUEW"/>
<meta property="og:description" content="Największa studencka impreza integracyjna UEW we Wrocławiu."/>
```

**Updated versions (CONT-01):**
```html
<meta name="description" content="Adapciak 30.08–06.09.2026 – flagowe wydarzenie integracyjne Samorządu Studentów UEW we Wrocławiu. Dołącz do największej studenckiej imprezy!"/>
<meta property="og:title" content="Adapciak 2026 (30.08–06.09) – SSUEW"/>
<meta property="og:description" content="Największa studencka impreza integracyjna UEW we Wrocławiu. Adapciak 30.08–06.09.2026 – bądź tam!"/>
```

**Social media links — current state (lines 655–664):**
The three `<a href="#">` links for Facebook, Instagram, TikTok already exist with `href="#"`. They need explicit HTML comments per CONT-02:
```html
<!-- WSTAW URL Facebook: https://facebook.com/... -->
<a href="#" ...>Facebook</a>
<!-- WSTAW URL Instagram: https://instagram.com/... -->
<a href="#" ...>Instagram</a>
<!-- WSTAW URL TikTok: https://tiktok.com/... -->
<a href="#" ...>TikTok</a>
```

### Anti-Patterns to Avoid

- **Replacing the carousel with a thumbnail grid**: GAL-03 says "minimal HTML edits to add new images" — the existing carousel structure already satisfies this; don't rearchitect the gallery.
- **Using `display: none` for the lightbox without `pointer-events: none`**: If hidden via class, clicks can bleed through. Use `hidden` (Tailwind's `display:none`) or combine `opacity-0` + `pointer-events-none`.
- **Blocking the main thread in the scroll handler**: Always use `requestAnimationFrame` + `passive: true` listener, matching the existing `initParallax` pattern.
- **Using `action` attribute on the form with Formspree fetch approach**: `action` causes a page redirect on submit; only use it with the non-JS Formspree form (we use `fetch` so omit `action`).
- **Forgetting `name` attributes on form inputs**: Formspree requires named form fields. Current `<input>` elements have `id` but no `name` — must add `name="name"`, `name="email"`, `name="message"`.
- **Adding `z-index` lower than the existing `z-50` navbar**: The lightbox needs `z-[9999]` to appear above the sticky navbar (z-50).
- **Modifying `initGallerySlider` internals**: The lightbox must not touch `goTo()` or `current` — these are closed over. Instead, read the active dot index from the DOM.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form submission to email | Custom backend / PHP mailer | Formspree `fetch` POST | Already decided; zero server required |
| Image lazy loading | Custom IntersectionObserver | `loading="lazy"` HTML attribute | Already on all `.g-slide img` in the carousel |
| Smooth scroll to top | Custom JS easing | `window.scrollTo({behavior:'smooth'})` | Native browser; `scroll-behavior: smooth` already on `html` element |
| Icon fonts | Custom SVG icons | Material Symbols Outlined (already loaded) | CDN already in `<head>`; use `arrow_upward`, `close`, `chevron_left`, `chevron_right` |

---

## Common Pitfalls

### Pitfall 1: Lightbox opens wrong image (stale index)
**What goes wrong:** Clicking any carousel slide opens image 0, or opens the wrong image.
**Why it happens:** The carousel's `current` variable is closed inside `initGallerySlider` and inaccessible externally. If the lightbox guesses from DOM position (`.g-slide` index) it may mismatch because the active slide changes asynchronously with the auto-timer.
**How to avoid:** Read the active index from the DOM at click time by querying `.g-dot.active` — this is always in sync with the carousel's `current`.
**Warning signs:** Lightbox consistently shows first image regardless of which slide is active.

### Pitfall 2: Navbar flickers on desktop during resize
**What goes wrong:** The navbar hides on desktop when user resizes window from wide to narrow and back.
**Why it happens:** `nav-hidden` class gets applied and never removed on resize.
**How to avoid:** In the scroll handler, always remove `nav-hidden` when `window.innerWidth >= 768`. Also add a resize listener or check width on each scroll event (checking width in scroll handler is sufficient since resize also triggers scroll recalculation).

### Pitfall 3: Body scroll not restored after lightbox close
**What goes wrong:** After closing lightbox, page is locked — user cannot scroll.
**Why it happens:** `document.body.style.overflow = 'hidden'` set on open never gets reset.
**How to avoid:** Restore with `document.body.style.overflow = ''` in `closeLightbox()`. ALWAYS pair open/close overflow manipulation.

### Pitfall 4: Formspree CORS rejection
**What goes wrong:** `fetch` to Formspree returns CORS error in browser console.
**Why it happens:** Missing `Accept: application/json` header — Formspree requires this header to return a JSON response instead of redirecting.
**How to avoid:** Always include `headers: { 'Accept': 'application/json' }` in the fetch options.

### Pitfall 5: Form inputs not sent to Formspree (empty submissions)
**What goes wrong:** Formspree receives submissions with no fields.
**Why it happens:** `<input>` and `<textarea>` elements lack `name` attributes. `FormData` only serializes named fields.
**How to avoid:** Add `name="name"`, `name="email"`, `name="message"` to the three form fields before the fetch call.

### Pitfall 6: Back-to-top conflicts with `scroll-behavior: smooth` on the `html` element
**What goes wrong:** Back-to-top button works but the scroll is jagged or double-animates.
**Why it happens:** `html { scroll-behavior: smooth }` + `window.scrollTo({behavior:'smooth'})` can stack.
**How to avoid:** Using `window.scrollTo` directly overrides the CSS rule cleanly — no conflict in practice. This is the correct approach.

### Pitfall 7: Lightbox `z-index` fights with sticky navbar
**What goes wrong:** Lightbox renders behind the navbar when opened.
**Why it happens:** Navbar has `z-50` (z-index: 50). Lightbox needs a higher z-index.
**How to avoid:** Use Tailwind's `z-[9999]` on the lightbox overlay element.

---

## Code Examples

### Existing gallery slider (full — for reference)
```javascript
// Lines 919–947 of current index.html
(function initGallerySlider() {
  var slides = document.querySelectorAll('.g-slide');
  var dots   = document.querySelectorAll('.g-dot');
  if (!slides.length) return;
  var current = 0;
  var timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startTimer() { timer = setInterval(function() { goTo(current + 1); }, 5000); }
  function resetTimer() { clearInterval(timer); startTimer(); }

  var prevBtn = document.getElementById('g-prev');
  var nextBtn = document.getElementById('g-next');
  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); resetTimer(); });

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { goTo(i); resetTimer(); });
  });

  startTimer();
})();
```
**Key insight:** `current` is private. Lightbox CANNOT call `goTo()`. Read active state from `.g-dot.active` in the DOM instead.

### Existing form HTML (current, needs `name` attributes added)
```html
<!-- Lines 678–698 of current index.html -->
<form class="flex flex-col gap-5 reveal reveal-delay-2" onsubmit="handleFormSubmit(event)">
  <input id="contact-name" type="text" .../>          <!-- needs name="name" -->
  <input id="contact-email" type="email" .../>        <!-- needs name="email" -->
  <textarea id="contact-msg" rows="5" ...></textarea>  <!-- needs name="message" -->
  <button type="submit" ...>WYŚLIJ WIADOMOŚĆ</button>
  <p id="form-success" class="hidden text-primary ...">✓ Wiadomość wysłana! Skontaktujemy się wkrótce.</p>
  <!-- needs: <p id="form-error" class="hidden text-red-500 ...">...</p> -->
</form>
```

### Existing `handleFormSubmit` stub (to be replaced entirely)
```javascript
// Lines 843–849 — full replacement, not modification
function handleFormSubmit(e) {
  e.preventDefault();
  // Tu podłącz Formspree / EmailJS
  document.getElementById('form-success').classList.remove('hidden');
  e.target.reset();
}
```

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|------------------|-------|
| `<form action="https://formspree.io/...">` page-redirect pattern | `fetch()` AJAX with `Accept: application/json` | fetch approach keeps user on page, enables custom success/error UI |
| `position: fixed; top: -100px` navbar hiding | `transform: translateY(-100%)` + CSS transition | transform is GPU-accelerated, smoother on mobile |

---

## Open Questions

1. **Formspree endpoint URL**
   - What we know: Formspree integration is the chosen approach; the URL pattern is `https://formspree.io/f/{FORM_ID}`
   - What's unclear: The actual `FORM_ID` — requires a Formspree account with the form registered
   - Recommendation: Use placeholder `https://formspree.io/f/YOUR_FORM_ID` with HTML comment `<!-- WSTAW TU SWÓJ ENDPOINT FORMSPREE -->`. The form will be wired correctly; owner replaces the placeholder before go-live.

2. **Social media URLs**
   - What we know: Facebook, Instagram, TikTok links exist as `<a href="#">`
   - What's unclear: Actual profile URLs
   - Recommendation: Keep `href="#"`, add `<!-- WSTAW URL ... -->` comments per CONT-02 requirement.

3. **Gallery image files**
   - What we know: `images/galeria/1.jpg` through `4.jpg` are referenced in HTML but may not exist on disk yet
   - What's unclear: Whether placeholder/stub images are available
   - Recommendation: Lightbox implementation is valid regardless — if images don't load, browser shows alt text. No blocking issue for Phase 2.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 2 is purely inline HTML/CSS/JS code changes with no external tool dependencies, CLIs, databases, or runtimes beyond a web browser. No external dependency audit required.

---

## Sources

### Primary (HIGH confidence)
- Direct audit of `C:/adapciak/index.html` (952 lines, read in full) — all patterns, IDs, class names, existing JS blocks confirmed from source
- `C:/adapciak/.planning/STATE.md` — confirmed locked decisions (vanilla lightbox, Formspree, no npm)
- `C:/adapciak/CLAUDE.md` — confirmed constraint: no npm, no bundler, no external libraries
- `C:/adapciak/.planning/REQUIREMENTS.md` — confirmed all 9 requirement descriptions

### Secondary (MEDIUM confidence)
- Formspree `fetch` + `Accept: application/json` pattern: established Formspree integration convention, widely documented; endpoint placeholder approach is standard practice for static sites
- CSS `transform: translateY(-100%)` for sticky navbar: well-established pattern for sticky/fixed header hide-on-scroll

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — derived from direct code audit; no library API uncertainty
- Architecture: HIGH — patterns copy existing IIFE/vanilla JS style already in file
- Pitfalls: HIGH — identified from direct code inspection (missing `name` attrs, closed-over `current`, z-index values all verified from source)

**Research date:** 2026-05-25
**Valid until:** 2026-08-30 (stable — no external API versions to track; only changes if index.html is modified before Phase 2 executes)
