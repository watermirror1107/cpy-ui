# Table 表格

`CTable` 是对 `a-table` 的业务封装，重点处理异步数据、分页、轮询、筛选下拉、底部操作栏和插槽透传。

## 数据约定

异步数据函数 `data(params)` 需要返回 Promise，并默认读取：

```js
{
  data: {
    payload: [],
    totalSize: 0
  }
}
```

## 示例

```vue
<c-table
  ref="table"
  row-key="id"
  :columns="columns"
  :data="queryList"
  :filter-options="filterOptions"
  @filterChange="handleFilterChange"
>
  <template #operate="{ record }">
    <c-btn-wrap>
      <c-table-btn text="编辑" @click="edit(record)" />
      <c-table-btn text="删除" type="danger" @click="remove(record)" />
    </c-btn-wrap>
  </template>

  <template #actionBar>
    <c-button icon="icon-shanchu" type="text">批量删除</c-button>
  </template>
</c-table>
```

```js
export default {
  data() {
    return {
      columns: [
        { title: '名称', dataIndex: 'name', key: 'name' },
        { title: '操作', key: 'operate', scopedSlots: { customRender: 'operate' } }
      ],
      filterOptions: []
    }
  },
  methods: {
    queryList(params) {
      return axios.get('/api/list', { params })
    },
    handleFilterChange(value, confirm) {
      confirm()
      this.$refs.table.refresh(true)
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `pagination` | 是否显示内部分页 | `Boolean` | `true` |
| `loopTime` | 轮询间隔，至少 5000ms 才会启用 | `Number` | - |
| `data` | 异步数据函数 | `Function` | - |
| `filterOptions` | 表头筛选选项 | `Array` | `[]` |
| `dataSource` | 静态数据 | `Array` | `[]` |
| `scroll` | 表格滚动配置 | `Object` | `{ x: 930 }` |

其他属性和事件会透传给 `a-table`。

## 方法

| 方法 | 说明 |
| --- | --- |
| `refresh(bool = false)` | 重新加载，`true` 时回到第一页 |
| `clearData()` | 清空表格数据并关闭 loading |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| `actionBar` | 表格底部左侧操作区 |
| `expandedRowRender` | 展开行内容 |
| 与 columns 中 `scopedSlots.customRender` 同名 | 自定义单元格 |
