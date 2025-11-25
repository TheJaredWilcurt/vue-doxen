import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenEmitLog from '@/components/formFields/DoxenEmitLog.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenEmitLog.vue', () => {
  // Props
  const modelValue = [
    {
      emitName: 'foo',
      value: 'bar'
    },
    {
      emitName: 'foo',
      value: 'baz'
    }
  ];
  const styleTokens = styleTokensBuiltIn;
  const allProps = {
    modelValue,
    styleTokens
  };
  const requiredProps = {};

  const setupWrapper = async (props) => {
    const options = {
      props: {
        ...requiredProps,
        ...props
      }
    };
    const wrapper = await testHelpers.mount(DoxenEmitLog, options);
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

  test('Emits on clear', async () => {
    const wrapper = await setupWrapper(allProps);

    expect(wrapper.emitted())
      .toEqual({});

    const clearButton = wrapper.find('[data-test="button-VueDoxen_DoxenEmitLog_v-0"]');
    await clearButton.trigger('click');

    expect(wrapper.emitted())
      .toEqual({
        click: expect.any(Array),
        'update:model-value': [
          [
            []
          ]
        ]
      });
  });
});
