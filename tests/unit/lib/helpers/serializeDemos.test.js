import { describe, test, expect } from 'vitest';

import { serializeDemos } from '@/helpers/serializeDemos.js';

import TierThreeDescription from '@@/fixtures/TierThreeDescription.vue';
import TierTwoWrapper from '@@/fixtures/TierTwoWrapper.vue';

const testDemos = {
  TierOneComponent: {
    component: {
      name: 'TierOneComponent',
      template: '<div>Tier one</div>',
      props: {
        size: {
          type: String,
          default: 'md',
          validator: (v) => ['sm', 'md', 'lg'].includes(v)
        }
      }
    },
    description: '<p>A simple <strong>string</strong> description.</p>',
    importStatement: 'import { TierOneComponent } from \'my-lib\';',
    propsToDemo: {
      size: { description: 'Controls the size.' }
    },
    emitsToDemo: {
      clicked: { description: 'Emitted on click.' }
    },
    slotsToDemo: { default: 'Slot content' }
  },
  TierTwoComponent: {
    component: {
      name: 'TierTwoComponent',
      template: '<div>Tier two</div>',
      props: {
        disabled: {
          type: Boolean,
          default: false
        }
      }
    },
    description: {
      component: TierTwoWrapper,
      props: {
        message: '<p>Wrapper description with <code>HTML</code>.</p>'
      }
    }
  },
  TierThreeComponent: {
    component: {
      name: 'TierThreeComponent',
      template: '<div>Tier three</div>',
      props: {}
    },
    description: {
      component: TierThreeDescription
    }
  }
};

describe('serializeDemos', () => {
  test('Resolves plain string description and importStatement with HTML preserved', async () => {
    const result = await serializeDemos(testDemos);
    const tier1 = result.TierOneComponent;

    expect(tier1.description)
      .toEqual(
        '<p>A simple <strong>string</strong> description.</p>'
      );
    expect(tier1.import)
      .toEqual('import { TierOneComponent } from \'my-lib\';');
    expect(tier1.deprecated)
      .toEqual(false);
    expect(tier1.deprecationNotice)
      .toEqual(null);
  });

  test('Serializes props with type, default, allowed, description', async () => {
    const result = await serializeDemos(testDemos);
    const props = result.TierOneComponent.props;

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
    const emits = result.TierOneComponent.emits;

    expect(emits.clicked)
      .toEqual({ description: 'Emitted on click.' });
  });

  test('Serializes slots', async () => {
    const result = await serializeDemos(testDemos);
    const slots = result.TierOneComponent.slots;

    expect(slots)
      .toContain('default');
  });

  test('Component descriptions return null without Playwright', async () => {
    const result = await serializeDemos(testDemos);
    const tier2 = result.TierTwoComponent;

    expect(tier2.description)
      .toEqual(null);
    expect(tier2.import)
      .toEqual(null);
  });

  test('Serializes component props correctly', async () => {
    const result = await serializeDemos(testDemos);
    const props = result.TierTwoComponent.props;

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
    const tier3 = result.TierThreeComponent;

    expect(tier3.description)
      .toEqual(null);
    expect(tier3.import)
      .toEqual(null);
  });

  test('Includes all demo keys in output', async () => {
    const result = await serializeDemos(testDemos);
    expect(Object.keys(result))
      .toEqual([
        'TierOneComponent',
        'TierTwoComponent',
        'TierThreeComponent'
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
        TierTwoWrapper: (props) => 'Custom resolved: ' + props.message
      }
    });
    expect(result.TierTwoComponent.description)
      .toEqual(
        'Custom resolved: <p>Wrapper description with <code>HTML</code>.</p>'
      );
  });
});
