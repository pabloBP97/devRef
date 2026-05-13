# DevRef

A personal, static developer reference tool for quickly refreshing your memory on a programming language after a long break. Not a tutorial — just the essentials: descriptions, best practices, and runnable code examples.

Live at: **[your-username.github.io/devref](https://your-username.github.io/devref)**

---

## What's inside

- Java — 20 topics covering classes, methods, loops, collections, interfaces, lambdas, streams, and more

---

## Running locally

> **Note:** Browsers block `fetch()` on `file://` URLs. You need a local HTTP server.

```bash
# Python (built-in)
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

Alternatives: VS Code Live Server extension, or any static file server.

---

## Project structure

```
devref/
├── index.html        # App shell (single page)
├── style.css         # All styles
├── app.js            # All logic — fetch, render, navigation
└── data/
    └── java.json     # Java reference topics
```

No build step. No dependencies. No npm. Deploy by pushing to GitHub Pages.

---

## Adding a new language

1. Create `data/<language>.json` following the schema below
2. Add one entry to the `LANGUAGES` array in `app.js`:

```js
const LANGUAGES = [
  { id: 'java',   label: 'Java'   },
  { id: 'python', label: 'Python' }, // ← new line
];
```

That's it.

---

## JSON schema

Each language file contains a `language` name and a `topics` array:

```json
{
  "language": "Python",
  "topics": [
    {
      "id": "functions",
      "title": "Functions",
      "description": "2 to 4 sentences. Plain language, no jargon overload.",
      "best_practices": [
        "Short, actionable tip",
        "Another tip"
      ],
      "code": "def greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Alice'))"
    }
  ]
}
```

| Field | Rules |
|---|---|
| `id` | Lowercase slug, no spaces (used for internal navigation) |
| `title` | Display name shown in sidebar and content header |
| `description` | 2–4 sentences max |
| `best_practices` | 2–4 items, actionable not theoretical |
| `code` | Single string, use `\n` for line breaks — indentation is preserved exactly |

---

## Deploying to GitHub Pages

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. GitHub Pages will serve `index.html` automatically

No configuration needed. The site is fully static.
