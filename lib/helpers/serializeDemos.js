/**
 * @file Serializes demos into a JSON compatible object.
 */

import { flattenDemos } from '@/helpers/flattenDemos.js';
import { serializeJavaScript } from '@/helpers/serializeJavaScript.js';

/** @typedef {import('../types').DEMOS} DEMOS */
/** @typedef {'text'|'html'} MARKUP */
/** @typedef {'all'|'status'|'none'} LOG */

/**
 * @typedef  {object} SERIALIZE
 * @property {DEMOS}  demos             Vue-Doxen demos object (to be serialized).
 * @property {MARKUP} [markup='html']   For custom components, return innerHTML or innerText
 * @property {string} [url]             URL for serializing custom component data rendered via DOM
 * @property {LOG}    [logLevel='all']  Controls what messages are logged.
 */

/**
 * Produces a JSON compatible version of all the demos.
 *
 * @param  {SERIALIZE} options  Options for serializing demos
 * @return {DEMOS}              A new object copying parts from the passed in demos.
 */
export const serializeDemos = async function (options) {
  const demos = options.demos;
  const markup = options.markup || 'html';
  const url = options.url;
  const logLevel = options.logLevel || 'all';

  /**
   * Handles logging information to the user based on their setting.
   *
   * @param {string}  message  Any text for the user to potentially see
   * @param {'error'} [type]   If the message is an error or warning
   */
  const logger = function (message, type) {
    if (
      logLevel === 'all' ||
      (
        logLevel === 'status' &&
        type === 'status'
      )
    ) {
      console.log(message);
    }
  };
  function statusLog (message) {
    logger(message, 'status');
  }
  function warningLog (message) {
    logger(message, 'warning');
  }
  if (!demos || typeof(demos) !== 'object') {
    warningLog('Vue-Doxen: Missing "demos" object in serializeDemos.');
    return;
  }

  statusLog('Vue-Doxen: Starting demo serialization.');

  statusLog('Vue-Doxen: Noramlizing and flattening demos.');
  const flattenedDemos = flattenDemos(demos);

  statusLog('Vue-Doxen: Basic serialization starting', 'status');
  const json = {};
  const needsDomCheck = {};
  for (const demoName in flattenedDemos) {
    const demo = flattenedDemos[demoName];
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

    if (demo.props && Object.keys(demo.props).length) {
      json[demoName].props = {};
      for (const propName in demo.props) {
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

    if (demo.slots && Object.keys(demo.slots).length) {
      json[demoName].slots = {};
      for (const slotName in demo.slots) {
        json[demoName].slots[slotName] = {};
        json[demoName].slots[slotName].example = demo.slots[slotName].default;
        if (demo.slots[slotName].slotProps) {
          json[demoName].slots[slotName].slotProps = demo.slots[slotName].slotProps;
        }
        // Skipping demo.slots[slotName].component for now
      }
    }

    /* EMITS*/

    if (demo.emits && Object.keys(demo.emits).length) {
      json[demoName].emits = {};
      for (const emitName in demo.emits) {
        json[demoName].emits[emitName] = {};
        const optionalEmitPropertyStrings = [
          'description',
          'value',
          'example'
        ];
        for (const key of optionalEmitPropertyStrings) {
          if (
            demo.emits[emitName][key] &&
            typeof(demo.emits[emitName][key]) === 'string'
          ) {
            json[demoName].emits[emitName][key] = demo.emits[emitName][key];
          }
        }
        // VALIDATOR
        if (
          demo.emits[emitName].validator &&
          typeof(demo.emits[emitName].validator) === 'function'
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
      warningLog(
        'Some demo information may be stored in custom components and ' +
        'will not be present in the serialized JSON version of the demo. ' +
        'To include this information, follow the advanced instructions: ' +
        'https://TheJaredWilcurt.com/vue-doxen/mcp#advanced'
      );
    } else {
      try {
        // Dynamic import so Playwright is never bundled into the library
        const playwrightModule = 'playwright';
        const playwright = await import(/* @vite-ignore */ playwrightModule);
        chromium = playwright.chromium;
      } catch {
        throw (
          'Vue-Doxen: Advanced serializeDemos features require Playwright.\n' +
          'Either remove the "url" from serializeDemos or run:\n' +
          'npm i -D playwright && npx playwright install'
        );
      }
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'load' });

      statusLog('Vue-Doxen: Using Playwright to serialize custom components used in demos');
      for (const demoName in needsDomCheck) {
        statusLog('Vue-Doxen: Getting additional component context for ' + demoName);
        for (const topLevelValue in needsDomCheck[demoName]) {
          const navSelector = '[data-doxen-nav-serialize="doxen-sidebar-' + demoName + '"]';
          await page.waitForSelector(navSelector, { timeout: 5000 }).catch(() => {});
          await page.locator(navSelector).click();
          const selector = '[data-doxen-serialize="' + topLevelValue + '"]';
          const element = await page.$(selector);
          if (element) {
            // .evaluate() runs in the browser scope, so it does not
            // have access to variables in higher scopes
            const domContents = await element.evaluate((node) => {
              function childIsHidden (child) {
                const style = window.getComputedStyle(child);
                const styles = {};
                (child?.attributes?.style?.value?.replaceAll(' ', '') || '')
                  .split(';')
                  .forEach((keyValue) => {
                    const [key, value] = keyValue.split(':');
                    styles[key] = value;
                  });
                return (
                  style.display === 'none' ||
                  style.visibility === 'hidden' ||
                  style.opacity === '0' ||
                  styles.display === 'none' ||
                  styles.visibility === 'hidden' ||
                  styles.opacity === '0' ||
                  styles.opacity === '0.0'
                );
              }
              const cloneHtml = node.cloneNode(true);
              const cloneText = node.cloneNode(true);
              cloneHtml.querySelectorAll('*').forEach((child) => {
                if (childIsHidden(child)) {
                  child.remove();
                } else {
                  child.removeAttribute('data-applied-style-tokens');
                  child.removeAttribute('data-style-tokens');
                  child.removeAttribute('data-v-inspector');
                  child.removeAttribute('data-doxen-serialize');
                  child.removeAttribute('data-doxen-nav-serialize');
                }
              });
              cloneText.querySelectorAll('*').forEach((child) => {
                if (childIsHidden(child)) {
                  child.remove();
                } else if (child.childNodes) {
                  for (let i = 0; i < Array.from(child.childNodes).length; i++) {
                    const node = child.childNodes[i];
                    if (node.nodeName === '#text' && node.nodeValue) {
                      child.childNodes[i].nodeValue = child.childNodes[i].nodeValue.trim() + 'REPLACE_WITH_A_RETURN';
                    }
                  }
                }
              });
              return {
                innerHtml: cloneHtml.innerHTML,
                innerText: (cloneText.innerText).replaceAll('REPLACE_WITH_A_RETURN', '\n')
              };
            });

            if (
              markup === 'text' &&
              domContents.innerText &&
              domContents.innerText.trim()
            ) {
              json[demoName][topLevelValue] = domContents.innerText;
            }
            if (
              markup === 'html' &&
              domContents.innerHTML &&
              domContents.innerHTML.trim()
            ) {
              json[demoName][topLevelValue] = domContents.innerHTML.trim();
            }

            let domContent = domContents.innerHTML;
            if (markup === 'text') {
              domContent = domContents.innerText;
            }
            if (domContent && domContent.trim()) {
              if (markup === 'text') {
                json[demoName][topLevelValue] = domContent;
              } else {
                json[demoName][topLevelValue] = domContent.trim();
              }
            }
          }
        }
      }
      await browser.close();
    }
  }

  statusLog('Vue-Doxen: Demo serialization complete.');
  return json;
};
