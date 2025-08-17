import HtmlFragments from '@/components/HtmlFragments.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('HtmlFragments.vue', () => {
  beforeEach(() => {
    globalThis.vueSnapshots.removeComments = true;
  });

  const setupWrapper = async (html) => {
    const options = {
      props: {
        html: html || ''
      }
    };
    const wrapper = await testHelpers.mount(HtmlFragments, options);
    return wrapper;
  };

  test('Renders nothing', async () => {
    const wrapper = await setupWrapper();

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders one element', async () => {
    const wrapper = await setupWrapper('<div>Text</div>');

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders one element with children', async () => {
    const wrapper = await setupWrapper([
      '<div class="box">',
      '<span>Text1</span>',
      '<span>Text2</span>',
      '</div>'
    ].join(''));

    expect(wrapper)
      .toMatchSnapshot();
  });


  test('Renders two root elements', async () => {
    const wrapper = await setupWrapper([
      '<div>Text</div>',
      '<p>Paragraph</p>'
    ].join(''));

    expect(wrapper)
      .toMatchSnapshot();
  });

  test('Renders one text node', async () => {
    const wrapper = await setupWrapper('Some Text');

    expect(wrapper)
      .toMatchSnapshot();
  });
});
