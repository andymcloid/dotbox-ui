# DotBox UI

DotBox UI är ett modernt, lättviktigt och themebart UI-komponentbibliotek för webben.

## 🚀 Kom igång

### Installation

```sh
npm install dotbox-ui
```

### Bygga biblioteket

Kör:
```sh
npm run build
```
Detta:
- Bygger alla JS-komponenter till `dist/bundle.js`
- Bygger alla CSS till `dist/index.css`
- Kopierar automatiskt theme.css till `dist/theme.css`

### Theme-system
- Alla grundläggande färger, typografi, spacing etc. styrs av CSS-variabler i `theme.css`.
- theme.css innehåller både light och dark theme (`:root.theme-light` och `:root.theme-dark`).
- Byt theme genom att toggla klassen `theme-light`/`theme-dark` på `<html>`.
- Alla komponenter använder theme-variabler – du får en komplett, modern grundstil out-of-the-box.

### Demo/docs-läge

Kör docs-servern för att testa biblioteket som en riktig konsument:
```sh
npm run docs
```
- Serverar `docs/index.html` på [http://localhost:3000](http://localhost:3000)
- All styling laddas från `dist/` (`/dist/index.css` och `/dist/theme.css`)
- Theme-toggle finns inbyggt i docs

### Konsumera i egen app

1. Importera CSS:
   ```html
   <link rel="stylesheet" href="/dist/index.css">
   <link rel="stylesheet" href="/dist/theme.css">
   ```
2. Importera och använd komponenter från `dotbox-ui`:
   ```js
   import { Button, ModalDialog } from 'dotbox-ui';
   // ...
   ```
3. Byt theme genom att toggla klassen på `<html>` (eller via JS)

## 🛠️ Utveckling
- Alla komponenter och styles ligger i `src/`
- Lägg till nya themes eller overrides i `src/styles/` och kör `npm run build` för att paketera

## 📦 Pipeline/CI
- `npm run build` ser alltid till att alla nödvändiga filer finns i `dist/` – redo för publicering eller deploy
- `dist/` kan raderas och återskapas helt med `npm run build`

---

**Frågor?** Skicka en issue eller PR! 