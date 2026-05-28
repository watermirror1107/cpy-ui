# Button 按钮

`CButton` 基于 `a-button` 封装，支持图标、tooltip 提示和 `warning`、`success`、`danger` 等业务状态样式。

## 示例

```vue
<template>
  <div>
    <c-button type="primary">确定</c-button>
    <c-button type="warning" icon="icon-shanchu">告警操作</c-button>
    <c-button type="success" ghost tip="提交后会立即生效">提交</c-button>
  </div>
</template>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `icon` | 左侧图标 symbol 名称 | `String` | `''` |
| `tip` | tooltip 提示内容 | `String` | `''` |
| `placement` | tooltip 位置 | `String` | `'top'` |

其他属性和事件会透传给 `a-button`。
