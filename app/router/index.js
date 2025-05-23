import NProgress from 'nprogress';
import {
  createRouter,
  createWebHistory
} from 'vue-router';

function Catch () {
  if (!window.location.href.includes('localhost')) {
    window.location.reload();
  }
}

const routes = [
  {
    path: '/vue-doxen/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@@@/views/NotFoundView.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/',
    name: 'home',
    component: () => import('@@@/views/HomeView.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/getting-started',
    name: 'gettingStarted',
    component: () => import('@@@/views/GettingStartedView.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/demo-files',
    name: 'demoFiles',
    component: () => import('@@@/views/DemoFilesView.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/documenting',
    name: 'documenting',
    component: () => import('@@@/views/DocumentingView.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/styles',
    name: 'styles',
    component: () => import('@@@/views/StylingView.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/vue-router',
    name: 'vueRouter',
    component: () => import('@@@/views/VueRouterView.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/tree-shaking',
    name: 'treeShaking',
    component: () => import('@@@/views/TreeShaking.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/branding',
    name: 'branding',
    component: () => import('@@@/views/PressKit.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/a11y',
    name: 'a11y',
    component: () => import('@@@/views/AccessibilityTooling.vue').catch(Catch)
  },
  {
    path: '/vue-doxen/components/:component',
    name: 'components',
    component: () => import('@@@/views/ComponentsView.vue').catch(Catch),
    props: (route) => ({
      selectedDemo: route.params.component
    })
  }
];

if (window.location.href.includes('localhost')) {
  routes.push({
    path: '/vue-doxen/dev-testing-page',
    name: 'devTestingPage',
    component: () => import('@@@/views/DevTestingPage.vue').catch(Catch)
  });
}

function scrollBehavior (to, from, savedPosition) {
  const isSmall = window.innerWidth < 831;

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

    if (to.hash) {
      return { el: to.hash, top: 0 };
    }

    if (isSmall) {
      return;
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

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
