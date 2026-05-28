# Tabs 标签页

`CTabs` 是 `a-tabs` 的简化封装，通过 `tabs` 数组渲染 tab，通过 `v-model` 绑定当前索引。

## 示例

```vue
<c-tabs
  v-model="active"
  :tabs="[{ name: '全部' }, { name: '运行中' }]"
/>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `tabs` | tab 列表，元素使用 `name` 展示 | `Array` | - |
| `value` | 当前 active key | `Number` | `0` |

| 事件 | 说明 |
| --- | --- |
| `change` | 点击 tab 时触发，也是 `v-model` 事件 |
