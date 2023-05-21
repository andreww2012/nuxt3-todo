import type {RouterConfig} from '@nuxt/schema';

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: () => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index.vue').then((r) => r.default || r),
    },
    {
      name: 'task',
      path: '/task/:taskId',
      component: () => import('~/pages/task.vue').then((r) => r.default || r),
    },
  ],
};
