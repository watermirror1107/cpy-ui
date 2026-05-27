# Radio 单选

`CRadioGroup` 和 `CRadio` 组合使用，提供卡片式单选样式。

## 基础用法

```vue
<c-radio-group v-model="type" :selected-type="1">
  <c-radio value="small">小型</c-radio>
  <c-radio value="large">大型</c-radio>
</c-radio-group>
```

## 按钮角标样式

```vue
<c-radio-group v-model="type" :selected-type="2">
  <c-radio value="month">包月</c-radio>
  <c-radio value="year">包年</c-radio>
</c-radio-group>
```

## CRadioGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `Any` | `''` | 当前选中值 |
| `selectedType` | `Number \| String` | `1` | 选中样式类型，支持 `1`、`2` |

## CRadio Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `Any` | 必填 | 单选值 |

## Events

| 组件 | 名称 | 参数 | 说明 |
| --- | --- | --- | --- |
| `CRadioGroup` | `change` | `value` | 选中值变化，`v-model` 使用该事件 |
| `CRadio` | `change` | `event` | 点击当前单选项时触发 |

## Slots

| 组件 | 名称 | 说明 |
| --- | --- | --- |
| `CRadioGroup` | `default` | 单选项列表 |
| `CRadio` | `default` | 单选项内容 |
