export default [
  {
    index: 'submenu-1',
    name: '目录一',
    type: 'submenu',
    children: [
      {
        index: 'menu-1',
        name: '菜单1-1',
        path: '/menu1-1',
        type: 'menu',
      },
      {
        index: 'menu-2',
        name: '菜单1-2',
        path: '/menu1-2',
        type: 'menu',
      }
    ]
  },
  {
    index: 'submenu-2',
    name: '目录二',
    type: 'submenu',
    children: []
  },
  {
    index: 'submenu-3',
    name: '目录三',
    type: 'submenu',
    children: [
      {
        index: 'submenu-3-1',
        name: '目录三一',
        type: 'submenu',
        children: [
          {
            index: 'menu-3',
            name: '菜单3-1',
            path: '/menu3-1',
            type: 'menu',
          }
        ]
      },
      {
        index: 'menu-4',
        name: '菜单3-2',
        path: '/menu3-2',
        type: 'menu',
      }
    ]
  },
  {
    index: 'menu-5',
    name: '菜单四',
    path: '/menu4-1',
    type: 'menu',
  },
]