# Requirements — Adapciak site

## v1 Requirements

### Animacje i wizualia

- [ ] **ANIM-01**: Użytkownik widzi countdown timer (dni/godz/min/sek) do 30.08.2026 w sekcji hero lub pod nią
- [ ] **ANIM-02**: Logo i tło hero poruszają się efektem parallax przy scrollowaniu strony
- [ ] **ANIM-03**: Liczby w sekcji statystyk (np. "500+ uczestników", "6 edycji") animują się od 0 do wartości docelowej gdy sekcja wejdzie w viewport
- [ ] **ANIM-04**: Hero badge zmienia tekst z "TBA 2025 • WROCŁAW • UEW" na "30.08–06.09.2026 • WROCŁAW • UEW"

### Galeria

- [x] **GAL-01**: Kliknięcie zdjęcia w galerii otwiera lightbox z powiększonym zdjęciem
- [x] **GAL-02**: Lightbox ma nawigację (poprzednie/następne) i zamknięcie (klawisz Escape + klik poza)
- [x] **GAL-03**: Struktura kodu galerii obsługuje wrzucenie plików do `images/galeria/` bez edycji HTML (lub z minimalną edycją)

### Formularz i kontakt

- [ ] **FORM-01**: Formularz kontaktowy faktycznie wysyła wiadomość przez Formspree (endpoint do konfiguracji)
- [ ] **FORM-02**: Po wysłaniu formularza użytkownik widzi czytelny komunikat sukcesu lub błędu

### Treść i linki

- [ ] **CONT-01**: Meta tagi (description, og:title, og:description) zaktualizowane o datę 2026
- [ ] **CONT-02**: Social media linki (Facebook, Instagram, TikTok) mają placeholder z komentarzem gdzie wstawić URL

### UX / responsywność

- [ ] **UX-01**: Navbar chowa się (slide up) przy scrollowaniu w dół i pojawia (slide down) przy scrollowaniu w górę na mobile
- [ ] **UX-02**: Przycisk "wróć na górę" pojawia się po zjechaniu > 400px i płynnie przewija stronę do góry

## v2 Requirements (odłożone)

- Animacja cząsteczkowa (particle background) — zbyt ciężka dla inline HTML
- Panel admina do edycji harmonogramu — wymaga backendu
- Formularz zapisów wbudowany w stronę — Google Form jako iframe na razie
- Mapa dojazdu (Google Maps embed) — do dodania gdy znana lokalizacja

## Out of Scope

- Backend/baza danych — strona statyczna
- Wielojęzyczność — tylko PL
- CMS — edycja bezpośrednio w HTML
- npm / bundler — CDN only

## Traceability

| REQ-ID  | Phase | Status |
|---------|-------|--------|
| ANIM-01 | 1     | Pending |
| ANIM-02 | 1     | Pending |
| ANIM-03 | 1     | Pending |
| ANIM-04 | 1     | Pending |
| GAL-01  | 2     | Complete — 02-03 |
| GAL-02  | 2     | Complete — 02-03 |
| GAL-03  | 2     | Complete — 02-03 |
| FORM-01 | 2     | Pending |
| FORM-02 | 2     | Pending |
| CONT-01 | 2     | Pending |
| CONT-02 | 2     | Pending |
| UX-01   | 2     | Pending |
| UX-02   | 2     | Pending |
