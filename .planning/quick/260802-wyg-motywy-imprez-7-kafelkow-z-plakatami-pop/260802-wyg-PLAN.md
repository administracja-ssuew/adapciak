---
gsd_plan_version: 1.0
quick_id: 260802-wyg
mode: quick
created: 2026-08-02
description: "Motywy imprez: 7 kafelków z plakatami + popup z opisem i dress code"
---

# Quick Task 260802-wyg — Motywy wieczorów

## Cel

Sekcja `#imprezy` w [index.html](../../../index.html) pokazuje dziś zaślepkę „STAY TUNED".
Zastąpić ją siatką 7 plakatów motywów, każdy klikalny → popup z pełnym opisem i dress codem.

## Materiał wejściowy

7 plakatów w rootcie repo (untracked), pionowe 4:5, 2160×2700, 1.9–3.7 MB każdy,
nazwy z polskimi znakami w formie NFD (rozłożone diakrytyki):

| Plik źródłowy | Motyw (tytuł wypalony w grafice) | Slug docelowy |
|---|---|---|
| `dzik_zachód.jpg` | Dziki zachód | `dziki-zachod` |
| `in_da_hood.jpg` | In da hood | `in-da-hood` |
| `luau_party.jpg` | Luau party | `luau` |
| `mamma_mia.jpg` | Mamma mia — wesele | `mamma-mia` |
| `mundial.jpg` | Mundial | `mundial` |
| `strefa_51.jpg` | Strefa 51 | `strefa-51` |
| `mafia_włoska.jpg` | Mafia włoska | `mafia-wloska` |

Każdy plakat ma **nazwę motywu wypaloną w ilustracji** — kafelek nie nakłada tekstu na grafikę.
Nazwa trafia do `alt` + `sr-only` (dostępność) i do nagłówka popupu.

## Zadania

### Task 1 — Optymalizacja i przeniesienie plakatów

**files:** `images/imprezy/*`, `.gitignore`

**action:**
- Skrypt Pillow (Python 3.13, Pillow 12.2 dostępny lokalnie) generuje z każdego oryginału:
  - `images/imprezy/<slug>-400.webp` (400×500, q82)
  - `images/imprezy/<slug>-800.webp` (800×1000, q80)
  - `images/imprezy/<slug>.jpg` (800×1000, q82, progressive) — fallback
- Oryginały przenieść do `images/imprezy/oryginaly/` (zachowane lokalnie, poza repo).
- `.gitignore`: dodać `images/imprezy/oryginaly/` — ta sama konwencja co istniejąca
  reguła `images/galeria/*.jpg` (ciężkie oryginały poza repo, w repo tylko zoptymalizowane).

**verify:** `ls images/imprezy` → 21 plików; łączny rozmiar webp < 1.5 MB; root repo bez `*.jpg` motywów.

**done:** plakaty serwowane jako webp z jpg fallbackiem, deploy nie wozi 18 MB.

### Task 2 — Siatka kafelków zamiast zaślepki

**files:** `index.html`

**action:**
- Usunąć blok zaślepki `STAY TUNED` (`div.tape-strip` ×3 + overlay) z sekcji `#imprezy`.
- Usunąć martwy CSS `.tape-strip` / `.ts1` / `.ts2` / `.ts3` (używany wyłącznie przez zaślepkę).
- Wstawić `grid-cols-2 md:grid-cols-3 xl:grid-cols-4` z 7 kafelkami `<button>`:
  - `<picture>` z `srcset` 400w/800w webp + `<img>` jpg fallback, `loading="lazy"`, `aspect-[4/5]`
  - dane motywu w `data-*` (nazwa, akapity rozdzielone `|`, dress code)
  - hover: lekki zoom obrazu + ramka `primary` (spójne z istniejącym `.rounded-xl` hoverem)
  - klawiatura: natywny `<button>` → focus i Enter/Space działają bez dodatkowego JS
- Zaktualizować lead sekcji (usunąć „ogłosimy wkrótce").

**verify:** brak `tape-strip` w index.html; 7 `<button class="party-tile">`; każdy ma `data-name`, `data-desc`, `data-dress`.

**done:** sekcja pokazuje 7 plakatów zamiast zaślepki.

### Task 3 — Popup z pełnym opisem

**files:** `index.html`

**action:**
- Rozszerzyć `#party-popup`: dodać plakat u góry, obsłużyć wieloakapitowy opis
  (kontener `#party-popup-desc` wypełniany `<p>` per akapit), scroll przy długiej treści
  (`max-h-[90vh] overflow-y-auto`).
- Przepisać `openPartyPopup()` — czyta `data-*` z klikniętego kafelka zamiast 4 pozycyjnych argumentów;
  podpiąć delegacją zdarzeń na kontenerze siatki.
- Zachować istniejący `trapFocus`/`releaseFocus` i `Escape` (już obsłużone globalnie w linii ~2145).
- Pinterest: zostaje ukryty (`link.classList.add('hidden')`) — brak URL-i od organizatorów.

**verify:** klik w kafelek → popup z nazwą, plakatem, 3–4 akapitami i dress codem; Esc zamyka; focus wraca na kafelek.

**done:** pełne opisy dostępne bez opuszczania strony.

## Poza zakresem

- Linki Pinterest (brak URL-i)
- Przypisanie motywów do konkretnych dni obozu (harmonogram to osobna, ukryta sekcja `#sched-panels`)
- Rebuild `tailwind.css` — używane są wyłącznie klasy już obecne w skompilowanym arkuszu
  (weryfikacja: każda użyta klasa sprawdzona w `tailwind.css`)

## Uwagi do treści

Copy dostarczone przez organizatorów; poprawione oczywiste literówki (`miejsa`→`miejsca`,
`tańcow`→`tańców`, brakujący przecinek w „wesele, które"). Reszta 1:1, z emoji.
