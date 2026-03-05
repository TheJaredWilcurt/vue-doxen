/**
 * @file Serializes demos into a JSON compatible object.
 */

import { flattenDemos } from '@/helpers/flattenDemos.js';
import { serializeJavaScript } from '@/helpers/serializeJavaScript.js';

/** @typedef {import('../types').DEMOS} DEMOS */

/**
 * Produces a JSON compatible version of all the demos.
 *
 * @param  {DEMOS}  demos  Vue-Doxen demos object (to be serialized).
 * @param  {string} [url]  URL for serializing custom component data rendered via DOM
 * @return {DEMOS}         A new object copying parts from the passed in demos.
 */
export const serializeDemos = async function (demos, url) {
  const flattenedDemos = flattenDemos(demos);
  const json = {};
  const needsDomCheck = {};
  for (const demoName in flattenedDemos) {
    const demo = flattenDemos[demoName];
    json[demoName] = {};


    /* TOP LEVEL */

    const topLevelValues = [
      'deprecationNotice',
      'title',
      'name',
      'description',
      'importStatement'
    ];
    for (const topLevelValue of topLevelValues) {
      if (demo[topLevelValue]) {
        if (typeof(demo[topLevelValue]) === 'string') {
          json[demoName][topLevelValue] = demo[topLevelValue];
        } else if (demo[topLevelValue].component) {
          needsDomCheck[demoName] = needsDomCheck[demoName] || {};
          needsDomCheck[demoName][topLevelValue] = demo[topLevelValue];
        }
      }
    }


    /* PROPS */

    if (demo[demoName].props) {
      json[demoName].props = {};
      for (const propName in demo[demoName].props) {
        json[demoName].props[propName] = {};
        // TYPE
        json[demoName].props[propName].type = serializeJavaScript(demo.props[propName].type);
        // DESCRIPTION
        if (
          demo.props[propName].description &&
          typeof(demo.props[propName].description) === 'string'
        ) {
          json[demoName].props[propName].description = demo.props[propName].description;
        }
        // REQUIRED
        json[demoName].props[propName].required = !!demo.props[propName].required;
        // DEFAULT
        if (
          !demo.props[propName].required &&
          demo.props[propName].default !== undefined
        ) {
          json[demoName].props[propName].default = demo.props[propName].default;
        }
        // VALIDATOR
        if (typeof(demo.props[propName].validator) === 'function') {
          json[demoName].props[propName].validator = true;
        }
        // ALLOWED
        if (
          Array.isArray(demo.props[propName].allowed) &&
          demo.props[propName].allowed.length
        ) {
          json[demoName].props[propName].allowed = demo.props[propName].allowed;
        }
        // EXAMPLE
        if (typeof(demo.props[propName].example) === 'string') {
          json[demoName].props[propName].example = demo.props[propName].example;
        }
        // DEPRECATED
        if (typeof(demo.props[propName].deprecated) === 'boolean') {
          json[demoName].props[propName].deprecated = demo.props[propName].deprecated;
        }
        // MIN
        if (typeof(demo.props[propName].min) === 'number') {
          json[demoName].props[propName].min = demo.props[propName].min;
        }
        // MAX
        if (typeof(demo.props[propName].max) === 'number') {
          json[demoName].props[propName].max = demo.props[propName].max;
        }
      }
    }


    /* SLOTS */

    if (demo[demoName].slots) {
      json[demoName].slots = {};
      for (const slotName in demo[demoName].slots) {
        json[demoName].slots[slotName] = {};
        json[demoName].slots[slotName].example = demo[demoName].slots[slotName].default;
        if (demo[demoName].slots[slotName].slotProps) {
          json[demoName].slots[slotName].slotProps = demo[demoName].slots[slotName].slotProps;
        }
        // Skipping demo[demoName].slots[slotName].component for now
      }
    }

    /* EMITS*/

    if (demo[demoName].emits) {
      json[demoName].emits = {};
      for (const emitName in demo[demoName].emits) {
        json[demoName].emits[emitName] = {};
        const optionalEmitPropertyStrings = [
          'description',
          'value',
          'example'
        ];
        for (const key of optionalEmitPropertyStrings) {
          if (
            demo[demoName].emits[emitName][key] &&
            typeof(demo[demoName].emits[emitName][key]) === 'string'
          ) {
            json[demoName].emits[emitName][key] = demo[demoName].emits[emitName][key];
          }
        }
        // VALIDATOR
        if (
          demo[demoName].emits[emitName].validator &&
          typeof(demo[demoName].emits[emitName].validator) === 'function'
        ) {
          json[demoName].emits[emitName].validator = true;
        }
      }
    }
  }


  /* PLAYWRIGHT */

  if (Object.keys(needsDomCheck).length) {
    let chromium;
    if (!url) {
      console.log(
        'Some demo information may be stored in custom components and ' +
        'will not be present in the serialized JSON version of the demo. ' +
        'To include this information, follow the advanced instructions: ' +
        'https://TheJaredWilcurt.com/vue-doxen/mcp#advanced'
      );
    } else {
      let chromium;
      try {
        // Dynamic import so Playwright is never bundled into the library
        const playwrightModule = 'playwright';
        const playwright = await import(/* @vite-ignore */ playwrightModule);
        chromium = playwright.chromium;
      } catch {
        throw 'serializeDemos: Advanced features require running `npm i -D playwright`';
      }
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'load' });

      for (const demoName in needsDomCheck) {
        for (const topLevelValue in needsDomCheck[demoName]) {
          const navSelector = '[data-doxen-nav-serialize="doxen-sidebar-' + demoName + '"]';
          await page.waitForSelector(navSelector, { timeout: 5000 }).catch(() => {});
          await page.locator(navSelector).click();
          const selector = '[data-doxen-serialize="' + topLevelValue + '"]';
          const element = await page.$(selector);
          if (element) {
            const innerHTML = await element.$eval(selector, (node) => {
              return node.innerHTML;
            });
            if (innerHTML && innerHTML.trim()) {
              json[demoName][topLevelValue] = innerHTML.trim();
            }
          }
        }
      }
    }
  }

  return json;
};
