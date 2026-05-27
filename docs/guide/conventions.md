# 设计约定

## 命名

组件统一使用 `C` 前缀，例如 `CButton`、`CTable`、`CSearchSelect`。模板中建议使用 kebab-case：

```vue
<c-search-select />
```

## 数据绑定

多数表单类组件支持 `v-model`，但事件名会跟组件语义保持一致：

| 组件 | prop | event |
| --- | --- | --- |
| `CInput` | `value` | `change` |
| `CInputNumber` | `value` | `valChange` |
| `CRadioGroup` | `value` | `change` |
| `CDuration` | `value` | `change` |
| `CRangePicker` | `value` | `change` |
| `CSearchSelect` | `value` | `change` |
| `CForm` | `value` | `change` |
| `CTableForm` | `data` | `change` |
| `CTap` | `selectIndex` | `selectItem` |

## ant-design-vue 透传

`CButton`、`CTable`、`CTableBtn` 等组件会把常用 attrs 或 listeners 透传给底层 ant-design-vue 组件。遇到文档未列出的 ant-design-vue 原生属性，可以优先尝试直接传入。

## 文档示例

当前 VitePress 文档不直接渲染 Vue 2 组件。示例代码面向业务项目复制使用，后续如需在线交互和调参，可以追加 Storybook 7 作为开发沙盒。
