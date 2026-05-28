# EditableCell 可编辑单元格

`CEditableCell` 适合表格或详情里的行内文本编辑。失焦时校验并触发 `change`，回调里提供 `errCallback` 用于保存失败后恢复旧值。

## 示例

```vue
<c-editable-cell
  text="实例名称"
  empty-placeholder="未命名"
  :rules="rules"
  @change="saveName"
/>
```

```js
export default {
  data() {
    return {
      rules: [{ required: true, message: '名称不能为空' }]
    }
  },
  methods: {
    saveName({ val, errCallback }) {
      api.updateName(val).catch(errCallback)
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 当前文本 | `String` | - |
| `emptyPlaceholder` | 空值占位 | `String` | - |
| `rules` | ant-design-vue FormModel 校验规则 | `Array` | - |
| `isHasHover` | 文本 hover 时是否显示可点击样式 | `Boolean` | `false` |
| `isDisabled` | 是否禁用编辑 | `Boolean` | `false` |

| 事件 | 说明 |
| --- | --- |
| `change` | 校验通过且内容变化时触发，参数为 `{ val, errCallback }` |
| `enter` | 回车时触发 |
| `focus` | 输入框 focus 时触发 |
| `textClick` | 非禁用状态点击文本时触发 |
