# vite-vue2-project

## 介绍
  ```sh
    vite + vue2
  ```
## 集成
  - `vue-router`
  - `vuex`
  - `axios`
  - `eventBus`
  - `normalize.css`
  - `jsx`
## 样式
  - `css`
  - `scss`
  - `sass`
## 脚本
  - `javascript`
## node版本
  ```sh
    v14.20.0
  ```
## vscode插件
  - `Vetur`
  - `ESLint`
  - `Path Intellisense`
  - `Git History`
## 路径写法
- `@` - `/src`
- `$p` - `/public`

## 命令
 - 安装依赖 `npm install`
 - 启动本地服务 `npm run serve`
 - 打包 `npm run build`

 ## 隐藏头部和左侧导航栏（外部饮用可能用到）
  - `${url}?hideHeader=true`可以隐藏头部
  - `${url}?hideAside=true`可以隐藏左侧菜单

## 携带token访问
  - `${url}?token=xxxxx` 可以从外部传入token访问

## 初始化加载必要资源
配置文件在`src`>`views`>`layout`>`pre-load.js`内配置（如果复杂，可以抽出文件）
- 判断头部和左侧是否展示
- 判断url是否携带token，如果有则写入本地
- 加载必要的前置资源（用户信息/菜单/字典等）

## 请求配置
配置文件`src`>`apis`>`index.js`
- 默认 **25秒** 请求超时
- 默认 从`localStorage` 获取 `token`，并写入到请求头部的`common['Authorization']`内
- 请求格式可以参考[axios官网](https://axios-http.com/zh/) 或者 `src > apis > demo.js`
- TODO 配置请求超时提示
- TODO 配置登录失效提示和跳转
- TODO 配置请求逻辑错误，把后台返回message提示给用户

## UI组件库推荐
 - 移动端：[Vant 2](https://youzan.github.io/vant/v2/#/zh-CN/)
 - [ElementUI](https://element.eleme.cn/#/zh-CN/component/installation)
 - [Ant Design Vue](https://1x.antdv.com/docs/vue/introduce-cn/)