import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenCheckbox.vue', () => {
  // Props
  const disabled = true;
  const errorMessage = 'Error';
  const label = 'Label';
  const message = 'Message';
  const modelValue = true;
  const required = true;
  const styleTokens = styleTokensBuiltIn;
  const title = 'Title';
  const name = 'Name';
  const allProps = {
    disabled,
    errorMessage,
    label,
    message,
    modelValue,
    required,
    styleTokens,
    title,
    name
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
    const wrapper = await testHelpers.mount(DoxenCheckbox, options);
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

    const checkboxElement = wrapper.find('[data-test="VueDoxen_boolean_v-0"]');
    await checkboxElement.trigger('input');

    expect(wrapper.emitted())
      .toEqual({
        input: expect.any(Array),
        'update:model-value': [[false]]
      });
  });

  test('Input name matches idFor', async () => {
    const wrapper = await setupWrapper();

    const checkboxElement = wrapper.find('[data-test="VueDoxen_boolean_v-0"]');
    const labelElement = wrapper.find('[data-test="label-VueDoxen_boolean_v-0"]');

    // Ensure both elements exist
    expect(checkboxElement.exists())
      .toEqual(true);

    expect(labelElement.exists())
      .toEqual(true);

    const checkboxName = checkboxElement.attributes('name');
    const labelFor = labelElement.attributes('for');

    // Compare the attributes
    expect(checkboxName)
      .toEqual(labelFor);
  });
});
