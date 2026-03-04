import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/* eslint-disable-next-line import/no-extraneous-dependencies */
import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Expected output — loaded from the checked-in fixture.
// ---------------------------------------------------------------------------
const expectedPath = resolve(import.meta.dirname, '..', 'fixtures', 'expected-output.json');
const expectedOutput = JSON.parse(readFileSync(expectedPath, 'utf-8'));

// Strip HTML tags so we can compare expected values (which may contain HTML)
// against textContent (which is plain text from the rendered DOM).
function stripHtml (str) {
  return str.replace(/<[^>]+>/g, '');
}

// ---------------------------------------------------------------------------
// Which fields to verify per demo. Only component-based text fields are
// testable in the browser — string-based fields render data-doxen-serialize
// on a wrapper element (e.g. <h3>Usage</h3>) rather than the text itself.
// String fields are already covered by unit tests.
//
// Keys are data-doxen-serialize attribute values; values map to the
// corresponding key in expected-output.json ('importStatement' → 'import').
// ---------------------------------------------------------------------------
const COMPONENT_FIELDS_BY_DEMO = {
  ComponentDemo: {
    description: 'description'
  },
  ComponentOnlyDemo: {
    description: 'description'
  },
  DxButton: {
    description: 'description',
    importStatement: 'import',
    deprecationNotice: 'deprecationNotice'
  }
};

// ---------------------------------------------------------------------------
// Browser-based tests — the test server at localhost:5199 is started
// automatically by playwright.config.js webServer. Each demo is rendered at
// /#/DemoName via VueDoxen. These tests navigate there and verify the text
// content of [data-doxen-serialize] elements matches expected-output.json.
// ---------------------------------------------------------------------------
const baseUrl = 'http://localhost:5199';

test.describe('serializeDemos — rendered text extraction', () => {
  for (const [demoName, fieldMap] of Object.entries(COMPONENT_FIELDS_BY_DEMO)) {
    test(demoName + ': component text fields match expected output', async ({ page }) => {
      await page.goto(baseUrl + '/#/' + demoName);

      for (const [serializeAttr, outputKey] of Object.entries(fieldMap)) {
        const expectedText = stripHtml(expectedOutput[demoName][outputKey]);
        const locator = page.locator('[data-doxen-serialize="' + serializeAttr + '"]');
        const text = await locator.textContent();
        expect(text)
          .toContain(expectedText.substring(0, 40));
      }
    });
  }
});
