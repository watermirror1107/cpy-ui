# Input 输入框

`CInput` 是带浮动 label 的输入框，通过 `v-model` 绑定字符串。

## 示例

```vue
<c-input
  v-model="name"
  label="名称"
  placeholder="请输入名称"
/>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 绑定值 | `String` | - |
| `placeholder` | 占位文本 | `String` | `''` |
| `label` | 浮动标签 | `String` | `''` |
| `type` | input type | `String` | `'text'` |

| 事件 | 说明 |
| --- | --- |
| `change` | 输入变化时触发，也是 `v-model` 事件 |
| `pressEnter` | 按 Enter 时触发 |

| 插槽 | 说明 |
| --- | --- |
| `suffix` | 右侧内容 |
