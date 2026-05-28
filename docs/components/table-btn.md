# TableBtn 表格按钮

## CTableBtn

`CTableBtn` 是表格操作区按钮，默认纵向展示图标和文字，也支持横向展示用于“更多”弹层。

```vue
<c-table-btn
  icon="icon-shilixiangqing_bianji"
  text="编辑"
  @click="edit"
/>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `show_type` | 展示方式，`vertical` 或 `horizontal` | `String` | `'vertical'` |
| `tip` | tooltip 文案 | `String` | `''` |
| `placement` | tooltip 位置 | `String` | `'top'` |
| `trigger` | tooltip 触发方式 | `String` | `'hover'` |
| `icon` | 图标名称 | `String` | `'icon-shilixiangqing_bianji'` |
| `text` | 按钮文字 | `String` | `'button'` |

其他属性和事件会透传给 `a-button`。

## CBtnWrap

`CBtnWrap` 用于包裹多个 `c-table-btn`。当列宽不足时，后续按钮会被折叠进“更多”弹层。

```vue
<c-btn-wrap>
  <c-table-btn text="编辑" />
  <c-table-btn text="删除" type="danger" />
  <c-table-btn text="续费" />
</c-btn-wrap>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `trigger` | 更多弹层触发方式 | `String` | `'hover'` |
| `placement` | 更多弹层位置 | `String` | `'bottom'` |
