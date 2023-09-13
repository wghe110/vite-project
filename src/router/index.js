import VueRouter from 'vue-router'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('../views/home/index.vue'),
      children: [
        {
          path: '/welcome',
          component: () => import('../views/welcome/index.vue'),
        },
      ]
    },
    {
      path: '/login',
      component: () => import('../views/home/login/index.vue'),
    },
    {
      path: '*',
      component: () => import('../views/home/404.vue'),
    },
  ]
})

export default router;