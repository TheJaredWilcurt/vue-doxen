/* eslint-disable vue/one-component-per-file */
/* eslint-disable import/no-extraneous-dependencies */
import { createApp, defineComponent, h } from 'vue';
import { createRouter, createWebHashHistory, RouterView } from 'vue-router';

import { demos } from './sandboxDemos.js';

import VueDoxen from '@/components/VueDoxen.vue';

// Create a route for each demo name — renders VueDoxen with only that demo
const routes = Object.keys(demos).map((name) => ({
  path: '/' + name,
  component: defineComponent({
    name: name + 'Route',
    render: function () {
      return h(VueDoxen, {
        demos: { [name]: demos[name] },
        modelValue: name
      });
    }
  })
}));

// Fallback root route
routes.push({
  path: '/',
  component: defineComponent({
    render: function () {
      return h('div', 'Demo-only serialize test server. Navigate to /#/DemoName.');
    }
  })
});

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const app = createApp(
  defineComponent({
    render: function () {
      return h(RouterView);
    }
  })
);
app.use(router);
app.mount('#app');
