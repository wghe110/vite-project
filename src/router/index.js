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
        {
          path: '/datetime-picker',
          component: () => import('../views/datetime-picker/index.vue')
        },
        {
          path: '/upload',
          component: () => import('../views/upload/index.vue')
        },
        {
          path: '/form',
          component: () => import('../views/form/index.vue')
        },
        {
          path: '/cascader',
          component: () => import('../views/cascader/index.vue')
        },
        {
          path: '/tree-multiple-select',
          component: () => import('../views/tree-multiple-select/index.vue')
        },
      ]
    }
  ]
})

export default router;