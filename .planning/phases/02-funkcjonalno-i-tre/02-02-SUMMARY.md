---
phase: 02-funkcjonalno-i-tre
plan: 02
subsystem: ux-scroll
tags: [navbar, scroll, back-to-top, mobile, ux]
dependency_graph:
  requires: []
  provides: [navbar-hide-mobile, back-to-top-button]
  affects: [index.html]
tech_stack:
  added: []
  patterns: [IIFE, requestAnimationFrame, passive-scroll-listener, IntersectionObserver-free-scroll]
key_files:
  created: []
  modified:
    - C:/adapciak/index.html
decisions:
  - "initNavbarScroll checks window.innerWidth on every scroll event — no resize listener needed, desktop always shows navbar"
  - "Back-to-top uses opacity-0 + pointer-events-none (not display:none) to allow future CSS fade transition"
  - "z-40 for back-to-top: below navbar z-50 and below future lightbox z-[9999]"
metrics:
  duration: ~6 min
  completed_date: "2026-05-25"
  tasks_completed: 2
  files_modified: 1
---

# Phase 02 Plan 02: Mobile Navbar Hide/Show + Back-to-Top Button Summary

**One-liner:** Mobile scroll-aware navbar with `translateY(-100%)` hide/show and a fade-in back-to-top button toggled at 400px scroll depth.

## What Was Built

Two additive UX enhancements added to `index.html`:

### UX-01: Mobile Navbar Hide/Show

- **CSS:** `#navbar { transition: transform 0.3s ease }` + `#navbar.nav-hidden { transform: translateY(-100%) }` added inside `<style>` block
- **JS:** `initNavbarScroll` IIFE appended to `<script>` block — scroll listener with `requestAnimationFrame` batching and `passive: true`; hides navbar when scrolling down past its own height on mobile (< 768px); always removes class on desktop or scroll-up

### UX-02: Back-to-Top Button

- **CSS:** `#back-to-top.visible { opacity: 1; pointer-events: auto }` added inside `<style>` block
- **HTML:** `<button id="back-to-top">` with `arrow_upward` Material Symbol, `fixed bottom-6 right-6 z-40`, default `opacity-0 pointer-events-none` — placed before `</body>`
- **JS:** `initBackToTop` IIFE toggles `.visible` class when `window.scrollY > 400`; click calls `window.scrollTo({ top: 0, behavior: 'smooth' })`

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 — UX-01 Navbar | `e4e075f` | feat(02-02): add mobile navbar hide/show on scroll (UX-01) |
| Task 2 — UX-02 Back-to-top | `ff5d54a` | feat(02-02): add back-to-top button with fade-in on scroll > 400px (UX-02) |

## Decisions Made

1. **Inline width check vs resize listener** — `window.innerWidth < 768` checked inside the scroll handler itself; when the user resizes to desktop, the next scroll event removes `nav-hidden`. No separate `resize` listener needed.
2. **opacity + pointer-events approach** — back-to-top uses `opacity-0 pointer-events-none` as default Tailwind classes; `.visible` CSS class overrides both. Avoids `display:none` which would prevent CSS transitions.
3. **z-index stacking** — back-to-top `z-40` sits below navbar `z-50` and well below the planned lightbox `z-[9999]` (Plan 03).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — no stub values, no placeholder text, no unconnected data sources introduced.

## Self-Check: PASSED

- FOUND: C:/adapciak/index.html (modified)
- FOUND: commit e4e075f (Task 1 - UX-01 navbar)
- FOUND: commit ff5d54a (Task 2 - UX-02 back-to-top)
- FOUND: C:/adapciak/.planning/phases/02-funkcjonalno-i-tre/02-02-SUMMARY.md
