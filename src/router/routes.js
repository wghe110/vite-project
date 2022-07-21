export default [
  {
    path: '/',
    component: () => import('@/views/layout/home.vue'),
    children: [
      {
        path: '/jsx',
        component: () => import('@/views/layout/jsx/index.vue')
      }
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