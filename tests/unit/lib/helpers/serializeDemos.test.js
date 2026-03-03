import { describe, test, expect } from 'vitest';

import { serializeDemos, stripHtml } from '@/helpers/serializeDemos.js';

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

describe('stripHtml', () => {
  test('Strips tags and collapses whitespace', () => {
    const result = stripHtml(
      '<p>A simple <strong>string</strong> description.</p>'
    );
    expect(result)
      .toEqual('A simple string description.');
  });

  test('Decodes HTML entities', () => {
    const result = stripHtml('&lt;code&gt;fill&lt;/code&gt; &amp; more');
    expect(result)
      .toEqual('<code>fill</code> & more');
  });

  test('Returns non-strings as-is', () => {
    expect(stripHtml(null))
      .toEqual(null);
    expect(stripHtml(undefined))
      .toEqual(undefined);
    expect(stripHtml(42))
      .toEqual(42);
  });
});

describe('serializeDemos', () => {
  test('Tier 1: resolves plain string description and importStatement', async () => {
    const result = await serializeDemos(testDemos);
    const tier1 = result.TierOneComponent;

    expect(tier1.description)
      .toEqual('A simple string description.');
    expect(tier1.import)
      .toEqual('import { TierOneComponent } from \'my-lib\';');
    expect(tier1.deprecated)
      .toEqual(false);
    expect(tier1.deprecationNotice)
      .toEqual(null);
  });

  test('Tier 1: serializes props with type, default, allowed, description', async () => {
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

  test('Tier 1: serializes emits', async () => {
    const result = await serializeDemos(testDemos);
    const emits = result.TierOneComponent.emits;

    expect(emits.clicked)
      .toEqual({ description: 'Emitted on click.' });
  });

  test('Tier 1: serializes slots', async () => {
    const result = await serializeDemos(testDemos);
    const slots = result.TierOneComponent.slots;

    expect(slots)
      .toContain('default');
  });

  test('Tier 2: extracts text from component props', async () => {
    const result = await serializeDemos(testDemos);
    const tier2 = result.TierTwoComponent;

    expect(tier2.description)
      .toEqual('Wrapper description with HTML.');
    expect(tier2.import)
      .toEqual(null);
  });

  test('Tier 2: serializes component props correctly', async () => {
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

  test('Tier 3: returns null for description without Playwright', async () => {
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
        'This component is deprecated.'
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
