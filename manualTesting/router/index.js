/* eslint-disable-next-line import/no-unresolved */
import {
  createRouter,
  createWebHistory
} from 'vue-router';

const routes = [
  {
    path: '/vue-doxen/:pathMatch(.*)*',
    name: '404',
    component: () => import('@@@/views/NotFoundView.vue')
  },
  {
    path: '/vue-doxen/',
    name: 'home',
    component: () => import('@@@/views/HomeView.vue')
  },
  {
    path: '/vue-doxen/getting-started',
    name: 'gettingStarted',
    component: () => import('@@@/views/GettingStartedView.vue')
  },
  {
    path: '/vue-doxen/demo-files',
    name: 'demoFiles',
    component: () => import('@@@/views/DemoFilesView.vue')
  },
  {
    path: '/vue-doxen/documenting',
    name: 'documenting',
    component: () => import('@@@/views/DocumentingView.vue')
  },
  {
    path: '/vue-doxen/styles',
    name: 'styles',
    component: () => import('@@@/views/StylingView.vue')
  },
  {
    path: '/vue-doxen/vue-router',
    name: 'vueRouter',
    component: () => import('@@@/views/VueRouterView.vue')
  },
  {
    path: '/vue-doxen/components/:component',
    name: 'components',
    component: () => import('@@@/views/ComponentsView.vue'),
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
    return new Promise((resolve) => {
      resolve({ left: 0, top: 0 });
    });
  }
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior,
  routes
});

export default router;
