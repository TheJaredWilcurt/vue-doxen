import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenRangeSlider from '@/components/formFields/DoxenRangeSlider.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenRangeSlider.vue', () => {
  // Props
  const disabled = true;
  const errorMessage = 'Error';
  const label = 'Label';
  const message = 'Message';
  const max = 50;
  const min = 10;
  const modelValue = 30;
  const required = true;
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    disabled,
    errorMessage,
    label,
    message,
    max,
    min,
    modelValue,
    required,
    styleTokens
  };
  const requiredProps = {};

  const setupWrapper = async (props) => {
    const options = {
      props: {
        ...requiredProps,
        ...props
      },
      slots: {
        default: 'Slot text'
      }
    };
    const wrapper = await testHelpers.mount(DoxenRangeSlider, options);
    return wrapper;
  };

  test('Renders correctly', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders correctly with all props', async () => {
    const wrapper = await setupWrapper(allProps);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Emits on input', async () => {
    const wrapper = await setupWrapper({
      label,
      max,
      min,
      modelValue
    });

    expect(wrapper.emitted())
      .toEqual({});

    console.log(wrapper.vm.idFor);

    const inputElement = wrapper.find('[data-test="VueDoxen_Label_v-0"]');
    await inputElement.setValue(20);

    expect(wrapper.emitted())
      .toEqual({
        change: expect.any(Array),
        input: expect.any(Array),
        'update:model-value': [[20]]
      });
  });
});
