import { styleTokensBuiltIn } from '@/helpers/styleTokens.js';

import DoxenSideBar from '@/components/DoxenSideBar.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('DoxenSideBar.vue', () => {
  const Foo = {
    component: {
      name: 'Foo',
      template: '<div>Foo</div>'
    }
  };
  const Bar = {
    title: 'Bar',
    component: {
      template: '<div>Bar</div>'
    }
  };
  const Baz = {};
  const Buzz = undefined;
  const demos = {
    Foo,
    Bar,
    Baz,
    Buzz
  };
  const modelValue = 'Foo';
  const styleTokens = styleTokensBuiltIn;
  const requiredProps = {};

  const setupWrapper = async (props) => {
    const options = {
      props: {
        ...requiredProps,
        ...props
      },
      slots: {
        default: 'Top',
        footer: 'Bottom'
      }
    };
    const wrapper = await testHelpers.mount(DoxenSideBar, options);
    return wrapper;
  };

  test('Renders correctly', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Shows items, with nothing selected', async () => {
    const props = { demos, styleTokens };
    const wrapper = await setupWrapper(props);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Shows items, with Foo selected', async () => {
    const props = { demos, modelValue, styleTokens };
    const wrapper = await setupWrapper(props);

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Emit click', async () => {
    const wrapper = await setupWrapper({ demos });

    await wrapper.find('[data-test="buttonFoo"]').trigger('click');

    expect(wrapper.emitted()['update:model-value'][0])
      .toEqual(['Foo']);
  });
});
