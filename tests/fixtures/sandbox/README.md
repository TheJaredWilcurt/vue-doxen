# Test Fixtures

Fixtures for testing `serializeDemos` — the function that converts VueDoxen demo objects into plain JSON for AI/MCP consumption.

## How It Works

VueDoxen demos can define `description`, `title`, `importStatement`, and `deprecationNotice` as either plain strings or Vue component objects (`{ component, props }`). When they're components, the text only exists after the component renders in a browser. `serializeDemos` uses Playwright to visit each demo's page, find the rendered text via `data-doxen-serialize` attributes, and extract it into the JSON.

This folder contains a self-contained test app that proves the full pipeline works without needing atc-alloy or any external codebase.

## Running the Demo

```bash
npm run build:library
node scripts/runSerializeDemo.js
```

This starts a Vite dev server on port 5199, loads the demos via SSR, runs `serializeDemos` with Playwright extraction, and writes the result to `SERIALIZED-OUTPUT.json`.

## Files

### Test Server

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point for the Vite dev server |
| `serializeTestRouter.js` | Vue app with hash routing — renders each demo at `/#/DemoName` using `VueDoxen` |
| `serializeTestDemos.js` | Shared demo definitions used by both the test server and `runSerializeDemo.js` |

### DxButton — Realistic Demo

Modeled after real atc-alloy demos (like `BsButtonDemo.vue`). All four text fields are Vue components, the same way atc-alloy uses `BsdsDescription` and `ImportStatement`.

| File | Purpose |
|------|---------|
| `DxButton.vue` | A button component with 6 props (including validators), 1 emit, 1 slot |
| `DxButtonDescription.vue` | Description component — renders paragraphs, code references, and a docs link |
| `DxButtonImport.vue` | Import statement component — takes `name` and `slim` props, builds import strings dynamically |
| `DxButtonDeprecation.vue` | Deprecation notice component — renders a deprecation banner with migration guidance |

### Simple Demos

Used by Playwright tests to cover the simpler field types.

| File | Purpose |
|------|---------|
| `DescriptionWrapper.vue` | Renders HTML from a `message` prop (component + props pattern) |
| `StandaloneDescription.vue` | Static template-only text (component-only pattern) |

### Other

| File | Purpose |
|------|---------|
| `SERIALIZED-OUTPUT.json` | Output of `runSerializeDemo.js` — the final JSON showing all demos serialized |
| `serializeTestApp.vue` | Legacy fixture used by the sync-only Playwright test |

## Demo Types in serializeTestDemos.js

- **DxButton** — realistic: all 4 text fields are Vue SFC components with props, emits, slots
- **StringDemo** — all fields are plain strings
- **ComponentDemo** — `description` is a component with props
- **ComponentOnlyDemo** — `description` is a component with no props (text lives in the template)
