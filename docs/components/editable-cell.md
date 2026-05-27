# EditableCell 可编辑单元格

`CEditableCell` 用于表格中可点击编辑的文本单元格。

## 基础用法

```vue
<c-editable-cell
  :text="record.name"
  empty-placeholder="--"
  :rules="rules"
  @change="payload => updateName(record, payload)"
/>
```

```js
export default {
  data() {
    return {
      rules: [{required: true, message: '请输入名称'}]
    }
  },
  methods: {
    updateName(record, { val, errCallback }) {
      api.updateName(record.id, val).catch(errCallback)
    }
  }
}
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `String` | `undefined` | 当前文本 |
| `emptyPlaceholder` | `String` | `undefined` | 空值占位 |
| `rules` | `Array` | `undefined` | 表单校验规则 |
| `isHasHover` | `Boolean` | `false` | 文本是否启用 hover 样式 |
| `isDisabled` | `Boolean` | `false` | 是否禁用编辑 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `textClick` | - | 点击文本时触发 |
| `focus` | - | 输入框聚焦时触发 |
| `enter` | - | 回车提交时触发 |
| `change` | `{ val, errCallback }` | 校验通过且文本变化后触发 |
