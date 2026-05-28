# Duration 时长选择

`CDuration` 用于选择月份或年限，默认展示常用时长和“更多时长”下拉。

## 示例

```vue
<c-duration v-model="duration" />
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 绑定值 | `Number \| String` | - |
| `type` | 展示形态，`1` 为横向按钮，其他值为下拉 | `any` | `1` |
| `durationList` | 常用时长列表 | `Array` | 内置 1、2、3、6、9、12、24、36 月 |
| `moreList` | 更多时长列表 | `Array` | 内置 4、5、7、8、10、11 月 |

| 事件 | 说明 |
| --- | --- |
| `change` | 选择变化时触发，也是 `v-model` 事件 |
