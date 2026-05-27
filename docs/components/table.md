# Table 表格

`CTable` 基于 `a-table` 封装，内置本地/远程数据、分页、操作栏和表头过滤插槽。

## 本地数据

```vue
<c-table
  :columns="columns"
  :data-source="list"
/>
```

## 远程数据

```vue
<c-table
  ref="table"
  :columns="columns"
  :data="loadData"
/>
```

```js
export default {
  methods: {
    loadData(params) {
      return api.queryList(params)
      // 返回格式:
      // { data: { payload: [], totalSize: 0 } }
    },
    refresh() {
      this.$refs.table.refresh(true)
    }
  }
}
```

## 操作栏

```vue
<c-table :columns="columns" :data-source="list">
  <template #actionBar>
    <c-button type="primary">批量操作</c-button>
  </template>
</c-table>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `pagination` | `Boolean` | `true` | 是否显示分页 |
| `loopTime` | `Number` | `undefined` | 轮询间隔，建议不小于 5000ms |
| `data` | `Function` | `undefined` | 远程数据函数 |
| `filterOptions` | `Array` | `[]` | 表头过滤选项 |
| `dataSource` | `Array` | `[]` | 本地数据 |
| `scroll` | `Object` | `{ x: 930 }` | 表格滚动配置 |

## 透传

`columns`、`rowSelection`、`bordered` 等 ant-design-vue 表格属性通过 attrs 传入。

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `filterChange` | `(value, confirm)` | 表头过滤值变化 |

其他监听器会透传给 `a-table`。

## Methods

| 名称 | 说明 |
| --- | --- |
| `refresh(bool = false)` | 重新加载数据，`true` 时回到第一页 |
| `clearData()` | 清空表格数据 |

## Slots

| 名称 | Slot Props | 说明 |
| --- | --- | --- |
| `actionBar` | - | 分页左侧操作栏 |
| `expandedRowRender` | `{ record, index, indent, expanded }` | 展开行 |
| 自定义列 slot | `{ text, record, index }` | 透传列插槽 |
