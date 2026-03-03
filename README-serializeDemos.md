# serializeDemos — AI-Ingestible Component Metadata

## The Problem

VueDoxen demos are designed for humans — they render interactive documentation pages in a browser. But AI tools (like MCP servers) need plain structured JSON. The challenge is that demos contain a mix of data types:

- **Props, emits, slots** — already structured data, easy to extract
- **description, importStatement, title, deprecationNotice** — can be a plain string _or_ a Vue component

When these fields are Vue components, the actual text content could live in the component's props, or it could be entirely in the component's `<template>`. There's no single way to get at it without understanding the component. `serializeDemos` solves this.

## How the System Works

### 1. The Demo Object (input)

A VueDoxen demo is a plain object that describes a component. This is what library authors already write:

```js
export const demo = {
  component: AlloyCard,
  description: "<p>Cards represent an entity.</p>",
  importStatement: makeImportStatement("AlloyCard"),
  propsToDemo: {
    background: { description: "Sets the background color." },
  },
  emitsToDemo: {
    collapseToggled: { description: "Emits when header clicked." },
  },
  slotsToDemo: {
    "header-left": "<strong>Title</strong>",
  },
};
```

Note that `description` here is a string, but `importStatement` is a component object (returned by `makeImportStatement`). Both are valid VueDoxen values — VueDoxen renders them the same way in the browser.

### 2. serializeDemos (the converter)

`serializeDemos` takes the demos object and converts everything into plain JSON. It walks each demo and:

**For structured data** (props, emits, slots) — extracts type, default, allowed values, required, descriptions, etc. directly from the component definition and `propsToDemo`/`emitsToDemo`/`slotsToDemo`.

**For text fields** (description, importStatement, title, deprecationNotice) — the field could be:

- A **string** like `'<p>Cards represent an entity.</p>'` → strip HTML → `'Cards represent an entity.'`
- A **component object** like `{ component: ImportStatement, props: { name: 'AlloyCard' } }` → needs text extraction

For component objects, `serializeDemos` tries these strategies in order:

1. **Scan the component's props for strings.** If the component was passed `{ props: { message: '<p>Hello</p>' } }`, the text `'Hello'` is right there in the props. No rendering needed.
2. **Use a manual resolver** if one was provided for that component name. This is an escape hatch for components with unusual structures.
3. **Render with Playwright** (opt-in). Launch a headless browser, navigate to the demo page, and read the visible text from the DOM. This works for _any_ component regardless of where its text lives.

If none of these produce text (and Playwright isn't enabled), the field is `null` in the output.

### 3. ComponentDemo.vue (the rendering hook)

`ComponentDemo.vue` is the VueDoxen component that renders each demo's description, title, importStatement, and deprecationNotice sections in the browser. Each of these sections is wrapped in a `<div>` with a `data-doxen-serialize` attribute:

```html
<div data-doxen-serialize="description">
  <!-- renders the description string or component here -->
</div>
```

When Playwright mode is enabled, `serializeDemos` navigates to the demo page and uses these attributes as selectors (`[data-doxen-serialize="description"]`) to find and extract the rendered text content. This is what makes Playwright extraction work without needing to know anything about the specific component being rendered.

### 4. The JSON Output (what atc-alloy consumes)

The final output is a flat JSON object with one entry per component:

```json
{
  "AlloyCard": {
    "title": null,
    "description": "Cards represent an entity.",
    "import": "import { AlloyCard } from 'atc-alloy';",
    "deprecated": false,
    "deprecationNotice": null,
    "props": {
      "background": {
        "type": "String",
        "required": false,
        "default": "medium",
        "allowed": ["base", "light", "medium", "inverted"],
        "description": "Sets the background and text colors."
      }
    },
    "emits": {
      "collapseToggled": { "description": "Emits when header clicked." }
    },
    "slots": ["header-left", "body-left", "footer-left"]
  }
}
```

This JSON is written to `public/mcp/alloy-components.json` in atc-alloy, where the MCP server reads and serves it to AI tools.

### End-to-End Flow

```
VueDoxen Demo Objects (written by developers)
        ↓
serializeDemos() — extracts structured data + text
        ↓  (optionally uses Playwright for component-based text fields)
        ↓
alloy-components.json — plain JSON, no Vue, no HTML
        ↓
MCP Server — serves JSON to AI tools via resources and tools
```

## Quick Start

```js
import { serializeDemos } from "vue-doxen";

// Without Playwright — extracts text from strings and component props
const result = await serializeDemos(demos);

// With Playwright — also renders components in a browser to extract any remaining text
const result = await serializeDemos(demos, {
  playwright: { baseUrl: "http://localhost:3000" },
});
```

## API

```js
serializeDemos(demos, options?)
```

- **`demos`** — VueDoxen demos object (same shape passed to `VueDoxen` / `VueDoxenCustom`)
- **`options.playwright`** — `{ baseUrl: string, demoPath?: (name) => string }` — enables Playwright rendering
- **`options.resolvers`** — `{ ComponentName: (props) => string }` — manual extraction for specific components

Returns a `Promise<object>` with one key per demo (see output example above).

Playwright is an **optional peer dependency**. Most users don't need it. Install it only if you have component-based description fields that can't be resolved from props alone:

```bash
npm install playwright
```

## Running Tests

### Unit Tests (Vitest)

```bash
npm run unit -- run
```

This runs all unit tests including `tests/unit/lib/helpers/serializeDemos.test.js` (13 tests) with the correct timezone (`TZ=America/New_York`).

The unit tests cover:

- **`stripHtml`** — tag removal, entity decoding, punctuation spacing
- **String fields** — description, importStatement extraction, props serialization (type/default/allowed/description), emits, slots
- **Component fields** — text extraction from component props, HTML stripping
- **Unresolvable fields** — returns `null` without Playwright
- **Resolvers** — manual override of component extraction
- **JSON safety** — output is fully `JSON.stringify`-able

### Playwright Integration Test

```bash
npm run build:library
npx playwright install chromium
npx playwright test --reporter=line
```

The Playwright test (`tests/playwright/serializeDemos.spec.js`) exercises browser-based extraction end-to-end via test fixture components.

## File Reference

### vue-doxen

| File                                            | Purpose                                                                   |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| `lib/helpers/serializeDemos.js`                 | Core serialization — text extraction, prop/emit/slot flattening           |
| `lib/components/ComponentDemo.vue`              | Wraps text fields in `data-doxen-serialize` divs for Playwright targeting |
| `lib/library.js`                                | Exports `serializeDemos`                                                  |
| `tests/unit/lib/helpers/serializeDemos.test.js` | Unit tests (13 tests)                                                     |
| `tests/playwright/serializeDemos.spec.js`       | Playwright integration test                                               |
| `tests/fixtures/TierTwoWrapper.vue`             | Test fixture — component with text in props                               |
| `tests/fixtures/TierThreeDescription.vue`       | Test fixture — component with text only in template                       |
| `tests/fixtures/serializeTestApp.vue`           | Test fixture — VueDoxenCustom app for Playwright                          |
| `playwright.config.js`                          | Playwright configuration                                                  |

### atc-alloy

| File                                          | Purpose                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------ |
| `scripts/icons/makeMCPIconsFile.js`           | Generates `public/mcp/alloy-icons.json`                                        |
| `scripts/components/makeMCPComponentsFile.js` | Generates `public/mcp/alloy-components.json` via `serializeDemos` + Playwright |
| `scripts/generateMCPFiles.js`                 | Entry point — runs both generators                                             |
| `scripts/mcp/server.js`                       | MCP server — serves the JSON to AI tools via stdio                             |

### Generating MCP JSON (atc-alloy)

```bash
# Icons only (no Playwright needed)
node scripts/generateMCPFiles.js

# With components (requires docs site running + vue-doxen linked)
# Terminal 1:
npm start

# Terminal 2:
node scripts/generateMCPFiles.js http://localhost:3000
```

**Note:** Until `serializeDemos` is published in a vue-doxen release, link the local copy:

```bash
# In vue-doxen
npm link

# In atc-alloy
npm link vue-doxen
```

### Running the MCP Server

```bash
npm install @modelcontextprotocol/sdk zod
node scripts/mcp/server.js
```

The server exposes:

- **Resources:** `alloy://components`, `alloy://icons`
- **Tools:** `list-components`, `lookup-component`, `list-icons`, `lookup-icon`
