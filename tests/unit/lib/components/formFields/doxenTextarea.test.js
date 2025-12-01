import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenTextarea.vue', () => {
  // Props
  const disabled = true;
  const errorMessage = 'Error';
  const label = 'Label';
  const message = 'Message';
  const modelValue = 'Value';
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
    const wrapper = await testHelpers.mount(DoxenTextarea, options);
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
      modelValue
    });

    expect(wrapper.emitted())
      .toEqual({});

    const textareaElement = wrapper.find('[data-test="VueDoxen_Label_v-0"]');
    textareaElement.element.value = 'Text';
    await textareaElement.trigger('input');

    expect(wrapper.emitted())
      .toEqual({
        input: expect.any(Array),
        'update:model-value': [['Text']]
      });
  });
});
