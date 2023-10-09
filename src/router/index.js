import VueRouter from 'vue-router'
import './fixedBug'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/layout/index.vue'),
      children: []
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
    },
    {
      path: '/change-pwd',
      component: () => import('../views/change-pwd.vue'),
    },
    {
      path: '/skeleton',
      component: () => import('../views/layout/skeleton.vue'),
    },
    {
      path: '*',
      component: () => import('../views/404.vue'),
    },
  ]
})

export default router;