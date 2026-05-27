# InputNumber 数字输入框

`CInputNumber` 提供减号、输入框、加号和单位展示。

## 基础用法

```vue
<c-input-number v-model="size" :min="1" :max="4096" unit="GB" />
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `String \| Number` | `'large'` | 当前值 |
| `isInteger` | `Boolean` | `true` | 是否按整数处理 |
| `disabled` | `Boolean` | `false` | 是否禁用 |
| `step` | `Number` | `1` | 步进值 |
| `max` | `Number` | `4096` | 最大值 |
| `min` | `Number` | `1` | 最小值 |
| `unit` | `String` | `''` | 单位 |
| `size` | `String` | `'large'` | 尺寸，支持 `large`、`small` |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `valChange` | `value` | 值变化，`v-model` 使用该事件 |
| `change` | - | `value` prop 改变时触发 |
