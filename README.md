# vue2-biyi

本框架是对比翼框架的精简，减少了一些模块：低代码、iview的全局引入、自定义主题等

## 介绍

  ```sh
    vite + vue2 + elementUI
  ```

*里面会有iview的组件，后面有时间会逐一替代成elementUI,由于图标问题，可能会按需加载*

## 集成

- `vue-router`
- `vuex`
- `axios`
- `eventBus`
- `normalize.css`
- `eslint`

## 解决方案

- 多节点树：[@wchbrad/vue-easy-tree](https://www.npmjs.com/package/@wchbrad/vue-easy-tree)
- 多列表虚拟滚动：[vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- 滚动条：[el-scrollbar](https://blog.csdn.net/qq_40323256/article/details/117473751)
- 地图：[高德地图](https://lbs.amap.com/api/javascript-api-v2/summary/)
- UI：[elementUI 2.15.14](https://element.eleme.cn/#/zh-CN/component/installation)
- 加密：[jsencrypt](http://travistidwell.com/jsencrypt/)

## 样式

- `scss`

## 脚本

- `javascript`

## node版本

  ```sh
    v16.15.1
  ```

## 编辑器

`vscode`

## vscode插件

- `Vetur`
- `ESLint`
- `Path Intellisense`
- `Git History`

## 路径写法

- `@` - `/src`

## 命令

- 安装依赖 `npm install`
- 启动本地服务 `npm run serve`
- 打包 `npm run build`

## 隐藏头部和左侧导航栏（外部引用可能用到）

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
