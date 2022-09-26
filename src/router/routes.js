export default [
  {
    path: '/',
    redirect: '/loading',
    children: [
      {
        path: '/loading',
        component: () => import('@/views/layout/loading/index.vue')
      },
      {
        path: '/home',
        component: () => import('@/views/layout/home.vue')
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