import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenCheckbox.vue', () => {
  const styleTokens = styleTokensBuiltIn;
  const requiredProps = {};

  const setupWrapper = async (props) => {
    const options = {
      props: {
        ...requiredProps,
        ...props
      },
      slots: {
        default: 'Slot Text'
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

  test('Style tokens', async () => {
    const wrapper = await setupWrapper({ styleTokens });

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Emit click', async () => {
    const wrapper = await setupWrapper();

    await wrapper.find('input').trigger('click');

    expect(wrapper.emitted().click[0].length)
      .toEqual(1);
  });

  test('Input name matches idFor', async () => {
    const wrapper = await setupWrapper();

    const checkboxInput = wrapper.find('input[type="checkbox"]');
    const labelElement = wrapper.find('label');

    // Ensure both elements exist
    expect(checkboxInput.exists())
      .toEqual(true);

    expect(labelElement.exists())
      .toEqual(true);
    
    const checkboxName = checkboxInput.attributes('name');
    const labelFor = labelElement.attributes('for');

    // Compare the attributes
    expect(checkboxName)
      .toEqual(labelFor);
  });
});
