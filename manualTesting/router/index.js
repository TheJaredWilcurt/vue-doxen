/* eslint-disable-next-line import/no-unresolved */
import { createRouter, createWebHistory } from 'vue-router';

import ComponentsView from '@@@/views/ComponentsView.vue';
import DemoFilesView from '@@@/views/DemoFilesView.vue';
import DocumentingView from '@@@/views/DocumentingView.vue';
import GettingStartedView from '@@@/views/GettingStartedView.vue';
import HomeView from '@@@/views/HomeView.vue';
import NotFound from '@@@/views/NotFoundView.vue';
import StylingView from '@@@/views/StylingView.vue';

const routes = [
  {
    path: '/vue-doxen/:pathMatch(.*)*',
    name: '404',
    component: NotFound
  },
  {
    path: '/vue-doxen/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/vue-doxen/getting-started',
    name: 'gettingStarted',
    component: GettingStartedView
  },
  {
    path: '/vue-doxen/demo-files',
    name: 'demoFiles',
    component: DemoFilesView
  },
  {
    path: '/vue-doxen/documenting',
    name: 'documenting',
    component: DocumentingView
  },
  {
    path: '/vue-doxen/styles',
    name: 'styles',
    component: StylingView
  },
  {
    path: '/vue-doxen/components/:component',
    name: 'components',
    component: ComponentsView,
    props: (route) => ({
      selectedDemo: route.params.component
    })
  }
];

function scrollBehavior (to, from, savedPosition) {
  // check that path is different, so this doesn't scroll to top every time
  // a query parameter is changed
  if (to.path !== from.path) {
    if (
      // if this is a push/pop state (forward/back), use the saved position
      savedPosition ||
      (
        // don't change screen position when closing/opening a modal
        to.meta?.savePosition ||
        to.params?.savePosition
      )
    ) {
      return savedPosition;
    }

    // otherwise always scroll to the top of the page
    return { x: 0, y: 0 };
  }
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior,
  routes
});

export default router;
