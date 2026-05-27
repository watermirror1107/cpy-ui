# Icon 图标

`CIcon` 渲染 SVG symbol 图标。组件库入口会先加载内置字体图标脚本。

## 基础用法

```vue
<c-icon name="icon-bianji" />
<c-icon name="icon-shanchu" class-name="danger-icon" :width="16" :height="16" />
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `String` | 必填 | symbol id，不需要加 `#` |
| `className` | `String` | `undefined` | 额外 class |
| `width` | `Number` | `undefined` | SVG 宽度 |
| `height` | `Number` | `undefined` | SVG 高度 |
