# Quick Task 260826-w7c — Podsumowanie

**Data:** 2026-08-26
**Commity:** `5b34838` (logotypy), `264dcc1` (sekcja), `249c01f` (cena)

## Co powstało

Sekcja `#partnerzy` jest włączona i pokazuje przewijającą się taśmę trzech logotypów —
**NOMAR**, **Winiary**, **dm** — bez opisów i bez popupu. Cena noclegu w akademiku
poprawiona z 80 zł na 65 zł.

| Plik | Rola |
|---|---|
| `images/partnerzy/{nomar,winiary,dm}.{png,webp}` | logotypy 128 px, razem 98 KB |
| `images/partnerzy/oryginaly/` | źródła (2 rastry + wektorowy PDF), poza repo |
| `index.html` | sekcja, `.partner-chip`, nav, cena |
| `.gitignore` | reguła na oryginały |

## Decyzje, które warto pamiętać

**Białe kafle pod logotypami.** `.dark .bg-surface` to `#1E293B` (index.html:553), a znak
NOMAR jest niemal czarny na przezroczystym tle — w trybie ciemnym zniknąłby. Przebarwianie
logotypu filtrem CSS odpada, bo to naruszenie identyfikacji marki, więc każdy znak dostaje
własne białe podłoże. W trybie jasnym kafel zlewa się z tłem sekcji i widać same logotypy.

**Odstęp w marginesie kafla, nie w `gap` tracka.** Flex daje 17 przerw na 18 elementów,
więc `translateX(-50%)` lądowałby w połowie przerwy i pętla szarpałaby przy każdym cyklu.
Po przeniesieniu odstępu do marginesu połowa to dokładnie 9 kafli. Zmierzone: połowa
1731 px, całość 3462 px.

**3 powtórzenia zestawu na połowę.** Trzy kafle to ~700 px, czyli mniej niż kontener
`max-w-7xl` (1280 px) — w pętli robiłaby się pusta dziura.

## Pułapki napotkane po drodze

1. **Komentarz cytował `</template>`.** Instrukcja „PARTNERZY WYŁĄCZENI" zawierała w treści
   tekst `</template>`, więc pierwsze wyszukanie tego tagu trafiało w komentarz, nie w prawdziwy
   znacznik — sekcja zduplikowała się. Splice kotwiczy się teraz na `</section>\n</template>`.
2. **„980 zł" zawiera w sobie „80 zł".** Naiwna podmiana zepsułaby cenę obozu. Dopasowania
   są kontekstowe (`Koszt 80 zł`, `<strong>80 zł</strong>`), a asercja pilnuje, że
   `980 zł` występuje po zmianie tyle samo razy co przed.

## Weryfikacja (Chrome, headless)

- 18/18 kafli renderuje się, wszystkie serwowane jako `.webp`
- pętla domyka się co do piksela; połowa szersza niż kontener
- czytnik ekranu dostaje 3 nazwy (duplikat ma `aria-hidden` i pusty `alt`)
- oba motywy i 390×844 sprawdzone na zrzutach
- `65 zł` raz w treści FAQ i raz w JSON-LD; zero samotnych `80 zł`; `980 zł` nietknięte
- brak błędów JS i nieudanych żądań

## Poza zakresem

- Linki do stron partnerów — brak URL-i
- `openPartnerPopup()` i `#partner-popup` zostają w pliku jako nieużywana infrastruktura;
  po rezygnacji z opisów nie ma do nich wywołań. Usunięcie to osobna decyzja, nie sprzątanie
  przy okazji.
