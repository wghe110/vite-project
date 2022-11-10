export default [
  {
    name: '目录一',
    type: 'submenu',
    children: [
      {
        name: '菜单1-1',
        path: '/menu1-1',
        type: 'menu',
      },
      {
        name: '菜单1-2',
        path: '/menu1-2',
        type: 'menu',
      }
    ]
  },
  {
    name: '目录二',
    type: 'submenu',
    children: []
  },
  {
    name: '目录三',
    type: 'submenu',
    children: [
      {
        name: '目录三一',
        type: 'submenu',
        children: [
          {
            name: '菜单3-1',
            path: '/menu3-1',
            type: 'menu',
          }
        ]
      },
      {
        name: '菜单3-2',
        path: '/menu3-2',
        type: 'menu',
      }
    ]
  },
  {
    name: '菜单四',
    path: '/menu4-1',
    type: 'menu',
  },
]