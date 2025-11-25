import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenDropdown.vue', () => {
  // Props
  const disabled = true;
  const errorMessage = 'Error';
  const label = 'Label';
  const message = 'Message';
  const modelValue = 'moo';
  const options = [
    { name: 'Cat', value: 'meow' },
    { name: 'Cow', value: 'moo' },
    { name: 'Dog', value: 'woof' }
  ];
  const required = true;
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    disabled,
    errorMessage,
    label,
    message,
    modelValue,
    options,
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
    const wrapper = await testHelpers.mount(DoxenDropdown, options);
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

  test('Emits on change', async () => {
    const wrapper = await setupWrapper({
      label,
      modelValue,
      options,
      styleTokens
    });

    expect(wrapper.emitted())
      .toEqual({});

    expect(wrapper.vm.modelValue)
      .toEqual(modelValue);

    const dropdownElement = wrapper.find('[data-test="VueDoxen_Label_v-0"]');
    await dropdownElement.setValue('meow');
    await dropdownElement.trigger('change');

    expect(wrapper.emitted())
      .toEqual({
        change: expect.any(Array),
        input: expect.any(Array),
        'update:model-value': [
          ['meow'],
          ['meow']
        ]
      });
  });
});
