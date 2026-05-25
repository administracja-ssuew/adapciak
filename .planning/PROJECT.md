# Adapciak – strona wydarzenia

## What This Is

One-pager promujący Adapciaka — flagowe wydarzenie integracyjne Samorządu Studentów UEW we Wrocławiu (edycja 30.08–06.09.2026). Strona jest skierowana do studentów UEW i innych wrocławskich uczelni — ma zachęcić do rejestracji i wolontariatu. Zbudowana jako pojedynczy plik HTML + Tailwind CSS, hostowana na Vercel.

## Core Value

Gość wchodzi na stronę i w ciągu 10 sekund wie, kiedy jest Adapciak, że chce tam być, i klika „Zapisz się".

## Requirements

### Validated

- ✓ Responsywny layout (mobile + desktop) — istniejący kod
- ✓ Sticky navbar z hamburgerem na mobile — istniejący kod
- ✓ Sekcje: Hero, O wydarzeniu, Harmonogram, Zapisy CTA, Wolontariat, Partnerzy, FAQ, Galeria, Kontakt, Organizatorzy, Footer — istniejący kod
- ✓ Scroll reveal animacje (IntersectionObserver) — istniejący kod
- ✓ Active nav link highlighting — istniejący kod

### Active

- [ ] Countdown timer do 30.08.2026 (dni / godziny / minuty / sekundy)
- [ ] Parallax hero — logo/tło przesuwa się przy scrollowaniu
- [ ] Animowane liczby (counter) przy scroll (np. liczba uczestników, edycji)
- [ ] Lightbox dla galerii — kliknięcie zdjęcia otwiera powiększenie
- [ ] Podłączenie formularza kontaktowego (Formspree)
- [ ] Zaktualizować "TBA 2025" → "30.08–06.09.2026" w hero badge i meta
- [ ] Struktura folderów images/ gotowa na zdjęcia hero.jpg i galerii
- [ ] Placeholder social media links (# → docelowe URL gdy będą znane)

### Out of Scope

- Backend / baza danych — strona statyczna, Formspree wystarczy
- CMS / panel admina — treści edytowane bezpośrednio w HTML
- Wielojęzyczność — tylko język polski
- Animacja cząsteczkowa (particle.js) — zbyt ciężka jak na single HTML file
- System płatności — Adapciak jest bezpłatny

## Context

- Stack: czysty HTML + Tailwind CDN + Google Fonts (Bebas Neue, Inter) + Material Symbols
- Brak bundlera / node_modules — plik index.html musi być samodzielny
- Zdjęcia: hero.jpg i zdjęcia galerii zostaną ręcznie wrzucone do `images/`; brak zdjęcia wolontariat i o-wydarzeniu na razie
- Formularz zapisów i wolontariatu: URL formularzy zewnętrznych (Google Form) nieznany — zostają jako # tymczasowo
- Social media: URL-e nieznane — zostają jako # tymczasowo
- Repo: https://github.com/administracja-ssuew/adapciak (branch main, Vercel deploy)
- Data wydarzenia: 30 sierpnia – 6 września 2026

## Constraints

- **Tech stack**: tylko HTML/CSS/JS inline — bez frameworków, bez npm, bez bundlera
- **Hosting**: Vercel (statyczny), pliki muszą działać bez serwera
- **Rozmiar**: bez ciężkich bibliotek — animacje własnym CSS/JS lub lekkie vanilla
- **Kompatybilność**: nowoczesne przeglądarki (Chrome, Firefox, Safari, Edge) + iOS Safari / Android Chrome

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tailwind CDN zamiast build | Brak potrzeby node_modules, prostszy deploy | — Pending |
| Countdown do 30.08.2026 | To data startu Adapciaka | — Pending |
| Formspree dla formularza kontaktowego | Najprostszy hosting-agnostic formularz dla statycznej strony | — Pending |
| Lightbox vanilla JS (bez biblioteki) | Utrzymanie braku zależności zewnętrznych | — Pending |

## Evolution

Po każdej fazie:
1. Zrealizowane wymagania → przenieś do Validated
2. Nowe wymagania → dodaj do Active
3. Wykluczone → dodaj do Out of Scope z powodem

---
*Last updated: 2026-05-25 po inicjalizacji projektu*
