# RangePicker 时间范围

`CRangePicker` 基于 `a-range-picker` 封装，内置时间图标和快捷时间范围。

## 示例

```vue
<c-range-picker
  v-model="timeRange"
  :current-type="2"
/>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 绑定的 moment 数组 | `Array` | `[moment().subtract(1, 'days'), moment()]` |
| `gap` | 实时刷新间隔，单位秒 | `Number` | `3` |
| `currentType` | 快捷按钮分组，`1` 为小时/天，`2` 为天/月/半年 | `Number` | `1` |
| `separator` | 日期分隔符 | `String` | `'~'` |
| `isShowQuick` | 是否展示快捷按钮 | `Boolean` | `true` |
| `disabledDate` | 禁用日期函数 | `Function` | 禁用未来时间 |

| 事件 | 说明 |
| --- | --- |
| `change` | 日期变化时触发，也是 `v-model` 事件 |
