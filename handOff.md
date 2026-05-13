# DevRef — Session Handoff

## What this project is

Static, no-build developer cheat sheet hosted on GitHub Pages.
Purpose: quick-refresh when returning to a language after a long break.
No framework, no npm, no dependencies. Pure HTML + CSS + JS + JSON.

Live: https://pablobp97.github.io/devRef/

---

## Current state (v1.1 complete)

### Languages
| Language | Topics | Status |
|---|---|---|
| Java | 20 | Complete |
| Python | 20 | Complete |

### Java topics
classes, methods, constructors, variables, conditionals, switch, for-loop, while-loop, foreach, arrays, arraylist, hashmaps, interfaces, inheritance, exceptions, access-modifiers, static, enums, lambda, streams

### Python topics
variables, functions, strings, conditionals, for-loop, while-loop, lists, tuples, dictionaries, sets, list-comprehensions, classes, inheritance, exceptions, file-io, modules, lambda, decorators, type-hints, generators

---

## File structure

```
devref/
├── index.html        # App shell — just <nav> and <main>, everything rendered by JS
├── style.css         # All styles (no external deps)
├── app.js            # All logic
├── data/
│   ├── java.json
│   └── python.json
├── README.md
└── handOff.md        # This file
```

---

## Architecture decisions to keep in mind

**Adding a new language = 2 steps only:**
1. Drop `data/<id>.json` in the data folder
2. Add one entry to the `LANGUAGES` array in `app.js`:
   ```js
   const LANGUAGES = [
     { id: 'java',   label: 'Java'   },
     { id: 'python', label: 'Python' },
     { id: 'go',     label: 'Go'     }, // ← new
   ];
   ```

**fetch() + file:// limitation:**
Browsers block `fetch()` on `file://` (Chrome specifically). Must serve locally with:
```bash
python -m http.server 8080
```
GitHub Pages works fine — this only affects local dev.

**Code blocks:**
Use `element.textContent = topic.code` (not innerHTML). Preserves indentation, safe from XSS.

**JSON schema per topic:**
```json
{
  "id": "slug-no-spaces",
  "title": "Display Name",
  "description": "2–4 sentences.",
  "best_practices": ["2–4 short actionable strings"],
  "code": "single string with \\n for line breaks"
}
```

**Accordion:** only one language open at a time. Logic is in `handleLanguageClick()` in app.js.

**Fetch cache:** `fetchedData` object in app.js — JSON fetched once per language per session, re-clicks use cache.

---

## What's explicitly out of scope (v1.0 / v1.1 spec)

- Search functionality
- Syntax highlighting
- Dark mode toggle
- Mobile responsive layout
- User notes or annotations

These were deferred by design — bring them up before starting if you want to add any.

---

## Suggested next steps

- Add more languages (JavaScript, Go, Rust, SQL are natural candidates)
- Add syntax highlighting (Prism.js or highlight.js are lightweight drop-ins)
- Mobile/responsive layout for the left panel
- Keyboard navigation (arrow keys through topics)
- URL hash-based deep linking (e.g. `#java/lambdas` loads that topic directly)

---

## How to run locally

```bash
cd /home/pablo/Programming/devRef
python -m http.server 8080
# open http://localhost:8080
```
