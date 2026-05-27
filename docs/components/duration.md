# Duration 时长选择

`CDuration` 用于购买周期、订阅周期等时长选择场景。

## 基础用法

```vue
<c-duration v-model="duration" />
```

## 自定义选项

```vue
<c-duration
  v-model="duration"
  :duration-list="durationList"
  :more-list="moreList"
/>
```

```js
export default {
  data() {
    return {
      duration: 1,
      durationList: [
        {id: 1, name: '1个月'},
        {id: 3, name: '3个月'}
      ],
      moreList: [
        {id: 6, name: '6个月'}
      ]
    }
  }
}
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `Number \| String` | `undefined` | 当前时长 |
| `type` | `Any` | `1` | 展示类型，`1` 为横向列表，否则为下拉 |
| `durationList` | `Array` | `[]` | 常用时长列表 |
| `moreList` | `Array` | `[]` | 更多时长列表 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `change` | `value` | 时长变化，`v-model` 使用该事件 |
