import { test, expect } from '@playwright/test';

// Imports from the built dist — run `npm run build:library` before these tests.
// This avoids needing Vite alias resolution (@/) and .vue SFC compilation at runtime.
import { serializeDemos } from '../../dist/vue-doxen.js';

const testDemos = {
  StringDemo: {
    component: {
      name: 'StringDemo',
      template: '<div>String demo</div>',
      props: {
        size: {
          type: String,
          default: 'md',
          validator: (v) => ['sm', 'md', 'lg'].includes(v)
        }
      }
    },
    description: '<p>A simple <strong>string</strong> description.</p>',
    importStatement: 'import { StringDemo } from \'my-lib\';',
    propsToDemo: {
      size: { description: 'Controls the size.' }
    },
    emitsToDemo: {
      clicked: { description: 'Emitted on click.' }
    },
    slotsToDemo: { default: 'Slot content' }
  },
  ComponentDemo: {
    component: {
      name: 'ComponentDemo',
      template: '<div>Component demo</div>',
      props: {
        disabled: {
          type: Boolean,
          default: false
        }
      }
    },
    description: {
      component: {
        name: 'DescriptionWrapper',
        template: '<div v-html="message"></div>',
        props: { message: { type: String, default: '' } }
      },
      props: {
        message: '<p>Wrapper description with <code>HTML</code>.</p>'
      }
    }
  },
  ComponentOnlyDemo: {
    component: {
      name: 'ComponentOnlyDemo',
      template: '<div>Component only demo</div>',
      props: {}
    },
    description: {
      component: {
        name: 'StandaloneDescription',
        template:
          '<div><p>Template-only description text.</p><ul><li>Feature one</li></ul></div>'
      }
    }
  }
};

const expectedOutput = {
  StringDemo: {
    title: null,
    description: '<p>A simple <strong>string</strong> description.</p>',
    import: 'import { StringDemo } from \'my-lib\';',
    deprecated: false,
    deprecationNotice: null,
    props: {
      size: {
        type: 'String',
        required: false,
        default: 'md',
        allowed: ['sm', 'md', 'lg'],
        description: 'Controls the size.'
      }
    },
    emits: {
      clicked: { description: 'Emitted on click.' }
    },
    slots: ['default']
  },
  ComponentDemo: {
    title: null,
    description: null,
    import: null,
    deprecated: false,
    deprecationNotice: null,
    props: {
      disabled: {
        type: 'Boolean',
        required: false,
        default: false,
        allowed: null,
        description: null
      }
    },
    emits: {},
    slots: []
  },
  ComponentOnlyDemo: {
    title: null,
    description: null,
    import: null,
    deprecated: false,
    deprecationNotice: null,
    props: {},
    emits: {},
    slots: []
  }
};

test.describe('serializeDemos', () => {
  test('Sync mode resolves string fields and component descriptions, leaves unresolvable as null', async () => {
    const result = await serializeDemos(testDemos);
    expect(result)
      .toEqual(expectedOutput);
  });
});

// Playwright-mode tests — these require the test server running at localhost:5199
// (started automatically by playwright.config.js webServer).
// The test server renders each demo at /#/DemoName via VueDoxenCustom,
// so serializeDemos can navigate there and extract text from data-doxen-serialize elements.
test.describe('serializeDemos with Playwright extraction', () => {
  const baseUrl = 'http://localhost:5199';

  test('Playwright resolves component+props description to text', async () => {
    const demos = {
      ComponentDemo: testDemos.ComponentDemo
    };
    const result = await serializeDemos(demos, {
      playwright: { baseUrl }
    });
    expect(result.ComponentDemo.description)
      .not.toEqual(null);
    expect(result.ComponentDemo.description)
      .toContain('Wrapper description');
    expect(result.ComponentDemo.description)
      .toContain('HTML');
  });

  test('Playwright resolves component-only description to text', async () => {
    const demos = {
      ComponentOnlyDemo: testDemos.ComponentOnlyDemo
    };
    const result = await serializeDemos(demos, {
      playwright: { baseUrl }
    });
    expect(result.ComponentOnlyDemo.description)
      .not.toEqual(null);
    expect(result.ComponentOnlyDemo.description)
      .toContain('Template-only description text');
    expect(result.ComponentOnlyDemo.description)
      .toContain('Feature one');
  });

  test('String fields still work correctly in Playwright mode', async () => {
    const demos = {
      StringDemo: testDemos.StringDemo
    };
    const result = await serializeDemos(demos, {
      playwright: { baseUrl }
    });
    // String fields resolve in sync pass — Playwright pass skips them
    expect(result.StringDemo.description)
      .toEqual('<p>A simple <strong>string</strong> description.</p>');
    expect(result.StringDemo.import)
      .toEqual('import { StringDemo } from \'my-lib\';');
  });
});
