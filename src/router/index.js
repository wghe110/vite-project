import VueRouter from 'vue-router'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('../App.vue'),
      redirect: '/demo',
      children: [
        {
          path: '/demo',
          component: () => import('../demo/index.vue')
        },

        {
          path: '/select',
          component: () => import('../views/select/index.vue')
        },
        {
          path: '/select-radio',
          component: () => import('../views/select-radio/index.vue')
        },
        {
          path: '/multiple-select',
          component: () => import('../views/multiple-select/index.vue')
        },
        {
          path: '/multiple-select-checkbox',
          component: () => import('../views/multiple-select-checkbox/index.vue')
        },
        {
          path: '/slider',
          component: () => import('../views/slider/index.vue')
        },
      ]
    }
  ]
})

export default router;