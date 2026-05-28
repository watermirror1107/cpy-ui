# SearchSelect 搜索选择

`CSearchSelect` 是异步搜索下拉组件，支持分页加载、多选、自定义下拉扩展内容。

## 数据约定

`queryPromise(params)` 需要返回 Promise，响应结构默认读取：

```js
{
  data: {
    payload: [{ id: 1, name: '选项' }],
    totalSize: 100
  }
}
```

## 示例

```vue
<c-search-select
  v-model="ids"
  mode="multiple"
  placeholder="请选择实例"
  :extra-params="{ regionId: 'cn-hangzhou' }"
  :query-promise="queryOptions"
  @itemInfo="handleItemInfo"
/>
```

```js
export default {
  data() {
    return {
      ids: []
    }
  },
  methods: {
    queryOptions(params) {
      return axios.get('/api/options', { params })
    },
    handleItemInfo(options) {
      console.log(options)
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 绑定值 | `any` | `''` |
| `queryPromise` | 查询函数，必填 | `Function` | - |
| `extraParams` | 查询时附加参数 | `Object` | `{}` |
| `mode` | Select 模式，如 `default`、`multiple` | `String` | `'default'` |
| `placeholder` | 占位文本 | `String` | - |
| `disabled` | 是否禁用 | `Boolean` | `false` |
| `size` | 尺寸 | `String` | `'large'` |
| `extraResult` | 额外固定结果 | `Array` | `[]` |

| 事件 | 说明 |
| --- | --- |
| `change` | 值变化时触发，也是 `v-model` 事件 |
| `itemInfo` | 返回选中项对象，multiple 时返回数组 |

| 插槽 | 说明 |
| --- | --- |
| `extraContent` | 下拉菜单底部扩展内容 |
