# Radio 单选

`CRadioGroup` 和 `CRadio` 组合使用，提供卡片式单选交互。

## 示例

```vue
<c-radio-group v-model="type" :selected-type="2">
  <c-radio value="basic">基础版</c-radio>
  <c-radio value="pro">专业版</c-radio>
</c-radio-group>
```

## CRadioGroup API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前选中值 | `String \| Number` | `''` |
| `selectedType` | 选中样式类型，`1` 为蓝色背景，`2` 为角标勾选 | `Number \| String` | `1` |

| 事件 | 说明 |
| --- | --- |
| `change` | 选中项变化时触发 |

## CRadio API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前项值，必填 | `any` | - |

`disabled` 会通过 `$attrs` 透传到内部 input。
