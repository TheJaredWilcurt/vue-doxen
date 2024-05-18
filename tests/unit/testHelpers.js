import { mount, shallowMount } from '@vue/test-utils';

export default {
  setupOptions: function (options) {
    options = options || {};
    options.global = options.global || {};

    options.global.plugins = [
    ];

    return options;
  },
  shallowMount: function (component, options) {
    options = this.setupOptions(options);
    const wrapper = shallowMount(component, options);
    return wrapper;
  },
  mount: function (component, options) {
    options = this.setupOptions(options);
    const wrapper = mount(component, options);
    return wrapper;
  }
};
