# Test Fixtures for `serializeDemos`

Test components, demo definitions, and expected output for the `serializeDemos`
function. The Vite dev server serves each demo at `/#/DemoName` so Playwright
can navigate there and extract rendered text.

## Flow

```
components/*.vue  →  demos.js  →  router.js + index.html  →  Vite dev server (:5199)
                                                                     │
                                                          Playwright spec navigates
                                                          to each demo route, reads
                                                          [data-doxen-serialize] text,
                                                          compares to expected-output.json
```

## Files

- **`components/`** — Vue SFCs used by demo definitions (`DxButton`, `DescriptionWrapper`, etc.)
- **`demos.js`** — Single source of truth for all demo objects
- **`router.js`** + **`index.html`** — Vite dev server entry (hash routing, port 5199)
- **`expected-output.json`** — Known-good `serializeDemos` output; Playwright spec compares against this
- **`sandbox/`** — Delete before merging. Contains `SERIALIZED-OUTPUT.json` (actual output from `scripts/runSerializeDemo.js` for manual inspection)
