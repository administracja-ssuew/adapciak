---
phase: 01-animacje
plan: 01
subsystem: hero
tags: [parallax, animation, badge, css, vanilla-js]
dependency_graph:
  requires: []
  provides: [parallax-hero, badge-date]
  affects: [index.html hero section]
tech_stack:
  added: []
  patterns: [CSS background-attachment fixed, rAF-throttled scroll listener, IntersectionObserver (existing)]
key_files:
  created: []
  modified:
    - C:\adapciak\index.html
decisions:
  - "Applied parallax translateY to img.logo-blend directly (not wrapper div) to avoid conflict with .reveal transition that resets translateY(0)"
  - "Mobile/touch fix via @media (hover: none) — reverts background-attachment to scroll, preventing iOS Safari cover+fixed breakage"
  - "Throttle pattern: ticking flag + requestAnimationFrame to avoid jank on 60fps scroll"
  - "Guard scrollY > heroH: stops applying transform once user has scrolled past hero, no wasted computation"
metrics:
  duration: ~5 min
  completed_date: "2026-05-25"
  tasks_completed: 2
  files_changed: 1
---

# Phase 01 Plan 01: Hero Badge + Parallax Summary

**One-liner:** Hero badge updated to "30.08–06.09.2026 • WROCŁAW • UEW" with CSS fixed-attachment parallax background and rAF-throttled 40% logo drift IIFE.

## Changes Made

### Task 1 — Badge date text (ANIM-04)

**File:** `C:\adapciak\index.html`, line 200

**Before:**
```html
<span class="font-section-label text-section-label text-primary uppercase">TBA 2025 • WROCŁAW • UEW</span>
```

**After:**
```html
<span class="font-section-label text-section-label text-primary uppercase">30.08–06.09.2026 • WROCŁAW • UEW</span>
```

- En-dash (U+2013) used between date fragments as specified
- "TBA 2025" fully removed from the file (0 matches)
- Commit: `52276de`

---

### Task 2 — Parallax CSS and JS (ANIM-02)

#### CSS addition (inserted before `</style>`, now lines ~124–130)

```css
/* ─── ANIM-02: Parallax hero background ─── */
#start { background-attachment: fixed; }
@media (hover: none) {
  /* iOS Safari and touch devices: background-attachment:fixed breaks with cover */
  #start { background-attachment: scroll; }
}
```

#### JS addition (inserted before `</script>`, now lines ~786–814)

```javascript
/* ─── ANIM-02: Parallax logo ─── */
(function initParallax() {
  const hero = document.getElementById('start');
  if (!hero) return;
  const logo = hero.querySelector('.logo-blend');
  if (!logo) return;
  let ticking = false;

  function applyParallax() {
    const scrollY = window.scrollY;
    const heroH = hero.offsetHeight;
    if (scrollY > heroH) {
      ticking = false;
      return;
    }
    logo.style.transform = 'translateY(' + (scrollY * 0.4) + 'px)';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }, { passive: true });
})();
```

- Transform applied to `img.logo-blend` directly, NOT to its `.reveal` wrapper div
- Commit: `7e3b719`

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None introduced by this plan. Pre-existing stubs (gallery placeholders, team placeholders, partner logos, form URLs) are out of scope for this plan.

## Verification Checklist

- [x] "TBA 2025" not present in index.html (0 matches)
- [x] "30.08–06.09.2026" appears exactly once (line 200, badge span)
- [x] `#start { background-attachment: fixed; }` in style block
- [x] `@media (hover: none)` block overrides to `scroll`
- [x] `initParallax` IIFE in script block
- [x] `passive: true` on scroll listener
- [x] Guard `if (scrollY > heroH)` present
- [x] Transform targets `logo` (querySelector result), not `hero`

## Self-Check: PASSED
