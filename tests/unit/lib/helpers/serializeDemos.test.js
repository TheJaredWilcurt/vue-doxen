import { describe, test, expect } from 'vitest';

import { serializeDemos } from '@/helpers/serializeDemos.js';

import DescriptionWrapper from '@@/fixtures/DescriptionWrapper.vue';
import StandaloneDescription from '@@/fixtures/StandaloneDescription.vue';

const testDemos = {
  // String-based fields: description and importStatement are plain strings.
  // In sync mode (no Playwright), strings pass through as-is with HTML preserved.
  StringDemo: {
    component: {
      name: 'StringDemo',
      template: '<div>String demo</div>',
      props: {
        // Has type, default, and validator — serializeDemos extracts allowed
        // values from the validator by calling it against known primitives.
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
  // Component-with-props: description is a Vue component object with props.
  // Without Playwright or a resolver, resolveField returns null because the
  // text lives inside the component's rendered output, not in plain data.
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
  // Component-only: description is a Vue component with no props at all.
  // The text is entirely in the component's <template>. Only Playwright
  // (rendering in a browser) can extract it. Without Playwright → null.
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

  test('All field types: string, component+props, and component-only across all 4 fields', async () => {
    const inputDemos = {
      // All 4 serializable fields as plain strings.
      // Strings pass through as-is with HTML markup preserved.
      AllStrings: {
        component: {
          name: 'AllStrings',
          template: '<div>all strings</div>',
          props: {}
        },
        description: '<p>String <em>description</em>.</p>',
        title: 'My Custom Title',
        importStatement: 'import { AllStrings } from \'my-lib\';',
        // When deprecationNotice is a truthy string, deprecated should be true.
        deprecationNotice: '<p>This is <strong>deprecated</strong>.</p>'
      },
      // All 4 fields as component objects with props.
      // Without Playwright or a resolver, resolveField sees an object with a
      // .component key and no matching resolver, so it returns null for each.
      // deprecated is false because deprecationNotice resolved to null.
      AllComponentsWithProps: {
        component: {
          name: 'AllComponentsWithProps',
          template: '<div>all components with props</div>',
          props: {}
        },
        description: {
          component: DescriptionWrapper,
          props: { message: '<p>Description from component.</p>' }
        },
        title: {
          component: DescriptionWrapper,
          props: { message: 'Title from component' }
        },
        importStatement: {
          component: DescriptionWrapper,
          props: { message: 'import { X } from \'y\'' }
        },
        deprecationNotice: {
          component: DescriptionWrapper,
          props: { message: 'Deprecated via component' }
        }
      },
      // All 4 fields as component objects with NO props.
      // The text is entirely in the component's <template>.
      // Same result as above: null without Playwright.
      AllComponentsOnly: {
        component: {
          name: 'AllComponentsOnly',
          template: '<div>all components only</div>',
          props: {}
        },
        description: {
          component: StandaloneDescription
        },
        title: {
          component: StandaloneDescription
        },
        importStatement: {
          component: StandaloneDescription
        },
        deprecationNotice: {
          component: StandaloneDescription
        }
      },
      // No optional fields set at all. All 4 text fields default to null,
      // deprecated is false, and props/emits/slots are empty.
      NoFields: {
        component: {
          name: 'NoFields',
          template: '<div>no fields</div>',
          props: {}
        }
      }
    };

    const expectedOutput = {
      // Strings pass through, deprecated is true because deprecationNotice is set.
      AllStrings: {
        title: 'My Custom Title',
        description: '<p>String <em>description</em>.</p>',
        import: 'import { AllStrings } from \'my-lib\';',
        deprecated: true,
        deprecationNotice: '<p>This is <strong>deprecated</strong>.</p>',
        props: {},
        emits: {},
        slots: []
      },
      // Component objects → null in sync mode. deprecated is false because
      // deprecationNotice resolved to null (component couldn't be rendered).
      AllComponentsWithProps: {
        title: null,
        description: null,
        import: null,
        deprecated: false,
        deprecationNotice: null,
        props: {},
        emits: {},
        slots: []
      },
      // Same as above — component-only (no props) also resolves to null.
      AllComponentsOnly: {
        title: null,
        description: null,
        import: null,
        deprecated: false,
        deprecationNotice: null,
        props: {},
        emits: {},
        slots: []
      },
      // No fields provided at all — everything defaults to null/false/empty.
      NoFields: {
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

    const result = await serializeDemos(inputDemos);
    expect(result)
      .toEqual(expectedOutput);
  });

  test('Manual resolvers resolve all 4 component+props fields', async () => {
    // All 4 fields use the same DescriptionWrapper component.
    // A resolver is a function keyed by component name that receives the
    // component's props and returns a string. This is an alternative to
    // Playwright for extracting text from component-based fields.
    const inputDemos = {
      ResolverDemo: {
        component: {
          name: 'ResolverDemo',
          template: '<div>resolver demo</div>',
          props: {}
        },
        description: {
          component: DescriptionWrapper,
          props: { message: 'desc content' }
        },
        title: {
          component: DescriptionWrapper,
          props: { message: 'title content' }
        },
        importStatement: {
          component: DescriptionWrapper,
          props: { message: 'import content' }
        },
        deprecationNotice: {
          component: DescriptionWrapper,
          props: { message: 'deprecation content' }
        }
      }
    };

    const expectedOutput = {
      ResolverDemo: {
        // Each field is resolved by the resolver function, which receives
        // the component's props and returns a string.
        title: 'Resolved: title content',
        description: 'Resolved: desc content',
        import: 'Resolved: import content',
        // deprecationNotice resolved to a truthy string, so deprecated is true.
        deprecated: true,
        deprecationNotice: 'Resolved: deprecation content',
        props: {},
        emits: {},
        slots: []
      }
    };

    // The resolver matches by component name ('DescriptionWrapper').
    // resolveField checks: is it a string? No. Is it an object with
    // .component? Yes. Is there a resolver for that component name? Yes → call it.
    const result = await serializeDemos(inputDemos, {
      resolvers: {
        DescriptionWrapper: (props) => 'Resolved: ' + props.message
      }
    });
    expect(result)
      .toEqual(expectedOutput);
  });
});
