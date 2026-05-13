# DevRef — Project Specification v1.0

## Vision

DevRef is a personal, static, GitHub Pages–hosted reference tool for developers. Its purpose is to serve as a quick-access cheat sheet when returning to a programming language after a long break — not a full tutorial, but a structured set of bite-sized reminders with code examples.

No backend. No framework. No build step. Pure HTML + CSS + JS reading from JSON files.

---

## Architecture

```
devref/
├── index.html          ← Single page app shell
├── style.css           ← All styles
├── app.js              ← All logic (load JSON, render UI, handle navigation)
└── data/
    ├── java.json
    ├── python.json
    └── (future languages added here)
```

- `index.html` is the only HTML file. Everything renders dynamically via JS.
- Each language has its own JSON file under `data/`.
- `app.js` fetches the correct JSON on demand (only when that language is selected).
- No npm, no build tools, no dependencies. Deployable directly to GitHub Pages.

---

## JSON Schema

Each language file (`data/java.json`, etc.) follows this exact structure:

```json
{
  "language": "Java",
  "topics": [
    {
      "id": "classes",
      "title": "Classes",
      "description": "A class is a blueprint for creating objects. It defines attributes (fields) and behaviors (methods) that its instances will have.",
      "best_practices": [
        "Use PascalCase for class names (e.g. UserAccount, not userAccount)",
        "Keep classes focused on a single responsibility",
        "Declare fields as private and expose them through getters/setters"
      ],
      "code": "public class Dog {\n    private String name;\n    private int age;\n\n    public Dog(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    public String getName() {\n        return name;\n    }\n}"
    }
  ]
}
```

Fields per topic:
- `id` — unique slug used for navigation (no spaces, lowercase)
- `title` — display name shown in the topic list and page heading
- `description` — 2 to 4 sentences max. Plain language, no jargon overload.
- `best_practices` — array of 2 to 4 short strings. Actionable, not theoretical.
- `code` — single string with `\n` for line breaks. Realistic, runnable example.

---

## UI Layout

```
┌──────────────┬────────────────────────────────────────────────┐
│  LEFT PANEL  │  CONTENT AREA                                  │
│  (languages  │                                                │
│   + topics)  │  [Topic Title]                                 │
│              │                                                │
│  > Java      │  [Description paragraph]                       │
│    - Classes │                                                │
│    - Methods │  ✅ Best Practices                             │
│    - If/Else │  • Practice one                                │
│    - Loops   │  • Practice two                                │
│    - ...     │                                                │
│              │  [Code block]                                  │
│  > Python    │                                                │
│  > HTML      │                                                │
└──────────────┴────────────────────────────────────────────────┘
```

**Left panel behavior:**
- Lists all available languages. Clicking a language expands its topic list (accordion style).
- Only one language is expanded at a time.
- Active topic is visually highlighted in the list.
- Panel is always visible (no hamburger menu needed for desktop).

**Content area behavior:**
- On first load: show a neutral welcome message ("Select a language to get started").
- When a topic is selected: render its title, description, best practices, and code block.
- No page reloads. Everything is rendered in-place by JS.

---

## Visual Design

**Philosophy:** Clean documentation style. Readable. No distractions. Think MDN or a well-formatted Word document.

**Layout:**
- Left panel: fixed width ~240px, full viewport height
- Content area: fills the rest, max-width ~860px, centered with padding

**Colors:**
- Left panel background: `#2b2b2b` (dark grey)
- Left panel text: `#f0f0f0` (off-white)
- Left panel active topic: highlighted with a subtle accent (e.g. `#4a90d9` blue or `#5a9e6f` green — pick whichever fits cleaner)
- Left panel hover: slightly lighter than background, subtle
- Content area background: `#ffffff`
- Content area text: `#1a1a1a`
- Code block background: `#f4f4f4` with a left border accent
- Code block text: monospace font, `#2d2d2d`

**Typography:**
- Body: system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- Code: `'Courier New', Courier, monospace`
- Topic title in content area: large, clean (`h1` or `h2`)
- Description: regular weight, comfortable line height (~1.6)

**No external dependencies.** No Google Fonts, no icon libraries, no CSS frameworks.

---

## Java Topics to Generate (v1.0)

Generate `data/java.json` with the following topics (in this order):

1. `classes` — Classes
2. `methods` — Methods
3. `constructors` — Constructors
4. `variables` — Variable Types (int, String, boolean, double, etc.)
5. `conditionals` — If / Else / Else If
6. `switch` — Switch Statements
7. `for-loop` — For Loop
8. `while-loop` — While Loop
9. `foreach` — For-Each Loop
10. `arrays` — Arrays
11. `arraylist` — ArrayList
12. `hashmaps` — HashMaps
13. `interfaces` — Interfaces
14. `inheritance` — Inheritance & extends
15. `exceptions` — Try / Catch / Finally
16. `access-modifiers` — Access Modifiers (public, private, protected)
17. `static` — Static Keyword
18. `enums` — Enums
19. `lambda` — Lambda Expressions
20. `streams` — Streams API

---

## Behavior Details

- Language list in left panel is generated dynamically from an index or by scanning available `.json` files. MUST be easy to extend — adding a new language means dropping a new JSON file and (at most) adding one entry to a config array in `app.js`.
- Code blocks MUST preserve indentation exactly as written in the JSON.
- No syntax highlighting library required — plain styled `<pre><code>` blocks are sufficient.
- The page MUST work when opened directly from the filesystem (`file://`) as well as when served from GitHub Pages.

---

## Success Criteria

- [ ] Opening `index.html` shows the left panel with Java listed
- [ ] Clicking Java expands a list of all 20 topics
- [ ] Clicking any topic renders its content in the right panel without a page reload
- [ ] Content shows: title, description, best practices list, and code block
- [ ] Code block preserves all indentation
- [ ] Adding a new language requires only: one new JSON file + one line in app.js
- [ ] No errors in browser console
- [ ] Works on GitHub Pages with no server-side logic

---

## Out of Scope (v1.0)

- Search functionality
- Syntax highlighting
- Dark mode toggle
- Mobile responsive layout
- User notes or annotations
- Multiple languages beyond Java
