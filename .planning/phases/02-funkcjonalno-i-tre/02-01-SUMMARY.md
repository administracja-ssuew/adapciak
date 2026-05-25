---
phase: 02-funkcjonalno-i-tre
plan: "01"
subsystem: seo-meta
tags: [meta-tags, open-graph, social-media, html]
dependency_graph:
  requires: []
  provides: [correct-og-meta-2026, social-link-placeholders]
  affects: [index.html-head, index.html-kontakt]
tech_stack:
  added: []
  patterns: [html-comment-placeholders]
key_files:
  created: []
  modified:
    - C:/adapciak/index.html
decisions:
  - "Per-link HTML comments (WSTAW URL {Platform}: ...) chosen over single generic comment for clarity of which URL goes where"
metrics:
  duration: "~3 min"
  completed: "2026-05-25"
  tasks_completed: 2
  files_modified: 1
---

# Phase 2 Plan 1: Meta tags 2026 date + social media placeholder comments Summary

**One-liner:** Updated three meta/OG tags with the 30.08–06.09.2026 event date and replaced the single generic social-media comment with three individual WSTAW URL placeholder comments, one per platform.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Update meta tags with 2026 date (CONT-01) | f5bf8d3 | index.html lines 6-8 |
| 2 | Add per-link placeholder comments to social links (CONT-02) | 9abe1f4 | index.html lines 655-666 |

## What Was Built

**Task 1 — Meta tags (CONT-01):**
- `meta[name=description]`: now contains "Adapciak 30.08–06.09.2026 – flagowe wydarzenie integracyjne..."
- `meta[property=og:title]`: now "Adapciak 2026 (30.08–06.09) – SSUEW"
- `meta[property=og:description]`: now ends with "Adapciak 30.08–06.09.2026 – bądź tam!"

**Task 2 — Social media comments (CONT-02):**
- Removed single generic comment `<!-- ← podmień # na prawdziwe URL mediów społecznościowych -->`
- Added three per-link comments immediately before each anchor tag:
  - `<!-- WSTAW URL Facebook: https://facebook.com/... -->`
  - `<!-- WSTAW URL Instagram: https://instagram.com/... -->`
  - `<!-- WSTAW URL TikTok: https://tiktok.com/... -->`
- All `href="#"` values and class attributes unchanged — zero visual change

## Verification Results

- `grep -c "30\.08" index.html` → 4 matches (3 in meta, 1 existing in hero badge)
- `grep "og:title" index.html` → contains "Adapciak 2026 (30.08–06.09) – SSUEW" ✓
- `grep "og:description" index.html` → contains "30.08–06.09.2026 – bądź tam!" ✓
- `grep -c "WSTAW URL" index.html` → 3 ✓
- Old generic comment `podmień #` → 0 matches ✓

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

- All three social media links still have `href="#"` — this is intentional per plan (real URLs not yet known). The WSTAW URL comments flag exactly where to insert URLs before go-live.

## Self-Check: PASSED

- C:/adapciak/index.html — modified, verified ✓
- Commit f5bf8d3 — Task 1 ✓
- Commit 9abe1f4 — Task 2 ✓
