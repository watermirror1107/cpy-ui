# 快速开始

`cpy-ui` 是基于 Vue 2 和 ant-design-vue 1.x 的组件库，适合在 Vue 2 中后台项目里使用。

## 安装

```bash
npm install cpy-ui ant-design-vue moment vue
```

本仓库本地开发时：

```bash
npm install
npm run lib
```

## 全量引入

```js
import Vue from 'vue'
import CpyUI from 'cpy-ui'
import 'cpy-ui/lib/cpy-ui.min.css'

Vue.use(CpyUI)
```

## 本地开发

```bash
npm run serve
```

当前本地演示入口是 `src/App.vue`，它用于调试组件行为，不是正式文档。

## 文档开发

```bash
npm run docs:dev
```

构建静态文档：

```bash
npm run docs:build
```
