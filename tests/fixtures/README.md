# Test Fixtures for `serializeDemos`

Test infrastructure for `serializeDemos` — the function that converts VueDoxen
demo objects into plain JSON for AI/MCP consumption.

## How the pieces fit together

```
components/          Vue components used by demo definitions
     │
     ▼
  demos.js           Demo objects referencing those components
     │
     ├──▶ router.js + index.html    Vite dev server (one route per demo)
     │         │
     │         ▼
     │    Playwright tests           Navigate to /#/DemoName, extract text
     │
     └──▶ runSerializeDemo.js        Same server, writes SERIALIZED-OUTPUT.json
               │
               ▼
          sandbox/SERIALIZED-OUTPUT.json
```

## Files

### Components (`components/`)

Test Vue components referenced by demo definitions.

| Component | Pattern | Purpose |
|-----------|---------|---------|
| `DescriptionWrapper.vue` | Component + props | Renders HTML from a `message` prop |
| `StandaloneDescription.vue` | Component only | Static text lives entirely in the `<template>` |
| `DxButton.vue` | Realistic component | Button with 6 props, 1 emit, 1 slot |
| `DxButtonDescription.vue` | Component only | Description paragraphs for DxButton |
| `DxButtonImport.vue` | Component + props | Builds import strings from `name` and `slim` props |
| `DxButtonDeprecation.vue` | Component only | Deprecation banner for DxButton |

### Demo definitions

| File | Purpose |
|------|---------|
| `demos.js` | Single source of truth — every demo object lives here |

### Test server

| File | Purpose |
|------|---------|
| `router.js` | Vue app with hash routing — renders each demo at `/#/DemoName` via VueDoxen |
| `index.html` | Entry point for the Vite dev server (port 5199) |

### Sandbox (delete before merging)

| File | Purpose |
|------|---------|
| `sandbox/SERIALIZED-OUTPUT.json` | Output artifact from `scripts/runSerializeDemo.js` |
| `sandbox/README.md` | Documents the sandbox |

## Demo types in `demos.js`

| Demo | What it tests |
|------|---------------|
| **StringDemo** | All text fields are plain strings — resolved in sync pass |
| **ComponentDemo** | `description` is a component + props — needs Playwright or resolver |
| **ComponentOnlyDemo** | `description` is a component with no props — needs Playwright |
| **DxButton** | Realistic: all 4 text fields are Vue SFC components with props/emits/slots |
