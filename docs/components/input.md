# Input 输入框

`CInput` 是带浮动 label 的输入框，适合表单里的单行文本输入。

## 基础用法

```vue
<c-input v-model="form.name" label="名称" placeholder="请输入名称" />
<c-input v-model="form.password" label="密码" type="password" />
```

## 后缀插槽

```vue
<c-input v-model="price" label="价格">
  <span slot="suffix">元</span>
</c-input>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `String` | `undefined` | 输入值 |
| `placeholder` | `String` | `''` | 占位文案 |
| `label` | `String` | `''` | 浮动标签 |
| `type` | `String` | `'text'` | 原生 input type |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `change` | `value` | 输入或 change 时触发，`v-model` 使用该事件 |
| `pressEnter` | - | 按下回车时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| `suffix` | 输入框右侧内容 |
