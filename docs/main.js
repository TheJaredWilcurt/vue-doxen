import { createApp } from 'vue';
import constantsPlugin from 'vue-options-api-constants-plugin';

import App from '@@@/App.vue';

import { router } from '@@@/router/index.js';

import 'nprogress/nprogress.css';
import '@@@/assets/fonts/hepta-slab.css';
import '@@@/sass/docs-site.sass';

const app = createApp(App);
app.use(constantsPlugin);
app.use(router);
app.mount('#app');
