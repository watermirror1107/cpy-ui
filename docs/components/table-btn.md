# TableBtn 表格按钮

`CTableBtn` 用于表格操作列，支持竖向、横向样式和 tooltip。

## 基础用法

```vue
<c-table-btn icon="icon-bianji" text="编辑" @click="edit(record)" />
<c-table-btn type="danger" icon="icon-shanchu" text="删除" tip="删除后不可恢复" />
```

## 自定义内容

```vue
<c-table-btn>
  <span>自定义操作</span>
</c-table-btn>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `show_type` | `String` | `'vertical'` | 展示方向，支持 `vertical`、`horizontal` |
| `tip` | `String` | `''` | tooltip 内容 |
| `placement` | `String` | `'top'` | tooltip 位置 |
| `trigger` | `String` | `'hover'` | tooltip 触发方式 |
| `icon` | `String` | `'icon-shilixiangqing_bianji'` | 图标 |
| `text` | `String` | `'button'` | 文案 |

## 透传

其他 attrs 和 listeners 会透传给底层 `a-button`。当 `type="danger"` 时会自动设置 `ghost`。

## Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 自定义按钮内容 |
