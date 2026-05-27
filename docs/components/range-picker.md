# RangePicker 日期范围

`CRangePicker` 基于 `a-range-picker` 封装，内置快捷时间范围。

## 基础用法

```vue
<c-range-picker v-model="range" />
```

## 月级快捷项

```vue
<c-range-picker v-model="range" :current-type="2" />
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `Array` | `[moment().subtract(1, 'days'), moment()]` | 日期范围 |
| `gap` | `Number` | `3` | 实时刷新间隔，单位秒 |
| `currentType` | `Number` | `1` | 快捷项分组，`1` 为小时/天，`2` 为天/月 |
| `separator` | `String` | `'~'` | 日期分隔符 |
| `isShowQuick` | `Boolean` | `true` | 是否显示快捷项 |
| `disabledDate` | `Function` | 禁用未来时间 | 禁用日期逻辑 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `change` | `value` | 日期范围变化，`v-model` 使用该事件 |
