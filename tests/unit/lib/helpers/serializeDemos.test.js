import { describe, test, expect } from 'vitest';

import { serializeDemos } from '@/helpers/serializeDemos.js';

import DescriptionWrapper from '@@/fixtures/DescriptionWrapper.vue';
import StandaloneDescription from '@@/fixtures/StandaloneDescription.vue';

// ---------------------------------------------------------------------------
// Helpers — minimal demo factories to keep test data close to each test.
// ---------------------------------------------------------------------------

// Bare-minimum demo: just a component with a name and optional props definition.
const makeDemo = function (name, props) {
  return {
    component: {
      name,
      template: '<div>' + name + '</div>',
      props: props || {}
    }
  };
};

// ---------------------------------------------------------------------------

describe('serializeDemos', () => {
  // =========================================================================
  //  TEXT FIELDS (description, title, importStatement, deprecationNotice)
  //
  //  These fields accept three shapes:
  //    1. A plain string        → returned as-is (Pass 1)
  //    2. A component + props   → null without Playwright/resolver (Pass 1)
  //    3. A component, no props → null without Playwright/resolver (Pass 1)
  //
  //  Pass 2 (Playwright) resolves cases 2 & 3 by rendering in a browser.
  //  That is covered in tests/playwright/serializeDemos.spec.js.
  // =========================================================================

  describe('text fields — string values', () => {
    test('String description and importStatement pass through with HTML preserved', async () => {
      const demos = {
        MyComponent: {
          ...makeDemo('MyComponent'),
          description: '<p>A <strong>bold</strong> description.</p>',
          importStatement: 'import { MyComponent } from \'my-lib\';'
        }
      };
      const result = await serializeDemos(demos);

      expect(result.MyComponent.description)
        .toEqual('<p>A <strong>bold</strong> description.</p>');
      expect(result.MyComponent.import)
        .toEqual('import { MyComponent } from \'my-lib\';');
    });

    test('All 4 fields as strings — full round-trip', async () => {
      const demos = {
        AllStrings: {
          ...makeDemo('AllStrings'),
          description: '<p>String <em>description</em>.</p>',
          title: 'My Custom Title',
          importStatement: 'import { AllStrings } from \'my-lib\';',
          deprecationNotice: '<p>This is <strong>deprecated</strong>.</p>'
        }
      };
      const result = await serializeDemos(demos);

      expect(result.AllStrings)
        .toEqual({
          title: 'My Custom Title',
          description: '<p>String <em>description</em>.</p>',
          import: 'import { AllStrings } from \'my-lib\';',
          deprecated: true,
          deprecationNotice: '<p>This is <strong>deprecated</strong>.</p>',
          props: {},
          emits: {},
          slots: []
        });
    });
  });

  describe('text fields — component values (without Playwright)', () => {
    test('Component + props description returns null', async () => {
      const demos = {
        WithProps: {
          ...makeDemo('WithProps'),
          description: {
            component: DescriptionWrapper,
            props: { message: 'Some text' }
          }
        }
      };
      const result = await serializeDemos(demos);

      expect(result.WithProps.description)
        .toEqual(null);
    });

    test('Component-only description (no props) returns null', async () => {
      const demos = {
        NoProps: {
          ...makeDemo('NoProps'),
          description: {
            component: StandaloneDescription
          }
        }
      };
      const result = await serializeDemos(demos);

      expect(result.NoProps.description)
        .toEqual(null);
    });

    test('All 4 fields as components — all null, deprecated false', async () => {
      const demos = {
        AllComponents: {
          ...makeDemo('AllComponents'),
          description: { component: DescriptionWrapper, props: { message: 'desc' } },
          title: { component: DescriptionWrapper, props: { message: 'title' } },
          importStatement: { component: DescriptionWrapper, props: { message: 'import' } },
          deprecationNotice: { component: DescriptionWrapper, props: { message: 'deprecated' } }
        }
      };
      const result = await serializeDemos(demos);

      expect(result.AllComponents)
        .toEqual({
          title: null,
          description: null,
          import: null,
          deprecated: false,
          deprecationNotice: null,
          props: {},
          emits: {},
          slots: []
        });
    });
  });

  describe('text fields — no fields provided', () => {
    test('Missing fields default to null/false/empty', async () => {
      const demos = { Bare: makeDemo('Bare') };
      const result = await serializeDemos(demos);

      expect(result.Bare)
        .toEqual({
          title: null,
          description: null,
          import: null,
          deprecated: false,
          deprecationNotice: null,
          props: {},
          emits: {},
          slots: []
        });
    });
  });

  // =========================================================================
  //  DEPRECATION
  // =========================================================================

  describe('deprecation', () => {
    test('Deprecated is true when deprecationNotice is a truthy string', async () => {
      const demos = {
        Old: {
          ...makeDemo('Old'),
          deprecationNotice: '<p>This component is deprecated.</p>'
        }
      };
      const result = await serializeDemos(demos);

      expect(result.Old.deprecated)
        .toEqual(true);
      expect(result.Old.deprecationNotice)
        .toEqual('<p>This component is deprecated.</p>');
    });

    test('Deprecated is false when deprecationNotice is absent', async () => {
      const demos = { Current: makeDemo('Current') };
      const result = await serializeDemos(demos);

      expect(result.Current.deprecated)
        .toEqual(false);
      expect(result.Current.deprecationNotice)
        .toEqual(null);
    });
  });

  // =========================================================================
  //  PROPS
  // =========================================================================

  describe('props', () => {
    test('Serializes type, default, required, allowed, and description', async () => {
      const demos = {
        PropsDemo: {
          ...makeDemo('PropsDemo', {
            size: {
              type: String,
              default: 'md',
              validator: (v) => ['sm', 'md', 'lg'].includes(v)
            }
          }),
          propsToDemo: {
            size: { description: 'Controls the size.' }
          }
        }
      };
      const result = await serializeDemos(demos);
      const size = result.PropsDemo.props.size;

      expect(size.type)
        .toEqual('String');
      expect(size.required)
        .toEqual(false);
      expect(size.default)
        .toEqual('md');
      expect(size.allowed)
        .toEqual(['sm', 'md', 'lg']);
      expect(size.description)
        .toEqual('Controls the size.');
    });

    test('Boolean prop with no propsToDemo description', async () => {
      const demos = {
        BoolDemo: makeDemo('BoolDemo', {
          disabled: { type: Boolean, default: false }
        })
      };
      const result = await serializeDemos(demos);
      const disabled = result.BoolDemo.props.disabled;

      expect(disabled.type)
        .toEqual('Boolean');
      expect(disabled.required)
        .toEqual(false);
      expect(disabled.default)
        .toEqual(false);
      expect(disabled.allowed)
        .toEqual(null);
      expect(disabled.description)
        .toEqual(null);
    });
  });

  // =========================================================================
  //  EMITS
  // =========================================================================

  describe('emits', () => {
    test('Serializes emitsToDemo with description', async () => {
      const demos = {
        EmitDemo: {
          ...makeDemo('EmitDemo'),
          emitsToDemo: {
            clicked: { description: 'Emitted on click.' }
          }
        }
      };
      const result = await serializeDemos(demos);

      expect(result.EmitDemo.emits.clicked)
        .toEqual({ description: 'Emitted on click.' });
    });
  });

  // =========================================================================
  //  SLOTS
  // =========================================================================

  describe('slots', () => {
    test('Collects slot names from slotsToDemo', async () => {
      const demos = {
        SlotDemo: {
          ...makeDemo('SlotDemo'),
          slotsToDemo: { default: 'Slot content' }
        }
      };
      const result = await serializeDemos(demos);

      expect(result.SlotDemo.slots)
        .toContain('default');
    });
  });

  // =========================================================================
  //  MANUAL RESOLVERS (alternative to Playwright for component-based fields)
  //
  //  A resolver is a function keyed by component name. When resolveField
  //  encounters a component object, it checks for a matching resolver before
  //  returning null. This lets build scripts extract text without a browser.
  // =========================================================================

  describe('manual resolvers', () => {
    test('Resolver extracts text from a component + props field', async () => {
      const demos = {
        Resolved: {
          ...makeDemo('Resolved'),
          description: {
            component: DescriptionWrapper,
            props: { message: 'Hello from resolver' }
          }
        }
      };
      const result = await serializeDemos(demos, {
        resolvers: {
          DescriptionWrapper: (props) => 'Resolved: ' + props.message
        }
      });

      expect(result.Resolved.description)
        .toEqual('Resolved: Hello from resolver');
    });

    test('Resolvers work across all 4 text fields', async () => {
      const demos = {
        FullResolver: {
          ...makeDemo('FullResolver'),
          description: { component: DescriptionWrapper, props: { message: 'desc' } },
          title: { component: DescriptionWrapper, props: { message: 'title' } },
          importStatement: { component: DescriptionWrapper, props: { message: 'import' } },
          deprecationNotice: { component: DescriptionWrapper, props: { message: 'notice' } }
        }
      };
      const result = await serializeDemos(demos, {
        resolvers: {
          DescriptionWrapper: (props) => 'R:' + props.message
        }
      });

      expect(result.FullResolver)
        .toEqual({
          title: 'R:title',
          description: 'R:desc',
          import: 'R:import',
          deprecated: true,
          deprecationNotice: 'R:notice',
          props: {},
          emits: {},
          slots: []
        });
    });
  });

  // =========================================================================
  //  OUTPUT SHAPE
  // =========================================================================

  describe('output shape', () => {
    test('One entry per demo, keyed by demo name', async () => {
      const demos = {
        First: makeDemo('First'),
        Second: makeDemo('Second')
      };
      const result = await serializeDemos(demos);

      expect(Object.keys(result))
        .toEqual(['First', 'Second']);
    });

    test('Output survives JSON round-trip (fully serializable)', async () => {
      const demos = {
        JsonTest: {
          ...makeDemo('JsonTest'),
          description: 'A string',
          propsToDemo: { size: { description: 'Size prop.' } }
        }
      };
      const result = await serializeDemos(demos);
      const roundTripped = JSON.parse(JSON.stringify(result));

      expect(roundTripped)
        .toEqual(result);
    });
  });
});
