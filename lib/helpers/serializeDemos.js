import { processDemos } from '@/helpers/componentHelpers.js';
import {
  combinePropsAndPropsToDemo,
  getSlotDataFromComponent,
  getDefaultValue,
  typeToString
} from '@/helpers/demoHelpers.js';

/**
 * Resolves a field (description, importStatement, title, deprecationNotice)
 * to a string. Plain text strings are returned as-is (with any HTML markup preserved).
 * Component objects return null here and are resolved later via Playwright.
 *
 * @param  {string|object} field      The field value from the demo
 * @param  {object}        resolvers  Optional resolvers map { ComponentName: (props) => string }
 * @return {string|null}              Resolved text or null
 */
const resolveField = function (field, resolvers) {
  if (typeof field === 'string') {
    return field;
  }
  if (field && typeof field === 'object' && field.component) {
    const componentName = field.component.name || field.component.__name;
    if (resolvers && componentName && resolvers[componentName]) {
      return resolvers[componentName](field.props || {});
    }
  }
  return null;
};

/**
 * Serializes a single prop definition into a JSON-safe object.
 *
 * @param  {object} propDef      Combined prop definition
 * @param  {object} propsToDemo  The propsToDemo entry for this prop (may have description, etc.)
 * @return {object}              Serialized prop
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
 * Serializes emits from a demo into a JSON-safe object.
 *
 * @param  {object} demo  A processed demo object
 * @return {object}       Serialized emits
 */
const serializeEmits = function (demo) {
  const emits = {};

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

  addEmits(demo.component?.emits, true);
  addEmits(demo.component?.emits, false);
  addEmits(demo.component?.emitsToDemo, false);
  addEmits(demo.emitsToDemo, false);

  return emits;
};

/**
 * Serializes slots from a demo into an array of slot names.
 *
 * @param  {object} demo  A processed demo object
 * @return {string[]}     Array of slot names
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
 * Serializes VueDoxen demos into a JSON-safe object for AI consumption.
 *
 * String fields are returned as-is (with any HTML markup preserved).
 * Component-based fields (e.g. a Vue component passed as a description)
 * are resolved via Playwright by rendering the demo page in a headless
 * browser and reading the visible text from the DOM.
 *
 * @param  {object} demos    VueDoxen demos object
 * @param  {object} options  Optional configuration
 * @param  {object} options.playwright  { baseUrl, demoPath? } — enables Playwright rendering
 * @param  {object} options.resolvers   { ComponentName: (props) => string } — manual resolvers
 * @return {object}          Serialized demos, JSON-safe
 */
export const serializeDemos = async function (demos, options) {
  options = options || {};
  const resolvers = options.resolvers || {};
  const playwrightOptions = options.playwright || null;

  const processedDemos = processDemos(demos);
  const result = {};

  const fieldsToResolve = [
    'description',
    'importStatement',
    'title',
    'deprecationNotice'
  ];

  // First pass: sync resolution
  for (const demoName in processedDemos) {
    const demo = processedDemos[demoName];
    const entry = {};

    // Resolve text fields
    for (const fieldName of fieldsToResolve) {
      const value = demo[fieldName] || demo.component?.[fieldName];
      entry[fieldName] = resolveField(value, resolvers);
    }

    // Rename importStatement to import in output
    entry.import = entry.importStatement;
    delete entry.importStatement;

    // Rename deprecationNotice to deprecated boolean + text
    entry.deprecated = !!entry.deprecationNotice;
    entry.deprecationNotice = entry.deprecationNotice || null;

    // Props
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

    // Emits
    entry.emits = serializeEmits(demo);

    // Slots
    entry.slots = serializeSlots(demo);

    result[demoName] = entry;
  }

  // Second pass: Playwright for unresolved fields
  if (playwrightOptions) {
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

    // Collect demos that have unresolved fields
    const unresolvedDemos = [];
    for (const demoName in result) {
      const entry = result[demoName];
      const hasUnresolved = fieldsToResolve.some((fieldName) => {
        const key = fieldName === 'importStatement' ? 'import' : fieldName;
        const rawValue =
          processedDemos[demoName][fieldName] ||
          processedDemos[demoName].component?.[fieldName];
        return rawValue && entry[key] === null;
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
          const url = demoPath ?
            demoPath(demoName) :
            baseUrl + '/#/' + demoName;

          await page.goto(url, { waitUntil: 'networkidle' });

          for (const fieldName of fieldsToResolve) {
            const key = fieldName === 'importStatement' ? 'import' : fieldName;
            if (result[demoName][key] !== null) {
              continue;
            }
            const selector = '[data-doxen-serialize="' + fieldName + '"]';
            const el = await page.$(selector);
            if (el) {
              const text = await el.textContent();
              if (text && text.trim()) {
                result[demoName][key] = text.trim().replace(/\s+/g, ' ');
              }
            }
          }
        }
      } finally {
        await browser.close();
      }

      for (const demoName of unresolvedDemos) {
        result[demoName].deprecated = !!result[demoName].deprecationNotice;
      }
    }
  }

  return result;
};
