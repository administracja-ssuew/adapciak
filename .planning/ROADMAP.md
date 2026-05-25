# Roadmap: Adapciak – strona wydarzenia

## Overview

Brownfield improvement of a single index.html event page. Phase 1 adds animation
layer (countdown, parallax, number counters, date badge). Phase 2 delivers working
functionality, gallery interactivity, contact form, and UX polish. After both phases
the page is production-ready for the August 2026 event.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Animacje** - Countdown, parallax hero, animowane liczniki, zaktualizowany badge daty
- [ ] **Phase 2: Funkcjonalność i treść** - Lightbox galerii, formularz Formspree, nawigacja hide/show, back-to-top, meta i linki

## Phase Details

### Phase 1: Animacje
**Goal**: Strona robi pierwsze wrażenie — odliczanie do wydarzenia, żywe tło hero i animowane statystyki budują oczekiwanie i klimat
**Depends on**: Nothing (first phase)
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04
**Success Criteria** (what must be TRUE):
  1. Uzytkownik widzi w sekcji hero działający timer odliczający dni, godziny, minuty i sekundy do 30.08.2026 — wartości aktualizują się co sekundę
  2. Przewijając stronę w dół, logo i tło hero poruszają się z efektem parallax (wolniejszy scroll niż treść)
  3. Gdy sekcja ze statystykami (np. "500+ uczestników") wjeżdża w viewport, liczby animują się od 0 do wartości docelowej
  4. Hero badge wyświetla "30.08–06.09.2026 • WROCŁAW • UEW" (nie "TBA 2025")
**Plans**: 2 plans
Plans:
- [ ] 01-01-PLAN.md — Badge date fix (ANIM-04) + parallax CSS & JS (ANIM-02)
- [ ] 01-02-PLAN.md — Countdown timer HTML & JS (ANIM-01) + stats section & counter animation (ANIM-03)
**UI hint**: yes

### Phase 2: Funkcjonalność i treść
**Goal**: Strona jest w pełni funkcjonalna — galeria działa interaktywnie, formularz kontaktowy wysyła wiadomości, nawigacja i meta dane są aktualne
**Depends on**: Phase 1
**Requirements**: GAL-01, GAL-02, GAL-03, FORM-01, FORM-02, CONT-01, CONT-02, UX-01, UX-02
**Success Criteria** (what must be TRUE):
  1. Kliknięcie zdjęcia w galerii otwiera lightbox z powiększonym widokiem; użytkownik może przejść do następnego/poprzedniego zdjęcia i zamknąć lightbox klawiszem Escape lub kliknięciem poza
  2. Wypełnienie i wysłanie formularza kontaktowego dostarcza wiadomość przez Formspree; użytkownik widzi komunikat sukcesu lub błędu
  3. Na urządzeniu mobilnym navbar chowa się przy scrollowaniu w dół i pojawia się przy scrollowaniu w górę; przycisk "wróć na górę" jest widoczny po zjechaniu > 400px i działa płynnie
  4. Meta tagi (description, og:title, og:description) zawierają datę "30.08–06.09.2026"; linki social media mają komentarz HTML ze wskazaniem gdzie wstawić docelowy URL
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Animacje | 0/2 | Not started | - |
| 2. Funkcjonalność i treść | 0/TBD | Not started | - |
