import VueRouter from 'vue-router'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('../views/layout/main.vue'),
      children: [
        {
          path: '/store',
          component: () => import('@/views/store/index.vue')
        },
        {
          path: '/path',
          component: () => import('@/views/path/index.vue')
        },
        {
          path: '/jsx',
          component: () => import('@/views/jsx/index.jsx')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/layout/login.vue'),
    },
    {
      path: '*',
      component: () => import('../views/layout/404.vue'),
    },
  ]
})

export default router;