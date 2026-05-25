# Adapciak — Strona Internetowa

Strona stworzona na bazie kodu z Google Stitch (WBA), przerobiona dla Adapciaka.

## Struktura plików

```
adapciak-site/
├── index.html              ← GŁÓWNY PLIK STRONY
├── ADAPCIAK_LOGO.png       ← skopiuj swoje logo tutaj
├── vercel.json             ← konfiguracja Vercel
├── images/
│   ├── hero.jpg            ← zdjęcie tła w hero sekcji
│   ├── wolontariat.jpg     ← zdjęcie tła w sekcji wolontariat
│   ├── o-wydarzeniu.jpg    ← zdjęcie w sekcji "O wydarzeniu"
│   ├── galeria/
│   │   ├── 1.jpg           ← zdjęcia do galerii
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   └── 4.jpg
│   ├── team/
│   │   ├── 1.jpg           ← zdjęcia organizatorów
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   └── 4.jpg
│   └── partners/
│       ├── uew.svg         ← loga partnerów
│       └── ...
```

## Co podmienić w index.html

Szukaj komentarzy `← ZAMIEŃ NA` lub `← podmień`:

1. **Logo** — `ADAPCIAK_LOGO.png` → już ustawione, po prostu wgraj plik
2. **Kolor akcentu** — w `tailwind.config` zmień `"primary": "#8B5CF6"` na właściwy kolor
3. **Zdjęcie hero** — odkomentuj `url('./images/hero.jpg')` w sekcji hero
4. **Zdjęcie "O wydarzeniu"** — odkomentuj `<img>` w sekcji #o-wydarzeniu
5. **Link zapisy** — znajdź `href="#"` przy przyciskach "ZAPISZ SIĘ" i wstaw URL formularza
6. **Link wolontariat** — analogicznie dla "DOŁĄCZ DO WOLONTARIUSZY"
7. **Dane organizatorów** — uzupełnij imiona, role, emaile w sekcji #organizatorzy
8. **Partnerzy** — podmień `<span>Partner N</span>` na `<img src="./images/partners/...">` 
9. **Galeria** — podmień placeholder divy na `<img>` z prawdziwymi zdjęciami
10. **Social media** — zaktualizuj `href="#"` przy linkach do FB, IG, TikTok
11. **Formularz kontaktowy** — w funkcji `handleFormSubmit()` podłącz Formspree lub EmailJS

## Deployment na Vercel

### Opcja A — przez GitHub (rekomendowane)
1. Stwórz repo na GitHub i wgraj wszystkie pliki
2. Zaloguj się na vercel.com
3. "New Project" → "Import Git Repository" → wybierz repo
4. Framework: `Other` | Root Directory: `/` | Build: *(puste)*
5. Kliknij Deploy → gotowe!

### Opcja B — Vercel CLI
```bash
npm i -g vercel
cd adapciak-site
vercel
```

### Opcja C — Netlify Drop (do szybkich testów)
Przeciągnij folder `adapciak-site/` na app.netlify.com/drop

## Formularz kontaktowy (bez backendu)

Najprościej przez **Formspree** (darmowe do 50 wiadomości/mies.):
1. Zarejestruj się na formspree.io
2. Utwórz formularz → skopiuj ID (np. `xpzgkwqr`)
3. W `handleFormSubmit()` odkomentuj/wstaw:
   ```js
   fetch('https://formspree.io/f/xpzgkwqr', {
     method: 'POST',
     body: new FormData(e.target),
     headers: { 'Accept': 'application/json' }
   });
   ```

## Branding

Gdy masz finalny kolor Adapciaka, zmień `"primary"` w `tailwind.config` w index.html.
Wszystkie elementy — przyciski, akcenty, aktywne linki — zaktualizują się automatycznie.
