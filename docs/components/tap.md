# Tap 统计卡片

`CTap` 是卡片式统计筛选组件，适合订单状态、资源状态等概览筛选。

## 示例

```vue
<c-tap
  v-model="active"
  title="订单统计"
  :list="list"
  @selectItem="handleSelect"
/>
```

```js
export default {
  data() {
    return {
      active: 0,
      list: [
        { title: '全部订单', type: 'total', color: '#323232', num: 12 },
        { title: '待支付', type: 'pending', color: '#FDBE2E', num: 3 }
      ]
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `list` | 卡片列表，必填 | `Array` | - |
| `selectIndex` | 当前选中索引 | `Number` | `undefined` |
| `title` | 外层卡片标题 | `String` | `''` |

| 事件 | 说明 |
| --- | --- |
| `selectItem` | 点击卡片时触发，也是 `v-model` 事件 |

| 插槽 | 说明 |
| --- | --- |
| `topIcon` | 顶部图标，作用域参数为 `scope` |
| `bottomIcon` | 底部图标，作用域参数为 `scope` |
