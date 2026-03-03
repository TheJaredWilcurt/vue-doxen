import { describe, test, expect } from 'vitest';

import { serializeDemos } from '@/helpers/serializeDemos.js';

import DescriptionWrapper from '@@/fixtures/DescriptionWrapper.vue';
import StandaloneDescription from '@@/fixtures/StandaloneDescription.vue';

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
      component: DescriptionWrapper,
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
      component: StandaloneDescription
    }
  }
};

describe('serializeDemos', () => {
  test('Resolves plain string description and importStatement with HTML preserved', async () => {
    const result = await serializeDemos(testDemos);
    const stringDemo = result.StringDemo;

    expect(stringDemo.description)
      .toEqual(
        '<p>A simple <strong>string</strong> description.</p>'
      );
    expect(stringDemo.import)
      .toEqual('import { StringDemo } from \'my-lib\';');
    expect(stringDemo.deprecated)
      .toEqual(false);
    expect(stringDemo.deprecationNotice)
      .toEqual(null);
  });

  test('Serializes props with type, default, allowed, description', async () => {
    const result = await serializeDemos(testDemos);
    const props = result.StringDemo.props;

    expect(props.size.type)
      .toEqual('String');
    expect(props.size.required)
      .toEqual(false);
    expect(props.size.default)
      .toEqual('md');
    expect(props.size.allowed)
      .toEqual(['sm', 'md', 'lg']);
    expect(props.size.description)
      .toEqual('Controls the size.');
  });

  test('Serializes emits', async () => {
    const result = await serializeDemos(testDemos);
    const emits = result.StringDemo.emits;

    expect(emits.clicked)
      .toEqual({ description: 'Emitted on click.' });
  });

  test('Serializes slots', async () => {
    const result = await serializeDemos(testDemos);
    const slots = result.StringDemo.slots;

    expect(slots)
      .toContain('default');
  });

  test('Component descriptions return null without Playwright', async () => {
    const result = await serializeDemos(testDemos);
    const componentDemo = result.ComponentDemo;

    expect(componentDemo.description)
      .toEqual(null);
    expect(componentDemo.import)
      .toEqual(null);
  });

  test('Serializes component props correctly', async () => {
    const result = await serializeDemos(testDemos);
    const props = result.ComponentDemo.props;

    expect(props.disabled.type)
      .toEqual('Boolean');
    expect(props.disabled.required)
      .toEqual(false);
    expect(props.disabled.default)
      .toEqual(false);
    expect(props.disabled.allowed)
      .toEqual(null);
    expect(props.disabled.description)
      .toEqual(null);
  });

  test('Returns null for component-only description without Playwright', async () => {
    const result = await serializeDemos(testDemos);
    const componentOnly = result.ComponentOnlyDemo;

    expect(componentOnly.description)
      .toEqual(null);
    expect(componentOnly.import)
      .toEqual(null);
  });

  test('Includes all demo keys in output', async () => {
    const result = await serializeDemos(testDemos);
    expect(Object.keys(result))
      .toEqual([
        'StringDemo',
        'ComponentDemo',
        'ComponentOnlyDemo'
      ]);
  });

  test('Output is fully JSON-serializable', async () => {
    const result = await serializeDemos(testDemos);
    const json = JSON.stringify(result);
    const parsed = JSON.parse(json);
    expect(parsed)
      .toEqual(result);
  });

  test('Deprecated is consistent with deprecationNotice', async () => {
    const demosWithDeprecation = {
      DeprecatedComponent: {
        component: {
          name: 'DeprecatedComponent',
          template: '<div>deprecated</div>',
          props: {}
        },
        deprecationNotice: '<p>This component is deprecated.</p>'
      },
      NotDeprecated: {
        component: {
          name: 'NotDeprecated',
          template: '<div>ok</div>',
          props: {}
        }
      }
    };
    const result = await serializeDemos(demosWithDeprecation);

    expect(result.DeprecatedComponent.deprecated)
      .toEqual(true);
    expect(result.DeprecatedComponent.deprecationNotice)
      .toEqual(
        '<p>This component is deprecated.</p>'
      );
    expect(result.NotDeprecated.deprecated)
      .toEqual(false);
    expect(result.NotDeprecated.deprecationNotice)
      .toEqual(null);
  });

  test('Manual resolvers override component extraction', async () => {
    const result = await serializeDemos(testDemos, {
      resolvers: {
        DescriptionWrapper: (props) => 'Custom resolved: ' + props.message
      }
    });
    expect(result.ComponentDemo.description)
      .toEqual(
        'Custom resolved: <p>Wrapper description with <code>HTML</code>.</p>'
      );
  });
});
