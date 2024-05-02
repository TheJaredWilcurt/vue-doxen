import { createApp, Fragment, h as hyperscript } from 'vue';
import VueAxe, { VueAxePopup } from 'vue-axe';
import constantsPlugin from 'vue-options-api-constants-plugin';

import App from '@@@/App.vue';

import router from '@@@/router/index.js';

import '@@@/assets/fonts/hepta-slab.css';
import '@@@/sass/docs-site.sass';

const app = createApp({
  render: function () {
    return hyperscript(
      Fragment,
      [
        hyperscript(App),
        hyperscript(VueAxePopup)
      ]
    );
  }
});
app.use(VueAxe);
app.use(constantsPlugin);
app.use(router);
app.mount('#app');
