import VueRouter from 'vue-router'
import './fixedBug'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/layout/index.vue'),
      children: [
        {
          path: '/biyi-role',
          component: () => import('../views/admin/system-page/authority/role/role.vue')
        }
      ]
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
      path: '*',
      component: () => import('../views/404.vue'),
    },
  ]
})

export default router;