# BtnWrap 表格按钮容器

`CBtnWrap` 用于表格操作列，根据父容器宽度自动把多余的 `CTableBtn` 收纳到“更多”菜单。

## 基础用法

```vue
<c-btn-wrap>
  <c-table-btn text="编辑" icon="icon-bianji" />
  <c-table-btn text="删除" icon="icon-shanchu" />
  <c-table-btn text="详情" icon="icon-xiangqing" />
</c-btn-wrap>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `trigger` | `String` | `'hover'` | 更多菜单触发方式 |
| `placement` | `String` | `'bottom'` | 更多菜单位置 |

## Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 只会收集直接子级中的 `c-table-btn` |

## 注意

组件会读取父容器宽度，通常放在表格操作列内部使用。无法获取 DOM 宽度时，会尝试从父组件的 `column.width` 取值。
