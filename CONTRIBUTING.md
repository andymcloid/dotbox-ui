# DotBox UI – Arkitektur- & Buildregler

## 1. Kodstruktur & Komponenter
- **Endast JavaScript (ECMAScript)** – aldrig TypeScript.
- **En komponent per mapp** (`src/components/ComponentName/`).
- **PascalCase** för mappar och filer.
- **Ingen delad utility-kod** – varje komponent är självständig.
- **Komponenter laddar sin egen CSS och eventuella JS-dependencies.**
- **All CSS ska vara komponent-scopad (klass-prefix, ej globala selectors).**
- **Ingen hårdkodad styling i komponenter – använd alltid CSS-variabler.**

## 2. Styling & Themes
- **Alla core-variabler (färger, spacing, radius, etc) definieras i en theme-fil** (`src/styles/theme.css`).
- **theme.css innehåller både light och dark theme, scopade till `:root.theme-light` och `:root.theme-dark`.**
- **main.css och komponent-CSS använder ENDAST CSS-variabler** (t.ex. `var(--color-bg)`, `var(--spacing-md)`).
- **Vill du ha kantiga komponenter?** Sätt `--radius: 0px;` i theme.css.
- **Vill du ha spacing?** Definiera `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg` i theme.css.
- **Ingen hårdkodad padding, margin, border-radius, färg, etc. i komponent-CSS.**

## 3. Build & Distribution
- **All källkod och CSS ligger i `src/`**.
- **`npm run build` bygger och kopierar ALLT till `dist/`**:
  - JS-bundle till `dist/bundle.js`
  - Alla komponent-CSS mergas till `dist/index.css`
  - `theme.css` kopieras till `dist/theme.css`
- **Ingen CSS eller JS får ligga i `docs/` – docs är bara en konsument.**

## 4. Konsumtion & Docs
- **Docs (och alla konsumenter) laddar ENDAST CSS/JS från `dist/`**:
  - `<link rel="stylesheet" href="/dist/index.css">`
  - `<link rel="stylesheet" href="/dist/theme.css">`
  - `<script src="/dist/bundle.js"></script>`
- **Theme-toggle sätter klassen på `<html>`** (`theme-light` eller `theme-dark`).
- **theme.css styr vilka variabler som gäller beroende på klass på `<html>`.**
- **Docs-sidan får INTE ha custom CSS – den ska visa exakt hur UI-paketet ser ut för en konsument.**

## 5. Best Practices
- **Ingen global pollution** – alla selectors ska vara komponent-scopade.
- **Ingen hårdkodning av styling i JS** – alltid variabler.
- **Allt ska vara pipeline-säkert och reproducibelt via `npm run build`.**
- **Docs är alltid en "riktig" konsument – ingen specialbehandling.** 