# 项目分析

这个项目是一个 Vue 2 组件库，不是应用站点。核心目标是把 `ant-design-vue` 1.x 的基础组件封装成更贴近后台管理系统的业务组件，统一交互、样式、图标和数据约定。

## 技术栈

| 模块 | 当前实现 |
| --- | --- |
| 运行框架 | Vue `^2.6.12` |
| UI 基座 | ant-design-vue `^1.6.5` |
| 日期处理 | moment `^2.29.1` |
| 构建工具 | webpack 5 |
| 组件入口 | `packages/index.js` |
| UMD 产物 | `lib/cpy-ui.min.js`、`lib/cpy-ui.min.css` |
| 本地演示 | `src/App.vue` + `webpack/dev.config.js` |

## 主要内容

`packages/index.js` 会通过 `require.context` 自动收集 `packages/**/index.vue`，再在 `install(Vue)` 中统一注册组件。因此库的使用方式是典型 Vue 插件：

```js
import Vue from 'vue'
import CpyUI from 'cpy-ui'
import 'cpy-ui/lib/cpy-ui.min.css'

Vue.use(CpyUI)
```

组件主要分为四类：

| 类别 | 组件 |
| --- | --- |
| 基础展示 | `CBanner`、`CButton`、`CCard`、`CCardItem`、`CIcon` |
| 表单输入 | `CInput`、`CInputNumber`、`CRadio`、`CRadioGroup`、`CDuration`、`CRangePicker`、`CSearchSelect`、`CForm` |
| 表格查询 | `CTable`、`CTableForm`、`CTableBtn`、`CBtnWrap` |
| 导航与信息展示 | `CTabs`、`CTap`、`CEllipsis`、`CEditableCell` |

## 设计特点

1. 组件默认继承 ant-design-vue 的属性和事件，例如 `CButton`、`CTable`、`CTableBtn` 会把 `$attrs` 和 `$listeners` 透传到底层 `a-button` 或 `a-table`。
2. 业务数据约定比较明显，例如 `CTable` 的异步数据方法期望返回 `res.data.payload` 和 `res.data.totalSize`，`CSearchSelect` 的选项默认使用 `{ id, name }`。
3. 组件内置了一些控制台业务交互，例如表格轮询、底部批量操作栏、搜索下拉分页加载、时间快捷范围、表格操作按钮折叠到“更多”。
4. 图标由 `packages/font/*.js` 注入 SVG symbol，再通过 `CIcon` 渲染。

## 文档实现边界

VitePress 是 Vue 3 驱动，而这个库是 Vue 2 组件库，所以不能直接在 VitePress Markdown 里原生渲染这些 Vue 2 组件。当前文档站先用 VitePress 承载说明、API 表格和代码示例；如果要做真实交互 demo，推荐后续增加独立 Vue 2 demo 页面，再用 iframe 嵌入 VitePress。
