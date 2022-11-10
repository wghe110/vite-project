export default [
  {
    path: '/',
    component: () => import('@/layout/home/index.vue'),
    children: [
      {
        path: '/jsx',
        component: () => import('@/views/layout/jsx/index.vue')
      },
      {
        path: '/demo',
        component: () => import('@/views/demo/index.vue')
      },
      {
        path: '/path',
        component: () => import('@/views/path/index.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/layout/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/layout/404.vue')
  },
]