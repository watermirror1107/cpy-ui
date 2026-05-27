# SearchSelect 搜索下拉

`CSearchSelect` 是支持远程搜索、滚动分页和额外选项的下拉选择组件。

## 基础用法

```vue
<c-search-select
  v-model="instanceId"
  placeholder="请选择实例"
  :query-promise="queryInstances"
  @itemInfo="handleItemInfo"
/>
```

```js
export default {
  methods: {
    queryInstances(params) {
      return api.queryInstances(params)
      // 返回格式:
      // { data: { payload: [{ id: '1', name: '实例1' }], totalSize: 20 } }
    },
    handleItemInfo(item) {
      console.log(item)
    }
  }
}
```

## 多选

```vue
<c-search-select
  v-model="ids"
  mode="multiple"
  :query-promise="queryInstances"
/>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `Any` | `''` | 当前选中值 |
| `queryPromise` | `Function` | 必填 | 远程查询函数 |
| `extraParams` | `Object` | `{}` | 查询附加参数 |
| `mode` | `String` | `'default'` | 选择模式，可传 `multiple` |
| `placeholder` | `String` | `undefined` | 占位文案 |
| `disabled` | `Boolean` | `false` | 是否禁用 |
| `size` | `String` | `'large'` | 尺寸 |
| `extraResult` | `Array` | `[]` | 额外插入到结果前的选项 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `change` | `value` | 选中值变化，`v-model` 使用该事件 |
| `itemInfo` | `item \| item[]` | 当前选中项完整信息 |

## Slots

| 名称 | 说明 |
| --- | --- |
| `extraContent` | 下拉面板额外内容 |
