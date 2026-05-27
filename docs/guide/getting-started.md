# 快速开始

`cpy-ui` 是基于 Vue 2、ant-design-vue 1.x 和 moment 封装的企业内部组件库。当前文档站使用 VitePress 构建，文档以 API 和代码示例为主，不直接在页面内运行 Vue 2 组件示例。

## 安装

```bash
yarn add cpy-ui ant-design-vue moment vue
```

如果项目内部通过私有 npm 源发布，请使用团队约定的 registry 安装。

## 完整引入

```js
import Vue from 'vue'
import CpyUI from 'cpy-ui'
import 'cpy-ui/lib/cpy-ui.min.css'

Vue.use(CpyUI)
```

## 按组件使用

组件库入口会自动注册 `packages` 下的所有 Vue 组件。业务代码中按组件名直接使用：

```vue
<template>
  <c-card title="实例信息">
    <c-card-item :data="{ title: '名称', value: 'demo-instance' }" />
  </c-card>
</template>
```

## 国际化兜底

部分组件会读取实例上的 `$T` 方法：

```js
Vue.prototype.$T = key => dictionary[key] || key
```

如果业务项目没有注入 `$T`，组件内部会使用中文兜底文案。

## 本地开发

```bash
yarn install
yarn serve
```

## 构建组件库

```bash
yarn lib
```

## 单元测试

```bash
yarn test:unit:all
```

## 文档站

```bash
yarn docs:dev
yarn docs:build
yarn docs:preview
```
