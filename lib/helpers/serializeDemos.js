/**
 * @file Converts VueDoxen demos into plain JSON that AI tools can consume.
 *
 * VueDoxen demos contain a mix of structured data (props, emits, slots) and text
 * fields (description, importStatement, title, deprecationNotice). The text fields
 * can be either plain strings OR Vue components. Strings are trivial to serialize,
 * but component-based fields contain their text inside a rendered template.
 *
 * serializeDemos handles this with a two-pass approach:
 *
 *   Pass 1 (sync): Extract strings directly, or use a manual resolver if provided.
 *   Pass 2 (Playwright, opt-in): For any fields still null after Pass 1, launch a
 *                   headless browser, navigate to the rendered demo page, and read
 *                   the visible text from the DOM via data-doxen-serialize selectors.
 *
 * Most consumers only need Pass 1. Pass 2 is for codebases where text
 * fields are Vue components with content baked into their templates.
 */

import { processDemos } from '@/helpers/componentHelpers.js';
import {
  combinePropsAndPropsToDemo,
  getSlotDataFromComponent,
  getDefaultValue,
  typeToString
} from '@/helpers/demoHelpers.js';

/**
 * The output JSON uses 'import' as the key name, but VueDoxen demos use
 * 'importStatement' (because 'import' is a reserved word in JS). This map
 * handles the rename so we don't scatter ternaries throughout the code.
 */
const OUTPUT_KEY = {
  description: 'description',
  importStatement: 'import',
  title: 'title',
  deprecationNotice: 'deprecationNotice'
};

/**
 * The four text fields on a demo that may be strings or Vue components.
 * Order doesn't matter — they are all processed the same way.
 */
const TEXT_FIELDS = Object.keys(OUTPUT_KEY);

/**
 * Attempts to resolve a single text field to a string without rendering.
 *
 * Three outcomes:
 *   1. field is a string          → return it as-is (HTML markup preserved)
 *   2. field is a component object → try the manual resolver for that component name;
 *                                    if no resolver, return null (Playwright may resolve it later)
 *   3. field is anything else      → return null
 *
 * @param  {string|object} field      The field value from the demo
 * @param  {object}        resolvers  { ComponentName: (props) => string } manual overrides
 * @return {string|null}              Resolved text, or null if it needs Playwright
 */
const resolveField = function (field, resolvers) {
  // Plain strings are already usable — return as-is.
  if (typeof field === 'string') {
    return field;
  }
  // Component object: { component: SomeVueComponent, props: { ... } }
  // Check if a manual resolver was registered for this component name.
  if (field && typeof field === 'object' && field.component) {
    const componentName = field.component.name || field.component.__name;
    if (resolvers && componentName && resolvers[componentName]) {
      return resolvers[componentName](field.props || {});
    }
  }
  // Not a string and no resolver — needs Playwright or stays null.
  return null;
};

/**
 * Converts a single prop definition (merged from component.props + propsToDemo)
 * into a flat, JSON-safe object with consistent keys.
 *
 * @param  {object} propDef  Combined prop definition (type, default, allowed, description, etc.)
 * @return {object}          { type, required, default, allowed, description, [deprecated], [min], [max], [example] }
 */
const serializeProp = function (propDef) {
  const type = propDef.type !== undefined ? typeToString(propDef.type) : null;
  const defaultValue =
    propDef.default !== undefined ?
      getDefaultValue(propDef.default) :
      undefined;
  const allowed = propDef.allowed || null;
  const required = !!propDef.required;
  const description = propDef.description || null;

  const serialized = {
    type,
    required,
    default: defaultValue === undefined ? null : defaultValue,
    allowed,
    description
  };

  if (propDef.deprecated) {
    serialized.deprecated = true;
  }
  if (typeof propDef.min === 'number') {
    serialized.min = propDef.min;
  }
  if (typeof propDef.max === 'number') {
    serialized.max = propDef.max;
  }
  if (propDef.example !== undefined) {
    serialized.example = propDef.example;
  }

  return serialized;
};

/**
 * Merges emit definitions from all sources into a single object.
 *
 * Vue components declare emits in several places:
 *   - component.emits       (array of names, or object with validators)
 *   - component.emitsToDemo (object with descriptions — VueDoxen convention)
 *   - demo.emitsToDemo      (same, but at the demo level — takes priority)
 *
 * @param  {object} demo  A processed demo object
 * @return {object}       { emitName: { description? } }
 */
const serializeEmits = function (demo) {
  const emits = {};

  // Merge a single emits source into the accumulator.
  const addEmits = function (source, isArray) {
    if (!source) {
      return;
    }
    if (isArray && Array.isArray(source)) {
      for (const name of source) {
        emits[name] = emits[name] || {};
      }
    } else if (typeof source === 'object' && !Array.isArray(source)) {
      for (const name in source) {
        emits[name] = emits[name] || {};
        const value = source[name];
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          if (value.description) {
            emits[name].description = value.description;
          }
        }
      }
    }
  };

  // Process sources in priority order (later calls override earlier ones).
  addEmits(demo.component?.emits, true);
  addEmits(demo.component?.emits, false);
  addEmits(demo.component?.emitsToDemo, false);
  addEmits(demo.emitsToDemo, false);

  return emits;
};

/**
 * Collects slot names from all sources into a flat array.
 *
 * Slot declarations can live in:
 *   - component (detected by getSlotDataFromComponent — scans the template)
 *   - component.slots / component.slotsToDemo
 *   - demo.slotsToDemo
 *
 * @param  {object}   demo  A processed demo object
 * @return {string[]}       Array of slot names
 */
const serializeSlots = function (demo) {
  const slotData = getSlotDataFromComponent(demo.component) || {};

  const addSlots = function (source) {
    if (!source) {
      return;
    }
    if (Array.isArray(source)) {
      for (const name of source) {
        slotData[name] = slotData[name] || {};
      }
    } else if (typeof source === 'object') {
      for (const name in source) {
        slotData[name] = slotData[name] || {};
      }
    }
  };

  addSlots(demo.component?.slots);
  addSlots(demo.component?.slotsToDemo);
  addSlots(demo.slotsToDemo);

  return Object.keys(slotData);
};

/**
 * Converts VueDoxen demos into a flat, JSON-safe object.
 *
 * @param  {object} demos                VueDoxen demos object (same shape passed to <VueDoxen>)
 * @param  {object} [options]
 * @param  {object} [options.playwright]  Enables Pass 2: { baseUrl: string, demoPath?: (name) => string }
 * @param  {object} [options.resolvers]   Manual text extractors: { ComponentName: (props) => string }
 * @return {Promise<object>}             One entry per demo, fully JSON-safe
 */
export const serializeDemos = async function (demos, options) {
  options = options || {};
  const resolvers = options.resolvers || {};
  const playwrightOptions = options.playwright || null;

  const processedDemos = processDemos(demos);
  const result = {};


  /* ------------------------------------------------------------------ */
  /*  PASS 1 — Synchronous resolution                                   */
  /*  Extract everything we can without a browser: strings, structured   */
  /*  data (props/emits/slots), and any manual resolvers.                */
  /* ------------------------------------------------------------------ */

  for (const demoName in processedDemos) {
    const demo = processedDemos[demoName];
    const entry = {};

    // Text fields — check the demo-level value first, fall back to the component.
    for (const fieldName of TEXT_FIELDS) {
      const value = demo[fieldName] || demo.component?.[fieldName];
      entry[OUTPUT_KEY[fieldName]] = resolveField(value, resolvers);
    }

    // Derive the deprecated boolean from the deprecationNotice text.
    entry.deprecated = !!entry.deprecationNotice;
    entry.deprecationNotice = entry.deprecationNotice || null;

    // Props — merge component.props ← component.propsToDemo ← demo.propsToDemo.
    const propsToDemo = demo.propsToDemo || {};
    const componentProps = demo.component?.props || {};
    const componentPropsToDemo = demo.component?.propsToDemo || {};
    let combinedProps = combinePropsAndPropsToDemo(
      componentPropsToDemo,
      componentProps
    );
    combinedProps = combinePropsAndPropsToDemo(propsToDemo, combinedProps);

    entry.props = {};
    for (const propName in combinedProps) {
      entry.props[propName] = serializeProp(combinedProps[propName]);
    }

    // Emits & slots.
    entry.emits = serializeEmits(demo);
    entry.slots = serializeSlots(demo);

    result[demoName] = entry;
  }


  /* ------------------------------------------------------------------ */
  /*  PASS 2 — Playwright extraction (opt-in)                           */
  /*  For any text field that is still null (i.e. it was a Vue component */
  /*  and no manual resolver was provided), render the demo page in a   */
  /*  headless browser and read the visible text from the DOM.           */
  /*                                                                    */
  /*  This works because ComponentDemo.vue marks each text section with */
  /*  a data-doxen-serialize="fieldName" attribute, giving us a stable  */
  /*  selector to query regardless of the component's internal markup.  */
  /* ------------------------------------------------------------------ */

  if (playwrightOptions) {
    // Dynamic import so Playwright is never bundled into the library.
    // It is an optional peer dependency — only needed by build scripts.
    let chromium;
    try {
      const playwrightModule = 'playwright';
      const pw = await import(/* @vite-ignore */ playwrightModule);
      chromium = pw.chromium;
    } catch {
      throw new Error(
        'serializeDemos: Playwright mode requires "playwright" as a dependency. Install it with: npm install -D playwright'
      );
    }

    const baseUrl = playwrightOptions.baseUrl;
    const demoPath = playwrightOptions.demoPath;

    // Only visit demos that actually have unresolved component-based fields.
    // A field is "unresolved" when the raw demo value exists (it's a component
    // object, not undefined) but Pass 1 couldn't extract text from it.
    const unresolvedDemos = [];
    for (const demoName in result) {
      const entry = result[demoName];
      const hasUnresolved = TEXT_FIELDS.some((fieldName) => {
        const outKey = OUTPUT_KEY[fieldName];
        const rawValue =
          processedDemos[demoName][fieldName] ||
          processedDemos[demoName].component?.[fieldName];
        return rawValue && entry[outKey] === null;
      });
      if (hasUnresolved) {
        unresolvedDemos.push(demoName);
      }
    }

    if (unresolvedDemos.length) {
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        for (const demoName of unresolvedDemos) {
          // Default URL pattern matches VueDoxen's hash-based routing.
          // Consumers can override with demoPath for custom routing.
          const url = demoPath ?
            demoPath(demoName) :
            baseUrl + '/#/' + demoName;

          await page.goto(url, { waitUntil: 'networkidle' });

          for (const fieldName of TEXT_FIELDS) {
            const outKey = OUTPUT_KEY[fieldName];
            if (result[demoName][outKey] !== null) {
              continue;
            }
            // data-doxen-serialize attributes are added in ComponentDemo.vue.
            const selector = '[data-doxen-serialize="' + fieldName + '"]';
            const el = await page.$(selector);
            if (el) {
              const text = await el.textContent();
              if (text && text.trim()) {
                result[demoName][outKey] = text.trim().replace(/\s+/g, ' ');
              }
            }
          }
        }
      } finally {
        await browser.close();
      }

      // Recalculate deprecated — Playwright may have resolved a deprecationNotice
      // that was null after Pass 1.
      for (const demoName of unresolvedDemos) {
        result[demoName].deprecated = !!result[demoName].deprecationNotice;
      }
    }
  }

  return result;
};
