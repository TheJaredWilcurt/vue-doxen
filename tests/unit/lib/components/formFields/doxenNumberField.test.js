import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenNumberField from '@/components/formFields/DoxenNumberField.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenNumberField.vue', () => {
  // Props
  const disabled = true;
  const errorMessage = 'Error';
  const label = 'Label';
  const message = 'Message';
  const modelValue = 2;
  const required = true;
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    disabled,
    errorMessage,
    label,
    message,
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
    const wrapper = await testHelpers.mount(DoxenNumberField, options);
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
    const wrapper = await setupWrapper();

    expect(wrapper.emitted())
      .toEqual({});

    const inputElement = wrapper.find('[data-test="VueDoxen_v-0"]');
    inputElement.element.value = 9;
    await inputElement.trigger('input');

    expect(wrapper.emitted())
      .toEqual({
        input: expect.any(Array),
        'update:model-value': [[9]]
      });
  });
});
