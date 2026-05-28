# InputNumber 数字输入

`CInputNumber` 是带加减按钮和单位展示的数字输入组件。

## 示例

```vue
<c-input-number
  v-model="cpu"
  :min="1"
  :max="64"
  unit="核"
/>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 绑定值 | `String \| Number` | `'large'` |
| `isInteger` | 是否按整数处理 | `Boolean` | `true` |
| `disabled` | 是否禁用 | `Boolean` | `false` |
| `step` | 步长 | `Number` | `1` |
| `max` | 最大值 | `Number` | `4096` |
| `min` | 最小值 | `Number` | `1` |
| `unit` | 单位文本 | `String` | `''` |
| `size` | 尺寸，支持 `large`、`small` | `String` | `'large'` |

| 事件 | 说明 |
| --- | --- |
| `valChange` | 值变化时触发，也是 `v-model` 事件 |
| `change` | 监听到 value 变化时触发 |
