import { markRaw } from 'vue';

import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import VueDoxenCustom from '@/components/VueDoxenCustom.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('VueDoxenCustom.vue', () => {
  const demos = {
    DummyButton: markRaw({
      name: 'DummyButton',
      description: 'Dummy button description',
      template: '<button>DummyButton</button>'
    })
  };
  const modelValue = 'DummyButton';
  function makeDummyComponent (name) {
    return markRaw({
      name: 'Dummy' + name,
      template: '<div>Dummy' + name + '</div>'
    });
  }
  const options = {
    components: {
      checkbox: makeDummyComponent('Checkbox'),
      deprecationBanner: makeDummyComponent('DeprecationBanner'),
      deprecatedProp: makeDummyComponent('DeprecatedProp'),
      dropdown: makeDummyComponent('Dropdown'),
      emitLog: makeDummyComponent('EmitLog'),
      emitsDocumentation: makeDummyComponent('EmitsDocumentation'),
      header: makeDummyComponent('Header'),
      jsonTextarea: makeDummyComponent('JsonTextarea'),
      numberField: makeDummyComponent('NumberField'),
      plainText: makeDummyComponent('PlainText'),
      propsDocumentation: makeDummyComponent('PropsDocumentation'),
      radioDials: makeDummyComponent('RadioDials'),
      rangeSlider: makeDummyComponent('RangeSlider'),
      textField: makeDummyComponent('TextField'),
      textarea: makeDummyComponent('Textarea')
    }
  };
  const styleTokens = {
    ...styleTokensBuiltIn,
    vueDoxen: {
      class: 'doxen-vue-doxen-test',
      'data-example': 'test'
    }
  };
  const requiredProps = {
    options
  };
  let consoleInfo;

  beforeEach(() => {
    consoleInfo = console.info;
    console.info = vi.fn();
  });

  afterEach(() => {
    console.info = consoleInfo;
  });

  const setupWrapper = async (props) => {
    const componentOptions = {
      props: {
        ...requiredProps,
        ...props
      }
    };
    const wrapper = await testHelpers.mount(VueDoxenCustom, componentOptions);
    return wrapper;
  };

  test('Renders correctly with required props', async () => {
    const wrapper = await setupWrapper();

    expect(console.info)
      .not.toHaveBeenCalled();

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders correctly with all props', async () => {
    const props = {
      demos,
      modelValue,
      styleTokens
    };
    const wrapper = await setupWrapper(props);

    expect(console.info)
      .not.toHaveBeenCalled();

    global.vueSnapshots.stringifyAttributes = true;

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Defaults to first demo if v-model is a mismatch', async () => {
    const props = {
      demos: {
        ...demos,
        DummyButton2: markRaw({
          name: 'DummyButton2',
          description: 'Dummy button 2 description',
          template: '<button>DummyButton2</button>'
        })
      },
      modelValue: 'MISMATCH',
      styleTokens
    };
    const wrapper = await setupWrapper(props);

    expect(console.info)
      .toHaveBeenCalledWith(
        'Vue-Doxen received a v-model value of "MISMATCH", ' +
        'however that value could not be found in the list of provided demos:',
        [
          'DummyButton',
          'DummyButton2'
        ]
      );

    expect(console.info)
      .toHaveBeenCalledWith(
        'This is likely from a bug in your code, that you should fix. ' +
        'For convenience we will display the first provided demo, "DummyButton".'
      );

    expect(wrapper.vm.selectedDemo)
      .toEqual('DummyButton');

    expect(wrapper.emitted()['update:model-value'][0])
      .toEqual(['DummyButton']);
  });

  test('Logs warning if missing custom component and uses FallBack', async () => {
    const props = {
      demos,
      modelValue,
      options: {
        components: {
          ...options.components,
          checkbox: null
        }
      },
      styleTokens
    };
    const wrapper = await setupWrapper(props);

    expect(console.info)
      .toHaveBeenCalledWith(
        'REQUIRED: options.components.checkbox is missing a custom component. ' +
        'One MUST be provided. No fallback will be used and errors will occur.'
      );

    expect(wrapper.vm.validatedOptions.components.checkbox.name)
      .toEqual('FallBack');
  });
});
