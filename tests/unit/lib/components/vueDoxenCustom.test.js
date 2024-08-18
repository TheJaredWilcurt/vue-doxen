import { markRaw } from 'vue';

import VueDoxenCustom from '@/components/VueDoxenCustom.vue';

import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

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
  const options = {
    components: {
      checkbox: markRaw({ template: '<div>DummyCheckbox</div>' }),
      dropdown: markRaw({ template: '<div>DummyDropdown</div>' }),
      emitLog: markRaw({ template: '<div>DummyEmitLog</div>' }),
      emitsDocumentation: markRaw({ template: '<div>DummyEmitsDocumentation</div>' }),
      header: markRaw({ template: '<div>DummyHeader</div>' }),
      jsonTextarea: markRaw({ template: '<div>DummyJsonTextarea</div>' }),
      numberField: markRaw({ template: '<div>DummyNumberField</div>' }),
      plainText: markRaw({ template: '<div>DummyPlainText</div>' }),
      propsDocumentation: markRaw({ template: '<div>DummyPropsDocumentation</div>' }),
      radioDials: markRaw({ template: '<div>DummyRadioDials</div>' }),
      rangeSlider: markRaw({ template: '<div>DummyRangeSlider</div>' }),
      textField: markRaw({ template: '<div>DummyTextField</div>' }),
      textarea: markRaw({ template: '<div>DummyTextarea</div>' }),
    }
  };
  const styleTokens = styleTokensBuiltIn;
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

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Defaults to first demo if v-model is a mismatch', async () => {
    const props = {
      demos,
      modelValue: 'MISMATCH',
      styleTokens
    };
    const wrapper = await setupWrapper(props);

    expect(console.info)
      .toHaveBeenCalledWith(
        'Vue-Doxen received a v-model value of "MISMATCH", ' +
        'however that value could not be found in the list of provided demos:',
        ['DummyButton']
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
});
