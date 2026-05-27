# Ellipsis 文本省略

`CEllipsis` 用于多行文本省略。内容溢出时，鼠标移入会通过 popover 展示完整文本。

## 基础用法

```vue
<c-ellipsis :text="description" :line-limit="2" />
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `String` | `''` | 展示文本 |
| `lineLimit` | `Number` | `3` | 最大展示行数 |
