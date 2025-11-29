import { flushPromises } from '@vue/test-utils';

import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenJsonTextarea.vue', () => {
  // Props
  const disabled = true;
  const errorMessage = 'Error';
  const label = 'Label';
  const message = 'Message';
  const modelValue = { some: 'text' };
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

  const consoleWarn = console.warn;
  beforeEach(() => {
    console.warn = vi.fn();
  });
  afterEach(() => {
    console.warn = consoleWarn;
  });

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
    const wrapper = await testHelpers.mount(DoxenJsonTextarea, options);
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

  test('Accepts string inputs', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper.vm.innerValue)
      .toEqual(undefined);

    await wrapper.setProps({
      modelValue: '{}'
    });

    expect(wrapper.vm.innerValue)
      .toEqual('{}');
  });

  test('Updates based on modelValue changes', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper.vm.innerValue)
      .toEqual(undefined);

    await wrapper.setProps({
      modelValue: '{}'
    });

    expect(wrapper.vm.innerValue)
      .toEqual('{}');

    await wrapper.setProps({
      modelValue: '{ c: 2 }'
    });

    expect(wrapper.vm.innerValue)
      .toEqual('{ c: 2 }');
  });

  test('Emits on valid input', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper.emitted())
      .toEqual({});

    wrapper.vm.innerValue = '{ a: \'b\' }';
    await flushPromises();
    const textarea = wrapper.find('[data-test="VueDoxen_v-0"]');
    await textarea.trigger('keyup');
    await textarea.trigger('input');

    expect(wrapper.emitted())
      .toEqual({
        input: expect.any(Array),
        keyup: expect.any(Array),
        'update:model-value': [[{ a: 'b' }]]
      });

    expect(wrapper.vm.invalid)
      .toEqual(false);
  });

  test('Catches invalid input', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper.emitted())
      .toEqual({});

    wrapper.vm.innerValue = '{ a: \'b\'';
    await flushPromises();
    const textarea = wrapper.find('[data-test="VueDoxen_v-0"]');
    await textarea.trigger('keyup');
    await textarea.trigger('input');

    expect(wrapper.emitted())
      .toEqual({
        input: expect.any(Array),
        keyup: expect.any(Array)
      });

    expect(wrapper.vm.invalid)
      .toEqual(true);
  });
});
