# Button 按钮

`CButton` 基于 `a-button` 封装，增加业务类型样式、图标和 tooltip。

## 基础用法

```vue
<c-button type="primary" @click="save">保存</c-button>
<c-button type="warning" ghost icon="icon-jinggao" tip="谨慎操作">告警</c-button>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `String` | `''` | 左侧图标 symbol 名称 |
| `tip` | `String` | `''` | tooltip 提示内容 |
| `placement` | `String` | `'top'` | tooltip 展示位置 |

## 透传

未在 Props 中声明的属性和事件会透传给 `a-button`，例如 `type`、`ghost`、`disabled`、`loading`、`click`。

## 业务类型

额外支持 `type="warning"`、`type="success"`、`type="danger"`，配合 `ghost` 会使用对应的描边样式。

## Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 按钮内容 |
