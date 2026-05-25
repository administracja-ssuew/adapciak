---
phase: 01-animacje
plan: 02
subsystem: hero, stats
tags: [countdown, counter, animation, vanilla-js, IntersectionObserver]
dependency_graph:
  requires: [01-01]
  provides: [countdown-timer, stats-strip, animated-counters]
  affects: [index.html hero section, index.html #liczby section]
tech_stack:
  added: []
  patterns: [setInterval countdown, IntersectionObserver counter animation, easeOutQuart, IIFE pattern]
key_files:
  created: []
  modified:
    - C:\adapciak\index.html
decisions:
  - "countdown div uses class reveal reveal-delay-4 so existing revealObs picks it up — no extra observer registration needed"
  - "counterObs is a SEPARATE IntersectionObserver instance — does not share state with revealObs or navObs"
  - "tick() called immediately before setInterval to avoid 1-second blank/zero flash on page load"
  - "counterObs.unobserve(entry.target) after animation fires ensures counters animate only once per page load"
  - "data-target values (6 edycji, 500+ uczestnikow, 3 sceny) are placeholder numbers — confirmed with client before launch"
metrics:
  duration: ~8 min
  completed_date: "2026-05-25"
  tasks_completed: 2
  files_changed: 1
---

# Phase 01 Plan 02: Countdown Timer + Animated Stats Strip Summary

**One-liner:** Countdown timer (cd-days/hours/mins/secs) inserted in hero with immediate tick() call; animated stats strip (#liczby with three easeOutQuart counters) placed between hero and O wydarzeniu, driven by a separate counterObs IntersectionObserver.

## Changes Made

### Task 1 — Countdown HTML inside hero (ANIM-01)

**File:** `C:\adapciak\index.html`

Inserted after the CTA buttons div (line 222), still inside the `.relative.z-10` hero wrapper:

```html
<!-- ANIM-01: countdown timer -->
<div id="countdown" class="flex gap-6 mt-6 reveal reveal-delay-4">
  <div class="flex flex-col items-center">
    <span id="cd-days" class="font-display-hero text-white" style="font-size:56px;line-height:1;">00</span>
    <span class="font-section-label text-section-label text-primary uppercase">Dni</span>
  </div>
  <div class="flex flex-col items-center">
    <span id="cd-hours" class="font-display-hero text-white" style="font-size:56px;line-height:1;">00</span>
    <span class="font-section-label text-section-label text-primary uppercase">Godz</span>
  </div>
  <div class="flex flex-col items-center">
    <span id="cd-mins" class="font-display-hero text-white" style="font-size:56px;line-height:1;">00</span>
    <span class="font-section-label text-section-label text-primary uppercase">Min</span>
  </div>
  <div class="flex flex-col items-center">
    <span id="cd-secs" class="font-display-hero text-white" style="font-size:56px;line-height:1;">00</span>
    <span class="font-section-label text-section-label text-primary uppercase">Sek</span>
  </div>
</div>
```

- Commit: `9c46d34`

---

### Task 2 — Stats section HTML + JS IIFEs (ANIM-01 + ANIM-03)

**File:** `C:\adapciak\index.html`

**HTML:** Inserted `<section id="liczby">` immediately after hero's `</section>` (before O WYDARZENIU comment). Contains three `.counter` spans with `data-target` attributes.

Section order confirmed: `#start` (line 189) → `#liczby` (line 250) → `#o-wydarzeniu` (line 283).

**JS IIFEs added before `</script>` closing tag:**

1. `initCountdown`: uses `new Date('2026-08-29T22:00:00Z')` (midnight Warsaw CEST), calls `tick()` immediately before `setInterval(tick, 1000)`.

2. `initCounters`: creates separate `counterObs` IntersectionObserver (threshold 0.5), calls `animateCounter()` per element with easeOutQuart easing over 1800ms, unobserves after firing.

- Commit: `d20a189`

---

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- `data-target="6"` (Edycji), `data-target="500"` (Uczestnikow), `data-target="3"` (Sceny): placeholder numbers per plan note. Real numbers to be confirmed with client before launch. The counters animate correctly from 0 to the stub values — the feature works, only the content is approximate.

## Checkpoint Pending

Task 3 is a `checkpoint:human-verify` gate. The automated tasks (1 and 2) are complete and committed. Human verification of the full visual experience (badge, countdown, parallax, counters) is required before the phase can be marked fully verified.

## Verification Checklist

- [x] `id="countdown"` exists in hero (1 match)
- [x] `id="cd-days"`, `id="cd-hours"`, `id="cd-mins"`, `id="cd-secs"` each exist (1 match each)
- [x] `id="liczby"` section exists (1 match)
- [x] Three `.counter[data-target]` spans exist (3 matches)
- [x] `data-target="6"`, `data-target="500"`, `data-target="3"` each exist (1 match each)
- [x] `initCountdown` IIFE in script block (1 match)
- [x] `initCounters` IIFE in script block (1 match)
- [x] `2026-08-29T22:00:00Z` present (correct UTC target for Warsaw CEST midnight)
- [x] `tick()` appears at least 2 times (function def + immediate call)
- [x] `counterObs.unobserve` present (1 match — fires once only)
- [x] Only ONE closing `</script>` for the main script block
- [x] `#liczby` positioned after `#start` hero and before `#o-wydarzeniu`
- [ ] Human visual verification: pending checkpoint

## Self-Check: PASSED
