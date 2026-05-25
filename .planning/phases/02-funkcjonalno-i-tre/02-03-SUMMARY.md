---
phase: 02-funkcjonalno-i-tre
plan: 03
subsystem: gallery-lightbox
tags: [lightbox, gallery, vanilla-js, keyboard, accessibility]
dependency_graph:
  requires: [02-02]
  provides: [gallery-lightbox]
  affects: [index.html]
tech_stack:
  added: []
  patterns: [IIFE, DOM-query-at-click-time, keyboard-navigation, overflow-lock]
key_files:
  created: []
  modified:
    - C:/adapciak/index.html
decisions:
  - "Read active slide index from document.querySelector('.g-dot.active') at click time — avoids stale closure over initGallerySlider's private current variable"
  - "Lightbox z-[9999] places it above navbar z-50 and back-to-top z-40"
  - "hidden Tailwind class (display:none) used for initial state — not opacity-0, so lightbox is fully removed from tab order when closed"
  - "Image list built from querySelectorAll('.g-slide') at IIFE init — GAL-03 satisfied: adding a new .g-slide auto-extends the array with no JS changes"
metrics:
  duration: ~5 min
  completed_date: "2026-05-25"
  tasks_completed: 1
  files_modified: 1
---

# Phase 02 Plan 03: Gallery Lightbox Summary

**One-liner:** Vanilla JS lightbox that opens from the active carousel slide, supports prev/next navigation and keyboard controls (Escape, ArrowLeft, ArrowRight), and locks body scroll while open.

## What Was Built

One task adding two blocks to `index.html`:

### GAL-01/02/03: Lightbox Overlay and IIFE

**HTML (before `</body>`):**
- `#lightbox` div: `hidden fixed inset-0 z-[9999]` with semi-opaque black overlay (`rgba(0,0,0,0.92)`)
- `#lb-close` button: top-right corner, Material Symbol `close`
- `#lb-prev` / `#lb-next` buttons: left/right center, Material Symbols `chevron_left`/`chevron_right`
- `#lb-img`: `max-h-[90vh] max-w-[90vw] object-contain` — shows enlarged gallery image

**JS (`initLightbox` IIFE, appended after `initBackToTop`):**
- Builds `images[]` from `querySelectorAll('.g-slide img')` at page load (GAL-03: auto-scales with new slides)
- `openLightbox(index)`: sets `lbImg.src/alt`, removes `hidden` class, locks `document.body.style.overflow = 'hidden'`
- `closeLightbox()`: adds `hidden` class back, restores `document.body.style.overflow = ''`
- Click handler on each `.g-slide img`: reads current active index via `document.querySelector('.g-dot.active')` at click time (not stale closure)
- Keyboard `keydown` listener: Escape → close; ArrowLeft/ArrowRight → navigate while open
- Overlay background click (`e.target === lb`) → close

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 — Lightbox | `ffe3026` | feat(02-03): add vanilla JS lightbox for gallery (GAL-01, GAL-02, GAL-03) |

## Decisions Made

1. **Active slide index read at click time** — `document.querySelector('.g-dot.active')` gives the carousel's current state without accessing initGallerySlider's private `current` or `goTo()`.
2. **`hidden` class (not `opacity-0`)** — lightbox must be fully absent from tab order when closed; `display:none` achieves this cleanly.
3. **`z-[9999]`** — above navbar `z-50` and back-to-top `z-40` to guarantee lightbox always floats on top.
4. **Body overflow lock** — `document.body.style.overflow = 'hidden'` on open, `''` on close; both always paired.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — lightbox reads real image `src` values from the existing `.g-slide img` elements. The gallery images themselves (`./images/galeria/1-4.jpg`) may not exist on disk yet (noted in STATE.md blockers), but the lightbox mechanism is fully wired and will display them correctly once the images are provided.

## Self-Check: PASSED

- FOUND: C:/adapciak/index.html (modified, 125 insertions)
- FOUND: commit ffe3026 (Task 1 — Lightbox)
- FOUND: C:/adapciak/.planning/phases/02-funkcjonalno-i-tre/02-03-SUMMARY.md
- VERIFIED: id="lightbox" — 1 match
- VERIFIED: id="lb-img" — 1 match
- VERIFIED: id="lb-close" — 1 match
- VERIFIED: id="lb-prev" — 1 match
- VERIFIED: id="lb-next" — 1 match
- VERIFIED: initLightbox — 1 match
- VERIFIED: z-[9999] — 1 match
- VERIFIED: body.style.overflow — 2 matches
- VERIFIED: .g-dot.active query inside initLightbox — present
- VERIFIED: initGallerySlider var current = 0 — unchanged at line 975
- VERIFIED: lightbox div at line 1117 > footer at line 805
