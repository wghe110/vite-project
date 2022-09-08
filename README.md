# uniapp-vue3

## 介绍
  ```sh
    uni-app + vite + vue3 + js
  ```
## `uni-app`的写法
  参考：[uni-app.md](./uni-app.md)
## 集成
  - `pinia`(类似`vuex`) *使用方法参考[pinia.md](./pinia.md)*
  - `eslint`
  - 自定义表单组件以及校验方法
  - 自定义 `tabBar`
  - 自定义头部
  - 封装请求
  - 可以配置全局请求代理地址
  - 处理苹果手机的安全底部
  - 集成登陆token获取以及token失效处理
  - 集成下拉刷新/上滑加载更多
## 样式
  - `scss`
  - 单位统一用`rpx`,`750px`设计稿`1px === 1rpx`
## 脚本
  - `javascript`
## 静态资源
  - 统一存放在`/src/static`下，目录参照`pages`目录
## 状态管理
  - 使用`pinia`来管理状态 [pinia官网](https://pinia.vuejs.org/)
  - 全局变量 `/src/stores`下（一般不修改）
  - 模块使用的状态变量存放在各自目录下，参照 `/src/pages/demo`
## node版本
  ```sh
    v16.15.1
  ```
## vscode插件
  - `Vue Language Features (Volar)`
  - `GitLens — Git supercharged`
  - `ESLint`
  - `Path Intellisense`
  - `Git History`
  - `GitLens — Git supercharged`
  - `uni-app-snippets`
  - `uni-ui-snippets`
## 路径写法
- `@` - `/src`

## 命令
 - 安装依赖 `npm install`
 - 启动微信本地服务 `npm run dev:mp-weixin`
 - 打包微信 `npm run build:mp-weixin`

## 配置文件
  - 接口路径配置：`src/apis/config.js` [链接](./src/apis/config.js)
  - 登录失效返回`code`配置：`src/apis/interceptor.js` [链接](./src/apis/interceptor.js)
  - 接口封装处理：`src/apis/index.js` [链接](./src/apis/index.js)
  - 登录逻辑实现：`src/login/index.js` [链接](./src/login/index.js)