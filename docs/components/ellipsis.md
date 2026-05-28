# Ellipsis 省略文本

`CEllipsis` 多行文本省略组件，内容溢出时 hover 展示 popover 全文。

## 示例

```vue
<c-ellipsis
  :line-limit="2"
  text="这是一段很长很长的文本..."
/>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 展示文本 | `String` | `''` |
| `lineLimit` | 最大展示行数 | `Number` | `3` |
