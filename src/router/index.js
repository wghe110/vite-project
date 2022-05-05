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
          path: '/multiple-select',
          component: () => import('../views/multiple-select/index.vue')
        },
        {
          path: '/multiple-select-checkbox',
          component: () => import('../views/multiple-select-checkbox/index.vue')
        }
      ]
    }
  ]
})

export default router;